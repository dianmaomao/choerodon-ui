import {
  action,
  computed,
  isArrayLike,
  isObservableArray,
  observable,
  runInAction,
  set,
  toJS,
} from 'mobx';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import isPlainObject from 'lodash/isPlainObject';
import warning from 'choerodon-ui/lib/_util/warning';
import { getConfig } from 'choerodon-ui/lib/configure';
import DataSet from './DataSet';
import Field, { FieldProps, Fields } from './Field';
import {
  checkFieldType,
  childrenInfoForDelete,
  findBindFields,
  generateResponseData,
  getRecordValue,
  processIntlField,
  processToJSON,
  processValue,
} from './utils';
import * as ObjectChainValue from '../_util/ObjectChainValue';
import DataSetSnapshot from './DataSetSnapshot';
import localeContext from '../locale-context';
import { BooleanValue, DataSetEvents, FieldIgnore, FieldType, RecordStatus } from './enum';
import isSame from '../_util/isSame';
import axiosAdapter from '../_util/axiosAdapter';

/**
 * 记录ID生成器
 */
const IDGen: IterableIterator<number> = (function*(start: number) {
  while (true) {
    yield ++start;
  }
})(1000);

export default class Record {
  id: number;

  dataSet?: DataSet;

  @observable fields: Fields;

  memo?: object;

  dataSetSnapshot: { [key: string]: DataSetSnapshot } = {};

  cascadeRecordsMap: { [key: string]: Record[] } = {};

  @observable pristineData: object;

  @observable data: object;

  @observable status: RecordStatus;

  @observable selectable: boolean;

  @observable isSelected: boolean;

  @observable isCurrent: boolean;

  @observable isCached: boolean;

  @observable editing?: boolean;

  @computed
  get key(): string | number {
    if (this.status !== RecordStatus.add) {
      const { dataSet } = this;
      if (dataSet) {
        const { primaryKey } = dataSet.props;
        if (primaryKey) {
          const key = this.get(primaryKey);
          if (isString(key) || isNumber(key)) {
            return key;
          }
        }
      }
    }
    return this.id;
  }

  @computed
  get index(): number {
    const { dataSet } = this;
    if (dataSet) {
      return dataSet.indexOf(this);
    }
    return -1;
  }

  @computed
  get isRemoved(): boolean {
    return this.status === RecordStatus.delete;
  }

  @computed
  get isIndeterminate(): boolean {
    const { dataSet } = this;
    if (dataSet) {
      const { checkField } = dataSet.props;
      if (checkField) {
        const field = this.getField(checkField);
        const trueValue = field ? field.get(BooleanValue.trueValue) : true;
        const { children } = this;
        if (children) {
          let checkedLength = 0;
          return (
            children.some(record => {
              if (record.isIndeterminate) {
                return true;
              }
              if (record.get(checkField) === trueValue) {
                checkedLength += 1;
              }
              return false;
            }) ||
            (checkedLength > 0 && checkedLength !== children.length)
          );
        }
      }
    }
    return false;
  }

  @computed
  get isExpanded(): boolean {
    const { dataSet } = this;
    if (dataSet) {
      const { expandField } = dataSet.props;
      if (expandField) {
        const expanded = this.get(expandField);
        const field = this.getField(expandField);
        return expanded === (field ? field.get(BooleanValue.trueValue) : true);
      }
    }
    return false;
  }

  set isExpanded(expand: boolean) {
    const { dataSet } = this;
    if (dataSet) {
      const { expandField } = dataSet.props;
      if (expandField) {
        const field = this.getField(expandField);
        this.set(
          expandField,
          field
            ? expand
              ? field.get(BooleanValue.trueValue)
              : field.get(BooleanValue.falseValue)
            : expand,
        );
      }
    }
  }

  @computed
  get previousRecord(): Record | undefined {
    const { parent, dataSet } = this;
    let children: Record[] | undefined;
    if (parent) {
      children = parent.children;
    } else if (dataSet) {
      children = dataSet.treeData;
    }
    if (children) {
      return children[children.indexOf(this) - 1];
    }
    return undefined;
  }

  @computed
  get nextRecord(): Record | undefined {
    const { parent, dataSet } = this;
    let children: Record[] | undefined;
    if (parent) {
      children = parent.children;
    } else if (dataSet) {
      children = dataSet.treeData;
    }
    if (children) {
      return children[children.indexOf(this) + 1];
    }
    return undefined;
  }

  @computed
  get children(): Record[] | undefined {
    const { dataSet } = this;
    if (dataSet) {
      const { parentField, idField } = dataSet.props;
      if (parentField && idField) {
        const children = dataSet.records.filter(record => {
          const childParentId = record.get(parentField);
          const id = this.get(idField);
          return !isNil(childParentId) && !isNil(id) && childParentId === id;
        });
        return children.length > 0 ? children : undefined;
      }
    }
    return undefined;
  }

