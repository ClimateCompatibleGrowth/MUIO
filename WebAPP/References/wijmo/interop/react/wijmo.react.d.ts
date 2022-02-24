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

declare module wijmo.react {
    function softInput(): typeof wijmo.input;
    function softGridDetail(): typeof wijmo.grid.detail;
}
declare module wijmo.react {
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
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * Base class for all Wijmo components for React.
     */
    class ComponentBase extends React.Component<any, any> {
        static readonly _propsParent: string;
        static readonly _typeSiblingIdProp: string;
        static _siblingDirId: number;
        static _reactMajorVersion: number;
        private _objPropHash;
        private _isMounted;
        private _mountedCBs;
        private _siblingInsertedEH;
        controlType: any;
        props: any;
        control: any;
        parent: ComponentBase;
        protected _parentProp: string;
        protected _parentInCtor: boolean;
        protected _siblingId: string;
        protected _hostRef: (ref: any) => any;
        protected _hostRefValue: HTMLElement;
        private _appliedClassName;
        constructor(props: any, controlType: any, meta?: any);
        render(): any;
        componentDidMount(): any;
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: any): boolean;
        componentDidUpdate(prevProps: any): void;
        _mountedCB(cb: () => void): void;
        protected _renderImpl(): any;
        readonly _beforeRender: Event<any, EventArgs>;
        protected _onBeforeRender(e?: wijmo.EventArgs): void;
        readonly _afterRender: Event<any, EventArgs>;
        protected _onAfterRender(e?: wijmo.EventArgs): void;
        readonly _beforeWillUnmount: Event<any, EventArgs>;
        protected _onBeforeWillUnmount(e?: wijmo.EventArgs): void;
        readonly _afterWillUnmount: Event<any, EventArgs>;
        protected _onAfterWillUnmount(e?: wijmo.EventArgs): void;
        readonly _beforeDidUpdate: Event<any, EventArgs>;
        protected _onBeforeDidUpdate(e?: wijmo.EventArgs): void;
        readonly _afterDidUpdate: Event<any, EventArgs>;
        protected _onAfterDidUpdate(e?: wijmo.EventArgs): void;
        protected _createControl(): any;
        private _prepareControl;
        protected _initParent(): void;
        private _setParent;
        private _isChild;
        private _isParentInCtor;
        private _getParentProp;
        private _getSiblingIndex;
        private _siblingInserted;
        private _copy;
        private _setHostAttribute;
        private _sameValue;
        private _isEvent;
        protected _getElement(): HTMLElement;
        private _ignoreProp;
        private static _copyAttrs;
        static isInStrictMode(component: any): boolean;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.analytics.TrendLine} class.
     *
     * The <b>flex-chart-trend-line</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.TrendLine} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartTrendLine extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            sampleCount?: any;
            order?: any;
            fitType?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.analytics.MovingAverage} class.
     *
     * The <b>flex-chart-moving-average</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.MovingAverage} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartMovingAverage extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            sampleCount?: any;
            period?: any;
            type?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.analytics.YFunctionSeries} class.
     *
     * The <b>flex-chart-y-function-series</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.YFunctionSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartYFunctionSeries extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            sampleCount?: any;
            min?: any;
            max?: any;
            func?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.analytics.ParametricFunctionSeries} class.
     *
     * The <b>flex-chart-parametric-function-series</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.ParametricFunctionSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartParametricFunctionSeries extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            sampleCount?: any;
            min?: any;
            max?: any;
            func?: any;
            xFunc?: any;
            yFunc?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.analytics.Waterfall} class.
     *
     * The <b>flex-chart-waterfall</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.Waterfall} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartWaterfall extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            relativeData?: any;
            start?: any;
            startLabel?: any;
            showTotal?: any;
            totalLabel?: any;
            showIntermediateTotal?: any;
            intermediateTotalPositions?: any;
            intermediateTotalLabels?: any;
            connectorLines?: any;
            styles?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.analytics.BoxWhisker} class.
     *
     * The <b>flex-chart-box-whisker</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.BoxWhisker} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartBoxWhisker extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            quartileCalculation?: any;
            groupWidth?: any;
            gapWidth?: any;
            showMeanLine?: any;
            meanLineStyle?: any;
            showMeanMarker?: any;
            meanMarkerStyle?: any;
            showInnerPoints?: any;
            showOutliers?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.analytics.ErrorBar} class.
     *
     * The <b>flex-chart-error-bar</b> component should be contained in
     * a {@link wijmo.react.chart.FlexChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.ErrorBar} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartErrorBar extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            chartType?: any;
            errorBarStyle?: any;
            value?: any;
            errorAmount?: any;
            endStyle?: any;
            direction?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.analytics.BreakEven} class.
     *
     * The <b>flex-chart-break-even</b> component should be contained in
     * a {@link wijmo.react.chart.FlexChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.analytics.BreakEven} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartBreakEven extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            fixedCost?: any;
            variableCost?: any;
            salesPrice?: any;
            styles?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.animation.ChartAnimation} class.
     *
     * The <b>flex-chart-animation</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     * , {@link wijmo.react.chart.FlexPie}
     * , {@link wijmo.react.chart.finance.FinancialChart}
     *  or {@link wijmo.react.chart.radar.FlexRadar}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.animation.ChartAnimation} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartAnimation extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            animationMode?: any;
            easing?: any;
            duration?: any;
            axisAnimation?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.annotation.AnnotationLayer} class.
     *
     * The <b>flex-chart-annotation-layer</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The <b>flex-chart-annotation-layer</b> component may contain
     * a {@link wijmo.react.chart.annotation.FlexChartAnnotation} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.annotation.AnnotationLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartAnnotationLayer extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
 * React component that represents objects inherited from the
 * {@link wijmo.chart.annotation.AnnotationBase} class.
     *
     * The <b>flex-chart-annotation</b> component should be contained in
     * a {@link wijmo.react.chart.annotation.FlexChartAnnotationLayer} component.
     *
     * The <b>flex-chart-annotation</b> component may contain
     * a {@link wijmo.react.chart.FlexChartDataPoint} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link } class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartAnnotation extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            type?: any;
            attachment?: any;
            position?: any;
            point?: any;
            seriesIndex?: any;
            pointIndex?: any;
            offset?: any;
            style?: any;
            isVisible?: any;
            tooltip?: any;
            text?: any;
            content?: any;
            name?: any;
            width?: any;
            height?: any;
            start?: any;
            end?: any;
            radius?: any;
            length?: any;
            href?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
        protected _createControl(): any;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.finance.analytics.Fibonacci} class.
     *
     * The <b>flex-chart-fibonacci</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Fibonacci} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartFibonacci extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            high?: any;
            low?: any;
            labelPosition?: any;
            levels?: any;
            minX?: any;
            maxX?: any;
            uptrend?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.FibonacciArcs} class.
     *
     * The <b>flex-chart-fibonacci-arcs</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.FibonacciArcs} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartFibonacciArcs extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            start?: any;
            end?: any;
            labelPosition?: any;
            levels?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.FibonacciFans} class.
     *
     * The <b>flex-chart-fibonacci-fans</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.FibonacciFans} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartFibonacciFans extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            start?: any;
            end?: any;
            labelPosition?: any;
            levels?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.FibonacciTimeZones} class.
     *
     * The <b>flex-chart-fibonacci-time-zones</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.FibonacciTimeZones} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartFibonacciTimeZones extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            startX?: any;
            endX?: any;
            labelPosition?: any;
            levels?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.ATR} class.
     *
     * The <b>flex-chart-atr</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.ATR} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartAtr extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            period?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.CCI} class.
     *
     * The <b>flex-chart-cci</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.CCI} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartCci extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            period?: any;
            constant?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.RSI} class.
     *
     * The <b>flex-chart-rsi</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.RSI} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartRsi extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            period?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.WilliamsR} class.
     *
     * The <b>flex-chart-williams-r</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.WilliamsR} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartWilliamsR extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            period?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.Macd} class.
     *
     * The <b>flex-chart-macd</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Macd} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartMacd extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            fastPeriod?: any;
            slowPeriod?: any;
            smoothingPeriod?: any;
            styles?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.MacdHistogram} class.
     *
     * The <b>flex-chart-macd-histogram</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.MacdHistogram} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartMacdHistogram extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            fastPeriod?: any;
            slowPeriod?: any;
            smoothingPeriod?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.Stochastic} class.
     *
     * The <b>flex-chart-stochastic</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Stochastic} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartStochastic extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            dPeriod?: any;
            kPeriod?: any;
            smoothingPeriod?: any;
            styles?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.BollingerBands} class.
     *
     * The <b>flex-chart-bollinger-bands</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.BollingerBands} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartBollingerBands extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            period?: any;
            multiplier?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.finance.analytics.Envelopes} class.
     *
     * The <b>flex-chart-envelopes</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.analytics.Envelopes} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartEnvelopes extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            period?: any;
            size?: any;
            type?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.finance.FinancialChart} control.
     *
     * The <b>financial-chart</b> component may contain
     * the following child components:
     * {@link wijmo.react.chart.analytics.FlexChartTrendLine}
     * , {@link wijmo.react.chart.analytics.FlexChartMovingAverage}
     * , {@link wijmo.react.chart.analytics.FlexChartYFunctionSeries}
     * , {@link wijmo.react.chart.analytics.FlexChartParametricFunctionSeries}
     * , {@link wijmo.react.chart.analytics.FlexChartWaterfall}
     * , {@link wijmo.react.chart.analytics.FlexChartBoxWhisker}
     * , {@link wijmo.react.chart.animation.FlexChartAnimation}
     * , {@link wijmo.react.chart.annotation.FlexChartAnnotationLayer}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartFibonacci}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartFibonacciArcs}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartFibonacciFans}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartFibonacciTimeZones}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartAtr}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartCci}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartRsi}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartWilliamsR}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartMacd}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartMacdHistogram}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartStochastic}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartBollingerBands}
     * , {@link wijmo.react.chart.finance.analytics.FlexChartEnvelopes}
     * , {@link wijmo.react.chart.finance.FinancialChartSeries}
     * , {@link wijmo.react.chart.interaction.FlexChartRangeSelector}
     * , {@link wijmo.react.chart.interaction.FlexChartGestures}
     * , {@link wijmo.react.chart.FlexChartAxis}
     * , {@link wijmo.react.chart.FlexChartLegend}
     * , {@link wijmo.react.chart.FlexChartLineMarker}
     * and {@link wijmo.react.chart.FlexChartPlotArea}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.FinancialChart} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FinancialChart extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            renderEngine?: any;
            isDisabled?: any;
            tabOrder?: any;
            binding?: any;
            footer?: any;
            header?: any;
            selectionMode?: any;
            palette?: any;
            plotMargin?: any;
            footerStyle?: any;
            headerStyle?: any;
            tooltipContent?: any;
            itemsSource?: any;
            bindingX?: any;
            interpolateNulls?: any;
            legendToggle?: any;
            symbolSize?: any;
            options?: any;
            selection?: any;
            itemFormatter?: any;
            labelContent?: any;
            chartType?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rendering?: any;
            rendered?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            seriesVisibilityChanged?: any;
            selectionChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        private _setExtra;
    }
    /**
     * React component for the {@link wijmo.chart.finance.FinancialSeries} class.
     *
     * The <b>financial-chart-series</b> component should be contained in
     * a {@link wijmo.react.chart.finance.FinancialChart} component.
     *
     * The <b>financial-chart-series</b> component may contain
     * a {@link wijmo.react.chart.FlexChartAxis} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.finance.FinancialSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FinancialChartSeries extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            chartType?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.hierarchical.Sunburst} control.
     *
     * The <b>sunburst</b> component may contain
     * a {@link wijmo.react.chart.FlexChartLegend} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.hierarchical.Sunburst} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Sunburst extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            binding?: any;
            footer?: any;
            header?: any;
            selectionMode?: any;
            palette?: any;
            plotMargin?: any;
            footerStyle?: any;
            headerStyle?: any;
            tooltipContent?: any;
            itemsSource?: any;
            bindingName?: any;
            innerRadius?: any;
            isAnimated?: any;
            offset?: any;
            reversed?: any;
            startAngle?: any;
            selectedIndex?: any;
            selectedItemPosition?: any;
            selectedItemOffset?: any;
            itemFormatter?: any;
            labelContent?: any;
            childItemsPath?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rendering?: any;
            rendered?: any;
            selectionChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        private _setExtra;
    }
    /**
     * React component for the {@link wijmo.chart.hierarchical.TreeMap} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.hierarchical.TreeMap} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class TreeMap extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            binding?: any;
            footer?: any;
            header?: any;
            selectionMode?: any;
            palette?: any;
            plotMargin?: any;
            footerStyle?: any;
            headerStyle?: any;
            tooltipContent?: any;
            itemsSource?: any;
            bindingName?: any;
            maxDepth?: any;
            type?: any;
            labelContent?: any;
            childItemsPath?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rendering?: any;
            rendered?: any;
            selectionChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        private _setExtra;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.interaction.RangeSelector} class.
     *
     * The <b>flex-chart-range-selector</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.interaction.RangeSelector} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartRangeSelector extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isVisible?: any;
            min?: any;
            max?: any;
            orientation?: any;
            seamless?: any;
            minScale?: any;
            maxScale?: any;
            initialized?: any;
            rangeChanged?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.interaction.ChartGestures} class.
     *
     * The <b>flex-chart-gestures</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.interaction.ChartGestures} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartGestures extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            mouseAction?: any;
            interactiveAxes?: any;
            enable?: any;
            scaleX?: any;
            scaleY?: any;
            posX?: any;
            posY?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.radar.FlexRadar} control.
     *
     * The <b>flex-radar</b> component may contain
     * the following child components:
     * {@link wijmo.react.chart.animation.FlexChartAnimation}
     * , {@link wijmo.react.chart.radar.FlexRadarAxis}
     * , {@link wijmo.react.chart.radar.FlexRadarSeries}
     * and {@link wijmo.react.chart.FlexChartLegend}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.radar.FlexRadar} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexRadar extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            renderEngine?: any;
            isDisabled?: any;
            tabOrder?: any;
            binding?: any;
            footer?: any;
            header?: any;
            selectionMode?: any;
            palette?: any;
            plotMargin?: any;
            footerStyle?: any;
            headerStyle?: any;
            tooltipContent?: any;
            itemsSource?: any;
            bindingX?: any;
            interpolateNulls?: any;
            legendToggle?: any;
            symbolSize?: any;
            options?: any;
            selection?: any;
            itemFormatter?: any;
            labelContent?: any;
            chartType?: any;
            startAngle?: any;
            totalAngle?: any;
            reversed?: any;
            stacking?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rendering?: any;
            rendered?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            seriesVisibilityChanged?: any;
            selectionChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        private _setExtra;
    }
    /**
     * React component for the {@link wijmo.chart.radar.FlexRadarAxis} class.
     *
     * The <b>flex-radar-axis</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.radar.FlexRadar}
     *  or {@link wijmo.react.chart.radar.FlexRadarSeries}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.radar.FlexRadarAxis} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexRadarAxis extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisLine?: any;
            format?: any;
            labels?: any;
            majorGrid?: any;
            majorTickMarks?: any;
            majorUnit?: any;
            max?: any;
            min?: any;
            position?: any;
            reversed?: any;
            title?: any;
            labelAngle?: any;
            minorGrid?: any;
            minorTickMarks?: any;
            minorUnit?: any;
            origin?: any;
            logBase?: any;
            plotArea?: any;
            labelAlign?: any;
            name?: any;
            overlappingLabels?: any;
            labelPadding?: any;
            itemFormatter?: any;
            itemsSource?: any;
            binding?: any;
            initialized?: any;
            rangeChanged?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.radar.FlexRadarSeries} class.
     *
     * The <b>flex-radar-series</b> component should be contained in
     * a {@link wijmo.react.chart.radar.FlexRadar} component.
     *
     * The <b>flex-radar-series</b> component may contain
     * a {@link wijmo.react.chart.radar.FlexRadarAxis} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.radar.FlexRadarSeries} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexRadarSeries extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            chartType?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.FlexChart} control.
     *
     * The <b>flex-chart</b> component may contain
     * the following child components:
     * {@link wijmo.react.chart.analytics.FlexChartTrendLine}
     * , {@link wijmo.react.chart.analytics.FlexChartMovingAverage}
     * , {@link wijmo.react.chart.analytics.FlexChartYFunctionSeries}
     * , {@link wijmo.react.chart.analytics.FlexChartParametricFunctionSeries}
     * , {@link wijmo.react.chart.analytics.FlexChartWaterfall}
     * , {@link wijmo.react.chart.analytics.FlexChartBoxWhisker}
     * , {@link wijmo.react.chart.analytics.FlexChartErrorBar}
     * , {@link wijmo.react.chart.analytics.FlexChartBreakEven}
     * , {@link wijmo.react.chart.animation.FlexChartAnimation}
     * , {@link wijmo.react.chart.annotation.FlexChartAnnotationLayer}
     * , {@link wijmo.react.chart.interaction.FlexChartRangeSelector}
     * , {@link wijmo.react.chart.interaction.FlexChartGestures}
     * , {@link wijmo.react.chart.FlexChartAxis}
     * , {@link wijmo.react.chart.FlexChartLegend}
     * , {@link wijmo.react.chart.FlexChartDataLabel}
     * , {@link wijmo.react.chart.FlexChartSeries}
     * , {@link wijmo.react.chart.FlexChartLineMarker}
     * and {@link wijmo.react.chart.FlexChartPlotArea}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.FlexChart} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.chart.FlexChart} control in JSX:
     *
     * <pre>&lt;Wj.FlexChart
     *   itemsSource={ this.state.data }
     *   bindingX="name"
     *   header={ this.state.header }
     *   footer={ this.state.footer }
     *   axisX={&#8203;{ title: this.state.titleX }}
     *   axisY={&#8203;{ title: this.state.titleY }}
     *   legend={&#8203;{ position: this.state.legendPosition }}
     *   series={[
     *       { name: 'Sales', binding: 'sales' },
     *       { name: 'Expenses', binding: 'expenses' },
     *       { name: 'Downloads', binding: 'downloads', chartType: 'LineSymbols' }
     *   ]} /&gt;</pre>
     *

     * The code sets the <b>itemsSource</b> property to a collection that contains
     * the data to chart and the <b>bindingX</b> property to specify the name of the
     * data property to use for the chart's X values.
     *
     * It sets the <b>header</b> and <b>footer</b> properties to specify the
     * chart titles, and customizes the chart's axes and legend.
     *
     * Finally, it sets the <b>series</b> property to an array that specifies the
     * data items that the chart should display.
     */
    class FlexChart extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            renderEngine?: any;
            isDisabled?: any;
            tabOrder?: any;
            binding?: any;
            footer?: any;
            header?: any;
            selectionMode?: any;
            palette?: any;
            plotMargin?: any;
            footerStyle?: any;
            headerStyle?: any;
            tooltipContent?: any;
            itemsSource?: any;
            bindingX?: any;
            interpolateNulls?: any;
            legendToggle?: any;
            symbolSize?: any;
            options?: any;
            selection?: any;
            itemFormatter?: any;
            labelContent?: any;
            chartType?: any;
            rotated?: any;
            stacking?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rendering?: any;
            rendered?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            seriesVisibilityChanged?: any;
            selectionChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        private _setExtra;
    }
    /**
     * React component for the {@link wijmo.chart.FlexPie} control.
     *
     * The <b>flex-pie</b> component may contain
     * the following child components:
     * {@link wijmo.react.chart.animation.FlexChartAnimation}
     * , {@link wijmo.react.chart.FlexChartLegend}
     * and {@link wijmo.react.chart.FlexPieDataLabel}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.FlexPie} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexPie extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            binding?: any;
            footer?: any;
            header?: any;
            selectionMode?: any;
            palette?: any;
            plotMargin?: any;
            footerStyle?: any;
            headerStyle?: any;
            tooltipContent?: any;
            itemsSource?: any;
            bindingName?: any;
            innerRadius?: any;
            isAnimated?: any;
            offset?: any;
            reversed?: any;
            startAngle?: any;
            selectedIndex?: any;
            selectedItemPosition?: any;
            selectedItemOffset?: any;
            itemFormatter?: any;
            labelContent?: any;
            titles?: any;
            chartsPerLine?: any;
            innerText?: any;
            innerTextStyle?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rendering?: any;
            rendered?: any;
            selectionChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        private _setExtra;
    }
    /**
     * React component for the {@link wijmo.chart.Axis} class.
     *
     * The <b>flex-chart-axis</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     * , {@link wijmo.react.chart.FlexChartSeries}
     * , {@link wijmo.react.chart.finance.FinancialChart}
     *  or {@link wijmo.react.chart.finance.FinancialChartSeries}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.Axis} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartAxis extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisLine?: any;
            format?: any;
            labels?: any;
            majorGrid?: any;
            majorTickMarks?: any;
            majorUnit?: any;
            max?: any;
            min?: any;
            position?: any;
            reversed?: any;
            title?: any;
            labelAngle?: any;
            minorGrid?: any;
            minorTickMarks?: any;
            minorUnit?: any;
            origin?: any;
            logBase?: any;
            plotArea?: any;
            labelAlign?: any;
            name?: any;
            overlappingLabels?: any;
            labelPadding?: any;
            itemFormatter?: any;
            itemsSource?: any;
            binding?: any;
            initialized?: any;
            rangeChanged?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.Legend} class.
     *
     * The <b>flex-chart-legend</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     * , {@link wijmo.react.chart.FlexPie}
     * , {@link wijmo.react.chart.finance.FinancialChart}
     * , {@link wijmo.react.chart.radar.FlexRadar}
     * , {@link wijmo.react.chart.hierarchical.Sunburst}
     *  or {@link wijmo.react.chart.map.FlexMap}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.Legend} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartLegend extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            orientation?: any;
            position?: any;
            title?: any;
            titleAlign?: any;
            maxSize?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.DataLabel} class.
     *
     * The <b>flex-chart-data-label</b> component should be contained in
     * a {@link wijmo.react.chart.FlexChart} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.DataLabel} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartDataLabel extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            content?: any;
            border?: any;
            offset?: any;
            connectingLine?: any;
            position?: any;
            initialized?: any;
            rendering?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.PieDataLabel} class.
     *
     * The <b>flex-pie-data-label</b> component should be contained in
     * a {@link wijmo.react.chart.FlexPie} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.PieDataLabel} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexPieDataLabel extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            content?: any;
            border?: any;
            offset?: any;
            connectingLine?: any;
            position?: any;
            initialized?: any;
            rendering?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.Series} class.
     *
     * The <b>flex-chart-series</b> component should be contained in
     * a {@link wijmo.react.chart.FlexChart} component.
     *
     * The <b>flex-chart-series</b> component may contain
     * a {@link wijmo.react.chart.FlexChartAxis} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.Series} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartSeries extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            axisX?: any;
            axisY?: any;
            binding?: any;
            bindingX?: any;
            cssClass?: any;
            name?: any;
            style?: any;
            altStyle?: any;
            symbolMarker?: any;
            symbolSize?: any;
            symbolStyle?: any;
            visibility?: any;
            itemsSource?: any;
            interpolateNulls?: any;
            tooltipContent?: any;
            itemFormatter?: any;
            chartType?: any;
            initialized?: any;
            rendering?: any;
            rendered?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.LineMarker} class.
     *
     * The <b>flex-chart-line-marker</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.LineMarker} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartLineMarker extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isVisible?: any;
            seriesIndex?: any;
            horizontalPosition?: any;
            content?: any;
            verticalPosition?: any;
            alignment?: any;
            lines?: any;
            interaction?: any;
            dragLines?: any;
            dragThreshold?: any;
            dragContent?: any;
            initialized?: any;
            positionChanged?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.DataPoint} class.
     *
     * The <b>flex-chart-data-point</b> component should be contained in
     * a {@link wijmo.react.chart.annotation.FlexChartAnnotation} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.DataPoint} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartDataPoint extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            x?: any;
            y?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.PlotArea} class.
     *
     * The <b>flex-chart-plot-area</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.FlexChart}
     *  or {@link wijmo.react.chart.finance.FinancialChart}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.PlotArea} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexChartPlotArea extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            column?: any;
            height?: any;
            name?: any;
            row?: any;
            style?: any;
            width?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.gauge.LinearGauge} control.
     *
     * The <b>linear-gauge</b> component may contain
     * a {@link wijmo.react.gauge.Range} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.LinearGauge} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.LinearGauge} control in JSX:
     *
     * <pre>&lt;Wj.LinearGauge
     *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
     *   value={ this.state.view.currentItem.sales }
     *   valueChanged={ this.salesChanged }
     *   format="c0" thumbSize={ 20 } showRanges={ false }
     *   face={&#8203;{ thickness:0.5 }}
     *   pointer={&#8203;{ thickness:0.5 }}
     *   ranges={[
     *       { min: 0, max: 333, color: 'red' },
     *       { min: 333, max: 666, color: 'gold' },
     *       { min: 666, max: 1000, color: 'green' }
     *   ]} /&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
     * a two-way binding for the gauge's value.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    class LinearGauge extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            min?: any;
            max?: any;
            origin?: any;
            isReadOnly?: any;
            handleWheel?: any;
            step?: any;
            format?: any;
            thickness?: any;
            hasShadow?: any;
            isAnimated?: any;
            showText?: any;
            showTicks?: any;
            showTickText?: any;
            showRanges?: any;
            stackRanges?: any;
            thumbSize?: any;
            tickSpacing?: any;
            getText?: any;
            direction?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            valueChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.gauge.BulletGraph} control.
     *
     * The <b>bullet-graph</b> component may contain
     * a {@link wijmo.react.gauge.Range} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.BulletGraph} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.BulletGraph} control in JSX:
     *
     * <pre>&lt;Wj.BulletGraph
     *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
     *   value={ this.state.view.currentItem.sales }
     *   valueChanged={ this.salesChanged }
     *   format="c0" thumbSize={ 20 } showRanges={ false }
     *   face={&#8203;{ thickness:0.5 }}
     *   pointer={&#8203;{ thickness:0.5 }}
     *   ranges={[
     *       { min: 0, max: 333, color: 'red' },
     *       { min: 333, max: 666, color: 'gold' },
     *       { min: 666, max: 1000, color: 'green' }
     *   ]} /&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
     * a two-way binding for the gauge's value.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    class BulletGraph extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            min?: any;
            max?: any;
            origin?: any;
            isReadOnly?: any;
            handleWheel?: any;
            step?: any;
            format?: any;
            thickness?: any;
            hasShadow?: any;
            isAnimated?: any;
            showText?: any;
            showTicks?: any;
            showTickText?: any;
            showRanges?: any;
            stackRanges?: any;
            thumbSize?: any;
            tickSpacing?: any;
            getText?: any;
            direction?: any;
            target?: any;
            good?: any;
            bad?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            valueChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.gauge.RadialGauge} control.
     *
     * The <b>radial-gauge</b> component may contain
     * a {@link wijmo.react.gauge.Range} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.RadialGauge} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.gauge.RadialGauge} control in JSX:
     *
     * <pre>&lt;Wj.RadialGauge
     *   min={ 0 } max={ 1000 } step={ 50 } isReadOnly={ false }
     *   value={ this.state.view.currentItem.sales }
     *   valueChanged={ this.salesChanged }
     *   format="c0" thumbSize={ 20 } showRanges={ false }
     *   face={&#8203;{ thickness:0.5 }}
     *   pointer={&#8203;{ thickness:0.5 }}
     *   ranges={[
     *       { min: 0, max: 333, color: 'red' },
     *       { min: 333, max: 666, color: 'gold' },
     *       { min: 666, max: 1000, color: 'green' }
     *   ]} /&gt;</pre>
     *
     * The code <b>min</b>, <b>max</b>, <b>step</b>, and <b>isReadOnly</b> properties
     * to define the range of the gauge and to allow users to edit its value.
     * Next, it sets the <b>value</b> and <b>valueChanged</b> properties to create
     * a two-way binding for the gauge's value.
     *
     * Then it sets the <b>format</b>, <b>thumbSize</b>, and <b>showRanges</b>
     * properties to define the appearance of the gauge. Finally, the markup sets
     * the thickness of the <b>face</b> and <b>pointer</b> ranges, and extra ranges
     * that will control the color of the <b>value</b> range depending on the gauge's
     * current value.
     */
    class RadialGauge extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            min?: any;
            max?: any;
            origin?: any;
            isReadOnly?: any;
            handleWheel?: any;
            step?: any;
            format?: any;
            thickness?: any;
            hasShadow?: any;
            isAnimated?: any;
            showText?: any;
            showTicks?: any;
            showTickText?: any;
            showRanges?: any;
            stackRanges?: any;
            thumbSize?: any;
            tickSpacing?: any;
            getText?: any;
            autoScale?: any;
            startAngle?: any;
            sweepAngle?: any;
            needleShape?: any;
            needleLength?: any;
            needleElement?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            valueChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.gauge.Range} class.
     *
     * The <b>range</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.gauge.LinearGauge}
     * , {@link wijmo.react.gauge.BulletGraph}
     *  or {@link wijmo.react.gauge.RadialGauge}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.gauge.Range} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Range extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            color?: any;
            min?: any;
            max?: any;
            name?: any;
            thickness?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.detail.FlexGridDetailProvider} class.
     *
     * The <b>flex-grid-detail</b> component should be contained in
     * a {@link wijmo.react.grid.FlexGrid} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.detail.FlexGridDetailProvider} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The component includes a <b>template</b> property which is used to define template for detail row.
     * The template is a function with single argument. The argument is a plain object with keys of
     * <b>row</b> (the row to which detail row belongs),
     * <b>item</b> (item data related to the row) and
     * <b>provider</b> (FlexGrid control, owner of the row).
     */
    class FlexGridDetail extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            maxHeight?: any;
            keyActionEnter?: any;
            detailVisibilityMode?: any;
            rowHasDetail?: any;
            isAnimated?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        private _renderedCells;
        private _template;
        constructor(props: any);
        protected _onBeforeWillUnmount(e?: wijmo.EventArgs): void;
        protected _initParent(): void;
        componentDidUpdate(prevProps: any): void;
        private _setTemplateRelatedProps;
        private _getTemplateContext;
        private _unmountRenderedCells;
        private _getCellCreator;
        private _destroyCell;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.filter.FlexGridFilter} class.
     *
     * The <b>flex-grid-filter</b> component should be contained in
     * a {@link wijmo.react.grid.FlexGrid} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.filter.FlexGridFilter} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexGridFilter extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            showFilterIcons?: any;
            showSortButtons?: any;
            defaultFilterType?: any;
            filterColumns?: any;
            initialized?: any;
            editingFilter?: any;
            filterChanging?: any;
            filterChanged?: any;
            filterApplied?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.grouppanel.GroupPanel} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.grouppanel.GroupPanel} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class GroupPanel extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            hideGroupedColumns?: any;
            showDragGlyphs?: any;
            maxGroups?: any;
            placeholder?: any;
            filter?: any;
            groupDescriptionCreator?: any;
            grid?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.search.FlexGridSearch} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.search.FlexGridSearch} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexGridSearch extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            text?: any;
            delay?: any;
            searchAllColumns?: any;
            placeholder?: any;
            cssMatch?: any;
            grid?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * Represents a cell template types enumeration.
     */
    export import CellTemplateType = GridCellTemplateType;
    /**
     * React component for the {@link wijmo.grid.FlexGrid} control.
     *
     * The <b>flex-grid</b> component may contain
     * the following child components:
     * {@link wijmo.react.grid.detail.FlexGridDetail}
     * , {@link wijmo.react.grid.filter.FlexGridFilter}
     * , {@link wijmo.react.grid.immutable.ImmutabilityProvider}
     * , {@link wijmo.react.grid.FlexGridColumn}
     * , {@link wijmo.react.grid.FlexGridColumnGroup}
     * and {@link wijmo.react.grid.FlexGridCellTemplate}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.FlexGrid} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The example below shows how to instantiate and initialize a
     * {@link wijmo.grid.FlexGrid} control in JSX:
     *
     * <pre>&lt;Wj.FlexGrid
     *   autoGenerateColumns={ false }
     *   columns={[
     *     { binding: 'name', header: 'Name' },
     *     { binding: 'sales', header: 'Sales', format: 'c0' },
     *     { binding: 'expenses', header: 'Expenses', format: 'c0' },
     *     { binding: 'active', header: 'Active' },
     *     { binding: 'date', header: 'Date' }
     *   ]}
     *   itemsSource={ this.state.data } /&gt;</pre>
     *
     * The code sets the <b>autoGenerateColumns</b> property to false, then
     * sets the <b>columns</b> property, and finally sets the <b>itemsSource</b>
     * property. This order is important, it prevents the grid from automatically
     * generating the columns.
     */
    class FlexGrid extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            newRowAtTop?: any;
            allowAddNew?: any;
            allowDelete?: any;
            allowDragging?: any;
            allowMerging?: any;
            allowResizing?: any;
            allowSorting?: any;
            allowPinning?: any;
            autoScroll?: any;
            autoRowHeights?: any;
            autoSizeMode?: any;
            autoGenerateColumns?: any;
            autoSearch?: any;
            caseSensitiveSearch?: any;
            quickAutoSize?: any;
            bigCheckboxes?: any;
            childItemsPath?: any;
            groupHeaderFormat?: any;
            headersVisibility?: any;
            showSelectedHeaders?: any;
            showMarquee?: any;
            showPlaceholders?: any;
            itemFormatter?: any;
            isReadOnly?: any;
            imeEnabled?: any;
            mergeManager?: any;
            selectionMode?: any;
            showGroups?: any;
            showSort?: any;
            showDropDown?: any;
            showAlternatingRows?: any;
            showErrors?: any;
            alternatingRowStep?: any;
            itemValidator?: any;
            validateEdits?: any;
            treeIndent?: any;
            itemsSource?: any;
            autoClipboard?: any;
            expandSelectionOnCopyPaste?: any;
            frozenRows?: any;
            frozenColumns?: any;
            cloneFrozenCells?: any;
            deferResizing?: any;
            sortRowIndex?: any;
            editColumnIndex?: any;
            stickyHeaders?: any;
            preserveSelectedState?: any;
            preserveOutlineState?: any;
            preserveWhiteSpace?: any;
            keyActionTab?: any;
            keyActionEnter?: any;
            rowHeaderPath?: any;
            virtualizationThreshold?: any;
            anchorCursor?: any;
            lazyRender?: any;
            refreshOnEdit?: any;
            copyHeaders?: any;
            columnGroups?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            beginningEdit?: any;
            cellEditEnded?: any;
            cellEditEnding?: any;
            prepareCellForEdit?: any;
            formatItem?: any;
            resizingColumn?: any;
            resizedColumn?: any;
            autoSizingColumn?: any;
            autoSizedColumn?: any;
            draggingColumn?: any;
            draggingColumnOver?: any;
            draggedColumn?: any;
            sortingColumn?: any;
            sortedColumn?: any;
            pinningColumn?: any;
            pinnedColumn?: any;
            resizingRow?: any;
            resizedRow?: any;
            autoSizingRow?: any;
            autoSizedRow?: any;
            draggingRow?: any;
            draggingRowOver?: any;
            draggedRow?: any;
            deletingRow?: any;
            deletedRow?: any;
            loadingRows?: any;
            loadedRows?: any;
            rowEditStarting?: any;
            rowEditStarted?: any;
            rowEditEnding?: any;
            rowEditEnded?: any;
            rowAdded?: any;
            groupCollapsedChanging?: any;
            groupCollapsedChanged?: any;
            columnGroupCollapsedChanging?: any;
            columnGroupCollapsedChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            selectionChanging?: any;
            selectionChanged?: any;
            scrollPositionChanged?: any;
            updatingView?: any;
            updatedView?: any;
            updatingLayout?: any;
            updatedLayout?: any;
            pasting?: any;
            pasted?: any;
            pastingCell?: any;
            pastedCell?: any;
            copying?: any;
            copied?: any;
            [key: string]: any;
        };
        constructor(props: any);
        protected _createControl(): any;
    }
    /**
     * React component for the {@link wijmo.grid.Column} class.
     *
     * The <b>flex-grid-column</b> component should be contained in
     * a {@link wijmo.react.grid.FlexGrid} component.
     *
     * The <b>flex-grid-column</b> component may contain
     * a {@link wijmo.react.grid.FlexGridCellTemplate} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.Column} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexGridColumn extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            name?: any;
            dataMap?: any;
            dataType?: any;
            binding?: any;
            sortMemberPath?: any;
            format?: any;
            cellTemplate?: any;
            header?: any;
            width?: any;
            maxLength?: any;
            minWidth?: any;
            maxWidth?: any;
            align?: any;
            allowDragging?: any;
            allowSorting?: any;
            allowResizing?: any;
            allowMerging?: any;
            aggregate?: any;
            isReadOnly?: any;
            cssClass?: any;
            cssClassAll?: any;
            isContentHtml?: any;
            isSelected?: any;
            visible?: any;
            wordWrap?: any;
            multiLine?: any;
            mask?: any;
            inputType?: any;
            isRequired?: any;
            showDropDown?: any;
            dataMapEditor?: any;
            dropDownCssClass?: any;
            quickAutoSize?: any;
            editor?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
        protected _initParent(): void;
    }
    /**
     * React component for the {@link wijmo.grid.ColumnGroup} class.
     *
     * The <b>flex-grid-column-group</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.grid.FlexGrid}
     *  or {@link wijmo.react.grid.FlexGridColumnGroup}.
     *
     * The <b>flex-grid-column-group</b> component may contain
     * the following child components:
     * {@link wijmo.react.grid.FlexGridColumnGroup}
     * and {@link wijmo.react.grid.FlexGridCellTemplate}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.ColumnGroup} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexGridColumnGroup extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            name?: any;
            dataMap?: any;
            dataType?: any;
            binding?: any;
            sortMemberPath?: any;
            format?: any;
            cellTemplate?: any;
            header?: any;
            width?: any;
            maxLength?: any;
            minWidth?: any;
            maxWidth?: any;
            align?: any;
            allowDragging?: any;
            allowSorting?: any;
            allowResizing?: any;
            allowMerging?: any;
            aggregate?: any;
            isReadOnly?: any;
            cssClass?: any;
            cssClassAll?: any;
            isContentHtml?: any;
            isSelected?: any;
            visible?: any;
            wordWrap?: any;
            multiLine?: any;
            mask?: any;
            inputType?: any;
            isRequired?: any;
            showDropDown?: any;
            dataMapEditor?: any;
            dropDownCssClass?: any;
            quickAutoSize?: any;
            editor?: any;
            collapseTo?: any;
            isCollapsed?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    interface ICellTemplateInfoReact extends ICellTemplateInfo {
        template: CellTemplateRender;
    }
    interface ICellRenderingInfoReact extends ICellRenderingInfo {
        templateContext: ICellTemplateInfoReact;
    }
    class DirectiveCellFactory extends DirectiveCellFactoryBase {
        private readonly _renderedCells;
        private _isViewUpdated;
        constructor(gridComponent: ComponentBase, grid: wijmo.grid.FlexGrid);
        protected shouldInstantiate(cellInfo: ICellRenderingInfo): boolean;
        protected renderTemplate(cellInfo: ICellRenderingInfoReact, initNew: boolean): void;
        protected disposeTemplate(cell: HTMLElement, templateCache: ICellTemplateCache, templateContext: ICellTemplateInfoReact): void;
        protected clearCell(cell: HTMLElement): void;
        protected applyImmediately(cellInfo: ICellRenderingInfoReact): void;
        protected flushPendingEvents(control: wijmo.Control): void;
        protected getEditorFocusFlag(): boolean;
        protected setEditorFocusFlag(value: boolean): void;
        private _renderCell;
        private _addRenderedCell;
        private _removeRenderedCell;
        private _reRenderCells;
        private _gridCmpBeforeDidUpdate;
        private _gridCmpAfterDidUpdate;
        private _gridCmpRendered;
        private _gridViewUpdated;
    }
    interface ICellTemplateContext {
        row: wijmo.grid.Row;
        col: wijmo.grid.Column;
        item: any;
        value: any;
        values: any;
    }
    type CellTemplateRender = (context: ICellTemplateContext) => any;
    /**
   * React component for the {@link FlexGrid} cell templates.
   *
   * The <b>FlexGridCellTemplate</b> component defines a template for a certain
   * cell type in {@link FlexGrid}. The template element must contain a <b>cellType</b> property that
   * specifies the {@link wijmo.react.grid.CellTemplateType}. Depending on the template's cell type,
   * the <b>FlexGridCellTemplate</b> element must be a child
   * of either {@link wijmo.react.grid.FlexGrid}
   * or {@link wijmo.react.grid.FlexGridColumn} components.
   *
   * Column-specific cell templates must be contained in <b>FlexGridColumn</b>
   * components, and cells that are not column-specific (like row header or top left cells)
   * must be contained in the <b>FlexGrid</b> component.
   *
   * The content of cells is defined using the <b>template</b> <i>render prop</i>, which receives
   * a render function that should return a virtual element tree representing the cell content.
   * The function has the <b>context</b> parameter where the data context of each certain cell is
   * passed. This is an object with the <b>col</b>, <b>row</b>, and <b>item</b> properties,
   * which refer to the {@link Column}, {@link Row}, and <b>Row.dataItem</b> objects pertaining to the cell.
   *
   * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
   * context property containing an unformatted cell value is provided.
   *
   * For example, here is a
   * {@link FlexGrid} control with templates for row header cells and, regular
   * and column header cells of the Country column:
   *
   * ```html
   * <!-- component.html -->
   * <wjGrid.FlexGrid itemsSource={this.state.data}>
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="RowHeader"
   *       template={ (context) => context.row.index + 1 } />
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="RowHeaderEdit"
   *       template={ (context) => '...' } />
   *
   *   <wjGrid.FlexGridColumn header="Country" binding="country">
   *     <wjGrid.FlexGridCellTemplate
   *           cellType="ColumnHeader"
   *           template={ (context) => {
   *               return <React.Fragment>
   *                   <img src="resources/globe.png" />
   *                   {context.col.header}
   *               </React.Fragment>
   *               }
   *           }
   *      />
   *     <wjGrid.FlexGridCellTemplate
   *           cellType="Cell"
   *           template={ (context) => {
   *               return <React.Fragment>
   *                  <img src={`resources/${context.item.country}.png`} />
   *                  {context.item.country}
   *               </React.Fragment>
   *           } }
   *       />
   *   </wjGrid.FlexGridColumn>
   *   <wjGrid.FlexGridColumn header="Sales" binding="sales"></wjGrid.FlexGridColumn>
   * </wjGrid.FlexGrid>
   * ```
   *
   * The <b>FlexGridCellTemplate</b> directive supports the following properties:
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
   * Defines a regular (data) cell template. Must be a child of the {@link wijmo.react.grid.FlexGridColumn} component.
   * For example, this cell template shows flags in the cells of Country column:
   *
   * ```html
   * <wjGrid.FlexGridColumn header="Country" binding="country">
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="Cell"
   *       template={ (context) => {
   *           return <React.Fragment>
   *              <img src={`resources/${context.item.country}.png`} />
   *              {context.item.country}
   *           </React.Fragment>
   *       }
   *    }
   *   />
   * </wjGrid.FlexGridColumn>
   * ```
   *
   * If <b>Group</b> template is not provided for a hierarchical {@link FlexGrid} (that is, one with the <b>childItemsPath</b> property
   * specified), non-header cells in group rows of
   * this {@link Column} also use this template.
   *
   * <b>CellEdit</b>
   *
   * Defines a template for a cell in edit mode. Must be a child of the {@link wijmo.react.grid.FlexGridColumn} component.
   * This cell type has an additional <b>context.value</b> property. It contains the
   * original cell value before editing, and the updated value after editing.
   *
   * For example, here is a template that uses the Wijmo {@link InputNumber} control as an editor
   * for the "Sales" column:
   * ```html
   * <wjGrid.FlexGridColumn header="Sales" binding="sales">
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="CellEdit"
   *       template={ (context) => {
   *            return <wjInput.InputNumber
   *                step={1}
   *                value={context.value}
   *                valueChanged={(inpNum: wjcInput.InputNumber) =>
   *                    context.value = inpNum.value
   *                } />
   *            }
   *       }
   *   />
   * </wjGrid.FlexGridColumn>
   * ```
   *
   * <b>ColumnHeader</b>
   *
   * Defines a template for a column header cell. Must be a child of the {@link wijmo.react.grid.FlexGridColumn} component.
   * For example, this template adds an image to the header of the "Country" column:
   *
   * ```html
   * <wjGrid.FlexGridColumn header="Country" binding="country">
   *   <wjGrid.FlexGridCellTemplate
   *         cellType="ColumnHeader"
   *         template={ (context) => {
   *             return <React.Fragment>
   *                 <img src="resources/globe.png" />
   *                 {context.col.header}
   *             </React.Fragment>
   *             }
   *         }
   *   />
   * </wjGrid.FlexGridColumn>
   * ```
   *
   * <b>RowHeader</b>
   *
   * Defines a template for a row header cell. Must be a child of the {@link wijmo.react.grid.FlexGrid} component.
   * For example, this template shows row indices in the row headers:
   *
   * ```html
   * <wjGrid.FlexGrid itemsSource={this.state.data}>
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="RowHeader"
   *       template={ (context) => context.row.index + 1 } />
   * </wjGrid.FlexGrid>
   * ```
   *
   * Note that this template is applied to a row header cell, even if it is in a row that is
   * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
   * content, define the <b>RowHeaderEdit</b> template.
   *
   * <b>RowHeaderEdit</b>
   *
   * Defines a template for a row header cell in edit mode. Must be a child of the
   * {@link wijmo.react.grid.FlexGrid} component. For example, this template shows dots in the header
   * of rows being edited:
   *
   * ```html
   * <wjGrid.FlexGrid itemsSource={this.state.data}>
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="RowHeaderEdit"
   *       template={ (context) => '...' } />
   * </wjGrid.FlexGrid>
   * ```
   *
   * Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where
   * the <b>RowHeader</b> template applies:
   *
   * ```html
   * <wjGrid.FlexGrid itemsSource={this.state.data}>
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="RowHeaderEdit"
   *       template={ (context) => '\u270e\ufe0e' } />
   * </wjGrid.FlexGrid>
   * ```
   *
   * <b>TopLeft</b>
   *
   * Defines a template for the top left cell. Must be a child of the {@link wijmo.react.grid.FlexGrid} component.
   * For example, this template shows a down/right glyph in the top-left cell of the grid:
   *
   * ```html
   * <wjGrid.FlexGrid itemsSource={this.state.data}>
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="TopLeft"
   *       template={ (context) => {
   *           return <span class="wj-glyph-down-right"></span>
   *       } }
   *   />
   * </wjGrid.FlexGrid>
   * ```
   *
   * <b>GroupHeader</b>
   *
   * Defines a template for a group header cell in a {@link GroupRow}. Must be a child of
   * the {@link wijmo.react.grid.FlexGridColumn} component.
   *
   * The <b>context.row</b> property contains an instance of the <b>GroupRow</b> class. If the grouping comes
   * from {@link CollectionView}, the <b>context.item</b> property references the {@link CollectionViewGroup} object.
   *
   * For example, this template uses a checkbox element as an expand/collapse toggle:
   *
   * ```html
   * <wjGrid.FlexGridColumn header="Country" binding="country">
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="GroupHeader"
   *       template={ (context) => {
   *          return <React.Fragment>
   *            <input type="checkbox"
   *                checked={context.row.isCollapsed}
   *                onChange={e =>
   *                    context.row.isCollapsed = e.target.checked as boolean
   *                } />
   *            {context.item.name} ({context.item.items.length} items)
   *          </React.Fragment>
   *          }
   *        }
   *   />
   * </wjGrid.FlexGridColumn>
   * ```
   *
   * <b>Group</b>
   *
   * Defines a template for a regular cell (not a group header) in a {@link GroupRow}. Must be a child of the
   * {@link wijmo.react.grid.FlexGridColumn} component. This cell type has an additional <b>context.value</b>
   * property. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
   * aggregate value.
   *
   * For example, this template shows aggregate's value and kind for group row cells in the "Sales"
   * column:
   *
   * ```html
   * <wjGrid.FlexGridColumn header="Sales" binding="sales" aggregate="Avg">
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="Group"
   *       template={ (context) => {
   *          return <React.Fragment>
   *            Average: {wjcCore.Globalize.formatNumber(context.value, 'N0')}
   *          </React.Fragment>
   *          }
   *        }
   *   />
   * </wjGrid.FlexGridColumn>
   * ```
   *
   * <b>ColumnFooter</b>
   *
   * Defines a template for a regular cell in a <b>columnFooters</b> panel. Must be a child of the
   * {@link wijmo.react.grid.FlexGridColumn} component. This cell type provides an additional <b>context.value</b>
   * property available for binding that contains an aggregated cell value.
   *
   * For example, this template shows aggregate's value and kind for a footer cell in the "Sales"
   * column:
   *
   * ```html
   * <wjGrid.FlexGridColumn header="Sales" binding="sales" aggregate="Avg">
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="ColumnFooter"
   *       template={ (context) => {
   *          return <React.Fragment>
   *            Average: {wjcCore.Globalize.formatNumber(context.value, 'N0')}
   *          </React.Fragment>
   *          }
   *        }
   *   />
   * </wjGrid.FlexGridColumn>
   * ```
   *
   * <b>BottomLeft</b>
   *
   * Defines a template for the bottom left cells (at the intersection of the row header and column footer cells).
   * Must be a child of the {@link wijmo.react.grid.FlexGrid} component.
   * For example, this template shows a sigma glyph in the bottom-left cell of the grid:
   *
   * ```html
   * <wjGrid.FlexGrid itemsSource={this.state.data}>
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="BottomLeft"
   *       template={(context) => <span>&#931;</span>} />
   * </wjGrid.FlexGrid>
   * ```
   *
   * <b>NewCellTemplate</b>
   *
   * Defines a cell in a new row template. Must be a child of the {@link wijmo.react.grid.FlexGridColumn} component.
   * Note that the <b>context.item</b> property is undefined for this type of a cell.
   * For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
   *
   * ```html
   * <wjGrid.FlexGridColumn header="Date" binding="date">
   *   <wjGrid.FlexGridCellTemplate
   *       cellType="NewCellTemplate"
   *       template={ (context) => 'Enter a date here' } />
   * </wjGrid.FlexGridColumn>
   * ```
   */
    class FlexGridCellTemplate extends React.Component<any, any> {
        static readonly _CellRenderFuncProp: string;
        grid: wijmo.grid.FlexGrid;
        column: wijmo.grid.Column;
        ownerControl: wijmo.grid.FlexGrid | wijmo.grid.Column;
        cellType: CellTemplateType;
        readonly cellOverflow: string;
        readonly autoSizeRows: boolean;
        readonly forceFullEdit: boolean;
        readonly valuePaths: Object;
        readonly template: CellTemplateRender;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: any): void;
        render(): any;
        private _attachToControl;
        private _detachFromControl;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.multirow.MultiRow} control.
     *
     * The <b>multi-row</b> component may contain
     * the following child components:
     * {@link wijmo.react.grid.multirow.MultiRowCellGroup}
     * and {@link wijmo.react.grid.multirow.MultiRowCellTemplate}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.multirow.MultiRow} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class MultiRow extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            newRowAtTop?: any;
            allowAddNew?: any;
            allowDelete?: any;
            allowDragging?: any;
            allowMerging?: any;
            allowResizing?: any;
            allowSorting?: any;
            allowPinning?: any;
            autoScroll?: any;
            autoRowHeights?: any;
            autoSizeMode?: any;
            autoGenerateColumns?: any;
            autoSearch?: any;
            caseSensitiveSearch?: any;
            quickAutoSize?: any;
            bigCheckboxes?: any;
            childItemsPath?: any;
            groupHeaderFormat?: any;
            headersVisibility?: any;
            showSelectedHeaders?: any;
            showMarquee?: any;
            showPlaceholders?: any;
            itemFormatter?: any;
            isReadOnly?: any;
            imeEnabled?: any;
            mergeManager?: any;
            selectionMode?: any;
            showGroups?: any;
            showSort?: any;
            showDropDown?: any;
            showAlternatingRows?: any;
            showErrors?: any;
            alternatingRowStep?: any;
            itemValidator?: any;
            validateEdits?: any;
            treeIndent?: any;
            itemsSource?: any;
            autoClipboard?: any;
            expandSelectionOnCopyPaste?: any;
            frozenRows?: any;
            frozenColumns?: any;
            cloneFrozenCells?: any;
            deferResizing?: any;
            sortRowIndex?: any;
            editColumnIndex?: any;
            stickyHeaders?: any;
            preserveSelectedState?: any;
            preserveOutlineState?: any;
            preserveWhiteSpace?: any;
            keyActionTab?: any;
            keyActionEnter?: any;
            rowHeaderPath?: any;
            virtualizationThreshold?: any;
            anchorCursor?: any;
            lazyRender?: any;
            refreshOnEdit?: any;
            copyHeaders?: any;
            columnGroups?: any;
            layoutDefinition?: any;
            headerLayoutDefinition?: any;
            centerHeadersVertically?: any;
            collapsedHeaders?: any;
            showHeaderCollapseButton?: any;
            multiRowGroupHeaders?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            beginningEdit?: any;
            cellEditEnded?: any;
            cellEditEnding?: any;
            prepareCellForEdit?: any;
            formatItem?: any;
            resizingColumn?: any;
            resizedColumn?: any;
            autoSizingColumn?: any;
            autoSizedColumn?: any;
            draggingColumn?: any;
            draggingColumnOver?: any;
            draggedColumn?: any;
            sortingColumn?: any;
            sortedColumn?: any;
            pinningColumn?: any;
            pinnedColumn?: any;
            resizingRow?: any;
            resizedRow?: any;
            autoSizingRow?: any;
            autoSizedRow?: any;
            draggingRow?: any;
            draggingRowOver?: any;
            draggedRow?: any;
            deletingRow?: any;
            deletedRow?: any;
            loadingRows?: any;
            loadedRows?: any;
            rowEditStarting?: any;
            rowEditStarted?: any;
            rowEditEnding?: any;
            rowEditEnded?: any;
            rowAdded?: any;
            groupCollapsedChanging?: any;
            groupCollapsedChanged?: any;
            columnGroupCollapsedChanging?: any;
            columnGroupCollapsedChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            selectionChanging?: any;
            selectionChanged?: any;
            scrollPositionChanged?: any;
            updatingView?: any;
            updatedView?: any;
            updatingLayout?: any;
            updatedLayout?: any;
            pasting?: any;
            pasted?: any;
            pastingCell?: any;
            pastedCell?: any;
            copying?: any;
            copied?: any;
            collapsedHeadersChanging?: any;
            collapsedHeadersChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        protected _createControl(): any;
        protected _onBeforeWillUnmount(e?: wijmo.EventArgs): void;
    }
    /**
     * React component for the {@link wijmo.grid.multirow.MultiRowCell} class.
     *
     * The <b>multi-row-cell</b> component should be contained in
     * a {@link wijmo.react.grid.multirow.MultiRowCellGroup} component.
     *
     * The <b>multi-row-cell</b> component may contain
     * a {@link wijmo.react.grid.multirow.MultiRowCellTemplate} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.multirow.MultiRowCell} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class MultiRowCell extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            name?: any;
            dataMap?: any;
            dataType?: any;
            binding?: any;
            sortMemberPath?: any;
            format?: any;
            cellTemplate?: any;
            header?: any;
            width?: any;
            maxLength?: any;
            minWidth?: any;
            maxWidth?: any;
            align?: any;
            allowDragging?: any;
            allowSorting?: any;
            allowResizing?: any;
            allowMerging?: any;
            aggregate?: any;
            isReadOnly?: any;
            cssClass?: any;
            cssClassAll?: any;
            isContentHtml?: any;
            isSelected?: any;
            visible?: any;
            wordWrap?: any;
            multiLine?: any;
            mask?: any;
            inputType?: any;
            isRequired?: any;
            showDropDown?: any;
            dataMapEditor?: any;
            dropDownCssClass?: any;
            quickAutoSize?: any;
            editor?: any;
            colspan?: any;
            rowspan?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.grid.multirow.MultiRowCellGroup} class.
     *
     * The <b>multi-row-cell-group</b> component should be contained in
     * a {@link wijmo.react.grid.multirow.MultiRow} component.
     *
     * The <b>multi-row-cell-group</b> component may contain
     * a {@link wijmo.react.grid.multirow.MultiRowCell} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.multirow.MultiRowCellGroup} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class MultiRowCellGroup extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            name?: any;
            dataMap?: any;
            dataType?: any;
            binding?: any;
            sortMemberPath?: any;
            format?: any;
            cellTemplate?: any;
            header?: any;
            width?: any;
            maxLength?: any;
            minWidth?: any;
            maxWidth?: any;
            align?: any;
            allowDragging?: any;
            allowSorting?: any;
            allowResizing?: any;
            allowMerging?: any;
            aggregate?: any;
            isReadOnly?: any;
            cssClass?: any;
            cssClassAll?: any;
            isContentHtml?: any;
            isSelected?: any;
            visible?: any;
            wordWrap?: any;
            multiLine?: any;
            mask?: any;
            inputType?: any;
            isRequired?: any;
            showDropDown?: any;
            dataMapEditor?: any;
            dropDownCssClass?: any;
            quickAutoSize?: any;
            editor?: any;
            colspan?: any;
            rowspan?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
    /**
   * React component for the {@link MultiRow} cell templates.
   *
   * The <b>MultiRowCellTemplate</b> component defines a template for a certain
   * cell type in {@link MultiRow}. The template element must contain a <b>cellType</b> property that
   * specifies the {@link wijmo.react.grid.CellTemplateType}. Depending on the template's cell type,
   * the <b>MultiRowCellTemplate</b> element must be a child
   * of either {@link wijmo.react.grid.multirow.MultiRow}
   * or {@link wijmo.react.grid.multirow.MultiRowCell} components.
   *
   * Column-specific cell templates must be contained in <b>MultiRowCell</b>
   * components, and cells that are not column-specific (like row header or top left cells)
   * must be contained in the <b>MultiRow</b> component.
   *
   * The content of cells is defined using the <b>template</b> <i>render prop</i>, which receives
   * a render function that should return a virtual element tree representing the cell content.
   * The function has the <b>context</b> parameter where the data context of each certain cell is
   * passed. This is an object with the <b>col</b>, <b>row</b>, and <b>item</b> properties,
   * which refer to the {@link MultiRowCell}, {@link Row}, and <b>Row.dataItem</b> objects pertaining to the cell.
   *
   * For cell types like <b>Group</b> and <b>CellEdit</b>, an additional <b>value</b>
   * context property containing an unformatted cell value is provided.
   *
   * For example, here is a
   * {@link MultiRow} control with templates for row header cells and, regular
   * and column header cells of the Country column:
   *
   * ```html
   * <!-- component.html -->
   * <MultiRow itemsSource={this.state.data}>
   *   <MultiRowCellTemplate
   *       cellType="RowHeader"
   *       template={ (context) => context.row.index + 1 } />
   *   <MultiRowCellTemplate
   *       cellType="RowHeaderEdit"
   *       template={ (context) => '...' } />
   *
   *   <MultiRowCellGroup header="Statistics">
   *      <MultiRowCell header="Country" binding="country">
   *         <MultiRowCellTemplate
   *               cellType="ColumnHeader"
   *               template={ (context) => {
   *                   return <React.Fragment>
   *                       <img src="resources/globe.png" />
   *                       {context.col.header}
   *                   </React.Fragment>
   *                   }
   *              }
   *         />
   *         <MultiRowCellTemplate
   *               cellType="Cell"
   *               template={ (context) => {
   *                   return <React.Fragment>
   *                       <img src={`resources/${context.item.country}.png`} />
   *                       {context.item.country}
   *                   </React.Fragment>
   *               } }
   *       />
   *      </MultiRowCell>
   *      <MultiRowCell header="Sales" binding="sales"></MultiRowCell>
   *   </MultiRowCellGroup>
   * </MultiRow>
   * ```
   *
   * The <b>MultiRowCellTemplate</b> directive supports the following properties:
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
   * Defines a regular (data) cell template. Must be a child of the {@link wijmo.react.grid.multirow.MultiRowCell} component.
   * For example, this cell template shows flags in the cells of Country column:
   *
   * ```html
   * <MultiRowCell header="Country" binding="country">
   *   <MultiRowCellTemplate
   *       cellType="Cell"
   *       template={ (context) => {
   *           return <React.Fragment>
   *              <img src={`resources/${context.item.country}.png`} />
   *              {context.item.country}
   *           </React.Fragment>
   *       }
   *    }
   *   />
   * </MultiRowCell>
   * ```
   *
   * <b>CellEdit</b>
   *
   * Defines a template for a cell in edit mode. Must be a child of the {@link wijmo.react.grid.multirow.MultiRowCell} component.
   * This cell type has an additional <b>context.value</b> property. It contains the
   * original cell value before editing, and the updated value after editing.
   *
   * For example, here is a template that uses the Wijmo {@link InputNumber} control as an editor
   * for the "Sales" column:
   * ```html
   * <MultiRowCell header="Sales" binding="sales">
   *   <MultiRowCellTemplate
   *       cellType="CellEdit"
   *       template={ (context) => {
   *            return <wjInput.InputNumber
   *                step={1}
   *                value={context.value}
   *                valueChanged={(inpNum: wjcInput.InputNumber) =>
   *                    context.value = inpNum.value
   *                } />
   *            }
   *       }
   *   />
   * </MultiRowCell>
   * ```
   *
   * <b>ColumnHeader</b>
   *
   * Defines a template for a column header cell. Must be a child of the {@link wijmo.react.grid.multirow.MultiRowCell} component.
   * For example, this template adds an image to the header of the "Country" column:
   *
   * ```html
   * <MultiRowCell header="Country" binding="country">
   *   <MultiRowCellTemplate
   *         cellType="ColumnHeader"
   *         template={ (context) => {
   *             return <React.Fragment>
   *                 <img src="resources/globe.png" />
   *                 {context.col.header}
   *             </React.Fragment>
   *             }
   *         }
   *   />
   * </MultiRowCell>
   * ```
   *
   * <b>RowHeader</b>
   *
   * Defines a template for a row header cell. Must be a child of the {@link wijmo.react.grid.multirow.MultiRow} component.
   * For example, this template shows row indices in the row headers:
   *
   * ```html
   * <MultiRow itemsSource={this.state.data}>
   *   <MultiRowCellTemplate
   *       cellType="RowHeader"
   *       template={ (context) => context.row.index / context.row.grid.rowsPerItem + 1 } />
   * </MultiRow>
   * ```
   *
   * Note that this template is applied to a row header cell, even if it is in a row that is
   * in edit mode. In order to provide an edit-mode version of a row header cell with alternate
   * content, define the <b>RowHeaderEdit</b> template.
   *
   * <b>RowHeaderEdit</b>
   *
   * Defines a template for a row header cell in edit mode. Must be a child of the
   * {@link wijmo.react.grid.multirow.MultiRow} component. For example, this template shows dots in the header
   * of rows being edited:
   *
   * ```html
   * <MultiRow itemsSource={this.state.data}>
   *   <MultiRowCellTemplate
   *       cellType="RowHeaderEdit"
   *       template={ (context) => '...' } />
   * </MultiRow>
   * ```
   *
   * Use the following <b>RowHeaderEdit</b> template to add the standard edit-mode indicator to cells where
   * the <b>RowHeader</b> template applies:
   *
   * ```html
   * <MultiRow itemsSource={this.state.data}>
   *   <MultiRowCellTemplate
   *       cellType="RowHeaderEdit"
   *       template={ (context) => '\u270e\ufe0e' } />
   * </MultiRow>
   * ```
   *
   * <b>TopLeft</b>
   *
   * Defines a template for the top left cell. Must be a child of the {@link wijmo.react.grid.multirow.MultiRow} component.
   * For example, this template shows a down/right glyph in the top-left cell of the grid:
   *
   * ```html
   * <MultiRow itemsSource={this.state.data}>
   *   <MultiRowCellTemplate
   *       cellType="TopLeft"
   *       template={ (context) => {
   *           return <span class="wj-glyph-down-right"></span>
   *       } }
   *   />
   * </MultiRow>
   * ```
   *
   * <b>GroupHeader</b>
   *
   * Defines a template for a group header cell in a {@link GroupRow}. Must be a child of
   * the {@link wijmo.react.grid.multirow.MultiRowCell} component.
   *
   * The <b>context.row</b> property contains an instance of the <b>GroupRow</b> class. If the grouping comes
   * from {@link CollectionView}, the <b>context.item</b> property references the {@link CollectionViewGroup} object.
   *
   * For example, this template uses a checkbox element as an expand/collapse toggle:
   *
   * ```html
   * <MultiRowCell header="Country" binding="country">
   *   <MultiRowCellTemplate
   *       cellType="GroupHeader"
   *       template={ (context) => {
   *          return <React.Fragment>
   *            <input type="checkbox"
   *                checked={context.row.isCollapsed}
   *                onChange={e =>
   *                    context.row.isCollapsed = e.target.checked as boolean
   *                } />
   *            {context.item.name} ({context.item.items.length} items)
   *          </React.Fragment>
   *          }
   *        }
   *   />
   * </MultiRowCell>
   * ```
   *
   * <b>Group</b>
   *
   * Defines a template for a regular cell (not a group header) in a {@link GroupRow}. Must be a child of the
   * {@link wijmo.react.grid.multirow.MultiRowCell} component. This cell type has an additional <b>context.value</b>
   * property. In cases where columns have the <b>aggregate</b> property specified, it contains the unformatted
   * aggregate value.
   *
   * For example, this template shows aggregate's value and kind for group row cells in the "Sales"
   * column:
   *
   * ```html
   * <MultiRowCell header="Sales" binding="sales" aggregate="Avg">
   *   <MultiRowCellTemplate
   *       cellType="Group"
   *       template={ (context) => {
   *          return <React.Fragment>
   *            Average: {wjcCore.Globalize.formatNumber(context.value, 'N0')}
   *          </React.Fragment>
   *          }
   *        }
   *   />
   * </MultiRowCell>
   * ```
   *
   * <b>NewCellTemplate</b>
   *
   * Defines a cell in a new row template. Must be a child of the {@link wijmo.react.grid.multirow.MultiRowCell} component.
   * Note that the <b>context.item</b> property is undefined for this type of a cell.
   * For example, this cell template shows a placeholder in the Date column's cell in the "new row" item:
   *
   * ```html
   * <MultiRowCell header="Date" binding="date">
   *   <MultiRowCellTemplate
   *       cellType="NewCellTemplate"
   *       template={ (context) => 'Enter a date here' } />
   * </MultiRowCell>
   * ```
   */
    class MultiRowCellTemplate extends FlexGridCellTemplate {
        readonly template: MultiRowCellTemplateRender;
    }
    interface IMultiRowCellTemplateContext extends ICellTemplateContext {
        col: wijmo.grid.multirow.MultiRowCell;
    }
    type MultiRowCellTemplateRender = (context: IMultiRowCellTemplateContext) => any;
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.sheet.FlexSheet} control.
     *
     * The <b>flex-sheet</b> component may contain
     * a {@link wijmo.react.grid.sheet.Sheet} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.sheet.FlexSheet} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexSheet extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            newRowAtTop?: any;
            allowAddNew?: any;
            allowDelete?: any;
            allowDragging?: any;
            allowMerging?: any;
            allowResizing?: any;
            allowSorting?: any;
            allowPinning?: any;
            autoScroll?: any;
            autoRowHeights?: any;
            autoSizeMode?: any;
            autoGenerateColumns?: any;
            autoSearch?: any;
            caseSensitiveSearch?: any;
            quickAutoSize?: any;
            bigCheckboxes?: any;
            childItemsPath?: any;
            groupHeaderFormat?: any;
            headersVisibility?: any;
            showSelectedHeaders?: any;
            showMarquee?: any;
            showPlaceholders?: any;
            itemFormatter?: any;
            isReadOnly?: any;
            imeEnabled?: any;
            mergeManager?: any;
            selectionMode?: any;
            showGroups?: any;
            showSort?: any;
            showDropDown?: any;
            showAlternatingRows?: any;
            showErrors?: any;
            alternatingRowStep?: any;
            itemValidator?: any;
            validateEdits?: any;
            treeIndent?: any;
            itemsSource?: any;
            autoClipboard?: any;
            expandSelectionOnCopyPaste?: any;
            frozenRows?: any;
            frozenColumns?: any;
            cloneFrozenCells?: any;
            deferResizing?: any;
            sortRowIndex?: any;
            editColumnIndex?: any;
            stickyHeaders?: any;
            preserveSelectedState?: any;
            preserveOutlineState?: any;
            preserveWhiteSpace?: any;
            keyActionTab?: any;
            keyActionEnter?: any;
            rowHeaderPath?: any;
            virtualizationThreshold?: any;
            anchorCursor?: any;
            lazyRender?: any;
            refreshOnEdit?: any;
            copyHeaders?: any;
            columnGroups?: any;
            allowAutoFill?: any;
            isTabHolderVisible?: any;
            showFilterIcons?: any;
            enableDragDrop?: any;
            enableFormulas?: any;
            selectedSheetIndex?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            beginningEdit?: any;
            cellEditEnded?: any;
            cellEditEnding?: any;
            prepareCellForEdit?: any;
            formatItem?: any;
            resizingColumn?: any;
            resizedColumn?: any;
            autoSizingColumn?: any;
            autoSizedColumn?: any;
            draggingColumn?: any;
            draggingColumnOver?: any;
            draggedColumn?: any;
            sortingColumn?: any;
            sortedColumn?: any;
            pinningColumn?: any;
            pinnedColumn?: any;
            resizingRow?: any;
            resizedRow?: any;
            autoSizingRow?: any;
            autoSizedRow?: any;
            draggingRow?: any;
            draggingRowOver?: any;
            draggedRow?: any;
            deletingRow?: any;
            deletedRow?: any;
            loadingRows?: any;
            loadedRows?: any;
            rowEditStarting?: any;
            rowEditStarted?: any;
            rowEditEnding?: any;
            rowEditEnded?: any;
            rowAdded?: any;
            groupCollapsedChanging?: any;
            groupCollapsedChanged?: any;
            columnGroupCollapsedChanging?: any;
            columnGroupCollapsedChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            selectionChanging?: any;
            selectionChanged?: any;
            scrollPositionChanged?: any;
            updatingView?: any;
            updatedView?: any;
            updatingLayout?: any;
            updatedLayout?: any;
            pasting?: any;
            pasted?: any;
            pastingCell?: any;
            pastedCell?: any;
            copying?: any;
            copied?: any;
            draggingRowColumn?: any;
            droppingRowColumn?: any;
            beginDroppingRowColumn?: any;
            endDroppingRowColumn?: any;
            loaded?: any;
            unknownFunction?: any;
            sheetCleared?: any;
            prepareChangingRow?: any;
            prepareChangingColumn?: any;
            rowChanged?: any;
            columnChanged?: any;
            autoFilling?: any;
            autoFilled?: any;
            selectedSheetChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.grid.sheet.Sheet} class.
     *
     * The <b>sheet</b> component should be contained in
     * a {@link wijmo.react.grid.sheet.FlexSheet} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.sheet.Sheet} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Sheet extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            name?: any;
            itemsSource?: any;
            visible?: any;
            rowCount?: any;
            columnCount?: any;
            initialized?: any;
            nameChanged?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.transposed.TransposedGrid} control.
     *
     * The <b>transposed-grid</b> component may contain
     * a {@link wijmo.react.grid.transposed.TransposedGridRow} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.transposed.TransposedGrid} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class TransposedGrid extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            autoGenerateRows?: any;
            isDisabled?: any;
            tabOrder?: any;
            newRowAtTop?: any;
            allowAddNew?: any;
            allowDelete?: any;
            allowDragging?: any;
            allowMerging?: any;
            allowResizing?: any;
            allowSorting?: any;
            allowPinning?: any;
            autoScroll?: any;
            autoRowHeights?: any;
            autoSizeMode?: any;
            autoGenerateColumns?: any;
            autoSearch?: any;
            caseSensitiveSearch?: any;
            quickAutoSize?: any;
            bigCheckboxes?: any;
            childItemsPath?: any;
            groupHeaderFormat?: any;
            headersVisibility?: any;
            showSelectedHeaders?: any;
            showMarquee?: any;
            showPlaceholders?: any;
            itemFormatter?: any;
            isReadOnly?: any;
            imeEnabled?: any;
            mergeManager?: any;
            selectionMode?: any;
            showGroups?: any;
            showSort?: any;
            showDropDown?: any;
            showAlternatingRows?: any;
            showErrors?: any;
            alternatingRowStep?: any;
            itemValidator?: any;
            validateEdits?: any;
            treeIndent?: any;
            itemsSource?: any;
            autoClipboard?: any;
            expandSelectionOnCopyPaste?: any;
            frozenRows?: any;
            frozenColumns?: any;
            cloneFrozenCells?: any;
            deferResizing?: any;
            sortRowIndex?: any;
            editColumnIndex?: any;
            stickyHeaders?: any;
            preserveSelectedState?: any;
            preserveOutlineState?: any;
            preserveWhiteSpace?: any;
            keyActionTab?: any;
            keyActionEnter?: any;
            rowHeaderPath?: any;
            virtualizationThreshold?: any;
            anchorCursor?: any;
            lazyRender?: any;
            refreshOnEdit?: any;
            copyHeaders?: any;
            columnGroups?: any;
            rowGroups?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            beginningEdit?: any;
            cellEditEnded?: any;
            cellEditEnding?: any;
            prepareCellForEdit?: any;
            formatItem?: any;
            resizingColumn?: any;
            resizedColumn?: any;
            autoSizingColumn?: any;
            autoSizedColumn?: any;
            draggingColumn?: any;
            draggingColumnOver?: any;
            draggedColumn?: any;
            sortingColumn?: any;
            sortedColumn?: any;
            pinningColumn?: any;
            pinnedColumn?: any;
            resizingRow?: any;
            resizedRow?: any;
            autoSizingRow?: any;
            autoSizedRow?: any;
            draggingRow?: any;
            draggingRowOver?: any;
            draggedRow?: any;
            deletingRow?: any;
            deletedRow?: any;
            loadingRows?: any;
            loadedRows?: any;
            rowEditStarting?: any;
            rowEditStarted?: any;
            rowEditEnding?: any;
            rowEditEnded?: any;
            rowAdded?: any;
            groupCollapsedChanging?: any;
            groupCollapsedChanged?: any;
            columnGroupCollapsedChanging?: any;
            columnGroupCollapsedChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            selectionChanging?: any;
            selectionChanged?: any;
            scrollPositionChanged?: any;
            updatingView?: any;
            updatedView?: any;
            updatingLayout?: any;
            updatedLayout?: any;
            pasting?: any;
            pasted?: any;
            pastingCell?: any;
            pastedCell?: any;
            copying?: any;
            copied?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.grid.transposed.TransposedGridRow} class.
     *
     * The <b>transposed-grid-row</b> component should be contained in
     * a {@link wijmo.react.grid.transposed.TransposedGrid} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.transposed.TransposedGridRow} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class TransposedGridRow extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            name?: any;
            dataMap?: any;
            dataType?: any;
            binding?: any;
            sortMemberPath?: any;
            format?: any;
            cellTemplate?: any;
            header?: any;
            width?: any;
            maxLength?: any;
            minWidth?: any;
            maxWidth?: any;
            align?: any;
            allowDragging?: any;
            allowSorting?: any;
            allowResizing?: any;
            allowMerging?: any;
            aggregate?: any;
            isReadOnly?: any;
            cssClass?: any;
            cssClassAll?: any;
            isContentHtml?: any;
            isSelected?: any;
            visible?: any;
            wordWrap?: any;
            multiLine?: any;
            mask?: any;
            inputType?: any;
            isRequired?: any;
            showDropDown?: any;
            dataMapEditor?: any;
            dropDownCssClass?: any;
            quickAutoSize?: any;
            editor?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
        protected _initParent(): void;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.grid.transposedmultirow.TransposedMultiRow} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.grid.transposedmultirow.TransposedMultiRow} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class TransposedMultiRow extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            newRowAtTop?: any;
            allowAddNew?: any;
            allowDelete?: any;
            allowDragging?: any;
            allowMerging?: any;
            allowResizing?: any;
            allowSorting?: any;
            allowPinning?: any;
            autoScroll?: any;
            autoRowHeights?: any;
            autoSizeMode?: any;
            autoGenerateColumns?: any;
            autoSearch?: any;
            caseSensitiveSearch?: any;
            quickAutoSize?: any;
            bigCheckboxes?: any;
            childItemsPath?: any;
            groupHeaderFormat?: any;
            headersVisibility?: any;
            showSelectedHeaders?: any;
            showMarquee?: any;
            showPlaceholders?: any;
            itemFormatter?: any;
            isReadOnly?: any;
            imeEnabled?: any;
            mergeManager?: any;
            selectionMode?: any;
            showGroups?: any;
            showSort?: any;
            showDropDown?: any;
            showAlternatingRows?: any;
            showErrors?: any;
            alternatingRowStep?: any;
            itemValidator?: any;
            validateEdits?: any;
            treeIndent?: any;
            itemsSource?: any;
            autoClipboard?: any;
            expandSelectionOnCopyPaste?: any;
            frozenRows?: any;
            frozenColumns?: any;
            cloneFrozenCells?: any;
            deferResizing?: any;
            sortRowIndex?: any;
            editColumnIndex?: any;
            stickyHeaders?: any;
            preserveSelectedState?: any;
            preserveOutlineState?: any;
            preserveWhiteSpace?: any;
            keyActionTab?: any;
            keyActionEnter?: any;
            rowHeaderPath?: any;
            virtualizationThreshold?: any;
            anchorCursor?: any;
            lazyRender?: any;
            refreshOnEdit?: any;
            copyHeaders?: any;
            columnGroups?: any;
            layoutDefinition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            beginningEdit?: any;
            cellEditEnded?: any;
            cellEditEnding?: any;
            prepareCellForEdit?: any;
            formatItem?: any;
            resizingColumn?: any;
            resizedColumn?: any;
            autoSizingColumn?: any;
            autoSizedColumn?: any;
            draggingColumn?: any;
            draggingColumnOver?: any;
            draggedColumn?: any;
            sortingColumn?: any;
            sortedColumn?: any;
            pinningColumn?: any;
            pinnedColumn?: any;
            resizingRow?: any;
            resizedRow?: any;
            autoSizingRow?: any;
            autoSizedRow?: any;
            draggingRow?: any;
            draggingRowOver?: any;
            draggedRow?: any;
            deletingRow?: any;
            deletedRow?: any;
            loadingRows?: any;
            loadedRows?: any;
            rowEditStarting?: any;
            rowEditStarted?: any;
            rowEditEnding?: any;
            rowEditEnded?: any;
            rowAdded?: any;
            groupCollapsedChanging?: any;
            groupCollapsedChanged?: any;
            columnGroupCollapsedChanging?: any;
            columnGroupCollapsedChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            selectionChanging?: any;
            selectionChanged?: any;
            scrollPositionChanged?: any;
            updatingView?: any;
            updatedView?: any;
            updatingLayout?: any;
            updatedLayout?: any;
            pasting?: any;
            pasted?: any;
            pastingCell?: any;
            pastedCell?: any;
            copying?: any;
            copied?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component that represents a {@link wijmo.grid.immutable.ImmutabilityProvider} in a {@link wijmo.react.grid.FlexGrid}.
     *
     * The {@link wijmo.react.grid.immutable.ImmutabilityProvider} component,
     * being added to a {@link wijmo.react.grid.FlexGrid} component,
     * allows the latter to perform data edits without mutating the underlying
     * data. Instead, this class provides a data change event, which can be used to dispatch
     * change actions to the global _Store_, such as a
     * <a href="https://redux.js.org/" target="_blank">Redux</a> _Store_.
     *
     * The controlled **FlexGrid** control should not specify its **itemsSource**. Instead, the
     * **itemsSource** property of this class instance should be assigned with the
     * immutable array from the _Store_, which grid will display and edit.
     *
     * When a user edits data via the grid,
     * the {@link wijmo.grid.immutable.ImmutabilityProvider.dataChanged} event is triggered,
     * bringing all the necessary information to you about the change (which item is affected,
     * if item was changed or added or deleted, and so on). This event should be used to dispatch
     * corresponding data change actions to the _Store_.
     *
     * Note that **FlexGrid** edits data on a row level basis, which means that you can change multiple
     * cell values in the same row, and only after you move focus out of the row, all the changes
     * to the row will be applied simultaneously. Or you can press the _Cancel_ key to cancel all
     * the changes in the row. The same is true for adding a row into the datagrid.
     *
     * Note also that some changes like pasting a text into the datagrid, or deleting rows,
     * can affect multiple rows. In this case **ImmutabilityProvider** will trigger
     * the {@link wijmo.grid.immutable.ImmutabilityProvider.dataChanged} event
     * multiple times, separately for each affected row. This simplifies data change processing
     * in the _Store_ reducers.
     *
     * This example demonstrates a fully editable **FlexGrid** component, with an associated
     * **ImmutabilityProvider** component bound to an array from the _Redux Store_. The dataChanged
     * event handler dispatches corresponding data change actions to the _Store_.
     * The example assumes that _Redux Store_ data and action creator functions are bound
     * to the presentation component as properties, using the _react-redux_ _connect_ method.
     * ```typescript
     * import { DataChangeEventArgs, DataChangeAction } from '@grapecity/wijmo.grid.immutable';
     * import { ImmutabilityProvider } from '@grapecity/wijmo.react.grid.immutable';
     * import { FlexGrid } from '@grapecity/wijmo.react.grid';
     *
     * export class GridView extends React.Component<any, any> {
     *   render() {
     *     return <FlexGrid allowAddNew allowDelete>
     *        <ImmutabilityProvider
     *           itemsSource={this.props.items}
     *           dataChanged={this.onGridDataChanged} />
     *     </FlexGrid>
     *   }
     *   onGridDataChanged(s: ImmutabilityProvider, e: DataChangeEventArgs) {
     *       switch (e.action) {
     *           case DataChangeAction.Add:
     *               this.props.addItemAction(e.newItem);
     *               break;
     *           case DataChangeAction.Remove:
     *               this.props.removeItemAction(e.newItem, e.itemIndex);
     *               break;
     *           case DataChangeAction.Change:
     *               this.props.changeItemAction(e.newItem, e.itemIndex);
     *               break;
     *       }
     *   }
     * }
     * ```
     */
    class ImmutabilityProvider extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            itemsSource?: any;
            initialized?: any;
            dataChanged?: any;
            cloningItem?: any;
            [key: string]: any;
        };
        _parentInCtor: boolean;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.input.ListBox} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.ListBox} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The component includes a <b>wjItemTemplate</b> property which is used to define list item template.
     * The template is a function with single argument. The argument is a plain object with keys of
     * <b>control</b> (list control, owner of the list item),
     * <b>item</b> (item data for the list item) and
     * <b>itemIndex</b> (zero-based index of the list item).
     */
    class ListBox extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isContentHtml?: any;
            maxHeight?: any;
            selectedValuePath?: any;
            itemFormatter?: any;
            displayMemberPath?: any;
            checkedMemberPath?: any;
            caseSensitiveSearch?: any;
            itemsSource?: any;
            virtualizationThreshold?: any;
            showGroups?: any;
            selectedIndex?: any;
            selectedItem?: any;
            selectedValue?: any;
            checkedItems?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            formatItem?: any;
            itemsChanged?: any;
            itemChecked?: any;
            selectedIndexChanged?: any;
            checkedItemsChanged?: any;
            [key: string]: any;
        };
        wjItemTemplate: ItemTemplateRender;
        constructor(props: any);
        componentDidMount(): any;
    }
    /**
     * React component for the {@link wijmo.input.MultiSelectListBox} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.MultiSelectListBox} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class MultiSelectListBox extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            itemsSource?: any;
            displayMemberPath?: any;
            selectedIndex?: any;
            isContentHtml?: any;
            showGroups?: any;
            checkOnFilter?: any;
            showFilterInput?: any;
            filterInputPlaceholder?: any;
            showSelectAllCheckbox?: any;
            selectAllLabel?: any;
            delay?: any;
            caseSensitiveSearch?: any;
            checkedMemberPath?: any;
            virtualizationThreshold?: any;
            checkedItems?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            selectedIndexChanged?: any;
            checkedItemsChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.ComboBox} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.ComboBox} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The component includes a <b>wjItemTemplate</b> property which is used to define list item template.
     * The template is a function with single argument. The argument is a plain object with keys of
     * <b>control</b> (list control, owner of the list item),
     * <b>item</b> (item data for the list item) and
     * <b>itemIndex</b> (zero-based index of the list item).
     */
    class ComboBox extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            displayMemberPath?: any;
            selectedValuePath?: any;
            headerPath?: any;
            isContentHtml?: any;
            isEditable?: any;
            handleWheel?: any;
            maxDropDownHeight?: any;
            maxDropDownWidth?: any;
            itemFormatter?: any;
            showGroups?: any;
            trimText?: any;
            caseSensitiveSearch?: any;
            virtualizationThreshold?: any;
            itemsSource?: any;
            text?: any;
            selectedIndex?: any;
            selectedItem?: any;
            selectedValue?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            itemsSourceChanged?: any;
            formatItem?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            selectedIndexChanged?: any;
            [key: string]: any;
        };
        wjItemTemplate: ItemTemplateRender;
        constructor(props: any);
        componentDidMount(): any;
    }
    /**
     * React component for the {@link wijmo.input.AutoComplete} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.AutoComplete} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class AutoComplete extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            displayMemberPath?: any;
            selectedValuePath?: any;
            headerPath?: any;
            isContentHtml?: any;
            isEditable?: any;
            handleWheel?: any;
            maxDropDownHeight?: any;
            maxDropDownWidth?: any;
            itemFormatter?: any;
            showGroups?: any;
            trimText?: any;
            caseSensitiveSearch?: any;
            virtualizationThreshold?: any;
            delay?: any;
            maxItems?: any;
            minLength?: any;
            cssMatch?: any;
            itemsSourceFunction?: any;
            searchMemberPath?: any;
            beginsWithSearch?: any;
            itemsSource?: any;
            text?: any;
            selectedIndex?: any;
            selectedItem?: any;
            selectedValue?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            itemsSourceChanged?: any;
            formatItem?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            selectedIndexChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.Calendar} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.Calendar} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Calendar extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            monthView?: any;
            showHeader?: any;
            itemFormatter?: any;
            itemValidator?: any;
            firstDayOfWeek?: any;
            max?: any;
            min?: any;
            formatYearMonth?: any;
            formatDayHeaders?: any;
            formatDays?: any;
            formatYear?: any;
            formatMonths?: any;
            selectionMode?: any;
            isReadOnly?: any;
            handleWheel?: any;
            repeatButtons?: any;
            showYearPicker?: any;
            value?: any;
            displayMonth?: any;
            monthCount?: any;
            showMonthPicker?: any;
            weeksBefore?: any;
            weeksAfter?: any;
            rangeEnd?: any;
            rangeMin?: any;
            rangeMax?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rangeChanged?: any;
            formatItem?: any;
            valueChanged?: any;
            displayMonthChanged?: any;
            rangeEndChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.ColorPicker} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.ColorPicker} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class ColorPicker extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            showAlphaChannel?: any;
            showColorString?: any;
            palette?: any;
            value?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            valueChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.InputMask} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputMask} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class InputMask extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            mask?: any;
            overwriteMode?: any;
            isRequired?: any;
            isReadOnly?: any;
            promptChar?: any;
            placeholder?: any;
            inputType?: any;
            rawValue?: any;
            value?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            valueChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.InputColor} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputColor} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class InputColor extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            showAlphaChannel?: any;
            showColorString?: any;
            value?: any;
            text?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            valueChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.MultiSelect} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.MultiSelect} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The component includes a <b>wjItemTemplate</b> property which is used to define list item template.
     * The template is a function with single argument. The argument is a plain object with keys of
     * <b>control</b> (list control, owner of the list item),
     * <b>item</b> (item data for the list item) and
     * <b>itemIndex</b> (zero-based index of the list item).
     */
    class MultiSelect extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            displayMemberPath?: any;
            selectedValuePath?: any;
            headerPath?: any;
            isContentHtml?: any;
            isEditable?: any;
            handleWheel?: any;
            maxDropDownHeight?: any;
            maxDropDownWidth?: any;
            itemFormatter?: any;
            showGroups?: any;
            trimText?: any;
            caseSensitiveSearch?: any;
            virtualizationThreshold?: any;
            checkedMemberPath?: any;
            maxHeaderItems?: any;
            headerFormat?: any;
            headerFormatter?: any;
            showSelectAllCheckbox?: any;
            selectAllLabel?: any;
            showFilterInput?: any;
            filterInputPlaceholder?: any;
            checkOnFilter?: any;
            delay?: any;
            itemsSource?: any;
            checkedItems?: any;
            text?: any;
            selectedIndex?: any;
            selectedItem?: any;
            selectedValue?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            itemsSourceChanged?: any;
            formatItem?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            selectedIndexChanged?: any;
            checkedItemsChanged?: any;
            [key: string]: any;
        };
        wjItemTemplate: ItemTemplateRender;
        constructor(props: any);
        componentDidMount(): any;
    }
    /**
     * React component for the {@link wijmo.input.MultiAutoComplete} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.MultiAutoComplete} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class MultiAutoComplete extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            displayMemberPath?: any;
            selectedValuePath?: any;
            headerPath?: any;
            isContentHtml?: any;
            isEditable?: any;
            handleWheel?: any;
            maxDropDownHeight?: any;
            maxDropDownWidth?: any;
            itemFormatter?: any;
            showGroups?: any;
            trimText?: any;
            caseSensitiveSearch?: any;
            virtualizationThreshold?: any;
            delay?: any;
            maxItems?: any;
            minLength?: any;
            cssMatch?: any;
            itemsSourceFunction?: any;
            searchMemberPath?: any;
            beginsWithSearch?: any;
            maxSelectedItems?: any;
            selectedItems?: any;
            itemsSource?: any;
            selectedMemberPath?: any;
            text?: any;
            selectedIndex?: any;
            selectedItem?: any;
            selectedValue?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            itemsSourceChanged?: any;
            formatItem?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            selectedIndexChanged?: any;
            selectedItemsChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.InputNumber} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputNumber} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class InputNumber extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            showSpinner?: any;
            repeatButtons?: any;
            max?: any;
            min?: any;
            step?: any;
            isRequired?: any;
            placeholder?: any;
            inputType?: any;
            format?: any;
            isReadOnly?: any;
            handleWheel?: any;
            value?: any;
            text?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            valueChanged?: any;
            textChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.InputDate} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputDate} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class InputDate extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            selectionMode?: any;
            format?: any;
            mask?: any;
            max?: any;
            min?: any;
            repeatButtons?: any;
            showYearPicker?: any;
            itemValidator?: any;
            itemFormatter?: any;
            monthCount?: any;
            handleWheel?: any;
            showMonthPicker?: any;
            showHeader?: any;
            weeksBefore?: any;
            weeksAfter?: any;
            rangeMin?: any;
            rangeMax?: any;
            separator?: any;
            alwaysShowCalendar?: any;
            predefinedRanges?: any;
            closeOnSelection?: any;
            text?: any;
            value?: any;
            rangeEnd?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            rangeChanged?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            valueChanged?: any;
            rangeEndChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.InputTime} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputTime} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class InputTime extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            displayMemberPath?: any;
            selectedValuePath?: any;
            headerPath?: any;
            isContentHtml?: any;
            isEditable?: any;
            handleWheel?: any;
            maxDropDownHeight?: any;
            maxDropDownWidth?: any;
            itemFormatter?: any;
            showGroups?: any;
            trimText?: any;
            caseSensitiveSearch?: any;
            virtualizationThreshold?: any;
            max?: any;
            min?: any;
            step?: any;
            format?: any;
            mask?: any;
            itemsSource?: any;
            text?: any;
            selectedIndex?: any;
            selectedItem?: any;
            selectedValue?: any;
            value?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            itemsSourceChanged?: any;
            formatItem?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            selectedIndexChanged?: any;
            valueChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.InputDateTime} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputDateTime} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class InputDateTime extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            selectionMode?: any;
            format?: any;
            mask?: any;
            max?: any;
            min?: any;
            repeatButtons?: any;
            showYearPicker?: any;
            itemValidator?: any;
            itemFormatter?: any;
            monthCount?: any;
            handleWheel?: any;
            showMonthPicker?: any;
            showHeader?: any;
            weeksBefore?: any;
            weeksAfter?: any;
            rangeMin?: any;
            rangeMax?: any;
            separator?: any;
            alwaysShowCalendar?: any;
            predefinedRanges?: any;
            closeOnSelection?: any;
            timeMax?: any;
            timeMin?: any;
            timeStep?: any;
            timeFormat?: any;
            text?: any;
            value?: any;
            rangeEnd?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            rangeChanged?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            valueChanged?: any;
            rangeEndChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.InputDateRange} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.InputDateRange} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class InputDateRange extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            selectionMode?: any;
            format?: any;
            mask?: any;
            max?: any;
            min?: any;
            repeatButtons?: any;
            showYearPicker?: any;
            itemValidator?: any;
            itemFormatter?: any;
            monthCount?: any;
            handleWheel?: any;
            showMonthPicker?: any;
            showHeader?: any;
            weeksBefore?: any;
            weeksAfter?: any;
            rangeMin?: any;
            rangeMax?: any;
            separator?: any;
            alwaysShowCalendar?: any;
            predefinedRanges?: any;
            closeOnSelection?: any;
            text?: any;
            value?: any;
            rangeEnd?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            rangeChanged?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            valueChanged?: any;
            rangeEndChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.input.Menu} control.
     *
     * The <b>menu</b> component may contain
     * the following child components:
     * {@link wijmo.react.input.MenuItem}
     * and {@link wijmo.react.input.MenuSeparator}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.Menu} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     *
     * The component includes a <b>wjItemTemplate</b> property which is used to define list item template.
     * The template is a function with single argument. The argument is a plain object with keys of
     * <b>control</b> (list control, owner of the list item),
     * <b>item</b> (item data for the list item) and
     * <b>itemIndex</b> (zero-based index of the list item).
     *
     * The component includes a <b>contextMenuOf</b> property which is used to assign context menu to elements or controls.
     * Value of the property can be id attribute of HTMLElement, reference or array of HTMLElement/ReactComponent.
     */
    class Menu extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isDroppedDown?: any;
            showDropDownButton?: any;
            autoExpandSelection?: any;
            placeholder?: any;
            dropDownCssClass?: any;
            isAnimated?: any;
            isReadOnly?: any;
            isRequired?: any;
            inputType?: any;
            clickAction?: any;
            displayMemberPath?: any;
            selectedValuePath?: any;
            headerPath?: any;
            isContentHtml?: any;
            isEditable?: any;
            handleWheel?: any;
            maxDropDownHeight?: any;
            maxDropDownWidth?: any;
            itemFormatter?: any;
            showGroups?: any;
            trimText?: any;
            caseSensitiveSearch?: any;
            virtualizationThreshold?: any;
            header?: any;
            commandParameterPath?: any;
            commandPath?: any;
            subItemsPath?: any;
            openOnHover?: any;
            closeOnLeave?: any;
            isButton?: any;
            itemsSource?: any;
            text?: any;
            selectedIndex?: any;
            selectedItem?: any;
            selectedValue?: any;
            value?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isDroppedDownChanging?: any;
            itemsSourceChanged?: any;
            formatItem?: any;
            isDroppedDownChanged?: any;
            textChanged?: any;
            selectedIndexChanged?: any;
            itemClicked?: any;
            [key: string]: any;
        };
        wjItemTemplate: ItemTemplateRender;
        private _definedHeader;
        private _value;
        private _contextMenuData;
        readonly contextMenuProp: string;
        constructor(props: any);
        value: any;
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        componentWillUnmount(): void;
        protected _createControl(): any;
        private _updateHeader;
        private _fmtItem;
        private _contextMenuGetElementsIfChanged;
        private _contextMenuGetElements;
        private _contextMenuBindListeners;
        private _contextMenuUnbindListeners;
    }
    /**
     * React component that represents an item in a {@link wijmo.react.input.Menu} control.
     *
     * The <b>menu-item</b> component should be contained in
     * a {@link wijmo.react.input.Menu} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link } class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class MenuItem extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            value?: any;
            cmd?: any;
            cmdParam?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        contentRoot: HTMLElement;
        value: any;
        cmd: any;
        cmdParam: any;
        constructor(props: any);
        protected _createControl(): any;
        _renderImpl(): any;
        added(toItem: HTMLElement): void;
    }
    /**
    * React component that represents an item separator in a {@link wijmo.react.input.Menu} control.
     *
     * The <b>menu-separator</b> component should be contained in
     * a {@link wijmo.react.input.Menu} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link } class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class MenuSeparator extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        contentRoot: HTMLElement;
        constructor(props: any);
        protected _createControl(): any;
        _renderImpl(): any;
        added(toItem: HTMLElement): void;
    }
    /**
     * TBD
     */
    interface ItemTemplateContext {
        control: wijmo.Control;
        item: any;
        itemIndex: number;
    }
    /**
     * TBD
     */
    type ItemTemplateRender = (context: ItemTemplateContext) => any;
    /**
     * React component for the {@link wijmo.input.Popup} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.Popup} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Popup extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            owner?: any;
            showTrigger?: any;
            hideTrigger?: any;
            fadeIn?: any;
            fadeOut?: any;
            isDraggable?: any;
            isResizable?: any;
            dialogResultEnter?: any;
            dialogResultSubmit?: any;
            modal?: any;
            removeOnHide?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            showing?: any;
            shown?: any;
            hiding?: any;
            hidden?: any;
            resizing?: any;
            sizeChanging?: any;
            sizeChanged?: any;
            resized?: any;
            dragging?: any;
            positionChanging?: any;
            positionChanged?: any;
            dragged?: any;
            [key: string]: any;
        };
        private _sEl;
        private _pEl;
        private _v17;
        constructor(props: any);
        componentDidMount(): void;
        componentWillUnmount(): void;
        _renderImpl(): any;
    }
    /**
     * React component for the {@link wijmo.input.CollectionViewNavigator} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.input.CollectionViewNavigator} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class CollectionViewNavigator extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            cv?: any;
            byPage?: any;
            headerFormat?: any;
            repeatButtons?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.olap.PivotGrid} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.PivotGrid} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class PivotGrid extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            newRowAtTop?: any;
            allowAddNew?: any;
            allowDelete?: any;
            allowDragging?: any;
            allowMerging?: any;
            allowResizing?: any;
            allowSorting?: any;
            allowPinning?: any;
            autoScroll?: any;
            autoRowHeights?: any;
            autoSizeMode?: any;
            autoGenerateColumns?: any;
            autoSearch?: any;
            caseSensitiveSearch?: any;
            quickAutoSize?: any;
            bigCheckboxes?: any;
            childItemsPath?: any;
            groupHeaderFormat?: any;
            headersVisibility?: any;
            showSelectedHeaders?: any;
            showMarquee?: any;
            showPlaceholders?: any;
            itemFormatter?: any;
            isReadOnly?: any;
            imeEnabled?: any;
            mergeManager?: any;
            selectionMode?: any;
            showGroups?: any;
            showSort?: any;
            showDropDown?: any;
            showAlternatingRows?: any;
            showErrors?: any;
            alternatingRowStep?: any;
            itemValidator?: any;
            validateEdits?: any;
            treeIndent?: any;
            itemsSource?: any;
            autoClipboard?: any;
            expandSelectionOnCopyPaste?: any;
            frozenRows?: any;
            frozenColumns?: any;
            cloneFrozenCells?: any;
            deferResizing?: any;
            sortRowIndex?: any;
            editColumnIndex?: any;
            stickyHeaders?: any;
            preserveSelectedState?: any;
            preserveOutlineState?: any;
            preserveWhiteSpace?: any;
            keyActionTab?: any;
            keyActionEnter?: any;
            rowHeaderPath?: any;
            virtualizationThreshold?: any;
            anchorCursor?: any;
            lazyRender?: any;
            refreshOnEdit?: any;
            copyHeaders?: any;
            columnGroups?: any;
            showDetailOnDoubleClick?: any;
            customContextMenu?: any;
            collapsibleSubtotals?: any;
            centerHeadersVertically?: any;
            showColumnFieldHeaders?: any;
            showRowFieldHeaders?: any;
            showValueFieldHeaders?: any;
            outlineMode?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            beginningEdit?: any;
            cellEditEnded?: any;
            cellEditEnding?: any;
            prepareCellForEdit?: any;
            formatItem?: any;
            resizingColumn?: any;
            resizedColumn?: any;
            autoSizingColumn?: any;
            autoSizedColumn?: any;
            draggingColumn?: any;
            draggingColumnOver?: any;
            draggedColumn?: any;
            sortingColumn?: any;
            sortedColumn?: any;
            pinningColumn?: any;
            pinnedColumn?: any;
            resizingRow?: any;
            resizedRow?: any;
            autoSizingRow?: any;
            autoSizedRow?: any;
            draggingRow?: any;
            draggingRowOver?: any;
            draggedRow?: any;
            deletingRow?: any;
            deletedRow?: any;
            loadingRows?: any;
            loadedRows?: any;
            rowEditStarting?: any;
            rowEditStarted?: any;
            rowEditEnding?: any;
            rowEditEnded?: any;
            rowAdded?: any;
            groupCollapsedChanging?: any;
            groupCollapsedChanged?: any;
            columnGroupCollapsedChanging?: any;
            columnGroupCollapsedChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            selectionChanging?: any;
            selectionChanged?: any;
            scrollPositionChanged?: any;
            updatingView?: any;
            updatedView?: any;
            updatingLayout?: any;
            updatedLayout?: any;
            pasting?: any;
            pasted?: any;
            pastingCell?: any;
            pastedCell?: any;
            copying?: any;
            copied?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.olap.PivotChart} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.PivotChart} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class PivotChart extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            chartType?: any;
            showHierarchicalAxes?: any;
            showTotals?: any;
            showTitle?: any;
            showLegend?: any;
            legendPosition?: any;
            stacking?: any;
            maxSeries?: any;
            maxPoints?: any;
            itemsSource?: any;
            header?: any;
            footer?: any;
            headerStyle?: any;
            footerStyle?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.olap.PivotPanel} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.PivotPanel} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class PivotPanel extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            autoGenerateFields?: any;
            viewDefinition?: any;
            engine?: any;
            itemsSource?: any;
            showFieldIcons?: any;
            restrictDragging?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            itemsSourceChanged?: any;
            viewDefinitionChanged?: any;
            updatingView?: any;
            updatedView?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.olap.Slicer} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.olap.Slicer} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Slicer extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            field?: any;
            showHeader?: any;
            header?: any;
            showCheckboxes?: any;
            multiSelect?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.viewer.ReportViewer} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.viewer.ReportViewer} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class ReportViewer extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            serviceUrl?: any;
            filePath?: any;
            fullScreen?: any;
            zoomFactor?: any;
            zoomMode?: any;
            mouseMode?: any;
            viewMode?: any;
            requestHeaders?: any;
            parameters?: any;
            paginated?: any;
            reportName?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            pageIndexChanged?: any;
            queryLoadingData?: any;
            beforeSendRequest?: any;
            fullScreenChanged?: any;
            zoomFactorChanged?: any;
            zoomModeChanged?: any;
            mouseModeChanged?: any;
            viewModeChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.viewer.PdfViewer} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.viewer.PdfViewer} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class PdfViewer extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            serviceUrl?: any;
            filePath?: any;
            fullScreen?: any;
            zoomFactor?: any;
            zoomMode?: any;
            mouseMode?: any;
            viewMode?: any;
            requestHeaders?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            pageIndexChanged?: any;
            queryLoadingData?: any;
            beforeSendRequest?: any;
            fullScreenChanged?: any;
            zoomFactorChanged?: any;
            zoomModeChanged?: any;
            mouseModeChanged?: any;
            viewModeChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.nav.TreeView} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.TreeView} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class TreeView extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            childItemsPath?: any;
            displayMemberPath?: any;
            imageMemberPath?: any;
            checkedMemberPath?: any;
            isContentHtml?: any;
            showCheckboxes?: any;
            autoCollapse?: any;
            isAnimated?: any;
            isReadOnly?: any;
            allowDragging?: any;
            checkOnClick?: any;
            expandOnClick?: any;
            collapseOnClick?: any;
            expandOnLoad?: any;
            lazyLoadFunction?: any;
            itemsSource?: any;
            selectedItem?: any;
            selectedNode?: any;
            checkedItems?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            itemsSourceChanged?: any;
            loadingItems?: any;
            loadedItems?: any;
            itemClicked?: any;
            isCollapsedChanging?: any;
            isCollapsedChanged?: any;
            isCheckedChanging?: any;
            isCheckedChanged?: any;
            formatItem?: any;
            dragStart?: any;
            dragOver?: any;
            drop?: any;
            dragEnd?: any;
            nodeEditStarting?: any;
            nodeEditStarted?: any;
            nodeEditEnding?: any;
            nodeEditEnded?: any;
            selectedItemChanged?: any;
            checkedItemsChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.nav.TabPanel} control.
     *
     * The <b>tab-panel</b> component may contain
     * a {@link wijmo.react.nav.Tab} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.TabPanel} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class TabPanel extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isAnimated?: any;
            autoSwitch?: any;
            selectedIndex?: any;
            selectedTab?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            selectedIndexChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        protected _createControl(): any;
        componentDidMount(): void;
    }
    /**
     * React component for the {@link wijmo.nav.Tab} class.
     *
     * The <b>tab</b> component should be contained in
     * a {@link wijmo.react.nav.TabPanel} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.Tab} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Tab extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            isVisible?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
        protected _createControl(): any;
        protected _renderImpl(): any;
    }
    /**
     * React component for the {@link wijmo.nav.Accordion} control.
     *
     * The <b>accordion</b> component may contain
     * a {@link wijmo.react.nav.AccordionPane} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.Accordion} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class Accordion extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            isAnimated?: any;
            autoSwitch?: any;
            selectedIndex?: any;
            selectedPane?: any;
            showIcons?: any;
            allowCollapseAll?: any;
            allowExpandMany?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            selectedIndexChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        protected _createControl(): any;
        componentDidMount(): void;
    }
    /**
     * React component for the {@link wijmo.nav.AccordionPane} class.
     *
     * The <b>accordion-pane</b> component should be contained in
     * a {@link wijmo.react.nav.Accordion} component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.nav.AccordionPane} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class AccordionPane extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            isVisible?: any;
            isCollapsed?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
        protected _createControl(): any;
        protected _renderImpl(): any;
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.barcode.common.Codabar} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Codabar} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeCodabar extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            showLabel?: any;
            checkDigit?: any;
            labelPosition?: any;
            nwRatio?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.Ean8} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Ean8} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeEan8 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.Ean13} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Ean13} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeEan13 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            addOn?: any;
            addOnHeight?: any;
            addOnLabelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.Code39} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Code39} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeCode39 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            showLabel?: any;
            checkDigit?: any;
            fullAscii?: any;
            labelPosition?: any;
            nwRatio?: any;
            labelWithStartAndStopCharacter?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.Code128} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Code128} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeCode128 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            showLabel?: any;
            codeSet?: any;
            labelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.Gs1_128} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.Gs1_128} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1_128 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            showLabel?: any;
            labelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.UpcA} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.UpcA} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeUpcA extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            addOn?: any;
            labelPosition?: any;
            addOnHeight?: any;
            addOnLabelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.UpcE0} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.UpcE0} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeUpcE0 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            addOn?: any;
            labelPosition?: any;
            addOnHeight?: any;
            addOnLabelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.UpcE1} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.UpcE1} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeUpcE1 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            addOn?: any;
            labelPosition?: any;
            addOnHeight?: any;
            addOnLabelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.common.QrCode} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.common.QrCode} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeQrCode extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            charCode?: any;
            charset?: any;
            model?: any;
            version?: any;
            errorCorrectionLevel?: any;
            mask?: any;
            connection?: any;
            connectionIndex?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.barcode.composite.Gs1DataBarOmnidirectional} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarOmnidirectional} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1DataBarOmnidirectional extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            linkage?: any;
            linkageVersion?: any;
            linkageHeight?: any;
            hideLinkageText?: any;
            hideAiText?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.Gs1DataBarTruncated} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarTruncated} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1DataBarTruncated extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            linkage?: any;
            linkageVersion?: any;
            linkageHeight?: any;
            hideLinkageText?: any;
            hideAiText?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.Gs1DataBarStacked} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarStacked} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1DataBarStacked extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            linkage?: any;
            linkageVersion?: any;
            linkageHeight?: any;
            hideLinkageText?: any;
            hideAiText?: any;
            ratio?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.Gs1DataBarStackedOmnidirectional} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarStackedOmnidirectional} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1DataBarStackedOmnidirectional extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            linkage?: any;
            linkageVersion?: any;
            linkageHeight?: any;
            hideLinkageText?: any;
            hideAiText?: any;
            ratio?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.Gs1DataBarLimited} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarLimited} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1DataBarLimited extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            linkage?: any;
            linkageVersion?: any;
            linkageHeight?: any;
            hideLinkageText?: any;
            hideAiText?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.Gs1DataBarExpanded} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarExpanded} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1DataBarExpanded extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            linkage?: any;
            linkageVersion?: any;
            linkageHeight?: any;
            hideLinkageText?: any;
            hideAiText?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.Gs1DataBarExpandedStacked} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Gs1DataBarExpandedStacked} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeGs1DataBarExpandedStacked extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            linkage?: any;
            linkageVersion?: any;
            linkageHeight?: any;
            hideLinkageText?: any;
            hideAiText?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            rowCount?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.Pdf417} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.Pdf417} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodePdf417 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            errorCorrectionLevel?: any;
            columns?: any;
            rows?: any;
            compact?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.composite.MicroPdf417} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.composite.MicroPdf417} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeMicroPdf417 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            dimensions?: any;
            compactionMode?: any;
            structuredAppend?: any;
            segmentIndex?: any;
            fileId?: any;
            optionalFields?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.barcode.specialized.DataMatrixEcc000} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.DataMatrixEcc000} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeDataMatrixEcc000 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            version?: any;
            symbolSize?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.specialized.DataMatrixEcc200} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.DataMatrixEcc200} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeDataMatrixEcc200 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            symbolSize?: any;
            encodingMode?: any;
            structuredAppend?: any;
            structureNumber?: any;
            fileIdentifier?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.specialized.Code49} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Code49} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeCode49 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            grouping?: any;
            groupIndex?: any;
            labelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.specialized.Code93} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Code93} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeCode93 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            showLabel?: any;
            checkDigit?: any;
            fullAscii?: any;
            labelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.specialized.Itf14} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Itf14} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeItf14 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            nwRatio?: any;
            bearerBar?: any;
            labelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.specialized.Interleaved2of5} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.Interleaved2of5} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeInterleaved2of5 extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            autoWidth?: any;
            autoWidthZoom?: any;
            showLabel?: any;
            nwRatio?: any;
            bearerBar?: any;
            labelPosition?: any;
            checkCharacter?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.barcode.specialized.JapanesePostal} control.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.barcode.specialized.JapanesePostal} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class BarcodeJapanesePostal extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            value?: any;
            quietZone?: any;
            renderType?: any;
            color?: any;
            backgroundColor?: any;
            hideExtraChecksum?: any;
            font?: any;
            showLabel?: any;
            labelPosition?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            isValidChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare module wijmo.react {
    /**
     * React component for the {@link wijmo.chart.map.FlexMap} control.
     *
     * The <b>flex-map</b> component may contain
     * the following child components:
     * {@link wijmo.react.chart.FlexChartLegend}
     * , {@link wijmo.react.chart.map.ScatterMapLayer}
     * , {@link wijmo.react.chart.map.GeoMapLayer}
     * and {@link wijmo.react.chart.map.GeoGridLayer}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.FlexMap} control it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class FlexMap extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            isDisabled?: any;
            tabOrder?: any;
            binding?: any;
            footer?: any;
            header?: any;
            selectionMode?: any;
            palette?: any;
            plotMargin?: any;
            footerStyle?: any;
            headerStyle?: any;
            tooltipContent?: any;
            itemsSource?: any;
            center?: any;
            zoom?: any;
            initialized?: any;
            gotFocus?: any;
            lostFocus?: any;
            refreshing?: any;
            refreshed?: any;
            invalidInput?: any;
            rendering?: any;
            rendered?: any;
            selectionChanged?: any;
            itemsSourceChanging?: any;
            itemsSourceChanged?: any;
            [key: string]: any;
        };
        constructor(props: any);
        componentDidMount(): any;
        componentDidUpdate(prevProps: any): void;
        private _setExtra;
    }
    /**
     * React component for the {@link wijmo.chart.map.ScatterMapLayer} class.
     *
     * The <b>scatter-map-layer</b> component should be contained in
     * a {@link wijmo.react.chart.map.FlexMap} component.
     *
     * The <b>scatter-map-layer</b> component may contain
     * a {@link wijmo.react.chart.map.ColorScale} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.ScatterMapLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class ScatterMapLayer extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            style?: any;
            itemsSource?: any;
            url?: any;
            symbolSize?: any;
            symbolMinSize?: any;
            symbolMaxSize?: any;
            binding?: any;
            initialized?: any;
            itemsSourceChanged?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.map.GeoMapLayer} class.
     *
     * The <b>geo-map-layer</b> component should be contained in
     * a {@link wijmo.react.chart.map.FlexMap} component.
     *
     * The <b>geo-map-layer</b> component may contain
     * a {@link wijmo.react.chart.map.ColorScale} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.GeoMapLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class GeoMapLayer extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            style?: any;
            itemsSource?: any;
            url?: any;
            itemFormatter?: any;
            initialized?: any;
            itemsSourceChanged?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.map.GeoGridLayer} class.
     *
     * The <b>geo-grid-layer</b> component should be contained in
     * a {@link wijmo.react.chart.map.FlexMap} component.
     *
     * The <b>geo-grid-layer</b> component may contain
     * a {@link wijmo.react.chart.map.ColorScale} child component.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.GeoGridLayer} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class GeoGridLayer extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            style?: any;
            itemsSource?: any;
            url?: any;
            initialized?: any;
            itemsSourceChanged?: any;
            [key: string]: any;
        };
        _parentProp: string;
        _siblingId: string;
        constructor(props: any);
    }
    /**
     * React component for the {@link wijmo.chart.map.ColorScale} class.
     *
     * The <b>color-scale</b> component should be contained in
     * one of the following components:
     * {@link wijmo.react.chart.map.ScatterMapLayer}
     * , {@link wijmo.react.chart.map.GeoMapLayer}
     *  or {@link wijmo.react.chart.map.GeoGridLayer}.
     *
     * The component supports all properties and events of the pure JavaScript {@link wijmo.chart.map.ColorScale} class it represents.
     *
     * The component includes an <b>initialized</b> event that is raised when the control is initialized after it is added to the page.
     * You can use this event to perform further initialization in addition to setting properties in JSX.
     * The signature of the handler function is the same as any other Wijmo event handlers.
     */
    class ColorScale extends ComponentBase {
        props: {
            template?: any;
            children?: any;
            scale?: any;
            binding?: any;
            colorUnknown?: any;
            colors?: any;
            format?: any;
            initialized?: any;
            [key: string]: any;
        };
        _parentProp: string;
        constructor(props: any);
    }
}
declare module wijmo.react {
}
declare var Wj: typeof wijmo.react;
