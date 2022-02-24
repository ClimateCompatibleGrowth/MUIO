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
declare module wijmo.chart.annotation {
    /**
     * Specifies the attachment of the annotation.
     */
    enum AnnotationAttachment {
        /**
        * Coordinates of the annotation point are defined by the data series index and
        * the data point index. */
        DataIndex = 0,
        /** Annotation point is specified in data coordinates. */
        DataCoordinate = 1,
        /** Annotation point is specified as a relative position inside the control where
        * (0,0) is the top left corner and (1,1) is the bottom right corner.*/
        Relative = 2,
        /** The annotation point is specified in control's pixel coordinates.  */
        Absolute = 3
    }
    /**
     * Specifies the position of the annotation.
     */
    enum AnnotationPosition {
        /** The annotation appears at the Center of the target point. */
        Center = 0,
        /** The annotation appears at the Top of the target point. */
        Top = 1,
        /** The annotation appears at the Bottom of the target point. */
        Bottom = 2,
        /** The annotation appears at the Left of the target point. */
        Left = 4,
        /** The annotation appears at the Right of the target point. */
        Right = 8
    }
    /**
     * Represents the base class of annotations for the {@link AnnotationLayer}.
     */
    class AnnotationBase {
        static _DATA_KEY: string;
        static _CSS_ANNOTATION: string;
        static _CSS_ANNO_TEXT: string;
        static _CSS_ANNO_SHAPE: string;
        private _attachment;
        private _point;
        private _seriesIndex;
        private _pointIndex;
        private _position;
        private _offset;
        private _style;
        private _isVisible;
        private _tooltip;
        private _name;
        _element: SVGElement;
        _layer: AnnotationLayer;
        /**
         * Initializes a new instance of the {@link AnnotationBase} class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the attachment of the annotation.
         */
        attachment: AnnotationAttachment;
        /**
         * Gets or sets the point of the annotation.
         * The coordinates of points depends on the {@link attachment} property.
         * See {@link AnnotationAttachment} for further description.
         */
        point: wijmo.chart.DataPoint;
        /**
         * Gets or sets the data series index of the annotation.
         * Applies only when the <b>attachment</b> property is set to DataIndex.
         */
        seriesIndex: number;
        /**
         * Gets or sets the data point index of the annotation.
         * Applies only when the <b>attachment</b> property is set to DataIndex.
         */
        pointIndex: number;
        /**
         * Gets or sets the position of the annotation.
         * The position is relative to the {@link point}.
         */
        position: AnnotationPosition;
        /**
         * Gets or sets the offset of the annotation from the {@link point}.
         */
        offset: wijmo.Point;
        /**
         * Gets or sets the style of the annotation.
         */
        style: any;
        /**
         * Gets or sets the visibility of the annotation.
         */
        isVisible: boolean;
        /**
         * Gets or sets the tooltip of the annotation.
         */
        tooltip: string;
        /**
         * Gets or sets the name of the annotation.
         */
        name: string;
        /**
         * Render this annotation.
         *
         * @param engine The engine to render annotation.
         */
        render(engine: wijmo.chart.IRenderEngine): void;
        /**
         * Destroy this annotation
         */
        destroy(): void;
        _copy(dst: any, src: any): void;
        _processOptions(key: any, dst: any, src: any): void;
        _resetDefaultValue(): void;
        _toggleVisibility(visible: boolean): void;
        _getCSSClass(): string;
        _render(engine: wijmo.chart.IRenderEngine): void;
        _repaint(): void;
        _convertPoint(pt?: wijmo.chart.DataPoint): wijmo.Point;
        _convertDataToLen(total: number, axis: wijmo.chart.Axis, val: any, converted?: boolean): number;
        _renderCenteredText(content: string, engine: wijmo.chart.IRenderEngine, point: wijmo.Point, className?: string, angle?: number, style?: any): void;
        _adjustOffset(pt: wijmo.Point, offset: wijmo.Point): void;
        _getOffset(engine?: wijmo.chart.IRenderEngine): wijmo.Point;
        _getPositionOffset(engine?: wijmo.chart.IRenderEngine): wijmo.Point;
        _getSize(engine?: wijmo.chart.IRenderEngine): wijmo.Size;
        _isValidPoint(pt: wijmo.Point): boolean;
        _measureString(engine: wijmo.chart.IRenderEngine, text: string, className: string): wijmo.Size;
    }
    /**
     * Represents a text annotation for the {@link AnnotationLayer}.
     */
    class Text extends AnnotationBase {
        static _CSS_TEXT: string;
        private _text;
        /**
         * Initializes a new instance of the {@link Text} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        /**
         * Gets or sets the text of the annotation.
         */
        text: string;
        _render(engine: wijmo.chart.IRenderEngine): void;
        _getSize(engine?: wijmo.chart.IRenderEngine): wijmo.Size;
    }
    /**
     * Represents a base class of shape annotations for the {@link AnnotationLayer}.
     */
    class Shape extends AnnotationBase {
        static _CSS_SHAPE: string;
        private _content;
        _shapeContainer: SVGGElement;
        /**
         * Initializes a new instance of the {@link Shape} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        /**
         * Gets or sets the text of the annotation.
         */
        content: string;
        _render(engine: wijmo.chart.IRenderEngine): void;
        _getContentCenter(): wijmo.chart.DataPoint;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _renderText(engine: wijmo.chart.IRenderEngine): void;
    }
    /**
     * Represents an ellipse annotation for {@link AnnotationLayer}.
     */
    class Ellipse extends Shape {
        static _CSS_ELLIPSE: string;
        private _width;
        private _height;
        /**
         * Initializes a new instance of the {@link Ellipse} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the width of the {@link Ellipse} annotation.
         */
        width: number;
        /**
         * Gets or sets the height of the {@link Ellipse} annotation.
         */
        height: number;
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _getSize(): wijmo.Size;
    }
    /**
     * Represents a rectangle annotation for {@link AnnotationLayer}.
     */
    class Rectangle extends Shape {
        static _CSS_RECTANGLE: string;
        private _width;
        private _height;
        /**
         * Initializes a new instance of the {@link Rectangle} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the width of the {@link Rectangle} annotation.
         */
        width: number;
        /**
         * Gets or sets the height of the {@link Rectangle} annotation.
         */
        height: number;
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _getSize(): wijmo.Size;
    }
    /**
     * Represents a line annotation for {@link AnnotationLayer}.
     */
    class Line extends Shape {
        static _CSS_LINE: string;
        private _start;
        private _end;
        private _cS;
        private _cE;
        /**
         * Initializes a new instance of the {@link Line} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the start point of the {@link Line} annotation.
         */
        start: wijmo.chart.DataPoint;
        /**
         * Gets or sets the end point of the Line annotation.
         */
        end: wijmo.chart.DataPoint;
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        _getContentCenter(): wijmo.chart.DataPoint;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _getSize(): wijmo.Size;
        _renderText(engine: wijmo.chart.IRenderEngine): void;
        _renderCenteredText(content: string, engine: wijmo.chart.IRenderEngine, point: wijmo.Point, className?: string, angle?: number, style?: any): void;
    }
    /**
     * Represents a polygon annotation for {@link AnnotationLayer}.
     */
    class Polygon extends Shape {
        static _CSS_POLYGON: string;
        private _points;
        /**
         * Initializes a new instance of the {@link Polygon} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        _processOptions(key: any, dst: any, src: any): void;
        /**
         * Gets the collection of points of the {@link Polygon} annotation.
         */
        readonly points: wijmo.collections.ObservableArray;
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        _getContentCenter(): wijmo.chart.DataPoint;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _getSize(): wijmo.Size;
    }
    /**
     * Represents a circle annotation for {@link AnnotationLayer}.
     */
    class Circle extends Shape {
        static _CSS_CIRCLE: string;
        private _radius;
        /**
         * Initializes a new instance of the {@link Circle} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
         * Gets or sets the radius of the {@link Circle} annotation.
         */
        radius: number;
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _getSize(): wijmo.Size;
    }
    /**
     * Represents a square annotation for the {@link AnnotationLayer}.
     */
    class Square extends Shape {
        static _CSS_SQUARE: string;
        private _length;
        /**
         * Initializes a new instance of the {@link Square} annotation class.
         *
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(options?: any);
        /**
            * Gets or sets the length of the {@link Square} annotation.
            */
        length: number;
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _getSize(): wijmo.Size;
    }
    /**
        * Represents an image annotation for {@link AnnotationLayer}.
        */
    class Image extends Shape {
        static _CSS_IMAGE: string;
        private _width;
        private _height;
        private _href;
        /**
            * Initializes a new instance of the {@link Image} annotation class.
            *
            * @param options JavaScript object containing initialization data for the object.
            */
        constructor(options?: any);
        /**
            * Gets or sets the width of the {@link Image} annotation.
            */
        width: number;
        /**
            * Gets or sets the height of the {@link Image} annotation.
            */
        height: number;
        /**
            * Gets or sets the href of the {@link Image} annotation.
            */
        href: string;
        _resetDefaultValue(): void;
        _getCSSClass(): string;
        _renderShape(engine: wijmo.chart.IRenderEngine): void;
        _getSize(): wijmo.Size;
        private _applyStyle;
        private _deCase;
    }
}
declare module wijmo.chart.annotation {
    /**
     * Represents an annotation layer for {@link FlexChart} and {@link FinancialChart}.
     *
     * The AnnotationLayer contains a collection of various annotation elements: texts,
     * lines, images, rectangles etc.
     * To use the {@link AnnotationLayer}, create annotations and push them to the layer's
     * items property.
     */
    class AnnotationLayer {
        static _CSS_Layer: string;
        private _items;
        _layerEle: SVGGElement;
        private _plotrectId;
        private _tooltip;
        private _forceTTShowing;
        private _annoTTShowing;
        _chart: wijmo.chart.FlexChartCore;
        /**
         * Initializes a new instance of the {@link AnnotationLayer} class.
         *
         * @param chart A chart to which the {@link AnnotationLayer} is attached.
         * @param options A JavaScript object containing initialization data for
         * {@link AnnotationLayer}.
         */
        constructor(chart: wijmo.chart.FlexChartCore, options?: any);
        _init(chart: wijmo.chart.FlexChartCore): void;
        private _lostFocus;
        /**
         * Gets the collection of annotation elements in the {@link AnnotationLayer}.
         */
        readonly items: wijmo.collections.ObservableArray;
        /**
         * Gets an annotation element by name in the {@link AnnotationLayer}.
         * @param name The annotation's name.
         */
        getItem(name: string): AnnotationBase;
        /**
         * Gets the annotation elements by name in the {@link AnnotationLayer}.
         * @param name The annotations' name.
         */
        getItems(name: string): Array<AnnotationBase>;
        private _bindTooltip;
        _showTooltip(): boolean;
        private _toggleTooltip;
        _getAnnotation(ele: any, parentNode: any): AnnotationBase;
        private _getAnnotationElement;
        private _itemsChanged;
        private _renderAnnotations;
        _renderGroup(): void;
        _renderAnnotation(engine: wijmo.chart.IRenderEngine, item: AnnotationBase): void;
        private _destroyAnnotations;
        private _destroyAnnotation;
    }
}
declare module wijmo.chart.annotation {
}
