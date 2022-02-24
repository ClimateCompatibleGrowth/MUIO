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
declare module wijmo.cloud {
    /**
     * Provides a simple way to use Google's GAPI OAuth functionality.
     *
     * To use, create an instance of the {@link OAuth2} class and add a
     * handler to the {@link userChanged} event to monitor the
     * {@link @user} property, which is non-null if a user is currently
     * signed in.
     *
     * Use the {@link signIn} and {@link signOut} methods to sign in or
     * out of the Google account.
     *
     * For example, the code below creates an {@link OAuth2} object
     * and uses it to manage a button used to log users in and out
     * of the application:
     *
     * ```typescript
     * import { OAuth2 } from '@grapecity/wijmo.cloud';
     *
     * // create OAuth2 object
     * const API_KEY = 'XXXX';
     * const CLIENT_ID = 'YYYY.apps.googleusercontent.com';
     * const SCOPES = [ 'https://www.googleapis.com/auth/userinfo.email' ];
     * const auth = new OAuth2(API_KEY, CLIENT_ID, SCOPES);
     *
     * // click a button to log in/out
     * let oAuthBtn = document.getElementById('auth_btn');
     * oAuthBtn.addEventListener('click', () => {
     *     if (auth.user) {
     *         auth.signOut();
     *     } else {
     *         auth.signIn();
     *     }
     * });
     *
     * // update button caption and accessToken when user changes
     * auth.userChanged.addHandler(s => {
     *     let user = s.user;
     *     oAuthBtn.textContent = user ? 'Sign Out' : 'Sign In';
     *     gsNWind.accessToken = user ? s.accessToken : null;
     *     fsNWind.accessToken = user ? s.accessToken : null;
     * });
     * ```
     */
    class OAuth2 {
        _gapi: any;
        /**
         * Initializes a new instance of the {@link OAuth2} class.
         *
         * For details on the apiKey, clientID, and scope parameters,
         * please refer to
         * https://developers.google.com/identity/sign-in/web/sign-in.
         *
         * To create or edit application credentials, please refer to
         * https://console.developers.google.com/apis/credentials.
         *
         * For a list of OAuth2 scopes for Google APIs, please refer to
         * https://developers.google.com/identity/protocols/oauth2/scopes
         *
         * @param apiKey An API key string created at Google's credentials page.
         * @param clientId A client ID string created at Google's credentials page.
         * @param scopes An array of strings representing OAuth2 scopes required by the application.
         * @param options JavaScript object containing initialization data for the object.
         */
        constructor(apiKey: string, clientId: string, scopes?: string[], options?: any);
        /**
         * Gets an object with information about the current user
         * (or null if the user is not signed-in).
         */
        readonly user: IUser;
        /**
         * Gets an OAuth access token that can be used to perform authorized
         * requests.
         */
        readonly accessToken: string;
        /**
         * Gets an OAuth id token that can be passed to the Firebase client
         * libraries.
         *
         * See https://firebase.google.com/docs/auth/web/google-signin
         * ```typescript
         * let credential = firebase.auth.GoogleAuthProvider.credential(id_token);
         * firebase.auth().signInWithCredential(credential);
         * ```
         */
        readonly idToken: string;
        /**
         * Signs a user in.
         */
        signIn(): void;
        /**
         * Signs a user out.
         */
        signOut(): void;
        /**
         * Occurs when a user signs in or out.
         */
        readonly userChanged: Event<OAuth2, EventArgs>;
        /**
         * Raises the {@link userChanged} event.
         */
        onUserChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs when an error happens.
         */
        readonly error: Event<OAuth2, OAuthError>;
        /**
         * Raises the {@link error} event.
         */
        onError(e: OAuthError): void;
        _gapiLoaded(apiKey: string, clientId: string, scopes: string[]): void;
        _auth(): any;
    }
    /**
     * Contains information about a user.
     */
    interface IUser {
        id: string;
        name: string;
        firstName: string;
        lastName: string;
        imageUrl: string;
        eMail: string;
    }
    /**
     * Represents an error that occurred in the authorization process.
     */
    class OAuthError extends wijmo.EventArgs {
        _error: any;
        /**
         * Initializes a new instance of an {@link OAuthError} object.
         * @param error Object containing information about the error.
         */
        constructor(error: any);
        /**
         * Gets an object that contains information about the error.
         */
        readonly error: any;
    }
}
declare module wijmo.cloud {
    /**
     * Extends the {@link CollectionView} class to provide access to
     * Firestore collections.
     *
     * The {@link Snapshot} class provides functionality similar to that
     * provided by the {@link Collection} class, except it provides
     * real-time updates.
     *
     * If other applications make changes to the data, the {@link Snapshot}
     * will be updated automatically.
     *
     * This class requires the use of the Firestore client libraries.
     * For information on how to add the libraries to your projects,
     * please see https://firebase.google.com/docs/web/setup.
     *
     * You can use the {@link OAuth2} component to obtain a token and
     * authorize your application to use the Firestore client libraries.
     *
     * For example, assuming you have an {@link OAuth2} component
     * named "auth", you can listen to the userChanged event and apply
     * the token as follows:
     *
     * ```typescript
     * // update credentials when user changes
     * auth.userChanged.addHandler(s => {
     *     let user = auth.user;
     *     oAuthBtn.textContent = user ? 'Sign Out' : 'Sign In';
     *     let credential = firebase.auth.GoogleAuthProvider.credential(auth.idToken);
     *     firebase.auth().signInWithCredential(credential)
     *         .then(() => console.log('logged in ok'))
     *         .catch(error => console.log('log in failed:', error));
     * });
     *
     * For more information about Firebase authentication, please
     * refer to https://firebase.google.com/docs/auth/web/google-signin.
     */
    class Snapshot extends wijmo.collections.CollectionView {
        _collection: any;
        _query: any;
        _toGetData: any;
        _loading: boolean;
        _deferCommits: boolean;
        _hasPendingChanges: boolean;
        _unsubscribe: Function;
        /**
         * Initializes a new instance of the {@link Snapshot} class.
         *
         * @param collection Firestore client library **CollectionRef** object.
         * @param options JavaScript object containing initialization data (property values
         * and event handlers) for this {@link Snapshot}.
         *
         * For example:
         * ```typescript
         * // initialize Firestore client SDK
         * const firebaseConfig = {
         *     apiKey: "...",
         *     ...
         * };
         * firebase.initializeApp(firebaseConfig);
         * const db = firebase.firestore();
         *
         * // create a Snapshot for the 'restaurants' collection
         * // where type is 'Japanese' or 'Italian'.
         * const restaurants = db.collection('restaurants');
         * const view = new Snapshot(restaurants, {
         *     query: restaurants.where('type', 'in', ['Japanese', 'Italian' ])
         * });
         * ```
         */
        constructor(collection: any, options?: any);
        /**
         * Gets or sets a Firestore client library **Query** object used to
         * retrieve the data.
         *
         * If provided, the query should be based on the {@link collection}
         * used to create this {@link Snapshot}.
         *
         * Use this property to define the data you want to retrieve from the
         * source collection. You can apply filters, data limits, and sorting.
         *
         * For example, the code below causes the {@link Snapshot} to return
         * restaurants of type "Japanese" or "German":
         *
         * ```typescript
         * // create the Snapshot
         * const db = firebase.firestore();
         * const restaurants = db.collection('restaurants');
         * const snapshot = new Snapshot(restaurants, {
         *     query: restaurants.where('type', 'in', ['Japanese', 'German' ])
         * });
         * ```
         */
        query: any;
        /**
         * Gets or sets a value that causes the {@link Snapshot} to defer
         * commits back to the database.
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
         */
        deferCommits: boolean;
        /**
         * Commits all pending changes to the server.
         *
         * Changes are contained in the {@link itemsEdited}, {@link itemsAdded},
         * and {@link itemsRemoved} collections, and are automatically cleared
         * after they are committed.
         *
         * See also the {@link deferCommits} property.
         */
        commitChanges(): void;
        /**
         * Cancels all changes by removing all items in the {@link itemsAdded},
         * {@link itemsRemoved}, and {@link itemsEdited} collections,
         * without committing them to the server.
         *
         * This method is used with the {@link deferCommits} property.
         */
        cancelChanges(): void;
        /**
         * Gets a value that determines whether the {@link Snapshot} has
         * pending changes.
         *
         * See also the {@link deferCommits} property and the
         * {@link commitChanges} and {@link cancelChanges} methods.
         */
        readonly hasPendingChanges: boolean;
        /**
         * Gets a value that indicates the {@link Snapshot} is currently loading data.
         *
         * This property can be used to provide progress indicators.
         */
        readonly isLoading: boolean;
        /**
         * Loads or re-loads the collection data.
         * @param keepPosition Whether to keep or reset the cursor position.
         */
        load(keepPosition?: boolean): void;
        /**
         * Occurs when the {@link Snapshot} starts loading data.
         */
        readonly loading: Event<Snapshot, CancelEventArgs>;
        /**
         * Raises the {@link loading} event.
         */
        onLoading(e: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs when the {@link Snapshot} finishes loading data.
         */
        readonly loaded: Event<Snapshot, EventArgs>;
        /**
         * Raises the {@link loaded} event.
         */
        onLoaded(e?: wijmo.EventArgs): void;
        /**
         * Occurs when there is an error reading or writing data.
         */
        readonly error: Event<Snapshot, FirestoreErrorEventArgs>;
        /**
         * Raises the {@link error} event.
         *
         * By default, errors throw exceptions and trigger a data refresh. If you
         * want to prevent this behavior, set the {@link FirestoreErrorEventArgs.cancel}
         * parameter to true in the event handler.
         *
         * @param e {@link FirestoreErrorEventArgs} that contains information about the error.
         */
        onError(e: FirestoreErrorEventArgs): boolean;
        /**
         * Occurs when the value of the {@link hasPendingChanges} property changes.
         *
         * See also the {@link deferCommits} property.
         */
        readonly hasPendingChangesChanged: Event<Snapshot, EventArgs>;
        /**
         * Raises the {@link hasPendingChangesChanged} event.
         */
        onHasPendingChangesChanged(e?: wijmo.EventArgs): void;
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
        _raiseError(error: any, reload: boolean): void;
        _updateHasChanges(): void;
        _getItemDoc(item: any): any;
        _getItemData(item: any): any;
        _getData(keepPosition?: boolean): void;
        _generateID(): string;
        _checkType(name: string, value: any, ...props: string[]): void;
        _getQuery(): any;
    }
    /**
     * Represents an error raised by the Firestore client libraries.
     */
    class FirestoreErrorEventArgs extends wijmo.CancelEventArgs {
        _error: any;
        /**
         * Initializes a new instance of the {@link FirestoreErrorEventArgs} class.
         *
         * @param error Error raised by the Firestore client libraries.
         */
        constructor(error: any);
        readonly error: any;
        readonly message: string;
    }
}
declare module wijmo.cloud {
    /**
     * Extends the {@link CollectionView} class to provide access to an
     * individual sheet in a {@link GoogleSheet} object.
     *
     * {@link Sheet} objects may be created by setting the {@link sheets}
     * property when creating a {@link GoogleSheet} object or by invoking
     * the {@link Sheet} constructor directly. For example:
     *
     * ```typescript
     * import { GoogleSheet, Sheet } from '@grapecity/wijmo.cloud';
     *
     * // create a GoogleSheet with three Sheets
     * const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
     * const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
     * let gsNWind = new GoogleSheet(SHEET_ID_NW, API_KEY, {
     *     sheets: [ 'Products', 'Categories', 'Suppliers' ]
     * });
     *
     * // create an additional Sheet by calling the constructor
     * let customers = new Sheet(gsNWind, 'Customers');
     * ```
     *
     * The {@link Sheet} class assumes that the data is stored in table
     * format, where each column has a title (unique string) on the
     * first cell, followed by data of any type (strings, numbers,
     * dates, or booleans).
     *
     * The {@link Sheet} data is read in one step when the {@link Sheet}
     * is created. Once loaded, the data can be filtered, paginated,
     * sorted, and grouped on the client.
     *
     * If the parent {@link GoogleSheet} has permissions (see the
     * {@link GoogleSheet.accessToken} property), the {@link Sheet}
     * can also perform CRUD operations using the {@link addNew},
     * {@link remove}, and {@link editItem} methods.
     *
     * In most applications, the {@link Sheet} objects are used as
     * data sources for grid controls such as the {@link FlexGrid}
     * or {@link MultiRow} grid. For example:
     *
     * ```typescript
     * import { GoogleSheet, Sheet } from '@grapecity/wijmo.cloud';
     * import { FlexGrid } from '@grapecity/wijmo.cloud';
     *
     * // create a GoogleSheet with three Sheets
     * const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
     * const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
     * let gsNWind = new GoogleSheet(SHEET_ID_NW, API_KEY, {
     *     sheets: [ 'Products', 'Categories', 'Suppliers' ]
     * });
     *
     * // use a Sheet as an itemsSource for a FlexGrid control:
     * let theGrid = new FlexGrid('#theGrid', {
     *     allowAddNew: true,
     *     allowDelete: true,
     *     itemsSource: gsNWind.getSheet('Products'),
     * });
     * ```
     */
    class Sheet extends wijmo.collections.CollectionView {
        _gSheet: GoogleSheet;
        _id: number;
        _title: string;
        _loading: boolean;
        _toGetData: any;
        _itemKeys: string[];
        /**
         * Initializes a new instance of the {@link Sheet} class.
         *
         * @param googleSheet {@link GoogleSheet} that owns this {@link Sheet}.
         * @param title Title of the {@link Sheet} to load.
         * @param id ID of the {@link Sheet}.
         */
        constructor(googleSheet: GoogleSheet, title: string, id?: number);
        /**
         * Gets the {@link GoogleSheet} that contains this {@link Sheet}.
         */
        readonly googleSheet: GoogleSheet;
        /**
         * Gets the title of this {@link Sheet}.
         */
        readonly title: string;
        /**
         * Loads or re-loads the sheet data.
         * @param keepPosition Whether to keep the cursor position.
         */
        load(keepPosition?: boolean): void;
        /**
         * Gets a value that indicates the {@link Sheet} is currently loading data.
         *
         * This property can be used to provide progress indicators.
         */
        readonly isLoading: boolean;
        /**
         * Occurs when the {@link Sheet} starts loading data.
         */
        readonly loading: Event<Sheet, CancelEventArgs>;
        /**
         * Raises the {@link loading} event.
         * @param e {@link CancelEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onLoading(e?: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs when the {@link Sheet} finishes loading data.
         */
        readonly loaded: Event<Sheet, EventArgs>;
        /**
         * Raises the {@link loaded} event.
         */
        onLoaded(e?: wijmo.EventArgs): void;
        /**
         * Occurs when there is an error reading or writing data.
         */
        readonly error: Event<Sheet, RequestErrorEventArgs>;
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
        _getData(keepPosition?: boolean): void;
        _parseData(rows: any[], formatted: any[]): any[];
        _toSheetHeader(i: number): string;
        _saveItem(item: any): void;
        _handleError(xhr: XMLHttpRequest, reload: boolean): void;
    }
}
declare module wijmo.cloud {
    /**
     * Represents a Google Sheets spreadsheet with one or more sheets.
     *
     * Each sheet is represented by a {@link Sheet} object that exposes
     * the data on the sheet as a {@link CollectionView} object which
     * can be used as a data source for any Wijmo control.
     *
     * In addition to full CRUD support you get all the {@link CollectionView}
     * features including sorting, filtering, paging, and grouping.
     * The sorting, filtering, and paging functions are performed on the
     * on the client.
     *
     * The code below shows how you can instantiate a {@link GoogleSheet}
     * object that loads data from three sheets:
     *
     * ```typescript
     * import { GoogleSheet } from '@grapecity/wijmo.cloud';
     * const SHEET_ID_NW = '1qnf-FCONZj_AmOlyNkpIA3mKvP8FQtVOr7K8Awpo360';
     * const API_KEY = 'AIzaSyCvuXEzP57I5CQ9ifZDG2_K8M3nDa1LOPE';
     * let gsNWind = new GoogleSheet(SHEET_ID_NW, API_KEY, {
     *     sheets: [ 'Products', 'Categories', 'Suppliers' ]
     * });
     * ```
     */
    class GoogleSheet {
        _sheetId: string;
        _accessToken: string;
        _apiKey: string;
        _loading: boolean;
        _sheets: collections.ObservableArray<Sheet>;
        _reqSheets: string[];
        _colTypes: IColumnDataType[];
        /**
         * Initializes a new instance of the {@link GoogleSheet} class.
         *
         * @param sheetId Parameter used to identify which GoogleSheet is to be accessed.
         * This ID is the value between the "/d/" and the "/edit" in the URL of your GoogleSheet.
         * @param apiKey Identifier used to authenticate requests associated with the app.
         * To generate API keys, please go to https://console.cloud.google.com/.
         * @param options JavaScript object containing initialization data (property values
         * and event handlers) for this {@link GoogleSheet}.
         */
        constructor(sheetId: string, apiKey: string, options?: any);
        /**
         * Gets the ID of this {@link GoogleSheet}.
         */
        readonly sheetId: string;
        /**
         * Gets the API key that this {@link GoogleSheet} is associated with.
         */
        readonly apiKey: string;
        /**
         * Gets or sets the OAuth 2.0 access token used to gain write
         * access to the sheet.
         *
         * You can use the {@link OAuth2} class to provide user authentication.
         * The {@link OAuth2} class has methods that allow users to log in and
         * provides {@link accessToken} strings that can be used to access
         * the sheet.
         */
        accessToken: string;
        /**
         * Gets or sets an array containing {@link IColumnDataType} objects
         * that determine the data types for the sheet columns.
         *
         * Column data types are determined automatically based on the sheet
         * data. In some cases, however, you may want to override that and set
         * the column data types explicitly. This may be useful for sheets
         * that contain empty cells or columns with cells of mixed types.
         *
         * The code below causes the {@link GoogleSheet} to parse columns
         * named "PostalCode", "Phone", and "Fax" as strings and any columns
         * with names ending in "Date" as dates:
         *
         * ```typescript
         * import { DataType } from '@grapecity/wijmo';
         * import { GoogleSheet } from '@grapecity/google';
         * let ssNWind = new GoogleSheet(SHEET_ID_NW, {
         *     apiKey: API_KEY,
         *     columnDataTypes: [
         *         { pattern: /^(PostalCode|Phone|Fax)$/, dataType: DataType.String },
         *         { pattern: /Date$/, dataType: DataType.Date },
         *     ]
         * });
         * ```
         */
        columnDataTypes: IColumnDataType[] | null;
        /**
         * Gets the list of {@link Sheet} objects in this {@link GoogleSheet}.
         */
        readonly sheets: wijmo.collections.ObservableArray<Sheet>;
        /**
         * Gets a {@link Sheet} by its {@link Sheet.title}.
         *
         * @param title Sheet title to look for.
         */
        getSheet(title: string): Sheet;
        /**
         * Gets a value that indicates the {@link GoogleSheet} is
         * currently loading data.
         *
         * This property can be used to provide progress indicators.
         */
        readonly isLoading: boolean;
        /**
         * Occurs when the {@link GoogleSheet} starts loading data.
         */
        readonly loading: Event<GoogleSheet, EventArgs>;
        /**
         * Raises the {@link loading} event.
         */
        onLoading(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the {@link GoogleSheet} finishes loading data.
         */
        readonly loaded: Event<GoogleSheet, EventArgs>;
        /**
         * Raises the {@link loaded} event.
         */
        onLoaded(e?: wijmo.EventArgs): void;
        /**
         * Occurs when there is an error reading or writing data.
         */
        readonly error: Event<GoogleSheet, RequestErrorEventArgs>;
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
         * Occurs when the value of the {@link accessToken} property changes.
         */
        readonly accessTokenChanged: Event<GoogleSheet, EventArgs>;
        /**
         * Raises the {@link accessTokenChanged} event.
         */
        onAccessTokenChanged(e?: wijmo.EventArgs): void;
        _copy(key: string, value: any): boolean;
        _getUrl(params?: string): string;
        _getRequestHeaders(): any;
        _getSheetInfo(): void;
    }
    /**
     * Objects used to specify column data types.
     */
    interface IColumnDataType {
        /** Regular expression used to match column names. */
        pattern: RegExp;
        /** Data type applied to columns with names that match the given pattern. */
        dataType: wijmo.DataType;
    }
}
declare module wijmo.cloud {
    /**
     * Represents a Firestore database with one or more collections.
     *
     * Each collection is represented by a {@link Collection} object that
     * exposes the data on the collection as a {@link CollectionView} object
     * which can be used as a data source for any Wijmo control.
     *
     * In addition to full CRUD support you get all the {@link CollectionView}
     * features including sorting, filtering, paging, and grouping.
     *
     * The sorting, filtering, and paging functions may be performed on the
     * server or on the client, depending on the setting of the
     * {@link Collection.sortOnServer}, {@link Collection.filterOnServer},
     * and {@link Collection.pageOnServer} properties.
     *
     * The code below shows how you can instantiate a {@link Firestore}
     * object that loads data from three collections:
     *
     * ```typescript
     * import { Firestore } from '@grapecity/wijmo.cloud';
     * const PROJECT_ID = 'XXXX-YYYY';
     * const API_KEY = 'ZZZZ';
     * let fsNWind = new Firestore(PROJECT_ID, API_KEY, {
     *     collections: [ 'Products', 'Categories', 'Suppliers' ]
     * });
     * ```
     * This class does not use or require the use of the Firestore
     * client libraries.
     */
    class Firestore {
        _projectId: string;
        _collections: collections.ObservableArray<Collection>;
        _accessToken: string;
        _idToken: string;
        _fbToken: string;
        _apiKey: string;
        /**
         * Initializes a new instance of the {@link Firestore} class.
         *
         * @param projectId ID of the Firebase app that contains the database.
         * @param apiKey Unique identifier used to authenticate requests associated with the app.
         * To generate API keys, please go to https://console.cloud.google.com/.
         * @param options JavaScript object containing initialization data (property values
         * and event handlers) for this {@link Firestore}.
         */
        constructor(projectId: string, apiKey: string, options?: any);
        /**
         * Gets the ID of the Firebase app that contains the database.
         */
        readonly projectId: string;
        /**
         * Gets the API key used to create this {@link Firestore}.
         */
        readonly apiKey: string;
        /**
         * Gets or sets an OAuth 2.0 access token used to access the database.
         *
         * You can use the {@link OAuth2} class to allow users to log in and
         * to obtain the {@link accessToken} string.
         *
         * If you choose this authentication method, Firestore Security Rules
         * will not be applied. Firestore will use Cloud Identity and Access
         * Management (IAM) instead.
         *
         * See also the {@link idToken} property, which does integrate with
         * Firestore Security Rules.
         */
        accessToken: string | null;
        /**
         * Gets or sets a OAuth 2.0 id token used to access the database.
         *
         * You can use the {@link OAuth2} class to allow users to log in and
         * to obtain the {@link idToken} string.
         *
         * If you choose this authentication method, Firestore Security Rules
         * will be applied as usual to determine which users can read and write
         * to the database.
         *
         * See also the {@link accessToken} property, which bypasses Firestore
         * Security Rules and uses Cloud Identity and Access Management (IAM)
         * instead.
         */
        idToken: string | null;
        /**
         * Gets the list of {@link Collection} objects in this {@link Firestore}.
         */
        readonly collections: wijmo.collections.ObservableArray<Collection>;
        /**
         * Gets a {@link Collection} by its {@link Collection.name}.
         *
         * @param name Name of the {@link Collection} to look for.
         */
        getCollection(name: string): Collection;
        /**
         * Occurs when the value of the {@link accessToken} property changes.
         */
        readonly accessTokenChanged: Event<Firestore, EventArgs>;
        /**
         * Raises the {@link accessTokenChanged} event.
         */
        onAccessTokenChanged(e?: wijmo.EventArgs): void;
        _copy(key: string, value: any): boolean;
    }
}
declare module wijmo.cloud {
    function softGridFilter(): typeof wijmo.grid.filter;
}
declare module wijmo.cloud {
    /**
     * Extends the {@link CollectionView} class to provide access to
     * document collections in a {@link Firestore} object.
     *
     * {@link Collection} objects may be created by setting the {@link collecions}
     * property when creating a {@link Firestore} object or by invoking
     * the {@link Collection} constructor directly. For example:
     *
     * ```typescript
     * import { Firestore, Collection } from '@grapecity/wijmo.cloud';
     *
     * // create a Firestore with three Collections
     * const PROJECT_ID = 'XXXX-YYYY';
     * const API_KEY = 'ZZZZ';
     * let fsNWind = new Firestore(PROJECT_ID, API_KEY, {
     *     collections: [ 'Products', 'Categories', 'Suppliers' ]
     * });
     *
     * // create an additional Collection by calling the constructor
     * let customers = new Collection(fsNWind, 'Customers');
     * ```
     *
     * In most applications, the {@link Collection} objects are used as
     * data sources for grid controls such as the {@link FlexGrid}
     * or {@link MultiRow} grid. For example:
     *
     * ```typescript
     * import { FireStore, Collection } from '@grapecity/wijmo.cloud';
     * import { FlexGrid } from '@grapecity/wijmo.cloud';
     *
     * // create a Firestore with three Collections
     * const PROJECT_ID = 'XXXX-YYYY';
     * const API_KEY = 'ZZZZ';
     * let fsNWind = new Firestore(PROJECT_ID, API_KEY, {
     *     collections: [ 'Products', 'Categories', 'Suppliers' ]
     * });
     *
     * // use a Collection as an itemsSource for a FlexGrid control:
     * let theGrid = new FlexGrid('#theGrid', {
     *     allowAddNew: true,
     *     allowDelete: true,
     *     itemsSource: fsNWind.getCollection('Products'),
     * });
     * ```
     *
     * This class does not use or require the use of the Firestore
     * client libraries.
     */
    class Collection extends wijmo.collections.CollectionView {
        _store: Firestore;
        _name: string;
        _parentItem: any;
        _loading: boolean;
        _toGetData: any;
        _fields: string[];
        _sortOnServer: boolean;
        _pageOnServer: boolean;
        _filterOnServer: boolean;
        _deferCommits: boolean;
        _hasPendingChanges: boolean;
        _filterProvider: wijmo.grid.filter.FlexGridFilter;
        _totalCount: number;
        _orderBy: wijmo.collections.SortDescription[];
        _fieldFilters: any[];
        _limit: number;
        static _filterCulture: any;
        /**
         * Initializes a new instance of the {@link Collection} class.
         *
         * @param store Reference to the {@link Firestore} that contains this {@link Collection}.
         * @param name Name of the {@link Collection}.
         * @param options JavaScript object containing initialization data (property values
         * and event handlers) for this {@link Collection}.
         */
        constructor(store: Firestore, name: string, options?: any);
        /**
         * Gets the {@link Firestore} that contains this {@link Collection}.
         */
        readonly store: Firestore;
        /**
         * Gets the name of this {@link Collection}.
         */
        readonly name: string;
        /**
         * Gets or sets an array with the names of the fields to retrieve from the
         * database.
         *
         * If not provided, all fields are included.
         *
         * Specifying the field names allows you to load only the data that your
         * application needs, improving performance and reducing network traffic.
         *
         * For example, the code below loads the 'Customers' table and retrieves
         * data for five fields only (the collection has 11 fields):
         *
         * ```typescript
         * import { Firestore, Collection } from '@grapecity/wijmo.cloud';
         *
         * // get the store (provides credentials)
         * const store = new Firestore(PROJECT_ID, API_KEY);
         *
         * // load the Customers collection
         * const customers = new Collection(store, 'Customers', {
         *     sortDescriptions: ['CustomerID'],
         *     fields: [
         *         'CustomerID',
         *         'CompanyName',
         *         'ContactName',
         *         'City',
         *         'Country'
         *     ],
         *     pageSize: 6 // server-side pagination
         * });
         * ```
         */
        fields: string[];
        /**
         * Gets or sets the number of maximum number of items to load
         * from the database.
         *
         * The default value for this property is <b>zero</b>, which
         * means no limit is set.
         */
        limit: number;
        /**
         * Gets or sets a value that determines whether sort operations should be
         * performed on the server as well as on the client.
         *
         * Use the {@link sortDescriptions} property to specify how the data should
         * be sorted.
         *
         * The default value for this property is <b>false</b>.
         */
        sortOnServer: boolean;
        /**
         * Gets or sets a value that determines whether paging should be
         * performed on the server or on the client.
         *
         * Use the {@link pageSize} property to enable paging.
         *
         * The default value for this property is <b>false</b>.
         */
        pageOnServer: boolean;
        /**
         * Gets or sets a value that determines whether filtering should be
         * performed on the server when using the {@link Collection} class
         * with the {@link FlexGridFilter} class.
         *
         * Server filtering tends to improve performance because less data has
         * to be downloaded. However, server filtering in Firestore has some
         * limitations:
         *
         * For example, you may combine multiple filter conditions using 'AND',
         * but not 'OR'. That means you could not build a query to get the items
         * where Country is set to "Brazil" OR have Sales greater than 1000.
         *
         * Also, if you combine equality (==) and range operators (>, >=, <, <=),
         * you will need to create a composite index. You cannot use range
         * operators on multiple fields. And there are no operators for inequality
         * or full text search.
         *
         * These limitations apply only to server queries. If you download the data,
         * then you can perform whatever filtering operations you want on the client.
         *
         * For more details on querying Firestore databases, please see
         * https://firebase.google.com/docs/firestore/query-data/queries.
         *
         * The default value for this property is <b>false</b>.
         */
        filterOnServer: boolean;
        /**
         * Gets or sets a value that causes the {@link Collection} to defer
         * commits back to the database.
         *
         * The default value for this property is <b>false</b>, which causes
         * any changes to the data to be immediately committed to the database.
         *
         * If you set this property to <b>true</b>, it will automatically set the
         * {@link trackChanges} property to true. After this, any changes to the
         * data (including edits, additions, and removals) will be tracked but
         * not committed to the database until you call the {@link commitChanges}
         * method to commit the changes, or the {@link cancelChanges} method
         * to discard all pending changes.
         *
         * For example:
         * ```typescript
         * import { Firestore} from '@grapecity/wijmo.cloud';
         *
         * // create Firestore data source
         * let fs = new Firestore(PROJECT_ID, API_KEY, {
         *     collections: [ 'restaurants' ]
         * });
         * let collection = fs.getCollection('restaurants');
         *
         * // defer commits
         * collection.deferCommits = true;
         *
         * // handle commit/cancel changes buttons
         * let btnCommit = document.getElementById('btn-commit') as HTMLButtonElement,
         *     btnCancel = document.getElementById('btn-cancel') as HTMLButtonElement;
         * btnCommit.addEventListener('click', () => collection.commitChanges());
         * btnCancel.addEventListener('click', () => collection.cancelChanges());
         * collection.hasPendingChangesChanged.addHandler((s, e) => {
         *    btnCommit.disabled = btnCancel.disabled = !collection.hasPendingChanges;
         * });
         * ```
         */
        deferCommits: boolean;
        /**
         * Commits all pending changes to the server.
         *
         * Changes are contained in the {@link itemsEdited}, {@link itemsAdded},
         * and {@link itemsRemoved} collections, and are automatically cleared
         * after they are successfully committed.
         *
         * The changes are committed in a transaction, so if there are any
         * errors during the operation, none of the changes are applied.
         * For more details on Firestore transactions, please see
         * [Firestore Transactions](https://firebase.google.com/docs/firestore/manage-data/transactions).
         *
         * See also the {@link deferCommits} property.
         *
         * @param committed Optional callback invoked when the commit operation
         * has been completed. The callback takes an <b>XMLHttpRequest</b>
         * parameter contains information about the request results, including
         * error information if any.
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
         * Gets a value that determines whether the {@link Collection} has
         * pending changes.
         *
         * See also the {@link deferCommits} property and the
         * {@link commitChanges} and {@link cancelChanges} methods.
         */
        readonly hasPendingChanges: boolean;
        /**
         * Gets a value that indicates the {@link Collection} is currently loading data.
         *
         * This property can be used to provide progress indicators.
         */
        readonly isLoading: boolean;
        /**
         * Loads or re-loads the collection data.
         * @param keepPosition Whether to keep the cursor position.
         */
        load(keepPosition?: boolean): void;
        /**
         * Defines the fields that should be retrieved from the server.
         *
         * The {@link select} method is an alternative to the {@link fields}
         * property.
         *
         * @param fields Array containing the names of the fields to be retrieved.
         */
        select(...fields: string[]): Collection;
        /**
         * Specifies a field to sort by on the server.
         *
         * You can call the {@link orderBy} method several times to sort on
         * multiple fields.
         *
         * Sorts created with the {@link orderBy} operator are always applied on
         * the server, regardless of the setting of the {@link sortOnServer}
         * property.
         *
         * @param field Name of the field to sort by, or null to clear all sorts.
         * @param ascending Whether to sort the field in ascending or descending order.
         */
        orderBy(field?: string, ascending?: boolean): Collection;
        /**
         * Specifies a filter to apply on the server.
         *
         * You may call the {@link where} method several times to create composite
         * filters.
         *
         * Filters created with the {@link where} operator are always applied on
         * the server, regardless of the setting of the {@link filterOnServer}
         * property.
         *
         * @param field Field to filter on, or null to clear all filters.
         * @param operator Filter operator (>, >=, ,!=, ==, <, <=, or IN)
         * @param value Value to filter by.
         */
        where(field?: string, operator?: string, value?: any): Collection;
        /**
         * Gets a sub-collection from a data item.
         *
         * Items in Firestore collections may contain sub-collections.
         *
         * Unlike arrays, sub-collections are not automatically loaded
         * when the data item (document) is loaded. They must be loaded
         * explicitly using the {@link getSubCollection} method.
         *
         * Sub-collections use the same {@link Firestore} and therefore
         * have the same security credentials as the parent collection.
         *
         * For example:
         *
         * ```typescript
         * import { Firestore, Collection } from '@grapecity/wijmo.cloud';
         *
         * // create the store object
         * const PROJECT_ID = 'XXXX-YYYY';
         * const API_KEY = 'ZZZZ';
         * const store = new Firestore(PROJECT_ID, API_KEY);
         *
         * // load top-level 'suggestions' collection
         * const suggestions = new Collection(store, 'suggestions', {
         *     loaded: s => {
         *         console.log(`loaded ${s.items.length} suggestions.`);
         *
         *         // load 'comments' sub-collection for the first suggestion
         *         let comments = new SubCollection(store, s.items[0], 'comments', {
         *             loaded: s => {
         *                 console.log(`first suggestion has ${s.items.length} comments.`);
         *             }
         *         });
         *      }
         * });
         * ```
         *
         * @param item Data item that contains the sub-collection.
         * @param name Name of the sub-collection.
         * @param options JavaScript object containing initialization data (property values
         * and event handlers) for the sub-collection.
         * @returns A {@link Collection} object containing the sub-collection.
         */
        getSubCollection(item: any, name: string, options?: any): Collection;
        /**
         * Occurs when the {@link Collection} starts loading data.
         */
        readonly loading: Event<Collection, CancelEventArgs>;
        /**
         * Raises the {@link loading} event.
         */
        onLoading(e: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs when the {@link Collection} finishes loading data.
         */
        readonly loaded: Event<Collection, EventArgs>;
        /**
         * Raises the {@link loaded} event.
         */
        onLoaded(e?: wijmo.EventArgs): void;
        /**
         * Occurs when there is an error reading or writing data.
         */
        readonly error: Event<Collection, RequestErrorEventArgs>;
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
        readonly hasPendingChangesChanged: Event<Collection, EventArgs>;
        /**
         * Raises the {@link hasPendingChangesChanged} event.
         */
        onHasPendingChangesChanged(e?: wijmo.EventArgs): void;
        /**
         * Gets the total number of items in the view before paging is applied.
         *
         * Firestore does not provide an efficient way of counting the items
         * in the collection, so this property starts with a high default value.
         * If the user tries to move to a page that is beyond the actual count,
         * the cursor will move to the last page and the property value will be
         * updated automatically.
         */
        totalItemCount: number;
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
         * Updates the filter definition based on a known filter provider such as the
         * {@link FlexGridFilter}.
         *
         * @param filterProvider Known filter provider, typically an instance of a
         * {@link FlexGridFilter}.
         */
        updateFilterDefinition(filterProvider: any): void;
        _getPageView(): any[];
        _generateID(): string;
        _updateHasChanges(): void;
        _getData(keepPosition?: boolean): void;
        _getQuery(): any;
        _parseData(docs: any[]): any[];
        _raiseError(xhr: XMLHttpRequest, reload: boolean): void;
        _saveDocName(doc: any, item: any): boolean;
        _docToItem(doc: any): any;
        _getDocValue(obj: any): any;
        _itemToDoc(item: any): any;
        _getValueObject(value: any): any;
        _getRequestHeaders(): any;
        _getUrl(doc?: any): string;
        _getQueryFilters(): any[];
        _getQueryConditionFilter(filters: any[], cf: wijmo.grid.filter.ConditionFilter): void;
        _getQuerySimpleFilter(fc: wijmo.grid.filter.FilterCondition, path: string): any;
        _getFilterOperator(op: wijmo.grid.filter.Operator): string;
        _getQueryValueFilter(filters: any[], vf: wijmo.grid.filter.ValueFilter): void;
    }
}
declare module wijmo.cloud {
}
