import { DataModel } from "../../Classes/DataModel.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";

export class Model {

    constructor(casename, genData, RTdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let techs = genData['osy-tech'];
            let scenarios = genData['osy-scenarios'];
            this.param = param;

            this.param = param;

            let RTgrid = DataModel.RTgrid(genData, RTdata, PARAMETERS);
            let RTchart = DataModel.RTchart(genData, RTdata);
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);

            let techUnit = {};;
            $.each(RTgrid, function (paramId, array) {
                techUnit[paramId] = {};
                $.each(array, function (id, obj) {
                    $.each(techs, function (idT, tech) {
                        techUnit[paramId][tech.TechId] = obj[tech.TechId + '_UnitId'];
                    });
                });
            });

            let scClass = {};

            //datafieldsChart.push({ name: 'TechId', type:'string' });
            datafieldsChart.push({ name: 'Tech', type: 'string' });

            $.each(scenarios, function (id, obj) {
                scClass[obj.ScenarioId] = 'SC_' + id;
                datafieldsChart.push({ name: obj.ScenarioId, type: 'number' });
                series.push({ dataField: obj.ScenarioId, displayText: obj.Scenario });
            });

            datafields.push({ name: 'ScId', type: 'string' });
            datafields.push({ name: 'Sc', type: 'string' });
            datafields.push({ name: 'ParamId', type: 'string' });
            datafields.push({ name: 'Param', type: 'string' });
            datafields.push({ name: 'ScDesc', type: 'string' });

            let validation = function (cell, value) {
                if (['TMPAL', 'TMPAU'].includes(this.param)){
                    return true;
                }else{
                    if (value < 0) {
                        return { result: false, message: 'Value must be positive!' };
                    } else {
                        return true;
                    }
                }
            }.bind(this);

            var cellclass = function (row, columnfield, value, data) {
                return scClass[data.ScId];
            }

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);

            let initeditor = function (row, cellvalue, editor, data) {
                editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: true, allowNull: true }); //symbol: ' GWh', symbolPosition: 'right'
                var scId = $('#osy-gridRT').jqxGrid('getcellvalue', row, 'ScId');
                if (scId !== 'SC_0') {
                    $('#' + editor[0].id + ' input').keydown(function (event) {
                        if (event.keyCode === 46 || event.keyCode === 8) {
                            $('#' + editor[0].id).val(null);
                        }
                    })
                }

            }.bind(this);

            columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left', cellclassname: cellclass, minWidth: 75 }); // minWidth: 75, maxWidth: 150,
            columns.push({ text: 'Parameter', datafield: 'Param', pinned: true, editable: false, align: 'left', cellclassname: cellclass, minWidth: 200 });

            let techIds = [];
            $.each(techs, function (id, tech) {
                techIds.push(tech.TechId);
                datafields.push({ name: tech['TechId'], type: 'number' });
                columns.push({
                    text: tech.Tech + ' <small  style="color:darkgrey">[ ' + techUnit[param][tech.TechId] + ' ]</small>', datafield: tech.TechId, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    initeditor: initeditor,
                    validation: validation,
                    cellsrenderer: cellsrenderer,
                    cellclassname: cellclass
                });
            });

            let srcGrid = {
                datatype: "json",
                localdata: RTgrid,
                root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RTchart,
                root: param,
                datafields: datafieldsChart,
            };

            this.casename = casename;
            // this.param = param;
            //this.years = years;
            this.techs = techs;
            this.techIds = techIds;
            this.techsCount = techs.length
            this.techUnit = techUnit;
            this.scenarios = scenarios;
            this.scenariosCount = scenarios.length;
            this.columns = columns;
            this.series = series;
            this.gridData = RTgrid;
            this.chartData = RTchart;
            this.genData = genData;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid,
                this.srcChart = srcChart,
                this.PARAMETERS = PARAMETERS
        } else {
            this.casename = null;
            this.years = null;
            this.techs = null;
            // this.datafields = null; 
            // this.datafieldsChart = null; 
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