import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYCTsdata, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;

        if(casename){

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
            let RYCTsgrid = DataModel.RYCTsgrid(genData, RYCTsdata);
            let RYCTschart = DataModel.RYCTschart(genData, RYCTsdata);
            let years = genData['osy-years'];
            let comms = genData['osy-comm'];
            let timeslices = DataModel.Timeslices(genData);  

            datafields.push({ name: 'CommId', type:'string' });
            datafields.push({ name: 'Comm', type:'string' });
            datafields.push({ name: 'Timeslice', type:'string' });           

            columns.push({ text: 'Commodity', datafield: 'Comm', pinned:true, editable: false, align: 'center',  minWidth: 90, maxWidth: 200 })
            columns.push({ text: 'Timeslice', datafield: 'Timeslice', pinned:true, editable: false, align: 'center',  minWidth: 90, maxWidth: 200 })
            
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
                    //initeditor: initeditor,
                    validation: validation,
                    cellsrenderer: cellsrenderer
                });
            });

            datafieldsChart.push({ name: 'Year', type:'string' });
            $.each(timeslices, function (id, obj) {
                datafieldsChart.push({ name: obj, type:'number' });
                series.push({ dataField: obj, displayText: obj });
            });
            
            var srcGrid = {
                datatype: "json",
                localdata: RYCTsgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYCTschart,
                root: param + '>' + comms[0]['CommId'],
                datafields: datafieldsChart,
            };
            
            this.casename = casename; 
            this.years = years;
            this.comms = comms;
            this.datafields = datafields; 
            this.datafieldsChart = datafieldsChart; 
            this.columns = columns;
            this.series = series;
            this.gridData = RYCTsgrid;
            this.chartData = RYCTschart;
            this.genData = genData;
            this.defaultParam = param;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
        }else{
            this.casename = null; 
            this.years = null;
            this.comms = null;
            this.datafields = null; 
            this.datafieldsChart = null; 
            this.columns = null;
            this.columns = null;
            this.gridData = null;
            this.chartData = null;
            this.genData = null; 
            this.defaultParam = param;
            this.srcGrid = null;
            this.srcChart = null;
        }

    }
}