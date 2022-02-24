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
declare module wijmo.grid {
    type _BrowserVer = {
        full: string;
        major: number;
        minor: number;
    };
    function _getSafariVer(): _BrowserVer;
}
declare module wijmo.grid {
    /**
     * Specifies constants that define the type of editor used with data-mapped columns.
     */
    enum DataMapEditor {
        /** Use an input element with auto-complete and validation. */
        AutoComplete = 0,
        /** Use an input element with auto-complete, validation, and a drop-down list. */
        DropDownList = 1,
        /** Use radio buttons with mouse and keyboard support. */
        RadioButtons = 2
    }
    /**
     * Represents a data map for use with a column's {@link Column.dataMap} property.
     *
     * Data maps provide the grid with automatic look up capabilities. For example,
     * you may want to display a customer name instead of his ID, or a color name
     * instead of its RGB value.
     *
     * The code below binds a grid to a collection of products, then assigns a
     * {@link DataMap} to the grid's 'CategoryID' column so the grid displays the
     * category names rather than the raw IDs.
     *
     * The grid takes advantage of data maps also for editing. If the <b>wijmo.input</b>
     * module is loaded, then when editing data-mapped columns the grid will show
     * a drop-down list containing the values on the map.
     *
     * ```typescript
     * import { FlexGrid, Column } from '@grapecity/wijmo.grid';
     *
     * // bind grid to products
     * let flex = new FlexGrid({
     *     itemsSource: products
     * });
     *
     * // map CategoryID column to show category name instead of ID
     * let col = flex.getColumn('CategoryID');
     * col.dataMap = new DataMap(categories, 'CategoryID', 'CategoryName');
     * ```
     *
     * In general, data maps apply to whole columns. However, there are situations
     * where you may want to restrict the options available for a cell based on a
     * value on a different column. For example, if you have "Country" and "City"
     * columns, you will probably want to restrict the cities based on the current
     * country.
     *
     * There are two ways you can implement these "dynamic" data maps:
     *
     * <ol>
     *   <li>
     *     If the {@link DataMap} is just a list of strings, you can change it before
     *     the grid enters edit mode. In this case, the cells contain the string
     *     being displayed, and changing the map won't affect other cells in the
     *     same column.
     *     This fiddle demonstrates:
     *     <a href="https://jsfiddle.net/Wijmo5/8brL80r8/">show me</a>.
     *   </li>
     *   <li>
     *     If the {@link DataMap} is a real map (stores key values in the cells, shows
     *     a corresponding string), then you can apply a filter to restrict the
     *     values shown in the drop-down. The {@link DataMap} will still contain the
     *     same keys and values, so other cells in the same column won't be disturbed
     *     by the filter.
     *     This fiddle demonstrates:
     *     <a href="https://jsfiddle.net/Wijmo5/xborLd4t/">show me</a>.
     *   </li>
     * </ol>
     *
     * In some cases, you may want to create a {@link DataMap} to represent an enumeration.
     * This can be done with the following code:
     *
     * ```typescript
     * // build a DataMap for a given enum
     * function getDataMap(enumClass) {
     *     let pairs = [];
     *     for (let key in enumClass) {
     *         var val = parseInt(key);
     *         if (!isNaN(val)) {
     *             pairs.push({ key: val, name: enumClass[val] });
     *         }
     *     }
     *     return new DataMap(pairs, 'key', 'name');
     * }
     * ```
     * DataMap can treat keys in two different ways, this functionality is controlled by the
     * {@link serializeKeys} property. By default, key values are converted to strings before
     * processing, that is different values will produce the same key value if their string
     * representations are equal. This is usually the preferred behavior. You maw need to change
     * this mode if your keys are complex objects or arrays of complex objects. See the
     * {@link serializeKeys} property documentation for more details.
     */
    class DataMap<K = any, V = any> {
        _cv: wijmo.collections.ICollectionView;
        _keyPath: string;
        _displayPath: string;
        _sortByVal: boolean;
        _editable: boolean;
        private _map;
        private _serK;
        /**
         * Initializes a new instance of the {@link DataMap} class.
         *
         * @param itemsSource An array or {@link ICollectionView} that contains the items to map.
         * @param selectedValuePath The name of the property that contains the keys (data values).
         * @param displayMemberPath The name of the property to use as the visual representation of the items.
         */
        constructor(itemsSource: any, selectedValuePath?: string, displayMemberPath?: string);
        /**
         * Gets or sets a value that determines whether grid controls should
         * use mapped (display) or raw (key) values when sorting data in columns
         * that use this {@link DataMap}.
         *
         * The default value for this property is <b>true</b>.
         */
        sortByDisplayValues: boolean;
        /**
        * Gets or sets a value indicating whether key values are converted to strings before use.
        *
        * The default value is true.
        *
        * This property is set to true by default, which means that for example the keys 123 (number) and
        * ‘123’ (string), two Date objects defining the same date/time, and two different arrays of
        * primitive values (like [1,2,3]), are treated as the equal key pairs and mapped to the same value.
        *
        * If to set this property to false, the keys equality will be determined as in the native Map class,
        * that is using the triple-equality (===) operator. This mode is useful if your keys are objects
        * or arrays of objects.
        * Note that in this case DataMap uses the native browser’s Map implementation. Some old mobile
        * browsers, as well as IE9/10, don’t implement the Map interface. In this case DataMap will use
        * its own array based implementation, which can bring serious performance penalties in case
        * of big data arrays.
        */
        serializeKeys: boolean;
        /**
         * Gets the {@link ICollectionView} object that contains the map data.
         */
        readonly collectionView: wijmo.collections.ICollectionView;
        /**
         * Gets the name of the property to use as a key for the item (data value).
         */
        readonly selectedValuePath: string;
        /**
         * Gets the name of the property to use as the visual representation of the item.
         */
        readonly displayMemberPath: string;
        /**
         * Gets the item that corresponds to a given key.
         *
         * @param key The key of the item to retrieve.
         */
        getDataItem(key: K): V;
        /**
         * Gets the display value that corresponds to a given key.
         *
         * @param key The key of the item to retrieve.
         */
        getDisplayValue(key: K): string;
        /**
         * Gets the key that corresponds to a given display value.
         *
         * @param displayValue The display value of the item to retrieve.
         * @param html Whether to convert the lookup values from HTML to plain text.
         */
        getKeyValue(displayValue: string, html?: boolean): K;
        /**
         * Gets an array with all of the display values on the map.
         *
         * @param dataItem Data item for which to get the display items.
         * This parameter is optional. If not provided, all possible display
         * values should be returned.
         */
        getDisplayValues(dataItem?: V): string[];
        /**
         * Gets an array with all of the keys on the map.
         */
        getKeyValues(): K[];
        /**
         * Gets or sets a value that indicates whether users should be allowed to enter
         * values that are not present on the {@link DataMap}.
         *
         * In order for a {@link DataMap} to be editable, the {@link selectedValuePath} and
         * {@link displayMemberPath} must be set to the same value.
         */
        isEditable: boolean;
        /**
         * Occurs when the map data changes.
         */
        readonly mapChanged: Event<DataMap<any, any>, EventArgs>;
        /**
         * Raises the {@link mapChanged} event.
         */
        onMapChanged(e?: wijmo.EventArgs): void;
        private _indexOf;
    }
}
declare module wijmo.grid {
    /**
     * Represents a rectangular group of cells defined by two row indices and
     * two column indices.
     */
    class CellRange {
        _row: number;
        _col: number;
        _row2: number;
        _col2: number;
        /**
         * Initializes a new instance of the {@link CellRange} class.
         *
         * @param r The index of the first row in the range (defaults to -1).
         * @param c The index of the first column in the range (defaults to -1).
         * @param r2 The index of the last row in the range (defaults to <b>r</b>).
         * @param c2 The index of the last column in the range (defaults to <b>c</b>).
         */
        constructor(r?: number, c?: number, r2?: number, c2?: number);
        /**
         * Initializes an existing {@link CellRange}.
         *
         * @param r The index of the first row in the range (defaults to -1).
         * @param c The index of the first column in the range (defaults to -1).
         * @param r2 The index of the last row in the range (defaults to <b>r</b>).
         * @param c2 The index of the last column in the range (defaults to <b>c</b>).
         */
        setRange(r?: number, c?: number, r2?: number, c2?: number): void;
        /**
         * Gets or sets the index of the first row in this range.
         */
        row: number;
        /**
         * Gets or sets the index of the first column in this range.
         */
        col: number;
        /**
         * Gets or sets the index of the second row in this range.
         */
        row2: number;
        /**
         * Gets or sets the index of the second column in this range.
         */
        col2: number;
        /**
         * Creates a copy of this range.
         */
        clone(): CellRange;
        /**
         * Copies an existing cell range into this one.
         *
         * @param rng {@link CellRange} to copy into this one.
         */
        copy(rng: CellRange): void;
        /**
         * Gets the number of rows in this range.
         */
        readonly rowSpan: number;
        /**
         * Gets the number of columns in this range.
         */
        readonly columnSpan: number;
        /**
         * Gets the index of the top row in this range.
         */
        readonly topRow: number;
        /**
         * Gets the index of the bottom row in this range.
         */
        readonly bottomRow: number;
        /**
         * Gets the index of the leftmost column in this range.
         */
        readonly leftCol: number;
        /**
         * Gets the index of the rightmost column in this range.
         */
        readonly rightCol: number;
        /**
         * Checks whether this range contains valid row and column indices
         * (row and column values are zero or greater).
         */
        readonly isValid: boolean;
        /**
         * Checks whether this range corresponds to a single cell.
         */
        readonly isSingleCell: boolean;
        /**
         * Checks whether this range contains another range or a specific cell.
         *
         * @param r The {@link CellRange} or row index to find.
         * @param c The column index (required if the r parameter is not a {@link CellRange} object).
         */
        contains(r: any, c?: number): boolean;
        /**
         * Checks whether this range contains a given row.
         *
         * @param r The index of the row to find.
         */
        containsRow(r: number): boolean;
        /**
         * Checks whether this range contains a given column.
         *
         * @param c The index of the column to find.
         */
        containsColumn(c: number): boolean;
        /**
         * Checks whether this range intersects another range.
         *
         * @param rng The {@link CellRange} object to check.
         */
        intersects(rng: CellRange): boolean;
        /**
         * Checks whether this range intersects the rows in another range.
         *
         * @param rng The {@link CellRange} object to check.
         */
        intersectsRow(rng: CellRange): boolean;
        /**
         * Checks whether this range intersects the columns in another range.
         *
         * @param rng The {@link CellRange} object to check.
         */
        intersectsColumn(rng: CellRange): boolean;
        /**
         * Gets the rendered size of this range.
         *
         * @param p The {@link GridPanel} object that contains this range.
         * @return A {@link Size} object that represents the sum of row heights and column widths in this range.
         */
        getRenderSize(p: GridPanel): wijmo.Size;
        /**
         * Checks whether this range equals another range.
         *
         * @param rng The {@link CellRange} object to compare to this range.
         */
        equals(rng: CellRange): boolean;
        /**
         * Returns a new {@link CellRange} that represents the union of
         * this range and another given range.
         *
         * @param rng {@link CellRange} to combine with this range.
         * @return A {@link CellRange} object that represents the union of
         * this range and the given range, or this range if the range to
         * combine with is null.
         */
        combine(rng: CellRange): CellRange;
        /**
         * Returns a string representing this {@link CellRange}.
         */
        toString(): string;
    }
}
declare module wijmo.grid {
    /**
     * Specifies constants that define the type of cell in a {@link GridPanel}.
     */
    enum CellType {
        /** Unknown or invalid cell type. */
        None = 0,
        /** Regular data cell. */
        Cell = 1,
        /** Column header cell. */
        ColumnHeader = 2,
        /** Row header cell. */
        RowHeader = 3,
        /** Top-left cell (intersection between row headers and column headers). */
        TopLeft = 4,
        /** Column footer cell. */
        ColumnFooter = 5,
        /** Bottom left cell (intersection between row headers and column footers). **/
        BottomLeft = 6
    }
    /**
     * Represents a logical part of the grid, such as the column headers, row headers,
     * and scrollable data part.
     */
    class GridPanel {
        private _g;
        private _ct;
        private _e;
        private _rows;
        private _cols;
        private _offsetY;
        private _activeCell;
        private _docRange;
        private _rng;
        private _recycle;
        _vrb: CellRange;
        _vru: CellRange;
        static readonly _INDEX_KEY: string;
        static readonly _HTML_CELL: string;
        /**
         * Initializes a new instance of the {@link GridPanel} class.
         *
         * @param g The {@link FlexGrid} object that owns the panel.
         * @param cellType The type of cell in the panel.
         * @param rows The rows displayed in the panel.
         * @param cols The columns displayed in the panel.
         * @param host The HTMLElement that hosts the cells in the control.
         */
        constructor(g: FlexGrid, cellType: CellType, rows: RowCollection, cols: ColumnCollection, host: HTMLElement);
        /**
         * Gets the grid that owns the panel.
         */
        readonly grid: FlexGrid;
        /**
         * Gets the type of cell contained in the panel.
         */
        readonly cellType: CellType;
        /**
         * Gets a {@link CellRange} that indicates the range of cells currently visible on the panel.
         */
        readonly viewRange: CellRange;
        /**
         * Gets the total width of the content in the panel.
         */
        readonly width: number;
        /**
         * Gets the total height of the content in this panel.
         */
        readonly height: number;
        /**
         * Gets the panel's row collection.
         */
        readonly rows: RowCollection;
        /**
         * Gets the panel's column collection.
         */
        readonly columns: ColumnCollection;
        /**
         * Gets the value stored in a cell in the panel.
         *
         * @param r The row index of the cell.
         * @param c The index, name, or binding of the column that contains the cell.
         * @param formatted Whether to format the value for display.
         */
        getCellData(r: number, c: number | string, formatted: boolean): any;
        /**
         * Sets the content of a cell in the panel.
         *
         * @param r The index of the row that contains the cell.
         * @param c The index, name, or binding of the column that contains the cell.
         * @param value The value to store in the cell.
         * @param coerce Whether to change the value automatically to match the column's data type.
         * @param invalidate Whether to invalidate the grid to show the change.
         * @return Returns true if the value is stored successfully, false otherwise (failed cast).
         */
        setCellData(r: number, c: number | string, value: any, coerce?: boolean, invalidate?: boolean): boolean;
        /**
         * Gets a cell's bounds in viewport coordinates.
         *
         * The returned value is a {@link Rect} object which contains the position and dimensions
         * of the cell in viewport coordinates.
         * The viewport coordinates are the same as those used by the
         * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect"
         * target="_blank">getBoundingClientRect</a> method.
         *
         * @param r The index of the row that contains the cell.
         * @param c The index, name, or binding of the column that contains the cell.
         * @param raw Whether to return the rectangle in raw panel coordinates as opposed to viewport coordinates.
         */
        getCellBoundingRect(r: number, c: number | string, raw?: boolean): wijmo.Rect;
        /**
         * Gets the element that represents a cell within this {@link GridPanel}.
         *
         * If the cell is not currently in view, this method returns null.
         *
         * @param r The index of the row that contains the cell.
         * @param c The index, name, or binding of the column that contains the cell.
         */
        getCellElement(r: number, c: number | string): HTMLElement;
        /**
         * Gets a {@link SelectedState} value that indicates the selected state of a cell.
         *
         * @param r Row index of the cell to inspect.
         * @param c The index, name, or binding of the column that contains the cell.
         * @param rng {@link CellRange} that contains the cell to inspect.
         */
        getSelectedState(r: number, c: number | string, rng?: CellRange): SelectedState;
        /**
         * Gets the host element for the panel.
         */
        readonly hostElement: HTMLElement;
        _toIndex(c: number | string): number;
        _getAdjustedSelection(sel: CellRange): CellRange;
        _getOffsetY(): number;
        _updateContent(recycle: boolean, state: boolean, offsetY: number): HTMLElement;
        _clearCells(): void;
        _reorderCells(rngNew: CellRange, rngOld: CellRange): void;
        _createRange(host: Element, start: number, end: number): Range;
        _renderColHdrRow(rng: CellRange, state: boolean): number;
        _renderColHdrCell(row: HTMLElement, c: number, rng: CellRange, state: boolean, ctr: number): number;
        _renderRowHdrCell(row: HTMLElement, r: number, value: any): number;
        _renderRow(r: number, rng: CellRange, state: boolean, ctr: number): number;
        _renderCell(row: HTMLElement, r: number, c: number, rng: CellRange, state: boolean, ctr: number): number;
        _removeExtraCells(row: HTMLElement, count: number): void;
        _getViewRange(): CellRange;
        _getFrozenPos(): wijmo.Point;
    }
}
declare module wijmo.grid {
    /**
     * Provides arguments for {@link CellRange} events.
     */
    class CellRangeEventArgs extends wijmo.CancelEventArgs {
        _p: GridPanel;
        _rng: CellRange;
        _data: any;
        /**
         * Initializes a new instance of the {@link CellRangeEventArgs} class.
         *
         * @param p {@link GridPanel} that contains the range.
         * @param rng Range of cells affected by the event.
         * @param data Data related to the event.
         */
        constructor(p: GridPanel, rng: CellRange, data?: any);
        /**
         * Gets the {@link GridPanel} affected by this event.
         */
        readonly panel: GridPanel;
        /**
         * Gets the {@link CellRange} affected by this event.
         */
        readonly range: CellRange;
        /**
         * Gets the index of the row affected by this event.
         *
         * To get the {@link Row} object, use the {@link getRow} method.
         */
        readonly row: number;
        /**
         * Gets the index of the column affected by this event.
         *
         * To get the {@link Column} object, use the {@link getColumn} method.
         */
        readonly col: number;
        /**
         * Gets or sets the data associated with the event.
         */
        data: any;
        /**
         * Gets the {@link Row} affected by this event.
         *
         * To get the row index, use the {@link row} property.
         */
        getRow(): Row;
        /**
         * Gets the {@link Column} affected by this event.
         *
         * To get the column index, use the {@link col} property.
         *
         * @param binding Whether to get the column by index or by binding.
         * This parameter only makes a difference in grids that have multiple
         * rows per data item (like the {@link MultiRow} grid).
         */
        getColumn(binding?: boolean): Column;
    }
    /**
     * Provides arguments for the {@link FlexGrid.formatItem} event.
     */
    class FormatItemEventArgs extends CellRangeEventArgs {
        _cell: HTMLElement;
        _updateContent: boolean;
        /**
        * Initializes a new instance of the {@link FormatItemEventArgs} class.
        *
        * @param p {@link GridPanel} that contains the range.
        * @param rng Range of cells affected by the event.
        * @param cell Element that represents the grid cell to be formatted.
        * @param updateContent Whether to set the cell content in addition to its dimensions and styles.
        */
        constructor(p: GridPanel, rng: CellRange, cell: HTMLElement, updateContent?: boolean);
        /**
         * Gets a reference to the element that represents the grid cell to be formatted.
         */
        readonly cell: HTMLElement;
        /**
         * Gets a value that determines whether the handler should set the cell content
         * in addition to its dimensions and styles.
         */
        readonly updateContent: boolean;
    }
    /**
     * Provides arguments for the {@link FlexGrid.cellEditEnding} event.
     */
    class CellEditEndingEventArgs extends CellRangeEventArgs {
        _stayInEditMode: boolean;
        _refresh: boolean;
        /**
         * Gets or sets whether the cell should remain in edit mode
         * instead of finishing the edits.
         */
        stayInEditMode: boolean;
        /**
         * Gets or sets a value that determines whether the grid should
         * refresh all its contents after the edits are done.
         */
        refresh: boolean;
    }
}
declare module wijmo.grid {
    /**
     * Specifies constants that define the selection behavior.
     */
    enum SelectionMode {
        /** The user cannot select cells using the mouse or keyboard. */
        None = 0,
        /** The user can select only a single cell at a time. */
        Cell = 1,
        /** The user can select contiguous blocks of cells. */
        CellRange = 2,
        /** The user can select a single row at a time. */
        Row = 3,
        /** The user can select contiguous rows. */
        RowRange = 4,
        /** The user can select non-contiguous rows by ctrl+clicking. */
        ListBox = 5,
        /** The user can select multiple ranges by ctrl+clicking and dragging the mouse. */
        MultiRange = 6
    }
    /**
     * Specifies constants that represent the selected state of a cell.
     */
    enum SelectedState {
        /** The cell is not selected. */
        None = 0,
        /** The cell is selected but is not the active cell. */
        Selected = 1,
        /** The cell is selected and is the active cell. */
        Cursor = 2,
        /** The cell is active cell but not in a selected state. */
        Active = 3
    }
    /**
     * Specifies constants that represent a type of movement for the selection.
     */
    enum SelMove {
        /** Do not change the selection. */
        None = 0,
        /** Select the next visible cell. */
        Next = 1,
        /** Select the previous visible cell. */
        Prev = 2,
        /** Select the first visible cell in the next page. */
        NextPage = 3,
        /** Select the first visible cell in the previous page. */
        PrevPage = 4,
        /** Select the first visible cell. */
        Home = 5,
        /** Select the last visible cell. */
        End = 6,
        /** Select the next visible cell skipping columns and rows if necessary. */
        NextCell = 7,
        /** Select the previous visible cell skipping columns and rows if necessary. */
        PrevCell = 8,
        /** Select the next visible and editable cell skipping columns and rows if necessary. */
        NextEditableCell = 9,
        /** Select the previous visible cell skipping columns and rows if necessary. */
        PrevEditableCell = 10
    }
    /**
     * Handles the grid's selection.
     */
    class _SelectionHandler {
        protected _g: FlexGrid;
        private _sel;
        private _xSel;
        private _e;
        private _mode;
        /**
         * Initializes a new instance of the {@link _SelectionHandler} class.
         *
         * @param g {@link FlexGrid} that owns this {@link _SelectionHandler}.
         */
        constructor(g: FlexGrid);
        /**
         * Gets or sets the current selection mode.
         */
        selectionMode: SelectionMode;
        /**
         * Gets or sets the current selection.
         */
        selection: CellRange;
        /**
         * Gets an array with {@link CellRange} objects that are part of
         * the grid's extended selection.
         */
        readonly extendedSelection: wijmo.collections.ObservableArray<CellRange>;
        /**
         * Selects a cell range and optionally scrolls it into view.
         *
         * @param rng Range to select (or index of the row to select).
         * @param show Whether to scroll the new selection into view (or index/name of the column to select).
         * @param force Whether to update the selection even if the {@link selectionChanging}
         * event cancels the change.
         */
        select(rng: CellRange | number, show?: boolean | number | string, force?: boolean): boolean;
        /**
         * Moves the selection by a specified amount in the vertical and horizontal directions.
         * @param rowMove How to move the row selection.
         * @param colMove How to move the column selection.
         * @param extend Whether to extend the current selection or start a new one.
         */
        moveSelection(rowMove: SelMove, colMove: SelMove, extend: boolean): void;
        _getNextColumnCell(r: number, c: number, move: SelMove, pageSize?: number): any;
        _getNextRowCell(r: number, c: number, move: SelMove, pageSize?: number): any;
        _setSelectionMode(value: SelectionMode): void;
        _adjustSelection(range: CellRange, mode: SelectionMode, force?: boolean): void;
        _expandSelection(): void;
        _deselectRange(rng: CellRange): boolean;
        private _expandSelectedRows;
        private _expandSelectionRange;
        private _selectRows;
        private _showSelection;
        private _adjustReferenceCell;
    }
}
declare module wijmo.grid {
    /**
     * Specifies flags that represent the state of a grid row or column.
     */
    enum RowColFlags {
        /** The row or column is visible. */
        Visible = 1,
        /** The row or column can be resized. */
        AllowResizing = 2,
        /** The row or column can be dragged to a new position with the mouse. */
        AllowDragging = 4,
        /** The row or column can contain merged cells. */
        AllowMerging = 8,
        /** The column can be sorted by clicking its header with the mouse. */
        AllowSorting = 16,
        /** The column was generated automatically. */
        AutoGenerated = 32,
        /** The group row is collapsed. */
        Collapsed = 64,
        /** The row has a parent group that is collapsed. */
        ParentCollapsed = 128,
        /** The row or column is selected. */
        Selected = 256,
        /** The row or column is read-only (cannot be edited). */
        ReadOnly = 512,
        /** Cells in this row or column contain HTML text. */
        HtmlContent = 1024,
        /** Cells in this row or column may contain wrapped text. */
        WordWrap = 2048,
        /** Cells in this row or column may contain wrapped text. */
        MultiLine = 4096,
        /** Cells in this column have templates. */
        HasTemplate = 8192,
        /** Default settings for new rows. */
        RowDefault = 3,
        /** Default settings for new columns. */
        ColumnDefault = 23
    }
    /**
     * An abstract class that serves as a base for the {@link Row} and {@link Column} classes.
     */
    class RowCol {
        protected _type: wijmo.DataType;
        protected _align: string;
        protected _inpType: string;
        protected _mask: string;
        protected _maxLen: number;
        protected _required: boolean;
        protected _fmt: string;
        protected _map: DataMap;
        protected _mapEditor: DataMapEditor;
        protected _ddCssClass: string;
        protected _cssClass: string;
        protected _cssClassAll: string;
        protected _szMin: number;
        protected _szMax: number;
        protected _f: RowColFlags;
        _sz: number;
        _list: RowColCollection;
        _pos: number;
        _idx: number;
        _idxVis: number;
        _idxData: number;
        _binding: wijmo.Binding;
        _bindingSort: wijmo.Binding;
        /**
         * Gets or sets the name of the property the column is bound to.
         *
         * The default value for this property is **null**, which means
         * the column is not bound to any data fields.
         *
         * This property is set automatically for auto-generated columns
         * (see {@link FlexGrid.autoGenerateColumns}).
         */
        binding: string | null;
        /**
         * Gets or sets the name of the property to use when sorting this column.
         *
         * Use this property in cases where you want the sorting to be performed
         * based on values other than the ones specified by the {@link binding} property.
         *
         * The default value for this property is **null**, which causes the grid to
         * use the value of the {@link binding} property to sort the column.
         */
        sortMemberPath: string | null;
        /**
         * Gets or sets the type of value stored in the column or row.
         *
         * Values are coerced into the proper type when editing the grid.
         *
         * The default value for this property is **null**, which causes
         * the grid not to perform any data type coercion.
         *
         * This property is set automatically for auto-generated columns
         * (see {@link FlexGrid.autoGenerateColumns}).
         */
        dataType: wijmo.DataType | null;
        /**
         * Gets or sets the "type" attribute of the HTML input element used to
         * edit values in this column or row.
         *
         * The default value for this property is **null**, which causes the
         * grid to use the type "tel" for numeric columns, and "text" for all
         * other non-boolean column types.
         *
         * The "tel" input type causes mobile devices to show a numeric keyboard
         * that includes a negative sign and a decimal separator.
         *
         * Use this property to change the default setting if the default does not
         * work well for the current culture, device, or application.
         * In these cases, try setting the property to "number" or simply "text."
         */
        inputType: string | null;
        /**
         * Gets or sets a mask to use while editing values in this column or row.
         *
         * The format used to define the mask is the same used by the
         * {@link wijmo.input.InputMask} control.
         *
         * If specified, the mask must be compatible with the value of the
         * {@link format} property. For example, the mask '99/99/9999' can be used
         * for entering dates formatted as 'MM/dd/yyyy'.
         *
         * The default value for this property is **null**, which means any
         * character is accepted at any position.
         */
        mask: string | null;
        /**
         * Gets or sets the maximum number of characters that the can
         * be entered into cells in this column or row.
         *
         * The default value for this property is **null**, which
         * allows entries with any number of characters.
         */
        maxLength: number | null;
        /**
         * Gets or sets the horizontal alignment of cells in the column or row.
         *
         * The default value for this property is **null**, which causes the grid
         * to select the alignment automatically based on the column's {@link dataType}
         * (numbers are right-aligned, Boolean values are centered, and other types
         * are left-aligned).
         *
         * If you want to override the default alignment, set this property
         * to 'left', 'right', 'center', or 'justify'.
         */
        align: string | null;
        /**
         * Gets or sets the format string used to convert raw values into
         * display values for the column or row (see {@link Globalize}).
         *
         * The default value for this property is **null**, which causes
         * the grid to use default formats that depend on the data type.
         */
        format: string | null;
        /**
         * Gets or sets the {@link DataMap} used to convert raw values into display
         * values for the column or row.
         *
         * By default, data-mapped cells have drop-down lists that can be used for
         * quick editing. You can change the type of editor by setting the
         * column's {@link dataMapEditor} property.
         *
         * The default value for this property is **null**.
         */
        dataMap: DataMap | null;
        /**
         * Gets or sets a value that indicates the type of editor to use when
         * editing data-mapped cells in this column or row.
         *
         * The default value for this property is {@link DataMapEditor.DropDownList},
         * which adds drop-down buttons to cells to columns that have a {@link dataMap}
         * and are not read-only.
         *
         * Clicking on the drop-down buttons causes the grid to show a list where
         * users can select the value for the cell.
         *
         * The {@link DataMapEditor.RadioButtons} setting causes the grid to
         * show radio buttons for each option. The buttons can be clicked with
         * the mouse or keyboard (by pressing each option's initial letter or
         * the space key to cycle through the options.)
         *
         * Note that drop-down lists are available only if the **wijmo.input.ListBox**
         * class is loaded/imported by the application.
         */
        dataMapEditor: DataMapEditor;
        showDropDown: boolean;
        /**
         * Gets or sets a CSS class name to add to drop-downs in this column or row.
         *
         * The drop-down buttons are shown only if the column has a {@link dataMap}
         * set and is editable. Clicking on the drop-down buttons causes the grid
         * to show a list where users can select the value for the cell.
         *
         * Note that drop-down lists are available only if the **wijmo.input.ListBox**
         * class is loaded/imported by the application.
         *
         * The default value for this property is **null**.
         */
        dropDownCssClass: string | null;
        /**
         * Gets or sets a value that indicates whether the column or row
         * is visible.
         *
         * The default value for this property is **true**.
         */
        visible: boolean;
        /**
         * Gets a value that indicates whether the column or row is
         * visible and not collapsed.
         *
         * This property is read-only. To change the visibility of a
         * column or row, use the {@link visible} property instead.
         */
        readonly isVisible: boolean;
        /**
         * Gets the position of the column or row in pixels.
         */
        readonly pos: number;
        /**
         * Gets the index of the column or row in the parent collection.
         */
        readonly index: number;
        /**
         * Gets the index of the column or row in the parent collection
         * ignoring invisible elements ({@link isVisible}).
         */
        readonly visibleIndex: number;
        /**
         * Gets or sets the size of the column or row.
         *
         * Setting this property to null or negative values causes
         * the element to use the parent collection's default size.
         */
        size: number | null;
        /**
         * Gets the render size of the column or row.
         *
         * This property accounts for visibility, default size,
         * and min and max sizes.
         */
        readonly renderSize: number;
        /**
         * Gets or sets a value that indicates whether the user can resize
         * the column or row with the mouse.
         *
         * The default value for this property is **true**.
         */
        allowResizing: boolean;
        /**
         * Gets or sets a value that indicates whether the user can move
         * the column or row to a new position with the mouse.
         *
         * The default value for this property is **true**.
         */
        allowDragging: boolean;
        /**
         * Gets or sets a value that indicates whether cells in the
         * column or row can be merged.
         *
         * The default value for this property is **false**.
         */
        allowMerging: boolean;
        /**
         * Gets or sets a value that indicates whether the column or row
         * is selected.
         *
         * The default value for this property is **false**.
         */
        isSelected: boolean;
        /**
         * Gets or sets a value that indicates whether cells in the
         * column or row can be edited.
         *
         * The default value for this property is **false**.
         */
        isReadOnly: boolean;
        /**
         * Gets or sets a value that determines whether values in this
         * column or row are required.
         *
         * The default value for this property is to **null**, which
         * means dates, booleans, and numeric values are required,
         * but non-masked string columns may contain empty strings.
         *
         * When set to true, values are required and empty strings are
         * not allowed.
         *
         * When set to false, null values and empty strings are allowed.
         */
        isRequired: boolean | null;
        /**
         * Gets or sets a value that indicates whether cells in this column or row
         * contain HTML content rather than plain text.
         *
         * This property only applies to regular cells. Row and column header cells
         * contain plain text by default. If you want to display HTML in column or
         * row headers, you must use the {@link FlexGrid.formatItem} event and set
         * the cell's innerHTML content in code.
         *
         * Unless the column's {@link isReadOnly} property is set to true, cells
         * that show HTML can be edited. By default, the editor will show HTML
         * markup and users will be able to change it. If the column has a
         * {@link dataMap}, however, the drop-down list will show formatted
         * items and the editor will show plain text instead of HTML markup.
         *
         * The default value for this property is **false**.
         */
        isContentHtml: boolean;
        /**
         * Gets or sets a value that indicates whether the content of cells in
         * this column or row should wrap to fit the available column width.
         *
         * The default value for this property is **false**.
         */
        wordWrap: boolean;
        /**
         * Gets or sets a value that indicates whether the content of cells in
         * this column or row should wrap at new line characters (\n).
         *
         * The default value for this property is **false**.
         */
        multiLine: boolean;
        /**
         * Gets or sets a CSS class name to use when rendering
         * data (non-header) cells in the column or row.
         *
         * The default value for this property is **null**.
         */
        cssClass: string | null;
        /**
         * Gets or sets a CSS class name to use when rendering
         * all cells (data and headers) in the column or row.
         *
         * The default value for this property is **null**.
         */
        cssClassAll: string | null;
        /**
         * Gets the {@link FlexGrid} that owns this column or row.
         */
        readonly grid: FlexGrid;
        /**
         * Gets the {@link ICollectionView} bound to this column or row.
         */
        readonly collectionView: wijmo.collections.ICollectionView;
        /**
         * Marks the owner list as dirty and refreshes the owner grid.
         */
        onPropertyChanged(): void;
        /**
         * Occurs when the value of the {@link grid} property changes.
         */
        readonly gridChanged: Event<RowCol, EventArgs>;
        /**
         * Raises the {@link gridChanged} event.
         */
        onGridChanged(e?: wijmo.EventArgs): void;
        _setList(list: RowColCollection): void;
        _getFlag(flag: RowColFlags): boolean;
        _setFlag(flag: RowColFlags, value: boolean, quiet?: boolean): boolean;
    }
    /**
     * Represents a function that takes an {@link ICellTemplateContext}
     * object and returns an HTML string to be used as content for a
     * cell.
     *
     * Alternatively, the function may modify the content of the cell element
     * directly and return null to indicate the cell element should not be
     * modified.
     *
     * @param: ctx {@link ICellTemplateContext} object that contains information about the cell.
     * @param: cell **HTMLElement** that represents the cell.
     * @returns A template string built using the context, or null to indicate the function
     * updated the cell element and it should not be modified by the grid.
     */
    type ICellTemplateFunction = 
    /**
     * @param: ctx {@link ICellTemplateContext} object that contains information about the cell.
     * @param: cell **HTMLElement** that represents the cell.
     * @returns A template string built using the context, or null to indicate the function
     * updated the cell element and it should not be modified by the grid.
     */
    (ctx: ICellTemplateContext, cell?: HTMLElement) => string | null;
    /**
     * Represents a context used for generating HTML strings to
     * be used as content for a cell.
     */
    interface ICellTemplateContext {
        /** {@link Row} that contains the cell. */
        row: Row;
        /** {@link Column} that contains the cell. */
        col: Column;
        /** Data item bound to the cell. */
        item: any;
        /** Raw value of the property bound to the cell. */
        value: any;
        /** Formatted/mapped value of the property bound to the cell. */
        text: string;
    }
    /**
     * Represents a column on the grid.
     */
    class Column extends RowCol {
        private static _ctr;
        private _hdr;
        private _name;
        private _agg;
        private _quickSize;
        private _descById;
        _edt: _CustomEditor;
        _tpl: string | ICellTemplateFunction;
        _szStar: string;
        _hash: string;
        /**
         * Initializes a new instance of the {@link Column} class.
         *
         * @param options Initialization options for the column.
         */
        constructor(options?: any);
        /**
         * Gets or sets the name of the column.
         *
         * The column name can be used to retrieve the column using the
         * {@link FlexGrid.getColumn} method.
         *
         * This property is especially useful when dealing with unbound
         * columns or multiple columns with the same {@link binding}
         * value.
         *
         * The default value for this property is **null**.
         */
        name: string | null;
        /**
         * Gets or sets the width of the column.
         *
         * Column widths may be positive numbers (sets the column width in pixels),
         * null or negative numbers (uses the collection's default column width), or
         * strings in the format '{number}*' (star sizing).
         *
         * The star-sizing option performs a XAML-style dynamic sizing where column
         * widths are proportional to the number before the star. For example, if
         * a grid has three columns with widths "100", "*", and "3*", the first column
         * will be 100 pixels wide, the second will take up 1/4th of the remaining
         * space, and the last will take up the remaining 3/4ths of the remaining space.
         *
         * Star-sizing allows you to define columns that automatically stretch to fill
         * the width available. For example, set the width of the last column to "*"
         * and it will automatically extend to fill the entire grid width so there's
         * no empty space. You may also want to set the column's {@link minWidth}
         * property to prevent the column from getting too narrow.
         *
         * You can use the {@link renderWidth} property to retrieve the actual width
         * of the column, taking into account visibility, star sizing, min/max limits,
         * and default width settings.
         *
         * The default value for this property is **null**, which causes the grid to
         * use the default column width defined by the grid's {@link FlexGrid.columns}
         * collection.
         */
        width: any | null;
        /**
         * Gets or sets the minimum width of the column.
         *
         * The default value for this property is **null**, which means
         * there is no lower limit to the column width.
         */
        minWidth: number | null;
        /**
         * Gets or sets the maximum width (in pixels) of the column.
         *
         * The default value for this property is **null**, which means
         * there is no upper limit to the column width.
         */
        maxWidth: number | null;
        /**
         * Gets or sets a value that determines whether the grid should optimize
         * performance over precision when auto-sizing this column.
         *
         * Setting this property to false disables quick auto-sizing for this column.
         *
         * Setting it to true enables the feature, subject to the value of the grid's
         * {@link wijmo.grid.FlexGrid.quickAutoSize} property.
         *
         * The default value for this property is **null**, which enables the feature
         * for columns that display plain text and don't have templates.
         */
        quickAutoSize: boolean | null;
        _getQuickAutoSize(): boolean;
        /**
         * Gets the render width of the column.
         *
         * The value returned takes into account the column's visibility, default size, and min and max sizes.
         */
        readonly renderWidth: number;
        /**
         * Gets or sets the text displayed in the column header.
         *
         * The default value for this property is **null**, which causes
         * the grid to use the {@link binding} string as a header.
         */
        header: string | null;
        /**
         * Gets or sets an {@link ICellTemplateFunction} or a template string
         * to be used for generating the HTML content of data cells in this
         * {@link Column}.
         *
         * Cell template strings use template literal syntax. The content string
         * is generated using a scope of type {@link ICellTemplateContext}.
         *
         * {@link ICellTemplateFunction} functions take an argument of type
         * {@link ICellTemplateContext} and return the HTML content to be
         * displayed in the cell.
         *
         * For example:
         *
         * ``` typescript
         * // simple/default rendering with a cellTemplate string
         * col.cellTemplate = '${value}:${col.format}';
         *
         * // simple/default rendering with a cellTemplate function
         * col.cellTemplate = (ctx: ICellTemplateContext) => glbz`${ctx.value}:${ctx.col.format}`;
         *
         * // conditional formatting with cellTemplate string
         * col.cellTemplate = '<span class=${value > 40000 ? "big-val" : "small-val"}>${text}</span>';
         *
         * // conditional formatting with a cellTemplate function
         * col.cellTemplate = (ctx: ICellTemplateContext) => `
         *     <span class="${ctx.value > 4000 ? 'big-val' : 'small-val'}">${ctx.text}</span>
         * `;
         * ```
         * Notice that string-based cell templates are regular strings, not actual JavaScript
         * template literals. Therefore, they are defined using regular quotes (single or
         * double) as oppsed to the back-quotes used by JavaScript template strings.
         *
         * **Function-based cell templates** are usually a better choice than string-based
         * templates because:
         *
         * 1) They provide design-time error checking and command completion,
         * 2) They run faster, and
         * 3) They do not have any issues with content-security policy (CSP).
         *
         * **String-based cell templates** also have advantages that may be important in
         * some scenarios:
         *
         * 1) They are slightly more concise, and
         * 2) They can be stored as data and easily changed at run-time.
         *
         * The {@link cellTemplate} property provides a simpler alternative to the
         * {@link formatItem} event or the cell templates available in the Wijmo interop
         * modules.
         *
         * When using cell templates, you should still set the column's {@link binding} and
         * {@link format} properties.
         * They will be used in edit mode and to support copy/paste/export operations.
         *
         * Cell templates are used only to render cell data, and have no effect on editing.
         * If you want to customize the cell editors, use the {@link editor} property.
         *
         * Cell templates can also be used to render row header cells. The most common
         * scenario for this would be to add numbers to the row header cells.
         * The example below shows how you can do this:
         * ```typescript
         * // get row header column
         * let col = theGrid.rowHeaders.columns[0];
         *
         * // assign template that adds the row index to the header
         * // (but preserves glyphs such as edit and new row template)
         * col.cellTemplate = ctx => ctx.text || (ctx.row.index + 1).toString();
         * ```
         *
         * The default value for this property is **null**, which means the column has no
         * template.
         */
        cellTemplate: string | ICellTemplateFunction | null;
        /**
         * Gets or sets a reference to an input control to be used as a
         * custom cell editor for this {@link Column}.
         *
         * The input control is typically one of the Wijmo input controls.
         * It should be compatible with the column's data type.
         *
         * For example, this code replaces the built-in editor for all
         * date columns on a grid with a single **InputDate** control:
         *
         * ```typescript
         * import { InputDate } from '@grapecity/wijmo.input';
         * let inputDate = new InputDate(document.createElement('div'));
         * theGrid.columns.forEach(col => {
         *     if (col.DataType == DateType.Date) {
         *         col.editor = inputDate;
         *     }
         * })
         * ```
         * And this code replaces the built-in editor for all data-mapped
         * columns on a grid with **AutoComplete** controls:
         *
         * ```typescript
         * import { AutoComplete } from '@grapecity/wijmo.input';
         * theGrid.columns.forEach(col => {
         *     let map = col.dataMap;
         *     if (map) {
         *         col.editor = new AutoComplete(document.createElement('div'), {
         *             itemsSource: map.collectionView,
         *             displayMemberPath: map.displayMemberPath,
         *             selectedValuePath: map.selectedValuePath
         *         });
         *     }
         * });
         * ```
         * Notice how the example above uses the column's {@link dataMap} property
         * to initialize the **AutoComplete**.
         *
         * In many cases you may also want to use column properties such as
         * {@link format} and {@link isRequired} to initialize the custom editors.
         * This is important since the custom editors do not inherit **any**
         * properties from the column being edited.
         *
         * The example below shows how you can use the {@link editor} property
         * to edit grid items with various Wijmo input controls:
         *
         * {@sample Grid/Editing/CustomEditors Example}
         *
         * The default value for this property is **null**, which causes the grid
         * to use the grid's own built-in editors.
         */
        editor: wijmo.Control | null;
        /**
         * Gets or sets a value that indicates whether the user can sort the column by clicking its header.
         *
         * The default value for this property is **true**.
         */
        allowSorting: boolean;
        /**
         * Gets a string that describes the current sorting applied to the column.
         * Possible values are '+' for ascending order, '-' for descending order, or
         * null for unsorted columns.
         */
        readonly currentSort: string;
        /**
         * Gets the index of this column in the sort descriptions array for the
         * grid's collection view.
         */
        readonly currentSortIndex: number;
        /**
         * Gets or sets the {@link Aggregate} to display in the group header rows
         * for the column.
         *
         * The default value for this property is **Aggregate.None**, which causes
         * the grid to show no aggregate values for this column.
         */
        aggregate: wijmo.Aggregate;
        /**
         * Gets or sets the ID of an element that contains a description
         * of the column.
         *
         * The ID is used as the value of the **aria-describedby**
         * attribute for the column header element.
         *
         * THe default value for this property is **null**.
         */
        describedById: string | null;
        /**
         * Gets a value that determines whether values in the column/row are required.
         *
         * Returns the value of the {@link isRequired} property if it is not null, or
         * determines the required status based on the column's {@link dataType}.
         *
         * By default, string columns are not required unless they have an associated
         * {@link dataMap} or {@link mask}; all other data types are required.
         *
         * @param row Row that contains the cell being checked.
         * @return True if the value is required, false otherwise.
         */
        getIsRequired(row?: Row): boolean;
        /**
         * Gets the actual alignment if items in the column or row.
         *
         * Returns the value of the {@link align} property if it is not null, or
         * selects the alignment based on the column's {@link dataType}.
         *
         * @param row Row that contains the cell being checked.
         * @return A string representing the cell alignment.
         */
        getAlignment(row?: Row): string;
        _getBindingSort(): string;
        static _parseStarSize(value: any): number;
    }
    /**
     * Represents a row in the grid.
     */
    class Row extends RowCol {
        private _data;
        _ubv: any;
        /**
         * Initializes a new instance of the {@link Row} class.
         *
         * @param dataItem The data item that this row is bound to.
         */
        constructor(dataItem?: any);
        /**
         * Gets or sets the item in the data collection that the item is bound to.
         *
         * The grid sets this property automatically when binding to data sources
         * defined by the {@link FlexGrid.itemsSource} property.
         *
         * The {@link dataItem} property of group header rows is automatically set
         * to a {@link wijmo.CollectionViewGroup} object that contains information
         * about the group.
         */
        dataItem: any;
        /**
         * Gets the index of this row's data item within the current data view.
         *
         * This may be different from the row's {@link index} property if there
         * are group rows (which do not correspond to any data items) or in
         * classes that bind multiple rows to individual data items.
         */
        readonly dataIndex: number;
        /**
         * Gets or sets the height of the row.
         *
         * You can use the {@link renderHeight} property to retrieve the actual height
         * of the row, taking into account visibility, min/max limits, and default
         * height settings.
         *
         * The default value for this property is **null**, which causes the
         * grid to use the default row height defined by the {@link FlexGrid.rows}
         * collection.
         */
        height: number | null;
        /**
         * Gets the render height of the row.
         *
         * The value returned takes into account the row's visibility, default size,
         * and min and max sizes.
         */
        readonly renderHeight: number;
    }
    /**
     * Represents a row that serves as a header for a group of rows.
     */
    class GroupRow extends Row {
        _level: number;
        /**
         * Initializes a new instance of the {@link GroupRow} class.
         */
        constructor(dataItem?: any);
        /**
         * Gets or sets the hierarchical level of the group associated with this {@link GroupRow}.
         */
        level: number;
        /**
         * Gets a value that indicates whether this {@link GroupRow} has child rows.
         */
        readonly hasChildren: boolean;
        /**
         * Gets or sets a value that indicates whether this {@link GroupRow} is
         * collapsed (child rows are hidden) or expanded (child rows are visible).
         */
        isCollapsed: boolean;
        /**
         * Gets the header text for this {@link GroupRow}.
         */
        getGroupHeader(): string;
        _setCollapsed(collapsed: boolean): void;
        /**
         * Gets a {@link CellRange} object that contains all of the rows in the group represented
         * by this {@link GroupRow} and all of the columns in the grid.
         */
        getCellRange(): CellRange;
    }
    /**
     * Abstract class that serves as a base for row and column collections.
     */
    class RowColCollection<T extends RowCol = RowCol> extends wijmo.collections.ObservableArray<T> {
        _g: FlexGrid;
        _frozen: number;
        _lastFrozen: number;
        _firstVisible: number;
        _vlen: number;
        _szDef: number;
        _szTot: number;
        _szCustom: boolean;
        _dirty: boolean;
        _szMin: number;
        _szMax: number;
        /**
         * Initializes a new instance of the {@link RowColCollection} class.
         *
         * @param g The {@link FlexGrid} that owns the collection.
         * @param defaultSize The default size of the elements in the collection.
         */
        constructor(g: FlexGrid, defaultSize: number);
        /**
         * Gets the {@link FlexGrid} that owns this collection.
         */
        readonly grid: FlexGrid;
        /**
         * Gets or sets the default size of elements in the collection.
         */
        defaultSize: number;
        /**
         * Gets or sets the number of frozen rows or columns in the collection.
         *
         * Frozen rows and columns do not scroll, and instead remain at the top or left of
         * the grid, next to the fixed cells. Unlike fixed cells, however, frozen
         * cells may be selected and edited like regular cells.
         */
        frozen: number;
        /**
         * Checks whether a column or row is frozen.
         *
         * @param index The index of the column or row to check.
         */
        isFrozen(index: number): boolean;
        /**
         * Gets or sets the minimum size of elements in the collection.
         */
        minSize: number;
        /**
         * Gets or sets the maximum size of elements in the collection.
         */
        maxSize: number;
        /**
         * Gets the total size of the elements in the collection.
         */
        getTotalSize(): number;
        /**
         * Gets the number of visible elements in the collection ({@link Row.isVisible}).
         */
        readonly visibleLength: number;
        /**
         * Gets the index of the element at a given physical position.
         * @param position Position of the item in the collection, in pixels.
         */
        getItemAt(position: number): number;
        /**
         * Finds the next visible cell for a selection change.
         * @param index Starting index for the search.
         * @param move Type of move (size and direction).
         * @param pageSize Size of a page (in case the move is a page up/down).
         */
        getNextCell(index: number, move: SelMove, pageSize?: number): any;
        /**
         * Checks whether an element can be moved from one position to another.
         *
         * @param src The index of the element to move.
         * @param dst The position to which to move the element, or specify -1 to append the element.
         * @param adjustFrozenCount Whether to adjust the frozen element count when
         * the movement is into or out of the frozen area.
         * @return Returns true if the move is valid, false otherwise.
         */
        canMoveElement(src: number, dst: number, adjustFrozenCount?: boolean): boolean;
        /**
         * Moves an element from one position to another.
         * @param src Index of the element to move.
         * @param dst Position where the element should be moved to (-1 to append).
         * @param adjustFrozenCount Whether to adjust the frozen element count when
         * the movement is into or out of the frozen area.
         * @return Returns true if the element was moved, false otherwise.
         */
        moveElement(src: number, dst: number, adjustFrozenCount?: boolean): boolean;
        /**
         * Keeps track of dirty state and invalidate grid on changes.
         */
        onCollectionChanged(e?: collections.NotifyCollectionChangedEventArgs<any>): void;
        /**
         * Appends an item to the array.
         *
         * @param item Item to add to the array.
         * @return The new length of the array.
         */
        push(item: T): number;
        /**
         * Removes or adds items to the array.
         *
         * @param index Position where items are to be added or removed.
         * @param count Number of items to remove from the array.
         * @param ...item One or mode items to add to the array.
         * @return An array containing the removed elements.
         */
        splice(index: number, count: number, ...item: T[]): T[];
        /**
         * Suspends notifications until the next call to {@link endUpdate}.
         */
        beginUpdate(): void;
        _setDefaultSize(value: number): void;
        _update(): boolean;
    }
    /**
     * Represents a collection of {@link Column} objects in a {@link FlexGrid} control.
     */
    class ColumnCollection extends RowColCollection<Column> {
        _descById: string;
        /**
         * Gets a column by name, binding, or index.
         *
         * The method searches the column by name. If a column with the given name
         * is not found, it searches by binding. The searches are case-sensitive.
         *
         * @param name The name, binding, or index to find.
         * @return The column with the specified name or binding, or null if not found.
         */
        getColumn(name: string | number): Column;
        /**
         * Gets the index of a column by name or binding.
         *
         * The method searches the column by name. If a column with the given name
         * is not found, it searches by binding. The searches are case-sensitive.
         *
         * @param name The name or binding to find.
         * @return The index of column with the specified name or binding, or -1 if not found.
         */
        indexOf(name: any): number;
        /**
         * Gets or sets the ID of an element that contains a description
         * of the column headers.
         *
         * The ID is used as the value of the **aria-describedby**
         * attribute for all column header elements. For column-specific
         * descriptions, use the column's {@link Column.describedById} instead.
         */
        describedById: string;
        /**
         * Gets the index of the first visible column (where the outline tree is displayed).
         */
        readonly firstVisibleIndex: number;
        _updateStarSizes(szAvailable: number): boolean;
    }
    /**
     * Represents a collection of {@link Row} objects in a {@link FlexGrid} control.
     */
    class RowCollection extends RowColCollection<Row> {
        _maxLevel: number;
        _ariaLabel: string;
        /**
         * Gets or sets a string used as an ARIA label for all rows in this
         * collection.
         *
         * For example, the code below adds ARIA labels to the header and
         * data rows:
         *
         * <pre>
         * grid.rows.ariaLabel = 'data row';
         * grid.columnHeaders.rows.ariaLabel = 'header row';
         * </pre>
         */
        ariaLabel: string;
        /**
         * Gets the maximum group level in the grid.
         *
         * @return The maximum group level or -1 if the grid has no group rows.
         */
        readonly maxGroupLevel: number;
        _update(): boolean;
    }
}
declare module wijmo.grid {
    /**
     * Provides additional to {@link Column} class properties exposed in {@link ColumnGroup} class.
     */
    type _ColumnGroupProperties = {
        _rng: CellRange;
        level: number;
        collapseTo: string;
        isCollapsed: boolean;
        isEmpty: boolean;
    };
    /**
     * Intended for handling column groups changes.
     */
    interface _IColumnGroupChangeHandler {
        handleCollectionChange(): void;
        handlePropertyChange(grp: ColumnGroup): void;
    }
    /**
     * Handles the grid's collection of column groups.
     */
    interface _IColumnGroupHandler {
        columnGroups: ColumnGroupCollection;
        createColumnGroups(arr: any[]): void;
        hasColumnGroups(): boolean;
        getGroupDefinitions(): any[];
        getColumnGroup(r: number, c: number): Column & _ColumnGroupProperties;
        canMoveColumnGroup(srcRow: number, srcCol: number, dstRow: number, dstCol: number): boolean;
        moveColumnGroup(srcRow: number, srcCol: number, dstRow: number, dstCol: number, child: boolean): boolean;
    }
    /**
     * Handles the grid's collection of column groups.
     */
    class _ColumnGroupHandler implements _IColumnGroupHandler, _IColumnGroupChangeHandler {
        private _grid;
        private _colGroups;
        private _groupDefs;
        private _updatingCollection;
        private _initialized;
        /**
         * Initializes a new instance of the {@link _ColumnGroupHandler} class.
         *
         * @param g {@link FlexGrid} that owns this {@link _ColumnGroupHandler}.
         */
        constructor(grid: FlexGrid);
        /**
         * Gets the collection of column groups.
         */
        readonly columnGroups: ColumnGroupCollection;
        /**
         * Initializes the column groups based on an array of
         * column definition objects.
         *
         * @param arr Array of column definition objects that defines the groups.
         */
        createColumnGroups(arr: any[]): void;
        /**
         * Gets a value that determines whether the grid has any
         * column groups.
         */
        hasColumnGroups(): boolean;
        /**
         * Gets the original array used to define the column groups.
         */
        getGroupDefinitions(): any[];
        /**
         * Gets the column group that contains a given row and column.
         *
         * @param r Index of the row containted in the the group.
         * @param c Index of the column containted in the group.
         */
        getColumnGroup(r: number, c: number): Column & _ColumnGroupProperties;
        /**
         * Checks whether the column group can be moved from one position to another.
         *
         * @param srcRow The row index of the column group to move.
         * @param srcCol The column index of the column group to move.
         * @param dstRow The row position to which to move the column group.
         * @param dstCol The column position to which to move the column group.
         * @returns Returns true if the move is valid, false otherwise.
         */
        canMoveColumnGroup(srcRow: number, srcCol: number, dstRow: number, dstCol: number): boolean;
        /**
         * Moves the column group from one position to another.
         *
         * Note: it is allowed to move the column group to child groups (child == true)
         * only if the parent group is empty. Otherwise returns false.
         *
         * @param srcRow The row index of the column group to move.
         * @param srcCol The column index of the column group to move.
         * @param dstRow The row position to which to move the column group.
         * @param dstCol The column position to which to move the column group.
         * @param child Whether to move the column group to child groups or to sibling groups.
         * @returns Returns true if the element was moved, false otherwise.
         */
        moveColumnGroup(srcRow: number, srcCol: number, dstRow: number, dstCol: number, child: boolean): boolean;
        /**
         * Handles column groups collection changes: adding and removing items.
         */
        handleCollectionChange(): void;
        /**
         * Handles column group property changes.
         *
         * @param grp Column group affected
         */
        handlePropertyChange(grp: ColumnGroup): void;
        private _initializeColumnGroups;
        private _createColumnGroups;
        private _buildColumnGroups;
        private _getColumnGroup;
        private _getCollection;
        private _assertColumnGroups;
        private _addColumnGroup;
        private _beginCollectionUpdate;
        private _endCollectionUpdate;
        private _deferCollectionUpdate;
    }
    /**
     * Extends the {@link Column} class to provide column groups.
     *
     * This class adds a {@link columns} property so any group column
     * may have any number of child columns.
     *
     * It also adds {@link isCollapsed} and {@link collapseTo}
     * properties that control the expand/collapse behavior of the
     * group.
     *
     * Since it extends the {@link Column} class, you can create
     * and use {@link ColumnGroup} columns as you normal columns.
     *
     * For example, the code below creates a grid with two collapsible
     * column groups, each with a few child columns:
     *
     * ```typescript
     * let theGrid = new FlexGrid('#theGrid', {
     *     selectionMode: 'MultiRange',
     *     autoGenerateColumns: false,
     *     columns: [
     *         { header: 'Transaction', collapseTo: 'id', align: 'left', columns: [
     *              { binding: 'id', header: 'ID' },
     *              { binding: 'date', header: 'Date' },
     *              { binding: 'time', header: 'Time', format: 'HH:mm:ss' }
     *         ]},
     *         { header: 'Details', collapseTo: 'sales', align: 'left', columns: [
     *              { binding: 'country', header: 'Country' },
     *              { binding: 'sales', header: 'Sales' },
     *              { binding: 'expenses', header: 'Expenses' }
     *         ]}
     *     ],
     *     itemsSource: getData()
     * });
     * ```
     */
    class ColumnGroup extends Column {
        private _ownerList;
        private _changeHdl;
        _rng: CellRange;
        _curr_header: string | null;
        protected _cols: ColumnGroupCollection;
        protected _lvl: number;
        protected _collTo: string;
        protected _collapsed: boolean;
        /**
         * Initializes a new instance of the {@link ColumnGroup} class.
         *
         * @param options JavaScript object containing initialization data for the instance.
         * @param parent Parent group, or null for top-level groups.
         */
        constructor(options?: any, parent?: ColumnGroup | null);
        _copy(key: string, value: any): boolean;
        /**
         * Gets or sets the collection of child {@link ColumnGroup} columns.
         */
        readonly columns: ColumnGroupCollection;
        readonly columnGroups: ColumnGroupCollection;
        /**
         * Gets the value that indicates whether the group contains child columns or not.
         */
        readonly isEmpty: boolean;
        /**
         * Gets this {@link ColumnGroup}'s parent column group.
         *
         * You can use this property to restrict column dragging
         * so users can only drag within groups. For example:
         *
         * ```typescript
         * let theDragColumn: ColumnGroup;
         * new FlexGrid(host, {
         *     columnGroups: [
         *         { binding: 'id', allowDragging: true },
         *         { binding: 'name', allowDragging: true },
         *         ...
         *     ],
         *     allowDragging: AllowDragging.Columns,
         *     draggingColumn: (s, e) => { // keep track of group being dragged
         *         theDragColumn = e.getColumn(true) as ColumnGroup;
         *     },
         *     draggingColumnOver: (s, e) => { // allow dropping only within groups
         *         let col = e.getColumn(true) as ColumnGroup;
         *         e.cancel = col.parentGroup != theDragColumn.parentGroup;
         *     },
         *     itemsSource: getData(),
         * });
         * ```
         */
        readonly parentGroup: ColumnGroup;
        /**
         * Gets this {@link ColumnGroup}'s level (the number of parent groups it has).
         *
         * Top level groups have level zero. Their children have level 1, and so on.
         */
        readonly level: number;
        /**
         * Gets or sets the binding of the column that should remain
         * visible when this {@link ColumnGroup} is collapsed.
         */
        collapseTo: string;
        /**
         * Gets or sets a value that determines whether this {@link ColumnGroup}
         * is collapsed.
         */
        isCollapsed: boolean;
        /**
         * Overridden to return the parent grid.
         *
         * This is needed since not all {@link ColumnGroup} columns are added
         * to the grid's columns collection.
         */
        readonly grid: FlexGrid;
        _beginBuild(): void;
        _setChangeHandler(handler: _IColumnGroupChangeHandler): void;
        _removeChangeHandler(): void;
        _setOwnerList(ownerList: ColumnGroupCollection): void;
        _checkIfCollapsed(): void;
        _updateCollapsedState(): void;
        _getMaxLevel(): number;
        _expandRange(maxLevel: number): void;
        _shiftRange(delta: number): void;
        _containsGroup(grp: ColumnGroup): boolean;
        _isCollapseTo(grp: ColumnGroup): boolean;
        onPropertyChanged(): void;
    }
    /**
     * Extends the {@link ObservableArray} class to track column group changes.
     */
    class ColumnGroupCollection extends wijmo.collections.ObservableArray<ColumnGroup> {
        private _owner;
        private _changeHdl;
        /**
         * Gets a column group by name, binding, or index.
         *
         * If name parameter is of number type, the method returns
         * the child column group by index.
         * If name parameter is of string type, the method searches the column group by name.
         * If a column with the given name is not found, it searches by binding.
         * The searches are case-sensitive.
         *
         * @param name The name, binding, or index to find.
         * @return The column group with the specified name, binding or index, or null if not found.
         */
        getColumn(name: string | number): ColumnGroup;
        /**
         * Gets the {@link FlexGrid} or {@link ColumnGroup} that owns this collection.
         */
        readonly owner: FlexGrid | ColumnGroup | null;
        /**
         * Appends an item to the array.
         *
         * @param item Item to add to the array.
         * @return The new length of the array.
         */
        push(item: ColumnGroup): number;
        /**
         * Removes or adds items to the array.
         *
         * @param index Position where items are to be added or removed.
         * @param count Number of items to remove from the array.
         * @param ...item One or mode items to add to the array.
         * @return An array containing the removed elements.
         */
        splice(index: number, count: number, ...item: ColumnGroup[]): ColumnGroup[];
        static _parse(arr: any[]): ColumnGroupCollection;
        _setChangeHandler(handler: _IColumnGroupChangeHandler): void;
        _removeChangeHandler(): void;
        _setOwner(owner: FlexGrid | ColumnGroup | null): void;
        _getColByIdx(index: number): ColumnGroup;
        _findColByProp(property: string, value: string): ColumnGroup;
        onCollectionChanged(e?: collections.NotifyCollectionChangedEventArgs<any>): void;
    }
}
declare module wijmo.grid {
    /**
     * Specifies constants that define the grid's sorting capabilities.
     */
    enum AllowSorting {
        /**
         * Users cannot sort the grid by clicking the column headers.
         */
        None = 0,
        /**
         * Users may sort the grid by a single column at a time.
         *
         * Clicking the column header sorts the column or flips the sort direction.
         *
         * Ctrl+Clicking removes the sort.
         */
        SingleColumn = 1,
        /**
         * Users may sort the grid by multiple columns at a time.
         *
         * Clicking the column header sorts the column or flips the sort direction.
         *
         * Ctrl+Clicking removes the sort for the clicked column.
         *
         * Ctrl+Shift+Clicking removes all sorts.
         */
        MultiColumn = 2
    }
    /**
     * Specifies constants that define the grid's column pinning capabilities.
     */
    enum AllowPinning {
        /** Users cannot pin columns. */
        None = 0,
        /** Users can pin and unpin one column at a time (possibly moving them in the process). */
        SingleColumn = 1,
        /** Users can pin and unpin column ranges (columns do not move when being pinned or unpinned). */
        ColumnRange = 2,
        /** Users can pin and unpin single columns or column ranges (using the shift key). */
        Both = 3
    }
    /**
     * Specifies constants that define the visibility of row and column headers.
     */
    enum HeadersVisibility {
        /** No header cells are displayed. */
        None = 0,
        /** Only column header cells are displayed. */
        Column = 1,
        /** Only row header cells are displayed. */
        Row = 2,
        /** Both column and row header cells are displayed. */
        All = 3
    }
    /**
     * Specifies options to be used with the {@link getClipString} method.
     */
    enum ClipStringOptions {
        /** Use default options (tabs as cell separators, formatted/visible/unquoted cells). */
        Default = 0,
        /** Use commas as cell separators (CSV format). */
        CSV = 1,
        /** Quote all cells. */
        QuoteAll = 2,
        /** Skip cells that have been merged over (like Excel). */
        SkipMerged = 4,
        /** Export unformatted values. */
        Unformatted = 8,
        /** Include invisible rows. */
        InvisibleRows = 16,
        /** Include invisible columns. */
        InvisibleColumns = 32,
        /** Include invisible rows and columns. */
        InvisibleCells = 48
    }
    /**
     * Represents a method that can be used to customize the
     * representation of grid cell elements.
     */
    interface IItemFormatter {
        /**
         * @param panel {@link GridPanel} that contains the cell.
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         * @param cell HTMLElement that represents the cell.
         */
        (panel: GridPanel, row: number, col: number, cell: HTMLElement): void;
    }
    /**
     * Represents a method returns error strings associated with grid cells.
     */
    interface IItemValidator {
        /**
         * @param row Row index of the cell being tested.
         * @param col Column index of the cell being tested.
         * @param parsing Whether the value is being edited and could not be parsed into the right data type.
         * @returns A string describing the error, or null to indicate the cell contains no errors.
         */
        (row: number, col: number, parsing?: boolean): string | null;
    }
    /**
     * The {@link FlexGrid} control provides a powerful and flexible way to
     * display and edit data in a tabular format.
     *
     * The {@link FlexGrid} control is a full-featured grid, providing all the
     * features you are used to including several selection modes, sorting,
     * column reordering, grouping, filtering, editing, custom cells,
     * XAML-style star-sizing columns, row and column virtualization, etc.
     *
     * The {@link FlexGrid} control supports the following keyboard commands:
     *
     * <table>
     *   <thead>
     *     <tr><th>Key Combination</th><th>Action</th></tr>
     *   </thead>
     *   <tbody>
     *     <tr><td>Shift + Space</td><td>Select row</td></tr>
     *     <tr><td>Control + Space</td><td>Select column</td></tr>
     *     <tr><td>F2</td><td>Start editing the current cell</td></tr>
     *     <tr><td>F4</td><td>Open or close the current cell's editor (if available)</td></tr>
     *     <tr><td>Space</td><td>Start editing or toggle checkbox</td></tr>
     *     <tr><td>Control + A</td><td>Select the entire grid contents</td></tr>
     *     <tr><td>Left/Right</td><td>Select the cell to the left/right of the selection, collapse/expand group rows</td></tr>
     *     <tr><td>Shift + Left/Right</td><td>Extend the selection to include the next cell to the left/right of the selection</td></tr>
     *     <tr><td>Up/Down</td><td>Select the next cell above or below the selection</td></tr>
     *     <tr><td>Shift + Up/Down</td><td>Extend the selection to include the cell above or below the selection</td></tr>
     *     <tr><td>Alt + Up/Down</td><td>Open or close the current cell's editor (if available)</td></tr>
     *     <tr><td>PageUp/Down</td><td>Select the cell one page above or below the selection</td></tr>
     *     <tr><td>Shift + PageUp/Down</td><td>Extend the selection to include the cell one page above or below the selection</td></tr>
     *     <tr><td>Alt + PageUp/Down</td><td>Move the selection to the first or last row</td></tr>
     *     <tr><td>Shift + Alt + PageUp/Down</td><td>Extend the selection to include the first or last row</td></tr>
     *     <tr><td>Home/End</td><td>Move the selection to the first or last column</td></tr>
     *     <tr><td>Shift + Home/End</td><td>Extend the selection to include the first or last column</td></tr>
     *     <tr><td>Ctrl + Home/End</td><td>Move the selection to the first/last row and column</td></tr>
     *     <tr><td>Shift + Ctrl + Home/End</td><td>Extend the selection to include the first/last row and column</td></tr>
     *     <tr><td>Escape</td><td>Cancel current cell or row editing operation</td></tr>
     *     <tr><td>Tab</td><td>Move the selection to the next focusable element on the page (by default, can be overridden using the {@link keyActionTab} property)</td></tr>
     *     <tr><td>Enter</td><td>Exit editing mode and move the selection to the cell below the current one (by default, can be overridden using the {@link keyActionEnter} property)</td></tr>
     *     <tr><td>Delete, Backspace</td><td>Delete the currently selected rows (if the {@link allowDelete} property is set to true), or clear the content of the selected cells (if the values are not required).</td></tr>
     *     <tr><td>Control + C or Control + Insert</td><td>Copy the selection to the clipboard (if the {@link autoClipboard} property is set to true)</td></tr>
     *     <tr><td>Control + V or Shift + Insert</td><td>Paste the content of the clipboard into the selected area (if the {@link autoClipboard} property is set to true)</td></tr>
     *   </tbody>
     * </table>
     *
     * {@sample Grid/Overview/purejs Example}
     */
    class FlexGrid extends wijmo.Control {
        static _WJS_STICKY: string;
        static _WJS_MEASURE: string;
        static _WJS_UPDATING: string;
        static _WJS_WSPRE: string;
        static _MIN_VIRT_ROWS: number;
        static _defTypeWidth: {
            [wijmo.DataType.Number]: string;
        };
        _root: HTMLDivElement;
        _eTL: HTMLDivElement;
        _eTLCt: HTMLDivElement;
        _eCHdr: HTMLDivElement;
        _eCHdrCt: HTMLDivElement;
        _eRHdr: HTMLDivElement;
        _eRHdrCt: HTMLDivElement;
        _eCt: HTMLDivElement;
        _eBL: HTMLDivElement;
        _eBLCt: HTMLDivElement;
        _eCFtr: HTMLDivElement;
        _eCFtrCt: HTMLDivElement;
        _fCt: HTMLDivElement;
        _eFocus: HTMLDivElement;
        _eSz: HTMLDivElement;
        _eMarquee: HTMLDivElement;
        _activeCell: HTMLElement;
        private _gpTL;
        private _gpCHdr;
        private _gpRHdr;
        private _gpCells;
        private _gpBL;
        private _gpCFtr;
        private _maxOffsetY;
        private _heightBrowser;
        private _heightReal;
        _szClient: Size;
        _szClientSB: Size;
        _offsetY: number;
        _cssPage: number;
        _lastCount: number;
        _rcBounds: wijmo.Rect;
        _ptScrl: Point;
        _cellPadLeft: number;
        _cellPadHorz: number;
        _cellPadVert: number;
        _clipToScreen: boolean;
        _mouseHdl: _MouseHandler;
        _edtHdl: _EditHandler;
        _selHdl: _SelectionHandler;
        _addHdl: _AddNewHandler;
        _keyHdl: _KeyboardHandler;
        _grpHdl: _IColumnGroupHandler;
        _imeHdl: _ImeHandler;
        _mrgMgr: MergeManager;
        protected _autoGenCols: boolean;
        protected _autoClipboard: boolean;
        protected _xOnCopyPaste: boolean;
        protected _autoScroll: boolean;
        protected _autoSearch: boolean;
        protected _caseSensitive: boolean;
        protected _readOnly: boolean;
        protected _indent: number;
        protected _autoSizeMode: AutoSizeMode;
        protected _autoHeights: boolean;
        protected _quickSize: boolean;
        protected _hdrVis: HeadersVisibility;
        protected _alSorting: AllowSorting;
        protected _alPinning: AllowPinning;
        protected _alAddNew: boolean;
        protected _alDelete: boolean;
        protected _alResizing: AllowResizing;
        protected _alDragging: AllowDragging;
        protected _alMerging: AllowMerging;
        protected _ssHdr: HeadersVisibility;
        protected _shSort: boolean;
        protected _shGroups: boolean;
        protected _shMarquee: boolean;
        protected _shPlcHld: boolean;
        protected _altStep: number;
        protected _shErr: boolean;
        protected _hasValidation: boolean;
        protected _shDropDown: boolean;
        protected _tglDropDown: any;
        protected _valEdt: boolean;
        protected _gHdrFmt: string;
        protected _rows: RowCollection;
        protected _cols: ColumnCollection;
        protected _hdrRows: RowCollection;
        protected _ftrRows: RowCollection;
        protected _hdrCols: ColumnCollection;
        protected _cf: CellFactory;
        protected _itemFormatter: IItemFormatter;
        protected _items: any;
        protected _cv: wijmo.collections.ICollectionView;
        protected _childItemsPath: any;
        protected _rowHdrPath: wijmo.Binding;
        protected _sortRowIndex: number;
        protected _editColIndex: number;
        protected _deferResizing: boolean;
        protected _errorTip: wijmo.Tooltip;
        protected _pSel: boolean;
        protected _pOutline: boolean;
        protected _stickyHdr: boolean;
        protected _anchorCursor: boolean;
        protected _copyHeaders: HeadersVisibility;
        protected _bigChecks: boolean;
        private _bndSortConverter;
        private _afClip;
        private _afSticky;
        private _toErrorTips;
        private _toAutoHeights;
        private _forceScrollUpdate;
        private _scrollHandlerAttached;
        private _itemValidator;
        private _fzClone;
        private _vt;
        _vtRows: number;
        _vtCols: number;
        _lazyRender: boolean;
        _refreshOnEdit: boolean;
        _reorderCells: boolean;
        /**
         * Gets or sets the template used to instantiate {@link FlexGrid} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link FlexGrid} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        _handleResize(): void;
        _touchEdit: boolean;
        /**
         * Gets or sets a value that determines whether the row and column headers
         * are visible.
         *
         * The default value for this property is **HeadersVisibility.All**.
         */
        headersVisibility: HeadersVisibility;
        /**
         * Gets or sets a value that determines whether column headers should remain
         * visible when the user scrolls the document.
         *
         * The default value for this property is **false**.
         */
        stickyHeaders: boolean;
        /**
         * Gets or sets a value that determines whether the grid should preserve
         * the selected state of rows when the data is refreshed.
         *
         * The default value for this property is **true**.
         */
        preserveSelectedState: boolean;
        /**
         * Gets or sets a value that determines whether the grid should preserve
         * the expanded/collapsed state of nodes when the data is refreshed.
         *
         * The {@link preserveOutlineState} property implementation is based on
         * JavaScript's
         * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank">Map</a>
         * object, which is not available in IE 9 or 10.
         *
         * The default value for this property is **true**.
         */
        preserveOutlineState: boolean;
        /**
         * Gets or sets a value that determines whether extending selections
         * with the mouse or keyboard should change the start (cursor) or the
         * end of the current selection.
         *
         * The default value for this property is **false**, which causes
         * the grid to move the cursor and keep the selection end anchored.
         *
         * Setting this property to **true** causes the grid to move the
         * selection end and keep the cursor anchored. This is Excel's behavior.
        */
        anchorCursor: boolean;
        /**
         * Gets or sets a value that determines whether the grid should
         * include the content of header cells when copying data to the
         * clipboard.
         *
         * This property is especially useful in read-only grids, because
         * the header information typically should not be included when
         * pasting data into the grid.
         *
         * The default value for this property is **HeadersVisibility.None**
         * for the {@link FlexGrid} control and **HeadersVisibility.All**
         * for the **PivotGrid** control.
         */
        copyHeaders: HeadersVisibility;
        /**
         * Gets or sets a value that determines whether the grid should skip
         * rendering cells that were updated in the last render cycle.
         *
         * The default value for this property is **true**.
         */
        lazyRender: boolean;
        /**
         * Gets or sets a value that determines whether the grid should
         * refresh all cells after a cell is edited.
         *
         * The default value for this property is **true**.
         */
        refreshOnEdit: boolean;
        /**
         * Gets or sets the minimum number of rows and/or columns required to enable
         * virtualization.
         *
         * This property is set to zero by default, meaning virtualization is always
         * enabled. This improves binding performance and memory requirements, at the
         * expense of a small performance decrease while scrolling.
         *
         * If your grid has a small number of rows (about 50 to 100), you may be able to
         * improve scrolling performance by setting this property to a slightly higher
         * value (like 150). This will disable virtualization and will slow down binding,
         * but may improve perceived scroll performance. For example, the code below sets
         * causes the grid to virtualize cells when the data source has more than 150 items:
         *
         * ```typescript
         * // virtualize grid when there are more than 150 items
         * theGrid.virtualizationThreshold = 150;
         * ```
         *
         * Setting this property to values higher than 200 is not recommended. Loading
         * times will become too long; the grid will freeze for a few seconds while
         * creating cells for all rows, and the browser will become slow because of
         * the large number of elements on the page.
         *
         * If you want to set separate virtualization thresholds for rows and columns,
         * you may set the {@link virtualizationThreshold} property to an array with two
         * numbers. In this case, the first number will be used as the row threshold
         * and the second as the column threshold. For example, the code below sets
         * causes the grid to virtualize rows but not columns:
         *
         * ```typescript
         * // virtualize rows (threshold 0) but not columns (threshold 10,000)
         * theGrid.virtualizationThreshold = [0, 10000];
         * ```
         *
         * The default value for this property is **0**, which causes the grid to
         * virtualize all rows and columns.
         */
        virtualizationThreshold: number | number[];
        /**
         * Gets or sets a value that determines whether the grid should generate
         * columns automatically based on the {@link itemsSource}.
         *
         * The column generation depends on the {@link itemsSource} property containing
         * at least one item. This data item is inspected and a column is created and
         * bound to each property that contains a primitive value (number, string,
         * Boolean, or Date).
         *
         * Properties set to null do not generate columns, because the grid would
         * have no way of guessing the appropriate type. In this type of scenario,
         * you should set the {@link autoGenerateColumns} property to false and create
         * the columns explicitly. For example:
         *
         * ```typescript
         * import { FlexGrid } from '@grapecity/wijmo.grid';
         * let grid = new FlexGrid('#theGrid', {
         *   autoGenerateColumns: false, // data items may contain null values
         *   columns: [                  // so define columns explicitly
         *     { binding: 'name', header: 'Name', dataType: 'String' },
         *     { binding: 'amount', header: 'Amount', dataType: 'Number' },
         *     { binding: 'date', header: 'Date', dataType: 'Date' },
         *     { binding: 'active', header: 'Active', dataType: 'Boolean' }
         *   ],
         *   itemsSource: customers
         * });
         * ```
         *
         * The default value for this property is **true** for the {@link FlexGrid}
         * control and **false** for the **PivotGrid** control.
         */
        autoGenerateColumns: boolean;
        /**
         * Gets or sets a value that determines whether the grid should handle
         * clipboard shortcuts.
         *
         * The clipboard shortcuts are as follows:
         *
         * <dl class="dl-horizontal">
         *   <dt>ctrl+C, ctrl+Ins</dt>    <dd>Copy grid selection to clipboard.</dd>
         *   <dt>ctrl+V, shift+Ins</dt>   <dd>Paste clipboard text to grid selection.</dd>
         * </dl>
         *
         * Only visible rows and columns are included in clipboard operations.
         *
         * Read-only cells are not affected by paste operations.
         *
         * The default value for this property is **true**.
         */
        autoClipboard: boolean;
        /**
         * Gets or sets a value that determines whether the grid should automatically
         * expand the selection to include cells in merged ranges when copying or pasting
         * content to/from the clipboard.
         *
         * The default value for this property is **true**.
         */
        expandSelectionOnCopyPaste: boolean;
        /**
         * Gets or sets a value that determines whether the grid should automatically
         * scroll its contents while users drag rows or columns into new positions.
         *
         * Row and column dragging are controlled by the {@link allowDragging} property.
         *
         * The default value for this property is **true**.
         */
        autoScroll: boolean;
        /**
         * Gets or sets a value that determines whether the grid should search for
         * cells as the users types into read-only cells.
         *
         * The search happens on the column that is currently selected, if it is
         * not editable. The search starts at the currently selected row and is
         * case-insensitive.
         *
         * See also the {@link caseSensitiveSearch} property.
         *
         * The default value for this property is **false**.
         */
        autoSearch: boolean;
        /**
         * Gets or sets a value that determines whether searches performed
         * while the user types should case-sensitive.
         *
         * The searches include searching for regular text
         * (see the {@link autoSearch} property)
         * as well as searching for items while editing data-mapped cells
         * (see the {@link Column.dataMap} property).
         *
         * The default value for this property is **false**
         * (searches are not case-sensitive by default).
         */
        caseSensitiveSearch: boolean;
        /**
         * Gets or sets a JSON string that defines the current column layout.
         *
         * The column layout string represents an array with the columns and their
         * properties. It can be used to persist column layouts defined by users so
         * they are preserved across sessions, and can also be used to implement
         * undo/redo functionality in applications that allow users to modify the
         * column layout.
         *
         * The column layout string does not include properties that cannot be
         * converted to JSON, such as {@link dataMap} and {@link editor}.
         *
         * If you want to save and restore column layouts and don't require
         * the layouts to be serializable, you can clone the content of the
         * {@link columns} property and restore it later using array methods.
         * This is not as convenient as using the {@link columnLayout} property,
         * but it does allow you to save and restore data maps and editors.
         */
        columnLayout: string;
        /**
         * Gets or sets an array used to define hierarchical column groups.
         *
         * The items in the array should be JSON objects with properties of
         * {@link Column} objects, plus three optional members:
         *
         * * 'columns' array containing an array of child columns,
         * * 'collapseTo' string containing the binding of the child column
         *   that should remain visible when the group is collapsed.
         * * 'isCollapsed' boolean that determines if the group should be
         *   initially collapsed.
         *
         * For example, the code below generates a grid with two column groups,
         * both initially collapsed:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columnGroups: [
         *         { header: 'Group 1', align: 'center', collapseTo: 'country', isCollapsed: true, columns: [
         *             { binding: 'id', header: 'ID' },
         *             { binding: 'date', header: 'Date', dataType: 'Date' },
         *             { binding: 'country', header: 'Country', dataType: 'String' },
         *             { binding: 'active', header: 'Active', dataType: 'Boolean' },
         *         ]},
         *         { header: 'Group 2', align: 'center', collapseTo: 'sales', isCollapsed: true, columns: [
         *             { binding: 'sales', header: 'Sales', dataType: 'Number' },
         *             { binding: 'expenses', header: 'Expenses', dataType: 'Number' },
         *         ]}
         *     ],
         *     itemsSource: getData(20)
         * });
         * ```
         */
        columnGroups: any[];
        /**
         * Get the collection of column groups.
         */
        getColumnGroups(): ColumnGroupCollection;
        /**
         * Gets or sets a value that determines whether the user can modify
         * cell values using the mouse and keyboard.
         *
         * The default value for this property is **false** for the {@link FlexGrid}
         * control and **true** for the **PivotGrid** control.
         */
        isReadOnly: boolean;
        /**
         * Gets or sets a value that determines whether the checkboxes used to edit
         * boolean columns should extend to cover the whole cell width.
         *
         * Big checkboxes are easier to toggle with the mouse, since the user may
         * click anywhere in the cell to toggle them.
         *
         * The default value for this property is **false**.
         */
        bigCheckboxes: boolean;
        /**
         * Gets or sets a value that determines whether the control is disabled.
         *
         * Disabled controls cannot get mouse or keyboard events.
         */
        isDisabled: boolean;
        /**
         * Gets or sets a value that determines whether the grid should support
         * Input Method Editors (IME) while not in edit mode.
         *
         * This property is relevant only for sites/applications in Japanese,
         * Chinese, Korean, and other languages that require IME support.
         *
         * The default value for this property is **false**.
         */
        imeEnabled: boolean;
        /**
         * Gets or sets a value that determines whether users may resize
         * rows and/or columns with the mouse.
         *
         * If resizing is enabled, users can resize columns by dragging
         * the right edge of column header cells, or rows by dragging the
         * bottom edge of row header cells.
         *
         * Users may also double-click the edge of the header cells to
         * automatically resize rows and columns to fit their content.
         * The auto-size behavior can be customized using the {@link autoSizeMode}
         * property.
         *
         * The default value for this property is **AllowResizing.Columns**.
         */
        allowResizing: AllowResizing;
        /**
         * Gets or sets a value that determines whether row and column resizing
         * should be deferred until the user releases the mouse button.
         *
         * By default, {@link deferResizing} is set to false, causing rows and columns
         * to be resized as the user drags the mouse. Setting this property to true
         * causes the grid to show a resizing marker and to resize the row or column
         * only when the user releases the mouse button.
         *
         * The default value for this property is **false** for the {@link FlexGrid} control
         * and **true** for the **PivotGrid** control.
         */
        deferResizing: boolean;
        /**
         * Gets or sets which cells should be taken into account when auto-sizing a
         * row or column.
         *
         * This property controls what happens when users double-click the edge of
         * a column header.
         *
         * By default, the grid will automatically set the column width based on the
         * content of the header and data cells in the column. This property allows
         * you to change that to include only the headers or only the data.
         *
         * The default value for this property is **AutoSizeMode.Both**.
         */
        autoSizeMode: AutoSizeMode;
        /**
         * Gets or sets a value that determines whether the grid should automatically
         * resize the rows when the data or grid layout change.
         *
         * This property is especially useful when the grid has columns configured
         * to word-wrap their content (see {@link Column.wordWrap}), and when the grid
         * has a relatively small number of rows (auto-sizing is an expensive operation).
         *
         * The default value for this property is **false**.
         */
        autoRowHeights: boolean;
        /**
         * Gets or sets a value that determines whether the grid should optimize
         * performance over precision when auto-sizing columns.
         *
         * Setting this property to **false** disables quick auto-sizing.
         * Setting it to **true** enables the feature, subject to the value of each
         * column's {@link wijmo.grid.Column.quickAutoSize} property.
         *
         * The default value for this property is **null**, which enables quick
         * auto-sizing for grids that don't have a custom {@link itemFormatter}
         * or handlers attached to the {@link formatItem} event.
         *
         * Quick auto-sizing uses different strategies when auto-sizing rows or
         * columns.
         *
         * When auto-sizing columns, it uses a temporary canvas element to locate
         * the row with the widest entry for a column. When the row is located, its
         * contents are measured precisely. The limitation with this approach is
         * that the canvas only renders plain text, so if cells contain HTML the
         * auto-sizing may miss the widest column.
         *
         * When auto-sizing rows, it uses a cache to store the row heights based
         * on the cell content, and skips measuring numeric cells. The limitation
         * with this approach is that it only improves performance if many cells
         * have the same content, or if many columns are numeric.
         *
         * If you find that auto-sizing is slowing down your application, it is
         * probably worth setting {@link quickAutoSize} to true and checking the
         * results to see if it works correctly and improves performance for your
         * app.
         */
        quickAutoSize: boolean | null;
        _getQuickAutoSize(): boolean;
        /**
         * Gets or sets a value that determines whether users are allowed to sort columns
         * by clicking the column header cells.
         *
         * The default value for this property is **AllowSorting.SingleColumn**.
         */
        allowSorting: AllowSorting;
        /**
         * Gets or sets a value that determines whether the grid should add pin
         * buttons to the column headers and how the pin buttons behave.
         *
         * The pin buttons allow users to pin (freeze) columns so they remain
         * in view as the user scrolls the grid horizontally.
         *
         * The default value for this property is **AllowPinning.None**.
         */
        allowPinning: AllowPinning | boolean;
        /**
         * Gets or sets a value that indicates whether the grid should provide a new row
         * template so users can add items to the source collection.
         *
         * The new row template will not be displayed if the {@link isReadOnly} property
         * is set to true.
         *
         * The default value for this property is **false**.
         */
        allowAddNew: boolean;
        /**
         * Gets or sets a value that indicates whether the new row template should be
         * located at the top of the grid or at the bottom.
         *
         * If you set the {@link newRowAtTop} property to true, and you want the new
         * row template to remain visible at all times, set the {@link frozenRows}
         * property to one. This will freeze the new row template at the top so
         * it won't scroll off the view.
         *
         * The new row template will be displayed only if the {@link allowAddNew} property
         * is set to true and if the {@link itemsSource} object supports adding new items.
         *
         * The default value for this property is **false**.
         */
        newRowAtTop: boolean;
        /**
         * Gets or sets a value that indicates whether the grid should delete
         * selected rows when the user presses the Delete key.
         *
         * Selected rows will not be deleted if the {@link isReadOnly} property
         * is set to true.
         *
         * The default value for this property is **false**.
         */
        allowDelete: boolean;
        /**
         * Gets or sets which parts of the grid provide cell merging.
         *
         * The default value for this property is **AllowMerging.None**
         * for the {@link FlexGrid} control and **AllowMerging.All**
         * for the **PivotGrid** control.
         *
         * This property does not apply to the **MultiRow** control.
         */
        allowMerging: AllowMerging;
        /**
         * Gets or sets a value that indicates whether the grid should
         * add class names to indicate selected header cells.
         *
         * The default value for this property is **HeadersVisibility.None**.
         */
        showSelectedHeaders: HeadersVisibility;
        /**
         * Gets or sets a value that indicates whether the grid should
         * display an Excel-style marquee around the current selection.
         *
         * The default value for this property is **false**.
         *
         * If you choose to show the marquee, you may want to improve
         * accessibility by using some simple CSS to make the marquee
         * fully opaque only when the grid has the focus:
         *
         * ```css
         * .wj-flexgrid:not(.wj-state-focused) .wj-marquee {
         *     opacity: 0.2;
         * }
         * ```
         */
        showMarquee: boolean;
        /**
         * Gets or sets a value that determines whether the grid should
         * use the column headers as placeholders when editing cells.
         *
         * The default value for this property is **false**.
         *
         * This property is especially useful in grids that have multiple
         * rows per data item (like the {@link MultiRow} grid) and in
         * grids that allow adding new items (see the {@link allowAddNew}
         * property).
         *
         * This property only works with the grid's built-in editor.
         * If you are using custom editors (see the {@link Column.editor}
         * property), then you are responsible for setting the placeholder
         * property on those.
         *
         * The Internet Explorer browser does not show input placeholders
         * on focused input elements, so this property is not useful in
         * IE.
         */
        showPlaceholders: boolean;
        /**
         * Gets or sets a value that determines whether the grid should display
         * sort indicators in the column headers.
         *
         * Sorting is controlled by the {@link ICollectionView.sortDescriptions}
         * property of the {@link ICollectionView} object used as a the grid's
         * {@link itemsSource}.
         *
         * The default value for this property is **true**.
         */
        showSort: boolean;
        /**
         * Gets or sets a value that determines whether the {@link FlexGrid} should insert
         * group rows to delimit data groups.
         *
         * Data groups are created by modifying the {@link ICollectionView.groupDescriptions}
         * property of the {@link ICollectionView} object used as an {@link itemsSource}.
         *
         * The default value for this property is **true**.
         */
        showGroups: boolean;
        /**
         * Gets or sets a value that determines the number of regular rows
         * between 'alternating' rows.
         *
         * The default value for this property is **1** for the {@link FlexGrid}.
         * Set it to zero to disable alternating rows, or to a number greater than
         * one to insert multiple regular rows between alternating rows.
         *
         * The default value for this property is **1** for the {@link FlexGrid}
         * control and **0** for the **PivotGrid** control.
         */
        alternatingRowStep: number;
        showAlternatingRows: boolean;
        /**
         * Gets or sets a value that determines whether the grid should add the
         * 'wj-state-invalid' class to cells that contain validation errors and
         * tooltips with error descriptions.
         *
         * The grid detects validation errors using the {@link itemValidator}
         * property and the {@link CollectionView.getError} property on the grid's
         * {@link itemsSource}.
         *
         * The default value for this property is **true**.
         */
        showErrors: boolean;
        /**
         * Gets or sets the {@link Tooltip} object used to show validation
         * errors detected by the grid when the {@link showErrors} property
         * is set to true.
         *
         * By default, this property is set to a tooltip with zero show delay
         * (so it appears immediately when hovering over invalid cells),
         * no HTML content, and a "wj-error-tip" class which can be used to
         * customize the tooltip's appearance.
         *
         * Setting this property to **null** causes the control to use the cell's
         * "title" attribute to show validation errors.
         */
        errorTip: wijmo.Tooltip | null;
        /**
         * Gets or sets a validator function to determine whether cells contain
         * valid data.
         *
         * If specified, the validator function should take parameters containing
         * the cell's row and column indices and a parsing parameter that describes
         * whether the data has already been parsed and applied to the data item
         * (parsing == false), or whether the user was trying to edit the value and
         * entered a value that could not be parsed into the data type expected
         * (parsing == true).
         *
         * The method returns a string containing an error message, or null if no
         * errors were detected.
         *
         * For example,
         *
         * ```typescript
         * grid.itemValidator = (row: number, col: number, parsing: boolean) => {
         *     let item = grid.rows[row].dataItem,
         *         prop = grid.columns[col].binding;
         *
         *     // parsing failed, show message
         *     if (parsing) {
         *         if (prop == 'date') {
         *             return 'Please enter a valid date in the format "MM/dd/yyyy"';
         *         } else if (prop == 'id') {
         *             return 'Please enter a positive number';
         *         }
         *     }
         *
         *     // check that stored (parsed) data is valid
         *     if (prop == 'date' && item.date < minDate) {
         *         return 'Please enter a date after ' + Globalize.formatDate(minDate, 'd');
         *     } else if (prop == 'id' && item.id < 0) {
         *         return 'Please enter a positive number';
         *     }
         * });
         * ```
         *
         * See also the {@link CollectionView.getError} method.
         */
        itemValidator: IItemValidator;
        /**
         * Gets or sets a value that determines whether the grid should remain
         * in edit mode when the user tries to commit edits that fail validation.
         *
         * The grid detects validation errors by calling the {@link CollectionView.getError}
         * method on the grid's {@link itemsSource}.
         *
         * The default value for this property is **true**.
         */
        validateEdits: boolean;
        /**
         * Gets or sets the format string used to create the group header content.
         *
         * The string may contain any text, plus the following replacement strings:
         * <ul>
         *   <li><b>{name}</b>: The name of the property being grouped on.</li>
         *   <li><b>{value}</b>: The value of the property being grouped on.</li>
         *   <li><b>{level}</b>: The group level.</li>
         *   <li><b>{count}</b>: The total number of items in this group.</li>
         * </ul>
         *
         * If a column is bound to the grouping property, the column header is used
         * to replace the <code>{name}</code> parameter, and the column's format and
         * data maps are used to calculate the <code>{value}</code> parameter.
         * If no column is available, the group information is used instead.
         *
         * You may add invisible columns bound to the group properties in order to
         * customize the formatting of the group header cells.
         *
         * The default value for this property is **null**, which causes the grid
         * to use a culture-specific version of the string
         * ```typescript
         * '{name}: &lt;b&gt;{value}&lt;/b&gt;({count:n0} items)'
         * ```
         *
         * This default format string creates group headers similar to
         *
         * ```typescript
         * 'Country: &lt;b&gt;UK&lt;/b&gt; (12 items)'
         * 'Country: &lt;b&gt;Japan&lt;/b&gt; (8 items)'
         * ```
         */
        groupHeaderFormat: string | null;
        /**
         * Gets or sets a value that determines whether users are allowed to drag
         * rows and/or columns with the mouse.
         *
         * If the {@link autoScroll} property is set to true, the grid will automatically
         * scroll its contents while the user drags rows or columns into new positions.
         *
         * The grid allows dragging columns by default.
         *
         * Dragging rows requires special considerations in bound scenarios.
         *
         * When you drag rows on bound grids, the rows will get out of sync with the
         * data source (row 4 may refer to item 6 for example).
         * To avoid this, you should handle the {@link draggedRow} event and
         * synchronize the data with the new row positions.
         *
         * Also, remember to set the {@link allowSorting} property to false or you
         * the row order will be determined by the data, and dragging rows will be
         * pointless.
         *
         * This fiddle demonstrates row dragging with a bound grid:
         * <a href="https://jsfiddle.net/Wijmo5/kyg0qsda/" target="_blank">Bound Row Dragging</a>.
         *
         * The default value for this property is **AllowDragging.Columns**
         * for the {@link FlexGrid} control and **AllowDragging.None**
         * for the **PivotGrid** control.
         *
         * This property does not apply to the **MultiRow** control.
         */
        allowDragging: AllowDragging;
        /**
         * Gets or sets the array or {@link ICollectionView} that contains items
         * shown on the grid.
         */
        itemsSource: any;
        /**
         * Gets the {@link ICollectionView} that contains the grid data.
         *
         * If the {@link itemsSource} property was set to an {@link ICollectionView},
         * this property returns that value.
         *
         * If the {@link itemsSource} property was set to an array of data items,
         * this property returns the internal {@link CollectionView} created
         * by the grid to support currency, editing, and sorting.
         */
        readonly collectionView: wijmo.collections.ICollectionView;
        /**
         * Gets the {@link IEditableCollectionView} that contains the grid data.
         */
        readonly editableCollectionView: wijmo.collections.IEditableCollectionView;
        /**
         * Gets or sets the name of the property (or properties) used to generate
         * child rows in hierarchical grids.
         *
         * Set this property to a string to specify the name of the property that
         * contains an item's child items
         * (e.g. <code>childItemsPath = 'items';</code>).
         *
         * If items at different levels have child items with different names,
         * set this property to an array containing the names of the properties
         * that contain child items et each level
         * (e.g. <code>childItemsPath = ['checks','earnings'];</code>).
         *
         * {@sample Grid/TreeGrid/ChildItems/purejs Example}
         *
         * The default value for this property is **null**.
         *
         * This property does not apply to the **MultiRow** control.
         */
        childItemsPath: string | string[] | null;
        /**
         * Gets or sets the name of the property used to create row header
         * cells.
         *
         * Row header cells are not visible or selectable. They are meant
         * for use with accessibility tools.
         */
        rowHeaderPath: string;
        /**
         * Gets the {@link GridPanel} that contains the data cells.
         */
        readonly cells: GridPanel;
        /**
         * Gets the {@link GridPanel} that contains the column header cells.
         */
        readonly columnHeaders: GridPanel;
        /**
         * Gets the {@link GridPanel} that contains the column footer cells.
         *
         * The {@link columnFooters} panel appears below the grid cells, to the
         * right of the {@link bottomLeftCells} panel. It can be used to display
         * summary information below the grid data.
         *
         * The example below shows how you can add a row to the {@link columnFooters}
         * panel to display summary data for columns that have the
         * {@link Column.aggregate} property set:
         *
         * ```typescript
         * function addFooterRow(flex) {
         *
         *   // create a GroupRow to show aggregates
         *   let row = new wijmo.grid.GroupRow();
         *
         *   // add the row to the column footer panel
         *   flex.columnFooters.rows.push(row);
         *
         *   // show a sigma on the header
         *   flex.bottomLeftCells.setCellData(0, 0, '\u03A3');
         * }
         * ```
         */
        readonly columnFooters: GridPanel;
        /**
         * Gets the {@link GridPanel} that contains the row header cells.
         */
        readonly rowHeaders: GridPanel;
        /**
         * Gets the {@link GridPanel} that contains the top left cells
         * (to the left of the column headers).
         */
        readonly topLeftCells: GridPanel;
        /**
         * Gets the {@link GridPanel} that contains the bottom left cells.
         *
         * The {@link bottomLeftCells} panel appears below the row headers, to the
         * left of the {@link columnFooters} panel.
         */
        readonly bottomLeftCells: GridPanel;
        /**
         * Gets the grid's row collection.
         */
        readonly rows: RowCollection;
        /**
         * Gets the grid's column collection.
         */
        readonly columns: ColumnCollection;
        /**
         * Gets a column by name or by binding.
         *
         * The method searches the column by name. If a column with the given name
         * is not found, it searches by binding. The searches are case-sensitive.
         *
         * @param name The column name, binding, or index.
         * @param header Whether to include column groups in search.
         * @return The column with the specified name or binding, or null if not found.
         */
        getColumn(name: string | number, header?: boolean): Column;
        /**
         * Gets or sets the number of frozen rows.
         *
         * Frozen rows do not scroll vertically, but the cells they contain
         * may be selected and edited.
         *
         * The default value for this property is **0**.
         */
        frozenRows: number;
        /**
         * Gets or sets the number of frozen columns.
         *
         * Frozen columns do not scroll horizontally, but the cells they contain
         * may be selected and edited.
         *
         * The default value for this property is **0**.
         */
        frozenColumns: number;
        /**
         * Gets or sets a value that determines whether the FlexGrid should
         * clone frozen cells and show then in a separate element to reduce
         * flicker while scrolling.
         *
         * The default value for this property is **null**, which causes
         * the grid to select the best setting depending on the browser.
         */
        cloneFrozenCells: boolean | null;
        /**
         * Gets or sets the index of row in the column header panel that
         * shows and changes the current sort.
         *
         * The default value for this property is **null**,
         * which causes the bottom row in the {@link columnHeaders}
         * panel to act as the sort row.
         */
        sortRowIndex: number | null;
        /**
         * Gets or sets the index of column in the row header panel that
         * shows whether items are being edited.
         *
         * The default value for this property is **null**, which causes
         * the grid to show the edit glyph on the last column of the
         * {@link rowHeaders} panel.
         */
        editColumnIndex: number | null;
        /**
         * Gets or sets a {@link Point} that represents the value of the grid's scrollbars.
         */
        scrollPosition: wijmo.Point;
        /**
         * Gets the client size of the control (control size minus headers and scrollbars).
         */
        readonly clientSize: wijmo.Size;
        /**
         * Gets the bounding rectangle of the control in page coordinates.
         */
        readonly controlRect: wijmo.Rect;
        /**
         * Gets the size of the grid content in pixels.
         */
        readonly scrollSize: wijmo.Size;
        /**
         * Gets the range of cells currently in view.
         */
        readonly viewRange: CellRange;
        /**
         * Gets or sets the {@link CellFactory} that creates and updates cells for this grid.
         */
        cellFactory: CellFactory;
        /**
         * Gets or sets a formatter function used to customize cells on this grid.
         *
         * The formatter function can add any content to any cell. It provides
         * complete flexibility over the appearance and behavior of grid cells.
         *
         * If specified, the function should take four parameters: the {@link GridPanel}
         * that contains the cell, the row and column indices of the cell, and the
         * HTML element that represents the cell. The function will typically change
         * the **innerHTML** property of the cell element.
         *
         * For example:
         * ```typescript
         * flex.itemFormatter = (panel, r, c, cell) => {
         *   if (panel.cellType == CellType.Cell) {
         *
         *     // draw sparklines in the cell
         *     let col = panel.columns[c];
         *     if (col.name == 'sparklines') {
         *       cell.innerHTML = getSparkline(panel, r, c);
         *     }
         *   }
         * }
         * ```
         *
         * Note that the FlexGrid recycles cells, so if your {@link itemFormatter}
         * modifies the cell's style attributes, you must make sure that it resets
         * these attributes for cells that should not have them. For example:
         * ```typescript
         * flex.itemFormatter = (panel, r, c, cell) => {
         *
         *   // reset attributes we are about to customize
         *   let s = cell.style;
         *   s.color = '';
         *   s.backgroundColor = '';
         *   // customize color and backgroundColor attributes for this cell
         *   ...
         * }
         * ```
         *
         * If you have a scenario where multiple clients may want to customize the
         * grid rendering (for example when creating directives or re-usable libraries),
         * consider using the {@link formatItem} event instead. The event allows multiple
         * clients to attach their own handlers.
         */
        itemFormatter: IItemFormatter;
        /**
         * Gets a value that indicates whether a given cell can be edited.
         *
         * @param r Index of the row that contains the cell.
         * @param c Index of the column that contains the cell.
         */
        canEditCell(r: number, c: number): boolean;
        /**
         * Gets the value stored in a cell in the scrollable area of the grid.
         *
         * @param r Index of the row that contains the cell.
         * @param c Index, name, or binding of the column that contains the cell.
         * @param formatted Whether to format the value for display.
         */
        getCellData(r: number, c: number | string, formatted: boolean): any;
        /**
         * Gets a the bounds of a cell element in viewport coordinates.
         *
         * This method returns the bounds of cells in the {@link cells}
         * panel (scrollable data cells). To get the bounds of cells
         * in other panels, use the {@link getCellBoundingRect} method
         * in the appropriate {@link GridPanel} object.
         *
         * The returned value is a {@link Rect} object which contains the
         * position and dimensions of the cell in viewport coordinates.
         * The viewport coordinates are the same used by the
         * <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect">getBoundingClientRect</a>
         * method.
         *
         * @param r Index of the row that contains the cell.
         * @param c Index, name, or binding of the column that contains the cell.
         * @param raw Whether to return the rectangle in raw panel coordinates
         * as opposed to viewport coordinates.
         */
        getCellBoundingRect(r: number, c: number | string, raw?: boolean): wijmo.Rect;
        /**
         * Sets the value of a cell in the scrollable area of the grid.
         *
         * @param r Index of the row that contains the cell.
         * @param c Index, name, or binding of the column that contains the cell.
         * @param value Value to store in the cell.
         * @param coerce Whether to change the value automatically to match the column's data type.
         * @param invalidate Whether to invalidate the grid to show the change.
         * @return True if the value was stored successfully, false otherwise.
         */
        setCellData(r: number, c: string | number, value: any, coerce?: boolean, invalidate?: boolean): boolean;
        /**
         * Gets a {@link wijmo.grid.HitTestInfo} object with information about a given point.
         *
         * For example:
         *
         * ```typescript
         * // hit test a point when the user clicks on the grid
         * flex.hostElement.addEventListener('click', (e) => {
         *   let ht = flex.hitTest(e.pageX, e.pageY);
         *   console.log('you clicked a cell of type "' +
         *     wijmo.grid.CellType[ht.cellType] + '".');
         * });
         * ```
         *
         * @param pt {@link Point} to investigate, in page coordinates, or a MouseEvent object, or x coordinate of the point.
         * @param y Y coordinate of the point in page coordinates (if the first parameter is a number).
         * @return A {@link wijmo.grid.HitTestInfo} object with information about the point.
         */
        hitTest(pt: number | wijmo.Point | MouseEvent | HTMLElement, y?: number | boolean): HitTestInfo;
        /**
         * Gets the content of a {@link CellRange} as a string suitable for
         * copying to the clipboard or exporting to CSV (comma-separated values)
         * files.
         *
         * Hidden rows and columns are not included in the clip string.
         *
         * Invalid (with negative indexes) row or column ranges can be specified in CellRange,
         * which indicates that data rows or columns are not included in the result.
         * In conjunction with **colHeaders** or **rowHeaders** parameters set to true, this makes
         * it possible to export colum or row headers only, without the corresponding data cells.
         *
         * @param rng {@link CellRange} to copy. If omitted, the current selection is used.
         * @param options A boolean value that specifies the clip string should be a CSV string
         * or a {@link ClipStringOptions} value that specifies options for the clip string.
         * @param colHeaders Whether to include the column headers.
         * @param rowHeaders Whether to include the row headers.
         *
         * To export the current selection, set the **rng** parameter to null.
         * This will include not only the primary selection but also extended
         * selections such as selected rows (in {@link SelectionMode.ListBox} mode)
         * and multiple selected ranges (in {@link SelectionMode.MultiRange} mode).
         *
         * Note that multiple selected ranges are included only if all selected ranges
         * refer to the same column range or row range.
         */
        getClipString(rng?: CellRange | null, options?: boolean | ClipStringOptions, colHeaders?: boolean, rowHeaders?: boolean): string;
        /**
         * Parses a string into rows and columns and applies the content to a given range.
         *
         * Hidden rows and columns are skipped.
         *
         * @param text Tab and newline delimited text to parse into the grid.
         * @param rng {@link CellRange} to copy. If omitted, the current selection is used.
         */
        setClipString(text: string, rng?: CellRange): void;
        /**
         * Overridden to set the focus to the grid without scrolling the  whole grid
         * into view.
         *
         * @param force Whether to perform the focus operation even if the grid
         * already contains the focus.
         */
        focus(force?: boolean): void;
        /**
         * Disposes of the control by removing its association with the host element.
         */
        dispose(): void;
        /**
         * Refreshes the grid display.
         *
         * @param fullUpdate Whether to update the grid layout and content, or just the content.
         */
        refresh(fullUpdate?: boolean): void;
        /**
         * Refreshes the grid display.
         *
         * @param fullUpdate Whether to update the grid layout and content, or just the content.
         * @param recycle Whether to recycle existing elements.
         * @param state Whether to keep existing elements and update their state.
         */
        refreshCells(fullUpdate: boolean, recycle?: boolean, state?: boolean): void;
        /**
         * Refreshes the cells in a range, updating their content and styles.
         *
         * Unlike the {@link refreshCells} method, which updates all the cells,
         * {@link refreshRange} allows you to specify which cells should be
         * refreshed, which in some cases can improve performance.
         *
         * @param rng {@link CellRange} to be refreshed.
         */
        refreshRange(rng: CellRange): void;
        /**
         * Resizes a column to fit its content.
         *
         * This method only works if the grid is visible. If its host element
         * has not been added to the DOM, or if any of the grid's ancestor
         * elements is hidden, the grid will not be able to measure the cells
         * and therefore will not be able to auto-size the columns.
         *
         * @param c Index of the column to resize.
         * @param header Whether the column index refers to a regular or a header row.
         * @param extra Extra spacing, in pixels.
         */
        autoSizeColumn(c: number, header?: boolean, extra?: number): void;
        /**
         * Resizes a range of columns to fit their content.
         *
         * The grid will always measure all rows in the current view range, plus up
         * to 2,000 rows not currently in view. If the grid contains a large amount
         * of data (say 50,000 rows),  then not all rows will be measured since that
         * could take a long time.
         *
         * This method only works if the grid is visible. If its host element has not
         * been added to the DOM, or if any of the grid's ancestor elements is hidden,
         * the grid will not be able to measure the cells and therefore will not be
         * able to auto-size the columns.
         *
         * @param firstColumn Index of the first column to resize (defaults to the first column).
         * @param lastColumn Index of the last column to resize (defaults to the last column).
         * @param header Whether the column indices refer to regular or header columns.
         * @param extra Extra spacing, in pixels.
         */
        autoSizeColumns(firstColumn?: number, lastColumn?: number, header?: boolean, extra?: number): void;
        /**
         * Resizes a row to fit its content.
         *
         * This method only works if the grid is visible. If its host element
         * has not been added to the DOM, or if any of the grid's ancestor
         * elements are hidden, the grid will not be able to measure the cells
         * and therefore will not be able to auto-size the rows.
         *
         * @param r Index of the row to resize.
         * @param header True to indicate the row index refers to a header row,
         * false to indicate it refers to a regular data row, or null to indicate
         * it refers to a footer row.
         * @param extra Extra spacing, in pixels.
         */
        autoSizeRow(r: number, header?: boolean, extra?: number): void;
        /**
         * Resizes a range of rows to fit their content.
         *
         * This method only works if the grid is visible. If its host element
         * has not been added to the DOM, or if any of the grid's ancestor
         * elements is hidden, the grid will not be able to measure the cells
         * and therefore will not be able to auto-size the rows.
         *
         * @param firstRow Index of the first row to resize.
         * @param lastRow Index of the last row to resize.
         * @param header Whether the row indices refer to regular or header rows.
         * @param extra Extra spacing, in pixels.
         */
        autoSizeRows(firstRow?: number, lastRow?: number, header?: boolean, extra?: number): void;
        /**
         * Gets or sets the indent used to offset row groups of different levels.
         *
         * The default value for this property is **14** pixels for the
         * {@link FlexGrid} control, and **32** pixels for the **PivotGrid**.
         */
        treeIndent: number;
        /**
         * Collapses all the group rows to a given level.
         *
         * @param level Maximum group level to show.
         */
        collapseGroupsToLevel(level: number): void;
        /**
         * Gets or sets the current selection mode.
         */
        selectionMode: SelectionMode;
        /**
         * Gets or sets the current selection.
         */
        selection: CellRange;
        /**
         * Selects a cell range and optionally scrolls it into view.
         *
         * The {@link select} method can be called by passing a {@link CellRange} and
         * an optional boolean parameter that indicates whether the new selection
         * should be scrolled into view. For example:
         *
         * ```typescript
         * // select cell 1,1 and scroll it into view
         * grid.select(new CellRange(1, 1), true);
         *
         * // select range (1,1)-(2,4) and do not scroll it into view
         * grid.select(new CellRange(1, 1, 2, 4), false);
         * ```
         *
         * You can also call the {@link select} method passing the index or the
         * row and column you want to select. In this case, the new selection
         * always scrolls into view. For example:
         *
         * ```typescript
         * // select cell 1,1 and scroll it into view
         * grid.select(1, 1);
         * ```
         *
         * @param rng Range to select (or index of the row to select).
         * @param show Whether to scroll the new selection into view
         * (or index, name, or binding of the column to select).
         * @return True if the new selection was applied.
         */
        select(rng: (CellRange | number), show?: (boolean | number | string)): boolean;
        /**
         * Selects all the cells on the grid.
         */
        selectAll(): boolean;
        /**
         * Gets a {@link SelectedState} value that indicates the selected state of a cell.
         *
         * @param r Row index of the cell to inspect.
         * @param c Column index of the cell to inspect.
         */
        getSelectedState(r: number, c: number): SelectedState;
        /**
         * Gets or sets an array containing the rows that are currently selected.
         *
         * Note: this property can be read in all selection modes, but it can be
         * set only when {@link selectionMode} is set to **SelectionMode.ListBox**.
         */
        selectedRows: Row[];
        /**
         * Gets or sets an array containing the data items that are currently selected.
         *
         * Note: this property can be read in all selection modes, but it can be
         * set only when {@link selectionMode} is set to **SelectionMode.ListBox**.
         */
        selectedItems: any[];
        /**
         * Gets or sets an array with {@link CellRange} objects that represent
         * the current selection.
         *
         * The first element in the array is the current {@link selection}.
         * If the grid's {@link selectionMode} property is set to
         * {@link SelectionMode.MultiRange}, the array may contain additional
         * ranges that represent the extended selection.
         *
         * Note that ranges in the {@link selectedRanges} array may contain
         * overlapping areas, which may be important when performing actions
         * like aggregating over the extended selection.
         */
        selectedRanges: CellRange[];
        /**
         * Scrolls the grid to bring a specific cell into view.
         *
         * Negative row and column indices are ignored, so if you call
         *
         * ```typescript
         * grid.scrollIntoView(200, -1);
         * ```
         *
         * The grid will scroll vertically to show row 200, and will not
         * scroll horizontally.
         *
         * @param r Index of the row to scroll into view.
         * @param c Index, name, or binding of the column to scroll into view.
         * @param refresh Optional parameter that determines whether the grid
         * should refresh to show the new scroll position immediately.
         * @return True if the grid scrolled.
         */
        scrollIntoView(r: number, c: number | string, refresh?: boolean): boolean;
        /**
         * Checks whether a given CellRange is valid for this grid's row and column collections.
         *
         * @param rng Range to check.
         */
        isRangeValid(rng: CellRange): boolean;
        /**
         * Starts editing a given cell.
         *
         * Editing in the {@link FlexGrid} is similar to editing in Excel:
         * Pressing F2 or double-clicking a cell puts the grid in **full-edit** mode.
         * In this mode, the cell editor remains active until the user presses Enter, Tab,
         * or Escape, or until he moves the selection with the mouse. In full-edit mode,
         * pressing the cursor keys does not cause the grid to exit edit mode.
         *
         * Typing text directly into a cell puts the grid in **quick-edit mode**.
         * In this mode, the cell editor remains active until the user presses Enter,
         * Tab, or Escape, or any arrow keys.
         *
         * Full-edit mode is normally used to make changes to existing values.
         * Quick-edit mode is normally used for entering new data quickly.
         *
         * While editing, the user can toggle between full and quick modes by
         * pressing the F2 key.
         *
         * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to true.
         * @param r Index of the row to be edited. Defaults to the currently selected row.
         * @param c Index, name, or binding of the column to be edited. Defaults to the currently selected column.
         * @param focus Whether to give the editor the focus when editing starts. Defaults to true.
         * @param evt Event that triggered this action (usually a keypress or keydown).
         * @return True if the edit operation started successfully.
         */
        startEditing(fullEdit?: boolean, r?: number, c?: number | string, focus?: boolean, evt?: any): boolean;
        /**
         * Commits any pending edits and exits edit mode.
         *
         * @param cancel Whether pending edits should be canceled or committed.
         * @return True if the edit operation finished successfully.
         */
        finishEditing(cancel?: boolean): boolean;
        /**
         * Gets the **HTMLElement** that represents the currently active cell element.
         *
         * If no cell is currently selected, or if the selected cell is not currently
         * within view, this property returns null.
         */
        readonly activeCell: HTMLElement;
        /**
         * Gets the **HTMLInputElement** that represents the currently active cell editor.
         *
         * If no cell is currently being edited, this property returns null.
         */
        readonly activeEditor: HTMLInputElement;
        /**
         * Gets a {@link CellRange} that identifies the cell currently being edited.
         */
        readonly editRange: CellRange;
        /**
         * Gets or sets the {@link MergeManager} object responsible for determining how cells
         * should be merged.
         */
        mergeManager: MergeManager;
        /**
         * Gets a {@link CellRange} that specifies the merged extent of a cell
         * in a {@link GridPanel}.
         *
         * @param p The {@link GridPanel} that contains the range.
         * @param r Index of the row that contains the cell.
         * @param c Index of the column that contains the cell.
         * @param clip Whether to clip the merged range to the grid's current view range.
         * @return A {@link CellRange} that specifies the merged range, or null if the cell is not merged.
         */
        getMergedRange(p: GridPanel, r: number, c: number, clip?: boolean): CellRange;
        /**
         * Gets or sets the action to perform when the TAB key is pressed.
         *
         * The default setting for this property is {@link KeyAction.None},
         * which causes the browser to select the next or previous controls
         * on the page when the TAB key is pressed. This is the recommended
         * setting to improve page accessibility.
         *
         * In previous versions, the default was set to {@link KeyAction.Cycle},
         * which caused the control to move the selection across and down
         * the grid. This is the standard Excel behavior, but is not good
         * for accessibility.
         *
         * There is also a {@link KeyAction.CycleOut} setting that causes the
         * selection to move through the cells (as {@link KeyAction.Cycle}),
         * and then on to the next/previous control on the page when the
         * last or first cells are selected.
         */
        keyActionTab: KeyAction;
        /**
         * Gets or sets the action to perform when the ENTER key is pressed.
         *
         * The default setting for this property is {@link KeyAction.MoveDown},
         * which causes the control to move the selection to the next row.
         * This is the standard Excel behavior.
         */
        keyActionEnter: KeyAction;
        /**
         * Gets or sets a value that determines whether the grid should keep
         * whitespace in cells as they appear in the data
         * <code>(white-space: pre)</code> or whether it should collapse the
         * whitespace into a single space character
         * <code>(white-space: normal)</code>.
         *
         * This property allows you to specify how the grid should handle
         * white space without changing any CSS rules. You choose to use
         * CSS rules instead, however, since they provide better control
         * over scope.
         *
         * For example, you could create CSS rules that apply to all grids
         * in the application, to specific grids, or to specific columns.
         *
         * Be aware that setting this property to **true** may have
         * undesired effects in applications that use interop cell templates
         * (Vue templates especially).
         *
         * The default value for this property is **false**.
         */
        preserveWhiteSpace: boolean;
        /**
         * Gets or sets a value that indicates whether the grid should add
         * drop-down buttons to data-mapped cells.
         *
         * The drop-down buttons are shown on columns that have a {@link Column.dataMap}
         * and are editable.
         *
         * Clicking on the drop-down buttons causes the grid to show a
         * drop-down list from which users can select the cell value.
         *
         * This setting may be overridden on specific columns using the
         * column's {@link Column.dataMapEditor} property.
         *
         * Cell drop-downs require the **wijmo.input module** to be loaded.
         */
        showDropDown: boolean;
        /**
         * Toggles the visibility of the drop-down list box associated with
         * the currently selected cell.
         *
         * The drop-down list is created automatically based on the column's
         * {@link Column.dataMap} property.
         *
         * This method can be used to show the drop-down list automatically
         * when the cell enters edit mode, or when the user presses certain
         * keys.
         *
         * For example, this code causes the grid to show the drop-down list
         * whenever the grid enters edit mode:
         *
         * ```typescript
         * // show the drop-down list when the grid enters edit mode
         * theGrid.beginningEdit.addHandler(() => {
         *   theGrid.toggleDropDownList();
         * });
         * ```
         *
         * This code causes the grid to show the drop-down list when the grid
         * enters edit mode after the user presses the space bar:
         *
         * ```typescript
         * // show the drop-down list when the user presses the space bar
         * theGrid.hostElement.addEventListener('keydown', (e) => {
         *   if (e.keyCode == 32) {
         *     e.preventDefault();
         *     theGrid.toggleDropDownList();
         *   }
         * }, true);
         * ```
         */
        toggleDropDownList(): boolean;
        /**
         * Gets a reference to a static object that defines the default width for
         * auto-generated grid columns based on their types.
         *
         * The object keys are {@link DataType} values. The object values are either
         * numbers (widths in pixels) or star-size strings (multiples of the default
         * width defined by the columns defaultSize property).
         *
         * For example:
         *
         * ```typescript
         * import { FlexGrid } from '@grapecity/wijmo.grid';
         * import { DataType } from '@grapecity/wijmo';
         *
         * // make boolean columns on all grids 100px wide by default
         * FlexGrid.defaultTypeWidth[DataType.Boolean] = 100;
         *
         * // make numeric columns on all grids 75% as wide as the columns defaultSize
         * FlexGrid.defaultTypeWidth[DataType.Number] = '0.75*';
         * ```
         */
        static readonly defaultTypeWidth: object;
        /**
         * Occurs before the grid is bound to a new items source.
         */
        readonly itemsSourceChanging: Event<FlexGrid, CancelEventArgs>;
        /**
         * Raises the {@link itemsSourceChanging} event.
         *
         * @param e {@link CancelEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onItemsSourceChanging(e: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs after the grid has been bound to a new items source.
         */
        readonly itemsSourceChanged: Event<FlexGrid, EventArgs>;
        /**
         * Raises the {@link itemsSourceChanged} event.
         */
        onItemsSourceChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs after the control has scrolled.
         */
        readonly scrollPositionChanged: Event<FlexGrid, EventArgs>;
        /**
         * Raises the {@link scrollPositionChanged} event.
         */
        onScrollPositionChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs before selection changes.
         */
        readonly selectionChanging: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link selectionChanging} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onSelectionChanging(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after selection changes.
         */
        readonly selectionChanged: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link selectionChanged} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onSelectionChanged(e: CellRangeEventArgs): void;
        /**
         * Occurs before the grid rows are bound to items in the data source.
         */
        readonly loadingRows: Event<FlexGrid, CancelEventArgs>;
        /**
         * Raises the {@link loadingRows} event.
         *
         * @param e {@link CancelEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onLoadingRows(e: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs after the grid rows have been bound to items in the data source.
         */
        readonly loadedRows: Event<FlexGrid, EventArgs>;
        /**
         * Raises the {@link loadedRows} event.
         */
        onLoadedRows(e?: wijmo.EventArgs): void;
        /**
         * Occurs before the grid updates its internal layout.
         */
        readonly updatingLayout: Event<FlexGrid, CancelEventArgs>;
        /**
         * Raises the {@link updatingLayout} event.
         *
         * @param e {@link CancelEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onUpdatingLayout(e: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs after the grid has updated its internal layout.
         */
        readonly updatedLayout: Event<FlexGrid, EventArgs>;
        /**
         * Raises the {@link updatedLayout} event.
         */
        onUpdatedLayout(e?: wijmo.EventArgs): void;
        /**
         * Occurs as columns are resized.
         */
        readonly resizingColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link resizingColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onResizingColumn(e: CellRangeEventArgs): boolean;
        /**
         * Occurs when the user finishes resizing a column.
         */
        readonly resizedColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link resizedColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onResizedColumn(e: CellRangeEventArgs): void;
        /**
         * Occurs before the user auto-sizes a column by double-clicking the
         * right edge of a column header cell.
         */
        readonly autoSizingColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link autoSizingColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onAutoSizingColumn(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after the user auto-sizes a column by double-clicking the
         * right edge of a column header cell.
         */
        readonly autoSizedColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link autoSizedColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onAutoSizedColumn(e: CellRangeEventArgs): void;
        /**
         * When one or more columns have been resized due to star-sizing.
         */
        readonly starSizedColumns: Event<FlexGrid, EventArgs>;
        /**
         * Raises the {@link starSizedColumns} event.
         */
        onStarSizedColumns(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the user starts dragging a column.
         */
        readonly draggingColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link draggingColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onDraggingColumn(e: CellRangeEventArgs): boolean;
        /**
         * Occurs as the user drags a column to a new position.
         *
         * The handler may cancel the event to prevent users from
         * dropping columns at certain positions. For example:
         *
         * ```typescript
         * // remember column being dragged
         * flex.draggingColumn.addHandler((s, e) => {
         *     theColumn = s.columns[e.col].binding;
         * });
         *
         * // prevent 'sales' column from being dragged to index 0
         * s.draggingColumnOver.addHandler((s, e) => {
         *     if (theColumn == 'sales' && e.col == 0) {
         *         e.cancel = true;
         *     }
         * });
         * ```
         */
        readonly draggingColumnOver: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link draggingColumnOver} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onDraggingColumnOver(e: CellRangeEventArgs): boolean;
        /**
         * Occurs when the user finishes dragging a column.
         */
        readonly draggedColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link draggedColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onDraggedColumn(e: CellRangeEventArgs): void;
        /**
         * Occurs before one or more columns are pinned (or unpinned).
         */
        readonly pinningColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link pinningColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onPinningColumn(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after one or more columns are pinned (or unpinned).
         */
        readonly pinnedColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link pinnedColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onPinnedColumn(e: CellRangeEventArgs): void;
        /**
         * Occurs as rows are resized.
         */
        readonly resizingRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link resizingRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onResizingRow(e: CellRangeEventArgs): boolean;
        /**
         * Occurs when the user finishes resizing rows.
         */
        readonly resizedRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link resizedRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onResizedRow(e: CellRangeEventArgs): void;
        /**
         * Occurs before the user auto-sizes a row by double-clicking the
         * bottom edge of a row header cell.
         */
        readonly autoSizingRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link autoSizingRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onAutoSizingRow(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after the user auto-sizes a row by double-clicking the
         * bottom edge of a row header cell.
         */
        readonly autoSizedRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link autoSizedRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onAutoSizedRow(e: CellRangeEventArgs): void;
        /**
         * Occurs when the user starts dragging a row.
         */
        readonly draggingRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link draggingRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onDraggingRow(e: CellRangeEventArgs): boolean;
        /**
         * Occurs as the user drags a row to a new position.
         */
        readonly draggingRowOver: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link draggingRowOver} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onDraggingRowOver(e: CellRangeEventArgs): boolean;
        /**
         * Occurs when the user finishes dragging a row.
         */
        readonly draggedRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link draggedRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onDraggedRow(e: CellRangeEventArgs): void;
        /**
         * Occurs when a group is about to be expanded or collapsed.
         */
        readonly groupCollapsedChanging: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link groupCollapsedChanging} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onGroupCollapsedChanging(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after a group has been expanded or collapsed.
         */
        readonly groupCollapsedChanged: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link groupCollapsedChanged} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onGroupCollapsedChanged(e: CellRangeEventArgs): void;
        /**
         * Occurs when a column group is about to be expanded or collapsed.
         *
         * The 'data' property of the handler parameters contains a reference
         * to the {@link ColumnGroup} that is about to change.
         */
        readonly columnGroupCollapsedChanging: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link columnGroupCollapsedChanging} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onColumnGroupCollapsedChanging(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after a column group has been expanded or collapsed.
         *
         * The 'data' property of the handler parameters contains a reference
         * to the {@link ColumnGroup} that is about to change.
         */
        readonly columnGroupCollapsedChanged: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link columnGroupCollapsedChanged} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onColumnGroupCollapsedChanged(e: CellRangeEventArgs): void;
        /**
         * Occurs before the user applies a sort by clicking on a column header.
         *
         * The 'data' property of the handler parameters contains a reference
         * to the DOM event that caused the sort.
         *
         * The event handler may cancel the sort action.
         */
        readonly sortingColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link sortingColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onSortingColumn(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after the user applies a sort by clicking on a column header.
         */
        readonly sortedColumn: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link sortedColumn} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onSortedColumn(e: CellRangeEventArgs): void;
        /**
         * Occurs before a cell enters edit mode.
         *
         * The 'data' property of the handler parameters contains a reference
         * to the DOM event that caused the grid to enter edit mode.
         *
         * The event handler may cancel the edit operation.
         */
        readonly beginningEdit: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link beginningEdit} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onBeginningEdit(e: CellRangeEventArgs): boolean;
        /**
         * Occurs when an editor cell is created and before it becomes active.
         *
         * The event handler can access the editor element using the grid's
         * {@link activeEditor} property.
         */
        readonly prepareCellForEdit: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link prepareCellForEdit} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onPrepareCellForEdit(e: CellRangeEventArgs): void;
        /**
         * Occurs when a cell edit is ending.
         *
         * You can use this event to perform validation and prevent invalid edits.
         * For example, the code below prevents users from entering values that
         * do not contain the letter 'a'. The code demonstrates how you can obtain
         * the old and new values before the edits are applied.
         *
         * ```typescript
         * function cellEditEnding(flex, e) {
         *
         *   // get old and new values
         *   let oldVal = flex.getCellData(e.row, e.col),
         *       newVal = flex.activeEditor.value;
         *
         *   // cancel edits if newVal doesn't contain 'a'
         *   e.cancel = newVal.indexOf('a') < 0;
         * }
         * ```
         *
         * Setting the {@link CellEditEndingEventArgs.cancel} parameter to
         * true causes the grid to discard the edited value and keep the
         * cell's original value.
         *
         * If you also set the {@link CellEditEndingEventArgs.stayInEditMode}
         * parameter to true, the grid will remain in edit mode so the user
         * can correct invalid entries before committing the edits.
         */
        readonly cellEditEnding: Event<FlexGrid, CellEditEndingEventArgs>;
        /**
         * Raises the {@link cellEditEnding} event.
         *
         * @param e {@link CellEditEndingEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onCellEditEnding(e: CellEditEndingEventArgs): boolean;
        /**
         * Occurs when a cell edit has been committed or canceled.
         */
        readonly cellEditEnded: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link cellEditEnded} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onCellEditEnded(e: CellRangeEventArgs): void;
        /**
         * Occurs before a row enters edit mode.
         */
        readonly rowEditStarting: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link rowEditStarting} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onRowEditStarting(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after a row enters edit mode.
         */
        readonly rowEditStarted: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link rowEditStarted} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onRowEditStarted(e: CellRangeEventArgs): void;
        /**
         * Occurs when a row edit is ending, before the changes are committed or canceled.
         *
         * This event can be used in conjunction with the {@link rowEditStarted} event to
         * implement deep-binding edit undos. For example:
         *
         * ```typescript
         * // save deep bound values when editing starts
         * let itemData = {};
         * s.rowEditStarted.addHandler((s, e) => {
         *   let item = s.collectionView.currentEditItem;
         *   itemData = {};
         *   s.columns.forEach(function (col) {
         *     if (col.binding.indexOf('.') &gt; -1) { // deep binding
         *       let binding = new wijmo.Binding(col.binding);
         *       itemData[col.binding] = binding.getValue(item);
         *     }
         *   })
         * });
         *
         * // restore deep bound values when edits are canceled
         * s.rowEditEnded.addHandler((s, e) => {
         *   if (e.cancel) { // edits were canceled by the user
         *     let item = s.collectionView.currentEditItem;
         *     for (let k in itemData) {
         *       let binding = new wijmo.Binding(k);
         *       binding.setValue(item, itemData[k]);
         *     }
         *   }
         *   itemData = {};
         * });
         * ```
         */
        readonly rowEditEnding: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link rowEditEnding} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onRowEditEnding(e: CellRangeEventArgs): void;
        /**
         * Occurs when a row edit has been committed or canceled.
         */
        readonly rowEditEnded: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link rowEditEnded} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onRowEditEnded(e: CellRangeEventArgs): void;
        /**
         * Occurs when the user creates a new item by editing the new row template
         * (see the {@link allowAddNew} property).
         *
         * The event handler may customize the content of the new item or cancel
         * the new item creation.
         */
        readonly rowAdded: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link rowAdded} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled and the new row should be kept.
         */
        onRowAdded(e: CellRangeEventArgs): boolean;
        /**
         * Occurs when the user is deleting a selected row by pressing the Delete
         * key (see the {@link allowDelete} property).
         *
         * The event handler may cancel the row deletion.
         */
        readonly deletingRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link deletingRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onDeletingRow(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after the user has deleted a row by pressing the Delete
         * key (see the {@link allowDelete} property).
         */
        readonly deletedRow: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link deletedRow} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onDeletedRow(e: CellRangeEventArgs): void;
        /**
         * Occurs when the user is copying the selection content to the
         * clipboard by pressing one of the clipboard shortcut keys
         * (see the {@link autoClipboard} property).
         *
         * The event handler may cancel the copy operation.
         */
        readonly copying: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link copying} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onCopying(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after the user has copied the selection content to the
         * clipboard by pressing one of the clipboard shortcut keys
         * (see the {@link autoClipboard} property).
         */
        readonly copied: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link copied} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onCopied(e: CellRangeEventArgs): void;
        /**
         * Occurs when the user is pasting content from the clipboard by
         * pressing one of the clipboard shortcut keys
         * (see the {@link autoClipboard} property).
         *
         * The 'data' property of the handler parameters contains a copy
         * of the text being pasted into the grid.
         *
         * The event handler may cancel the paste operation.
         */
        readonly pasting: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link pasting} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onPasting(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after the user has pasted content from the
         * clipboard by pressing one of the clipboard shortcut keys
         * (see the {@link autoClipboard} property).
         */
        readonly pasted: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link pasted} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onPasted(e: CellRangeEventArgs): void;
        /**
         * Occurs when the user is pasting content from the clipboard
         * into a cell (see the {@link autoClipboard} property).
         *
         * The 'data' property of the handler parameters contains the
         * text being pasted into the cell.
         *
         * The event handler may cancel the paste operation.
         */
        readonly pastingCell: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link pastingCell} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onPastingCell(e: CellRangeEventArgs): boolean;
        /**
         * Occurs after the user has pasted content from the
         * clipboard into a cell (see the {@link autoClipboard} property).
         *
         * The 'data' property of the handler parameters contains the
         * cell's original value (before the new value was pasted).
         */
        readonly pastedCell: Event<FlexGrid, CellRangeEventArgs>;
        /**
         * Raises the {@link pastedCell} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         */
        onPastedCell(e: CellRangeEventArgs): void;
        /**
         * Occurs when an element representing a cell has been created.
         *
         * This event can be used to format cells for display. It is similar
         * in purpose to the {@link itemFormatter} property, but has the advantage
         * of allowing multiple independent handlers.
         *
         * For example, this code removes the 'wj-wrap' class from cells in
         * group rows:
         *
         * ```typescript
         * flex.formatItem.addHandler((flex, e) => {
         *   if (flex.rows[e.row] instanceof GroupRow) {
         *     wijmo.removeClass(e.cell, 'wj-wrap');
         *   }
         * });
         * ```
         */
        readonly formatItem: Event<FlexGrid, FormatItemEventArgs>;
        /**
         * Raises the {@link formatItem} event.
         *
         * @param e {@link FormatItemEventArgs} that contains the event data.
         */
        onFormatItem(e: FormatItemEventArgs): void;
        /**
         * Occurs when the grid starts creating/updating the elements that
         * make up the current view.
         */
        readonly updatingView: Event<FlexGrid, CancelEventArgs>;
        /**
         * Raises the {@link updatingView} event.
         *
         * @param e {@link CancelEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onUpdatingView(e: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs when the grid finishes creating/updating the elements that
         * make up the current view.
         *
         * The grid updates the view in response to several actions, including:
         *
         * <ul>
         * <li>Refreshing the grid or its data source,</li>
         * <li>Adding, removing, or changing rows or columns,</li>
         * <li>Resizing or scrolling the grid,</li>
         * <li>Changing the selection.</li>
         * </ul>
         */
        readonly updatedView: Event<FlexGrid, EventArgs>;
        /**
         * Raises the {@link updatedView} event.
         */
        onUpdatedView(e?: wijmo.EventArgs): void;
        protected _createSelHdl(): _SelectionHandler;
        _getTabIndex(): number;
        protected _setTabOrder(value: number): void;
        private _updateTabIndex;
        _autoRowHeights(): void;
        _getShowErrors(): boolean;
        _getHasValidation(): boolean;
        _getError(p: GridPanel, r: number, c: number, parsing?: boolean): string | null;
        private _setAria;
        private _setFocus;
        _setFocusNoScroll(e: HTMLElement): void;
        protected _updateDefaultSizes(): number;
        private _getDefaultRowHeight;
        protected _getCollectionView(value: any): wijmo.collections.ICollectionView;
        private _getCanvasContext;
        private _getWidestRow;
        private _getDesiredWidth;
        private _getDesiredHeight;
        _getDesiredRowHeight(panel: GridPanel, r: number, eMeasure: HTMLElement, cache: any): number;
        _getSortRowIndex(): number;
        _getDeleteColumnIndex(): number;
        _getEditColumnIndex(): number;
        _mappedColumns: any;
        private _sortConverter;
        protected _bindGrid(full: boolean): void;
        private _getMap;
        _cvCollectionChanged(sender: any, e: wijmo.collections.NotifyCollectionChangedEventArgs): void;
        private _cvCurrentChanged;
        private _syncSelection;
        private _getRowIndex;
        _getCvIndex(index: number): number;
        private _findRow;
        private _updateLayout;
        private _updateStickyHeaders;
        private _updateScrollHandler;
        _getClipToScreen(): boolean;
        private _scroll;
        private _getCssPage;
        private _updateScrollPosition;
        private _updateContent;
        private _fixScroll;
        private _clearCells;
        _useFrozenDiv(): boolean;
        private _updateFrozenCells;
        _updateMarquee(): void;
        private _getMarqueeRect;
        _bindColumns(): void;
        _getColumnTypes(arr: any[]): wijmo.IBindingInfo[];
        _updateColumnTypes(): void;
        _getMapEditor(row: Row, col: Column): DataMapEditor;
        _getBindingColumn(p: GridPanel, r: Number, c: Column): Column;
        _getBindingColumns(): Column[];
        _getRowsPerItem(): number;
        _isTransposed(): boolean;
        _getRowHeaderPath(): wijmo.Binding;
        _bindRows(): void;
        _addBoundRow(items: any[], index: number): void;
        _addGroupRow(group: wijmo.collections.CollectionViewGroup): void;
        _addNode(items: any[], index: number, level: number): void;
        private _addGroup;
        protected static _getSerializableProperties(obj: any): string[];
        _hasColumnGroups(): boolean;
        _getColumnGroup(r: number, c: number): Column & _ColumnGroupProperties;
        _canMoveColumnGroup(srcRow: number, srcCol: number, dstRow: number, dstCol: number): boolean;
        _moveColumnGroup(srcRow: number, srcCol: number, dstRow: number, dstCol: number, child: boolean): boolean;
        _copy(key: string, value: any): boolean;
        _isInputElement(e: any): boolean;
        _isNativeCheckbox(edt: any): boolean;
        _wantsInput(e: any): boolean;
        private static _maxCssHeight;
        private static _getMaxSupportedCssHeight;
        static _rtlMode: string;
        private static _getRtlMode;
    }
}
declare module wijmo.grid {
    /**
     * Implements a hidden input element so users can choose IME modes when
     * the FlexGrid has the focus.
     */
    class _ImeHandler {
        _g: FlexGrid;
        _tbx: HTMLInputElement;
        _updateImeFocusAsyncBnd: any;
        _cmpstartBnd: any;
        _keypressBnd: any;
        _maskProvider: wijmo._MaskProvider;
        _toFocus: any;
        static _cssHidden: {
            position: string;
            width: string;
            left: number;
            top: number;
            overflow: string;
        };
        /**
         * Initializes a new instance of the {@link _ImeHandler} class
         * and attaches it to a {@link FlexGrid}.
         *
         * @param g {@link FlexGrid} that this {@link _ImeHandler} will be attached to.
         */
        constructor(g: FlexGrid);
        /**
         * Disposes of this {@link _ImeHandler}.
         */
        dispose(): void;
        _compositionstart(evt: any): void;
        _cellEditEnding(): void;
        _cellEditEnded(): void;
        _keypress(e: KeyboardEvent): void;
        _updateImeFocus(): void;
        _updateImeFocusAsync(): void;
        _enableIme(): boolean;
    }
}
declare module wijmo.grid {
    /**
     * Manages the new row template used to add rows to the grid.
     */
    class _AddNewHandler {
        protected _g: FlexGrid;
        protected _nrt: _NewRowTemplate;
        protected _top: boolean;
        protected _keydownBnd: any;
        protected _committing: boolean;
        private _pasting;
        /**
         * Initializes a new instance of the {@link _AddNewHandler} class.
         *
         * @param g {@link FlexGrid} that owns this {@link _AddNewHandler}.
         */
        constructor(g: FlexGrid);
        /**
         * Gets or sets a value that indicates whether the new row template
         * should be located at the top of the grid or at the bottom.
         */
        newRowAtTop: boolean;
        /**
         * Updates the new row template to ensure it's visible only if the
         * grid is bound to a data source that supports adding new items,
         * and that it is in the right position.
         */
        updateNewRowTemplate(): void;
        _attach(): void;
        _detach(): void;
        _keydown(e: KeyboardEvent): void;
        _beginningEdit(s: FlexGrid, e: CellRangeEventArgs): void;
        _pastingData(s: FlexGrid, e: CellRangeEventArgs): void;
        _pastedData(s: FlexGrid, e: CellRangeEventArgs): void;
        _rowEditStarting(s: FlexGrid, e: CellRangeEventArgs): void;
        _rowEditEnding(s: FlexGrid, e: CellRangeEventArgs): void;
        _rowEditEnded(s: FlexGrid, e: CellRangeEventArgs): void;
        private _handleEditStarting;
    }
    /**
     * Represents a row template used to add items to the source collection.
     */
    class _NewRowTemplate extends Row {
    }
}
declare module wijmo.grid {
    /**
     * Specifies constants that define which areas of the grid support cell merging.
     */
    enum AllowMerging {
        /** No merging. */
        None = 0,
        /** Merge scrollable cells. */
        Cells = 1,
        /** Merge column headers. */
        ColumnHeaders = 2,
        /** Merge row headers. */
        RowHeaders = 4,
        /** Merge column and row headers. */
        AllHeaders = 6,
        /** Merge all areas. */
        All = 7
    }
    /**
     * Defines the {@link FlexGrid}'s cell merging behavior.
     *
     * An instance of this class is automatically created and assigned to
     * the grid's {@link FlexGrid.mergeManager} property to implement the
     * grid's default merging behavior.
     *
     * If you want to customize the default merging behavior, create a class
     * that derives from {@link MergeManager} and override the {@link getMergedRange}
     * method.
     */
    class MergeManager {
        /**
         * Initializes a new instance of the {@link MergeManager} class.
         *
         * @param grid FlexGrid that owns this {@link MergeManager}.
         * This parameter is optional and deprecated. Please don't use it.
         */
        constructor(grid?: FlexGrid);
        /**
         * Gets a {@link CellRange} that specifies the merged extent of a cell
         * in a {@link GridPanel}.
         *
         * @param p The {@link GridPanel} that contains the range.
         * @param r The index of the row that contains the cell.
         * @param c The index of the column that contains the cell.
         * @param clip Whether to clip the merged range to the grid's current view range.
         * @return A {@link CellRange} that specifies the merged range, or null if the cell is not merged.
         */
        getMergedRange(p: GridPanel, r: number, c: number, clip?: boolean): CellRange | null;
        private _mergeCell;
    }
}
declare module wijmo.grid {
    /**
     * Contains information about the part of a {@link FlexGrid} control
     * at a given position on the page.
     */
    class HitTestInfo {
        _g: FlexGrid;
        _p: GridPanel;
        _pt: wijmo.Point;
        _target: Element;
        _row: number;
        _col: number;
        _rng: CellRange;
        _edge: number;
        static _SZEDGE: number[];
        /**
         * Initializes a new instance of the {@link wijmo.grid.HitTestInfo} class.
         *
         * @param grid The {@link FlexGrid} control, {@link GridPanel}, or cell element
         * to investigate.
         * @param pt The {@link Point} object in page coordinates to investigate.
         */
        constructor(grid: any, pt: any);
        /**
         * Gets the point in control coordinates that this {@link wijmo.grid.HitTestInfo} refers to.
         */
        readonly point: wijmo.Point;
        /**
         * Gets the type of cell found at the specified position.
         */
        readonly cellType: CellType;
        /**
         * Gets the {@link GridPanel} that this {@link HitTestInfo} refers to.
         */
        readonly panel: GridPanel;
        /**
         * Gets the {@link FlexGrid} that this {@link HitTestInfo} refers to.
         */
        readonly grid: FlexGrid;
        /**
         * Gets the index of the row at the specified position.
         *
         * To get the {@link Row} object, use the {@link getRow} method.
         */
        readonly row: number;
        /**
         * Gets the {@link Row} object object at the specified position.
         *
         * To get the row index, use the {@link row} property.
         */
        getRow(): Row;
        /**
         * Gets the index of the column at the specified position.
         *
         * To get the {@link Column} object, use the {@link getColumn} method.
         */
        readonly col: number;
        /**
         * Gets the {@link Column} object at the specified position.
         *
         * To get the column index, use the {@link col} property.
         *
         * @param binding Whether to get the column by index or by binding.
         * This parameter only makes a difference in grids that have multiple
         * rows per data item (like the {@link MultiRow} grid).
         */
        getColumn(binding?: boolean): Column;
        /**
         * Gets the cell range at the specified position.
         */
        readonly range: CellRange;
        /**
         * Gets a value that indicates whether the mouse is near the left edge of the cell.
         */
        readonly edgeLeft: boolean;
        /**
         * Gets a value that indicates whether the mouse is near the top edge of the cell.
         */
        readonly edgeTop: boolean;
        /**
         * Gets a value that indicates whether the mouse is near the right edge of the cell.
         */
        readonly edgeRight: boolean;
        /**
         * Gets a value that indicates whether the mouse is very near the right edge of the cell.
         */
        readonly edgeFarRight: boolean;
        /**
         * Gets a value that indicates whether the mouse is near the bottom edge of the cell.
         */
        readonly edgeBottom: boolean;
        /**
         * Gets a value that indicates whether the mouse is very near the bottom edge of the cell.
         */
        readonly edgeFarBottom: boolean;
        /**
         * Gets the target element used to create this {@link HitTestInfo}.
         */
        readonly target: Element;
    }
}
declare module wijmo.grid {
    function softInput(): typeof wijmo.input;
}
declare module wijmo.grid {
    /**
     * Creates HTML elements that represent cells within a {@link FlexGrid} control.
     */
    class CellFactory {
        static _WJC_RADIOMAP: string;
        static _WJC_CHECKBOX: string;
        static _WJC_COLLAPSE: string;
        static _WJC_DROPDOWN: string;
        static _WJC_PIN: string;
        static _ddBtn: HTMLElement;
        static _tplDdBtn: string;
        static _tplCtx: ICellTemplateContext;
        static _fmtItemArgs: FormatItemEventArgs;
        /**
         * Creates or updates a cell in the grid.
         *
         * @param p The {@link GridPanel} that contains the cell.
         * @param r The index of the row that contains the cell.
         * @param c The index of the column that contains the cell.
         * @param cell The element that represents the cell.
         * @param rng The {@link CellRange} object that contains the cell's
         * merged range, or null if the cell is not merged.
         * @param updateContent Whether to update the cell's content as
         * well as its position and style.
         */
        updateCell(p: GridPanel, r: number, c: number, cell: HTMLElement, rng?: CellRange, updateContent?: boolean): void;
        /**
         * Disposes of a cell element and releases all resources associated with it.
         *
         * @param cell The element that represents the cell.
         */
        disposeCell(cell: HTMLElement): void;
        /**
         * Gets the value of the editor currently being used.
         *
         * @param g {@link FlexGrid} that owns the editor.
         */
        getEditorValue(g: FlexGrid): any;
    }
}
declare module wijmo.grid {
    /**
     * Handles the grid's editing.
     */
    class _EditHandler {
        _g: FlexGrid;
        _rng: CellRange;
        _edt: HTMLInputElement;
        _edtValue: string;
        _edItem: any;
        _edtCanceled: boolean;
        _lbx: wijmo.input.ListBox;
        _list: any;
        _fullEdit: boolean;
        _evtInput: any;
        _evtChange: any;
        _cstEdtValue: any;
        _validating: boolean;
        static _msgRequired: string;
        static _msgBadInput: string;
        /**
         * Initializes a new instance of the {@link _EditHandler} class.
         *
         * @param g {@link FlexGrid} that owns this {@link _EditHandler}.
         */
        constructor(g: FlexGrid);
        /**
         * Starts editing a given cell.
         *
         * @param fullEdit Whether to stay in edit mode when the user presses the cursor keys. Defaults to false.
         * @param r Index of the row to be edited. Defaults to the currently selected row.
         * @param c Index, name, or binding of the column to be edited. Defaults to the currently selected column.
         * @param focus Whether to give the editor the focus. Defaults to true.
         * @param evt Event that triggered this action (usually a keypress or keydown).
         * @return True if the edit operation started successfully.
         */
        startEditing(fullEdit?: boolean, r?: number, c?: number | string, focus?: boolean, evt?: any): boolean;
        /**
         * Commits any pending edits and exits edit mode.
         *
         * @param cancel Whether pending edits should be canceled or committed.
         * @return True if the edit operation finished successfully.
         */
        finishEditing(cancel?: boolean): boolean;
        _setCustomEditorValue(value: any): void;
        _setCellError(cell: HTMLElement, error: string): void;
        /**
         * Gets the **HTMLInputElement** that represents the cell editor currently active.
         */
        readonly activeEditor: HTMLInputElement;
        /**
         * Gets a {@link CellRange} that identifies the cell currently being edited.
         */
        readonly editRange: CellRange;
        /**
         * Gets the content of a {@link CellRange} as a string suitable for
         * copying to the clipboard.
         *
         * Hidden rows and columns are not included in the clip string.
         *
         * @param rng {@link CellRange} to copy. If omitted, the current selection is used.
         * @param options {@link ClipStringOptions} that specifies options for the clip string
         * to be generated.
         * @param colHdrs Whether to include the column headers.
         * @param rowHdrs Whether to include the row headers.
         */
        getClipString(rng: CellRange, options: ClipStringOptions, colHdrs?: boolean, rowHdrs?: boolean): string;
        _getRowClipString(p: GridPanel, r: number, rng: CellRange, options: ClipStringOptions, rh: boolean): string;
        protected _skipMergedCell(p: GridPanel, rng: CellRange, r: number, c: number): boolean;
        protected _getCellClipString(cell: any, options: ClipStringOptions): string;
        _sameRows(ranges: CellRange[]): boolean;
        _sameCols(ranges: CellRange[]): boolean;
        /**
         * Parses a string into rows and columns and applies the content to a given range.
         *
         * Hidden rows and columns are skipped.
         *
         * @param text Tab and newline delimited text to parse into the grid.
         * @param rng {@link CellRange} to use when pasting the data. If omitted, the current selection is used.
         */
        setClipString(text: string, rng?: CellRange): boolean;
        _deferPaste(rng: CellRange, cnt: number): boolean;
        _parseClipString(text: string): string[][];
        private _parseClipCell;
        _expandClipRows(rows: string[][], rng: CellRange): void;
        private _updateEditorCell;
        private _updateRowHeaderCell;
        private _updateCell;
        private _getValidationError;
        _getRequiredMsg(): string;
        _getBadInputMsg(): string;
        _allowEdit(r?: number, c?: number): boolean;
        _commitRowEdits(): void;
        _keydown(e: KeyboardEvent): boolean;
        private _keydownListBox;
        _keypress(e: KeyboardEvent): void;
        _findString(items: string[], text: string, caseSensitive: boolean): number;
        _toggleListBox(evt: any, rng?: CellRange): boolean;
        private _createListBox;
        private _removeListBox;
    }
}
declare module wijmo.grid {
    /**
     * Class used to implement custom grid editors.
     */
    class _CustomEditor {
        _g: FlexGrid;
        _col: Column;
        _ctl: wijmo.Control;
        _tbx: HTMLInputElement;
        _prop: string;
        _isDropDown: boolean;
        _isComboBox: boolean;
        _isAutoComplete: boolean;
        _isInputDateTime: boolean;
        _isInputMask: boolean;
        _updateFocusBnd: any;
        _keydownBnd: any;
        _cmpstartBnd: any;
        _mousedownBnd: any;
        static _cssHidden: {
            position: string;
            left: number;
            top: number;
            width: string;
            height: string;
            overflow: string;
            border: string;
        };
        static _cssVisible: {
            position: string;
            left: number;
            top: number;
            width: string;
            height: string;
        };
        /**
         * Initializes a new instance of a {@link _CustomEditor}.
         *
         * @param col {@link Column} that owns this {@link _CustomEditor}.
         * @param control {@link Control} to be used as an editor for the specified column.
         */
        constructor(col: Column, control: wijmo.Control);
        /**
         * Gets a reference to the {@link FlexGrid} that owns this {@link _CustomEditor}.
         */
        readonly grid: FlexGrid;
        /**
         * Gets a reference to the {@link Column} this {@link _CustomEditor} is connected to.
         */
        readonly column: Column;
        /**
         * Gets a reference to the {@link Control} used as a custom editor by this {@link _CustomEditor}.
         */
        readonly control: wijmo.Control;
        /**
         * Disposes of this {@link _CustomEditor}, disconnecting it from the original column.
         */
        dispose(): void;
        private _connect;
        private _disconnect;
        private _prepareCellForEdit;
        private _cellEditEnding;
        private _cellEditEnded;
        private _cmpstart;
        private _keydown;
        private _checkColumn;
        private _mousedown;
        private _activateEditor;
        private _showEditor;
        private _hideEditor;
        private _updateFocus;
        private _initImeEditInput;
        private static _setSelectionRange;
        private _imeEditor;
    }
}
declare module wijmo.grid {
    /**
     * Specifies constants that define the action to perform when special
     * keys such as ENTER and TAB are pressed.
     */
    enum KeyAction {
        /** No special action (let the browser handle the key). */
        None = 0,
        /** Move the selection to the next row. */
        MoveDown = 1,
        /** Move the selection to the next column. */
        MoveAcross = 2,
        /** Move the selection to the next column, then wrap to the next row. */
        Cycle = 3,
        /** Move the selection to the next column, then wrap to the next row, then out of the control. */
        CycleOut = 4,
        /** Move the selection to the next editable column, then wrap to the next row. */
        CycleEditable = 5
    }
    /**
     * Handles the grid's keyboard commands.
     */
    class _KeyboardHandler {
        _g: FlexGrid;
        _kaTab: KeyAction;
        _kaEnter: KeyAction;
        _search: string;
        _toSearch: any;
        /**
         * Initializes a new instance of the {@link _KeyboardHandler} class.
         *
         * @param g {@link FlexGrid} that owns this {@link _KeyboardHandler}.
         */
        constructor(g: FlexGrid);
        _keydown(e: KeyboardEvent): void;
        _performKeyAction(action: KeyAction, shift: boolean): boolean;
        private _keypress;
        private _findNext;
        private _moveSel;
        private _deleteSel;
        private _deleteRange;
        private _startEditing;
    }
}
declare module wijmo.grid {
    /**
     * Specifies constants that define the row/column sizing behavior.
     */
    enum AllowResizing {
        /** The user may not resize rows or columns. */
        None = 0,
        /** The user may resize columns by dragging the edge of the column headers. */
        Columns = 1,
        /** The user may resize rows by dragging the edge of the row headers. */
        Rows = 2,
        /** The user may resize rows and columns by dragging the edge of the headers. */
        Both = 3,
        /** The user may resize columns by dragging the edge of any cell. */
        ColumnsAllCells,
        /** The user may resize rows by dragging the edge of any cell. */
        RowsAllCells,
        /** The user may resize rows and columns by dragging the edge of any cell. */
        BothAllCells
    }
    /**
     * Specifies constants that define the row/column auto-sizing behavior.
     */
    enum AutoSizeMode {
        /** Autosizing is disabled. */
        None = 0,
        /** Autosizing accounts for header cells. */
        Headers = 1,
        /** Autosizing accounts for data cells. */
        Cells = 2,
        /** Autosizing accounts for header and data cells. */
        Both = 3
    }
    /**
     * Specifies constants that define the row/column dragging behavior.
     */
    enum AllowDragging {
        /** The user may not drag rows or columns. */
        None = 0,
        /** The user may drag columns. */
        Columns = 1,
        /** The user may drag rows. */
        Rows = 2,
        /** The user may drag rows and columns. */
        Both = 3
    }
    /**
     * Handles the grid's mouse commands.
     */
    class _MouseHandler {
        _g: FlexGrid;
        _htDown: HitTestInfo;
        _htDrag: HitTestInfo;
        _selDown: CellRange;
        _isDown: boolean;
        _eMouse: MouseEvent;
        _lbSelState: boolean;
        _szRowCol: RowCol;
        _szStart: number;
        _szArgs: CellRangeEventArgs;
        _dragSrc: any;
        _dvMarker: HTMLElement;
        _rngTarget: CellRange;
        _updating: boolean;
        _ignoreClick: boolean;
        _chldColGrpMarker: boolean;
        static _SZ_MIN: number;
        static _SZ_MAX_COLGRP_EDGE: number;
        /**
         * Initializes a new instance of the {@link _MouseHandler} class.
         *
         * @param g {@link FlexGrid} that owns this {@link _MouseHandler}.
         */
        constructor(g: FlexGrid);
        /**
         * Resets the mouse state.
         */
        resetMouseState(): void;
        private _mousedown;
        private _mousemove;
        private _mouseup;
        private _click;
        private _handleClick;
        private _hasRadioMap;
        private _clickSort;
        private _clickPin;
        private _dblclick;
        private _hover;
        private _getResizeColHt;
        private _getResizeRowHt;
        _getResizeCol(panel: GridPanel, index: number, previous?: boolean): Column;
        _getResizeRow(panel: GridPanel, index: number, previous?: boolean): Row;
        private _asResizable;
        private _mouseSelect;
        private _handleResizing;
        private _dragstart;
        private _dragend;
        private _dragover;
        private _drop;
        private _hitTest;
        private _showResizeMarker;
        private _showDragMarker;
        private _finishResizing;
        private _handleSelection;
        private _splitRange;
    }
}
declare module wijmo.grid {
}
