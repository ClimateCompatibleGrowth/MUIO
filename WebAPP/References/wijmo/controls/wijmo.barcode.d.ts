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
declare module wijmo.barcode {
    /**
 * Defines the options to set the size of the quiet zone on all the sides of the barcode symbol.
 *
 * The default unit of it will be Pixel if value type is number.
*/
    interface IQuietZone {
        /**
         * The size of the quiet zone on the left side of the barcode symbol.
         *
         * The default value for this property is <b>0</b>.
        */
        left?: string | number;
        /**
         *  The size of the quiet zone on the right side of the barcode symbol.
         *
         * The default value for this property is <b>0</b>.
        */
        right?: string | number;
        /**
         *  The size of the quiet zone on the top side of the barcode symbol.
         *
         * The default value for this property is <b>0</b>.
        */
        top?: string | number;
        /**
         *  The size of the quiet zone on the bottom of the barcode symbol.
         *
         * The default value for this property is <b>0</b>.
        */
        bottom?: string | number;
    }
    /**
     * Defines the option for quiet zone to include addOn symbol. The default unit will be Pixel if value type is number.
     */
    interface IQuietZoneWithAddOn extends IQuietZone {
        /**
         * Add on is the size of quiet zone between main symbol and add on symbol.
         *
         * The default value for this property is <b>0</b>.
        */
        addOn?: string | number;
    }
    /**
     * Defines the font settings which can be applied on barcode value.
     */
    interface IBarcodeFont {
        /**
         * Gets or Sets the family of the font for the barcode value.
         *
         * The default value for this property is <b>sans-serif</b>.
        */
        fontFamily?: string;
        /**
         * Gets or Sets the style of the font for the barcode value.
         *
         * The default value for this property is <b>normal</b>.
        */
        fontStyle?: string;
        /**
         * Gets or Sets the weight of the font for the barcode value.
         *
         * The default value for this property is <b>normal</b>.
        */
        fontWeight?: string;
        /**
         * Gets or Sets the decoration for the text in the barcode value.
         *
         * The default value for this property is <b>none</b>.
        */
        textDecoration?: string;
        /**
         * Gets or Sets the alignment of the text in the barcode value.
         *
         * The default value for this property is <b>center</b>.
        */
        textAlign?: string;
        /**
         * Gets or Sets the size of font for the barcode value.
         *
         * The default value for this property is <b>12px</b>.
        */
        fontSize?: number | string;
    }
    /**
     * Defines the settings which automatically changes the width of the barcode
     *
     * on changing the length of the its value.
     */
    interface IVariableWidthBarcode {
        /**
         * Gets or sets a value specifying whether the control width should automatically
         *
         * change on changing the length of barcode value.
         */
        autoWidth: boolean;
        /**
         * Gets or sets a zoom factor that is applied to the automatically calculated control width.
         */
        autoWidthZoom: number;
    }
}
declare module wijmo.barcode {
    class SVGRenderContext {
        private dom;
        private style;
        private scale;
        private color;
        private g;
        constructor(dom: any, style: any, scale: any);
        setColor(color: any): void;
        setBackgroundColor(color: any): void;
        addGroup(): void;
        drawRect(shape: any): void;
        drawText(shape: any): void;
        clipString(shape: any, textNode: any): any;
        clear(): void;
        _measureText(textNode: any): any;
        getDataUrl(): string;
    }
}
declare module wijmo.barcode {
    class CanvasRenderContext {
        private dom;
        private style;
        private ctx;
        private scale;
        constructor(dom: any, style: any, scale: any);
        setColor(color: any): void;
        setBackgroundColor(color: any): void;
        drawRect(shape: any): void;
        drawText(shape: any): void;
        clipString(shape: any): any;
        drawTextDecorationLine(text: any, x: any, y: any, textDecoration: any): void;
        clear(): void;
        getImageData(): any;
        getDataUrl(): any;
    }
}
declare module wijmo.barcode {
    enum _errorCode {
        Unknown = 0,
        InvalidOptions = 1,
        InvalidBarcodeType = 2,
        InvalidRenderType = 3,
        MethodNotImplement = 4,
        InvalidText = 5,
        InvalidCharacter = 6,
        TextTooLong = 7,
        GroupSizeOverflow = 8
    }
    interface IErrorDescriptor {
        source: any;
        message: string;
    }
    class BaseException extends Error {
        code: _errorCode;
        descriptor: IErrorDescriptor;
        constructor(errorCode?: _errorCode);
    }
}
declare module wijmo.barcode {
    const ErrorCode: typeof _errorCode;
    class InvalidOptionsException extends BaseException {
        constructor(arg: any, reason?: string);
    }
    class InvalidBarcodeTypeException extends BaseException {
        constructor(type: any);
    }
    class InvalidRenderException extends BaseException {
        constructor(type: any);
    }
    class MethodNotImplementException extends BaseException {
        constructor(name: any, reason: any);
    }
    class InvalidTextException extends BaseException {
        constructor(text?: any, reason?: string);
    }
    class InvalidCharacterException extends BaseException {
        constructor(char: any);
    }
    class TextTooLongException extends BaseException {
        constructor();
    }
    class GroupSizeOverflowException extends BaseException {
        constructor(num: any);
    }
}
declare module wijmo.barcode {
    class BarcodeRender {
        private container;
        private barcode;
        private style;
        private size;
        private context;
        private renderDom;
        constructor(container: any, barcode: any);
        render(): this;
        getImageData(): any;
        getDataUrl(): any;
        destroy(): void;
        getSize(): any;
    }
}
declare module wijmo.barcode {
    function isFunction(value: any): boolean;
    function isWindow(obj: any): boolean;
    function isDefined(value: any): boolean;
    function isNaN(value: any): boolean;
    function isNumberLike(value: any): boolean;
    function sliceString(text: string, step: number, fn: any): void;
    function sliceArray(arr: any[], step: number, fn: any): void;
    function str2Array(text?: string): any;
    function combineTruthy(text?: string): any[];
    function convertRadix(num: any, radix?: number): any;
    function isEven(number: any): boolean;
    function isOdd(number: any): boolean;
    function toNumber(str?: string, defaultValue?: number): number;
    function getUnit(str?: string): string;
    function getMaxValue(arr: any, field?: string): number;
    function assign(target: any, ...varArgs: any[]): any;
    function deepMerge(target: any, ...srcs: any[]): any;
    function deepMergeAll(...srcs: any[]): any;
    function strRepeat(text: any, count: any): any;
    function isInteger(value: any): boolean;
    function fillArray(arr: any, value: any): any;
    function strPadStart(str: any, targetLength: any, padString: any): any;
    function registerPlugin(name: any, fn: any): void;
    function measureText(text: any, style: any): any;
    function convertUnit(size: any): any;
    function fixSize2PixelDefault(size: any): any;
    function loop(cb: any, range: any): void;
    function toZeroOnePattern(data: any, evenIsBar?: any): any;
    function range(from: any, to: any): any[];
    function makeEnums(mapping: any): void;
    const Utils: {
        isFunction: typeof isFunction;
        isWindow: typeof isWindow;
        isDefined: typeof isDefined;
        isNaN: typeof isNaN;
        isNumberLike: typeof isNumberLike;
        sliceString: typeof sliceString;
        sliceArray: typeof sliceArray;
        str2Array: typeof str2Array;
        combineTruthy: typeof combineTruthy;
        convertRadix: typeof convertRadix;
        isEven: typeof isEven;
        isOdd: typeof isOdd;
        toNumber: typeof toNumber;
        getUnit: typeof getUnit;
        getMaxValue: typeof getMaxValue;
        assign: typeof assign;
        deepMerge: typeof deepMerge;
        deepMergeAll: typeof deepMergeAll;
        strRepeat: typeof strRepeat;
        isInteger: typeof isInteger;
        fillArray: typeof fillArray;
        strPadStart: typeof strPadStart;
        registerPlugin: typeof registerPlugin;
        measureText: typeof measureText;
        convertUnit: typeof convertUnit;
        fixSize2PixelDefault: typeof fixSize2PixelDefault;
        loop: typeof loop;
        toZeroOnePattern: typeof toZeroOnePattern;
        range: typeof range;
        makeEnums: typeof makeEnums;
    };
}
declare module wijmo.barcode {
    class Option {
        static DefaultOptions: {
            renderType: string;
            unitSize: string;
            color: string;
            backgroundColor: string;
            font: {
                fontFamily: string;
                fontStyle: string;
                fontWeight: string;
                textDecoration: string;
                textAlign: string;
                fontSize: string;
            };
            hideExtraChecksum: boolean;
            quietZone: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
        };
        static CustomDefaultOptions: {};
        static setCustomDefaultOptions(customDefaultOptions: any): void;
        private originConfig;
        private type;
        private penddingMerge;
        constructor(options?: {});
        spawn(partialOption: any): Option;
        merge(options: any): void;
        _getUnitValue(unitSize: any): any;
        getMergedOption(): any;
        getConfig(unitValue: any): {
            config: any;
            encodeConfig: any;
            style: any;
        };
        getOriginConfig(): any;
        getType(): string;
    }
}
declare module wijmo.barcode {
    function _getDefaultConfig(encoder: any, type: any): any;
    class _EnumDictionary {
        private _keys;
        private _values;
        constructor(enumType: any, func: any);
        getEnumByString(value: string): number;
        getStringByEnum(key: number): string;
    }
}
declare module wijmo.barcode {
    class Area {
        private x;
        private y;
        private width;
        private height;
        protected children: object[];
        protected style: {
            padding: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
            border: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
            margin: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
        };
        protected offsetBox: any;
        protected contentBox: any;
        constructor(width?: number, height?: number);
        append(element: any): void;
        _makeRect(x: any, y: any, width: any, height: any): {
            x: any;
            y: any;
            height: any;
            width: any;
            type: string;
        };
        toShapes(): any[];
        getSize(): {
            width: any;
            height: any;
        };
        visiable(): boolean;
        setX(x: any): void;
        setY(y: any): void;
        updateContentSize(w: any, h: any): void;
        _fixOpt(style: any, key: any): void;
        setStyle(style: any): void;
        _updateBox(): void;
    }
}
declare module wijmo.barcode {
    class HorizontalLayoutArea extends Area {
        toShapes(): any[];
        getSize(): {
            width: any;
            height: any;
        };
        _updateContentSize(): void;
    }
}
declare module wijmo.barcode {
    class VerticalLayoutArea extends Area {
        toShapes(): any[];
        getSize(): {
            width: any;
            height: any;
        };
        _updateContentSize(): void;
    }
}
declare module wijmo.barcode {
    class MatrixSymbolArea extends Area {
        private _xPosition;
        private _yPosition;
        private _lastMaxHeight;
        private _rowHeight;
        constructor(width: any, height: any, rowHeight?: any);
        append(width?: any, height?: any): void;
        _autoWrap(width: any): void;
        _checkNeedWrap(eleWidth: any): boolean;
        space(width?: number): void;
        toShapes(): any[];
    }
}
declare module wijmo.barcode {
    class SymbolArea extends Area {
        private _lastIsBar;
        private _cacheNumber;
        private _position;
        constructor(width: any, height: any);
        append(barWidth: any, barHeight?: any, offsetY?: any): void;
        space(n?: number): void;
        _appendModule(flag: any): void;
        _flash(): void;
        fromPattern(str: any): void;
        getContentBox(): any;
        toShapes(): any[];
    }
}
declare module wijmo.barcode {
    class LabelArea extends Area {
        private _textAlign;
        constructor(width: any, height: any, textAlign: any);
        toShapes(): any[];
    }
}
declare module wijmo.barcode {
}
declare module wijmo.barcode {
    class MatrixBuilder {
        private data;
        private row;
        private col;
        constructor(row: any, col: any);
        add(row: any, col: any, data: any): void;
        toMatrix(): any[];
    }
}
declare module wijmo.barcode {
    class BitBuffer {
        private buffer;
        private length;
        private index;
        constructor(buffer?: any[]);
        putBit(bit: any): void;
        putBitAt(bit: any, pos: any): void;
        put(num: any, length: any): void;
        putBits(bits: any): void;
        getAt(index: any): boolean;
        getBuffer(): any;
        getGroupedBits(size: any): any[];
        next(): boolean;
    }
}
declare module wijmo.barcode {
    abstract class BarcodeEncoder {
        private _option;
        private useDesiredSize;
        protected shapes: any[];
        protected size: any;
        protected style: any;
        protected encodeConfig: any;
        protected config: any;
        constructor(option: any);
        validate(): void;
        abstract calculateData(): any;
        abstract adjustDesiredSize(): any;
        abstract convertToShape(data?: any, forMeasure?: any): any;
        applyDesiredSize(unitValue?: any): void;
        afterApplyDesiredSize(): void;
        toSymbol(): void;
    }
}
declare module wijmo.barcode {
    abstract class TwoDimensionalBarcode extends BarcodeEncoder {
        adjustDesiredSize(): void;
        convertToShape(matrix?: any, forMeasure?: any): void;
    }
}
declare module wijmo.barcode {
    abstract class OneDimensionalBarcode extends BarcodeEncoder {
        label: string;
        text: string;
        static DefaultConfig: any;
        constructor(option: any);
        adjustDesiredSize(): void;
        convertToShape(data?: any, forMeasure?: any): void;
    }
}
declare module wijmo.barcode {
    const Constants: {
        FNC1: string;
        FNC2: string;
        FNC3: string;
        DataMatrixFNC1: string;
        DataMatrixMacro05: string;
        DataMatrixMacro06: string;
    };
}
declare module wijmo.barcode {
    const encoders: {};
    class Barcode {
        static supportType: any[];
        static constants: {
            FNC1: string;
            FNC2: string;
            FNC3: string;
            DataMatrixFNC1: string;
            DataMatrixMacro05: string;
            DataMatrixMacro06: string;
        };
        static ErrorCode: typeof _errorCode;
        private dom;
        private callback;
        private option;
        private render;
        static getImageData(option?: {}): any;
        static getDataUrl(option?: {}): any;
        static setDefaultOptions(option?: {}): void;
        static registerEncoder(name: any, encoder: any): void;
        static registerPlugin(name: any, fn: any): void;
        constructor(...args: any[]);
        mergeOption(option: any): this;
        /**
       * set barcode options
       * @access public
       * @param {object} option
       */
        setOption(option: any): this;
        getOption(): any;
        private update;
        refresh(): void;
        getImageData(): any;
        getDataUrl(): any;
        getSize(): any;
        destroy(): void;
    }
}
declare module wijmo.barcode {
}
declare module wijmo.barcode {
}
declare module wijmo.barcode {
    /**
 * Specifies the type of rendering for all type of Barcodes.
 */
    enum RenderType {
        /**
         * Uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank">Canvas</a>
         * to render a barcode.
         */
        Canvas = 0,
        /**
         * Uses <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank">SVG</a>
         * to render a barcode.
         */
        Svg = 1
    }
    /**
     * Defines the position of the label that displays the Barcode value.
     */
    enum LabelPosition {
        /**
         * Renders the barcode label at the top of the barcode.
         */
        Top = 0,
        /**
         * Renders the barcode label at the bottom of the barcode.
         */
        Bottom = 1
    }
    /** Defines the ratio between narrow and wide bars. */
    enum NarrowToWideRatio {
        /** The ratio between narrow and wide bars is 1:2 */
        OneToTwo = 0,
        /** The ratio between narrow and wide bars is 1:3 */
        OneToThree = 1
    }
}
declare module wijmo.barcode {
    class _RenderTypeConvertor {
        static stringToEnum(bcVal: any): number;
        static enumToString(value: any): string;
    }
    class _LabelPositionConvertor {
        static stringToEnum(value: any): number;
        static enumToString(value: any): string;
    }
    class _NarrowWideRatioConvertor {
        static stringToEnum(value: number): number;
        static enumToString(value: any): string;
    }
}
declare module wijmo.barcode {
    /**
     * Base (abstract) class for all barcode control classes.
     */
    class BarcodeBase extends wijmo.Control {
        /**
         * Gets or sets the template used to instantiate Barcode controls.
         */
        static controlTemplate: string;
        static readonly type: string;
        private static _defaults;
        protected _bc: Barcode;
        private _state;
        private _prevSz;
        private _prevH;
        private _isUpd;
        private _isValid;
        private _aw;
        private _wZoom;
        ['constructor']: typeof BarcodeBase;
        /**
         * Initializes a new instance of the {@link BarcodeBase} class.
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        initialize(options: any): void;
        protected static _getClassDefaults(): any;
        private _getDefaults;
        /**
         * Gets or sets the current code value rendered by the control.
         */
        value: string | number;
        /**
         * Gets or sets the size of quiet zone (the blank margin) around the barcode symbol.
         */
        quietZone: IQuietZone;
        /**
         * Gets or sets the rendering type of the control.
         *
         * The default value for this property is {@link RenderType.Canvas}.
         */
        renderType: RenderType;
        /**
         * Gets or sets the forecolor to render the control.
         *
         * The default value for this property is <b>rgb(0,0,0)</b>.
         */
        color: string;
        /**
         * Gets or sets the background color to render the control.
         *
         * The default value for this property is <b>rgb(255,255,255)</b>.
         */
        backgroundColor: string;
        /**
         * Indicates whether to show the check digit in the label text of the control.
         *
         * The default value for this property is <b>false</b>.
         */
        hideExtraChecksum: boolean;
        /**
         * Gets or sets font info for the label text of the control.
         */
        font: IBarcodeFont;
        /**
         * Indicates whether the current {@link value} property value is valid.
         *
         * When this property changes its value, the {@link isValidChanged} event
         * gets triggered.
         */
        readonly isValid: boolean;
        /**
         * Occurs when the {@link isValid} property value changes.
         */
        readonly isValidChanged: Event<BarcodeBase, EventArgs>;
        /**
         * Raises the {@link isValidChanged} event.
         */
        onIsValidChanged(e?: wijmo.EventArgs): void;
        /**
         * Refreshes the barcode image.
         *
         * @param fullUpdate Specifies whether to recalculate the barcode size.
         */
        refresh(fullUpdate?: boolean): void;
        /**
         * Gets the barcode image data info; only supported for canvas rendering.
         */
        getImageData(): ImageData;
        /**
         * Gets base64 string of the barcode.
         */
        getDataUrl(): string;
        /**
         * Gets the size of barcode symbol.
         */
        getSize(): wijmo.Size;
        protected _mergeOptions(options: any): void;
        private _setValid;
        protected _setProp(prop: string, value: any): void;
        protected _getProp(prop: string): any;
        private _updateSize;
        private static _getContentSize;
        protected _getAw(): boolean;
        protected _setAw(value: boolean): void;
        protected _getWzoom(): number;
        protected _setWzoom(value: number): void;
    }
}
declare module wijmo.barcode {
}
