---
order: 6
title: 更新日志
toc: false
timeline: true
---

`choerodon-ui` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

- 💄 `<pro>DataSet.Field`: 去除唯一性校验调用接口时分页数必须大于 1 的限制。
- 🐞 `<pro>Button`: 修复点击事件无法阻止冒泡的问题。

## 0.8.29

`2019-10-27`

- 💄 `<pro>Field`: 优化 lookup 缓存机制。
- 🐞 `<pro>Select`: 修复使用 lovCode 时，lovQueryAxiosConfig 不起作用的问题。
- 🐞 `<pro>Select`: 修复 searchMatcher 的问题。
- 🐞 `<pro>Table`: 修复行内编辑模式下未编辑状态的行 CheckBox 没禁用的问题。

## 0.8.28

`2019-10-25`

- 🌟 `configure`: 增加全局配置 transport、lookupAxiosConfig、iconfontPrefix、icons。
- 🌟 `Icon`: 可自定义 iconfont 资源。
- 💄 `<pro>DataSet.Field`: 优化 lookupAxiosConfig、lovDefineAxiosConfig、lovQueryAxiosConfig 的相关逻辑。
- 💄 `<pro>Table`: 优化滚动条。
- 🐞 `Alert`: 修复图标不显示的问题。
- 🐞 `<pro>Form`: 修复子元素的 labelWidth 为非数字时的问题。

## 0.8.27

`2019-10-22`

- 🌟 `<pro>Form`: 子元素可设置 labelWidth 属性。
- 🐞 `<pro>Table`: 修复 ResizeObserver loop limit exceeded 错误。
- 🐞 修复循环依赖的问题。
- 🐞 `Button`: 修复 loading 图标不显示的问题。

## 0.8.26

`2019-10-21`

- 🌟 `<pro>DataSet`: 新增 autoQueryAfterSubmit 属性。
- 💄 `<pro>DataSet`: 优化提交数据回写逻辑。
- 🐞 `<pro>NumberField`: 修复步距按钮的问题。

## 0.8.25

`2019-10-19`

- 🐞 `<pro>DataSet`: 修复数据在提交之后若有回写数据但没有\_id 属性时无法回写的问题。
- 🐞 `<pro>Lov`: 修复多选 Lov 无法选值的问题。

## 0.8.24

`2019-10-18`

- 💄 `<pro>Table`: 调整 advance bar 按钮类型。

## 0.8.23

`2019-10-18`

- 💄 `<pro>Table`: 性能优化。
- 💄 `<pro>Lov`: 缓存下时不清空查询条件。
- 🐞 `<pro>Table`: 修复 advance bar 高级查询条件条显示普通查询字段的问题。
- 🐞 `<pro>Table`: 修复删除记录失败时记录无法操作的问题。
- 🐞 `<pro>DataSet`: 修复提交报错后，再次提交为缓存数据的问题。
- 🐞 `<pro>Lov`: 修复可编辑状态下无法清空值的问题。
- 🐞 `<pro>Select`: 修复多选下拉框全选导致值重复的问题。

## 0.8.22

`2019-10-17`

- 🌟 `<pro>Field`: dynamicProps 属性支持对象类型，对象为字段属性和返回该字段值的钩子的键值对。
- 🌟 `<pro>DataSet`: delete 和 deleteAll 方法 confirmMessage 参数支持传 Modal 的属性。
- 💄 `<pro>Output`: 调整在 Form 中的行间距。
- 💄 `Button`: 调整 loading 状态与 pro 的 Button 一致。
- 💄 `<pro>Modal`: 调整 confirm、info、success、error、warning 样式与基础组件的样式一致。
- 🐞 `<pro>DatePicker`: 修复 range 空值的显示问题。
- 🐞 `<pro>Table`: 修复宽度为某两个固定值之间切换时列显示不正确的问题。

## 0.8.21

`2019-10-14`

- 💄 `<pro>Lov`: 调整 Lov 弹窗的最小高度。
- 🐞 `<pro>Lov`: 修复唯一校验不显示错误的问题。
- 🐞 `<pro>Table.Column`: 修复 tooltip 属性的问题。
- 🐞 `Modal.SideBar`: 修复 closable 属性不起作用的问题。

## 0.8.20

`2019-10-13`

- 🌟 `configure`: 新增 defaultValidationMessages 全局配置。
- 🌟 `<pro>DataSet.Field`: 新增 defaultValidationMessages 属性。
- 🌟 `<pro>DataSet`: delete 和 deleteAll 方法新增 confirmMessage 参数。
- 🌟 `<pro>FormField`: 新增 validationRenderer 属性。
- 💄 `<pro>Table`: 树形表格展开状态持久化。
- 🐞 `<pro>Table`: 修复树形表格合并按钮有时无法关闭节点的问题。
- 🐞 `<pro>Validator`: 修复 unique 联合唯一校验的问题。
- 🐞 `<pro>NumberField`: 修复多选模式下步距按钮的问题。

