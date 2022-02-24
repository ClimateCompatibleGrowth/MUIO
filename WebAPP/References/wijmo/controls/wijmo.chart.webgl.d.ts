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
declare module wijmo.chart.webgl {
    class _EarCut {
        earcut(data: any, holeIndices?: any, dim?: any): number[];
        private linkedList;
        private filterPoints;
        private earcutLinked;
        private isEar;
        private isEarHashed;
        private cureLocalIntersections;
        private splitEarcut;
        private eliminateHoles;
        private compareX;
        private eliminateHole;
        private findHoleBridge;
        private sectorContainsSector;
        private indexCurve;
        private sortLinked;
        private zOrder;
        private getLeftmost;
        private pointInTriangle;
        private isValidDiagonal;
        private area;
        private equals;
        private intersects;
        private onSegment;
        private sign;
        private intersectsPolygon;
        private locallyInside;
        private middleInside;
        private splitPolygon;
        private insertNode;
        private removeNode;
        private deviation;
        private signedArea;
        private flatten;
    }
}
declare module wijmo.chart.webgl {
    /**
     * High performance rendering engine for a {@link FlexChart} control.
     *
     * To enable WebGL rendering on a {@link FlexChart} control,
     * set <b>renderEngine<b> property of {@link FlexChart} to
     * an instance of the {@link WebGLRenderEngine}. For example:
     *```typescript
     * import { FlexChart } from '@grapecity/wijmo.chart';
     * import { WebGLRenderEngine } from '@grapecity/wijmo.chart.webgl';
     * let flexChart = new FlexChart('#theGrid'); // create the chart
     * flexChart.renderEngine = new WebGLRenderEngine(); // set the render engine
     * ```
     */
    class WebGLRenderEngine extends wijmo.chart._SvgRenderEngine {
        private static svgns;
        canvas: HTMLCanvasElement;
        foCanvas: SVGForeignObjectElement;
        private gl;
        private rdraw;
        private edraw;
        private pdraw;
        private ldraw;
        private adraw;
        private primitives;
        private isIE;
        useSvg: boolean;
        private clipRects;
        constructor(el?: HTMLElement);
        beginRender(): void;
        setViewportSize(w: number, h: number): void;
        endRender(): void;
        drawEllipse(cx: number, cy: number, rx: number, ry: number, className?: string, style?: any): SVGElement;
        drawRect(x: number, y: number, w: number, h: number, className?: string, style?: any, clipPath?: string): SVGElement;
        drawLines(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string, num?: number): SVGElement;
        drawPolygon(xs: number[], ys: number[], className?: string, style?: any, clipPath?: string): SVGElement;
        addClipRect(clipRect: wijmo.Rect, id: string): void;
        private init;
    }
}
declare module wijmo.chart.webgl {
}