  @computed
  get parent(): Record | undefined {
    const { dataSet } = this;
    if (dataSet) {
      const { parentField, idField } = dataSet.props;
      if (parentField && idField) {
        return dataSet.records.find(record => {
          const parentId = this.get(parentField);
          const id = record.get(idField);
          return !isNil(parentId) && !isNil(id) && parentId === id;
        });
      }
    }
    return undefined;
  }

  @computed
  get level(): number {
    const { parent } = this;
    if (parent) {
      return parent.level + 1;
    }
    return 0;
  }

  @computed
  get dirty(): boolean {
    const { fields, status } = this;
    return status === RecordStatus.update || [...fields.values()].some(({ dirty }) => dirty);
  }

  @computed
  get cascadeParent(): Record | undefined {
    const { dataSet } = this;
    if (dataSet) {
      const { parent } = dataSet;
      if (parent) {
        const { children } = parent;
        const name = Object.keys(children).find(key => children[key] === dataSet);
        if (name) {
          return parent.find(record => (record.getCascadeRecords(name) || []).indexOf(this) !== -1);
        }
      }
    }
    return undefined;
  }

  constructor(data: object = {}, dataSet?: DataSet) {
    runInAction(() => {
      const initData = toJS(data);
      this.fields = observable.map<string, Field>();
      this.status = RecordStatus.add;
      this.selectable = true;
      this.isSelected = false;
      this.isCurrent = false;
      this.isCached = false;
      this.id = IDGen.next().value;
      this.data = initData;
      if (dataSet) {
        this.dataSet = dataSet;
        const { fields } = dataSet;
        if (fields) {
          this.initFields(fields);
        }
      }
      const d = this.processData(initData);
      this.pristineData = d;
      this.data = d;
    });
  }

  toData(): object {
    const json = this.normalizeData();
    this.normalizeCascadeData(json, true);
    return json;
  }

  toJSONData(noCascade?: boolean, isCascadeSelect?: boolean): any {
    const { status } = this;
    let dirty = status !== RecordStatus.sync;
    const json = this.normalizeData(true);
    if (!noCascade && this.normalizeCascadeData(json, false, isCascadeSelect)) {
      dirty = true;
    }
    return {
      ...json,
      __id: this.id,
      [getConfig('statusKey')]: getConfig('status')[
        status === RecordStatus.sync ? RecordStatus.update : status
      ],
      __dirty: dirty,
    };
  }

  validate(all?: boolean, noCascade?: boolean): Promise<boolean> {
    const { dataSetSnapshot, isCurrent, dataSet, status, fields } = this;
    return Promise.all([
      ...[...fields.values()].map(field =>
        all || status !== RecordStatus.sync ? field.checkValidity() : true,
      ),
      ...(noCascade
        ? []
        : Object.keys(dataSetSnapshot).map(key =>
            (isCurrent && dataSet
              ? dataSet.children[key]
              : new DataSet().restore(dataSetSnapshot[key])
            ).validate(all),
          )),
    ]).then(results => results.every(result => result));
  }

  getField(fieldName?: string): Field | undefined {
    if (fieldName) {
      return this.fields.get(fieldName);
    }
  }

  getCascadeRecords(fieldName?: string): Record[] | undefined {
    const { dataSet } = this;
    if (fieldName && dataSet) {
      const childDataSet = dataSet.children[fieldName];
      if (childDataSet) {
        if (dataSet.current === this) {
          return childDataSet.slice();
        }
        const snapshot = this.dataSetSnapshot[fieldName];
        if (snapshot) {
          return snapshot.records.slice();
        }
        const cascadeRecords = this.cascadeRecordsMap[fieldName];
        if (cascadeRecords) {
          return cascadeRecords;
        }
        const data = this.get(fieldName);
        if (isObservableArray(data)) {
          const records = processData(data, dataSet);
          this.cascadeRecordsMap[fieldName] = records;
          return records;
        }
      }
    }
  }

  get(fieldName?: string): any {
    return getRecordValue.call(
      this,
      this.data,
      (child, checkField) => child.get(checkField),
      fieldName,
    );
  }

  getPristineValue(fieldName?: string): any {
    return getRecordValue.call(
      this,
      this.pristineData,
      (child, checkField) => child.getPristineValue(checkField),
      fieldName,
    );
  }