## 0.8.19

`2019-10-11`

- 🌟 `configure`: 增加 pagination 全局配置。
- 🌟 `<pro>Select`: 增加 notFoundContent、onOption 属性。
- 💄 `<pro>FormField`: renderer 返回值支持 ReactNode。
- 💄 `<pro>Table`: 树形表格默认高亮第一条根节点记录。

## 0.8.18

`2019-10-10`

- 🌟 `<pro>Select`: 多选增加全选和取消全选按钮。
- 🐞 `<pro>Table`: 修复单元格内容为块级元素时会换行的问题。
- 🐞 `<pro>Select`: 修复加载状态不停止的问题。

## 0.8.16

`2019-10-09`

- 🌟 `<pro>Table.Column`: 新增 tooltip 属性。
- 🌟 `<pro>Select`: 新增 searchMatcher 属性。
- 🌟 `<pro>Pagination`: 新增 showSizeChangerLabel、sizeChangerPosition、sizeChangerOptionRenderer 属性。
- 🌟 `<pro>DataSet.Field`: format 属性新增 uppercase lowercase capitalize 值。
- 🌟 `<pro>DataSet.Field`: 新增 lovDefineAxiosConfig、lovQueryAxiosConfig 属性。
- 🌟 `<pro>TriggerField`: 新增 onPopupHiddenChange 属性。
- 🌟 `<pro>`: 新增日语。
- 💄 `<pro>Table`: 重构高级查询条。
- 🐞 `<pro>DataSet`: 修复 ready 方法时序不正确的问题，如 queryDataSet 未准备好时就执行了查询。
- 🐞 `<pro>Table`: 修复复合列错位的问题。
- 🐞 `<pro>DatePicker`: 修复自定义校验 range 值的问题。
- 🐞 `Radio.Button`: 修复选中样式不更新的问题。

## 0.8.15

`2019-09-27`

- 🐞 `<pro>DataSet`: 修复 dataKey 的问题。

## 0.8.14

`2019-09-26`

- 🌟 `<pro>Field`: 新增 trim 属性 。
- 🌟 `<pro>DataSet`: dataKey 和 totalKey 支持深层匹配，如 dataKey = "demo.list" 。
- 🐞 `<pro>Table`: 修复 Table querybar 的问题。
- 🐞 `<pro>Field`: 修复 float label 在 firefox 下不生效的问题。

## 0.8.13

`2019-09-26`

- 🌟 `<pro>Table`: 属性 queryBar 支持钩子类型。
- 🐞 `<pro>DataSet.Field`: 修复 dynamicProps 在某些情况不起作用的问题。

## 0.8.12

`2019-09-25`

- 🌟 `<pro>Lov`: 新增 button 模式。
- 💄 `<pro>Lov`: 多选 Lov 弹出窗中的 Table 能选中已有的值。
- 💄 `<pro>Table`: 调整 advancedBar 的间距。
- 💄 `<pro>Button`: 调整 Button 的高度为 .3rem。
- 💄 `<pro>Modal`: 更新样式。
- 🐞 `<pro>Table`: 修复隐藏列造成的问题。
- 🐞 `<pro>Table`: 修复锁定列编辑器不显示的问题。
- 🐞 `<pro>Table`: 修复切换 DataSet 后查询条值变更不会自动查询的问题。
- 🐞 `<pro>CodeArea`: 修复不受控的问题。
- 🐞 `<pro>NumberField`: 修复精度问题。
- 🐞 修复循环依赖的问题。

## 0.8.11

`2019-09-16`

- 💄 `<pro>Table`: 调整查询条的模糊条件限制只能输入一个。

## 0.8.10

`2019-09-16`

- 🐞 `Input`: 修复报错白屏的问题。
- 🐞 `<pro>DataSet`: 修复 isModified 方法的问题。

## 0.8.9

`2019-09-12`

- 🌟 升级 webpack4, babel7, eslint, stylelint。
- 🌟 `configure`: 增加全局配置新属性。
- 🌟 `<pro>DataSet`: 新增 beforeDelete 事件。
- 🌟 `<pro>DataSet.Record`: 新增 save 和 restore 方法。
- 🌟 `<pro>Table.Filter`: 优化过滤条 placeholder 文字与光标的位置，调整过滤条高度为 40px。
- 🌟 `<pro>Table`: 临时删除的行显示为禁用状态，提交失败时重置状态。
- 🌟 `<pro>Table`: 编辑器支持 SelectBox。
- 🌟 `<pro>Lov`: 增加 `conditionFieldRequired` 配置。
- 🐞 `<pro>Table`: 修复 Table 有 Column 的 lock="right"的时候，非固定和固定列之间会没有 border 的问题。
- 🐞 `<pro>Table`: 修复键盘的上下键操作时行高亮定位问题。
- 🐞 `<pro>DataSet`: 修复 dataKey 为 null 时的问题。
- 🐞 `<pro>DataSet`: 修复必须要设置 exportUrl 才能导出的问题。
- 🐞 `<pro>Form`: 修复 FormField 设了 className 时，宽度不是 100%的问题。
- 🐞 `<pro>TextField`: 修复 float label 的 autofill 及 prefix 的样式问题。
- 🐞 `<pro>DatePicker`: 修复 range 为数组时的问题。
- 🐞 `<pro>DataSet.Field`: 修复 dynamicProps 死循环的问题。

