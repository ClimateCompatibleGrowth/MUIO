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
declare module wijmo.grid.pdf {
    function softGrid(): typeof wijmo.grid;
    function softDetail(): typeof wijmo.grid.detail;
    function softMultiRow(): typeof wijmo.grid.multirow;
    function softSheet(): typeof wijmo.grid.sheet;
    function softOlap(): typeof wijmo.olap;
    function softTransposed(): typeof wijmo.grid.transposed;
    function softTransposedMultiRow(): typeof wijmo.grid.transposedmultirow;
}
declare module wijmo.grid.pdf {
    /**
     * Specifies how the grid content should be scaled to fit the page.
     */
    enum ScaleMode {
        /**
         * Render the grid in actual size, breaking into pages as needed.
         */
        ActualSize = 0,
        /**
         * Scale the grid, so that it fits the page width.
         */
        PageWidth = 1,
        /**
         * Scale the grid, so that it fits on a single page.
         */
        SinglePage = 2
    }
    /**
     * Specifies whether the whole grid or just a section should be rendered.
     */
    enum ExportMode {
        /**
         * Exports all the data from grid.
         */
        All = 0,
        /**
         * Exports the current selection only.
         */
        Selection = 1
    }
}
declare module wijmo.grid.pdf {
    /**
     * Represents the look and feel of a cell.
     */
    interface ICellStyle {
        /**
         * Represents the background color of a cell.
         */
        backgroundColor?: string;
        /**
         * Represents the border color of a cell.
         */
        borderColor?: string;
        /**
         * Represents the text color of a cell.
         */
        color?: string;
        /**
         * Represents the font of a cell.
         */
        font?: any;
    }
    /**
     * Represents the look and feel of the {@link FlexGrid} being exported.
     */
    interface IFlexGridStyle {
        /**
         * Specifies the cell style applied to cells within a {@link FlexGrid}.
         */
        cellStyle?: ICellStyle;
        /**
         * Represents the cell style applied to odd-numbered rows of the {@link FlexGrid}.
         */
        altCellStyle?: ICellStyle;
        /**
         * Represents the cell style applied to grouped rows of the {@link FlexGrid}.
         */
        groupCellStyle?: ICellStyle;
        /**
         * Represents the cell style applied to row headers and column headers of
         * the {@link FlexGrid}.
         */
        headerCellStyle?: ICellStyle;
        /**
         * Represents the cell style applied to column footers of the {@link FlexGrid}.
         */
        footerCellStyle?: ICellStyle;
        /**
         * Represents the cell style applied to cells of the {@link FlexGrid} that contain
         * validation errors if the {@link FlexGrid.showErrors} property is enabled.
         */
        errorCellStyle?: ICellStyle;
    }
    /**
     * Represents the settings used by the {@link FlexGridPdfConverter.draw} and
     * {@link FlexGridPdfConverter.drawToPosition} methods.
     */
    interface IFlexGridDrawSettings {
        /**
         * Indicates whether custom cell content and style should be evaluated and exported.
         * If set to true then export logic will retrieve cell content using cell.innerText property,
         * and cell style using getComputedStyle(cell).
         * Default is 'undefined' (i.e. false).
         */
        customCellContent?: boolean;
        /**
         * Indicates whether to draw detail rows.
         * If set to false then the detail rows will be ignored; otherwise the detail rows will be drawn empty
         * and their content should be drawn manually using formatItem event handler.
         * Default is 'undefined' (i.e. false).
         */
        drawDetailRows?: boolean;
        /**
         * Represents an array of custom fonts that will be embedded into the document.
         *
         * This sample illustrates how to setup the FlexGridPdfConverter to use two custom
         * fonts, Cuprum-Bold.ttf and Cuprum-Regular.ttf. The first one is applied to the
         * header cells only, while the second one is applied to all the remaining cells.
         *
         * <pre>
         * wijmo.grid.pdf.FlexGridPdfConverter.export(flex, fileName, {
         *    embeddedFonts: [{
         *       source: 'resources/ttf/Cuprum-Bold.ttf',
         *       name: 'cuprum',
         *       style: 'normal',
         *       weight: 'bold'
         *    }, {
         *       source: 'resources/ttf/Cuprum-Regular.ttf',
         *       name: 'cuprum',
         *       style: 'normal',
         *       weight: 'normal'
         *    }],
         *    styles: {
         *       cellStyle: {
         *          font: {
         *             family: 'cuprum'
         *          }
         *       },
         *       headerCellStyle: {
         *          font: {
         *             weight: 'bold'
         *          }
         *       }
         *    }
         * });
         * </pre>
         */
        embeddedFonts?: wijmo.pdf.IPdfFontFile[];
        /**
         * Determines the export mode.
         */
        exportMode?: ExportMode;
        /**
         * An optional callback function called for every exported cell that allows to perform transformations of exported
         * cell value and style, or perform a custom drawing.
         *
         * The function accepts the {@link PdfFormatItemEventArgs} class instance as the first argument.
         *
         * In case of custom drawing the {@link PdfFormatItemEventArgs.cancel} property should be set to true to cancel the default cell content drawing, and
         * the {@link PdfFormatItemEventArgs.cancelBorders} property should be set to true to cancel the default cell borders drawing.
         *
         * <pre>
         * wijmo.grid.pdf.FlexGridPdfConverter.export(flex, fileName, {
         *    formatItem: function(args) {
         *        // Change the background color of the regular cells of "Country" column.
         *        if (args.panel.cellType === wijmo.grid.CellType.Cell && args.panel.columns[args.col].binding === "country") {
         *            args.style.backgroundColor = 'blue';
         *        }
         *    }
         * });</pre>
         */
        formatItem?: (args: PdfFormatItemEventArgs) => void;
        /**
         * Determines the maximum number of pages to export.
         */
        maxPages?: number;
        /**
         * Indicates whether merged values should be repeated across pages when the merged range
         * is split on multiple pages.
         */
        repeatMergedValuesAcrossPages?: boolean;
        /**
         * Indicates whether star-sized columns widths should be recalculated against the PDF page
         * width instead of using the grid's width.
         */
        recalculateStarWidths?: boolean;
        /**
         * Represents the look and feel of an exported {@link FlexGrid}.
         */
        styles?: IFlexGridStyle;
        /**
         * An optional function that gives feedback about the progress of a task.
         * The function accepts a single argument, a number changing from 0.0 to 1.0, where the value of 0.0 indicates that
         * the operation has just begun and the value of 1.0 indicates that the operation has completed.
         *
         * <pre>
         * wijmo.grid.pdf.FlexGridPdfConverter.export(flex, fileName, {
         *    progress: function(value) {
         *        // Handle the progress here.
         *    }
         * });</pre>
         */
        progress?: (value: number) => void;
        /**
         * When turned on, decreases the drawing time by activating the cell styles caching if {@link IFlexGridDrawSettings.customCellContent} property is enabled.
         *
         * The combination of cell's inline style specific properties, own CSS classes and CSS classes of row containing the cell is used as
         * the cache tag. Before the cell style is calculated, the cache is checked first, and if the style associated with the tag is found there,
         * it's taken from there and doesn't get recalculated.
         *
         * Using this mode can make the drawing slower when considerable amount of cells have the unique set of CSS classes and inline styles.
         * Also, when pseudo classes like :first-child and :nth-child are used to style the cells and rows, the cell styles can be determined
         * incorrectly.
         *
         * The default value is <b>true</b>.
         */
        quickCellStyles?: boolean;
        _progressMax?: number;
    }
    /**
     * Represents the settings used by the {@link FlexGridPdfConverter.export} method.
     */
    interface IFlexGridExportSettings extends IFlexGridDrawSettings {
        /**
         * Determines the scale mode.
         */
        scaleMode?: ScaleMode;
        /**
         * Represents the options of the underlying {@link PdfDocument}.
         */
        documentOptions?: wijmo.pdf.IPdfDocumentOptions;
    }
}
declare module wijmo.grid.pdf {
    interface _IFlexGridAdapter {
        columns: _IColumnCollection;
        rows: _IRowCollection;
        bottomLeftCells: _IGridPanel;
        cells: _IGridPanel;
        columnFooters: _IGridPanel;
        columnHeaders: _IGridPanel;
        rowHeaders: _IGridPanel;
        topLeftCells: _IGridPanel;
        treeIndent: number;
        getSelection(): _ICellRange[];
        getComputedStyle(panel: _IGridPanel, cell: HTMLElement): CSSStyleDeclaration;
        getComputedDefBorderColor(): string;
        getMergedRange(p: _IGridPanel, r: number, c: number): _ICellRange;
        showColumnHeader: boolean;
        showRowHeader: boolean;
        showColumnFooter: boolean;
        alignMergedTextToTheTopRow(panel: _IGridPanel): boolean;
        getCell(panel: _IGridPanel, row: number, column: number, updateContent: boolean): HTMLElement;
        getCellContent(panel: _IGridPanel, row: _IRow, col: _IColumn, colIdx: number): string;
        getCellStyle(panel: _IGridPanel, row: _IRow, col: _IColumn): ICellStyle;
        getColumn(panel: _IGridPanel, row: number, col: number): _IColumn;
        isAlternatingRow(row: _IRow): boolean;
        isBooleanCell(panel: _IGridPanel, row: _IRow, col: _IColumn): boolean;
        isGroupRow(row: _IRow): boolean;
        isNewRow(row: _IRow): boolean;
        isDetailRow(row: _IRow): boolean;
        isExpandableGroupRow(row: _IRow): boolean;
        isRenderableRow(row: _IRow): boolean;
        isRenderableColumn(col: _IColumn): boolean;
    }
    interface _IGridPanel {
        columns: _IColumnCollection;
        cellType: number;
        rows: _IRowCollection;
        height: number;
        width: number;
    }
    interface _IColumnCollection {
        [index: number]: _IColumn;
        firstVisibleIndex: number;
        length: number;
    }
    interface _IRowCol {
        dataType?: number;
        binding?: string;
        index: number;
        isVisible: boolean;
    }
    interface _IColumn extends _IRowCol {
        aggregate: number;
        name?: string;
        visibleIndex: number;
        renderWidth: number;
        wordWrap: boolean;
        multiLine: boolean;
        getAlignment(row?: _IRow): string;
    }
    interface _ICellRange {
        row: number;
        col: number;
        row2: number;
        col2: number;
        bottomRow: number;
        rightCol: number;
        leftCol: number;
        topRow: number;
        isValid: boolean;
        rowSpan: number;
        columnSpan: number;
        isSingleCell: boolean;
        getRenderSize(flex: _IFlexGridAdapter, panel: _IGridPanel): wijmo.Size;
        clone(): _ICellRange;
    }
    interface _IRowCollection {
        [index: number]: _IRow;
        length: number;
        maxGroupLevel: number;
    }
    interface _IRow extends _IRowCol {
        level?: number;
        renderHeight: number;
        wordWrap: boolean;
        multiLine: boolean;
    }
    enum _CellType {
        None = 0,
        Cell = 1,
        ColumnHeader = 2,
        RowHeader = 3,
        TopLeft = 4,
        ColumnFooter = 5,
        BottomLeft = 6
    }
}
declare module wijmo.grid.pdf {
    function _merge(dst: any, src: any, overwrite?: boolean): any;
    function _combineColumns(regCol: _IColumn, bndCol: _IColumn): _IColumn;
    function _cloneStyle(val: CSSStyleDeclaration): any;
}
declare module wijmo.grid.pdf {
    /**
     * Represents arguments of the IFlexGridDrawSettings.formatItem callback.
     */
    class PdfFormatItemEventArgs extends /*wijmo.grid.CellRangeEventArgs*/ wijmo.CancelEventArgs {
        private _p;
        private _rng;
        private _data;
        private _tagContent;
        private _canvas;
        private _cell;
        private _clientRect;
        private _contentRect;
        private _textRect;
        private _style;
        private _getFormattedCell;
        private _getTextRect;
        /**
         * Initializes a new instance of the {@link PdfFormatItemEventArgs} class.
         *
         * @param p {@link GridPanel} that contains the range.
         * @param rng Range of cells affected by the event.
         * @param cell Element that represents the grid cell to be rendered.
         * @param canvas Canvas to perform the custom painting on.
         * @param clientRect    Object that represents the client rectangle of the grid cell to be rendered in canvas coordinates.
         * @param contentRect Object that represents the content rectangle of the grid cell to be rendered in canvas coordinates.
         * @param style Object that represents the style of the grid cell to be rendered.
         * @param getFormattedCell Callback function that should return the grid cell when the getFormattedCell method is called.
         * @param getTextRect Callback function that should return the text rectangle of the grid cell to be rendered in canvas coordinates.
         */
        constructor(p: any, rng: any, cell: HTMLElement, canvas: wijmo.pdf.PdfPageArea, clientRect: wijmo.Rect, contentRect: wijmo.Rect, style: ICellStyle, getFormattedCell: () => HTMLElement, getTextRect: () => wijmo.Rect);
        /**
         * Gets the {@link GridPanel} affected by this event.
         */
        readonly panel: wijmo.grid.GridPanel;
        /**
         * Gets the {@link CellRange} affected by this event.
         */
        readonly range: wijmo.grid.CellRange;
        /**
         * Gets the row affected by this event.
         */
        readonly row: number;
        /**
         * Gets the column affected by this event.
         */
        readonly col: number;
        /**
         * Gets or sets the data associated with the event.
         */
        data: any;
        /**
         * Gets or sets a value that indicates that default cell borders drawing should be canceled.
         */
        cancelBorders: boolean;
        /**
         * Gets the canvas to perform the custom painting on.
         */
        readonly canvas: wijmo.pdf.PdfPageArea;
        /**
         * Gets a reference to the element that represents the grid cell being rendered.
         * If IFlexGridDrawSettings.customCellContent is set to true then contains
         * reference to the element that represents the formatted grid cell; otherwise, a null value.
         */
        readonly cell: HTMLElement;
        /**
         * Gets the client rectangle of the cell being rendered in canvas coordinates.
         */
        readonly clientRect: wijmo.Rect;
        /**
         * Gets the content rectangle of the cell being rendered in canvas coordinates.
         */
        readonly contentRect: wijmo.Rect;
        /**
         * Draws the background of the cell with the specified brush or color, or, if it is not specified, with the value of the {@link style.backgroundColor} property.
         * @param brush The brush or color to use.
         */
        drawBackground(brush?: wijmo.pdf.PdfBrush | wijmo.Color | string): void;
        /**
         * Returns a reference to the element that represents the grid cell being rendered.
         * This method is useful when export of custom formatting is disabled, but you need
         * to export custom content for certain cells.
         */
        getFormattedCell(): HTMLElement;
        /**
         * Gets or sets a reference to a marked structure content of the cell.
         *
         * If user produces Tagged PDF and draws the cell content manually, then he can mark the cell content and return a reference to the structure content via this property.
         * The returned item will be incorporated into the document's structure tree.
         *
         * For example:
         * <pre>
         * args.tagContent = args.canvas.beginTagContent(wijmo.pdf.PdfTagType.P);
         * args.canvas.drawText('Some text', x, y);
         * args.canvas.endTagContent();
         * </pre>
         */
        tagContent: wijmo.pdf.IPdfTagContent | wijmo.pdf.IPdfTag;
        /**
         * Gets an object that represents the style of the cell being rendered.
         * If IFlexGridDrawSettings.customCellContent is set to true then the style is inferred
         * from the cell style; othwerwise it contains a combination of the IFlexGridDrawSettings.styles export
         * setting, according to the row type of exported cell.
         */
        readonly style: ICellStyle;
        /**
         * Gets the value that represents the top position of the text of the cell being rendered in canvas coordinates.
         */
        readonly textTop: number;
    }
}
declare module wijmo.grid.pdf {
    /**
     * Provides a functionality to export the {@link FlexGrid} to PDF.
     */
    class _FlexGridPdfCoreConverter {
        private static BorderWidth;
        private static DefFont;
        static DefaultDrawSettings: IFlexGridDrawSettings;
        /**
         * Draws the {@link FlexGrid} to an existing {@link PdfDocument} instance at the
         * specified coordinates.
         *
         * If width is not specified, then grid will be rendered in actual size
         * without any page breaks.
         * If height is not specified, then grid will be scaled to fit the width
         * without any page breaks.
         * If both, width and height are determined, then grid will be scaled to fit
         * the specified rectangle without any page breaks.
         *
         * <pre>
         * var doc = new wijmo.pdf.PdfDocument({
         *    ended: function (sender, args) {
         *       wijmo.pdf.saveBlob(args.blob, 'FlexGrid.pdf');
         *    }
         * });
         *
         * wijmo.grid.pdf.FlexGridPdfConverter.drawToPosition(grid, doc, new wijmo.Point(0, 0), null, null, {
         *    maxPages: 10,
         *    styles: {
         *       cellStyle: {
         *          backgroundColor: '#ffffff',
         *          borderColor: '#c6c6c6'
         *       },
         *       headerCellStyle: {
         *          backgroundColor: '#eaeaea'
         *       }
         *    }
         * });
         * </pre>
         *
         * @param flex The {@link FlexGrid} instance to export.
         * @param doc The {@link PdfDocument} instance to draw in.
         * @param point The position to draw at, in points.
         * @param width The width of the drawing area in points.
         * @param height The height of the drawing area in points.
         * @param settings The draw settings.
         */
        static draw(flex: _IFlexGridAdapter, doc: wijmo.pdf.PdfDocument, point?: wijmo.Point, width?: number, height?: number, settings?: IFlexGridExportSettings): void;
        static _applyDefaultDrawSettings(settings: any): IFlexGridDrawSettings;
        private static _drawInternal;
        private static _getCellsCount;
        private static _getRowsToRender;
        private static _getScaleFactor;
        private static _canBreakRows;
        private static _getPages;
    }
    class FlexGridRenderer {
        private _flex;
        private _borderWidth;
        private _lastPage;
        private _topLeft;
        private _rowHeader;
        private _columnHeader;
        private _cells;
        private _bottomLeft;
        private _columnFooter;
        private _settings;
        constructor(flex: _IFlexGridAdapter, settings: IFlexGridExportSettings, range: RowRange, borderWidth: number, lastPage: boolean);
        readonly settings: IFlexGridExportSettings;
        isRenderableRow(row: _IRow): boolean;
        isRenderableColumn(col: _IColumn): boolean;
        getCellsCount(): number;
        render(doc: wijmo.pdf.PdfDocument, cellRendered?: () => void): void;
        readonly flex: _IFlexGridAdapter;
        readonly renderSize: wijmo.Size;
        readonly showColumnHeader: boolean;
        readonly showRowHeader: boolean;
        readonly showColumnFooter: boolean;
        alignMergedTextToTheTopRow(panel: _IGridPanel): boolean;
        getColumn(panel: _IGridPanel, row: number, col: number): _IColumn;
        isAlternatingRow(row: _IRow): boolean;
        isGroupRow(row: _IRow): boolean;
        isNewRow(row: _IRow): boolean;
        isExpandableGroupRow(row: _IRow): boolean;
        isBooleanCell(panel: _IGridPanel, row: _IRow, col: _IColumn): boolean;
        getCellStyle(panel: _IGridPanel, row: _IRow, col: _IColumn): ICellStyle;
    }
    class PanelSection {
        private _range;
        private _panel;
        private _flex;
        private _renderableRowsCnt;
        private _renderableColumnsCnt;
        private _size;
        constructor(flex: _IFlexGridAdapter, panel: _IGridPanel, range: RowRange);
        readonly renderableRowsCount: number;
        readonly renderableColumnsCount: number;
        readonly size: wijmo.Size;
        readonly range: RowRange;
        readonly panel: _IGridPanel;
    }
    class PanelSectionRenderer extends PanelSection {
        private _borderWidth;
        private _gr;
        private _renderSize;
        constructor(gr: FlexGridRenderer, panel: _IGridPanel, range: RowRange, borderWidth: number);
        readonly gr: FlexGridRenderer;
        readonly renderSize: wijmo.Size;
        private _getRangeWidth;
        private _getRangeHeight;
        getCellsCount(): number;
        render(doc: wijmo.pdf.PdfDocument, x: number, y: number, cellRendered: () => void, tableSection: TrStructCache): void;
    }
    class TrStructCache {
        private doc;
        private tableSection;
        private _trh;
        private _trb;
        private _trf;
        constructor(doc: wijmo.pdf.PdfDocument, tableSection: wijmo.pdf.IPdfTag);
        readonly el: wijmo.pdf.IPdfTag;
        getTR(row: number, cellType: _CellType): wijmo.pdf.IPdfTag;
    }
    class _CellRenderer {
        private _pr;
        private _area;
        private _borderWidth;
        private readonly InvisiblePen;
        constructor(panelRenderer: PanelSectionRenderer, area: wijmo.pdf.PdfPageArea, borderWidth: number);
        renderCell(value: string, row: _IRow, column: _IColumn, rng: _CellRangeExt, r: wijmo.Rect): wijmo.pdf.IPdfTagContent | wijmo.pdf.IPdfTag;
        private _renderCell;
        private _isBooleanCellAndValue;
        private _isBoolean;
        private _measureCell;
        private _decompositeStyle;
        private _parseBorder;
        private _parsePadding;
        private _renderEmptyCell;
        private _renderBooleanCell;
        private _renderTextCell;
        private _calculateTextRect;
        private _getTextLineHeight;
    }
    class _CellRange implements _ICellRange {
        private _row;
        private _col;
        private _row2;
        private _col2;
        constructor(cr: _ICellRange);
        constructor(row: number, col: number, row2: number, col2: number);
        row: number;
        col: number;
        row2: number;
        col2: number;
        readonly topRow: number;
        readonly bottomRow: number;
        readonly leftCol: number;
        readonly rightCol: number;
        readonly columnSpan: number;
        readonly rowSpan: number;
        readonly isValid: boolean;
        readonly isSingleCell: boolean;
        copyFrom(cr: _CellRange): void;
        clone(): _CellRange;
        getRenderSize(flex: _IFlexGridAdapter, p: _IGridPanel): wijmo.Size;
        setRange(r?: number, c?: number, r2?: number, c2?: number): void;
    }
    class _CellRangeExt extends _CellRange {
        firstVisibleRow: number;
        visibleRowsCount: number;
        constructor(panel: _IGridPanel, cr: _ICellRange);
        constructor(panel: _IGridPanel, row: number, col: number, row2: number, col2: number);
        copyFrom(cr: _CellRangeExt): void;
        clone(): _CellRangeExt;
    }
    class RowRange {
        private _ranges;
        constructor(ranges: _ICellRange[]);
        length(): number;
        readonly isValid: boolean;
        readonly leftCol: number;
        readonly rightCol: number;
        clone(leftCol?: number, rightCol?: number): RowRange;
        getRenderSize(flex: _IFlexGridAdapter, panel: _IGridPanel): wijmo.Size;
        find(panel: _IGridPanel, fn: (row: _IRow) => boolean): _IRow | null;
        forEach(panel: _IGridPanel, fn: (row: _IRow, range?: _ICellRange, rowIdx?: number, seqIdx?: number) => void | boolean): void;
        subrange(from: number, count: number, leftCol?: number, rightCol?: number): RowRange;
    }
}
declare module wijmo.grid.pdf {
    function _removeFakeCell(): void;
    /**
    * Provides a functionality to export the {@link FlexGrid} to PDF.
    *
    * The example below shows how you can use a {@link FlexGridPdfConverter} to
    * export a {@link FlexGrid} to PDF:
    *
    * {@sample Grid/ImportExportPrint/PDF/ExportToFile/purejs Example}
    */
    class FlexGridPdfConverter {
        static _DefaultExportSettings: IFlexGridExportSettings;
        /**
        * Draws the {@link FlexGrid} to an existing {@link PdfDocument} at the
        * (0, @wijmo.pdf.PdfDocument.y) coordinates.
        *
        * If both, **width** and **height** are determined, then grid will be scaled to fit the
        * specified rectangle without any page breaks.
        * If only **width** is specifed, then grid will be scaled to fit the width, breaking
        * into pages vertically as needed.
        * Otherwise grid will be rendered in actual size, breaking into pages as needed.
        *
        * <pre>
        * var doc = new wijmo.pdf.PdfDocument({
        *    ended: function (sender, args) {
        *       wijmo.pdf.saveBlob(args.blob, 'FlexGrid.pdf');
        *    }
        * });
        *
        * wijmo.grid.pdf.FlexGridPdfConverter.draw(grid, doc, null, null, {
        *    maxPages: 10,
        *    styles: {
        *       cellStyle: {
        *          backgroundColor: '#ffffff',
        *          borderColor: '#c6c6c6'
        *       },
        *       headerCellStyle: {
        *          backgroundColor: '#eaeaea'
        *       }
        *    }
        * });
        * </pre>
        *
        * @param flex The {@link FlexGrid} instance to export.
        * @param doc The {@link PdfDocument} instance to draw in.
        * @param width The width of the drawing area in points.
        * @param height The height of the drawing area in points.
        * @param settings The draw settings.
        */
        static draw(flex: any, doc: wijmo.pdf.PdfDocument, width?: number, height?: number, settings?: IFlexGridDrawSettings): void;
        /**
        * Draws the {@link FlexGrid} to an existing {@link PdfDocument} instance at the
        * specified coordinates.
        *
        * If both, **width** and **height** are determined, then grid will be scaled to fit
        * the specified rectangle without any page breaks.
        * If only **width** is specified, then grid will be scaled to fit the width without
        * any page breaks.
        * Othwerwise grid will be rendered in actual size without any page breaks.
        *
        * <pre>
        * var doc = new wijmo.pdf.PdfDocument({
        *    ended: function (sender, args) {
        *       wijmo.pdf.saveBlob(args.blob, 'FlexGrid.pdf');
        *    }
        * });
        *
        * wijmo.grid.pdf.FlexGridPdfConverter.drawToPosition(grid, doc, new wijmo.Point(0, 0), null, null, {
        *    maxPages: 10,
        *    styles: {
        *       cellStyle: {
        *          backgroundColor: '#ffffff',
        *          borderColor: '#c6c6c6'
        *       },
        *       headerCellStyle: {
        *          backgroundColor: '#eaeaea'
        *       }
        *    }
        * });
        * </pre>
        *
        * @param flex The {@link FlexGrid} instance to export.
        * @param doc The {@link PdfDocument} instance to draw in.
        * @param point The position to draw at, in points.
        * @param width The width of the drawing area in points.
        * @param height The height of the drawing area in points.
        * @param settings The draw settings.
        */
        static drawToPosition(flex: any, doc: wijmo.pdf.PdfDocument, point: wijmo.Point, width?: number, height?: number, settings?: IFlexGridDrawSettings): void;
        /**
        * Exports the {@link FlexGrid} to PDF.
        *
        * <pre>
        * wijmo.grid.pdf.FlexGridPdfConverter.export(grid, 'FlexGrid.pdf', {
        *    scaleMode: wijmo.grid.pdf.ScaleMode.PageWidth,
        *    maxPages: 10,
        *    styles: {
        *       cellStyle: {
        *          backgroundColor: '#ffffff',
        *          borderColor: '#c6c6c6'
        *       },
        *       headerCellStyle: {
        *          backgroundColor: '#eaeaea'
        *       }
        *    },
        *    documentOptions: {
        *       info: {
        *          title: 'Sample'
        *       }
        *    }
        * });
        * </pre>
        *
        * @param flex The {@link FlexGrid} instance to export.
        * @param fileName Name of the file to export.
        * @param settings The export settings.
        */
        static export(flex: wijmo.grid.FlexGrid, fileName: string, settings?: IFlexGridExportSettings): void;
        static _getFlexGridAdapter(flex: wijmo.grid.FlexGrid, settings: IFlexGridDrawSettings): _IFlexGridAdapter;
        static _applyDefaultExportSettings(settings: any): IFlexGridExportSettings;
    }
}
declare module wijmo.grid.pdf {
    /**
    * Represents a single item of the {@link IClientData} dictionary.
    */
    interface IClientDataItem {
        /**
        * Gets or sets the content for the data item.
        */
        content: any;
        /**
        * Gets or sets the settings for the data item.
        */
        settings: any;
    }
    /**
    * Represents a dictionary of {name: value} pairs which contains client data.
    */
    interface IClientData {
        [name: string]: IClientDataItem;
    }
    /**
     * Provides arguments for the callback parameter of the {@link PdfWebWorkerClient.exportGrid} and {@link PdfWebWorkerClient.export} methods.
     */
    class PdfWebWorkerExportDoneEventArgs extends wijmo.EventArgs {
        private _blob;
        private _buf;
        /**
        * Initializes a new instance of the {@link PdfWebWorkerExportDoneEventArgs} class.
        *
        * @param buffer An ArrayBuffer.
        */
        constructor(buffer: ArrayBuffer);
        /**
        * Gets a Blob object that contains the document data.
        */
        readonly blob: Blob;
        /**
        * Gets an ArrayBuffer that contains the document data.
        */
        readonly buffer: ArrayBuffer;
    }
    /**
     * Represents client-side methods for exporting FlexGrid to PDF/generating PDF, for use with Web Worker.
     */
    class PdfWebWorkerClient {
        /**
         * Exports the {@link FlexGrid} to PDF in a background thread.
         *
         * @param worker The Web Worker instance to run the exporting code in.
         * @param grid The {@link FlexGrid} instance to export.
         * @param fileName The name of the file to export.
         * @param settings The export settings.
         * @param done An optional callback function to call when exporting is done. The function takes a single parameter, an instance of the {@link PdfWebWorkerExportDoneEventArgs} class.
         * To prevent the creation of a file the function should return False.
         * @param progress An optional function that gives feedback about the progress of the export. The function takes a single parameter, a number changing from 0.0 to 1.0,
         * where the value of 0.0 indicates that the operation has just begun and the value of 1.0 indicates that the operation has completed.
         */
        static exportGrid(worker: Worker, grid: wijmo.grid.FlexGrid, fileName: string, settings?: IFlexGridExportSettings, done?: (args: PdfWebWorkerExportDoneEventArgs) => false | void, progress?: (value: number) => void): void;
        /**
         * Exports PDF in a background thread.
         *
         * @param worker The Web Worker instance to run the exporting code in.
         * @param settings An object containing {@link PdfDocument}'s initialization settings.
         * @param done The callback function to call when drawing is done. The function takes a single parameter, an instance of the {@link PdfWebWorkerExportDoneEventArgs} class.
         * @param progress An optional function that gives feedback about the progress of the export. The function takes a single parameter, a number changing from 0.0 to 1.0,
         * where the value of 0.0 indicates that the operation has just begun and the value of 1.0 indicates that the operation has completed.
         */
        static export(worker: Worker, settings: any, done: (args: PdfWebWorkerExportDoneEventArgs) => void, progress?: (value: number) => void): void;
        /**
         * Adds named FlexGrid with settings, which will be used in a Web Worker to generate a PDF document.
         * This method should be used in conjunction with the {@link PdfWebWorkerClient.export} method.
         *
         * @param worker The Web Worker instance to send the data to.
         * @param grid The grid
         * @param name The name associated with the grid.
         * @param settings The draw settings.
         */
        static addGrid(worker: Worker, grid: wijmo.grid.FlexGrid, name: string, settings?: IFlexGridDrawSettings): void;
        /**
         * Adds named image with settings, which will be used in a Web Worker to generate a PDF document.
         * This method should be used in conjunction with the {@link PdfWebWorkerClient.export} method.
         *
         * @param worker The Web Worker instance to send the data to.
         * @param image A string containing the URL to get the image from or the data URI containing a base64 encoded image.
         * @param name The name associated with the image.
         * @param settings The image drawing settings.
         */
        static addImage(worker: Worker, image: string, name: string, settings?: wijmo.pdf.IPdfImageDrawSettings): void;
        /**
         * Adds named string which will be used in a Web Worker code to generate a PDF document.
         * This method should be used in conjunction with the {@link PdfWebWorkerClient.export} method.
         *
         * @param worker The Web Worker instance to send the data to.
         * @param value The value.
         * @param name The name associated with the string.
         */
        static addString(worker: Worker, value: string, name: string): void;
        /**
        * Serializes the {@link FlexGrid} to ArrayBuffer. The serialized data can be send to a Web Worker using the postMessage method.
        *
        * @param grid The {@link FlexGrid} instance to serialize.
        * @param settings The export settings used to serialize the grid.
        */
        static serializeGrid(grid: wijmo.grid.FlexGrid, settings?: IFlexGridExportSettings): ArrayBuffer;
        private static _addClientData;
        private static _clearClientData;
        private static _clientDataToArrayBuffer;
        private static _gridToJson;
        private static _getJsonConverter;
    }
    /**
     * Represents server-side methods for exporting FlexGrid to PDF/generating PDF, for use with Web Worker.
     */
    class PdfWebWorker {
        /**
         * Performs the export started in a UI thread by calling the {@link PdfWebWorkerClient.exportGrid} method.
         */
        static initExportGrid(): void;
        /**
         * Performs the PDF document generation started in a UI thread by calling the {@link PdfWebWorkerClient.export} method.
         *
         * @param draw The callback function to draw PDF.
         * The function takes two parameters:
         * <ul>
         *     <li><b>doc</b>: An instance of the {@link wijmo.pdf.PdfDocument} class.</li>
         *     <li><b>clientData</b>: A dictionary of {name: value} pairs that contains the data added on the client side.</li>
         * </ul>
         */
        static initExport(draw: (doc: wijmo.pdf.PdfDocument, clientData: IClientData) => void): void;
        /**
         * Sends the progress value to a client, where it will be handled by the {@link PdfWebWorkerClient.export}'s progress callback function.
         * Should be used in conjunction with the {@link PdfWebWorkerClient.export} method to inform client about the progress of the export.
         *
         * @param value The progress value, in the range of [0.0..1.0].
         */
        static sendExportProgress(value: number): void;
        /**
        * Deserializes the {@link FlexGrid} from ArrayBuffer to its internal representation that can be used in a Web Worker and passed to the {@link FlexGridPdfConverter.draw} and {@link FlexGridPdfConverter.drawToPosition} methods.
        *
        * @param data The data to deserialize.
        * @param settings The draw settings used to deserialize the grid.
        */
        static deserializeGrid(data: ArrayBuffer, settings?: IFlexGridDrawSettings): any;
        private static _deserializeGridFromString;
        private static _disableUnsupportedFeatures;
        private static _getJsonAdapter;
    }
}
declare module wijmo.grid.pdf {
}