  @action
  set(item: string | object, value?: any): Record {
    if (isString(item)) {
      let fieldName: string = item;
      const oldName = fieldName;
      const field = this.getField(fieldName) || this.addField(fieldName);
      checkFieldType(value, field);
      const bind = field.get('bind');
      if (bind) {
        fieldName = bind;
      }
      const oldValue = toJS(this.get(fieldName));
      const newValue = processValue(value, field);
      if (!isSame(newValue, oldValue)) {
        const { fields } = this;
        ObjectChainValue.set(this.data, fieldName, newValue, fields);
        const pristineValue = this.getPristineValue(fieldName);
        if (isSame(pristineValue, newValue)) {
          if (this.status === RecordStatus.update && [...fields.values()].every(f => !f.dirty)) {
            this.status = RecordStatus.sync;
          }
        } else if (this.status === RecordStatus.sync) {
          this.status = RecordStatus.update;
        }
        const { dataSet } = this;
        if (dataSet) {
          dataSet.fireEvent(DataSetEvents.update, {
            dataSet,
            record: this,
            name: oldName,
            value: newValue,
            oldValue,
          });
          const { checkField } = dataSet.props;
          if (checkField && (checkField === fieldName || checkField === oldName)) {
            const { children } = this;
            if (children) {
              children.forEach(record => record.set(fieldName, value));
            }
          }
        }
      }
      findBindFields(field, this.fields).forEach(oneField => {
        // oneField.dirty = field.dirty,
        oneField.validator.reset();
        oneField.checkValidity();
      });
    } else if (isPlainObject(item)) {
      Object.keys(item).forEach(key => this.set(key, item[key]));
    }
    return this;
  }

  clone(): Record {
    const { dataSet } = this;
    const cloneData = this.toData();
    if (dataSet) {
      const { primaryKey } = dataSet.props;
      if (primaryKey) {
        delete cloneData[primaryKey];
      }
      return new Record(cloneData, dataSet);
    }
    return new Record(cloneData);
  }

  ready(): Promise<any> {
    return Promise.all([...this.fields.values()].map(field => field.ready()));
  }

  @action
  async tls(): Promise<void> {
    const tlsKey = getConfig('tlsKey');
    const { dataSet } = this;
    if (dataSet && !this.get(tlsKey)) {
      const {
        transport: { tls = {}, adapter },
        axios,
        lang,
      } = dataSet;
      const { primaryKey } = dataSet.props;
      warning(!!primaryKey, 'If you want to use IntlField, please set `primaryKey` for dataSet.');
      const newConfig = axiosAdapter(
        tls,
        dataSet,
        {},
        {
          key: this.get(primaryKey),
        },
      );
      const adapterConfig = adapter(newConfig, 'tls') || newConfig;
      if (adapterConfig.url) {
        const result = await axios(adapterConfig);
        if (result) {
          const dataKey = getConfig('dataKey');
          this.commitTls(generateResponseData(result, dataKey)[0]);
        }
      } else {
        this.commitTls(
          [...this.fields.entries()].reduce((data, [key, field]) => {
            if (field.type === FieldType.intl) {
              data[key] = {
                [lang]: this.get(key),
              };
            }
            return data;
          }, {}),
        );
      }
    }
  }

  @action
  reset(): Record {
    const { status, fields, dataSet, dirty } = this;
    [...fields.values()].forEach(field => field.commit());
    if (status === RecordStatus.update || status === RecordStatus.delete || dirty) {
      this.status = RecordStatus.sync;
      if (dirty) {
        this.data = toJS(this.pristineData);
        this.memo = undefined;
      }
      if (dataSet && !dataSet.resetInBatch) {
        dataSet.fireEvent(DataSetEvents.reset, { records: [this], dataSet });
      }
    }
    return this;
  }

  @action
  save(): Record {
    this.memo = toJS(this.data);
    return this;
  }

  @action
  restore(): Record {
    const { memo } = this;
    if (memo) {
      this.set(memo);
      this.memo = undefined;
    }
    return this;
  }

  @action
  clear(): Record {
    return this.set(
      [...this.fields.keys()].reduce((obj, key) => {
        obj[key] = null;
        return obj;
      }, {}),
    );
  }

  @action
  commit(data?: object, dataSet?: DataSet): Record {
    const { dataSetSnapshot, fields, status } = this;
    if (dataSet) {
      const { records } = dataSet;
      if (status === RecordStatus.delete) {
        const index = records.indexOf(this);
        if (index !== -1) {
          dataSet.totalCount -= 1;
          records.splice(index, 1);
        }
        return this;
      }
      if (status === RecordStatus.add) {
        const index = records.indexOf(this);
        if (index !== -1) {
          dataSet.totalCount += 1;
        }
      }
      if (data) {
        const newData = this.processData(data);
        this.pristineData = newData;
        Object.keys(newData).forEach(key => {
          const newValue = newData[key];
          if (this.get(key) !== newValue) {
            set(this.data, key, newData[key]);
          }
        });
        const snapShorts = Object.keys(dataSetSnapshot);
        if (snapShorts.length) {
          const isCurrent = dataSet.current === this;
          const ds = new DataSet();
          snapShorts.forEach(
            key =>
              (dataSetSnapshot[key] = (isCurrent
                ? dataSet.children[key]
                : ds.restore(dataSetSnapshot[key])
              )
                .commitData(data[key] || [])
                .snapshot()),
          );
        }
      }
    }
    [...fields.values()].forEach(field => field.commit());
    this.status = RecordStatus.sync;
    return this;
  }

