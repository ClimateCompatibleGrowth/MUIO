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
declare module wijmo.grid.search {
    /**
     * The {@link FlexGridSearch} control allows users to quickly search the
     * items displayed in a {@link FlexGrid}.
     *
     * The control filters the items and shows only the ones that contain
     * the text provided by the user. It also highlights the matches in
     * the target {@link FlexGrid} (except for templated cells, which do
     * not support highlighting).
     *
     * The {@link FlexGridSearch} control may be used in conjunction with
     * the {@link FlexGridFilter} control, which provides column-specific
     * filtering.
     *
     * The example below shows how you can create a {@link FlexGridSearch}
     * control and connect it to a {@link FlexGrid}:
     * ```typescript
     * import { FlexGrid } from '@grapecity/wijmo.grid';
     * import { FlexGridSearch } from '@grapecity/wijmo.grid.search';
     *
     * // create FlexGrid
     * let grid = new FlexGrid('#gridElement', {
     *     itemsSource: getData();
     * });
     *
     * // create FlexGridSearch and connect it to the grid
     * let search = new FlexGridSearch('#searchElement', {
     *     grid: grid
     * });
     * ```
     */
    class FlexGridSearch extends wijmo.Control {
        _tbx: HTMLInputElement;
        _btn: HTMLElement;
        private _g;
        private _cv;
        private _delay;
        private _cssMatch;
        private _searchAllColumns;
        private _rxSrch;
        private _rxHilite;
        private _toSearch;
        private _filterBnd;
        /**
         * Gets or sets the template used to instantiate {@link FlexGridSearch} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link FlexGridSearch} class.
         *
         * @param element The DOM element that hosts the control, or a selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
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
         * Gets the HTML input element hosted by the control.
         *
         * Use this property in situations where you want to customize the
         * attributes of the input element.
         */
        readonly inputElement: HTMLInputElement;
        /**
         * Gets or sets the text to search for.
         *
         * The text may include multiple terms, separated by spaces.
         */
        text: string;
        /**
         * Gets or sets the delay, in milliseconds, between when a keystroke occurs
         * and when the search is performed.
         *
         * The default value for this property is **500** milliseconds.
         */
        delay: number;
        /**
         * Gets or sets the string shown as a hint when the control is empty.
         *
         * The default value for this property is an empty string **""**.
         */
        placeholder: string;
        /**
         * Gets or sets the name of the CSS class used to highlight any parts
         * of the content that match the search terms.
         *
         * The default value for this property is **"wj-state-match"**.
         *
         * Highlighing is not supported in template cells.
         */
        cssMatch: string;
        /**
         * Gets or sets a value that determines whether invisible columns should
         * be included in the search.
         *
         * The default value for this property is **false**.
         */
        searchAllColumns: boolean;
        private _formatItem;
        private _itemsSourceChanged;
        private _applySearch;
        private _filter;
        private _getItemText;
    }
}
declare module wijmo.grid.search {
}
