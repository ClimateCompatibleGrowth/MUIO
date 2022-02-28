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
declare module wijmo.odata {
    function softGrid(): typeof wijmo.grid;
    function softFilter(): typeof wijmo.grid.filter;
}
declare module wijmo.odata {
    /**
     * Extends the {@link CollectionView} class to support loading and
     * saving data from OData sources.
     *
     * You can use the {@link ODataCollectionView} class to load data from
     * OData services and use it as a data source for Wijmo controls.
     *
     * In addition to full CRUD support you get all the {@link CollectionView}
     * features including sorting, filtering, paging, and grouping.
     * The sorting, filtering, and paging functions may be performed on the
     * server or on the client.
     *
     * The code below shows how you can instantiate an {@link ODataCollectionView}
     * that selects some fields from the data source and provides sorting on the
     * client.
     * Notice how the 'options' parameter is used to pass in initialization
     * data, which is the same approach used when initializing controls:
     *
     * ```typescript
     * import { ODataCollectionView } from '@grapecity/wijmo.odata';
     * const url = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
     * const categories = new ODataCollectionView(url, 'Categories', {
     *   fields: ['CategoryID', 'CategoryName', 'Description'],
     *   sortOnServer: false
     * });
     * ```
     *
     * The example below uses an {@link ODataCollectionView} to load data from
     * a NorthWind OData provider service, and shows the result in a
     * {@link FlexGrid} control:
     *
     * {@sample Grid/Data-binding/ODataAPI/purejs Example}
     */
    class ODataCollectionView extends wijmo.collections.CollectionView {
        _url: string;
        _tbl: string;
        _entityType: string;
        _count: number;
        _fields: string[];
        _keys: string[];
        _expand: string;
        _dataTypes: any;
        _sortOnServer: boolean;
        _pageOnServer: boolean;
        _filterOnServer: boolean;
        _deferCommits: boolean;
        _hasPendingChanges: boolean;
        _showDatesAsGmt: boolean;
        _inferDataTypes: boolean;
        _dataTypesInferred: any;
        _reviverBnd: any;
        _jsonReviver: Function;
        _filterDef: string;
        _toGetData: any;
        _loading: boolean;
        _requestHeaders: any;
        _odv: number;
        static _odvCache: {};
        static _rxDate: RegExp;
        /**
         * Initializes a new instance of the {@link ODataCollectionView} class.
         *
         * @param url Url of the OData service (for example
         * 'https://services.odata.org/Northwind/Northwind.svc/').
         * @param tableName Name of the table (entity) to retrieve from the service.
         * If not provided, a list of the tables (entities) available is retrieved.
         * @param options JavaScript object containing initialization data (property
         * values and event handlers) for the {@link ODataCollectionView}.
         */
        constructor(url: string, tableName: string, options?: any);
        /**
         * Gets the name of the table (entity) that this collection is bound to.
         */
        readonly tableName: string;
        /**
         * Gets or sets a string that represents the entity's data type on the server.
         *
         * This may be required to update data in some OData services.
         *
         * For more details, please see
         * http://docs.oasis-open.org/odata/odata-json-format/v4.0/cs01/odata-json-format-v4.0-cs01.html#_Toc365464687.
         */
        entityType: string;
        /**
         * Gets or sets an array containing the names of the fields to retrieve from
         * the data source.
         *
         * If this property is set to null or to an empty array, all fields are
         * retrieved.
         *
         * For example, the code below creates an {@link ODataCollectionView} that
         * gets only three fields from the 'Categories' table in the database:
         *
         * ```typescript
         * import { ODataCollectionView } from '@grapecity/wijmo.odata';
         * const url = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
         * const categories = new ODataCollectionView(url, 'Categories', {
         *   fields: ['CategoryID', 'CategoryName', 'Description']
         * });
         * ```
         */
        fields: string[];
        /**
         * Gets or sets an object containing request headers to be used when sending
         * or requesting data.
         *
         * The most typical use for this property is in scenarios where authentication
         * is required. For example:
         *
         * ```typescript
         * import { ODataCollectionView } from '@grapecity/wijmo.odata';
         * const url = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
         * const categories = new ODataCollectionView(serviceUrl, 'Categories', {
         *   fields: ['Category_ID', 'Category_Name'],
         *   requestHeaders: { Authorization: db.token }
         * });
         * ```
         */
        requestHeaders: any;
        /**
         * Gets or sets an array containing the names of the key fields.
         *
         * Key fields are required for update operations (add/remove/delete).
         */
        keys: string[];
        /**
         * Gets or sets a string that specifies whether related entities should
         * be included in the return data.
         *
         * This property maps directly to OData's $expand option.
         *
         * For example, the code below retrieves all the customers and their
         * orders from the database. Each customer entity has an "Orders"
         * field that contains an array of order objects:
         *
         * ```typescript
         * import { ODataCollectionView } from '@grapecity/wijmo.odata';
         * const url = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
         * const customersOrders = new ODataCollectionView(url, 'Customers', {
         *   expand: 'Orders'
         * });
         * ```
         */
        expand: string;
        /**
         * Gets or sets a custom reviver function to use when parsing JSON
         * values returned from the server.
         *
         * If provided, the function must take two parameters (key and value),
         * and must return the parsed value (which can be the same as the
         * original value).
         *
         * For details about reviver functions, please refer to the documentation
         * for the
         * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse" target="_blank">JSON.parse method</a>.
         */
        jsonReviver: Function;
        /**
         * Gets or sets a JavaScript object to be used as a map for coercing data types
         * when loading the data.
         *
         * The object keys represent the field names and the values are {@link DataType} values
         * that indicate how the data should be coerced.
         *
         * For example, the code below creates an {@link ODataCollectionView} and specifies
         * that 'Freight' values, which are stored as strings in the database, should be
         * converted into numbers; and that three date fields should be converted into dates:
         *
         * ```typescript
         * import { ODataCollectionView } from '@grapecity/wijmo.odata';
         * import { DataType } from '@grapecity/wijmo';
         * const url = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
         * const orders = new ODataCollectionView(url, 'Orders', {
         *   dataTypes: {
         *     Freight: DataType.Number
         *     OrderDate: DataType.Date,
         *     RequiredDate: DataType.Date,
         *     ShippedDate: DataType.Date,
         *   }
         * });
         * ```
         *
         * This property is useful when the database contains data stored in
         * formats that do not conform to common usage.
         *
         * In most cases you don't have to provide information about the
         * data types, because the {@link inferDataTypes} property handles
         * the conversion of Date values automatically.
         *
         * If you do provide explicit type information, the {@link inferDataTypes}
         * property is not applied. Because of this, any data type information
         * that is provided should be complete, including all fields of type
         * Date.
         */
        dataTypes: any;
        /**
         * Gets or sets a value that determines whether fields that contain
         * strings that look like standard date representations should be
         * converted to dates automatically.
         *
         * This property is set to true by default, because the {@link ODataCollectionView}
         * class uses JSON and that format does not support Date objects.
         *
         * This property has no effect if specific type information is provided using
         * the {@link dataTypes} property.
         */
        inferDataTypes: boolean;
        /**
         * Gets or sets a value that determines whether dates should be adjusted
         * to look like GMT rather than local dates.
         */
        showDatesAsGmt: boolean;
        /**
         * Gets or sets a value that determines whether sort operations
         * should be performed on the server or on the client.
         *
         * Use the {@link sortDescriptions} property to specify how the
         * data should be sorted.
         *
         * The default value for this property is **true**.
         */
        sortOnServer: boolean;
        /**
         * Gets or sets a value that determines whether paging should be
         * performed on the server or on the client.
         *
         * Use the {@link pageSize} property to enable paging.
         *
         * The default value for this property is **true**.
         */
        pageOnServer: boolean;
        /**
         * Gets or sets a value that determines whether filtering should be
         * performed on the server or on the client.
         *
         * Use the {@link filter} property to perform filtering on the client,
         * and use the  {@link filterDefinition} property to perform filtering
         * on the server.
         *
         * In some cases it may be desirable to apply independent filters
         * on the client **and** on the server.
         *
         * You can achieve this by setting (1) the {@link filterOnServer} property
         * to false and the {@link filter} property to a filter function (to enable
         * client-side filtering) and (2) the {@link filterDefinition} property to
         * a filter string (to enable server-side filtering).
         *
         * The default value for this property is **true**.
         */
        filterOnServer: boolean;
        /**
         * Gets or sets a string containing an OData filter specification to
         * be used for filtering the data on the server.
         *
         * The filter definition syntax is described in the
         * <a href="https://www.odata.org/documentation/odata-version-2-0/uri-conventions/">OData documentation</a>.
         *
         * For example, the code below causes the server to return records
         * where the 'CompanyName' field starts with 'A' and ends with 'S':
         *
         * ```typescript
         * view.filterDefinition = "startswith(CompanyName, 'A') and endswith(CompanyName, 'B')";
         * ```
         *
         * Filter definitions can be generated automatically. For example, the
         * {@link FlexGridFilter} component detects whether its data source is an
         * {@link ODataCollectionView} and automatically updates both the
         * {@link ODataCollectionView.filter} and {@link ODataCollectionView.filterDefinition}
         * properties.
         *
         * Note that the {@link ODataCollectionView.filterDefinition} property is applied
         * even if the {@link ODataCollectionView.filterOnServer} property is set to false.
         * This allows you to apply server and client filters to the same collection,
         * which can be useful in many scenarios.
         *
         * For example, the code below uses the {@link ODataCollectionView.filterDefinition}
         * property to filter on the server and the {@link ODataCollectionView.filter}
         * property to further filter on the client. The collection will show items with
         * names that start with 'C' and have unit prices greater than 20:
         *
         * ```typescript
         * import { ODataCollectionView } from '@grapecity/wijmo.odata';
         * const url = 'http://services.odata.org/V4/Northwind/Northwind.svc/';
         * const data = new ODataCollectionView(url, 'Products', {
         *   oDataVersion: 4,
         *   filterDefinition: 'startswith(ProductName, \'C\')', // server filter
         *   filterOnServer: false, // client filter
         *   filter: function(product) {
         *     return product.UnitPrice &gt; 20;
         *   },
         * });
         * ```
         */
        filterDefinition: string;
        /**
         * Updates the filter definition based on a known filter provider such as the
         * {@link FlexGridFilter}.
         *
         * @param filterProvider Known filter provider, typically an instance of a
         * {@link FlexGridFilter}.
         */
        updateFilterDefinition(filterProvider: any): void;
        /**
         * Gets or sets the OData version used by the server.
         *
         * There are currently four versions of OData services, 1.0 through 4.0.
         * Version 4.0 is used by the latest services, but there are many legacy
         * services still in operation.
         *
         * If you know what version of OData your service implements, set the
         * {@link oDataVersion} property to the appropriate value (1 through 4) when
         * creating the {@link ODataCollectionView} (see example below).
         *
         * ```typescript
         * import { ODataCollectionView } from '@grapecity/wijmo.odata';
         * let url = 'https://services.odata.org/Northwind/Northwind.svc/';
         * let categories = new ODataCollectionView(url, 'Categories', {
         *   oDataVersion: 1.0, // legacy OData source
         *   fields: ['CategoryID', 'CategoryName', 'Description'],
         *   sortOnServer: false
         * });
         * ```
         *
         * If you do not know what version of OData your service implements (perhaps
         * you are writing an OData explorer application), then do not specify the
         * version. In this case, the {@link ODataCollectionView} will get this information
         * from the server. This operation requires an extra request, but only once
         * per service URL, so the overhead is small.
         */
        oDataVersion: number;
        /**
         * Gets a value that indicates the {@link ODataCollectionView} is
         * currently loading data.
         *
         * This property can be used to provide progress indicators.
         */
        readonly isLoading: boolean;
        /**
         * Gets or sets a value that causes the {@link ODataCollectionView} to
         * defer commits back to the database.
         *
         * The default value for this property is **false**, which causes
         * any changes to the data to be immediately committed to the database.
         *
         * If you set this property to **true**, it will automatically set the
         * {@link trackChanges} property to true. After this, any changes to the
         * data (including edits, additions, and removals) will be tracked but
         * not committed to the database until you call the {@link commitChanges}
         * method to commit the changes, or the {@link cancelChanges} method
         * to discard all pending changes.
         *
         * For example:
         * ```typescript
         * import { ODataCollectionView } from '@grapecity/wijmo.odata';
         *
         * // create data source
         * let url = 'https://services.odata.org/...';
         * let view = new ODataCollectionView(url, 'Categories', {
         *     keys: [ 'ID' ]
         * });
         *
         * // defer commits
         * view.deferCommits = true;
         *
         * // handle commit/cancel changes buttons
         * let btnCommit = document.getElementById('btn-commit') as HTMLButtonElement,
         *     btnCancel = document.getElementById('btn-cancel') as HTMLButtonElement;
         * btnCommit.addEventListener('click', () => view.commitChanges());
         * btnCancel.addEventListener('click', () => view.cancelChanges());
         * view.hasPendingChangesChanged.addHandler((s, e) => {
         *    btnCommit.disabled = btnCancel.disabled = !view.hasPendingChanges;
         * });
         * ```
         */
        deferCommits: boolean;
        /**
         * Occurs when the {@link ODataCollectionView} starts loading data.
         */
        readonly loading: Event<ODataCollectionView, EventArgs>;
        /**
         * Raises the {@link loading} event.
         */
        onLoading(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the {@link ODataCollectionView} finishes loading data.
         */
        readonly loaded: Event<ODataCollectionView, EventArgs>;
        /**
         * Raises the {@link loaded} event.
         */
        onLoaded(e?: wijmo.EventArgs): void;
        /**
         * Loads or re-loads the data from the OData source.
         */
        load(): void;
        /**
         * Occurs when there is an error reading or writing data.
         */
        readonly error: Event<ODataCollectionView, RequestErrorEventArgs>;
        /**
         * Raises the {@link error} event.
         *
         * By default, errors throw exceptions and trigger a data refresh. If you
         * want to prevent this behavior, set the {@link RequestErrorEventArgs.cancel}
         * parameter to true in the event handler.
         *
         * @param e {@link RequestErrorEventArgs} that contains information about the error.
         */
        onError(e: wijmo.RequestErrorEventArgs): boolean;
        /**
         * Occurs when the value of the {@link hasPendingChanges} property changes.
         *
         * See also the {@link deferCommits} property.
         */
        readonly hasPendingChangesChanged: Event<ODataCollectionView, EventArgs>;
        /**
         * Raises the {@link hasPendingChangesChanged} event.
         */
        onHasPendingChangesChanged(e?: wijmo.EventArgs): void;
        /**
         * Returns true if this object supports a given interface.
         *
         * @param interfaceName Name of the interface to look for.
         */
        implementsInterface(interfaceName: string): boolean;
        /**
         * Override {@link commitNew} to add the new item to the database.
         */
        commitNew(): void;
        /**
         * Override {@link commitEdit} to modify the item in the database.
         */
        commitEdit(): void;
        /**
         * Override {@link remove} to remove the item from the database.
         *
         * @param item Item to be removed from the database.
         */
        remove(item: any): void;
        /**
         * Commits all pending changes to the server.
         *
         * Changes are contained in the {@link itemsEdited}, {@link itemsAdded},
         * and {@link itemsRemoved} collections, and are automatically cleared
         * after they are committed.
         *
         * See also the {@link deferCommits} property.
         *
         * @param committed Optional callback invoked when the commit operation
         * has been completed. The callback takes an **XMLHttpRequest**
         * parameter contains information about the request results.
         */
        commitChanges(committed?: (xhr: XMLHttpRequest) => void): void;
        /**
         * Cancels all changes by removing all items in the {@link itemsAdded},
         * {@link itemsRemoved}, and {@link itemsEdited} collections,
         * without committing them to the server.
         *
         * This method is used with the {@link deferCommits} property.
         */
        cancelChanges(): void;
        /**
         * Gets a value that determines whether the {@link ODataCollectionView} has
         * pending changes.
         *
         * See also the {@link deferCommits} property and the
         * {@link commitChanges} and {@link cancelChanges} methods.
         */
        readonly hasPendingChanges: boolean;
        /**
         * Gets the total number of items in the view before paging is applied.
         */
        readonly totalItemCount: number;
        /**
         * Gets the total number of pages.
         */
        readonly pageCount: number;
        /**
         * Gets or sets the number of items to display on a page.
         */
        pageSize: number;
        /**
         * Raises the {@link pageChanging} event.
         *
         * @param e {@link PageChangingEventArgs} that contains the event data.
         */
        onPageChanging(e: wijmo.collections.PageChangingEventArgs): boolean;
        _getPageView(): any[];
        _performRefresh(): void;
        _updateHasChanges(): void;
        _storeItems(items: any[], append: boolean): void;
        _getReadUrl(nextLink?: string): string;
        _getReadParams(nextLink?: string): any;
        _getData(nextLink?: string, xhrCallback?: Function): void;
        private _convertToDbFormat;
        private _reviver;
        private _convertItem;
        private _getInferredDataTypes;
        private _getServiceUrl;
        private _getSchema;
        private _getWriteUrl;
        private _asODataFilter;
        private _asODataValueFilter;
        private _asEquals;
        private _asODataConditionFilter;
        private _asODataCondition;
        private _asODataValue;
        private _error;
        private _encodeBatch;
    }
}
declare module wijmo.odata {
    /**
     * Extends the {@link ODataCollectionView} class to support loading data on
     * demand, using the {@link setWindow} method.
     *
     * The example below shows how you can declare an {@link ODataCollectionView}
     * and synchronize it with a {@link wijmo.grid.FlexGrid} control to load the
     * data that is within the grid's viewport:
     *
     * ```typescript
     * // declare virtual collection view
     * let view = new wijmo.odata.ODataVirtualCollectionView(url, 'Order_Details_Extendeds', {
     *     oDataVersion: 4
     * });
     *
     * // use virtual collection as grid data source
     * flex.itemsSource = view;
     *
     * // update data window when the grid scrolls
     * flex.scrollPositionChanged.addHandler(() => {
     *     let rng = flex.viewRange;
     *     view.setWindow(rng.topRow, rng.bottomRow);
     * });
     * ```
     *
     * The {@link ODataVirtualCollectionView} class implements a 'data window' so only
     * data that is actually being displayed is loaded from the server. Items that are
     * not being displayed are added to the collection as null values until a call
     * to the {@link setWindow} method causes them those items to be loaded.
     *
     * This 'on-demand' method of loading data has advantages when dealing with large
     * data sets, because it prevents the application from loading data until it is
     * required. But it does impose some limitation: sorting and filtering must be
     * done on the server; grouping and paging are not supported.
     *
     * The example below uses an {@link ODataVirtualCollectionView} to load data from
     * a NorthWind OData provider service. The collection loads data on-demant,
     * as the user scrolls the grid:
     *
     * {@sample Grid/Data-binding/VirtualOData/purejs Example}
     */
    class ODataVirtualCollectionView extends ODataCollectionView {
        _data: any[];
        _start: number;
        _end: number;
        _refresh: boolean;
        _loadOffset: number;
        _toSetWindow: any;
        _pendingRequest: XMLHttpRequest;
        _requestCanceled: wijmo.Event<ODataVirtualCollectionView, wijmo.EventArgs>;
        _firstLoad: boolean;
        /**
         * Initializes a new instance of the {@link ODataVirtualCollectionView} class.
         *
         * @param url Url of the OData service (for example
         * 'https://services.odata.org/Northwind/Northwind.svc/').
         * @param tableName Name of the table (entity) to retrieve from the service.
         * If not provided, a list of the tables (entities) available is retrieved.
         * @param options JavaScript object containing initialization data (property
         * values and event handlers) for the {@link ODataVirtualCollectionView}.
         */
        constructor(url: string, tableName: string, options?: any);
        /**
         * Sets the data window to ensure a range of records are loaded into the view.
         *
         * @param start Index of the first item in the data window.
         * @param end Index of the last item in the data window.
         */
        setWindow(start: number, end: number): void;
        /**
         * Occurs when the {@link ODataVirtualCollectionView} cancels a pending data request.
         */
        readonly requestCanceled: wijmo.Event<ODataVirtualCollectionView, wijmo.EventArgs>;
        /**
         * Raises the {@link requestCanceled} event.
         */
        onRequestCanceled(e?: wijmo.EventArgs): void;
        /**
         * {@link ODataVirtualCollectionView} requires {@link pageOnServer} to be set to true.
         */
        pageOnServer: boolean;
        /**
         * {@link ODataVirtualCollectionView} requires {@link sortOnServer} to be set to true.
         */
        sortOnServer: boolean;
        /**
         * {@link ODataVirtualCollectionView} requires {@link filterOnServer} to be set to true.
         */
        filterOnServer: boolean;
        /**
         * {@link ODataVirtualCollectionView} requires {@link canGroup} to be set to false.
         */
        canGroup: boolean;
        _performRefresh(): void;
        _getReadParams(nextLink?: string): any;
        _storeItems(items: any[], append: boolean): void;
        _performSetWindow(start: number, end: number): void;
    }
}
declare module wijmo.odata {
}
