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
declare module wijmo.vue2 {
    function softInput(): typeof wijmo.input;
    function softGridDetail(): typeof wijmo.grid.detail;
}
declare module wijmo.vue2 {
    abstract class DirectiveCellFactoryBase extends wijmo.grid.CellFactory {
        private static _templateTypes;
        private static _cellStampProp;
        private static _FOCUS_INTERVAL;
        grid: wijmo.grid.FlexGrid;
        private _baseCf;
        private _closingApplyTimeOut;
        private _lastApplyTimeStamp;
        private _noApplyLag;
        private _editChar;
        private _startingEditing;
        private _evtInput;
        private _evtBlur;
        private _cellStampCounter;
        private _cellEditorVars;
        private _composing;
        constructor(grid: wijmo.grid.FlexGrid);
        updateCell(panel: wijmo.grid.GridPanel, rowIndex: number, colIndex: number, cell: HTMLElement, rng?: wijmo.grid.CellRange): void;
        getEditorValue(g: wijmo.grid.FlexGrid): any;
        disposeCell(cell: HTMLElement): void;
        /**
         * Indicates whether a new template instance must be created for the cell.
         * @param cell
         * @param templContextProp
         */
        protected abstract shouldInstantiate(cellInfo: ICellRenderingInfo): boolean;
        protected abstract renderTemplate(cellInfo: ICellRenderingInfo, initNew: boolean): any;
        protected disposeTemplate(cell: HTMLElement, templateCache: ICellTemplateCache, templateContext: ICellTemplateInfo): void;
        /**
         * Forces template to apply all changes immediately (apply bindings, etc - whatever is relevant),
         * to make its size up to date. Usually used in cell size measurement scenarios.
         * @param cellInfo
         */
        protected abstract applyImmediately(cellInfo: ICellRenderingInfo): any;
        /**
         * Causes the control to immediately trigger pending framework events.
         * @param control
         */
        protected abstract flushPendingEvents(control: wijmo.Control): any;
        protected abstract getEditorFocusFlag(): boolean;
        protected abstract setEditorFocusFlag(value: boolean): any;
        protected setBindingsData(context: any, row: wijmo.grid.Row, col: wijmo.grid.Column, dataItem: any, cellValue: any, valuePaths: Object): CellBindingsData;
        protected checkHeight(cellInfo: ICellRenderingInfo): void;
        protected doDisposeCell(cell: HTMLElement): void;
        protected abstract clearCell(cell: HTMLElement): any;
        static getTemplContextProp(templateType: GridCellTemplateType): string;
        private _doDisposeCell;
        private _initEditInput;
        private _initImeEditInput;
        private _findInitialInput;
        private static _setSelectionRange;
        private _triggerEditorEvents;
        private _isFullEdit;
        private _setFullEdit;
    }
    /**
    * Defines the type of cell on which a template is to be applied. This value is specified in the <b>cellType</b> attribute
    * of the frameworks' cell template components/directives.
    */
    enum GridCellTemplateType {
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
        /** Defines a cell in a new row template. */
        NewCellTemplate = 8,
        /** Defines a column footer cell. */
        ColumnFooter = 9,
        /** Defines a bottom left cell (at the intersection of the row header and column footer cells). **/
        BottomLeft = 10
    }
    interface ICellTemplateInfo {
        cellOverflow: string;
        autoSizeRows: boolean;
        forceFullEdit: boolean;
        valuePaths: Object;
    }
    interface ICellTemplateCache {
        column?: wijmo.grid.Column;
        templateContextProperty: string;
        rootElement: Element;
    }
    interface ICellRenderingInfo {
        cell: HTMLElement;
        column: wijmo.grid.Column;
        row: wijmo.grid.Row;
        cellValue: any;
        panel: wijmo.grid.GridPanel;
        rng: wijmo.grid.CellRange;
        isEdit: boolean;
        isImeInput: boolean;
        isTrueImeInput: boolean;
        templateContextProperty: string;
        templateContext: ICellTemplateInfo;
        templateCache: ICellTemplateCache;
        cellBindingsData?: CellBindingsData;
        cellStamp: number;
    }
    interface CellBindingsData {
        localVars: {
            row: any;
            col: any;
            item: any;
            value: any;
            values: any;
        };
        bindings?: any;
    }
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    var VueApi: any;
    class WjComponentBehavior {
        static tag: string;
        static render: (createElement: () => any) => any;
        static className: string;
        static classCtor: () => any;
        static parentProp: string;
        static parentInCtor: boolean;
        static siblingId: string;
        static data: any;
        static props: string[];
        static events: string[];
        static changeEvents: {
            [event: string]: string[];
        };
        static modelProp: string;
        private static readonly _typeSiblingIdAttr;
        static readonly _behClassProp: string;
        static readonly _behProp: string;
        static readonly _propIdxMapProp: string;
        private static _siblingDirId;
        private static _modelEvent;
        private _siblingId;
        private _isMounted;
        private _mountedCBs;
        private _siblingInsertedEH;
        readonly component: any;
        control: any;
        parent: WjComponentBehavior;
        ['constructor']: typeof WjComponentBehavior;
        static _attach(component: any): WjComponentBehavior;
        static register(): any;
        constructor(component: any);
        lhMounted(): void;
        lhDestroyed(): void;
        private static _getProps;
        private static _getModel;
        private static _getEmits;
        protected _createControl(): any;
        protected _initParent(): void;
        protected _updateControl(property: string, newValue: any): void;
        private _prepareControl;
        private _isChild;
        private _isParentInCtor;
        private _getParentProp;
        private _getSiblingIndex;
        private _siblingInserted;
        private _getElement;
        private static _getControlType;
        _mountedCB(cb: () => void): void;
    }
    function _initialize(behavior: WjComponentBehavior): any;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.analytics.TrendLine} class.
     *
     * The <b>wj-flex-chart-trend-line</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.TrendLine} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartTrendLine: any;
    /**
     * Vue component for the {@link wijmo.chart.analytics.MovingAverage} class.
     *
     * The <b>wj-flex-chart-moving-average</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.MovingAverage} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartMovingAverage: any;
    /**
     * Vue component for the {@link wijmo.chart.analytics.YFunctionSeries} class.
     *
     * The <b>wj-flex-chart-y-function-series</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.YFunctionSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartYFunctionSeries: any;
    /**
     * Vue component for the {@link wijmo.chart.analytics.ParametricFunctionSeries} class.
     *
     * The <b>wj-flex-chart-parametric-function-series</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.ParametricFunctionSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartParametricFunctionSeries: any;
    /**
     * Vue component for the {@link wijmo.chart.analytics.Waterfall} class.
     *
     * The <b>wj-flex-chart-waterfall</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.Waterfall} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartWaterfall: any;
    /**
     * Vue component for the {@link wijmo.chart.analytics.BoxWhisker} class.
     *
     * The <b>wj-flex-chart-box-whisker</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.BoxWhisker} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartBoxWhisker: any;
    /**
     * Vue component for the {@link wijmo.chart.analytics.ErrorBar} class.
     *
     * The <b>wj-flex-chart-error-bar</b> component should be contained in
     * a {@link wijmo.vue2.chart.WjFlexChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.ErrorBar} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartErrorBar: any;
    /**
     * Vue component for the {@link wijmo.chart.analytics.BreakEven} class.
     *
     * The <b>wj-flex-chart-break-even</b> component should be contained in
     * a {@link wijmo.vue2.chart.WjFlexChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.BreakEven} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartBreakEven: any;
    function registerChartAnalytics(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.animation.ChartAnimation} class.
     *
     * The <b>wj-flex-chart-animation</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     * , {@link wijmo.vue2.chart.WjFlexPie}
     * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
     *  or {@link wijmo.vue2.chart.radar.WjFlexRadar}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.animation.ChartAnimation} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnimation: any;
    function registerChartAnimation(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.annotation.AnnotationLayer} class.
     *
     * The <b>wj-flex-chart-annotation-layer</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The <b>wj-flex-chart-annotation-layer</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationText}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationEllipse}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationRectangle}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLine}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationPolygon}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationCircle}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationSquare}
     * and {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationImage}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.AnnotationLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationLayer: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Text} class.
     *
     * The <b>wj-flex-chart-annotation-text</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-text</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Text} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationText: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Ellipse} class.
     *
     * The <b>wj-flex-chart-annotation-ellipse</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-ellipse</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Ellipse} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationEllipse: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Rectangle} class.
     *
     * The <b>wj-flex-chart-annotation-rectangle</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-rectangle</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Rectangle} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationRectangle: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Line} class.
     *
     * The <b>wj-flex-chart-annotation-line</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-line</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Line} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationLine: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Polygon} class.
     *
     * The <b>wj-flex-chart-annotation-polygon</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-polygon</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Polygon} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationPolygon: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Circle} class.
     *
     * The <b>wj-flex-chart-annotation-circle</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-circle</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Circle} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationCircle: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Square} class.
     *
     * The <b>wj-flex-chart-annotation-square</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-square</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Square} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationSquare: any;
    /**
     * Vue component for the {@link wijmo.chart.annotation.Image} class.
     *
     * The <b>wj-flex-chart-annotation-image</b> component should be contained in
     * a {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer} component.
     *
     * The <b>wj-flex-chart-annotation-image</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.Image} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAnnotationImage: any;
    function registerChartAnnotation(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.Fibonacci} class.
     *
     * The <b>wj-flex-chart-fibonacci</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Fibonacci} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartFibonacci: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.FibonacciArcs} class.
     *
     * The <b>wj-flex-chart-fibonacci-arcs</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.FibonacciArcs} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartFibonacciArcs: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.FibonacciFans} class.
     *
     * The <b>wj-flex-chart-fibonacci-fans</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.FibonacciFans} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartFibonacciFans: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.FibonacciTimeZones} class.
     *
     * The <b>wj-flex-chart-fibonacci-time-zones</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.FibonacciTimeZones} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartFibonacciTimeZones: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.ATR} class.
     *
     * The <b>wj-flex-chart-atr</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.ATR} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAtr: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.CCI} class.
     *
     * The <b>wj-flex-chart-cci</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.CCI} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartCci: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.RSI} class.
     *
     * The <b>wj-flex-chart-rsi</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.RSI} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartRsi: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.WilliamsR} class.
     *
     * The <b>wj-flex-chart-williams-r</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.WilliamsR} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartWilliamsR: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.Macd} class.
     *
     * The <b>wj-flex-chart-macd</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Macd} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartMacd: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.MacdHistogram} class.
     *
     * The <b>wj-flex-chart-macd-histogram</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.MacdHistogram} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartMacdHistogram: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.Stochastic} class.
     *
     * The <b>wj-flex-chart-stochastic</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Stochastic} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartStochastic: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.BollingerBands} class.
     *
     * The <b>wj-flex-chart-bollinger-bands</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.BollingerBands} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartBollingerBands: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.analytics.Envelopes} class.
     *
     * The <b>wj-flex-chart-envelopes</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Envelopes} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartEnvelopes: any;
    function registerChartFinanceAnalytics(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.finance.FinancialChart} control.
     *
     * The <b>wj-financial-chart</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.chart.analytics.WjFlexChartTrendLine}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartMovingAverage}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartYFunctionSeries}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartParametricFunctionSeries}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartWaterfall}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartBoxWhisker}
     * , {@link wijmo.vue2.chart.animation.WjFlexChartAnimation}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartFibonacci}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartFibonacciArcs}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartFibonacciFans}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartFibonacciTimeZones}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartAtr}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartCci}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartRsi}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartWilliamsR}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartMacd}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartMacdHistogram}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartStochastic}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartBollingerBands}
     * , {@link wijmo.vue2.chart.finance.analytics.WjFlexChartEnvelopes}
     * , {@link wijmo.vue2.chart.finance.WjFinancialChartSeries}
     * , {@link wijmo.vue2.chart.interaction.WjFlexChartRangeSelector}
     * , {@link wijmo.vue2.chart.interaction.WjFlexChartGestures}
     * , {@link wijmo.vue2.chart.WjFlexChartAxis}
     * , {@link wijmo.vue2.chart.WjFlexChartLegend}
     * , {@link wijmo.vue2.chart.WjFlexChartLineMarker}
     * and {@link wijmo.vue2.chart.WjFlexChartPlotArea}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.FinancialChart} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFinancialChart: any;
    /**
     * Vue component for the {@link wijmo.chart.finance.FinancialSeries} class.
     *
     * The <b>wj-financial-chart-series</b> component should be contained in
     * a {@link wijmo.vue2.chart.finance.WjFinancialChart} component.
     *
     * The <b>wj-financial-chart-series</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartAxis} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.FinancialSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFinancialChartSeries: any;
    function registerChartFinance(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.hierarchical.Sunburst} control.
     *
     * The <b>wj-sunburst</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartLegend} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.hierarchical.Sunburst} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjSunburst: any;
    /**
     * Vue component for the {@link wijmo.chart.hierarchical.TreeMap} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.hierarchical.TreeMap} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjTreeMap: any;
    function registerChartHierarchical(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.interaction.RangeSelector} class.
     *
     * The <b>wj-flex-chart-range-selector</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.interaction.RangeSelector} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartRangeSelector: any;
    /**
     * Vue component for the {@link wijmo.chart.interaction.ChartGestures} class.
     *
     * The <b>wj-flex-chart-gestures</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.interaction.ChartGestures} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartGestures: any;
    function registerChartInteraction(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.radar.FlexRadar} control.
     *
     * The <b>wj-flex-radar</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.chart.animation.WjFlexChartAnimation}
     * , {@link wijmo.vue2.chart.radar.WjFlexRadarAxis}
     * , {@link wijmo.vue2.chart.radar.WjFlexRadarSeries}
     * and {@link wijmo.vue2.chart.WjFlexChartLegend}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.radar.FlexRadar} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexRadar: any;
    /**
     * Vue component for the {@link wijmo.chart.radar.FlexRadarAxis} class.
     *
     * The <b>wj-flex-radar-axis</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.radar.WjFlexRadar}
     *  or {@link wijmo.vue2.chart.radar.WjFlexRadarSeries}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.radar.FlexRadarAxis} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexRadarAxis: any;
    /**
     * Vue component for the {@link wijmo.chart.radar.FlexRadarSeries} class.
     *
     * The <b>wj-flex-radar-series</b> component should be contained in
     * a {@link wijmo.vue2.chart.radar.WjFlexRadar} component.
     *
     * The <b>wj-flex-radar-series</b> component may contain
     * a {@link wijmo.vue2.chart.radar.WjFlexRadarAxis} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.radar.FlexRadarSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexRadarSeries: any;
    function registerChartRadar(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.FlexChart} control.
     *
     * The <b>wj-flex-chart</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.chart.analytics.WjFlexChartTrendLine}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartMovingAverage}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartYFunctionSeries}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartParametricFunctionSeries}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartWaterfall}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartBoxWhisker}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartErrorBar}
     * , {@link wijmo.vue2.chart.analytics.WjFlexChartBreakEven}
     * , {@link wijmo.vue2.chart.animation.WjFlexChartAnimation}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLayer}
     * , {@link wijmo.vue2.chart.interaction.WjFlexChartRangeSelector}
     * , {@link wijmo.vue2.chart.interaction.WjFlexChartGestures}
     * , {@link wijmo.vue2.chart.WjFlexChartAxis}
     * , {@link wijmo.vue2.chart.WjFlexChartLegend}
     * , {@link wijmo.vue2.chart.WjFlexChartDataLabel}
     * , {@link wijmo.vue2.chart.WjFlexChartSeries}
     * , {@link wijmo.vue2.chart.WjFlexChartLineMarker}
     * and {@link wijmo.vue2.chart.WjFlexChartPlotArea}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.FlexChart} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.chart.FlexChart} control using Vue markup:
     *
     * <pre>&lt;wj-flex-chart
     *     :items-source="data"
     *     binding-x="country"
     *     :header="props.header"
     *     :footer="props.footer"&gt;
     *
     *     &lt;wj-flex-chart-legend :position="props.legendPosition"&gt;
     *     &lt;/wj-flex-chart-legend&gt;
     *     &lt;wj-flex-chart-axis wj-property="axisX" :title="props.titleX"&gt;
     *     &lt;/wj-flex-chart-axis&gt;
     *     &lt;wj-flex-chart-axis wj-property="axisY" :title="props.titleY"&gt;
     *     &lt;/wj-flex-chart-axis&gt;
     *
     *     &lt;wj-flex-chart-series name="Sales" binding="sales"&gt;
     *     &lt;/wj-flex-chart-series&gt;
     *     &lt;wj-flex-chart-series name="Expenses" binding="expenses"&gt;
     *     &lt;/wj-flex-chart-series&gt;
     *     &lt;wj-flex-chart-series name="Downloads" binding="downloads"&gt;
     *     &lt;/wj-flex-chart-series&gt;
     * &lt;/wj-flex-chart&gt;</pre>
     *
     * The code sets the <b>itemsSource</b> property to a collection that contains the chart
     * data and the <b>bindingX</b> property to the data property that contains the chart X values.
     * It also sets the chart's <b>header</b> and <b>footer</b> properties to define titles to
     * show above and below the chart.
     *
     * The <b>wj-flex-chart-legend</b> and <b>wj-flex-chart-axis</b> components are used to
     * customize the chart's legend and axes.
     *
     * Finally, three <b>wj-flex-chart-series</b> components are used to specify the data
     * properties to be shown on the chart.
     */
    var WjFlexChart: any;
    /**
     * Vue component for the {@link wijmo.chart.FlexPie} control.
     *
     * The <b>wj-flex-pie</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.chart.animation.WjFlexChartAnimation}
     * , {@link wijmo.vue2.chart.WjFlexChartLegend}
     * and {@link wijmo.vue2.chart.WjFlexPieDataLabel}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.FlexPie} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexPie: any;
    /**
     * Vue component for the {@link wijmo.chart.Axis} class.
     *
     * The <b>wj-flex-chart-axis</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     * , {@link wijmo.vue2.chart.WjFlexChartSeries}
     * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChartSeries}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.Axis} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartAxis: any;
    /**
     * Vue component for the {@link wijmo.chart.Legend} class.
     *
     * The <b>wj-flex-chart-legend</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     * , {@link wijmo.vue2.chart.WjFlexPie}
     * , {@link wijmo.vue2.chart.finance.WjFinancialChart}
     * , {@link wijmo.vue2.chart.radar.WjFlexRadar}
     * , {@link wijmo.vue2.chart.hierarchical.WjSunburst}
     *  or {@link wijmo.vue2.chart.map.WjFlexMap}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.Legend} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartLegend: any;
    /**
     * Vue component for the {@link wijmo.chart.DataLabel} class.
     *
     * The <b>wj-flex-chart-data-label</b> component should be contained in
     * a {@link wijmo.vue2.chart.WjFlexChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.DataLabel} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartDataLabel: any;
    /**
     * Vue component for the {@link wijmo.chart.PieDataLabel} class.
     *
     * The <b>wj-flex-pie-data-label</b> component should be contained in
     * a {@link wijmo.vue2.chart.WjFlexPie} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.PieDataLabel} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexPieDataLabel: any;
    /**
     * Vue component for the {@link wijmo.chart.Series} class.
     *
     * The <b>wj-flex-chart-series</b> component should be contained in
     * a {@link wijmo.vue2.chart.WjFlexChart} component.
     *
     * The <b>wj-flex-chart-series</b> component may contain
     * a {@link wijmo.vue2.chart.WjFlexChartAxis} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.Series} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartSeries: any;
    /**
     * Vue component for the {@link wijmo.chart.LineMarker} class.
     *
     * The <b>wj-flex-chart-line-marker</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.LineMarker} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartLineMarker: any;
    /**
     * Vue component for the {@link wijmo.chart.DataPoint} class.
     *
     * The <b>wj-flex-chart-data-point</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationText}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationEllipse}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationRectangle}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationLine}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationPolygon}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationCircle}
     * , {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationSquare}
     *  or {@link wijmo.vue2.chart.annotation.WjFlexChartAnnotationImage}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.DataPoint} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartDataPoint: any;
    /**
     * Vue component for the {@link wijmo.chart.PlotArea} class.
     *
     * The <b>wj-flex-chart-plot-area</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.WjFlexChart}
     *  or {@link wijmo.vue2.chart.finance.WjFinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.PlotArea} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexChartPlotArea: any;
    function registerChart(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component that includes a given HTML fragment into the document.
     *
     * The <b>wj-include</b> component takes a <b>src</b> attribute that
     * specifies a file to load and include into the document. For example:
     *
     * <pre>&lt;wj-popup control="modalDialog" :modal="true" :hide-trigger="None"&gt;
     *   &lt;wj-include src="includes/dialog.htm"&gt;&lt;/wj-include&gt;
     * &lt;/wj-popup&gt;</pre>
     */
    var WjInclude: any;
    var wjFormat: (value: any, format: any) => string;
    /**
     * Vue filter that applies globalized formatting to dates and numbers.
     *
     * For example, the code below uses the <b>wj-format</b> filter to format
     * a number as a currency value and a date as a short date using the
     * current Wijmo culture:
     *
     * <pre>&lt;p&gt;value: {&#8203;{ theAmount | wj-format('c') }}&lt;/p&gt;
     * &lt;p&gt;date: {&#8203;{ theDate | wj-format('d') }}&lt;/p&gt;</pre>
     */
    var WjFormat: any;
    /**
    * Vue directive for the {@link Tooltip} class.
    *
    * Use the **wjTooltip** directive to add tooltips to elements on the page.
    * The wjTooltip directive supports HTML content, smart positioning, and touch.
    *
    * The wjTooltip directive is specified as a **v-wjTooltip** attribute added to the
    * element that the tooltip applies to. The parameter value is the tooltip
    * text or the id of an element that contains the text.
    *
    * You can also specify the tooltip with additional properties. In this case
    * the directive value is an object with property values. The possible properties
    * are:
    * - **tooltip** - tooltip text or element id.
    * - **position** - represents the {@link Tooltip.position} property.
    *
    * For example:
    * ```html
    * <p v-wjTooltip="'Just a string'">
    *     Paragraph with a string tooltip.
    * </p>
    * <p v-wjTooltip="{tooltip: '#fineprint', position: 'Left'}>
    *     Paragraph with a tooltip defined as an element.
    * </p>
    * ...
    * <div id="fineprint" style="display:none">
    *   <h3>Important Note</h3>
    *   <p>
    *     Data for the current quarter is estimated
    *     by pro-rating etc.</p>
    * </div>
    * ```
    */
    var WjTooltip: any;
    function registerCore(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.gauge.LinearGauge} control.
     *
     * The <b>wj-linear-gauge</b> component may contain
     * a {@link wijmo.vue2.gauge.WjRange} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.LinearGauge} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.LinearGauge} control using Vue markup:
     *
     * <pre>&lt;wj-linear-gauge
     *     :min="0" :max="1000" :step="50" :is-read-only="false"
     *     format="c0" :thumb-size="20"
     *     :show-ranges="false"
     *     :value="sales"
     *     :value-changed="salesChanged"&gt;
     *     &lt;wj-range wj-property="face" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range wj-property="pointer" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="0" :max="333" color="red"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="333" :max="666" color="gold"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="666" :max="1000" color="green"&gt;
     *     &lt;/wj-range&gt;
     * &lt;/wj-linear-gauge&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it binds the gauge's <b>value</b> property to a <b>sales</b> variable
     * in the controller.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    var WjLinearGauge: any;
    /**
     * Vue component for the {@link wijmo.gauge.BulletGraph} control.
     *
     * The <b>wj-bullet-graph</b> component may contain
     * a {@link wijmo.vue2.gauge.WjRange} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.BulletGraph} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBulletGraph: any;
    /**
     * Vue component for the {@link wijmo.gauge.RadialGauge} control.
     *
     * The <b>wj-radial-gauge</b> component may contain
     * a {@link wijmo.vue2.gauge.WjRange} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.RadialGauge} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.RadialGauge} control using Vue markup:
     *
     * <pre>&lt;wj-radial-gauge
     *     :min="0" :max="1000" :step="50" :is-read-only="false"
     *     format="c0" :thumb-size="12" :show-text="Value"
     *     :show-ranges="false"
     *     :value="sales"
     *     :value-changed="salesChanged"&gt;
     *     &lt;wj-range wj-property="face" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range wj-property="pointer" :thickness="0.5"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="0" :max="333" color="red"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="333" :max="666" color="gold"&gt;
     *     &lt;/wj-range&gt;
     *     &lt;wj-range :min="666" :max="1000" color="green"&gt;
     *     &lt;/wj-range&gt;
     * &lt;/wj-radial-gauge&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it binds the gauge's <b>value</b> property to a <b>sales</b> variable
     * in the controller.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    var WjRadialGauge: any;
    /**
     * Vue component for the {@link wijmo.gauge.Range} class.
     *
     * The <b>wj-range</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.gauge.WjLinearGauge}
     * , {@link wijmo.vue2.gauge.WjBulletGraph}
     *  or {@link wijmo.vue2.gauge.WjRadialGauge}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.Range} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjRange: any;
    function registerGauge(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.detail.FlexGridDetailProvider} class.
     *
     * The <b>wj-flex-grid-detail</b> component should be contained in
     * a {@link wijmo.vue2.grid.WjFlexGrid} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.detail.FlexGridDetailProvider} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexGridDetail: any;
    function registerGridDetail(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.filter.FlexGridFilter} class.
     *
     * The <b>wj-flex-grid-filter</b> component should be contained in
     * a {@link wijmo.vue2.grid.WjFlexGrid} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.filter.FlexGridFilter} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.grid.filter.FlexGridFilter} control with a filter using Vue markup:
     *
     * <pre>&lt;wj-flex-grid
     *   :items-source="data"&gt;
     *   &lt;wj-flex-grid-filter&gt;&lt;/wj-flex-grid-filter&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     */
    var WjFlexGridFilter: any;
    function registerGridFilter(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.grouppanel.GroupPanel} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.grouppanel.GroupPanel} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and connect a
     * {@link wijmo.grid.grouppanel.GroupPanel} and a {@link wijmo.grid.FlexGrid}
     * in Vue:
     *
     * <pre>&lt;wj-group-panel
     *   id="thePanel"
     *   placeholder="Drag columns here to create Groups"&gt;
     * &lt;/wj-group-panel&gt;
     * &lt;wj-flex-grid
     *   id="theGrid"
     *   :items-source="data"&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * <pre>var app = new Vue({
     *   el: '#app',
     *   // connect group panel and grid
     *   mounted: function () {
     *     var panel = wijmo.Control.getControl(document.getElementById('thePanel'));
     *     var grid = wijmo.Control.getControl(document.getElementById('theGrid'));
     *     panel.grid = grid;
     *   }
     * });</pre>
     */
    var WjGroupPanel: any;
    function registerGridGrouppanel(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.search.FlexGridSearch} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.search.FlexGridSearch} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexGridSearch: any;
    function registerGridSearch(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Represents a cell template types enumeration.
     */
    export import CellTemplateType = GridCellTemplateType;
    /**
     * Vue component for the {@link wijmo.grid.FlexGrid} control.
     *
     * The <b>wj-flex-grid</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.grid.detail.WjFlexGridDetail}
     * , {@link wijmo.vue2.grid.filter.WjFlexGridFilter}
     * , {@link wijmo.vue2.grid.WjFlexGridColumn}
     * , {@link wijmo.vue2.grid.WjFlexGridColumnGroup}
     * and {@link wijmo.vue2.grid.WjFlexGridCellTemplate}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.FlexGrid} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.grid.FlexGrid} control using Vue markup:
     *
     * <pre>&lt;wj-flex-grid
     *   :items-source="data"&gt;
     *   &lt;wj-flex-grid-column binding="name" header="Name"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="sales" header="Sales" format="c0"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="expenses" header="Expenses" format="c0"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="active" header="Active"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     *   &lt;wj-flex-grid-column binding="date" header="Date"&gt;
     *   &lt;/wj-flex-grid-column&gt;
     * &lt;/wj-flex-grid&gt;</pre>
     *
     * The code sets the <b>itemsSource</b> property to a collection that contains the grid
     * data, then specifies the columns to display using <b>wj-flex-grid-column</b>
     * components.
     */
    var WjFlexGrid: any;
    /**
     * Vue component for the {@link wijmo.grid.Column} class.
     *
     * The <b>wj-flex-grid-column</b> component should be contained in
     * a {@link wijmo.vue2.grid.WjFlexGrid} component.
     *
     * The <b>wj-flex-grid-column</b> component may contain
     * a {@link wijmo.vue2.grid.WjFlexGridCellTemplate} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.Column} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexGridColumn: any;
    /**
     * Vue component for the {@link wijmo.grid.ColumnGroup} class.
     *
     * The <b>wj-flex-grid-column-group</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.grid.WjFlexGrid}
     *  or {@link wijmo.vue2.grid.WjFlexGridColumnGroup}.
     *
     * The <b>wj-flex-grid-column-group</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.grid.WjFlexGridColumnGroup}
     * and {@link wijmo.vue2.grid.WjFlexGridCellTemplate}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.ColumnGroup} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexGridColumnGroup: any;
    interface ICellTemplateInfoVue extends ICellTemplateInfo {
        _instantiateTemplate(parent: HTMLElement, dataContext: any): any;
    }
    interface ICellTemplateCacheVue extends ICellTemplateCache {
        cellCmp: typeof CellTemplateCmp;
    }
    interface ICellRenderingInfoVue extends ICellRenderingInfo {
        templateContext: ICellTemplateInfoVue;
        templateCache: ICellTemplateCacheVue;
    }
    class DirectiveCellFactory extends DirectiveCellFactoryBase {
        protected shouldInstantiate(cellInfo: ICellRenderingInfoVue): boolean;
        protected renderTemplate(cellInfo: ICellRenderingInfoVue, initNew: boolean): void;
        protected disposeTemplate(cell: HTMLElement, templateCache: ICellTemplateCacheVue, templateContext: ICellTemplateInfoVue): void;
        protected clearCell(cell: HTMLElement): void;
        protected applyImmediately(cellInfo: ICellRenderingInfoVue): void;
        protected flushPendingEvents(control: wijmo.Control): void;
        protected getEditorFocusFlag(): boolean;
        protected setEditorFocusFlag(value: boolean): void;
    }
    const WjFlexGridCellTemplateDefinition: {
        props: {
            cellOverflow: {
                default: any;
            };
            cellType: {
                default: any;
            };
            autoSizeRows: {
                default: boolean;
            };
            forceFullEdit: {
                default: boolean;
            };
        };
        render: (createElement: any) => any;
        mounted: () => void;
        methods: {
            _attachToControl: () => void;
            _detachFromControl: () => void;
            _instantiateTemplate: (parent: HTMLElement, dataContext: any) => any;
        };
    };
    /**
    * Vue component for the {@link FlexGrid} cell templates.
    *
    * The <b>wj-flex-grid-cell-template</b> component defines a template for a certain
    * cell type in {@link FlexGrid}. The template element must contain a <b>cellType</b> attribute that
    * specifies the {@link wijmo.vue2.grid.CellTemplateType}. Depending on the template's cell type,
    * the <b>wj-flex-grid-cell-template</b> element must be a child
    * of either {@link wijmo.vue2.grid.WjFlexGrid}
    * or {@link wijmo.vue2.grid.WjFlexGridColumn} components.
    *
    * Column-specific cell templates must be contained in <b>wj-flex-grid-column</b>
    * components, and cells that are not column-specific (like row header or top left cells)
    * must be contained in the <b>wj-flex-grid</b> component.
    *
    * The <b>wj-flex-grid-cell-template</b> element
    * may contain an arbitrary HTML fragment with Vue interpolation expressions and
    * other components and directives.
    *
    * Bindings in HTML fragment can use scoped slot properties that store cell specific data.
    * The properties are <b>col</b>, <b>row</b>, and <b>item</b>, which refer to the {@link Column},
    * {@link Row}, and <b>Row.dataItem</b> objects pertaining to the cell.
    *
    * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
    * property containing an unformatted cell value is provided.
    *
    * To reference slot properties, you can use either a new v-slot directive right on the
    * <b>wj-flex-grid-cell-template</b> element (it's available in Vue 2.6.0 or higher),
    * or an old slot-scope directive on the <b>&lt;template&gt;</b> element nested in
    * wj-flex-grid-cell-template.
    *
    * For example, here is a
    * {@link FlexGrid} control with templates for row header cells and, regular
    * and column header cells of the Country column:
    *
    * ```html
    * <!-- component.html -->
    * <wj-flex-grid :itemsSource="data">
    *   <wj-flex-grid-cell-template cellType="RowHeader" v-slot="cell">
    *     {{cell.row.index}}
    *   </wj-flex-grid-cell-template>
    *   <wj-flex-grid-cell-template cellType="RowHeaderEdit">
    *     ...
    *   </wj-flex-grid-cell-template>
    *
    *   <wj-flex-grid-column header="Country" binding="country">
    *     <wj-flex-grid-cell-template cellType="ColumnHeader" v-slot="cell">
    *       <img src="resources/globe.png" />
    *         {{cell.col.header}}
    *     </wj-flex-grid-cell-template>
    *     <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
    *       <img :src="'resources/' + cell.item.country + '.png'" />
    *       {{cell.item.country}}
    *     </wj-flex-grid-cell-template>
    *   </wj-flex-grid-column>
    *   <wj-flex-grid-column header="Sales" binding="sales"></wj-flex-grid-column>
    * </wj-flex-grid>
    * ```
    *
    * The <b>wj-flex-grid-cell-template</b> directive supports the following attributes:
    *
    * <dl class="dl-horizontal">
    *   <dt>cellType</dt>
    *   <dd>
    *     The <b>CellTemplateType</b> value defining the type of cell to which the template is applied.
    *   </dd>
    *   <dt>autoSizeRows</dt>
    *   <dd>
    *     Indicates whether the cell template will increase grid's default row height
    *     to accomodate cells content. Defaults to true.
    *   </dd>
    *   <dt>cellOverflow</dt>
    *   <dd>
    *     Defines the <b>style.overflow</b> property value for cells.
    *   </dd>
    *   <dt>forceFullEdit</dt>
    *   <dd>
    *     For cell edit templates, indicates whether cell editing forcibly starts in full edit mode,
    *     regardless of how the editing was initiated. In full edit mode pressing cursor keys don't finish editing.
    *     Defaults to true.
    *   </dd>
    * </dl>
    *
    * The <b>cellType</b> attribute takes any of the following enumerated values:
    *
    * <b>Cell</b>
    *
    * Defines a regular (data) cell template. Must be a child of the {@link wijmo.vue2.grid.WjFlexGridColumn} component.
    * For example, this cell template shows flags in the cells of Country column:
    *
    * ```html
    * <wj-flex-grid-column header="Country" binding="country">
    *   <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
    *     <img :src="'resources/' + cell.item.country + '.png'" />
    *     {{cell.item.country}}
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    *
    * If <b>Group</b> template is not provided for a hierarchical {@link FlexGrid} (that is, one with the <b>childItemsPath</b> property
    * specified), non-header cells in group rows of
    * this {@link Column} also use this template.
    *
    * <b>CellEdit</b>
    *
    * Defines a template for a cell in edit mode. Must be a child of the {@link wijmo.vue2.grid.WjFlexGridColumn} component.
    * This cell type has an additional <b>value</b> scoped slot property available for binding. It contains the
    * original cell value before editing, and the updated value after editing.
    *
    * For example, here is a template that uses the Wijmo {@link InputNumber} control as an editor
    * for the "Sales" column:
    * ```html
    * <wj-flex-grid-column header="Sales" binding="sales">
    *   <wj-flex-grid-cell-template cellType="CellEdit">
    *     <wj-input-number v-model="cell.value" :step="1"></wj-input-number>
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    *
    * Note that two-way binding can also be specified using the binding's <b>sync</b> modifier:
    * ```html
    * <wj-flex-grid-column header="Sales" binding="sales">
    *   <wj-flex-grid-cell-template cellType="CellEdit">
    *     <wj-input-number value.sync="cell.value" :step="1"></wj-input-number>
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    *
    * <b>ColumnHeader</b>
    *
    * Defines a template for a column header cell. Must be a child of the {@link wijmo.vue2.grid.WjFlexGridColumn} component.
    * For example, this template adds an image to the header of the "Country" column:
    *
    * ```html
    * <wj-flex-grid-column header="Country" binding="country">
    *   <wj-flex-grid-cell-template cellType="ColumnHeader" v-slot="cell">
    *     <img src="resources/globe.png" />
    *     {{cell.col.header}}
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    *
    * <b>RowHeader</b>
    *
    * Defines a template for a row header cell. Must be a child of the {@link wijmo.vue2.grid.WjFlexGrid} component.
    * For example, this template shows row indices in the row headers:
    *
    * ```html
    * <wj-flex-grid :itemsSource="data">
    *   <wj-flex-grid-cell-template cellType="RowHeader" v-slot="cell">
    *     {{cell.row.index + 1}}
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid>
    * ```
    *
    * Note that this template is applied to a row header cell, even if it is in a row that is
    * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
    * content, define the <b>RowHeaderEdit</b> template.
    *
    * <b>RowHeaderEdit</b>
    *
    * Defines a template for a row header cell in edit mode. Must be a child of the
    * {@link wijmo.vue2.grid.WjFlexGrid} component. For example, this template shows dots in the header
    * of rows being edited:
    *
    * ```html
    * <wj-flex-grid :itemsSource="data">
    *   <wj-flex-grid-cell-template cellType="RowHeaderEdit">
    *     ...
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid>
    * ```
    *
    * Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
    * applies:
    *
    * ```html
    * <wj-flex-grid :itemsSource="data">
    *   <wj-flex-grid-cell-template cellType="RowHeaderEdit">
    *     &#x270e;&#xfe0e;
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid>
    * ```
    *
    * <b>TopLeft</b>
    *
    * Defines a template for the top left cell. Must be a child of the {@link wijmo.vue2.grid.WjFlexGrid} component.
    * For example, this template shows a down/right glyph in the top-left cell of the grid:
    *
    * ```html
    * <wj-flex-grid :itemsSource="data">
    *   <wj-flex-grid-cell-template cellType="TopLeft">
    *     <span class="wj-glyph-down-right"></span>
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid>
    * ```
    *
    * <b>GroupHeader</b>
    *
    * Defines a template for a group header cell in a {@link GroupRow}. Must be a child of the {@link wijmo.vue2.grid.WjFlexGridColumn} component.
    *
    * The <b>row</b> scoped slot property contains an instance of the <b>GroupRow</b> class. If the grouping comes
    * from {@link CollectionView}, the <b>item</b> scoped slot property references the {@link CollectionViewGroup} object.
    *
    * For example, this template uses a checkbox element as an expand/collapse toggle:
    *
    * ```html
    * <wj-flex-grid-column header="Country" binding="country">
    *   <wj-flex-grid-cell-template cellType="GroupHeader" v-slot="cell">
    *     <input type="checkbox" v-model="cell.row.isCollapsed"/>
    *     {{cell.item.name}} ({{cell.item.items.length}} items)
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    *
    * <b>Group</b>
    *
    * Defines a template for a regular cell (not a group header) in a {@link GroupRow}. Must be a child of the
    * {@link wijmo.vue2.grid.WjFlexGridColumn} component. This cell type has an additional <b>value</b> scoped
    * slot property available for
    * binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
    * aggregate value.
    *
    * For example, this template shows aggregate's value and kind for group row cells in the "Sales"
    * column:
    *
    * ```html
    * <wj-flex-grid-column header="Sales" binding="sales" aggregate="Avg">
    *   <wj-flex-grid-cell-template cellType="Group" v-slot="cell">
    *     Average: {{formatNumber(cell.value, 'N0')}}
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    *
    * <b>ColumnFooter</b>
    *
    * Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
    * {@link wijmo.vue2.grid.WjFlexGridColumn} component. This cell type has an additional <b>value</b>
    * scoped slot property available for binding that contains a cell value.
    *
    * For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
    * column:
    *
    * ```html
    * <wj-flex-grid-column header="Sales" binding="sales" aggregate="Avg">
    *   <wj-flex-grid-cell-template cellType="ColumnFooter" v-slot="cell">
    *     Average: {{formatNumber(cell.value, 'N0')}}
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    *
    * <b>BottomLeft</b>
    *
    * Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
    * Must be a child of the {@link wijmo.vue2.grid.WjFlexGrid} component.
    * For example, this template shows a sigma glyph in the bottom-left cell of the grid:
    *
    * ```html
    * <wj-flex-grid :itemsSource="data">
    *   <wj-flex-grid-cell-template cellType="BottomLeft">
    *     &#931;
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid>
    * ```
    *
    * <b>NewCellTemplate</b>
    *
    * Defines a cell in a new row template. Must be a child of the {@link wijmo.vue2.grid.WjFlexGridColumn} component.
    * Note that the <b>cell.item</b> property is undefined for this type of a cell.
    * For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
    *
    * ```html
    * <wj-flex-grid-column header="'Date'" binding="'date'">
    *   <wj-flex-grid-cell-template cellType="NewCellTemplate">
    *     Enter a date here
    *   </wj-flex-grid-cell-template>
    * </wj-flex-grid-column>
    * ```
    */
    var WjFlexGridCellTemplate: any;
    var CellTemplateCmp: any;
    function registerGrid(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.multirow.MultiRow} control.
     *
     * The <b>wj-multi-row</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.grid.multirow.WjMultiRowCellGroup}
     * and {@link wijmo.vue2.grid.multirow.WjMultiRowCellTemplate}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.multirow.MultiRow} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMultiRow: any;
    /**
     * Vue component for the {@link wijmo.grid.multirow.MultiRowCell} class.
     *
     * The <b>wj-multi-row-cell</b> component should be contained in
     * a {@link wijmo.vue2.grid.multirow.WjMultiRowCellGroup} component.
     *
     * The <b>wj-multi-row-cell</b> component may contain
     * a {@link wijmo.vue2.grid.multirow.WjMultiRowCellTemplate} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.multirow.MultiRowCell} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMultiRowCell: any;
    /**
     * Vue component for the {@link wijmo.grid.multirow.MultiRowCellGroup} class.
     *
     * The <b>wj-multi-row-cell-group</b> component should be contained in
     * a {@link wijmo.vue2.grid.multirow.WjMultiRow} component.
     *
     * The <b>wj-multi-row-cell-group</b> component may contain
     * a {@link wijmo.vue2.grid.multirow.WjMultiRowCell} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.multirow.MultiRowCellGroup} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMultiRowCellGroup: any;
    /**
    * Vue component for the {@link MultiRow} cell templates.
    *
    * The <b>wj-multi-row-cell-template</b> component defines a template for a certain
    * cell type in {@link MultiRow}. The template element must contain a <b>cellType</b> attribute that
    * specifies the {@link wijmo.vue2.grid.CellTemplateType}. Depending on the template's cell type,
    * the <b>wj-multi-row-cell-template</b> element must be a child
    * of either {@link wijmo.vue2.grid.multirow.WjMultiRow}
    * or {@link wijmo.vue2.grid.multirow.WjMultiRowCell} components.
    *
    * Column-specific cell templates must be contained in <b>wj-multi-row-cell</b>
    * components, and cells that are not column-specific (like row header or top left cells)
    * must be contained in the <b>wj-multi-row</b> component.
    *
    * The <b>wj-multi-row-cell-template</b> element
    * may contain an arbitrary HTML fragment with Vue interpolation expressions and
    * other components and directives.
    *
    * Bindings in HTML fragment can use scoped slot properties that store cell specific data.
    * The properties are <b>col</b>, <b>row</b>, and <b>item</b>, which refer to the {@link MultiRowCell},
    * {@link Row}, and <b>Row.dataItem</b> objects pertaining to the cell.
    *
    * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
    * property containing an unformatted cell value is provided.
    *
    * To reference slot properties, you can use either a new v-slot directive right on the
    * <b>wj-multi-row-cell-template</b> element (it's available in Vue 2.6.0 or higher),
    * or an old slot-scope directive on the <b>&lt;template&gt;</b> element nested in
    * wj-multi-row-cell-template.
    *
    * For example, here is a
    * {@link MultiRow} control with templates for row header cells and, regular
    * and column header cells of the Country column:
    *
    * ```html
    * <!-- component.html -->
    * <wj-multi-row :itemsSource="data">
    *   <wj-multi-row-cell-template cellType="RowHeader" v-slot="cell">
    *     {{cell.row.index}}
    *   </wj-multi-row-cell-template>
    *   <wj-multi-row-cell-template cellType="RowHeaderEdit">
    *     ...
    *   </wj-multi-row-cell-template>
    *
    *   <wj-multi-row-cell-group header="Statistics">
    *     <wj-multi-row-cell header="Country" binding="country">
    *       <wj-multi-row-cell-template cellType="ColumnHeader" v-slot="cell">
    *         <img src="resources/globe.png" />
    *           {{cell.col.header}}
    *       </wj-multi-row-cell-template>
    *       <wj-multi-row-cell-template cellType="Cell" v-slot="cell">
    *         <img :src="'resources/' + cell.item.country + '.png'" />
    *         {{cell.item.country}}
    *       </wj-multi-row-cell-template>
    *     </wj-multi-row-cell>
    *     <wj-multi-row-cell header="Sales" binding="sales"></wj-multi-row-cell>
    *   </wj-multi-row-cell-group>
    * </wj-multi-row>
    * ```
    *
    * The <b>wj-multi-row-cell-template</b> directive supports the following attributes:
    *
    * <dl class="dl-horizontal">
    *   <dt>cellType</dt>
    *   <dd>
    *     The <b>CellTemplateType</b> value defining the type of cell to which the template is applied.
    *   </dd>
    *   <dt>autoSizeRows</dt>
    *   <dd>
    *     Indicates whether the cell template will increase grid's default row height
    *     to accomodate cells content. Defaults to true.
    *   </dd>
    *   <dt>cellOverflow</dt>
    *   <dd>
    *     Defines the <b>style.overflow</b> property value for cells.
    *   </dd>
    *   <dt>forceFullEdit</dt>
    *   <dd>
    *     For cell edit templates, indicates whether cell editing forcibly starts in full edit mode,
    *     regardless of how the editing was initiated. In full edit mode pressing cursor keys don't finish editing.
    *     Defaults to true.
    *   </dd>
    * </dl>
    *
    * The <b>cellType</b> attribute takes any of the following enumerated values:
    *
    * <b>Cell</b>
    *
    * Defines a regular (data) cell template. Must be a child of the {@link wijmo.vue2.grid.multirow.WjMultiRowCell} component.
    * For example, this cell template shows flags in the cells of Country column:
    *
    * ```html
    * <wj-multi-row-cell header="Country" binding="country">
    *   <wj-multi-row-cell-template cellType="Cell" v-slot="cell">
    *     <img :src="'resources/' + cell.item.country + '.png'" />
    *     {{cell.item.country}}
    *   </wj-multi-row-cell-template>
    * </wj-multi-row-cell>
    * ```
    *
    * <b>CellEdit</b>
    *
    * Defines a template for a cell in edit mode. Must be a child of the {@link wijmo.vue2.grid.multirow.WjMultiRowCell} component.
    * This cell type has an additional <b>value</b> scoped slot property available for binding. It contains the
    * original cell value before editing, and the updated value after editing.
    *
    * For example, here is a template that uses the Wijmo {@link InputNumber} control as an editor
    * for the "Sales" column:
    * ```html
    * <wj-multi-row-cell header="Sales" binding="sales">
    *   <wj-multi-row-cell-template cellType="CellEdit">
    *     <wj-input-number v-model="cell.value" :step="1"></wj-input-number>
    *   </wj-multi-row-cell-template>
    * </wj-multi-row-cell>
    * ```
    *
    * Note that two-way binding can also be specified using the binding's <b>sync</b> modifier:
    * ```html
    * <wj-multi-row-cell header="Sales" binding="sales">
    *   <wj-multi-row-cell-template cellType="CellEdit">
    *     <wj-input-number value.sync="cell.value" :step="1"></wj-input-number>
    *   </wj-multi-row-cell-template>
    * </wj-multi-row-cell>
    * ```
    *
    * <b>ColumnHeader</b>
    *
    * Defines a template for a column header cell. Must be a child of the {@link wijmo.vue2.grid.multirow.WjMultiRowCell} component.
    * For example, this template adds an image to the header of the "Country" column:
    *
    * ```html
    * <wj-multi-row-cell header="Country" binding="country">
    *   <wj-multi-row-cell-template cellType="ColumnHeader" v-slot="cell">
    *     <img src="resources/globe.png" />
    *     {{cell.col.header}}
    *   </wj-multi-row-cell-template>
    * </wj-multi-row-cell>
    * ```
    *
    * <b>RowHeader</b>
    *
    * Defines a template for a row header cell. Must be a child of the {@link wijmo.vue2.grid.multirow.WjMultiRow} component.
    * For example, this template shows row indices in the row headers:
    *
    * ```html
    * <wj-multi-row :itemsSource="data">
    *   <wj-multi-row-cell-template cellType="RowHeader" v-slot="cell">
    *     {{cell.row.index / cell.row.grid.rowsPerItem + 1}}
    *   </wj-multi-row-cell-template>
    * </wj-multi-row>
    * ```
    *
    * Note that this template is applied to a row header cell, even if it is in a row that is
    * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
    * content, define the <b>RowHeaderEdit</b> template.
    *
    * <b>RowHeaderEdit</b>
    *
    * Defines a template for a row header cell in edit mode. Must be a child of the
    * {@link wijmo.vue2.grid.multirow.WjMultiRow} component. For example, this template shows dots in the header
    * of rows being edited:
    *
    * ```html
    * <wj-multi-row :itemsSource="data">
    *   <wj-multi-row-cell-template cellType="RowHeaderEdit">
    *     ...
    *   </wj-multi-row-cell-template>
    * </wj-multi-row>
    * ```
    *
    * Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where the <b>RowHeader</b> template
    * applies:
    *
    * ```html
    * <wj-multi-row :itemsSource="data">
    *   <wj-multi-row-cell-template cellType="RowHeaderEdit">
    *     &#x270e;&#xfe0e;
    *   </wj-multi-row-cell-template>
    * </wj-multi-row>
    * ```
    *
    * <b>TopLeft</b>
    *
    * Defines a template for the top left cell. Must be a child of the {@link wijmo.vue2.grid.multirow.WjMultiRow} component.
    * For example, this template shows a down/right glyph in the top-left cell of the grid:
    *
    * ```html
    * <wj-multi-row :itemsSource="data">
    *   <wj-multi-row-cell-template cellType="TopLeft">
    *     <span class="wj-glyph-down-right"></span>
    *   </wj-multi-row-cell-template>
    * </wj-multi-row>
    * ```
    *
    * <b>GroupHeader</b>
    *
    * Defines a template for a group header cell in a {@link GroupRow}. Must be a child of the {@link wijmo.vue2.grid.multirow.WjMultiRowCell} component.
    *
    * The <b>row</b> scoped slot property contains an instance of the <b>GroupRow</b> class. If the grouping comes
    * from {@link CollectionView}, the <b>item</b> scoped slot property references the {@link CollectionViewGroup} object.
    *
    * For example, this template uses a checkbox element as an expand/collapse toggle:
    *
    * ```html
    * <wj-multi-row-cell header="Country" binding="country">
    *   <wj-multi-row-cell-template cellType="GroupHeader" v-slot="cell">
    *     <input type="checkbox" v-model="cell.row.isCollapsed"/>
    *     {{cell.item.name}} ({{cell.item.items.length}} items)
    *   </wj-multi-row-cell-template>
    * </wj-multi-row-cell>
    * ```
    *
    * <b>Group</b>
    *
    * Defines a template for a regular cell (not a group header) in a {@link GroupRow}. Must be a child of the
    * {@link wijmo.vue2.grid.multirow.WjMultiRowCell} component. This cell type has an additional <b>value</b> scoped
    * slot property available for
    * binding. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
    * aggregate value.
    *
    * For example, this template shows aggregate's value and kind for group row cells in the "Sales"
    * column:
    *
    * ```html
    * <wj-multi-row-cell header="Sales" binding="sales" aggregate="Avg">
    *   <wj-multi-row-cell-template cellType="Group" v-slot="cell">
    *     Average: {{formatNumber(cell.value, 'N0')}}
    *   </wj-multi-row-cell-template>
    * </wj-multi-row-cell>
    * ```
    *
    * <b>NewCellTemplate</b>
    *
    * Defines a cell in a new row template. Must be a child of the {@link wijmo.vue2.grid.multirow.WjMultiRowCell} component.
    * Note that the <b>cell.item</b> property is undefined for this type of a cell.
    * For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
    *
    * ```html
    * <wj-multi-row-cell header="'Date'" binding="'date'">
    *   <wj-multi-row-cell-template cellType="NewCellTemplate">
    *     Enter a date here
    *   </wj-multi-row-cell-template>
    * </wj-multi-row-cell>
    * ```
    */
    var WjMultiRowCellTemplate: any;
    function registerGridMultirow(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.sheet.FlexSheet} control.
     *
     * The <b>wj-flex-sheet</b> component may contain
     * a {@link wijmo.vue2.grid.sheet.WjSheet} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.sheet.FlexSheet} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexSheet: any;
    /**
     * Vue component for the {@link wijmo.grid.sheet.Sheet} class.
     *
     * The <b>wj-sheet</b> component should be contained in
     * a {@link wijmo.vue2.grid.sheet.WjFlexSheet} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.sheet.Sheet} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjSheet: any;
    function registerGridSheet(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.transposed.TransposedGrid} control.
     *
     * The <b>wj-transposed-grid</b> component may contain
     * a {@link wijmo.vue2.grid.transposed.WjTransposedGridRow} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.transposed.TransposedGrid} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjTransposedGrid: any;
    /**
     * Vue component for the {@link wijmo.grid.transposed.TransposedGridRow} class.
     *
     * The <b>wj-transposed-grid-row</b> component should be contained in
     * a {@link wijmo.vue2.grid.transposed.WjTransposedGrid} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.transposed.TransposedGridRow} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjTransposedGridRow: any;
    function registerGridTransposed(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.grid.transposedmultirow.TransposedMultiRow} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.transposedmultirow.TransposedMultiRow} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjTransposedMultiRow: any;
    function registerGridTransposedMultirow(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.input.ListBox} control.
     *
     * The <b>wj-list-box</b> component may contain
     * a {@link wijmo.vue2.input.WjItemTemplate} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.ListBox} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjListBox: any;
    /**
     * Vue component for the {@link wijmo.input.MultiSelectListBox} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.MultiSelectListBox} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMultiSelectListBox: any;
    /**
     * Vue component for the {@link wijmo.input.ComboBox} control.
     *
     * The <b>wj-combo-box</b> component may contain
     * a {@link wijmo.vue2.input.WjItemTemplate} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.ComboBox} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjComboBox: any;
    /**
     * Vue component for the {@link wijmo.input.AutoComplete} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.AutoComplete} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjAutoComplete: any;
    /**
     * Vue component for the {@link wijmo.input.Calendar} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.Calendar} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjCalendar: any;
    /**
     * Vue component for the {@link wijmo.input.ColorPicker} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.ColorPicker} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjColorPicker: any;
    /**
     * Vue component for the {@link wijmo.input.InputMask} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputMask} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjInputMask: any;
    /**
     * Vue component for the {@link wijmo.input.InputColor} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputColor} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjInputColor: any;
    /**
     * Vue component for the {@link wijmo.input.MultiSelect} control.
     *
     * The <b>wj-multi-select</b> component may contain
     * a {@link wijmo.vue2.input.WjItemTemplate} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.MultiSelect} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMultiSelect: any;
    /**
     * Vue component for the {@link wijmo.input.MultiAutoComplete} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.MultiAutoComplete} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMultiAutoComplete: any;
    /**
     * Vue component for the {@link wijmo.input.InputNumber} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputNumber} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjInputNumber: any;
    /**
     * Vue component for the {@link wijmo.input.InputDate} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputDate} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjInputDate: any;
    /**
     * Vue component for the {@link wijmo.input.InputTime} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputTime} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjInputTime: any;
    /**
     * Vue component for the {@link wijmo.input.InputDateTime} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputDateTime} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjInputDateTime: any;
    /**
     * Vue component for the {@link wijmo.input.InputDateRange} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputDateRange} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjInputDateRange: any;
    /**
     * Vue component for the {@link wijmo.input.Menu} control.
     *
     * The <b>wj-menu</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.input.WjMenuItem}
     * , {@link wijmo.vue2.input.WjMenuSeparator}
     * and {@link wijmo.vue2.input.WjItemTemplate}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.Menu} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMenu: any;
    /**
     * Vue component for {@link wijmo.vue2.input.WjMenu} items.
     *
     * The <b>wj-menu-item</b> component should be contained in
     * a {@link wijmo.vue2.input.WjMenu} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link } class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMenuItem: any;
    /**
     * Vue component for {@link wijmo.vue2.input.WjMenu} item separators.
     *
     * The <b>wj-menu-separator</b> component should be contained in
     * a {@link wijmo.vue2.input.WjMenu} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link } class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjMenuSeparator: any;
    /**
     * Vue component to define item templates for item
     * controls like {@link ListBox}, {@link ComboBox}, {@link MultiSelect}
     * and  {@link Menu}.
     */
    var WjItemTemplate: any;
    /**
     * Vue component for the {@link wijmo.input.Popup} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.Popup} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjPopup: any;
    /**
     * Vue directive to define context menus for elements.
     * TBD: description goes here...
     **/
    var WjContextMenu: any;
    /**
     * Vue component for the {@link wijmo.input.CollectionViewNavigator} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.CollectionViewNavigator} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjCollectionViewNavigator: any;
    function registerInput(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.olap.PivotGrid} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.PivotGrid} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjPivotGrid: any;
    /**
     * Vue component for the {@link wijmo.olap.PivotChart} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.PivotChart} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjPivotChart: any;
    /**
     * Vue component for the {@link wijmo.olap.PivotPanel} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.PivotPanel} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjPivotPanel: any;
    /**
     * Vue component for the {@link wijmo.olap.Slicer} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.Slicer} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjSlicer: any;
    function registerOlap(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.viewer.ReportViewer} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.viewer.ReportViewer} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjReportViewer: any;
    /**
     * Vue component for the {@link wijmo.viewer.PdfViewer} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.viewer.PdfViewer} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjPdfViewer: any;
    function registerViewer(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.nav.TreeView} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.TreeView} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjTreeView: any;
    /**
     * Vue component for the {@link wijmo.nav.TabPanel} control.
     *
     * The <b>wj-tab-panel</b> component may contain
     * a {@link wijmo.vue2.nav.WjTab} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.TabPanel} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjTabPanel: any;
    /**
     * Vue component for the {@link wijmo.nav.Tab} class.
     *
     * The <b>wj-tab</b> component should be contained in
     * a {@link wijmo.vue2.nav.WjTabPanel} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.Tab} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjTab: any;
    /**
     * Vue component for the {@link wijmo.nav.Accordion} control.
     *
     * The <b>wj-accordion</b> component may contain
     * a {@link wijmo.vue2.nav.WjAccordionPane} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.Accordion} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjAccordion: any;
    /**
     * Vue component for the {@link wijmo.nav.AccordionPane} class.
     *
     * The <b>wj-accordion-pane</b> component should be contained in
     * a {@link wijmo.vue2.nav.WjAccordion} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.AccordionPane} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjAccordionPane: any;
    function registerNav(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.barcode.common.Codabar} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Codabar} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeCodabar: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.Ean8} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Ean8} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeEan8: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.Ean13} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Ean13} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeEan13: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.Code39} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Code39} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeCode39: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.Code128} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Code128} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeCode128: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.Gs1_128} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Gs1_128} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1_128: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.UpcA} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.UpcA} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeUpcA: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.UpcE0} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.UpcE0} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeUpcE0: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.UpcE1} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.UpcE1} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeUpcE1: any;
    /**
     * Vue component for the {@link wijmo.barcode.common.QrCode} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.QrCode} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeQrCode: any;
    function registerBarcodeCommon(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.barcode.composite.Gs1DataBarOmnidirectional} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarOmnidirectional} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1DataBarOmnidirectional: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.Gs1DataBarTruncated} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarTruncated} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1DataBarTruncated: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.Gs1DataBarStacked} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarStacked} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1DataBarStacked: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.Gs1DataBarStackedOmnidirectional} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarStackedOmnidirectional} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1DataBarStackedOmnidirectional: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.Gs1DataBarLimited} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarLimited} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1DataBarLimited: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.Gs1DataBarExpanded} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarExpanded} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1DataBarExpanded: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.Gs1DataBarExpandedStacked} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarExpandedStacked} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeGs1DataBarExpandedStacked: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.Pdf417} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Pdf417} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodePdf417: any;
    /**
     * Vue component for the {@link wijmo.barcode.composite.MicroPdf417} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.MicroPdf417} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeMicroPdf417: any;
    function registerBarcodeComposite(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.barcode.specialized.DataMatrixEcc000} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.DataMatrixEcc000} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeDataMatrixEcc000: any;
    /**
     * Vue component for the {@link wijmo.barcode.specialized.DataMatrixEcc200} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.DataMatrixEcc200} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeDataMatrixEcc200: any;
    /**
     * Vue component for the {@link wijmo.barcode.specialized.Code49} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Code49} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeCode49: any;
    /**
     * Vue component for the {@link wijmo.barcode.specialized.Code93} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Code93} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeCode93: any;
    /**
     * Vue component for the {@link wijmo.barcode.specialized.Itf14} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Itf14} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeItf14: any;
    /**
     * Vue component for the {@link wijmo.barcode.specialized.Interleaved2of5} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Interleaved2of5} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeInterleaved2of5: any;
    /**
     * Vue component for the {@link wijmo.barcode.specialized.JapanesePostal} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.JapanesePostal} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjBarcodeJapanesePostal: any;
    function registerBarcodeSpecialized(app: any): void;
}
declare module wijmo.vue2 {
}
declare module wijmo.vue2 {
    /**
     * Vue component for the {@link wijmo.chart.map.FlexMap} control.
     *
     * The <b>wj-flex-map</b> component may contain
     * the following child components:
     * {@link wijmo.vue2.chart.WjFlexChartLegend}
     * , {@link wijmo.vue2.chart.map.WjScatterMapLayer}
     * , {@link wijmo.vue2.chart.map.WjGeoMapLayer}
     * and {@link wijmo.vue2.chart.map.WjGeoGridLayer}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.FlexMap} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjFlexMap: any;
    /**
     * Vue component for the {@link wijmo.chart.map.ScatterMapLayer} class.
     *
     * The <b>wj-scatter-map-layer</b> component should be contained in
     * a {@link wijmo.vue2.chart.map.WjFlexMap} component.
     *
     * The <b>wj-scatter-map-layer</b> component may contain
     * a {@link wijmo.vue2.chart.map.WjColorScale} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.ScatterMapLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjScatterMapLayer: any;
    /**
     * Vue component for the {@link wijmo.chart.map.GeoMapLayer} class.
     *
     * The <b>wj-geo-map-layer</b> component should be contained in
     * a {@link wijmo.vue2.chart.map.WjFlexMap} component.
     *
     * The <b>wj-geo-map-layer</b> component may contain
     * a {@link wijmo.vue2.chart.map.WjColorScale} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.GeoMapLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjGeoMapLayer: any;
    /**
     * Vue component for the {@link wijmo.chart.map.GeoGridLayer} class.
     *
     * The <b>wj-geo-grid-layer</b> component should be contained in
     * a {@link wijmo.vue2.chart.map.WjFlexMap} component.
     *
     * The <b>wj-geo-grid-layer</b> component may contain
     * a {@link wijmo.vue2.chart.map.WjColorScale} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.GeoGridLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjGeoGridLayer: any;
    /**
     * Vue component for the {@link wijmo.chart.map.ColorScale} class.
     *
     * The <b>wj-color-scale</b> component should be contained in
     * one of the following components:
     * {@link wijmo.vue2.chart.map.WjScatterMapLayer}
     * , {@link wijmo.vue2.chart.map.WjGeoMapLayer}
     *  or {@link wijmo.vue2.chart.map.WjGeoGridLayer}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.ColorScale} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in markup.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    var WjColorScale: any;
    function registerChartMap(app: any): void;
}
declare module wijmo.vue2 {
}
