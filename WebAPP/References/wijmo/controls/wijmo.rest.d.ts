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
declare module wijmo.rest {
    /**
     * Base class for REST-based CollectionView classes.
     *
     * To use it, create a class that extends {@link:RestCollectionView}
     * and add overrides for the following methods:
     *
     * <ul>
     *     <li><b>getItems</b>: Gets a list of items from the server. The list may be sorted, filtered, and paged.</li>
     *     <li><b>addItem</b>: Adds an item to the collection on the server.</li>
     *     <li><b>patchItem</b>: Edits an item in the collection on the server.</li>
     *     <li><b>deleteItem</b>: Deletes an item fom the collection on the server.</li>
     * </ul>
     *
     * By default, the class should perform sorting, filtering, and paging on the server.
     *
     * If the REST service does not support any of these operations, make sure the
     * **sortOnServer**, **pageOnServer**, or **filterOnServer** properties are set
     * to **false**, and the corresponding operations will be performed on the client instead.
     */
    class RestCollectionView extends wijmo.collections.CollectionView {
        _toGetData: any;
        _loading: boolean;
        _fields: string[] | null;
        _keys: string[] | null;
        _sortOnServer: boolean;
        _pageOnServer: boolean;
        _filterOnServer: boolean;
        _filterProvider: any;
        _totalItemCount: number;
        _requestHeaders: any;
        /**
         * Initializes a new instance of the @see:ServerCollectionViewBase class.
         *
         * @param options JavaScript object containing initialization data (property
         * values and event handlers) for the @see:ServerCollectionView.
         */
        constructor(options?: any);
        /**
         * Gets or sets an array containing the names of the fields to retrieve from
         * the data source.
         *
         * If this property is set to null or to an empty array, all fields are
         * retrieved.
         */
        fields: string[] | null;
        /**
         * Gets or sets a value that determines whether sort operations
         * should be performed on the server or on the client.
         *
         * Use the @see:sortDescriptions property to specify how the
         * data should be sorted.
         */
        sortOnServer: boolean;
        /**
         * Gets or sets a value that determines whether paging should be
         * performed on the server or on the client.
         *
         * Use the @see:pageSize property to enable paging.
         */
        pageOnServer: boolean;
        /**
         * Gets or sets a value that determines whether filtering should be performed on
         * the server or on the client.
         */
        filterOnServer: boolean;
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
         * Updates the filter definition based on a known filter provider such as the
         * @see:FlexGridFilter.
         *
         * @param filterProvider Known filter provider, typically an instance of a
         * @see:FlexGridFilter.
         */
        updateFilterDefinition(filterProvider: any): void;
        /**
         * Gets a value that indicates the @see:ServerCollectionView is
         * currently loading data.
         *
         * This property can be used to provide progress indicators.
         */
        readonly isLoading: boolean;
        /**
         * Occurs when the @see:ServerCollectionView starts loading data.
         */
        loading: Event<any, EventArgs>;
        /**
         * Raises the @see:loading event.
         */
        onLoading(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the @see:ServerCollectionView finishes loading data.
         */
        loaded: Event<any, EventArgs>;
        /**
         * Raises the @see:loaded event.
         */
        onLoaded(e?: wijmo.EventArgs): void;
        /**
         * Loads or re-loads the data from the server.
         */
        load(): void;
        /**
         * Occurs when there is an error reading or writing data.
         */
        error: Event<any, EventArgs>;
        /**
         * Raises the @see:error event.
         *
         * By default, errors throw exceptions and trigger a data refresh. If you
         * want to prevent this behavior, set the @see:RequestErrorEventArgs.cancel
         * parameter to true in the event handler.
         *
         * @param e @see:ErrorEventArgs that contains information about the error.
         */
        onError(e: RESTErrorEventArgs): boolean;
        _performRefresh(): void;
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
         * Raises the @see:pageChanging event.
         *
         * @param e @see:PageChangingEventArgs that contains the event data.
         */
        onPageChanging(e: wijmo.collections.PageChangingEventArgs): boolean;
        /**
         * Override @see:commitNew to add the new item to the database.
         */
        commitNew(): void;
        /**
         * Override @see:commitEdit to modify the item in the database.
         */
        commitEdit(): void;
        /**
         * Override @see:remove to remove the item from the database.
         *
         * @param item Item to be removed from the database.
         */
        remove(item: any): void;
        _getPageView(): any[];
        private _getData;
        protected _raiseError(error: any, reload: boolean): void;
        /**
         * Gets a Promise that returns an array containing all the items,
         * possibly filtered/paged/and sorted on the server.
         */
        protected getItems(): Promise<any[]>;
        /**
         * Gets a Promise that adds a new item to the database.
         */
        protected addItem(item: any): Promise<any>;
        /**
         * Gets a Promise that modifies an item in the database.
         */
        protected patchItem(item: any): Promise<any>;
        /**
         * Gets a Promise that removes an item from the database.
         */
        protected deleteItem(item: any): Promise<any>;
    }
    /**
     * Class that provides information for REST errors.
     */
    class RESTErrorEventArgs extends wijmo.CancelEventArgs {
        _error: any;
        constructor(error: any);
        readonly error: any;
    }
}
declare module wijmo.rest {
}
