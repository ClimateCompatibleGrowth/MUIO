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
declare module wijmo.grid.filter {
    /**
     * Specifies types of column filter.
     */
    enum FilterType {
        /** No filter. */
        None = 0,
        /** A filter based on two conditions. */
        Condition = 1,
        /** A filter based on a set of values. */
        Value = 2,
        /** A filter that combines condition and value filters. */
        Both = 3
    }
    /**
     * Implements an Excel-style filter for {@link FlexGrid} controls.
     *
     * To enable filtering on a {@link FlexGrid} control, create an instance
     * of the {@link FlexGridFilter} and pass the grid as a parameter to the
     * constructor. For example:
     *
     * ```typescript
     * import { FlexGrid } from '@grapecity/wijmo.grid';
     * import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
     * let flex = new FlexGrid('#theGrid'); // create the grid
     * let filter = new FlexGridFilter(flex); // add a filter to the grid
     * ```
     *
     * Once this is done, a filter icon is added to the grid's column headers.
     * Clicking the icon shows an editor where the user can edit the filter
     * conditions for that column.
     *
     * The {@link FlexGridFilter} class depends on the **wijmo.grid** and
     * **wijmo.input** modules.
     *
     * The example below shows how you can use a {@link FlexGridFilter} to add
     * filtering to a {@link FlexGrid} control:
     *
     * {@sample Grid/FilteringSearching/Excel-likeFilter/Overview/purejs Example}
     */
    class FlexGridFilter {
        static _WJC_FILTER: string;
        private _g;
        private _filters;
        private _filterColumns;
        private _divEdt;
        private _edtCol;
        private _edtColPrev;
        private _showIcons;
        private _showSort;
        private _defFilterType;
        private _xValueSearch;
        static _skipColumn: wijmo.grid.Column;
        /**
         * Initializes a new instance of the {@link FlexGridFilter} class.
         *
         * @param grid The {@link FlexGrid} to filter.
         * @param options Initialization options for the {@link FlexGridFilter}.
         */
        constructor(grid: wijmo.grid.FlexGrid, options?: any);
        /**
         * Gets a reference to the {@link FlexGrid} that owns this filter.
         */
        readonly grid: wijmo.grid.FlexGrid;
        /**
         * Gets or sets an array containing the names or bindings of the columns
         * that have filters.
         *
         * Setting this property to null or to an empty array adds filters to
         * all columns.
         */
        filterColumns: string[];
        /**
         * Gets or sets a value indicating whether the {@link FlexGridFilter} adds filter
         * editing buttons to the grid's column headers.
         *
         * If you set this property to false, then you are responsible for providing
         * a way for users to edit, clear, and apply the filters.
         *
         * The default value for this property is **true**.
         */
        showFilterIcons: boolean;
        /**
         * Gets or sets a value indicating whether the filter editor should include
         * sort buttons.
         *
         * By default, the editor shows sort buttons like Excel does. But since users
         * can sort columns by clicking their headers, sort buttons in the filter editor
         * may not be desirable in some circumstances.
         *
         * The default value for this property is **true**.
         */
        showSortButtons: boolean;
        /**
         * Gets the filter for the given column.
         *
         * @param col The {@link Column} that the filter applies to (or column name or index).
         * If the specified column does not exist, the method returns null.
         * @param create Whether to create the filter if it does not exist.
         */
        getColumnFilter(col: wijmo.grid.Column | string | number, create?: boolean): ColumnFilter;
        /**
         * Gets or sets the default filter type to use.
         *
         * This value can be overridden in filters for specific columns.
         * For example, the code below creates a filter that filters by
         * conditions on all columns except the "ByValue" column:
         *
         * ```typescript
         * import { FlexGridFilter, FilterType } from '@grapecity/wijmo.grid.filter';
         * let filter = new FlexGridFilter(flex);
         * filter.defaultFilterType = FilterType.Condition;
         * let col = flex.getColumn('ByValue'),
         *     cf = filter.getColumnFilter(col);
         * cf.filterType = FilterType.Value;
         * ```
         *
         * The default value for this property is **FilterType.Both**.
         */
        defaultFilterType: FilterType;
        /**
         * Gets or sets a value that determines whether the filter should
         * include only values selected by the {@link ValueFilter.filterText}
         * property.
         *
         * The default value for this property is **true**, which matches
         * Excel's behavior.
         *
         * Set it to false to disable this behavior, so searching only affects
         * which items are displayed on the list and not which items are
         * included in the filter.
         */
        exclusiveValueSearch: boolean;
        /**
         * Gets or sets the current filter definition as a JSON string.
         *
         * The {@link filterDefinition} includes information about all
         * currently active column filters. It does not include data maps
         * because data maps are not serializable.
         */
        filterDefinition: string;
        /**
         * Gets the active {@link ColumnFilterEditor}.
         *
         * This property allows you to customize the filter editor when
         * handling the {@link filterChanging} event.
         * It returns null when no filters are being edited.
         */
        readonly activeEditor: ColumnFilterEditor;
        /**
         * Shows the filter editor for the given grid column.
         *
         * @param col The {@link Column} that contains the filter to edit.
         * @param ht A {@link wijmo.grid.HitTestInfo} object containing the range of the cell
         * that triggered the filter display.
         * @param ref An HTMLElement to use as a reference for positioning the editor.
         */
        editColumnFilter(col: any, ht?: wijmo.grid.HitTestInfo, ref?: HTMLElement): void;
        _setAriaExpanded(cell: HTMLElement, value: boolean): void;
        /**
         * Closes the filter editor.
         */
        closeEditor(): void;
        /**
         * Applies the current column filters to the grid.
         */
        apply(): void;
        /**
         * Clears all column filters.
         */
        clear(): void;
        /**
         * Occurs after the filter is applied.
         */
        readonly filterApplied: Event<FlexGridFilter, EventArgs>;
        /**
         * Raises the {@link filterApplied} event.
         */
        onFilterApplied(e?: wijmo.EventArgs): void;
        /**
         * Occurs when a column filter is about to be edited by the user.
         * Use this event to customize the column filter if you want to
         * override the default settings for the filter.
         *
         * This event fires before the filter editor is created, so the
         * {@link activeEditor} property is null at this point.
         * If you want to customize the editor, use the {@link filterChanging}
         * event.
         *
         * For example, the code below customizes the list of country names
         * in the value filter editor so "Italy" is always the first value:
         *
         * ```typescript
         * new FlexGridFilter(theGrid, {
         *     editingFilter: (s, e) => {
         *         if (e.getColumn().binding == 'country') {
         *
         *             // start with Italy
         *             let vals = ["Italy"];
         *
         *             // append other unique values (except Italy)
         *             let valueFilter = s.getColumnFilter("country", true).valueFilter;
         *             valueFilter.uniqueValues = null;
         *             valueFilter.getUniqueValues().forEach(item => {
         *                 if (item.text != "Italy") {
         *                     vals.push(item.text);
         *                 }
         *             });
         *
         *             // assign custom unique value list to the valueFilter
         *             valueFilter.uniqueValues = vals;
         *             valueFilter.sortValues = false;
         *         }
         *     }
         * });
         * ```
         */
        readonly editingFilter: Event<FlexGridFilter, EventArgs>;
        /**
         * Raises the {@link editingFilter} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onEditingFilter(e: wijmo.grid.CellRangeEventArgs): boolean;
        /**
         * Occurs when a column filter is about to be edited by the user.
         *
         * Use this event to customize the filter editor if you want to
         * override its default settings.
         * You can use the {@link activeEditor} property to get a reference
         * to the currently active filter editor.
         *
         * For example, the code below applies a custom sort to the list of
         * country names in the value filter editor so "Italy" is always the
         * first value:
         *
         * ```typescript
         * new FlexGridFilter(theGrid, {
         *     filterChanging: (s, e) => {
         *         if (e.getColumn().binding == "country") {
         *             let edt = s.activeEditor,
         *                 lbHost = edt.hostElement.querySelector('[wj-part=div-values]'),
         *                 lb = Control.getControl(lbHost) as ListBox;
         *             (lb.collectionView as CollectionView).sortComparer = (a: any, b: any) => {
         *                 if (a != b) { // sort Italy first
         *                     if (a == 'Italy') return -1;
         *                     if (b == 'Italy') return +1;
         *                 }
         *                 return null; // use default sort order
         *             }
         *             lb.collectionView.refresh();
         *         }
         *     },
         * });
         * ```
         */
        readonly filterChanging: Event<FlexGridFilter, CellRangeEventArgs>;
        /**
         * Raises the {@link filterChanging} event.
         *
         * @param e {@link CellRangeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onFilterChanging(e: wijmo.grid.CellRangeEventArgs): boolean;
        /**
         * Occurs after a column filter has been edited by the user.
         *
         * Use the event parameters to determine the column that owns
         * the filter and whether changes were applied or canceled.
         */
        readonly filterChanged: Event<FlexGridFilter, CellRangeEventArgs>;
        /**
         * Raises the {@link filterChanged} event.
         */
        onFilterChanged(e: wijmo.grid.CellRangeEventArgs): void;
        _asColumn(col: wijmo.grid.Column | string | number): wijmo.grid.Column;
        private _filter;
        private _formatItem;
        _addFilterButton(col: wijmo.grid.Column, cf: ColumnFilter, cell: HTMLElement): void;
        _mousedown(e: MouseEvent): void;
        _click(e: MouseEvent): void;
        private _toggleEditor;
        _keydown(e: KeyboardEvent): void;
    }
}
declare module wijmo.grid.filter {
    /**
     * Defines a filter for a column on a {@link FlexGrid} control.
     *
     * This class is used by the {@link FlexGridFilter} class; you
     * rarely use it directly.
     */
    interface IColumnFilter {
        column: wijmo.grid.Column;
        isActive: boolean;
        apply(value: any): boolean;
        clear(): void;
    }
}
declare module wijmo.grid.filter {
    /**
     * Defines a condition filter for a column on a {@link FlexGrid} control.
     *
     * Condition filters contain two conditions that may be combined
     * using an 'and' or an 'or' operator.
     *
     * This class is used by the {@link FlexGridFilter} class; you will
     * rarely use it directly.
     */
    class ConditionFilter implements IColumnFilter {
        private _col;
        private _c1;
        private _c2;
        private _and;
        private _map;
        /**
         * Initializes a new instance of the {@link ConditionFilter} class.
         *
         * @param column The column to filter.
         */
        constructor(column: wijmo.grid.Column);
        /**
         * Gets the first condition in the filter.
         */
        readonly condition1: FilterCondition;
        /**
         * Gets the second condition in the filter.
         */
        readonly condition2: FilterCondition;
        /**
         * Gets a value that indicates whether to combine the two conditions
         * with an AND or an OR operator.
         *
         * The default value for this property is **true**.
         */
        and: boolean;
        /**
         * Gets or sets the {@link DataMap} used to convert raw values into display
         * values shown when editing this filter.
         */
        dataMap: wijmo.grid.DataMap;
        /**
         * Gets the {@link Column} to filter.
         */
        readonly column: wijmo.grid.Column;
        /**
         * Gets a value that indicates whether the filter is active.
         *
         * The filter is active if at least one of the two conditions
         * has its operator and value set to a valid combination.
         */
        readonly isActive: boolean;
        /**
         * Returns a value indicating whether a value passes this filter.
         *
         * @param value The value to test.
         */
        apply(value: any): boolean;
        /**
         * Clears the filter.
         */
        clear(): void;
        _hasDatePart(): boolean;
        _hasTimePart(): boolean;
        /**
         * Returns true if this object supports a given interface.
         *
         * @param interfaceName Name of the interface to look for.
         */
        implementsInterface(interfaceName: string): boolean;
    }
}
declare module wijmo.grid.filter {
    /**
     * The editor used to inspect and modify {@link ConditionFilter} objects.
     *
     * This class is used by the {@link FlexGridFilter} class; you
     * rarely use it directly.
     */
    class ConditionFilterEditor extends wijmo.Control {
        private _filter;
        private _cmb1;
        private _val1;
        private _cmb2;
        private _val2;
        private _canApply;
        private _divHdr;
        private _divCmb1;
        private _divVal1;
        private _divCmb2;
        private _divVal2;
        private _spAnd;
        private _spOr;
        private _btnAnd;
        private _btnOr;
        /**
         * Gets or sets the template used to instantiate {@link ConditionFilterEditor} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link ConditionFilterEditor} class.
         *
         * @param element The DOM element that hosts the control, or a selector
         * for the host element (e.g. '#theCtrl').
         * @param filter The {@link ConditionFilter} to edit.
         */
        constructor(element: any, filter: ConditionFilter);
        /**
         * Gets a reference to the {@link ConditionFilter} being edited.
         */
        readonly filter: ConditionFilter;
        /**
         * Gets or sets a value that indicates whether the current edits
         * can be applied to make the filter active.
         */
        canApply: boolean;
        /**
         * Updates editor with current filter settings.
         */
        updateEditor(): void;
        /**
         * Clears the editor without applying changes to the filter.
         */
        clearEditor(): void;
        /**
         * Gets a value that determines whether the editor has been cleared.
         */
        readonly isEditorClear: boolean;
        /**
         * Updates filter to reflect the current editor values.
         */
        updateFilter(): void;
        /**
         * Occurs when the value of the {@linj canApply} property changes.
         */
        readonly canApplyChanged: Event<ConditionFilterEditor, EventArgs>;
        /**
         * Raises the {@link canApplyChanged} event.
         */
        onCanApplyChanged(e?: wijmo.EventArgs): void;
        private _getComboValue;
        private _createOperatorCombo;
        private _createValueInput;
        private _btnAndOrChanged;
        private _checkRadio;
        private _keydown;
    }
}
declare module wijmo.grid.filter {
    /**
     * Defines a filter condition.
     *
     * This class is used by the {@link FlexGridFilter} class;
     * you will rarely have to use it directly.
     */
    class FilterCondition {
        private _op;
        private _val;
        private _strVal;
        private _filter;
        static _refDateTime: Date;
        /**
         * Initializes a new instance of the {@link FilterCondition} class.
         *
         * @param filter The {@link ConditionFilter} that owns this {@link FilterCondition}.
         */
        constructor(filter?: ConditionFilter);
        /**
         * Gets or sets the operator used by this {@link FilterCondition}.
         */
        operator: Operator;
        /**
         * Gets or sets the value used by this {@link FilterCondition}.
         */
        value: any;
        /**
         * Gets a value that indicates whether the condition is active.
         */
        readonly isActive: boolean;
        /**
         * Clears the condition.
         */
        clear(): void;
        /**
         * Returns a value that determines whether the given value passes this
         * {@link FilterCondition}.
         *
         * @param value The value to test.
         * @param dateOnly Whether to disregard the time part of **Date** values.
         * @param timeOnly Whether to disregard the date part of **Date** values.
         */
        apply(value: any, dateOnly?: boolean, timeOnly?: boolean): boolean;
        _getCaseString(value: string): string;
    }
    /**
     * Specifies filter condition operators.
     */
    enum Operator {
        /** Equals. */
        EQ = 0,
        /** Does not equal. */
        NE = 1,
        /** Greater than. */
        GT = 2,
        /** Greater than or equal to. */
        GE = 3,
        /** Less than. */
        LT = 4,
        /** Less than or equal to. */
        LE = 5,
        /** Begins with. */
        BW = 6,
        /** Ends with. */
        EW = 7,
        /** Contains. */
        CT = 8,
        /** Does not contain. */
        NC = 9
    }
}
declare module wijmo.grid.filter {
    /**
     * Defines a value filter for a column on a {@link FlexGrid} control.
     *
     * Value filters contain an explicit list of values that should be
     * displayed by the grid.
     */
    class ValueFilter implements IColumnFilter {
        private _col;
        private _values;
        private _filterText;
        private _xValueSearch;
        private _maxValues;
        private _uniqueValues;
        private _sortValues;
        private _map;
        /**
         * Initializes a new instance of the {@link ValueFilter} class.
         *
         * @param column The column to filter.
         */
        constructor(column: wijmo.grid.Column);
        /**
         * Gets or sets an object with the selected (checked) values on the
         * value list.
         *
         * If the filter is not active, this property is set to null and all
         * values present in the data source are shown on the list.
         *
         * If the filter is active (the user selected some values from the list
         * but not all), the {@link showValues} property is set to an object
         * whose property names are the display values of the selected values.
         *
         * For example, if the value list contains country names and the user
         * selected "US" and "Japan", the {@link showValues} property returns:
         *
         * ```javascript
         * { Japan: true, US: true }
         * ```
         */
        showValues: any;
        /**
         * Gets or sets a string used to filter the list of display values.
         */
        filterText: string;
        /**
         * Gets or sets a value that determines whether the filter should
         * include only values selected by the {@link filterText} property.
         *
         * The default value for this property is **true**, which matches
         * Excel's behavior.
         *
         * Set it to **false** to disable this behavior, so searching only
         * affects which items are displayed on the list and not which items
         * are included in the filter.
         */
        exclusiveValueSearch: boolean;
        /**
         * Gets or sets the maximum number of elements on the list of display values.
         *
         * Adding too many items to the list makes searching difficult and hurts
         * performance. This property limits the number of items displayed at any time,
         * but users can still use the search box to filter the items they are
         * interested in.
         *
         * The default value for this property is **250**.
         *
         * This code changes the value to 1,000,000, effectively listing all unique
         * values for the field:
         *
         * ```typescript
         * import { FlexGridFilter} from '@grapecity/wijmo.grid.filter';
         *
         * // change the maxItems property for the 'id' column:
         * let f = new FlexGridFilter(theGrid);
         * f.getColumnFilter('id').valueFilter.maxValues = 1000000;
         * ```
         */
        maxValues: number;
        /**
         * Gets or sets an array containing the unique values to be displayed on the list.
         *
         * If this property is set to null, the list will be filled based on the grid data.
         *
         * Explicitly assigning the list of unique values is more efficient than building
         * the list from the data, and is required for value filters to work properly when
         * the data is filtered on the server (because in this case some values might not
         * be present on the client so the list will be incomplete).
         *
         * By default, the filter editor will sort the unique values when displaying them
         * to the user. If you want to prevent that and show the values in the order you
         * provided, set the {@link sortValues} property to false.
         *
         * For example, the code below provides a list of countries to be used in the
         * {@link ValueFilter} for the column bound to the 'country' field:
         *
         * ```typescript
         * import { FlexGridFilter} from '@grapecity/wijmo.grid.filter';
         *
         * // create filter for a FlexGrid
         * let filter = new FlexGridFilter(grid);
         *
         * // assign list of unique values to country filter
         * let cf = filter.getColumnFilter('country');
         * cf.valueFilter.uniqueValues = ['Austria', 'Belgium', 'Chile', 'Denmark'];
         * ```
         */
        uniqueValues: any[] | null;
        /**
         * Gets or sets a value that determines whether the values should be sorted
         * when displayed in the editor.
         *
         * This property is especially useful when you are using the {@link uniqueValues}
         * to provide a custom list of values property and you would like to preserve
         * the order of the values.
         */
        sortValues: boolean;
        /**
         * Gets or sets the {@link DataMap} used to convert raw values into display
         * values shown when editing this filter.
         */
        dataMap: wijmo.grid.DataMap;
        /**
         * Gets the {@link Column} to filter.
         */
        readonly column: wijmo.grid.Column;
        /**
         * Gets a value that indicates whether the filter is active.
         *
         * The filter is active if some values are selected and some are not.
         * If all values are in the same state (either selected or un-selected),
         * then the filter is not active.
         */
        readonly isActive: boolean;
        /**
         * Gets a value that indicates whether a value passes the filter.
         *
         * @param value The value to test.
         */
        apply(value: any): boolean;
        /**
         * Clears the filter.
         */
        clear(): void;
        /**
         * Gets an array containing objects that represent all unique values
         * for this {@link column}.
         *
         * The objects in the array returned contain two properties:
         * *value* (the data value) and *text* (the formatted data value).
         *
         * If the {@link uniqueValues} property is set to an array of values,
         * that array is used as a data source.
         *
         * If {@link uniqueValues} is null, the method scans all items in the
         * data source and returns an creates an array containing all unique
         * values.
         *
         * This method is used by the {@link ValueFilterEditor} class to
         * populate the list of values shown to users.
         *
         * @param filtered Whether to apply all other filters when retrieving
         * the values from the data source.
         */
        getUniqueValues(filtered?: boolean): any[];
        /**
         * Returns true if this object supports a given interface.
         *
         * @param interfaceName Name of the interface to look for.
         */
        implementsInterface(interfaceName: string): boolean;
    }
}
declare module wijmo.grid.filter {
    /**
     * The editor used to inspect and modify {@link ValueFilter} objects.
     *
     * This class is used by the {@link FlexGridFilter} class; you
     * rarely use it directly.
     */
    class ValueFilterEditor extends wijmo.Control {
        private _filter;
        private _toFilter;
        private _filterText;
        private _rxFilter;
        private _view;
        private _initialItems;
        private _canApply;
        private _divFilter;
        private _cmbFilter;
        private _cbSelectAll;
        private _spSelectAll;
        private _divValues;
        private _lbValues;
        /**
         * Gets or sets the template used to instantiate {@link ColumnFilterEditor} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link ValueFilterEditor} class.
         *
         * @param element The DOM element that hosts the control, or a selector
         * for the host element (e.g. '#theCtrl').
         * @param filter The {@link ValueFilter} to edit.
         */
        constructor(element: any, filter: ValueFilter);
        /**
         * Gets a reference to the {@link ValueFilter} being edited.
         */
        readonly filter: ValueFilter;
        /**
         * Gets or sets a value that indicates whether the current edits
         * can be applied to make the filter active.
         */
        canApply: boolean;
        /**
         * Updates editor with current filter settings.
         */
        updateEditor(): void;
        /**
         * Clears the editor without applying changes to the filter.
         *
         * @param checkAll Whether to check or uncheck all values
         * (either way, the filter is not applied in this case).
         */
        clearEditor(checkAll?: boolean): void;
        /**
         * Gets a value that determines whether the editor has been cleared.
         */
        readonly isEditorClear: boolean;
        /**
         * Updates filter to reflect the current editor values.
         */
        updateFilter(): void;
        /**
         * Occurs when the value of the {@linj canApply} property changes.
         */
        readonly canApplyChanged: Event<ValueFilterEditor, EventArgs>;
        /**
         * Raises the {@link canApplyChanged} event.
         */
        onCanApplyChanged(e?: wijmo.EventArgs): void;
        private _getCaseSensitive;
        private _getItems;
        private _filterTextChanged;
        private _filterValues;
        private _cbSelectAllClicked;
        private _updateSelectAllCheck;
        private _adjustWidths;
    }
}
declare module wijmo.grid.filter {
    /**
     * Defines a filter for a column on a {@link FlexGrid} control.
     *
     * The {@link ColumnFilter} contains a {@link ConditionFilter} and a
     * {@link ValueFilter}; only one of them may be active at a time.
     *
     * This class is used by the {@link FlexGridFilter} class; you
     * rarely use it directly.
     */
    class ColumnFilter implements IColumnFilter {
        private _owner;
        private _col;
        private _valueFilter;
        private _conditionFilter;
        private _filterType;
        /**
         * Initializes a new instance of the {@link ColumnFilter} class.
         *
         * @param owner The {@link FlexGridFilter} that owns this column filter.
         * @param column The {@link Column} to filter.
         */
        constructor(owner: FlexGridFilter, column: wijmo.grid.Column);
        /**
         * Gets or sets the types of filtering provided by this filter.
         *
         * Setting this property to null causes the filter to use the value
         * defined by the owner filter's {@link FlexGridFilter.defaultFilterType}
         * property.
         */
        filterType: FilterType;
        /**
         * Gets or sets the {@link DataMap} used to convert raw values into display
         * values shown when editing this filter.
         *
         * The example below assigns a {@link DataMap} to Boolean column filters
         * so the filter editor displays 'Yes' and 'No' instead of 'true' and 'false':
         *
         * ```typescript
         * import { FlexGridFilter } from '@grapecity/wijmo.grid.filter';
         * var filter = new FlexGridFilter(grid),
         *     map = new wijmo.grid.DataMap([
         *             { value: true, caption: 'Yes' },
         *             { value: false, caption: 'No' },
         *         ], 'value', 'caption');
         * for (var c = 0; c &lt; grid.columns.length; c++) {
         *     if (grid.columns[c].dataType == wijmo.DataType.Boolean) {
         *         filter.getColumnFilter(c).dataMap = map;
         *     }
         * }
         * ```
         */
        dataMap: wijmo.grid.DataMap;
        /**
         * Gets the {@link ValueFilter} in this {@link ColumnFilter}.
         */
        readonly valueFilter: ValueFilter;
        /**
         * Gets the {@link ConditionFilter} in this {@link ColumnFilter}.
         */
        readonly conditionFilter: ConditionFilter;
        /**
         * Gets the {@link Column} being filtered.
         */
        readonly column: wijmo.grid.Column;
        /**
         * Gets a value that indicates whether the filter is active.
         */
        readonly isActive: boolean;
        /**
         * Gets a value that indicates whether a value passes the filter.
         *
         * @param value The value to test.
         */
        apply(value: any): boolean;
        /**
         * Clears the filter.
         */
        clear(): void;
        /**
         * Returns true if this object supports a given interface.
         *
         * @param interfaceName Name of the interface to look for.
         */
        implementsInterface(interfaceName: string): boolean;
    }
}
declare module wijmo.grid.filter {
    /**
     * The editor used to inspect and modify column filters.
     *
     * This class is used by the {@link FlexGridFilter} class; you
     * rarely use it directly.
     */
    class ColumnFilterEditor extends wijmo.Control {
        private _filter;
        private _edtVal;
        private _edtCnd;
        private _wasTouching;
        private _divSort;
        private _btnAsc;
        private _btnDsc;
        private _divType;
        private _aCnd;
        private _aVal;
        private _divEdtVal;
        private _divEdtCnd;
        private _btnApply;
        private _btnCancel;
        private _btnClear;
        /**
         * Gets or sets the template used to instantiate {@link ColumnFilterEditor} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link ColumnFilterEditor} class.
         *
         * @param element The DOM element that hosts the control, or a selector
         * for the host element (e.g. '#theCtrl').
         * @param filter The {@link ColumnFilter} to edit.
         * @param sortButtons Whether to show sort buttons in the editor.
         */
        constructor(element: any, filter: ColumnFilter, sortButtons?: boolean);
        /**
         * Gets a reference to the {@link ColumnFilter} being edited.
         */
        readonly filter: ColumnFilter;
        /**
         * Updates editor with current filter settings.
         */
        updateEditor(): void;
        /**
         * Updates filter with current editor settings.
         */
        updateFilter(): void;
        /**
         * Occurs after the filter is modified.
         */
        readonly filterChanged: Event<ColumnFilterEditor, EventArgs>;
        /**
         * Raises the {@link filterChanged} event.
         */
        onFilterChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs when one of the editor buttons is clicked.
         */
        readonly buttonClicked: Event<ColumnFilterEditor, EventArgs>;
        /**
         * Raises the {@link buttonClicked} event.
         */
        onButtonClicked(e?: wijmo.EventArgs): void;
        _showFilter(filterType: FilterType): void;
        private _enableLink;
        private _updateSortButtonState;
        private _getFilterType;
        private _btnClicked;
    }
}
declare module wijmo.grid.filter {
}
