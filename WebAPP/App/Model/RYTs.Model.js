import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYTsdata, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if(casename){    
            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
            let years = genData['osy-years'];

            datafields.push({ name: 'YearSplit', type:'string' });        
            columns.push({ text: 'Timeslice', datafield: 'YearSplit', pinned:true, editable: false, align: 'center',  minWidth: 120, maxWidth: 200 })
            
            let validation = function(cell, value) {
                if (value < 0) {
                    return { result: false, message: 'Value must be positive!' };
                }else{
                    return true;
                }
            }

            let cellsrenderer = function(row, columnfield, value, defaulthtml, columnproperties) {
                var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
            }.bind(this);
        
            let initeditor = function(row, cellvalue, editor) {
                editor.jqxNumberInput({ decimalDigits: 4 });
            }

            $.each(years, function (id, year) {
                datafields.push({ name: year, type:'number' });
                columns.push({ text: year, datafield: year,  cellsalign: 'right',  align: 'center', columntype: 'numberinput', cellsformat: 'd2', 
                // initeditor: initeditor,
                validation: validation,
                cellsrenderer: cellsrenderer
             });
            });

            
            datafieldsChart.push({ name: 'Year', type:'string' });
            $.each(RYTsdata[param], function (id, obj) {
                datafieldsChart.push({ name: obj.YearSplit, type:'number' });
                series.push({ dataField: obj.YearSplit, displayText: obj.YearSplit });
            });

            let RYTsgrid = RYTsdata            
            let RYTschart = DataModel.RYTschart(genData, RYTsdata);

            let srcGrid = {
                datatype: "json",
                root: param,
                localdata: RYTsgrid,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                root: param,
                localdata: RYTschart,
                datafields: datafieldsChart,
            };

            this.casename = casename; 
            this.years = years;
            this.datafields = datafields; 
            this.datafieldsChart = datafieldsChart; 
            this.columns = columns;
            this.series = series;
            this.gridData = RYTsgrid;
            this.chartData = RYTschart;
            this.genData = genData;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.param = param
        }else{
            this.casename = null; 
            this.years = null;
            this.datafields = null; 
            this.datafieldsChart = null; 
            this.columns = null;
            this.columns = null;
            this.gridData = null;
            this.chartData = null;
            this.genData = null; 
            this.srcGrid = null;
            this.srcChart = null;
            this.param = param
        }

    }
}