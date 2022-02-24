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
declare module wijmo.olap {
    /**
     * Generates MDX queries for the {@link _SqlServerConnection} class.
     */
    class _TextBuilder {
        private _text;
        /**
         * Initializes a new instance of the {@link _TextBuilder} class.
         */
        constructor();
        /**
         * Returns the text length.
         */
        readonly length: number;
        /**
         * Returns the text.
         */
        toString(): string;
        /**
         * Appends a concatenation of strings.
         *
         * @param ...items Array of strings to be appended.
         */
        append(...items: string[]): void;
        /**
         * Appends a separator followed by a concatenation of strings.
         *
         * @param separator Separator string.
         * @param ...parts Array of strings to be appended.
         */
        joinToList(separator: string, ...parts: string[]): void;
        /**
         * Appends a comma separator followed by an individual string.
         *
         * @param item String to be appended.
         */
        joinItemToList(item: string): void;
        /**
         * Wraps a non-empty string with the specified prefix and suffix.
         *
         * @param prefix Prefix string.
         * @param suffix Suffix string.
         */
        wrap(prefix: string, suffix: string): void;
        /**
         * Wraps a non-empty string with the specified prefix and suffix.
         *
         * @param prefix Prefix string.
         * @param text Text to be wrapped.
         * @param suffix Suffix string.
         */
        static wrap(prefix: string, text: string, suffix: string): string;
    }
}
declare module wijmo.olap {
    /**
     * Accumulates observations and returns aggregate statistics.
     */
    class _Tally {
        _cntAll: number;
        _cnt: number;
        _cntn: number;
        _sum: number;
        _sum2: number;
        _min: any;
        _max: any;
        _first: any;
        _last: any;
        /**
         * Adds a value to the tally.
         *
         * @param value Value to be added to the tally.
         * @param weight Weight to be attributed to the value.
         */
        add(value: any, weight?: number): void;
        /**
         * Gets an aggregate statistic from the tally.
         *
         * @param aggregate Type of aggregate statistic to get.
         */
        getAggregate(aggregate: wijmo.Aggregate): number;
    }
}
declare module wijmo.olap {
    /**
     * Represents a combination of {@link PivotField} objects and their values.
     *
     * Each row and column on the output view is defined by a unique {@link PivotKey}.
     * The values in the output cells represent an aggregation of the value field
     * for all items that match the row and column keys.
     *
     * For example, if a column key is set to 'Country:UK;Customer:Joe' and
     * the row key is set to 'Category:Desserts;Product:Pie', then the corresponding
     * cell contains the aggregate for all items with the following properties:
     *
     * <pre>{ Country: 'UK', Customer: 'Joe', Category: 'Desserts', Product: 'Pie' };</pre>
     */
    class _PivotKey {
        private _fields;
        private _fieldCount;
        private _valueFields;
        private _valueFieldIndex;
        private _item;
        private _key;
        private _vals;
        private _names;
        static _ROW_KEY_NAME: string;
        /**
         * Initializes a new instance of the {@link PivotKey} class.
         *
         * @param fields {@link PivotFieldCollection} that owns this key.
         * @param fieldCount Number of fields to take into account for this key.
         * @param valueFields {@link PivotFieldCollection} that contains the values for this key.
         * @param valueFieldIndex Index of the value to take into account for this key.
         * @param item First data item represented by this key.
         */
        constructor(fields: PivotFieldCollection, fieldCount: number, valueFields: PivotFieldCollection, valueFieldIndex: number, item: any);
        /**
         * Gets the {@link PivotFieldCollection} that owns this key.
         */
        readonly fields: PivotFieldCollection;
        /**
         * Gets the {@link PivotFieldCollection} that contains the values for this key.
         */
        readonly valueFields: PivotFieldCollection;
        /**
         * Gets the {@link PivotField} that contains the main value for this key.
         */
        readonly valueField: PivotField;
        /**
         * Gets an array with the values used to create this key.
         */
        readonly values: any[];
        /**
         * Gets an array with the names of the fields in this key.
         */
        readonly fieldNames: string[];
        /**
         * Gets the type of aggregate represented by this key.
         */
        readonly aggregate: wijmo.Aggregate;
        /**
         * Gets the value for this key at a given index.
         *
         * @param index Index of the field to be retrieved.
         * @param formatted Whether to return a formatted string or the raw value.
         */
        getValue(index: number, formatted: boolean): any;
        /**
         * Gets the subtotal level that this key represents.
         *
         * The value -1 indicates the key does not represent a subtotal.
         * Zero indicates a grand total.
         * Values greater than zero indicate the subtotal level.
         */
        readonly level: number;
        /**
         * Comparer function used to sort arrays of {@link _PivotKey} objects.
         *
         * @param key {@link _PivotKey} to compare to this one.
         */
        compareTo(key: _PivotKey): number;
        /**
         * Gets a value that determines whether a given data object matches
         * this {@link _PivotKey}.
         *
         * The match is determined by comparing the formatted values for each
         * {@link PivotField} in the key to the formatted values in the given item.
         * Therefore, matches may occur even if the raw values are different.
         *
         * @param item Item to check for a match.
         */
        matchesItem(item: any): boolean;
        toString(uniqueId?: number): string;
    }
}
declare module wijmo.olap {
    /**
     * Extends the {@link CollectionView} class to preserve the position of subtotal rows
     * when sorting.
     */
    class PivotCollectionView extends wijmo.collections.CollectionView {
        private _ng;
        /**
         * Initializes a new instance of the {@link PivotCollectionView} class.
         *
         * @param engine {@link PivotEngine} that owns this collection.
         */
        constructor(engine: PivotEngine);
        /**
         * Gets a reference to the {@link PivotEngine} that owns this view.
         */
        readonly engine: PivotEngine;
        implementsInterface(interfaceName: string): boolean;
        editItem(item: any): void;
        addNew(): void;
        _performSort(items: any[]): void;
        _performFilter(items: any[]): any[];
        _getGroupRange(items: any[], item: any): number[];
        _sortGroups(items: any[], level: number, start: number, end: number): void;
        _sortSegment(items: any[], start: number, end: number): void;
        _sortData(items: any[]): void;
        _getItemLevel(item: any): any;
    }
}
declare module wijmo.olap {
    /**
     * Represents a property of the items in the wijmo.olap data source.
     */
    class PivotField {
        private _ng;
        _header: string;
        _binding: PivotFieldBinding;
        _autoGenerated: boolean;
        _subFields: PivotField[];
        private _aggregate;
        private _showAs;
        private _weightField;
        private _format;
        private _width;
        private _wordWrap;
        private _align;
        private _dataType;
        private _filter;
        private _srtCmp;
        private _descending;
        private _isContentHtml;
        private _visible;
        private _parent;
        private _getValueFn;
        private _getAggValueFn;
        private _isExplicitAggregate;
        static _props: string[];
        /**
         * Initializes a new instance of the {@link PivotField} class.
         *
         * @param engine {@link PivotEngine} that owns this field.
         * @param binding Property that this field is bound to.
         * @param header Header shown to identify this field (defaults to the binding).
         * @param options JavaScript object containing initialization data for the field.
         */
        constructor(engine: PivotEngine, binding: string, header?: string, options?: any);
        /**
         * Gets or sets the name of the property the field is bound to.
         */
        binding: string;
        /**
         * Gets or sets a function to be used for retrieving the field value
         * for a given data item.
         *
         * This property is set to null by default, causing the engine to
         * use the field's {@link binding} property to retrieve the value.
         *
         * If specified, the function should take a single parameter that
         * represents the data item being evaluated and should return
         * the calculated value for the item.
         *
         * Notice the difference between the {@link getValue} property
         * (a function that takes a raw data item and returns a raw value), and
         * the {@link getAggregateValue} (a function that takes a summary object
         * and returns an aggregate value):
         *
         * ```typescript
         * fields: [
         *     {
         *         header: 'Conversion (per summary row)',
         *         dataType: 'Number',
         *         format: 'p0',
         *
         *         // getAggregateValue computes an aggregate from a summary row (Downloads, Sales)
         *         getAggregateValue: row => row.Downloads ? row.Sales / row.Downloads : 0
         *     },
         *     {
         *         header: 'Conversion (per raw data item)',
         *         dataType: 'Number',
         *         aggregate: 'Avg',
         *         format: 'p0',
         *
         *         // getValue computes a raw value from a data item (downloads, sales)
         *         getValue: item => item.downloads ? item.sales / item.downloads : 0
         * },
         * ```
         *
         * {@sample OLAP/PivotPanel/Fields/Customize/FieldSettingsDialog/Calculated Example}
         */
        getValue: Function;
        /**
         * Gets or sets a function to be used for retrieving the field's
         * **aggregate** value for a given summary object.
         *
         * The default value for this property is **null**, causing the engine to
         * use the field's {@link aggregate} and {@link showAs} properties to
         * calculate the aggregate.
         *
         * If specified, the function should take a single parameter that
         * represents the summary object generated by the engine and should return
         * the aggregate value for the item.
         *
         * Notice the difference between the {@link getValue} property
         * (a function that takes a raw data item and returns a raw value), and
         * the {@link getAggregateValue} (a function that takes a summary object
         * and returns an aggregate value):
         *
         * ```typescript
         * fields: [
         *     {
         *         header: 'Conversion (per summary row)',
         *         dataType: 'Number',
         *         format: 'p0',
         *
         *         // getAggregateValue computes an aggregate from a summary row (Downloads, Sales)
         *         // **NOTE**: for this formula to work, the "Downloads" and "Sales" fields must be
         *         // present in the PivotEngine's valueFields array.
         *         getAggregateValue: row => row.Downloads ? row.Sales / row.Downloads : 0
         *     },
         *     {
         *         header: 'Conversion (per raw data item)',
         *         dataType: 'Number',
         *         aggregate: 'Avg',
         *         format: 'p0',
         *
         *         // getValue computes a raw value from a data item (downloads, sales)
         *         getValue: item => item.downloads ? item.sales / item.downloads : 0
         * },
         * ```
         *
         * {@sample OLAP/PivotPanel/Fields/Customize/FieldSettingsDialog/Calculated Example}
         */
        getAggregateValue: Function;
        /**
         * Gets or sets a string used to represent this field in the user
         * interface.
         *
         * The default value for this property is a capitalized version of the
         * {@link binding} value.
         */
        header: string;
        /**
         * Gets a reference to the {@link PivotFilter} used to filter values for this field.
         *
         * For measure fields in cube data sources, the filter is applied to aggregated
         * cell values. For measure fields in non-cube data sources, the filter is
         * applied to the raw data.
         */
        readonly filter: PivotFilter;
        /**
         * Gets or sets how the field should be summarized.
         *
         * The default value for this property is **Aggregate.Sum**
         * for numeric fields, and **Aggregate.Count** for other
         * field types.
         */
        aggregate: wijmo.Aggregate;
        /**
         * Gets or sets a value that specifies how to display the aggregate
         * value.
         *
         * Options for this property are defined by the {@link ShowAs} enumeration
         * and include differences between the value and the one in the previous
         * row or column, percentages over the row, column, or grand total, and
         * running totals.
         *
         * This property is similar to the
         * <a href="https://support.microsoft.com/en-us/office/show-different-calculations-in-pivottable-value-fields-014d2777-baaf-480b-a32b-98431f48bfec" target="_blank">Show Values As</a>
         * feature in Excel.
         *
         * The default value for this property is **ShowAs.NoCalculation**.
         */
        showAs: ShowAs;
        /**
         * Gets or sets the {@link PivotField} used as a weight for calculating
         * aggregates on this field.
         *
         * If this property is set to null, all values are assumed to have weight one.
         *
         * This property allows you to calculate weighted averages and totals.
         * For example, if the data contains a 'Quantity' field and a 'Price' field,
         * you could use the 'Price' field as a value field and the 'Quantity' field as
         * a weight. The output would contain a weighted average of the data.
         */
        weightField: PivotField;
        /**
         * Gets or sets the data type of the field.
         */
        dataType: wijmo.DataType;
        /**
         * Gets a value that indicates whether the field is a measure or
         * a dimension.
         *
         * Measures are also known as 'facts'. They are typically numeric
         * values that can be aggregated into summary statistics that convey
         * information about the field.
         *
         * Dimensions are typically strings, dates, or boolean values that
         * can be used to divide measures into categories.
         */
        readonly isMeasure: boolean;
        /**
         * Gets this field's child fields.
         */
        readonly subFields: PivotField[];
        /**
         * Gets or sets the format to use when displaying field values.
         *
         * The default value for this property is
         * **"d"** for date fields, **"n0"** for numeric fields,
         * and the empty string for other field types.
         */
        format: string;
        /**
         * Gets or sets the horizontal alignment of this field's cells.
         *
         * The default value for this property is null, which causes the grid to select
         * the alignment automatically based on the fields's {@link dataType} (numbers are
         * right-aligned, Boolean values are centered, and other types are left-aligned).
         *
         * If you want to override the default alignment, set this property
         * to 'left', 'right', 'center', or 'justify'.
         */
        align: string;
        /**
         * Gets or sets the preferred width to be used for showing this
         * field in user interface controls such as the {@link PivotGrid}.
         */
        width: number;
        /**
         * Gets or sets a value that indicates whether the content of this
         * field should be allowed to wrap within cells.
         *
         * The default value for this property is **false**.
         */
        wordWrap: boolean;
        /**
         * Gets or sets a value that determines whether keys should be sorted
         * in descending order for this field.
         *
         * The default value for this property is **false**.
         */
        descending: boolean;
        /**
         * Gets or sets a value indicating whether items in this field
         * contain HTML content rather than plain text.
         *
         * The default value for this property is **false**.
         */
        isContentHtml: boolean;
        /**
         * Gets or sets a value indicating whether this field should be
         * displayed in instances of the {@link PivotPanel} control.
         *
         * The default value for this property is **true**.
         *
         * Setting this property to false hides the field any {@link PivotPanel}
         * controls, preventing users from adding, removing, or changing the
         * the field position in the engine's view definition.
         */
        visible: boolean;
        /**
         * Gets or sets a function used to compare values when sorting.
         *
         * If provided, the sort comparer function should take as parameters
         * two values of any type, and should return -1, 0, or +1 to indicate
         * whether the first value is smaller than, equal to, or greater than
         * the second. If the sort comparer returns null, the standard built-in
         * comparer is used.
         *
         * This {@link sortComparer} property allows you to use custom comparison
         * algorithms that in some cases result in sorting sequences that are
         * more consistent with user's expectations than plain string comparisons.
         *
         * The example below shows a typical use for the {@link sortComparer} property:
         * <pre>// define list of products
         * app.products = 'Wijmo,Aoba,Olap,Xuni'.split(',');
         *
         * // sort products by position in the 'app.products' array
         * ng.viewDefinitionChanged.addHandler(function () {
         *   var fld = ng.fields.getField('Product');
         *   if (fld) {
         *     fld.sortComparer = function (val1, val2) {
         *       return app.products.indexOf(val1) - app.products.indexOf(val2);
         *     }
         *   }
         * });</pre>
         */
        sortComparer: Function;
        /**
         * Gets a reference to the {@link PivotEngine} that owns this {@link PivotField}.
         */
        readonly engine: PivotEngine;
        /**
         * Gets the {@link ICollectionView} bound to this field.
         */
        readonly collectionView: wijmo.collections.ICollectionView;
        /**
         * Gets or sets a value that determines whether this field is
         * currently being used in the view.
         *
         * Setting this property to true causes the field to be added to the
         * view's {@link PivotEngine.rowFields} or {@link PivotEngine.valueFields},
         * depending on the field's data type.
         */
        isActive: boolean;
        /**
         * Gets this field's parent field.
         *
         * When you drag the same field into the Values list multiple
         * times, copies of the field are created so you can use the
         * same binding with different parameters. The copies keep a
         * reference to their parent fields.
         */
        readonly parentField: PivotField;
        /**
         * Gets the key for this {@link PivotField}.
         *
         * For regular fields, the key is the field's {@link header};
         * for {@link CubePivotField} instances, the key is the
         * field's {@link binding}.
         */
        readonly key: string;
        /**
         * Occurs when the value of a property in this {@link Range} changes.
         */
        readonly propertyChanged: Event<PivotField, PropertyChangedEventArgs>;
        /**
         * Raises the {@link propertyChanged} event.
         *
         * @param e {@link PropertyChangedEventArgs} that contains the property
         * name, old, and new values.
         */
        onPropertyChanged(e: wijmo.PropertyChangedEventArgs): void;
        private _updateDataTypeByBinding;
        private _updateAggregateByDataType;
        _copy(key: string, value: any): boolean;
        _getFilterProxy(): any;
        _setFilterProxy(proxy: any): void;
        _getIsActive(): boolean;
        _setIsActive(value: boolean): void;
        _hasSubFields(): boolean;
        _clone(): PivotField;
        _setProp(name: string, value: any, member?: string): void;
        _getName(): string;
        _getValue(item: any, formatted: boolean): any;
        _getWeight(item: any): number;
    }
    /**
     * Extends the {@link PivotField} class to represent a field in a server-based
     * cube data source.
     */
    class CubePivotField extends PivotField {
        private _dimensionType;
        /**
         * Initializes a new instance of the {@link CubePivotField} class.
         *
         * @param engine {@link PivotEngine} that owns this field.
         * @param binding Property that this field is bound to.
         * @param header Header shown to identify this field (defaults to the binding).
         * @param options JavaScript object containing initialization data for the field.
         */
        constructor(engine: PivotEngine, binding: string, header?: string, options?: any);
        /**
         * Gets or sets a string used to represent this field in the user interface.
         */
        header: string;
        /**
         * Gets or sets the dimension type of the field.
         */
        dimensionType: DimensionType;
        /**
         * Overridden to account for the dimension type.
         */
        readonly isMeasure: boolean;
        /**
         * Gets the key for this {@link CubePivotField}.
         *
         * For this type of field, the key is the field's {@link binding}.
         */
        readonly key: string;
        _clone(): PivotField;
    }
    /**
     * Defines the dimension type of a {@link CubePivotField}.
     */
    enum DimensionType {
        /** Fields that contain categories used to summarize data. */
        Dimension = 0,
        /** Fields that contain quantitative, numerical information. */
        Measure = 1,
        /** Calculations associated with a measure group used to evaluate business performance. */
        Kpi = 2,
        /** Multidimensional Expression (MDX) that returns a set of dimension members. */
        NameSet = 3,
        /** Provide supplementary information about dimension members. */
        Attribute = 4,
        /** Used to categorize measures and improve the user browsing experience. */
        Folder = 5,
        /** Metadata that define relationships between two or more columns in a table. */
        Hierarchy = 6,
        /** Dimension with time-based levels of granularity for analysis and reporting. */
        Date = 7,
        /** Dimension whose attributes represent a list of currencies for financial reporting purposes. */
        Currency = 8
    }
}
declare module wijmo.olap {
    /**
     * The {@link Slicer} control provides a quick way to edit filters
     * applied to {@link PivotField} objects.
     *
     * It provides buttons the user can click to filter data based on
     * values and indicates the current filtering state, which makes
     * it easy to understand what is shown in filtered {@link PivotGrid}
     * and {@link PivotChart} controls.
     *
     * For example, when the user selects 'Smith' in a 'Salespersons'
     * field, only data that includes 'Smith' in that field will be
     * included in the output summary.
     *
     * {@link Slicer} controls are based on value filters.
     * To use them with server-based pivot engines, you must set the
     * {@link uniqueValues} property of the fields you want to filter on.
     * For example:
     *
     * ```typescript
     * // set Country field's unique values so we can use a slicer
     * // this is necessary only when using server-based pivot engines
     * var fld = ngCube.fields.getField('Country');
     * fld.filter.valueFilter.uniqueValues = 'Japan,Portugal,Russia,UK,US'.split(',');
     *
     * // show slicer
     * var slicer = new wijmo.olap.Slicer('#slicer', {
     *   field: fld,
     *   multiSelect: true
     * });
     * ```
     *
     * <a href="https://jsfiddle.net/Wijmo5/gh14feox/" target="_blank">Example</a>
     */
    class Slicer extends wijmo.Control {
        _root: HTMLDivElement;
        _divHdr: HTMLDivElement;
        _divHdrText: HTMLDivElement;
        _btnMSel: HTMLButtonElement;
        _btnClear: HTMLButtonElement;
        _divListBox: HTMLDivElement;
        _fld: PivotField;
        _edt: wijmo.grid.filter.ValueFilterEditor;
        _lbx: wijmo.input.ListBox;
        _hdr: string;
        _mSel: boolean;
        _updatingFilter: boolean;
        _propChanged: boolean;
        _originalFilterType: wijmo.grid.filter.FilterType;
        _uniqueValues: any[];
        _fldPropChangeBnd: any;
        /**
         * Gets or sets the template used to instantiate {@link Slicer} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link Slicer} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        /**
         * Gets or sets the {@link PivotField} being filtered by this {@link Slicer}.
         *
         * If the {@link PivotField} is not included in the current view definition,
         * the {@link Slicer} will automatically add the field to the engine's
         * {@link PivotEngine.filterFields} collection.
         *
         * If you want to remove the field from any {@link PivotPanel} controls so
         * users cannot remove the field from the view definition, set the
         * fields {@link PivotField.visible} property to false. The field will
         * remain active, but will not be shown in any {@link PivotPanel} controls.
         */
        field: PivotField;
        /**
         * Gets or sets the header string shown at the top of the {@link Slicer}.
         *
         * The default value for this property is **null**, which causes the
         * {@link Slicer} to display the {@link field} header at the top of the
         * {@link Slicer}.
         */
        header: string | null;
        /**
         * Gets or sets a value indicating whether the control displays the
         * header area with the header string and multi-select/clear buttons.
         *
         * The default value for this property is **true**.
         */
        showHeader: boolean;
        /**
         * Gets or sets a value indicating whether the control displays
         * checkboxes next to each item.
         *
         * The default value for this property is **false**.
         */
        showCheckboxes: boolean;
        /**
         * Gets or sets a value that determines whether users should be allowed to
         * select multiple values from the list.
         *
         * The default value for this property is **false**.
         */
        multiSelect: boolean;
        refresh(fullUpdate?: boolean): void;
        _fldPropChange(s: PivotField, e: wijmo.PropertyChangedEventArgs): void;
        _updateHeader(): void;
        _clear(): void;
        _updateFilter(): void;
    }
}
declare module wijmo.olap {
    /**
     * Context Menu for {@link PivotGrid} controls.
     */
    class _GridContextMenu extends wijmo.input.Menu {
        private _targetField;
        private _htDown;
        /**
         * Initializes a new instance of the {@link _GridContextMenu} class.
         */
        constructor();
        refresh(fullUpdate?: boolean): void;
        /**
         * Attaches this context menu to a {@link PivotGrid} control.
         *
         * @param grid {@link PivotGrid} to attach this menu to.
         */
        attach(grid: PivotGrid): void;
        _selectField(e: MouseEvent): boolean;
        _getMenuItems(): any[];
        _execute(parm: string): void;
        _canExecute(parm: string): boolean;
    }
}
declare module wijmo.olap {
    /**
     * Represents a collection of {@link PivotField} objects.
     */
    class PivotFieldCollection extends wijmo.collections.ObservableArray<PivotField> {
        private _ng;
        private _maxItems;
        /**
         * Initializes a new instance of the {@link PivotFieldCollection} class.
         *
         * @param engine {@link PivotEngine} that owns this {@link PivotFieldCollection}.
         */
        constructor(engine: PivotEngine);
        /**
         * Gets or sets the maximum number of fields allowed in this collection.
         *
         * This property is set to null by default, which means any number of items is allowed.
         */
        maxItems: number;
        /**
         * Gets a reference to the {@link PivotEngine} that owns this {@link PivotFieldCollection}.
         */
        readonly engine: PivotEngine;
        /**
         * Gets a field by key.
         *
         * @param key {@link PivotField.key} to look for.
         */
        getField(key: string): PivotField;
        _getField(fields: any, key: string): PivotField;
        /**
         * Overridden to allow pushing fields by header.
         *
         * @param ...item One or more {@link PivotField} objects to add to the array.
         * @return The new length of the array.
         */
        push(...item: any[]): number;
    }
}
declare module wijmo.olap {
    /**
     * Represents a tree of {@link _PivotField} objects.
     *
     * This class is used only for optimization. It reduces the number of
     * {@link _PivotKey} objects that have to be created while aggregating the
     * data.
     *
     * The optimization cuts the time required to summarize the data
     * to about half.
     */
    class _PivotNode {
        _key: _PivotKey;
        _nodes: any;
        _tree: _PivotNode;
        _parent: _PivotNode;
        /**
         * Initializes a new instance of the {@link PivotNode} class.
         *
         * @param fields {@link PivotFieldCollection} that owns this node.
         * @param fieldCount Number of fields to take into account for this node.
         * @param valueFields {@link PivotFieldCollection} that contains the values for this node.
         * @param valueFieldIndex Index of the value to take into account for this node.
         * @param item First data item represented by this node.
         * @param parent Parent {@link _PivotField}.
         */
        constructor(fields: PivotFieldCollection, fieldCount: number, valueFields: PivotFieldCollection, valueFieldIndex: number, item: any, parent?: _PivotNode);
        /**
         * Gets a child node from a parent node.
         *
         * @param fields {@link PivotFieldCollection} that owns this node.
         * @param fieldCount Number of fields to take into account for this node.
         * @param valueFields {@link PivotFieldCollection} that contains the values for this node.
         * @param valueFieldIndex Index of the value to take into account for this node.
         * @param item First data item represented by this node.
         */
        getNode(fields: PivotFieldCollection, fieldCount: number, valueFields: PivotFieldCollection, valueFieldIndex: number, item: any): _PivotNode;
        /**
         * Gets the {@link _PivotKey} represented by this {@link _PivotNode}.
         */
        readonly key: _PivotKey;
        /**
         * Gets the parent node of this node.
         */
        readonly parent: _PivotNode;
        /**
         * Gets the child items of this node.
         */
        readonly tree: _PivotNode;
    }
}
declare module wijmo.olap {
    /**
     * Represents a connection to a Pivot service.
     */
    class _ServerConnection {
        protected _ng: PivotEngine;
        protected _token: string;
        private _start;
        private _progress;
        private _request;
        private _toGetStatus;
        static _TIMEOUT: number;
        static _POLL_INTERVAL: number;
        static _MAXDETAIL: number;
        /**
         * Initializes a new instance of the {@link _ServerConnection} class.
         *
         * @param engine {@link PivotEngine} that owns this field.
         * @param url Url used to communicate with the server.
         */
        constructor(engine: PivotEngine, url: string);
        /**
         * Gets a list of fields available on the server.
         */
        getFields(): PivotField[];
        /**
         * Gets an array with unique values for a given field.
         *
         * @param field The field for which to retrieve unique values.
         */
        getUniqueValues(field: PivotField): any[];
        /**
         * Gets the output view for the current view definition.
         *
         * @param callBack function invoked to handle the results.
         */
        getOutputView(callBack: Function): void;
        /**
         * Gets an array containing the data items that were used to calculate
         * an aggregated cell.
         *
         * @param rowKey Identifies the row that contains the aggregated cell.
         * @param colKey Identifies the column that contains the aggregated cell.
         */
        getDetail(rowKey: any, colKey: any): any[];
        /**
         * Returns a sorted array of PivotKey ids (if sortOnServer is true, the assumption is
         * that subtotal keys are returned by the server as if totalsBeforeData is also true).
         */
        getSortedKeys(obj: any, isRow?: boolean): string[];
        private static _getRequestedValue;
        /**
         * Cancels any pending requests.
         */
        clearPendingRequests(): void;
        /**
         * Creates fake tallies based on aggregated data returned from the server
         *
         * @param aggregatedData Array containing the data aggregates returned
         * by the server.
         */
        updateTallies(aggregatedData: any[]): void;
        private _getFieldValue;
        _getKeyLength(key: string, isRow: boolean): number;
        private _insertKey;
        private _joinKeys;
        private _reorderKeys;
        private _getParentKey;
        private _getAggregatedFieldCount;
        _loadArray(command: string, arr: any, data?: any): void;
        private _getUrl;
        private _isValidUrl;
        private _handleResult;
        private _waitUntilComplete;
        private _getResults;
        protected _handleError(msg: string, xhr: XMLHttpRequest): void;
        protected _sendHttpRequest(command: string, settings?: any): void;
        private _throwResponseError;
        private _clearToken;
        private _clearRequest;
        private _clearTimeout;
    }
}
declare module wijmo.olap {
    /**
     * Specifies constants that define whether to include totals in the output table.
     */
    enum ShowTotals {
        /**
         * Do not show any totals.
         */
        None = 0,
        /**
         * Show grand totals.
         */
        GrandTotals = 1,
        /**
         * Show subtotals and grand totals.
         */
        Subtotals = 2
    }
    /**
     * Specifies constants that define calculations to be applied to cells in the output view.
     */
    enum ShowAs {
        /**
         * Show plain aggregated values.
         */
        NoCalculation = 0,
        /**
         * Show differences between each item and the item in the previous row.
         */
        DiffRow = 1,
        /**
         * Show differences between each item and the item in the previous row as a percentage.
         */
        DiffRowPct = 2,
        /**
         * Show differences between each item and the item in the previous column.
         */
        DiffCol = 3,
        /**
         * Show differences between each item and the item in the previous column as a percentage.
         */
        DiffColPct = 4,
        /**
         * Show values as a percentage of the grand totals for the field.
         */
        PctGrand = 5,
        /**
         * Show values as a percentage of the row totals for the field.
         */
        PctRow = 6,
        /**
         * Show values as a percentage of the column totals for the field.
         */
        PctCol = 7,
        /**
         * Show values as running totals.
         */
        RunTot = 8,
        /**
         * Show values as percentage running totals.
         */
        RunTotPct = 9,
        /**
         * Show values for each item as a percentage of the value in the previous row.
         */
        PctPrevRow = 10,
        /**
         * Show values for each item as a percentage of the value in the previous column.
         */
        PctPrevCol = 11
    }
    /**
     * Provides a user interface for interactively transforming regular data tables into Olap
     * pivot tables.
     *
     * Tabulates data in the {@link itemsSource} collection according to lists of fields and
     * creates the {@link pivotView} collection containing the aggregated data.
     *
     * Pivot tables group data into one or more dimensions. The dimensions are represented
     * by rows and columns on a grid, and the data is stored in the grid cells.
     */
    class PivotEngine {
        private _items;
        private _cv;
        private _autoGenFields;
        private _allowFieldEditing;
        private _showRowTotals;
        private _showColTotals;
        private _totalsBefore;
        private _sortableGroups;
        private _showZeros;
        private _updating;
        private _toInv;
        private _colBindings;
        private _pivotView;
        private _defaultFilterType;
        private _xValueSearch;
        private _async;
        private _batchStart;
        private _toUpdateTallies;
        private _activeFilterFields;
        private _sortOnServer;
        private _viewDefinitionChanged;
        private _hasDeferredUpdates;
        private _cntTotal;
        private _cntFiltered;
        _tallies: any;
        _keys: any;
        private _fields;
        private _rowFields;
        private _columnFields;
        private _valueFields;
        private _filterFields;
        _viewLists: PivotFieldCollection[];
        private _server;
        private _serverParms;
        static _BATCH_SIZE: number;
        static _BATCH_TIMEOUT: number;
        static _BATCH_DELAY: number;
        static _props: string[];
        /**
         * Initializes a new instance of the {@link PivotEngine} class.
         *
         * @param options JavaScript object containing initialization data for the field.
         */
        constructor(options?: any);
        /**
         * Gets or sets the array or {@link ICollectionView} that contains the
         * raw data to be analyzed, an object describing an SSAS cube service,
         * or a string containing the URL for a ComponentOne DataEngine
         * service.
         *
         * The first option (using an array or {@link ICollectionView}) is the
         * simplest, but it limits the amount of raw data you can handle.
         * Loading the raw data into an array can take a long time if the
         * data set contains more than about 50,000 items or so.
         *
         * To use this option, simply set the {@link itemsSource} property to
         * any JavaScript array containing the raw data to be analyzed.
         * For example:
         *
         * ```typescript
         * import { PivotEngine } from '@grapecity/wijmo.olap';
         * let ng = PivotEngine({
         *     itemsSource = getDataArray(1000);
         * });
         * ```
         *
         * The second option (direct connection to OLAP SSAS cubes) allows
         * the {@link PivotEngine} to connect directly to OLAP cubes provided
         * by SSAS servers. This option removes the size limitations mentioned
         * above and allows you to analyze data sets with millions or billions
         * of records.
         *
         * To use this option, set the {@link itemsSource} property to an object
         * that specifies how the component should access the service. For example:
         *
         * ```typescript
         * import { PivotEngine } from '@grapecity/wijmo.olap';
         * let ng = PivotEngine({
         *     itemsSource: {
         *         url: 'http://ssrs.componentone.com/OLAP/msmdpump.dll',
         *         cube: 'Adventure Works',
         *         catalog: 'AdventureWorksDW2012Multidimensional'
         *     }
         * });
         * ```
         *
         * The **catalog** property is optional, but **url** and **cube** are required.
         *
         * The preceding example works with SSAS servers that allow anonymous
         * access. For servers that require Basic Authentication, you should
         * also include the appropriate **user** and **password** members
         * as part of the {@link itemsSource} object.
         *
         * When connecting directly to OLAP SSAS cubes, users will not be able
         * to filter fields by value. They will still be able to filter by
         * condition.
         *
         * The third option, ComponentOne data engine services, allows you to
         * analyze large datasets on a server without downloading the raw data
         * to the client. You can use our high-performance FlexPivot services
         * or interface with Microsoft's SQL Server Analysis Services
         * OLAP Cubes.
         *
         * To use ComponentOne data engine services, set the {@link itemsSource}
         * property to a string containing the URL of the data service.
         * For example:
         *
         * ```typescript
         * import { PivotEngine } from '@grapecity/wijmo.olap';
         * let ng = new wijmo.olap.PivotEngine({
         *     itemsSource: 'http://demos.componentone.com/ASPNET/c1webapi/4.5.20193.222/api/dataengine/cube'
         * });
         * ```
         *
         * The {@link PivotEngine} sends view definitions to the server,
         * where summaries are calculated and returned to the client.
         *
         * When connecting ComponentOne DataEngine data sources, users
         * will not be able to filter fields by value. They will still
         * be able to filter by condition.
         *
         * For more information about the ComponentOne DataEngine
         * services please refer to the
         * <a href="http://helpcentral.componentone.com/nethelp/C1WebAPI/APIDataEngine.html" target="_blank">online documentation</a>.
         *
         * Our <a href="https://demos.wijmo.com/5/SampleExplorer/SampleExplorer/Sample/OlapServerIntro" target="_blank">OlapServerIntro</a>
         * sample shows all options working with a single {@link PivotEngine}.
         */
        itemsSource: any;
        /**
         * Gets a value that determines whether the engine is bound to a server
         * {@link itemsSource} or is using local data.
         */
        readonly isServer: boolean;
        /**
         * Gets the {@link ICollectionView} that contains the raw data.
         */
        readonly collectionView: wijmo.collections.ICollectionView;
        /**
         * Gets the {@link ICollectionView} containing the output pivot view.
         */
        readonly pivotView: wijmo.collections.ICollectionView;
        /**
         * Gets or sets a value that determines whether the output {@link pivotView}
         * should include rows containing subtotals or grand totals.
         *
         * The default value for this property is **ShowTotals.GrandTotals**.
         */
        showRowTotals: ShowTotals;
        /**
         * Gets or sets a value that determines whether the output {@link pivotView}
         * should include columns containing subtotals or grand totals.
         *
         * The default value for this property is **ShowTotals.GrandTotals**.
         */
        showColumnTotals: ShowTotals;
        /**
         * Gets or sets a value that determines whether row and column totals
         * should be displayed before or after regular data rows and columns.
         *
         * If this value is set to true, total rows appear above data rows
         * and total columns appear on the left of regular data columns.
         *
         * The default value for this property is **false**.
         */
        totalsBeforeData: boolean;
        /**
         * Gets or sets a value that determines whether the engine should
         * sort groups when sorting the value fields (measures) or whether
         * it should keep the group order and the data only within each
         * group.
         *
         * The default value for this property is **true**.
         */
        sortableGroups: boolean;
        /**
         * Gets or sets a value that indicates whether the summary data received
         * from the server is already sorted.
         *
         * If this property is set to true, the {@link PivotEngine} will not sort
         * the data it receives from the server.
         *
         * This property should be used only in conjunction with custom servers
         * that return the aggregated data properly sorted, typically using
         * custom logic not available in the standard {@link PivotEngine}.
         *
         * The default value for this property is **false**.
         */
        sortOnServer: boolean;
        /**
         * Gets or sets a value that determines whether the Olap output table
         * should use zeros to indicate missing values.
         *
         * The default value for this property is **false**.
         */
        showZeros: boolean;
        /**
         * Gets or sets the default filter type (by value or by condition).
         *
         * The default value for this property is **null**, which causes
         * the engine to use **FilterType.Both** on the client or
         * **FilterType.Condition** on the server.
         */
        defaultFilterType: wijmo.grid.filter.FilterType;
        /**
         * Gets or sets a value that determines whether the filter should
         * include only values selected by the
         * {@link wijmo.grid.filter.ValueFilter.filterText} property.
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
         * Gets or sets a value that determines whether the engine should generate fields
         * automatically based on the {@link itemsSource}.
         *
         * If you set this property to true, the engine will generate fields for each
         * property of the items in the {@link itemsSource}. The {@link PivotField.binding}
         * property of the auto-generated fields is set to the property name, and their
         * {@link PivotField.header} property is set to a string obtained by capitalizing
         * the first letter of the binding and adding spaces before each capital letter.
         *
         * For example, a 'customerName' property will cause the engine create a field
         * with {@link PivotField.binding} set to 'customerName' and {@link PivotField.header}
         * set to 'Customer Name'.
         *
         * When adding fields to one of the view lists using strings, you must specify
         * the {@link PivotField.header}, not the {@link PivotField.binding} (unlike bindings,
         * field headers must be unique).
         *
         * The default value for this property is **true**.
         */
        autoGenerateFields: boolean;
        /**
         * Gets or sets a value that determines whether users should be allowed to edit
         * the properties of the {@link PivotField} objects owned by this {@link PivotEngine}.
         *
         * If you set this property to false, the context menus shown by controls
         * such as the **PivotGrid** and **PivotPanel** will not include an
         * option for changing the field settings.
         *
         * The default value for this property is **true**.
         */
        allowFieldEditing: boolean;
        /**
         * Gets the list of {@link PivotField} objects exposed by the data source.
         *
         * This list is created automatically whenever the {@link itemsSource} property is set.
         *
         * Pivot views are defined by copying fields from this list to the lists that define
         * the view: {@link valueFields}, {@link rowFields}, {@link columnFields}, and {@link filterFields}.
         *
         * For example, the code below assigns a data source to the {@link PivotEngine} and
         * then defines a view by adding fields to the {@link rowFields}, {@link columnFields}, and
         * {@link valueFields} lists.
         *
         * ```typescript
         * import { PivotEngine } from '@grapecity/wijmo.olap';
    
         * // create pivot engine
         * let pe = new PivotEngine();
         *
         * // set data source (populates fields list)
         * pe.itemsSource = this.getRawData();
         *
         * // prevent updates while building Olap view
         * pe.beginUpdate();
         *
         * // show countries in rows
         * pe.rowFields.push('Country');
         *
         * // show categories and products in columns
         * pe.columnFields.push('Category');
         * pe.columnFields.push('Product');
         *
         * // show total sales in cells
         * pe.valueFields.push('Sales');
         *
         * // done defining the view
         * pe.endUpdate();
         * ```
         */
        readonly fields: PivotFieldCollection;
        /**
         * Gets the list of {@link PivotField} objects that define the fields shown as
         * rows in the output table.
         */
        readonly rowFields: PivotFieldCollection;
        /**
         * Gets the list of {@link PivotField} objects that define the fields shown as
         * columns in the output table.
         */
        readonly columnFields: PivotFieldCollection;
        /**
         * Gets the list of {@link PivotField} objects that define the fields
         * used as filters.
         *
         * Fields on this list do not appear in the output table,
         * but are still used for filtering the input data.
         */
        readonly filterFields: PivotFieldCollection;
        /**
         * Gets the list of {@link PivotField} objects that define the fields
         * summarized in the output table.
         */
        readonly valueFields: PivotFieldCollection;
        /**
         * Gets or sets the current pivot view definition as a JSON string.
         *
         * This property is typically used to persist the current view as
         * an application setting.
         *
         * For example, the code below implements two functions that save
         * and load view definitions using local storage:
         *
         * ```typescript
         * // save/load views
         * function saveView() {
         *   localStorage.viewDefinition = pivotEngine.viewDefinition;
         * }
         * function loadView() {
         *   pivotEngine.viewDefinition = localStorage.viewDefinition;
         * }
         * ```
         */
        viewDefinition: string;
        /**
         * Gets a value that determines whether a pivot view is currently defined.
         *
         * A pivot view is defined if any of the {@link valueFields}, {@link rowFields},
         * or {@link columnFields} lists are not empty.
         */
        readonly isViewDefined: boolean;
        /**
         * Suspends the refresh processes until next call to the {@link endUpdate}.
         */
        beginUpdate(): void;
        /**
         * Resumes refresh processes suspended by calls to {@link beginUpdate}.
         */
        endUpdate(): void;
        /**
         * Gets a value that indicates whether the engine is currently being updated.
         */
        readonly isUpdating: boolean;
        /**
         * Gets a value that indicates whether the viewDefinition have been changed
         * but the changes have not benn applied yet (deferUpdate mode)
         */
        readonly hasDeferredUpdates: boolean;
        private _setHasDeferredUpdates;
        /**
         * Executes a function within a {@link beginUpdate}/{@link endUpdate} block.
         *
         * The control will not be updated until the function has been executed.
         * This method ensures {@link endUpdate} is called even if the function throws
         * an exception.
         *
         * @param fn Function to be executed.
         */
        deferUpdate(fn: Function): void;
        /**
         * Summarizes the data and updates the output {@link pivotView}.
         *
         * @param force Refresh even while updating (see {@link beginUpdate}).
         */
        refresh(force?: boolean): void;
        /**
         * Invalidates the view causing an asynchronous refresh.
         */
        invalidate(): void;
        /**
         * Gets or sets a value that determines whether view updates
         * should be generated asynchronously.
         *
         * This property is set to true by default, so summaries over
         * large data sets are performed asynchronously to prevent
         * stopping the UI thread.
         *
         * The default value for this property is **true**.
         */
        async: boolean;
        /**
         * Gets or sets the maximum amount of time, in milliseconds, that
         * the engine should wait for the results to come back from the
         * server.
         *
         * The default value for this property is **60,000** milliseconds,
         * or one minute. If you expect server operations  to take longer
         * than that, set the property to a higher value.
         */
        serverTimeout: number;
        /**
         * Gets or sets the amount of time, in milliseconds, that the
         * engine should wait before polling the server for progress
         * status while retrieving results.
         *
         * The default value for this property is **500** milliseconds,
         * which causes the engine to poll the server for a status update
         * every half second.
         */
        serverPollInterval: number;
        /**
         * Gets or sets the maximum number of records the {@link getDetail}
         * method should retrieve from the server.
         *
         * The default value for this property is **1,000**, which
         * is a reasonable amount of detail in many scenarios.
         * If you want to allow more detail records to be retrieved,
         * increase the value of this property.
         */
        serverMaxDetail: number;
        /**
         * Cancels any pending asynchronous view updates.
         */
        cancelPendingUpdates(): void;
        /**
         * Gets an array containing the records summarized by a property in the
         * {@link pivotView} list.
         *
         * If the engine is connected to a PivotEngine server, the value returned
         * is an {@link ObservableArray} that is populated asynchronously.
         *
         * @param item Data item in the {@link pivotView} list.
         * @param binding Name of the property being summarized.
         */
        getDetail(item: any, binding: string): any[];
        /**
         * Gets an {@link collections.ICollectionView} containing the records summarized
         * by a property in the {@link pivotView} list.
         *
         * @param item Data item in the {@link pivotView} list.
         * @param binding Name of the property being summarized.
         */
        getDetailView(item: any, binding: string): wijmo.collections.ICollectionView;
        /**
         * Gets an object with information about a property in the {@link pivotView} list.
         *
         * The object returned has two properties, 'rowKey' and 'colKey'. Each of
         * these contains two arrays, 'fields' and 'values'. Together, this information
         * uniquely identifies a value summarized by the {@link PivotEngine}.
         *
         * For example, calling {@link getKeys} against a pivot view with two row fields
         * 'Product' and 'Country', and a single column field 'Active' would return an
         * object such as this one:
         *
         * ```
         * {
         *     rowKey: {
         *         fields: [ 'Product', 'Country'],
         *         values: [ 'Aoba', 'Japan' ]
         *     },
         *     colKey: {
         *         fields: [ 'Active' ],
         *         values: [ true ]
         *     }
         * }
         * ```
         *
         * The object identifies the subset of data used to obtain one summary value.
         * In this case, this value represents all data items for product 'Aoba' sold
         * in Japan with Active state set to true.
         *
         * @param item Data item in the {@link pivotView} list.
         * @param binding Name of the property being summarized.
         */
        getKeys(item: any, binding: string): any;
        /**
         * Shows a settings dialog where users can edit a field's settings.
         *
         * @param field {@link PivotField} to be edited.
         */
        editField(field: PivotField): void;
        /**
         * Removes a field from the current view.
         *
         * @param field {@link PivotField} to be removed.
         */
        removeField(field: PivotField): void;
        /**
         * Occurs after the value of the {@link itemsSource} property changes.
         */
        readonly itemsSourceChanged: Event<PivotEngine, EventArgs>;
        /**
         * Raises the {@link itemsSourceChanged} event.
         */
        onItemsSourceChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs after the view definition changes.
         */
        readonly viewDefinitionChanged: Event<PivotEngine, EventArgs>;
        /**
         * Raises the {@link viewDefinitionChanged} event.
         */
        onViewDefinitionChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the engine starts updating the {@link pivotView} list.
         */
        readonly updatingView: Event<PivotEngine, ProgressEventArgs>;
        /**
         * Raises the {@link updatingView} event.
         *
         * @param e {@link ProgressEventArgs} that provides the event data.
         */
        onUpdatingView(e: ProgressEventArgs): void;
        /**
         * Occurs after the engine has finished updating the {@link pivotView} list.
         */
        readonly updatedView: Event<PivotEngine, EventArgs>;
        /**
         * Raises the {@link updatedView} event.
         */
        onUpdatedView(e?: wijmo.EventArgs): void;
        /**
         * Occurs when there is an error getting data from the server.
         */
        readonly error: Event<PivotEngine, RequestErrorEventArgs>;
        /**
         * Raises the {@link error} event.
         *
         * @param e {@link RequestErrorEventArgs} that contains information about the error.
         */
        onError(e: wijmo.RequestErrorEventArgs): boolean;
        readonly _isUpdatingChanged: Event<PivotEngine, EventArgs>;
        _onIsUpdatingChanged(e?: wijmo.EventArgs): void;
        readonly _hasDeferredUpdatesChanged: Event<PivotEngine, EventArgs>;
        _onHasDeferredUpdatesChanged(e?: wijmo.EventArgs): void;
        _copy(key: string, value: any): boolean;
        _getKey(keyString: string): _PivotKey;
        _getRowKey(row: any): _PivotKey;
        _getRowLevel(row: any): number;
        _getColKey(key: any): _PivotKey;
        _getColLevel(key: any): number;
        _getFieldByColKey(key: any): PivotField;
        private _applyFilter;
        private _updateView;
        private _updateTallies;
        private _updatePivotView;
        private _getSortedKeys;
        private _updateFieldValues;
        _getAggregateObject(item: any, binding: string): any;
        private _getColTotal;
        private _getRunningTotal;
        private _getLastValueInRowGroup;
        private _getRowDifference;
        private _getColDifference;
        _getShowRowTotals(): ShowTotals;
        _getShowColTotals(): ShowTotals;
        _getUniqueValues(fld: PivotField): any[];
        private _generateFields;
        _updateFieldTypes(): void;
        _updateFieldType(fld: PivotField, arr: any[]): void;
        _createField(options: any, autoGenerated: boolean): PivotField;
        private _cvCollectionChanged;
        private _fieldListChanged;
        _fieldPropertyChanged(field: PivotField, e: wijmo.PropertyChangedEventArgs): void;
        _copyProps(dst: any, src: any, props: string[]): void;
        private _getFieldFromDefinition;
        private _getFieldDefinition;
        private _getFieldCollectionProxy;
        private _setFieldCollectionProxy;
    }
    /**
     * Provides arguments for progress events.
     */
    class ProgressEventArgs extends wijmo.EventArgs {
        _progress: number;
        /**
         * Initializes a new instance of the {@link ProgressEventArgs} class.
         *
         * @param progress Number between 0 and 100 that represents the progress.
         */
        constructor(progress: number);
        /**
         * Gets the current progress as a number between 0 and 100.
         */
        readonly progress: number;
    }
}
declare module wijmo.olap {
    /**
     * Context Menu for {@link ListBox} controls containing {@link PivotField} objects.
     */
    class _ListContextMenu extends wijmo.input.Menu {
        _full: boolean;
        /**
         * Initializes a new instance of the {@link _ListContextMenu} class.
         *
         * @param full Whether to include all commands or only the ones that apply to the main field list.
         */
        constructor(full: boolean);
        refresh(fullUpdate?: boolean): void;
        /**
         * Attaches this context menu to a {@link FlexGrid} control.
         *
         * @param grid {@link FlexGrid} control to attach this menu to.
         */
        attach(grid: wijmo.grid.FlexGrid): void;
        _selectField(grid: wijmo.grid.FlexGrid, e: MouseEvent): boolean;
        _getMenuItems(full: boolean): any[];
        _execute(parm: any): void;
        _canExecute(parm: any): boolean;
        _getTargetList(engine: PivotEngine, parm: string): PivotFieldCollection;
    }
}
declare module wijmo.olap {
    /**
     * Provides a user interface for interactively transforming regular data tables into Olap
     * pivot tables.
     *
     * Olap pivot tables group data into one or more dimensions. The dimensions are represented
     * by rows and columns on a grid, and the summarized data is stored in the grid cells.
     *
     * Use the {@link itemsSource} property to set the source data, and the {@link pivotView}
     * property to get the output table containing the summarized data.
     */
    class PivotPanel extends wijmo.Control {
        private _ng;
        private _dFields;
        private _dFilters;
        private _dRows;
        private _dCols;
        private _dVals;
        private _dMarker;
        private _dProgress;
        private _chkDefer;
        private _btnUpdate;
        private _lbFields;
        private _lbFilters;
        private _lbRows;
        private _lbCols;
        private _lbVals;
        private _gFlds;
        private _gDrag;
        private _gFlt;
        private _gCols;
        private _gRows;
        private _gVals;
        private _gDefer;
        _ctxMenuShort: _ListContextMenu;
        _ctxMenuFull: _ListContextMenu;
        private _dragSource;
        private _dragField;
        private _dropIndex;
        private _showIcons;
        private _restrictDrag;
        private _isUpdatingChangedBnd;
        /**
         * Gets or sets the template used to instantiate {@link PivotPanel} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link PivotPanel} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        _getProductInfo(): string;
        /**
         * Gets or sets the {@link PivotEngine} being controlled by this {@link PivotPanel}.
         */
        engine: PivotEngine;
        /**
         * Gets or sets the array or {@link ICollectionView} that contains the raw data.
         */
        itemsSource: any;
        /**
         * Gets the {@link ICollectionView} that contains the raw data.
         */
        readonly collectionView: wijmo.collections.ICollectionView;
        /**
         * Gets the {@link ICollectionView} containing the output pivot view.
         */
        readonly pivotView: wijmo.collections.ICollectionView;
        /**
         * Gets or sets a value that determines whether the engine should populate
         * the {@link fields} collection automatically based on the {@link itemsSource}.
         *
         * The default value for this property is **true**.
         */
        autoGenerateFields: boolean;
        /**
         * Gets the list of fields available for building views.
         */
        readonly fields: PivotFieldCollection;
        /**
         * Gets the list of fields that define the rows in the output table.
         */
        readonly rowFields: PivotFieldCollection;
        /**
         * Gets the list of fields that define the columns in the output table.
         */
        readonly columnFields: PivotFieldCollection;
        /**
         * Gets the list of fields that define the values shown in the output table.
         */
        readonly valueFields: PivotFieldCollection;
        /**
         * Gets the list of fields that define filters applied while generating the output table.
         */
        readonly filterFields: PivotFieldCollection;
        /**
         * Gets or sets the current pivot view definition as a JSON string.
         *
         * This property is typically used to persist the current view as
         * an application setting.
         *
         * For example, the code below implements two functions that save
         * and load view definitions using local storage:
         *
         * ```typescript
         * // save/load views
         * function saveView() {
         *   localStorage.viewDefinition = pivotPanel.viewDefinition;
         * }
         * function loadView() {
         *   pivotPanel.viewDefinition = localStorage.viewDefinition;
         * }
         * ```
         */
        viewDefinition: string;
        /**
         * Gets a value that determines whether a pivot view is currently defined.
         *
         * A pivot view is defined if the {@link valueFields} list is not empty and
         * either the {@link rowFields} or {@link columnFields} lists are not empty.
         */
        readonly isViewDefined: boolean;
        /**
         * Gets or sets a value that determines whether the main field list should
         * include icons indicating whether fields are measure or dimension fields.
         *
         * The default value for this property is **true**.
         */
        showFieldIcons: boolean;
        /**
         * Gets or sets a value that determines whether the panel should restrict
         * drag operations based on field types.
         *
         * Setting this property to true prevents dragging dimension fields into
         * the value field list and measure fields into the row or column field
         * lists.
         *
         * Setting this property to false allows all drag operations.
         *
         * The default value for this property is **null**, which
         * allows all drag operations on regular data sources and
         * restricts dragging on cube data sources.
         */
        restrictDragging: boolean | null;
        /**
         * Gets or sets a value that determines whether engine is in deferred update state or not.
         */
        deferredUpdate: boolean;
        /**
         * Occurs after the value of the {@link deferredUpdate} property changes.
         */
        readonly deferredUpdateChanged: Event<PivotPanel, EventArgs>;
        /**
         * Raises the {@link deferredUpdateChanged} event.
         */
        onDeferredUpdateChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs after the value of the {@link itemsSource} property changes.
         */
        readonly itemsSourceChanged: Event<PivotPanel, EventArgs>;
        /**
         * Raises the {@link itemsSourceChanged} event.
         */
        onItemsSourceChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs after the view definition changes.
         */
        readonly viewDefinitionChanged: Event<PivotPanel, EventArgs>;
        /**
         * Raises the {@link viewDefinitionChanged} event.
         */
        onViewDefinitionChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the engine starts updating the {@link pivotView} list.
         */
        readonly updatingView: Event<PivotPanel, EventArgs>;
        /**
         * Raises the {@link updatingView} event.
         *
         * @param e {@link ProgressEventArgs} that provides the event data.
         */
        onUpdatingView(e: ProgressEventArgs): void;
        /**
         * Occurs after the engine has finished updating the {@link pivotView} list.
         */
        readonly updatedView: Event<PivotPanel, EventArgs>;
        /**
         * Raises the {@link updatedView} event.
         */
        onUpdatedView(e?: wijmo.EventArgs): void;
        refresh(fullUpdate?: boolean): void;
        _copy(key: string, value: any): boolean;
        _globalize(): void;
        _itemsSourceChanged(s: PivotEngine, e?: wijmo.EventArgs): void;
        _viewDefinitionChanged(s: PivotEngine, e?: wijmo.EventArgs): void;
        _updatingView(s: PivotEngine, e: ProgressEventArgs): void;
        _updatedView(s: PivotEngine, e?: wijmo.EventArgs): void;
        _requestError(s: PivotEngine, e: wijmo.RequestErrorEventArgs): void;
        _isUpdatingChanged(): void;
        _updateDeferredUpdateElements(): void;
        _createFieldGrid(host: HTMLElement): wijmo.grid.FlexGrid;
        _dragstart(e: DragEvent): void;
        _dragover(e: DragEvent): void;
        _drop(e: DragEvent): void;
        _dragend(e: DragEvent): void;
        _hitTestField(grid: wijmo.grid.FlexGrid, e: MouseEvent): PivotField;
        _getRestrictDrag(): boolean;
        _resetMouseState(): void;
        _getFlexGridTarget(e: DragEvent): wijmo.grid.FlexGrid;
        _updateDropMarker(grid?: wijmo.grid.FlexGrid, e?: DragEvent): void;
    }
}
declare module wijmo.olap {
    /**
     * Extends the {@link FlexGrid} control to display pivot tables.
     *
     * To use this control, set its {@link itemsSource} property to an instance of a
     * {@link PivotPanel} control or to a {@link PivotEngine}.
     */
    class PivotGrid extends wijmo.grid.FlexGrid {
        private _ng;
        private _htDown;
        private _showDetailOnDoubleClick;
        private _collapsibleSubtotals;
        private _customCtxMenu;
        private _ctxMenu;
        private _showRowFldSort;
        private _showRowFldHdrs;
        private _showColFldHdrs;
        private _showValFldHdrs;
        private _centerVert;
        private _collapsedKeys;
        private _resizingColumn;
        private _dlgDetail;
        private _outlineMode;
        private _ignoreClick;
        _colRowFields: Map<grid.Column, PivotField>;
        private _prevCulture;
        static _WJC_COLLAPSE: string;
        static _WJC_DISABLED: string;
        /**
         * Initializes a new instance of the {@link PivotGrid} class.
         *
         * @param element The DOM element that will host the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        _getProductInfo(): string;
        /**
         * Gets a reference to the {@link PivotEngine} that owns this {@link PivotGrid}.
         */
        readonly engine: PivotEngine;
        /**
         * Gets or sets a value that determines whether the grid should show a popup
         * containing the detail records when the user double-clicks a cell.
         *
         * The default value for this property is **true**.
         */
        showDetailOnDoubleClick: boolean;
        /**
         * Gets a reference to the {@link DetailDialog} used to display the detail records
         * when the user double-clicks a cell.
         *
         * This property can be used to customize the content of the {@link DetailDialog}.
         *
         * It can also be used to customize properties of the dialog, which is a {@link Popup}
         * control. For example, this code disables the default animations used when
         * showing and hiding the detail dialog:
         *
         * ```typscript
         * let dlg = thePivotGrid.detailDialog;
         * dlg.fadeIn = false;
         * dlg.fadeOut = false;
         * ```
         *
         * See also the {@link showDetailOnDoubleClick} property and the {@link showDetail}
         * method.
         */
        readonly detailDialog: DetailDialog;
        /**
         * Gets or sets a value that determines whether the grid should
         * display row field headers in its top-left panel.
         *
         * The default value for this property is **true**.
         */
        showRowFieldHeaders: boolean;
        /**
         * Gets or sets a value that determines whether the grid should
         * display column field headers in its top-left panel.
         *
         * The default value for this property is **true**.
         */
        showColumnFieldHeaders: boolean;
        /**
         * Gets or sets a value that determines whether the grid should
         * display value field headers in its content panel even when
         * the view has a single value field and a single column field.
         *
         * The default value for this property is **false**.
         */
        showValueFieldHeaders: boolean;
        /**
         * Gets or sets a value that determines whether the grid should display
         * sort indicators in the column headers for row fields.
         *
         * Unlike regular column headers, row fields are always sorted, either
         * in ascending or descending order. If you set this property to true,
         * sort icons will always be displayed over any row field headers.
         *
         * The default value for this property is **false**.
         */
        showRowFieldSort: boolean;
        /**
         * Gets or sets a value that determines whether the grid should provide a
         * custom context menu.
         *
         * The custom context menu includes commands for changing field settings,
         * removing fields, or showing detail records for the grid cells.
         *
         * The default value for this property is **true**.
         */
        customContextMenu: boolean;
        /**
         * Gets or sets a value that determines whether the grid should allow
         * users to collapse and expand subtotal groups of rows and columns.
         *
         * The default value for this property is **true**.
         */
        collapsibleSubtotals: boolean;
        /**
         * Gets or sets a value that determines whether the content of
         * header cells should be vertically centered.
         *
         * The default value for this property is **true**.
         */
        centerHeadersVertically: boolean;
        /**
         * Gets or sets a value that determines whether the grid should display
         * row groups in outline format, allowing for more compact displays.
         *
         * The default value for this property is **false**.
         *
         * In most applications, outline mode works best when rows have
         * subtotals shown before the data, so if you set {@link outlineMode}
         * to true it makes sense to set the pivotEngine's {@link showRowTotals}
         * property to **ShowTotals.Subtotals** and the {@link totalsBeforeData}
         * property to **true**.
         *
         * For example:
         *
         * ```typescript
         * import { PivotEngine, ShowTotals} from '@grapecity/wijmo.olap';
         * let theEngine = new PivotEngine({
         *     showRowTotals: ShowTotals.Subtotals,
         *     totalsBeforeData: true,
         *     itemsSource: getData()
         * });
         * let theGrid = new PivotGrid('#theGrid', {
         *     itemsSource: theEngine,
         *     outlineMode: true
         * });
         * ```
         */
        outlineMode: boolean;
        /**
         * Gets an object with information about the fields and values
         * being used to summarize a given cell.
         *
         * For more details, see the @PivotEngine.getKeys method.
         *
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        getKeys(row: number, col: number): any;
        /**
         * Gets an array containing the records summarized by a given grid cell.
         *
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        getDetail(row: number, col: number): any[];
        /**
         * Gets an {@link wijmo.ICollectionView} containing the records
         * summarized by a given grid cell.
         *
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        getDetailView(row: number, col: number): wijmo.collections.ICollectionView;
        /**
         * Shows a dialog containing details for a given grid cell.
         *
         * @param row Index of the row that contains the cell.
         * @param col Index of the column that contains the cell.
         */
        showDetail(row: number, col: number): void;
        /**
         * Collapses all rows to a given level.
         *
         * @param level Maximum row level to show. Zero means show only
         * grand totals; one means show only top-level groups; very high
         * levels expand all rows.
         */
        collapseRowsToLevel(level: number): void;
        /**
         * Collapses all columns to a given level.
         *
         * @param level Maximum column level to show. Zero means show only
         * grand totals; one means show only top-level groups; very high
         * levels expand all columns.
         */
        collapseColumnsToLevel(level: number): void;
        _getQuickAutoSize(): boolean;
        _bindGrid(full: boolean): void;
        protected _getCollectionView(value: any): wijmo.collections.ICollectionView;
        refresh(fullUpdate?: boolean): void;
        onItemsSourceChanged(e?: wijmo.EventArgs): void;
        onResizedColumn(e: wijmo.grid.CellRangeEventArgs): void;
        onSortingColumn(e: wijmo.grid.CellRangeEventArgs): boolean;
        onDraggingColumn(e: wijmo.grid.CellRangeEventArgs): boolean;
        onDraggedColumn(e: wijmo.grid.CellRangeEventArgs): void;
        _updatingView(): void;
        _viewDefinitionChanged(): void;
        _hasDeferredUpdatesChanged(): void;
        onLoadedRows(e?: wijmo.EventArgs): void;
        private _generateColumns;
        _updateFixedCounts(): void;
        _updateFixedContent(): void;
        protected _updateDefaultSizes(): number;
        _formatItem(s: any, e: wijmo.grid.FormatItemEventArgs): void;
        _getCollapsedGlyph(collapsed: boolean): string;
        _mousedown(e: MouseEvent): void;
        _mouseup(e: MouseEvent): void;
        _click(e: MouseEvent): void;
        _dblclick(e: MouseEvent): void;
        _keydown(e: KeyboardEvent): void;
        _getRowLevel(row: number): number;
        _getGroupedRows(rng: wijmo.grid.CellRange): wijmo.grid.CellRange;
        _toggleRowCollapsed(rng: wijmo.grid.CellRange): void;
        _getRowCollapsed(rng: wijmo.grid.CellRange): boolean;
        _setRowCollapsed(rng: wijmo.grid.CellRange, collapse: boolean): void;
        _collapseRowsToLevel(level: number): void;
        _getColLevel(col: number): number;
        _getGroupedCols(rng: wijmo.grid.CellRange): wijmo.grid.CellRange;
        _toggleColCollapsed(rng: wijmo.grid.CellRange): void;
        _getColCollapsed(rng: wijmo.grid.CellRange): boolean;
        _setColCollapsed(rng: wijmo.grid.CellRange, collapse: boolean): void;
        _collapseColsToLevel(level: number): void;
    }
}
declare module wijmo.olap {
    /**
     * Represents a dialog used to display details for a grid cell.
     */
    class DetailDialog extends wijmo.input.Popup {
        private _g;
        private _sCnt;
        private _dSummary;
        private _dGrid;
        private _btnOK;
        private _gHdr;
        private _rowHdr;
        private _colHdr;
        private _cellHdr;
        private _cellValue;
        private _detailCount;
        /**
         * Gets or sets the template used to instantiate {@link PivotFieldEditor} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link DetailDialog} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        showDetail(ownerGrid: PivotGrid, cell: wijmo.grid.CellRange): void;
        /**
         * Gets the row header for the value being shown.
         *
         * This information is updated before the dialog is shown and
         * is displayed above the detail grid.
         */
        readonly rowHeader: string;
        /**
         * Gets the column header for the value being shown.
         *
         * This information is updated before the dialog is shown and
         * is displayed above the detail grid.
         */
        readonly columnHeader: string;
        /**
         * Gets the cell header for the value being shown.
         *
         * This information is updated before the dialog is shown and
         * is displayed above the detail grid.
         */
        readonly cellHeader: string;
        /**
         * Gets the formatted cell value for the value being shown.
         *
         * This information is updated before the dialog is shown and
         * is displayed above the detail grid.
         */
        readonly cellValue: string;
        /**
         * Gets the number of items shown in the detail dialog.
         *
         * This information is updated before the dialog is shown and
         * is in the dialog header.
         */
        readonly detailCount: number;
        _updateDetailCount(cnt: number): void;
        _getHeader(key: _PivotKey): string;
    }
}
declare module wijmo.olap {
    /**
     * Provides custom merging for {@link PivotGrid} controls.
     */
    class _PivotMergeManager extends wijmo.grid.MergeManager {
        protected _ng: PivotEngine;
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
        getMergedRange(p: wijmo.grid.GridPanel, r: number, c: number, clip?: boolean): wijmo.grid.CellRange;
        _getMergedTopLeftRange(p: wijmo.grid.GridPanel, r: number, c: number): wijmo.grid.CellRange;
        _getMergedRowHeaderRange(p: wijmo.grid.GridPanel, r: number, c: number, rng: wijmo.grid.CellRange): wijmo.grid.CellRange;
        _sameColumnValues(p: wijmo.grid.GridPanel, r1: number, r2: number, c: number): boolean;
        _isSubtotal(p: wijmo.grid.GridPanel, r: number, c: number): boolean;
        _getOutlineRange(p: wijmo.grid.GridPanel, r: number, c: number): wijmo.grid.CellRange;
        _getMergedColumnHeaderRange(p: wijmo.grid.GridPanel, r: number, c: number, rng: wijmo.grid.CellRange): wijmo.grid.CellRange;
        _sameRowValues(p: wijmo.grid.GridPanel, r: number, c1: number, c2: number): boolean;
    }
}
declare module wijmo.olap {
    /**
     * Specifies constants that define the chart type.
     */
    enum PivotChartType {
        /** Shows vertical bars and allows you to compare values of items across categories. */
        Column = 0,
        /** Shows horizontal bars. */
        Bar = 1,
        /** Shows patterns within the data using X and Y coordinates. */
        Scatter = 2,
        /** Shows trends over a period of time or across categories. */
        Line = 3,
        /** Shows line chart with the area below the line filled with color. */
        Area = 4,
        /** Shows pie chart. */
        Pie = 5
    }
    /**
     * Specifies constants that define when the chart legend should be displayed.
     */
    enum LegendVisibility {
        /** Always show the legend. */
        Always = 0,
        /** Never show the legend. */
        Never = 1,
        /** Show the legend if the chart has more than one series. */
        Auto = 2
    }
    /**
     * Provides visual representations of {@link wijmo.olap} pivot tables.
     *
     * To use the control, set its {@link itemsSource} property to an instance of a
     * {@link PivotPanel} control or to a {@link PivotEngine}.
     */
    class PivotChart extends wijmo.Control {
        static MAX_SERIES: number;
        static MAX_POINTS: number;
        static HRHAXISCSS: string;
        private _ng;
        private _chartType;
        private _showHierarchicalAxes;
        private _showTotals;
        private _showTitle;
        private _showLegend;
        private _legendPosition;
        private _maxSeries;
        private _maxPoints;
        private _stacking;
        private _header;
        private _headerStyle;
        private _footer;
        private _footerStyle;
        private _itemsSource;
        private _flexChart;
        private _flexPie;
        private _colMenu;
        private _colItms;
        private _dataItms;
        private _lblsSrc;
        private _grpLblsSrc;
        /**
         * Initializes a new instance of the {@link PivotChart} class.
         *
         * @param element The DOM element that will host the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        _getProductInfo(): string;
        /**
         * Gets a reference to the {@link PivotEngine} that owns this {@link PivotChart}.
         */
        readonly engine: PivotEngine;
        /**
         * Gets or sets the {@link PivotEngine} or {@link PivotPanel} that provides data
         * for this {@link PivotChart}.
         */
        itemsSource: any;
        /**
         * Gets or sets the type of chart to create.
         *
         * The default value for this property is <b>PivotChartType.Column</b>.
         */
        chartType: PivotChartType;
        /**
         * Gets or sets a value that determines whether the chart should group axis
         * annotations for grouped data.
         *
         * The default value for this property is <b>true</b>.
         */
        showHierarchicalAxes: boolean;
        /**
         * Gets or sets a value that determines whether the chart should
         * include only totals.
         *
         * If showTotals is true and the view has Column Fields, then the
         * chart will show column totals instead of individual values.
         *
         * The default value for this property is <b>false</b>.
         */
        showTotals: boolean;
        /**
         * Gets or sets a value that determines whether the chart
         * should include a title.
         *
         * The default value for this property is <b>true</b>.
         */
        showTitle: boolean;
        /**
         * Gets or sets a value that determines whether the chart
         * should include a legend.
         *
         * The default value for this property is <b>LegendVisibility.Always</b>.
         */
        showLegend: LegendVisibility;
        /**
         * Gets or sets a value that determines whether and where the legend
         * appears in relation to the plot area.
         *
         * The default value for this property is <b>Position.Right</b>.
         */
        legendPosition: wijmo.chart.Position;
        /**
         * Gets or sets a value that determines whether and how the
         * series objects are stacked.
         *
         * The default value for this property is <b>Stacking.None</b>.
         */
        stacking: wijmo.chart.Stacking;
        /**
         * Gets or sets the maximum number of data series to be
         * shown in the chart.
         *
         * The default value for this property is <b>100</b> series.
         */
        maxSeries: number;
        /**
         * Gets or sets the maximum number of points to be shown in each series.
         *
         * The default value for this property is <b>100</b> points.
         */
        maxPoints: number;
        /**
         * Gets a reference to the inner <b>FlexChart</b> control.
         */
        readonly flexChart: wijmo.chart.FlexChart;
        /**
         * Gets a reference to the inner <b>FlexPie</b> control.
         */
        readonly flexPie: wijmo.chart.FlexPie;
        /**
         * Gets or sets the text displayed in the chart header.
         */
        header: string;
        /**
         * Gets or sets the text displayed in the chart footer.
         */
        footer: string;
        /**
         * Gets or sets the style of the chart header.
         */
        headerStyle: any;
        /**
         * Gets or sets the style of the chart footer.
         */
        footerStyle: any;
        /**
         * Refreshes the control.
         *
         * @param fullUpdate Whether to update the control layout as well as the content.
         */
        refresh(fullUpdate?: boolean): void;
        /**
         * Saves the chart to an image data url.
         *
         * NOTE: This method does not work in IE browsers. If you require IE support,
         * add the <code>wijmo.chart.render</code> module to the page.
         *
         * @param format The {@link wijmo.chart.ImageFormat} for the exported image.
         * @param done A function to be called after data url is generated. The function gets passed the data url as its argument.
         */
        saveImageToDataUrl(format: wijmo.chart.ImageFormat, done: Function): void;
        /**
         * Saves the chart to an image file.
         *
         * NOTE: This method does not work in IE browsers. If you require IE support,
         * add the <code>wijmo.chart.render</code> module to the page.
         *
         * @param filename The filename for the exported image file including extension.
         * Supported types are PNG, JPEG and SVG.
         */
        saveImageToFile(filename: string): void;
        private _onItemsSourceChanged;
        private _createFlexChart;
        private _createFlexPie;
        private _updatePivotChart;
        private _updateFlexChartOrPie;
        private _updateFlexChart;
        private _updateFlexPie;
        private _getLegendPosition;
        private _createSeries;
        private _getColumns;
        private _createGroupAxes;
        private _updateFlexPieBinding;
        private _updatePieInfo;
        private _changeChartType;
        private _swapChartAndPie;
        private _getLabel;
        private _getValue;
        private _getChartTitle;
        private _getTitle;
        private _isValidColumn;
        private _isTotalRow;
        private _isPieChart;
        private _isRotatedChart;
        private _getMergeIndex;
        private _getOffsetWidth;
    }
}
declare module wijmo.olap {
    /**
     * Generates MDX queries for the {@link _SqlServerConnection} class.
     */
    class _MdxQueryBuilder {
        private _ng;
        private _cubeName;
        /**
         * Initializes a new instance of the {@link _MdxQueryBuilder} class.
         *
         * @param engine {@link PivotEngine} from which to derive a query.
         * @param cubeName Name of the cube to be queried.
         */
        constructor(engine: PivotEngine, cubeName: string);
        /**
         * Builds the MDX query according to information from the {@link PivotEngine}.
         */
        buildQuery(): string;
        /**
         * Builds expressions for the WHERE section of the MDX query.
         *
         * @param measureShelf Collection of measure fields.
         */
        private buildWhereSection;
        /**
         * Returns the cube name for the FROM section of the MDX query.
         */
        private buildCubeName;
        /**
         * Builds the subcube section.
         */
        private buildSubcubeExpression;
        private buildFilterAttributeSet;
        private buildFilterString;
        private getValueFilterString;
        private getConditionFilterString;
        private getMeasureFilterExpressions;
        private getConditionFilterExpression;
        /**
         * Builds expressions for the SELECT section of the MDX query.
         */
        private buildAxes;
        /**
         * Builds set for one axis.
         *
         * @param shelf Collection of fields to include in tuples of the set.
         */
        private buildSetForAttributesShelf;
        /**
         * Builds set for one axis.
         *
         * @param shelf Collection of fields to include in tuples of the set.
         */
        private buildSetForAttributesColumnShelf;
        /**
         * Builds set for one axis.
         *
         * @param shelf Collection of fields to include in tuples of the set.
         */
        private buildSetForMeasuresShelf;
        /**
         * Builds set for one attribute.
         *
         * @param field Attribute or named set.
         */
        private buildAttributeSetForAxis;
        /**
         * Builds set for one attribute.
         *
         * @param field Attribute or named set.
         */
        private buildMeasureSetForAxis;
    }
}
declare module wijmo.olap {
    /**
     * Represents a connection to a standard SSAS service.
     */
    class _SqlServerConnection extends _ServerConnection {
        private _jsonResult;
        private _dataTypes;
        private _cubeName;
        private _catalogName;
        private _url;
        private _user;
        private _password;
        private _debug;
        /**
         * Initializes a new instance of the {@link _SqlServerConnection} class.
         *
         * @param engine {@link PivotEngine} that owns this field.
         * @param options Options used to communicate with the server.
         */
        constructor(engine: PivotEngine, options: any);
        /**
         * Gets a list of fields available on the server.
         */
        getFields(): PivotField[];
        /**
         * Gets the output view for the current view definition.
         *
         * @param callBack function invoked to handle the results.
         */
        getOutputView(callBack: Function): void;
        /**
         * Gets an array containing the data items that were used to calculate
         * an aggregated cell.
         *
         * @param rowKey Identifies the row that contains the aggregated cell.
         * @param colKey Identifies the column that contains the aggregated cell.
         */
        getDetail(rowKey: any, colKey: any): any[];
        /**
         * Returns a sorted array of PivotKey ids (if sortOnServer is true, the assumption is
         * that subtotal keys are returned by the server as if totalsBeforeData is also true).
         */
        getSortedKeys(obj: any, isRow?: boolean): string[];
        _getSession(): XMLHttpRequest;
        _endSession(): XMLHttpRequest;
        _getProperties(id: any): XMLHttpRequest;
        _getDimensions(id: any): XMLHttpRequest;
        _getSubFolders(id: any, dimension: any, field: any): void;
        _getMeasures(id: any, fields: any): XMLHttpRequest;
        _getKPIs(id: any, field: any): XMLHttpRequest;
        _execQuery(id: any, query: any, success: Function): XMLHttpRequest;
        _createPivotKeys(xml: Document): void;
        _createRowKeys(cellData: Element, rowAxis: Element, columnAxis: Element): void;
        _createRowOnlyKeys(cellData: Element, rowAxis: Element): void;
        _createColumnOnlyKeys(cellData: Element, columnAxis: Element): void;
        _validateTuple(tuple: Element, totals: ShowTotals): any;
    }
}
declare module wijmo.olap {
    /**
     * Represents a filter used to select values for a {@link PivotField}.
     *
     * There are two types of filter: by value and by condition.
     *
     * Value filters allow users to select specific values they want
     * to include in the analysis. This is done by checking specific
     * values from a list.
     *
     * Condition filters include two conditions specified by an operator
     * and a value (e.g. 'begins with' and 's'). The conditions may
     * be combined with an 'and' or an 'or' operator.
     *
     * When the {@link PivotEngine} is connected to server-based data
     * sources, only condition filters can be used (value filters are
     * automatically hidden).
     */
    class PivotFilter {
        private _fld;
        private _valueFilter;
        private _conditionFilter;
        _filterType: wijmo.grid.filter.FilterType;
        /**
         * Initializes a new instance of the {@link PivotFilter} class.
         *
         * @param field {@link PivotField} that owns this filter.
         */
        constructor(field: PivotField);
        /**
         * Gets or sets the types of filtering provided by this filter.
         *
         * Setting this property to null causes the filter to use the value
         * defined by the owner filter's {@link FlexGridFilter.defaultFilterType}
         * property.
         */
        filterType: wijmo.grid.filter.FilterType;
        /**
         * Gets a value that indicates whether a value passes the filter.
         *
         * @param value The value to test.
         */
        apply(value: any): boolean;
        /**
         * Gets a value that indicates whether the filter is active.
         */
        readonly isActive: boolean;
        /**
         * Clears the filter.
         */
        clear(): void;
        /**
         * Gets the {@link ValueFilter} in this {@link PivotFilter}.
         */
        readonly valueFilter: wijmo.grid.filter.ValueFilter;
        /**
         * Gets the {@link ConditionFilter} in this {@link PivotFilter}.
         */
        readonly conditionFilter: wijmo.grid.filter.ConditionFilter;
    }
}
declare module wijmo.olap {
    /**
     * Editor for {@link PivotFilter} objects.
     */
    class PivotFilterEditor extends wijmo.Control {
        private _fld;
        private _uniqueValues;
        private _divType;
        private _aCnd;
        private _aVal;
        private _divEdtVal;
        private _divEdtCnd;
        private _btnOk;
        private _edtVal;
        private _edtCnd;
        /**
         * Gets or sets the template used to instantiate {@link PivotFilterEditor} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link PivotFilterEditor} class.
         *
         * @param element The DOM element that hosts the control, or a selector
         * for the host element (e.g. '#theCtrl').
         * @param field The {@link PivotField} to edit.
         * @param options JavaScript object containing initialization data for the editor.
         */
        constructor(element: any, field: PivotField, options?: any);
        /**
         * Gets a reference to the {@link PivotField} whose filter is being edited.
         */
        readonly field: PivotField;
        /**
         * Gets a reference to the {@link PivotFilter} being edited.
         */
        readonly filter: PivotFilter;
        /**
         * Gets a value that determines whether the editor has been cleared.
         */
        readonly isEditorClear: boolean;
        /**
         * Updates the editor with current filter settings.
         */
        updateEditor(): void;
        /**
         * Updates the filter to reflect the current editor values.
         */
        updateFilter(): void;
        /**
         * Clears the editor fields without applying changes to the filter.
         */
        clearEditor(): void;
        /**
         * Occurs when the user finishes editing the filter.
         */
        readonly finishEditing: Event<PivotFilterEditor, CancelEventArgs>;
        /**
         * Raises the {@link finishEditing} event.
         */
        onFinishEditing(e?: wijmo.CancelEventArgs): boolean;
        private _showFilter;
        _enableLink(a: HTMLLinkElement, enable: boolean): void;
        private _getFilterType;
        private _btnClicked;
    }
}
declare module wijmo.olap {
    /**
     * Editor for {@link PivotField} objects.
     */
    class PivotFieldEditor extends wijmo.Control {
        private _fld;
        private _pvDate;
        private _dBnd;
        private _dHdr;
        private _dAgg;
        private _dShw;
        private _dWFl;
        private _dSrt;
        private _dFmt;
        private _dSmp;
        private _dFlt;
        private _btnFltEdt;
        private _btnFltClr;
        private _btnApply;
        private _btnCancel;
        private _cmbHdr;
        private _cmbAgg;
        private _cmbShw;
        private _cmbWFl;
        private _cmbSrt;
        private _cmbFmt;
        private _cmbSmp;
        private _eFlt;
        private _gDlg;
        private _gHdr;
        private _gAgg;
        private _gShw;
        private _gWfl;
        private _gSrt;
        private _gFlt;
        private _gFmt;
        private _gSmp;
        /**
         * Gets or sets the template used to instantiate {@link PivotFieldEditor} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link PivotFieldEditor} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        /**
         * Gets or sets a reference to the {@link PivotField} being edited.
         */
        field: PivotField;
        /**
         * Updates editor to reflect the current field values.
         */
        updateEditor(): void;
        /**
         * Updates field to reflect the current editor values.
         */
        updateField(): void;
        _initAggregateOptions(): void;
        _initShowAsOptions(): void;
        _initFormatOptions(): void;
        _initWeighByOptions(): void;
        _initSortOptions(): void;
        _updateFormat(): void;
        _updatePreview(): void;
        _editFilter(): void;
        _createFilterEditor(): void;
        _closeFilter(): void;
    }
}
declare module wijmo.olap {
}
declare module wijmo.olap {
    /**
     * Provides binding for {@link PivotField} class
     */
    class PivotFieldBinding extends wijmo.Binding {
        private readonly _fld;
        /**
         * Initializes a new instance of the {@link PivotFieldBinding} class.
         *
         * @param field bound PivotField.
         * @param path Name of the property to bind to.
         */
        constructor(field: PivotField, path: string);
        /**
         * Gets the binding value for a given object.
         * Takes into consideration getValue prop of {@link PivotField} class
         *
         * If the object does not contain the property specified by the
         * binding {@link path}, the method returns null.
         *
         * @param object The object that contains the data to be retrieved.
         */
        getValue(object: any): any;
    }
}
