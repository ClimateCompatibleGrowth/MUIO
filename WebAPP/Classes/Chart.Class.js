import { SIMTYPE } from './Const.Class.js';

export class Chart {
    static theme() {
        let theme = "bootstrap";
        return theme
    }
    static chartRYT($div, dataAdapter, unit, series ) {

        var settings = {
            title: "",
            description: "",
            theme: this.theme(),
            enableAnimations: true,
            showLegend: true,
            padding: { left: 10, top: 5, right: 10, bottom: 5 },
            titlePadding: { left: 10, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            enableCrosshairs: true,
            crosshairsDashStyle: '2,2',
            crosshairsLineWidth: 1.0,
            crosshairsColor: '#888888',
            borderLineColor: 'transparent',
            xAxis:
            {
                dataField: 'Year',
                type: 'basic',
                valuesOnTicks: true,
                labels: 'Years',
                // {
                //     formatFunction: function (value) {
                //         return value.getDate();
                //     }
                // }
            },
            valueAxis:
            {
                // unitInterval: 500,
                minValue: 0,
                maxValue: 'auto',
                title: {text: 'Installed power [MW]'},
                displayValueAxis: true,
                description:  "",
                axisSize: 'auto',
            },
            colorScheme: 'scheme09',
            seriesGroups:
                [
            
                    {
                        type: 'column',
                        valuesOnTicks: false,
                        columnsGapPercent:10,
                        seriesGapPercent: 5,
                        columnsMaxWidth:100,
                        columnsMinWidth:5,
                        toolTipFormatFunction: function (value, index, data, d) {
                            return  data.displayText + ' ' + parseFloat(value).toFixed(2) + ' ' + unit;
                        },
    
                        formatSettings:
                        {
                            thousandsSeparator: ',',
                            decimalPlaces: 2,
                            sufix: ' ' +unit,
                        },
    
                        labels: {
                            visible: false,
                            verticalAlignment: 'center',
                            offset: { x: 0, y: 0 },
                            angle: 0,
                            formatSettings:
                            {
                                thousandsSeparator: ',',
                                decimalPlaces: 2,
                                sufix: ' ' +unit,
                            },
                        },
                        formatFunction: 
                            function (value, index, data) { 
                                if (value > 0) {
                                    return  parseFloat(value).toFixed(2) + ' ' + unit;
                                }else{
                                    return '';
                                }   
                            },
                        series: series
                        // [
                        //     { dataField: 'SearchNonPaid', displayText: 'Desktop Search' },
                        //     { dataField: 'SearchPaid', displayText: 'Mobile Search' },
                        //     { dataField: 'Referral', displayText: 'Social media' }
                        // ]
                    }
                ]
        };
        $div.jqxChart(settings);
    }

    //////////////////////////////////////////////////ELSE
    static initChart2() {
        // prepare the data
        //     var source =
        // {
        //     datatype: "csv",
        //     datafields: [
        //             { name: 'Date' },
        //             { name: 'S&P 500' },
        //             { name: 'NASDAQ' }
        //     ],
        //     url: '../../sampledata/nasdaq_vs_sp500.txt'
        // };

        // var dataAdapter = new $.jqx.dataAdapter(source, { async: false, autoBind: true, loadError: function (xhr, status, error) { alert('Error loading "' + source.url + '" : ' + error); } });
        // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var source =
        {
            dataType: "csv",
            dataFields: [
                { name: 'Hour', type: 'number' },
                { name: 'Solar', type: 'number' },
                { name: 'Hydro', type: 'number' },
                { name: 'Wind', type: 'number' },
                { name: 'Demand', type: 'number' }
            ],
            url: '../DataStorage/DEMO CASE BIH/hData2.csv'
        };

        var dataAdapter = new $.jqx.dataAdapter(source);

        // prepare jqxChart settings
        var settings={
            title: "Hourly data",
            description: "",
            enableAnimations: true,
            showLegend: true,
            animationDuration: 1500,
            enableCrosshairs: true,
            padding: { left: 10, top: 5, right: 10, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            xAxis:
            {
                dataField: 'Hour',
                type: 'basic',
                //baseUnit: 'month',
                unitInterval: 720,
                valuesOnTicks: true,
                minValue: 3650,
                maxValue: 4150,
                labels: {
                    formatFunction: function (value) {
                        //return months[value.getMonth()];
                        return value+" h";
                    }
                },
                // toolTipFormatFunction: function (value) {
                //     return value.getDate() + '-' + months[value.getMonth()] + '-' + value.getFullYear();
                // },
                // tickMarks: { visible: true, unitInterval: 1 },
                // gridLines: { visible: true, unitInterval: 3 },
                
                rangeSelector: {
                    serieType: 'line',
                    gridLinesInterval: 720, 
                    unitInterval: 720,
                    padding: { /*left: 0, right: 0,*/ top: 10, bottom: 0 },
                    // Uncomment the line below to render the selector in a separate container
                    //renderTo: $('#selectorContainer'),
                    backgroundColor: "#E1E1E6",
                    size: 90,
                    gridLines: {visible: true},
                }
            },
            colorScheme: 'scheme04',
            seriesGroups:
            [
                {
                    type: 'line',
                    valueAxis:
                    {
                        unitInterval: 500,
                        visible: true,
                        title: { text: 'Daily Closing Price' }
                    },
                    series: [
                            { dataField: 'Solar', displayText: 'Solar' },
                            { dataField: 'Wind', displayText: 'Wind' }
                    ]
                }
            ]
       };

        // setup the chart
        $('#osy-chart').jqxChart(settings);
    }

    static initChart($div, dataAdapter, series, simType='true') {
        var settings = {
            title: "",
            description: "",
            enableAnimations: true,
            showLegend: true,
            animationDuration: 1500,
            enableCrosshairs: true,
            padding: { left: 10, top: 5, right: 10, bottom: 5 },
            titlePadding: { left: 90, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            borderLineColor: 'transparent',
            xAxis:
            {
                dataField: 'Hour',
                type: 'basic',
                //baseUnit: 'month',
                minValue: SIMTYPE[simType].minValue,
                maxValue: SIMTYPE[simType].maxValue,
                gridLinesInterval: SIMTYPE[simType].gridLinesInterval, 
                flip: false,
                labels: {
                    formatFunction: function (value) {
                        //return months[value.getMonth()];
                        return value+" h";
                    }
                },
                // toolTipFormatFunction: function (value) {
                //     return value.getDate() + '-' + months[value.getMonth()] + '-' + value.getFullYear();
                // },
                // tickMarks: { visible: true, unitInterval: 1 },
                // gridLines: { visible: true, unitInterval: 3 },
                
                rangeSelector: {
                    serieType: 'line',
            
                    gridLinesInterval: SIMTYPE[simType].gridLinesInterval, 
                    unitInterval: SIMTYPE[simType].unitInterval,
                    padding: { /*left: 0, right: 0,*/ top: 10, bottom: 0 },
                    // Uncomment the line below to render the selector in a separate container
                    //renderTo: $('#selectorContainer'),
                    backgroundColor: "#E1E1E6",
                    size: 55,
                    gridLines: {visible: true},
                }
            },
            colorScheme: 'scheme04',
            seriesGroups:
            [
                {
                    type: 'line',
                    valueAxis:
                    {
                        //unitInterval: 500,
                        //visible: true,
                        title: { text: 'MW' }
                    },
                    series: series
                    // [
                    //         { dataField: 'Solar', displayText: 'Solar',lineWidth: 1 },
                    //         { dataField: 'Wind', displayText: 'Wind', lineWidth: 1 },
                    //         { dataField: 'Hydro', displayText: 'Hydro', lineWidth: 1 },
                    //         { dataField: 'Demand', displayText: 'Demand', lineWidth: 1 }
                    // ]
                }
            ]
        };

        // setup the chart
        $div.jqxChart(settings);
    }

    static configChart($div, dataAdapter, series ) {

        var settings = {
            title: "",
            description: "",
            enableAnimations: true,
            showLegend: false,
            padding: { left: 10, top: 5, right: 10, bottom: 5 },
            titlePadding: { left: 10, top: 0, right: 0, bottom: 10 },
            source: dataAdapter,
            enableCrosshairs: true,
            crosshairsDashStyle: '2,2',
            crosshairsLineWidth: 1.0,
            crosshairsColor: '#888888',
            borderLineColor: 'transparent',
            xAxis:
            {
                dataField: 'Year',
                type: 'basic',
                valuesOnTicks: true,
                labels: 'Years',
                // {
                //     formatFunction: function (value) {
                //         return value.getDate();
                //     }
                // }
            },
            valueAxis:
            {
                // unitInterval: 500,
                minValue: 0,
                maxValue: 'auto',
                title: {text: 'Installed power [MW]'},
                displayValueAxis: true,
                description:  '/MWh',
                axisSize: 'auto',
            },
            colorScheme: 'scheme09',
            seriesGroups:
                [
                    {
                        type: 'stackedsteparea',
                        series: series
                        // [
                        //     { dataField: 'SearchNonPaid', displayText: 'Desktop Search' },
                        //     { dataField: 'SearchPaid', displayText: 'Mobile Search' },
                        //     { dataField: 'Referral', displayText: 'Social media' }
                        // ]
                    }
                ]
        };
        $div.jqxChart(settings);
    }
}