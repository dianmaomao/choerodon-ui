import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import { computed, isArrayLike } from 'mobx';
import isPlainObject from 'lodash/isPlainObject';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import { FormField, FormFieldProps, RenderProps } from '../field/FormField';
import autobind from '../_util/autobind';
import processFieldValue from '../_util/processFieldValue';
import { BooleanValue, FieldType } from '../data-set/enum';
import ObserverCheckBox from '../check-box/CheckBox';

export interface OutputProps extends FormFieldProps {}

@observer
export default class Output extends FormField<OutputProps> {
  static displayName = 'Output';

  static defaultProps = {
    ...FormField.defaultProps,
    suffixCls: 'output',
  };

  @computed
  get editable(): boolean {
    return false;
  }

  @autobind
  handleChange() {}

  getOtherProps() {
    return omit(super.getOtherProps(), ['name']);
  }

  getValueKey(value) {
    if (isArrayLike(value)) {
      return value.map(this.getValueKey, this).join(',');
    }
    return this.processValue(value);
  }

  processValue(value: any): string {
    if (!isNil(value)) {
      const text = isPlainObject(value) ? value : super.processValue(value);
      const { field, lang } = this;
      if (field) {
        return processFieldValue(text, field, lang, true);
      }
      return text;
    }
    return '';
  }

  @autobind
  defaultRenderer({ value, text, repeat, maxTagTextLength }: RenderProps): ReactNode {
    const { field } = this;
    if (field && field.type === FieldType.boolean) {
      return <ObserverCheckBox disabled checked={value === field.get(BooleanValue.trueValue)} />;
    }
    return super.defaultRenderer({ text, repeat, maxTagTextLength });
  }

  getRenderedValue(): ReactNode {
    const { multiple, range } = this;
    if (multiple) {
      return this.renderMultipleValues(true);
    }
    if (range) {
      return this.renderRangeValue(true);
    }
    return this.getTextNode();
  }

  renderWrapper(): ReactNode {
    return <span {...this.getMergedProps()}>{this.getRenderedValue()}</span>;
  }
}
