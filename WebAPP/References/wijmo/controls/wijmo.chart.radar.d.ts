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
declare module wijmo.chart.radar {
    /**
     * Represents a series of data points to display in the chart.
     *
     * The {@link FlexRadarSeries} class supports all basic chart types. You may define
     * a different chart type on each {@link FlexRadarSeries} object that you add to the
     * {@link FlexRadar} series collection. This overrides the {@link chartType}
     * property set on the chart that is the default for all {@link FlexRadarSeries} objects
     * in its collection.
     */
    class FlexRadarSeries extends wijmo.chart.SeriesBase {
        private _finChartType;
        /**
         * Gets or sets the chart type for a specific series, overriding the chart type
         * set on the overall chart. Please note that ColumnVolume, EquiVolume,
         * CandleVolume and ArmsCandleVolume chart types are not supported and should be
         * set on the {@link FinancialChart}.
         */
        chartType: RadarChartType;
        _getChartType(): wijmo.chart.ChartType;
    }
}
declare module wijmo.chart.radar {
    /**
     * Line/scatter radar chart plotter.
     */
    class _RadarLinePlotter extends wijmo.chart._LinePlotter {
        isArea: boolean;
        _getLabelPoint(series: any, dataPoint: wijmo.chart._DataPoint): wijmo.Point;
        plotSeries(engine: wijmo.chart.IRenderEngine, ax: wijmo.chart._IAxis, ay: wijmo.chart._IAxis, series: wijmo.chart._ISeries, palette: wijmo.chart._IPalette, iser: number, nser: number): void;
    }
}
declare module wijmo.chart.radar {
    /**
     * Column(Rose) radar chart plotter.
     */
    class _RadarBarPlotter extends wijmo.chart._BarPlotter {
        adjustLimits(dataInfo: wijmo.chart._DataInfo, plotRect: wijmo.Rect): wijmo.Rect;
        _getLabelPoint(series: any, dataPoint: wijmo.chart._DataPoint): wijmo.Point;
        plotSeries(engine: wijmo.chart.IRenderEngine, ax: wijmo.chart._IAxis, ay: wijmo.chart._IAxis, series: wijmo.chart._ISeries, palette: wijmo.chart._IPalette, iser: number, nser: number): void;
    }
}
declare module wijmo.chart.radar {
    /**
     * Specifies the type of radar chart.
     */
    enum RadarChartType {
        /** Shows vertical bars and allows you to compare values of items across categories. */
        Column = 0,
        /** Shows patterns within the data using X and Y coordinates. */
        Scatter = 1,
        /** Shows trends over a period of time or across categories. */
        Line = 2,
        /** Shows line chart with a symbol on each data point. */
        LineSymbols = 3,
        /** Shows line chart with the area below the line filled with color. */
        Area = 4
    }
    /**
     * radar chart control.
     */
    class FlexRadar extends wijmo.chart.FlexChartCore {
        private _chartType;
        private _startAngle;
        private _totalAngle;
        private _reversed;
        _center: wijmo.Point;
        _radius: number;
        _angles: number[];
        _isPolar: boolean;
        _areas: any[];
        private __radarLinePlotter;
        private __radarColumnPlotter;
        /**
         * Initializes a new instance of the {@link FlexRadar} class.
         *
         * @param element The DOM element that hosts the control, or a selector for the
         * host element (e.g. '#theCtrl').
         * @param options A JavaScript object containing initialization data for the
         * control.
         */
        constructor(element: any, options?: any);
        private readonly _radarLinePlotter;
        private readonly _radarColumnPlotter;
        _initAxes(): void;
        _layout(rect: wijmo.Rect, size: wijmo.Size, engine: wijmo.chart.IRenderEngine): void;
        /**
         * Gets or sets the type of radar chart to be created.
         */
        chartType: RadarChartType;
        /**
         * Gets or sets the starting angle for the radar, in degrees.
         *
         * Angles are measured clockwise, starting at the 12 o'clock position.
         */
        startAngle: number;
        /**
         * Gets or sets the total angle for the radar, in degrees.  Its default value is 360.
         * The value must be greater than 0, or less than or equal to 360.
         */
        totalAngle: number;
        /**
         * Gets or sets a value that determines whether angles are reversed
         * (counter-clockwise).
         *
         * The default value is false, which causes angles to be measured in
         * the clockwise direction.
         */
        reversed: boolean;
        /**
         * Gets or sets a value that determines whether and how the series objects are stacked.
         */
        stacking: wijmo.chart.Stacking;
        onRendered(e: wijmo.chart.RenderEventArgs): void;
        _getChartType(): wijmo.chart.ChartType;
        _getPlotter(series: FlexRadarSeries): wijmo.chart._IPlotter;
        _convertPoint(radius: any, angle: any): Point;
        _createSeries(): wijmo.chart.SeriesBase;
        _clearCachedValues(): void;
        _performBind(): void;
        _prepareRender(): void;
    }
}
declare module wijmo.chart.radar {
    /**
     * Represents an axis in the radar chart.
     */
    class FlexRadarAxis extends wijmo.chart.Axis {
        private _points;
        private _axisLabels;
        _height: number;
        private __actualMin;
        private __actualMax;
        _render(e: wijmo.chart.IRenderEngine): void;
        _renderLabels(e: wijmo.chart.IRenderEngine): void;
        _getHeight(engine: wijmo.chart.IRenderEngine, maxw: number): number;
        _getActualRange(): number;
        _updateActualLimits(dataType: wijmo.DataType, dataMin: number, dataMax: number, labels?: string[], values?: number[]): void;
        _updateActualLimitsByChartType(labels: any, min: any, max: any): {
            min: any;
            max: any;
        };
        _isOverlapped(engine: wijmo.chart.IRenderEngine, w: number, lblClass: string, axisType: wijmo.chart.AxisType): boolean;
        /**
         * Converts the specified value from data to pixel coordinates.
         *
         * @param val The data value to convert.
         * @param maxValue The max value of the data, it's optional.
         * @param minValue The min value of the data, it's optional.
         */
        convert(val: number, maxValue?: number, minValue?: number): number;
        _renderLineAndTitle(engine: any): void;
        _renderPolygon(engine: any, r: any, cls: any): void;
        _renderMinors(engine: wijmo.chart.IRenderEngine, ticks: number[], isVert: boolean, isNear: boolean): void;
        private _drawMinorTickLength;
        _renderLabelsAndTicks(engine: any, index: any, val: any, sval: any, labelAngle: any, tickMarks: any, showLabel: any, t1: any, t2: any): boolean;
        private _renderXGridLine;
        private _renderXTick;
        private _renderYGridLine;
        private _getXLabelVAlign;
        private _getXLabelAlign;
        _createTimeLabels(start: number, len: number, vals: number[], lbls: string[]): void;
        _niceNumber(x: number, exp: number, round: boolean): number;
    }
}
declare module wijmo.chart.radar {
}
