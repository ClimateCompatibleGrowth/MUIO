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
declare module wijmo.grid.cellmaker {
    /**
     * Specifies parameters used to create cell elements.
     */
    interface ICellMakerOptions {
        /** Template string used to set the element's CSS class names. */
        cssClass?: string;
        /** Template string used to set the element's "aria-label" attribute. */
        label?: string;
        /** Object with attributes to apply to the cell content element. */
        attributes?: object;
        /** Function to be executed when the element is clicked. */
        click?: ICellMakerClickHandler;
    }
    /**
     * Defines a handler for click events on custom cell content.
     */
    interface ICellMakerClickHandler {
        /**
         * @param e <b>MouseEvent</b> that contains information about the click event.
         * @param ctx {@link ICellTemplateContext} that contains information about the
         * custom cell that was clicked.
         */
        (e: MouseEvent, ctx: wijmo.grid.ICellTemplateContext): void;
    }
    /**
     * Specifies parameters used to create cell buttons with the
     * {@link CellMaker.makeButton} method.
     */
    interface IButtonOptions extends ICellMakerOptions {
        /** Template string used to set the element's display text. */
        text?: string;
    }
    /**
     * Specifies parameters used to create cell hyperlinks with the
     * {@link CellMaker.makeLink} method.
     */
    interface ILinkOptions extends IButtonOptions {
        /** Template string used to set the link's <b>href</b> attribute. */
        href?: string;
    }
    /**
     * Specifies parameters used to create rating cells with the
     * {@link CellMaker.makeRating} method.
     */
    interface IRatingOptions extends ICellMakerOptions {
        /**
         * Range of the rating values, expressed as an array with two numbers
         * (minimum and maximum ratings).
         *
         * The default value for this option is [0, 5].
         */
        range?: number[];
        /**
         * Whether to show symbols for zero ratings.
         *
         * The default value for this option is false, which causes the zero
         * symbol not to be displayed. Users may still click the area to the
         * left of the first symbol to give the cell a zero rating.
         */
        showZeros?: boolean;
    }
    /**
     * Specifies constants that define Sparkline types.
     */
    enum SparklineType {
        /** A mini line chart. */
        Line = 0,
        /** A mini column chart. */
        Column = 1,
        /** A mini column chart that shows only three values: positive, negative, and zero. */
        WinLoss = 2
    }
    /**
     * Specifies constants that define Sparkline markers.
     */
    enum SparklineMarkers {
        /** No markers. */
        None = 0,
        /** Add marker to first point. */
        First = 1,
        /** Add marker to last point. */
        Last = 2,
        /** Add marker to highest-value points. */
        High = 4,
        /** Add marker to lowest-value points. */
        Low = 8,
        /** Add marker to negative-value points. */
        Negative = 16
    }
    /**
     * Specifies parameters used to create Sparkline cells with the
     * {@link CellMaker.makeSparkline} method.
     */
    interface ISparkLineOptions extends ICellMakerOptions {
        /**
         * Type of Sparkline to create.
         *
         * The default type is {@link SparklineType.Line}.
         */
        type?: SparklineType;
        /**
         * Markers to add to Sparkline points.
         */
        markers?: SparklineMarkers;
        /**
         * Base value (position of the Y-axis) on a sparkline.
         *
         * Setting this value to null causes the chart to calculate the base value
         * automatically so the chart fills the vertical extent of the cell.
         * This is a good option to highlight relative changes, and is used by
         * default for Sparklines of type {@link SparklineType.Line}.
         *
         * Setting this value to an absolute number (like zero) is a better option
         * to show absolute changes, and is used by default for Sparklines of type
         * {@link SparklineType.Column}.
         */
        baseValue?: number;
        /**
         * Maximum number of points to use in the sparkline or sparkbar.
         *
         * Setting this value to null causes the cell to show all points.
         */
        maxPoints?: number;
    }
    interface _IScaledValues {
        min: number;
        max: number;
        base: number;
        points: number[];
        data: number[];
    }
    /**
     * Provides methods for creating cells with custom content such as
     * Buttons, Hyperlinks, Images, Ratings, and Sparklines.
     *
     * To use these methods, assign their result to a column's
     * {@link Column.cellTemplate} property.
     */
    class CellMaker {
        static _WJC_CellMaker: string;
        /**
         * Creates a cell template with a button.
         *
         * By default, the button displays the cell's bound text in it.
         * If you want to show a fixed string, set the <b>options.text</b>
         * property to the string you want to show.
         *
         * For example, the code below defines a column with button elements.
         * All buttons show the same text ('Click Me') and show an alert when
         * clicked:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columns: [
         *         { binding: 'id', header: 'ID', isReadOnly: true },
         *         {
         *             binding: 'country',
         *             header: 'My Buttons',
         *             cellTemplate: CellMaker.makeButton({
         *                 text: 'Click Me', // override bound text
         *                 click: (e: MouseEvent, ctx: ICellTemplateContext) => {
         *                     alert('Clicked Button ** ' + ctx.item.country + ' **')
         *                 }
         *             })
         *         }
         *     ]
         * });
         * ```
         *
         * To avoid disrupting the regular tab navigation, the button's
         * **tabindex** attribute is set to -1 by default.
         *
         * If you want to include the buttons in the tab navigation,
         * use the **attributes** option to set their **tabindex**
         * attribute to zero. For example:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columns: [
         *         { binding: 'id', header: 'ID', isReadOnly: true },
         *         {
         *             binding: 'country',
         *             header: 'My Buttons',
         *             cellTemplate: CellMaker.makeButton({
         *                 text: 'Click Me', // override bound text
         *                 click: (e: MouseEvent, ctx: ICellTemplateContext) => {
         *                     alert('Clicked Button ** ' + ctx.item.country + ' **')
         *                 },
         *                 attributes: {
         *                     tabindex: 0 // make button a tab stop
         *                 }
         *             })
         *         }
         *     ]
         * });
         * ```
         *
         * For details on links and button elements, please visit
         * https://css-tricks.com/a-complete-guide-to-links-and-buttons/.
         *
         * @param options {@link IButtonOptions} object containing parameters for the button.
         * @returns An {@link ICellTemplateFunction} to be assigned to a column's {@link Column.cellTemplate} property.
         */
        static makeButton(options?: IButtonOptions): wijmo.grid.ICellTemplateFunction;
        /**
         * Creates a cell template with a hyperlink.
         *
         * By default, the link displays the cell's bound text in it.
         * If you want to show a fixed string, set the <b>options.text</b>
         * property to the string you want to show.
         *
         * For example, the code below defines a column with hyperlink elements.
         * The links show some custom text and link to a url from the cell's
         * data item:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columns: [
         *         { binding: 'id', header: 'ID', isReadOnly: true },
         *         {
         *             binding: 'country',
         *             header: 'My Links',
         *             cellTemplate: CellMaker.makeLink({
         *                 text: 'Visit ${item.country}', // override bound text
         *                 href: '${item.url}', // bound link destination
         *                 attributes: {
         *                     tabindex: 0 // make hyperlink a tab stop
         *                 }
         *             })
         *         }
         *     ]
         * });
         * ```
         *
         * To avoid disrupting the regular tab navigation, the hyperlink's
         * **tabindex** attribute is set to -1 by default.
         *
         * If you want to include the hyperlinks in the tab navigation,
         * use the **attributes** option to set their **tabindex**
         * attribute to zero. For example:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columns: [
         *         { binding: 'id', header: 'ID', isReadOnly: true },
         *         {
         *             binding: 'country',
         *             header: 'My Links',
         *             cellTemplate: CellMaker.makeLink({
         *                 text: 'Visit ${item.country}', // override bound text
         *                 href: '${item.url}', // bound link destination
         *                 // no need for click handler, the link navigates automatically
         *             })
         *         }
         *     ]
         * });
         * ```
         *
         * For details on links and button elements, please visit
         * https://css-tricks.com/a-complete-guide-to-links-and-buttons/.
         *
         * @param options {@link ILinkOptions} object containing parameters for the hyperlink.
         * @returns An {@link ICellTemplateFunction} to be assigned to a column's {@link Column.cellTemplate} property.
         */
        static makeLink(options?: ILinkOptions): wijmo.grid.ICellTemplateFunction;
        /**
         * Creates a cell template with a sparkline.
         *
         * The cell should be bound to an array of numbers to be shown as a
         * mini line chart.
         *
         * For example, the code below defines a column with sparklines
         * showing the content of the 'history' array in the cell's data item.
         * You may customize the appearance of the sparklines using CSS:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columns: [
         *         { binding: 'id', header: 'ID', isReadOnly: true },
         *         {
         *             binding: 'history',
         *             header: 'History Sparklines',
         *             width: 175,
         *             cellTemplate: CellMaker.makeSparkline({
         *                 markers: SparklineMarkers.High | SparklineMarkers.Low, // add markers
         *                 maxPoints: 25, // limit number of points
         *                 label: '${item.country} sales history line chart', // accessibility
         *             })
         *         }
         *     ]
         * });
         * ```
         * @param options {@link ISparkLineOptions} object containing parameters for the Sparkline.
         * It should include the <b>label</b> property for accessibility.
         * @returns An {@link ICellTemplateFunction} to be assigned to a column's {@link Column.cellTemplate} property.
         */
        static makeSparkline(options?: ISparkLineOptions): wijmo.grid.ICellTemplateFunction;
        /**
         * Creates a cell template with an image.
         *
         * The cell should be bound to a string containing an image URL.
         *
         * For example, the code below defines a column with images located
         * at urls specified by the 'img' member of the data items:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columns: [
         *         { binding: 'id', header: 'ID', isReadOnly: true },
         *         {
         *             binding: 'img',
         *             header: 'Images',
         *             cssClass: 'cell-img',
         *             cellTemplate: CellMaker.makeImage({
         *                 label: 'image for ${item.country}', // accessibility
         *                 click: (e, ctx) => alert('Clicked image for ' + ctx.item.country)
         *             })
         *         }
         *     ]
         * });
         * ```
         * @param options {@link ICellMakerOptions} object containing parameters for the image.
         * It should include the <b>label</b> property for accessibility.
         * @returns An {@link ICellTemplateFunction} to be assigned to a column's {@link Column.cellTemplate} property.
         */
        static makeImage(options?: ICellMakerOptions): wijmo.grid.ICellTemplateFunction;
        /**
         * Creates a cell template to show and edit a rating value.
         *
         * The cell should be bound to a string containing a number that
         * represents a rating.
         *
         * By default, cells show ratings as stars. You may customize
         * the appearance of rating cells using CSS.
         *
         * For example, the code below defines a column with stars that
         * show the 'rating' member of the data items.
         * Since the column is not read-only, users may edit the ratings
         * using the keyboard or the mouse:
         *
         * ```typescript
         * new FlexGrid('#theGrid', {
         *     autoGenerateColumns: false,
         *     columns: [
         *         { binding: 'id', header: 'ID', isReadOnly: true },
         *         {
         *             binding: 'rating',
         *             header: 'Rating (editable)',
         *             width: 220,
         *             align: 'center',
         *             cellTemplate: CellMaker.makeRating({
         *                 range: [0, 5], // rating values between 0 and 5
         *                 label: 'Edit Product Rating'
         *             })
         *        }
         *     ]
         * });
         * ```
         * @param options {@link IRatingOptions} object containing parameters for the rating cell.
         * @returns An {@link ICellTemplateFunction} to be assigned to a column's {@link Column.cellTemplate} property.
         */
        static makeRating(options?: IRatingOptions): wijmo.grid.ICellTemplateFunction;
        static _getOptionText(options: any, option: string, ctx: wijmo.grid.ICellTemplateContext, defVal?: string): string;
        static _createElement(cell: HTMLElement, html: string, options: ICellMakerOptions, ctx: wijmo.grid.ICellTemplateContext): HTMLElement;
        static _cloneContext(ctx: wijmo.grid.ICellTemplateContext): wijmo.grid.ICellTemplateContext;
        static _handleClick(e: MouseEvent): void;
        static _getSparkline(data: number[], options: ISparkLineOptions): string;
        static _scaleValues(data: number[], baseVal: number, maxPoints: number): _IScaledValues;
        static _getMarkers(markers: SparklineMarkers, values: _IScaledValues, index: number): string;
    }
}
declare module wijmo.grid.cellmaker {
}