## 0.8.8

`2019-08-23`

- 🌟 `Responsive`: 新增 Responsive 组件。
- 🌟 `<pro>DataSet`: Transport 增加 exports 配置，导出的 url 拼接 axios 的 baseUrl，增加 export 事件。
- 💄 `<pro>Form`: 优化响应式。
- 🐞 `<pro>Lov`: 修复多选翻页时无法缓存选中的记录。
- 🐞 `<pro>DataSet.Record`: 修复序列化数据的问题。
- 🐞 `<pro>Table`: 优化并修复高级查询条的一些问题。
- 🐞 `<pro>Select`: 修复错误信息遮盖下拉框的问题。

## 0.8.7

`2019-08-22`

- 🐞 `<pro>IntlField`: 修复多语言必填及数据变更显示的问题。

## 0.8.6

`2019-08-21`

- 🐞 `<pro>Table`: 修复 filter bar 值变更时不会自动查询的问题。
- 🐞 `<pro>Table`: 修复 dataSet 变更时，行内编辑的问题。

## 0.8.5

`2019-08-21`

- 🌟 `configure`: 增加全局配置新属性。
- 🌟 `<pro>DataSet.Record`: toJSONData 方法增加 isCascadeSelect 参数。
- 💄 `<pro>IntlField`: 重构代码，支持直接从 Record 数据中获取多语言值。
- 🐞 `<pro>Tabs`: 修复禁用的样式问题。

## 0.8.4

`2019-08-16`

- 🌟 `configure`: 增加全局配置新属性。
- 🌟 `getConfig`: 暴露 getConfig 方法。
- 🌟 `<pro>Field`: 新增 range 属性。
- 🌟 `<pro>DatePicker`: 新增 multiple 和 range 模式。
- 🌟 `<pro>Button`: 新增 primary 颜色。
- 🌟 `<pro>Table`: 高级搜索增加重置按钮。
- 🌟 `<pro>Table.Column`: command 属性新增钩子类型。
- 🐞 `<pro>DataSet`: 修复响应值为空时报错。
- 🐞 `<pro>Tooltip`: 修复层级比下拉框低的问题。
- 🐞 `<pro>Table`: 修复 filterBar 的值不受控的问题。

## 0.8.3

`2019-08-08`

- 💄 `<pro>Popup`: 展开时与滚动同步。
- 💄 `<pro>DatePicker`: 补全国际化。
- 🐞 `<pro>SelectBox`: 修复 SelectBox 在 Form 下多选值的问题。
- 🐞 `<pro>Anchor`: 修复 getContainer 属性无效的问题。

## 0.8.2

`2019-08-06`

- 🌟 `<pro>configure`: 钩子 generatePageQuery 增加 sortName 和 sortOrder 参数。
- 🌟 `<pro>Form`: 增加 pristine 属性，用于显示记录的初始值。
- 🌟 `<pro>FormField`: 增加 pristine 属性，用于显示记录的初始值。
- 🌟 `<pro>Table`: 增加 pristine 属性，用于显示记录的初始值。
- 💄 `<pro>Range`: 更新浮动标签下的样式。
- 💄 `<pro>CheckBox`: 更新浮动标签下的样式。
- 💄 `<pro>Switch`: 更新浮动标签下的样式。
- 🐞 `<pro>Radio`: `label`替代`children`后，浮动标签布局下不渲染`label`。
- 🐞 `<pro>CheckBox`: `label`替代`children`后，浮动标签布局下不渲染`label`。

## 0.8.1

`2019-08-02`

- 🐞 `<pro>Table`: 修复 CheckBox 编辑器显示 label 的问题。

## 0.8.0

`2019-08-02`

