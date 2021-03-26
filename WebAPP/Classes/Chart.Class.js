export class Chart {
    static theme() {
        let theme = "bootstrap";
        return theme
    }
    static Chart($div, dataAdapter, unit, series ) {

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
                            return  data.displayText + ' ' + parseFloat(value).toFixed(2);
                        },
    
                        formatSettings:
                        {
                            thousandsSeparator: ',',
                            decimalPlaces: 2,
                            sufix: ' ' ,
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
                                sufix: ' ' ,
                            },
                        },
                        formatFunction: 
                            function (value, index, data) { 
                                //console.log(data, index)
                                if (value > 0) {
                                    return  parseFloat(value).toFixed(2) + ' ' + data.displayText;
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
}