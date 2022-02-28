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
declare var PDFDocument: {
    prototype: _IPdfKitDocument;
    new (options?: _IPdfKitDocumentOptions): _IPdfKitDocument;
};
interface _IPdfKitDocument {
    x: number;
    y: number;
    _ctm: number[];
    compress: boolean;
    info: _IPdfKitDocumentInfo;
    options: _IPdfKitDocumentOptions;
    page: _IPdfKitPage;
    version: 1.3 | 1.4 | 1.5 | 1.6 | 1.7;
    addPage(options?: _IPdfKitPageOptions): _IPdfKitDocument;
    bufferedPageRange(): {
        start: number;
        count: number;
    };
    flushPages(): void;
    switchToPage(pageNumber: number): _IPdfKitPage;
    end(): boolean;
    lineGap(value: number): _IPdfKitDocument;
    currentLineGap(): number;
    currentLineHeight(includeGap?: boolean): number;
    widthOfString(value: string, options?: _IPdfKitWidthOfStringOptions): number;
    heightOfString(value: string, options?: _IPdfKitMeasurementTextOptions): number;
    moveDown(lines?: number): _IPdfKitDocument;
    moveUp(lines?: number): _IPdfKitDocument;
    text(text: string, options?: _IPdfKitTextOptions): _IPdfKitDocument;
    text(text: string, x?: number, y?: number, options?: _IPdfKitTextOptions): _IPdfKitDocument;
    textAndMeasure(text: string, x: number, y: number, options: _IPdfKitMeasurementTextOptions, measureOnly?: boolean): _IPdfKitTextSize;
    currentFontAscender(): number;
    currentFontBBox(): _IPdfKitFontBBox;
    currentFontSize(): number;
    font(name: string, size?: number): _IPdfKitDocument;
    font(src: ArrayBuffer | Uint8Array, size?: number): _IPdfKitDocument;
    font(src: ArrayBuffer | Uint8Array, fontFamily: string, size?: number): _IPdfKitDocument;
    fontSize(size: number): _IPdfKitDocument;
    registerFont(name: string, standardFontName: string): _IPdfKitDocument;
    registerFont(name: string, src: ArrayBuffer | Uint8Array, fontFamily?: string): _IPdfKitDocument;
    image(URI: string | _IPdfKitImage, options?: _IPdfKitImageOptions): _IPdfKitDocument;
    image(URI: string | _IPdfKitImage, x?: number, y?: number, options?: _IPdfKitImageOptions): _IPdfKitDocument;
    openImage(URI: string): _IPdfKitImage;
    on(eventName: string, handler: Function): _IPdfKitDocument;
    on(eventName: 'data', handler: (chunk: any) => {}): _IPdfKitDocument;
    removeAllListeners(type: string): _IPdfKitDocument;
    removeListener(type: string, listener: Function): _IPdfKitDocument;
    fill(colorOrRule: string | _PdfKitRule): _IPdfKitDocument;
    fill(color: _IPdfKitGradient, rule?: _PdfKitRule): _IPdfKitDocument;
    stroke(color?: _PdfKitColor): _IPdfKitDocument;
    fillAndStroke(rule?: _PdfKitRule): _IPdfKitDocument;
    fillAndStroke(fillColor: _PdfKitColor, strokeColor: _PdfKitColor, rule?: _PdfKitRule): _IPdfKitDocument;
    fillColor(color: _PdfKitColor, opacity?: number): _IPdfKitDocument;
    strokeColor(color: _PdfKitColor, opacity?: number): _IPdfKitDocument;
    fillOpacity(opacity: number): _IPdfKitDocument;
    strokeOpacity(opacity: number): _IPdfKitDocument;
    opacity(opacity: number): _IPdfKitDocument;
    linearGradient(x1: number, y1: number, x2: number, y2: number): _IPdfKitGradient;
    radialGradient(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): _IPdfKitGradient;
    closePath(): _IPdfKitDocument;
    clip(rule?: _PdfKitRule): _IPdfKitDocument;
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): _IPdfKitDocument;
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): _IPdfKitDocument;
    circle(x: number, y: number, radius: number): _IPdfKitDocument;
    ellipse(x: number, y: number, r1: number, r2?: number): _IPdfKitDocument;
    lineTo(x: number, y: number): _IPdfKitDocument;
    lineWidth(width: number): _IPdfKitDocument;
    moveTo(x: number, y: number): _IPdfKitDocument;
    path(path: string): _IPdfKitDocument;
    rect(x: number, y: number, w: number, h: number): _IPdfKitDocument;
    roundedRect(x: number, y: number, w: number, h: number, r?: number): _IPdfKitDocument;
    polygon(...points: number[][]): _IPdfKitDocument;
    lineCap(value: string | number): _IPdfKitDocument;
    lineJoin(value: string | number): _IPdfKitDocument;
    miterLimit(value: number): _IPdfKitDocument;
    dash(length: number, options?: _IPdfKitDashOptions): _IPdfKitDocument;
    undash(): _IPdfKitDocument;
    scale(xFactor: number, yFactor: number, options?: _IPdfKitOrigin): _IPdfKitDocument;
    scale(factor: number): _IPdfKitDocument;
    translate(x: number, y: number): _IPdfKitDocument;
    transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): _IPdfKitDocument;
    rotate(angle: number, options?: _IPdfKitOrigin): _IPdfKitDocument;
    restore(): _IPdfKitDocument;
    save(): _IPdfKitDocument;
    outline: _IPdfKitOutline;
    addNamedDestination(name: string, dest: 'XYZ', left: number, top: number, zoom: number): any;
    addNamedDestination(name: string, dest: 'Fit'): any;
    addNamedDestination(name: string, dest: 'FitH', top: number): any;
    addNamedDestination(name: string, dest: 'FitV', left: number): any;
    addNamedDestination(name: string, dest: 'FitR', left: number, bottom: number, right: number, top: number): any;
    addNamedDestination(name: string, dest: 'FitB'): any;
    addNamedDestination(name: string, dest: 'FitBH', top: number): any;
    addNamedDestination(name: string, dest: 'FitBV', left: number): any;
    addNamedDestination(name: string, ...args: any[]): any;
    annotate(x: number, y: number, w: number, h: number, options?: _IPdfKitBaseAnnotationOptions): _IPdfKitDocument;
    note(x: number, y: number, w: number, h: number, contents: string, options?: _IPdfKitTextAnnotationOptions): _IPdfKitDocument;
    goTo(x: number, y: number, w: number, h: number, name: string, options?: _IPdfKitLinkAnnotationOptions): _IPdfKitDocument;
    link(x: number, y: number, w: number, h: number, url: string | number, options?: _IPdfKitLinkAnnotationOptions): _IPdfKitDocument;
    highlight(x: number, y: number, w: number, h: number, options?: _IPdfKitTextMarkupAnnotationOptions): _IPdfKitDocument;
    underline(x: number, y: number, w: number, h: number, options?: _IPdfKitTextMarkupAnnotationOptions): _IPdfKitDocument;
    strike(x: number, y: number, w: number, h: number, options?: _IPdfKitTextMarkupAnnotationOptions): _IPdfKitDocument;
    lineAnnotation(x1: number, y1: number, x2: number, y2: number, options?: _IPdfKitLineAnnotationOptions): _IPdfKitDocument;
    rectAnnotation(x: number, y: number, w: number, h: number, options?: _IPdfKitSquareOrCircleAnnotationOptions): _IPdfKitDocument;
    ellipseAnnotation(x: number, y: number, w: number, h: number, options?: _IPdfKitSquareOrCircleAnnotationOptions): _IPdfKitDocument;
    textAnnotation(x: number, y: number, w: number, h: number, text: string, options?: _IPdfKitFreeTextAnnotationOptions): _IPdfKitDocument;
    markContent(tag: _PdfKitStructureType | _PdfKitNonStructureType, options?: _IPdfKitMarkedContentOptions): _IPdfKitDocument;
    markStructureContent(tag: _PdfKitStructureType, options?: _IPdfKitMarkedContentOptions): _IPdfKitStructureContent;
    endMarkedContent(): _IPdfKitDocument;
    struct(type: _PdfKitStructureType, children?: _PdfKitValidStructChild | _PdfKitValidStructChild[]): _IPdfKitStructureElement;
    struct(type: _PdfKitStructureType, options?: _IPdfKitStructureElementOptions, children?: _PdfKitValidStructChild | _PdfKitValidStructChild[]): _IPdfKitStructureElement;
    addStructure(structElem: _IPdfKitStructureElement): _IPdfKitDocument;
}
interface _IPdfKitPageOptions {
    layout?: _PdfKitPageLayout;
    margin?: number;
    margins?: _IPdfKitPageMargins;
    size?: string | [number, number];
}
interface _IPdfKitReference {
    document: _IPdfKitDocument;
    id: number;
    data: any;
    gen: number;
    compress: boolean;
    uncompressedLength: number;
    buffer: any[];
    write(chunk: any): void;
    end(chunk: any): void;
    finalize(): void;
    toString(): string;
}
interface _IPdfKitPage {
    document: _IPdfKitDocument;
    width: number;
    height: number;
    margins: _IPdfKitPageMargins;
    size: string | [number, number];
    layout: _PdfKitPageLayout;
    originalMargins: _IPdfKitPageMargins;
}
interface _IPdfKitDocumentOptions extends _IPdfKitPageOptions {
    autoFirstPage?: boolean;
    bufferPages?: boolean;
    compress?: boolean;
    info?: _IPdfKitDocumentInfo;
    pdfVersion?: _PdfKitVersion;
    fontLayoutCache?: boolean;
    font?: string | ArrayBuffer | Uint8Array;
    lang?: string;
    displayTitle?: boolean;
    tagged?: boolean;
    security?: {
        new (document: typeof PDFDocument, options: _IPdfKitDocumentOptions): any;
    };
    userPassword?: string;
    ownerPassword?: string;
    permissions?: {
        printing?: _PdfKitPrintPermission;
        modifying?: boolean;
        copying?: boolean;
        annotating?: boolean;
        fillingForms?: boolean;
        contentAccessibility?: boolean;
        documentAssembly?: boolean;
    };
    pageAdding?: (document: _IPdfKitDocument, options: _IPdfKitPageOptions) => void;
    pageAdded?: (document: _IPdfKitDocument, pageIndex: number) => void;
}
interface _IPdfKitDocumentInfo {
    Author?: string;
    CreationDate?: Date;
    Keywords?: string;
    ModDate?: Date;
    Subject?: string;
    Title?: string;
}
interface _IPdfKitPageMargins {
    bottom: number;
    left: number;
    right: number;
    top: number;
}
interface _IPdfKitTextOptions {
    align?: _PdfKitTextHorizontalAlign;
    lineBreak?: boolean;
    width?: number;
    height?: number;
    ellipsis?: string | true;
    columns?: number;
    columnGap?: number;
    indent?: number;
    paragraphGap?: number;
    lineGap?: number;
    wordSpacing?: number;
    characterSpacing?: number;
    fill?: boolean;
    stroke?: boolean;
    underline?: boolean;
    strike?: boolean;
    continued?: boolean;
    structParent?: _IPdfKitStructureElement;
    destination?: string;
    goTo?: string;
    link?: string | number;
    oblique?: number | true;
    baseline?: number | _PdfKitTextBaseline;
    features?: _PdfKitOpenTypeFeatures[];
}
interface _IPdfKitDashOptions {
    phase?: number;
    space?: number;
}
interface _IPdfKitMeasurementTextOptions extends _IPdfKitTextOptions {
    includeLastLineExternalLeading?: boolean;
}
interface _IPdfKitWidthOfStringOptions {
    characterSpacing?: number;
}
interface _IPdfKitImage {
    width: number;
    height: number;
}
interface _IPdfKitImageOptions {
    width?: number;
    height?: number;
    scale?: number;
    fit?: [number, number];
    cover?: [number, number];
    align?: 'left' | 'center' | 'right';
    valign?: 'top' | 'center' | 'bottom';
    link?: string;
    goTo?: string;
    destination?: string;
}
interface _IPdfKitGradient {
    stop(pos: number, color: any, opacity?: number): _IPdfKitGradient;
}
interface _IPdfKitOrigin {
    origin?: number[];
}
interface _IPdfKitTextSize {
    width?: number;
    height?: number;
    charCount?: number;
}
interface _IPdfKitFontBBox {
    llx: number;
    lly: number;
    urx: number;
    ury: number;
}
interface _IPdfKitOutline {
    addItem(title: string, options: _IPdfKitOutineOptions): _IPdfKitOutline;
    endOutline(): void;
}
interface _IPdfKitOutineOptions {
    expaned?: boolean;
}
interface _IPdfKitStructureContent {
    refs: [{
        pageRef: _IPdfKitReference;
        mcid: number;
    }];
    push(structContent: _IPdfKitStructureContent): void;
}
interface _IPdfKitStructureElement {
    document: _IPdfKitDocument;
    dictionary: _IPdfKitReference;
    add(child: _PdfKitValidStructChild): _IPdfKitStructureElement;
    setParent(parentRef: _IPdfKitReference): void;
    setAttached(): void;
    end(): void;
}
interface _IPdfKitMarkedContentOptions {
    type?: _PdfKitArtifactType;
    bbox?: [number, number, number, number];
    attached?: _PdfKitPageEdge[];
    lang?: string;
    alt?: string;
    expanded?: string;
    actual?: string;
}
interface _IPdfKitStructureElementOptions {
    title?: string;
    lang?: string;
    alt?: string;
    expanded?: string;
    actual?: string;
}
interface _IPdfKitBaseAnnotationOptions {
    color?: _PdfKitColor;
    Type?: 'Annot';
    Subtype?: 'Text' | 'Link' | 'FreeText' | 'Line' | 'Square' | 'Circle' | 'Polygon' | 'Polyline' | 'Highlight' | 'Underline' | 'Squiggly' | 'StrikeOut' | 'Stamp' | 'Caret' | 'Ink' | 'Popup' | 'FileAttachment' | 'Sound' | 'Movie' | 'Widget' | 'Screen' | 'PrinterMark' | 'TrapNet';
    Contents?: string;
    P?: _IPdfKitReference;
    Rect?: [number, number, number, number];
    NM?: string;
    M?: any;
    F?: number;
    BS?: _IPdfKitReference;
    Border?: number[];
    AP?: _IPdfKitReference;
    AS?: string;
    C?: [number, number, number];
    A?: _IPdfKitReference;
    AA?: _IPdfKitReference;
    StructParent?: number;
    OC?: _IPdfKitReference;
}
interface _IPdfKitTextAnnotationOptions extends _IPdfKitBaseAnnotationOptions {
    Open?: boolean;
    Name?: string;
    IRT?: _IPdfKitReference;
    State?: string;
    StateModel?: string;
}
interface _IPdfKitLinkAnnotationOptions extends _IPdfKitBaseAnnotationOptions {
    Dest?: string[] | string;
    H?: string;
    PA?: _IPdfKitReference;
}
interface _IPdfKitTextMarkupAnnotationOptions extends _IPdfKitBaseAnnotationOptions {
    QuadPoints?: number[];
}
interface _IPdfKitLineAnnotationOptions extends _IPdfKitBaseAnnotationOptions {
    L: [number, number, number, number];
    BS?: _IPdfKitReference;
    LE?: [string, string];
    IC?: [number, number, number];
}
interface _IPdfKitSquareOrCircleAnnotationOptions extends _IPdfKitBaseAnnotationOptions {
    IC?: [number, number, number];
    BE?: _IPdfKitReference;
    RD?: [number, number, number, number];
}
interface _IPdfKitFreeTextAnnotationOptions extends _IPdfKitBaseAnnotationOptions {
    DA: string;
    Q?: number;
    RC?: string;
    DS?: string;
}
declare type _PdfKitColor = string | [number, number, number] | // RGB
[number, number, number, number] | // CMYK
_IPdfKitGradient;
declare type _PdfKitRule = 'even-odd' | 'non-zero';
declare type _PdfKitVersion = '1.3' | '1.4' | '1.5' | '1.6' | '1.7' | '1.7ext3';
declare type _PdfKitPageLayout = 'portrait' | 'landscape';
declare type _PdfKitTextHorizontalAlign = 'left' | 'center' | 'right' | 'justify';
declare type _PdfKitTextBaseline = 'svg-middle' | 'middle' | 'svg-central' | 'bottom' | 'ideographic' | 'alphabetic' | 'mathematical' | 'hanging' | 'top';
declare type _PdfKitPrintPermission = 'lowResolution' | 'highResolution';
declare type _PdfKitArtifactType = 'Pagination' | 'Layout' | 'Page' | 'Background';
declare type _PdfKitPageEdge = 'Top' | 'Bottom' | 'Left' | 'Right';
declare type _PdfKitOpenTypeFeatures = 'aalt' | 'abvf' | 'abvm' | 'abvs' | 'afrc' | 'akhn' | 'blwf' | 'blwm' | 'blws' | 'calt' | 'case' | 'cfar' | 'cjct' | 'clig' | 'cpct' | 'cpsp' | 'cswh' | 'curs' | 'cv01' | 'cv02' | 'cv03' | 'cv04' | 'cv05' | 'cv06' | 'cv07' | 'cv08' | 'cv09' | 'cv10' | 'cv11' | 'cv12' | 'cv13' | 'cv14' | 'cv15' | 'cv16' | 'cv17' | 'cv18' | 'cv19' | 'cv20' | 'cv21' | 'cv22' | 'cv23' | 'cv24' | 'cv25' | 'cv26' | 'cv27' | 'cv28' | 'cv29' | 'cv30' | 'cv31' | 'cv32' | 'cv33' | 'cv34' | 'cv35' | 'cv36' | 'cv37' | 'cv38' | 'cv39' | 'cv40' | 'cv41' | 'cv42' | 'cv43' | 'cv44' | 'cv45' | 'cv46' | 'cv47' | 'cv48' | 'cv49' | 'cv50' | 'cv51' | 'cv52' | 'cv53' | 'cv54' | 'cv55' | 'cv56' | 'cv57' | 'cv58' | 'cv59' | 'cv60' | 'cv61' | 'cv62' | 'cv63' | 'cv64' | 'cv65' | 'cv66' | 'cv67' | 'cv68' | 'cv69' | 'cv70' | 'cv71' | 'cv72' | 'cv73' | 'cv74' | 'cv75' | 'cv76' | 'cv77' | 'cv78' | 'cv79' | 'cv80' | 'cv81' | 'cv82' | 'cv83' | 'cv84' | 'cv85' | 'cv86' | 'cv87' | 'cv88' | 'cv89' | 'cv90' | 'cv91' | 'cv92' | 'cv93' | 'cv94' | 'cv95' | 'cv96' | 'cv97' | 'cv98' | 'cv99' | 'c2pc' | 'c2sc' | 'dist' | 'ccmp' | 'dlig' | 'dnom' | 'dtls' | 'expt' | 'falt' | 'fin2' | 'fin3' | 'fina' | 'flac' | 'frac' | 'fwid' | 'half' | 'haln' | 'halt' | 'hist' | 'hkna' | 'hlig' | 'hngl' | 'hojo' | 'hwid' | 'init' | 'isol' | 'ital' | 'jalt' | 'jp78' | 'jp83' | 'jp90' | 'jp04' | 'kern' | 'lfbd' | 'liga' | 'ljmo' | 'lnum' | 'locl' | 'ltra' | 'ltrm' | 'mark' | 'med2' | 'medi' | 'mgrk' | 'mkmk' | 'mset' | 'nalt' | 'nlck' | 'nukt' | 'numr' | 'onum' | 'opbd' | 'ordn' | 'ornm' | 'palt' | 'pcap' | 'pkna' | 'pnum' | 'pref' | 'pres' | 'pstf' | 'psts' | 'pwid' | 'qwid' | 'rand' | 'rclt' | 'rkrf' | 'rlig' | 'rphf' | 'rtbd' | 'rtla' | 'rtlm' | 'ruby' | 'rvrn' | 'salt' | 'sinf' | 'size' | 'smcp' | 'smpl' | 'ss01' | 'ss02' | 'ss03' | 'ss04' | 'ss05' | 'ss06' | 'ss07' | 'ss08' | 'ss09' | 'ss10' | 'ss11' | 'ss12' | 'ss13' | 'ss14' | 'ss15' | 'ss16' | 'ss17' | 'ss18' | 'ss19' | 'ss20' | 'ssty' | 'stch' | 'subs' | 'sups' | 'swsh' | 'titl' | 'tjmo' | 'tnam' | 'tnum' | 'trad' | 'twid' | 'unic' | 'valt' | 'vatu' | 'vert' | 'vhal' | 'vjmo' | 'vkna' | 'vkrn' | 'vpal' | 'vrt2' | 'vrtr' | 'zero';
declare type _PdfKitValidStructChild = _IPdfKitStructureContent | _IPdfKitStructureElement | (() => void);
declare type _PdfKitNonStructureType = 'Artifact' | 'ReversedChars';
declare type _PdfKitStructureType = // Section 10.7, "Standard structure types"
'Document' | 'Part' | 'Art' | 'Sect' | 'Div' | 'BlockQuote' | 'Caption' | 'TOC' | 'TOCI' | 'Index' | 'NonStruct' | 'Private' | 'H' | 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' | 'P' | 'L' | 'LI' | 'Lbl' | 'LBody' | 'Table' | 'TR' | 'TH' | 'TD' | 'THead' | 'TBody' | 'TFoot' | 'Span' | 'Quote' | 'Note' | 'Reference' | 'BibEntry' | 'Code' | 'Link' | 'Annot' | 'Ruby' | 'RB' | 'RT' | 'RP' | 'Warichu' | 'WT' | 'WP' | 'Figure' | 'Formula' | 'Form';
declare module wijmo.pdf {
    var __c1pdfkitIsModule: any;
}
declare module wijmo.pdf {
    function softPdfSecurity(): typeof wijmo.pdf.security;
}
declare module wijmo.pdf {
    class _PdfSvgPathHelper {
        static offset(path: string, offset: wijmo.Point): string;
        static scale(path: string, scale: number): string;
        private static _processPath;
        private static _getTokenizer;
        private static _updateOffset;
    }
}
declare module wijmo.pdf {
    class _SafeColor extends wijmo.Color {
        constructor(color: string);
        _parse(c: string): boolean;
        static fromString(value: string): wijmo.Color;
    }
}
declare module wijmo.pdf {
    /**
     * Represents the dash pattern used to stroke paths.
     */
    class PdfDashPattern {
        private _dash;
        private _gap;
        private _phase;
        /**
        * Initializes a new instance of the {@link PdfDashPattern} class.
        *
        * @param dash The length of alternating dashes, in points.
        * @param gap The length of alternating gaps, in points.
        * @param phase The distance in the dash pattern to start the dash at, in points.
        */
        constructor(dash?: number, gap?: number, phase?: number);
        /**
        * Gets or sets the length of alternating dashes, in points.
        * The default value is null which indicates no dash pattern, but a solid line.
        */
        dash: number;
        /**
        * Gets or sets the length of alternating gaps, in points.
        * The default value is equal to {@link dash} which indicates that dashes and gaps will
        * have the same length.
        */
        gap: number;
        /**
        * Gets or sets the distance in the dash pattern to start the dash at, in points.
        * The default value is 0.
        */
        phase: number;
        /**
        * Creates a copy of this {@link PdfDashPattern}.
        * @return A copy of this dash pattern.
        */
        clone(): PdfDashPattern;
        /**
        * Determines whether the specified {@link PdfDashPattern} instance is equal
        * to the current one.
        *
        * @param value {@link PdfDashPattern} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfDashPattern): boolean;
    }
}
declare module wijmo.pdf {
    /**
    * Provides arguments for the {@link PdfDocument.end} event.
    */
    class PdfDocumentEndedEventArgs extends wijmo.EventArgs {
        private _blob;
        private _chunks;
        /**
        * Initializes a new instance of the {@link PdfDocumentEndedEventArgs} class.
        *
        * @param chunks An array of chunks.
        */
        constructor(chunks: Uint8Array[]);
        /**
        * Gets a Blob object that contains the document data.
        */
        readonly blob: Blob;
        /**
        * Gets the underlying array of buffers that contains the document data.
        */
        readonly chunks: Uint8Array[];
    }
}
declare module wijmo.pdf {
    /**
    * Specifies the shape that shall be used at the ends of open subpaths
    * (and dashes, if any) when they are stroked.
    */
    enum PdfLineCapStyle {
        /**
        * The stroke is squared off at the endpoint of the path.
        */
        Butt = 0,
        /**
        * A semicircular arc with a diameter equal to the line width is
        * drawn around the endpoint and is filled in.
        */
        Round = 1,
        /**
        * The stroke continues beyond the endpoint of the path for a
        * distance equal to the half of the line width and is squared off.
        */
        Square = 2
    }
    /**
    * Specifies the shape to be used at the corners of paths that are stroked.
    */
    enum PdfLineJoinStyle {
        /**
        * The outer edges of the strokes for the two segments are extended
        * until they meet at an angle.
        */
        Miter = 0,
        /**
        * An arc of a circle with a diameter equal to the line width is drawn
        * around the point where the two segments meet.
        */
        Round = 1,
        /**
        * The two segments are finished with butt caps and the resulting notch
        * beyond the ends of the segments is filled with a triangle.
        */
        Bevel = 2
    }
    /**
    * Specifies a rule that determines if a point falls inside the enclosed path.
    */
    enum PdfFillRule {
        /**
        * Non-zero rule.
        */
        NonZero = 0,
        /**
        * Even-odd rule.
        */
        EvenOdd = 1
    }
    /**
    * Specifies the page orientation.
    */
    enum PdfPageOrientation {
        /**
        * Portrait orientation.
        */
        Portrait = 0,
        /**
        * Landscape orientation.
        */
        Landscape = 1
    }
    /**
    * Specifies the horizontal alignment of the image.
    */
    enum PdfImageHorizontalAlign {
        /**
        * Aligns the image to the left edge of the drawing area.
        */
        Left = 0,
        /**
        * Aligns the image in the middle of the drawing area.
        */
        Center = 1,
        /**
        * Aligns the image to the right edge of the drawing area.
        */
        Right = 2
    }
    /**
    * Specifies the vertical alignment of the image.
    */
    enum PdfImageVerticalAlign {
        /**
        * Aligns the image to the top edge of the drawing area.
        */
        Top = 0,
        /**
        * Aligns the image in the middle of the drawing area.
        */
        Center = 1,
        /**
        * Aligns the image to the bottom edge of the drawing area.
        */
        Bottom = 2
    }
    /**
    * Specifies the horizontal alignment of text content.
    */
    enum PdfTextHorizontalAlign {
        /**
        * Text is aligned to the left.
        */
        Left = 0,
        /**
        * Text is centered.
        */
        Center = 1,
        /**
        * Text is aligned to the right.
        */
        Right = 2,
        /**
        * Text is justified.
        */
        Justify = 3
    }
    /**
    * Specifies the current text baseline.
    */
    enum PdfTextBaseline {
        /**
        * The text baseline is the normal alphabetic baseline.
        */
        Alphabetic = 0,
        /**
        * The text baseline is the top of the em square.
        */
        Top = 1,
        /**
        * The text baseline is the hanging baseline.
        */
        Hanging = 2,
        /**
        * The text baseline is the middle of the em square.
        */
        Middle = 3,
        /**
        * The text baseline is the ideographic baseline.
        */
        Ideographic = 4,
        /**
        * The text baseline is the bottom of the bounding box.
        */
        Bottom = 5
    }
    /**
    * Specifies the page size, in points.
    */
    enum PdfPageSize {
        /**
        * Represents the A0 page size.
        */
        A0 = 0,
        /**
        * Represents the A1 page size.
        */
        A1 = 1,
        /**
        * Represents the A2 page size.
        */
        A2 = 2,
        /**
        * Represents the A3 page size.
        */
        A3 = 3,
        /**
        * Represents the A4 page size.
        */
        A4 = 4,
        /**
        * Represents the A5 page size.
        */
        A5 = 5,
        /**
        * Represents the A6 page size.
        */
        A6 = 6,
        /**
        * Represents the A7 page size.
        */
        A7 = 7,
        /**
        * Represents the A8 page size.
        */
        A8 = 8,
        /**
        * Represents the A9 page size.
        */
        A9 = 9,
        /**
        * Represents the A10 page size.
        */
        A10 = 10,
        /**
        * Represents the B0 page size.
        */
        B0 = 11,
        /**
        * Represents the B1 page size.
        */
        B1 = 12,
        /**
        * Represents the B2 page size.
        */
        B2 = 13,
        /**
        * Represents the B3 page size.
        */
        B3 = 14,
        /**
        * Represents the B4 page size.
        */
        B4 = 15,
        /**
        * Represents the B5 page size.
        */
        B5 = 16,
        /**
        * Represents the B6 page size.
        */
        B6 = 17,
        /**
        * Represents the B7 page size.
        */
        B7 = 18,
        /**
        * Represents the B8 page size.
        */
        B8 = 19,
        /**
        * Represents the B9 page size.
        */
        B9 = 20,
        /**
        * Represents the B10 page size.
        */
        B10 = 21,
        /**
        * Represents the C0 page size.
        */
        C0 = 22,
        /**
        * Represents the C1 page size.
        */
        C1 = 23,
        /**
        * Represents the C2 page size.
        */
        C2 = 24,
        /**
        * Represents the C3 page size.
        */
        C3 = 25,
        /**
        * Represents the C4 page size.
        */
        C4 = 26,
        /**
        * Represents the C5 page size.
        */
        C5 = 27,
        /**
        * Represents the C6 page size.
        */
        C6 = 28,
        /**
        * Represents the C7 page size.
        */
        C7 = 29,
        /**
        * Represents the C8 page size.
        */
        C8 = 30,
        /**
        * Represents the C9 page size.
        */
        C9 = 31,
        /**
        * Represents the C10 page size.
        */
        C10 = 32,
        /**
        * Represents the RA0 page size.
        */
        RA0 = 33,
        /**
        * Represents the RA1 page size.
        */
        RA1 = 34,
        /**
        * Represents the RA2 page size.
        */
        RA2 = 35,
        /**
        * Represents the RA3 page size.
        */
        RA3 = 36,
        /**
        * Represents the RA4 page size.
        */
        RA4 = 37,
        /**
        * Represents the SRA0 page size.
        */
        SRA0 = 38,
        /**
        * Represents the SRA1 page size.
        */
        SRA1 = 39,
        /**
        * Represents the SRA2 page size.
        */
        SRA2 = 40,
        /**
        * Represents the SRA3 page size.
        */
        SRA3 = 41,
        /**
        * Represents the SRA4 page size.
        */
        SRA4 = 42,
        /**
        * Represents the executive page size.
        */
        Executive = 43,
        /**
        * Represents the folio page size.
        */
        Folio = 44,
        /**
        * Represents the legal page size.
        */
        Legal = 45,
        /**
        * Represents the letter page size.
        */
        Letter = 46,
        /**
        * Represents the tabloid page size.
        */
        Tabloid = 47
    }
    /**
    * Specifies PDF printing permisson.
    */
    enum PdfPrintPermission {
        /**
        * Printing is not allowed.
        */
        NotAllowed = 0,
        /**
        * Printing is limited to a low-level representation of the appearance, possibly of degraded quality.
        */
        AllowLowResolution = 1,
        /**
        * Print the document to a representation from which a faithful digital copy of the PDF content could be generated.
        */
        AllowHighResolution = 2
    }
    /**
    * Specifies PDF file version.
    */
    enum PdfVersion {
        /**
        * PDF version 1.3.
        */
        v1_3 = 0,
        /**
        * PDF version 1.4.
        */
        v1_4 = 1,
        /**
        * PDF version 1.5.
        */
        v1_5 = 2,
        /**
        * PDF version 1.6.
        */
        v1_6 = 3,
        /**
        * PDF version 1.7.
        */
        v1_7 = 4,
        /**
        * PDF version 1.7 ExtensionLevel 3.
        */
        v1_7Ext3 = 5
    }
    /**
    * Specifies the type of a tag element.
    */
    enum PdfTagType {
        /**
        * A large-scale division of a document.
        * This type of element is appropriate for grouping articles or sections.
        */
        Part = 0,
        /**
        * (Article) A relatively self-contained body of text constituting a single narrative or exposition.
        * Articles should be  disjoint; that is, they should not contain other articles as constituent elements.
        */
        Art = 1,
        /**
        * (Section) A container for grouping related content elements.
        * For example, a section might contain a heading, several introductory paragraphs, and two or more
        * other sections nested whithin it as subsections.
        */
        Sect = 2,
        /** (Division) A generic block-level element or group of elements. */
        Div = 3,
        /**
        * (Block quotation) A portion of text consisting of one or more paragrahs attributes to someone
        * other than the author of the surrounding text.
        */
        BlockQuote = 4,
        /** A brief portion of text describing a table or figure. */
        Caption = 5,
        /**
        * (Nonstructural element) A grouping element having no inherent structural significance; it serves solely for
        * grouping purposes.
        */
        NonStruct = 6,
        /** (Private element) A grouping element containing private content belonging to the application producing it. */
        Private = 7,
        /**
        * (Heading) A label for a subdivision of a document’s content.
        * It should be the first child of the division that it heads.
        */
        H = 8,
        /**
        * Heading with specific level, for use in applications that cannot hierarchically nest their sections and thus
        * cannot determine the level of a heading from its level of nesting.
        */
        H1 = 9,
        /**
        * Heading with specific level, for use in applications that cannot hierarchically nest their sections and thus
        * cannot determine the level of a heading from its level of nesting.
        */
        H2 = 10,
        /**
        * Heading with specific level, for use in applications that cannot hierarchically nest their sections and thus
        * cannot determine the level of a heading from its level of nesting.
        */
        H3 = 11,
        /**
        * Heading with specific level, for use in applications that cannot hierarchically nest their sections and thus
        * cannot determine the level of a heading from its level of nesting.
        */
        H4 = 12,
        /**
        * Heading with specific level, for use in applications that cannot hierarchically nest their sections and thus
        * cannot determine the level of a heading from its level of nesting.
        */
        H5 = 13,
        /**
        * Heading with specific level, for use in applications that cannot hierarchically nest their sections and thus
        * cannot determine the level of a heading from its level of nesting.
        */
        H6 = 14,
        /** (Paragraph) A low-level division of text.*/
        P = 15,
        /** (List) A sequence of items of like meaning and importance. */
        L = 16,
        /** (List item) An individual member of a list. */
        LI = 17,
        /**
        * (Label) A name or number that distinguishes a given item from others in the same list or other
        * group of like items. e.g. the number and punctuation in a numbered list.
        */
        Lbl = 18,
        /** (List body) The descriptive content of a list item. */
        LBody = 19,
        /** A two-dimensional layout of rectangular data cells. */
        Table = 20,
        /** (Table row) A row of headings or data in a table. */
        TR = 21,
        /** (Table header cell) A table cell containing header text describing one or more rows of the table. */
        TH = 22,
        /** (Table data cell) A table cell containing data that is part of the table’s content. */
        TD = 23,
        /** (Table header row group; PDF 1.5) A group of rows that constitute the header of a table. */
        THead = 24,
        /** (Table body row group; PDF 1.5) A group of rows that constitute the main body portion of a table. */
        TBody = 25,
        /** (Table footer row group; PDF 1.5) A group of rows that constitute the footer of a table.*/
        TFoot = 26,
        /** A generic inline portion of text having no particular inherent characteristics. */
        Span = 27,
        /** (Quotation) An inline portion of text attributed to someone other than the author of the surrounding text. */
        Quote = 28,
        /** (Bibliography entry) A reference identifying the external source of some cited content. */
        BibEntry = 29,
        /** A fragment of computer program text. */
        Code = 30,
        /** (PDF 1.5) A side-note (annotation) written in a smaller text size and placed adjacent to the base text to which it refers. */
        Ruby = 31,
        /** (Ruby base text) The full-size text to which the ruby annotation is applied. */
        RB = 32,
        /** (Ruby annotation text) The smaller-size text that is placed adjacent to the ruby base text. */
        RT = 33,
        /** (Ruby punctuation) Punctuation surrounding the ruby annotation text. */
        RP = 34,
        /**
         * (PDF 1.5) A comment or annotation in a smaller text size and formatted onto two smaller lines within
         * the height of the containing text line and placed following (inline) the base text to which it refers.
         */
        Warichu = 35,
        /**
         * (Warichu text) The smaller-size text of a warichu comment that is formatted into two lines
         * and placed between surrounding WP elements.
         */
        WT = 36,
        /** (Warichu punctuation) The punctuation that surrounds the WT text. */
        WP = 37,
        /** An item of graphical content. */
        Figure = 38,
        /** A mathematical formula. */
        Formula = 39
    }
    /**
    * Specifies the type of an artifact.
    */
    enum PdfArtifactType {
        /** Ancillary page features such as running heads and folios (page numbers). */
        Pagination = 0,
        /** Purely cosmetic typographical or design elements such as footnote rules or background screens. */
        Layout = 1
    }
    /**
    * Specifies the page's edge.
    */
    enum PdfPageEdge {
        /** The top edge of the page. */
        Top = 0,
        /** The bottom edge of the page. */
        Bottom = 1,
        /** The left edge of the page. */
        Left = 2,
        /** The right edge of the page. */
        Right = 3
    }
}
declare module wijmo.pdf {
    var _Errors: {
        InvalidArg: (name: string) => string;
        InvalidFormat: (value: string) => string;
        ValueCannotBeEmpty: (name: string) => string;
        PathStarted: string;
        BufferPagesMustBeEnabled: string;
        AbstractMethod: string;
        FontNameMustBeSet: string;
        FontSourceMustBeStringArrayBuffer: string;
        FontSourceMustBeString: string;
        FontSourceMustBeArrayBuffer: string;
        EmptyUrl: string;
        UndefinedMimeType: string;
        InvalidImageDataUri: string;
        InvalidImageFormat: string;
        SecurityRequirements: string;
        TaggedPdfRequirements: string;
    };
}
declare module wijmo.pdf {
    /**
    * Represents an abstract class that serves as a base class for all brushes.
    * Instances of any class that derives from this class are used to fill areas and text.
    *
    * This class is not intended to be instantiated in your code.
    */
    class PdfBrush {
        /**
        * Creates a copy of this {@link PdfBrush}.
        * @return A copy of this brush.
        */
        clone(): PdfBrush;
        /**
        * Determines whether the specified {@link PdfBrush} instance is equal to the current one.
        *
        * @param value {@link PdfBrush} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfBrush): boolean;
        _getBrushObject(area: PdfPageArea): any;
    }
}
declare module wijmo.pdf {
    /**
     * Determines an object used to stroke paths and text.
     */
    class PdfPen {
        private _color;
        private _brush;
        private _width;
        private _cap;
        private _join;
        private _miterLimit;
        private _dashPattern;
        /**
        * Initializes a new instance of the {@link PdfPen} class with the specified color or
        * brush or JavaScript object.
        *
        * The first argument can accept the following values:
        * <ul>
        *  <li>{@link wijmo.Color} object or any string acceptable by the {@link wijmo.Color.fromString} method.</li>
        *  <li>{@link PdfBrush} object.</li>
        *  <li>JavaScript object containing initialization properties (all other arguments are ignored).</li>
        * </ul>
        *
        * @param colorOrBrushOrOptions The color or brush or JavaScript object to use.
        * @param width The width to use.
        * @param dashPattern The dash pattern to use.
        * @param cap The line cap style to use.
        * @param join The line join style to use.
        * @param miterLimit The miter limit to use.
        */
        constructor(colorOrBrushOrOptions?: any, width?: number, dashPattern?: PdfDashPattern, cap?: PdfLineCapStyle, join?: PdfLineJoinStyle, miterLimit?: number);
        /**
        * Gets or sets the color used to stroke paths.
        * The default color is black.
        */
        color: wijmo.Color;
        /**
        * Gets or sets the brush used to stroke paths.
        * Takes precedence over the {@link color} property, if defined.
        */
        brush: PdfBrush;
        /**
        * Gets or sets the line width used to stroke paths, in points.
        * The default width is 1.
        */
        width: number;
        /**
        * Gets or sets the shape that shall be used at the open ends of a stroked path.
        * The default value is <b>Butt</b>.
        */
        cap: PdfLineCapStyle;
        /**
        * Gets or sets the shape to be used at the corners of a stroked path.
        * The default value is <b>Miter</b>.
        */
        join: PdfLineJoinStyle;
        /**
        * Determines the maximum value of the miter length to the line width ratio, when the line
        * join is converted from miter to bevel.
        * The default value is 10.
        */
        miterLimit: number;
        /**
        * Gets the dash pattern used to stroke paths.
        * The default value is a solid line.
        */
        dashPattern: PdfDashPattern;
        /**
        * Creates a copy of this {@link PdfPen}.
        * @return A copy of this pen.
        */
        clone(): PdfPen;
        /**
        * Determines whether the specified {@link PdfPen} instance is equal to the current one.
        *
        * @param value {@link PdfPen} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfPen): boolean;
    }
}
declare module wijmo.pdf {
    /**
     * Represents a font.
     */
    class PdfFont {
        static _DEF_NATIVE_NAME: string;
        static _DEF_FAMILY_NAME: string;
        static _KNOWN_WEIGHTS: {
            'normal': number;
            'bold': number;
            '100': number;
            '200': number;
            '300': number;
            '400': number;
            '500': number;
            '600': number;
            '700': number;
            '800': number;
            '900': number;
        };
        static _KNOWN_STYLES: {
            'normal': number;
            'italic': number;
            'oblique': number;
        };
        static _DEF_PDFKIT_FONT: PdfFont;
        static _DEF_FONT: PdfFont;
        private _family;
        private _size;
        private _style;
        private _weight;
        /**
        * Initializes a new instance of the {@link PdfFont} class.
        *
        * @param family The family name of the font.
        * @param size The size of the font.
        * @param style The style of the font.
        * @param weight The weight of the font.
        */
        constructor(family?: string, size?: number, style?: string, weight?: string);
        /**
        * Gets or sets the family name of the font.
        *
        * The list of the font family names in the order of preferences,
        * separated by commas. Each font family name can be the one that
        * was registered using the {@link PdfDocument.registerFont} method or
        * the name of one of the PDF standard font families: 'courier',
        * 'helvetica', 'symbol', 'times', 'zapfdingbats' or the superfamily
        * name: 'cursive', 'fantasy', 'monospace', 'serif', 'sans-serif'.
        */
        family: string;
        /**
        * Gets or sets the size of the font.
        */
        size: number;
        /**
         * Gets or sets the style of the font.
         *
         * The following values are supported: 'normal', 'italic', 'oblique'.
         */
        style: string;
        /**
         * Gets or sets the weight of the font.
         *
         * The following values are supported: 'normal', 'bold', '100', '200', '300',
         * '400', '500', '600', '700', '800', '900'.
         */
        weight: string;
        /**
        * Creates a copy of this {@link PdfFont}.
        * @return A copy of this font.
        */
        clone(): PdfFont;
        /**
        * Determines whether the specified {@link PdfFont} instance is equal to the current one.
        *
        * @param value {@link PdfFont} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfFont): boolean;
    }
}
declare module wijmo.pdf {
    /** Infrastructure. */
    interface _IPdfTextFlowCtxState {
        xo: number;
        yo: number;
        lineGap: number;
    }
    /**
    * Represents text settings used by {@link PdfPageArea.drawText} and {@link PdfPageArea.measureText} methods.
    */
    interface IPdfTextSettings {
        /**
        * Determines how text is aligned within the drawing area.
        * The default value is {@link PdfTextHorizontalAlign.Left}.
        */
        align?: PdfTextHorizontalAlign;
        /**
        * Determines the current text baseline.
        * The default value is {@link PdfTextBaseline.Top}.
        */
        baseline?: PdfTextBaseline;
        /**
        * Indicates whether line wrapping should be used or not.
        * The property is ignored if {@link IPdfTextSettings.width} is defined.
        * The default value is true.
        */
        lineBreak?: boolean;
        /**
        * Determines the width of the text area in points to which the text should wrap.
        * The default value is undefined which means that the text area will be limited by
        * right margin of the page.
        * Use Infinity to indicate that the text area has an infinite width.
        * If defined, forces the {@link IPdfTextSettings.lineBreak} property to be enabled.
        */
        width?: number;
        /**
        * Determines the height of the drawing area in points to which the text should be clipped.
        * The default value is undefined which means that the text area will be limited by
        * bottom edge of the body section.
        * Use Infinity to indicate that the text area has an infinite height.
        */
        height?: number;
        /**
        * Determines the character to display at the end of the text when it exceeds
        * the given area.The default value is undefined, that is, ellipsis is not displayed.
        * Set to true to use the default character.
        */
        ellipsis?: any;
        /**
        * Determines the number of columns to flow the text into.
        * The default value is 1.
        */
        columns?: number;
        /**
        * Determines the spacing between each column, in points.
        * The default value is 18.
        */
        columnGap?: number;
        /**
        * Determines the value of indentaion in each paragraph of text, in points.
        * The default value is 0.
        */
        indent?: number;
        /**
        * Determines the spacing between paragraphs of text.
        * The default value is 0.
        */
        paragraphGap?: number;
        /**
        * Determines the spacing between lines of text.
        * The default value is 0.
        */
        lineGap?: number;
        /**
        * Determines the spacing between words in the text.
        * The default value is 0.
        */
        wordSpacing?: number;
        /**
        * Determines the spacing between text characters.
        * The default value is 0.
        */
        characterSpacing?: number;
        /**
        * Indicates whether the text should be filled or not.
        * The default value is true.
        */
        fill?: boolean;
        /**
        * Indicates whether the text should be stroked or not.
        * The default value is false.
        */
        stroke?: boolean;
        /**
        * Determines a URL used to create a link annotation (URI action).
        */
        link?: string;
        /**
        * Indicates whether the text should be underlined or not.
        * The default value is false.
        */
        underline?: boolean;
        /**
        * Indicates whether the text should be striked out or not.
        * The default value is false.
        */
        strike?: boolean;
        /**
        * Indicates whether subsequent text should be continued right after that or
        * it will be a new paragraph. If true, the text settings will be retained
        * between drawText calls. It means that options argument will be merged with
        * the one taken from the previous drawText call.
        *
        * The default value is false.
        */
        continued?: boolean;
    }
    /**
    * Represents the settings used by {@link PdfPageArea.drawText} method to draw a text
    * with the specified {@link PdfPen} and {@link PdfBrush}.
    */
    interface IPdfTextDrawSettings extends IPdfTextSettings {
        /**
        * Determines the font to use. If not specified, the default document font will be
        * used ({@link PdfDocument.setFont} method).
        */
        font?: PdfFont;
        /**
        * Determines the pen to stroke the text. If not specified, the default document
        * pen will be used ({@link PdfDocument.setPen} method).
        */
        pen?: PdfPen | wijmo.Color | string;
        /**
        * Determines the brush to fill the text. If not specified, the default document
        * brush will be used ({@link PdfDocument.setBrush} method).
        */
        brush?: PdfBrush | wijmo.Color | string;
    }
    /**
    * Represents the settings used by {@link PdfPageArea.measureText} method.
    */
    interface IPdfTextMeasurementSettings extends IPdfTextSettings {
        /**
        * Determines whether the last line external leading value should be included into the measurements result.
        * The default value is true.
        */
        includeLastLineExternalLeading?: boolean;
    }
    /**
    * Represents the image opened using {@link PdfPageArea.openImage} method.
    */
    interface IPdfImage {
        /**
        * The width of the image, in pixels.
        */
        width: number;
        /**
        * The height of the image, in pixels.
        */
        height: number;
    }
    /**
     * Represents the image drawing settings used by {@link PdfPageArea.drawImage} method.
     *
     * If neither width nor height options are provided, then the image will be rendered
     * in its original size. If only width is provided, then the image will be scaled
     * proportionally to fit in the provided width. If only height is provided, then the
     * image will be scaled proportionally to fit in the provided height. If both width
     * and height are provided, then image will be stretched to the dimensions depending
     * on the stretchProportionally property.
     */
    interface IPdfImageDrawSettings {
        /**
        * Determines the width of the image, in points.
        */
        width?: number;
        /**
        * Determines the height of the image, in points.
        */
        height?: number;
        /**
        * Indicates whether an image will be stretched proportionally or not, if both width
        * and height options are provided.
        */
        stretchProportionally?: boolean;
        /**
        * Determines the horizontal alignment in case of proportional stretching.
        */
        align?: PdfImageHorizontalAlign;
        /**
        * Determines the vertical alignment in case of proportional stretching.
        */
        vAlign?: PdfImageVerticalAlign;
    }
    /**
    * Represents the settings used by {@link PdfPageArea.drawSvg} method to draw a SVG image.
    */
    interface IPdfSvgDrawSettings extends IPdfImageDrawSettings {
        /**
        * Determines a callback function used to convert a relative URL to a URL that is correct for the current request path.
        * The function gets passed the relative URL as its argument and should return the resolved URL.
        */
        urlResolver?: (url: string) => string;
    }
    /**
    * Represents a range of buffered pages returned by {@link PdfDocument.bufferedPageRange} method.
    */
    interface IPdfBufferedPageRange {
        /**
        * Determines the zero-based index of the first buffered page.
        */
        start: number;
        /**
        * Determines the count of buffered pages.
        */
        count: number;
    }
    /**
    * Represents the font attributes.
    */
    interface IPdfFontAttributes {
        /**
        * Glyphs have finishing strokes, flared or tapering ends, or have actual
        * serifed endings.
        */
        cursive?: boolean;
        /**
        * Fantasy fonts are primarily decorative fonts that contain playful representations
        * of characters.
        */
        fantasy?: boolean;
        /**
        * All glyphs have the same width.
        */
        monospace?: boolean;
        /**
        * Glyphs have finishing strokes, flared or tapering ends, or have actual
        * serifed endings.
        */
        serif?: boolean;
        /**
        * Glyphs have stroke endings that are plain.
        */
        sansSerif?: boolean;
    }
    /**
    * Represents the settings of the font to register by {@link PdfDocument.registerFont} and
    * {@link PdfDocument.registerFontAsync} methods.
    */
    interface IPdfFontFile extends IPdfFontAttributes {
        /**
        * An ArrayBuffer containing binary data or URL to load the font from.
        * Following font formats are supported: TrueType (.ttf), TrueType Collection (.ttc),
        * Datafork TrueType (.dfont).
        */
        source: ArrayBuffer | string;
        /**
        * The name of the font to use.
        */
        name: string;
        /**
        * The style of the font. One of the following values: 'normal', 'italic', 'oblique'.
        */
        style?: string;
        /**
        * The weight of the font. One of the following values: 'normal', 'bold', '100', '200',
        *'300', '400', '500', '600', '700', '800', '900'.
        */
        weight?: string;
        /**
        * An optional parameter determining the TrueType Collection or Datafork TrueType
        * font family.
        */
        family?: string;
    }
    /**
    * Represents the document information used by {@link PdfDocument.info} property.
    */
    interface IPdfDocumentInfo {
        /**
        * Determines the name of the person who created the document.
        */
        author?: string;
        /**
        * Determines the date and time the document was created on.
        */
        creationDate?: Date;
        /**
        * Determines the keywords associated with the document.
        */
        keywords?: string;
        /**
        * Determines the date and time when the document was last modified.
        */
        modDate?: Date;
        /**
        * Determines the subject of the document.
        */
        subject?: string;
        /**
        * Determines the title of the document.
        */
        title?: string;
    }
    /**
    * Represents the page margins.
    */
    interface IPdfPageMargins {
        /**
        * Determines the bottom margin, in points.
        */
        bottom: number;
        /**
        * Determines the left margin, in points.
        */
        left: number;
        /**
        * Determines the right margin, in points.
        */
        right: number;
        /**
        * Determines the top margin, in points.
        */
        top: number;
    }
    /**
    * Represents the page settings.
    */
    interface IPdfPageSettings {
        /**
        * Determines the layout of the page.
        */
        layout?: PdfPageOrientation;
        /**
        * Determines the margins of the page.
        */
        margins?: IPdfPageMargins;
        /**
        * Determines the dimensions of the page.
        * The following values are supported:
        * <ul>
        *  <li><b>{@link PdfPageSize}</b>: predefined sizes.</li>
        *  <li><b>{@link Size}</b>: custom sizes.</li>
        * </ul>
        */
        size?: PdfPageSize | wijmo.Size;
    }
    /**
    * Represents the text measurement information returned by {@link PdfPageArea.measureText} method.
    */
    interface IPdfTextMeasurementInfo {
        /**
        * Determines the text size, in points.
        */
        size: wijmo.Size;
        /**
        * Determines the character count.
        */
        charCount: number;
    }
    /**
    * Represents the initialization settings of a running title of the page, like header and footer.
    */
    interface IPdfRunningTitleOptions {
        /**
        * Represents the height of a running title, in points. To hide the running title, set this property to 0.
        *
        * The default value is 24.
        */
        height?: number;
        /**
        * Represents the spacing between each line of text, in points.
        *
        * The default value is 0.
        */
        lineGap?: number;
        /**
        * Represents the declarative content of a running title.
        */
        declarative?: {
            /**
            * Represents the font of the {@link text}.
            */
            font?: PdfFont;
            /**
            * Represents the text of a running title.
            * May contain up to 3 tabular characters ('\t') which are used for separating the text
            * into the parts that will be aligned within the page area using left, center and right
            * alignment.
            * Two kinds of macros are supported, '&[Page]' and '&[Pages]'. The former one designates
            * the current page index while the latter one designates the page count.
            *
            * For example, for the first page of a document having ten pages, the following string:
            * <pre>
            *    '&[Page]\\&[Pages]\theader\t&[Page]\\&[Pages]'
            * </pre>
            * will be translated to:
            * <pre>
            *    '1\10 header 1\10'
            * </pre>
            */
            text?: string;
            /**
            * Represents the brush used to fill the {@link text}.
            */
            brush?: PdfBrush | wijmo.Color | string;
        };
    }
    /**
    * Represents the {@link PdfDocument} permission settings.
    */
    interface IPdfPermissions {
        /**
        * Determines whether annotating, form filling is allowed.
        * The default value is false.
        */
        annotating?: boolean;
        /**
        * Determines copying text for accessibility is allowed.
        *
        * Not supported in PDF 1.3.
        *
        * The default value is false.
        */
        contentAccessibility?: boolean;
        /**
        * Determines whether copying text or graphics is allowed.
        *
        * The default value is false.
        */
        copying?: boolean;
        /**
        * Determines whether whether assembling document is allowed.
        *
        * Not supported in PDF 1.3.
        *
        * The default value is false.
        */
        documentAssembly?: boolean;
        /**
        * Determines whether form filling and signing is allowed.
        *
        * Not supported in PDF 1.3.
        *
        * The default value is false.
        */
        fillingForms?: boolean;
        /**
        * Determines whether modifying the file is allowed.
        *
        * The default value is false.
        */
        modifying?: boolean;
        /**
        * Determines whether printing is allowed.
        *
        * The {@link PdfPrintPermission.AllowLowResolution} value is equivalent to {@link PdfPrintPermission.AllowHighResolution} in PDF 1.3.
        *
        * The default value is {@link PdfPrintPermission.NotAllowed}.
        */
        printing?: PdfPrintPermission;
    }
    /**
    * Represents the {@link PdfDocument} initialization settings.
    */
    interface IPdfDocumentOptions {
        /**
        * Indicates whether the pages buffering mode is enabled which means that the document's pages
        * can be iterated over using {@link PdfDocument.pageIndex} and {@link PdfDocument.bufferedPageRange}.
        *
        * This property can be set to false only if both {@link header} and {@link footer} are invisible.
        *
        * The default value is true.
        */
        bufferPages?: boolean;
        /**
        * Indicates whether the document compression is enabled.
        *
        * The default value is true.
        */
        compress?: boolean;
        /**
        * Specifies whether the window's title bar should display the document title taken from {@link IPdfDocumentInfo.title}.
        * If false, the name of the PDF file should be displayed.
        *
        * The default value is **false**.
        */
        displayTitle?: boolean;
        /**
        * Represents the initialization settings of a footer, the page area positioned right above
        * the bottom margin.
        */
        footer?: IPdfRunningTitleOptions;
        /**
        * Represents the initialization settings of a header, the page area positioned right below
        * the top margin.
        */
        header?: IPdfRunningTitleOptions;
        /**
        * Represents the document information, such as author name, document's creation date and so on.
        */
        info?: IPdfDocumentInfo;
        /**
        * Represents the default natural language of the document.
        *
        * The language code is a 2-character ISO 639 language code (e.g. "en" for English or "ja" for Japanese) followed
        * by an optional 2-character ISO 3166 country code (e.g. "US" for the United States or "JP" for Japan).
        * For example: "en", "en-US", "ja-JP".
        *
        * The default value is **undefined** which means that the document does not have the default natural language.
        */
        lang?: string;
        /**
        * Represents the spacing between each line of text, in points.
        *
        * The default value is 0.
        */
        lineGap?: number;
        /**
        * Represents the PDF owner password.
        *
        * When only owner password is provided, users are able to decrypt and open the document without providing any password,
        * but the access is limited to those operations explicitly permitted according to {@link permissions} settings.
        * Users with owner password have full access to the document.
        *
        * When both owner password and {@link userPassword} are provided, users with user password are able to decrypt the file
        * but only have limited access to the file according to {@link permissions} settings.
        * Users with owner password have full access to the document.
        *
        * The {@link wijmo.pdf.security} module must be added on page to use PDF encryption and permissions settings.
        */
        ownerPassword?: string;
        /**
        * Represents the default page settings for the pages added automatically and for the {@link PdfDocument.addPage} method.
        */
        pageSettings?: IPdfPageSettings;
        /**
        * Represents PDF file permissions.
        *
        * To set permissons for the PDF file, you need to provide an {@link ownerPassword} along with the permissions settings.
        * By default, all operations are disallowed. You need to explicitly allow certain operations.
        *
        * The {@link wijmo.pdf.security} module must be added on page to use PDF encryption and permissions settings.
        */
        permissions?: IPdfPermissions;
        /**
        * Indicates that the document conforms to Tagged PDF conventions.
        * For a document to be recognized as a Tagged PDF document this value must be **true**.
        *
        * The default value is **false**.
        */
        tagged?: boolean;
        /**
        * Represents the PDF user password.
        *
        * When only user password is provided, users with user password are able to decrypt the file and have full access to the document.
        *
        * When both user password and {@link ownerPassword} are provided, users with user password are able to decrypt the file
        * but only have limited access to the file according to {@link permissions} settings.
        * Users with owner password have full access to the document.
        *
        * The {@link wijmo.pdf.security} module must be added on page to use PDF encryption and permissions settings.
        */
        userPassword?: string;
        /**
        * Represents PDF file version.
        *
        * The PDF file version determines encryption algorithm and key length to use:
        * <ul>
        *  <li>{@link PdfVersion.v1_3}, 40-bit RC4.</li>
        *  <li>{@link PdfVersion.v1_4}, 128-bit RC4.</li>
        *  <li>{@link PdfVersion.v1_5}, 128-bit RC4.</li>
        *  <li>{@link PdfVersion.v1_6}, 128-bit AES.</li>
        *  <li>{@link PdfVersion.v1_7}, 128-bit AES.</li>
        *  <li>{@link PdfVersion.v1_7Ext3}, 256-bit AES.</li>
        * </ul>
        *
        * When using PDF version 1.7 ExtensionLevel 3, password is truncated to 127 bytes of its UTF-8 representation.
        * In older versions, password is truncated to 32 bytes, and only Latin-1 characters are allowed.
        *
        * The default value is {@link PdfVersion.v1_3}.
        */
        version?: PdfVersion;
        /**
        * Occurs when the document has been rendered.
        */
        ended?: (sender: PdfDocument, args: PdfDocumentEndedEventArgs) => void;
        /**
        * Occurs when a new page is added to the document.
        */
        pageAdded?: (sender: PdfDocument, args: wijmo.EventArgs) => void;
    }
    /**
     * Represents the options of an artifact.
     */
    interface IPdfArtifactOptions {
        /**
        * The type of the artifact.
        *
        * The default value is **undefined** which means a general artifact.
        */
        type?: PdfArtifactType;
        /**
        * The artifact's bounding box, in page area coordinates, in points.
        *
        * The default value is **undefined** which means that the artifact's bounding box is not set.
        */
        bbox?: wijmo.Rect;
        /**
        * Specifies the edges of the page, if any, to which the pagination artifact is logically attached.
        *
        * The default value is **undefined** which means that the artifact is not attached to any edge of the page.
        */
        attached?: PdfPageEdge[];
    }
    /**
     * Represents the options to mark the content with.
     */
    interface IPdfTagContentOptions {
        /**
        * A language code specifying the natural language for all text in the marked content.
        * Used only if the content is marked with {@link PdfTagType.Span}.
        *
        * The language code is a 2-character ISO 639 language code (e.g. "en" for English or "ja" for Japanese) followed
        * by an optional 2-character ISO 3166 country code (e.g. "US" for the United States or "JP" for Japan).
        * For example: "en", "en-US", "ja-JP".
        *
        * The default value is **undefined** which means that the marked content does not have the default natural language.
        */
        lang?: string;
        /**
        * An alternative description of the marked contentand its children in human-redable form.
        * Used only if the content is marked with {@link PdfTagType.Span}.
        *
        * The default value is **undefined** which means that the marked content does not have an alternative description.
        */
        alt?: string;
        /**
        * The expanded form of an abbreviation (PDF 1.5)
        * Used only if the content is marked with {@link PdfTagType.Span}.
        *
        * The default value is **undefined** which means that the marked content does not have the expanded form of an abbreviation.
        */
        expanded?: string;
        /**
        * Text that is an exact replacement for the marked content.
        * Used only if the content is marked with {@link PdfTagType.Span}.
        *
        * The default value is **undefined** which means that the marked content has no replacement.
        */
        actual?: string;
    }
    /**
    * Represents the {@link IPdfTag} settings used by {@link PdfDocument.tag} method.
    */
    interface IPdfTagOptions {
        /**
         * The title of the tag element, a text string representing it in human-redable form.
         *
         * The default value is **undefined** which means that the tag element has no title.
         */
        title?: string;
        /**
        *  A language code specifying the natural language for all text in the tag element.
        *
        * The language code is a 2-character ISO 639 language code (e.g. "en" for English or "ja" for Japanese) followed
        * by an optional 2-character ISO 3166 country code (e.g. "US" for the United States or "JP" for Japan).
        * For example: "en", "en-US", "ja-JP".
        *
        * The default value is **undefined** which means that the tag element does not have the default natural language.
        */
        lang?: string;
        /**
        * An alternative description of the tag element and its children in human-redable form.
        *
        * The default value is **undefined** which means that the tag element does not have an alternative description.
        */
        alt?: string;
        /**
        * The expanded form of an abbreviation (PDF 1.5)
        *
        * The default value is **undefined** which means that the tag element does not have the expanded form of an abbreviation.
        */
        expanded?: string;
        /**
        * Text that is an exact replacement for the tag element and its children.
        *
        * The default value is **undefined** which means that the tag element has no replacement.
        */
        actual?: string;
    }
    /**
     * Represents an element in the document's logical structure tree.
     */
    interface IPdfTag {
        /**
         * Adds content to the element.
         *
         * @param child The child element or array of child elements.
         * The following child types are supported:
         * <ul>
         *   <li>A {@link IPdfTag} object to nest within the element.</li>
         *   <li>
         *     A {@link IPdfTagContent} object, a reference to the marked content to associate with the element.
         *   </li>
         *   <li>
         *     A callback function that will be automatically executed when the created element is attached to the document's structure tree.
         *     The content created by this function will be marked with the tag specified by the **type** parameter and associated with the element.
         *   </li>
         * </ul>
         *
         * @return The {@link IPdfTag} object.
         */
        add(child: PdfTagOrContent | PdfTagOrContent[]): IPdfTag;
        /**
         * Ends the element and all of its children and flush it to the document.
         */
        end(): void;
    }
    /**
     * Represents a reference to the marked content that can be added to a {@link IPdfTag}.
     */
    interface IPdfTagContent {
    }
    /**
     * Specifies elements that can be passed to the {@link IPdfTag.add} and {@link PdfDocument.tag} methods via the **child** parameter.
     */
    type PdfTagOrContent = IPdfTag | IPdfTagContent | (() => void);
}
declare module wijmo.pdf {
    class _PdfFontRegistrar {
        private _fonts;
        private _weightNameToNum;
        private _doc;
        private _findFontCache;
        private _internalFontNames;
        constructor(doc: any);
        registerFont(font: IPdfFontFile): string;
        findFont(name: string, style?: string, weight?: string): string;
        private _normalizeFontSelector;
        private _findFont;
        private _findFontWeightFallback;
        private _makeInternalName;
    }
}
declare module wijmo.pdf {
    var _IE: boolean;
    /**
     * Saves the Blob object as a file.
     * @param blob The Blob object to save.
     * @param fileName The name with which the file is saved.
    */
    function saveBlob(blob: Blob, fileName: string): void;
    /**
    * Converts a point unit value to a pixel unit value.
    *
    * @param value The value to convert.
    * @return The converted value.
    */
    function ptToPx(value: number): number;
    /**
    * Converts a pixel unit value to a point unit value.
    *
    * @param value The value to convert.
    * @return The converted value.
    */
    function pxToPt(value: number): number;
    function _asColor(value: wijmo.Color | string, clone?: boolean): wijmo.Color;
    function _asPdfPen(value: PdfPen | wijmo.Color | string, nullOK?: boolean): PdfPen;
    function _asPdfBrush(value: PdfBrush | wijmo.Color | string, nullOK?: boolean): PdfBrush;
    function _asPdfFont(value: PdfFont, nullOK?: boolean): PdfFont;
    function _asPt(value: any, emptyOK?: boolean, emptyValue?: number): number;
    function _formatMacros(str: string, dict: any): string;
    function _compare(a: any, b: any): boolean;
    function _toTitleCase(value: string): string;
}
declare module wijmo.pdf {
    class _XhrHelper {
        static arrayBufferAsync(url: string, success: (xhr: XMLHttpRequest, data: ArrayBuffer) => void, error?: (xhr: XMLHttpRequest) => void): void;
        static arrayBuffer(url: string, error?: (xhr: XMLHttpRequest) => void): ArrayBuffer;
        static text(url: string, error?: (xhr: XMLHttpRequest) => void): string;
        private static _getData;
    }
}
declare module wijmo.pdf {
    class _PdfImageHelper {
        private static DATAURI_CACHE;
        static getDataUri(url: string): string;
        private static _toBase64;
    }
}
declare module wijmo.pdf {
    /**
    * Represents an area of a page with its own coordinate system, where (0, 0) points
    * to the top-left corner.
    * Provides methods for drawing text, images, paths and transformations.
    *
    * This class is not intended to be instantiated in your code.
    */
    class PdfPageArea {
        private _pdfdoc;
        private _ndoc;
        _offset: wijmo.Point;
        private _graphics;
        private _drawingText;
        private _ctxProps;
        /**
        * Initializes a new instance of the {@link PdfPageArea} class.
        */
        constructor();
        /**
        * Gets or sets the X-coordinate (in points) of the current point in the text flow
        * used to draw a text or an image.
        */
        x: number;
        /**
        * Gets or sets the Y-coordinate (in points) of the current point in the text flow
        * used to draw a text or an image.
        */
        y: number;
        /**
        * Gets or sets the spacing between each line of text, in points.
        *
        * The default value is 0.
        */
        lineGap: number;
        /**
        * Gets the height of the area, in points.
        */
        readonly height: number;
        /**
        * Gets the width of the area, in points.
        */
        readonly width: number;
        readonly _heightCtm: number;
        readonly _widthCtm: number;
        /**
        * Gets an object that provides ability to draw paths.
        */
        readonly paths: PdfPaths;
        /**
        * Gets the document object.
        */
        readonly document: PdfDocument;
        /**
        * Draws a string with the given options and returns the measurement information.
        *
        * If <b>options.pen</b>, <b>options.brush</b> or <b>options.font</b> are omitted,
        * the current document's pen, brush or font are used (see {@link PdfDocument.setPen},
        * {@link PdfDocument.setBrush}, and  {@link PdfDocument.setFont}).
        *
        * The string is drawn within the rectangular area for which top-left corner, width
        * and  height are defined by the x, y, <b>options.width</b> and <b>options.height</b>
        * values. If x and y are not provided, the {@link PdfDocument.x} and {@link PdfDocument.y}
        * properties are used instead.
        *
        * The text is wrapped and clipped automatically within the area.
        * If <b>options.height</b> is not provided and the text exceeds the bottom body edge,
        * then a new page will be added to accommodate the text.
        *
        * Finally, the method updates the value of the {@link PdfDocument.x} and {@link PdfDocument.y}
        * properties. Hence, any subsequent text or image starts below this point
        * (depending on the value of <b>options.continued</b>).
        *
        * The measurement result doesn't reflect the fact that text can be split into
        * multiple pages or columns; the text is treated as a single block.
        *
        * @param text The text to draw.
        * @param x The X-coordinate of the point to draw the text at, in points.
        * @param y The Y-coordinate of the point to draw the text at, in points.
        * @param options Determines the text drawing options.
        * @return A {@link IPdfTextMeasurementInfo} object determines the measurement information.
        */
        drawText(text: string, x?: number, y?: number, options?: IPdfTextDrawSettings): IPdfTextMeasurementInfo;
        /**
        * Draws an image in JPG or PNG format with the given options.
        *
        * If x and y are not defined, then {@link x} and {@link y} are used instead.
        *
        * Finally, if the image was drawn in the text flow, the method updates {@link y}.
        * Hence, any subsequent text or image starts below this point.
        *
        * @param src A string containing the URL to get the image from, or the data URI containing a base64 encoded image,
        * or a {@link wijmo.pdf.IPdfImage} object returned by the {@link openImage} method.
        * @param x The x-coordinate of the point to draw the image at, in points.
        * @param y The y-coordinate of the point to draw the image at, in points.
        * @param options Determines the image drawing options.
        * @return The {@link PdfPageArea} object.
        */
        drawImage(src: string | IPdfImage, x?: number, y?: number, options?: IPdfImageDrawSettings): PdfPageArea;
        /**
        * Draws a SVG image with the given options.
        *
        * If x and y are not defined, then {@link x} and {@link y} are used instead.
        *
        * The method uses the values of the width and height attributes of the outermost svg element to determine the
        * scale factor according to the options.width and options.height properties. If any of these attributes are
        * omitted then scaling is not performed and the image will be rendered in its original size.
        *
        * Finally, if the image was drawn in the text flow, the method updates {@link y}.
        * Hence, any subsequent text or image starts below this point.
        * The increment value is defined by the options.height property or by the outermost svg element's height attribute, which comes first.
        * If none of them is provided then {@link y} will stay unchanged.
        *
        * The method supports a limited set of SVG features and provided primarily for rendering wijmo 5 chart controls.
        *
        * @param url A string containing the URL to get the SVG image from or the data URI containing a base64 encoded SVG image.
        * @param x The x-coordinate of the point to draw the image at, in points.
        * @param y The y-coordinate of the point to draw the image at, in points.
        * @param options Determines the SVG image drawing options.
        * @return The {@link PdfPageArea} object.
        */
        drawSvg(url: string, x?: number, y?: number, options?: IPdfSvgDrawSettings): PdfPageArea;
        /**
        * Gets the line height with a given font.
        *
        * If font is not specified, then font used in the current document is used.
        *
        * @param font Font to get the line height.
        * @return The line height, in points.
        */
        lineHeight(font?: PdfFont): number;
        /**
        * Measures a text with the given font and text drawing options without rendering it.
        *
        * If font is not specified, then the font used in the current document is used.
        *
        * The method uses the same text rendering engine as {@link drawText}, so it is tied up
        * in the same way to {@link x} and the right page margin, if options.width is not
        * provided. The measurement result doesn't reflect the fact that text can be split
        * into multiple pages or columns; the text is treated as a single block.
        *
        * @param text Text to measure.
        * @param font Font to be applied on the text.
        * @param options Determines the text drawing options.
        * @return A {@link IPdfTextMeasurementInfo} object determines the measurement information.
        */
        measureText(text: string, font?: PdfFont, options?: IPdfTextMeasurementSettings): IPdfTextMeasurementInfo;
        /**
        * Moves down the {@link y} by a given number of lines using the given font or,
        * using the font of current document, if not specified.
        *
        * @param lines Number of lines to move down.
        * @param font Font to calculate the line height.
        * @return The {@link PdfPageArea} object.
        */
        moveDown(lines?: number, font?: PdfFont): PdfPageArea;
        /**
        * Moves up the {@link y} by a given number of lines using the given font or,
        * using the font of current document, if not specified.
        *
        * @param lines Number of lines to move up.
        * @param font Font to calculate the line height.
        * @return The {@link PdfPageArea} object.
        */
        moveUp(lines?: number, font?: PdfFont): PdfPageArea;
        /**
        * Opens an image in JPG or PNG format.
        *
        * @param url A string containing the URL to get the image from or the data URI containing a base64 encoded image.
        * @return The {@link IPdfImage} object containing image data.
        */
        openImage(url: string): IPdfImage;
        /**
        * Scales the graphic context by a specified scaling factor.
        *
        * The scaling factor value within the range [0, 1] indicates that the size will be
        * decreased.
        * The scaling factor value greater than 1 indicates that the size will be increased.
        *
        * @param xFactor The factor to scale the X dimension.
        * @param yFactor The factor to scale the Y dimension. If it is not provided, it is
        * assumed to be equal to xFactor.
        * @param origin The {@link Point} to scale around, in points. If it is not provided,
        * then the top left corner is used.
        * @return The {@link PdfPageArea} object.
        */
        scale(xFactor: number, yFactor?: number, origin?: wijmo.Point): PdfPageArea;
        /**
        * Translates the graphic context with a given distance.
        *
        * @param x The distance to translate along the X-axis, in points.
        * @param y The distance to translate along the Y-axis, in points.
        * @return The {@link PdfPageArea} object.
        */
        translate(x: number, y: number): PdfPageArea;
        /**
        * Transforms the graphic context with given six numbers which represents a
        * 3x3 transformation matrix.
        *
        * A transformation matrix is written as follows:
        * <table>
        *   <tr><td>a</td><td>b</td><td>0</td></tr>
        *   <tr><td>c</td><td>d</td><td>0</td></tr>
        *   <tr><td>e</td><td>f</td><td>1</td></tr>
        * </table>
        *
        * @param a Value of the first row and first column.
        * @param b Value of the first row and second column.
        * @param c Value of the second row and first column.
        * @param d Value of the second row and second column.
        * @param e Value of the third row and first column.
        * @param f Value of the third row and second column.
        * @return The {@link PdfPageArea} object.
        */
        transform(a: number, b: number, c: number, d: number, e: number, f: number): PdfPageArea;
        /**
        * Rotates the graphic context clockwise by a specified angle.
        *
        * @param angle The rotation angle, in degrees.
        * @param origin The {@link Point} of rotation, in points. If it is not provided,
        * then the top left corner is used.
        */
        rotate(angle: number, origin?: wijmo.Point): PdfPageArea;
        /**
         * Begins marking the content with the given tag and returns the tag content element, an object which represent a reference to the marked content.
         * The tag content element can be incorporated into the document's structure tree by adding to a tag element.
         * Each call of beginTagContent() should be enclosed with {@link endTagContent}.
         *
         * For example:
         * <pre>
         * let content = doc.beginTagContent(wijmo.pdf.PdfTagType.P);
         * doc.drawText('Hello, world!');
         * doc.endTagContent();
         *
         * let tag = doc.tag(wijmo.pdf.PdfTagType.P);
         * tag.add(content);
         * doc.addTag(tag);
         * </pre>
         *
         * Note: Marking tag content will automatically end current marking of tag content (and any descendent marking).
         *
         * @param tag The marking tag.
         * @param options Tag content options.
         *
         * @return The {@link IPdfTagContent} object that repesents a reference to the marked content.
         */
        beginTagContent(tag: PdfTagType, options?: IPdfTagContentOptions): IPdfTagContent;
        /**
         * Ends the tag content marking.
         *
         * For example:
         * <pre>
         * let content = doc.beginTagContent(wijmo.pdf.PdfTagType.P);
         * doc.drawText('Hello, world!');
         * doc.endTagContent();
         * </pre>
         *
         * @return The {@link PdfPageArea} object.
         */
        endTagContent(): PdfPageArea;
        /**
         * Marks content with the given tag and returns the tag content element, an object which represent a reference to the marked content.
         * The tag content element can be incorporated into the document's structure tree by adding to a tag element.
         *
         * For example:
         * <pre>
         * let content = doc.tagContent(wijmo.pdf.PdfTagType.P, () => doc.drawText('Hello, world!'));
         *
         * let tag = doc.tag(wijmo.pdf.PdfTagType.P);
         * tag.add(content);
         * doc.addTag(tag);
         * </pre>
         *
         * @param tag The marking tag.
         * @param callback A callback function that will be automatically executed within a {@link beginTagContent}/{@link endTagContent} block.
         * @param options Tag content options.
         *
         * @return The {@link IPdfTagContent} object that repesents a reference to the marked content.
         */
        tagContent(tag: PdfTagType, callback: (() => void), options?: IPdfTagContentOptions): IPdfTagContent;
        /**
         * Begins marking content as an PDF artifact.
         * Each call of beginArtifact() should be enclosed with {@link endArtifact}.
         *
         * For example:
         * <pre>
         * doc.beginArtifact();
         * doc.drawText('Artifact');
         * doc.endArtifact();
         * </pre>
         *
         * @param options Artifact options.
         *
         * @return The {@link PdfPageArea} object.
         */
        beginArtifact(options?: IPdfArtifactOptions): PdfPageArea;
        /**
         * Ends marking content as an PDF artifact.
         *
         * For example:
         * <pre>
         * doc.beginArtifact();
         * doc.drawText('Artifact');
         * doc.endArtifact();
         * </pre>
         *
         * @return The {@link PdfPageArea} object.
         */
        endArtifact(): PdfPageArea;
        /**
         * Marks content as an artifact.
         *
         * For example:
         * <pre>
         * doc.artifact(() => doc.drawText('Artifact'));
         * </pre>
         *
         * @param callback A callback function that will be automatically executed within a {@link beginArtifact}/{@link endArtifact} block.
         * @param options Artifact options.
         *
         * @return The {@link IPdfTagContent} object that repesents a reference to the marked content.
         */
        artifact(callback: (() => void), options?: IPdfArtifactOptions): PdfPageArea;
        _assertPathStarted(): void;
        _initialize(doc: PdfDocument, xo: number, yo: number): void;
        _isDrawingText(): boolean;
        private _switchCtx;
        private _saveCtx;
        private _markedContentOptionsToNative;
        private _textOptionsToNative;
    }
}
declare module wijmo.pdf {
    /**
    * Represents a brush used to fill an area with a color.
    */
    class PdfSolidBrush extends PdfBrush {
        private _color;
        /**
        * Initializes a new instance of the {@link PdfSolidBrush} class.
        *
        * @param color The color of this brush. A {@link wijmo.Color} object or any string
        * acceptable by the {@link wijmo.Color.fromString} method.
        */
        constructor(color?: any);
        /**
        * Gets or sets the color of the brush.
        * The default color is black.
        */
        color: wijmo.Color;
        /**
        * Creates a copy of this {@link PdfSolidBrush}.
        * @return A copy of this brush.
        */
        clone(): PdfSolidBrush;
        /**
        * Determines whether the specified {@link PdfSolidBrush} instance is equal
        * to the current one.
        *
        * @param value {@link PdfSolidBrush} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfSolidBrush): boolean;
        _getBrushObject(area: PdfPageArea): wijmo.Color;
    }
}
declare module wijmo.pdf {
    /**
    * Represents the declarative content of the running title.
    */
    class PdfRunningTitleDeclarativeContent {
        private _font;
        private _text;
        private _brush;
        /**
        * Initializes a new instance of the {@link PdfRunningTitleDeclarativeContent} class.
        *
        * @param text The text of the running title.
        * @param font Font of the text.
        * @param brush The {@link PdfBrush} or {@link wijmo.Color} or any string acceptable
        * by the {@link wijmo.Color.fromString} method used to fill the text.
        */
        constructor(text?: string, font?: PdfFont, brush?: PdfBrush | wijmo.Color | string);
        /**
        * Gets or sets the font of the {@link text}.
        */
        font: PdfFont;
        /**
        * Gets or sets the text of the running title.
        *
        * May contain up to 3 tabular characters ('\t') which are used for separating the text
        * into the parts that will be aligned within the page area using left, center and right
        * alignment.
        * Two kinds of macros are supported, '&[Page]' and '&[Pages]'. The former one designates
        * the current page index while the latter one designates the page count.
        *
        * For example, for the first page of a document having ten pages, the following string:
        * <pre>
        * '&[Page]\\&[Pages]\theader\t&[Page]\\&[Pages]'
        * </pre>
        * will be translated to:
        * <pre>
        * '1\10 header 1\10'
        * </pre>
        */
        text: string;
        /**
        * Gets or sets the brush used to fill the {@link text}.
        */
        brush: PdfBrush;
        /**
        * Creates a copy of this {@link PdfRunningTitleDeclarativeContent}.
        * @return A copy of this pen.
        */
        clone(): PdfRunningTitleDeclarativeContent;
        /**
        * Determines whether the specified {@link PdfRunningTitleDeclarativeContent} instance
        * is equal to the current one.
        *
        * @param value {@link PdfRunningTitleDeclarativeContent} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfRunningTitleDeclarativeContent): boolean;
    }
}
declare module wijmo.pdf {
    /**
    * Represents a running title of the page, like header and footer.
    *
    * This class is not intended to be instantiated in your code.
    */
    class PdfRunningTitle extends PdfPageArea {
        private _height;
        private _declarative;
        _heightChanged: Event<PdfRunningTitle, EventArgs>;
        /**
        * Initializes a new instance of the {@link PdfRunningTitle} class.
        *
        * @param options An optional object containing initialization settings.
        */
        constructor(options?: any);
        /**
        * Gets or sets an object that provides the ability to setup the running title
        * content declaratively.
        */
        declarative: PdfRunningTitleDeclarativeContent;
        /**
        * Gets or sets the height of the running title, in points.
        * To hide the running title, set this property to 0.
        * Changing this property has no effect on previous drawings; they will not be resized
        * or clipped.
        *
        * The default value is 24.
        */
        height: number;
        drawText(text: any, x?: any, y?: any, options?: IPdfTextDrawSettings): IPdfTextMeasurementInfo;
    }
}
declare module wijmo.pdf {
    /**
    * Represents an object which determines a transition point of a gradient.
    */
    class PdfGradientStop {
        private _offset;
        private _color;
        private _opacity;
        /**
        * Initializes a new instance of the {@link PdfGradientStop} class.
        *
        * @param offset The location of the gradient stop on the gradient axis.
        * @param color The color of the gradient stop. A {@link wijmo.Color} object or
        * any string acceptable by the {@link wijmo.Color.fromString} method.
        * @param opacity The opacity of the gradient stop.
        */
        constructor(offset?: number, color?: any, opacity?: number);
        /**
        * Gets or sets the location of the gradient stop on gradient axis of the brush.
        * The value must be in range [0, 1], where 0 indicates that the gradient stop is
        * placed at the beginning of the gradient axis, while 1 indicates that the
        * gradient stop is placed at the end of the gradient axis.
        * The default value is 0.
        */
        offset: number;
        /**
        * Gets or sets the color of the gradient stop.
        * The default color is black.
        */
        color: wijmo.Color;
        /**
        * Gets or sets the opacity of the gradient stop.
        * The value must be in range [0, 1], where 0 indicates that the gradient stop is
        * completely transparent, while 1 indicates that the gradient stop is completely
        * opaque. The default value is 1.
        */
        opacity: number;
        /**
        * Creates a copy of this {@link PdfGradientStop}.
        * @return A copy of this gradient stop.
        */
        clone(): PdfGradientStop;
        /**
        * Determines whether the specified {@link PdfGradientStop} instance is equal to
        * the current one.
        *
        * @param value {@link PdfGradientStop} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfGradientStop): boolean;
    }
}
declare module wijmo.pdf {
    /**
    * Represents an abstract class that serves as a base class for the
    * {@link PdfLinearGradientBrush} and {@link PdfRadialGradientBrush} classes.
    *
    * This class is not intended to be instantiated in your code.
    */
    class PdfGradientBrush extends PdfBrush {
        private _opacity;
        private _stops;
        /**
        * Initializes a new instance of the {@link PdfGradientBrush} class.
        *
        * @param stops The {@link PdfGradientStop} array to set on this brush.
        * @param opacity The opacity of this brush.
        */
        constructor(stops?: PdfGradientStop[], opacity?: number);
        /**
        * Gets or sets the opacity of the brush.
        * The value must be in range [0, 1], where 0 indicates that the brush is
        * completely transparent and 1 indicates that the brush is completely opaque.
        * The default value is 1.
        */
        opacity: number;
        /**
        * Gets or sets an array of {@link PdfGradientStop} objects representing a color,
        * offset and opacity within the brush's gradient axis.
        * The default value is an empty array.
        */
        stops: PdfGradientStop[];
        /**
        * Determines whether the specified {@link PdfGradientBrush} instance is equal
        * to the current one.
        *
        * @param value {@link PdfGradientBrush} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfGradientBrush): boolean;
        private _cloneStopsArray;
    }
}
declare module wijmo.pdf {
    /**
    * Represents a brush used to fill an area with a radial gradient.
    */
    class PdfRadialGradientBrush extends PdfGradientBrush {
        private _x1;
        private _y1;
        private _r1;
        private _x2;
        private _y2;
        private _r2;
        /**
        * Initializes a new instance of the {@link PdfRadialGradientBrush} class.
        *
        * @param x1 The X-coordinate of the inner circle's center of the radial gradient.
        * @param y1 The Y-coordinate of the inner circle's center of the radial gradient.
        * @param r1 The radius of the inner circle of the radial gradient.
        * @param x2 The X-coordinate of the outer circle's center of the radial gradient.
        * @param y2 The Y-coordinate of the outer circle's center of the radial gradient.
        * @param r2 The radius of the outer circle of the radial gradient.
        * @param stops The {@link PdfGradientStop} array to set on this brush.
        * @param opacity The opacity of this brush.
        */
        constructor(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number, stops: PdfGradientStop[], opacity?: number);
        /**
        * Gets or sets the X-coordinate of the inner circle's center that represents the
        * starting point of the radial gradient, in page area coordinates, in points.
        */
        x1: number;
        /**
        * Gets or sets the Y-coordinate of the inner circle's center that represents the
        * starting point of the radial gradient, in page area coordinates, in points.
        */
        y1: number;
        /**
        * Gets or sets the radius of the inner circle that represents the starting
        * point of the radial gradient, in page area coordinates, in points.
        */
        r1: number;
        /**
        * Gets or sets the X-coordinate of the outer circle's center that represents the ending point of the radial gradient, in page area coordinates, in points.
        */
        x2: number;
        /**
        * Gets or sets the Y-coordinate of the outer circle's center that represents
        * the ending point of the radial gradient, in page area coordinates, in points.
        */
        y2: number;
        /**
        * Gets or sets the radius of the outer circle that represents the ending point of the
        * radial gradient, in page area coordinates, in points.
        */
        r2: number;
        /**
        * Creates a copy of this {@link PdfRadialGradientBrush}.
        * @return A copy of this brush.
        */
        clone(): PdfRadialGradientBrush;
        /**
        * Determines whether the specified {@link PdfRadialGradientBrush} instance is equal
        * to the current one.
        *
        * @param value {@link PdfRadialGradientBrush} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfRadialGradientBrush): boolean;
        _getBrushObject(area: PdfPageArea): any;
    }
}
declare module wijmo.pdf {
    /**
    * Represents a PDF document object, based on <a href="https://github.com/foliojs/pdfkit">PDFKit</a> JavaScript library.
    */
    class PdfDocument extends PdfPageArea {
        private _doc;
        private _docInitialized;
        private _compress;
        private _bufferPages;
        private _chunks;
        private _fontReg;
        private _pageIndex;
        private _version;
        private _userPassword;
        private _ownerPassword;
        private _permissions;
        private _tagged;
        private _displayTitle;
        private _lang;
        private _ehOnPageAdded;
        private _ehOnPageAdding;
        private _ehOnDocData;
        private _ehOnDocEnding;
        private _ehOnDocEnded;
        private _header;
        private _footer;
        private _graphicsStack;
        private _currentGS;
        private _defPen;
        private _defBrush;
        private _curFont;
        private _defFont;
        /**
        * Initializes a new instance of the {@link PdfDocument} class.
        *
        * @param options An optional object containing initialization settings.
        */
        constructor(options?: IPdfDocumentOptions);
        /**
        * Gets a value that indicates whether the document compression is enabled.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        *
        * The default value is true.
        */
        readonly compress: boolean;
        /**
        * Gets a value that indicates whether the pages buffering mode is enabled which means
        * that the document's pages can be iterated over using {@link pageIndex} and {@link bufferedPageRange}.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        * This property can be set to false only if both {@link header} and {@link footer} are invisible.
        *
        * The default value is true.
        */
        readonly bufferPages: boolean;
        /**
        * Gets a value that specifies whether the window's title bar should display the document title taken from {@link IPdfDocumentInfo.title}.
        * If false, the name of the PDF file should be displayed.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        *
        * The default value is **false**.
        */
        readonly displayTitle: boolean;
        /**
        * Gets an object that represents a footer, the page area positioned right above
        * the bottom margin.
        */
        readonly footer: PdfRunningTitle;
        /**
        * Gets an object that represents a header, the page area positioned right below
        * the top margin.
        */
        readonly header: PdfRunningTitle;
        /**
        * Gets or sets the document information, such as author name, document's creation
        * date and so on.
        */
        info: IPdfDocumentInfo;
        /**
        * Gets a value that represents the default natural language of the document.
        *
        * The language code is a 2-character ISO 639 language code (e.g. "en" for English or "ja" for Japanese) followed
        * by an optional 2-character ISO 3166 country code (e.g. "US" for the United States or "JP" for Japan).
        * For example: "en", "en-US", "ja-JP".
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        *
        * The default value is **undefined** which means that the document does not have the default natural language.
        */
        readonly lang: string;
        /**
        * Gets the PDF owner password.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        */
        readonly ownerPassword: string;
        /**
        * Gets or sets the index of the current page within the buffered pages range.
        *
        * Use the {@link bufferedPageRange} method to get the range of buffered pages.
        */
        pageIndex: number;
        /**
        * Gets an object that represents the default page settings for the pages added
        * automatically and for the {@link addPage} method.
        */
        pageSettings: IPdfPageSettings;
        /**
        * Gets an object that represents PDF file permissions.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        * Changing the property after creating PdfDocument will not have any effect.
        */
        readonly permissions: IPdfPermissions;
        /**
        * Gets a value that indicates that the document conforms to Tagged PDF conventions.
        * For a document to be recognized as a Tagged PDF document this value must be **true**.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        *
            * Note: tagged PDF requires document version 1.4 or higher.
            *
        * The default value is **false**.
        */
        readonly tagged: boolean;
        /**
        * Gets the PDF user password.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        */
        readonly userPassword: string;
        /**
        * Gets PDF file version.
        *
        * This property can be assigned using the {@link IPdfDocumentOptions} object passed to the {@link PdfDocument} constructor.
        *
        * The default version is {@link PdfVersion.v1_3}.
        */
        readonly version: PdfVersion;
        /**
        * Occurs when the document has been rendered.
        */
        readonly ended: Event<PdfDocument, PdfDocumentEndedEventArgs>;
        /**
        * Occurs when a new page is added to the document.
        */
        readonly pageAdded: Event<PdfDocument, EventArgs>;
        /**
        * Raises the {@link end} event.
        *
        * @param args A {@link PdfDocumentEndedEventArgs} object that contains the event data.
        */
        onEnded(args: PdfDocumentEndedEventArgs): void;
        /**
        * Raises the {@link pageAdded} event.
        *
        * @param args A {@link EventArgs} object that contains the event data.
        */
        onPageAdded(args: wijmo.EventArgs): void;
        /**
        * Disposes the document.
        */
        dispose(): void;
        /**
        * Gets an object that represents the current page settings (read-only).
        *
        * @return A {@link IPdfPageSettings} object that represents the current page settings.
        */
        readonly currentPageSettings: IPdfPageSettings;
        /**
        * Adds a new page with the given settings.
        *
        * If the settings parameter is omitted, then {@link pageSettings} will be used instead.
        *
        * @param settings Page settings.
        * @return The {@link PdfDocument} object.
        */
        addPage(settings?: IPdfPageSettings): PdfDocument;
        /**
        * Gets the range of buffered pages.
        * @return A {@link IPdfBufferedPageRange} object that represents the range of buffered pages.
        */
        bufferedPageRange(): IPdfBufferedPageRange;
        /**
        * Finishes the document rendering.
        */
        end(): void;
        /**
        * Sets the default document brush.
        * This brush will be used by the {@link PdfPaths.fill}, {@link PdfPaths.fillAndStroke} and
        * {@link drawText} methods, if no specific brush is provided.
        *
        * The brush argument can accept the following values:
        * <ul>
        *   <li>A {@link PdfBrush} object.</li>
        *   <li>
        *     A {@link wijmo.Color} object or any string acceptable by the {@link wijmo.Color.fromString} method.
        *     In this case, the {@link PdfBrush} object with the specified color will be created internally.
        *    </li>
        * </ul>
        *
        * @param brush The brush or color to use.
        * @return The {@link PdfDocument} object.
        */
        setBrush(brush: PdfBrush | wijmo.Color | string): PdfDocument;
        /**
        * Sets the default document pen.
        * This pen will be used by the {@link PdfPaths.stroke}, {@link PdfPaths.fillAndStroke}
        * and {@link drawText} methods, if no specific pen is provided.
        *
        * The pen argument can accept the following values:
        * <ul>
        *   <li>A {@link PdfPen} object.</li>
        *   <li>
        *     A {@link wijmo.Color} object or any string acceptable by the {@link wijmo.Color.fromString} method.
        *     In this case, the {@link PdfPen} object with the specified color will be created internally.
        *   </li>
        * </ul>
        *
        * @param pen The pen or color to use.
        * @return The {@link PdfDocument} object.
        */
        setPen(pen: PdfPen | wijmo.Color | string): PdfDocument;
        /**
        * Sets the document font.
        *
        * If exact font with given style and weight properties is not found then,
        * <ul>
        *   <li>
        *     It tries to search the closest font using
        *     <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight">font weight fallback</a>.
        *   </li>
        *   <li>
        *     If still nothing is found, it tries to find the closest font with other style in following order:
        *     <ul>
        *       <li><b>'italic'</b>: 'oblique', 'normal'.</li>
        *       <li><b>'oblique'</b>: 'italic', 'normal'.</li>
        *       <li><b>'normal'</b>: 'oblique', 'italic'.</li>
        *     </ul>
        *   </li>
        * </ul>
        *
        * @param font The font object to set.
        *
        * @return The {@link PdfDocument} object.
        */
        setFont(font: PdfFont): PdfDocument;
        _getFont(): PdfFont;
        /**
        * Registers a font from a source and associates it with a given font family name
        * and font attributes.
        *
        * @param font The font to register.
        *
        * @return The {@link PdfDocument} object.
        */
        registerFont(font: IPdfFontFile): PdfDocument;
        /**
        * Registers a font from a URL asynchronously and associates it with a given font
        * family name and font attributes.
        *
        * The callback function takes a {@link IPdfFontFile} object as a parameter.
        *
        * @param font The font to register.
        * @param callback A callback function which will be called, when the font has been
        * registered.
        */
        registerFontAsync(font: IPdfFontFile, callback: (font: IPdfFontFile) => void): void;
        /**
        * Saves the state of the graphic context (including current pen, brush and
        * transformation state) and pushes it onto stack.
        *
        * @return The {@link PdfDocument} object.
        */
        saveState(): PdfDocument;
        /**
        * Restores the state from the stack and applies it to the graphic context.
        *
        * @return The {@link PdfDocument} object.
        */
        restoreState(): PdfDocument;
        /**
         * Creates a tag element that represents an item in the document's structure tree.
         *
         * For example:
         * <pre>
         * // Mark some text as a paragraph.
         *   let content = doc.beginTagContent(wijmo.pdf.PdfTagType.P);
         * doc.drawText('Hello, world!');
         *   doc.endTagContent();
         *
         *   // Create the tag element and add content to it.
         *   let tag = doc.tag(wijmo.pdf.PdfTagType.P);
         *   tag.add(content);
         *
         *   // Add the tag element to the document's structure tree.
         *   doc.addTag(tag);
         * </pre>
         *
         * The same, using a callback function:
         * <pre>
             * doc.addTag(doc.tag(wijmo.pdf.PdfTagType.P, () =>  doc.drawText('Hello, world! ')));
         * </pre>
         *
         * @param type The type of a tag element.
         * @param child An optional child element or array of child elements.
         * @param options An optional {@link IPdfTagOptions} object used to configure the element.
         *
         * The following child types are supported:
         * <ul>
         *   <li>A {@link IPdfTag} object to nest within the element.</li>
         *   <li>
         *     A {@link IPdfTagContent} object, a reference to the marked content to associate with the element.
         *   </li>
         *   <li>
         *     A callback function that will be automatically executed when the created element is attached to the document's structure tree.
         *     The content created by this function will be marked with the tag specified by the **type** parameter and associated with the element.
         *   </li>
         * </ul>
         *
         * @return The {@link IPdfTag} tag element.
         */
        tag(type: PdfTagType, child?: PdfTagOrContent | PdfTagOrContent[], options?: IPdfTagOptions): IPdfTag;
        /**
         * Adds the tag element to the document’s structure tree.
         *
         * @param tag Theelement to add to the document’s structure tree.
         *
         * @return The {@link PdfDocument} object.
         */
        addTag(tag: IPdfTag): PdfDocument;
        private _runtimeProperties;
        _copy(key: string, value: any): boolean;
        readonly _document: any;
        _switchTextFlowCtx(state: _IPdfTextFlowCtxState): void;
        _getTextFlowCtxState(): _IPdfTextFlowCtxState;
        _toggleBrush(brush?: PdfBrush): void;
        _togglePen(pen?: PdfPen): void;
        _toggleFont(font?: PdfFont): void;
        private _onDocData;
        private _onDocEnding;
        private _setDocInfo;
        private _onDocEnded;
        private _onPageAdding;
        private _onPageAdded;
        private _assertAreasPathStarted;
        private _pageSettingsToNative;
        private _processHeadersFooters;
        private _renderHeaderFooter;
        private _renderHeaderFooterPart;
        private _setCurBrush;
        private _setCurFont;
        private _setCurPen;
        private _setNativeDocBrush;
        private _resetAreasOffset;
    }
}
declare module wijmo.pdf {
    /**
    * Provides methods for creating graphics paths and drawing them or using them for clipping.
    *
    * Path creation method calls must be finished with the {@link PdfPaths.stroke},
    * {@link PdfPaths.fill}, {@link PdfPaths.fillAndStroke} or {@link PdfPaths.clip} method.
    * Any document methods which don't apply directly to path creation/ drawing/ clipping
    * (changing a pen, drawing a text, saving the graphics state etc) are prohibited to use
    * until the path is finished.
    * The {@link PdfPaths.lineTo}, {@link PdfPaths.bezierCurveTo} and {@link PdfPaths.quadraticCurveTo}
    * methods should not start the path, they must be preceded with the {@link PdfPaths.moveTo}.
    *
    * The methods are chainable:
    * <pre>
    * doc.paths.moveTo(0, 0).lineTo(100, 100).stroke();
    * </pre>
    *
    * This class is not intended to be instantiated in your code.
    */
    class PdfPaths {
        private _doc;
        private _ndoc;
        private _offset;
        private _pathBuffer;
        /**
        * Initializes a new instance of the {@link PdfPaths} class.
        *
        * @param doc Document.
        * @param offset Offset.
        */
        constructor(doc: PdfDocument, offset: wijmo.Point);
        /**
        * Sets a new current point.
        *
        * @param x The X-coordinate of the new point, in points.
        * @param y The Y-coordinate of the new point, in points.
        * @return The {@link PdfPaths} object.
        */
        moveTo(x: number, y: number): PdfPaths;
        /**
        * Draws a line from the current point to a new point.
        *
        * The new current point is (x, y).
        *
        * @param x The X-coordinate of the new point, in points.
        * @param y The Y-coordinate of the new point, in points.
        * @return The {@link PdfPaths} object.
        */
        lineTo(x: number, y: number): PdfPaths;
        /**
        * Draws a quadratic curve from the current point to a new point using the current point
        * and (cpx, cpy) as the control points.
        *
        * The new current point is (x, y).
        *
        * @param cpx The X-coordinate of the control point, in points.
        * @param cpy The Y-coordinate of the control point, in points.
        * @param x The X-coordinate of the new point, in points.
        * @param y The Y-coordinate of the new point, in points.
        * @return The {@link PdfPaths} object.
        */
        quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): PdfPaths;
        /**
        * Draws a bezier curve from the current point to a new point using the (cp1x, cp1y)
        * and (cp2x, cp2y) as the control points.
        *
        * The new current point is (x, y).
        *
        * @param cp1x The X-coordinate of the first control point, in points.
        * @param cp1y The Y-coordinate of the first control point, in points.
        * @param cp2x The X-coordinate of the second control point, in points.
        * @param cp2y The Y-coordinate of the second control point, in points.
        * @param x The X-coordinate of the new point, in points.
        * @param y The Y-coordinate of the new point, in points.
        * @return The {@link PdfPaths} object.
        */
        bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): PdfPaths;
        /**
        * Draws a SVG 1.1 path.
        *
        * @param path The SVG path to draw.
        * @return The {@link PdfPaths} object.
        */
        svgPath(path: string): PdfPaths;
        /**
        * Closes the current path and draws a line from the current point to the initial
        * point of the current path.
        *
        * @return The {@link PdfPaths} object.
        */
        closePath(): PdfPaths;
        /**
        * Draws a rectangle.
        *
        * @param x The X-coordinate of the topleft corner of the rectangle, in points.
        * @param y The Y-coordinate of the topleft corner of the rectangle, in points.
        * @param width The width of the rectangle, in points.
        * @param height The width of the rectangle, in points.
        * @return The {@link PdfPaths} object.
        */
        rect(x: number, y: number, width: number, height: number): PdfPaths;
        /**
        * Draws a rounded rectangle.
        *
        * @param x The X-coordinate of the upper-left corner of the rectangle, in points.
        * @param y The Y-coordinate of the upper-left corner of the rectangle, in points.
        * @param width The width of the rectangle, in points.
        * @param height The width of the rectangle, in points.
        * @param cornerRadius The corner radius of the rectangle, in points. The default value is 0.
        * @return The {@link PdfPaths} object.
        */
        roundedRect(x: number, y: number, width: number, height: number, cornerRadius?: number): PdfPaths;
        /**
        * Draws an ellipse.
        *
        * @param x The X-coordinate of the center of the ellipse, in points.
        * @param y The Y-coordinate of the center of the ellipse, in points.
        * @param radiusX The radius of the ellipse along the X-axis, in points.
        * @param radiusY The radius of the ellipse along the Y-axis, in points.
        * If it is not provided, then it is assumed to be equal to radiusX.
        * @return The {@link PdfPaths} object.
        */
        ellipse(x: number, y: number, radiusX: number, radiusY?: number): PdfPaths;
        /**
        * Draws a circle.
        *
        * @param x The X-coordinate of the center of the circle, in points.
        * @param y The Y-coordinate of the center of the circle, in points.
        * @param radius The radius of the circle, in points.
        * @return The {@link PdfPaths} object.
        */
        circle(x: number, y: number, radius: number): PdfPaths;
        /**
        * Draws a polygon using a given points array.
        *
        * @param points An array of two-elements arrays [x, y] specifying
        * the X and Y coordinates of the point, in points.
        * @return The {@link PdfPaths} object.
        */
        polygon(points: number[][]): PdfPaths;
        /**
        * Creates a clipping path used to limit the regions of the page affected by
        * painting operators.
        *
        * @param rule The fill rule to use.
        * @return The {@link PdfPaths} object.
        */
        clip(rule?: PdfFillRule): PdfPaths;
        /**
        * Fills the path with the specified brush and rule.
        * If brush is not specified, then the default document brush will be used
        * (see the {@link PdfDocument.setBrush} method).
        *
        * The brush argument can accept the following values:
        * <ul>
        *   <li>A {@link PdfBrush} object.</li>
        *   <li>
        *     A {@link wijmo.Color} object or any string acceptable by the {@link wijmo.Color.fromString} method.
        *     In this case, the {@link PdfBrush} object with the specified color will be created internally.
        *    </li>
        * </ul>
        *
        * @param brush The brush or color to use.
        * @param rule The fill rule to use.
        * @return The {@link PdfPaths} object.
        */
        fill(brush?: PdfBrush | wijmo.Color | string, rule?: PdfFillRule): PdfPaths;
        /**
        * Fills and strokes the path with the specified brush, pen and rule.
        * If brush and pen is not specified, then the default document brush and pen will
        * be used (See the {@link PdfDocument.setBrush}, {@link PdfDocument.setPen} methods).
        *
        * The brush argument can accept the following values:
        * <ul>
        *   <li>A {@link PdfBrush} object.</li>
        *   <li>
        *     A {@link wijmo.Color} object or any string acceptable by the {@link wijmo.Color.fromString} method.
        *     In this case, the {@link PdfBrush} object with the specified color will be created internally.
        *    </li>
        * </ul>
        *
        * The pen argument can accept the following values:
        * <ul>
        *   <li>A {@link PdfPen} object.</li>
        *   <li>
        *     A {@link wijmo.Color} object or any string acceptable by the {@link wijmo.Color.fromString} method.
        *     In this case, the {@link PdfPen} object with the specified color will be created internally.
        *   </li>
        * </ul>
        *
        * @param brush The brush or color to use.
        * @param pen The pen or color to use.
        * @param rule The fill rule to use.
        * @return The {@link PdfPaths} object.
        */
        fillAndStroke(brush?: PdfBrush | wijmo.Color | string, pen?: PdfPen | wijmo.Color | string, rule?: PdfFillRule): PdfPaths;
        /**
        * Strokes the path with the specified pen.
        * If pen is not specified, then the default document pen will be used
        * (See the {@link PdfDocument.setPen} method).
        *
        * The pen argument can accept the following values:
        * <ul>
        *   <li>A {@link PdfPen} object.</li>
        *   <li>
        *     A {@link wijmo.Color} object or any string acceptable by the {@link wijmo.Color.fromString} method.
        *     In this case, the {@link PdfPen} object with the specified color will be created internally.
        *   </li>
        * </ul>
        *
        * @param pen The pen or color to use.
        * @return The {@link PdfPaths} object.
        */
        stroke(pen?: PdfPen | wijmo.Color | string): PdfPaths;
        _hasPathBuffer(): boolean;
        private _writePathBuffer;
    }
}
declare module wijmo.pdf {
    type _TDictionary<T> = {
        [key: string]: T;
    };
    function _compressSpaces(value: string): string;
    function _resolveUrlIfRelative(url: string, urlResolver: (url: string) => string): string;
    interface _ISvgCssPropertyValue {
        value: string;
        important: boolean;
    }
    class _SvgCssRule {
        selector: string;
        declarations: _TDictionary<_ISvgCssPropertyValue>;
        constructor(selector: string, declaration: string);
        private _fillDeclarations;
    }
    class _SvgCssHelper {
        static matchesSelector(node: Element, selector: string): boolean;
        static getSpecificity(selector: string): number;
        static getComputedStyle(node: SVGElement, registeredRules: _TDictionary<_SvgCssRule>): _TDictionary<string>;
        static registerFontFace(doc: PdfDocument, rule: _SvgCssRule, urlResolver?: (url: string) => string): void;
    }
}
declare module wijmo.pdf {
    interface _ISvgRenderContext {
        area: PdfPageArea;
        urlResolver: (url: string) => string;
        getElement: (id: string) => _SvgElementBase;
        registerCssRule: (rule: _SvgCssRule) => void;
    }
    class _SvgRenderer {
        private _elementsById;
        private _registeredCssRules;
        private _svg;
        private _doc;
        constructor(svgString: string, area: PdfPageArea, vpWidth?: number, vpHeight?: number, urlResolver?: (url: string) => string);
        readonly root: _SvgSvgElementImpl;
        render(viewPort?: wijmo.Size): void;
        private _parse;
        private _buildTree;
        private _getClassName;
        private _copyAttributes;
        private _getElementById;
        private _registerCssRule;
    }
}
declare module wijmo.pdf {
    /**
    * Represents a brush used to fill an area with a linear gradient.
    */
    class PdfLinearGradientBrush extends PdfGradientBrush {
        private _x1;
        private _y1;
        private _x2;
        private _y2;
        /**
        * Initializes a new instance of the {@link PdfLinearGradientBrush} class.
        *
        * @param x1 The X-coordinate of the starting point of the linear gradient.
        * @param y1 The Y-coordinate of the starting point of the linear gradient.
        * @param x2 The X-coordinate of the ending point of the linear gradient.
        * @param y2 The Y-coordinate of the ending point of the linear gradient.
        * @param stops The {@link PdfGradientStop} array to set on this brush.
        * @param opacity The opacity of this brush.
        */
        constructor(x1: number, y1: number, x2: number, y2: number, stops: PdfGradientStop[], opacity?: number);
        /**
        * Gets or sets the X-coordinate of the starting point of the linear gradient,
        * in page area coordinates, in points.
        */
        x1: number;
        /**
        * Gets or sets the Y-coordinate of the starting point of the linear gradient,
        * in page area coordinates, in points.
        */
        y1: number;
        /**
        * Gets or sets the X-coordinate of the ending point of the linear gradient,
        * in page area coordinates, in points.
        */
        x2: number;
        /**
        * Gets or sets the Y-coordinate of the ending point of the linear gradient,
        * in page area coordinates, in points.
        */
        y2: number;
        /**
        * Creates a copy of this {@link PdfLinearGradientBrush}.
        * @return A copy of this brush.
        */
        clone(): PdfLinearGradientBrush;
        /**
        * Determines whether the specified {@link PdfLinearGradientBrush} instance is equal to
        * the current one.
        *
        * @param value {@link PdfLinearGradientBrush} to compare.
        * @return true if the specified object is equal to the current one, otherwise false.
        */
        equals(value: PdfLinearGradientBrush): boolean;
        _getBrushObject(area: PdfPageArea): any;
    }
}
declare module wijmo.pdf {
}
declare module wijmo.pdf {
    enum _SvgRenderMode {
        Render = 0,
        Ignore = 1,
        Clip = 2
    }
    interface _ISvgElementBaseCtor {
        new (ctx: _ISvgRenderContext, node: SVGElement, defRenderMode?: _SvgRenderMode): _SvgElementBase;
    }
    class _SvgElementBase {
        private _children;
        private _attributes;
        private _parent;
        private _style;
        private _ctx;
        private _viewport;
        private _defRenderMode;
        private _curRenderMode;
        constructor(ctx: _ISvgRenderContext, node: SVGElement, defRenderMode?: _SvgRenderMode);
        readonly children: _SvgElementBase[];
        readonly ctx: _ISvgRenderContext;
        parent: _SvgElementBase;
        readonly style: _SvgStyleAttributes;
        viewport: wijmo.Size;
        attr(name: string, value?: any): any;
        appendNode(node: _SvgElementBase): void;
        copyAttributesFrom(el: _SvgElementBase, except?: string[]): void;
        clone(): _SvgElementBase;
        remove(): void;
        clearAttr(name: string): void;
        render(viewPort: wijmo.Size, renderMode?: _SvgRenderMode): void;
        readonly renderMode: _SvgRenderMode;
        protected _render(): void;
        protected _renderContent(): void;
    }
    class _SvgClippableElementBase extends _SvgElementBase {
        private _clipPath;
        constructor(ctx: _ISvgRenderContext, node: SVGElement, defRenderMode?: _SvgRenderMode);
        protected _render(): void;
    }
    class _SvgTransformableElementBase extends _SvgClippableElementBase {
        private _transform;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        protected _render(): void;
    }
    class _SvgShapeElementBase extends _SvgTransformableElementBase {
        protected _fill: boolean;
        protected _stroke: boolean;
        protected _renderContent(): void;
        protected _draw(): void;
    }
    class _SvgCircleElementImpl extends _SvgShapeElementBase {
        protected _draw(): void;
    }
    class _SvgEllipseElementImpl extends _SvgShapeElementBase {
        protected _draw(): void;
    }
    class _SvgLineElementImpl extends _SvgShapeElementBase {
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        protected _draw(): void;
    }
    class _SvgPathElementImpl extends _SvgShapeElementBase {
        private _d;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        protected _renderContent(): void;
        protected _draw(): void;
    }
    class _SvgPolylineElementImpl extends _SvgShapeElementBase {
        protected _draw(): boolean;
    }
    class _SvgPolygonElementImpl extends _SvgPolylineElementImpl {
        protected _draw(): boolean;
    }
    class _SvgRectElementImpl extends _SvgShapeElementBase {
        protected _draw(): void;
    }
    class _SvgClipPathElementImpl extends _SvgElementBase {
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
    }
    class _SvgDefsElementImpl extends _SvgClippableElementBase {
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
    }
    class _SvgGElementImpl extends _SvgTransformableElementBase {
    }
    class _SvgLinearGradientElementImpl extends _SvgElementBase {
        private _x1;
        private _x2;
        private _y1;
        private _y2;
        private _gradientUnits;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        toBrush(element: _SvgElementBase): PdfLinearGradientBrush;
    }
    class _SvgStopElementImpl extends _SvgElementBase {
        color: _SvgColorAttr;
        opacity: _SvgNumAttr;
        offset: _SvgStrAttr;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
    }
    class _SvgImageElementImpl extends _SvgTransformableElementBase {
        private _x;
        private _y;
        private _width;
        private _height;
        private _href;
        private _par;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        protected _renderContent(): void;
        private _renderSvgImage;
        private _renderRasterImage;
    }
    class _SvgStyleElementImpl extends _SvgElementBase {
        constructor(ctx: _ISvgRenderContext, node: SVGStyleElement);
    }
    class _SvgSvgElementImpl extends _SvgClippableElementBase {
        private _x;
        private _y;
        private _width;
        private _height;
        private _scale;
        private _overflow;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        readonly width: _SvgNumAttr;
        readonly height: _SvgNumAttr;
        protected _render(): void;
    }
    class _SvgSymbolElementImpl extends _SvgClippableElementBase {
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
    }
    class _SvgUseElementImpl extends _SvgElementBase {
        private _xlink;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        protected _render(): void;
    }
    interface _TextDecorator {
        decoration: _SvgTextDecorationAttr;
        style: _SvgStyleAttributes;
    }
    class _SvgTextElementImpl extends _SvgTransformableElementBase {
        private _x;
        private _y;
        private _dx;
        private _dy;
        private _textDecoration;
        constructor(ctx: _ISvgRenderContext, node: SVGElement);
        protected _render(): void;
        protected _renderContent(): void;
        private _prepareNodes;
    }
    class _SvgTspanElementImpl extends _SvgClippableElementBase {
        _text: string;
        _x: _SvgNumAttr;
        _y: _SvgNumAttr;
        _dx: _SvgNumAttr;
        _dy: _SvgNumAttr;
        _textDecoration: _SvgTextDecorationAttr;
        _decorators: _TextDecorator[];
        _cx: number;
        _cy: number;
        constructor(ctx: _ISvgRenderContext, node: SVGElement, text?: string);
        clone(): _SvgElementBase;
        _setDecorators(value: _TextDecorator[]): void;
        protected _renderContent(): void;
        private _decorate;
    }
}
declare module wijmo.pdf {
    enum _SvgNumConversion {
        Default = 1,
        None = 2,
        Px = 3
    }
    enum _SvgLengthContext {
        Width = 1,
        Height = 2,
        Other = 3
    }
    enum _SvgAttrType {
        Number = 1,
        String = 2
    }
    class _SvgAttr<T> {
        static parseValue(value: any, attrType: _SvgAttrType, viewPort: wijmo.Size, lCtx: _SvgLengthContext, numConv: _SvgNumConversion): any;
        private _owner;
        private _value;
        private _defValue;
        private _propName;
        private _propType;
        private _searchValue;
        private _inheritable;
        private _pCtx;
        private _nc;
        constructor(owner: _SvgElementBase, propName: string, propType: _SvgAttrType, defValue?: any, nc?: _SvgNumConversion, lCtx?: _SvgLengthContext, inheritable?: boolean);
        readonly hasVal: boolean;
        val: T;
        protected readonly _val: any;
        reset(): void;
        protected _parse(value: any, nc?: _SvgNumConversion): any;
    }
    class _SvgNumAttr extends _SvgAttr<number> {
        constructor(owner: _SvgElementBase, propName: string, defValue?: any, nc?: _SvgNumConversion, pCtx?: _SvgLengthContext, inheritable?: boolean);
    }
    class _SvgStrAttr extends _SvgAttr<string> {
        constructor(owner: _SvgElementBase, propName: string, defValue?: any, inheritable?: boolean);
    }
    class _SvgColorAttr extends _SvgAttr<string> {
        constructor(owner: _SvgElementBase, propName: string, defValue?: any, inheritable?: boolean);
        asHref(): string;
        protected _parse(value: any): any;
    }
    class _SvgDashArrayAttr extends _SvgAttr<number[]> {
        constructor(owner: _SvgElementBase);
        protected _parse(value: any): number[];
    }
    class _SvgFillRuleAttr extends _SvgAttr<PdfFillRule> {
        constructor(owner: _SvgElementBase, propName: string);
        protected _parse(value: string): PdfFillRule;
    }
    class _SvgHRefAttr extends _SvgStrAttr {
        constructor(owner: _SvgElementBase, propName: string);
        protected _parse(value: string): string;
    }
    class _SvgIdRefAttr extends _SvgHRefAttr {
        protected _parse(value: string): string;
    }
    class _SvgPointsArrayAttr extends _SvgAttr<wijmo.Point[]> {
        constructor(owner: _SvgElementBase, propName: string);
        protected _parse(value: any): wijmo.Point[];
    }
    class _SvgTransformAttr extends _SvgAttr<((doc: PdfPageArea) => void)[]> {
        constructor(owner: _SvgElementBase);
        apply(element: _SvgElementBase): void;
        protected _parse(value: any): ((doc: PdfPageArea) => void)[];
    }
    class _SvgTextDecorationAttr extends _SvgAttr<string[]> {
        constructor(owner: _SvgElementBase);
        protected _parse(value: any): string[];
    }
    interface _ISvgViewBoxAttr {
        minX: number;
        minY: number;
        width: number;
        height: number;
    }
    class _SvgViewboxAttr extends _SvgAttr<_ISvgViewBoxAttr> {
        constructor(owner: _SvgElementBase);
        protected _parse(value: any): _ISvgViewBoxAttr;
    }
    interface _ISvgPreserveAspectRatioAttr {
        align: string;
        meet: boolean;
    }
    class _SvgPreserveAspectRatioAttr extends _SvgAttr<_ISvgPreserveAspectRatioAttr> {
        constructor(owner: _SvgElementBase);
        protected _parse(value: any): _ISvgPreserveAspectRatioAttr;
    }
    class _SvgScaleAttributes {
        private _owner;
        aspect: _SvgPreserveAspectRatioAttr;
        viewBox: _SvgViewboxAttr;
        constructor(owner: _SvgElementBase);
        apply(element: _SvgElementBase): wijmo.Size;
    }
    class _SvgStrokeAttributes {
        private _owner;
        color: _SvgColorAttr;
        dashArray: _SvgDashArrayAttr;
        dashOffset: _SvgNumAttr;
        lineCap: _SvgStrAttr;
        lineJoin: _SvgStrAttr;
        miterLimit: _SvgNumAttr;
        opacity: _SvgNumAttr;
        width: _SvgNumAttr;
        constructor(owner: _SvgElementBase);
        toPen(element?: _SvgElementBase): PdfPen;
    }
    class _SvgFillAttributes {
        private _owner;
        color: _SvgColorAttr;
        opacity: _SvgNumAttr;
        rule: _SvgFillRuleAttr;
        constructor(owner: _SvgElementBase);
        toBrush(element?: _SvgElementBase): PdfBrush;
    }
    class _SvgFontAttributes {
        private _owner;
        family: _SvgStrAttr;
        size: _SvgAttr<string | number>;
        style: _SvgStrAttr;
        weight: _SvgStrAttr;
        constructor(owner: _SvgElementBase);
        toFont(): PdfFont;
    }
    class _SvgStyleAttributes {
        private _owner;
        fill: _SvgFillAttributes;
        font: _SvgFontAttributes;
        stroke: _SvgStrokeAttributes;
        clipRule: _SvgFillRuleAttr;
        constructor(owner: _SvgElementBase);
        apply(element: _SvgElementBase, fill?: boolean, stroke?: boolean): void;
    }
}
