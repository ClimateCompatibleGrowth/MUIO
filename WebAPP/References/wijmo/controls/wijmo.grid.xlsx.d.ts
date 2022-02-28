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
declare module wijmo.grid.xlsx {
    function softDetail(): typeof wijmo.grid.detail;
    function softMultiRow(): typeof wijmo.grid.multirow;
    function softTransposed(): typeof wijmo.grid.transposed;
    function softTransposedMultiRow(): typeof wijmo.grid.transposedmultirow;
}
declare module wijmo.grid.xlsx {
    /**
     * This class provides static <b>load</b> and <b>save</b> methods for loading
     * and saving {@link FlexGrid} controls from and to Excel xlsx files.
     *
     * The example below shows how you can use the {@link FlexGridXlsxConverter} to
     * export the content of a {@link FlexGrid} control to XLSX:
     *
     * {@sample Grid/ImportExportPrint/Excel/Async/purejs Example}
     */
    class FlexGridXlsxConverter {
        private static hasCssText;
        /**
         * Save the {@link FlexGrid} instance to the {@link Workbook} instance.
         * This method works with JSZip 2.5.
         *
         * For example:
         * <pre>// This sample exports FlexGrid content to an xlsx file.
         * // click.
         * &nbsp;
         * // HTML
         * &lt;button
         *     onclick="saveXlsx('FlexGrid.xlsx')"&gt;
         *     Save
         * &lt;/button&gt;
         * &nbsp;
         * // JavaScript
         * function saveXlsx(fileName) {
         *     // Save the flexGrid to xlsx file.
         *     wijmo.grid.xlsx.FlexGridXlsxConverter.save(flexGrid,
         *             { includeColumnHeaders: true }, fileName);
         * }</pre>
         *
         * @param grid FlexGrid that will be saved.
         * @param options {@link IFlexGridXlsxOptions} object specifying the save options.
         * @param fileName Name of the file that will be generated.
         * @return A {@link Workbook} object that can be used to customize the workbook
         * before saving it (with the Workbook.save method).
         */
        static save(grid: wijmo.grid.FlexGrid, options?: IFlexGridXlsxOptions, fileName?: string): wijmo.xlsx.Workbook;
        private static _cs;
        /**
         * Asynchronously saves the content of a {@link FlexGrid} to a file.
         *
         * This method requires JSZip 3.0.
         *
         * The return value depends on the {@link asyncWorkbook} parameter. If it is false (default) then the
         * method returns the {@link Workbook} instance. If it is true then the method returns a null value
         * and the {@link Workbook} instance should be obtained in the {@link onSaved} callback.
         *
         * If {@link asyncWorkbook} parameter is true then, once started, the task will be automatically
         * restarted when changes in the grid are detected.
         *
         * @param grid FlexGrid that will be saved.
         * @param options {@link IFlexGridXlsxOptions} object specifying the save options.
         * @param fileName Name of the file that will be generated.
         * @param onSaved Callback invoked when the method finishes executing.
         * The callback provides access to the content of the saved workbook
         * (encoded as a base-64 string and passed as a parameter to the callback).
         * @param onError Callback invoked when there are errors saving the file.
         * The error is passed as a parameter to the callback.
         * @param onProgress Callback function that gives feedback about the progress of a task.
         * The function accepts a single argument, the current progress as a number between 0 and 100.
         * Can be used only if the {@link asyncWorkbook} parameter is set to true.
         * @param asyncWorkbook Indicates whether Workbook genaration should be performed asynchronously or not.
         * The default value is false.
         *
         * For example:
         * <pre>
         * wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(flexGrid,
         *     { includeColumnHeaders: true }, // options
         *     'FlexGrid.xlsx', // filename
         *     function (base64) { // onSaved
         *         // User can access the base64 string in this callback.
         *         document.getElementByID('export').href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' + 'base64,' + base64;
         *     },
         *     function (reason) { // onError
         *         // User can catch the failure reason in this callback.
         *         console.log('The reason of save failure is ' + reason);
         *     }
         *  );</pre>
         */
        static saveAsync(grid: wijmo.grid.FlexGrid, options?: IFlexGridXlsxOptions, fileName?: string, onSaved?: (base64: string, workbook: wijmo.xlsx.Workbook) => any, onError?: (reason?: any) => any, onProgress?: (value: number) => void, asyncWorkbook?: boolean): wijmo.xlsx.Workbook;
        /**
         * Cancels the task started by the {@link FlexGridXlsxConverter.saveAsync} method.
         * @param done Callback invoked when the method finishes executing.
         */
        static cancelAsync(done?: () => void): void;
        /**
         * Loads a {@link Workbook} instance or a Blob object containing xlsx
         * file content to the {@link FlexGrid} instance.
         * This method works with JSZip 2.5.
         *
         * For example:
         * <pre>// This sample opens an xlsx file chosen through Open File
         * // dialog and fills FlexGrid with the content of the first
         * // sheet.
         * &nbsp;
         * // HTML
         * &lt;input type="file"
         *     id="importFile"
         *     accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
         * /&gt;
         * &lt;div id="flexHost"&gt;&lt;/&gt;
         * &nbsp;
         * // JavaScript
         * var flexGrid = new wijmo.grid.FlexGrid("#flexHost"),
         *     importFile = document.getElementById('importFile');
         * &nbsp;
         * importFile.addEventListener('change', function () {
         *     loadWorkbook();
         * });
         * &nbsp;
         * function loadWorkbook() {
         *     var reader,
         *         file = importFile.files[0];
         *     if (file) {
         *         reader = new FileReader();
         *         reader.onload = function (e) {
         *             wijmo.grid.xlsx.FlexGridXlsxConverter.load(flexGrid, reader.result,
         *                 { includeColumnHeaders: true });
         *         };
         *         reader.readAsArrayBuffer(file);
         *     }
         * }</pre>
         *
         * @param grid {@link FlexGrid} that loads the {@link Workbook} object.
         * @param workbook A {@link Workbook}, Blob, base-64 string, or ArrayBuffer
         * containing the xlsx file content.
         * @param options {@link IFlexGridXlsxOptions} object specifying the load options.
         */
        static load(grid: wijmo.grid.FlexGrid, workbook: string | ArrayBuffer | Blob | wijmo.xlsx.Workbook, options?: IFlexGridXlsxOptions): void;
        /**
         * Asynchronously loads a {@link Workbook} or a Blob representing an xlsx file
         * into a {@link FlexGrid}.
         *
         * This method requires JSZip 3.0.
         *
         * @param grid {@link FlexGrid} that loads the {@link Workbook} object.
         * @param workbook {@link Workbook}, Blob, base-64 string, or ArrayBuffer
         * representing the xlsx file content.
         * @param options {@link IFlexGridXlsxOptions} object specifying the load options.
         * @param onLoaded Callback invoked when the method finishes executing.
         * The callback provides access to the workbook that was loaded
         * (passed as a parameter to the callback).
         * @param onError Callback invoked when there are errors saving the file.
         * The error is passed as a parameter to the callback.
         *
         * For example:
         * <pre>
         * wijmo.grid.xlsx.FlexGridXlsxConverter.loadAsync(grid, blob, null, function (workbook) {
         *      // user can access the loaded workbook instance in this callback.
         *      var app = worksheet.application ;
         *      ...
         * }, function (reason) {
         *      // User can catch the failure reason in this callback.
         *      console.log('The reason of save failure is ' + reason);
         * });
         * </pre>
         */
        static loadAsync(grid: wijmo.grid.FlexGrid, workbook: string | ArrayBuffer | Blob | wijmo.xlsx.Workbook, options?: IFlexGridXlsxOptions, onLoaded?: (workbook: wijmo.xlsx.Workbook) => void, onError?: (reason?: any) => any): void;
        private static _saveFlexGridToWorkbook;
        private static _saveContentToWorksheet;
        private static _loadToFlexGrid;
        private static _getColumnHeadersHeight;
        private static _escapePlainText;
        private static _parseFlexGridRowToSheetRow;
        static _parseCellStyle(cellStyle: CSSStyleDeclaration, isTableStyle?: boolean): wijmo.xlsx.IWorkbookStyle;
        private static _parseBorder;
        private static _parseEgdeBorder;
        static _parseBorderStyle(borderStyle: wijmo.xlsx.BorderStyle, edge: string, cellStyle: any): void;
        private static _parseToExcelFontFamily;
        private static _parseToExcelFormula;
        private static _parseToTextRuns;
        private static _parseToTextRunFont;
        static _getMeasureCell(panel: wijmo.grid.GridPanel, colIndex: number, patternCell: HTMLDivElement, cellsCache: _CellsCache): HTMLDivElement;
        private static _getColumnSetting;
        private static _getPerRowColumnsSettings;
        private static _toExcelHAlign;
        private static _getColumnCount;
        private static _getRowCount;
        private static _numAlpha;
        private static _getItemType;
        private static _setColumn;
        private static _getItemValue;
        static _getCellStyle(panel: wijmo.grid.GridPanel, fakeCell: HTMLDivElement, r: number, c: number, styleCache: _StyleCache | null, forceUpdateContent: boolean): CSSStyleDeclaration;
        private static _parseTextRunsToHTML;
        private static _extend;
        private static _checkParentCollapsed;
        private static _getColSpan;
        private static _getRenderColumn;
        private static _getMergedRange;
        private static _isFormula;
    }
    /**
     * Represents arguments of the IFlexGridXlsxOptions.formatItem callback.
     */
    class XlsxFormatItemEventArgs extends wijmo.grid.CellRangeEventArgs {
        private _cell;
        private _patternCell;
        private _xlsxCell;
        private _cellsCache;
        private _styleCache;
        constructor(panel: wijmo.grid.GridPanel, rng: wijmo.grid.CellRange, cell: HTMLDivElement, patternCell: HTMLDivElement, cellsCache: _CellsCache, styleCache: _StyleCache, xlsxCell: wijmo.xlsx.IWorkbookCell);
        /**
         * If {@link IFlexGridXlsxOptions.includeStyles} is set to true then contains a
         * reference to the element that represents the formatted grid cell; otherwise, a null value.
         */
        readonly cell: HTMLElement;
        /**
         * Contains an exporting cell representation. Initially it contains a default cell representation created
         * by FlexGrid export, and can be modified by the event handler to customize its final content. For example,
         * the xlsxCell.value property can be updated to modify a cell content, xlsxCell.style to modify cell's style,
         * and so on.
         */
        xlsxCell: wijmo.xlsx.IWorkbookCell;
        /**
         * Returns a cell with a custom formatting applied (formatItem event, cell templates).
         * This method is useful when export of custom formatting is disabled
         * ({@link IFlexGridXlsxOptions.includeStyles}=false), but you need
         * to export a custom content and/or style for a certain cells.
         */
        getFormattedCell(): HTMLElement;
    }
    class _StyleCache {
        private _cache;
        private _max;
        private _size;
        constructor(maxSize: number);
        add(key: string, value: CSSStyleDeclaration): void;
        clear(): void;
        getValue(key: string): CSSStyleDeclaration;
        hasKey(key: string): boolean;
        private _cloneStyle;
    }
    function _blobToBuffer(blob: Blob, callback: (buffer: ArrayBuffer) => void): void;
    /**
     * Defines additional worksheet properties that can be accesses via the dynamic <b>wj_sheetInfo</b> property
     * of the {@link FlexGrid} instance.
     */
    interface IExtendedSheetInfo {
        /**
         * The sheet name.
         */
        name: string;
        /**
         * Sheet visibility.
         */
        visible: boolean;
        /**
         * Styled cells in the sheet
         */
        styledCells: any;
        /**
         * Merged ranges in the sheet
         */
        mergedRanges: wijmo.grid.CellRange[];
        /**
         * Contains an array of font names used in the sheet.
         */
        fonts: string[];
        /**
         * The tables in this worksheet.
         */
        tables: wijmo.xlsx.WorkbookTable[];
        /**
         * A function that evaluates the formula of cell.
         */
        evaluateFormula?: Function;
    }
    /**
     * FlexGrid Xlsx conversion options
     */
    interface IFlexGridXlsxOptions {
        /**
         * Import only.
         *
         * Specifies the index of a sheet to import.
         *
         * The default value for this option is **0**.
         */
        sheetIndex?: number;
        /**
         * When importing, specifies the name of a sheet to import.
         * The **sheetName** takes priority over the **sheetIndex** option if both options are set.
         *
         * When exporting, sets the name of the exported sheet.
         *
         * The default value for this option is **undefined**.
         */
        sheetName?: string;
        /**
         * Export only.
         *
         * Indicates whether the sheet is visible.
         *
         * **Caveat:** This option must be used with care. In case where you generate an
         * xlsx file with a single invisible sheet, such a file can't be opened by Excel.
         * The only scenario where this option can be set to false is where you use multiple
         * export actions to assemble a multi-sheet workbook using a custom code.
         *
         * The default value for this option is **true**.
         */
        sheetVisible?: boolean;
        /**
         * Indicates whether to include column headers as first rows in the generated xlsx file.
         *
         * The default value for this option is **true**.
         */
        includeColumnHeaders?: boolean;
        /**
         * Indicates whether to include column headers as first rows in the generated xlsx file.
         *
         * The default value for this option is **false**.
         */
        includeRowHeaders?: boolean;
        /**
         * Export only.
         *
         * Indicates whether cells styling should be included in the generated xlsx file.
         * This option has been deprecated. Please use {@link IFlexGridXlsxOptions.includeStyles} option instead.
         *
         * The default value for this option is **true**.
         */
        includeCellStyles?: boolean;
        /**
         * When importing, indicates whether styles should be imported from xlsx file into a {@link Workbook} instance.
         *
         * When exporting, indicates whether cells styling should be included in the generated xlsx file.
         *
         * The default value for this option is **true**.
         */
        includeStyles?: boolean;
        /**
         * Export only.
         *
         * Index or name of the active sheet in the xlsx file.
         *
         * The default value for this option is **undefined** which means that the active sheet is not set.
         */
        activeWorksheet?: string | number;
        /**
         * Export only.
         *
         * A callback to indicate which columns of FlexGrid need be included or omitted during exporting.
         *
         * For example:
         * <pre>// This sample excludes the 'country' column from export.
         * &nbsp;
         * // JavaScript
         * wijmo.grid.xlsx.FlexGridXlsxConverter.save(grid, {
         *   includeColumns: function(column) {
         *      return column.binding !== 'country';
         *   }
         * }</pre>
         */
        includeColumns?: (column: wijmo.grid.Column) => boolean;
        /**
         * Export only.
         *
         * An optional callback which is called for every exported cell and allows to perform transformations
         * of exported cell value and style.
         * The callback is called irrespectively of the {@link IFlexGridXlsxOptions.includeStyles} option value.
         * It has a single parameter of the {@link XlsxFormatItemEventArgs} type that
         * provides both information about the source grid cell and an {@link IWorkbookCell} object
         * defining its representation in the exported file, which can be customized in the callback.
         */
        formatItem?: (args: XlsxFormatItemEventArgs) => void;
        /**
         * Export only.
         *
         * When turned on, decreases the export time by activating the cell styles caching if {@link IFlexGridXlsxOptions.includeStyles} option is enabled.
         * In typical scenarios it allows to decrease the export time by several times.
         *
         * The combination of cell's inline style specific properties, own CSS classes and CSS classes of row containing the cell is used as
         * the cache tag. Before the cell style is calculated, the cache is checked first, and if the style associated with the tag is found there,
         * it's taken from there and doesn't get recalculated.
         *
         * Using this mode can make the export slower when considerable amount of cells have the unique set of CSS classes and inline styles.
         * Also, when pseudo classes like :first-child and :nth-child are used to style the cells and rows, the cell styles can be determined
         * incorrectly.
         *
         * The default value for this option is **true**.
         */
        quickCellStyles?: boolean;
        /**
         * Export only.
         *
         * Defines the conversion behavior for HTML entities such as "&quot;", "&lt;", "&gt;" and "&amp;" when exporting.
         *
         * The default value is {@link HtmlEntityConversion.Auto}.
         */
        convertHtmlEntities?: HtmlEntityConversion;
    }
    type _CellsCache = HTMLDivElement[][];
    /**
     * Defines the conversion behavior for HTML entities such as "&quot;", "&lt;", "&gt;" and "&amp;" when exporting.
     */
    enum HtmlEntityConversion {
        /**
         * The behavior depends on the value of the column's {@link Column.isContentHtml} property to which the exported cell belongs.
         * If the property value is **true**, the HTML entities will be converted to the characters they represent, otherwise they will be left unchanged.
         */
        Auto = 0,
        /**
         * No conversion of HTML entities is performed.
         */
        No = 1,
        /**
         * Always convert HTML entities to the characters they represent.
         */
        Yes = 2
    }
}
declare module wijmo.grid.xlsx {
}
