/*!
    *
    * Wijmo Library 5.20213.834
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
declare module wijmo.knockout {
    function softChart(): typeof wijmo.chart;
    function softChartAnalytics(): typeof wijmo.chart.analytics;
    function softChartAnimation(): typeof wijmo.chart.animation;
    function softChartAnnotation(): typeof wijmo.chart.annotation;
    function softChartFinance(): typeof wijmo.chart.finance;
    function softChartFinanceAnalytics(): typeof wijmo.chart.finance.analytics;
    function softChartHierarchical(): typeof wijmo.chart.hierarchical;
    function softChartInteraction(): typeof wijmo.chart.interaction;
    function softChartRadar(): typeof wijmo.chart.radar;
    function softChartMap(): typeof wijmo.chart.map;
    function softGauge(): typeof wijmo.gauge;
    function softGrid(): typeof wijmo.grid;
    function softGridDetail(): typeof wijmo.grid.detail;
    function softGridFilter(): typeof wijmo.grid.filter;
    function softGridGrouppanel(): typeof wijmo.grid.grouppanel;
    function softGridSearch(): typeof wijmo.grid.search;
    function softGridMultirow(): typeof wijmo.grid.multirow;
    function softGridSheet(): typeof wijmo.grid.sheet;
    function softGridTransposed(): typeof wijmo.grid.transposed;
    function softGridTransposedMultiRow(): typeof wijmo.grid.transposedmultirow;
    function softGridImmutable(): typeof wijmo.grid.immutable;
    function softNav(): typeof wijmo.nav;
    function softOlap(): typeof wijmo.olap;
    function softViewer(): typeof wijmo.viewer;
    function softInput(): typeof wijmo.input;
    function softBarcode(): typeof wijmo.barcode;
    function softBarcodeCommon(): typeof wijmo.barcode.common;
    function softBarcodeComposite(): typeof wijmo.barcode.composite;
    function softBarcodeSpecialized(): typeof wijmo.barcode.specialized;
}
declare module wijmo.knockout {
    class ControlMetaFactory {
        static CreateProp(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDescBase;
        static CreateEvent(eventName: string, isPropChanged?: boolean): EventDescBase;
        static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDescBase;
        static findProp(propName: string, props: PropDescBase[]): PropDescBase;
        static findEvent(eventName: string, events: EventDescBase[]): EventDescBase;
        static findComplexProp(propName: string, props: ComplexPropDescBase[]): ComplexPropDescBase;
        static getMetaData(metaDataId: any): MetaDataBase;
        static getClassName(classRef: any): string;
        static toCamelCase(s: any): any;
        private static findInArr;
    }
    class PropDescBase {
        private _propertyName;
        private _propertyType;
        private _changeEvent;
        private _enumType;
        private _isNativeControlProperty;
        private _priority;
        constructor(propertyName: string, propertyType: PropertyType, /*bindingMode: BindingMode = BindingMode.OneWay*/ changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number);
        readonly propertyName: string;
        readonly propertyType: PropertyType;
        readonly changeEvent: string;
        readonly enumType: any;
        readonly bindingMode: BindingMode;
        readonly isNativeControlProperty: boolean;
        readonly priority: number;
        readonly shouldUpdateSource: boolean;
        initialize(options: any): void;
        castValueToType(value: any): any;
        private _parseDate;
    }
    enum PropertyType {
        Boolean = 0,
        Number = 1,
        Date = 2,
        String = 3,
        AnyPrimitive = 4,
        Enum = 5,
        Function = 6,
        EventHandler = 7,
        Any = 8
    }
    function isSimpleType(type: PropertyType): boolean;
    enum BindingMode {
        OneWay = 0,
        TwoWay = 1
    }
    class EventDescBase {
        private _eventName;
        private _isPropChanged;
        constructor(eventName: string, isPropChanged?: boolean);
        readonly eventName: string;
        readonly isPropChanged: boolean;
    }
    class ComplexPropDescBase {
        propertyName: string;
        isArray: boolean;
        private _ownsObject;
        constructor(propertyName: string, isArray: boolean, ownsObject?: boolean);
        readonly ownsObject: boolean;
    }
    class MetaDataBase {
        private _props;
        private _events;
        private _complexProps;
        parentProperty: string;
        isParentPropertyArray: boolean;
        ownsObject: boolean;
        parentReferenceProperty: string;
        ngModelProperty: string;
        constructor(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[], parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean, parentReferenceProperty?: string, ngModelProperty?: string);
        props: PropDescBase[];
        events: EventDescBase[];
        complexProps: ComplexPropDescBase[];
        add(props: PropDescBase[], events?: EventDescBase[], complexProps?: ComplexPropDescBase[], parentProperty?: string, isParentPropertyArray?: boolean, ownsObject?: boolean, parentReferenceProperty?: string, ngModelProperty?: string): MetaDataBase;
        addOptions(options: any): this;
        prepare(): void;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    class MetaFactory extends ControlMetaFactory {
        static CreateProp(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDesc;
        static CreateEvent(eventName: string, isPropChanged?: boolean): EventDesc;
        static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDesc;
        static findProp(propName: string, props: PropDesc[]): PropDesc;
        static findEvent(eventName: string, events: EventDesc[]): EventDesc;
        static findComplexProp(propName: string, props: ComplexPropDesc[]): ComplexPropDesc;
    }
    interface IUpdateControlHandler {
        (link: any, propDesc: PropDesc, control: any, unconvertedValue: any, convertedValue: any): boolean;
    }
    class PropDesc extends PropDescBase {
        updateControl: IUpdateControlHandler;
    }
    class EventDesc extends EventDescBase {
    }
    class ComplexPropDesc extends ComplexPropDescBase {
    }
}
declare module wijmo.knockout {
    class WjBinding {
        static _wjContextProp: string;
        static _parPropAttr: string;
        static _controlPropAttr: string;
        static _initPropAttr: string;
        static _initEventAttr: string;
        _metaData: MetaDataBase;
        init: any;
        update: any;
        ensureMetaData(): void;
        _initialize(): void;
        _getControlConstructor(): any;
        _getMetaDataId(): any;
        _createControl(element: any): any;
        _createWijmoContext(): WjContext;
        _isChild(): boolean;
        _isParentInitializer(): boolean;
        _isParentReferencer(): boolean;
        private _initImpl;
        private _updateImpl;
    }
    class WjContext {
        element: any;
        valueAccessor: any;
        allBindings: any;
        viewModel: any;
        bindingContext: any;
        control: any;
        wjBinding: WjBinding;
        parentWjContext: WjContext;
        private _parentPropDesc;
        private _isInitialized;
        private static _debugId;
        constructor(wjBinding: WjBinding);
        init(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): any;
        update(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): void;
        _createControl(): any;
        _initControl(): void;
        _childrenInitialized(): void;
        private _addEventHandler;
        private static _isUpdatingSource;
        private static _pendingSourceUpdates;
        _updateSource(): void;
        private _isUpdatingControl;
        private _isSourceDirty;
        private _oldSourceValues;
        private _updateControl;
        private _castValueToType;
        _safeUpdateSrcAttr(attrName: string, value: any): void;
        _safeNotifySrcAttr(attrName: string): void;
        private _isChild;
        private _isParentInitializer;
        private _isParentReferencer;
        private _getParentProp;
        private _getParentReferenceProperty;
        private _useParentObj;
        private _isParentArray;
        private _parentInCtor;
    }
    class WjTagsPreprocessor {
        private static _getSpecialProps;
        private static _specialProps;
        private static _dataBindAttr;
        private static _wjTagPrefix;
        private _foreignProc;
        register(): void;
        preprocessNode(node: any): any;
        private _delegate;
        private _isWjTag;
        private _isWjProp;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    class WjDropDownBinding extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link ComboBox} control.
     *
     * Use the {@link wjComboBox} binding to add {@link ComboBox} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a ComboBox control:&lt;/p&gt;
     * &lt;div data-bind="wjComboBox: {
     *   itemsSource: countries,
     *   text: theCountry,
     *   isEditable: false,
     *   placeholder: 'country' }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjComboBox</b> binding supports all read-write properties and events of
     * the {@link ComboBox} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>isDroppedDown</b></li>
     * 	<li><b>text</b></li>
     * 	<li><b>selectedIndex</b></li>
     * 	<li><b>selectedItem</b></li>
     * 	<li><b>selectedValue</b></li>
     * </ul>
     */
    class wjComboBox extends WjDropDownBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link AutoComplete} control.
     *
     * Use the {@link wjAutoComplete} binding to add {@link AutoComplete} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is an AutoComplete control:&lt;/p&gt;
     * &lt;div data-bind="wjAutoComplete: {
     *   itemsSource: countries,
     *   text: theCountry,
     *   isEditable: false,
     *   placeholder: 'country' }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjAutoComplete</b> binding supports all read-write properties and events of
     * the {@link AutoComplete} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>isDroppedDown</b></li>
     * 	<li><b>text</b></li>
     * 	<li><b>selectedIndex</b></li>
     * 	<li><b>selectedItem</b></li>
     * 	<li><b>selectedValue</b></li>
     * </ul>
     */
    class wjAutoComplete extends wjComboBox {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link Calendar} control.
     *
     * Use the {@link wjCalendar} binding to add {@link Calendar} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Calendar control:&lt;/p&gt;
     * &lt;div
     *   data-bind="wjCalendar: { value: theDate }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjCalendar</b> binding supports all read-write properties and events of
     * the {@link Calendar} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>value</b></li>
     * 	<li><b>displayMonth</b></li>
     * </ul>
     */
    class wjCalendar extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link ColorPicker} control.
     *
     * Use the {@link wjColorPicker} binding to add {@link ColorPicker} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a ColorPicker control:&lt;/p&gt;
     * &lt;div
     *   data-bind="wjColorPicker: { value: theColor }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjColorPicker</b> binding supports all read-write properties and events of
     * the {@link ColorPicker} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>value</b></li>
     * </ul>
     */
    class wjColorPicker extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link ListBox} control.
     *
     * Use the {@link wjListBox} binding to add {@link ListBox} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a ListBox control:&lt;/p&gt;
     * &lt;div data-bind="wjListBox: {
     *   itemsSource: countries,
     *   selectedItem: theCountry }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjListBox</b> binding supports all read-write properties and events of
     * the {@link ListBox} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>selectedIndex</b></li>
     * 	<li><b>selectedItem</b></li>
     * 	<li><b>selectedValue</b></li>
     * </ul>
     */
    class wjListBox extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link Menu} control.
     *
     * Use the {@link wjMenu} binding to add {@link Menu} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Menu control used as a value picker:&lt;/p&gt;
     * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
     *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
     *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjMenu</b> binding may contain the following child bindings: {@link wjMenuItem}, {@link wjMenuSeparator}.
     *
     * The <b>wjMenu</b> binding supports all read-write properties and events of
     * the {@link Menu} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>isDroppedDown</b></li>
     * 	<li><b>text</b></li>
     * 	<li><b>selectedIndex</b></li>
     * 	<li><b>selectedItem</b></li>
     * 	<li><b>selectedValue</b></li>
     *  <li><b>value</b></li>
     * </ul>
     */
    class wjMenu extends wjComboBox {
        _getControlConstructor(): any;
        _createWijmoContext(): WjContext;
        _initialize(): void;
        private _updateControlValue;
    }
    class WjMenuContext extends WjContext {
        _initControl(): void;
        _childrenInitialized(): void;
        _updateHeader(): void;
    }
    /**
     * KnockoutJS binding for menu items.
     *
     * Use the {@link wjMenuItem} binding to add menu items to a {@link Menu} control.
     * The {@link wjMenuItem} binding must be contained in a {@link wjMenu} binding.
     * For example:
     *
     * <pre>&lt;p&gt;Here is a Menu control with four menu items:&lt;/p&gt;
     * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
     *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjMenuItem</b> binding supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>cmd</dt>       <dd>Function to execute in the controller when the item is clicked.</dd>
     *   <dt>cmdParam</dt>  <dd>Parameter passed to the <b>cmd</b> function when the item is clicked.</dd>
     *   <dt>value</dt>     <dd>Value selected when the item is clicked (use either this or <b>cmd</b>).</dd>
     * </dl class="dl-horizontal">
     */
    class wjMenuItem extends WjBinding {
        _getMetaDataId(): any;
        _createWijmoContext(): WjContext;
        _initialize(): void;
    }
    class WjMenuItemContext extends WjContext {
        _createControl(): any;
    }
    /**
     * KnockoutJS binding for menu separators.
     *
     * The the {@link wjMenuSeparator} adds a non-selectable separator to a {@link Menu} control, and has no attributes.
     * It must be contained in a {@link wjMenu} binding. For example:
     *
     * <pre>&lt;p&gt;Here is a Menu control with four menu items and one separator:&lt;/p&gt;
     * &lt;div data-bind="wjMenu: { value: tax, header: 'Tax' }"&gt;
     *     &lt;span data-bind="wjMenuItem: { value: 0 }"&gt;Exempt&lt;/span&gt;
     *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .05 }"&gt;5%&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .1 }"&gt;10%&lt;/span&gt;
     *     &lt;span data-bind="wjMenuItem: { value: .15 }"&gt;15%&lt;/span&gt;
     * &lt;/div&gt;</pre>
     */
    class wjMenuSeparator extends WjBinding {
        _getMetaDataId(): any;
        _initialize(): void;
        _createControl(element: any): any;
    }
    /**
     * KnockoutJS binding for context menus.
     *
     * Use the {@link wjContextMenu} binding to add context menus to elements
     * on the page. The {@link wjContextMenu} binding is based on the  {@link wjMenu};
     * it displays a popup menu when the user performs a context menu
     * request on an element (usually a right-click).
     *
     * The wjContextMenu binding is specified as a parameter added to the
     * element that the context menu applies to. The parameter value is a
     * CSS selector for the element that contains the menu. For example:
     *
     * <pre>&lt;!-- paragraph with a context menu --&gt;
     *&lt;p data-bind="wjContextMenu: { id: '#idMenu'}" &gt;
        *  This paragraph has a context menu.&lt;/p&gt;
        *
        *&lt;!-- define the context menu (hidden and with an id) --&gt;
        * &lt;div id="contextmenu" data-bind="wjMenu: { header: 'File', itemClicked: menuItemClicked}"&gt;
        *     &lt;span data-bind="wjMenuItem: {}"&gt;New&lt;/span&gt;
        *     &lt;span data-bind="wjMenuItem: {}"&gt;open an existing file or folder&lt;/span&gt;
        *     &lt;span data-bind="wjMenuItem: {}"&gt;save the current file&lt;/span&gt;
        *     &lt;span data-bind="wjMenuSeparator: {}"&gt;&lt;/span&gt;
        *     &lt;span data-bind="wjMenuItem: {}"&gt;exit the application&lt;/span&gt;
        * &lt;/div&gt;</pre>
        */
    class wjContextMenu extends WjBinding {
        _getMetaDataId(): any;
        _createControl(element: any): any;
        _createWijmoContext(): WjContext;
    }
    class WjContextMenuContext extends WjContext {
        _initControl(): void;
    }
    /**
     * KnockoutJS binding for the {@link InputDate} control.
     *
     * Use the {@link wjInputDate} binding to add {@link InputDate} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is an InputDate control:&lt;/p&gt;
     * &lt;div data-bind="wjInputDate: {
     *   value: theDate,
     *   format: 'M/d/yyyy' }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjInputDate</b> binding supports all read-write properties and events of
     * the {@link InputDate} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>isDroppedDown</b></li>
     * 	<li><b>text</b></li>
     * 	<li><b>value</b></li>
     * </ul>
     */
    class wjInputDate extends WjDropDownBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link InputDateTime} control.
     *
     * Use the {@link wjInputDateTime} binding to add {@link InputDateTime} controls to your
     * KnockoutJS applications.
     *
     * The <b>wjInputDateTime</b> binding supports all read-write properties and events of
     * the {@link InputDateTime} control.
     */
    class wjInputDateTime extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link InputNumber} control.
     *
     * Use the {@link wjInputNumber} binding to add {@link InputNumber} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is an InputNumber control:&lt;/p&gt;
     * &lt;div data-bind="wjInputNumber: {
     *   value: theNumber,
     *   min: 0,
     *   max: 10,
     *   format: 'n0',
     *   placeholder: 'number between zero and ten' }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjInputNumber</b> binding supports all read-write properties and events of
     * the {@link InputNumber} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>value</b></li>
     * 	<li><b>text</b></li>
     * </ul>
     */
    class wjInputNumber extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link InputMask} control.
     *
     * Use the {@link wjInputMask} binding to add {@link InputMask} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is an InputMask control:&lt;/p&gt;
     * &lt;div data-bind="wjInputMask: {
     *   mask: '99/99/99',
     *   promptChar: '*' }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjInputMask</b> binding supports all read-write properties and events of
     * the {@link InputMask} control. The <b>value</b> property provides two-way binding mode.
     */
    class wjInputMask extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link InputTime} control.
     *
     * Use the {@link wjInputTime} binding to add {@link InputTime} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is an InputTime control:&lt;/p&gt;
     * &lt;div data-bind="wjInputTime: {
     *   min: new Date(2014, 8, 1, 9, 0),
     *   max: new Date(2014, 8, 1, 17, 0),
     *   step: 15,
     *   format: 'h:mm tt',
     *   value: theDate }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjInputTime</b> binding supports all read-write properties and events of
     * the {@link InputTime} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>isDroppedDown</b></li>
     * 	<li><b>text</b></li>
     * 	<li><b>selectedIndex</b></li>
     * 	<li><b>selectedItem</b></li>
     * 	<li><b>selectedValue</b></li>
     *  <li><b>value</b></li>
     * </ul>
     */
    class wjInputTime extends wjComboBox {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link InputColor} control.
     *
     * Use the {@link wjInputColor} binding to add {@link InputColor} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a InputColor control:&lt;/p&gt;
     * &lt;div
     *   data-bind="wjInputColor: { value: theColor }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjInputColor</b> binding supports all read-write properties and events of
     * the {@link InputColor} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>isDroppedDown</b></li>
     * 	<li><b>text</b></li>
     * 	<li><b>value</b></li>
     * </ul>
     */
    class wjInputColor extends WjDropDownBinding {
        _getControlConstructor(): any;
    }
    class WjCollectionViewBaseBinding extends WjBinding {
        _createControl(element: any): any;
        _createWijmoContext(): WjContext;
        _getTemplate(): string;
    }
    class WjCollectionViewContext extends WjContext {
        private _localVM;
        private _emptyCV;
        init(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): any;
        update(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): void;
        private _subscribeToCV;
        private _unsubscribeFromCV;
        private _forceBindingsUpdate;
    }
    /**
     * KnockoutJS binding for an {@link ICollectionView} pager element.
     *
     * Use the {@link wjCollectionViewPager} directive to add an element that allows users to
     * navigate through the pages in a paged {@link ICollectionView}. For example:
     *
     * <pre>Here is a CollectionViewPager:&lt;/p&gt;
     * &lt;div
     *   data-bind="wjCollectionViewPager: { cv: myCollectionView }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The {@link wjCollectionViewPager} directive has a single attribute:
     *
     * <dl class="dl-horizontal">
     *   <dt>cv</dt>  <dd>Reference to the paged {@link ICollectionView} object to navigate.</dd>
     * </dl>
     */
    class wjCollectionViewPager extends WjCollectionViewBaseBinding {
        _getMetaDataId(): any;
        _getTemplate(): string;
    }
    /**
     * KnockoutJS binding for an {@link ICollectionView} navigator element.
     *
     * Use the {@link wjCollectionViewNavigator} directive to add an element that allows users to
     * navigate through the items in an {@link ICollectionView}. For example:
     *
     * <pre>Here is a CollectionViewNavigator:&lt;/p&gt;
     * &lt;div
     *   data-bind="wjCollectionViewNavigator: { cv: myCollectionView }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The {@link wjCollectionViewNavigator} directive has a single attribute:
     *
     * <dl class="dl-horizontal">
     *   <dt>cv</dt>  <dd>Reference to the {@link ICollectionView} object to navigate.</dd>
     * </dl>
     */
    class wjCollectionViewNavigator extends WjCollectionViewBaseBinding {
        _getMetaDataId(): any;
        _getTemplate(): string;
    }
    /**
     * KnockoutJS binding for the {@link MultiSelect} control.
     *
     * Use the {@link wjMultiSelect} binding to add {@link MultiSelect} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a MultiSelect control:&lt;/p&gt;
     * &lt;div data-bind="MultiSelect: {
     *   itemsSource: countries,
     *   isEditable: false,
     *   headerFormat: '{count} countries selected' }"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjMultiSelect</b> binding supports all read-write properties and events of
     * the {@link MultiSelect} control. The following properties provide two-way binding mode:
     * <ul>
     * 	<li><b>isDroppedDown</b></li>
     * 	<li><b>text</b></li>
     * 	<li><b>selectedIndex</b></li>
     * 	<li><b>selectedItem</b></li>
     * 	<li><b>selectedValue</b></li>
     * </ul>
     */
    class wjMultiSelect extends wjComboBox {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link MultiAutoComplete} control.
     *
     * Use the {@link wjMultiAutoComplete} binding to add {@link MultiAutoComplete} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a MultiAutoComplete control:&lt;/p&gt;
     * &lt;div data-bind="MultiAutoComplete: {
     *   itemsSource: countries,
     *   maxSelectedItems: 4,}"&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjMultiAutoComplete</b> binding supports all read-write properties and events of
     * the {@link MultiAutoComplete} control.
     */
    class wjMultiAutoComplete extends wjAutoComplete {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link Popup} control.
     *
     * Use the {@link wjPopup} binding to add {@link Popup} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Popup control triggered by a button:&lt;/p&gt;
     * &lt;button id="btn2" type="button"&gt;
     *     Click to show Popup
     * &lt;/button&gt;
     *  &lt;div class="popover" data-bind="wjPopup: {
     *       control: popup,
     *       owner: '#btn2',
     *       showTrigger: 'Click',
     *       hideTrigger: 'Click'}"
     *  &gt;
     *	&lt;h3&gt;
        *		 Salutation
        *	&lt;/h3&gt;
        *	 &lt;div class="popover-content"&gt;
        *	 	    Hello {&#8203;{firstName}} {&#8203;{lastName}}
        *	 &lt;/div&gt;
        * &lt;/div&gt;</pre>
        */
    class wjPopup extends WjBinding {
        _getControlConstructor(): any;
        _createWijmoContext(): WjContext;
        _initialize(): void;
    }
    class WjPopupContext extends WjContext {
        _initControl(): void;
        _updateModal(convertedValue: any): void;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
         * KnockoutJS binding for the {@link TreeView} object.
         * Use the {@link wjTreeView} binding to add {@link TreeView} controls to your
         * KnockoutJS applications. For example:
         *  &lt;div data-bind="wjTreeView:
         *      {
         *          itemsSource: data
         *          displayMemberPath:'header'
         *          childItemsPath:'items'
         *      }"&gt;
         *  &lt;/div&gt;
         *
         * The <b>wjTreeView</b> binding supports all read-write properties and events of
         * the {@link TreeView} class.
         *
         */
    class wjTreeView extends WjBinding {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    class WjFlexChartBaseBinding extends WjBinding {
        _getControlConstructor(): any;
        _initialize(): void;
    }
    /**
     * KnockoutJS binding for the {@link FlexChart} control.
     *
     * Use the {@link wjFlexChart} binding to add {@link FlexChart} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a FlexChart control:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: data }"&gt;
     *     &lt;div data-bind="wjFlexChartLegend : {
     *         position: 'Top' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartAxis: {
     *         wjProperty: 'axisX',
     *         title: chartProps.titleX }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartAxis: {
     *         wjProperty: 'axisY',
     *         majorUnit: 5000 }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: {
     *         name: 'Sales',
     *         binding: 'sales' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: {
     *         name: 'Expenses',
     *         binding: 'expenses' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: {
     *         name: 'Downloads',
     *         binding: 'downloads',
     *         chartType: 'LineSymbols' }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChart</b> binding may contain the following child bindings:
     * {@link wjFlexChartAxis}, {@link wjFlexChartSeries}, {@link wjFlexChartLegend}.
     *
     * The <b>wjFlexChart</b> binding supports all read-write properties and events of
     * the {@link FlexChart} control, and the additional <b>tooltipContent</b> property
     * that assigns a value to the <b>FlexChart.tooltip.content</b> property.
     * The <b>selection</b> property provides two-way binding mode.
     */
    class wjFlexChart extends WjFlexChartBaseBinding {
        _getControlConstructor(): any;
        _initialize(): void;
    }
    /**
     * KnockoutJS binding for the {@link FlexPie} control.
     *
     * Use the {@link wjFlexPie} binding to add {@link FlexPie} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a FlexPie control:&lt;/p&gt;
     * &lt;div data-bind="wjFlexPie: {
     *         itemsSource: data,
     *         binding: 'value',
     *         bindingName: 'name',
     *         header: 'Fruit By Value' }"&gt;
     *     &lt;div data-bind="wjFlexChartLegend : { position: 'Top' }"&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexPie</b> binding may contain the {@link wjFlexChartLegend} child binding.
     *
     * The <b>wjFlexPie</b> binding supports all read-write properties and events of
     * the {@link FlexPie} control.
     */
    class wjFlexPie extends WjFlexChartBaseBinding {
        _getControlConstructor(): any;
        _initialize(): void;
    }
    /**
     * KnockoutJS binding for the {@link FlexChart} {@link Axis} object.
     *
     * The {@link wjFlexChartAxis} binding must be contained in a {@link wjFlexChart} binding. Use the <b>wjProperty</b>
     * attribute to specify the property (<b>axisX</b> or <b>axisY</b>) to initialize with this binding.
     *
     * The <b>wjFlexChartAxis</b> binding supports all read-write properties and events of
     * the {@link Axis} class.
     */
    class wjFlexChartAxis extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the Charts' {@link Legend} object.
     *
     * The {@link wjFlexChartLegend} binding must be contained in one the following bindings:
     *  {@link wjFlexChart}, {@link wjFlexPie}.
     *
     * The <b>wjFlexChartLegend</b> binding supports all read-write properties and events of
     * the {@link Legend} class.
     */
    class wjFlexChartLegend extends WjBinding {
        _getControlConstructor(): any;
    }
    class WjSeriesBase extends WjBinding {
        _getControlConstructor(): any;
        _createControl(element: any): any;
    }
    /**
     * KnockoutJS binding for the {@link FlexChart} {@link Series} object.
     *
     * The {@link wjFlexChartSeries} binding must be contained in a {@link wjFlexChart} binding.
     *
     * The <b>wjFlexChartSeries</b> binding supports all read-write properties and events of
     * the {@link Series} class. The <b>visibility</b> property provides two-way binding mode.
     */
    class wjFlexChartSeries extends WjSeriesBase {
        _getControlConstructor(): any;
        _createWijmoContext(): WjContext;
    }
    class WjFlexChartSeriesContext extends WjContext {
        _initControl(): void;
    }
    /**
     * KnockoutJS binding for the {@link LineMarker} control.
     *
     * Use the {@link wjFlexChartLineMarker} binding to add {@link LineMarker} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a LineMarker:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
     *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Expenses', binding: 'expenses' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartLineMarker: { interaction: 'Move', lines: 'Both' }"&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     *
     * The <b>wjFlexChartLineMarker</b> binding supports all read-write properties and events of
     * the {@link LineMarker} class.
     */
    class wjFlexChartLineMarker extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link PlotArea} object.
     *
     * Use the {@link wjFlexChartPlotArea} binding to add {@link PlotArea} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a PlotArea:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
     *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartPlotArea: { row:0, name:'plot1', style:{ fill: 'rgba(136,189,230,0.2)'} }  "&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartPlotArea</b> binding supports all read-write properties and events of
     * the {@link PlotArea} class.
     */
    class wjFlexChartPlotArea extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link DataPoint} object.
    
        * The <b>wjFlexChartDataPoint</b> must be contained in a
        * {@link wjFlexChartAnnotation}. The property of the parent object
        * where <b>wjFlexChartDataPoint</b> should assign a value is specified in the
        * <b>wjProperty</b> attribute.
        *
        * Use the {@link wjFlexChartDataPoint} binding to add {@link DataPoint} object to your
        * KnockoutJS applications. For example:
        *
        * <pre>&lt;p&gt;Here is a DataPoint:&lt;/p&gt;
        *   &lt;div data-bind="wjFlexChartDataPoint: { wjProperty: 'point', x: 0.9, y:0.4}" &gt;&lt;/div&gt;
        *  </pre>
        *
        * The <b>wjFlexChartDataPoint</b> binding supports all read-write properties and events of
        * the {@link DataPoint} class.
        */
    class wjFlexChartDataPoint extends WjBinding {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    class WjTrendLineBase extends WjSeriesBase {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link TrendLine} object.
     *
     * Use the {@link wjFlexChartTrendLine} binding to add {@link TrendLine} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a TrendLine:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country',chartType:'Column' }"&gt;
     *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartAnimation: { animationMode: 'Series',easing:'Swing',duration:2000 }  "&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartTrendLine</b> binding supports all read-write properties and events of
     * the {@link TrendLine} class.
     */
    class wjFlexChartTrendLine extends WjTrendLineBase {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link MovingAverage} object.
     *
     * Use the {@link wjFlexChartMovingAverage} binding to add {@link MovingAverage} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a MovingAverage:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
     *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { chartType: 'Scatter', name: 'Base Data', binding: 'y' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartMovingAverage: { binding: 'y', bindingX: 'x', period:2 }  "&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartMovingAverage</b> binding supports all read-write properties and events of
     * the {@link MovingAverage} class.
     */
    class wjFlexChartMovingAverage extends WjTrendLineBase {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link YFunctionSeries} object.
     *
     * Use the {@link wjFlexChartYFunctionSeries} binding to add {@link YFunctionSeries} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a YFunctionSeries:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
     *     &lt;div data-bind="wjFlexChartYFunctionSeries: {  min: 10, max: -10, sampleCount:100,func:func }"&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartYFunctionSeries</b> binding supports all read-write properties and events of
     * the {@link YFunctionSeries} class.
     */
    class wjFlexChartYFunctionSeries extends WjTrendLineBase {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link ParametricFunctionSeries} object.
     *
     * Use the {@link wjFlexChartParametricFunctionSeries} binding to add {@link ParametricFunctionSeries} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a ParametricFunctionSeries:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource, bindingX: 'x' }"&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartParametricFunctionSeries: {  sampleCount:1000, max: max,xFunc:xFunc,yFunc:yFunc  }"&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartParametricFunctionSeries</b> binding supports all read-write properties and events of
     * the {@link ParametricFunctionSeries} class.
     */
    class wjFlexChartParametricFunctionSeries extends WjTrendLineBase {
        _getControlConstructor(): any;
        _initialize(): void;
    }
    /**
     * KnockoutJS binding for the {@link Waterfall} object.
     *
     * Use the {@link wjFlexChartWaterfall} binding to add {@link Waterfall} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Waterfall:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: trendItemsSource,  binding:'value',bindingX: 'name' }"&gt;
     *     &lt;div data-bind="wjFlexChartWaterfall: {  relativeData:true, connectorLines: true, start:1000,showIntermediateTotal: true,
     *                       intermediateTotalPositions: [3, 6, 9, 12], intermediateTotalLabels: ['Q1', 'Q2', 'Q3', 'Q4'],name:'Increase,Decrease,Total'}"&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartWaterfall</b> binding supports all read-write properties and events of
     * the {@link Waterfall} class.
     */
    class wjFlexChartWaterfall extends WjSeriesBase {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link ChartAnimation} object.
     *
     * Use the {@link wjFlexChartAnimation} binding to add {@link ChartAnimation} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a ChartAnimation:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country',chartType:'Column' }"&gt;
     *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartAnimation: { animationMode: 'Series',easing:'Swing',duration:2000 }  "&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartAnimation</b> binding supports all read-write properties and events of
     * the {@link ChartAnimation} class.
     */
    class wjFlexChartAnimation extends WjBinding {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link AnnotationLayer} object.
     *
     * Use the {@link wjFlexChartAnnotationLayer} binding to add {@link AnnotationLayer} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a AnnotationLayer:&lt;/p&gt;
     *&lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
        *    &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
        *    &lt;div data-bind="wjFlexChartAnnotationLayer: {}"&gt;
        *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Rectangle', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 10}"&gt;&lt;/div&gt;
        *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Ellipse', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 30}"&gt;&lt;/div&gt;
        *    &lt;/div&gt;
        &lt;/div&gt;</pre>
        *
        * The <b>wjFlexChartAnnotationLayer</b> binding supports all read-write properties and events of
        * the {@link AnnotationLayer} class.
        */
    class wjFlexChartAnnotationLayer extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for annotations.
     *
     * The <b>wjFlexChartAnnotation</b> must be contained in a
     * {@link wjFlexChartAnnotationLayer} binding.For example:
     * <pre>&lt;p&gt;Here is a AnnotationLayer:&lt;/p&gt;
     *&lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
        *    &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
        *    &lt;div data-bind="wjFlexChartAnnotationLayer: {}"&gt;
        *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Rectangle', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 10}"&gt;&lt;/div&gt;
        *        &lt;div data-bind="wjFlexChartAnnotation: { type: 'Ellipse', content: 'E',height:20, width:20,attachment:'DataIndex',pointIndex: 30}"&gt;&lt;/div&gt;
        *    &lt;/div&gt;
        &lt;/div&gt;</pre>
        *
        * The <b>wjFlexChartAnnotation</b> is used to represent all types of
        * possible annotation shapes like <b>Circle</b>, <b>Rectangle</b>, <b>Polygon</b>
        * and so on. The type of annotation shape is specified
        * in the <b>type</b> attribute.
        */
    class wjFlexChartAnnotation extends WjBinding {
        _context: any;
        _createControl(element: any): any;
        _getMetaDataId(): any;
        _createWijmoContext(): WjContext;
    }
    class wjFlexChartAnnotationContext extends WjContext {
        _createAnnotation(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link FinancialChart} control.
     *
     * Use the {@link wjFinancialChart} binding to add {@link FinancialChart} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a FinancialChart control:&lt;/p&gt;
     * &lt;div data-bind="wjFinancialChart: { itemsSource: data, chartType: 'Candlestick' }"&gt;
     *     &lt;div data-bind="wjFlexChartLegend : {
     *         position: 'Top' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFinancialChartSeries: {
     *          name: 'close',
     *         binding: 'high,low,open,close' }"&gt;
     *     &lt;/div&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFinancialChart</b> binding may contain the following child bindings:
     * {@link wjFlexChartAxis}, {@link wjFinancialChartSeries}, {@link wjFlexChartLegend}.
     *
     * The <b>wjFinancialChart</b> binding supports all read-write properties and events of
     * the {@link FinancialChart} control, and the additional <b>tooltipContent</b> property
     * that assigns a value to the <b>FinancialChart.tooltip.content</b> property.
     * The <b>selection</b> property provides two-way binding mode.
     */
    class wjFinancialChart extends WjFlexChartBaseBinding {
        _getControlConstructor(): any;
        _initialize(): void;
    }
    /**
     * KnockoutJS binding for the {@link FinancialChart} {@link FinancialSeries} object.
     *
     * The {@link WjFinancialChartSeries} binding must be contained in a {@link wjFinancialChart} binding.
     *
     * The <b>WjFinancialChartSeries</b> binding supports all read-write properties and events of
     * the {@link FinancialSeries} class. The <b>visibility</b> property provides two-way binding mode.
     */
    class wjFinancialChartSeries extends WjBinding {
        _getControlConstructor(): any;
        _createWijmoContext(): WjContext;
    }
    class WjFinancialChartSeriesContext extends WjContext {
        _initControl(): void;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link Fibonacci} object.
     *
     * Use the {@link wjFlexChartFibonacci} binding to add {@link Fibonacci} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Fibonacci:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
     *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
     *         &lt;div data-bind="wjFlexChartFibonacci: { binding:'close', symbolSize:1, labelPosition: 'Left',  uptrend: true}"&gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartFibonacci</b> binding supports all read-write properties and events of
     * the {@link Fibonacci} class.
     */
    class wjFlexChartFibonacci extends WjSeriesBase {
        _getControlConstructor(): any;
        _createControl(element: any): any;
    }
    /**
     * KnockoutJS binding for the {@link FibonacciArcs} object.
     *
     * Use the {@link wjFlexChartFibonacciArcs} binding to add {@link FibonacciArcs} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a FibonacciArcs:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
     *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
     *         &lt;div data-bind="wjFlexChartFibonacciArcs: { binding:'close', start:start, end: end,  labelPosition: 'Top'}"&gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartFibonacciArcs</b> binding supports all read-write properties and events of
     * the {@link FibonacciArcs} class.
     */
    class wjFlexChartFibonacciArcs extends WjSeriesBase {
        _getControlConstructor(): any;
        _createControl(element: any): any;
    }
    /**
     * KnockoutJS binding for the {@link FibonacciFans} object.
     *
     * Use the {@link wjFlexChartFibonacciFans} binding to add {@link FibonacciFans} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a FibonacciFans:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
     *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
     *         &lt;div data-bind="wjFlexChartFibonacciFans: { binding:'close', start:start, end: end,  labelPosition: 'Top'}"&gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartFibonacciFans</b> binding supports all read-write properties and events of
     * the {@link FibonacciFans} class.
     */
    class wjFlexChartFibonacciFans extends WjSeriesBase {
        _getControlConstructor(): any;
        _createControl(element: any): any;
    }
    /**
 * KnockoutJS binding for the {@link FibonacciTimeZones} object.
 *
 * Use the {@link wjFlexChartFibonacciTimeZones} binding to add {@link FibonacciTimeZones} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a FibonacciTimeZones:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
 *         &lt;div data-bind="wjFinancialChartSeries: { bindingX: 'date', binding: 'high,low,open,close' }"&gt;&lt;/div&gt;
 *         &lt;div data-bind="wjFlexChartFibonacciTimeZones: { binding:'close', startX:zStart, endX: zEnd,  labelPosition: 'Right'}"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartFibonacciTimeZones</b> binding supports all read-write properties and events of
 * the {@link FibonacciTimeZones} class.
 */
    class wjFlexChartFibonacciTimeZones extends WjSeriesBase {
        _getControlConstructor(): any;
        _createControl(element: any): any;
    }
    class WjBaseOverlayIndicator extends WjSeriesBase {
        _getControlConstructor(): any;
    }
    class WjBaseSingleOverlayIndicator extends WjBaseOverlayIndicator {
        _getControlConstructor(): any;
    }
    /**
 * KnockoutJS binding for the {@link ATR} object.
 *
 * Use the {@link wjFlexChartAtr} binding to add {@link ATR} object to your
 * KnockoutJS applications. For example:
 *
 * <pre>&lt;p&gt;Here is a ATR:&lt;/p&gt;
 *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
 *         &lt;div data-bind="wjFlexChartAtr: { binding: 'high,low,open,close',period:'14' }"&gt;&lt;/div&gt;
 *   &lt;/div&gt;</pre>
 *
 * The <b>wjFlexChartAtr</b> binding supports all read-write properties and events of
 * the {@link ATR} class.
 */
    class wjFlexChartAtr extends WjBaseSingleOverlayIndicator {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link CCI} object.
     *
     * Use the {@link wjFlexChartCci} binding to add {@link CCI} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a CCI:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
     *         &lt;div data-bind="wjFlexChartCci: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartCci</b> binding supports all read-write properties and events of
     * the {@link CCI} class.
     */
    class wjFlexChartCci extends WjBaseSingleOverlayIndicator {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link RSI} object.
     *
     * Use the {@link wjFlexChartRsi} binding to add {@link RSI} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a RSI:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date', chartType:'Candlestick' }"&gt;
     *         &lt;div data-bind="wjFlexChartRsi: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartRsi</b> binding supports all read-write properties and events of
     * the {@link RSI} class.
     */
    class wjFlexChartRsi extends WjBaseSingleOverlayIndicator {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link WilliamsR} object.
     *
     * Use the {@link wjFlexChartWilliamsR} binding to add {@link WilliamsR} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a WilliamsR:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
     *         &lt;div data-bind="wjFlexChartWilliamsR: { binding: 'high,low,open,close',period:20 }"&gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartWilliamsR</b> binding supports all read-write properties and events of
     * the {@link WilliamsR} class.
     */
    class wjFlexChartWilliamsR extends WjBaseSingleOverlayIndicator {
        _getControlConstructor(): any;
    }
    class WjFlexChartMacdBase extends WjBaseOverlayIndicator {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link Macd} object.
     *
     * Use the {@link wjFlexChartMacd} binding to add {@link Macd} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Macd:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
     *         &lt;div data-bind="wjFlexChartMacd: { binding: 'close',fastPeriod:12, slowPeriod: 26,smoothingPeriod: 9 }" &gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartMacd</b> binding supports all read-write properties and events of
     * the {@link Macd} class.
     */
    class wjFlexChartMacd extends WjFlexChartMacdBase {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link MacdHistogram} object.
     *
     * Use the {@link wjFlexChartMacdHistogram} binding to add {@link MacdHistogram} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a MacdHistogram:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
     *         &lt;div data-bind="WjFlexChartMacdHistogram: { binding: 'close',fastPeriod:12, slowPeriod: 26,smoothingPeriod: 9 }" &gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartMacdHistogram</b> binding supports all read-write properties and events of
     * the {@link MacdHistogram} class.
     */
    class wjFlexChartMacdHistogram extends WjFlexChartMacdBase {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link Stochastic} object.
     *
     * Use the {@link wjFlexChartStochastic} binding to add {@link Stochastic} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Stochastic:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
     *         &lt;div data-bind="wjFlexChartStochastic: { binding: 'high,low,open,close',kPeriod:14,dPeriod:3,smoothingPeriod: 1 }" &gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartStochastic</b> binding supports all read-write properties and events of
     * the {@link Stochastic} class.
     */
    class wjFlexChartStochastic extends WjBaseOverlayIndicator {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link BollingerBands} object.
     *
     * Use the {@link wjFlexChartBollingerBands} binding to add {@link BollingerBands} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a BollingerBands:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
     *         &lt;div data-bind="wjFlexChartStochastic: { binding: 'high,low,open,close',kPeriod:14,dPeriod:3,smoothingPeriod: 1 }" &gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartBollingerBands</b> binding supports all read-write properties and events of
     * the {@link BollingerBands} class.
     */
    class wjFlexChartBollingerBands extends WjBaseOverlayIndicator {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link Envelopes} object.
     *
     * Use the {@link wjFlexChartEnvelopes} binding to add {@link Envelopes} object to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a Envelopes:&lt;/p&gt;
     *    &lt;div data-bind="wjFinancialChart: { itemsSource: fData, bindingX: 'date'}"&gt;
     *         &lt;div data-bind="wjFlexChartEnvelopes: { binding:'close', type:'Simple', size: 0.03, period:20}" &gt;&lt;/div&gt;
     *   &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartEnvelopes</b> binding supports all read-write properties and events of
     * the {@link Envelopes} class.
     */
    class wjFlexChartEnvelopes extends WjBaseOverlayIndicator {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link RangeSelector} control.
     *
     * Use the {@link wjFlexChartRangeSelector} binding to add {@link RangeSelector} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a RangeSelector control:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
     *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Expenses', binding: 'expenses' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Downloads', binding: 'downloads' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartRangeSelector: { seamless: 'true',rangeChanged: rangeChanged }"&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartRangeSelector</b> binding supports all read-write properties and events of
     * the {@link RangeSelector} class.
     */
    class wjFlexChartRangeSelector extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link ChartGestures} object.
     *
     * Use the {@link wjFlexChartGestures} binding to add {@link ChartGestures} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a ChartGestures:&lt;/p&gt;
     * &lt;div data-bind="wjFlexChart: { itemsSource: data, bindingX: 'country' }"&gt;
     *     &lt;div data-bind="wjFlexChartAxis: { wjProperty: 'axisX', title: 'country' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartSeries: { name: 'Sales', binding: 'sales' }"&gt;&lt;/div&gt;
     *     &lt;div data-bind="wjFlexChartGestures: { scaleX:0.5, posX:0.1 } "&gt;&lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexChartGestures</b> binding supports all read-write properties and events of
     * the {@link ChartGestures} class.
     */
    class wjFlexChartGestures extends WjBinding {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link FlexGrid} control.
     *
     * Use the {@link wjFlexGrid} binding to add {@link FlexGrid} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
     * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Country',
     *         binding: 'country',
     *         width: '*' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Date',
     *         binding: 'date' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Revenue',
     *         binding: 'amount',
     *         format: 'n0' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Active',
     *         binding: 'active' }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexGrid</b> binding may contain {@link wjFlexGridColumn} child bindings.
     *
     * The <b>wjFlexGrid</b> binding supports all read-write properties and events of
     * the {@link FlexGrid} control, except for the <b>scrollPosition</b>,
     * <b>selection</b> and <b>columnLayout</b> properties.
     */
    class wjFlexGrid extends WjBinding {
        static _columnTemplateProp: string;
        static _cellClonedTemplateProp: string;
        static _cellVMProp: string;
        static _templColIdx: string;
        static _columnStyleBinding: string;
        static _columnStyleProp: string;
        _getControlConstructor(): any;
        _createWijmoContext(): WjContext;
        _initialize(): void;
        private _formatterPropHandler;
    }
    class WjFlexGridContext extends WjContext {
        _wrapperFormatter: any;
        _userFormatter: Function;
        _initControl(): void;
        private _itemFormatter;
    }
    /**
     * KnockoutJS binding for the {@link FlexGrid} {@link Column} object.
     *
     * The {@link wjFlexGridColumn} binding must be contained in a {@link wjFlexGrid} binding. For example:
     *
     * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
     * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Country',
     *         binding: 'country',
     *         width: '*' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Date',
     *         binding: 'date' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Revenue',
     *         binding: 'amount',
     *         format: 'n0' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Active',
     *         binding: 'active' }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexGridColumn</b> binding supports all read-write properties and events of
     * the {@link Column} class. The <b>isSelected</b> property provides two-way binding mode.
     *
     * In addition to regular attributes that match properties in the <b>Column</b> class,
     * an element with the {@link wjFlexGridColumn} binding may contain a {@link wjStyle} binding that
     * provides conditional formatting and an HTML fragment that is used as a cell template. Grid
     * rows automatically stretch vertically to fit custom cell contents.
     *
     * Both the <b>wjStyle</b> binding and the HTML fragment can use the <b>$item</b> observable variable in
     * KnockoutJS bindings to refer to the item that is bound to the current row. Also available are the
     * <b>$row</b> and <b>$col</b> observable variables containing cell row and column indexes. For example:
     *
     * <pre>&lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Symbol',
     *         binding: 'symbol',
     *         readOnly: true,
     *         width: '*' }"&gt;
     *   &lt;a data-bind="attr: {
     *         href: 'https://finance.yahoo.com/q?s=' + $item().symbol() },
     *         text: $item().symbol"&gt;
     *   &lt;/a&gt;
     * &lt;/div&gt;
     * &lt;div data-bind="wjFlexGridColumn: {
     *      header: 'Change',
     *         binding: 'changePercent',
     *         format: 'p2',
     *         width: '*'
     *         },
     *         wjStyle: {
     *         color: getAmountColor($item().change) }"&gt;
     * &lt;/div&gt;</pre>
     *
     * These bindings create two columns.
     * The first has a template that produces a hyperlink based on the bound item's "symbol" property.
     * The second has a conditional style that renders values with a color determined by a function
     * implemented in the controller.
     */
    class wjFlexGridColumn extends WjBinding {
        _getControlConstructor(): any;
        _createControl(element: any): any;
        _createWijmoContext(): WjContext;
    }
    class WjFlexGridColumnContext extends WjContext {
        _initControl(): void;
    }
    /**
     * KnockoutJS binding for conditional formatting of {@link FlexGrid} {@link Column} cells.
     *
     * Use the {@link wjStyle} binding together with the {@link wjFlexGridColumn} binding to provide
     * conditional formatting to column cells.
     * For example:
     *
     * <pre>&lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Change',
     *         binding: 'changePercent',
     *         format: 'p2',
     *         width: '*'
     *         },
     *         wjStyle: { color: getAmountColor($item().change) }"&gt;&lt;/div&gt;</pre>
     *
     *
     * The <b>wjStyle</b> uses the same syntax as the native KnockoutJS
     * <a href="https://knockoutjs.com/documentation/style-binding.html" target="_blank">style</a> binding.
     * In addition to the view model properties, the following observable variables are available in binding
     * expressions:
     *
     * <dl class="dl-horizontal">
     *   <dt>$item</dt>  <dd>References the item that is bound to the current row.</dd>
     *   <dt>$row</dt>  <dd>The row index.</dd>
     *   <dt>$col</dt>  <dd>The column index.</dd>
     * </dl>
     */
    class wjStyle {
        preprocess: (value: string, name: string, addBinding: (name: string, value: string) => string) => string;
        init: () => void;
        static quoteString(s: string): string;
        static unquoteString(s: string): string;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link FlexGrid} {@link FlexGridFilter} object.
     *
     * The {@link wjFlexGridFilter} binding must be contained in a {@link wjFlexGrid} binding. For example:
     *
     * <pre>&lt;p&gt;Here is a FlexGrid control with column filters:&lt;/p&gt;
     * &lt;div data-bind="wjFlexGrid: { itemsSource: data }"&gt;
     *     &lt;div data-bind="wjFlexGridFilter: { filterColumns: ['country', 'amount']  }"&gt;&lt;/div&gt;
     * &nbsp;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Country',
     *         binding: 'country',
     *         width: '*' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Date',
     *         binding: 'date' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Revenue',
     *         binding: 'amount',
     *         format: 'n0' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Active',
     *         binding: 'active' }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjFlexGridFilter</b> binding supports all read-write properties and events of
     * the {@link FlexGridFilter} class.
     *
     */
    class wjFlexGridFilter extends WjBinding {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link FlexGrid} {@link GroupPanel} control.
     *
     * The <b>wjGroupPanel</b> binding should be connected to the <b>FlexGrid</b> control using the <b>grid</b> property.
     * For example:
     *
     * <pre>&lt;p&gt;Here is a FlexGrid control with GroupPanel:&lt;/p&gt;
     * &nbsp;
     * &lt;div data-bind="wjGroupPanel: { grid: flex(), placeholder: 'Drag columns here to create groups.' }"&gt;&lt;/div&gt;
     * &nbsp;
     * &lt;div data-bind="wjFlexGrid: { control: flex, itemsSource: data }"&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Country',
     *         binding: 'country',
     *         width: '*' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Date',
     *         binding: 'date' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Revenue',
     *         binding: 'amount',
     *         format: 'n0' }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjFlexGridColumn: {
     *         header: 'Active',
     *         binding: 'active' }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjGroupPanel</b> binding supports all read-write properties and events of
     * the {@link GroupPanel} class.
     *
     */
    class wjGroupPanel extends WjBinding {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link MultiRow} object.
     * Use the {@link wjMultiRow} binding to add {@link MultiRow} controls to your
     * KnockoutJS applications. For example:
     *  &lt;div data-bind="wjMultiRow:
     *      {
     *          itemsSource: orders,
     *          layoutDefinition: ldThreeLines
     *      }"&gt;
     *  &lt;/div&gt;
     *
     * The <b>wjMultiRow</b> binding supports all read-write properties and events of
     * the {@link MultiRow} class.
     *
     */
    class wjMultiRow extends wjFlexGrid {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link FlexSheet} control.
     *
     * Use the {@link wjFlexSheet} binding to add {@link FlexSheet} controls to your
     * KnockoutJS applications.
     *
     * The <b>wjFlexSheet</b> binding may contain {@link wjSheet} child bindings.
     *
     * The <b>wjFlexSheet</b> binding supports all read-write properties and events of
     * the {@link FlexSheet} control.
     */
    class wjFlexSheet extends wjFlexGrid {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link FlexSheet} {@link Sheet} object.
     *
     * The {@link wjSheet} binding must be contained in a {@link wjFlexSheet} binding.
     *
     * The <b>wjSheet</b> binding supports all read-write properties and events of
     * the {@link Sheet} class.
     *
     */
    class wjSheet extends WjBinding {
        _getControlConstructor(): any;
        _createWijmoContext(): WjContext;
    }
    class WjSheetContext extends WjContext {
        _initControl(): grid.sheet.Sheet;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link Tooltip} class.
     *
     * Use the {@link wjTooltip} binding to add tooltips to elements on the page.
     * The {@link wjTooltip} supports HTML content, smart positioning, and touch.
     *
     * The {@link wjTooltip} binding is specified on an
     * element that the tooltip applies to. The value is the tooltip
     * text or the id of an element that contains the text. For example:
     *
     * <pre>&lt;p data-bind="wjTooltip: '#fineprint'" &gt;
     *     Regular paragraph content...&lt;/p&gt;
     * ...
     * &lt;div id="fineprint" style="display:none" &gt;
     *   &lt;h3&gt;Important Note&lt;/h3&gt;
     *   &lt;p&gt;
     *     Data for the current quarter is estimated by pro-rating etc...&lt;/p&gt;
     * &lt;/div&gt;</pre>
     */
    class wjTooltip extends WjBinding {
        _getControlConstructor(): any;
        _createControl(element: any): any;
        _createWijmoContext(): WjContext;
    }
    class WjTooltipContext extends WjContext {
        update(element: any, valueAccessor: () => any, allBindings: any, viewModel: any, bindingContext: any): void;
        private _updateTooltip;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    class WjGaugeBinding extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link LinearGauge} control.
     *
     * Use the {@link wjLinearGauge} binding to add {@link LinearGauge} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a LinearGauge control:&lt;/p&gt;
     * &lt;div data-bind="wjLinearGauge: {
     *         value: props.value,
     *         min: props.min,
     *         max: props.max,
     *         format: props.format,
     *         showRanges: props.showRanges }"
     *         &lt;class="linear-gauge"&gt;
     *     &lt;div data-bind="wjRange: {
     *             wjProperty: 'pointer',
     *             thickness: props.ranges.pointerThickness }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjRange: {
     *             min: props.ranges.lower.min,
     *             max: props.ranges.lower.max,
     *             color: props.ranges.lower.color }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjRange: {
     *             min: props.ranges.middle.min,
     *             max: props.ranges.middle.max,
     *             color: props.ranges.middle.color }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjRange: {
     *             min: props.ranges.upper.min,
     *             max: props.ranges.upper.max,
     *             color: props.ranges.upper.color }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjLinearGauge</b> binding may contain the {@link wjRange} child binding.
     *
     * The <b>wjLinearGauge</b> binding supports all read-write properties and events of
     * the {@link LinearGauge} control. The <b>value</b> property provides two-way binding mode.
     */
    class wjLinearGauge extends WjGaugeBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link BulletGraph} control.
     *
     * Use the {@link wjBulletGraph} binding to add {@link BulletGraph} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a BulletGraph control:&lt;/p&gt;
     * &lt;div data-bind="wjBulletGraph: {
     *         value: props.value,
     *         min: props.min,
     *         max: props.max,
     *         format: props.format,
     *         good: props.ranges.middle.max,
     *         bad: props.ranges.middle.min,
     *         target: props.ranges.target,
     *         showRanges: props.showRanges }"
     *         class="linear-gauge"&gt;
     *     &lt;div data-bind="wjRange: {
     *             wjProperty: 'pointer',
     *             thickness: props.ranges.pointerThickness }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjBulletGraph</b> binding may contain the {@link wjRange} child binding.
     *
     * The <b>wjBulletGraph</b> binding supports all read-write properties and events of
     * the {@link BulletGraph} control. The <b>value</b> property provides two-way binding mode.
     */
    class wjBulletGraph extends wjLinearGauge {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link RadialGauge} control.
     *
     * Use the {@link wjRadialGauge} binding to add {@link RadialGauge} controls to your
     * KnockoutJS applications. For example:
     *
     * <pre>&lt;p&gt;Here is a RadialGauge control:&lt;/p&gt;
     * &lt;div data-bind="wjRadialGauge: {
     *         value: props.value,
     *         min: props.min,
     *         max: props.max,
     *         format: props.format,
     *         showRanges: props.showRanges }"
     *         class="radial-gauge"&gt;
     *     &lt;div data-bind="wjRange: {
     *             wjProperty: 'pointer',
     *             thickness: props.ranges.pointerThickness }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjRange: {
     *             min: props.ranges.lower.min,
     *             max: props.ranges.lower.max,
     *             color: props.ranges.lower.color }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjRange: {
     *             min: props.ranges.middle.min,
     *             max: props.ranges.middle.max,
     *             color: props.ranges.middle.color }"&gt;
     *     &lt;/div&gt;
     *     &lt;div data-bind="wjRange: {
     *             min: props.ranges.upper.min,
     *             max: props.ranges.upper.max,
     *             color: props.ranges.upper.color }"&gt;
     *     &lt;/div&gt;
     * &lt;/div&gt;</pre>
     *
     * The <b>wjRadialGauge</b> binding may contain the {@link wjRange} child binding.
     *
     * The <b>wjRadialGauge</b> binding supports all read-write properties and events of
     * the {@link RadialGauge} control. The <b>value</b> property provides two-way binding mode.
     */
    class wjRadialGauge extends WjGaugeBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the Gauge's {@link Range} object.
     *
     * The {@link wjRange} binding must be contained in one of the following bindings:
     * <ul>
     *     <li>{@link wjLinearGauge}</li>
     *     <li>{@link wjRadialGauge}</li>
     *     <li>{@link wjBulletGraph}</li>
     * </ul>
     * By default, this binding adds a <b>Range</b> object to the <b>ranges</b>
     * collection of the Chart control. The <b>wjProperty</b> attribute allows
     * you to specify another Chart property, for example the <b>pointer</b>
     * property, to initialize with the binding.
     *
     * The <b>wjRange</b> binding supports all read-write properties and events of
     * the {@link Range} class.
     */
    class wjRange extends WjBinding {
        _getControlConstructor(): any;
        _createControl(element: any): any;
    }
}
declare module wijmo.knockout {
}
declare module wijmo.knockout {
    /**
     * KnockoutJS binding for the {@link PivotGrid} object.
     * Use the {@link wjPivotGrid} binding to add {@link PivotGrid} controls to your
     * KnockoutJS applications. For example:
     *  &lt;div data-bind="wjPivotGrid:
     *      {
     *          itemsSource: thePanel
     *      }"&gt;
     *  &lt;/div&gt;
     *
     * The <b>wjPivotGrid</b> binding supports all read-write properties and events of
     * the {@link PivotGrid} class.
     *
     */
    class wjPivotGrid extends wjFlexGrid {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link PivotChart} object.
     * Use the {@link wjPivotChart} binding to add {@link PivotChart} controls to your
     * KnockoutJS applications. For example:
     *  &lt;div data-bind="wjPivotChart:
     *      {
     *          itemsSource: thePanel
     *      }"&gt;
     *  &lt;/div&gt;
     *
     * The <b>wjPivotChart</b> binding supports all read-write properties and events of
     * the {@link PivotChart} class.
     *
     */
    class wjPivotChart extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link PivotPanel} object.
     * Use the {@link wjPivotPanel} binding to add {@link PivotPanel} controls to your
     * KnockoutJS applications. For example:
     *  &lt;div data-bind="wjPivotPanel:
     *      {
     *           itemsSource: rawData,
     *           control: thePanel,
     *           initialized: init
     *      }"&gt;
     *  &lt;/div&gt;
     *
     * The <b>wjPivotPanel</b> binding supports all read-write properties and events of
     * the {@link PivotPanel} class.
     *
     */
    class wjPivotPanel extends WjBinding {
        _getControlConstructor(): any;
    }
    /**
     * KnockoutJS binding for the {@link Slicer} object.
     * Use the {@link wjSlicer} binding to add {@link Slicer} controls to your
     * KnockoutJS applications. For example:
     *  &lt;div data-bind="wjSlicer:
     *      {
     *           field: theField,
     *           showHeader: true
     *      }"&gt;
     *  &lt;/div&gt;
     *
     * The <b>wjSlicer</b> binding supports all read-write properties and events of
     * the {@link Slicer} class.
     *
     */
    class wjSlicer extends WjBinding {
        _getControlConstructor(): any;
    }
}
declare module wijmo.knockout {
}