- 🌟 `configure`: 增加全局配置新属性。
- 🌟 `<pro>Modal`: Modal 和内部注入 modal 对象增加 update 方法。
- 🌟 `<pro>Modal`: 新增 okProps, cancelProps, okFirst, border 属性。
- 🌟 `<pro>DataSet.Field`: 增加`requestTransform`和`responseTransform`输入属性。
- 🌟 `<pro>Table`: `queryBar`属性新增`advancedBar`类型。
- 🌟 `message`: 新增 placement 配置。
- 🌟 `<pro>DataSet.Record`: set 方法可以传一个键值对的对象。
- 🌟 `<pro>DataSet`: 新增 reverse、reduce、reduceRight、removeAll、deleteAll 方法。
- 🌟 `<pro>Select`: 新增`optionRenderer`输入属性。
- 💄 `Password`: 变更为通过点击揭示密码。
- 💄 `Input`: 更新样式。
- 💄 `DatePicker`: 更新样式。
- 💄 `Select`: 更新样式。
- 💄 `<pro>Form`: 优化行列合并。
- 💄 `<pro>FormField`: 更新浮动标签下的样式。
- 💄 `<pro>DataSet`: query 和 submit 事件返回值为 false 可阻止查询和提交。
- 💄 `<pro>Popup`: 提升样式 z-index。
- 💄 `SelectBox`: 更新样式（浮动标签状态下）。
- 💄 `TexaArea`: 更新样式。
- 💄 `Tabs`: 更新样式。
- 💄 `<pro>Table`: 更新`ColumnFilter`样式。
- 💄 `<pro>DataSet.Field`: 动态属性变更时只重置校验，不自动触发校验。
- 💄 `<pro>DataSet`: 取消`Validator.checkValidity`方法的缓存策略。
- 💄 `<pro>Modal`: `footer`属性支持函数类型。
- 💄 `<pro>Select`: 当没有匹配选项时，显示值，而不是自动清空值，除了级联。
- 💄 `<pro>Select`: 当可搜索且没有匹配选项时，下拉框显示`没有匹配项`。
- 💄 `<pro>DataSet.Field`: lookupAxiosConfig 支持钩子。
- 💄 `<pro>Modal`: 调整`drawer`类型的 Modal 页脚至视口底部。
- 💄 `<pro>Radio`: 没有`children`时使用`label`代替。
- 💄 `<pro>CheckBox`: 没有`children`时使用`label`代替。
- 🐞 `<pro>FormField`: 修复 label 为 ReactNode 时的问题。
- 🐞 `<pro>TextField`: 修复 TextField(和子类)使用 addon 时的 display 样式。
- 🐞 `<pro>Modal`: 修复 body 无滚动条时，Modal 弹出会影响布局的问题。
- 🐞 `<pro>Modal`: 修复在抽屉类型的`Modal`中使用浮动标签`Form`时，验证和帮助信息无法随页面滚动。
- 🐞 `<pro>FormField`: 修复多值组件的标签样式。
- 🐞 `<pro>Form`: 修复 disabled 属性无法传递给子 Form 的问题。
- 🐞 `<pro>DataSet`: 修复 Transport 的钩子没有传递 params 的问题。
- 🐞 `<pro>Lov`: 修复 Field.type 为 string 时，不显示文案的问题。
- 🐞 `<pro>SelectBox`: 修复 children 变化不渲染的问题。
- 🐞 `Modal`: 修复`SideBar`组件`width`属性无效的问题。

## 0.7.6

`2019-07-09`

- 💄 `<pro>DataSet`: 优化性能。
- 💄 `<pro>Validator`: 优化校验。
- 🐞 `<pro>Select`: 修复复合多选的 bug。
- 🐞 `<pro>Select`: 修复 searchable 情况下，两个相同文案的选项始终选择的是第一个的问题。
- 🐞 `<pro>DataSet`: 修复 Field 的 ignore 属性会忽略 bind 的字段。

## 0.7.5

## 0.6.14

`2019-06-28`

- 🐞 `<pro>TextArea`: 修复未受控值无法保留的问题。

## 0.7.3

## 0.6.12

`2019-06-27`

- 💄 `<pro>Validator`: 优化 email,url,color 在 Output 中显示的校验信息。
- 🐞 `<pro>Table`: 校验失败的下拉框重新选择值后，其他编辑器无法激活。
- 🐞 `<pro>Select`: 修复 primitive 属性的问题。

## 0.7.1

## 0.6.10

`2019-06-25`

- 🌟 `configure`: 增加全局配置新属性。
- 💄 `<pro>TextField`: 更新 labelLayout 为 float 时输入框的样式。
- 🐞 `<pro>Select`: 修复 combo 属性的 bug。
- 🐞 `Checkbox`: 修复半选样式问题。
- 🐞 `<pro>Validator`: Transport 设置 validate 时，唯一校验问题。
- 🐞 `<pro>DataSet`: 修复 Field.dirty 属性会有循环计算的问题。
- 🐞 `<pro>DataSet`: 修复 lookup 的复合值在 Output 中不显示的问题。

## 0.7.0

## 0.6.9

`2019-06-19`

