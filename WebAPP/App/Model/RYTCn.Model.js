import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYTCndata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if(casename){

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
        
            let years = genData['osy-years'];
            let constraints = genData['osy-constraints'];
            let scenarios = genData['osy-scenarios'];

            let RYTCngrid = DataModel.RYTCngrid(genData, RYTCndata);
            let RYTCnchart = DataModel.RYTCnchart(genData, RYTCndata);
            let techIds = DataModel.TechId(genData);
            let conId = DataModel.ConId(genData);
            let constraintsMC = DataModel.constraintsCM(constraints);
            let ConstraintTechs = DataModel.constraintTechs(genData)
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);

            // console.log('RYTCndata model ', RYTCndata)
            // console.log('constraintsMC ', constraintsMC)
            // console.log('ConstraintTechs ', ConstraintTechs)
            console.log('RYTCngrid ', RYTCngrid)
            // console.log('RYTCnchart ', RYTCnchart)
            // console.log('param ', param)


            let scClass = {};

            datafieldsChart.push({ name: 'Year', type:'string' });
            $.each(scenarios, function (id, obj) {
                scClass[obj.ScenarioId] = 'SC_'+id;
                datafieldsChart.push({ name: obj.ScenarioId, type:'number' });
                series.push({ dataField: obj.ScenarioId, displayText: obj.Scenario});
            });

            datafields.push({ name: 'ScId', type:'string' });
            datafields.push({ name: 'Sc', type:'string' }); 

            datafields.push({ name: 'TechId', type:'string' });
            datafields.push({ name: 'Tech', type:'string' });
            datafields.push({ name: 'ConId', type:'string' });
            datafields.push({ name: 'Con', type:'string' });     
            datafields.push({ name: 'ScDesc', type:'string' });  
            datafields.push({ name: 'TechDesc', type:'string' });    
            datafields.push({ name: 'ConDesc', type:'string' });          

            columns.push({ text: 'Scenario', datafield: 'Sc', pinned:true, editable: false, align: 'left' });
            columns.push({ text: 'Technology', datafield: 'Tech', pinned:true, editable: false, align: 'center' })
            columns.push({ text: 'Constraint', datafield: 'Con', pinned:true, editable: false, align: 'center' })
            

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

                var scId = $('#osy-gridRYTCn').jqxGrid('getcellvalue', row, 'ScId');
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


            var srcGrid = {
                datatype: "json",
                localdata: RYTCngrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTCnchart,
                root: param + '>' +  ConstraintTechs[ constraintsMC[0]['ConId'] ][0]['TechId'] + '>' + constraintsMC[0]['ConId'],
                datafields: datafieldsChart,
            };
            
            this.casename = casename; 
            this.years = years;
            this.techs = ConstraintTechs ;
            this.techIds = techIds;
            this.conId = conId;
            this.cons = constraintsMC;
            this.scenarios = scenarios;
            this.scenariosCount = scenarios.length;
            this.datafields = datafields; 
            this.datafieldsChart = datafieldsChart; 
            this.columns = columns;
            this.series = series;
            this.gridData = RYTCngrid;
            this.chartData = RYTCnchart;
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
            this.techs = null;
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
            this.PARAMETERS = PARAMETERS;
        }
    }
}