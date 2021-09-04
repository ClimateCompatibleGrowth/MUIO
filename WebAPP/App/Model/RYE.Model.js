import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYEdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if(casename){

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
            let years = genData['osy-years'];
            let emis = genData['osy-emis'];
            let scenarios = genData['osy-scenarios'];

            let scClass = {};

            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);
            let RYEgrid = DataModel.RYEgrid(genData, RYEdata, PARAMETERS);
            let RYEchart = DataModel.RYEchart(genData, RYEdata);

            datafieldsChart.push({ name: 'Year', type:'string' });
            $.each(scenarios, function (id, obj) {
                scClass[obj.ScenarioId] = 'SC_'+id;
                datafieldsChart.push({ name: obj.ScenarioId, type:'number' });
                series.push({ dataField: obj.ScenarioId, displayText: obj.Scenario});
            });

            datafields.push({ name: 'ScId', type:'string' });
            datafields.push({ name: 'Sc', type:'string' }); 
            datafields.push({ name: 'EmisId', type:'string' });
            datafields.push({ name: 'Emis', type:'string' });    
            datafields.push({ name: 'UnitId', type:'string' });  
            datafields.push({ name: 'ScDesc', type:'string' }); 
            datafields.push({ name: 'EmiDesc', type:'string' });      

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

            let initeditor = function(row, cellvalue, editor, data) {
                editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: true, allowNull: true   }); //symbol: ' GWh', symbolPosition: 'right'

                var scId = $('#osy-gridRYE').jqxGrid('getcellvalue', row, 'ScId');
                if (scId !== 'SC_0'){
                    $('#' + editor[0].id + ' input').keydown(function (event) {
                        if (event.keyCode === 46 || event.keyCode === 8 ) {
                            $('#' + editor[0].id).val(null);
                        }
                    })
                }

            }.bind(this);

            columns.push({ text: 'Scenario', datafield: 'Sc', pinned:true, editable: false, align: 'left',   cellclassname: cellclass }); // minWidth: 75, maxWidth: 150,
            columns.push({ text: 'Emission', datafield: 'Emis', pinned:true, editable: false, align: 'left',   cellclassname: cellclass });
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned:true, editable: false, align: 'center',cellsalign: 'center', cellclassname: cellclass});

            $.each(years, function (id, year) {
                datafields.push({ name: year, type:'number' });
                columns.push({ text: year, datafield: year,  cellsalign: 'right',  align: 'center', columntype: 'numberinput', cellsformat: 'd2', 
                groupable:false,
                initeditor: initeditor,
                validation: validation,
                cellsrenderer: cellsrenderer,
                cellclassname: cellclass
             });
            });

            // console.log('RYEdata prije ', RYEdata)
            console.log('RYEgrid ', RYEgrid)
            // console.log('RYEdata poslije ', RYEdata)
            // console.log('RYEchart ', RYEchart)
            // console.log('series ', series)

            let srcGrid = {
                datatype: "json",
                localdata: RYEgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYEchart,
                root: param+ '>' + emis[0]['EmisId'],
                datafields: datafieldsChart,
            };

            this.casename = casename; 
            this.years = years;
            this.emis = emis;
            this.scenarios = scenarios;
            this.scenariosCount = scenarios.length;
            this.columns = columns;
            this.series = series;
            this.gridData = RYEgrid;
            this.chartData = RYEchart;
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