  @action
  private commitTls(data) {
    const { dataSet } = this;
    const lang = dataSet ? dataSet.lang : localeContext.locale.lang;
    const tlsKey = getConfig('tlsKey');
    this.pristineData[tlsKey] = data;
    const values: object = {};
    Object.keys(data).forEach(key => {
      const field = this.getField(key);
      if (field && field.dirty) {
        values[`${tlsKey}.${key}.${lang}`] = this.get(key);
      }
    });
    this.set(tlsKey, data);
    this.set(values);
  }

  private initFields(fields: Fields) {
    [...fields.keys()].forEach(key => this.addField(key));
  }

  @action
  private addField(name: string, fieldProps: FieldProps = {}): Field {
    const { dataSet } = this;
    return processIntlField(
      name,
      fieldProps,
      (langName, langProps) => {
        const field = new Field({ ...langProps, name: langName }, dataSet, this);
        this.fields.set(langName, field);
        return field;
      },
      dataSet,
    );
  }

  private processData(data: object = {}): object {
    const { fields } = this;
    [...fields.entries()].forEach(([fieldName, field]) => {
      let value = ObjectChainValue.get(data, fieldName);
      const bind = field.get('bind');
      const type = field.get('type');
      const transformResponse = field.get('transformResponse');
      if (bind) {
        fieldName = bind;
        const bindValue = ObjectChainValue.get(data, fieldName);
        if (isNil(value) && !isNil(bindValue)) {
          value = bindValue;
        }
      }
      if (value === undefined && type === FieldType.boolean) {
        value = false;
      }
      if (transformResponse) {
        value = transformResponse(value);
      }
      value = processValue(value, field);
      if (value === null) {
        value = undefined;
      }
      ObjectChainValue.set(data, fieldName, value, fields);
    });
    return data;
  }

  private normalizeData(needIgnore?: boolean) {
    const { fields } = this;
    const json: any = toJS(this.data);
    [...fields.keys()].forEach(key => {
      let value = ObjectChainValue.get(json, key);
      const field = this.getField(key);
      if (field) {
        const ignore = field.get('ignore');
        if (
          needIgnore &&
          (ignore === FieldIgnore.always || (ignore === FieldIgnore.clean && !field.dirty))
        ) {
          delete json[key];
          return;
        }
        const bind = field.get('bind');
        const multiple = field.get('multiple');
        const type = field.get('type');
        const transformRequest = field.get('transformRequest');
        if (bind) {
          value = this.get(bind);
        }
        if (type === FieldType.object) {
          return;
        }
        if (isString(multiple) && isArrayLike(value)) {
          value = value.map(processToJSON).join(multiple);
        }
        if (transformRequest) {
          value = transformRequest(value);
        }
      }
      if (value !== undefined) {
        ObjectChainValue.set(json, key, processToJSON(value), fields);
      } else {
        ObjectChainValue.remove(json, key);
      }
    });
    return json;
  }

  private normalizeCascadeData(json: any, all?: boolean, isSelect?: boolean) {
    const { dataSetSnapshot, dataSet, isCurrent, status, fields } = this;
    const isDelete = status === RecordStatus.delete;
    if (dataSet) {
      let dirty = false;
      const { children } = dataSet;
      if (isDelete) {
        childrenInfoForDelete(json, children);
      } else {
        const keys = Object.keys(children);
        if (keys) {
          keys.forEach(name => {
            const child = isCurrent ? children[name] : new DataSet().restore(dataSetSnapshot[name]);
            const jsonArray = all ? child.toData() : child.toJSONData(isSelect);
            if (jsonArray.length > 0) {
              dirty = true;
            }
            ObjectChainValue.set(json, name, jsonArray, fields);
          });
        }
      }
      return dirty;
    }
  }
}

export function processData(allData: any[], dataSet: DataSet) {
  return allData.map(data => {
    const record =
      data instanceof Record ? ((data.dataSet = dataSet), data) : new Record(data, dataSet);
    record.status = RecordStatus.sync;
    return record;
  });
}
