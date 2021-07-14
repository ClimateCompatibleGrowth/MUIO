import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYCTsdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;

        if(casename){

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);   
            let RYCTsgrid = DataModel.RYCTsgrid(genData, RYCTsdata, PARAMETERS);
            let RYCTschart = DataModel.RYCTschart(genData, RYCTsdata);
            let timeslices = DataModel.Timeslices(genData);  

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
            datafields.push({ name: 'Timeslice', type:'string' });      
            datafields.push({ name: 'UnitId', type:'string' });     

            columns.push({ text: 'Scenario', datafield: 'Sc', pinned:true, editable: false, align: 'left' });
            columns.push({ text: 'Commodity', datafield: 'Comm', pinned:true, editable: false, align: 'center'});
            columns.push({ text: 'Timeslice', datafield: 'Timeslice', pinned:true, editable: false, align: 'center' });
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned:true, editable: false, align: 'center',cellsalign: 'center', cellclassname: cellclass});
            
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

                var scId = $('#osy-gridRYCTs').jqxGrid('getcellvalue', row, 'ScId');
                if (scId !== 'SC_0'){
                    $('#' + editor[0].id + ' input').keydown(function (event) {
                        if (event.keyCode === 46 || event.keyCode === 8 ) {
                            $('#' + editor[0].id).val(null);
                        }
                    })
                }
            }.bind(this);

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
            
            // console.log('RYCTsdata ', RYCTsdata)
            // console.log('RYCTsgrid ', RYCTsgrid)
            // console.log('RYCTschart ', RYCTschart)
            // console.log('series ', series)

            var srcGrid = {
                datatype: "json",
                localdata: RYCTsgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYCTschart,
                root: param + '>' + comms[0]['CommId']+ '>' + timeslices[0],
                datafields: datafieldsChart,
            };
            
            this.casename = casename; 
            this.years = years;
            this.comms = comms;
            this.timeslices = timeslices;
            this.scenarios = scenarios;
            this.scenariosCount = scenarios.length;
            this.datafields = datafields; 
            this.datafieldsChart = datafieldsChart; 
            this.columns = columns;
            this.series = series;
            this.gridData = RYCTsgrid;
            this.chartData = RYCTschart;
            this.genData = genData;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.PARAMETERS = PARAMETERS
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
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = null;
            this.srcChart = null;
            this.PARAMETERS = PARAMETERS
        }

    }
}