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
declare module wijmo.chart.interaction {
    /**
         * Specifies the mouse action of the chart gestures.
         */
    enum MouseAction {
        /** Zoom chart by mouse. */
        Zoom = 0,
        /** Pan chart by mouse. */
        Pan = 1
    }
    /**
         * Specifies the interactive axes of the chart gestures.
         */
    enum InteractiveAxes {
        /** Interactive Axis X. */
        X = 0,
        /** Interactive Axis Y. */
        Y = 1,
        /** Interactive Both Axis X and Axis Y. */
        XY = 2
    }
    /**
     * The {@link ChartGestures} control allows the user to zoom or pan on
     * the specified {@link FlexChart}.
     *
     * To use the {@link ChartGestures} control, specify the {@link FlexChart}
     * control on which to zoom or pan.
     *
     * <pre>
     *  var chartGestures = new ChartGestures(chart);
     * </pre>
     */
    class ChartGestures {
        static _CSS_ZOOM: string;
        static _CSS_ZOOM_OVERLAY: string;
        static _CSS_PANABLE: string;
        static _CSS_TOUCH_DISABLED: string;
        static _CSS_BLOCK_INTERACTION: string;
        private _chart;
        private _zoomEle;
        private _overlayEle;
        private _zoomEleOffset;
        private _wrapperMousedown;
        private _wrapperMouseMove;
        private _wrapperMouseup;
        private _wrapperPointerdown;
        private _wrapperPointerMove;
        private _wrapperPointerup;
        private _wrapperTouchStart;
        private _wrapperTouchMove;
        private _wrapperTouchEnd;
        private _wrapperMouseWheel;
        private _plotBox;
        private _startFirstPt;
        private _minX;
        private _maxX;
        private _minY;
        private _maxY;
        private _seriesGroup;
        private _threadHold;
        private _scaling;
        private _panning;
        private _startDistance;
        private _clip;
        private _selection;
        private _startPointers;
        private _mvPointers;
        private _plotOffset;
        private _endPoint;
        private _pinchStartEvents;
        private _minXRange;
        private _minYRange;
        private _innerUpdating;
        private _lastMinX;
        private _lastMaxX;
        private _lastMinY;
        private _lastMaxY;
        private _mouseAction;
        private _interactiveAxes;
        private _enable;
        private _scaleX;
        private _scaleY;
        private _posX;
        private _posY;
        /**
         * Initializes a new instance of the {@link ChartGestures} class.
         *
         * @param chart The {@link FlexChart} that allows the user to zoom or pan.
         * @param options A JavaScript object containing initialization data for the control.
         */
        constructor(chart: wijmo.chart.FlexChartCore, options?: any);
        /**
             * Gets or sets the mouse action of the ChartGestures.
             */
        mouseAction: MouseAction;
        /**
             * Gets or sets the interactive axes of the ChartGestures.
             */
        interactiveAxes: InteractiveAxes;
        /**
             * Gets or sets the enable of the ChartGestures.
             */
        enable: boolean;
        /**
             * Gets or sets the initial scale of axis X.
             * The scale should be more than 0 and less than or equal to 1.
             * The scale specifies which part of the range between Min and Max
             * is shown. When scale is 1 (default value), the whole axis range
             * is visible.
             */
        scaleX: number;
        /**
             * Gets or sets the initial scale of axis Y.
             * The scale should be more than 0 and less than or equal to 1.
             * The scale specifies which part of the range between Min and Max
             * is shown. When scale is 1 (default value), the whole axis range
             * is visible.
             */
        scaleY: number;
        /**
             * Gets or sets the initial position of the axis X.
             * The value represents initial position on the axis when the Scale
             * is less than 1. Otherwise, the Value has no effect. The Value should
             * lie between 0 to 1.
         */
        posX: number;
        /**
             * Gets or sets the initial position of the axis Y.
             * The value represents initial position on the axis when the Scale
             * is less than 1. Otherwise, the Value has no effect. The Value should
             * lie between 0 to 1.
         */
        posY: number;
        /**
         * Removes the {@link ChartGestures} control from the chart.
         */
        remove(): void;
        /**
         * Reset the axis of the chart.
         */
        reset(): void;
        /**
         * Refreshes the {@link FlexChart} with the gestures settings.
         */
        _refreshChart(): void;
        private _initialize;
        private _switchEvent;
        private _refresh;
        /** mouse event*/
        private _onMousedown;
        private _onMouseMove;
        private _onMouseup;
        private _onMouseWheel;
        private _mouseDown;
        private _mouseMove;
        private _mouseup;
        /** ms pointer event*/
        private _onPointerdown;
        private _onPointerMove;
        private _onPointerup;
        private _pointerDown;
        private _pointerMove;
        private _pointerUp;
        /** touch event*/
        private _onTouchStart;
        private _onTouchMove;
        private _onTouchEnd;
        /** help method of zooming chart by mouse */
        private _initOverlay;
        private _updateOverLay;
        _updatePoint(mvPt: wijmo.Point): void;
        _pointInPlotArea(mvPt: wijmo.Point): boolean;
        private _zoomedChart;
        private _zoomedAxis;
        private _panningChart;
        private _pannedChart;
        private _scalingChart;
        private _scaledChart;
        private _updateAxisByDistance;
        private _updateAxisByChg;
        private _initAxisRangeWithPosAndScale;
        private _updateAxisRange;
        private _reset;
        private _getAxisMin;
        private _getAxisMax;
        private _getTransFormGroups;
        private _disabledOthersInteraction;
        private _getPoint;
        private _getTouchPair;
        private _touchDistance;
    }
}
declare module wijmo.chart.interaction {
    /**
     * Range Slider.
     */
    class _RangeSlider {
        private static _HRANGESLIDER;
        private static _VRANGESLIDER;
        private static _RANGESLIDER_DECBTN;
        private static _RANGESLIDER_INCBTN;
        private static _RANGESLIDER_RANGEHANDLE;
        private static _RANGESLIDER_MINHANDLE;
        private static _RANGESLIDER_MAXHANDLE;
        private static _RANGESLIDER_HANDLE_ACTIVE;
        private _isVisible;
        private _buttonsVisible;
        private _minScale;
        private _maxScale;
        private _seamless;
        private _rsContainer;
        private _rsEle;
        private _decBtn;
        private _incBtn;
        private _rsContent;
        private _minHandler;
        private _rangeHandler;
        private _maxHandler;
        private _wrapperSliderMousedown;
        private _wrapperDocMouseMove;
        private _wrapperDocMouseup;
        private _wrapperBtnMousedown;
        private _wrapperRangeSpaceMousedown;
        private _wrapperRangeMouseleave;
        private _isTouch;
        private _slidingInterval;
        private _rangeSliderRect;
        private _isHorizontal;
        private _isBtnMousedown;
        private _needSpaceClick;
        private _hasButtons;
        private _movingEle;
        private _movingOffset;
        private _range;
        private _plotBox;
        private _startPt;
        _minPos: number;
        _maxPos: number;
        constructor(container: HTMLElement, needSpaceClick: boolean, hasButtons?: boolean, options?: any);
        /**
         * Gets or sets whether the increase/decrease buttons are displayed or not.
         */
        buttonsVisible: boolean;
        /**
         * Gets or sets the orientation of the range slider.
         */
        isHorizontal: boolean;
        /**
         * Gets or sets the visibility of the range slider.
         */
        isVisible: boolean;
        /**
         * Gets or sets the minimum range scale of the range slider.
         */
        minScale: number;
        /**
         * Gets or sets the maximum range scale of the range slider.
         */
        maxScale: number;
        /**
         * Gets or sets a value that determines whether the min/max elements
         * may be reversed by dragging one over the other.
         */
        seamless: boolean;
        /**
        * Occurs after the range changes.
        */
        readonly rangeChanged: Event<_RangeSlider, EventArgs>;
        /**
         * Raises the {@link rangeChanged} event.
         */
        onRangeChanged(e?: wijmo.EventArgs): void;
        /**
        * Occurs while the range is changing.
        */
        readonly rangeChanging: Event<_RangeSlider, EventArgs>;
        /**
         * Raises the {@link rangeChanging} event.
         */
        onRangeChanging(e?: wijmo.EventArgs): void;
        readonly _isSliding: boolean;
        readonly _handleWidth: number;
        private _createSlider;
        private _switchEvent;
        private _onSliderMousedown;
        private _onDocMouseMove;
        private _onMove;
        private _onDocMouseup;
        private _onRangeSpaceMousedown;
        private _onRangeMouseleave;
        private _onBtnMousedown;
        _refresh(rsRect?: any): void;
        private _updateElesPosition;
        private _refreshSlider;
        private _invalidate;
        private _changeRange;
        private _doSliding;
        private _setSlidingInterval;
        private _clearInterval;
        private _getRsRect;
    }
}
declare module wijmo.chart.interaction {
    /**
    * Specifies the orientation of the range selector.
    */
    enum Orientation {
        /** Horizontal, x-data range. */
        X = 0,
        /** Vertical, y-data range. */
        Y = 1
    }
    /**
     * The {@link RangeSelector} control displays a range selector that allows the user to
     * choose the range of data to display on the specified {@link FlexChart}.
     *
     * To use the {@link RangeSelector} control, specify the {@link FlexChart}
     * control to display the selected range of data.
     *
     * The {@link rangeChanged} event is fired when there is a change in min or max value.
     * For example:
     * <pre>
     *  var rangeSelector = new RangeSelector(chart);
     *  rangeSelector.rangeChanged.addHandler(function () {
     *     // perform related updates
     *     // e.g. modify displayed range of another chart
     *     update(rangeSelector.min, rangeSelector.max);
     *   });
     * </pre>
     */
    class RangeSelector {
        private _isVisible;
        private _min;
        private _max;
        private _orientation;
        private _seamless;
        private _minScale;
        private _maxScale;
        private _chart;
        private _rangeSelectorEle;
        private _rangeSlider;
        /**
         * Initializes a new instance of the {@link RangeSelector} class.
         *
         * @param chart The {@link FlexChart} that displays the selected range.
         * @param options A JavaScript object containing initialization data for the control.
         */
        constructor(chart: wijmo.chart.FlexChartCore, options?: any);
        /**
         * Gets or sets the visibility of the range selector.
         */
        isVisible: boolean;
        /**
         * Gets or sets the minimum value of the range.
         * If not set, the minimum is calculated automatically.
         */
        min: number;
        /**
         * Gets or sets the maximum value of the range.
         * If not set, the maximum is calculated automatically.
         */
        max: number;
        /**
         * Gets or sets the orientation of the range selector.
         */
        orientation: Orientation;
        /**
         * Gets or sets a value that determines whether the min/max elements
         * may be reversed by dragging one over the other.
         */
        seamless: boolean;
        /**
         * Gets or sets the minimum amount of data that can be selected,
         * as a percentage of the overall chart range.
         * This property must be set to a value between zero and one.
         */
        minScale: number;
        /**
         * Gets or sets the maximum amount of data that can be selected,
         * as a percentage of the total range.
         * This property must be set to a value between zero and one.
         */
        maxScale: number;
        /**
         * Removes the {@link RangeSelector} control from the chart.
         */
        remove(): void;
        /**
         * Occurs after the range changes.
         */
        rangeChanged: Event<RangeSelector, EventArgs>;
        /**
         * Raises the {@link rangeChanged} event.
         */
        onRangeChanged(e?: wijmo.EventArgs): void;
        private _createRangeSelector;
        private _switchEvent;
        private _refresh;
        private _adjustMinAndMax;
        private _updateMinAndMaxWithScale;
        private _changeRange;
        private _updateRange;
        private _getMinAndMax;
    }
}
declare module wijmo.chart.interaction {
}
