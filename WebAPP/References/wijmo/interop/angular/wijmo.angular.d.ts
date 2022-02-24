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
declare module wijmo.angular {
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
declare module wijmo.angular {
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
declare module wijmo.angular {
}
declare module wijmo.angular {
    class MetaFactory extends ControlMetaFactory {
        static CreateProp(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number): PropDesc;
        static CreateEvent(eventName: string, isPropChanged?: boolean): EventDesc;
        static CreateComplexProp(propertyName: string, isArray: boolean, ownsObject?: boolean): ComplexPropDesc;
        static findProp(propName: string, props: PropDesc[]): PropDesc;
        static findEvent(eventName: string, events: EventDesc[]): EventDesc;
        static findComplexProp(propName: string, props: ComplexPropDesc[]): ComplexPropDesc;
    }
    class PropDesc extends PropDescBase {
        private _scopeBindingMode;
        private _customHandler;
        constructor(propertyName: string, propertyType: PropertyType, changeEvent?: string, enumType?: any, isNativeControlProperty?: boolean, priority?: number);
        scopeBindingMode: string;
        customHandler: (scope: any, control: wijmo.Control, value: any, oldValue: any, link: WjLink) => any;
    }
    class EventDesc extends EventDescBase {
    }
    class ComplexPropDesc extends ComplexPropDescBase {
    }
}
declare module wijmo.angular {
    function _registerNgModule(name: string): any;
    /**
     * Returns an array of all registered so far Wijmo Angular module names.
     * These are the names of Angular modules that allows you to obtain a module
     * reference using the <b>angular.module(moduleName)</b> function.
     */
    function getNgModules(): string[];
    class WjDirective {
        static _versionOk(minVer: string): boolean;
        static _parPropAttr: string;
        static _wjModelPropAttr: string;
        static _initPropAttr: string;
        static _initEventAttr: string;
        static _cntrlScopeProp: string;
        static _elemScopeProp: string;
        static _cntrlLinkProp: string;
        static _scopeChildrenProp: string;
        static _dirIdAttr: string;
        static _optionalAttr: boolean;
        static _dynaTemplates: boolean;
        static _angStripPrefixes: string[];
        private static _dirIdCounter;
        link: (scope: any, templateElement: any, templateAttributes: any, controller: any) => any;
        controller: any;
        replace: boolean;
        require: any;
        restrict: string;
        scope: any;
        template: any;
        transclude: any;
        _property: string;
        _isPropertyArray: boolean;
        _ownObject: boolean;
        _parentReferenceProperty: string;
        _ngModelProperty: string;
        _isCustomParentInit: boolean;
        _props: PropDesc[];
        _events: EventDesc[];
        _complexProps: ComplexPropDesc[];
        _$parse: any;
        private _stripReq;
        private _dirId;
        readonly _controlConstructor: any;
        _getMetaDataId(): any;
        _getMetaData(): MetaDataBase;
        constructor();
        private _initDirective;
        _initSharedMeta(): void;
        _initProps(): void;
        _initEvents(): void;
        _createLink(): WjLink;
        _controllerImpl(controller: any, scope: any, tElement: any): void;
        _initControl(element: any): any;
        _isChild(): boolean;
        _isParentInitializer(): boolean;
        _isParentReferencer(): boolean;
        _scopeToAttrName(scopeName: string): string;
        _getComplexPropDesc(propName: string): ComplexPropDesc;
        private _initScopeEvents;
        private _initScopeDescription;
        _postLinkFn(): (scope: any, tElement: any, tAttrs: any, controller?: any) => void;
        private _prepareProps;
        private _stripRequire;
        _getId(): string;
        static _removeTransclude(html: string): string;
    }
    class WjLink {
        directive: WjDirective;
        scope: any;
        tElement: any;
        tAttrs: any;
        controller: any;
        directiveTemplateElement: any;
        control: any;
        parent: WjLink;
        ngModel: any;
        private _ngModelPropDesc;
        private _nonAssignable;
        private _parentPropDesc;
        private _definedProps;
        private _definedEvents;
        private _oldValues;
        _isInitialized: boolean;
        private _hasTriggeredInitialized;
        private _isNgModelInitialized;
        private _scopeSuspend;
        private _suspendedEvents;
        private _siblingInsertedEH;
        private _destroyEhUnreg;
        _areChlildrenReady: boolean;
        _isDestroyed: boolean;
        constructor();
        _link(): void;
        _onChildrenReady(): void;
        private _createInstance;
        private _parentReady;
        _initParent(): void;
        _destroy(): void;
        private _siblingInserted;
        private _notifyReady;
        _initControl(): any;
        private _prepareControl;
        private _setupScopeWithControlProperties;
        private _initNonAssignable;
        _suspendScope(): void;
        _resumeScope(): void;
        _isScopeSuspended(): boolean;
        _isAttrDefined(name: string): boolean;
        private _isAppliedToParent;
        _childInitialized(child: WjLink): void;
        private _thisInitialized;
        _initialized(): void;
        private _appliedToParent;
        private _checkRaiseInitialized;
        private _addWatchers;
        private _addEventHandlers;
        private _addEventHandler;
        private _updateScope;
        private _ngModelRender;
        private _castValueToType;
        private _isChild;
        private _isParentInitializer;
        private _isParentReferencer;
        private _getParentProp;
        private _getParentReferenceProperty;
        private _useParentObj;
        private _isParentArray;
        private _parentInCtor;
        private _getNgModelProperty;
        private _updateNgModelPropDesc;
        _safeApply(scope: any, name: any, value: any): boolean;
        _shouldApply(scope: any, name: any, value: any): boolean;
        _canApply(scope: any, name: any): boolean;
        _isEqual(v1: any, v2: any): boolean;
        _isEqualEx(v1: any, v2: any): boolean;
        _isSpValEq(v1: any, v2: any): boolean;
        _nullOrValue(value: any): any;
        _getIndex(): number;
    }
}
declare module wijmo.angular {
    function softRefChart(): typeof wijmo.chart;
    function softRefChartAnalytics(): typeof wijmo.chart.analytics;
    function softRefChartAnimation(): typeof wijmo.chart.animation;
    function softRefChartAnnotation(): typeof wijmo.chart.annotation;
    function softRefChartFinance(): typeof wijmo.chart.finance;
    function softRefChartFinanceAnalytics(): typeof wijmo.chart.finance.analytics;
    function softRefChartHierarchical(): typeof wijmo.chart.hierarchical;
    function softRefChartInteraction(): typeof wijmo.chart.interaction;
    function softRefChartRadar(): typeof wijmo.chart.radar;
    function softRefGauge(): typeof wijmo.gauge;
    function softRefGrid(): typeof wijmo.grid;
    function softRefGridDetail(): typeof wijmo.grid.detail;
    function softRefGridFilter(): typeof wijmo.grid.filter;
    function softRefGridGrouppanel(): typeof wijmo.grid.grouppanel;
    function softRefGridMultirow(): typeof wijmo.grid.multirow;
    function softRefGridSheet(): typeof wijmo.grid.sheet;
    function softRefNav(): typeof wijmo.nav;
    function softRefOlap(): typeof wijmo.olap;
    function softRefViewer(): typeof wijmo.viewer;
    function softRefInput(): typeof wijmo.input;
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    class WjDropDown extends WjDirective {
        readonly _controlConstructor: typeof input.DropDown;
    }
    /**
     * AngularJS directive for the {@link ComboBox} control.
     *
     * Use the <b>wj-combo-box</b> directive to add <b>ComboBox</b> controls to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a ComboBox control:&lt;/p&gt;
     * &lt;wj-combo-box
     *   text="theCountry"
     *   items-source="countries"
     *   is-editable="false"
     *   placeholder="country"&gt;
     * &lt;/wj-combo-box&gt;</pre>
     *
     * The example below creates a <b>ComboBox</b> control and binds it to a 'countries' array
     * exposed by the controller. The <b>ComboBox</b> searches for the country as the user
     * types. The <b>isEditable</b> property is set to false, so the user is forced to
     * select one of the items in the list.
     *
     * <a href="https://jsfiddle.net/Wijmo5/37GHw/" target="_blank">Example</a>
     *
     * The <b>wj-combo-box</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>selectedValue</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
     *                               <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>              <dd><code>=</code> A reference to the {@link ComboBox} control created by this directive.</dd>
     *   <dt>display-member-path</dt>  <dd><code>@</code> The name of the property to use as the visual representation of the items.</dd>
     *   <dt>is-content-html</dt>      <dd><code>@</code> A value indicating whether the drop-down list displays the items as plain text or as HTML.</dd>
     *   <dt>is-dropped-down</dt>      <dd><code>@</code> A value indicating whether the drop down list is currently visible.</dd>
     *   <dt>is-editable</dt>          <dd><code>@</code> A value indicating whether the user can enter values not present on the list.</dd>
     *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values.</dd>
     *   <dt>item-formatter</dt>       <dd><code>=</code> A function used to customize the values shown in the drop-down list.</dd>
     *   <dt>items-source</dt>         <dd><code>=</code> An array or {@link ICollectionView} that contains items to show in the list.</dd>
     *   <dt>max-drop-down-height</dt> <dd><code>@</code> The maximum height of the drop-down list.</dd>
     *   <dt>max-drop-down-width</dt>  <dd><code>@</code> The maximum width of the drop-down list.</dd>
     *   <dt>placeholder</dt>          <dd><code>@</code> A string shown as a hint when the control is empty.</dd>
     *   <dt>is-required</dt>          <dd><code>@</code> A value indicating whether to prevent null values.</dd>
     *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
     *   <dt>selected-index</dt>       <dd><code>=</code> The index of the currently selected item in the drop-down list.</dd>
     *   <dt>selected-item</dt>        <dd><code>=</code> The currently selected item in the drop-down list.</dd>
     *   <dt>selected-value</dt>       <dd><code>=</code> The value of the selected item, obtained using the <b>selected-value-path</b>.</dd>
     *   <dt>selected-value-path</dt>  <dd><code>@</code> The name of the property used to get the <b>selected-value</b> from the <b>selected-item</b>.</dd>
     *   <dt>text</dt>                 <dd><code>=</code> The text to show in the control.</dd>
     *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The {@link ComboBox.isDroppedDownChanging} event handler.</dd>
     *   <dt>is-dropped-down-changed</dt>  <dd><code>&</code> The {@link ComboBox.isDroppedDownChanged} event handler.</dd>
     *   <dt>selected-index-changed</dt>   <dd><code>&</code> The {@link ComboBox.selectedIndexChanged} event handler.</dd>
     *   <dt>got-focus</dt>            <dd><code>&</code> The {@link ComboBox.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>           <dd><code>&</code> The {@link ComboBox.lostFocus} event handler.</dd>
     *   <dt>text-changed</dt>         <dd><code>&</code> The {@link ComboBox.textChanged} event handler.</dd>
     * </dl>
     */
    class WjComboBox extends WjDropDown {
        _$compile: any;
        constructor($compile: any);
        readonly _controlConstructor: typeof input.ComboBox;
    }
    /**
     * AngularJS directive for the {@link AutoComplete} control.
     *
     * Use the <b>wj-auto-complete</b> directive to add <b>AutoComplete</b> controls to your
     * AngularJS applications. Note that directive and parameter names must be
     * formatted as lower-case with dashes instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is an AutoComplete control:&lt;/p&gt;
     * &lt;wj-auto-complete
     *   text="theCountry"
     *   items-source="countries"
     *   is-editable="false"
     *   placeholder="country"&gt;
     * &lt;/wj-auto-complete&gt;</pre>
     *
     * The example below creates an <b>AutoComplete</b> control and binds it to a 'countries' array
     * exposed by the controller. The <b>AutoComplete</b> searches for the country as the user
     * types, and narrows down the list of countries that match the current input.
     *
     * <a href="https://jsfiddle.net/Wijmo5/37GHw/" target="_blank">Example</a>
     *
     * The <b>wj-auto-complete</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>css-match</dt>            <dd><code>@</code> The name of the CSS class used to highlight
     *                                 parts of the content that match the search terms.</dd>
     *   <dt>delay</dt>                <dd><code>@</code> The amount of delay in milliseconds between
     *                                 when a keystroke occurs and when the search is performed.</dd>
     *   <dt>items-source-function</dt><dd><code>=</code> A function that provides the items
     *                                 dynamically as the user types.</dd>
     *   <dt>max-items</dt>            <dd><code>@</code> The maximum number of items to display
     *                                 in the dropdown.</dd>
     *   <dt>min-length</dt>           <dd><code>@</code> The minimum input length to require before
     *                                 triggering autocomplete suggestions.</dd>
     * </dl>
     */
    class WjAutoComplete extends WjComboBox {
        constructor($compile: any);
        readonly _controlConstructor: typeof input.AutoComplete;
    }
    /**
     * AngularJS directive for the {@link Calendar} control.
     *
     * Use the <b>wj-calendar</b> directive to add <b>Calendar</b> controls to your
     * AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a Calendar control:&lt;/p&gt;
     * &lt;wj-calendar
     *   value="theDate"&gt;
     * &lt;/wj-calendar&gt;</pre>
     *
     * <a href="https://jsfiddle.net/Wijmo5/46PhD/" target="_blank">Example</a>
     *
     * This example creates a <b>Calendar</b> control and binds it to a 'date' variable
     * exposed by the controller. The range of dates that may be selected is limited
     * by the <b>min</b> and <b>max</b> properties.
     *
     * The <b>wj-calendar</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
     *                               <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>        <dd><code>=</code> A reference to the {@link Calendar} control
     *                           created by this directive.</dd>
     *   <dt>display-month</dt>  <dd><code>=</code> The month being displayed in the calendar.</dd>
     *   <dt>first-day-of-week</dt> <dd><code>@</code> The first day of the week.</dd>
     *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
     *                                 initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
     *                                 initializing the control with attribute values. </dd>
     *   <dt>item-formatter</dt> <dd><code>=</code> The function used to customize the dates
     *                           shown in the calendar.</dd>
     *   <dt>max</dt>            <dd><code>@</code> The latest valid date (string in the
     *                           format "yyyy-MM-dd").</dd>
     *   <dt>min</dt>            <dd><code>@</code> The earliest valid date (string in the
     *                           format "yyyy-MM-dd").</dd>
     *   <dt>month-view</dt>     <dd><code>@</code> A value indicating whether the control displays
     *                           a month or the entire year.</dd>
     *   <dt>show-header</dt>    <dd><code>@</code> A value indicating whether the control displays
     *                           the header area.</dd>
     *   <dt>value</dt>          <dd><code>=</code> The date being edited.</dd>
     *   <dt>got-focus</dt>      <dd><code>&</code> The {@link Calendar.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>     <dd><code>&</code> The {@link Calendar.lostFocus} event handler.</dd>
     *   <dt>value-changed</dt>  <dd><code>&</code> The {@link Calendar.valueChanged} event handler.</dd>
     * </dl>
     *
     * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
     * "yyyy-MM-dd." Technically, you can use any full date as defined in the W3C
     * <a href="https://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>,
     * which is also the format used with regular HTML5 input elements.
     */
    class WjCalendar extends WjDirective {
        readonly _controlConstructor: new (elem: HTMLElement) => wijmo.Control;
    }
    /**
     * AngularJS directive for the {@link ColorPicker} control.
     *
     * Use the <b>wj-color-picker</b> directive to add <b>ColorPicker</b> controls to your
     * AngularJS applications. Note that directive and parameter names must be
     * formatted as lower-case with dashes instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a ColorPicker control:&lt;/p&gt;
     * &lt;wj-color-picker
     *   value="theColor"
     *   show-alpha-channel="false"&gt;
     * &lt;/wj-color-picker&gt;</pre>
     *
     * The <b>wj-color-picker</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
     *                               <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link ColorPicker}
     *                              control created by this directive.</dd>
     *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
     *                                 initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
     *                                 initializing the control with attribute values. </dd>
     *   <dt>show-alpha-channel</dt><dd><code>@</code> A value indicating whether the control
     *                              displays the alpha channel (transparency) editor.</dd>
     *   <dt>show-color-string</dt> <dd><code>@</code> A value indicating whether the control
     *                              displays a string representation of the color being edited.</dd>
     *   <dt>palette</dt>           <dd><code>=</code> An array with ten color values to use
     *                              as the palette.</dd>
     *   <dt>value</dt>             <dd><code>=</code> The color being edited.</dd>
     *   <dt>got-focus</dt>         <dd><code>&</code> The {@link ColorPicker.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link ColorPicker.lostFocus} event handler.</dd>
     *   <dt>value-changed</dt>     <dd><code>&</code> The {@link ColorPicker.valueChanged} event handler.</dd>
     * </dl>
     */
    class WjColorPicker extends WjDirective {
        readonly _controlConstructor: new (elem: HTMLElement) => wijmo.Control;
    }
    /**
     * AngularJS directive for the {@link ListBox} control.
     *
     * Use the <b>wj-list-box</b> directive to add {@link ListBox} controls to your
     * AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>b&gt;Here is a ListBox control:&lt;/p&gt;
     * &lt;wj-list-box
     *   selected-item="theCountry"
     *   items-source="countries"
     *   placeholder="country"&gt;
     * &lt;/wj-list-box&gt;</pre>
     *
     * The example below creates a <b>ListBox</b> control and binds it to a 'countries' array
     * exposed by the controller. The value selected is bound to the 'theCountry'
     * controller property using the <b>selected-item</b> attribute.
     *
     * <a href="https://jsfiddle.net/Wijmo5/37GHw/" target="_blank">Example</a>
     *
     * The <b>wj-list-box</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>selectedValue</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
     *                               <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>              <dd><code>=</code> A reference to the {@link ListBox}
     *                                 control created by this directive.</dd>
     *   <dt>display-member-path</dt>  <dd><code>@</code> The property to use as the visual
     *                                 representation of the items.</dd>
     *   <dt>is-content-html</dt>      <dd><code>@</code> A value indicating whether items
     *                                 contain plain text or HTML.</dd>
     *   <dt>initialized</dt>          <dd><code>&</code> This event occurs after the binding has finished
     *                                 initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>       <dd><code>=</code> A value indicating whether the binding has finished
     *                                 initializing the control with attribute values. </dd>
     *   <dt>item-formatter</dt>       <dd><code>=</code> A function used to customize the
     *                                 values to show in the list.</dd>
     *   <dt>items-source</dt>         <dd><code>=</code> An array or {@link ICollectionView}
     *                                 that contains the list items.</dd>
     *   <dt>max-height</dt>           <dd><code>@</code> The maximum height of the list.</dd>
     *   <dt>selected-index</dt>       <dd><code>=</code> The index of the currently selected
     *                                 item.</dd>
     *   <dt>selected-item</dt>        <dd><code>=</code> The item that is currently selected.</dd>
     *   <dt>selected-value</dt>       <dd><code>=</code> The value of the <b>selected-item</b>
     *                                 obtained using the <b>selected-value-path</b>.</dd>
     *   <dt>selected-value-path</dt>  <dd><code>@</code> The property used to get the
     *                                 <b>selected-value</b> from the <b>selected-item</b>.</dd>
     *   <dt>got-focus</dt>            <dd><code>&</code> The {@link ListBox.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>           <dd><code>&</code> The {@link ListBox.lostFocus} event handler.</dd>
     *   <dt>items-changed</dt>        <dd><code>&</code> The {@link ListBox.itemsChanged} event handler.</dd>
     *   <dt>selected-index-changed</dt> <dd><code>&</code> The {@link ListBox.selectedIndexChanged} event handler.</dd>
     * </dl>
     *
     * The <b>wj-list-box</b> directive may contain {@link wijmo.angular.input.WjItemTemplate} child directive.
     */
    class WjListBox extends WjDirective {
        constructor();
        readonly _controlConstructor: new (elem: HTMLElement) => wijmo.Control;
    }
    /**
     * AngularJS directive for {@link ListBox} and {@link Menu} item templates.
     *
     * The <b>wj-item-template</b> directive must be contained in a {@link wijmo.angular.input.WjListBox}
     * or {@link wijmo.angular.input.WjMenu} directives.
     *
     * The <b>wj-item-template</b> directive defines a template for items of <b>ListBox</b>
     * and data-bound <b>Menu</b> controls.
     * The template may contain an arbitrary HTML fragment with AngularJS bindings and directives.
     * In addition to any properties available in a controller, the local <b>$item</b>,
     * <b>$itemIndex</b> and <b>$control</b> template variables can be used in AngularJS bindings
     * that refer to the data item, its index, and the owner control.
     *
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a ListBox control with an item template:&lt;/p&gt;
     * &lt;wj-list-box items-source="musicians"&gt;
     *     &lt;wj-item-template&gt;
     *         {&#8203;{$itemIndex}}. &lt;b&gt;{&#8203;{$item.name}}&lt;/b&gt;
     *         &lt;br /&gt;
     *         &lt;img ng-src="{&#8203;{$item.photo}}"/&gt;
     *     &lt;/wj-item-template&gt;
     * &lt;/wj-list-box&gt;</pre>
     */
    class WjItemTemplate extends WjDirective {
        static _itemTemplateProp: string;
        static _itemScopeProp: string;
        _$compile: any;
        constructor($compile: any);
        _initControl(element: any): any;
        _createLink(): WjLink;
        _getMetaDataId(): any;
    }
    /**
     * AngularJS directive for the {@link Menu} control.
     *
     * Use the <b>wj-menu</b> directive to add drop-down menus to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a Menu control used as a value picker:&lt;/p&gt;
     * &lt;wj-menu header="Tax" value="tax"&gt;
     *   &lt;wj-menu-item value="0"&gt;Exempt&lt;/wj-menu-item&gt;
     *   &lt;wj-menu-item value=".05"&gt;5%&lt;/wj-menu-item&gt;
     *   &lt;wj-menu-item value=".1"&gt;10%&lt;/wj-menu-item&gt;
     *   &lt;wj-menu-item value=".15"&gt;15%&lt;/wj-menu-item&gt;
     * &lt;/wj-menu&gt;</pre>
     *
     * <a href="https://jsfiddle.net/Wijmo5/Wc5Mq/" target="_blank">Example</a>
     *
     * This example creates three <b>Menu</b> controls. The first is used as a value picker,
     * the second uses a list of commands with parameters, and the third is a group of
     * three menus handled by an <b>itemClicked</b> function in the controller.
     *
     * The <b>wj-menu</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>command-path</dt>          <dd><code>@</code> The command to be executed when the item is clicked.</dd>
     *   <dt>command-parameter-path</dt><dd><code>@</code> The name of the property that contains command parameters.</dd>
     *   <dt>header</dt>                <dd><code>@</code> The text shown on the control.</dd>
     *   <dt>is-button</dt>             <dd><code>@</code> Whether the menu should react to clicks on its header area.</dd>
     *   <dt>value</dt>                 <dd><code>@</code> The value of the selected <b>wj-menu-item</b> value property. </dd>
     *   <dt>item-clicked</dt>          <dd><code>&</code> The {@link Menu.itemClicked} event handler.</dd>
     *   <dt>got-focus</dt>             <dd><code>&</code> The {@link Menu.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>            <dd><code>&</code> The {@link Menu.lostFocus} event handler.</dd>
     * </dl>
     *
     *The <b>wj-menu</b> directive may contain the following child directives:
        *{@link wijmo.angular.input.WjMenuItem}, {@link wijmo.angular.input.WjMenuSeparator} and {@link wijmo.angular.input.WjItemTemplate}(in case of data-bound Menu control).
        */
    class WjMenu extends WjComboBox {
        constructor($compile: any);
        readonly _controlConstructor: typeof input.Menu;
        _createLink(): WjLink;
        _initProps(): void;
        updateControlValue(scope: any, control: any, link: WjLink): void;
        updateHeader(scope: any, control: any, link: WjLink): void;
    }
    /**
     * AngularJS directive for menu items.
     *
     * The <b>wj-menu-item</b> directive must be contained in a {@link wijmo.angular.input.WjMenu} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>cmd</dt>       <dd><code>=</code> The function to execute in the controller
     *                      when the item is clicked.</dd>
     *   <dt>cmd-param</dt>  <dd><code>=</code> The parameter passed to the <b>cmd</b> function
     *                      when the item is clicked.</dd>
     *   <dt>value</dt>     <dd><code>=</code> The value to select when the item is clicked
     *                      (use either this or <b>cmd</b>).</dd>
     * </dl>
     *
     * The content displayed by the item may contain an arbitrary HTML fragment with AngularJS bindings and directives.
     * You can also use <b>ng-repeat</b> and <b>ng-if</b> directives to populate the items in the Menu control.
     * In addition to any properties available in a controller, the local <b>$item</b>,
     * <b>$itemIndex</b> and <b>$control</b> template variables can be used in AngularJS bindings
     * that refer to the data item, its index, and the owner control.
     */
    class WjMenuItem extends WjDirective {
        static _itemTemplateProp: string;
        static _itemScopeProp: string;
        static _itemLinkProp: string;
        static _directiveId: string;
        constructor();
        _createLink(): WjLink;
        _getMetaDataId(): any;
        _getId(): string;
    }
    /**
     * AngularJS directive for menu separators.
     *
     * The <b>wj-menu-item-separator</b> directive must be contained in a {@link wijmo.angular.input.WjMenu} directive.
     * It adds a non-selectable separator to the menu, and has no attributes.
     */
    class WjMenuSeparator extends WjDirective {
        constructor();
        _getMetaDataId(): any;
        _createLink(): WjLink;
        _getId(): string;
    }
    /**
     * AngularJS directive for context menus.
     *
     * Use the <b>wj-context-menu</b> directive to add context menus to elements
     * on the page. The wj-context-menu directive is based on the <b>wj-menu</b>
     * directive; it displays a popup menu when the user performs a context menu
     * request on an element (usually a right-click).
     *
     * The wj-context-menu directive is specified as a parameter added to the
     * element that the context menu applies to. The parameter value is a
     * CSS selector for the element that contains the menu. For example:
     *
     * <pre>&lt;!-- paragraph with a context menu --&gt;
     *&lt;p wj-context-menu="#idMenu" &gt;
        *  This paragraph has a context menu.&lt;/p&gt;
        *
        *&lt;!-- define the context menu (hidden and with an id) --&gt;
        *&lt;wj-menu id="idMenu" ng-show="false"&gt;
        *  &lt;wj-menu-item cmd="cmdOpen" cmd-param ="1"&gt;Open...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item cmd="cmdSave" cmd-param="2"&gt;Save &lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item cmd="cmdSave" cmd-param="3"&gt;Save As...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-item cmd="cmdNew" cmd-param ="4"&gt;New...&lt;/wj-menu-item&gt;
        *  &lt;wj-menu-separator&gt;&lt;/wj-menu-separator&gt;
        *  &lt;wj-menu-item cmd="cmdExit" cmd-param="5"&gt;Exit&lt;/wj-menu-item&gt;
        *&lt;/wj-menu &gt;</pre>
        */
    class WjContextMenu extends WjDirective {
        constructor();
        _getMetaDataId(): any;
        _postLinkFn(): (scope: any, tElement: any, tAttrs: any) => void;
    }
    /**
     * AngularJS directive for the {@link InputDate} control.
     *
     * Use the <b>wj-input-date</b> directive to add {@link InputDate} controls to your
     * AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is an InputDate control:&lt;/p&gt;
     * &lt;wj-input-date
     *   value="theDate"
     *   format="M/d/yyyy"&gt;
     * &lt;/wj-input-date&gt;</pre>
     *
     * The example below shows a <b>Date</b> value (that includes date and time information)
     * using an {@link InputDate} and an {@link InputTime} control. Notice how both controls
     * are bound to the same controller variable, and each edits the appropriate information
     * (either date or time). The example also shows a {@link Calendar} control that can be
     * used to select the date with a single click.
     *
     * <a href="https://jsfiddle.net/Wijmo5/46PhD/" target="_blank">Example</a>
     *
     * The <b>wj-input-date</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>            <dd><code>=</code> A reference to the {@link InputDate} control created by this directive.</dd>
     *   <dt>format</dt>             <dd><code>@</code> The format used to display the date being edited (see {@link Globalize}).</dd>
     *   <dt>mask</dt>               <dd><code>@</code> The mask used to validate the input as the user types (see {@link wijmo.input.InputMask}).</dd>
     *   <dt>is-dropped-down</dt>    <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
     *   <dt>initialized</dt>        <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>     <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
     *   <dt>max</dt>                <dd><code>@</code> The latest valid date (a string in the format "yyyy-MM-dd").</dd>
     *   <dt>min</dt>                <dd><code>@</code> The earliest valid date (a string in the format "yyyy-MM-dd").</dd>
     *   <dt>placeholder</dt>        <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
     *   <dt>is-required</dt>        <dd><code>@</code> A value indicating whether to prevent null values.</dd>
     *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
     *   <dt>text</dt>               <dd><code>=</code> The text to show in the control.</dd>
     *   <dt>value</dt>              <dd><code>=</code> The date being edited.</dd>
     *   <dt>got-focus</dt>          <dd><code>&</code> The {@link InputDate.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>         <dd><code>&</code> The {@link InputDate.lostFocus} event handler.</dd>
     *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The {@link InputDate.isDroppedDownChanging} event handler.</dd>
     *   <dt>is-dropped-down-changed </dt> <dd><code>&</code> The {@link InputDate.isDroppedDownChanged} event handler.</dd>
     *   <dt>text-changed</dt>       <dd><code>&</code> The {@link InputDate.textChanged} event handler.</dd>
     *   <dt>value-changed</dt>      <dd><code>&</code> The {@link InputDate.valueChanged} event handler.</dd>
     * </dl>
     *
     * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
     * "yyyy-MM-dd". Technically, you can use any full date as defined in the W3C
     * <a href="https://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>, which is also
     * the format used with regular HTML5 input elements.
     */
    class WjInputDate extends WjDropDown {
        readonly _controlConstructor: typeof input.InputDate;
    }
    /**
     * AngularJS directive for the {@link InputDateTime} control.
     *
     * Use the <b>wj-input-date-time</b> directive to add {@link InputDateTime} controls to your
     * AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is an InputDateTime control:&lt;/p&gt;
     * &lt;wj-input-date-time
     *   value="theDate"
     *   format="M/d/yyyy"&gt;
     * &lt;/wj-input-date-time&gt;</pre>
     *
     * The <b>wj-input-date-time</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>            <dd><code>=</code> A reference to the {@link InputDate} control created by this directive.</dd>
     *   <dt>format</dt>             <dd><code>@</code> The format used to display the date being edited (see {@link Globalize}).</dd>
     *   <dt>mask</dt>               <dd><code>@</code> The mask used to validate the input as the user types (see {@link wijmo.input.InputMask}).</dd>
     *   <dt>is-dropped-down</dt>    <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
     *   <dt>initialized</dt>        <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>     <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
     *   <dt>max</dt>                <dd><code>@</code> The latest valid date (a string in the format "yyyy-MM-dd").</dd>
     *   <dt>min</dt>                <dd><code>@</code> The earliest valid date (a string in the format "yyyy-MM-dd").</dd>
     *   <dt>placeholder</dt>        <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
     *   <dt>is-required</dt>        <dd><code>@</code> A value indicating whether to prevent null values.</dd>
     *   <dt>show-drop-down-button</dt><dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
     *   <dt>text</dt>               <dd><code>=</code> The text to show in the control.</dd>
     *   <dt>timeMax</dt>            <dd><code>@</code> The earliest valid time (a string in the format "hh:mm").</dd>
     *   <dt>timeMin</dt>            <dd><code>@</code> The latest valid time (a string in the format "hh:mm").</dd>
     *   <dt>timeStep</dt>           <dd><code>@</code> The number of minutes between entries in the drop-down list.</dd>
     *   <dt>timeFormat</dt>         <dd><code>@</code> The format sting used to show values in the time drop-down list.</dd>
     *   <dt>value</dt>              <dd><code>=</code> The date being edited.</dd>
     *   <dt>got-focus</dt>          <dd><code>&</code> The {@link InputDateTime.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>         <dd><code>&</code> The {@link InputDateTime.lostFocus} event handler.</dd>
     *   <dt>is-dropped-down-changing</dt> <dd><code>&</code> The {@link InputDateTime.isDroppedDownChanging} event handler.</dd>
     *   <dt>is-dropped-down-changed </dt> <dd><code>&</code> The {@link InputDateTime.isDroppedDownChanged} event handler.</dd>
     *   <dt>text-changed</dt>       <dd><code>&</code> The {@link InputDateTime.textChanged} event handler.</dd>
     *   <dt>value-changed</dt>      <dd><code>&</code> The {@link InputDateTime.valueChanged} event handler.</dd>
     * </dl>
     */
    class WjInputDateTime extends WjInputDate {
        readonly _controlConstructor: typeof input.InputDateTime;
    }
    /**
     * AngularJS directive for the {@link InputNumber} control.
     *
     * Use the <b>wj-input-number</b> directive to add <b>InputNumber</b> controls to your
     * AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is an InputNumber control:&lt;/p&gt;
     * &lt;wj-input-number
     *   value="theNumber"
     *   min="0"
     *   max="10"
     *   format="n0"
     *   placeholder="number between zero and ten"&gt;
     * &lt;/wj-input-number&gt;</pre>
     *
     * The example below creates several <b>InputNumber</b> controls and shows the effect
     * of using different formats, ranges, and step values.
     *
     * <a href="https://jsfiddle.net/Wijmo5/u7HpD/" target="_blank">Example</a>
     *
     * The <b>wj-input-number</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>       <dd><code>=</code> A reference to the {@link InputNumber} control created by this directive.</dd>
     *   <dt>format</dt>        <dd><code>@</code> The format used to display the number (see {@link Globalize}).</dd>
     *   <dt>input-type</dt>    <dd><code>@</code> The "type" attribute of the HTML input element hosted by the control.</dd>
     *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
     *   <dt>max</dt>           <dd><code>@</code> The largest valid number.</dd>
     *   <dt>min</dt>           <dd><code>@</code> The smallest valid number.</dd>
     *   <dt>place-holder</dt>  <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
     *   <dt>is-required</dt>   <dd><code>@</code> A value indicating whether to prevent null values.</dd>
     *   <dt>show-spinner</dt>  <dd><code>@</code> A value indicating whether to display spinner buttons to change the value by <b>step</b> units.</dd>
     *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the value when the user clicks the spinner buttons.</dd>
     *   <dt>text</dt>          <dd><code>=</code> The text to show in the control.</dd>
     *   <dt>value</dt>         <dd><code>=</code> The number being edited.</dd>
     *   <dt>got-focus</dt>     <dd><code>&</code> The {@link InputNumber.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>    <dd><code>&</code> The {@link InputNumber.lostFocus} event handler.</dd>
     *   <dt>text-changed</dt>  <dd><code>&</code> The {@link InputNumber.textChanged} event handler.</dd>
     *   <dt>value-changed</dt> <dd><code>&</code> The {@link InputNumber.valueChanged} event handler.</dd>
     * </dl>
     */
    class WjInputNumber extends WjDirective {
        readonly _controlConstructor: new (elem: HTMLElement) => wijmo.Control;
    }
    /**
     * AngularJS directive for the {@link InputMask} control.
     *
     * Use the <b>wj-input-mask</b> directive to add {@link InputMask} controls to your
     * AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is an InputMask control:&lt;/p&gt;
     * &lt;wj-input-mask
     *   mask="99/99/99"
     *   mask-placeholder="*"&gt;
     * &lt;/wj-input-mask&gt;</pre>
     *
     * The <b>wj-input-mask</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt> <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link InputNumber} control created by this directive.</dd>
     *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>    <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
     *   <dt>mask</dt>              <dd><code>@</code> The string mask used to format the value as the user types.</dd>
     *   <dt>prompt-char</dt>       <dd><code>@</code> A character used to show input locations within the mask.</dd>
     *   <dt>place-holder</dt>      <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
     *   <dt>value</dt>             <dd><code>=</code> The string being edited.</dd>
     *   <dt>raw-value</dt>         <dd><code>=</code> The string being edited, excluding literal and prompt characters.</dd>
     *   <dt>got-focus</dt>         <dd><code>&</code> The {@link InputMask.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link InputMask.lostFocus} event handler.</dd>
     *   <dt>value-changed</dt>     <dd><code>&</code> The {@link InputMask.valueChanged} event handler.</dd>
     * </dl>
     */
    class WjInputMask extends WjDirective {
        readonly _controlConstructor: new (elem: HTMLElement) => wijmo.Control;
    }
    /**
     * AngularJS directive for the {@link InputTime} control.
     *
     * Use the <b>wj-input-time</b> directive to add <b>InputTime</b> controls to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is an InputTime control:&lt;/p&gt;
     * &lt;wj-input-time
     *   value="theDate"
     *   format="h:mm tt"
     *   min="09:00" max="17:00"
     *   step="15"&gt;
     * &lt;/wj-input-time&gt;</pre>
     *
     * <a href="https://jsfiddle.net/Wijmo5/46PhD/" target="_blank">Example</a>
     *
     * This example edits a <b>Date</b> value (that includes date and time information)
     * using an {@link InputDate} and an InputTime control. Notice how both controls
     * are bound to the same controller variable, and each edits the appropriate information
     * (either date or time). The example also shows a {@link Calendar} control that can be
     * used to select the date with a single click.
     *
     * The <b>wj-input-time</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt><dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>       <dd><code>=</code> A reference to the {@link InputDate} control created by this directive.</dd>
     *   <dt>format</dt>        <dd><code>@</code> The format used to display the selected time.</dd>
     *   <dt>mask</dt>          <dd><code>@</code> A mask used to validate the input as the user types (see {@link InputMask}).</dd>
     *   <dt>max</dt>           <dd><code>@</code> The earliest valid time (a string in the format "hh:mm").</dd>
     *   <dt>min</dt>           <dd><code>@</code> The latest valid time (a string in the format "hh:mm").</dd>
     *   <dt>step</dt>          <dd><code>@</code> The number of minutes between entries in the drop-down list.</dd>
     *   <dt>value</dt>         <dd><code>=</code> The time being edited (as a Date object).</dd>
     *   <dt>value-changed</dt> <dd><code>&</code> The!@see: valueChanged event handler.</dd>
     * </dl>
     *
     * If provided, the <b>min</b> and <b>max</b> attributes are strings in the format
     * "hh:mm". Technically, you can use any full date as defined in the W3C
     * <a href="https://tools.ietf.org/html/rfc3339" target="_blank">[RFC 3339]</a>, which is also the format
     * used with regular HTML5 input elements.
     */
    class WjInputTime extends WjComboBox {
        constructor($compile: any);
        readonly _controlConstructor: typeof input.InputTime;
    }
    /**
     * AngularJS directive for the {@link InputColor} control.
     *
     * Use the <b>wj-input-color</b> directive to add {@link InputColor} controls to your
     * AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is an InputColor control:&lt;/p&gt;
     * &lt;wj-input-color
     *   value="theColor"
     *   show-alpha-channel="false"&gt;
     * &lt;/wj-input-color&gt;</pre>
     *
     * The <b>wj-input-color</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>     <dd><code>@</code> Specifies a control property that is bound to a scope using the <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>               <dd><code>=</code> A reference to the InputColor control created by this directive.</dd>
     *   <dt>is-dropped-down</dt>       <dd><code>@</code> A value indicating whether the drop-down is currently visible.</dd>
     *   <dt>initialized</dt>           <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>        <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
     *   <dt>show-alpha-channel</dt>    <dd><code>@</code> A value indicating whether the drop-down displays the alpha channel (transparency) editor.</dd>
     *   <dt>placeholder</dt>           <dd><code>@</code> The string to show as a hint when the control is empty.</dd>
     *   <dt>is-required</dt>           <dd><code>@</code> A value indicating whether to prevent null values.</dd>
     *   <dt>show-drop-down-button</dt> <dd><code>@</code> A value indicating whether the control displays a drop-down button.</dd>
     *   <dt>text</dt>                  <dd><code>=</code> The text to show in the control.</dd>
     *   <dt>value</dt>                 <dd><code>=</code> The color being edited.</dd>
     *   <dt>got-focus</dt>             <dd><code>&</code> The {@link InputColor.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>            <dd><code>&</code> The {@link InputColor.lostFocus} event handler.</dd>
     *   <dt>is-dropped-down-changing</dt><dd><code>&</code> The {@link InputColor.isDroppedDownChanging} event handler.</dd>
     *   <dt>is-dropped-down-changed</dt><dd><code>&</code> The {@link InputColor.isDroppedDownChanged} event handler.</dd>
     *   <dt>text-changed</dt>          <dd><code>&</code> The {@link InputColor.textChanged} event handler.</dd>
     *   <dt>value-changed</dt>         <dd><code>&</code> The {@link InputColor.valueChanged} event handler.</dd>
     * </dl>
     */
    class WjInputColor extends WjDropDown {
        readonly _controlConstructor: typeof input.InputColor;
    }
    /**
     * AngularJS directive for the {@link Popup} control.
     *
     * Use the <b>wj-popup</b> directive to add {@link Popup} controls to your
     * AngularJS applications.
     *
     * The popup content may be specified inside the <b>wj-popup</b> tag, and can
     * contain an arbitrary HTML fragment with AngularJS bindings and directives.
     *
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a Popup control triggered by a button:&lt;/p&gt;
     * &lt;button id="btn2" type="button"&gt;
     *     Click to show Popup
     * &lt;/button&gt;
     * &lt;wj-popup owner="#btn2" show-trigger="Click" hide-trigger="Blur"&gt;
     *     &lt;h3&gt;
     *         Salutation
     *     &lt;/h3&gt;
     *     &lt;div class="popover-content"&gt;
     *         Hello {&#8203;{firstName}} {&#8203;{lastName}}
     *     &lt;/div&gt;
     * &lt;/wj-popup&gt;</pre>
     *
     * The <b>wj-popup</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>control</dt>         <dd><code>=</code> A reference to the Popup control created by this directive.</dd>
     *   <dt>fade-in</dt>         <dd><code>@</code> A boolean value that determines whether popups should be shown using a fade-in animation.</dd>
     *   <dt>fade-out</dt>        <dd><code>@</code> A boolean value that determines whether popups should be hidden using a fade-out animation.</dd>
     *   <dt>hide-trigger</dt>    <dd><code>@</code> A {@link PopupTrigger} value defining the action that hides the {@link Popup}.</dd>
     *   <dt>initialized</dt>     <dd><code>&</code> This event occurs after the binding has finished initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>  <dd><code>=</code> A value indicating whether the binding has finished initializing the control with attribute values. </dd>
     *   <dt>owner</dt>           <dd><code>@</code> A CSS selector referencing an element that controls the popup visibility.</dd>
     *   <dt>show-trigger</dt>    <dd><code>@</code> A {@link PopupTrigger} value defining the action that shows the {@link Popup}.</dd>
     *   <dt>modal</dt>           <dd><code>@</code> A boolean value that determines whether the {@link Popup} should be displayed as a modal dialog.</dd>
     *   <dt>got-focus</dt>       <dd><code>&</code> The {@link Popup.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>      <dd><code>&</code> The {@link Popup.lostFocus} event handler.</dd>
     *   <dt>showing</dt>         <dd><code>&</code> The {@link Popup.showing} event handler.</dd>
     *   <dt>shown</dt>           <dd><code>&</code> The {@link Popup.shown} event handler.</dd>
     *   <dt>hiding</dt>          <dd><code>&</code> The {@link Popup.hiding} event handler.</dd>
     *   <dt>hidden</dt>          <dd><code>&</code> The {@link Popup.hidden} event handler.</dd>
     * </dl>
     */
    class WjPopup extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof input.Popup;
        _initProps(): void;
    }
    /**
     * AngularJS directive for the {@link MultiSelect} control.
     *
     * Use the <b>wj-multi-select</b> directive to add <b>MultiSelect</b> controls to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a MultiSelect bound to a collection of objects:&lt;/p&gt;
     * &lt;wj-multi-select
     *     placeholder="Select Countries"
     *     items-source="ctx.items"
     *     header-format="{count} countries selected"
     *     display-Member-path="country"
     *     checked-Member-path="selected"&gt;
     * &lt;/wj-multi-select&gt;</pre>
     *
     * The <b>wj-multi-select</b> directive extends {@link wijmo.angular.input.WjComboBox} with the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>checked-member-path</dt>  <dd><code>@</code> The name of the property used to control the checkboxes placed next to each item.</dd>
     *   <dt>header-format</dt>        <dd><code>@</code> The format string used to create the header content when the control has more than <b>maxHeaderItems</b> items checked.</dd>
     *   <dt>header-formatter</dt>     <dd><code>=</code> A function that gets the HTML in the control header.</dd>
     *   <dt>max-header-items</dt>     <dd><code>@</code> The maximum number of items to display on the control header.</dd>
     *   <dt>checked-items-changed</dt><dd><code>&</code> The {@link MultiSelect.checkedItemsChanged} event handler.</dd>
     * </dl>
     */
    class WjMultiSelect extends WjComboBox {
        constructor($compile: any);
        readonly _controlConstructor: typeof input.MultiSelect;
    }
    /**
     * AngularJS directive for the {@link MultiAutoComplete} control.
     *
     * Use the <b>wj-multi-auto-complete</b> directive to add <b>MultiAutoComplete</b> controls to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;p&gt;Here is a InputTags bound to a collection of objects:&lt;/p&gt;
     * &lt;wj-multi-auto-complete
     *     max-selected-items="8"
     *     items-source="ctx.items"
     *     selected-Member-path="selected"&gt;
     * &lt;/wj-multi-auto-complete&gt;</pre>
    
        * The <b>wj-multi-auto-complete</b> directive extends {@link wijmo.angular.input.WjAutoComplete} with the following attributes:
        *
        * <dl class="dl-horizontal">
        *   <dt>max-selected-items</dt>   <dd><code>@</code> The maximum number of items that can be selected.</dd>
        *   <dt>selected-member-path</dt> <dd><code>@</code> The name of the property used to control which
        *                                 item will be selected.</dd>
        *   <dt>selected-items</dt>       <dd><code>@</code> An array containing the items that are currently selected.
        *   <dt>selected-items-changed</dt> <dd><code>&</code> The {@link MultiAutoComplete.selectedItemsChanged} event handler.</dd>
        * </dl>
        */
    class WjMultiAutoComplete extends WjAutoComplete {
        constructor($compile: any);
        readonly _controlConstructor: typeof input.MultiAutoComplete;
    }
    /**
     * AngularJS directive for an {@link ICollectionView} navigator element.
     *
     * Use the <b>wj-collection-view-navigator</b> directive to add an element that allows users to
     * navigate through the items in an {@link ICollectionView}.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>Here is a CollectionViewNavigator:&lt;/p&gt;
     * &lt;wj-collection-view-navigator
     *   cv="myCollectionView"&gt;
     * &lt;/wj-collection-view-navigator&gt;</pre>
     *
     * <a href="https://jsfiddle.net/Wijmo5/s8tT4/" target="_blank">Example</a>
     *
     * This example creates a CollectionView with 100,000 items and 20 items per page.
     * It defines a navigator to select the current page, another to select the current item,
     * and shows the data in a {@link FlexGrid}.
     *
     * The <b>wj-collection-view-navigator</b> directive has a single attribute:
     *
     * <dl class="dl-horizontal">
     *   <dt>cv</dt>  <dd><code>=</code> A reference to the {@link ICollectionView} object to navigate.</dd>
     * </dl>
     */
    class WjCollectionViewNavigator extends WjDirective {
        constructor();
        _getMetaDataId(): any;
        _postLinkFn(): (scope: any, tElement: any, tAttrs: any, dropDownController: any) => void;
    }
    /**
     * AngularJS directive for an {@link ICollectionView} pager element.
     *
     * Use the <b>wj-collection-view-pager</b> directive to add an element that allows users to
     * navigate through the pages in a paged {@link ICollectionView}.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>Here is a CollectionViewPager:&lt;/p&gt;
     * &lt;wj-collection-view-pager
     *   cv="myCollectionView"&gt;
     * &lt;/wj-collection-view-pager&gt;</pre>
     *
     * <a href="https://jsfiddle.net/Wijmo5/s8tT4/" target="_blank">Example</a>
     *
     * This example creates a CollectionView with 100,000 items and 20 items per page.
     * It defines a navigator to select the current page, another to select the current item,
     * and shows the data in a {@link FlexGrid}.
     *
     * The <b>wj-collection-view-pager</b> directive has a single attribute:
     *
     * <dl class="dl-horizontal">
     *   <dt>cv</dt>  <dd><code>=</code> A reference to the paged {@link ICollectionView} object to navigate.</dd>
     * </dl>
     */
    class WjCollectionViewPager extends WjDirective {
        constructor();
        _getMetaDataId(): any;
        _postLinkFn(): (scope: any, tElement: any, tAttrs: any, dropDownController: any) => void;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    class WjGauge extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof gauge.Gauge;
    }
    /**
     * AngularJS directive for the {@link LinearGauge} control.
     *
     * Use the <b>wj-linear-gauge</b> directive to add linear gauges to your AngularJS applications.
     * Note that directive and parameter names must be formatted in lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-linear-gauge
     *   value="ctx.gauge.value"
     *   show-text="Value"
     *   is-read-only="false"&gt;
     *   &lt;wj-range
     *     wj-property="pointer"
     *     thickness="0.2"&gt;
     *     &lt;wj-range
     *       min="0"
     *       max="33"
     *       color="green"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range
     *       min="33"
     *       max="66"
     *       color="yellow"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range
     *       min="66"
     *       max="100"
     *       color="red"&gt;
     *     &lt;/wj-range&gt;
     *   &lt;/wj-range&gt;
     * &lt;/wj-linear-gauge&gt;</pre>
     *
     * The <b>wj-linear-gauge</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
     *                               <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>       <dd><code>=</code> A reference to the {@link LinearGauge}
     *                          control created by this directive.</dd>
     *   <dt>direction</dt>     <dd><code>@</code> The {@link GaugeDirection} value in
     *                          which the gauge fills as the value grows.</dd>
     *   <dt>format</dt>        <dd><code>@</code> The format string used for displaying
     *                          the gauge values as text.</dd>
     *   <dt>has-shadow</dt>    <dd><code>@</code> A value indicating whether the gauge
     *                          displays a shadow effect.</dd>
     *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
     *                          initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
     *                           initializing the control with attribute values. </dd>
     *   <dt>is-animated</dt>   <dd><code>@</code> A value indicating whether the gauge
     *                          animates value changes.</dd>
     *   <dt>is-read-only</dt>  <dd><code>@</code> A value indicating whether users are
     *                          prevented from editing the value.</dd>
     *   <dt>min</dt>           <dd><code>@</code> The minimum value that the gauge
     *                          can display.</dd>
     *   <dt>max</dt>           <dd><code>@</code> The maximum value that the gauge
     *                          can display.</dd>
     *   <dt>show-text</dt>     <dd><code>@</code> The {@link ShowText} value indicating
     *                          which values display as text within the gauge.</dd>
     *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the value
     *                          property when the user presses the arrow keys.</dd>
     *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the gauge, on a scale
     *                          of zero to one.</dd>
     *   <dt>value</dt>         <dd><code>=</code> The value displayed on the gauge.</dd>
     *   <dt>got-focus</dt>     <dd><code>&</code> The {@link LinearGauge.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>    <dd><code>&</code> The {@link LinearGauge.lostFocus} event handler.</dd>
     * </dl>
     *
     * The <b>wj-linear-gauge</b> directive may contain one or more {@link wijmo.angular.gauge.WjRange} directives.
     *
     * <a href="https://jsfiddle.net/Wijmo5/t842jozb/" target="_blank">Example</a>
     */
    class WjLinearGauge extends WjGauge {
        constructor();
        readonly _controlConstructor: typeof gauge.LinearGauge;
    }
    /**
     * AngularJS directive for the {@link BulletGraph} control.
     *
     * Use the <b>wj-bullet-graph</b> directive to add bullet graphs to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-bullet-graph
     *   value="ctx.gauge.value"
     *   min="0" max="10"
     *   target="{&#8203;{item.target}}"
     *   bad="{&#8203;{item.target * .75}}"
     *   good="{&#8203;{item.target * 1.25}}"&gt;
     * &lt;/wj-bullet-graph&gt;</pre>
     *
     * The <b>wj-bullet-graph</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>control</dt>       <dd><code>=</code> A reference to the BulletGraph control
     *                          created by this directive.</dd>
     *   <dt>direction</dt>     <dd><code>@</code> The {@link GaugeDirection} value
     *                          indicating which direction the gauge fills as the value grows.</dd>
     *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
     *                          initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
     *                           initializing the control with attribute values. </dd>
     *   <dt>target</dt>        <dd><code>@</code> The target value for the measure.</dd>
     *   <dt>good</dt>          <dd><code>@</code> A reference value considered good for the
     *                          measure.</dd>
     *   <dt>bad</dt>           <dd><code>@</code> A reference value considered bad for the
     *                          measure.</dd>
     *   <dt>value</dt>         <dd><code>=</code> The actual value of the measure.</dd>
     * </dl>
     *
     * The <b>wj-bullet-graph</b> directive may contain one or more {@link wijmo.angular.gauge.WjRange} directives.
     *
     * <a href="https://jsfiddle.net/Wijmo5/8uxb1vwf/" target="_blank">Example</a>
     */
    class WjBulletGraph extends WjLinearGauge {
        constructor();
        readonly _controlConstructor: typeof gauge.BulletGraph;
    }
    /**
     * AngularJS directive for the {@link RadialGauge} control.
     *
     * Use the <b>wj-radial-gauge</b> directive to add radial gauges to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>Here is a &lt;b&gt;RadialGauge&lt;/b&gt; control:&lt;/p&gt;
     * &lt;wj-radial-gauge
     *   style="height:300px"
     *   value="count"
     *   min="0" max="10"
     *   is-read-only="false"&gt;
     * &lt;/wj-radial-gauge&gt;</pre>
     *
     * The <b>wj-radial-gauge</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>ng-model</dt>      <dd><code>@</code> Binds the control's <b>value</b> property using the ng-model Angular
     *                          directive. Binding the property using the ng-model directive provides standard benefits
     *                          like validation, adding the control's state to the form instance, and so on. To redefine
     *                          properties on a control that is bound by the ng-model directive, use the wj-model-property
     *                          attribute.</dd>
     *   <dt>wj-model-property</dt>  <dd><code>@</code> Specifies a control property that is bound to a scope using the
     *                               <b>ng-model</b> directive.</dd>
     *   <dt>control</dt>       <dd><code>=</code> A reference to the RadialGauge
     *                          control created by this directive.</dd>
     *   <dt>auto-scale</dt>    <dd><code>@</code> A value indicating whether the gauge
     *                          scales the display to fill the host element.</dd>
     *   <dt>format</dt>        <dd><code>@</code> The format string used for displaying
     *                          gauge values as text.</dd>
     *   <dt>has-shadow</dt>    <dd><code>@</code> A value indicating whether the gauge
     *                          displays a shadow effect.</dd>
     *   <dt>initialized</dt>   <dd><code>&</code> This event occurs after the binding has finished
     *                          initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt> <dd><code>=</code> A value indicating whether the binding has finished
     *                           initializing the control with attribute values. </dd>
     *   <dt>is-animated</dt>   <dd><code>@</code> A value indicating whether the gauge
     *                          animates value changes.</dd>
     *   <dt>is-read-only</dt>  <dd><code>@</code> A value indicating whether users are
     *                          prevented from editing the value.</dd>
     *   <dt>min</dt>           <dd><code>@</code> The minimum value that the gauge
     *                          can display.</dd>
     *   <dt>max</dt>           <dd><code>@</code> The maximum value that the gauge
     *                          can display.</dd>
     *   <dt>show-text</dt>     <dd><code>@</code> A {@link ShowText} value indicating
     *                          which values display as text within the gauge.</dd>
     *   <dt>step</dt>          <dd><code>@</code> The amount to add or subtract to the
     *                          value property when the user presses the arrow keys.</dd>
     *   <dt>start-angle</dt>   <dd><code>@</code> The starting angle for the gauge, in
     *                          degreees, measured clockwise from the 9 o'clock position.</dd>
     *   <dt>sweep-angle</dt>   <dd><code>@</code> The sweeping angle for the gauge in degrees
     *                          (may be positive or negative).</dd>
     *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the gauge, on a scale
     *                          of zero to one.</dd>
     *   <dt>value</dt>         <dd><code>=</code> The value displayed on the gauge.</dd>
     *   <dt>got-focus</dt>     <dd><code>&</code> The {@link RadialGauge.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>    <dd><code>&</code> The {@link RadialGauge.lostFocus} event handler.</dd>
     * </dl>
     *
     * The <b>wj-radial-gauge</b> directive may contain one or more {@link wijmo.angular.gauge.WjRange} directives.
     *
     * <a href="https://jsfiddle.net/Wijmo5/7ec2144u/" target="_blank">Example</a>
     */
    class WjRadialGauge extends WjGauge {
        constructor();
        readonly _controlConstructor: typeof gauge.RadialGauge;
    }
    /**
     * AngularJS directive for the {@link Range} object.
     *
     * The <b>wj-range</b> directive must be contained in a {@link wijmo.angular.gauge.WjLinearGauge}, {@link wijmo.angular.gauge.WjRadialGauge}
     * or {@link wijmo.angular.gauge.WjBulletGraph} directive. It adds the Range object to the 'ranges' array property
     * of the parent directive. You may also initialize other Range type properties of the parent
     * directive by specifying the property name with the wj-property attribute.
     *
     * For example:
     * <pre>&lt;wj-radial-gauge
     *     min="0"
     *     max="200"
     *     step="20"
     *     value="theValue"
     *     is-read-only="false"&gt;
     *     &lt;wj-range
     *       min="0"
     *       max="100"
     *       color="red"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range
     *       min="100"
     *       max="200"
     *       color="green"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range
     *       wj-property="pointer"
     *       color="blue"&gt;
     *     &lt;/wj-range&gt;
     * &lt;/wj-radial-gauge&gt;</pre>
     *
     * The <b>wj-range</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>min</dt>           <dd><code>@</code> The minimum value in the range.</dd>
     *   <dt>max</dt>           <dd><code>@</code> The maximum value in the range.</dd>
     *   <dt>color</dt>         <dd><code>@</code> The color used to display the range.</dd>
     *   <dt>thickness</dt>     <dd><code>@</code> The thickness of the range, on a scale
     *                          of zero to one.</dd>
     *   <dt>name</dt>          <dd><code>@</code> The name of the range.</dd>
     *   <dt>wj-property</dt>   <dd><code>@</code> The name of the property to initialize
     *                          with this directive.</dd>
     * </dl>
     */
    class WjRange extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
        _initControl(element: any): any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link TreeView} control.
     *
     * Use the <b>wj-tree-view</b> directive to add TreeView to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-tree-view  items-source="items"
     *   display-member-path="ctx.displayMemberPath"
     *   child-items-path="ctx.childItemsPath"
     *   is-animated="ctx.isAnimated"&gt;
     * &lt;/wj-tree-view&gt;</pre>
     *
     * The <b>wj-tree-view</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>items-source</dt>          <dd><code>=</code>An array that contains the {@link TreeView} items. </dd>
     *   <dt>child-items-path</dt>      <dd><code>@</code> A value indicating the name of the property (or properties)
     *                                  that contains the child items for each node.</dd>
     *   <dt>control</dt>               <dd><code>=</code> A reference to the {@link TreeView}
     *                                  control created by this directive. </dd>
     *   <dt>display-member-path</dt>   <dd><code>@</code> A value indicating the name of the property (or properties)
     *                                  to use as the visual representation of the nodes. </dd>
     *   <dt>image-member-path</dt>     <dd><code>@</code> A value indicating the name of the property (or properties) to
     *                                  use as a source of images for the nodes. </dd>
     *   <dt>is-content-html</dt>       <dd><code>@</code> A value indicating whether whether items
     *                                  are bound to plain text or HTML. </dd>
     *   <dt>initialized</dt>           <dd><code>&</code> This event occurs after the binding has finished
     *                                  initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>        <dd><code>=</code> A value indicating whether the binding has finished
     *                                  initializing the control with attribute values. </dd>
     *   <dt>show-checkboxes</dt>       <dd><code>@</code> A value determines whether the {@link TreeView} should
     *                                  add checkboxes to nodes and manage their state.</dd>
     *   <dt>auto-collapse</dt>         <dd><code>@</code> A value determines if sibling nodes should be collapsed
     *                                  when a node is expanded.</dd>
     *   <dt>is-animated</dt>           <dd><code>@</code> A value indicating whether to use animations when expanding
     *                                  or collapsing nodes.</dd>
     *   <dt>is-readOnly</dt>           <dd><code>@</code> A value determines whether users can edit the text in the
     *                                  nodes.</dd>
     *   <dt>allow-dragging</dt>        <dd><code>@</code> A value determines whether users can drag and drop nodes
     *                                  within the {@link TreeView}.</dd>
     *   <dt>expand-on-click</dt>       <dd><code>@</code> A value determines whether to expand collapsed nodes when
     *                                  the user clicks the node header.</dd>
     *   <dt>selected-item</dt>         <dd><code>@</code> A value indicating the data item that is currently
     *                                  selected.</dd>
     *   <dt>selected-node</dt>         <dd><code>@</code> A value indicating {@link TreeNode} that is currently
     *                                  selected.</dd>
     *   <dt>checked-items</dt>         <dd><code>@</code> An array containing the items that are currently
     *                                  checked.</dd>
     *   <dt>lazy-load-function</dt>   <dd><code>=</code> A function that loads child nodes on demand.</dd>
     *   <dt>items-source-changed</dt>  <dd><code>&</code> The {@link TreeView.itemsSourceChanged} event handler.</dd>
     *   <dt>loading-items</dt>         <dd><code>&</code> The {@link TreeView.loadingItems} event handler.</dd>
     *   <dt>loaded-items</dt>          <dd><code>&</code> The {@link TreeView.loadedItems} event handler.</dd>
     *   <dt>item-clicked</dt>          <dd><code>&</code> The {@link TreeView.itemClicked} event handler.</dd>
     *   <dt>selected-item-changed</dt> <dd><code>&</code> The {@link TreeView.selectedItemChanged} event handler.</dd>
     *   <dt>checked-items-Changed</dt> <dd><code>&</code> The {@link TreeView.checkedItemsChanged} event handler.</dd>
     *   <dt>is-collapsed-changing</dt> <dd><code>&</code> The {@link TreeView.isCollapsedChanging} event handler.</dd>
     *   <dt>is-collapsed-changed</dt>  <dd><code>&</code> The {@link TreeView.isCollapsedChanged} event handler.</dd>
     *   <dt>is-checked-changing</dt>   <dd><code>&</code> The {@link TreeView.isCheckedChanging} event handler.</dd>
     *   <dt>is-checked-changed</dt>    <dd><code>&</code> The {@link TreeView.isCheckedChanged} event handler.</dd>
     *   <dt>format-item</dt>           <dd><code>&</code> The {@link TreeView.formatItem} event handler.</dd>
     *   <dt>drag-start</dt>            <dd><code>&</code> The {@link TreeView.dragStart} event handler.</dd>
     *   <dt>drag-over</dt>             <dd><code>&</code> The {@link TreeView.dragOver} event handler.</dd>
     *   <dt>drop</dt>                  <dd><code>&</code> The {@link TreeView.drop} event handler.</dd>
     *   <dt>drag-end</dt>              <dd><code>&</code> The {@link TreeView.dragEnd} event handler.</dd>
     *   <dt>node-edit-starting</dt>    <dd><code>&</code> The {@link TreeView.nodeEditStarting} event handler.</dd>
     *   <dt>node-edit-started</dt>     <dd><code>&</code> The {@link TreeView.nodeEditStarted} event handler.</dd>
     *   <dt>node-edit-ending</dt>      <dd><code>&</code> The {@link TreeView.nodeEditEnding} event handler.</dd>
     *   <dt>node-edit-ended</dt>       <dd><code>&</code> The {@link TreeView.nodeEditEnded} event handler.</dd>
     * </dl>
     */
    class WjTreeView extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof nav.TreeView;
    }
    /**
     * AngularJS directive for the {@link TabPanel} control.
     *
     * Use the <b>wj-tab-panel</b> directive to add TabPanel to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-tab-panel&gt;
     *    &lt;wj-tab&gt;
     *      &lt;a&gt;Tab1 Header&lt;/a&gt;
     *      &lt;div&gt;
     *          Tab1 content
     *      &lt;/div&gt;
     *    &lt;/wj-tab&gt;
     *    &lt;wj-tab is-disabled="true"&gt;
     *      &lt;a&gt;Tab2 Header&lt;/a&gt;
     *      &lt;div&gt;
     *          Tab2 content
     *      &lt;/div&gt;
     *    &lt;/wj-tab&gt;
     * &lt;/wj-tab-panel&gt;</pre>
     *
     * The <b>wj-tab-panel</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>is-animated</dt>           <dd><code>@</code>A value that determines whether tab changes should be animated
     *                                  with a fade-in effect. </dd>
     *   <dt>auto-switch</dt>           <dd><code>@</code> A value that determines whether the control should switch
     *                                  tabs automatically when the user selects a tab using the arrow keys.</dd>
     *   <dt>control</dt>               <dd><code>=</code> A reference to the {@link TabPanel}
     *                                  control created by this directive. </dd>
     *   <dt>selected-index</dt>        <dd><code>=</code> The index of the currently selected (active) tab. </dd>
     *   <dt>selected-tab</dt>        <dd><code>=</code> The {@link Tab} object that is currently selected. </dd>
     *   <dt>initialized</dt>           <dd><code>&</code> This event occurs after the binding has finished
     *                                  initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>        <dd><code>=</code> A value indicating whether the binding has finished
     *                                  initializing the control with attribute values. </dd>
     *   <dt>selected-index-changed</dt>  <dd><code>&</code> The {@link TabPanel.selectedIndexChanged} event handler.</dd>
     * </dl>
     *
     * The <b>wj-tab-panel</b> directive may contain one or more {@link wijmo.angular.nav.WjTab} directives.
     *
     */
    class WjTabPanel extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof nav.TabPanel;
        _initControl(element: any): any;
        _createLink(): WjLink;
    }
    /**
     * AngularJS directive for the {@link Tab} object.
     *
     * The <b>wj-tab</b> directive must be contained in a {@link TabPanel} directive.
     * It adds the Tab object to the 'tabs' array property of the parent directive.
     *
     * For example:
     * <pre>&lt;wj-tab-panel&gt;
     *    &lt;wj-tab&gt;
     *      &lt;a&gt;Tab1 Header&lt;/a&gt;
     *      &lt;div&gt;
     *          Tab1 content
     *      &lt;/div&gt;
     *    &lt;/wj-tab&gt;
     *    &lt;wj-tab is-disabled="true"&gt;
     *      &lt;a&gt;Tab2 Header&lt;/a&gt;
     *      &lt;div&gt;
     *          Tab2 content
     *      &lt;/div&gt;
     *    &lt;/wj-tab&gt;
     * &lt;/wj-tab-panel&gt;</pre>
     *
     * The <b>wj-tab</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>is-disabled</dt>   <dd><code>@</code> A value that determines whether this {@link Tab} is disabled.</dd>
     *   <dt>is-visible</dt>    <dd><code>@</code> A value that determines whether this {@link Tab} is visible.</dd>
     * </dl>
     */
    class WjTab extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof nav.Tab;
        _initControl(element: any): any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    class WjFlexChartBase extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof chart.FlexChartBase;
        _initProps(): void;
    }
    class WjFlexChartCore extends WjFlexChartBase {
        readonly _controlConstructor: typeof chart.FlexChartCore;
        _initProps(): void;
    }
    /**
     * AngularJS directive for the {@link FlexChart} control.
     *
     * Use the <b>wj-flex-chart</b> directive to add charts to your AngularJS applications.
     * Note that directive and parameter names must be formatted using lower-case letters
     * with dashes instead of camel case. For example:
     *
     * <pre>&lt;p&gt;Here is a FlexChart control:&lt;/p&gt;
     * &lt;wj-flex-chart
     *   style="height:300px"
     *   items-source="data"
     *   binding-x="country"&gt;
     *   &lt;wj-flex-chart-axis
     *     wj-property="axisY"
     *     major-unit="5000"&gt;
     *   &lt;/wj-flex-chart-axis&gt;
     *   &lt;wj-flex-chart-series
     *     binding="sales"
     *     name="Sales"&gt;
     *   &lt;/wj-flex-chart-series&gt;
     *   &lt;wj-flex-chart-series
     *     binding="expenses"
     *     name="Expenses"&gt;
     *   &lt;/wj-flex-chart-series&gt;
     *   &lt;wj-flex-chart-series
     *     binding="downloads"
     *     name="Downloads"
     *     chart-type="LineSymbols"&gt;
     *   &lt;/wj-flex-chart-series&gt;
     * &lt;/wj-flex-chart&gt;</pre>
     *
     * The example below creates a {@link FlexChart} control and binds it to a 'data' array
     * exposed by the controller. The chart has three series objects, each corresponding to
     * a property in the objects contained in the source array. The last series in the
     * example uses the 'chart-type' attribute to override the default chart type used
     * for the other series objects.
     *
     * <a href="https://jsfiddle.net/Wijmo5/QNb9X/" target="_blank">Example</a>
     *
     * The wj-flex-chart directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
     *                              values for the chart. You can override this at the series level.</dd>
     *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
     *                              values for the chart. You can override this at the series level.</dd>
     *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
     *                              objects. You can override this at the series level. See {@link ChartType}.</dd>
     *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link FlexChart} control
     *                              that this directive creates.</dd>
     *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
     *                              text).</dd>
     *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
     *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
     *                              text).</dd>
     *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
     *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
     *                              initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
     *                              initializing the control with attribute values. </dd>
     *   <dt>interpolate-nulls</dt> <dd><code>@</code> The value indicating whether to interpolate or
     *                              leave gaps when there are null values in the data.</dd>
     *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
     *                              appearance of data points.</dd>
     *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                              the data used to create the chart.</dd>
     *   <dt>legend-toggle</dt>     <dd><code>@</code> The value indicating whether clicking legend items
     *                              toggles series visibility.</dd>
     *   <dt>options</dt>           <dd><code>=</code> Chart options that only apply to certain chart types.
     *                              See <b>options</b> under {@link FlexChart} for details.</dd>
     *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
     *                              displaying each series.</dd>
     *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
     *                              edges of the control and the plot area, or CSS-style margins.</dd>
     *   <dt>rotated</dt>           <dd><code>@</code> The value indicating whether to flip the axes so that
     *                              X is vertical and Y is horizontal.</dd>
     *   <dt>selection</dt>         <dd><code>=</code> The series object that is selected.</dd>
     *   <dt>selection-mode</dt>    <dd><code>@</code> The {@link SelectionMode} value indicating whether or what is
     *                              selected when the user clicks a series.</dd>
     *   <dt>stacking</dt>          <dd><code>@</code> The {@link Stacking} value indicating whether or how series
     *                              objects are stacked or plotted independently.</dd>
     *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data points in Scatter,
     *                              LineSymbols, and SplineSymbols charts, in pixels. You can override
     *                              this at the series level.</dd>
     *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
     *                              {@link ChartTooltip} content property.</dd>
     *   <dt>got-focus</dt>         <dd><code>&</code> The {@link FlexChart.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link FlexChart.lostFocus} event handler.</dd>
     *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexChart.rendering} event handler.</dd>
     *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexChart.rendered} event handler.</dd>
     *   <dt>series-visibility-changed</dt>
     *                              <dd><code>&</code> The {@link FlexChart.seriesVisibilityChanged} event handler.</dd>
     *   <dt>selection-changed</dt> <dd><code>&</code> The {@link FlexChart.selectionChanged} event handler.</dd>
     * </dl>
     *
     * The wj-flex-chart directive may contain the following child directives:
     * {@link wijmo.angular.chart.WjFlexChartAxis}, {@link wijmo.angular.chart.WjFlexChartSeries}, {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
     */
    class WjFlexChart extends WjFlexChartCore {
        readonly _controlConstructor: typeof chart.FlexChart;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link Axis} object.
     *
     * The <b>wj-flex-chart-axis</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>wj-property</dt>     <dd><code>@</code> Defines the {@link FlexChart} property name,
     *                            axis-x or axis-y, to initialize with the directive.</dd>
     *   <dt>axis-line</dt>       <dd><code>@</code> The value indicating whether the axis line is visible.</dd>
     *   <dt>binding</dt>         <dd><code>@</code> Gets or sets the comma-separated property names for
     *                            the {@link wijmo.chart.Axis.itemsSource} property to use in axis labels.
     *                            The first name specifies the value on the axis, the second represents
     *                            the corresponding axis label. The default value is 'value,text'.</dd>
     *   <dt>format</dt>          <dd><code>@</code> The format string used for the axis labels
     *                            (see {@link Globalize}).</dd>
     *   <dt>item-formatter</dt>  <dd><code>=</code> The formatter function that customizes the
     *                            appearance of axis labels.</dd>
     *   <dt>items-source</dt>    <dd><code>=</code> The items source for the axis labels.</dd>
     *   <dt>labels</dt>          <dd><code>@</code> The value indicating whether the axis labels are visible.</dd>
     *   <dt>label-angle</dt>     <dd><code>@</code> The rotation angle of axis labels in degrees.</dd>
     *   <dt>label-align</dt>     <dd><code>@</code> The alignment of axis labels.</dd>
     *   <dt>label-padding</dt>   <dd><code>@</code> The padding of axis labels.</dd>
     *   <dt>major-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes grid lines.</dd>
     *   <dt>major-tick-marks</dt><dd><code>@</code> Defines the appearance of tick marks on the axis
     *                            (see {@link TickMark}).</dd>
     *   <dt>major-unit</dt>      <dd><code>@</code> The number of units between axis labels.</dd>
     *   <dt>max</dt>             <dd><code>@</code> The minimum value shown on the axis.</dd>
     *   <dt>min</dt>             <dd><code>@</code> The maximum value shown on the axis.</dd>
     *   <dt>minor-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes minor grid lines.</dd>
     *   <dt>minor-tick-marks</dt><dd><code>@</code> Defines the appearance of minor tick marks on the axis
     *                            (see {@link TickMark}).</dd>
     *   <dt>minor-unit</dt>      <dd><code>@</code> The number of units between minor axis ticks.</dd>
     *   <dt>origin</dt>          <dd><code>@</code> The axis origin.</dd>
     *   <dt>overlappingLabels</dt><dd><code>@</code> The {@link OverlappingLabels} value indicating how to handle the overlapping axis labels.</dd>
     *   <dt>position</dt>        <dd><code>@</code> The {@link Position} value indicating the position of the axis.</dd>
     *   <dt>reversed</dt>        <dd><code>@</code> The value indicating whether the axis is reversed (top to
     *                            bottom or right to left).</dd>
     *   <dt>title</dt>           <dd><code>@</code> The title text shown next to the axis.</dd>
     * </dl>
     */
    class WjFlexChartAxis extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof chart.Axis;
        _initControl(element: any): any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link Legend} object.
     *
     * The <b>wj-flex-chart-legend</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive, {@link wijmo.angular.chart.WjFlexPie} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>position</dt>       <dd><code>@</code> The {@link Position} value indicating the position of the
     *                           legend.</dd>
     * </dl>
     *
     * The example below shows how you can use the wj-flex-chart-legend directive
     * to change the position of the chart legend:
     *
     * <pre>&lt;wj-flex-chart
     *   items-source="data"
     *   binding-x="country"&gt;
     *   &lt;wj-flex-chart-axis
     *       wj-property="axisY"
     *       major-unit="5000"&gt;
     *     &lt;/wj-flex-chart-axis&gt;
     *     &lt;wj-flex-chart-series
     *       binding="sales"
     *       name="Sales"&gt;
     *     &lt;/wj-flex-chart-series&gt;
     *   &lt;wj-flex-chart-legend
     *     position="Bottom"&gt;
     *   &lt;/wj-flex-chart-legend&gt;
     * &lt;/wj-flex-chart&gt;</pre>
     */
    class WjFlexChartLegend extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof chart.Legend;
    }
    class WjFlexChartDataLabelBase extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof chart.DataLabelBase;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link DataLabel} object.
     *
     * The <b>wj-flex-chart-data-label</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>content</dt>       <dd><code>=</code> A string or function that gets or sets the content of the data labels.</dd>
     *   <dt>border</dt>        <dd><code>@</code> Gets or sets a value indicating whether the data labels have borders.</dd>
     *   <dt>position</dt>      <dd><code>@</code> The {@link LabelPosition} value indicating the position of the data labels.</dd>
     * </dl>
     */
    class WjFlexChartDataLabel extends WjFlexChartDataLabelBase {
        constructor();
        readonly _controlConstructor: typeof chart.DataLabel;
    }
    /**
     * AngularJS directive for the {@link FlexPie} {@link PieDataLabel} object.
     *
     * The <b>wj-flex-pie-data-label</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexPie} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>content</dt>       <dd><code>=</code> A string or function that gets or sets the content of the data labels.</dd>
     *   <dt>border</dt>        <dd><code>@</code> Gets or sets a value indicating whether the data labels have borders.</dd>
     *   <dt>position</dt>      <dd><code>@</code> The {@link PieLabelPosition} value indicating the position of the data labels.</dd>
     * </dl>
     */
    class WjFlexPieDataLabel extends WjFlexChartDataLabelBase {
        constructor();
        readonly _controlConstructor: typeof chart.PieDataLabel;
    }
    class WjSeriesBase extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
        _initControl(element: any): any;
        _getId(): string;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link Series} object.
     *
     * The <b>wj-flex-chart-series</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>axis-x</dt>       <dd><code>@</code> X-axis for the series.</dd>
     *   <dt>axis-y</dt>       <dd><code>@</code> Y-axis for the series.</dd>
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
     *                         objects. This value overrides the default chart type set on the chart. See
     *                         {@link ChartType}.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data points in this series
     *                         for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any settings at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any settings at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     * </dl>
     *
     * In most cases, the <b>wj-flex-chart-series</b> specifies only the <b>name</b> and <b>binding</b> properties.
     * The remaining values are inherited from the parent <b>wj-flex-chart</b> directive.
     */
    class WjFlexChartSeries extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link LineMarker} object.
     *
     * The <b>wj-flex-line-marker</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>is-visible</dt>             <dd><code>@</code> The value indicating whether the LineMarker is visible.</dd>
     *   <dt>series-index</dt>           <dd><code>@</code> The index of the series in the chart in which the LineMarker appears.</dd>
     *   <dt>horizontal-position</dt>    <dd><code>@</code> The horizontal position of the LineMarker relative to the plot area.</dd>
     *   <dt>content</dt>               <dd><code>@</code> The function that allows you to customize the text content of the LineMarker.</dd>
     *   <dt>vertical-position</dt>      <dd><code>@</code> The vertical position of the LineMarker relative to the plot area.</dd>
     *   <dt>alignment</dt>             <dd><code>@</code> The {@link LineMarkerAlignment} value indicating the alignment of the LineMarker content.</dd>
     *   <dt>lines</dt>                 <dd><code>@</code> The {@link LineMarkerLines} value indicating the appearance of the LineMarker's lines.</dd>
     *   <dt>interaction</dt>           <dd><code>@</code> The {@link LineMarkerInteraction} value indicating the interaction mode of the LineMarker.</dd>
     *   <dt>drag-threshold</dt>         <dd><code>@</code> The maximum distance from the horizontal or vertical line that you can drag the marker.</dd>
     *   <dt>drag-content</dt>           <dd><code>@</code> The value indicating whether you can drag the content of the marker when the interaction mode is "Drag".</dd>
     *   <dt>drag-lines</dt>             <dd><code>@</code> The value indicating whether the lines are linked when you drag the horizontal or vertical line when the interaction mode is "Drag".</dd>
     * </dl>
     */
    class WjFlexChartLineMarker extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link DataPoint} object.
     *
     * The <b>wj-flex-chart-data-point</b> directive must be contained in a
     * {@link wijmo.angular.chart.annotation.WjFlexChartAnnotation} directive.
     * The property of the parent directive's object
     * where <b>wj-flex-data-point</b> should assign a value is specified in the
     * <b>wj-property</b> attribute.
     *
     * The directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *
     *   <dt>wj-property</dt>        <dd><code>@</code> The name of the parent directive object's property where the
     *                                <b>DataPoint</b> will be assigned.</dd>
     *   <dt>x</dt>                  <dd><code>@</code> x coordinate, can be a numeric or date value.</dd>
     *   <dt>y</dt>                  <dd><code>@</code> y coordinate, can be a numeric or date value.</dd>
     * </dl>
     */
    class WjFlexChartDataPoint extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexPie} control.
     *
     * <dl class="dl-horizontal">
     *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView}
     *                              object that contains data for the chart.</dd>
     *   <dt>binding</dt>           <dd><code>@</code> The name of the property that
     *                              contains item values.</dd>
     *   <dt>binding-name</dt>      <dd><code>@</code> The name of the property that
     *                              contains item names.</dd>
     *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
     *                              text).</dd>
     *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
     *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
     *                              text).</dd>
     *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
     *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
     *                              initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
     *                              initializing the control with attribute values. </dd>
     *   <dt>inner-radius</dt>      <dd><code>@</code> The size of the hole inside the
     *                              pie, measured as a fraction of the pie radius.</dd>
     *   <dt>is-animated</dt>       <dd><code>@</code> A value indicating whether to use animation
     *                              to move selected items to the selectedItemPosition.</dd>
     *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
     *                              appearance of data points.</dd>
     *   <dt>offset</dt>            <dd><code>@</code> The extent to which pie slices are pulled
     *                              out from the center, as a fraction of the pie radius.</dd>
     *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
     *                              displaying pie slices.</dd>
     *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
     *                              edges of the control and the plot area, or CSS-style margins.</dd>
     *   <dt>reversed</dt>          <dd><code>@</code> A value indicating whether to draw pie
     *                              slices in a counter-clockwise direction.</dd>
     *   <dt>start-angle</dt>       <dd><code>@</code> The starting angle for pie slices,
     *                              measured clockwise from the 9 o'clock position.</dd>
     *   <dt>selected-item-offset</dt>
     *                              <dd><code>@</code> The extent to which the selected pie slice is
     *                              pulled out from the center, as a fraction of the pie radius.</dd>
     *   <dt>selected-item-position</dt>
     *                              <dd><code>@</code> The {@link Position} value indicating where to display
     *                              the selected slice.</dd>
     *   <dt>selection-mode</dt>    <dd><code>@</code> The {@link SelectionMode} value indicating whether or what is
     *                              selected when the user clicks a series.</dd>
     *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
     *                              {@link ChartTooltip} content property.</dd>
     *   <dt>got-focus</dt>         <dd><code>&</code> The {@link FlexPie.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link FlexPie.lostFocus} event handler.</dd>
     *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexPie.rendering} event handler.</dd>
     *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexPie.rendered} event handler.</dd>
     * </dl>
     *
     * The wj-flex-pie directive may contain the following child directives:
     * {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexPieDataLabel}.
     */
    class WjFlexPie extends WjFlexChartBase {
        readonly _controlConstructor: typeof chart.FlexPie;
        _initProps(): void;
    }
    class WjFlexChartPlotArea extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof chart.PlotArea;
        _initControl(element: any): any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    class WjTrendLineBase extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link TrendLine} object.
     *
     * The <b>wj-flex-chart-trend-line</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
     *                         objects. This value overrides the default chart type set on the chart. See
     *                         {@link ChartType}.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
     *   <dt>fit-type</dt>     <dd><code>@</code> The {@link TrendLineFitType} value for the trend line.</dd>
     *   <dt>order</dt>        <dd><code>@</code> The number of terms in a polynomial or fourier equation.</dd>
     * </dl>
     *
     */
    class WjFlexChartTrendLine extends WjTrendLineBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link MovingAverage} object.
     *
     * The <b>wj-flex-chart-moving-average</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
     *                         objects. This value overrides the default chart type set on the chart. See
     *                         {@link ChartType}.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>type</dt>         <dd><code>@</code> The {@link MovingAverageType} value for the moving average series.</dd>
     *   <dt>period</dt>       <dd><code>@</code> The period for the moving average calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartMovingAverage extends WjTrendLineBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link YFunctionSeries} object.
     *
     * The <b>wj-flex-chart-y-function-series</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
     *                         objects. This value overrides the default chart type set on the chart. See
     *                         {@link ChartType}.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
     *   <dt>min</dt>       <dd><code>@</code> The minimum value of the parameter for calculating a function.</dd>
     *   <dt>max</dt>       <dd><code>@</code> The maximum value of the parameter for calculating a function.</dd>
     *   <dt>func</dt>       <dd><code>@</code> The function used to calculate Y value.</dd>
     * </dl>
     *
     */
    class WjFlexChartYFunctionSeries extends WjTrendLineBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link wijmo.angular.chart.analytics.WjFlexChartParametricFunctionSeries} object.
     *
     * The <b>wj-flex-chart-parametric-function-series</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
     *                         objects. This value overrides the default chart type set on the chart. See
     *                         {@link ChartType}.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>sample-count</dt> <dd><code>@</code> The sample count for the calculation.</dd>
     *   <dt>min</dt>       <dd><code>@</code> The minimum value of the parameter for calculating a function.</dd>
     *   <dt>max</dt>       <dd><code>@</code> The maximum value of the parameter for calculating a function.</dd>
     *   <dt>x-func</dt>       <dd><code>@</code> The function used to calculate the x value.</dd>
     *   <dt>y-func</dt>       <dd><code>@</code> The function used to calculate the y value.</dd>
     * </dl>
     *
     */
    class WjFlexChartParametricFunctionSeries extends WjTrendLineBase {
        constructor();
        readonly _controlConstructor: any;
        _initProps(): void;
    }
    /**
     * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link Waterfall} object.
     *
     * The <b>wj-flex-chart-waterfall</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>relative-data</dt> <dd><code>@</code> The value that determines whether the given data is relative.</dd>
     *   <dt>start</dt>        <dd><code>@</code> The value of the start bar.</dd>
     *   <dt>start-label</dt>  <dd><code>@</code> The label of the start bar.</dd>
     *   <dt>show-total</dt>   <dd><code>@</code> The value that determines whether the show the total bar.</dd>
     *   <dt>total-label</dt>  <dd><code>@</code> The label of the total bar.</dd>
     *   <dt>show-intermediate-total</dt>      <dd><code>@</code> The value that determines whether to show the intermediate total bar.</dd>
     *   <dt>intermediate-total-positions</dt> <dd><code>@</code> The value that contains the index for positions of the intermediate total bar.</dd>
     *   <dt>intermediate-total-labels</dt>    <dd><code>@</code> The value that contains the label of the intermediate total bar.</dd>
     *   <dt>connector-lines</dt>  <dd><code>@</code> The value that determines whether to show connector lines.</dd>
     *   <dt>styles</dt>       <dd><code>@</code> The value of the waterfall styles.</dd>
     * </dl>
     */
    class WjFlexChartWaterfall extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} and {@link FinancialChart} {@link BoxWhisker} object.
     *
     * The <b>wj-flex-chart-box-whisker</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>quartile-calculation</dt> <dd><code>@</code> The value that specifies the quartile calculation for the Box&Whisker chart.</dd>
     *   <dt>group-width</dt>        <dd><code>@</code> The value that determines the group width as a percentage for the Box&Whisker chart.</dd>
     *   <dt>gap-width</dt>  <dd><code>@</code> The value that determines the gap width as a percentage for the Box&Whisker chart.</dd>
     *   <dt>show-mean-line</dt>   <dd><code>@</code> The value that determines whether to show the mean line for the Box&Whisker chart.</dd>
     *   <dt>mean-line-style</dt>  <dd><code>@</code> The value that specifies the style for the mean line.</dd>
     *   <dt>show-mean-marker</dt>      <dd><code>@</code> The value that determines whether to show the mean marker for the Box&Whisker chart.</dd>
     *   <dt>mean-marker-style</dt> <dd><code>@</code> The value that specifies the style for the mean marker.</dd>
     *   <dt>show-inner-points</dt>    <dd><code>@</code> The value that determines whether to show the inner points for the Box&Whisker chart.</dd>
     *   <dt>show-outliers</dt>  <dd><code>@</code> The value that determines whether to show the outliers for the Box&Whisker chart.</dd>
     * </dl>
     *
     */
    class WjFlexChartBoxWhisker extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link ErrorBar} object.
     *
     * The <b>wj-flex-chart-error-bar</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>error-bar-style</dt> <dd><code>@</code> The value that specifies the ErrorBar style.</dd>
     *   <dt>value</dt>        <dd><code>@</code> The value that specifies the error value of the series.</dd>
     *   <dt>error-amount</dt>  <dd><code>@</code> The value that specifies the error amount of the series.</dd>
     *   <dt>end-style</dt>   <dd><code>@</code> The value that specifies the end style of the series.</dd>
     *   <dt>direction</dt>  <dd><code>@</code> The value that specifies the direction of the series.</dd>
     * </dl>
     *
     */
    class WjFlexChartErrorBar extends WjFlexChartSeries {
        constructor();
        readonly _controlConstructor: any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link FlexChart} {@link wijmo.chart.animation.ChartAnimation} object.
     *
     * The <b>wj-flex-chart-animation</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} or {@link wijmo.angular.chart.WjFlexPie} or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>animation-mode</dt>     <dd><code>@</code> The value indicating whether the plot points animate one at a time, series by series, or all at once.</dd>
     *   <dt>easing</dt>           <dd><code>@</code> The value indicating the easing function applied to the animation.</dd>
     *   <dt>duration</dt>           <dd><code>@</code> The value indicating the length of entire animation in milliseconds.</dd>
     *   <dt>axis-animation</dt>           <dd><code>@</code> The value indicating whether the axis animation is enabled.</dd>
     * </dl>
     */
    class WjFlexChartAnimation extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link FlexChart} {@link AnnotationLayer} object.
     *
     * The <b>wj-flex-chart-annotation-layer</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive
     * or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     *
     */
    class WjFlexChartAnnotationLayer extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the annotations.
     *
     * The <b>wj-flex-chart-annotation</b> directive must be contained in a
     * {@link wijmo.angular.chart.annotation.WjFlexChartAnnotationLayer} directive.
     *
     * The <b>wj-flex-chart-annotation</b> directive is used to represent all types of
     * possible annotation shapes like <b>Circle</b>, <b>Rectangle</b>, <b>Polygon</b>
     * and so on. The type of annotation shape is specified
     * in the directive's <b>type</b> attribute.
     *
     * The directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *
     *   <dt>type</dt>                  <dd><code>@</code> The class name of the annotation shape represented by the directive.
     *                                      The possible values are {@link Circle}, {@link Ellipse}, {@link Image}, {@link Line}, {@link Polygon},
     *                                      {@link Rectangle}, {@link Square}, {@link Text}.</dd>
     *   <dt>attachment</dt>            <dd><code>@</code> An {@link AnnotationAttachment} value defining the attachment of the annotation.
     *                                      </dd>
     *   <dt>content</dt>               <dd><code>@</code> The text of the <b>Circle</b>, <b>Ellipse</b>, <b>Image</b>, <b>Line</b>,
     *                                      <b>Polygon</b>, <b>Rectangle</b> or <b>Square</b> annotation.</dd>
     *   <dt>end</dt>                   <dd><code>@</code> The end point of the <b>Line</b> annotation.</dd>
     *   <dt>height</dt>                <dd><code>@</code> The height of the <b>Ellipse</b>, <b>Image</b> or <b>Rectangle</b> annotation.</dd>
     *   <dt>href</dt>                  <dd><code>@</code> The href of the <b>Image</b> annotation.</dd>
     *   <dt>is-visible</dt>             <dd><code>@</code> The visibility of the annotation.</dd>
     *   <dt>length</dt>                <dd><code>@</code> The length of the <b>Square</b> annotation.</dd>
     *   <dt>name</dt>                  <dd><code>@</code> The name of the annotation.</dd>
     *   <dt>offset</dt>                <dd><code>@</code> The offset of the annotation.</dd>
     *   <dt>point</dt>                 <dd><code>@</code> The point of the annotation, the coordinate space of the point depends on the <b>attachment</b>  property value.
     *                                      The property works for <b>Circle</b>, <b>Ellipse</b>, <b>Image</b>, <b>Rectangle</b>, <b>Square</b>
     *                                      and <b>Text</b> annotation.</dd>
     *   <dt>point-index</dt>           <dd><code>@</code> The index of the data point in the specified series where the annotation is attached to.</dd>
     *   <dt>position</dt>              <dd><code>@</code> An {@link AnnotationPosition} value defining the position of the annotation
     *                                      relative to the <b>point</b>.</dd>
     *   <dt>radius</dt>                <dd><code>@</code> The radius of the <b>Circle</b> annotation.</dd>
     *   <dt>series-index</dt>          <dd><code>@</code> The index of the data series where the annotation is attached to.</dd>
     *   <dt>start</dt>                 <dd><code>@</code> The start point of the <b>Line</b> annotation.</dd>
     *   <dt>style</dt>                 <dd><code>@</code> The style of the annotation.</dd>
     *   <dt>text</dt>                  <dd><code>@</code> The text of the <b>Text</b> annotation.</dd>
     *   <dt>tooltip</dt>               <dd><code>@</code> The tooltip of the annotation.</dd>
     *   <dt>width</dt>                 <dd><code>@</code> The width of the <b>Ellipse</b>, <b>Image</b> or <b>Rectangle</b> annotation.</dd>
     * </dl>
     */
    class WjFlexChartAnnotation extends WjDirective {
        constructor();
        _createLink(): WjLink;
        _getMetaDataId(): any;
    }
    class WjFlexChartAnnotationLink extends WjLink {
        _initControl(): any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link FinancialChart} control.
     *
     * Use the <b>wj-financial-chart</b> directive to add financial charts to your AngularJS applications.
     * Note that directive and parameter names must be formatted using lower-case letters
     * with dashes instead of camel case.
     *
     * The wj-financial-chart directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
     *                              values for the chart. You can override this at the series level.</dd>
     *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
     *                              values for the chart. You can override this at the series level.</dd>
     *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
     *                              objects. You can override this at the series level. See {@link FinancialChartType}.</dd>
     *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link FinancialChart} control
     *                              that this directive creates.</dd>
     *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
     *                              text).</dd>
     *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
     *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
     *                              text).</dd>
     *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
     *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
     *                              initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
     *                              initializing the control with attribute values. </dd>
     *   <dt>interpolate-nulls</dt> <dd><code>@</code> The value indicating whether to interpolate or
     *                              leave gaps when there are null values in the data.</dd>
     *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
     *                              appearance of data points.</dd>
     *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                              the data used to create the chart.</dd>
     *   <dt>legend-toggle</dt>     <dd><code>@</code> The value indicating whether clicking legend items
     *                              toggles series visibility.</dd>
     *   <dt>options</dt>           <dd><code>=</code> Chart options that only apply to certain chart types.
     *                              See <b>options</b> under {@link FinancialChart} for details.</dd>
     *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
     *                              displaying each series.</dd>
     *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
     *                              edges of the control and the plot area, or CSS-style margins.</dd>
     *   <dt>selection</dt>         <dd><code>=</code> The series object that is selected.</dd>
     *   <dt>selection-mode</dt>    <dd><code>@</code> The {@link SelectionMode} value indicating whether or what is
     *                              selected when the user clicks a series.</dd>
     *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data
     *                              points in Scatter, LineSymbols, and SplineSymbols charts, in pixels. You can override
     *                              this at the series level.</dd>
     *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
     *                              {@link ChartTooltip} content property.</dd>
     *   <dt>got-focus</dt>         <dd><code>&</code> The {@link FinancialChart.gotFocus} event handler.</dd>
     *   <dt>lost-focus</dt>        <dd><code>&</code> The {@link FinancialChart.lostFocus} event handler.</dd>
     *   <dt>rendering</dt>         <dd><code>&</code> The {@link FinancialChart.rendering} event handler.</dd>
     *   <dt>rendered</dt>          <dd><code>&</code> The {@link FinancialChart.rendered} event handler.</dd>
     *   <dt>series-visibility-changed</dt>
     *                              <dd><code>&</code> The {@link FinancialChart.seriesVisibilityChanged} event handler.</dd>
     *   <dt>selection-changed</dt> <dd><code>&</code> The {@link FinancialChart.selectionChanged} event handler.</dd>
     * </dl>
     *
     * The wj-financial-chart directive may contain the following child directives:
     * {@link wijmo.angular.chart.WjFlexChartAxis}, {@link wijmo.angular.chart.WjFlexChartSeries}, {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
     */
    class WjFinancialChart extends WjFlexChartCore {
        readonly _controlConstructor: typeof chart.finance.FinancialChart;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link FinancialSeries} object.
     *
     * The <b>wj-financial-chart-series</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>axis-x</dt>       <dd><code>@</code> X-axis for the series.</dd>
     *   <dt>axis-y</dt>       <dd><code>@</code> Y-axis for the series.</dd>
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
     *                         objects. This value overrides the default chart type set on the chart. See
     *                         {@link FinancialChartType}.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data points in this
     *                         series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     * </dl>
     *
     * In most cases, the <b>wj-financial-chart-series</b> specifies the <b>name</b> and <b>binding</b> properties only.
     * The remaining values are inherited from the parent <b>wj-financial-chart</b> directive.
     */
    class WjFinancialChartSeries extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    class WjBaseOverlayIndicator extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
    }
    class WjBaseSingleOverlayIndicator extends WjBaseOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link Fibonacci} object.
     *
     * The <b>wj-flex-chart-fibonacci</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>high</dt>         <dd><code>@</code> The high value of {@link Fibonacci} tool.</dd>
     *   <dt>labelPosition</dt> <dd><code>@</code> The label position for levels in {@link Fibonacci} tool.</dd>
     *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link Fibonacci} tool.</dd>
     *   <dt>low</dt>          <dd><code>@</code> The low value of {@link Fibonacci} tool.</dd>
     *   <dt>minX</dt>         <dd><code>@</code> The x minimum value of {@link Fibonacci} tool.</dd>
     *   <dt>maxX</dt>         <dd><code>@</code> The x maximum value of {@link Fibonacci} tool.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>uptrend</dt>      <dd><code>@</code> The value indicating whether to create uptrending {@link Fibonacci} tool.</dd>
     * </dl>
     *
     */
    class WjFlexChartFibonacci extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
        _initControl(element: any): any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link FibonacciArcs} object.
     *
     * The <b>wj-flex-chart-fibonacci-arcs</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>labelPosition</dt> <dd><code>@</code> The {@link LabelPosition} for levels in {@link FibonacciArcs} tool.</dd>
     *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link FibonacciArcs} tool.</dd>
     *   <dt>start-x</dt>       <dd><code>@</code> The starting X value of {@link FibonacciArcs} tool.</dd>
     *   <dt>end-x</dt>         <dd><code>@</code> The ending X value of {@link FibonacciArcs} tool.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     * </dl>
     *
     */
    class WjFlexChartFibonacciArcs extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
        _initControl(element: any): any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link FibonacciFans} object.
     *
     * The <b>wj-flex-chart-fibonacci-fans</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>labelPosition</dt> <dd><code>@</code> The {@link LabelPosition} for levels in {@link FibonacciFans} tool.</dd>
     *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link FibonacciFans} tool.</dd>
     *   <dt>start</dt>        <dd><code>@</code> The starting {@link DataPoint} of {@link FibonacciFans} tool.</dd>
     *   <dt>end</dt>          <dd><code>@</code> The ending {@link DataPoint} of {@link FibonacciFans} tool.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     * </dl>
     *
     */
    class WjFlexChartFibonacciFans extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
        _initControl(element: any): any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link FibonacciTimeZones} object.
     *
     * The <b>wj-flex-chart-fibonacci-time-zones</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>labelPosition</dt> <dd><code>@</code> The {@link LabelPosition} for levels in {@link FibonacciTimeZones} tool.</dd>
     *   <dt>levels</dt>       <dd><code>@</code> The levels value of {@link FibonacciTimeZones} tool.</dd>
     *   <dt>startX</dt>       <dd><code>@</code> The starting X value of {@link FibonacciTimeZones} tool.</dd>
     *   <dt>endX</dt>         <dd><code>@</code> The ending X value of {@link FibonacciTimeZones} tool.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     * </dl>
     *
     */
    class WjFlexChartFibonacciTimeZones extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
        _initControl(element: any): any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link ATR} object.
     *
     * The <b>wj-flex-chart-atr</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>period</dt>       <dd><code>@</code> The period for the average true range calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartAtr extends WjBaseSingleOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link CCI} object.
     *
     * The <b>wj-flex-chart-cci</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>period</dt>       <dd><code>@</code> The period for the commodity channel index calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartCci extends WjBaseSingleOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link RSI} object.
     *
     * The <b>wj-flex-chart-rsi</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>period</dt>       <dd><code>@</code> The period for the relative strength index calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartRsi extends WjBaseSingleOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link WilliamsR} object.
     *
     * The <b>wj-flex-chart-williams-r</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>period</dt>       <dd><code>@</code> The period for the Williams %R calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartWilliamsR extends WjBaseSingleOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    class WjFlexChartMacdBase extends WjBaseOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link Macd} object.
     *
     * The <b>wj-flex-chart-macd</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>styles/dt>        <dd><code></code> The styles for the MACD and Signal lines.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>fast-period</dt>  <dd><code>@</code>  The fast moving average period for the MACD calculation.</dd>
     *   <dt>slow-period</dt>  <dd><code>@</code> The slow moving average period for the MACD calculation.</dd>
     *   <dt>signal-smoothing-period/dt>    <dd><code>@</code> The smoothing period for the MACD calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartMacd extends WjFlexChartMacdBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link MacdHistogram} object.
     *
     * The <b>wj-flex-chart-macd-histogram</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>fast-period</dt>  <dd><code>@</code>  The fast moving average period for the MACD calculation.</dd>
     *   <dt>slow-period</dt>  <dd><code>@</code> The slow moving average period for the MACD calculation.</dd>
     *   <dt>signal-smoothing-period/dt>    <dd><code>@</code> The smoothing period for the MACD calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartMacdHistogram extends WjFlexChartMacdBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link Stochastic} object.
     *
     * The <b>wj-flex-chart-stochastic</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>styles/dt>        <dd><code></code> The styles for the %K and %D lines.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>k-period</dt>     <dd><code>@</code>  The period for the %K calculation.</dd>
     *   <dt>d-period</dt>     <dd><code>@</code>  The period for the %D calculation.</dd>
     *   <dt>smoothing-period</dt>     <dd><code>@</code>  The smoothing period for the %K calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartStochastic extends WjBaseOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link BollingerBands} object.
     *
     * The <b>wj-flex-chart-bollinger-bands</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>period</dt>       <dd><code>@</code>  The period for the Bollinger Bands calculation.</dd>
     *   <dt>multiplier/dt>    <dd><code>@</code> The standard deviation multiplier for the Bollinger Bands calculation.</dd>
     * </dl>
     *
     */
    class WjFlexChartBollingerBands extends WjBaseOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link Envelopes} object.
     *
     * The <b>wj-flex-chart-envelopes</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any set at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     *   <dt>period</dt>       <dd><code>@</code>  The period for the moving average envelopes calculation.</dd>
     *   <dt>size/dt>          <dd><code>@</code> The size of the moving average envelopes.</dd>
     *   <dt>type/dt>          <dd><code>@</code> The {@link MovingAverageType} of the moving average to be used for the envelopes.</dd>
     * </dl>
     *
     */
    class WjFlexChartEnvelopes extends WjBaseOverlayIndicator {
        constructor();
        readonly _controlConstructor: any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link Sunburst} control.
     *
     * <dl class="dl-horizontal">
     *   <dt>child-items-path</dt>  <dd><code>=</code> An array or string object used to generate child items in hierarchical data.</dd>
     * </dl>
     *
     */
    class WjSunburst extends WjFlexPie {
        readonly _controlConstructor: typeof chart.hierarchical.Sunburst;
    }
    /**
     * AngularJS directive for the {@link TreeMap} control.
     *
     * <dl class="dl-horizontal">
     *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView}
     *                              object that contains data for the chart.</dd>
     *   <dt>binding</dt>           <dd><code>@</code> The name of the property that
     *                              contains item values.</dd>
     *   <dt>binding-name</dt>      <dd><code>@</code> The name of the property that
     *                              contains item names. It should be an array or a string.</dd>
     *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
     *                              text).</dd>
     *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
     *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
     *                              text).</dd>
     *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
     *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
     *                              initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt>    <dd><code>=</code> A value indicating whether the binding has finished
     *                              initializing the control with attribute values. </dd>
     *   <dt>type</dt>              <dd><code>@</code> The type of the TreeMap.</dd>
     *   <dt>child-items-path</dt>  <dd><code>@</code> A value indicating the name of the property (or properties) used to generate
     *                              child items in hierarchical data.</dd>
     *   <dt>max-depth</dt>         <dd><code>=</code> The maximum number of node levels to show in the current view.</dd>
     *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
     *                              displaying TreeMap items.</dd>
     *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
     *                              edges of the control and the plot area, or CSS-style margins.</dd>
     *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
     *                              {@link ChartTooltip} content property.</dd>
     *   <dt>label-content</dt>     <dd><code>@</code> The value to display in the
     *                              {@link DataLabel} content property.</dd>
     *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexPie.rendering} event handler.</dd>
     *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexPie.rendered} event handler.</dd>
     * </dl>
     *
     * The wj-tree-map directive may contain the following child directives:
     * {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
     */
    class WjTreeMap extends WjFlexChartBase {
        readonly _controlConstructor: typeof chart.hierarchical.TreeMap;
        _initProps(): void;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link FlexChart} {@link wijmo.chart.interaction.RangeSelector} object.
     *
     * The <b>wj-flex-chart-range-selector</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>is-visible</dt>     <dd><code>@</code> The value indicating whether the RangeSelector is visible.</dd>
     *   <dt>min</dt>           <dd><code>@</code> The minimum value of the range.</dd>
     *   <dt>max</dt>           <dd><code>@</code> The maximum value of the range.</dd>
     *   <dt>orientation</dt>   <dd><code>@</code> The orientation of the RangeSelector.</dd>
     *   <dt>seamless</dt>      <dd><code>@</code> The value indicating whether the minimal and maximal handler will move seamlessly.</dd>
     *   <dt>min-scale</dt>      <dd><code>@</code> the valid minimum range of the RangeSelector.</dd>
     *   <dt>max-scale</dt>      <dd><code>@</code> the valid maximum range of the RangeSelector.</dd>
     * </dl>
     */
    class WjFlexChartRangeSelector extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexChart} {@link wijmo.chart.interaction.ChartGestures} object.
     *
     * The <b>wj-flex-chart-gestures</b> directive must be contained in a {@link wijmo.angular.chart.WjFlexChart} directive or {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>mouse-action</dt>     <dd><code>@</code> The value indicating mouse action is zooming or panning.</dd>
     *   <dt>interactive-axes</dt> <dd><code>@</code> The value indicating which axis is interactive.</dd>
     *   <dt>enable</dt>          <dd><code>@</code> The value indicating the gestures action is enabled or not.</dd>
     *   <dt>scale-x</dt>          <dd><code>@</code> The value indicating axisX initial range between Min and Max.</dd>
     *   <dt>scale-y</dt>          <dd><code>@</code> The value indicating axisY initial range between Min and Max.</dd>
     *   <dt>pos-x</dt>            <dd><code>@</code> The value indicating initial position on the axisX.</dd>
     *   <dt>pos-y</dt>            <dd><code>@</code> The value indicating initial position on the axisY.</dd>
     * </dl>
     */
    class WjFlexChartChartGestures extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link FlexRadar} control.
     *
     * Use the <b>wj-flex-radar</b> directive to add radar charts to your AngularJS applications.
     * Note that directive and parameter names must be formatted using lower-case letters
     * with dashes instead of camel case.
     *
     * The wj-flex-radar directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>binding</dt>           <dd><code>@</code> The name of the property that contains Y
     *                              values for the chart. You can override this at the series level.</dd>
     *   <dt>binding-x</dt>         <dd><code>@</code> The name of the property that contains X
     *                              values for the chart. You can override this at the series level.</dd>
     *   <dt>chart-type</dt>        <dd><code>@</code> The default chart type to use in rendering series
     *                              objects. You can override this at the series level. See {@link RadarChartType}.</dd>
     *   <dt>control</dt>           <dd><code>=</code> A reference to the {@link FlexRadar} control
     *                              that this directive creates.</dd>
     *   <dt>footer</dt>            <dd><code>@</code> The text to display in the chart footer (plain
     *                              text).</dd>
     *   <dt>footer-style</dt>       <dd><code>=</code> The style to apply to the chart footer.</dd>
     *   <dt>header</dt>            <dd><code>@</code> The text to display in the chart header (plain
     *                              text).</dd>
     *   <dt>header-style</dt>      <dd><code>=</code> The style to apply to the chart header.</dd>
     *   <dt>initialized</dt>       <dd><code>&</code> This event occurs after the binding has finished
     *                              initializing the control with attribute values.</dd>
     *   <dt>is-initialized</dt><dd><code>=</code> A value indicating whether the binding has finished
     *                              initializing the control with attribute values. </dd>
     *   <dt>interpolate-nulls</dt> <dd><code>@</code> The value indicating whether to interpolate or
     *                              leave gaps when there are null values in the data.</dd>
     *   <dt>item-formatter</dt>    <dd><code>=</code> The formatter function that customizes the
     *                              appearance of data points.</dd>
     *   <dt>items-source</dt>      <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                              the data used to create the chart.</dd>
     *   <dt>legend-toggle</dt>     <dd><code>@</code> The value indicating whether clicking legend items
     *                              toggles series visibility.</dd>
     *   <dt>options</dt>           <dd><code>=</code> Chart {@link FlexChart.options} that only apply to certain
     *                              chart types.</dd>
     *   <dt>palette</dt>           <dd><code>=</code> An array that contains the default colors used for
     *                              displaying each series.</dd>
     *   <dt>plot-margin</dt>       <dd><code>=</code> The number of pixels of space to leave between the
     *                              edges of the control and the plot area, or CSS-style margins.</dd>
     *   <dt>stacking</dt>          <dd><code>@</code> The {@link Stacking} value indicating whether or how series
     *                              objects are stacked or plotted independently.</dd>
     *   <dt>reversed</dt>          <dd><code>@</code> The {@link FlexRadar.reversed} value indicating whether angles are reversed
     *                              (counter-clockwise).</dd>
     *   <dt>startAngle</dt>        <dd><code>@</code> The {@link FlexRadar.startAngle} value indicating the starting angle for the radar in degrees.</dd>
     *   <dt>totalAngle</dt>        <dd><code>@</code> The {@link FlexRadar.totalAngle} value indicating the total angle for the radar in degrees.</dd>
     *   <dt>symbol-size</dt>       <dd><code>@</code> The size of the symbols used to render data points in Scatter,
     *                              LineSymbols, and SplineSymbols charts, in pixels. You can override
     *                              this at the series level.</dd>
     *   <dt>tooltip-content</dt>   <dd><code>@</code> The value to display in the
     *                              {@link ChartTooltip} content property.</dd>
     *   <dt>rendering</dt>         <dd><code>&</code> The {@link FlexRadar.rendering} event handler.</dd>
     *   <dt>rendered</dt>          <dd><code>&</code> The {@link FlexRadar.rendered} event handler.</dd>
     *   <dt>series-visibility-changed</dt>
     *                              <dd><code>&</code> The {@link FlexRadar.seriesVisibilityChanged} event handler.</dd>
     * </dl>
     *
     * The wj-flex-radar directive may contain the following child directives:
     * {@link wijmo.angular.chart.WjFlexChartAxis}, {@link wijmo.angular.chart.radar.WjFlexRadarSeries}, {@link wijmo.angular.chart.WjFlexChartLegend} and {@link wijmo.angular.chart.WjFlexChartDataLabel}.
     */
    class WjFlexRadar extends WjFlexChartCore {
        readonly _controlConstructor: typeof chart.radar.FlexRadar;
    }
    /**
     * AngularJS directive for the {@link FinancialChart} {@link FinancialSeries} object.
     *
     * The <b>wj-financial-chart-series</b> directive must be contained in a {@link wijmo.angular.chart.finance.WjFinancialChart} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>axis-x</dt>       <dd><code>@</code> X-axis for the series.</dd>
     *   <dt>axis-y</dt>       <dd><code>@</code> Y-axis for the series.</dd>
     *   <dt>binding</dt>      <dd><code>@</code> The name of the property that contains Y values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>binding-x</dt>    <dd><code>@</code> The name of the property that contains X values for the
     *                         series. This value overrides any binding set for the chart.</dd>
     *   <dt>chart-type</dt>   <dd><code>@</code> The chart type to use in rendering objects for this series
     *                         objects. This value overrides the default chart type set on the chart. See
     *                         {@link FinancialChartType}.</dd>
     *   <dt>css-class</dt>    <dd><code>@</code> The CSS class to use for the series.</dd>
     *   <dt>items-source</dt> <dd><code>=</code> An array or {@link ICollectionView} object that contains
     *                         data for this series.</dd>
     *   <dt>name</dt>         <dd><code>@</code> The name of the series to show in the legend.</dd>
     *   <dt>style</dt>        <dd><code>=</code> The series style. Use ng-attr-style to specify the series
     *                         style object as an object. See the section on ngAttr attribute bindings in
     *                         <a target="_blank" href="https://docs.angularjs.org/guide/directive">
     *                         AngularJS Creating Custom Directives</a> and the <a target="_blank" href=
     *                         "https://demos.wijmo.com/5/Angular/FlexChartIntro/FlexChartIntro/#Styling">
     *                         FlexChart 101 Styling Series</a> sample for more information.</dd>
     *   <dt>altStyle</dt>     <dd><code>=</code> The series alternative style.</dd>
     *   <dt>symbol-marker</dt><dd><code>@</code> The shape of marker to use for the series. This value
     *                         overrides the default marker set on the chart. See {@link Marker}.</dd>
     *   <dt>symbol-size</dt>  <dd><code>@</code> The size of the symbols used to render data points in this
     *                         series for Scatter, LineSymbols, and SplineSymbols charts, in pixels.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>symbol-style</dt> <dd><code>=</code> The style of the symbols used to render data
     *                         points in this series for Scatter, LineSymbols, and SplineSymbols charts.
     *                         This value overrides any setting at the chart level.</dd>
     *   <dt>visibility</dt>   <dd><code>=</code> The {@link SeriesVisibility} value indicating whether and where to
     *                         display the series.</dd>
     * </dl>
     *
     * In most cases, the <b>wj-financial-chart-series</b> specifies the <b>name</b> and <b>binding</b> properties only.
     * The remaining values are inherited from the parent <b>wj-financial-chart</b> directive.
     */
    class WjFlexRadarSeries extends WjSeriesBase {
        constructor();
        readonly _controlConstructor: any;
    }
    /**
     * AngularJS directive for the {@link FlexRadar} {@link FlexRadarAxis} {@link Axis} object.
     *
     * The <b>wj-flex-radar-axis</b> directive must be contained in a {@link wijmo.angular.chart.radar.WjFlexRadar} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>wj-property</dt>     <dd><code>@</code> Defines the {@link FlexChart} property name,
     *                            axis-x or axis-y, to initialize with the directive.</dd>
     *   <dt>axis-line</dt>       <dd><code>@</code> The value indicating whether the axis line is visible.</dd>
     *   <dt>binding</dt>         <dd><code>@</code> Gets or sets the comma-separated property names for
     *                            the {@link wijmo.chart.Axis.itemsSource} property to use in axis labels.
     *                            The first name specifies the value on the axis, the second represents
     *                            the corresponding axis label. The default value is 'value,text'.</dd>
     *   <dt>format</dt>          <dd><code>@</code> The format string used for the axis labels
     *                            (see {@link wijmo.Globalize}).</dd>
     *   <dt>item-formatter</dt>  <dd><code>=</code> The formatter function that customizes the
     *                            appearance of axis labels.</dd>
     *   <dt>items-source</dt>    <dd><code>=</code> The items source for the axis labels.</dd>
     *   <dt>labels</dt>          <dd><code>@</code> The value indicating whether the axis labels are visible.</dd>
     *   <dt>label-angle</dt>     <dd><code>@</code> The rotation angle of axis labels in degrees.</dd>
     *   <dt>label-align</dt>     <dd><code>@</code> The alignment of axis labels.</dd>
     *   <dt>label-padding</dt>   <dd><code>@</code> The padding of axis labels.</dd>
     *   <dt>major-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes grid lines.</dd>
     *   <dt>major-tick-marks</dt><dd><code>@</code> Defines the appearance of tick marks on the axis
     *                            (see {@link TickMark}).</dd>
     *   <dt>major-unit</dt>      <dd><code>@</code> The number of units between axis labels.</dd>
     *   <dt>max</dt>             <dd><code>@</code> The minimum value shown on the axis.</dd>
     *   <dt>min</dt>             <dd><code>@</code> The maximum value shown on the axis.</dd>
     *   <dt>minor-grid</dt>      <dd><code>@</code> The value indicating whether the axis includes minor grid lines.</dd>
     *   <dt>minor-tick-marks</dt><dd><code>@</code> Defines the appearance of minor tick marks on the axis
     *                            (see {@link TickMark}).</dd>
     *   <dt>minor-unit</dt>      <dd><code>@</code> The number of units between minor axis ticks.</dd>
     *   <dt>origin</dt>          <dd><code>@</code> The axis origin.</dd>
     *   <dt>overlappingLabels</dt><dd><code>@</code> The {@link OverlappingLabels} value indicating how to handle the overlapping axis labels.</dd>
     *   <dt>position</dt>        <dd><code>@</code> The {@link Position} value indicating the position of the axis.</dd>
     *   <dt>title</dt>           <dd><code>@</code> The title text shown next to the axis.</dd>
     * </dl>
     */
    class WjFlexRadarAxis extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof chart.radar.FlexRadarAxis;
        _initControl(element: any): any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link Tooltip} class.
     *
     * Use the <b>wj-tooltip</b> directive to add tooltips to elements on the page.
     * The wj-tooltip directive supports HTML content, smart positioning, and touch.
     *
     * The wj-tooltip directive is specified as a parameter added to the
     * element that the tooltip applies to. The parameter value is the tooltip
     * text or the id of an element that contains the text. For example:
     *
     * <pre>&lt;p wj-tooltip="#fineprint" &gt;
     *     Regular paragraph content...&lt;/p&gt;
     * ...
     * &lt;div id="fineprint" style="display:none"&gt;
     *   &lt;h3&gt;Important Note&lt;/h3&gt;
     *   &lt;p&gt;
     *     Data for the current quarter is estimated
     *     by pro-rating etc.&lt;/p&gt;
     * &lt;/div&gt;</pre>
     */
    class WjTooltip extends WjDirective {
        constructor();
        readonly _controlConstructor: any;
        _initControl(element: any): any;
        _createLink(): WjLink;
    }
    /**
     * AngularJS directive for custom validations based on expressions.
     *
     * The <b>wj-validation-error</b> directive supports both AngularJS and native HTML5
     * validation mechanisms. It accepts an arbitrary AngularJS expression that should return
     * an error message string in case of the invalid input and an empty string if the input is valid.
     *
     * For AngularJS validation it should be used together with the <b>ng-model</b> directive.
     * In this case the <b>wj-validation-error</b> directive reports an error using a call
     * to the <b>NgModelController.$setValidity</b> method with the <b>wjValidationError</b> error key ,
     * in the same way as it happens with AngularJS native and custom validation directives.
     *
     * For HTML5 validation, the <b>wj-validation-error</b> directive sets the error state to the
     * element using the <b>setCustomValidity</b> method from the HTML5 validation API. For example:
     *
     * <pre>&lt;p&gt;HTML5 validation:&lt;/p&gt;
     * &lt;form&gt;
     *     &lt;input type="password"
     *         placeholder="Password"
     *         name="pwd" ng-model="thePwd"
     *         required minlength="2" /&gt;
     *     &lt;input type="password"
     *         placeholder="Check Password"
     *         name="chk" ng-model="chkPwd"
     *         wj-validation-error="chkPwd != thePwd ? 'Passwords don\'t match' : ''" /&gt;
     * &lt;/form&gt;
     *
     * &lt;p&gt;AngularJS validation:&lt;/p&gt;
     * &lt;form name="ngForm" novalidate&gt;
     *     &lt;input type="password"
     *         placeholder="Password"
     *         name="pwd" ng-model="thePwd"
     *         required minlength="2" /&gt;
     *     &lt;input type="password"
     *         placeholder="Check Password"
     *         name="chk" ng-model="chkPwd"
     *         wj-validation-error="chkPwd != thePwd" /&gt;
     *     &lt;div
     *         ng-show="ngForm.chk.$error.wjValidationError && !ngForm.chk.$pristine"&gt;
     *         Sorry, the passwords don't match.
     *     &lt;/div&gt;
     * &lt;/form&gt;</pre>
     *
     */
    class WjValidationError extends WjDirective {
        constructor();
        _postLinkFn(): (scope: any, tElement: any, tAttrs: any, controller: any) => void;
        _getMetaDataId(): any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
        * AngularJS directive for the {@link FlexGrid} control.
        *
        * Use the <b>wj-flex-grid</b> directive to add grids to your AngularJS applications.
        * Note that directive and parameter names must be formatted as lower-case with dashes
        * instead of camel-case. For example:
        *
        * <pre>&lt;p&gt;Here is a FlexGrid control:&lt;/p&gt;
        * &lt;wj-flex-grid items-source="data"&gt;
        *   &lt;wj-flex-grid-column
        *     header="Country"
        *     binding="country"&gt;
        *   &lt;/wj-flex-grid-column&gt;
        *   &lt;wj-flex-grid-column
        *     header="Sales"
        *     binding="sales"&gt;
        *   &lt;/wj-flex-grid-column&gt;
        *   &lt;wj-flex-grid-column
        *     header="Expenses"
        *     binding="expenses"&gt;
        *   &lt;/wj-flex-grid-column&gt;
        *   &lt;wj-flex-grid-column
        *     header="Downloads"
        *     binding="downloads"&gt;
        *   &lt;/wj-flex-grid-column&gt;
        * &lt;/wj-flex-grid&gt;</pre>
        *
        * The example below creates a FlexGrid control and binds it to a 'data' array
        * exposed by the controller. The grid has three columns, each corresponding to
        * a property of the objects contained in the source array.
        *
        * <a href="https://jsfiddle.net/Wijmo5/QNb9X/" target="_blank">Example</a>
        *
        * The <b>wj-flex-grid</b> directive supports the following attributes:
        *
        * <dl class="dl-horizontal">
        *   <dt>allow-add-new</dt>              <dd><code>@</code> A value indicating whether to show a new row
        *                                     template so users can add items to the source collection.</dd>
        *   <dt>allow-delete</dt>             <dd><code>@</code> A value indicating whether the grid deletes the
        *                                     selected rows when the Delete key is pressed.</dd>
        *   <dt>allow-dragging</dt>           <dd><code>@</code> An {@link AllowDragging} value indicating
        *                                     whether and how the user can drag rows and columns with the mouse.</dd>
        *   <dt>allow-merging</dt>            <dd><code>@</code> An {@link AllowMerging} value indicating
        *                                     which parts of the grid provide cell merging.</dd>
        *   <dt>allow-resizing</dt>           <dd><code>@</code> An {@link AllowResizing} value indicating
        *                                     whether users are allowed to resize rows and columns with the mouse.</dd>
        *   <dt>allow-sorting</dt>            <dd><code>@</code> A boolean value indicating whether users can sort
        *                                     columns by clicking the column headers.</dd>
        *   <dt>auto-generate-columns</dt>    <dd><code>@</code> A boolean value indicating whether the grid generates
        *                                     columns automatically based on the <b>items-source</b>.</dd>
        *   <dt>child-items-path</dt>         <dd><code>@</code> The name of the property used to generate
        *                                     child rows in hierarchical grids (or an array of property names if items
        *                                     at different hierarchical levels use different names for their child items).</dd>
        *   <dt>control</dt>                  <dd><code>=</code> A reference to the {@link FlexGrid} control
        *                                     created by this directive.</dd>
        *   <dt>defer-resizing</dt>           <dd><code>=</code> A boolean value indicating whether row and column
        *                                     resizing should be deferred until the user releases the mouse button.</dd>
        *   <dt>frozen-columns</dt>           <dd><code>@</code> The number of frozen (non-scrollable) columns in the grid.</dd>
        *   <dt>frozen-rows</dt>              <dd><code>@</code> The number of frozen (non-scrollable) rows in the grid.</dd>
        *   <dt>group-header-format</dt>      <dd><code>@</code> The format string used to create the group
        *                                     header content.</dd>
        *   <dt>headers-visibility</dt>       <dd><code>=</code> A {@link HeadersVisibility} value
        *                                     indicating whether the row and column headers are visible. </dd>
        *   <dt>ime-enabled</dt>              <dd><code>@</code> Gets or sets a value that determines whether the grid should
        *                                     support Input Method Editors (IME) while not in edit mode.</dd>
        *   <dt>initialized</dt>              <dd><code>&</code> This event occurs after the binding has finished
        *                                     initializing the control with attribute values.</dd>
        *   <dt>is-initialized</dt>           <dd><code>=</code> A value indicating whether the binding has finished
        *                                     initializing the control with attribute values. </dd>
        *   <dt>item-formatter</dt>           <dd><code>=</code> A function that customizes
        *                                     cells on this grid.</dd>
        *   <dt>items-source</dt>             <dd><code>=</code> An array or {@link ICollectionView} object that
        *                                     contains the items shown on the grid.</dd>
        *   <dt>is-read-only</dt>             <dd><code>@</code> A boolean value indicating whether the user is
        *                                     prevented from editing grid cells by typing into them.</dd>
        *   <dt>merge-manager</dt>            <dd><code>=</code> A {@link MergeManager} object that specifies
        *                                     the merged extent of the specified cell.</dd>
        *   <dt>selection-mode</dt>           <dd><code>@</code> A {@link SelectionMode} value
        *                                     indicating whether and how the user can select cells.</dd>
        *   <dt>show-groups</dt>              <dd><code>@</code> A boolean value indicating whether to insert group
        *                                     rows to delimit data groups.</dd>
        *   <dt>show-sort</dt>                <dd><code>@</code> A boolean value indicating whether to display sort
        *                                     indicators in the column headers.</dd>
        *   <dt>sort-row-index</dt>           <dd><code>@</code> A number specifying the index of row in the column
        *                                     header panel that shows and changes the current sort.</dd>
        *   <dt>tree-indent</dt>              <dd><code>@</code> The indentation, in pixels, used to offset row
        *                                     groups of different levels.</dd>
        *   <dt>beginning-edit</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.beginningEdit} event.</dd>
        *   <dt>cell-edit-ended</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.cellEditEnded} event.</dd>
        *   <dt>cell-edit-ending</dt>         <dd><code>&</code> Handler for the {@link FlexGrid.cellEditEnding} event.</dd>
        *   <dt>prepare-cell-for-edit</dt>    <dd><code>&</code> Handler for the {@link FlexGrid.prepareCellForEdit} event.</dd>
        *   <dt>resizing-column</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.resizingColumn} event.</dd>
        *   <dt>resized-column</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.resizedColumn} event.</dd>
        *   <dt>dragged-column</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.draggedColumn} event.</dd>
        *   <dt>dragging-column</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.draggingColumn} event.</dd>
        *   <dt>sorted-column</dt>            <dd><code>&</code> Handler for the {@link FlexGrid.sortedColumn} event.</dd>
        *   <dt>sorting-column</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.sortingColumn} event.</dd>
        *   <dt>deleting-row</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.deletingRow} event.</dd>
        *   <dt>dragging-row</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.draggingRow} event.</dd>
        *   <dt>dragged-row</dt>              <dd><code>&</code> Handler for the {@link FlexGrid.draggedRow} event.</dd>
        *   <dt>resizing-row</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.resizingRow} event.</dd>
        *   <dt>resized-row</dt>              <dd><code>&</code> Handler for the {@link FlexGrid.resizedRow} event.</dd>
        *   <dt>row-added</dt>                <dd><code>&</code> Handler for the {@link FlexGrid.rowAdded} event.</dd>
        *   <dt>row-edit-ended</dt>           <dd><code>&</code> Handler for the {@link FlexGrid.rowEditEnded} event.</dd>
        *   <dt>row-edit-ending</dt>          <dd><code>&</code> Handler for the {@link FlexGrid.rowEditEnding} event.</dd>
        *   <dt>loaded-rows</dt>              <dd><code>&</code> Handler for the {@link FlexGrid.loadedRows} event.</dd>
        *   <dt>loading-rows</dt>             <dd><code>&</code> Handler for the {@link FlexGrid.loadingRows} event.</dd>
        *   <dt>group-collapsed-changed</dt>  <dd><code>&</code> Handler for the {@link FlexGrid.groupCollapsedChanged} event.</dd>
        *   <dt>group-collapsed-changing</dt> <dd><code>&</code> Handler for the {@link FlexGrid.groupCollapsedChanging} event.</dd>
        *   <dt>items-source-changed</dt>     <dd><code>&</code> Handler for the {@link FlexGrid.itemsSourceChanged} event.</dd>
        *   <dt>selection-changing</dt>       <dd><code>&</code> Handler for the {@link FlexGrid.selectionChanging} event.</dd>
        *   <dt>selection-changed</dt>        <dd><code>&</code> Handler for the {@link FlexGrid.selectionChanged} event.</dd>
        *   <dt>got-focus</dt>                <dd><code>&</code> Handler for the {@link FlexGrid.gotFocus} event.</dd>
        *   <dt>lost-focus</dt>               <dd><code>&</code> Handler for the {@link FlexGrid.lostFocus} event.</dd>
        *   <dt>scroll-position-changed</dt>  <dd><code>&</code> Handler for the {@link FlexGrid.scrollPositionChanged} event.</dd>
        * </dl>
        *
        * The <b>wj-flex-grid</b> directive may contain {@link wijmo.angular.grid.WjFlexGridColumn}, {@link wijmo.angular.grid.WjFlexGridCellTemplate} and
        * {@link wijmo.angular.grid.detail.WjFlexGridDetail} child directives.
        */
    class WjFlexGrid extends WjDirective {
        _$compile: any;
        _$interpolate: any;
        constructor($compile: any, $interpolate: any);
        readonly _controlConstructor: typeof grid.FlexGrid;
        _createLink(): WjLink;
        _initProps(): void;
    }
    /**
     * AngularJS directive for the {@link Column} object.
     *
     * The <b>wj-flex-grid-column</b> directive must be contained in a {@link wijmo.angular.grid.WjFlexGrid} directive.
     * It supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>aggregate</dt>         <dd><code>@</code> The {@link Aggregate} object to display in
     *                              the group header rows for this column.</dd>
     *   <dt>align</dt>             <dd><code>@</code> The string value that sets the horizontal
     *                              alignment of items in the column to left, right, or center.</dd>
     *   <dt>allow-dragging</dt>    <dd><code>@</code> The value indicating whether the user can move
     *                              the column to a new position with the mouse.</dd>
     *   <dt>allow-sorting</dt>     <dd><code>@</code> The value indicating whether the user can sort
     *                              the column by clicking its header.</dd>
     *   <dt>allow-resizing</dt>    <dd><code>@</code> The value indicating whether the user can
     *                              resize the column with the mouse.</dd>
     *   <dt>allow-merging</dt>     <dd><code>@</code> The value indicating whether the user can merge
     *                              cells in the column.</dd>
     *   <dt>binding</dt>           <dd><code>@</code> The name of the property to which the column is
     *                              bound.</dd>
     *   <dt>css-class</dt>         <dd><code>@</code> The name of a CSS class to use when
     *                              rendering the column.</dd>
     *   <dt>data-map</dt>          <dd><code>=</code> The {@link DataMap} object to use to convert raw
     *                              values into display values for the column.</dd>
     *   <dt>data-type</dt>         <dd><code>@</code> The enumerated {@link DataType} value that indicates
     *                              the type of value stored in the column.</dd>
     *   <dt>format</dt>            <dd><code>@</code> The format string to use to convert raw values
     *                              into display values for the column (see {@link Globalize}).</dd>
     *   <dt>header</dt>            <dd><code>@</code> The string to display in the column header.</dd>
     *   <dt>input-type</dt>        <dd><code>@</code> The type attribute to specify the input element
     *                              used to edit values in the column. The default is "tel" for numeric
     *                              columns, and "text" for all other non-Boolean columns.</dd>
     *   <dt>is-content-html</dt>   <dd><code>@</code> The value indicating whether cells in the column
     *                              contain HTML content rather than plain text.</dd>
     *   <dt>is-read-only</dt>      <dd><code>@</code> The value indicating whether the user is prevented
     *                              from editing values in the column.</dd>
     *   <dt>is-selected</dt>       <dd><code>@</code> The value indicating whether the column is selected.</dd>
     *   <dt>mask</dt>              <dd><code>@</code> The mask string used to edit values in the
     *                              column.</dd>
     *   <dt>max-width</dt>         <dd><code>@</code> The maximum width for the column.</dd>
     *   <dt>min-width</dt>         <dd><code>@</code> The minimum width for the column.</dd>
     *   <dt>name</dt>              <dd><code>@</code> The column name. You can use it to retrieve the
     *                              column.</dd>
     *   <dt>is-required</dt>       <dd><code>@</code> The value indicating whether the column must contain
     *                              non-null values.</dd>
     *   <dt>show-drop-down</dt>    <dd><code>@</code> The value indicating whether to show drop-down buttons
     *                              for editing based on the column's {@link DataMap}.</dd>
     *   <dt>visible</dt>           <dd><code>@</code> The value indicating whether the column is visible.</dd>
     *   <dt>width</dt>             <dd><code>@</code> The width of the column in pixels or as a
     *                              star value.</dd>
     *   <dt>word-wrap</dt>         <dd><code>@</code> The value indicating whether cells in the column wrap
     *                              their content.</dd>
     * </dl>
     *
     * Any html content within the <b>wj-flex-grid-column</b> directive is treated as a template for the cells in that column.
     * The template is applied only to regular cells. If you wish to apply templates to specific cell types such as
     * column or group headers, then please see the {@link wijmo.angular.grid.WjFlexGridCellTemplate} directive.
     *
     * The following example creates two columns with a template and a conditional style:
     *
     * <a href="https://jsfiddle.net/Wijmo5/5L423/" target="_blank">Example</a>
     *
     * The <b>wj-flex-grid-column</b> directive may contain {@link wijmo.angular.grid.WjFlexGridCellTemplate} child directives.
     */
    class WjFlexGridColumn extends WjDirective {
        static _colTemplateProp: string;
        static _colWjLinkProp: string;
        static _cellCtxProp: string;
        _$compile: any;
        constructor($compile: any);
        readonly _controlConstructor: typeof grid.Column;
        _initControl(element: any): any;
        _createLink(): WjLink;
    }
    /**
     * Defines the type of cell to which the template applies.
     * This value is specified in the <b>cell-type</b> attribute
     * of the {@link wijmo.angular.grid.WjFlexGridCellTemplate} directive.
     */
    enum CellTemplateType {
        /** Defines a regular (data) cell. */
        Cell = 0,
        /** Defines a cell in edit mode. */
        CellEdit = 1,
        /** Defines a column header cell. */
        ColumnHeader = 2,
        /** Defines a row header cell. */
        RowHeader = 3,
        /** Defines a row header cell in edit mode. */
        RowHeaderEdit = 4,
        /** Defines a top left cell. */
        TopLeft = 5,
        /** Defines a group header cell in a group row. */
        GroupHeader = 6,
        /** Defines a regular cell in a group row. */
        Group = 7,
        /** Defines a column footer cell. */
        ColumnFooter = 8,
        /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
        BottomLeft = 9
    }
    /**
     * AngularJS directive for the {@link FlexGrid} cell templates.
     *
     * The <b>wj-flex-grid-cell-template</b> directive defines a template for a certain
     * cell type in {@link FlexGrid}, and must contain a <b>cell-type</b> attribute that
     * specifies the {@link CellTemplateType}. Depending on the template's cell type,
     * the <b>wj-flex-grid-cell-template</b> directive must be a child of either {@link wijmo.angular.grid.WjFlexGrid}
     * or {@link wijmo.angular.grid.WjFlexGridColumn} directives.
     *
     * Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
     * directives, and cells that are not column-specific (like row header or top left cells)
     * must be contained in the <b>wj-flex-grid directive</b>.
     *
     * In addition to an HTML fragment, <b>wj-flex-grid-cell-template</b> directives may
     * contain an <b>ng-style</b> or <b>ng-class</b> attribute that provides conditional formatting for cells.
     *
     * Both the <b>ng-style/ng-class</b> attributes and the HTML fragment can use the <b>$col</b>,
     * <b>$row</b> and <b>$item</b> template variables that refer to the {@link Column},
     * {@link Row} and <b>Row.dataItem</b> objects pertaining to the cell.
     *
     * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>$value</b>
     * variable containing an unformatted cell value is provided. For example, here is a
     * FlexGrid control with templates for row headers and for the Country column's regular
     * and column header cells:
     *
     * <pre>&lt;wj-flex-grid items-source="data"&gt;
     *   &lt;wj-flex-grid-cell-template cell-type="RowHeader"&gt;
     *     {&#8203;{$row.index}}
     *   &lt;/wj-flex-grid-cell-template&gt;
     *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
     *     ...
     *   &lt;/wj-flex-grid-cell-template&gt;
     * &nbsp;
     *   &lt;wj-flex-grid-column header="Country" binding="country"&gt;
     *     &lt;wj-flex-grid-cell-template cell-type="ColumnHeader"&gt;
     *       &lt;img ng-src="resources/globe.png" /&gt;
     *         {&#8203;{$col.header}}
     *       &lt;/wj-flex-grid-cell-template&gt;
     *       &lt;wj-flex-grid-cell-template cell-type="Cell"&gt;
     *         &lt;img ng-src="resources/{&#8203;{$item.country}}.png" /&gt;
     *         {&#8203;{$item.country}}
     *       &lt;/wj-flex-grid-cell-template&gt;
     *     &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column header="Sales" binding="sales"&gt;&lt;/wj-flex-grid-column&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * For more detailed information on specific cell type templates refer to the
     * documentation for the {@link CellTemplateType} enumeration.
     *
     * Note that the <b>wj-flex-grid-column</b> directive may also contain arbitrary content
     * that is treated as a template for a regular data cell (<i>cell-type="Cell"</i>). But if
     * a <b>wj-flex-grid-cell-template</b> directive exists and is set to <i>cell-type="Cell"</i>
     * under the <b>wj-flex-grid-column</b> directive, it takes priority and overrides the
     * arbitrary content.
     *
     * The <b>wj-flex-grid-cell-template</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>cell-type</dt>
     *   <dd><code>@</code>
     *     The {@link CellTemplateType} value defining the type of cell the template applies to.
     *   </dd>
     *   <dt>auto-size-rows</dt>
     *   <dd><code>@</code>
     *     Indicates whether the cell template will increase grid's default row height to accommodate
     *     cells content. Defaults to true.
     *   </dd>
     *   <dt>cell-overflow</dt>
     *   <dd><code>@</code>
     *     Defines the <b>style.overflow</b> property value for cells.
     *   </dd>
     *   <dt>force-full-edit</dt>
     *   <dd><code>@</code>
     *     For cell edit templates, indicates whether cell editing forcibly starts in full edit mode,
     *     regardless of how the editing was initiated. In full edit mode pressing cursor keys don't finish editing.
     *     Defaults to true.
     *   </dd>
     * </dl>
     *
     * The <b>cell-type</b> attribute takes any of the following enumerated values:
     *
     * <b>Cell</b>
     *
     * Defines a regular (data) cell template. Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
     * For example, this cell template shows flags in the Country column's cells:
     *
     * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
     *   &lt;wj-flex-grid-cell-template cell-type="Cell"&gt;
     *     &lt;img ng-src="resources/{&#8203;{$item.country}}.png" /&gt;
     *     {&#8203;{$item.country}}
     *   &lt;/wj-flex-grid-cell-template&gt;
     * &lt;/wj-flex-grid-column&gt;</pre>
     *
     * For a hierarchical {@link FlexGrid} (that is, one with the <b>childItemsPath</b> property
     * specified), if no <b>Group</b> template is provided, non-header cells in group rows in
     * this {@link Column} also use this template.
     *
     * <b>CellEdit</b>
     *
     * Defines a template for a cell in edit mode. Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
     * This cell type has an additional <b>$value</b> property available for binding. It contains the
     * original cell value before editing, and the updated value after editing.
     
        * For example, here is a template that uses the Wijmo {@link InputNumber} control as an editor
        * for the "Sales" column:
        *
        * <pre>&lt;wj-flex-grid-column header="Sales" binding="sales"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="CellEdit"&gt;
        *     &lt;wj-input-number value="$value" step="1"&gt;&lt;/wj-input-number&gt;
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid-column&gt;</pre>
        *
        * <b>ColumnHeader</b>
        *
        * Defines a template for a column header cell. Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
        * For example, this template adds an image to the header of the "Country" column:
        *
        * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="ColumnHeader"&gt;
        *     &lt;img ng-src="resources/globe.png" /&gt;
        *     {&#8203;{$col.header}}
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid-column&gt;</pre>
        *
        * <b>RowHeader</b>
        *
        * Defines a template for a row header cell. Must be a child of the {@link wijmo.angular.grid.WjFlexGrid} directive.
        * For example, this template shows row indices in the row headers:
        *
        * <pre>&lt;wj-flex-grid items-source="data"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="RowHeader"&gt;
        *     {&#8203;{$row.index}}
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid&gt;</pre>
        *
        * Note that this template is applied to a row header cell, even if it is in a row that is
        * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
        * content, define the <b>RowHeaderEdit</b> template.
        *
        * <b>RowHeaderEdit</b>
        *
        * Defines a template for a row header cell in edit mode. Must be a child of the
        * {@link wijmo.angular.grid.WjFlexGrid} directive. For example, this template shows dots in the header
        * of rows being edited:
        *
        * <pre>&lt;wj-flex-grid items-source="data"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
        *       ...
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid&gt;</pre>
        *
        * To add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
        * applies, use the following <b>RowHeaderEdit</b> template:
        *
        * <pre>&lt;wj-flex-grid items-source="data"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="RowHeaderEdit"&gt;
        *     {&#8203;{&amp;#x270e;}}
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid&gt;</pre>
        *
        * <b>TopLeft</b>
        *
        * Defines a template for the top left cell. Must be a child of the {@link wijmo.angular.grid.WjFlexGrid} directive.
        * For example, this template shows a down/right glyph in the top-left cell of the grid:
        *
        * <pre>&lt;wj-flex-grid items-source="data"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="TopLeft"&gt;
        *     &lt;span class="wj-glyph-down-right"&gt;&lt;/span&gt;
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid&gt;</pre>
        *
        * <p><b>GroupHeader</b></p>
        *
        * Defines a template for a group header cell in a {@link GroupRow}, Must be a child of the {@link wijmo.angular.grid.WjFlexGridColumn} directive.
        *
        * The <b>$row</b> variable contains an instance of the <b>GroupRow</b> class. If the grouping comes
        * from the a {@link CollectionView}, the <b>$item</b> variable references the {@link CollectionViewGroup} object.
        *
        * For example, this template uses a checkbox element as an expand/collapse toggle:
        *
        * <pre>&lt;wj-flex-grid-column header="Country" binding="country"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="GroupHeader"&gt;
        *     &lt;input type="checkbox" ng-model="$row.isCollapsed"/&gt;
        *     {&#8203;{$item.name}} ({&#8203;{$item.items.length}} items)
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid-column&gt;</pre>
        *
        * <b>Group</b>
        *
        * Defines a template for a regular cell (not a group header) in a {@link GroupRow}. Must be a child of the
        * {@link wijmo.angular.grid.WjFlexGridColumn} directive. This cell type has an additional <b>$value</b> varible available for
        * binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
        * aggregate value.
        *
        * For example, this template shows an aggregate's value and kind for group row cells in the "Sales"
        * column:
        *
        * <pre>&lt;wj-flex-grid-column header="Sales" binding="sales" aggregate="Avg"&gt;
        *   &lt;wj-flex-grid-cell-template cell-type="Group"&gt;
        *     Average: {&#8203;{$value | number:2}}
        *   &lt;/wj-flex-grid-cell-template&gt;
        * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>ColumnFooter</b>
    *
    * Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
    * {@link wijmo.angular.grid.WjFlexGridColumn} directive. This cell type has an additional <b>$value</b>
    * property available for binding that contains a cell value.
    *
    * For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
    * column:
    *
    * <pre>&lt;wj-flex-grid-column header="Sales" binding="sales" aggregate="Avg"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="ColumnFooter"&gt;
    *     Average: {&#8203;{$value | number:2}}
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid-column&gt;</pre>
    *
    * <b>BottomLeft</b>
    *
    * Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
    * Must be a child of the {@link wijmo.angular.grid.WjFlexGrid} directive.
    * For example, this template shows a sigma glyph in the bottom-left cell of the grid:
    *
    * <pre>&lt;wj-flex-grid items-source="data"&gt;
    *   &lt;wj-flex-grid-cell-template cell-type="BottomLeft"&gt;
    *    &amp;#931;
    *   &lt;/wj-flex-grid-cell-template&gt;
    * &lt;/wj-flex-grid&gt;</pre>
        */
    class WjFlexGridCellTemplate extends WjDirective {
        static _tagName: string;
        static _getTemplContextProp(templateType: CellTemplateType): string;
        constructor();
        _initControl(element: any): any;
        _createLink(): WjLink;
        _getMetaDataId(): any;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for {@link FlexGrid} {@link DetailRow} templates.
     *
     * The <b>wj-flex-grid-detail</b> directive must be contained in a
     * <b>wj-flex-grid</b> directive.
     *
     * The <b>wj-flex-grid-detail</b> directive represents a {@link FlexGridDetailProvider}
     * object that maintains detail rows visibility, with detail rows content defined as
     * an arbitrary HTML fragment within the directive tag. The fragment may contain
     * AngularJS bindings and directives.
     * In addition to any properties available in a controller, the local <b>$row</b> and
     * <b>$item</b> template variables can be used in AngularJS bindings that refer to
     * the detail row's parent {@link Row} and <b>Row.dataItem</b> objects. For example:
     *
     * <pre>&lt;p&gt;Here is a detail row with a nested FlexGrid:&lt;/p&gt;
     * &nbsp;
     * &lt;wj-flex-grid
     *   items-source="categories"&gt;
     *   &lt;wj-flex-grid-column header="Name" binding="CategoryName"&gt;&lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column header="Description" binding="Description" width="*"&gt;&lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-detail max-height="250" detail-visibility-mode="detailMode"&gt;
     *     &lt;wj-flex-grid
     *       items-source="getProducts($item.CategoryID)"
     *       headers-visibility="Column"&gt;
     *     &lt;/wj-flex-grid&gt;
     *   &lt;/wj-flex-grid-detail&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * A reference to a <b>FlexGridDetailProvider</b> object represented by the
     * <b>wj-flex-grid-detail</b> directive can be retrieved in a usual way by binding
     * to the directive's <b>control</b> property. This makes all the API provided by
     * <b>FlexGridDetailProvider</b> available for usage in the template, giving you total
     * control over the user experience. The following example adds a custom show/hide toggle
     * to the Name column cells, and a Hide Detail button to the detail row. These elements call
     * the <b>FlexGridDetailProvider</b>, <b>hideDetail</b> and <b>showDetail</b> methods in
     * their <b>ng-click</b> bindings to implement the custom show/hide logic:
     *
     * <pre>&lt;p&gt;Here is a FlexGrid with custom show/hide detail elements:&lt;/p&gt;
     * &nbsp;
     * &lt;wj-flex-grid
     *   items-source="categories"
     *   headers-visibility="Column"
     *   selection-mode="Row"&gt;
     *   &lt;wj-flex-grid-column header="Name" binding="CategoryName" is-read-only="true" width="200"&gt;
     *     &lt;img ng-show="dp.isDetailVisible($row)" ng-click="dp.hideDetail($row)" src="resources/hide.png" /&gt;
     *     &lt;img ng-hide="dp.isDetailVisible($row)" ng-click="dp.showDetail($row, true)" src="resources/show.png" /&gt;
     *     {&#8203;{$item.CategoryName}}
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column header="Description" binding="Description" width="2*"&gt;&lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-detail control="dp" detail-visibility-mode="Code"&gt;
     *     &lt;div style="padding:12px;background-color:#cee6f7"&gt;
     *       ID: &lt;b&gt;{&#8203;{$item.CategoryID}}&lt;/b&gt;&lt;br /&gt;
     *       Name: &lt;b&gt;{&#8203;{$item.CategoryName}}&lt;/b&gt;&lt;br /&gt;
     *       Description: &lt;b&gt;{&#8203;{$item.Description}}&lt;/b&gt;&lt;br /&gt;
     *       &lt;button class="btn btn-default" ng-click="dp.hideDetail($row)"&gt;Hide Detail&lt;/button&gt;
     *     &lt;/div&gt;
     *   &lt;/wj-flex-grid-detail&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * The <b>wj-flex-grid-detail</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>control</dt>                <dd><code>=</code> A reference to the {@link FlexGridDetailProvider} object
     *                                   created by this directive.</dd>
     *   <dt>detail-visibility-mode</dt> <dd><code>@</code>A {@link DetailVisibilityMode} value that determines when
     *                                   to display the row details.</dd>
     *   <dt>max-height</dt>             <dd><code>@</code>The maximum height of the detail rows, in pixels.</dd>
     *   <dt>row-has-detail</dt>         <dd><code>=</code>The callback function that determines whether a row
     *                                       has details.</dd>
     * </dl>
     *
     */
    class WjFlexGridDetail extends WjDirective {
        static _detailTemplateProp: string;
        static _detailScopeProp: string;
        _$compile: any;
        constructor($compile: any);
        readonly _controlConstructor: typeof grid.detail.FlexGridDetailProvider;
        _createLink(): WjLink;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link FlexGridFilter} object.
     *
     * The <b>wj-flex-grid-filter</b> directive must be contained in a {@link wijmo.angular.grid.WjFlexGrid} directive. For example:
     *
     * <pre>&lt;p&gt;Here is a FlexGrid control with column filters:&lt;/p&gt;
     * &lt;wj-flex-grid items-source="data"&gt;
     *   &lt;wj-flex-grid-filter filter-columns="['country', 'expenses']"&gt;&lt;/wj-flex-grid-filter&gt;
     * &nbsp;
     *   &lt;wj-flex-grid-column
     *     header="Country"
     *     binding="country"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     header="Sales"
     *     binding="sales"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     header="Expenses"
     *     binding="expenses"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     header="Downloads"
     *     binding="downloads"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *  &lt;/wj-flex-grid&gt;</pre>
     *
     * The <b>wj-flex-grid-filter</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>filter-columns</dt>    <dd><code>=</code> An array containing the names or bindings of the columns
     *                              to filter.</dd>
     *   <dt>show-filter-icons</dt> <dd><code>@</code>  The value indicating whether filter editing buttons
     *                              appear in the grid's column headers.</dd>
     *   <dt>filter-changing</dt>   <dd><code>&</code> Handler for the {@link FlexGridFilter.filterChanging} event.</dd>
     *   <dt>filter-changed</dt>    <dd><code>&</code> Handler for the {@link FlexGridFilter.filterChanged} event.</dd>
     *   <dt>filter-applied</dt>    <dd><code>&</code> Handler for the {@link FlexGridFilter.filterApplied} event.</dd>
     * </dl>
     */
    class WjFlexGridFilter extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof grid.filter.FlexGridFilter;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link GroupPanel} control.
     *
     * The <b>wj-group-panel</b> directive connects to the <b>FlexGrid</b> control via the <b>grid</b> property.
     * For example:
     *
     * <pre>&lt;p&gt;Here is a FlexGrid control with GroupPanel:&lt;/p&gt;
     * &nbsp;
     * &lt;wj-group-panel grid="flex" placeholder="Drag columns here to create groups."&gt;&lt;/wj-group-panel&gt;
     * &nbsp;
     * &lt;wj-flex-grid control="flex" items-source="data"&gt;
     *   &lt;wj-flex-grid-column
     *     header="Country"
     *     binding="country"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     header="Sales"
     *     binding="sales"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     header="Expenses"
     *     binding="expenses"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column
     *     header="Downloads"
     *     binding="downloads"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * The <b>wj-group-panel</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>grid</dt>                      <dd><code>@</code>The <b>FlexGrid</b> that is connected to this <b>GroupPanel</b>.</dd>
     *   <dt>hide-grouped-columns</dt>      <dd><code>@</code>A value indicating whether the panel hides grouped columns
     *                                      in the owner grid.</dd>
     *   <dt>max-groups</dt>                <dd><code>@</code>The maximum number of groups allowed.</dd>
     *   <dt>placeholder</dt>               <dd><code>@</code>A string to display in the control when it
     *                                      contains no groups.</dd>
     *   <dt>got-focus</dt>                 <dd><code>&</code> Handler for the {@link GroupPanel.gotFocus} event.</dd>
     *   <dt>lost-focus</dt>                <dd><code>&</code> Handler for the {@link GroupPanel.lostFocus} event.</dd>
     * </dl>
     *
     */
    class WjGroupPanel extends WjDirective {
        readonly _controlConstructor: typeof grid.grouppanel.GroupPanel;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link MultiRow} control.
     *
     * Use the <b>wj-multi-row</b> directive to add <b>MultiRow</b> controls to your AngularJS applications.
     * Note that directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case.
     *
     * The <b>wj-multi-row</b> directive extends {@link wijmo.angular.grid.WjFlexGrid} with the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>control</dt>                    <dd><code>=</code> A reference to the {@link MultiRow} control created by this directive.</dd>
     *   <dt>layout-definition</dt>          <dd><code>@</code> A value defines the layout of the rows used to display each data item.</dd>
     *   <dt>collapsed-headers</dt>          <dd><code>@</code> Gets or sets a value that determines whether column headers should be
     *                                       collapsed and displayed as a single row displaying the group headers.</dd>
     *   <dt>center-headers-vertically</dt>  <dd><code>@</code> Gets or sets a value that determines whether the content of cells
     *                                       that span multiple rows should be vertically centered.</dd>
     *   <dt>show-header-collapse-button</dt><dd><code>@</code> Gets or sets a value that determines whether the grid should
     *                                       display a button in the column header panel to allow users to collapse and expand the column headers.</dd>
     * </dl>
     */
    class WjMultiRow extends WjFlexGrid {
        constructor($compile: any, $interpolate: any);
        readonly _controlConstructor: typeof grid.multirow.MultiRow;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
}
declare module wijmo.angular {
}
declare module wijmo.angular {
    /**
     * AngularJS directive for the {@link PivotGrid} control.
     *
     * Use the <b>wj-pivot-grid</b> and <b>wj-pivot-panel</b> directives
     * to add pivot tables to your AngularJS applications.
     *
     * Directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-pivot-panel
     *     control="thePanel"
     *     items-source="rawData"&gt;
     * &lt;/wj-pivot-panel&gt;
     * &lt;wj-pivot-grid
     *     items-source="thePanel"
     *     show-detail-on-double-click="false"
     *     custom-context-menu="true"&gt;
     * &lt;/wj-pivot-grid&gt;</pre>
     *
     * The <b>wj-pivot-grid</b> directive extends the <b>wj-flex-grid</b> directive
     * and adds support for the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>items-source</dt>                  <dd>Gets or sets the {@link PivotPanel} that defines the view
     *                                              displayed by this {@link PivotGrid}.</dd>
     *   <dt>show-detail-on-double-click</dt>   <dd>Gets or sets whether the grid should show a popup containing the
     *                                              detail records when the user double-clicks a cell.</dd>
     *   <dt>custom-context-menu</dt>           <dd>Gets or sets whether the grid should provide a custom context menu
     *                                              with commands for changing field settings and showing detail records.</dd>
     *   <dt>collapsible-subtotals</dt>         <dd>Gets or sets whether the grid should allow users to collapse and
     *                                              expand subtotal groups of rows and columns.</dd>
     *   <dt>center-headers-vertically</dt>     <dd>Gets or sets whether the content of header cells should be vertically centered.</dd>
     * </dl>
     */
    class WjPivotGrid extends WjFlexGrid {
        constructor($compile: any, $interpolate: any);
        readonly _controlConstructor: typeof olap.PivotGrid;
    }
    /**
     * AngularJS directive for the {@link PivotChart} control.
     *
     * Use the <b>wj-pivot-chart</b> and <b>wj-pivot-panel</b> directives
     * to add pivot charts to your AngularJS applications.
     *
     * Directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-pivot-panel
     *     control="thePanel"
     *     items-source="rawData"&gt;
     * &lt;/wj-pivot-panel&gt;
     * &lt;wj-pivot-chart
     *     items-source="thePanel"
     *     chart-type="Bar"
     *     max-series="10"
     *     max-points="100"&gt;
     * &lt;/wj-pivot-chart&gt;</pre>
     *
     * The <b>wj-pivot-chart</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>items-source</dt>                  <dd>Gets or sets the {@link PivotPanel} that defines the view
     *                                              displayed by this {@link PivotChart}.</dd>
     *   <dt>chart-type</dt>                    <dd>Gets or sets a {@link PivotChartType} value that defines
     *                                              the type of chart to display.</dd>
     *   <dt>show-hierarchical-axes</dt>        <dd>Gets or sets whether the chart should group axis annotations for grouped data.</dd>
     *   <dt>stacking</dt>                      <dd>Gets or sets a {@link Stacking} value that determines whether and how the series
     *                                              objects are stacked.</dd>
     *   <dt>show-totals</dt>                   <dd>Gets or sets a whether the chart should include only totals.</dd>
     *   <dt>max-series</dt>                    <dd>Gets or sets the maximum number of data series to be shown in the chart.</dd>
     *   <dt>max-points</dt>                    <dd>Gets or sets the maximum number of points to be shown in each series.</dd>
     * </dl>
     */
    class WjPivotChart extends WjDirective {
        readonly _controlConstructor: typeof olap.PivotChart;
    }
    /**
     * AngularJS directive for the {@link PivotPanel} control.
     *
     * Use the <b>wj-pivot-panel</b> directive as a data source for
     * <b>wj-pivot-grid</b> and <b>wj-pivot-chart</b> directives
     * to add pivot tables and charts to your AngularJS applications.
     *
     * Directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-pivot-panel
     *     control="thePanel"
     *     items-source="rawData"&gt;
     * &lt;/wj-pivot-panel&gt;
     * &lt;wj-pivot-grid
     *     items-source="thePanel"
     *     show-detail-on-double-click="false"
     *     custom-context-menu="true"&gt;
     * &lt;/wj-pivot-grid&gt;</pre>
     *
     * The <b>wj-pivot-panel</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>items-source</dt>                  <dd>Gets or sets the raw data used to generate pivot views.</dd>
     *   <dt>auto-generate-fields</dt>          <dd>Gets or sets whether the panel should populate its fields
     *                                              collection automatically based on the {@link PivotPanel.itemsSource}.</dd>
     *   <dt>view-definition</dt>               <dd>Gets or sets the current pivot view definition as a JSON string.</dd>
     *   <dt>engine</dt>                        <dd>Gets a reference to the {@link PivotEngine} that summarizes the data.</dd>
     * </dl>
     */
    class WjPivotPanel extends WjDirective {
        constructor();
        readonly _controlConstructor: typeof olap.PivotPanel;
    }
    /**
     * AngularJS directive for the {@link Slicer} control.
     *
     * Use the <b>wj-slicer</b> directive provides a quick way to edit filters
     * applied to {@link PivotField} objects.
     *
     * Directive and parameter names must be formatted as lower-case with dashes
     * instead of camel-case. For example:
     *
     * <pre>&lt;wj-slicer
     *     field="theField"
     *     header="theHeader"
     *     show-header="true"&gt;
     * &lt;/wj-slicer&gt;</pre>
     *
     * The <b>wj-slicer</b> directive supports the following attributes:
     *
     * <dl class="dl-horizontal">
     *   <dt>field</dt>           <dd>Gets or sets the PivotField being filtered by the Slicer.</dd>
     *   <dt>header</dt>          <dd>Gets or sets the header string shown at the top of the {@link Slicer}.</dd>
     *   <dt>showHeader</dt>      <dd>Gets or sets a value indicating whether the control displays the
     *                                header area with the header string and multi-select/clear buttons.</dd>
     *   <dt>showCheckboxes</dt>  <dd>Gets or sets a value indicating whether the control displays
     *                                checkboxes next to each item.</dd>
     *   <dt>multiSelect</dt>     <dd>Gets or sets a value that determines whether users should be allowed to
     *                                select multiple values from the list.</dd>
     * </dl>
     */
    class WjSlicer extends WjDirective {
        readonly _controlConstructor: typeof olap.Slicer;
    }
}
declare module wijmo.angular {
}
declare module wijmo.angular {
}
declare module wijmo.angular {
}
