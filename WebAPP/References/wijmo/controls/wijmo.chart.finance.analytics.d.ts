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
declare module wijmo.chart.finance.analytics {
    /**
     * Represents a Fibonacci Retracements tool for the {@link FinancialChart}.
    
        * The tool enables the calculation and plotting of various alert levels that are
        * useful in financial charts.
        *
        * To add Fibonacci tool to a {@link FinancialChart} control, create an instance
        * of the {@link Fibonacci} and add it to the <b>series</b> collection of the chart.
        * For example:
        *
        * <pre>
        * // create chart
        * var chart = new FinancialChart('#chartElement');
        * // create Fibonacci tool
        * var ftool = new Fibonacci();
        * chart.series.push(ftool);
        * </pre>
        */
    class Fibonacci extends wijmo.chart.SeriesBase {
        private _high;
        private _low;
        private _minX;
        private _maxX;
        private _actualHigh;
        private _actualLow;
        private _levels;
        private _uptrend;
        private _labelPosition;
        /**
         * Initializes a new instance of the {@link Fibonacci} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the low value of {@link Fibonacci} tool.
         *
         * If not specified, the low value is calculated based on data values provided by <b>itemsSource</b>.
         */
        low: number;
        /**
         * Gets or sets the high value of {@link Fibonacci} tool.
         *
         * If not specified, the high value is caclulated based on
         * data values provided by the <b>itemsSource</b>.
         */
        high: number;
        /**
         * Gets or sets the label position for levels in {@link Fibonacci} tool.
         */
        labelPosition: wijmo.chart.LabelPosition;
        /**
         * Gets or sets a value indicating whether to create uptrending {@link Fibonacci} tool.
         *
         * Default value is true(uptrend). If the value is false, the downtrending levels are plotted.
         */
        uptrend: boolean;
        /**
         * Gets or sets the array of levels for plotting.
         *
         * Default value is [0, 23.6, 38.2, 50, 61.8, 100].
         */
        levels: number[];
        /**
         * Gets or sets the x minimal value of the {@link Fibonacci} tool.
         *
         * If not specified, current minimum of x-axis is used.
         * The value can be specified as a number or Date object.
         */
        minX: any;
        /**
         * Gets or sets the x maximum value of the {@link Fibonacci} tool.
         *
         * If not specified, current maximum of x-axis is used.
         * The value can be specified as a number or Date object.
         */
        maxX: any;
        private _getMinX;
        private _getMaxX;
        private _updateLevels;
        private _render;
        _getChartType(): wijmo.chart.ChartType;
    }
    /**
     * Represents a Fibonacci Arcs tool for the {@link FinancialChart}.
     */
    class FibonacciArcs extends wijmo.chart.SeriesBase {
        private _start;
        private _end;
        private _levels;
        private _labelPosition;
        /**
         * Initializes a new instance of the {@link FibonacciArcs} class.
         *
         * @param options A JavaScript object containing initialization data.
         */
        constructor(options?: any);
        /**
         * Gets or sets the starting {@link DataPoint} for the base line.
         *
         * The {@link DataPoint} x value can be a number or a Date object
         * (for time-based data).
         *
         * Unlike some of the other Fibonacci tools, the starting
         * {@link DataPoint} is <b>not</b> calculated automatically if
         * undefined.
         */
        start: wijmo.chart.DataPoint;
        /**
         * Gets or sets the ending {@link DataPoint} for the base line.
         *
         * The {@link DataPoint} x value can be a number or a Date object
         * (for time-based data).
         *
         * Unlike some of the other Fibonacci tools, the ending
         * {@link DataPoint} is <b>not</b> calculated automatically if
         * undefined.
         */
        end: wijmo.chart.DataPoint;
        /**
         * Gets or sets the array of levels for plotting.
         *
         * Default value is [38.2, 50, 61.8].
         */
        levels: number[];
        /**
         * Gets or sets the {@link LabelPosition} for levels in {@link FibonacciArcs} tool.
         */
        labelPosition: wijmo.chart.LabelPosition;
        _render(sender: wijmo.chart.SeriesBase, args: wijmo.chart.RenderEventArgs): void;
        private _getX;
        private _getY;
        _getChartType(): wijmo.chart.ChartType;
    }
    /**
     * Represents a Fibonacci Fans tool for the {@link FinancialChart}.
     */
    class FibonacciFans extends wijmo.chart.SeriesBase {
        private _start;
        private _end;
        private _levels;
        private _labelPosition;
        /**
         * Initializes a new instance of the {@link FibonacciFans} class.
         *
         * @param options A JavaScript object containing initialization data.
         */
        constructor(options?: any);
        /**
         * Gets or sets the starting {@link DataPoint} for the base line.
         *
         * If not set, the starting {@link DataPoint} is calculated automatically.
         * The {@link DataPoint} x value can be a number or a Date object (for
         * time-based data).
         */
        start: wijmo.chart.DataPoint;
        /**
         * Gets or sets the ending {@link DataPoint} for the base line.
         *
         * If not set, the starting {@link DataPoint} is calculated automatically.
         * The {@link DataPoint} x value can be a number or a Date object (for
         * time-based data).
         */
        end: wijmo.chart.DataPoint;
        /**
         * Gets or sets the array of levels for plotting.
         *
         * Default value is [0, 23.6, 38.2, 50, 61.8, 100].
         */
        levels: number[];
        /**
         * Gets or sets the {@link LabelPosition} for levels in {@link FibonacciFans} tool.
         */
        labelPosition: wijmo.chart.LabelPosition;
        _updateLevels(): void;
        _render(sender: wijmo.chart.SeriesBase, args: wijmo.chart.RenderEventArgs): void;
        private _getX;
        private _getY;
        _getChartType(): wijmo.chart.ChartType;
    }
    /**
     * Represents a Fibonacci Time Zones tool for the {@link FinancialChart}.
     */
    class FibonacciTimeZones extends wijmo.chart.SeriesBase {
        private _startX;
        private _endX;
        private _levels;
        private _labelPosition;
        /**
         * Initializes a new instance of the {@link FibonacciTimeZones} class.
         *
         * @param options A JavaScript object containing initialization data.
         */
        constructor(options?: any);
        /**
         * Gets or sets the starting X data point for the time zones.
         *
         * If not set, the starting X data point is calculated automatically. The
         * value can be a number or a Date object (for time-based data).
         */
        startX: any;
        /**
         * Gets or sets the ending X data point for the time zones.
         *
         * If not set, the ending X data point is calculated automatically. The
         * value can be a number or a Date object (for time-based data).
         */
        endX: any;
        /**
         * Gets or sets the array of levels for plotting.
         *
         * Default value is [0, 1, 2, 3, 5, 8, 13, 21, 34].
         */
        levels: number[];
        /**
         * Gets or sets the {@link LabelPosition} for levels in {@link FibonacciTimeZones} tool.
         */
        labelPosition: wijmo.chart.LabelPosition;
        _render(sender: wijmo.chart.SeriesBase, args: wijmo.chart.RenderEventArgs): void;
        _updateLevels(): void;
        private _getX;
        _getChartType(): wijmo.chart.ChartType;
    }
}
declare module wijmo.chart.finance.analytics {
    /**
     * Base class for overlay and indicator series (abstract).
     */
    class OverlayIndicatorBase extends wijmo.chart.SeriesBase {
        private __hitTester;
        _styles: any;
        _seriesCount: number;
        /**
         * Initializes a new instance of the {@link OverlayIndicatorBase} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        readonly _hitTester: wijmo.chart._HitTester;
        _getChartType(): wijmo.chart.ChartType;
        _getXValues(): number[];
        _getDataPoint(dataX: number, dataY: number, seriesIndex: number, pointIndex: number, ax: wijmo.chart.Axis, ay: wijmo.chart.Axis): wijmo.chart._DataPoint;
        _shouldCalculate(): boolean;
        _init(): void;
        _calculate(): void;
        _clearValues(): void;
        _getName(dim: number): string;
        _getStyles(dim: number): any;
        legendItemLength(): number;
        measureLegendItem(engine: wijmo.chart.IRenderEngine, index: number): wijmo.Size;
        drawLegendItem(engine: wijmo.chart.IRenderEngine, rect: wijmo.Rect, index: number): void;
    }
    /**
     * Base class for overlay and indicator series that render a single series (abstract).
     */
    class SingleOverlayIndicatorBase extends OverlayIndicatorBase {
        private _period;
        _xvals: number[];
        _yvals: number[];
        /**
         * Initializes a new instance of the {@link SingleOverlayIndicatorBase} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the period for the calculation as an integer value.
         */
        period: any;
        getValues(dim: number): number[];
        getDataRect(currentRect?: wijmo.Rect, calculatedRect?: wijmo.Rect): wijmo.Rect;
        _clearValues(): void;
        _shouldCalculate(): boolean;
        _init(): void;
        _getItem(pointIndex: number): any;
    }
}
declare module wijmo.chart.finance.analytics {
    /**
     * Represents a Willaims %R indicator series for the {@link FinancialChart}.
     *
     * Williams %R is a momentum indicator that is the inverse of a fast stochastic
     * oscillator ({@link Stochastic}).  The Williams %R indicator is designed to
     * tell whether an asset is trading near the high or low of its trading range.
     */
    class WilliamsR extends SingleOverlayIndicatorBase {
        /**
         * Initializes a new instance of the {@link WilliamsR} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        _calculate(): void;
    }
    function _williamsR(highs: number[], lows: number[], closes: number[], period: number): number[];
}
declare module wijmo.chart.finance.analytics {
    /**
     * Represents a Stochastic Oscillator indicator series for the {@link FinancialChart}.
     *
     * Stochastic oscillators are momentum indicators designed to predict price turning
     * points by comparing an asset's closing price to its high-low range.
     *
     * The {@link Stochastic} series can be used for fast (default), slow and full stochastic
     * oscillators.  To create a slow or full stochastic oscillator, set the {@link smoothingPeriod}
     * to an integer value greater than one; slow stochastic oscillators generally use a fixed
     * {@link smoothingPeriod} of three.  To create or revert to a fast stochastic oscillator, set the
     * {@link smoothingPeriod} to an integer value of one.
     */
    class Stochastic extends OverlayIndicatorBase {
        private _kVals;
        private _kXVals;
        private _dVals;
        private _dXVals;
        private _kPeriod;
        private _dPeriod;
        private _smoothingPeriod;
        /**
         * Initializes a new instance of the {@link Stochastic} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the period for the %K calculation.
         */
        kPeriod: number;
        /**
         * Gets or sets the period for the %D simple moving average.
         */
        dPeriod: number;
        /**
         * Gets or sets the smoothing period for full %K.
         */
        smoothingPeriod: number;
        /**
         * Gets or sets the styles for the %K and %D lines.
         *
         * The following options are supported:
         *
         * <pre>series.styles = {
         *   kLine: {
         *      stroke: 'red',
         *      strokeWidth: 1
         *   },
         *   dLine: {
         *      stroke: 'green',
         *      strokeWidth: 1
         *   },
         * }</pre>
         */
        styles: any;
        getDataRect(currentRect?: wijmo.Rect, calculatedRect?: wijmo.Rect): wijmo.Rect;
        _clearValues(): void;
        _shouldCalculate(): boolean;
        _init(): void;
        _calculate(): void;
        private _rendering;
        getCalculatedValues(key: string): any[];
    }
    function _stochastic(highs: number[], lows: number[], closes: number[], kPeriod: number, dPeriod: number, smoothingPeriod: number): any;
}
declare module wijmo.chart.finance.analytics {
    /**
     * Represents a Relative Strength Index indicator series for the {@link FinancialChart}.
     *
     * Relative strength index is a momentum oscillator designed to measure the current
     * and historical strength or weakness of an asset based on the closing prices of a
     * recent trading period.
     */
    class RSI extends SingleOverlayIndicatorBase {
        /**
         * Initializes a new instance of the {@link RSI} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        _calculate(): void;
    }
    function _rsi(ys: number[], period: number): number[];
}
declare module wijmo.chart.finance.analytics {
    /**
     * Base class for {@link Macd} and {@link MacdHistogram} series (abstract).
     */
    class MacdBase extends OverlayIndicatorBase {
        _macdXVals: number[];
        _macdVals: number[];
        _signalXVals: number[];
        _signalVals: number[];
        _histogramXVals: number[];
        _histogramVals: number[];
        private _fastPeriod;
        private _slowPeriod;
        private _smoothingPeriod;
        /**
         * Initializes a new instance of the {@link MacdBase} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the fast exponential moving average period
         * for the MACD line.
         */
        fastPeriod: number;
        /**
         * Gets or sets the slow exponential moving average period
         * for the MACD line.
         */
        slowPeriod: number;
        /**
         * Gets or sets the exponential moving average period
         * for the signal line.
         */
        smoothingPeriod: number;
        _clearValues(): void;
        _shouldCalculate(): boolean;
        _init(): void;
        _calculate(): void;
    }
    /**
     * Represents a Moving Average Convergence/Divergence (MACD) indicator series
     * for the {@link FinancialChart}.
     *
     * The MACD indicator is designed to reveal changes in strength, direction, momentum,
     * and duration of an asset's price trend.
     */
    class Macd extends MacdBase {
        /**
         * Initializes a new instance of the {@link Macd} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the styles for the MACD and Signal lines.
         *
         * The following options are supported:
         *
         * <pre>series.styles = {
         *   macdLine: {
         *      stroke: 'red',
         *      strokeWidth: 1
         *   },
         *   signalLine: {
         *      stroke: 'green',
         *      strokeWidth: 1
         *   },
         * }</pre>
         */
        styles: any;
        legendItemLength(): number;
        getDataRect(currentRect?: wijmo.Rect, calculatedRect?: wijmo.Rect): wijmo.Rect;
        private _rendering;
        getCalculatedValues(key: string): any[];
    }
    /**
     * Represents a Moving Average Convergence/Divergence (MACD) Histogram indicator series
     * for the {@link FinancialChart}.
     *
     * The MACD indicator is designed to reveal changes in strength, direction, momentum,
     * and duration of an asset's price trend.
     */
    class MacdHistogram extends MacdBase {
        /**
         * Initializes a new instance of the {@link MacdHistogram} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        getValues(dim: number): number[];
        getDataRect(currentRect?: wijmo.Rect, calculatedRect?: wijmo.Rect): wijmo.Rect;
        _getChartType(): wijmo.chart.ChartType;
        _getItem(pointIndex: number): any;
    }
    function _macd(ys: number[], fastPeriod: number, slowPeriod: number, smoothingPeriod: number): any;
}
declare module wijmo.chart.finance.analytics {
    enum MovingAverageType {
        Simple = 0,
        Exponential = 1
    }
    /**
     * Represents a Moving Average Envelopes overlay series for the {@link FinancialChart}.
     *
     * Moving average envelopes are moving averages set above and below a standard moving
     * average.  The amount above/below the standard moving average is percentage based and
     * dictated by the {@link size} property.
     */
    class Envelopes extends OverlayIndicatorBase {
        private _upperYVals;
        private _lowerYVals;
        private _xVals;
        private _period;
        private _type;
        private _size;
        /**
         * Initializes a new instance of the {@link Envelopes} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the period for the calculation as an integer value.
         */
        period: any;
        /**
         * Gets or sets the moving average type for the
         * envelopes.  The default value is Simple.
         */
        type: MovingAverageType;
        /**
         * Gets or set the size of the moving average
         * envelopes.  The default value is 2.5 percent (0.025).
         */
        size: number;
        getDataRect(currentRect?: wijmo.Rect, calculatedRect?: wijmo.Rect): wijmo.Rect;
        _clearValues(): void;
        _init(): void;
        _shouldCalculate(): boolean;
        _calculate(): void;
        private _rendering;
        getCalculatedValues(key: string): any[];
    }
}
declare module wijmo.chart.finance.analytics {
    /**
     * Represents a Commodity Channel Index indicator series for the {@link FinancialChart}.
     *
     * The commodity channel index is an oscillator that measures an asset's current price
     * level relative to an average price level over a specified period of time.
     */
    class CCI extends SingleOverlayIndicatorBase {
        private _constant;
        /**
         * Initializes a new instance of the {@link CCI} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the constant value for the CCI calculation.  The default
         * value is 0.015.
         */
        constant: number;
        _calculate(): void;
    }
    function _cci(highs: number[], lows: number[], closes: number[], period: number, constant: number): number[];
}
declare module wijmo.chart.finance.analytics {
    /**
     * Represents a Bollinger Bands&reg; overlay series for the {@link FinancialChart}.
     *
     * <i>Bollinger Bands is a registered trademark of John Bollinger.</i>
     */
    class BollingerBands extends OverlayIndicatorBase {
        private _upperYVals;
        private _middleYVals;
        private _lowerYVals;
        private _xVals;
        private _period;
        private _multiplier;
        /**
         * Initializes a new instance of the {@link BollingerBands} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the period for the calculation as an integer value.
         */
        period: any;
        /**
         * Gets or sets the standard deviation multiplier.
         */
        multiplier: number;
        getDataRect(currentRect?: wijmo.Rect, calculatedRect?: wijmo.Rect): wijmo.Rect;
        _clearValues(): void;
        _shouldCalculate(): boolean;
        _init(): void;
        _calculate(): void;
        private _rendering;
        getCalculatedValues(key: string): any[];
    }
    function _bollingerBands(ys: number[], period: number, multiplier: number): any;
}
declare module wijmo.chart.finance.analytics {
    /**
     * Represents an Average True Range indicator series for the {@link FinancialChart}.
     *
     * Average true range is used to measure the volatility of an asset. Average true range
     * does not provide any indication of the price's trend, but rather the degree of price
     * volatility.
     */
    class ATR extends SingleOverlayIndicatorBase {
        /**
         * Initializes a new instance of the {@link ATR} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        _calculate(): void;
    }
}
declare module wijmo.chart.finance.analytics {
}
