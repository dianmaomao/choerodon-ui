import React, { Component, DragEvent } from 'react';
import classNames from 'classnames';
import uniqBy from 'lodash/uniqBy';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale-provider/default';
import Dragger from './Dragger';
import UploadList from './UploadList';
import { UploadChangeParam, UploadFile, UploadLocale, UploadProps, UploadState } from './interface';
import { fileToObject, genPercentAdd, getFileItem, removeFileItem, T } from './utils';
import RcUpload from '../rc-components/upload';
import { getPrefixCls } from '../configure';

export { UploadProps };

export default class Upload extends Component<UploadProps, UploadState> {
  static displayName = 'Upload';

  static Dragger: typeof Dragger;

  static defaultProps = {
    type: 'select',
    multiple: false,
    action: '',
    data: {},
    accept: '',
    beforeUpload: T,
    showUploadList: true,
    listType: 'text', // or pictrue
    className: '',
    disabled: false,
    supportServerRender: true,
  };

  recentUploadStatus: boolean | PromiseLike<any>;

  progressTimer: any;

  private upload: any;

  constructor(props: UploadProps) {
    super(props);

    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
      dragState: 'drop',
    };
  }

  componentWillUnmount() {
    this.clearProgressTimer();
  }

  onStart = (file: UploadFile) => {
    const { fileList } = this.state;
    const nextFileList = [...fileList];
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';
    nextFileList.push(targetItem);
    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    });
    // fix ie progress
    if (!(window as any).FormData) {
      this.autoUpdateProgress(0, targetItem);
    }
  };

  autoUpdateProgress(_: any, file: UploadFile) {
    const getPercent = genPercentAdd();
    let curPercent = 0;
    this.clearProgressTimer();
    this.progressTimer = setInterval(() => {
      curPercent = getPercent(curPercent);
      this.onProgress(
        {
          percent: curPercent,
        },
        file,
      );
    }, 200);
  }

  onSuccess = (response: any, file: UploadFile) => {
    this.clearProgressTimer();
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (targetItem) {
      targetItem.status = 'done';
      targetItem.response = response;
      this.onChange({
        file: { ...targetItem },
        fileList,
      });
    }
  };

  onProgress = (e: { percent: number }, file: UploadFile) => {
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (targetItem) {
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file: { ...targetItem },
        fileList,
      });
    }
  };

  onError = (error: Error, response: any, file: UploadFile) => {
    this.clearProgressTimer();
    const { fileList } = this.state;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  };

  handleRemove(file: UploadFile) {
    const { onRemove } = this.props;

    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then(ret => {
      // Prevent removing file
      if (ret === false) {
        return;
      }
      const { fileList } = this.state;
      const removedFileList = removeFileItem(file, fileList);
      if (removedFileList) {
        this.onChange({
          file,
          fileList: removedFileList,
        });
      }
    });
  }

  handleManualRemove = (file: UploadFile) => {
    this.upload.abort(file);
    file.status = 'removed'; // eslint-disable-line
    this.handleRemove(file);
  };

  onChange = (info: UploadChangeParam) => {
    if (!('fileList' in this.props)) {
      this.setState({ fileList: info.fileList });
    }

    const { onChange } = this.props;
    if (onChange) {
      onChange(info);
    }
  };

  componentWillReceiveProps(nextProps: UploadProps) {
    if ('fileList' in nextProps) {
      this.setState({
        fileList: nextProps.fileList || [],
      });
    }
  }

  onFileDrop = (e: DragEvent<HTMLDivElement>) => {
    this.setState({
      dragState: e.type,
    });
  };

  beforeUpload = (file: UploadFile, uploadFiles: UploadFile[]) => {
    const { beforeUpload } = this.props;
    if (beforeUpload) {
      const result = beforeUpload(file, uploadFiles);
      if (result === false) {
        const { fileList } = this.state;
        this.onChange({
          file,
          fileList: uniqBy(uploadFiles.concat(fileList), (item: any) => item.uid),
        });
        return false;
      }
      if (result && (result as PromiseLike<any>).then) {
        return result;
      }
    }
    return true;
  };

  clearProgressTimer() {
    clearInterval(this.progressTimer);
  }

  saveUpload = (node: RcUpload | null) => {
    this.upload = node;
  };

  renderUploadList = (uploadLocale: UploadLocale) => {
    const { showUploadList, listType, onPreview, locale } = this.props;
    const { fileList } = this.state;
    const { showRemoveIcon, showPreviewIcon } = showUploadList as any;
    return (
      <UploadList
        listType={listType}
        items={fileList}
        onPreview={onPreview}
        onRemove={this.handleManualRemove}
        showRemoveIcon={showRemoveIcon}
        showPreviewIcon={showPreviewIcon}
        locale={{ ...uploadLocale, ...locale }}
      />
    );
  };

  render() {
    const {
      prefixCls: customizePrefixCls,
      className,
      showUploadList,
      listType,
      type,
      disabled,
      children,
    } = this.props;
    const { fileList, dragState } = this.state;

    const prefixCls = getPrefixCls('upload', customizePrefixCls);

    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      beforeUpload: this.beforeUpload,
      prefixCls,
    };

    delete rcUploadProps.className;

    const uploadList = showUploadList ? (
      <LocaleReceiver componentName="Upload" defaultLocale={defaultLocale.Upload}>
        {this.renderUploadList}
      </LocaleReceiver>
    ) : null;

    if (type === 'drag') {
      const dragCls = classNames(prefixCls, {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: fileList.some(file => file.status === 'uploading'),
        [`${prefixCls}-drag-hover`]: dragState === 'dragover',
        [`${prefixCls}-disabled`]: disabled,
      });
      return (
        <span className={className}>
          <div
            className={dragCls}
            onDrop={this.onFileDrop}
            onDragOver={this.onFileDrop}
            onDragLeave={this.onFileDrop}
          >
            <RcUpload {...rcUploadProps} ref={this.saveUpload} className={`${prefixCls}-btn`}>
              <div className={`${prefixCls}-drag-container`}>{children}</div>
            </RcUpload>
          </div>
          {uploadList}
        </span>
      );
    }

    const uploadButtonCls = classNames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: disabled,
    });

    const uploadButton = (
      <div className={uploadButtonCls} style={{ display: children ? '' : 'none' }}>
        <RcUpload {...rcUploadProps} ref={this.saveUpload} />
      </div>
    );

    if (listType === 'picture-card') {
      return (
        <span className={className}>
          {uploadList}
          {uploadButton}
        </span>
      );
    }
    return (
      <span className={className}>
        {uploadButton}
        {uploadList}
      </span>
    );
  }
}
