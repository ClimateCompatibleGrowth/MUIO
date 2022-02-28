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
declare module wijmo.undo {
    /**
     * Base class for undoable actions.
     */
    class UndoableAction {
        protected _target: any;
        protected _oldState: any;
        protected _newState: any;
        protected _actions: UndoableAction[];
        /**
         * Initializes a new instance of an {@link UndoableAction}.
         *
         * @param target Object that the action applies to.
         */
        constructor(target: any);
        /**
         * Undoes the action.
         */
        undo(): void;
        /**
         * Redoes the action.
         */
        redo(): void;
        /**
         * Closes the action by saving the new state.
         * Returns true if the new state is different from the old state.
         */
        close(): boolean;
        /**
         * Applies a given state to the target object.
         * @param state State to apply to the target object.
         */
        applyState(state: any): void;
        /**
         * Gets a value that determines whether a given action should
         * be added as a child action or as a new independent action.
         *
         * @param action {@link UndoableAction} to add to this action's
         * child action list.
         */
        shouldAddAsChildAction(action: UndoableAction): boolean;
        /**
         * Adds a child action to this action's child list.
         *
         * @param action {@link UndoableAction} to add to this action's
         * child action list.
         */
        addChildAction(action: UndoableAction): void;
        /**
         * Gets a reference to the action's target object.
         */
        readonly target: any;
    }
}
declare module wijmo.undo {
    class _UndoStackHTML {
        static addTarget(stack: UndoStack, target: HTMLElement): boolean;
        private static _addInputElement;
        private static _addTextAreaElement;
        private static _addSelectElement;
        private static _getLabel;
    }
    class InputChangeAction extends UndoableAction {
        _focus: boolean;
        constructor(e: any);
        close(): boolean;
        applyState(state: any): void;
    }
    class CheckboxClickAction extends UndoableAction {
        constructor(e: MouseEvent);
        applyState(state: any): void;
    }
    class RadioClickAction extends UndoableAction {
        constructor(e: any);
        close(): boolean;
        applyState(state: any): void;
        _getState(): Element;
    }
}
declare module wijmo.undo {
    /**
     * Class that provides undo/redo functionality for
     * input elements and Wijmo controls.
     */
    class UndoStack {
        static _evtInput: any;
        _autoKbd: boolean;
        _disabled: boolean;
        _undoing: boolean;
        _stack: UndoableAction[];
        _maxActions: number;
        _pendingAction: UndoableAction;
        _ptr: number;
        /**
         * Initializes a new instance of the {@link UndoStack} class.
         *
         * @param target The DOM element or CSS selector for the DOM elements to be added to
         * {@link UndoStack} context. If not provided, the whole document body is added to
         * the context.
         * @param options The JavaScript object containing initialization data for the
         * {@link UndoStack}.
         */
        constructor(target?: any, options?: any);
        /**
         * Adds an undo/redo target to the {@link UndoStack} context.
         *
         * @param target Query selector or element to add to the {@link UndoStack} context.
         */
        addTarget(target: any): boolean;
        /**
         * Gets or sets a value that determines whether the {@link UndoStack}
         * should monitor the keyboard and handle the undo/redo keys (ctrl+Z/ctrl+Y)
         * automatically.
         */
        autoKeyboard: boolean;
        /**
         * Gets or sets a vlue that determines whether the {@link UndoStack} is currently disabled.
         */
        isDisabled: boolean;
        /**
         * Gets or sets the maximum number of actions to store in the {@link UndoStack}.
         *
         * The default value for this property is **1,000** actions.
         */
        maxActions: number;
        /**
         * Gets the number of actions currently stored in the {@link UndoStack}.
         */
        readonly actionCount: number;
        /**
         * Gets a value that determines whether the {@link UndoStack} is ready to undo an action.
         */
        readonly canUndo: boolean;
        /**
         * Gets a value that determines whether the {@link UndoStack} is ready to redo an action.
         */
        readonly canRedo: boolean;
        /**
         * Undoes the last action recorded.
         */
        undo(): void;
        /**
         * Redoes the last action undone.
         */
        redo(): void;
        /**
         * Clears the {@link UndoStack}.
         */
        clear(): void;
        /**
         * Pushes a new undoable action onto the stack.
         *
         * @param action {@link UndoableAction} to add to the stack.
         */
        pushAction(action: UndoableAction): void;
        /**
         * Occurs when an element is about to be added to the {@link UndoStack} context.
         *
         * Listeners may prevent the element from being added to the context
         * by setting the cancel parameter to true.
         */
        readonly addingTarget: Event<UndoStack, AddTargetEventArgs>;
        /**
         * Raises the {@link addingTarget} event.
         *
         * @param e {@link AddTargetEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onAddingTarget(e: AddTargetEventArgs): boolean;
        /**
         * Occurs after an element has been added to the {@link UndoStack} context.
         */
        readonly addedTarget: Event<UndoStack, AddTargetEventArgs>;
        /**
         * Raises the {link @addedTarget} event.
         *
         * @param e {@link AddTargetEventArgs} that contains the event data.
         */
        onAddedTarget(e: AddTargetEventArgs): void;
        /**
         * Occurs when an {@link UndoableAction} is about to be added to the stack.
         */
        readonly addingAction: Event<UndoStack, UndoActionEventArgs>;
        /**
         * Raises the {@link addingAction} event.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onAddingAction(e: UndoActionEventArgs): boolean;
        /**
         * Occurs after an {@link UndoableAction} had been added to the stack.
         */
        readonly addedAction: Event<UndoStack, UndoActionEventArgs>;
        /**
         * Raises the {@link addedAction} event.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         */
        onAddedAction(e: UndoActionEventArgs): void;
        /**
         * Occurs when an {@link UndoableAction} is about to be undone.
         */
        readonly undoingAction: Event<UndoStack, UndoActionEventArgs>;
        /**
         * Raises the {@link undoingAction} event.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onUndoingAction(e: UndoActionEventArgs): boolean;
        /**
         * Occurs after an {@link UndoableAction} has been undone.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         */
        readonly undoneAction: Event<UndoStack, UndoActionEventArgs>;
        /**
         * Raises the {@link undoneAction} event.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         */
        onUndoneAction(e: UndoActionEventArgs): void;
        /**
         * Occurs when an {@link UndoableAction} is about to be redone.
         */
        readonly redoingAction: Event<UndoStack, UndoActionEventArgs>;
        /**
         * Raises the {@link redoingAction} event.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         * @return True if the event was not canceled.
         */
        onRedoingAction(e: UndoActionEventArgs): boolean;
        /**
         * Occurs after an {@link UndoableAction} has been redone.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         */
        readonly redoneAction: Event<UndoStack, UndoActionEventArgs>;
        /**
         * Raises the {@link redoneAction} event.
         *
         * @param e {@link UndoActionEventArgs} that contains the event data.
         */
        onRedoneAction(e: UndoActionEventArgs): void;
        /**
         * Occurs when the state of the {@link UndoStack} changes.
         *
         * Use this event to update UI elements that reflect the state of the
         * {@link UndoStack}. For example, to enable or disable undo/redo buttons.
         */
        readonly stateChanged: Event<UndoStack, EventArgs>;
        /**
         * Raises the {@link stateChanged} event.
         */
        onStateChanged(): void;
        pushPendingAction(): void;
    }
    /**
     * Provides arguments for the {@link UndoStack.addingTarget} and {@link UndoStack.addedTarget}
     * events.
     */
    class AddTargetEventArgs extends wijmo.CancelEventArgs {
        _target: HTMLElement;
        /**
         * Initializes a new instance of the {@link AddTargetEventArgs} class.
         *
         * @param target HTMLElement being added to the {@link UndoStack} context.
         */
        constructor(target: HTMLElement);
        /**
         * Gets a reference to the HTMLElement being added to the {@link UndoStack} context.
         */
        readonly target: HTMLElement;
    }
    /**
     * Provides arguments for the {@link UndoStack.undoingAction}, {@link UndoStack.undoneAction},
     * {@link UndoStack.redoingAction}, and {@link UndoStack.redoneAction} events.
     */
    class UndoActionEventArgs extends wijmo.CancelEventArgs {
        _action: UndoableAction;
        /**
         * Initializes a new instance of the {@link AddTargetEventArgs} class.
         *
         * @param action {@link UndoableAction} being added to the {@link UndoStack}.
         */
        constructor(action: UndoableAction);
        /**
         * Gets a reference to the {@link UndoableAction} that this event refers to.
         */
        readonly action: UndoableAction;
    }
}
declare module wijmo.undo {
    function softInput(): typeof wijmo.input;
    function softGrid(): typeof wijmo.grid;
    function softGauge(): typeof wijmo.gauge;
    function softNav(): typeof wijmo.nav;
}
declare module wijmo.undo {
    class _UndoStackWijmo {
        static addTarget(stack: UndoStack, ctl: wijmo.Control): boolean;
        private static _isInputControl;
        private static _addInputControl;
        private static _addGauge;
        private static _addTreeView;
        private static _addFlexGrid;
    }
}
declare module wijmo.undo {
}
