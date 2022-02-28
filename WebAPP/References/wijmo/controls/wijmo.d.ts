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
declare module wijmo {
    function isMobile(): boolean;
    function isiOS(): boolean;
    function isFirefox(): boolean;
    function isSafari(): boolean;
    function isEdge(): boolean;
    function isIE(): boolean;
    function isIE9(): boolean;
    function isIE10(): boolean;
    function getEventOptions(capture: boolean, passive: boolean): any;
    function supportsFocusOptions(): boolean;
    function _startDrag(dataTransfer: any, effectAllowed: string): void;
}
declare module wijmo {
    function _getCalculatedArray(arr: any[], calculatedFields: any, newItem?: any): any[];
    function _getTargetObject(item: any): any;
}
declare module wijmo {
    class _FocusService {
        private readonly _hasDoc;
        private _ae;
        private static readonly _noAe;
        constructor();
        readonly activeElement: HTMLElement;
        private _onBlur;
        private _onFocus;
        private _isSpecialRoot;
        private _nativeAe;
    }
    var _focusSrv: _FocusService;
}
declare module wijmo {
    /**
     * Provides binding to complex properties (e.g. 'customer.address.city')
     */
    class Binding {
        _path: string;
        _parts: any[];
        _key: string;
        /**
         * Initializes a new instance of the {@link Binding} class.
         *
         * @param path Name of the property to bind to.
         */
        constructor(path: string);
        /**
         * Gets or sets the path for the binding.
         *
         * In the simplest case, the path is the name of the property of the source
         * object to use for the binding (e.g. 'street').
         *
         * Sub-properties of a property can be specified by a syntax similar to that
         * used in JavaScript (e.g. 'address.street').
         */
        path: string;
        /**
         * Gets the binding value for a given object.
         *
         * If the object does not contain the property specified by the
         * binding {@link path}, the method returns null.
         *
         * @param object The object that contains the data to be retrieved.
         */
        getValue(object: any): any;
        /**
         * Sets the binding value on a given object.
         *
         * If the object does not contain the property specified by the
         * binding {@link path}, the value is not set.
         *
         * @param object The object that contains the data to be set.
         * @param value Data value to set.
         * @returns True if the value was assigned correctly, false otherwise.
         */
        setValue(object: any, value: any): boolean;
    }
}
declare module wijmo {
    /**
     * Represents an event handler.
     *
     * Event handlers are functions invoked when events are raised.
     *
     * Every event handler has two arguments:
     * <ul>
     *   <li><b>sender</b> is the object that raised the event, and</li>
     *   <li><b>args</b> is an optional object that contains the event parameters.</li>
     * </ul>
     *
     * Read more about <a href="https://www.grapecity.com/blogs/html-and-wijmo-events" target="_blank">Wijmo Events</a>.
     *
     */
    interface IEventHandler<S = any, T = EventArgs> {
        (sender: S, args: T): void;
    }
    /**
     * Represents an event.
     *
     * Wijmo events are similar to .NET events. Any class may define events by
     * declaring them as fields. Any class may subscribe to events using the
     * event's {@link addHandler} method and unsubscribe using the {@link removeHandler}
     * method.
     *
     * Wijmo event handlers take two parameters: <i>sender</i> and <i>args</i>.
     * The first is the object that raised the event, and the second is an object
     * that contains the event parameters.
     *
     * Classes that define events follow the .NET pattern where for every event
     * there is an <i>on[EVENTNAME]</i> method that raises the event. This pattern
     * allows derived classes to override the <i>on[EVENTNAME]</i> method and
     * handle the event before and/or after the base class raises the event.
     * Derived classes may even suppress the event by not calling the base class
     * implementation.
     *
     * For example, the TypeScript code below overrides the <b>onValueChanged</b>
     * event for a control to perform some processing before and after the
     * <b>valueChanged</b> event fires:
     *
     * <pre>// override base class
     * onValueChanged(e: EventArgs) {
     *   // execute some code before the event fires
     *   console.log('about to fire valueChanged');
     *   // optionally, call base class to fire the event
     *   super.onValueChanged(e);
     *   // execute some code after the event fired
     *   console.log('valueChanged event just fired');
     * }</pre>
     */
    class Event<S = any, T = EventArgs> {
        private _handlers;
        private _handlersChanged;
        /**
         * Initializes a new instance of an {@link Event}.
         *
         * @param handlersChanged Optional callback invoked when handlers are
         * added or removed from this {@link Event}.
         */
        constructor(handlersChanged?: Function);
        /**
         * Adds a handler to this event.
         *
         * @param handler Function invoked when the event is raised.
         * @param self Object that defines the event handler
         * (accessible as 'this' from the handler code).
         */
        addHandler(handler: IEventHandler<S, T>, self?: any): void;
        /**
         * Removes a handler from this event.
         *
         * @param handler Function invoked when the event is raised.
         * @param self Object that owns the event handler (accessible as 'this' from the handler code).
         */
        removeHandler(handler: IEventHandler<S, T>, self?: any): void;
        /**
         * Removes all handlers associated with this event.
         */
        removeAllHandlers(): void;
        /**
         * Raises this event, causing all associated handlers to be invoked.
         *
         * @param sender Source object.
         * @param args Event parameters.
         */
        raise(sender: any, args?: EventArgs): void;
        /**
         * Gets a value that indicates whether this event has any handlers.
         */
        readonly hasHandlers: boolean;
        /**
         * Gets the number of handlers added to this event.
         */
        readonly handlerCount: number;
    }
    /**
     * Base class for event arguments.
     */
    class EventArgs {
        /**
         * Provides a value to use with events that do not have event data.
         */
        static empty: EventArgs;
    }
    /**
     * Provides arguments for cancellable events.
     */
    class CancelEventArgs extends EventArgs {
        /**
         * Gets or sets a value that indicates whether the event should be canceled.
         */
        cancel: boolean;
    }
    /**
     * Provides arguments for property change events.
     */
    class PropertyChangedEventArgs extends EventArgs {
        _name: string;
        _oldVal: any;
        _newVal: any;
        /**
         * Initializes a new instance of the {@link PropertyChangedEventArgs} class.
         *
         * @param propertyName The name of the property whose value changed.
         * @param oldValue The old value of the property.
         * @param newValue The new value of the property.
         */
        constructor(propertyName: string, oldValue: any, newValue: any);
        /**
         * Gets the name of the property whose value changed.
         */
        readonly propertyName: string;
        /**
         * Gets the old value of the property.
         */
        readonly oldValue: any;
        /**
         * Gets the new value of the property.
         */
        readonly newValue: any;
    }
    /**
     * Provides arguments for
     * <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" target="_blank">XMLHttpRequest</a>
     * error events.
     */
    class RequestErrorEventArgs extends CancelEventArgs {
        _xhr: XMLHttpRequest;
        _msg: string;
        /**
         * Initializes a new instance of the {@link RequestErrorEventArgs} class.
         *
         * @param xhr The <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" target="_blank">XMLHttpRequest</a>
         * that detected the error.
         * The 'status' and 'statusText' properties of the request object contain details about the error.
         * @param msg Optional error message.
         */
        constructor(xhr: XMLHttpRequest, msg?: string);
        /**
         * Gets a reference to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" target="_blank">XMLHttpRequest</a>
         * that detected the error.
         *
         * The status and statusText properties of the request object contain
         * details about the error.
         */
        readonly request: XMLHttpRequest;
        /**
         * Gets or sets an error message to display to the user.
         */
        message: string;
    }
}
declare module wijmo.collections {
    /**
     * Notifies listeners of dynamic changes, such as when items get added and
     * removed or when the collection is sorted, filtered, or grouped.
     */
    interface INotifyCollectionChanged {
        /**
         * Occurs when the collection changes.
         */
        collectionChanged: wijmo.Event<INotifyCollectionChanged, NotifyCollectionChangedEventArgs>;
    }
    /**
     * Describes the action that caused the {@link INotifyCollectionChanged.collectionChanged}
     * event to fire.
     */
    enum NotifyCollectionChangedAction {
        /** An item was added to the collection. */
        Add = 0,
        /** An item was removed from the collection. */
        Remove = 1,
        /** An item was changed or replaced. */
        Change = 2,
        /**
         * Several items changed simultaneously
         * (for example, the collection was sorted, filtered, or grouped).
         */
        Reset = 3
    }
    /**
     * Provides data for the {@link INotifyCollectionChanged.collectionChanged} event.
     */
    class NotifyCollectionChangedEventArgs<T = any> extends wijmo.EventArgs {
        /**
         * Provides a reset notification.
         */
        static reset: NotifyCollectionChangedEventArgs<any>;
        /**
         * Gets the action that caused the event to fire.
         */
        action: NotifyCollectionChangedAction;
        /**
         * Gets the item that was added, removed, or changed.
         */
        item: T;
        /**
         * Gets the index at which the change occurred.
         */
        index: number;
        /**
         * Initializes a new instance of the {@link NotifyCollectionChangedEventArgs} class.
         *
         * @param action Type of action that caused the event to fire.
         * @param item Item that was added or changed.
         * @param index Index of the item.
         */
        constructor(action?: NotifyCollectionChangedAction, item?: T, index?: number);
    }
    /**
     * Represents a method that takes an item of any type and returns a
     * boolean that indicates whether the object meets a set of criteria.
     */
    interface IPredicate<T = any> {
        /**
         * @param item Data item to test.
         * @returns true if the item passes the test, false otherwise.
         */
        (item: T): boolean;
    }
    /**
     * Represents a method that compares two objects.
     */
    interface IComparer<T = any> {
        /**
         * @param: item1 First object to compare.
         * @param: item2 Second object to compare.
         * @returns -1, 0, or +1 to indicate that the first item is smaller than, equal to, or created than the second.
         */
        (item1: T, item2: T): number;
    }
    /**
     * Represents a method that takes an item and a property name
     * and returns a group name.
     */
    interface IGroupConverter<T = any> {
        /**
         * @param item Data item being grouped.
         * @param property Name of the property being grouped on.
         * @return Name of the group to use for this data item.
         */
        (item: T, property: string): string;
    }
    /**
     * Describes a sorting criterion.
     */
    class SortDescription {
        _bnd: wijmo.Binding;
        _asc: boolean;
        /**
         * Initializes a new instance of the {@link SortDescription} class.
         *
         * @param property Name of the property to sort on.
         * @param ascending Whether to sort in ascending order.
         */
        constructor(property: string, ascending: boolean);
        /**
         * Gets the name of the property used to sort.
         */
        readonly property: string;
        /**
         * Gets a value that determines whether to sort the values in ascending order.
         */
        readonly ascending: boolean;
    }
    /**
     * Enables collections to have the functionalities of current record management,
     * custom sorting, filtering, and grouping.
     *
     * This is a JavaScript version of the <b>ICollectionView</b> interface used in
     * Microsoft's XAML platform. It provides a consistent, powerful, and  MVVM-friendly
     * way to bind data to UI elements.
     *
     * Wijmo includes several classes that implement {@link ICollectionView}. The most
     * common is {@link CollectionView}, which works based on regular JavsScript
     * arrays.
     */
    interface ICollectionView<T = any> extends INotifyCollectionChanged, wijmo.IQueryInterface {
        /**
         * Gets a value that indicates whether this view supports filtering via the
         * {@link filter} property.
         */
        canFilter: boolean;
        /**
         * Gets a value that indicates whether this view supports grouping via the
         * {@link groupDescriptions} property.
         */
        canGroup: boolean;
        /**
         * Gets a value that indicates whether this view supports sorting via the
         * {@link sortDescriptions} property.
         */
        canSort: boolean;
        /**
         * Gets the current item in the view.
         */
        currentItem: T;
        /**
         * Gets the ordinal position of the current item in the view.
         */
        currentPosition: number;
        /**
         * Gets or sets a callback used to determine if an item is suitable for
         * inclusion in the view.
         *
         * NOTE: If the filter function needs a scope (i.e. a meaningful 'this'
         * value), then remember to set the filter using the 'bind' function to
         * specify the 'this' object. For example:
         * <pre>
         *   collectionView.filter = this._filter.bind(this);
         * </pre>
         */
        filter: IPredicate<T> | null;
        /**
         * Gets a collection of {@link GroupDescription} objects that describe how the
         * items in the collection are grouped in the view.
         */
        groupDescriptions: ObservableArray<GroupDescription>;
        /**
         * Gets the top-level groups.
         */
        groups: any[];
        /**
         * Gets a value that indicates whether this view contains no items.
         */
        isEmpty: boolean;
        /**
         * Gets a collection of {@link SortDescription} objects that describe how the items
         * in the collection are sorted in the view.
         */
        sortDescriptions: ObservableArray<SortDescription>;
        /**
         * Gets or sets the collection object from which to create this view.
         */
        sourceCollection: any;
        /**
         * Returns a value that indicates whether a given item belongs to this view.
         *
         * @param item The item to locate in the collection.
         */
        contains(item: T): boolean;
        /**
         * Sets the specified item to be the current item in the view.
         *
         * @param item The item to set as the {@link currentItem}.
         */
        moveCurrentTo(item: T): boolean;
        /**
         * Sets the first item in the view as the current item.
         */
        moveCurrentToFirst(): boolean;
        /**
         * Sets the last item in the view as the current item.
         */
        moveCurrentToLast(): boolean;
        /**
         * Sets the item after the current item in the view as the current item.
         */
        moveCurrentToNext(): boolean;
        /**
         * Sets the item at the specified index in the view as the current item.
         *
         * @param index The index of the item to set as the {@link currentItem}.
         */
        moveCurrentToPosition(index: number): boolean;
        /**
         * Sets the item before the current item in the view as the current item.
         */
        moveCurrentToPrevious(): boolean;
        /**
         * Re-creates the view using the current sort, filter, and group parameters.
         */
        refresh(): void;
        /**
         * Occurs after the current item changes.
         */
        currentChanged: wijmo.Event<ICollectionView, wijmo.EventArgs>;
        /**
         * Occurs before the current item changes.
         */
        currentChanging: wijmo.Event<ICollectionView, wijmo.EventArgs>;
        /**
         * Suspends refreshes until the next call to {@link endUpdate}.
         */
        beginUpdate(): void;
        /**
         * Resumes refreshes suspended by a call to {@link beginUpdate}.
         *
         * @param force Whether to force a refresh when ending the update.
         */
        endUpdate(force?: boolean): void;
        /**
         * Executes a function within a beginUpdate/endUpdate block.
         *
         * The collection will not be refreshed until the function has been executed.
         * This method ensures endUpdate is called even if the function throws.
         *
         * @param fn Function to be executed within the beginUpdate/endUpdate block.
         * @param force Whether to force a refresh when ending the update.
         */
        deferUpdate(fn: Function, force?: boolean): void;
        /**
         * Gets the filtered, sorted, grouped items in the view.
         */
        items: T[];
    }
    /**
     * Defines methods and properties that extend {@link ICollectionView} to provide
     * editing capabilities.
     */
    interface IEditableCollectionView extends ICollectionView {
        /**
         * Gets a value that indicates whether a new item can be added to the collection.
         */
        canAddNew: boolean;
        /**
         * Gets a value that indicates whether the collection view can discard pending changes
         * and restore the original values of an edited object.
         */
        canCancelEdit: boolean;
        /**
         * Gets a value that indicates whether items can be removed from the collection.
         */
        canRemove: boolean;
        /**
         * Gets the item that is being added during the current add transaction.
         */
        currentAddItem: any;
        /**
         * Gets the item that is being edited during the current edit transaction.
         */
        currentEditItem: any;
        /**
         * Gets a value that indicates whether an add transaction is in progress.
         */
        isAddingNew: boolean;
        /**
         * Gets a value that indicates whether an edit transaction is in progress.
         */
        isEditingItem: boolean;
        /**
         * Adds a new item to the collection.
         *
         * @return The item that was added to the collection.
         */
        addNew(): any;
        /**
         * Ends the current edit transaction and, if possible,
         * restores the original value to the item.
         */
        cancelEdit(): void;
        /**
         * Ends the current add transaction and discards the pending new item.
         */
        cancelNew(): void;
        /**
         * Ends the current edit transaction and saves the pending changes.
         */
        commitEdit(): void;
        /**
         * Ends the current add transaction and saves the pending new item.
         */
        commitNew(): void;
        /**
         * Begins an edit transaction of the specified item.
         *
         * @param item Item to edit.
         */
        editItem(item: any): void;
        /**
         * Removes the specified item from the collection.
         *
         * @param item Item to remove from the collection.
         */
        remove(item: any): void;
        /**
         * Removes the item at the specified index from the collection.
         *
         * @param index Index of the item to remove from the collection.
         */
        removeAt(index: number): void;
    }
    /**
     * Defines methods and properties that extend {@link ICollectionView} to provide
     * paging capabilities.
     */
    interface IPagedCollectionView extends ICollectionView {
        /**
         * Gets a value that indicates whether the {@link pageIndex} value can change.
         */
        canChangePage: boolean;
        /**
         * Gets a value that indicates whether the index is changing.
         */
        isPageChanging: boolean;
        /**
         * Gets the number of items in the view taking paging into account.
         *
         * To get the total number of items, use the {@link totalItemCount} property.
         *
         * Notice that this is different from the .NET <b>IPagedCollectionView</b>,
         * where <b>itemCount</b> and <b>totalItemCount</b> both return the count
         * before paging is applied.
         */
        itemCount: number;
        /**
         * Gets the zero-based index of the current page.
         */
        pageIndex: number;
        /**
         * Gets or sets the number of items to display on each page.
         */
        pageSize: number;
        /**
         * Gets the total number of items in the view before paging is applied.
         *
         * To get the number of items in the current view taking paging into
         * account, use the {@link itemCount} property.
         *
         * Notice that this is different from the .NET <b>IPagedCollectionView</b>,
         * where <b>itemCount</b> and <b>totalItemCount</b> both return the count
         * before paging is applied.
         */
        totalItemCount: number;
        /**
         * Sets the first page as the current page.
         */
        moveToFirstPage(): boolean;
        /**
         * Sets the last page as the current page.
         */
        moveToLastPage(): boolean;
        /**
         * Moves to the page after the current page.
         */
        moveToNextPage(): boolean;
        /**
         * Moves to the page at the specified index.
         *
         * @param index Index of the page to move to.
         */
        moveToPage(index: number): boolean;
        /**
         * Moves to the page before the current page.
         */
        moveToPreviousPage(): boolean;
        /**
        * Occurs after the page index changes.
        */
        pageChanged: wijmo.Event<IPagedCollectionView, wijmo.EventArgs>;
        /**
         * Occurs before the page index changes.
         */
        pageChanging: wijmo.Event<IPagedCollectionView, PageChangingEventArgs>;
    }
    /**
     * Provides data for the {@link IPagedCollectionView.pageChanging} event
     */
    class PageChangingEventArgs extends wijmo.CancelEventArgs {
        /**
         * Gets the index of the page that is about to become current.
         */
        newPageIndex: number;
        /**
         * Initializes a new instance of the {@link PageChangingEventArgs} class.
         *
         * @param newIndex Index of the page that is about to become current.
         */
        constructor(newIndex: number);
    }
    /**
     * Represents a base class for types defining grouping conditions.
     *
     * The concrete class which is commonly used for this purpose is
     * {@link PropertyGroupDescription}.
     */
    class GroupDescription {
        /**
         * Returns the group name for the given item.
         *
         * @param item The item to get group name for.
         * @param level The zero-based group level index.
         * @return The name of the group the item belongs to.
         */
        groupNameFromItem(item: any, level: number): any;
        /**
         * Returns a value that indicates whether the group name and the item name
         * match (which implies that the item belongs to the group).
         *
         * @param groupName The name of the group.
         * @param itemName The name of the item.
         * @return True if the names match; otherwise, false.
         */
        namesMatch(groupName: any, itemName: any): boolean;
    }
    /**
     * Describes the grouping of items using a property name as the criterion.
     *
     * For example, the code below causes a {@link CollectionView} to group items
     * by the value of their 'country' property:
     * <pre>
     * var cv = new wijmo.collections.CollectionView(items);
     * var gd = new wijmo.collections.PropertyGroupDescription('country');
     * cv.groupDescriptions.push(gd);
     * </pre>
     *
     * You may also specify a callback function that generates the group name.
     * For example, the code below causes a {@link CollectionView} to group items
     * by the first letter of the value of their 'country' property:
     * <pre>
     * var cv = new wijmo.collections.CollectionView(items);
     * var gd = new wijmo.collections.PropertyGroupDescription('country',
     *   function(item, propName) {
     *     return item[propName][0]; // return country's initial
     * });
     * cv.groupDescriptions.push(gd);
     * </pre>
     */
    class PropertyGroupDescription extends GroupDescription {
        _bnd: wijmo.Binding;
        _converter: IGroupConverter;
        /**
         * Initializes a new instance of the {@link PropertyGroupDescription} class.
         *
         * @param property The name of the property that specifies
         * which group an item belongs to.
         * @param converter A callback function that takes an item and
         * a property name and returns the group name. If not specified,
         * the group name is the property value for the item.
         */
        constructor(property: string, converter?: IGroupConverter);
        /**
         * Gets the name of the property that is used to determine which
         * group an item belongs to.
         */
        readonly propertyName: string;
        /**
         * Returns the group name for the given item.
         *
         * @param item The item to get group name for.
         * @param level The zero-based group level index.
         * @return The name of the group the item belongs to.
         */
        groupNameFromItem(item: any, level: number): any;
        /**
         * Returns a value that indicates whether the group name and the item name
         * match (which implies that the item belongs to the group).
         *
         * @param groupName The name of the group.
         * @param itemName The name of the item.
         * @return True if the names match; otherwise, false.
         */
        namesMatch(groupName: any, itemName: any): boolean;
    }
}
declare module wijmo {
    /**
     * Gets the version of the Wijmo library that is currently loaded.
     */
    function getVersion(): string;
    /**
     * Sets the license key that identifies licensed Wijmo applications.
     *
     * If you do not set the license key, Wijmo will run in evaluation mode,
     * adding a watermark element to the page.
     *
     * Licensed users may obtain keys at the
     * <a href="https://www.grapecity.com/my-account" target="_blank">My Account</a>
     * section of the Wijmo site.
     *
     * Note that Wijmo does not send keys or any licensing information to any servers.
     * It only checks the internal consistency of the key provided.
     *
     * @param licenseKey String containing the license key to use in this application.
     */
    function setLicenseKey(licenseKey: string): void;
    /**
     * Specifies constants that represent keyboard codes.
     *
     * This enumeration is useful when handling <b>keyDown</b> events.
     */
    enum Key {
        /** The backspace key. */
        Back = 8,
        /** The tab key. */
        Tab = 9,
        /** The enter key. */
        Enter = 13,
        /** The escape key. */
        Escape = 27,
        /** The space key. */
        Space = 32,
        /** The page up key. */
        PageUp = 33,
        /** The page down key. */
        PageDown = 34,
        /** The end key. */
        End = 35,
        /** The home key. */
        Home = 36,
        /** The left arrow key. */
        Left = 37,
        /** The up arrow key. */
        Up = 38,
        /** The right arrow key. */
        Right = 39,
        /** The down arrow key. */
        Down = 40,
        /** The delete key. */
        Delete = 46,
        /** The F1 key. */
        F1 = 112,
        /** The F2 key. */
        F2 = 113,
        /** The F3 key. */
        F3 = 114,
        /** The F4 key. */
        F4 = 115,
        /** The F5 key. */
        F5 = 116,
        /** The F6 key. */
        F6 = 117,
        /** The F7 key. */
        F7 = 118,
        /** The F8 key. */
        F8 = 119,
        /** The F9 key. */
        F9 = 120,
        /** The F10 key. */
        F10 = 121,
        /** The F11 key. */
        F11 = 122,
        /** The F12 key. */
        F12 = 123
    }
    /**
     * Specifies constants that represent data types.
     *
     * Use the {@link getType} method to get a {@link DataType} from a value.
     */
    enum DataType {
        /** Object (anything). */
        Object = 0,
        /** String. */
        String = 1,
        /** Number. */
        Number = 2,
        /** Boolean. */
        Boolean = 3,
        /** Date (date and time). */
        Date = 4,
        /** Array. */
        Array = 5
    }
    /**
     * Allows callers to verify whether an object implements an interface.
     */
    interface IQueryInterface {
        /**
         * Returns true if the object implements a given interface.
         *
         * @param interfaceName Name of the interface to look for.
         */
        implementsInterface(interfaceName: string): boolean;
    }
    /**
     * Casts a value to a type if possible.
     *
     * @param value Value to cast.
     * @param type Type or interface name to cast to.
     * @return The value passed in if the cast was successful, null otherwise.
     */
    function tryCast(value: any, type: any): any;
    /**
     * Determines whether an object is a primitive type (string, number, Boolean, or Date).
     *
     * @param value Value to test.
     */
    function isPrimitive(value: any): value is string | number | Boolean | Date;
    /**
     * Determines whether an object is a string.
     *
     * @param value Value to test.
     */
    function isString(value: any): value is string;
    /**
     * Determines whether a string is null, empty, or whitespace only.
     *
     * @param value Value to test.
     */
    function isNullOrWhiteSpace(value: string): boolean;
    /**
     * Determines whether an object is a number.
     *
     * @param value Value to test.
     */
    function isNumber(value: any): value is number;
    /**
     * Determines whether an object is an integer.
     *
     * @param value Value to test.
     */
    function isInt(value: any): value is number;
    /**
     * Determines whether an object is a Boolean.
     *
     * @param value Value to test.
     */
    function isBoolean(value: any): value is boolean;
    /**
     * Determines whether an object is a function.
     *
     * @param value Value to test.
     */
    function isFunction(value: any): value is Function;
    /**
     * Determines whether an object is undefined.
     *
     * @param value Value to test.
     */
    function isUndefined(value: any): value is undefined;
    /**
     * Determines whether an object is a Date.
     *
     * @param value Value to test.
     */
    function isDate(value: any): value is Date;
    /**
     * Determines whether an object is an Array.
     *
     * @param value Value to test.
     */
    function isArray(value: any): value is Array<any>;
    /**
     * Determines whether a value is an object
     * (as opposed to a value type, an array, or a Date).
     *
     * @param value Value to test.
     */
    function isObject(value: any): boolean;
    /**
     * Determines whether an object is empty
     * (contains no enumerable properties).
     *
     * @param obj Object to test.
     */
    function isEmpty(obj: any): boolean;
    /**
     * Creates a new unique id for an element by adding sequential
     * numbers to a given base id.
     *
     * @param baseId String to use as a basis for generating the unique id.
     */
    function getUniqueId(baseId: string): string;
    /**
     * Converts mouse or touch event arguments into a {@link Point} in page coordinates.
     */
    function mouseToPage(e: any): Point;
    /**
     * Gets the type of a value.
     *
     * @param value Value to test.
     * @return A {@link DataType} value representing the type of the value passed in.
     */
    function getType(value: any): DataType;
    /**
     * Provides binding information for object properties.
     */
    interface IBindingInfo {
        binding: string;
        dataType: DataType;
        isReadOnly?: boolean;
    }
    /**
     * Gets an array containing the names and types of items in an array.
     *
     * @param arr Array containing data items.
     * @param limit Number of the array items to scan (1000 by default). Zero or negative value causes
     *  the function to scan all items.
     * @return An array containing objects with the binding and type of each
     * primitive property in the items found in the input array.
     */
    function getTypes(arr: any[], limit?: number): IBindingInfo[];
    /**
     * Changes the type of a value.
     *
     * If the conversion fails, the original value is returned. To check if a
     * conversion succeeded, you should check the type of the returned value.
     *
     * @param value Value to convert.
     * @param type {@link DataType} to convert the value to.
     * @param format Format to use when converting to or from strings.
     * @param refDate Reference date to use when parsing strings with missing information.
     * @return The converted value, or the original value if a conversion was not possible.
     */
    function changeType(value: any, type: DataType, format?: string, refDate?: Date): any;
    /**
     * Rounds or truncates a number to a specified precision.
     *
     * @param value Value to round or truncate.
     * @param prec Number of decimal digits for the result.
     * @param truncate Whether to truncate or round the original value.
     */
    function toFixed(value: number, prec: number, truncate: boolean): number;
    /**
     * Replaces each format item in a specified string with the text equivalent of an
     * object's value.
     *
     * The function works by replacing parts of the <b>formatString</b> with the pattern
     * '{name:format}' with properties of the <b>data</b> parameter. For example:
     *
     * ```typescript
     * import { format } from '@grapecity/wijmo';
     * let data = { name: 'Joe', amount: 123456 },
     *     msg = format('Hello {name}, you won {amount:n2}!', data);
     * ```
     *
     * The {@link format} function supports pluralization. If the format string is a
     * JSON-encoded object with 'count' and 'when' properties, the method uses
     * the 'count' parameter of the data object to select the appropriate format
     * from the 'when' property. For example:
     *
     * ```typescript
     * import { format } from '@grapecity/wijmo';
     * fmtObj fmt = {
     *     count: 'count',
     *     when: {
     *         0: 'No items selected.',
     *         1: 'One item is selected.',
     *         2: 'A pair is selected.',
     *         'other': '{count:n0} items are selected.'
     *     }
     * };
     * let fmt = JSON.stringify(fmtObj);
     * console.log(format(fmt, { count: 0 }));  // No items selected.
     * console.log(format(fmt, { count: 1 }));  // One item is selected.
     * console.log(format(fmt, { count: 2 }));  // A pair is selected.
     * console.log(format(fmt, { count: 12 })); // 12 items are selected.
     * ```
     *
     * The optional <b>formatFunction</b> allows you to customize the content by
     * providing context-sensitive formatting. If provided, the format function
     * gets called for each format element and gets passed the data object, the
     * parameter name, the format, and the value; it should return an output string.
     * For example:
     *
     * ```typescript
     * import { format, isString, escapeHtml } from '@grapecity/wijmo';
     * let data = { name: 'Joe', amount: 123456 },
     *     msg = format('Hello {name}, you won {amount:n2}!', data,
     *     (data, name, fmt, val) => {
     *         if (isString(data[name])) {
     *             val = escapeHtml(data[name]);
     *         }
     *         return val;
     *     }
     * );
     * ```
     *
     * @param format A composite format string.
     * @param data The data object used to build the string.
     * @param formatFunction An optional function used to format items in context.
     * @return The formatted string.
     */
    function format(format: string, data: any, formatFunction?: Function): string;
    /**
     * Tag function for use with template literals.
     *
     * The {@link glbz} tag function allows you to specify formatting for
     * variables in template literal expressions.
     *
     * To format a variable in a template literal using {@link glbz}, add a
     * colon and the format string after the name of the variable you want
     * to format.
     *
     * For example:
     *
     * ```typescript
     * import { glbz } from '@grapecity/wijmo';
     * let num = 42,
     *     dt = new Date(),
     *     msg = glbz`the number is ${num}:n2, and the date is ${dt}:'MMM d, yyyy'!`;
     * ```
     */
    function glbz(...args: any[]): string;
    /**
     * Evaluates a string in template literal notation.
     *
     * This function allows you to evaluate template literals on-demand,
     * rather than when they are declared.
     *
     * The template string uses the standard template literal syntax,
     * except it is a regular string (enclosed in single or double
     * quotes) rather than a template literal (enclosed in back-quotes).
     *
     * The template string may contain references to variables provided
     * in a context object passed as a parameter.
     *
     * The template string may contain formatting information as
     * used with the {@link glbz} tag function.
     *
     * For example:
     * ```typescript
     * import { evalTemplate } from '@grapecity/wijmo';
     * const msg = evalTemplate('hello ${user}, want some ${Math.PI}:n2?', { user: 'Chris' }));
     * console.log(msg);
     * > hello Chris, want some 3.14?
     * ```
     *
     * @param template String in template literal notation.
     * @param ctx Object with properties acessible to the template.
     * @returns A string containing the result.
     */
    function evalTemplate(template: string, ctx?: any): string;
    /**
     * Clamps a value between a minimum and a maximum.
     *
     * @param value Original value.
     * @param min Minimum allowed value.
     * @param max Maximum allowed value.
     */
    function clamp(value: number, min: number, max: number): number;
    /**
     * Copies properties from an object to another.
     *
     * This method is typically used to initialize controls and other Wijmo objects
     * by setting their properties and assigning event handlers.
     *
     * The destination object must define all the properties defined in the source,
     * or an error will be thrown.
     *
     * @param dst The destination object.
     * @param src The source object.
     * @returns The destination object.
     */
    function copy(dst: any, src: any): any;
    /**
     * Throws an exception if a condition is false.
     *
     * @param condition Condition expected to be true.
     * @param msg Message of the exception if the condition is not true.
     */
    function assert(condition: boolean, msg: string): void;
    /**
     * Outputs a message to indicate a member has been deprecated.
     *
     * @param oldMember Member that has been deprecated.
     * @param newMember Member that replaces the one that has been deprecated.
     */
    function _deprecated(oldMember: string, newMember: string): void;
    /**
     * Asserts that a value is a string.
     *
     * @param value Value supposed to be a string.
     * @param nullOK Whether null values are acceptable.
     * @return The string passed in.
     */
    function asString(value: string, nullOK?: boolean): string;
    /**
     * Asserts that a value is a number.
     *
     * @param value Value supposed to be numeric.
     * @param nullOK Whether null values are acceptable.
     * @param positive Whether to accept only positive numeric values.
     * @return The number passed in.
     */
    function asNumber(value: number, nullOK?: boolean, positive?: boolean): number;
    /**
     * Asserts that a value is an integer.
     *
     * @param value Value supposed to be an integer.
     * @param nullOK Whether null values are acceptable.
     * @param positive Whether to accept only positive integers.
     * @return The number passed in.
     */
    function asInt(value: number, nullOK?: boolean, positive?: boolean): number;
    /**
     * Asserts that a value is a Boolean.
     *
     * @param value Value supposed to be Boolean.
     * @param nullOK Whether null values are acceptable.
     * @return The Boolean passed in.
     */
    function asBoolean(value: boolean, nullOK?: boolean): boolean;
    /**
     * Asserts that a value is a Date.
     *
     * @param value Value supposed to be a Date.
     * @param nullOK Whether null values are acceptable.
     * @return The Date passed in.
     */
    function asDate(value: Date, nullOK?: boolean): Date;
    /**
     * Asserts that a value is a function.
     *
     * @param value Value supposed to be a function.
     * @param nullOK Whether null values are acceptable.
     * @return The function passed in.
     */
    function asFunction(value: any, nullOK?: boolean): Function;
    /**
     * Asserts that a value is an array.
     *
     * @param value Value supposed to be an array.
     * @param nullOK Whether null values are acceptable.
     * @return The array passed in.
     */
    function asArray(value: any, nullOK?: boolean): any[];
    /**
     * Asserts that a value is an instance of a given type.
     *
     * @param value Value to be checked.
     * @param type Type of value expected.
     * @param nullOK Whether null values are acceptable.
     * @return The value passed in.
     */
    function asType(value: any, type: any, nullOK?: boolean): any;
    /**
     * Asserts that a value is a valid setting for an enumeration.
     *
     * @param value Value supposed to be a member of the enumeration.
     * @param enumType Enumeration to test for.
     * @param nullOK Whether null values are acceptable.
     * @return The value passed in.
     */
    function asEnum(value: number, enumType: any, nullOK?: boolean): number;
    /**
     * Asserts that a value is an {@link ICollectionView} or an Array.
     *
     * @param value Array or {@link ICollectionView}.
     * @param nullOK Whether null values are acceptable.
     * @return The {@link ICollectionView} that was passed in or a {@link CollectionView}
     * created from the array that was passed in.
     */
    function asCollectionView(value: any, nullOK?: boolean): wijmo.collections.ICollectionView;
    /**
     * Checks whether an {@link ICollectionView} is defined and not empty.
     *
     * @param value {@link ICollectionView} to check.
     */
    function hasItems(value: wijmo.collections.ICollectionView): boolean;
    /**
     * Converts a camel-cased string into a header-type string by capitalizing the first letter
     * and adding spaces before uppercase characters preceded by lower-case characters.
     *
     * For example, 'somePropertyName' becomes 'Some Property Name'.
     *
     * @param text String to convert to header case.
     */
    function toHeaderCase(text: string): string;
    /**
     * Escapes a string by replacing HTML characters with text entities.
     *
     * Strings entered by users should always be escaped before they are displayed
     * in HTML pages. This helps ensure page integrity and prevent HTML/javascript
     * injection attacks.
     *
     * @param text Text to escape.
     * @return An HTML-escaped version of the original string.
     */
    function escapeHtml(text: string): string;
    /**
     * Escapes a string by prefixing special regular expression characters
     * with backslashes.
     *
     * @param text Text to escape.
     * @return A RegExp-escaped version of the original string.
     */
    function escapeRegExp(text: string): string;
    /**
     * Converts an HTML string into plain text.
     *
     * @param html HTML string to convert to plain text.
     * @return A plain-text version of the string.
     */
    function toPlainText(html: string): string;
    /**
     * Checks whether an element has a class.
     *
     * @param e Element to check.
     * @param className Class to check for.
     */
    function hasClass(e: Element, className: string): boolean;
    /**
     * Adds a class to an element.
     *
     * @param e Element that will have the class added.
     * @param className Class (or space-separated list of classes) to add to the element.
     */
    function addClass(e: Element, className: string): void;
    /**
     * Removes a class from an element.
     *
     * @param e Element that will have the class removed.
     * @param className Class (or space-separated list of classes) to remove from the element.
     */
    function removeClass(e: Element, className: string): void;
    /**
     * Adds or removes a class to or from an element.
     *
     * @param e Element that will have the class added.
     * @param className Class to add or remove.
     * @param addOrRemove Whether to add or remove the class. If not provided, toggle the class.
     */
    function toggleClass(e: Element, className: string, addOrRemove?: boolean): void;
    /**
     * Sets or clears an attribute on an element.
     *
     * @param e Element that will be updated.
     * @param name Name of the attribute to add or remove.
     * @param value Value of the attribute, or null to remove the attribute
     * from the element.
     * @param keep Whether to keep original attribute if present.
     */
    function setAttribute(e: Element, name: string, value?: any, keep?: boolean): void;
    /**
     * Sets the checked and indeterminate properties of a checkbox input
     * element.
     *
     * @param cb Checkbox element.
     * @param checked True, false, or null for checked, unchecked, or indeterminate.
     */
    function setChecked(cb: HTMLInputElement, checked: boolean): void;
    /**
     * Sets or clears an element's <b>aria-label</b> attribute.
     *
     * @param e Element that will be updated.
     * @param value Value of the aria label, or null to remove the label
     * from the element.
     */
    function setAriaLabel(e: Element, value?: string): void;
    /**
     * Sets the start and end positions of a selection in a text field.
     *
     * This method is similar to the native {@link setSelectionRange} method
     * in HTMLInputElement objects, except it checks for conditions that
     * may cause exceptions (element not in the DOM, disabled, or hidden).
     *
     * @param e HTMLInputElement or HTMLTextAreaElement to select.
     * @param start Offset into the text field for the start of the selection.
     * @param end Offset into the text field for the end of the selection.
     */
    function setSelectionRange(e: any, start: number, end?: number): boolean;
    /**
     * Disables the autocomplete, autocorrect, autocapitalize, and spellcheck
     * properties of an input element.
     *
     * @param e The input element.
     */
    function disableAutoComplete(e: HTMLInputElement): void;
    /**
     * Safely removes an element from the DOM tree.
     *
     * @param e Element to remove from the DOM tree.
     */
    function removeChild(e: Node): Node;
    /**
     * Gets a reference to the element that contains the focus,
     * accounting for shadow document fragments.
     */
    function getActiveElement(): HTMLElement;
    function _getActiveElement(): HTMLElement;
    /**
     * Moves the focus to the next/previous/first focusable child within
     * a given parent element.
     *
     * @param parent Parent element.
     * @param offset Offset to use when moving the focus (use zero to focus on the first focusable child).
     * @return True if the focus was set, false if a focusable element was not found.
     */
    function moveFocus(parent: HTMLElement, offset: number): boolean;
    /**
     * Saves content to a file.
     *
     * @param content A string or a Blob object to be saved to a file.
     * @param fileName Name of the file to save, including extension.
     * @param type Optional file MIME type, used if the **content** argument is a string.
     *
     * The {@link saveFile} method can be used to create text files
     * (txt, csv, html) as well as image files.
     *
     * For example, this code saves the current selection of a FlexGrid to a CSV file:
     *
     * ```typescript
     * import { saveFile } from '@grapecity/wijmo';
     * const clipString = theGrid.getClipString(null, true, true, false);
     * saveFile(clipString, 'grid.csv', 'text/csv');
     * ```
     *
     * And this code saves the content of a canvas element to a JPG file:
     *
     * ```typescript
     * import { saveFile } from '@grapecity/wijmo';
     *
     * canvas.toBlob(blob => {
     *    saveFile(blob, 'image.jpg');
     * }, 'image/jpeg');
     * ```
     */
    function saveFile(content: string | Blob, fileName: string, type?: string): void;
    /**
     * Gets an element from a query selector.
     *
     * @param selector An element, a query selector string, or a jQuery object.
     */
    function getElement(selector: any): HTMLElement;
    /**
     * Creates an element from an HTML string.
     *
     * @param html HTML fragment to convert into an HTMLElement.
     * @param appendTo Optional HTMLElement to append the new element to.
     * @param css Optional CSS attributes to apply to the root of the new element.
     * @return The new element.
     */
    function createElement(html: string, appendTo?: HTMLElement, css?: any): HTMLElement;
    /**
     * Sets the text content of an element.
     *
     * @param e Element that will have its content updated.
     * @param text Plain text to be assigned to the element.
     */
    function setText(e: HTMLElement, text: string): void;
    /**
     * Checks whether an HTML element contains another.
     *
     * @param parent Parent element.
     * @param child Child element.
     * @param popup Whether to take Wijmo popups into account.
     * @return True if the parent element contains the child element.
     */
    function contains(parent: any, child: any, popup?: boolean): boolean;
    /**
     * Finds the closest ancestor (including the original element) that satisfies a selector.
     *
     * @param e Element where the search should start.
     * @param selector A string containing a selector expression to match elements against.
     * @return The closest ancestor that satisfies the selector, or null if not found.
     */
    function closest(e: any, selector: string): Element;
    /**
     * Finds the closest ancestor (including the original element) that satisfies a class selector.
     *
     * @param e Element where the search should start.
     * @param className A string containing the class name to match elements against.
     * @return The closest ancestor that has the specified class name, or null if not found.
     */
    function closestClass(e: any, className: string): Node;
    /**
     * Enables or disables an element.
     *
     * @param e Element to enable or disable.
     * @param value Whether to enable or disable the element.
     */
    function enable(e: HTMLElement, value: boolean): void;
    /**
     * Gets the bounding rectangle of an element in page coordinates.
     *
     * This is similar to the <b>getBoundingClientRect</b> function,
     * except that uses viewport coordinates, which change when the
     * document scrolls.
     */
    function getElementRect(e: Element): Rect;
    /**
     * Modifies the style of an element by applying the properties specified in an object.
     *
     * @param e Element or array of elements whose style will be modified.
     * @param css Object containing the style properties to apply to the element.
     */
    function setCss(e: any, css: any): void;
    /**
     * Represents a method called periodically while handling calls to
     * the {@link animate} method.
     */
    interface IAnimateCallback {
        /**
         * @param percentage Value ranging from zero to one that indicates how
         * far along the animation is.
         */
        (percentage: number): void;
    }
    /**
     * Calls a function on a timer with a parameter varying between zero and one.
     *
     * Use this function to create animations by modifying document properties
     * or styles on a timer.
     *
     * For example, the code below changes the opacity of an element from zero
     * to one in one second:
     *
     * ```typescript
     * import { animate } from '@grapecity/wijmo';
     * const element = document.getElementById('someElement');
     * animate(pct => {
     *     element.style.opacity = pct;
     * }, 1000);
     * ```
     *
     * The function returns an interval ID that you can use to stop the
     * animation. This is typically done when you are starting a new animation
     * and wish to suspend other on-going animations on the same element.
     * For example, the code below keeps track of the interval ID and clears
     * if before starting a new animation:
     *
     * ```typescript
     * import { animate } from '@grapecity/wijmo';
     * const element = document.getElementById('someElement');
     * if (this._animInterval) {
     *     clearInterval(this._animInterval);
     * }
     * this._animInterval = animate(pct => {
     *     element.style.opacity = pct;
     *     if (pct == 1) {
     *         self._animInterval = null;
     *     }
     * }, 1000);
     * ```
     *
     * @param apply Callback function that modifies the document.
     * The function takes a single parameter that represents a percentage.
     * @param duration The duration of the animation, in milliseconds.
     * @param step The interval between animation frames, in milliseconds.
     * @return An interval id that you can use to suspend the animation.
     */
    function animate(apply: IAnimateCallback, duration?: number, step?: number): any;
    /**
     * Class that represents a point (with x and y coordinates).
     */
    class Point {
        /**
         * Gets or sets the x coordinate of this {@link Point}.
         */
        x: number;
        /**
         * Gets or sets the y coordinate of this {@link Point}.
         */
        y: number;
        /**
         * Initializes a new instance of the {@link Point} class.
         *
         * @param x X coordinate of the new Point.
         * @param y Y coordinate of the new Point.
         */
        constructor(x?: number, y?: number);
        /**
         * Returns true if a {@link Point} has the same coordinates as this {@link Point}.
         *
         * @param pt {@link Point} to compare to this {@link Point}.
         */
        equals(pt: Point): boolean;
        /**
         * Creates a copy of this {@link Point}.
         */
        clone(): Point;
    }
    /**
     * Class that represents a size (with width and height).
     */
    class Size {
        /**
         * Gets or sets the width of this {@link Size}.
         */
        width: number;
        /**
         * Gets or sets the height of this {@link Size}.
         */
        height: number;
        /**
         * Initializes a new instance of the {@link Size} class.
         *
         * @param width Width of the new {@link Size}.
         * @param height Height of the new {@link Size}.
         */
        constructor(width?: number, height?: number);
        /**
         * Returns true if a {@link Size} has the same dimensions as this {@link Size}.
         *
         * @param sz {@link Size} to compare to this {@link Size}.
         */
        equals(sz: Size): boolean;
        /**
         * Creates a copy of this {@link Size}.
         */
        clone(): Size;
    }
    /**
     * Class that represents a rectangle (with left, top, width, and height).
     */
    class Rect {
        /**
         * Gets or sets the left coordinate of this {@link Rect}.
         */
        left: number;
        /**
         * Gets or sets the top coordinate of this {@link Rect}.
         */
        top: number;
        /**
         * Gets or sets the width of this {@link Rect}.
         */
        width: number;
        /**
         * Gets or sets the height of this {@link Rect}.
         */
        height: number;
        /**
         * Initializes a new instance of the {@link Rect} class.
         *
         * @param left Left coordinate of the new {@link Rect}.
         * @param top Top coordinate of the new {@link Rect}.
         * @param width Width of the new {@link Rect}.
         * @param height Height of the new {@link Rect}.
         */
        constructor(left: number, top: number, width: number, height: number);
        /**
         * Gets the right coordinate of this {@link Rect}.
         */
        readonly right: number;
        /**
         * Gets the bottom coordinate of this {@link Rect}.
         */
        readonly bottom: number;
        /**
         * Returns true if a {@link Rect} has the same coordinates and dimensions
         * as this {@link Rect}.
         *
         * @param rc {@link Rect} to compare to this {@link Rect}.
         */
        equals(rc: Rect): boolean;
        /**
         * Creates a copy of this {@link Rect}.
         */
        clone(): Rect;
        /**
         * Creates a {@link Rect} from <b>ClientRect</b> or <b>SVGRect</b> objects.
         *
         * @param rc Rectangle obtained by a call to the DOM's <b>getBoundingClientRect</b>
         * or <b>GetBoundingBox</b> methods.
         */
        static fromBoundingRect(rc: any): Rect;
        /**
         * Gets a rectangle that represents the union of two rectangles.
         *
         * @param rc1 First rectangle.
         * @param rc2 Second rectangle.
         */
        static union(rc1: Rect, rc2: Rect): Rect;
        /**
         * Gets a rectangle that represents the intersection of two rectangles.
         *
         * @param rc1 First rectangle.
         * @param rc2 Second rectangle.
         */
        static intersection(rc1: Rect, rc2: Rect): Rect;
        /**
         * Determines whether the rectangle contains a given point or rectangle.
         *
         * @param pt The {@link Point} or {@link Rect} to ckeck.
         */
        contains(pt: any): boolean;
        /**
         * Creates a rectangle that results from expanding or shrinking a rectangle by the specified amounts.
         *
         * @param dx The amount by which to expand or shrink the left and right sides of the rectangle.
         * @param dy The amount by which to expand or shrink the top and bottom sides of the rectangle.
         */
        inflate(dx: number, dy: number): Rect;
    }
    /**
     * Provides date and time utilities.
     */
    class DateTime {
        /**
         * Gets a new Date that adds the specified number of days to a given Date.
         *
         * @param value Original date.
         * @param days Number of days to add to the given date.
         */
        static addDays(value: Date, days: number): Date;
        /**
         * Gets a new Date that adds the specified number of months to a given Date.
         *
         * @param value Original date.
         * @param months Number of months to add to the given date.
         */
        static addMonths(value: Date, months: number): Date;
        /**
         * Gets a new Date that adds the specified number of years to a given Date.
         *
         * @param value Original date.
         * @param years Number of years to add to the given date.
         */
        static addYears(value: Date, years: number): Date;
        /**
         * Gets a new Date that adds the specified number of hours to a given Date.
         *
         * @param value Original date.
         * @param hours Number of hours to add to the given date.
         */
        static addHours(value: Date, hours: number): Date;
        /**
         * Gets a new Date that adds the specified number of minutes to a given Date.
         *
         * @param value Original date.
         * @param minutes Number of minutes to add to the given date.
         */
        static addMinutes(value: Date, minutes: number): Date;
        /**
         * Gets a new Date that adds the specified number of seconds to a given Date.
         *
         * @param value Original date.
         * @param seconds Number of seconds to add to the given date.
         */
        static addSeconds(value: Date, seconds: number): Date;
        /**
         * Gets the first day of the week for a given Date.
         *
         * @param value Original date.
         * @param firstDayOfWeek First day of week (0 for Sunday, 1 for Monday, etc).
         * Defaults to first day of week for the current culture.
         */
        static weekFirst(value: Date, firstDayOfWeek?: number): Date;
        /**
         * Gets the last day of the week for a given Date.
         *
         * @param value Original date.
         * @param firstDayOfWeek First day of week (0 for Sunday, 1 for Monday, etc).
         * Defaults to first day of week for the current culture.
         */
        static weekLast(value: Date, firstDayOfWeek?: number): Date;
        /**
         * Gets the first day of the month for a given Date.
         *
         * @param value Original date.
         */
        static monthFirst(value: Date): Date;
        /**
         * Gets the last day of the month for a given Date.
         *
         * @param value Original date.
         */
        static monthLast(value: Date): Date;
        /**
         * Gets the first day of the year for a given Date.
         *
         * @param value Original date.
         */
        static yearFirst(value: Date): Date;
        /**
         * Gets the last day of the year for a given Date.
         *
         * @param value Original date.
         */
        static yearLast(value: Date): Date;
        /**
         * Returns true if two Date objects refer to the same date (ignoring time).
         *
         * @param d1 First date.
         * @param d2 Second date.
         */
        static sameDate(d1: Date, d2: Date): boolean;
        /**
         * Returns true if two Date objects refer to the same time (ignoring date).
         *
         * @param d1 First date.
         * @param d2 Second date.
         */
        static sameTime(d1: Date, d2: Date): boolean;
        /**
         * Returns true if two Date objects refer to the same date and time
         * (or if both are null).
         *
         * @param d1 First date.
         * @param d2 Second date.
         */
        static equals(d1: Date | null, d2: Date | null): boolean;
        /**
         * Gets a Date object with the date and time set on two Date objects.
         *
         * @param date Date object that contains the date (day/month/year).
         * @param time Date object that contains the time (hour:minute:second.millisecond).
         */
        static fromDateTime(date: Date, time: Date): Date;
        /**
         * Converts a calendar date to a fiscal date using the current culture.
         *
         * @param date Calendar date.
         * @param govt Whether to use the government or corporate fiscal year.
         */
        static toFiscal(date: Date, govt: boolean): Date;
        /**
         * Converts a fiscal year date to a calendar date using the current culture.
         *
         * @param date Fiscal year date.
         * @param govt Whether to use the government or corporate fiscal year.
         */
        static fromFiscal(date: Date, govt: boolean): Date;
        /**
         * Gets a new Date object instance.
         *
         * @param year Integer value representing the year, defaults to current year.
         * @param month Integer value representing the month (0-11), defaults to current month.
         * @param day Integer value representing the day (1-31), defaults to current day.
         * @param hour Integer value representing the hour, defaults to zero.
         * @param min Integer value representing the minute, defaults to zero.
         * @param sec Integer value representing the second, defaults to zero.
         * @param ms Integer value representing the millisecond, defaults to zero.
         */
        static newDate(year?: number, month?: number, day?: number, hour?: number, min?: number, sec?: number, ms?: number): Date;
        /**
         * Creates a copy of a given Date object.
         *
         * @param date Date object to copy.
         */
        static clone(date: Date): Date;
    }
    /**
     * Represents a set of options to be used with the {@link httpRequest} method.
     */
    interface IHttpRequestOptions {
        /**
         * The HTTP method to use for the request (e.g. "POST", "GET", "PUT").
         * The default is "GET".
         */
        method?: string;
        /**
         * Data to be sent to the server. It is appended to the url for GET requests,
         * and converted to a JSON string for other requests.
         */
        data?: any;
        /**
         * A JavaScript object containing key/value pairs to be added to the request headers.
         */
        requestHeaders?: any;
        /**
         * By default, all requests are sent asynchronously (i.e. this is set to true by default).
         * If you need to make synchronous requests, set this option to false.
         */
        async?: boolean;
        /**
         * The number of milliseconds the request can take before automatically being terminated.
         * The default value is 0, which means there is no timeout.
         */
        timeout?: number;
        /**
         * Function to be called if the request succeeds.
         * The function has a single parameter of type <b>XMLHttpRequest</b> that represents the request.
         */
        success?: (x: XMLHttpRequest) => void;
        /**
         * Function to be called if the request fails.
         * The function has a single parameter of type <b>XMLHttpRequest</b> that represents the request.
         */
        error?: (x: XMLHttpRequest) => void;
        /**
         * Function to be called when the request finishes (after success and error callbacks are executed).
         * The function has a single parameter of type <b>XMLHttpRequest</b> that represents the request.
         */
        complete?: (x: XMLHttpRequest) => void;
        /**
         * Function to be called immediately before the request is sent.
         * The function has a single parameter of type <b>XMLHttpRequest</b> that represents the request.
         */
        beforeSend?: (x: XMLHttpRequest) => void;
        /**
         * A username to be used with <b>XMLHttpRequest</b> in response to an HTTP access
         * authentication request.
         */
        user?: string;
        /**
         * A password to be used with <b>XMLHttpRequest</b> in response to an HTTP access
         * authentication request.
         */
        password?: string;
    }
    /**
     * Performs HTTP requests.
     *
     * Use the <b>success</b> method to obtain the result of the request which is provided in
     * the callback's <b>XMLHttpRequest</b> parameter. For example, the code below uses
     * the {@link httpRequest} method to retrieve a list of customers from an OData service:
     *
     * ```typescript
     * import { httpRequest } from '@grapecity/wijmo';
     * httpRequest('https://services.odata.org/Northwind/Northwind.svc/Customers?$format=json', {
     *   success: xhr => {
     *     let response = JSON.parse(xhr.responseText),
     *         customers = response.value;
     *     // do something with the customers...
     *   }
     * });
     * ```
     *
     * @param url String containing the URL to which the request is sent.
     * @param options An optional {@link IHttpRequestOptions} object used to configure the request.
     * @return The <b>XMLHttpRequest</b> object used to perform the request.
     */
    function httpRequest(url: string, options?: IHttpRequestOptions): XMLHttpRequest;
    function _registerModule(name: string, ref: any): void;
    function _getModule(name: string): any;
}
declare module wijmo {
    interface _IMap<K, V> {
        clear(): void;
        delete(key: K): any;
        get(key: K): V | undefined;
        has(key: K): boolean;
        set(key: K, value: V): this;
        readonly size: number;
    }
    class _Map<K = any, V = any> {
        readonly _m: _IMap<K, V>;
        _h: any;
        /**
         * Creates an instance of the Map class wrapper.
         * @param pojoHash If true (default), then POJO hash object is used; otherwise, the Map is used.
         */
        constructor(pojoHash?: boolean);
        readonly isPojoHash: boolean;
        readonly size: number;
        clear(): void;
        delete(key: K): void;
        get(key: K): V | undefined;
        has(key: K): boolean;
        set(key: K, value: V): this;
    }
}
declare module wijmo {
    /**
     * Represents a color.
     *
     * The {@link Color} class parses colors specified as CSS strings and exposes
     * their red, green, blue, and alpha channels as read-write properties.
     *
     * The {@link Color} class also provides {@link fromHsb} and {@link fromHsl} methods
     * for creating colors using the HSB and HSL color models instead of RGB,
     * as well as {@link getHsb} and {@link getHsl} methods for retrieving the color
     * components using those color models.
     *
     * Finally, the {@link Color} class provides an {@link interpolate} method that
     * creates colors by interpolating between two colors using the HSL model.
     * This method is especially useful for creating color animations with the
     * {@link animate} method.
     *
     * The example below shows how this works:
     *
     * {@sample Core/Color Example}
     */
    class Color {
        _r: number;
        _g: number;
        _b: number;
        _a: number;
        /**
         * Initializes a new {@link Color} from a CSS color specification.
         *
         * @param color CSS color specification.
         */
        constructor(color: string);
        /**
         * Gets or sets the red component of this {@link Color},
         * in a range from 0 to 255.
         */
        r: number;
        /**
         * Gets or sets the green component of this {@link Color},
         * in a range from 0 to 255.
         */
        g: number;
        /**
         * Gets or sets the blue component of this {@link Color},
         * in a range from 0 to 255.
         */
        b: number;
        /**
         * Gets or sets the alpha component of this {@link Color},
         * in a range from 0 to 1 (zero is transparent, one is solid).
         */
        a: number;
        /**
         * Returns true if a {@link Color} has the same value as this {@link Color}.
         *
         * @param clr {@link Color} to compare to this {@link Color}.
         */
        equals(clr: Color): boolean;
        /**
         * Gets a string representation of this {@link Color}.
         */
        toString(): string;
        /**
         * Creates a new {@link Color} using the specified RGBA color channel values.
         *
         * @param r Value for the red channel, from 0 to 255.
         * @param g Value for the green channel, from 0 to 255.
         * @param b Value for the blue channel, from 0 to 255.
         * @param a Value for the alpha channel, from 0 to 1.
         */
        static fromRgba(r: number, g: number, b: number, a?: number): Color;
        /**
         * Creates a new {@link Color} using the specified HSB values.
         *
         * @param h Hue value, from 0 to 1.
         * @param s Saturation value, from 0 to 1.
         * @param b Brightness value, from 0 to 1.
         * @param a Alpha value, from 0 to 1.
         */
        static fromHsb(h: number, s: number, b: number, a?: number): Color;
        /**
         * Creates a new {@link Color} using the specified HSL values.
         *
         * @param h Hue value, from 0 to 1.
         * @param s Saturation value, from 0 to 1.
         * @param l Lightness value, from 0 to 1.
         * @param a Alpha value, from 0 to 1.
         */
        static fromHsl(h: number, s: number, l: number, a?: number): Color;
        /**
         * Creates a new {@link Color} from a CSS color string.
         *
         * @param value String containing a CSS color specification.
         * @return A new {@link Color}, or null if the string cannot be parsed into a color.
         */
        static fromString(value: string): Color;
        /**
         * Gets an array with this color's HSB components.
         */
        getHsb(): number[];
        /**
         * Gets an array with this color's HSL components.
         */
        getHsl(): number[];
        /**
         * Creates a {@link Color} by interpolating between two colors.
         *
         * @param c1 First color.
         * @param c2 Second color.
         * @param pct Value between zero and one that determines how close the
         * interpolation should be to the second color.
         */
        static interpolate(c1: Color, c2: Color, pct: number): Color;
        /**
         * Gets the closest opaque color to a given color.
         *
         * @param c {@link Color} to be converted to an opaque color
         * (the color may also be specified as a string).
         * @param bkg Background color to use when removing the transparency
         * (defaults to white).
         */
        static toOpaque(c: any, bkg?: any): Color;
        _parse(c: string): boolean;
        /**
         * Converts an HSL color value to RGB.
         *
         * @param h The hue (between zero and one).
         * @param s The saturation (between zero and one).
         * @param l The lightness (between zero and one).
         * @return An array containing the R, G, and B values (between zero and 255).
         */
        static _hslToRgb(h: number, s: number, l: number): number[];
        static _hue2rgb(p: number, q: number, t: number): number;
        /**
         * Converts an RGB color value to HSL.
         *
         * @param r The value of the red channel (between zero and 255).
         * @param g The value of the green channel (between zero and 255).
         * @param b The value of the blue channel (between zero and 255).
         * @return An array containing the H, S, and L values (between zero and one).
         */
        static _rgbToHsl(r: number, g: number, b: number): number[];
        /**
         * Converts an RGB color value to HSB.
         *
         * @param r The value of the red channel (between zero and 255).
         * @param g The value of the green channel (between zero and 255).
         * @param b The value of the blue channel (between zero and 255).
         * @return An array containing the H, S, and B values (between zero and one).
         */
        static _rgbToHsb(r: number, g: number, b: number): number[];
        /**
         * Converts an HSB color value to RGB.
         *
         * @param h The hue (between zero and one).
         * @param s The saturation (between zero and one).
         * @param b The brightness (between zero and one).
         * @return An array containing the R, G, and B values (between zero and 255).
         */
        static _hsbToRgb(h: number, s: number, b: number): number[];
        /**
         * Converts an HSB color value to HSL.
         *
         * @param h The hue (between zero and one).
         * @param s The saturation (between zero and one).
         * @param b The brightness (between zero and one).
         * @return An array containing the H, S, and L values (between zero and one).
         */
        static _hsbToHsl(h: number, s: number, b: number): number[];
        /**
         * Converts an HSL color value to HSB.
         *
         * @param h The hue (between zero and one).
         * @param s The saturation (between zero and one).
         * @param l The lightness (between zero and one).
         * @return An array containing the H, S, and B values (between zero and one).
         */
        static _hslToHsb(h: number, s: number, l: number): number[];
    }
}
declare module wijmo {
    /**
     * Contains information used to format numbers
     */
    interface _INumFormatInfo {
        /** String to display before the formatted value */
        prefix: string;
        /** Format specifier (N, n, D, d, C, c, P, p, X, x, etc) */
        specRaw: string;
        /** Format specifier as lower-case (n, d, c, p, x, etc) */
        spec: string;
        /** Precision (number of decimal places to display) */
        prec: number;
        /** Scale (3 for thousands, 6 for millions, etc) */
        scale: number;
        /** String to display after the formatted value */
        suffix: string;
        /** Currency sign */
        curr: string;
    }
    /**
     * Gets or sets an object that contains all localizable strings in the Wijmo library.
     *
     * The culture selector is a two-letter string that represents an
     * <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes'>ISO 639 culture</a>.
     */
    var culture: any;
    /**
     * Class that implements formatting and parsing of numbers and Dates.
     *
     * By default, {@link Globalize} uses the American English culture.
     * To switch cultures, include the appropriate **wijmo.culture**
     * file after the wijmo files.
     *
     * The example below shows how you can use the {@link Globalize} class
     * to format dates, times, and numbers in different cultures:
     *
     * {@sample Core/Globalization/Formatting Example}
     */
    class Globalize {
        /**
         * Formats a number or a date.
         *
         * The format strings used with the {@link format} function are similar to
         * the ones used by the .NET Globalization library.
         * The tables below contains links that describe the formats available:
         *
         * <ul>
         * <li><a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings">
         *      Standard Numeric Format Strings</a></li>
         * <li><a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings">
         *      Standard Date and Time Format Strings</a></li>
         * <li><a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings">
         *      Custom Date and Time Format Strings</a></li>
         * </ul>
         *
         * @param value Number or Date to format (all other types are converted to strings).
         * @param format Format string to use when formatting numbers or dates.
         * @param trim Whether to remove trailing zeros from numeric results.
         * @param truncate Whether to truncate the numeric values rather than round them.
         * @param defaultPrec Precision to use if not specified in the format string.
         * @return A string representation of the given value.
         */
        static format(value: any, format: string, trim?: boolean, truncate?: boolean, defaultPrec?: number): string;
        /**
         * Formats a number using the current culture.
         *
         * The {@link formatNumber} method accepts all .NET-style
         * <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings">
         * Standard Numeric Format Strings</a> and provides support
         * for scaling, prefixes, suffixes, and custom currency symbols.
         *
         * Numeric format strings take the form <i>Axxsscc</i>, where:
         * <ul>
         * <li>
         *  <i>A</i> is a single alphabetic character called the format
         *  specifier (described below).</li>
         * <li>
         *  <i>xx</i> is an optional integer called the precision specifier.
         *  The precision specifier affects the number of digits in the result.</li>
         * <li>
         *  <i>ss</i> is an optional string used to scale the number. If provided,
         *  it must consist of commas. The number is divided by 1000 for each comma
         *  specified.</li>
         * <li>
         *  <i>cc</i> is an optional string used to override the currency symbol
         *  when formatting currency values. This is useful when formatting
         *  currency values for cultures different than the current default
         *  (for example, when formatting Euro or Yen values in applications
         *  that use the English culture).</li>
         * </ul>
         *
         * The following table describes the standard numeric format specifiers and
         * displays sample output produced by each format specifier for the default
         * culture.
         *
         * <b>c</b> Currency: <code>formatNumber(1234, 'c') => '$1,234.00'</code><br/>
         * <b>d</b> Decimal (integers): <code>formatNumber(-1234, 'd6') => '-001234'</code><br/>
         * <b>e</b> Scientific Notation (lower-case 'e'): <code>formatNumber(123.456, 'e6') => '1.234560e+2'</code>
         * <b>E</b> Scientific Notation (upper-case 'e'): <code>formatNumber(123.456, 'E6') => '1.234560E+2'</code>
         * <b>f</b> Fixed-point: <code>formatNumber(1234.5, 'f2') => '1234.50'</code><br/>
         * <b>F</b> Fixed-point (with thousand separators): <code>formatNumber(1234.5, 'F2') => '1,234.50'</code><br/>
         * <b>g</b> General (no trailing zeros): <code>formatNumber(1234.50, 'g2') => '1234.5'</code><br/>
         * <b>G</b> General (no trailing zeros, thousand separators): <code>formatNumber(1234.5, 'G2') => '1,234.5'</code><br/>
         * <b>n</b> Number: <code>formatNumber(1234.5, 'n2') => '1,234.50'</code><br/>
         * <b>p</b> Percent: <code>formatNumber(0.1234, 'p2') => '12.34%'</code>
         * <b>P</b> Percent (no thousand separators): <code>formatNumber(12.34, 'P2') => '1234%'</code>
         * <b>r</b> Round-trip (same as g15): <code>formatNumber(0.1234, 'r') => '0.1234'</code>
         * <b>x</b> Hexadecimal (integers): <code>formatNumber(1234, 'x6') => '0004d2'</code><br/>
         *
         * The scaling specifier is especially useful when charting large values. For
         * example, the markup below creates a chart that plots population versus GDP.
         * The raw data expresses the population is units and the GDP in millions.
         * The scaling specified in the axes formats causes the chart to show population
         * in millions and GDP in trillions:
         *
         * ```typescript
         * import { FlexChart} from '@grapecity/wijmo.chart';
         * new FlexChart('#theChart', {
         *     itemsSource: countriesGDP,
         *     bindingX: 'pop',
         *     chartType: 'Scatter',
         *     series: [
         *         { name: 'GDP', binding: 'gdp' }
         *     ],
         *     axisX: {
         *         title: 'Population (millions)'
         *         format: 'n0,,'
         *     },
         *     axisY: {
         *         title: 'GDP (US$ trillions)'
         *         format: 'c0,,'
         *     }
         * });
         * ```
         *
         * The format string may also include constant prefix and suffix
         * strings to be added to the output.
         * If present, the prefix and suffix are specified as *double-quoted*
         * strings at the start and end of the format string:
         *
         * ```typescript
         * import { Globalize } from '@grapecity/wijmo';
         * console.log(Globalize.formatNumber(value, '"thousands: "c3," k"'));
         * console.log(Globalize.formatNumber(value, '"millions: "c1,," M"'));
         * ```
         *
         * @param value Number to format.
         * @param format .NET-style standard numeric format string (e.g. 'n2', 'c4', 'p0', 'g2', 'd2').
         * @param trim Whether to remove trailing zeros from the result.
         * @param truncate Whether to truncate the value rather than round it.
         * @param defaultPrec Precision to use if not specified in the format string.
         * @return A string representation of the given number.
         */
        static formatNumber(value: number, format: string, trim?: boolean, truncate?: boolean, defaultPrec?: number): string;
        /**
         * Formats a date using the current culture.
         *
         * The {@link format} parameter contains a .NET-style
         * <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings">Date format string</a>
         * with the following additions:
         * <ul>
         *  <li><i>Q, q</i> Calendar quarter.</li>
         *  <li><i>U</i> Fiscal quarter (government).</li>
         *  <li><i>u</i> Fiscal quarter (private sector).</li>
         *  <li><i>EEEE, EEE, EE, E</i> Fiscal year (government).</li>
         *  <li><i>eeee, eee, ee, e</i> Fiscal year (private sector).</li>
         * </ul>
         *
         * For example:
         *
         * ```typescript
         * import { Globalize } from '@grapecity/wijmo';
         * let dt = new Date(2015, 9, 1); // Oct 1, 2015
         * console.log('result', Globalize.format(dt, '"FY"EEEE"Q"U') + ' (US culture)');
         * **result** FY2016Q1 (US culture)
         * ```
         *
         * Another addition is available for dealing with complex eras such
         * as those defined in the Japanese culture:
         *
         * <ul>
         *  <li><i>ggg</i> Era name (e.g. '平成', '昭和', '大正', or '明治').</li>
         *  <li><i>gg</i> Era initial (e.g. '平', '昭', '大', or '明').</li>
         *  <li><i>g</i> Era symbol (e.g. 'H', 'S', 'T', or 'M').</li>
         * </ul>
         *
         * {@sample Core/Globalization/Formatting/purejs Example}
         *
         * @param value Number or Date to format.
         * @param format .NET-style Date format string.
         * @return A string representation of the given date.
         */
        static formatDate(value: Date, format: string): string;
        /**
         * Parses a string into an integer.
         *
         * @param value String to convert to an integer.
         * @param format Format to use when parsing the number.
         * @return The integer represented by the given string,
         * or **NaN** if the string cannot be parsed into an integer.
         */
        static parseInt(value: string, format?: string): number;
        /**
         * Parses a string into a floating point number.
         *
         * @param value String to convert to a number.
         * @param format Format to use when parsing the number.
         * @return The floating point number represented by the given string,
         * or **NaN** if the string cannot be parsed into a floating point number.
         */
        static parseFloat(value: string, format?: string): number;
        /**
         * Parses a string into a Date.
         *
         * Two-digit years are converted to full years based on the value of the
         * calendar's **twoDigitYearMax** property. By default, this is set to
         * 2029, meaning two-digit values of 30 to 99 are parsed as 19xx, and values
         * from zero to 29 are parsed as 20xx.
         *
         * You can change this threshold by assigning a new value to the calendar.
         * For example:
         *
         * <pre>// get calendar
         * var cal = wijmo.culture.Globalize.calendar;
         *
         * // default threshold is 2029, so "30" is parsed as 1930
         * cal.twoDigitYearMax = 2029;
         * var d1 = wijmo.Globalize.parseDate('30/12', 'yy/MM'); // dec 1930
         *
         * // changing threshold to 2100, so all values are parsed as 20**
         * cal.twoDigitYearMax = 2100;
         * var d2 = wijmo.Globalize.parseDate('30/12', 'yy/MM'); // dec 2030</pre>
         *
         * @param value String to convert to a Date.
         * @param format Format string used to parse the date.
         * @param refDate Date to use as a reference in case date or time
         * parts are not specified in the format string (e.g. format = 'MM/dd').
         * @return The Date object represented by the given string, or null
         * if the string cannot be parsed into a Date.
         */
        static parseDate(value: string, format: string, refDate?: Date): Date;
        static _CJK: string;
        /**
         * Gets the first day of the week according to the current culture.
         *
         * The value returned is between zero (Sunday) and six (Saturday).
         */
        static getFirstDayOfWeek(): number;
        /**
         * Gets the symbol used as a decimal separator in numbers.
         */
        static getNumberDecimalSeparator(): string;
        private static _toFixedStr;
        private static _unquote;
        private static _numFormatInfo;
        static _parseNumericFormat(format: string): _INumFormatInfo;
        private static _dateFormatParts;
        static _parseDateFormat(format: string): string[];
        private static _formatDatePart;
        private static _getEra;
        private static _expandFormat;
        private static _zeroPad;
        private static _h12;
        static _shiftDecimal(val: any, shift: any, calcPrec?: number): any;
    }
    function _updateCulture(c: any): void;
    function _addCultureInfo(member: string, info: any): void;
}
declare module wijmo {
    /**
     * Class that provides masking services to an HTMLInputElement.
     */
    class _MaskProvider {
        _tbx: HTMLInputElement;
        _msk: string;
        _promptChar: string;
        _mskArr: _MaskElement[];
        _firstPos: number;
        _lastPos: number;
        _backSpace: boolean;
        _composing: boolean;
        _overWrite: boolean;
        _full: boolean;
        _matchEnd: number;
        _autoComplete: string;
        _spellCheck: boolean;
        _inputBnd: any;
        _keydownBnd: any;
        _keypressBnd: any;
        _cmpstartBnd: any;
        _cmpendBnd: any;
        _evtInput: any;
        static _X_DBCS_BIG_HIRA: string;
        static _X_DBCS_BIG_KATA: string;
        static _X_SBCS_BIG_KATA: string;
        /**
         * Initializes a new instance of the {@link _MaskProvider} class.
         *
         * @param input Input element to be masked.
         * @param mask Input mask.
         * @param promptChar Character used to indicate input positions.
         */
        constructor(input: HTMLInputElement, mask?: string, promptChar?: string);
        /**
         * Gets or sets the Input element to be masked.
         */
        input: HTMLInputElement;
        /**
         * Gets or sets the input mask used to validate input.
         */
        mask: string;
        /**
         * Gets or sets the input mask used to validate input.
         */
        promptChar: string;
        /**
         * Gets or sets a value that determines whether the input element handles input in
         * overwrite mode.
         *
         * In **overwrite mode**, every character you type is displayed at the cursor position.
         * If a character is already at that position, it is replaced.
         *
         * In **insert mode**, each character you type is inserted at the cursor position.
         *
         * The default value for this property is **false**.
         */
        overwriteMode: boolean;
        /**
         * Gets a value that indicates whether the mask has been completely filled.
         */
        readonly maskFull: boolean;
        /**
         * Gets an array with the position of the first and last wildcard characters in the mask.
         */
        getMaskRange(): number[];
        /**
         * Gets the raw value of the editor, excluding prompts and literals.
         */
        getRawValue(): string;
        /**
         * Updates the control mask and content.
         */
        refresh(): void;
        _input(e: KeyboardEvent): void;
        _keydown(e: KeyboardEvent): void;
        _keypress(e: KeyboardEvent): void;
        _cmpstart(e: CompositionEvent): void;
        _cmpend(e: CompositionEvent): void;
        _preventKey(charCode: number): boolean;
        _connect(connect: boolean): void;
        _valueChanged(): boolean;
        _applyMask(): string;
        _handleVagueLiterals(text: string): string;
        _isCharValid(mask: string, c: string): boolean;
        _isDigit(c: string): boolean;
        _isLetter(c: string): boolean;
        _validatePosition(start: number): void;
        _parseMask(): void;
    }
    /**
     * Class that contains information about a position in an input mask.
     */
    class _MaskElement {
        wildCard: string;
        charCase: string;
        literal: string;
        vague: boolean;
        /**
         * Initializes a new instance of the {@link _MaskElement} class.
         *
         * @param wildcardOrLiteral Wildcard or literal character
         * @param charCase Whether to convert wildcard matches to upper or lowercase.
         */
        constructor(wildcardOrLiteral: string, charCase?: string);
    }
}
declare module wijmo {
    /**
     * Specifies the type of aggregate to calculate over a group of values.
     */
    enum Aggregate {
        /**
         * No aggregate.
         */
        None = 0,
        /**
         * Returns the sum of the numeric values in the group.
         */
        Sum = 1,
        /**
         * Returns the count of non-null values in the group.
         */
        Cnt = 2,
        /**
         * Returns the average value of the numeric values in the group.
         */
        Avg = 3,
        /**
         * Returns the maximum value in the group.
         */
        Max = 4,
        /**
         * Returns the minimum value in the group.
         */
        Min = 5,
        /**
         * Returns the difference between the maximum and minimum numeric values in the group.
         */
        Rng = 6,
        /**
         * Returns the sample standard deviation of the numeric values in the group
         * (uses the formula based on n-1).
         */
        Std = 7,
        /**
         * Returns the sample variance of the numeric values in the group
         * (uses the formula based on n-1).
         */
        Var = 8,
        /**
         * Returns the population standard deviation of the values in the group
         * (uses the formula based on n).
         */
        StdPop = 9,
        /**
         * Returns the population variance of the values in the group
         * (uses the formula based on n).
         */
        VarPop = 10,
        /**
         * Returns the count of all values in the group (including nulls).
         */
        CntAll = 11,
        /**
         * Returns the first non-null value in the group.
         */
        First = 12,
        /**
         * Returns the last non-null value in the group.
         */
        Last = 13
    }
    /**
     * Calculates an aggregate value from the values in an array.
     *
     * @param aggType Type of aggregate to calculate.
     * @param items Array with the items to aggregate.
     * @param binding Name of the property to aggregate on (in case the items are not simple values).
     */
    function getAggregate(aggType: Aggregate, items: any[], binding?: string): any;
}
declare module wijmo.collections {
    /**
     * Base class for Array classes with notifications.
     */
    class ArrayBase<T = any> extends Array<T> {
        /**
         * Initializes a new instance of the {@link ArrayBase} class.
         */
        constructor();
    }
    /**
     * Array that sends notifications on changes.
     *
     * The class raises the {@link collectionChanged} event when changes are made with
     * the push, pop, splice, shift, unshift, insert, or remove methods.
     *
     * Warning: Changes made by assigning values directly to array members or to the
     * length of the array do not raise the {@link collectionChanged} event.
     */
    class ObservableArray<T = any> extends ArrayBase<T> implements INotifyCollectionChanged {
        private _updating;
        /**
         * Initializes a new instance of the {@link ObservableArray} class.
         *
         * @param data Array containing items used to populate the {@link ObservableArray}.
         */
        constructor(data?: T[]);
        /**
         * Adds one or more items to the end of the array.
         *
         * @param ...items One or more items to add to the array.
         * @return The new length of the array.
         */
        push(...items: T[]): number;
        /**
         * Removes the first element from the array and returns that element.
         *
         * This method changes the length of the array.
         */
        shift(): T;
        /**
         * Adds one or more elements to the beginning of the array and returns
         * the new length of the array.
         *
         * @param ...items One or more items to add to the array.
         * @return The new length of the array.
         */
        unshift(...items: T[]): number;
        pop(): any;
        /**
         * Removes and/or adds items to the array.
         *
         * @param index Position where items will be added or removed.
         * @param count Number of items to remove from the array.
         * @param  ...item One or more items to add to the array.
         * @return An array containing the removed elements.
         */
        splice(index: number, count: number, ...item: T[]): T[];
        /**
         * Creates a shallow copy of a portion of an array.
         *
         * @param begin Position where the copy starts.
         * @param end Position where the copy ends.
         * @return A shallow copy of a portion of an array.
         */
        slice(begin?: number, end?: number): T[];
        /**
         * Searches for an item in the array.
         *
         * @param searchElement Element to locate in the array.
         * @param fromIndex The index where the search should start.
         * @return The index of the item in the array, or -1 if the item was not found.
         */
        indexOf(searchElement: T, fromIndex?: number): number;
        /**
         * Sorts the elements of the array in place.
         *
         * @param compareFn Specifies a function that defines the sort order.
         * If specified, the function should take two arguments and should return
         * -1, +1, or 0 to indicate the first argument is smaller, greater than,
         * or equal to the second argument.
         * If omitted, the array is sorted in dictionary order according to the
         * string conversion of each element.
         * @return A copy of the sorted array.
         */
        sort(compareFn?: Function): this;
        /**
         * Inserts an item at a specific position in the array.
         *
         * @param index Position where the item will be added.
         * @param item Item to add to the array.
         */
        insert(index: number, item: T): void;
        /**
         * Removes an item from the array.
         *
         * @param item Item to remove.
         * @return True if the item was removed, false if it wasn't found in the array.
         */
        remove(item: T): boolean;
        /**
         * Removes an item at a specific position in the array.
         *
         * @param index Position of the item to remove.
         */
        removeAt(index: number): void;
        /**
         * Assigns an item at a specific position in the array.
         *
         * @param index Position where the item will be assigned.
         * @param item Item to assign to the array.
         */
        setAt(index: number, item: T): void;
        /**
         * Removes all items from the array.
         */
        clear(): void;
        /**
         * Suspends notifications until the next call to {@link endUpdate}.
         */
        beginUpdate(): void;
        /**
         * Resumes notifications suspended by a call to {@link beginUpdate}.
         */
        endUpdate(): void;
        /**
         * Gets a value that indicates whether notifications are currently suspended
         * (see {@link beginUpdate} and {@link endUpdate}).
         */
        readonly isUpdating: boolean;
        /**
         * Executes a function within a {@link beginUpdate}/{@link endUpdate} block.
         *
         * The collection will not be refreshed until the function finishes.
         * This method ensures {@link endUpdate} is called even if the function throws
         * an exception.
         *
         * @param fn Function to be executed without updates.
         */
        deferUpdate(fn: Function): void;
        /**
         * Returns true if the caller queries for a supported interface.
         *
         * @param interfaceName Name of the interface to look for.
         * @return True if the caller queries for a supported interface.
         */
        implementsInterface(interfaceName: string): boolean;
        /**
         * Occurs when the collection changes.
         */
        readonly collectionChanged: Event<ObservableArray<T>, NotifyCollectionChangedEventArgs<T>>;
        /**
         * Raises the {@link collectionChanged} event.
         *
         * @param e Contains a description of the change.
         */
        onCollectionChanged(e?: NotifyCollectionChangedEventArgs<any>): void;
        private _raiseCollectionChanged;
    }
}
declare module wijmo.collections {
    /**
     * Represents a method that takes no arguments and returns a new data object.
     */
    interface IItemCreator<T = any> {
        (): T;
    }
    /**
     * Represents a method that provides an alternate data item
     * to be used when sorting collections.
     */
    interface ISortConverter<T = any> {
        /**
         * @param sd {@link SortDescription} that describes the property being sorted and the sort direction.
         * @param item Data item being sorted.
         * @param value Value of the item property.
         * @param extra Optional parameter with custom information.
         * @returns The data item to use when sorting.
         */
        (sd: SortDescription, item: T, value: any, custom?: any): any;
    }
    /**
     * Represents a method that identifies errors in data items.
     */
    interface IGetError<T = any> {
        /**
         * @param item Item to be inspected.
         * @param property Property to be inspected, or null to inspect all properties.
         * @param parsing Whether the value is being edited and could not be parsed into the right data type.
         * @returns A string describing the error, if any, or null to indicate there are no errors.
         */
        (item: T, property: string | null, parsing?: boolean): string | null;
    }
    /**
     * Specifies constants that define how null values are sorted.
     */
    enum SortNulls {
        /** Null values are sorted in natural order (first in ascending, last in descending order). */
        Natural = 0,
        /** Null values appear first (regardless of sort order). */
        First = 1,
        /** Null values appear last (regardless of sort order). */
        Last = 2
    }
    /**
     * Class that implements the {@link ICollectionView} interface to expose data in
     * regular JavaScript arrays.
     *
     * The {@link CollectionView} class implements the following interfaces:
     * <ul>
     *   <li>{@link ICollectionView}: provides current record management,
     *       custom sorting, filtering, and grouping.</li>
     *   <li>{@link IEditableCollectionView}: provides methods for editing,
     *       adding, and removing items.</li>
     *   <li>{@link IPagedCollectionView}: provides paging.</li>
     * </ul>
     *
     * To use the {@link CollectionView} class, start by declaring it and passing a
     * regular array as a data source. Then configure the view using the
     * {@link filter}, {@link sortDescriptions}, {@link groupDescriptions}, and
     * {@link pageSize} properties. Finally, access the view using the {@link items}
     * property. For example:
     *
     * ```typescript
     * import { CollectionView, SortDescription} from '@grapecity/wijmo';
     *
     * // create a CollectionView based on a data array
     * let view = new CollectionView(dataArray);
     *
     * // sort items by amount in descending order
     * let sortDesc = new SortDescription('amount', false);
     * view.sortDescriptions.push(sortDesc);
     *
     * // show only items with amounts greater than 100
     * view.filter = (item) => { return item.amount > 100 };
     *
     * // show the sorted, filtered result on the console
     * view.items.forEach((item, index) => {
     *     console.log(index + ': ' + item.name + ' ' + item.amount);
     * });
     * ```
     *
     * The example below shows how you can use a {@link CollectionView}
     * to provide sorted views of some raw data:
     *
     * {@sample Core/CollectionView/CreatingViews/Sorting/Overview Example}
     */
    class CollectionView<T = any> implements IEditableCollectionView, IPagedCollectionView {
        _srcRaw: T[];
        _src: T[];
        _ncc: INotifyCollectionChanged;
        _view: T[];
        _pgView: T[];
        _groups: CollectionViewGroup[] | null;
        _fullGroups: CollectionViewGroup[] | null;
        _digest: string;
        _idx: number;
        _filter: IPredicate;
        _filters: ObservableArray<IPredicate<any>>;
        _srtDsc: ObservableArray<SortDescription>;
        _grpDesc: ObservableArray<GroupDescription>;
        _newItem: T | null;
        _edtItem: T | null;
        _edtClone: any;
        _committing: boolean;
        _canceling: boolean;
        _pendingRefresh: boolean;
        _pendingRemove: boolean;
        _pgSz: number;
        _pgIdx: number;
        _updating: number;
        _itemCreator: IItemCreator<T>;
        _stableSort: boolean;
        _srtNulls: SortNulls;
        _canFilter: boolean;
        _canGroup: boolean;
        _canSort: boolean;
        _canAddNew: boolean;
        _canCancelEdit: boolean;
        _canRemove: boolean;
        _canChangePage: boolean;
        _refreshOnEdit: boolean;
        _trackChanges: boolean;
        _chgAdded: ObservableArray<T>;
        _chgRemoved: ObservableArray<T>;
        _chgEdited: ObservableArray<T>;
        _orgVals: Map<any, any>;
        _srtCvt: ISortConverter<T> | null;
        _srtCmp: IComparer<T> | null;
        _getError: IGetError<T> | null;
        _keepCurrentItem: boolean | null;
        _initializing: boolean;
        _calcFields: any;
        static _collator: Intl.Collator;
        /**
         * Initializes a new instance of the {@link CollectionView} class.
         *
         * @param sourceCollection Array that serves as a source for this
         * {@link CollectionView}.
         * @param options JavaScript object containing initialization data for the control.
         */
        constructor(sourceCollection?: any, options?: any);
        _copy(key: string, value: any): boolean;
        /**
         * Gets or sets an object where the keys represent calculated fields
         * and the values are expressions (functions or strings).
         *
         * Calculated fields require proxies. To use them in IE11, you will
         * need a polyfill such as this one:
         * https://www.npmjs.com/package/proxy-polyfill.
         *
         * Calculated fields can be useful when dealing with external data.
         * For example, you could add a per-capita income field (gnp/pop) or a
         * profit field (revenue-expenses).
         *
         * Calculated fields are dynamic. If you change the fields used in the
         * calculation, their values are updated automatically. They are also
         * read-only. You may change the value of the properties used to calculate
         * them, but you cannot directly edit the result.
         *
         * Unlike {@link FlexGrid} cellTemplates, calculated fields can be used
         * for sorting, filtering, and grouping. They can also be used with charts
         * and any other Wijmo controls.
         *
         * Calculated fields can be defined as functions that take a data item
         * as an argument or as strings.
         *
         * For example, if your data looked like this:
         *
         * ```typescript
         * // regular data item
         * interface IDataItem {
         *       product: string,
         *       brand: string,
         *       unitPrice: number,
         *       qty: number,
         *       shipped: boolean
         * }
         * function getData(): IDataItem[] {
         *     return [
         *         {
         *             product: 'Banana',
         *             brand: 'Chiquita',
         *             unitPrice: 45.95,
         *             qty: 12,
         *             discount: .08,
         *             shipped: true
         *         }, ...
         *     ]
         * }
         * ```
         *
         * You could add function-based calculated fields this way:
         *
         * ```typescript
         * // add calculated properties to IDataItem
         * interface ICalcDataItem extends IDataItem {
         *     fullName: string;
         *     allCaps: string;
         *     totalPrice: number,
         *     tax: number;
         * }
         *
         * let cv = new CollectionView<ICalcDataItem>(getData(), {
         *     calculatedFields: {
         *         fullName: ($: ICalcDataItem) => [$.brand, $.product].join(' '),
         *         allCaps: ($: ICalcDataItem) => $.fullName.toUpperCase(),
         *         totalPrice: ($: ICalcDataItem) => ($.unitPrice * $.qty) * (1 - $.discount),
         *         tax: ($: ICalcDataItem) => $.totalPrice * 0.12
         *     }
         * });
         * ```
         * **Function-based calculated fields** are usually a better choice than
         * string-based calculated fields because:
         *
         * 1) They provide design-time error checking and command completion,
         * 2) They run faster, and
         * 3) They do not have any issues with content-security policy (CSP).
         *
         * Alternatively, you could add string-based calculated fields:
         *
         * ```typescript
         * let cv = new CollectionView<IDataItem>(getData(), {
         *   calculatedFields: {
         *     fullName: '[$.brand, $.product].join(" ")',
         *     allCaps: '$.fullNameStr.toUpperCase()',
         *     totalPrice: '($.unitPrice * $.qty) * (1 - $.discount)',
         *     tax: '$.totalPrice * 0.12'
         * });
         * ```
         * String expressions may refer to the current item via the context
         * variable '$', which contains the item's original and calculated
         * values.
         *
         * **String-based calculated fields** have advantages over function-based
         * calculated fields that may be important in some scenarios:
         *
         * 1) They are slightly more concise, and
         * 2) They can be stored as data and easily changed at run-time.
         */
        calculatedFields: any;
        /**
         * Gets or sets a function that creates new items for the collection.
         *
         * If the creator function is not supplied, the {@link CollectionView}
         * will try to create an uninitialized item of the appropriate type.
         *
         * If the creator function is supplied, it should be a function that
         * takes no parameters and returns an initialized object of the proper
         * type for the collection.
         */
        newItemCreator: IItemCreator<T>;
        /**
         * Gets or sets a function used to convert values when sorting.
         *
         * If provided, the function should take as parameters a
         * {@link SortDescription}, a data item, and a value to convert,
         * and should return the converted value.
         *
         * This property provides a way to customize sorting. For example,
         * the {@link FlexGrid} control uses it to sort mapped columns by
         * display value instead of by raw value.
         *
         * For example, the code below causes a {@link CollectionView} to
         * sort the 'country' property, which contains country code integers,
         * using the corresponding country names:
         *
         * ```typescript
         * const countries = 'US,Germany,UK,Japan,Italy,Greece'.split(',');
         * view.sortConverter = (sd: SortDescription, item: any, value: any) => {
         *     return sd.property === 'countryMapped'
         *         ? countries[value]; // convert country id into name
         *         : value;
         * }
         * ```
         *
         * The next example combines two values so when sorting by country,
         * the view will break ties by city:
         *
         * ```typescript
         * view.sortConverter: (sd: SortDescription, item: any, value: any) => {
         *     if (sd.property == 'country') {
         *         value = item.country + '\t' + item.city;
         *     }
         *     return value;
         * }
         * ```
         */
        sortConverter: ISortConverter;
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
         * For example, see
         * <a href="http://www.davekoelle.com/alphanum.html">Dave Koele's Alphanum algorithm</a>.
         * It breaks up strings into chunks composed of strings or numbers, then
         * sorts number chunks in value order and string chunks in ASCII order.
         * Dave calls the result a "natural sorting order".
         *
         * The example below shows a typical use for the {@link sortComparer} property:
         *
         * ```typescript
         * import { CollectionView, isString } from '@grapecity/wijmo';
         *
         * // create a CollectionView with a custom sort comparer
         * const view = new CollectionView(data, {
         *     sortComparer: (a: any, b: any) => {
         *         return isString(a) && isString(b)
         *             ? alphanum(a, b) // use custom comparer for strings
         *             : null; // use default comparer for everything else
         *     }
         * });
         * ```
         *
         * The example below shows how you can use an
         * <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator">Intl.Collator</a>
         * to control the sort order:
         *
         * ```typescript
         * import { CollectionView, isString } from '@grapecity/wijmo';
         *
         * // create a CollectionView that uses an Intl.Collator to sort
         * const collator = window.Intl ? new Intl.Collator() : null;
         * let view = new CollectionView(data, {
         *     sortComparer: (a, b) => {
         *         return isString(a) && isString(b) && collator
         *             ? collator.compare(a, b) // use collator for strings
         *             : null; // use default comparer for everything else
         *     }
         * });
         * ```
         */
        sortComparer: IComparer<T>;
        /**
         * Gets or sets whether to use a stable sort algorithm.
         *
         * Stable sorting algorithms maintain the relative order of records with equal keys.
         * For example, consider a collection of objects with an "Amount" field.
         * If you sort the collection by "Amount", a stable sort will keep the original
         * order of records with the same Amount value.
         *
         * The default value for this property is **false**, which causes the
         * {@link CollectionView} to use JavaScript's built-in sort method, which is fast
         * and usually stable.
         *
         * Chrome provides stable sorting since version 70, and Firefox since version 3.
         * As of ES2019, sort is **required** to be stable. In ECMAScript 1st edition through
         * ES2018, it was allowed to be unstable.
         *
         * Setting the {@link useStableSort} property to true ensures stable sorts on all
         * browsers (even IE 11), but increases sort times by 30% to 50%.
         */
        useStableSort: boolean;
        /**
         * Gets or sets a value that determines how null values should be sorted.
         *
         * This property is set to **SortNulls.Last** by default, which causes null values
         * to appear last on the sorted collection, regardless of sort direction.
         * This is also the default behavior in Excel.
         */
        sortNulls: SortNulls;
        sortNullsFirst: boolean;
        /**
         * Calculates an aggregate value for the items in this collection.
         *
         * @param aggType Type of aggregate to calculate.
         * @param binding Property to aggregate on.
         * @param currentPage Whether to include only items on the current page.
         * @return The aggregate value.
         */
        getAggregate(aggType: wijmo.Aggregate, binding: string, currentPage?: boolean): any;
        /**
         * Gets or sets a value that determines whether the control should
         * track changes to the data.
         *
         * The default value for this property is **false**, so the {@link CollectionView}
         * does not keep track of which data items have changed.
         *
         * If you set this property to **true**, the {@link CollectionView} will keep
         * track of changes to the data and will expose them through the {@link itemsAdded},
         * {@link itemsRemoved}, and {@link itemsEdited} collections.
         *
         * Tracking changes is useful in situations where you need to update
         * the server after the user has confirmed that the modifications are
         * valid.
         *
         * After committing or cancelling changes, use the {@link clearChanges} method
         * to clear the {@link itemsAdded}, {@link itemsRemoved}, and {@link itemsEdited}
         * collections.
         *
         * The {@link CollectionView} only tracks changes made when the proper
         * {@link CollectionView} methods are used ({@link editItem}/{@link commitEdit},
         * {@link addNew}/{@link commitNew}, and {@link remove}).
         * Changes made directly to the data are not tracked.
         */
        trackChanges: boolean;
        /**
         * Gets or sets a value that determines whether the {@link CollectionView}
         * should automatically refresh its results (by applying the sort, filter,
         * and grouping operations) after items are edited.
         *
         * The default value for this property is **true**, which ensures the
         * collection is always sorted, filtered, and grouped correctly after any
         * edit operations.
         *
         * Set it to **false** if you want updates to be deferred when items
         * are edited. In this case, the collection will not be refreshed until
         * the sorting, filtering, and grouping criteria change or until the
         * {@link refresh} method is called (Excel behavior).
         */
        refreshOnEdit: boolean;
        /**
         * Gets an {@link ObservableArray} containing the records that were added to
         * the collection since {@link trackChanges} was enabled.
         */
        readonly itemsAdded: ObservableArray;
        /**
         * Gets an {@link ObservableArray} containing the records that were removed from
         * the collection since {@link trackChanges} was enabled.
         */
        readonly itemsRemoved: ObservableArray;
        /**
         * Gets an {@link ObservableArray} containing the records that were edited in
         * the collection since {@link trackChanges} was enabled.
         */
        readonly itemsEdited: ObservableArray;
        /**
         * Clears all changes by removing all items in the {@link itemsAdded},
         * {@link itemsRemoved}, and {@link itemsEdited} collections.
         *
         * Call this method after committing changes to the server or
         * after refreshing the data from the server.
         */
        clearChanges(): void;
        /**
         * Returns true if this object supports a given interface.
         *
         * @param interfaceName Name of the interface to look for.
         */
        implementsInterface(interfaceName: string): boolean;
        /**
         * Gets or sets a callback that determines whether a specific property
         * of an item contains validation errors.
         *
         * The method takes as parameters a data item, the property being validated,
         * and a parsing parameter that describes whether the data has already been
         * parsed and applied to the data item (parsing == false), or whether the user
         * was trying to edit the value and entered a value that could not be parsed
         * into the data type expected (parsing == true).
         *
         * The method returns a string containing an error message, or null if no
         * errors were detected.
         *
         * For example,
         *
         * ```typescript
         * view = new CollectionView(data, {
         *     getError: (item: any, prop: string, parsing: boolean) => {
         *
         *         // parsing failed, show message
         *         if (parsing) {
         *             if (prop == 'date') {
         *                 return 'Please enter a valid date in the format "MM/dd/yyyy"';
         *             } else if (prop == 'id') {
         *                 return 'Please enter a positive number';
         *             }
         *         }
         *
         *         // check that stored (parsed) data is valid
         *         if (prop == 'date' && item.date < minDate) {
         *             return 'Please enter a date after ' + Globalize.formatDate(minDate, 'd');
         *         } else if (prop == 'id' && item.id < 0) {
         *             return 'Please enter a positive number';
         *         }
         *     }
         * });
         * ```
         */
        getError: IGetError | null;
        /**
         * Occurs when the collection changes.
         */
        readonly collectionChanged: Event<ICollectionView<T>, NotifyCollectionChangedEventArgs<T>>;
        /**
         * Raises the {@link collectionChanged} event.
         *
         * @param e Contains a description of the change.
         */
        onCollectionChanged(e?: NotifyCollectionChangedEventArgs<any>): void;
        protected _raiseCollectionChanged(action?: NotifyCollectionChangedAction, item?: T, index?: number): void;
        /**
         * Occurs before the value of the {@link sourceCollection} property changes.
         */
        readonly sourceCollectionChanging: Event<ICollectionView<T>, CancelEventArgs>;
        /**
         * Raises the {@link sourceCollectionChanging} event.
         *
         * @param e {@link CancelEventArgs} that contains the event data.
         */
        onSourceCollectionChanging(e: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs after the value of the {@link sourceCollection} property changes.
         */
        readonly sourceCollectionChanged: Event<ICollectionView<T>, EventArgs>;
        /**
         * Raises the {@link sourceCollectionChanged} event.
         */
        onSourceCollectionChanged(e?: wijmo.EventArgs): void;
        /**
         * Gets a value that indicates whether this view supports filtering via the
         * {@link filter} property.
         *
         * This property does not affect the {@link filters} property, which are
         * always applied.
         */
        canFilter: boolean;
        /**
         * Gets a value that indicates whether this view supports grouping via the
         * {@link groupDescriptions} property.
         */
        canGroup: boolean;
        /**
         * Gets a value that indicates whether this view supports sorting via the
         * {@link sortDescriptions} property.
         */
        canSort: boolean;
        /**
         * Gets or sets the current item in the view.
         */
        currentItem: T;
        /**
         * Gets the ordinal position of the current item in the view.
         */
        currentPosition: number;
        /**
         * Gets or sets a callback used to determine if an item is suitable for
         * inclusion in the view.
         *
         * The callback should return true if the item passed in as a parameter
         * should be included in the view.
         *
         * The default value for this property is **null**, which means the
         * data is not filtered.
         */
        filter: IPredicate | null;
        /**
         * Gets an array of {@link IPredicate} functions used as filters
         * on this {@link CollectionView}.
         *
         * To be included in the view, an item has to pass the predicate
         * in the {@link filter} property as well as all predicates in
         * the {@link filters} collection.
         */
        readonly filters: ObservableArray<IPredicate>;
        /**
         * Gets a collection of {@link GroupDescription} objects that describe how the
         * items in the collection are grouped in the view.
         */
        readonly groupDescriptions: ObservableArray<GroupDescription>;
        /**
         * Gets an array of {@link CollectionViewGroup} objects that represents the
         * top-level groups.
         */
        readonly groups: CollectionViewGroup[];
        /**
         * Gets a value that indicates whether this view contains no items.
         */
        readonly isEmpty: boolean;
        /**
         * Gets an array of {@link SortDescription} objects that describe how the items
         * in the collection are sorted in the view.
         */
        readonly sortDescriptions: ObservableArray<SortDescription>;
        /**
         * Gets or sets the underlying (unfiltered and unsorted) collection.
         */
        sourceCollection: any;
        private _sourceChanged;
        /**
         * Returns a value indicating whether a given item belongs to this view.
         *
         * @param item Item to seek.
         */
        contains(item: T): boolean;
        /**
         * Sets the specified item to be the current item in the view.
         *
         * @param item Item that will become current.
         */
        moveCurrentTo(item: T): boolean;
        /**
         * Sets the first item in the view as the current item.
         */
        moveCurrentToFirst(): boolean;
        /**
         * Sets the last item in the view as the current item.
         */
        moveCurrentToLast(): boolean;
        /**
         * Sets the item before the current item in the view as the current item.
         */
        moveCurrentToPrevious(): boolean;
        /**
         * Sets the item after the current item in the view as the current item.
         */
        moveCurrentToNext(): boolean;
        /**
         * Sets the item at the specified index in the view as the current item.
         *
         * @param index Index of the item that will become current.
         */
        moveCurrentToPosition(index: number): boolean;
        /**
         * Re-creates the view using the current sort, filter, and group parameters.
         */
        refresh(): void;
        _commitAndRefresh(): void;
        _performRefresh(): void;
        _performSort(items: any[]): void;
        _compareItems(): (a: any, b: any) => number;
        _performFilter(items: any[]): any[];
        _filterItem(item: any): boolean;
        /**
         * Occurs after the current item changes.
         */
        readonly currentChanged: Event<ICollectionView<T>, EventArgs>;
        /**
         * Raises the {@link currentChanged} event.
         */
        onCurrentChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs before the current item changes.
         */
        readonly currentChanging: Event<ICollectionView<T>, CancelEventArgs>;
        /**
         * Raises the {@link currentChanging} event.
         *
         * @param e {@link CancelEventArgs} that contains the event data.
         */
        onCurrentChanging(e: wijmo.CancelEventArgs): boolean;
        /**
         * Gets items in the view.
         */
        readonly items: T[];
        /**
         * Suspend refreshes until the next call to {@link endUpdate}.
         */
        beginUpdate(): void;
        /**
         * Resume refreshes suspended by a call to {@link beginUpdate}.
         *
         * @param force Whether to force a refresh when ending the update.
         */
        endUpdate(force?: boolean): void;
        /**
         * Gets a value that indicates whether notifications are currently suspended
         * (see {@link beginUpdate} and {@link endUpdate}).
         */
        readonly isUpdating: boolean;
        /**
         * Executes a function within a {@link beginUpdate}/{@link endUpdate} block.
         *
         * The collection will not be refreshed until the function finishes.
         *
         * The {@link deferUpdate} method ensures {@link endUpdate} is called even
         * if the update function throws an exception.
         *
         * @param fn Function to be executed without updates.
         * @param force Whether to force a refresh when ending the update.
         */
        deferUpdate(fn: Function, force?: boolean): void;
        /**
         * Gets a value that indicates whether a new item can be added to the collection.
         */
        canAddNew: boolean;
        /**
         * Gets a value that indicates whether the collection view can discard pending changes
         * and restore the original values of an edited object.
         */
        canCancelEdit: boolean;
        /**
         * Gets a value that indicates whether items can be removed from the collection.
         */
        canRemove: boolean;
        /**
         * Gets the item that is being added during the current add transaction.
         */
        readonly currentAddItem: T;
        /**
         * Gets the item that is being edited during the current edit transaction.
         */
        readonly currentEditItem: T;
        /**
         * Gets a value that indicates whether an add transaction is in progress.
         */
        readonly isAddingNew: boolean;
        /**
         * Gets a value that indicates whether an edit transaction is in progress.
         */
        readonly isEditingItem: boolean;
        /**
         * Begins an edit transaction of the specified item.
         *
         * @param item Item to be edited.
         */
        editItem(item: T): void;
        /**
         * Ends the current edit transaction and saves the pending changes.
         */
        commitEdit(): void;
        /**
         * Ends the current edit transaction and, if possible,
         * restores the original value to the item.
         */
        cancelEdit(): void;
        /**
         * Adds a new item to the collection.
         *
         * Calling this methods without any parameters creates a new item, adds it to the
         * collection, and defers refresh operations until the new item is committed using
         * the {@link commitNew} method or canceled using the {@link cancelNew} method.
         *
         * The code below shows how the {@link addNew} method is typically used:
         *
         * ```typescript
         * // create the new item, add it to the collection
         * var newItem = view.addNew();
         *
         * // initialize the new item
         * newItem.id = getFreshId();
         * newItem.name = 'New Customer';
         *
         * // commit the new item so the view can be refreshed
         * view.commitNew();
         * ```
         *
         * You can also add new items by pushing them into the {@link sourceCollection}
         * and then calling the {@link refresh} method. The main advantage of {@link addNew}
         * is in user-interactive scenarios (like adding new items in a data grid),
         * because it gives users the ability to cancel the add operation. It also
         * prevents the new item from being sorted or filtered out of view until the
         * transaction is committed.
         *
         * New items are empty objects by default, unless the colletion has
         * {@link calculatedFields}, in which case the new items will have properties
         * set to values that depend on their data types (empty strings for string
         * properties, zero for numeric properties, and null for other data types).
         *
         * This behavior is convenient since in many cases the calculated fields
         * depend on expressions that rely on strings not being null. But you can
         * customize this behavior by setting the {@link newItemCreator} property
         * to a function that creates the new items and initializes them in any
         * way you want.
         *
         * @param item Item to be added to the collection (optional).
         * @param commit Whether to commit the new item immediately.
         * @return The item that was added to the collection, or null if the transaction
         * failed.
         */
        addNew(item?: T, commit?: boolean): T;
        /**
         * Ends the current add transaction and saves the pending new item.
         */
        commitNew(): void;
        /**
         * Ends the current add transaction and discards the pending new item.
         */
        cancelNew(): void;
        /**
         * Removes the specified item from the collection.
         *
         * @param item Item to be removed from the collection.
         */
        remove(item: T): void;
        /**
         * Removes the item at the specified index from the collection.
         *
         * @param index Index of the item to be removed from the collection.
         * The index is relative to the view, not to the source collection.
         */
        removeAt(index: number): void;
        _trackItemChanged(item: T, clone?: any): void;
        _extend(dst: any, src: any, level?: number): any;
        _getChangedFields(dst: any, src: any, level?: number): string[] | null;
        _sameValue(v1: any, v2: any, level?: number): boolean;
        _sameContent(dst: any, src: any): boolean;
        _needRefresh(changedFields: string[]): boolean;
        _getBindingRoot(name: string): string;
        /**
         * Gets a value that indicates whether the {@link pageIndex} value can change.
         */
        canChangePage: boolean;
        /**
         * Gets a value that indicates whether the page index is changing.
         */
        readonly isPageChanging: boolean;
        /**
         * Gets the total number of items in the view taking paging into account.
         */
        readonly itemCount: number;
        /**
         * Gets the zero-based index of the current page.
         */
        readonly pageIndex: number;
        /**
         * Gets or sets the number of items to display on each page.
         *
         * The default value for this property is **zero**, which
         * disables paging.
         */
        pageSize: number;
        /**
         * Gets the total number of items in the view before paging is applied.
         */
        readonly totalItemCount: number;
        /**
         * Gets the total number of pages.
         */
        readonly pageCount: number;
        /**
         * Sets the first page as the current page.
         *
         * @return True if the page index was changed successfully.
         */
        moveToFirstPage(): boolean;
        /**
         * Sets the last page as the current page.
         *
         * @return True if the page index was changed successfully.
         */
        moveToLastPage(): boolean;
        /**
         * Moves to the page before the current page.
         *
         * @return True if the page index was changed successfully.
         */
        moveToPreviousPage(): boolean;
        /**
         * Moves to the page after the current page.
         *
         * @return True if the page index was changed successfully.
         */
        moveToNextPage(): boolean;
        /**
         * Moves to the page at the specified index.
         *
         * @param index Index of the page to move to.
         * @return True if the page index was changed successfully.
         */
        moveToPage(index: number): boolean;
        /**
         * Occurs after the page index changes.
         */
        readonly pageChanged: Event<IPagedCollectionView, EventArgs>;
        /**
         * Raises the {@link pageChanged} event.
         */
        onPageChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs before the page index changes.
         */
        readonly pageChanging: Event<IPagedCollectionView, PageChangingEventArgs>;
        /**
         * Raises the {@link pageChanging} event.
         *
         * @param e {@link PageChangingEventArgs} that contains the event data.
         */
        onPageChanging(e: PageChangingEventArgs): boolean;
        _getFullGroup(g: CollectionViewGroup): CollectionViewGroup;
        _getGroupByPath(groups: CollectionViewGroup[], level: number, path: string): CollectionViewGroup;
        _getPageView(): T[];
        _createGroups(items: any[]): CollectionViewGroup[] | null;
        private _getGroupsDigest;
        private _mergeGroupItems;
        private _getGroup;
    }
    /**
     * Represents a group created by a {@link CollectionView} object based on
     * its {@link CollectionView.groupDescriptions} property.
     */
    class CollectionViewGroup {
        _gd: GroupDescription;
        _name: string;
        _path: string;
        _level: number;
        _isBottomLevel: boolean;
        _groups: CollectionViewGroup[];
        _items: any[];
        /**
         * Initializes a new instance of the {@link CollectionViewGroup} class.
         *
         * @param groupDescription {@link GroupDescription} that owns the new group.
         * @param name Name of the new group.
         * @param level Level of the new group.
         * @param isBottomLevel Whether this group has any subgroups.
         */
        constructor(groupDescription: GroupDescription, name: string, level: number, isBottomLevel: boolean);
        /**
         * Gets the name of this group.
         */
        readonly name: string;
        /**
         * Gets the level of this group.
         */
        readonly level: number;
        /**
         * Gets a value that indicates whether this group has any subgroups.
         */
        readonly isBottomLevel: boolean;
        /**
         * Gets an array containing the items included in this group (including all subgroups).
         */
        readonly items: any[];
        /**
         * Gets an array containing this group's subgroups.
         */
        readonly groups: CollectionViewGroup[];
        /**
         * Gets the {@link GroupDescription} that owns this group.
         */
        readonly groupDescription: GroupDescription;
        /**
         * Calculates an aggregate value for the items in this group.
         *
         * @param aggType Type of aggregate to calculate.
         * @param binding Property to aggregate on.
         * @param view CollectionView that owns this group.
         * @return The aggregate value.
         */
        getAggregate(aggType: wijmo.Aggregate, binding: string, view?: ICollectionView): any;
    }
}
declare module wijmo {
    var controlBaseClass: ObjectConstructor;
    class ControlBase extends controlBaseClass {
        constructor();
    }
    /**
     * Base class for all Wijmo controls.
     *
     * The {@link Control} class handles the association between DOM elements and the
     * actual control. Use the {@link hostElement} property to get the DOM element
     * that is hosting a control, or the {@link getControl} method to get the control
     * hosted in a given DOM element.
     *
     * The {@link Control} class also provides a common pattern for invalidating and
     * refreshing controls, for updating the control layout when its size changes,
     * and for handling the HTML templates that define the control structure.
     */
    class Control extends ControlBase {
        static _licKey: string;
        static _wme: HTMLElement;
        static _toWme: any;
        static _ctlCnt: number;
        static _touching: boolean;
        static _toTouch: any;
        static _tsInvalidInput: number;
        static _toInvalidInput: any;
        static _REFRESH_INTERVAL: number;
        static _FOCUS_INTERVAL: number;
        static _ANIM_DEF_DURATION: number;
        static _ANIM_DEF_STEP: number;
        static _CLICK_DELAY: number;
        static _CLICK_REPEAT: number;
        static _CLIPBOARD_DELAY: number;
        static _POPUP_ZINDEX: number;
        static _SEARCH_DELAY: number;
        static _HOVER_DELAY: number;
        static _LEAVE_DELAY: number;
        static _DRAG_SCROLL_EDGE: number;
        static _DRAG_SCROLL_STEP: number;
        static _CTRL_KEY: string;
        static _OWNR_KEY: string;
        static _SCRL_KEY: string;
        static _TTIP_KEY: string;
        static _DSBL_KEY: string;
        static _rxInputAtts: RegExp;
        protected _szObserver: any;
        protected _e: HTMLElement;
        protected _orgTabIndex: number;
        _orgOuter: string;
        protected _orgTag: string;
        protected _orgAtts: NamedNodeMap;
        protected _listeners: any[];
        protected _pristine: boolean;
        _focus: boolean;
        protected _updating: number;
        protected _fullUpdate: boolean;
        protected _toInv: any;
        protected _toFocus: any;
        protected _szCtl: Size;
        protected _rtlDir: boolean;
        /**
         * Initializes a new instance of the {@link Control} class and attaches it to a DOM element.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options JavaScript object containing initialization data for the control.
         * @param invalidateOnResize Whether the control should be invalidated when it is resized.
         */
        constructor(element: any, options?: any, invalidateOnResize?: boolean);
        /**
         * Gets the HTML template used to create instances of the control.
         *
         * This method traverses up the class hierarchy to find the nearest
         * ancestor that specifies a control template. For example, if you
         * specify a prototype for the {@link ComboBox} control, which does
         * not specify a template, it will override the template defined
         * by the {@link DropDown} base class (the nearest ancestor that does
         * specify a template).
         */
        getTemplate(): string;
        /**
         * Applies the template to a new instance of a control, and returns the root element.
         *
         * This method should be called by constructors of templated controls.
         * It is responsible for binding the template parts to the corresponding control
         * members.
         *
         * For example, the code below applies a template to an instance of an
         * {@link InputNumber} control. The template must contain elements with the
         * 'wj-part' attribute set to 'input', 'btn-inc', and 'btn-dec'.
         * The control members '_tbx', '_btnUp', and '_btnDn' will be assigned
         * references to these elements.
         *
         * ```typescript
         * this.applyTemplate('wj-control wj-inputnumber', templateString, {
         *   _tbx: 'input',
         *   _btnUp: 'btn-inc',
         *   _btnDn: 'btn-dec'
         * }, 'input');
         * ``````
         *
         * @param classNames Names of classes to add to the control's host element.
         * @param template An HTML string that defines the control template.
         * @param parts A dictionary of part variables and their names.
         * @param namePart Name of the part to be named after the host element. This
         * determines how the control submits data when used in forms.
         */
        applyTemplate(classNames: string, template: string, parts: Object, namePart?: string): HTMLElement;
        /**
         * Disposes of the control by removing its association with the host element.
         *
         * The {@link dispose} method automatically removes any event listeners added
         * with the {@link addEventListener} method.
         *
         * Calling the {@link dispose} method is important in applications that create
         * and remove controls dynamically. Failing to dispose of the controls may
         * cause memory leaks.
         */
        dispose(): void;
        /**
         * Gets the control that is hosted in a given DOM element.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         */
        static getControl(element: any): Control;
        /**
         * Gets the DOM element that is hosting the control.
         */
        readonly hostElement: HTMLElement;
        /**
         * Gets a value indicating whether the control is hosted in an element
         * with right-to-left layout.
         */
        readonly rightToLeft: boolean;
        /**
         * Sets the focus to this control.
         */
        focus(): void;
        /**
         * Checks whether this control contains the focused element.
         */
        containsFocus(): boolean;
        _containsFocus(): boolean;
        _containsFocusImpl(activeElement: HTMLElement): boolean;
        /**
         * Invalidates the control causing an asynchronous refresh.
         *
         * @param fullUpdate Whether to update the control layout as well as the content.
         */
        invalidate(fullUpdate?: boolean): void;
        /**
         * Refreshes the control.
         *
         * @param fullUpdate Whether to update the control layout as well as the content.
         */
        refresh(fullUpdate?: boolean): void;
        /**
         * Invalidates all Wijmo controls contained in an HTML element.
         *
         * Use this method when your application has dynamic panels that change
         * the control's visibility or dimensions. For example, splitters, accordions,
         * and tab controls usually change the visibility of its content elements.
         * In this case, failing to notify the controls contained in the element
         * may cause them to stop working properly.
         *
         * If this happens, you must handle the appropriate event in the dynamic
         * container and call the {@link Control.invalidateAll} method so the contained
         * Wijmo controls will update their layout information properly.
         *
         * @param e Container element. If set to null, all Wijmo controls
         * on the page will be invalidated.
         */
        static invalidateAll(e?: HTMLElement): void;
        /**
         * Refreshes all Wijmo controls contained in an HTML element.
         *
         * This method is similar to {@link invalidateAll}, except the controls
         * are updated immediately rather than after an interval.
         *
         * @param e Container element. If set to null, all Wijmo controls
         * on the page will be invalidated.
         */
        static refreshAll(e?: HTMLElement): void;
        /**
         * Disposes of all Wijmo controls contained in an HTML element.
         *
         * @param e Container element.
         */
        static disposeAll(e?: HTMLElement): void;
        /**
         * Suspends notifications until the next call to {@link endUpdate}.
         */
        beginUpdate(): void;
        /**
         * Resumes notifications suspended by calls to {@link beginUpdate}.
         */
        endUpdate(): void;
        /**
         * Gets a value that indicates whether the control is currently being updated.
         */
        readonly isUpdating: boolean;
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
         * Gets a value that indicates whether the control is currently handling
         * a touch event.
         */
        readonly isTouching: boolean;
        /**
         * Gets or sets a value of the **tabindex** attribute associated with the control.
         *
         * **tabindex** attribute value can be defined statically for a Wijmo control by specifying it
         * on the control's host HTML element. But this value can't be changed later during application
         * lifecycle, because Wijmo controls have complex structure, and the control may need to propagate
         * this attribute value to its internal element to work properly.
         *
         * Because of this, to read or change control's **tabindex** dynamically, you should do it using
         * this property.
         */
        tabOrder: number;
        protected _setTabOrder(value: number): void;
        /**
         * Gets or sets a value that determines whether the control is disabled.
         *
         * Disabled controls cannot get mouse or keyboard events.
         */
        isDisabled: boolean;
        protected _setIsDisabled(value: boolean): void;
        /**
         * Initializes the control by copying the properties from a given object.
         *
         * This method allows you to initialize controls using plain data objects
         * instead of setting the value of each property in code.
         *
         * For example:
         *
         * ```typescript
         * grid.initialize({
         *   itemsSource: myList,
         *   autoGenerateColumns: false,
         *   columns: [
         *     { binding: 'id', header: 'Code', width: 130 },
         *     { binding: 'name', header: 'Name', width: 60 }
         *   ]
         * });
         *
         * // is equivalent to
         * grid.itemsSource = myList;
         * grid.autoGenerateColumns = false;
         * // etc.
         * ```
         *
         * The initialization data is type-checked as it is applied. If the
         * initialization object contains unknown property names or invalid
         * data types, this method will throw.
         *
         * @param options Object that contains the initialization data.
         */
        initialize(options: any): void;
        /**
         * Adds an event listener to an element owned by this {@link Control}.
         *
         * The control keeps a list of attached listeners and their handlers,
         * making it easier to remove them when the control is disposed (see the
         * {@link dispose} and {@link removeEventListener} methods).
         *
         * Failing to remove event listeners may cause memory leaks.
         *
         * The <b>passive</b> parameter is set to false by default, which means
         * the event handler may call <b>event.preventDefault()</b>.
         * If you are adding passive handlers to touch or wheel events, setting
         * this parameter to true will improve application performance.
         *
         * For details on passive event listeners, please see
         * <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners">Improving scrolling performance with passive listeners</a>.
         *
         * @param target Target element for the event.
         * @param type String that specifies the event.
         * @param fn Function to execute when the event occurs.
         * @param capture Whether the listener should be handled by the control before it is handled by the target element.
         * @param passive Indicates that the handler will never call <b>preventDefault()</b>.
         */
        addEventListener(target: EventTarget, type: string, fn: any, capture?: boolean, passive?: boolean): void;
        /**
         * Removes one or more event listeners attached to elements owned by this {@link Control}.
         *
         * @param target Target element for the event. If null, removes listeners attached to all targets.
         * @param type String that specifies the event. If null, removes listeners attached to all events.
         * @param fn Handler to remove. If null, removes all handlers.
         * @param capture Whether the listener is capturing. If null, removes capturing and non-capturing listeners.
         * @return The number of listeners removed.
         */
        removeEventListener(target?: EventTarget, type?: string, fn?: any, capture?: boolean): number;
        /**
         * Occurs when the control gets the focus.
         */
        readonly gotFocus: Event<Control, EventArgs>;
        /**
         * Raises the {@link gotFocus} event.
         */
        onGotFocus(e?: EventArgs): void;
        /**
         * Occurs when the control loses the focus.
         */
        readonly lostFocus: Event<Control, EventArgs>;
        /**
         * Raises the {@link lostFocus} event.
         */
        onLostFocus(e?: EventArgs): void;
        /**
         * Occurs when invalid input is detected.
         *
         * Invalid input may occur when the user types or pastes a value that
         * cannot be converted to the proper type, or a value that is outside
         * the valid range.
         *
         * If the event handler cancels the event, the control will retain
         * the invalid content and the focus, so users can correct the error.
         *
         * If the event is not canceled, the control will ignore the invalid
         * input and will retain the original content.
         */
        readonly invalidInput: Event<Control, CancelEventArgs>;
        /**
         * Raises the {@link invalidInput} event.
         *
         * If the event handler cancels the event, the control will keep
         * the invalid input and the focus.
         */
        onInvalidInput(e: CancelEventArgs): boolean;
        /**
         * Occurs when the control is about to refresh its contents.
         */
        readonly refreshing: Event<Control, EventArgs>;
        /**
         * Raises the {@link refreshing} event.
         */
        onRefreshing(e?: EventArgs): void;
        /**
         * Occurs after the control has refreshed its contents.
         */
        readonly refreshed: Event<Control, EventArgs>;
        /**
         * Raises the {@link refreshed} event.
         */
        onRefreshed(e?: EventArgs): void;
        _getProductInfo(): string;
        private _updateWme;
        _hasPendingUpdates(): boolean;
        protected _handleResize(): void;
        _resizeObserverCallback(entries: any[]): void;
        _handleFocusBlur(): void;
        protected _updateFocusState(): void;
        protected _updateState(): void;
        private _handleDisabled;
        private _replaceWithDiv;
        private _copyAttributes;
        _getKeyCode(e: KeyboardEvent): number;
    }
}
declare module wijmo {
    /**
     * Class that enables the creation of custom documents for printing.
     *
     * The {@link PrintDocument} class makes it easy to create documents
     * for printing or exporting to PDF. Most browsers allow you to select
     * the paper size, orientation, margins, and whether to include page
     * headers and footers.
     *
     * To use, instantiate a {@link PrintDocument}, add content using the
     * {@link append} method, and finish by calling the {@link print}
     * method.
     *
     * For example:
     * ```typescript
     * import { PrintDocument } from '@grapecity/wijmo';
     *
     * // create the document
     * var doc = new PrintDocument({
     *   title: 'PrintDocument Test'
     * });
     *
     * // add some simple text
     * doc.append('&lt;h1&gt;Printing Example&lt;/h1&gt;');
     * doc.append('&lt;p&gt;This document was created using the &lt;b&gt;PrintDocument&lt;/b&gt; class.&lt;/p&gt;');
     *
     * // add some existing elements
     * doc.append(document.getElementById('gaugeControl'));
     *
     * // print the document (or export it to PDF)
     * doc.print();
     * ```
     *
     * The example below shows how you can create a printer-friendly version of
     * a document which can be printed or exported to PDF and other formats
     * directly from the browser:
     *
     * {@sample Core/PrintDocument Example}
     */
    class PrintDocument {
        _iframe: HTMLIFrameElement;
        _title: string;
        _css: string[];
        _copyCss: boolean;
        /**
         * Initializes a new instance of the {@link PrintDocument} class.
         *
         * @param options JavaScript object containing initialization data for the {@link PrintDocument}.
         */
        constructor(options?: any);
        /**
         * Gets or sets the document title.
         *
         * The default value for this property is **null**, which causes the
         * {@link PrintDocument} to use the title from the current document's
         * **title** tag.
         */
        title: string;
        /**
         * Gets or sets a value that determines whether the {@link PrintDocument}
         * should include the CSS style sheets defined in the main document.
         *
         * The default value for the property is **true**.
         */
        copyCss: boolean;
        /**
         * Adds a CSS style sheet to the document.
         *
         * @param href URL of the CSS file that should be added to the document.
         */
        addCSS(href: string): void;
        /**
         * Appends an HTML string or an element to the document.
         *
         * @param content HTML string or Element to append to the document.
         */
        append(content: string | Element): void;
        /**
         * Prints the document.
         *
         * @param callback Optional callback invoked after the document
         * finishes printing.
         */
        print(callback?: Function): void;
        _afterPrint(callback?: Function): void;
        _getDocument(): Document;
        _close(): void;
        _addStyle(style: string): void;
    }
}
declare module wijmo {
    /**
     * Static class that provides utility methods for clipboard operations.
     *
     * The {@link Clipboard} class provides static {@link copy} and {@link paste} methods
     * that can be used by controls to customize the clipboard content during
     * clipboard operations.
     *
     * For example, the code below shows how a control could intercept the
     * clipboard shortcut keys and provide custom clipboard handling:
     *
     * ```typescript
     * rootElement.addEventListener('keydown', (e: KeyboardEvent) {
     *
     *     // copy: ctrl+c or ctrl+Insert
     *     if (e.ctrlKey && (e.keyCode == 67 || e.keyCode == 45)) {
     *         let text = this.getClipString();
     *         Clipboard.copy(text);
     *         return;
     *     }
     *
     *     // paste: ctrl+v or shift+Insert
     *     if ((e.ctrlKey && e.keyCode == 86) || (e.shiftKey && e.keyCode == 45)) {
     *         Clipboard.paste(text => {
     *             this.setClipString(text);
     *         });
     *         return;
     *      }
     * });
     * ```
     *
     * The example below shows how you can customize the behavior of the clipboard
     * paste command when the target is a {@link FlexGrid} control:
     *
     * {@sample Core/Clipboard Example}
     */
    class Clipboard {
        /**
         * Copies a string to the clipboard.
         *
         * This method only works if invoked immediately after the user
         * pressed a clipboard copy command (such as ctrl+c).
         *
         * @param text Text to copy to the clipboard.
         */
        static copy(text: string): void;
        /**
         * Gets a string from the clipboard.
         *
         * This method only works if invoked immediately after the user
         * pressed a clipboard paste command (such as ctrl+v).
         *
         * @param callback Function called when the clipboard content
         * has been retrieved. The function receives the clipboard
         * content as a parameter.
         */
        static paste(callback: Function): void;
        private static _copyPaste;
    }
}
declare module wijmo {
    /**
     * Class that provides repeat-clicking on behalf of an HTMLElement
     * (typically a button).
     */
    class _ClickRepeater {
        private static _startEvents;
        private static _stopEvents;
        private _e;
        private _disabled;
        private _isDown;
        private _clicked;
        private _toDelay;
        private _toRepeat;
        private _mousedownBnd;
        private _mouseupBnd;
        private _clickBnd;
        /**
         * Initializes a new instance of the {@link _ClickRepeater} class.
         *
         * @param element Element that will raise click events while the mouse is down.
         */
        constructor(element: HTMLElement);
        /**
         * Gets or sets the element that will raise click events while the mouse is down.
         */
        element: HTMLElement;
        /**
         * Gets or sets a value that determines whether this repeater is disabled.
         */
        disabled: boolean;
        _connect(connect: boolean): void;
        _clearTimeouts(): void;
        _mousedown(e: MouseEvent): void;
        _mouseup(e: MouseEvent): void;
        _click(): void;
    }
}
declare module wijmo {
    /**
     * Represents the position of a popup element with respect to a
     * reference element.
     */
    enum PopupPosition {
        /** Above the reference element. */
        Above = 0,
        /** Above and aligned to the right of the reference element. */
        AboveRight = 1,
        /** To the right and aligned to the top of the reference element. */
        RightTop = 2,
        /** To the right of the reference element. */
        Right = 3,
        /** To the right and aligned to the bottom of the reference element. */
        RightBottom = 4,
        /** Below and aligned to the right of the reference element. */
        BelowRight = 5,
        /** Below the reference element. */
        Below = 6,
        /** Below and aligned to the left of the reference element. */
        BelowLeft = 7,
        /** To the left and aligned to the bottom of the reference element. */
        LeftBottom = 8,
        /** To the left of the reference element. */
        Left = 9,
        /** To the left and aligned to the top of the reference element. */
        LeftTop = 10,
        /** Above and aligned to the left of the reference element. */
        AboveLeft = 11
    }
    /**
     * Shows an element as a popup.
     *
     * The popup element becomes a child of the body element, and is positioned
     * with respect to reference rectangle according to the given {@link PopupPosition}.
     *
     * The reference rectangle may be specified as one of the following:
     *
     * <dl class="dl-horizontal">
     *   <dt>HTMLElement</dt>
     *   <dd>The bounding rectangle of the element.</dd>
     *   <dt>MouseEvent</dt>
     *   <dd>The bounding rectangle of the event's target element.</dd>
     *   <dt>Rect</dt>
     *   <dd>The given rectangle.</dd>
     *   <dt>null</dt>
     *   <dd>No reference rectangle; the popup is centered on the window.</dd>
     * </dl>
     *
     * Call the {@link hidePopup} method to hide the popup.
     *
     * @param popup Element to show as a popup.
     * @param ref Reference element or rectangle used to position the popup.
     * @param position Position of the popup with respect to the reference element.
     * @param fadeIn Use a fade-in animation to make the popup appear gradually.
     * @param copyStyles Whether to copy font and color styles from the reference element, or an element to use as the style source.
     * @param hideOnScroll An optional function called when the popup is hidden as a result of a parent element scrolling.
     * @return An interval ID that can be used to suspend the fade-in animation.
     */
    function showPopup(popup: HTMLElement, ref?: any, position?: PopupPosition | Boolean, fadeIn?: boolean, copyStyles?: any, hideOnScroll?: Function): any;
    /**
     * Hides a popup element previously displayed with the {@link showPopup}
     * method.
     *
     * @param popup Popup element to hide.
     * @param remove Whether to remove the popup from the DOM or just to hide it.
     * This parameter may be a boolean or a callback function that gets invoked
     * after the popup has been removed from the DOM.
     * @param fadeOut Whether to use a fade-out animation to make the popup disappear gradually.
     * @return An interval id that you can use to suspend the fade-out animation.
     */
    function hidePopup(popup: HTMLElement, remove?: any, fadeOut?: boolean): any;
}
declare module wijmo {
    interface _ITooltipInfo {
        element: HTMLElement;
        content: string;
        position: PopupPosition;
    }
    /**
     * Provides a pop-up window that displays additional information about
     * elements on the page.
     *
     * The {@link Tooltip} class can be used in two modes:
     *
     * **Automatic Mode:** Use the {@link setTooltip} method to connect
     * the {@link Tooltip} to one or more elements on the page. The {@link Tooltip}
     * will automatically monitor events and display the tooltips when the
     * user performs actions that trigger the tooltip.
     * For example:
     *
     * ```typescript
     * import { Tooltip } from '@grapecity/wijmo';
     * let tt = new Tooltip();
     * tt.setTooltip('#menu', 'Select commands.');
     * tt.setTooltip('#tree', 'Explore the hierarchy.');
     * tt.setTooltip('#chart', '#idChartTooltip');
     * ```
     *
     * **Manual Mode:** The caller is responsible for showing and hiding
     * the tooltip using the {@link show} and {@link hide} methods. For example:
     *
     * ```typescript
     * import { Tooltip } from '@grapecity/wijmo';
     * let tt = new Tooltip();
     * element.addEventListener('click', () => {
     *     if (tt.isVisible) {
     *         tt.hide();
     *     } else {
     *         tt.show(element, 'This is an important element!');
     *     }
     * });
     * ```
     *
     * The example below shows how you can use the {@link Tooltip} class
     * to add Excel-style notes to cells in a {@link FlexGrid} control:
     *
     * {@sample Grid/CustomCells/CellNotes/purejs Example}
     */
    class Tooltip {
        static _eTip: HTMLElement;
        private _toShow;
        private _toHide;
        private _showAutoTipBnd;
        private _hideAutoTipBnd;
        private _mousemoveBnd;
        private _eMouse;
        private _html;
        private _cssClass;
        private _gap;
        private _isAnimated;
        private _position;
        private _showAtMouse;
        private _showDelay;
        private _hideDelay;
        _tips: _ITooltipInfo[];
        /**
         * Initializes a new instance of the {@link Tooltip} class.
         *
         * @param options JavaScript object containing initialization data for the {@link Tooltip}.
         */
        constructor(options?: any);
        /**
         * Gets or sets the {@link PopupPosition} where the tooltip should be
         * displayed with respect to the owner element.
         *
         * The default value for this property is **PopupPosition.Above**.
         */
        position: PopupPosition;
        /**
         * Gets or sets a value that determines whether tooltips should use a
         * fade-in animation when shown.
         *
         * The default value for this property is **false**.
         */
        isAnimated: boolean;
        /**
         * Assigns tooltip content to a given element on the page.
         *
         * The same tooltip may be used to display information for any number
         * of elements on the page. To remove the tooltip from an element,
         * call {@link setTooltip} and specify null for the content.
         *
         * To remove the tooltips for all elements, call the {@link dispose} method.
         *
         * @param element Element, single element CSS selector, or control that the tooltip explains.
         * @param content Tooltip content or ID of the element that contains the tooltip content.
         * @param position Position where the tooltip should be displayed with respect to the owner element.
         */
        setTooltip(element: any, content: string | null, position?: PopupPosition): void;
        /**
         * Gets the tooltip content associated with a given element.
         *
         * @param element Element, element ID, or control that the tooltip explains.
         * @return Tooltip content associated with the given element.
         */
        getTooltip(element: any): string | null;
        /**
         * Shows a tooltip with the specified content next to the specified element.
         *
         * @param element Element, element ID, or control that the tooltip explains.
         * @param content Tooltip content or ID of the element that contains the tooltip content.
         * @param bounds Optional parameter that defines the bounds of the area that the tooltip
         * targets. If not provided, the element bounds are used.
         * @param position Optional parameter that specifies the position of the tooltip
         * with respect to the reference bounds. If provided, this value overrides the setting
         * of the {@link position} property.
         */
        show(element: any, content: string, bounds?: Rect, position?: PopupPosition): void;
        /**
         * Hides the tooltip if it is currently visible.
         */
        hide(): void;
        /**
         * Removes all tooltips associated with this {@link Tooltip} instance.
         */
        dispose(): void;
        /**
         * Gets a value that determines whether the tooltip is currently visible.
         */
        readonly isVisible: boolean;
        /**
         * Gets or sets a value that determines whether the tooltip contents
         * should be displayed as plain text or as HTML.
         *
         * The default value for the property is **true**.
         */
        isContentHtml: boolean;
        /**
         * Gets or sets a CSS class name to add to the tooltip.
         *
         * The default value for this property is an empty string.
         */
        cssClass: string;
        /**
         * Gets or sets the distance between the tooltip and the target element.
         *
         * The default value for the property is **6** pixels.
         */
        gap: number;
        /**
         * Gets or sets a value that determines whether the tooltip should be
         * calculated based on the mouse position rather than the target element.
         *
         * The default value for the property is **false**, which means
         * the tooltip position is calculated based on the target element.
         *
         * The {@link position} property is used to determine the tooltip
         * position in respect to the target element or to the mouse
         * position.
         */
        showAtMouse: boolean;
        /**
         * Gets or sets the delay, in milliseconds, before showing the tooltip
         * after the mouse enters the target element.
         *
         * The default value for the property is **500** milliseconds.
         */
        showDelay: number;
        /**
         * Gets or sets the delay, in milliseconds, before hiding the tooltip
         * if the mouse remains over the element.
         *
         * The default value for the property is **zero** milliseconds,
         * which causes the tip to remain visible until the mouse moves
         * away from the element.
         */
        hideDelay: number;
        /**
         * Occurs before the tooltip content is displayed.
         *
         * The event handler may customize the tooltip content or suppress
         * the tooltip display by changing the event parameters.
         */
        readonly popup: Event<Tooltip, TooltipEventArgs>;
        /**
         * Raises the {@link popup} event.
         *
         * @param e {@link TooltipEventArgs} that contains the event data.
         */
        onPopup(e: TooltipEventArgs): boolean;
        private _indexOf;
        private _attach;
        private _detach;
        private _showAutoTip;
        _mousemove(e: MouseEvent): void;
        private _hideAutoTip;
        private _clearTimeouts;
        private _getContent;
        private _setContent;
    }
    /**
     * Provides arguments for the {@link Tooltip.popup} event.
     */
    class TooltipEventArgs extends CancelEventArgs {
        private _content;
        private _e;
        /**
         * Initializes a new instance of the {@link TooltipEventArgs} class.
         *
         * @param content String to show in the tooltip.
         * @param element HTMLElement that the tip refers to.
         */
        constructor(content: string, element?: HTMLElement);
        /**
         * Gets a reference to the tooltip element.
         */
        readonly tip: HTMLElement;
        /**
         * Gets a reference to the element that the tooltip refers to.
         */
        readonly element: HTMLElement;
        /**
         * Gets or sets the content to show in the tooltip.
         *
         * This parameter can be used while handling the {@link Tooltip.popup}
         * event to modify the content of the tooltip.
         */
        content: string;
    }
}
declare module wijmo {
}
declare module wijmo {
    function _updateWme(ctl: Control, key: string): void;
}