- 🌟 `<pro>DataSet`: Field 新增 lookupAxiosConfig 属性，用于适配 lookup 请求的配置。
- 🌟 `configure`: 增加全局配置新属性。
- 🌟 `<pro>DataSet`: 属性 transport 支持钩子。
- 💄 `<pro>TextField`: 更新 float labelLayout 状态下，禁用时的样式。
- 💄 `<pro>Table`: 优化空数据显示。
- 🐞 `<pro>Table`: 修复过滤条 placeholder 始终显示的问题。
- 🐞 `<pro>DataSet`: 修复提交响应值为空时报错的问题。
- 🐞 `<pro>DataSet`: 修复 indexChange 触发的时机问题。
- 🐞 `<pro>DataSet`: 修复 query 事件查询参数不正确的问题。
- 🐞 `<pro>DataSet`: 修复级联子数据源数据无法提交的问题。
- 🐞 `<pro>DataSet`: 修复 ignore 为 clean 的多语言字段无法正确提交的问题。

## 0.6.8

`2019-06-13`

- 💄 `<pro>DataSet`: 查询时如果是 get 请求，自动将查询条件并入 params。
- 🐞 `<pro>Table`: 修复列的 header 属性不支持 ReactNode。

## 0.6.7

`2019-06-13`

- 🌟 `<pro>DataSet`: 属性 transport 新增 adapter 钩子属性，用于适配 CRUD 请求的配置。
- 🐞 `<pro>DataSet`: 修复 submit 方法无返回值。

## 0.6.6

`2019-06-12`

- 🌟 `<pro>DataSet`: 新增 transport 属性，用于配置 CRUD 的请求。
- 💄 `Message`: 默认 placement 属性设为 leftBottom。
- 🐞 `<pro>DatePicker`: 修复 placeholder 不显示的问题。

## 0.6.5

`2019-06-07`

- 💄 `<pro>TextField`: 更新 labelLayout 为 float 时输入框的样式。
- 💄 `<pro>DataSet`: 优化内存不释放的问题。
- 🐞 `<pro>Upload`: 修复弹窗无法关闭的问题。

## 0.6.4

`2019-05-25`

- 🌟 `<pro>FormField`: 新增 maxTagPlaceholder、maxTagCount、maxTagTextLength 属性。
- 🌟 `<pro>Field`: 新增 ignore 属性。
- 🌟 `<pro>Select`: 新增 primitiveValue 属性。
- 🌟 `<pro>Tranfer`: 新增 Transfer 组件。
- 🌟 `<pro>DataSet`: 废弃 beforeSelect 事件，新增 create 事件。
- 🌟 `Ripple`: 增加 disabled 属性，用于禁用波纹效果。
- 💄 `<pro>Table`: 优化尺寸变化时的性能。
- 💄 `Pagination`: 优化 10 页以内的分页效果。
- 💄 `<pro>Lov`: 提升 placeholder 属性优先级大于配置的 placeholder。
- 🐞 `<pro>Table`: 修复绑定的数据源新增记录时，行内编辑框不显示的问题。
- 🐞 `<pro>Select`: 在不可编辑的情况下始终显示 renderer 的值。

## 0.6.3

`2019-05-24`

- 🐞 `Tree`: 修复样式。
- 🐞 `Button`: 修复小按钮样式。

## 0.6.2

`2019-04-25`

- 🌟 `<pro>Form`: 实装 disabled 属性。
- 🌟 `<pro>TextField`: 新增 restrict 属性，用于限制可输入的字符。
- 🌟 `<pro>Table`: 新增行内编辑模式。
- 🌟 `<pro>Table`: 新增 pagination 属性。
- 🌟 `<pro>Pagination`: 新增 showTotal、showPager、itemRender 属性。
- 💄 `<pro>Table`: 优化必选和可编辑单元格的显示。
- 🐞 `<pro>Form`: 修复在有空子元素时布局的问题。
- 🐞 `<pro>Lov`: 修复配置中 lovItems 为 null 时报错的问题。
- 🐞 `<pro>NumberField`: 修复加减按钮在大于 1000 数字时结果不正确的问题。

## 0.6.1

`2019-04-18`

- 🌟 `<pro>Form`: 属性 labelLayout 新增 float 值。
- 🌟 `<pro>Table`: 弃用属性 showQueryBar，新增 queryBar 属性，可选值为`normal` `bar` `none`。
- 🌟 `<pro>Table`: 新增展开行渲染功能。
- 🌟 `<pro>Table`: 新增 onCell 用于设置单元格属性。
- 🌟 `<pro>Table`: 废弃属性 rowRenderer，新增 onRow 用于设置行属性。
- 🌟 `<pro>Lov`: 新增 searchable 属性，LovConfig 新增 editableFlag 配置，用于输入时可获取 lov 值。
- 💄 `<pro>Table`: 优化组合列。
- 🐞 `<pro>Field`: 修复属性 pattern 不支持正则常量。
- 🐞 `<pro>Lov`: 修复列序号不生效的问题。
- 🐞 `<pro>NumberField`: 修复只读时能点击加减按钮的问题。
- 🐞 `Tabs`: 修复 Tab 没有传 key 时无法切换的问题。

