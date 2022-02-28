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
declare module wijmo.nav {
    /**
     * The {@link TabPanel} enables content organization at a high level,
     * such as switching between views, data sets, or functional aspects
     * of an application.
     *
     * Tabs are presented as a single row above their associated content.
     * Tab headers succinctly describe the content within.
     *
     * Tabs can be selected with the mouse or keyboard, and automatically
     * update the content to reflect the current selection.
     *
     * The example below shows how you can use a {@link TabPanel} to organize
     * content into pages:
     *
     * {@sample Nav/TabPanel/Overview Example}
     */
    class TabPanel extends wijmo.Control {
        private _tabs;
        private _selectedIndex;
        private _toAnim;
        private _eAnim;
        private _animated;
        private _autoSwitch;
        private _dRoot;
        private _dTabHeaders;
        private _dTabPanes;
        /**
         * Gets or sets the template used to instantiate {@link TabPanel} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link TabPanel} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         * @param keepChildren Whether to keep child elements. If set to true, the caller becomes responsible for
         * populating the {@link tabs} array based on the DOM).
         */
        constructor(element: any, options?: any, keepChildren?: boolean);
        /**
         * Gets an array of {@link Tab} objects whose {@link Tab.header} and
         * {@link Tab.pane} properties determine the content of the
         * {@link TabPanel} control.
         */
        readonly tabs: wijmo.collections.ObservableArray<Tab>;
        /**
         * Gets or sets the index of the currently selected (active) tab.
         */
        selectedIndex: number;
        /**
         * Gets or sets the {@link Tab} object that is currently selected.
         */
        selectedTab: Tab;
        /**
         * Gets or sets a value that determines whether tab changes should be animated
         * with a fade-in effect.
         *
         * The default value for this property is **true**.
         */
        isAnimated: boolean;
        /**
         * Gets or sets a value that determines whether the control should switch
         * tabs automatically when the user selects a tab using the arrow keys.
         *
         * The default value for this property is **true**, which causes the
         * control to switch tabs when the user presses the arrow keys.
         * In this mode, the Tab key selects the next element in the tab sequence,
         * which excludes non-selected tab headers.
         *
         * When {@link autoSwitch} is set to **false**, pressing the arrow keys
         * or the Tab key moves the focus to the next or previous tab header,
         * but does not switch tabs. Pressing the **Enter** or **Space** keys
         * is required to activate the tab that has the focus.
         *
         * In most cases, the default value provides adequate (accessible)
         * behavior, but some users may prefer to set {@link autoSwitch} to false.
         * For a more detailed discussion of this topic, please see the
         * <a href="https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus" target="_blank">W3C ARIA practices</a>
         * and
         * <a href="http://simplyaccessible.com/article/danger-aria-tabs/" target="_blank">SimplyAccessible</a> articles.
         */
        autoSwitch: boolean;
        /**
         * Gets a {@link Tab} by id or by header content.
         *
         * @param id Id of the {@link Tab} to retrieve.
         */
        getTab(id: string): Tab;
        /**
         * Occurs when the value of the {@link selectedIndex} property changes.
         */
        readonly selectedIndexChanged: Event<TabPanel, EventArgs>;
        /**
         * Raises the {@link selectedIndexChanged} event.
         */
        onSelectedIndexChanged(e?: wijmo.EventArgs): void;
        _populateControl(): void;
        _validateSelection(): void;
        private _updateContent;
        private _removeChildren;
        private _click;
        private _keydown;
        private _getTabIndex;
        private _getNextIndex;
        _setIsDisabled(value: boolean): void;
        _setTabOrder(value: number): void;
        _updateTabIndex(): void;
    }
    /**
     * Represents a tab within a {@link TabPanel} control.
     *
     * Tabs have two elements: a header and a pane. The header displays
     * the tab title and the pane represents the tab content.
     */
    class Tab {
        private _hdr;
        private _pane;
        private _p;
        /**
         * Initializes a new instance of the {@link Tab} class.
         *
         * @param header Element or CSS selector for the element that contains the Tab header.
         * @param pane Element or CSS selector for the element that contains the Tab content.
         */
        constructor(header: any, pane: any);
        /**
         * Gets a reference to the {@link TabPanel} that contains this Tab.
         */
        readonly tabPanel: TabPanel;
        /**
         * Gets the tab's header element.
         */
        readonly header: HTMLElement;
        /**
         * Gets the tab's content element.
         */
        readonly pane: HTMLElement;
        /**
         * Gets or sets a value that determines whether this {@link Tab} is disabled.
         */
        isDisabled: boolean;
        /**
         * Gets or sets a value that determines whether this {@link Tab} is visible.
         */
        isVisible: boolean;
        _setParts(header: HTMLElement, pane: HTMLElement): void;
        _setPanel(panel: TabPanel): void;
    }
}
declare module wijmo.nav {
    /**
     * The {@link Accordion} control is a vertically stacked set of
     * interactive headings that each contain a title.
     *
     * The headings function as controls that enable users to reveal
     * or hide their associated sections of content.
     *
     * Accordions are commonly used to reduce the need to scroll when
     * presenting multiple sections of content on a single page.
     */
    class Accordion extends wijmo.Control {
        private _panes;
        private _selectedIndex;
        private _animated;
        private _autoSwitch;
        private _alCollapseAll;
        private _alExpandMany;
        private _autoSwitching;
        private _hidePane;
        /**
         * Initializes a new instance of the {@link Accordion} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         * @param keepChildren Whether to keep child elements. If set to true, the caller becomes responsible for
         * populating the {@link tabs} array based on the DOM).
         */
        constructor(element: any, options?: any, keepChildren?: boolean);
        /**
         * Gets an array of {@link AccordionPane} objects whose {@link AccordionPane.header} and
         * {@link AccordionPane.content} properties determine the content of the
         * {@link Accordion} control.
         */
        readonly panes: wijmo.collections.ObservableArray<AccordionPane>;
        /**
         * Gets or sets the index of the currently selected (active) pane.
         */
        selectedIndex: number;
        /**
         * Gets or sets the {@link AccordionPane} object that is currently selected.
         */
        selectedPane: AccordionPane;
        /**
         * Gets or sets a value that determines whether collapsing or
         * expanding panes should be animated.
         *
         * The default value for this property is **true**.
         */
        isAnimated: boolean;
        /**
         * Gets or sets a value that determines whether the {@link Accordion}
         * shows collapsed/expanded icons in the pane headers.
         *
         * The default value for this property is **true**.
         */
        showIcons: boolean;
        /**
         * Gets or sets a value that determines whether the control should switch
         * panes automatically when the user selects a tab using the arrow keys.
         *
         * When {@link autoSwitch} is set to true (the default value), pressing the
         * arrow keys automatically switches panes. Pressing the tab key selects
         * the next element in the tab sequence, which excludes non-selected
         * pane headers.
         *
         * When {@link autoSwitch} is set to false, pressing the arrow keys or the
         * tab key moves the focus to the next or previous pane header, but does
         * not switch panes. Pressing the Enter or Space keys is required to
         * activate the pane that has the focus.
         *
         * In most cases, the default value provides adequate (accessible)
         * behavior, but some users may prefer to set {@link autoSwitch} to false.
         * For a more detailed discussion of this topic, please see the
         * <a href="https://www.w3.org/TR/wai-aria-practices/#kbd_selection_follows_focus" target="_blank">W3C ARIA practices</a>
         * and
         * <a href="http://simplyaccessible.com/article/danger-aria-tabs/" target="_blank">SimplyAccessible</a> articles.
         */
        autoSwitch: boolean;
        /**
         * Gets or sets a value that determines whether users should be allowed
         * to collapse all the items.
         *
         * The default value for this property is **false**, which ensures
         * one item is always expanded.
         */
        allowCollapseAll: boolean;
        /**
         * Gets or sets a value that determines whether users should be allowed
         * to expand multiple panes at a time.
         *
         * The default value for this property is **false**, which ensures
         * only one pane is expanded at a time.
         */
        allowExpandMany: boolean;
        /**
         * Gets an {@link AccordionPane} by id or by header content.
         *
         * @param id Id of the {@link AccordionPane} to retrieve.
         */
        getPane(id: string): AccordionPane;
        /**
         * Occurs when the value of the {@link selectedIndex} property changes.
         */
        readonly selectedIndexChanged: Event<Accordion, EventArgs>;
        /**
         * Raises the {@link selectedIndexChanged} event.
         */
        onSelectedIndexChanged(e?: wijmo.EventArgs): void;
        _populateControl(): void;
        _validateSelection(): void;
        private _updateContent;
        private _updatePanesTabIndex;
        protected _setTabOrder(value: number): void;
        private _click;
        private _keydown;
        private _getPaneIndex;
        private _getNextIndex;
        private _getIndexOfPane;
        private _getNextActiveIndex;
        _togglePane(pane: AccordionPane, collapse: boolean): void;
    }
    /**
     * Represents a pane in an {@link Accordion} control.
     *
     * Panes have two elements: header and content.
     * The header displays the pane title and the content is a
     * collapsible element that shows the pane content.
     */
    class AccordionPane {
        private _hdr;
        private _content;
        private _acc;
        /**
         * Initializes a new instance of the {@link AccordionPane} class.
         *
         * @param header Element or CSS selector for the element that contains the pane header.
         * @param content Element or CSS selector for the element that contains the pane content.
         */
        constructor(header: any, content: any);
        /**
         * Gets a reference to the {@link Accordion} that contains this Tab.
         */
        readonly accordion: Accordion;
        /**
         * Gets the pane's header element.
         */
        readonly header: HTMLElement;
        /**
         * Gets the panes's content element.
         */
        readonly content: HTMLElement;
        /**
         * Gets or sets a value that determines whether this {@link AccordionPane} is disabled.
         */
        isDisabled: boolean;
        /**
         * Gets or sets a value that determines whether this {@link AccordionPane} is visible.
         */
        isVisible: boolean;
        /**
         * Gets or sets a value that determines whether this {@link AccordionPane} is expanded or collapsed.
         */
        isCollapsed: boolean;
        _setParts(header: HTMLElement, content: HTMLElement): void;
        _setAccordion(accordion: Accordion): void;
    }
}
declare module wijmo.nav {
    /**
     * Provides arguments for the {@link TreeView.formatItem} event.
     */
    class FormatNodeEventArgs extends wijmo.EventArgs {
        _data: any;
        _e: HTMLElement;
        _level: number;
        /**
         * Initializes a new instance of the {@link FormatNodeEventArgs} class.
         *
         * @param dataItem Data item represented by the node.
         * @param element Element that represents the node being formatted.
         * @param level The outline level of the node being formatted.
         */
        constructor(dataItem: any, element: HTMLElement, level: number);
        /**
         * Gets the data item being formatted.
         */
        readonly dataItem: any;
        /**
         * Gets a reference to the element that represents the node being formatted.
         */
        readonly element: HTMLElement;
        /**
         * Gets the outline level of the node being formatted.
         */
        readonly level: number;
    }
    /**
     * Provides arguments for {@link TreeNode}-related events.
     */
    class TreeNodeEventArgs extends wijmo.CancelEventArgs {
        _node: TreeNode;
        /**
         * Initializes a new instance of the {@link TreeNodeEventArgs} class.
         *
         * @param node {@link TreeNode} that this event refers to.
         */
        constructor(node: TreeNode);
        /**
         * Gets the {@link TreeNode} that this event refers to.
         */
        readonly node: TreeNode;
    }
    /**
     * Provides arguments for {@link TreeNode} drag-drop events.
     */
    class TreeNodeDragDropEventArgs extends wijmo.CancelEventArgs {
        _src: TreeNode;
        _tgt: TreeNode;
        _pos: DropPosition;
        /**
         * Initializes a new instance of the {@link TreeNodeEventArgs} class.
         *
         * @param dragSource {@link TreeNode} being dragged.
         * @param dropTarget {@link TreeNode} where the source is being dropped.
         * @param position {@link DropPosition} that this event refers to.
         */
        constructor(dragSource: TreeNode, dropTarget: TreeNode, position: DropPosition);
        /**
         * Gets a reference to the {@link TreeNode} being dragged.
         */
        readonly dragSource: TreeNode;
        /**
         * Gets a reference to the current {@link TreeNode} target.
         */
        readonly dropTarget: TreeNode;
        /**
         * Gets or sets the {@link DropPosition} value that specifies where
         * the {@link TreeNode} will be dropped.
         */
        position: DropPosition;
    }
    /**
     * Specifies the position where a {@link TreeNode} is being dropped during
     * a drag and drop operation.
     */
    enum DropPosition {
        /** The node will become the previous sibling of the target node. */
        Before = 0,
        /** The node will become the next sibling of the target node. */
        After = 1,
        /** The node will become the last child of the target node. */
        Into = 2
    }
}
declare module wijmo.nav {
    /**
     * Class that represents a node in a {@link TreeView}.
     */
    class TreeNode {
        _t: TreeView;
        _e: HTMLElement;
        /**
         * Initializes a new instance of a {@link TreeNode}.
         *
         * @param treeView {@link TreeView} that contains the node.
         * @param nodeElement HTML element that represents the node on the {@link TreeView}.
         */
        constructor(treeView: TreeView, nodeElement: HTMLElement);
        /**
         * Gets the data item that this node represents.
         */
        readonly dataItem: any;
        /**
         * Gets the HTML element that represents this node on the {@link TreeView}.
         */
        readonly element: HTMLElement;
        /**
         * Gets a reference to the {@link TreeView} that contains this node.
         */
        readonly treeView: TreeView;
        /**
         * Ensures that a node is visible by expanding any collapsed
         * ancestors and scrolling the element into view.
         */
        ensureVisible(): void;
        /**
         * Checks whether this node refers to the same element as another node.
         *
         * @param node @TreeNode to compare with this one.
         */
        equals(node: TreeNode): boolean;
        /**
         * Selects this node.
         */
        select(): void;
        /**
         * Gets this node's index within the parent's node collection.
         */
        readonly index: number;
        /**
         * Gets this node's parent node.
         *
         * This property returns null for top-level nodes.
         */
        readonly parentNode: TreeNode;
        /**
         * Gets this node's level.
         *
         * Top-level nodes have level zero.
         */
        readonly level: number;
        /**
         * Gets a value that indicates whether this node has child nodes.
         */
        readonly hasChildren: boolean;
        /**
         * Gets a value that indicates whether this node has pending child nodes
         * that will be lazy-loaded when the node is expanded.
         */
        readonly hasPendingChildren: boolean;
        /**
         * Gets an array containing this node's child nodes.
         *
         * This property returns null if the node has no children.
         */
        readonly nodes: TreeNode[];
        /**
         * Gets the HTMLInputElement that represents the checkbox associated
         * with this node.
         */
        readonly checkBox: HTMLInputElement;
        /**
         * Gets or sets a value that determines whether this node is expanded or collapsed.
         */
        isCollapsed: boolean;
        /**
         * Gets or sets a value that determines whether this node is checked.
         *
         * When the value of this property changes, child and ancestor nodes
         * are automatically updated, and the parent {@link TreeView}'s
         * {@link TreeView.checkedItemsChanged} event is raised.
         */
        isChecked: boolean;
        /**
         * Gets or sets a value that determines whether this node is disabled.
         *
         * Disabled nodes cannot get mouse or keyboard events.
         *
         * If the {@link collapseWhenDisabled} proprety is set to true, disabling
         * a node also collapses it.
         */
        isDisabled: boolean;
        /**
         * Gets a reference to the previous node in the view.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        previous(visible?: boolean, enabled?: boolean): TreeNode;
        /**
         * Gets a reference to the next node in the view.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        next(visible?: boolean, enabled?: boolean): TreeNode;
        /**
         * Gets a reference to the previous sibling node in the view.
         */
        previousSibling(): TreeNode;
        /**
         * Gets a reference to the next sibling node in the view.
         */
        nextSibling(): TreeNode;
        /**
         * Sets the collapsed state of the node.
         *
         * @param collapsed Whether to collapse or expand the node.
         * @param animate Whether to use animation when applying the new state.
         * @param collapseSiblings Whether to collapse sibling nodes when expanding
         * this node.
         */
        setCollapsed(collapsed: boolean, animate?: boolean, collapseSiblings?: boolean): void;
        /**
         * Sets the checked state of this node and its children.
         *
         * @param checked Whether to check or uncheck the node and its children.
         * @param updateParent Whether to update the checked state of this node's
         * ancestor nodes.
         */
        setChecked(checked: boolean, updateParent?: boolean): void;
        /**
         * Removes this {@link TreeNode} from a {@link TreeView}.
         */
        remove(): void;
        /**
         * Adds a child node at a specific position.
         *
         * @param index Index of the new child node.
         * @param dataItem Data item used to create the new node.
         * @return The {@link TreeNode} that was added.
         */
        addChildNode(index: number, dataItem: any): TreeNode;
        /**
         * Refreshes a node to reflect data changes.
         *
         * @param dataItem New node data. If not provided, the node is refreshed
         * based on its original data item (which presumably has been updated).
         */
        refresh(dataItem?: any): void;
        /**
         * Moves this {@link TreeNode} to a new position on the {@link TreeView}.
         *
         * @param refNode Reference {@link TreeNode} that defines the location
         * where the node will be moved.
         * @param position Whether to move the node before, after, or into
         * the reference node.
         * @return True if the node was moved successfully.
         */
        move(refNode: any, position: DropPosition): boolean;
        /**
         * Gets the array that contains the items for this {@link TreeNode}.
         *
         * This property is read-only. It returns an array that is a
         * member of the parent {@link TreeView}'s {@link TreeView.itemsSource} array.
         */
        readonly itemsSource: any[];
        _pse(e: HTMLElement): HTMLElement;
        _contains(node: TreeNode): boolean;
        _getArray(): any[];
        _moveElements(refNode: any, position: DropPosition): void;
        _updateState(): void;
        _updateEmptyState(): void;
        _updateCheckedState(): void;
        static _getChildNodes(treeView: TreeView, nodeList: HTMLElement): TreeNode[];
        static _isNode(e: HTMLElement): boolean;
        static _isNodeList(e: HTMLElement): boolean;
        static _isEmpty(node: HTMLElement): boolean;
        static _isCollapsed(node: HTMLElement): boolean;
        static _assertNode(node: HTMLElement): void;
        static _assertNodeList(nodeList: HTMLElement): void;
    }
}
declare module wijmo.nav {
    /**
     * Class that handles hierarchical (multi-level) bindings.
     */
    class _BindingArray {
        _path: any;
        _bindings: wijmo.Binding[];
        _maxLevel: number;
        /**
         * Initializes a new instance of a _BindingArray.
         *
         * @param path String or array of strings to create bindings from.
         */
        constructor(path?: any);
        /**
         * Gets or sets the names of the properties used for binding.
         */
        path: any;
        /**
         * Gets the binding value for a given data item at a given level.
         *
         * @param dataItem Object that contains the data.
         * @param level Binding level to use for retrieving the data.
         */
        getValue(dataItem: any, level: number): any;
        /**
         * Sets the binding value on a given data item at a given level.
         *
         * @param dataItem Object that contains the data.
         * @param level Binding level to use for retrieving the data.
         * @param value Value to apply to the data item.
         */
        setValue(dataItem: any, level: number, value: any): void;
    }
}
declare module wijmo.nav {
    /**
     * Represents a function used to load child nodes asynchronously (lazy-load).
     */
    interface ILazyLoad {
        /**
         * @param node {@link TreeNode} being opened and populated.
         * @param callback {@link ILazyLoadCallback} to be invoked when the node data becomes available.
         */
        (node: TreeNode, callback: ILazyLoadCallback): void;
    }
    /**
     * Represents a callback method used to add lazy-loaded nodes to a {@link TreeNode}.
     */
    interface ILazyLoadCallback {
        /**
         * @param items Array containing child items for the node being lazy-loaded.
         */
        (items: any[]): void;
    }
    /**
     * The {@link TreeView} control displays a hierarchical list of {@link TreeNode}
     * objects which may contain text, checkboxes, images, or arbitrary HTML
     * content.
     *
     * A {@link TreeView} is typically used to display the headings in a document,
     * the entries in an index, the files and directories on a disk, or any other
     * kind of information that might usefully be displayed as a hierarchy.
     *
     * After creating a {@link TreeView}, you will typically set the following
     * properties:
     *
     * <ol>
     *  <li>
     *      {@link itemsSource}: an array that contains the data to be displayed on the
     *      tree.</li>
     *  <li>
     *      {@link displayMemberPath}: the name of the data item property that contains
     *      the text to display on the nodes (defaults to 'header'), and</li>
     *  <li>
     *      {@link childItemsPath}: the name of the data item property that contains the
     *      node's child items (defaults to 'items').</li>
     * </ol>
     *
     * The {@link TreeView} control supports the following keyboard commands:
     *
     * <table>
     *   <thead>
     *     <tr><th>Key Combination</th><th>Action</th></tr>
     *   </thead>
     *   <tbody>
     *     <tr><td>Up/Down</td><td>Select the previous/next visible node</td></tr>
     *     <tr><td>Left</td><td>Collapse the selected node if it has child nodes, select the parent node otherwise</td></tr>
     *     <tr><td>Right</td><td>Expand the selected node if it has child nodes</td></tr>
     *     <tr><td>Home/End</td><td>Select the first/last visible nodes</td></tr>
     *     <tr><td>Space</td><td>Toggle the checkbox in the current node (see the {@link showCheckboxes} property)</td></tr>
     *     <tr><td>Other characters</td><td>Search for nodes that contain the text typed (multi-character auto-search)</td></tr>
     *   </tbody>
     * </table>
     *
     * The example below builds a simple tree and allows you to see the effect
     * of the TreeView's main properties:
     *
     * {@sample Nav/TreeView/Behavior/purejs Example}
     */
    class TreeView extends wijmo.Control {
        static _DATAITEM_KEY: string;
        static _AS_DLY: number;
        static _AN_DLY: number;
        static _CND: string;
        static _CNDL: string;
        static _CEMP: string;
        static _CNDT: string;
        static _CNDC: string;
        static _CSEL: string;
        static _CCLD: string;
        static _CCLG: string;
        static _CLDG: string;
        _root: HTMLElement;
        private _items;
        _selNode: TreeNode;
        _itmPath: _BindingArray;
        _chkPath: _BindingArray;
        private _prevSel;
        private _dspPath;
        private _imgPath;
        private _dd;
        private _html;
        private _animated;
        private _chkOnClick;
        private _collOnClick;
        private _xpndOnClick;
        private _xpndOnLoad;
        private _autoColl;
        private _showChk;
        private _collapseWhenDisabled;
        private _chkItems;
        private _ldLvl;
        private _srch;
        private _toSrch;
        private _lazyLoad;
        private _isDirty;
        private _srcChanged;
        private _isReadOnly;
        private _edtNode;
        private _toItemsChanged;
        /**
         * Gets or sets the template used to instantiate {@link TreeView} controls.
         */
        static controlTemplate: string;
        /**
         * Initializes a new instance of the {@link TreeView} class.
         *
         * @param element The DOM element that hosts the control, or a CSS selector for the host element (e.g. '#theCtrl').
         * @param options The JavaScript object containing initialization data for the control.
         */
        constructor(element: any, options?: any);
        /**
         * Gets or sets the array that contains the {@link TreeView} items.
         *
         * {@link TreeView} #see:itemsSource arrays usually have a hierarchical
         * structure with items that contain child items. There is no fixed
         * limit to the depth of the items.
         *
         * For example, the array below would generate a tree with three
         * top-level nodes, each with two child nodes:
         *
         * ```typescript
         * import { TreeView } from '@grapecity/wijmo.nav';
         * var tree = new TreeView('#treeView', {
         *     displayMemberPath: 'header',
         *     childItemsPath: 'items',
         *     itemsSource: [
         *         { header: '1 first', items: [
         *             { header: '1.1 first child' },
         *             { header: '1.2 second child' },
         *         ] },
         *         { header: '2 second', items: [
         *             { header: '3.1 first child' },
         *             { header: '3.2 second child' },
         *         ] },
         *         { header: '3 third', items: [
         *             { header: '3.1 first child' },
         *             { header: '3.2 second child' },
         *         ] }
         *     ]
         * });
         * ```
         */
        itemsSource: any[];
        /**
         * Gets or sets the name of the property (or properties) that contains
         * the child items for each node.
         *
         * The default value for this property is the string **"items"**.
         *
         * In most cases, the property that contains the child items is the
         * same for all data items on the tree. In these cases, set the
         * {@link childItemsPath} to that name.
         *
         * In some cases, however, items at different levels use different
         * properties to store their child items. For example, you could have
         * a tree with categories, products, and orders. In that case, you
         * would set the {@link childItemsPath} to an array such as this:
         *
         * <pre>// categories have products, products have orders:
         * tree.childItemsPath = [ 'Products', 'Orders' ];</pre>
         */
        childItemsPath: string | string[];
        /**
         * Gets or sets the name of the property (or properties) to use as
         * the visual representation of the nodes.
         *
         * The default value for this property is the string **"header"**.
         *
         * In most cases, the property that contains the node text is the
         * same for all data items on the tree. In these cases, set the
         * {@link displayMemberPath} to that name.
         *
         * In some cases, however, items at different levels use different
         * properties to represent them. For example, you could have
         * a tree with categories, products, and orders. In that case, you
         * might set the {@link displayMemberPath} to an array such as this:
         *
         * <pre>// categories, products, and orders have different headers:
         * tree.displayMemberPath = [ 'CategoryName', 'ProductName', 'OrderID' ];</pre>
         */
        displayMemberPath: string | string[];
        /**
         * Gets or sets the name of the property (or properties) to use as a
         * source of images for the nodes.
         *
         * The default value for this property is an empty string, which
         * means no images are added to the nodes.
         */
        imageMemberPath: string | string[];
        /**
         * Gets or sets the name of the property (or properties) to bind
         * to the node's checked state.
         *
         * See also the {@link showCheckboxes} property and the
         * {@link checkedItemsChanged} event.
         */
        checkedMemberPath: string | string[];
        /**
         * Gets or sets a value indicating whether items are bound to
         * plain text or HTML.
         *
         * The default value for this property is **false**.
         */
        isContentHtml: boolean;
        /**
         * Gets or sets a value that determines whether the {@link TreeView}
         * should add checkboxes to nodes and manage their state.
         *
         * This property can be used only on trees without lazy-loaded
         * nodes (see the {@link lazyLoadFunction} property).
         *
         * See also the {@link checkedItems} property and {@link checkedItemsChanged}
         * event.
         *
         * The default value for this property is **false**.
         */
        showCheckboxes: boolean;
        /**
         * Gets or sets a value that determines if sibling nodes should be
         * collapsed when a node is expanded.
         *
         * The default value for this property is **true**, because in
         * most cases  collapsing nodes that are not in use helps keep the
         * UI clean.
         */
        autoCollapse: boolean;
        /**
         * Gets or sets a value that determines whether nodes should be
         * collapsed when they are disabled.
         *
         * The default value for this property is **true**.
         */
        collapseWhenDisabled: boolean;
        /**
         * Gets or sets a value that indicates whether to use animations when
         * expanding or collapsing nodes.
         *
         * The default value for this property is **true**.
         */
        isAnimated: boolean;
        /**
         * Gets or sets a value that determines whether users can edit the
         * text in the nodes.
         *
         * When the {@link isReadOnly} property is set to false, users may
         * edit the content of the tree nodes by typing directly into the nodes.
         * The F2 key can also be used to enter edit mode with the whole node
         * content selected.
         *
         * You may customize the editing behavior using the following methods
         * and events:
         *
         * **Methods**: {@link startEditing}, {@link finishEditing}.
         *
         * **Events**: {@link nodeEditStarting}, {@link nodeEditStarted},
         * {@link nodeEditEnding}, {@link nodeEditEnded}.
         *
         * The default value for this property is **true**.
         */
        isReadOnly: boolean;
        /**
         * Starts editing a given {@link TreeNode}.
         *
         * @param node {@link TreeNode} to edit. If not provided, the currently
         * selected node is used.
         *
         * @return True if the edit operation started successfully.
         */
        startEditing(node?: TreeNode): boolean;
        /**
         * Commits any pending edits and exits edit mode.
         *
         * @param cancel Whether pending edits should be canceled or committed.
         * @return True if the edit operation finished successfully.
         */
        finishEditing(cancel?: boolean): boolean;
        /**
         * Gets or sets a value that determines whether users can drag and drop nodes
         * within the {@link TreeView}.
         *
         * The default value for this property is **false**.
         */
        allowDragging: boolean;
        /**
         * Gets or sets a value that determines whether to toggle checkboxes
         * when the user clicks the node header.
         *
         * The default value for this property is **false**, which causes
         * checkboxes to be toggled only when the user clicks the checkbox
         * itself (not the node header).
         *
         * See also the {@link showCheckboxes} property and the {@link checkedItemsChanged} event.
         */
        checkOnClick: boolean;
        /**
         * Gets or sets a value that determines whether to expand collapsed
         * nodes when the user clicks the node header.
         *
         * The default value for this property is **true**.
         *
         * When this property is set to **false**, users have to click the
         * expand/collapse icons to collapse the node.
         * Clicking the node header will select the node if it is not selected,
         * and will start editing the node if it is selected (and if the
         * {@link isReadOnly} property is set to false).
         *
         * See also the {@link collapseOnClick} property.
         */
        expandOnClick: boolean;
        /**
         * Gets or sets a value that determines whether to collapse expanded
         * nodes when the user clicks the node header.
         *
         * The default value for this property is **false**.
         *
         * When this property is set to **false**, users have to click the
         * expand/collapse icons to collapse the node.
         * Clicking the node header will select the node if it is not selected,
         * and will start editing the node if it is selected (and if the
         * {@link isReadOnly} property is set to false).
         *
         * See also the {@link expandOnClick} property.
         */
        collapseOnClick: boolean;
        /**
         * Gets or sets a value that determines whether to automatically expand the
         * first node when the tree is loaded.
         *
         * The default value for this property is **true**. If you set it to false,
         * all nodes will be initially collapsed.
         */
        expandOnLoad: boolean;
        /**
         * Gets or sets the data item that is currently selected.
         */
        selectedItem: any;
        /**
         * Gets or sets the {@link TreeNode} that is currently selected.
         */
        selectedNode: TreeNode;
        /**
         * Gets an array containing the text of all nodes from the root
         * to the currently selected node.
         */
        readonly selectedPath: string[];
        /**
         * Gets an array containing the items that are currently checked.
         *
         * The array returned includes only items that have no children.
         * This is because checkboxes in parent items are used to check
         * or uncheck the child items.
         *
         * See also the {@link showCheckboxes} property and the
         * {@link checkedItemsChanged} event.
         *
         * For example:
         *
         * ```typescript
         * import { TreeView } from '@grapecity/wijmo.nav';
         * var treeViewChk = new TreeView('#gsTreeViewChk', {
         *    displayMemberPath: 'header',
         *    childItemsPath: 'items',
         *    showCheckboxes: true,
         *    itemsSource: items,
         *    checkedItemsChanged: function (s, e) {
         *        var items = s.checkedItems,
         *            msg = '';
         *        if (items.length) {
         *            msg = '&lt;p&gt;&lt;b&gt;Selected Items:&lt;/b&gt;&lt;/p&gt;&lt;ol&gt;\r\n';
         *            for (var i = 0; i &lt; items.length; i++) {
         *                msg += '&lt;li&gt;' + items[i].header + '&lt;/li&gt;\r\n';
         *            }
         *            msg += '&lt;/ol&gt;';
         *        }
         *        document.getElementById('gsTreeViewChkStatus').innerHTML = msg;
         *    }
         * });
         * ```
         */
        checkedItems: any[];
        /**
         * Checks or unchecks all checkboxes on the tree.
         *
         * @param check Whether to check or uncheck all checkboxes.
         */
        checkAllItems(check: boolean): void;
        /**
         * Gets the total number of items in the tree.
         */
        readonly totalItemCount: number;
        /**
         * Gets or sets a function that loads child nodes on demand.
         *
         * The {@link lazyLoadFunction} takes two parameters: the node being
         * expanded and a callback to be invoked when the data becomes
         * available.
         *
         * The callback function tells the {@link TreeView} that the node
         * loading process has been completed. It should always be called,
         * even if there are errors when loading the data.
         *
         * For example:
         *
         * ```typescript
         * import { TreeView } from '@grapecity/wijmo.nav';
         * var treeViewLazyLoad = new TreeView('#treeViewLazyLoad', {
         *    displayMemberPath: 'header',
         *    childItemsPath: 'items',
         *    itemsSource: [ // start with three lazy-loaded nodes
         *        { header: 'Lazy Node 1', items: []},
         *        { header: 'Lazy Node 2', items: [] },
         *        { header: 'Lazy Node 3', items: [] }
         *    ],
         *    lazyLoadFunction: function (node, callback) {
         *        setTimeout(function () { // simulate http delay
         *            var result = [ // simulate result
         *                { header: 'Another lazy node...', items: [] },
         *                { header: 'A non-lazy node without children' },
         *                { header: 'A non-lazy node with child nodes', items: [
         *                  { header: 'hello' },
         *                  { header: 'world' }
         *                ]}
         *            ];
         *            callback(result); // return result to control
         *        }, 2500); // simulated 2.5 sec http delay
         *    }
         *});
         * ```
         *
         * Trees with lazy-loaded nodes have some restrictions: their nodes
         * may not have checkboxes (see the {@link showCheckboxes} property) and
         * the {@link collapseToLevel} method will not expand collapsed nodes
         * that have not been loaded yet.
         */
        lazyLoadFunction: ILazyLoad;
        /**
         * Gets a reference to the first {@link TreeNode} in the {@link TreeView}.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        getFirstNode(visible?: boolean, enabled?: boolean): TreeNode;
        /**
         * Gets a reference to the last {@link TreeNode} in the {@link TreeView}.
         *
         * @param visible Whether to return only visible nodes (whose ancestors are not collapsed).
         * @param enabled Whether to return only enabled nodes (whose ancestors are not disabled).
         */
        getLastNode(visible?: boolean, enabled?: boolean): TreeNode;
        /**
         * Gets an array of {@link TreeNode} objects representing the nodes
         * currently loaded.
         */
        readonly nodes: TreeNode[];
        /**
         * Gets the {@link TreeNode} object representing a given data item.
         *
         * @param item The data item to look for.
         */
        getNode(item: any): TreeNode;
        /**
         * Adds a child node at a specific position.
         *
         * @param index Index of the new child node.
         * @param dataItem Data item used to create the new node.
         * @return The {@link TreeNode} that was added.
         */
        addChildNode(index: number, dataItem: any): TreeNode;
        /**
         * Collapses all the tree items to a given level.
         *
         * This method will typically expand or collapse multiple nodes
         * at once. But it will not perform lazy-loading on any nodes,
         * so collapsed nodes that must be lazy-loaded will not be
         * expanded.
         *
         * @param level Maximum node level to show.
         */
        collapseToLevel(level: number): void;
        /**
         * Loads the tree using data from the current {@link itemsSource}.
         *
         * @param preserveOutlineState Whether to preserve the outline state when loading the
         * tree data. Defaults to false.
         */
        loadTree(preserveOutlineState?: boolean): void;
        /**
         * Occurs when the value of the {@link itemsSource} property changes.
         */
        readonly itemsSourceChanged: Event<TreeView, EventArgs>;
        /**
         * Raises the {@link itemsSourceChanged} event.
         */
        onItemsSourceChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs before the tree items are generated.
         */
        readonly loadingItems: Event<TreeView, CancelEventArgs>;
        /**
         * Raises the {@link loadingItems} event.
         * @return True if the event was not canceled.
         */
        onLoadingItems(e?: wijmo.CancelEventArgs): boolean;
        /**
         * Occurs after the tree items have been generated.
         */
        readonly loadedItems: Event<TreeView, EventArgs>;
        /**
         * Raises the {@link loadedItems} event.
         */
        onLoadedItems(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the user clicks an item or presses the Enter key and an item is selected.
         *
         * This event is typically used in navigation trees. Use the {@link selectedItem} property
         * to get the item that was clicked.
         */
        readonly itemClicked: Event<TreeView, EventArgs>;
        /**
         * Raises the {@link itemClicked} event.
         */
        onItemClicked(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the value of the {@link selectedItem} property changes.
         */
        readonly selectedItemChanged: Event<TreeView, EventArgs>;
        /**
         * Raises the {@link selectedItemChanged} event.
         */
        onSelectedItemChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs when the value of the {@link checkedItems} property changes.
         *
         * See also the {@link showCheckboxes} and {@link checkOnClick}
         * properties.
         */
        readonly checkedItemsChanged: Event<TreeView, EventArgs>;
        /**
         * Raises the {@link checkedItemsChanged} event.
         */
        onCheckedItemsChanged(e?: wijmo.EventArgs): void;
        /**
         * Occurs before the value of the {@link TreeNode.isCollapsed} property changes.
         */
        readonly isCollapsedChanging: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link isCollapsedChanging} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onIsCollapsedChanging(e: TreeNodeEventArgs): boolean;
        /**
         * Occurs after the value of the {@link TreeNode.isCollapsed} property changes.
         */
        readonly isCollapsedChanged: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link isCollapsedChanged} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         */
        onIsCollapsedChanged(e: TreeNodeEventArgs): void;
        /**
         * Occurs before the value of the {@link TreeNode.isChecked} property changes.
         */
        readonly isCheckedChanging: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link isCheckedChanging} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onIsCheckedChanging(e: TreeNodeEventArgs): boolean;
        /**
         * Occurs after the value of the {@link TreeNode.isChecked} property changes.
         */
        readonly isCheckedChanged: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link isCheckedChanged} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         */
        onIsCheckedChanged(e: TreeNodeEventArgs): void;
        /**
         * Occurs when an element representing a node has been created.
         *
         * This event can be used to format nodes for display.
         *
         * The example below uses the **formatItem** event to add a "new"
         * badge to the right of new items on the tree.
         *
         * ```typescript
         * import { TreeView } from '@grapecity/wijmo.nav';
         * var treeViewFmtItem = new TreeView('#treeViewFmtItem', {
         *     displayMemberPath: 'header',
         *     childItemsPath: 'items',
         *     itemsSource: items,
         *     formatItem: function (s, e) {
         *         if (e.dataItem.newItem) {
         *             e.element.innerHTML +=
         *                 '&lt;img style="margin-left:6px" src="resources/new.png"/&gt;';
         *         }
         *     }
         * });
         * ```
         */
        readonly formatItem: Event<TreeView, FormatNodeEventArgs>;
        /**
         * Raises the {@link formatItem} event.
         *
         * @param e {@link FormatNodeEventArgs} that contains the event data.
         */
        onFormatItem(e: FormatNodeEventArgs): void;
        /**
         * Occurs when the user starts dragging a node.
         *
         * This event only occurs if the {@link allowDragging} property is set to true.
         *
         * You may prevent nodes from being dragged by setting the event's
         * **cancel** parameter to true.
         */
        readonly dragStart: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link dragStart} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onDragStart(e: TreeNodeEventArgs): boolean;
        /**
         * Occurs while the user drags a node over other nodes on the {@link TreeView}.
         *
         * This event only occurs if the {@link allowDragging} property is set to true.
         *
         * You may prevent drop operations over certain nodes and/or positions by
         * setting the event's **cancel** parameter to true.
         */
        readonly dragOver: Event<TreeView, TreeNodeDragDropEventArgs>;
        /**
         * Raises the {@link dragOver} event.
         *
         * @param e {@link TreeNodeDragDropEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onDragOver(e: TreeNodeDragDropEventArgs): boolean;
        /**
         * Occurs when the user drops a on the {@link TreeView}.
         * @return True if the event was not canceled.
         */
        readonly drop: Event<TreeView, TreeNodeDragDropEventArgs>;
        /**
         * Raises the {@link drop} event.
         *
         * @param e {@link TreeNodeDragDropEventArgs} that contains the event data.
         */
        onDrop(e: TreeNodeDragDropEventArgs): boolean;
        /**
         * Occurs when the user finishes a drag/drop operation, either by dropping
         * a node into a new location or by canceling the operation with the mouse
         * or keyboard.
         */
        readonly dragEnd: Event<TreeView, EventArgs>;
        /**
         * Raises the {@link dragEnd} event.
         */
        onDragEnd(e?: wijmo.EventArgs): void;
        /**
         * Occurs before a {@link TreeNode} enters edit mode.
         */
        readonly nodeEditStarting: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link nodeEditStarting} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
        */
        onNodeEditStarting(e: TreeNodeEventArgs): boolean;
        /**
         * Occurs after a {@link TreeNode} has entered edit mode.
         */
        readonly nodeEditStarted: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link nodeEditStarted} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         */
        onNodeEditStarted(e: TreeNodeEventArgs): void;
        /**
         * Occurs before a {@link TreeNode} exits edit mode.
         */
        readonly nodeEditEnding: Event<TreeView, TreeNodeEventArgs>;
        /**
         * Raises the {@link nodeEditEnding} event.
         *
         * @param e {@link TreeNodeEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onNodeEditEnding(e: TreeNodeEventArgs): boolean;
        /**
         * Occurs after a {@link TreeNode} has exited edit mode.
         */
        readonly nodeEditEnded: Event<TreeView, TreeNodeEventArgs>;
        /**
        * Raises the {@link nodeEditEnded} event.
        *
        * @param e {@link TreeNodeEventArgs} that contains the event data.
        */
        onNodeEditEnded(e: TreeNodeEventArgs): void;
        /**
         * Overridden to re-populate the tree.
         *
         * @param fullUpdate Indicates whether to update the control layout as well as the content.
         */
        refresh(fullUpdate?: boolean): void;
        _updateFocus(oldNode: TreeNode): void;
        private _updateTabIndex;
        protected _setTabOrder(value: number): void;
        _raiseCheckedItemsChanged(): void;
        _reload(): void;
        _createNode(dataItem: any): TreeNode;
        private _mousedown;
        private _click;
        private _keydown;
        private _keypress;
        private _findNext;
        private _loadTree;
        private _addItem;
        private _collapseToLevel;
        _lazyLoadNode(node: TreeNode): void;
        private _lazyLoadCallback;
        private _lazyLoadNodeDone;
    }
}
declare module wijmo.nav {
    /**
     * Class that handles drag/drop operations for a {@link TreeView}.
     */
    class _TreeDragDropManager {
        private _tree;
        private _dragstartBnd;
        private _dragoverBnd;
        private _dragendBnd;
        private _dropBnd;
        private static _dMarker;
        private static _drgSrc;
        /**
         * Initializes a new instance of a {@link _TreeViewDragDropManager}.
         *
         * @param treeView {@link TreeView} managed by this {@link _TreeViewDragDropManager}.
         */
        constructor(treeView: TreeView);
        /**
         * Disposes of this {@link _TreeViewDragDropManager}
         */
        dispose(): void;
        private _dragstart;
        private _dragover;
        private _drop;
        private _dragend;
        private _keydown;
        private _handleDragDrop;
        private _showDragMarker;
    }
}
declare module wijmo.nav {
}
