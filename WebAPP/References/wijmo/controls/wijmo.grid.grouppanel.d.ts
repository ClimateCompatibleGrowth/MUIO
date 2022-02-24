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
declare module wijmo.grid.grouppanel {
    function softGridFilter(): typeof wijmo.grid.filter;
}
declare module wijmo.grid.grouppanel {
    /**
     * Represents a method that takes a binding and returns a {@link:GroupDescription}.
     */
    interface IGroupDescriptionCreator {
        /**
         * @param: property Name of the property to group by.
         * @returns A {@link GroupDescription} object used to create the groups.
         */
        (property: string): wijmo.collections.GroupDescription;
    }
    /**
     * The {@link GroupPanel} control provides a drag and drop UI for editing
     * groups in a bound {@link FlexGrid} control.
     *
     * It allows users to drag columns from the {@link FlexGrid} into the
     * panel and to move groups within the panel. Users may click the
     * group markers in the panel to sort based on the group column or to
     * remove groups.
     *
     * In order to use a {@link GroupPanel}, add it to a page that contains a
     * {@link FlexGrid} control and set the panel's {@link grid} property to the
     * {@link FlexGrid} control. For example:
     *
     * ```typescript
     * import { FlexGrid } from '@grapecity/wijmo.grid';
     * import { GroupPanel } from '@grapecity/wijmo.grid.grouppanel';
     *
     * // create a FlexGrid
     * let theGrid = new FlexGrid('#theGrid', {
     *     itemsSource: getData();
     * });
     *
     * // add a GroupPanel to edit data groups
     * let thePanel = new GroupPanel('#thePanel', {
     *     grid: theGrid,
     *     placeholder: 'Drag columns here to create Groups.'
     * });
     * ```
     *
     * The example below shows how you can use a {@link GroupPanel} control to
     * add Outlook-style grouping to a {@link FlexGrid} control:
     *
     * {@sample Grid/Grouping/GroupPanel/purejs Example}
     */
    class GroupPanel extends wijmo.Control {
        _g: any;
        _view: wijmo.collections.ICollectionView;
        _gds: wijmo.collections.ObservableArray<wijmo.collections.GroupDescription>;
        _hideGroupedCols: boolean;
        _showDragGlyphs: boolean;
        _maxGroups: number;
        _dragCol: wijmo.grid.Column;
        _dragMarker: HTMLElement;
        _divMarkers: HTMLElement;
        _divPH: HTMLElement;
        _hiddenCols: any[];
        _filter: wijmo.grid.filter.FlexGridFilter;
        _filterMarker: HTMLElement;
        _gdc: IGroupDescriptionCreator;
        _placeholder: string | null;
        _dragEndBnd: any;
        /**
         * Gets or sets the template used to instantiate {@link GroupPanel} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link GroupPanel} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        /**
         * Gets or sets a value indicating whether the panel hides grouped columns in the owner grid.
         *
         * The {@link FlexGrid} displays grouping information in row headers, so it is
         * usually a good idea to hide grouped columns since they display redundant
         * information.
         *
         * The default value for this property is **true**.
         */
        hideGroupedColumns: boolean;
        /**
         * Gets or sets a value that determines whether the control should
         * add drag glyphs to the group marker elements.
         *
         * The default value for this property is **true**.
         */
        showDragGlyphs: boolean;
        /**
         * Gets or sets the maximum number of groups allowed.
         *
         * Setting this property to -1 allows any number of groups to be created.
         * Setting it to zero prevents any grouping.
         *
         * The default value for this property is **6**.
         */
        maxGroups: number;
        /**
         * Gets or sets a string to display in the control when it contains no groups.
         *
         * The default value for this property is **null**, which causes the control
         * to use a localized version of the string
         * "Drag and Drop columns here to create Groups." as a placeholder.
         *
         * Set this property to a custom string if you want, or set it to an empty
         * string to remove the placeholder message, or set it to null to restore
         * the default message.
         */
        placeholder: string | null;
        /**
         * Gets or sets the {@link FlexGrid} that is connected to this {@link GroupPanel}.
         *
         * Once a grid is connected to the panel, the panel displays the groups
         * defined in the grid's data source. Users can drag grid columns
         * into the panel to create new groups, drag groups within the panel to
         * re-arrange the groups, or delete items in the panel to remove the groups.
         */
        grid: wijmo.grid.FlexGrid;
        /**
         * Gets the {@link ICollectionView} whose groups are being managed by this
         * {@link GroupPanel}.
         */
        readonly collectionView: wijmo.collections.ICollectionView;
        /**
         * Gets or sets the {@link wijmo.grid.filter.FlexGridFilter} to use for filtering
         * the grid data.
         *
         * If you set this property to a valid filter, the group descriptors will
         * display filter icons that can be used to see and edit the filer conditions
         * associated with the groups.
         */
        filter: wijmo.grid.filter.FlexGridFilter;
        /**
         * Gets or sets a {@link GroupDescription} creator function used to create
         * group descriptions when users drag columns into the group.
         *
         * For example, the code below defines a {@link groupDescriptionCreator}
         * function that groups dates by year and values in ranges:
         *
         * ```typescript
         * thePanel.groupDescriptionCreator = (prop: string) => {
         *     switch (prop) {
         *         case 'date':
         *             return new PropertyGroupDescription(prop, (item, prop) => {
         *                 return Globalize.formatDate(item[prop], 'yyyy');
         *             });
         *         case 'sales':
         *             return new PropertyGroupDescription(prop, (item, prop) => {
         *                 let value = item[prop];
         *                 if (value > 50000) return 'High';
         *                 if (value > 25000) return 'Medium';
         *                 return 'Low';
         *             });
         *     }
         *     return null; // default
         * }
         * ```
         */
        groupDescriptionCreator: IGroupDescriptionCreator;
        /**
         * Updates the panel to show the current groups.
         */
        refresh(): void;
        /**
         * Gets the {@link GroupDescription} at a given mouse position or
         * represented by a given HTML element.
         *
         * @param e Element to test.
         * @returns The {@link GroupDescription} represented by the element,
         * or null if the element does not represent a {@link GroupDescription}.
         */
        hitTest(e: MouseEvent | Element): wijmo.collections.GroupDescription;
        _filterChanged(): void;
        _getColumnFilter(col: wijmo.grid.Column): any;
        _editFilter(marker: HTMLElement): void;
        _addGroup(col: wijmo.grid.Column, e: MouseEvent): void;
        _moveGroup(marker: HTMLElement, e: MouseEvent): void;
        _removeGroup(index: number, groups?: collections.ObservableArray<collections.GroupDescription>): void;
        _getIndex(e: MouseEvent): number;
        _getElementIndex(e: HTMLElement): number;
        _draggingColumn(s: wijmo.grid.FlexGrid, e: wijmo.grid.CellRangeEventArgs): void;
        _itemsSourceChanging(s: wijmo.grid.FlexGrid, e: wijmo.EventArgs): void;
        _itemsSourceChanged(s: wijmo.grid.FlexGrid, e: wijmo.EventArgs): void;
        _collectionChanged(sender: any, e: wijmo.collections.NotifyCollectionChangedEventArgs): void;
        _dragStart(e: DragEvent): void;
        _dragOver(e: DragEvent): void;
        _drop(e: DragEvent): void;
        _dragEnd(e: DragEvent): void;
        _click(e: MouseEvent): void;
        _updateSort(e: MouseEvent, marker: HTMLElement): void;
    }
}
declare module wijmo.grid.grouppanel {
}
