import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYTEdata, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if(casename){

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
        
            let RYTEgrid = DataModel.RYTEgrid(genData, RYTEdata);
            let RYTEchart = DataModel.RYTEchart(genData, RYTEdata);
            let years = genData['osy-years'];
            let emis = genData['osy-emis'];
            let techs = genData['osy-tech'];

            datafields.push({ name: 'TechId', type:'string' });
            datafields.push({ name: 'Tech', type:'string' });
            datafields.push({ name: 'EmisId', type:'string' });
            datafields.push({ name: 'Emis', type:'string' });            

            columns.push({ text: 'Technology', datafield: 'Tech', pinned:true, editable: false, align: 'center',  minWidth: 90, maxWidth: 200 })
            columns.push({ text: 'Emission', datafield: 'Emis', pinned:true, editable: false, align: 'center',  minWidth: 900, maxWidth: 200 })
            

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
            $.each(emis, function (id, obj) {
                datafieldsChart.push({ name: obj.EmisId, type:'number' });
                series.push({ dataField: obj.EmisId, displayText: obj.Emis });
            });

            let EmissionTechs = []
            $.each(techs, function (id, obj) {
                if (obj.EAR.length != 0 ) {
                    EmissionTechs.push(obj);
                }
            });

            var srcGrid = {
                datatype: "json",
                localdata: RYTEgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTEchart,
                root: param + '>' + techs[0]['TechId'],
                datafields: datafieldsChart,
            };
            
            this.casename = casename; 
            this.years = years;
            this.techs = EmissionTechs;
            this.datafields = datafields; 
            this.datafieldsChart = datafieldsChart; 
            this.columns = columns;
            this.series = series;
            this.gridData = RYTEgrid;
            this.chartData = RYTEchart;
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