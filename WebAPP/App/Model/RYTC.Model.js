import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYTCdata, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if(casename){

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
            let RYTCgrid = DataModel.RYTCgrid(genData, RYTCdata);
            let RYTCchart = DataModel.RYTCchart(genData, RYTCdata);
            let years = genData['osy-years'];
            let comms = genData['osy-comm'];
            let techs = genData['osy-tech'];

            datafields.push({ name: 'TechId', type:'string' });
            datafields.push({ name: 'Tech', type:'string' });
            datafields.push({ name: 'CommId', type:'string' });
            datafields.push({ name: 'Comm', type:'string' });            

            columns.push({ text: 'Technology', datafield: 'Tech', pinned:true, editable: false, align: 'center',  minWidth: 90, maxWidth: 200 })
            columns.push({ text: 'Commodity', datafield: 'Comm', pinned:true, editable: false, align: 'center',  minWidth: 900, maxWidth: 200 })
            

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
            $.each(comms, function (id, obj) {
                datafieldsChart.push({ name: obj.CommId, type:'number' });
                series.push({ dataField: obj.CommId, displayText: obj.Comm });
            });

            let ActivityTechs = []
            $.each(techs, function (id, obj) {
                if (obj.IAR.length != 0 || obj.OAR.length != 0) {
                    ActivityTechs.push(obj);
                }
            });

            var srcGrid = {
                datatype: "json",
                localdata: RYTCgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTCchart,
                root: param + '>' + techs[0]['TechId'],
                datafields: datafieldsChart,
            };
            
            this.casename = casename; 
            this.years = years;
            this.techs = ActivityTechs;
            this.datafields = datafields; 
            this.datafieldsChart = datafieldsChart; 
            this.columns = columns;
            this.series = series;
            this.gridData = RYTCgrid;
            this.chartData = RYTCchart;
            this.genData = genData;
            this.defaultParam = param;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
        }else{
            this.casename = null; 
            this.years = null;
            this.techs = null;
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