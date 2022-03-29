import { DataModel } from "../../Classes/DataModel.Class.js";
import { DataModelResult } from "../../Classes/DataModelResult.Class.js";

export class Model {

    constructor(casename, genData, resData, RYTMdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let years = genData['osy-years'];
            let techs = genData['osy-tech'];
            let mo = genData['osy-mo'];
            let cases = resData['osy-cases'];
            let cs = cases[0].Case;

            let RYTMgrid = DataModelResult.RYTMgrid(RYTMdata, genData, PARAMETERS);
            let RYTMchart = DataModelResult.RYTMchart(genData, RYTMdata);            
            let mods = DataModel.Mods(genData);
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);

            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(techs, function (id, obj) {
                datafieldsChart.push({ name: obj.Tech, type: 'number' });
                series.push({ dataField: obj.Tech, displayText: obj.Tech });
            });

            // datafields.push({ name: 'ScId', type: 'string' });
            // datafields.push({ name: 'Sc', type: 'string' });
            // datafields.push({ name: 'TechId', type: 'string' });
            datafields.push({ name: 'Tech', type: 'string' });
            datafields.push({ name: 'MoId', type: 'string' });
            datafields.push({ name: 'UnitId', type: 'string' });
            // datafields.push({ name: 'ScDesc', type: 'string' });
            datafields.push({ name: 'TechDesc', type: 'string' });


            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);


            //columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left' });
            columns.push({ text: 'Technology', datafield: 'Tech', pinned: true, editable: false, align: 'center' });
            columns.push({ text: 'MoO', datafield: 'MoId', pinned: true, editable: false, align: 'center', cellsalign: 'center' });
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center' });

            $.each(years, function (id, year) {
                datafields.push({ name: year, type: 'number' });
                columns.push({
                    text: year, datafield: year, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    cellsrenderer: cellsrenderer
                });
            });

            var srcGrid = {
                datatype: "json",
                localdata: RYTMgrid[param][cs],
                //root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTMchart[param][cs][1],
                //root: param + '>' + techs[0]['TechId'] + '>' + mods[0],
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.years = years;
            this.techs = techs;
            this.mods = mods;
            this.mod = mods[0];
            this.cases = cases;
            this.case = cs;
            this.datafields = datafields;
            this.datafieldsChart = datafieldsChart;
            this.columns = columns;
            this.series = series;
            this.gridData = RYTMgrid;
            this.chartData = RYTMchart;
            this.genData = genData;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.PARAMETERS = PARAMETERS;
        } else {
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