## 0.6.0

`2019-04-01`

- 🌟 并入`choerodon-ui/pro` 组件库。
- 🌟 默认 ant 前缀改为 c7n，如要使用 ant 前缀，请[修改主题变量@c7n-prefix](https://choerodon.github.io/choerodon-ui/docs/react/customize-theme-cn)，并使用[全局化配置](https://choerodon.github.io/choerodon-ui/components/configure-cn)。

## 0.5.7

`2019-04-26`

- 🐞 `Icon`: 修复图标尺寸问题。

## 0.5.6

`2019-04-25`

- 🌟 `Icon`: 增加新的图标。

## 0.5.5

`2019-04-20`

- 🐞 修复 0.5.4 发布文件错乱的问题。

## 0.5.4 (deprecated)

`2019-04-19`

- 🌟 `Icon`: 增加新的图标。

## 0.5.3

`2019-03-20`

- 💄 `Input`: Input 输入到达字符限制时显示提示。
- 🌟 `Modal`: Modal 添加 disableOk 和 disableCancel 属性。
- 🌟 `TreeNode`: TreeNode 添加 wrapper 属性。
- 🌟 `Icon`: 增加新的图标。
- 🌟 `IconSelect`: 增加 showAll 属性。

## 0.5.2

`2019-02-22`

- 💄 `Table`: 修复 Table 中过滤的确认按钮固定在选择框底部样式被覆盖。
- 🌟 `Sidebar`: 增加属性 alwaysCanCancel。

## 0.5.1

`2019-02-19`

- 💄 `Form.Item`: Form.Item 验证为 error 时不隐藏后缀图标。
- 💄 `Table`: Table 过滤失去焦点后不清空。
- 💄 `Table`: Table 过滤的清空 icon 在有内容时就显示。
- 💄 `Table`: Table 中过滤的确认按钮固定在选择框底部。
- 🌟 `Icon`: 增加新的图标。

## 0.5.0

`2019-01-10`

- 更改图标字体文件的来源，更改为从 npm 库中获取并打包到本地。
- 💄 `IconSelect`: 优化了图标选择器，图标更大，且只保留常用图标.
- 💄 `table`: 优化 table 翻页时自动回到第一条元素

## 0.4.5

`2018-12-11`

- 🌟 `Icon`: 增加新的图标。
- 💄 `Select`: select 全选和无更改为不对禁用的选项生效

## 0.4.4

`2018-12-3`

- 💄 `Menu`: 修复了一个依赖错误。

## 0.4.3

`2018-11-29`

- 🌟 `Select`: 增加`onPopupFocus`，在下拉弹出框被 focus 时调用。
- 💄 `Select`: select 搜索框内可以使用上下选择然后回车确定。
- 💄 `Select`: 多选框：删除标签，不打开 select 弹框。
- 💄 `Select`: 去除 select 中标签悬停后的 title 信息。
- 💄 `Menu`: 升级 rc-menu 组件为社区版。

## 0.4.2

`2018-11-13`

- 🌟 `Icon`: 增加新的图标。
- 🌟 `Table`: 增加`noFilters`，用于阻止默认的过滤筛选功能。
- 🌟 `Table.Column`: 增加`disableClick`, 用于 `Table` 筛选项禁用勾选。
- 💄 `Tag`: 修复热门标签显示问题。
- 💄 `Select`: Select 全选和无的逻辑优化。

## 0.4.1

`2018-10-26`

- 🌟 `Icon`: 增加新的图标。
- 🌟 `Table`: 增加 onColumnFilterChange，在表格列过滤器变化时触发。
- 💄 `Demo`: 修复使用 bisheng 生成的文档网站无法展开样例代码的 bug。
- 💄 `Avatar`: 修复头像中文字定位不准确。

## 0.4.0

`2018-09-28`

- 🌟 `Select`: select 有 maxTagCount 且超出限制时显示的标签可以自定样式,且去除默认的背景颜色。
- 💄 `Input`: 修复 input 的 showLengthInfo 为 false 时在某些情况下仍显示字数限制信息的问题。
- 💄 `Select`: 回滚 select 的部分样式至 0.3.4 版本。

## 0.3.10

`2018-09-14`

- 🌟 `List`: List 添加`empty`属性。
- 🌟 `Table`: Table 添加`empty`属性。
- 🌟 `Icon`: 增加新的图标。
- 💄 `Select`: 修复 Select 使用方向键选择时样式缺失的 bug。
- 💄 `Cascader`: 级联选择器 修复样式问题。
- 💄 `Table`: 修复可编辑单元格示例无法编辑单元格的 bug。

## 0.3.9

`2018-09-07`

- 🌟 `Icon`: 增加新的图标。
- 🌟 `Card`: Card 添加`onHeadClick`属性。
- 💄 `Input`: 修复 input 有字数限制且在 formitem 中存在验证时 formitem 之间上下间距不对。
- 💄 `Sidebar`: 修复 Sidebar 没有`getContainer`属性的 bug。

`2018-09-04`

- 🌟 `Input`: Input 添加`showPasswordEye`属性用来控制显示密码的控件。
- 💄 `IconSelect`: IconSelect 现在的搜索不区分大小写了。

## 0.3.8

`2018-08-31`

- 🌟 `Icon`: 增加新的图标。。
- 💄 `Input`: Input 和 select 在 compact 模式和正常模式下都能对齐了。
- 💄 `FormItem`: 表单输入框带有字数限制时，优化为报错提示时报错信息与横线无间距，且隐藏字数限制提示。

## 0.3.7

- 💄 `Table`: 样式修改
- 💄 `Input`: input 框禁用时 hover 上去显示默认禁用图标
- 💄 `Spin`: 修复加载图标未置于顶层的问题。

## 0.3.6

`2018-08-16`

- 🌟 `Icon`: 增加新的图标。

## 0.3.5

`2018-08-03`

- 💄 `Switch`: 样式修改。
- 🌟 `Icon`: 增加新的图标。

## 0.3.4

`2018-07-19`

- 🌟 `Icon`: 增加新的图标。

## 0.3.3

`2018-07-06`

- 🌟 `Select`: 增加 `onChoiceRemove` 属性。
- 🌟 `Input`: 增加 `showLengthInfo` 属性。
- 🌟 `Modal`: 增加 `center` 属性。
- 💄 `Select`: 样式调整。
- 💄 `Tree`: 样式调整。
- 💄 `Modal.Sidebar`: 样式调整。
- 💄 `InputNumber`: 样式调整。
- 💄 `Select`: 实现 `filterInput` 自动获取焦点。
- 🐞 `Table`: 修复 `onChange` 返回值错误.
- 🐞 `Select`: 修复点击下拉按钮不能触发 focus.
- 🐞 `Table`: 修复过滤框无法弹出默认过滤内容.

## 0.3.2

`2018-06-28`

- 🌟 `Icon`: 增加新的图标。
- 🌟 `Form`: 增加 `isModifiedFields` `isModifiedField` 方法。
- 💄 `Table`: 排序图标样式调整。
- 💄 `Select` `Input` `Radio` `DatePicker`: 样式调整。

## 0.3.1

`2018-06-08`

- 🐞 `Table`: 修复列选择下拉框一直会处于 loading 状态。

## 0.3.0

`2018-06-08`

- 🌟 `Select`: 增加 loading 属性。
- 💄 `Collapse`:修改 icon 图标样式。
- 💄 `Modal`: 调整 footer 的 button 样式。
- 🌟 增加 `IconSelect` 组件。
- 💄 `Table`: 调整 `FilterSelect` 功能。
- 💄 `Table`: 调整弹出窗位置。

## 0.2.4

`2018-06-01`

- 💄 `Select`: 调整 icon 样式。
- 💄 `Input`: 调整 icon 样式。
- 🌟 `Icon`: 增加新的图标。

## 0.2.2

`2018-05-31`

- 💄 `Radio`: 禁用样式调整。
- 💄 `Pagination`: 下选框样式调整。
- 💄 `Select`: 多选样式调整。
- 🐞 `Select`: 修复没有数据时不能选中输入值。

## 0.2.1

`2018-05-28`

- 💄 `Select`: 多选样式调整。

## 0.2.0

`2018-05-18`

- 🌟 迁移至 npmjs

## 0.1.11

`2018-05-15`

- 💄 `Button`: 调整禁用时的背景色。
- 💄 `Modal.Sidebar`: title 样式调整。

## 0.1.10

`2018-05-14`

- 🐞 `Table`: 修正过滤条删除选中值时会影响当前`state`的`filteredValue`值。
- 💄 `Select`: 禁用时样式调整。

## 0.1.9

`2018-05-13`

- 💄 `Form`: 调整校验反馈时的图标。
- 💄 `Popover`: 调整图标。
- 🐞 `Table`: 修正当`column`的 `filters` 属性中 `value` 不是字符串时，过滤条选中的值显示错误。
- 🌟 `Table`: `column` 增加 `filterTitle` 属性。

## 0.1.8

`2018-05-12`

- 🐞 `Table`: 修正当`childrenColumnName`属性不是`children`，所有数据中第一层的选择框禁用而其他数据的选择框是启用的时候, 全选选择框为禁用状态。
- 🐞 `Select`: Form 下全选拿不到值。

## 0.1.7

`2018-05-12`

- 💄 `Icon`: 样式属性 font-weight 改为 inherit。
- 🐞 `Select`: 查询过后再次打开下拉框不能重查。

## 0.1.6

`2018-05-11`

- 💄 `Pagination`: 样式调整。
- 💄 `Modal.Sidebar`: content 滚动。
- 💄 `Select`: 样式调整。
- 🌟 `Select`: 增加 choiceRender 属性。

## 0.1.5

`2018-05-10`

- 🐞 `Ripple`: 修复引用 Ripple 的组件的样式依赖。
- 🐞 `Icon`: 修复不同字体大小下的图标尺寸不自适应。
- 🌟 `Checkbox`: 增加 label 属性。
- 🌟 `Radio`: 增加 label 属性。
- 💄 `Select`: 对于 label 不存在时的调整。
- 🐞 `Input`: 默认值和 label 重叠。

## 0.1.4

`2018-05-08`

- 🐞 `Ripple`: 修正内部节点的样式属性 position 为 static 时的错误。

## 0.1.3

`2018-05-07`

- 🌟 `Model.Sidebar`: 新增 footer
- 💄 `Spin`: 调整旋转效果
- 🐞 `Table`: 修正过滤条无法过滤 Column 没有 dataindex 属性时数据的错误

## 0.1.2

`2018-05-03`

- 🌟 `Pagination`: 新增`tiny`属性，用于 Table 风格的分页
- 💄 `Tab`: 调整 icon
- 🐞 `Table`: 修复过滤条选择的值的问题
- 🐞 `Ripple`: 修复子节点 style 的问题
- 🌟 `Icon`: 新增 icon 样式
- 🐞 `Input`: 前后缀问题

## 0.1.1

`2018-05-02`

- Table
  - 🌟 `FilterBar`: 新增设置`column.filterMultiple`可多选功能。
  - 🐞 `FilterBar`: 修复列过滤的问题。
  - 🐞 修复展开图标不按中心旋转的问题。
- 🐞 `Modal.Sidebar`: 按钮 loading 状态显示问题。

## 0.1.0

`2018-04-28`

- 💄 `Ripple`: 优化并抽象成组件.
- 🐞 `Select`: 修复内容超长显示问题。
- 💄 `Table`: 调整行的展开图标。
- 💄 `Table`: 当列的`filters`为空数组时，`filterBar`也能显示可选列。

## 0.0.5

`2018-04-26`

- 💄 调整 Table 行的展开图标。
- 🐞 修复 rc-components 在 IE9 下的 bug.
- 🌟 message 新增 `placement` 用于消息位置。
- 🌟 message.config 新增 `bottom`。
- 🌟 Select 新增 `footer`。

## 0.0.4

`2018-04-25`

- 💄 调整 Table 的 filter bar，默认不能有 OR 逻辑。
- 💄 调整 Select 组件清除图标样式。
- 🌟 Modal 新增 `funcType` 用于按钮功能。

## 0.0.3

`2018-04-24`

- 🐞 修复 Form 的 Input 组件赋值问题。
- 🐞 修复 Select 组件主题样式兼容问题。
- 🐞 修复 Input 组件主题样式兼容问题。
- 🐞 修复 AutoComplete 组件主题样式兼容问题。
- 💄 调整 Radio 组件主题样式。
- 💄 调整 Upload 组件主题样式。
- 💄 调整 Dropdown 组件弹出位置。
- 💄 调整 Button 组件 loading 样式。

## 0.0.2

`2018-04-20`

- 🐞 修复 `rc-components` 各组件未引入的依赖。
- 🐞 修复 Table 的 filterBar 的问题。
- 💄 调整 Button 组件主题样式。
- 💄 调整 Menu 组件主题样式。
- 💄 调整 Modal 组件主题样式。
- 💄 调整 Progress 组件主题样式。
- 💄 调整 Select 组件主题样式。
- 💄 调整 Input 组件主题样式。
- 🌟 Progress 的 `type` 属性新增 `loading` 值。
- 🌟 新增 Modal.SideBar 组件。
- 🌟 Input 新增 `copy` 和 `onCopy` 用于复制。

## 0.0.1

`2018-04-11`

- Table
  - 🌟 新增 `filterBar` 用于开启过滤条功能。
  - 🌟 新增 `filters` 用于控制过滤条已选过滤条件。
- 🌟 各表单控件 新增 `label` 用于显示浮动文字。
- 💄 调整各组件主题样式。

## 0.0.0

`2018-04-01`

- 🌟 基于 [Ant Design@3.4.0](https://github.com/ant-design/ant-design/blob/master/CHANGELOG.zh-CN.md#340)
