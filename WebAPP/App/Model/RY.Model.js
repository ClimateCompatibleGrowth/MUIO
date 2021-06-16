import { DataModel } from "../../Classes/DataModel.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";

export class Model {
    
    constructor (casename, genData, RYdata, group, PARAMETERS, param) {

        

        this.d = 2;
        this.decimal = 'd' + this.d;

        if(casename){

            // console.log('model param ', param)


            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
            let years = genData['osy-years'];
            //let techs = genData['osy-tech'];

            datafields.push({ name: 'param', type:'string' });        

            columns.push({ text: 'Parameter', datafield: 'param', pinned:true, editable: false, align: 'left',  minWidth: 120, maxWidth: 200 })
            
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

            let PARAMNAMES = {};
            $.each(PARAMETERS[group], function (id, obj) {
                PARAMNAMES[obj.id] = obj.value;
            });

            datafieldsChart.push({ name: 'Year', type:'string' });
            datafieldsChart.push({ name: 'param', type:'number' });
            series.push({ dataField: 'param', displayText: PARAMNAMES[param] });


            let RYgrid = DataModel.RYgrid(genData, RYdata);
            let RYchart = DataModel.RYchart(genData, RYdata);

            // console.log('RYdata ', RYdata)
            // console.log('RYchart ', RYchart)

            let srcGrid = {
                datatype: "json",
                localdata: RYgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYchart,
                root: param,
                datafields: datafieldsChart,
            };

            this.casename = casename; 
            this.years = years;
            this.columns = columns;
            this.series = series;
            this.gridData = RYgrid;
            this.chartData = RYchart;
            this.genData = genData;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid,
            this.srcChart = srcChart,
            this.PARAMETERS = PARAMETERS
        }else{
            this.casename = null; 
            this.years = null;
            this.columns = null;
            this.series = null;
            this.gridData = null;
            this.chartData = null;
            this.genData = null; 
            this.PARAMNAMES = null;
            this.param = param;
            this.group = group;
            this.srcGrid = srcGrid
            this.srcChart = srcChartm
            this.PARAMETERS = PARAMETERS
        }

    }
}