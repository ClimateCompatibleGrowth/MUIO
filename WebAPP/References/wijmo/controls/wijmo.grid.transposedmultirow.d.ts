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
declare module wijmo.grid.transposedmultirow {
    /**
     * Extends the {@link Row} class to provide additional API for multi-row records.
     */
    class _MultiRow extends wijmo.grid.Row {
        _idxData: number;
        /**
         * Initializes a new instance of the {@link Row} class.
         *
         * @param dataItem The data item this row is bound to.
         * @param dataIndex The index of the record within the items source.
         */
        constructor(dataItem: any, dataIndex: number);
    }
}
declare module wijmo.grid.transposedmultirow {
    /**
     * Extends the {@link Column} class with <b>colspan</b> property to
     * describe a cell in a {@link _CellGroup}.
     */
    class _Cell extends wijmo.grid.Column {
        _row: number;
        _col: number;
        _colspan: number;
        _rowspan: number;
        /**
         * Initializes a new instance of the {@link _Cell} class.
         *
         * @param options JavaScript object containing initialization data for the {@link _Cell}.
         */
        constructor(options?: any);
        /**
         * Gets or sets the row index of this {@link _Cell} within the cell group.
         */
        row: number;
        /**
         * Gets or sets the column index of this {@link _Cell} within the cell group.
         */
        col: number;
        /**
         * Gets or sets the number of physical columns spanned by the {@link _Cell}.
         */
        colspan: number;
        /**
         * Gets or sets the number of physical rows spanned by the {@link _Cell}.
         */
        rowspan: number;
    }
}
declare module wijmo.grid.transposedmultirow {
    /**
     * Describes a group of cells that may span multiple rows and columns.
     */
    class _CellGroup extends _Cell {
        _g: TransposedMultiRow;
        _layout: _MultiRowLayout;
        _colstart: number;
        _rowstart: number;
        _cells: _Cell[];
        _cols: wijmo.grid.ColumnCollection;
        _rng: wijmo.grid.CellRange[];
        /**
         * Initializes a new instance of the {@link _CellGroup} class.
         *
         * @param layout {@link _Layout} that owns the {@link _CellGroup}.
         * @param options JavaScript object containing initialization data for the new {@link _CellGroup}.
         */
        constructor(layout: _MultiRowLayout, options?: any);
        _copy(key: string, value: any): boolean;
        readonly cells: _Cell[];
        closeGroup(columnsPerItem: number): void;
        getMergedRange(p: wijmo.grid.GridPanel, r: number, c: number): wijmo.grid.CellRange;
        getBindingColumn(p: wijmo.grid.GridPanel, r: number, c: number): wijmo.grid.Column;
        _cellFits(cell: _Cell, index: number, r: number, c: number): boolean;
        _slotTaken(r: number, c: number, index?: number): boolean;
        _updateCellTypes(item: any): void;
    }
}
declare module wijmo.grid.transposedmultirow {
    /**
     * Provides custom merging for {@link TransposedMultiRow} controls.
     */
    class _MergeManager extends wijmo.grid.MergeManager {
        /**
         * Gets a {@link CellRange} that specifies the merged extent of a cell
         * in a {@link GridPanel}.
         *
         * @param p The {@link GridPanel} that contains the range.
         * @param r The index of the row that contains the cell.
         * @param c The index of the column that contains the cell.
         * @param clip Specifies whether to clip the merged range to the grid's current view range.
         * @return A {@link CellRange} that specifies the merged range, or null if the cell is not merged.
         */
        getMergedRange(p: wijmo.grid.GridPanel, r: number, c: number, clip?: boolean): wijmo.grid.CellRange;
    }
}
declare module wijmo.grid.transposedmultirow {
    /**
     * Class that parses {@link TransposedMultiRow} layout definitions.
     */
    class _MultiRowLayout {
        _grid: TransposedMultiRow;
        _columnsPerItem: number;
        _bindingGroups: _CellGroup[];
        _groupsByRow: any;
        /**
         * Initializes a new instance of the {@link _LayoutDef} class.
         *
         * @param grid {@link TransposedMultiRow} that owns this layout.
         * @param layoutDef Array that contains the layout definition.
         */
        constructor(grid: TransposedMultiRow, layoutDef: any[]);
        readonly totalRowSpan: number;
        private _parseCellGroups;
        _getGroupByRow(r: number): _CellGroup;
        _getGroupIndexByRow(r: number): any;
        _updateCellTypes(item: any): void;
    }
}
declare module wijmo.grid.transposedmultirow {
    /**
     * Extends the {@link FlexGrid} control to display data using a transposed
     * layout, where columns represent data items and rows represent item
     * properties. Also this control allows to display each item in multiple columns.
     *
     * Use the {@link layoutDefinition} property to define the layout of the
     * rows used to display each data item.
     *
     * Please note that the {@link TransposedMultiRow} control does not support
     * some {@link FlexGrid} properties. These properties are disabled, so changing
     * these properties will have no effect. The list of disabled properties
     * includes the following:
     *
     * {@link FlexGrid.allowAddNew}, {@link FlexGrid.allowDelete},
     * {@link FlexGrid.allowDragging}, {@link FlexGrid.allowPinning},
     * {@link FlexGrid.allowSorting}, {@link FlexGrid.columnLayout},
     * {@link Column.width}, {@link FlexGridFilter}, {@link Selector}.
     */
    class TransposedMultiRow extends wijmo.grid.FlexGrid {
        private _currentPos;
        _layoutDef: any[];
        _layout: _MultiRowLayout;
        _bindingColumns: any;
        protected _view: wijmo.collections.ICollectionView;
        protected _keyPrefix: string;
        _rowInfo: wijmo.grid.ColumnCollection;
        /**
         * Initializes a new instance of the {@link TransposedMultiRow} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        /**
         * Gets or sets an array that defines the layout of each data item.
         *
         * The array contains a list of cell group objects which have the following properties:
         *
         * <ul>
         * <li><b>header</b>: Group header (shown when the headers are collapsed).</li>
         * <li><b>colspan</b>: Number of grid columns spanned by the group.</li>
         * <li><b>cells</b>: Array of cell objects, which extend {@link Column} with a
         * <b>colspan</b> property.</li>
         * </ul>
         *
         * When the {@link layoutDefinition} property is set, the grid scans the cells in each
         * group as follows:
         *
         * <ol>
         * <li>The grid calculates the <b>colspan</b> of the group either as group's own <b>colspan</b>
         * or as span of the widest cell in the group, whichever is wider.</li>
         * <li>If the cell fits the current row within the group, it is added to the current row.</li>
         * <li>If it doesn't fit, it is added to a new row.</li>
         * </ol>
         *
         * When all groups are ready, the grid calculates the number of columns per record to the maximum
         * <b>colspan</b> of all groups, and adds columns to each group to pad their width as needed.
         *
         * Please note that the cells support all the usual {@link Column} properties except
         * the <b>width</b> property. This property can be specified in the {@link layoutDefinition} object
         * but the grid will ignore it because it is supposed that the cells in each rows should have
         * the same width.
         */
        layoutDefinition: any[];
        /**
         * Gets the {@link Column} object used to bind a data item to a grid cell.
         *
         * @param p {@link GridPanel} that contains the cell.
         * @param r Index of the row that contains the cell.
         * @param c Index of the column that contains the cell.
         */
        getBindingColumn(p: wijmo.grid.GridPanel, r: number, c: number): wijmo.grid.Column;
        /**
         * Gets the number of columns used to display each item.
         *
         * This value is calculated automatically based on the value
         * of the <b>layoutDefinition</b> property.
         */
        readonly columnsPerItem: number;
        allowAddNew: boolean;
        allowDelete: boolean;
        allowDragging: wijmo.grid.AllowDragging;
        allowPinning: boolean;
        allowSorting: wijmo.grid.AllowSorting;
        columnLayout: string;
        refresh(fullUpdate?: boolean): void;
        onLoadedRows(e?: wijmo.EventArgs): void;
        _getGroupByRow(r: number): _CellGroup;
        _addBoundRow(items: any[], index: number): void;
        _updateColumnTypes(): void;
        _getBindingColumn(p: wijmo.grid.GridPanel, r: number, c: wijmo.grid.Column): wijmo.grid.Column;
        _isTransposed(): boolean;
        onRowEditEnded(e: wijmo.grid.CellRangeEventArgs): void;
        protected _getCollectionView(value: any): wijmo.collections.ICollectionView;
        private _rowInfoChanged;
        private _formatItem;
        private _sourceViewChanged;
        private _transposeItemsSource;
        private _createKeys;
        private _supportsProxies;
        private _createProxy;
        private _createTransposedObject;
        private _getRowInfo;
    }
}
declare module wijmo.grid.transposedmultirow {
}
