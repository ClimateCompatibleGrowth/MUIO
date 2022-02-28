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
declare module wijmo.grid.immutable {
    /**
     * Provides data for the {@link ImmutabilityProvider.dataChanged} event.
     */
    class DataChangeEventArgs extends wijmo.EventArgs {
        /**
         * Initializes a new instance of the {@link DataChangeEventArgs} class.
         * @param action Type of action that caused the event to fire.
         * @param oldItem Original item that was removed or changed.
         * @param newItem New item that was added or changed.
         * @param itemIndex Index of the item.
         */
        constructor(action: DataChangeAction, oldItem: any, newItem: any, itemIndex: any);
        /**
         * Gets the action that caused the event to fire.
         */
        readonly action: DataChangeAction;
        /**
         * Gets an existing item affected by the change, depending on the
         * {@link action}:
         * * Remove: the removed item from the {@link ImmutabilityProvider.itemsSource} array.
         * * Add: a null value.
         * * Change: the original item from the {@link ImmutabilityProvider.itemsSource} array
         *   (not modified, the cloned item with the modifications is in the
         *   {@link newItem} property).
         */
        readonly oldItem: any;
        /**
         * Gets an item with changes, depending on the
         * {@link action}:
         * * Remove: a null value.
         * * Add: the new added item
         * * Change: the cloned item with modifications
         */
        readonly newItem: any;
        /**
         * Gets an index of the item affected by the change in the
         * {@link ImmutabilityProvider.itemsSource} array, depending on the
         * {@link action}:
         * * Remove: the removed item index
         * * Add: the added item index
         * * Change: the changed item index
         */
        readonly itemIndex: any;
    }
    /**
     * Describes the action that caused the {@link ImmutabilityProvider.dataChanged}
     * event to fire.
     */
    enum DataChangeAction {
        /** An item was added to the collection. */
        Add = 0,
        /** An item was removed from the collection. */
        Remove = 1,
        /** Item properties was changed. */
        Change = 2
    }
    /**
     * Provides data for the {@link ImmutabilityProvider.cloningItem} event.
     */
    class CloningItemEventArgs extends wijmo.EventArgs {
        private readonly _originalItem;
        /**
         * This property should be assigned by an event handler with an object representing
         * a clone of the {@link originalItem}.
         * If not assigned then {@link ImmutabilityProvider} will clone item using its
         * default algorithm.
         */
        clonedItem: any;
        /**
         * Initializes a new instance of the {@link CloningItemEventArgs} class.
         * @param originalItem The original item which is about to be cloned by the grid.
         */
        constructor(originalItem: any);
        /**
         * The original item which is about to be cloned by the grid.
         */
        readonly originalItem: any;
    }
    /**
     * The **ImmutabilityProvider** object,
     * being attached to a {@link wijmo.grid.FlexGrid} control,
     * allows the latter to perform data edits without mutating the underlying
     * data. Instead, this class provides a data change event, which can be used to dispatch
     * change actions to the global _Store_, such as a
     * <a href="https://redux.js.org/" target="_blank">Redux</a> _Store_.
     *
     * In framework interops, this class is usually represented by a framework specific
     * component, like a {@link wijmo.react.grid.immutable.ImmutabilityProvider} component
     * for <a href="https://reactjs.org/" target="_blank">React</a>,
     * which is more convenient to use in the context of the framework.
     *
     * The controlled **FlexGrid** control should not specify its **itemsSource**. Instead, the
     * **itemsSource** property of this class instance should be assigned with the
     * immutable array from the _Store_, which grid will display and edit.
     *
     * When a user edits data via the datagrid,
     * the {@link wijmo.grid.immutable.ImmutabilityProvider.dataChanged} event is triggered,
     * bringing all the necessary information to you about the change (which item is affected,
     * if item was changed or added or deleted, and so on). This event should be used to dispatch
     * corresponding data change actions to the _Store_.
     *
     * Note that **FlexGrid** edits data on a row level basis, which means that you can change multiple
     * cell values in the same row, and only after you move focus out of the row, all the changes
     * to the row will be applied simultaneously. Or you can press the _Cancel_ key to cancel all
     * the changes in the row. The same is true for adding a row into the datagrid.
     *
     * Note also that some changes like pasting a text into the datagrid, or deleting rows,
     * can affect multiple rows. In this case **ImmutabilityProvider** will trigger
     * the {@link ImmutabilityProvider.dataChanged} event
     * multiple times, separately for each affected row. This simplifies data change processing
     * in the _Store_ reducers.
     *
     * This example demonstrates a fully editable **FlexGrid** component, with an associated
     * **ImmutabilityProvider** component bound to an array from the _Redux Store_. The dataChanged
     * event handler dispatches corresponding data change actions to the _Store_.
     * ```typescript
     *   import { ImmutabilityProvider, DataChangeEventArgs, DataChangeAction } from '@grapecity/wijmo.grid.immutable';
     *   import { FlexGrid } from '@grapecity/wijmo.grid';
     *   import { store } from './store';
     *   import { addItemAction, removeItemAction, changeItemAction } from './actions';
     *
     *   const grid = new FlexGrid('#grid', {
     *       allowAddNew: true,
     *       allowDelete: true
     *   });
     *   const provider = new ImmutabilityProvider(grid, {
     *       itemsSource: store.getState().items,
     *       dataChanged: (s: ImmutabilityProvider, e: DataChangeEventArgs) => {
     *          switch (e.action) {
     *               case DataChangeAction.Add:
     *                   store.dispatch(addItemAction(e.newItem));
     *                 break;
     *               case DataChangeAction.Remove:
     *                   store.dispatch(removeItemAction(e.newItem, e.itemIndex));
     *                   break;
     *             case DataChangeAction.Change:
     *                   store.dispatch(changeItemAction(e.newItem, e.itemIndex));
     *                   break;
     *          }
     *       }
     *   });
     *   store.subscribe(() => {
     *       provider.itemsSource = store.getState().items;
     *   })
     * ```
     */
    class ImmutabilityProvider {
        private readonly _grid;
        private _items;
        private readonly _cv;
        private _isAddNew;
        private _isPasting;
        private _chg;
        private _iChg;
        private _clearChg;
        /**
         * Creates an instance of the ImmutabilityProvider attached to the specified FlexGrid
         * control.
         * @param grid {@link FlexGrid} control to attach to.
         * @param options Initialization options for the ImmutabilityProvider instance.
         */
        constructor(grid: wijmo.grid.FlexGrid, options?: any);
        /**
         * Gets a {@link FlexGrid} instance controlled by the ImmutabilityProvider.
         */
        readonly grid: wijmo.grid.FlexGrid;
        /**
         * Gets a {@link CollectionView} object internally maintained by the ImmutabilityProvider.
         * You *can not* change data in this CollectionView, instead any data changes must be
         * dispatched to the _Store_.
         * But you can change its sort/group/filter settings, use currency
         * and data change events.
         */
        readonly collectionView: wijmo.collections.CollectionView;
        /**
         * Gets or sets a source data array that should be displayed in the controlled
         * FlexGrid. The **FlexGrid.itemsSource** property **should not** be assigned.
         * Every time a new version of the source array appears in the _Store_, this
         * property must be re-assigned with this new array instance. This can be done, for example,
         * in the handler function for the _Store_ change event.
         */
        itemsSource: any;
        /**
         * Triggered after a user has added, removed or changed a data item in the
         * controlled FlexGrid instance.
         * Can be used to dispatch a corresponding data change action to the _Store_.
         */
        readonly dataChanged: Event<FlexGrid, DataChangeEventArgs>;
        /**
         * Raises the {@link dataChanged} event.
         * @param e {@link DataChangeEventArgs} that contains the event data.
         */
        onDataChanged(e: DataChangeEventArgs): void;
        /**
         * Triggered when {@link FlexGrid} needs to create a clone of an item which is
         * about to be changed.
         *
         * This event allows you to provide a custom logic for cloning items.
         * The cloned item should be assigned to the {@link CloningItemEventArgs.clonedItem}
         * property of the event arguments.
         */
        readonly cloningItem: Event<FlexGrid, CloningItemEventArgs>;
        /**
         * Raises the {@link cloningItem} event.
         * @param e {@link CloningItemEventArgs} that contains the event data.
         */
        onCloningItem(e: CloningItemEventArgs): void;
        private _gridRowAdded;
        private _gridDeletingRow;
        private _gridDeletedRow;
        private _gridBeginningEdit;
        private _gridRowEditEnded;
        private _doRowEditEnded;
        private _gridPasting;
        private _gridPasted;
        /**
         * Replaces item in the Row and CV arrays with the new item.
         * Returns an index of the item in the CV.sourceCollection array.
         */
        private _swapItem;
        private _swapBatchedItems;
        private _addItemChange;
        /**
         * Checks if the row is a data row, and returns its dataItem index in the
         * CV.sourceCollection. -1 if not a data row due to any reason.
         */
        private _dataIndex;
        /**
         * Removes all items from the target array, and adds items into it from the source array.
         * Returns the target array.
        */
        private _replaceItems;
        private _cloneItem;
        private _cloneBindings;
        private _cloneProps;
    }
    /**
     * Performs shallow copying of properties of one or more source objects into the target object.
     * Can be used to clone objects in the _Store_ reducers.
     * @param target The object to copy properties to.
     * @param src One or more source objects whose properties must be copied to the target object.
     */
    function copyObject(target: any, ...src: any[]): any;
}
declare module wijmo.grid.immutable {
}
