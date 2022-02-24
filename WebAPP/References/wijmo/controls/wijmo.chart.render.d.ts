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
declare module wijmo.chart.render {
    class _CanvasRenderEngine implements wijmo.chart.IRenderEngine {
        private _element;
        private _canvas;
        private _svgEngine;
        private _fill;
        private _stroke;
        private _textFill;
        private _strokeWidth;
        private _fontSize;
        private _fontFamily;
        private _canvasRect;
        private _canvasDefaultFont;
        private _applyCSSStyles;
        private _cssPriority;
        private _readOnly;
        constructor(element: HTMLElement, applyCSSStyles?: boolean);
        beginRender(): void;
        endRender(): void;
        setViewportSize(w: number, h: number): void;
        readonly element: Element;
        fill: string;
        fontSize: string;
        fontFamily: string;
        stroke: string;
        strokeWidth: number;
        textFill: string;
        cssPriority: boolean;
        readOnly: boolean;
        addClipRect(clipRect: wijmo.Rect, id: string): void;
        drawEllipse(cx: number, cy: number, rx: number, ry: number, className?: string, style?: any): any;
        drawRect(x: number, y: number, w: number, h: number, className?: string, style?: any, clipPath?: string): any;
        drawLine(x1: number, y1: number, x2: number, y2: number, className?: string, style?: any): any;
        drawLines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string, num?: number): any;
        drawSplines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string, num?: number): any;
        drawPolygon(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): any;
        drawPieSegment(cx: number, cy: number, r: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): any;
        drawDonutSegment(cx: number, cy: number, radius: number, innerRadius: number, startAngle: number, sweepAngle: number, className?: string, style?: any, clipPath?: string): any;
        drawString(s: string, pt: wijmo.Point, className?: string, style?: any): any;
        drawStringRotated(s: string, pt: wijmo.Point, center: wijmo.Point, angle: number, className?: string, style?: any): any;
        measureString(s: string, className?: string, groupName?: string, style?: any): wijmo.Size;
        startGroup(className?: string, clipPath?: string, createTransform?: boolean): any;
        endGroup(): void;
        drawImage(imageHref: string, x: number, y: number, w: number, h: number): any;
        private _applyCanvasClip;
        private _getOpacityColor;
        private _applyCanvasStyles;
        private _applyColor;
    }
}
declare module wijmo.chart.render {
}
