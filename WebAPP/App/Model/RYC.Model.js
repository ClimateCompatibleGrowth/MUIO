import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYCdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if(casename){

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
            let years = genData['osy-years'];
            let comms = genData['osy-comm'];
            let scenarios = genData['osy-scenarios'];

            let scClass = {};

            datafieldsChart.push({ name: 'Year', type:'string' });
            $.each(scenarios, function (id, obj) {
                scClass[obj.ScenarioId] = 'SC_'+id;
                datafieldsChart.push({ name: obj.ScenarioId, type:'number' });
                series.push({ dataField: obj.ScenarioId, displayText: obj.Scenario});
            });

            datafields.push({ name: 'ScId', type:'string' });
            datafields.push({ name: 'Sc', type:'string' }); 
            datafields.push({ name: 'CommId', type:'string' });
            datafields.push({ name: 'Comm', type:'string' });           

            let validation = function(cell, value) {
                if (value < 0) {
                    return { result: false, message: 'Value must be positive!' };
                }else{
                    return true;
                }
            }

            var cellclass = function (row, columnfield, value, data) {
                return scClass[data.ScId];
            }

            let cellsrenderer = function(row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === ''){
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                }else{
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);
        
            let initeditor1 = function(row, cellvalue, editor) {
                editor.jqxNumberInput({ decimalDigits: this.d });
            }.bind(this);

            let initeditor = function(row, cellvalue, editor, data) {
                editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: true, allowNull: true   }); //symbol: ' GWh', symbolPosition: 'right'

                var scId = $('#osy-gridRYC').jqxGrid('getcellvalue', row, 'ScId');
                if (scId !== 'SC_0'){
                    $('#' + editor[0].id + ' input').keydown(function (event) {
                        if (event.keyCode === 46 || event.keyCode === 8 ) {
                            $('#' + editor[0].id).val(null);
                        }
                    })
                }

            }.bind(this);

            columns.push({ text: 'Scenario', datafield: 'Sc', pinned:true, editable: false, align: 'left',   cellclassname: cellclass }); // minWidth: 75, maxWidth: 150,
            columns.push({ text: 'Commodity', datafield: 'Comm', pinned:true, editable: false, align: 'left',   cellclassname: cellclass });

            $.each(years, function (id, year) {
                datafields.push({ name: year, type:'number' });
                columns.push({ text: year, datafield: year,  cellsalign: 'right',  align: 'center', columntype: 'numberinput', cellsformat: 'd2', 
                initeditor: initeditor,
                validation: validation,
                cellsrenderer: cellsrenderer,
                cellclassname: cellclass
             });
            });

            // datafieldsChart.push({ name: 'Year', type:'string' });
            // $.each(comms, function (id, obj) {
            //     datafieldsChart.push({ name: obj.CommId, type:'number' });
            //     series.push({ dataField: obj.CommId, displayText: obj.Comm });
            // });

            let PARAMNAMES = {};
            $.each(PARAMETERS[group], function (id, obj) {
                PARAMNAMES[obj.id] = obj.value;
            });

            let RYCgrid = DataModel.RYCgrid(genData, RYCdata);
            let RYCchart = DataModel.RYCchart(genData, RYCdata);

            // console.log('RYCdata ', RYCdata)
            // console.log('RYCgrid ', RYCgrid)
            // console.log('RYCchart ', RYCchart)
            // console.log('series ', series)

            let srcGrid = {
                datatype: "json",
                localdata: RYCgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYCchart,
                root: param+ '>' + comms[0]['CommId'],
                datafields: datafieldsChart,
            };

            this.casename = casename; 
            this.years = years;
            this.comms = comms;
            this.scenarios = scenarios;
            this.scenariosCount = scenarios.length;
            this.columns = columns;
            this.series = series;
            this.gridData = RYCgrid;
            this.chartData = RYCchart;
            this.genData = genData;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.PARAMETERS = PARAMETERS;
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
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.PARAMETERS = PARAMETERS;
        }

    }
}