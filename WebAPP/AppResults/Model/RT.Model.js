import { DataModel } from "../../Classes/DataModelResult.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";

export class Model {

    constructor(casename, genData, resData, RTdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let techs = genData['osy-tech'];
            let cases = resData['osy-cases'];
            let cs = cases[0].Case;

            console.log('RTData ', RTdata)

            let RTgrid = DataModel.RTgrid( RTdata);

            console.log('RTgrid ', RTgrid)
            let RTchart = DataModel.RTchart(RTdata);
            console.log('RTchart ', RTchart)
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

            // $.each(scenarios, function (id, obj) {
            //     scClass[obj.ScenarioId] = 'SC_' + id;
            //     datafieldsChart.push({ name: obj.ScenarioId, type: 'number' });
            //     series.push({ dataField: obj.ScenarioId, displayText: obj.Scenario });
            // });

            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(techs, function (id, obj) {
                datafieldsChart.push({ name: obj.Tech, type: 'number' });
                series.push({ dataField: obj.Tech, displayText: obj.Tech });
            });

            datafields.push({ name: 'ScId', type: 'string' });
            datafields.push({ name: 'Sc', type: 'string' });
            datafields.push({ name: 'ParamId', type: 'string' });
            datafields.push({ name: 'Param', type: 'string' });
            datafields.push({ name: 'ScDesc', type: 'string' });


            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);


            // columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left', minWidth: 75 }); // minWidth: 75, maxWidth: 150,
            //columns.push({ text: 'Parameter', datafield: 'Param', pinned: true, editable: false, align: 'left', minWidth: 200 });

            let techIds = [];
            $.each(techs, function (id, tech) {
                techIds.push(tech.TechId);
                datafields.push({ name: tech.Tech, type: 'number' });
                columns.push({
                    //text: tech.Tech + ' <small  style="color:darkgrey">[ ' + techUnit[param][tech.TechId] + ' ]</small>', datafield: tech.TechId, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    text: tech.Tech, datafield: tech.Tech, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    cellsrenderer: cellsrenderer
                });
            });

            let srcGrid = {
                datatype: "json",
                localdata: RTgrid[param][cs],
                //root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RTchart[param][cs],
                //root: param,
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.param = param;
            //this.years = years;
            this.cases = cases;
            this.case = cs;
            this.techs = techs;
            this.techIds = techIds;
            this.techsCount = techs.length
            this.techUnit = techUnit;

            this.columns = columns;
            this.series = series;
            this.gridData = RTgrid;
            this.chartData = RTchart;
            this.genData = genData;
            this.param = param;
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