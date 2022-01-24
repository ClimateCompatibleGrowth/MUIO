import { DataModel } from "../../Classes/DataModel.Class.js";
import { DataModelResult } from "../../Classes/DataModelResult.Class.js";

export class Model {

    constructor(casename, genData, resData, RYTTsdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let years = genData['osy-years'];
            let techs = genData['osy-tech'];
            let tech = techs[0]['Tech'];
            // let scenarios = genData['osy-scenarios'];
            let cases = resData['osy-cases'];
            let cs = cases[0].Case;

            let RYTTsgrid = DataModelResult.RYTTsgrid(RYTTsdata, genData, PARAMETERS);
            let RYTTschart = DataModelResult.RYTTschart(genData, RYTTsdata);
            let timeslices = DataModel.Timeslices(genData);
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);
            let techName = DataModel.TechName(genData);

            // console.log('RYTTsgrid ', RYTTsgrid)
            // console.log('RYTTschart ', RYTTschart)
            
            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(timeslices, function (id, ts) {
                datafieldsChart.push({ name: ts, type: 'number' });
                series.push({ dataField: ts, displayText: ts });
            });

            // datafields.push({ name: 'ScId', type: 'string' });
            // datafields.push({ name: 'Sc', type: 'string' });
            // datafields.push({ name: 'TechId', type: 'string' });
            datafields.push({ name: 'Tech', type: 'string' });
            datafields.push({ name: 'UnitId', type: 'string' });
            datafields.push({ name: 'TechDesc', type: 'string' });
            datafields.push({ name: 'Ts', type: 'string' });

            //columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left' });
            columns.push({ text: 'Technology', datafield: 'Tech', pinned: true, editable: false, align: 'center' })
            columns.push({ text: 'Timeslice', datafield: 'Ts', pinned: true, editable: false, align: 'center' });
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center' });

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);

            $.each(years, function (id, year) {
                datafields.push({ name: year, type: 'number' });
                columns.push({
                    text: year, datafield: year, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    cellsrenderer: cellsrenderer
                });
            });

            // let PARAMNAMES = {};
            // $.each(PARAMETERS[group], function (id, obj) {
            //     PARAMNAMES[obj.id] = obj.value;
            // });

            var srcGrid = {
                datatype: "json",
                localdata: RYTTsgrid[param][cs],
                //root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTTschart[param][cs][tech],
                //root: param + '>' + techs[0]['TechId'] + '>' + timeslices[0],
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.years = years;
            this.techs = techs;
            this.tech = tech;
            this.techName = techName;
            this.cases = cases;
            this.case = cs;
            this.timeslices = timeslices;
            this.datafields = datafields;
            this.datafieldsChart = datafieldsChart;
            this.columns = columns;
            this.series = series;
            this.gridData = RYTTsgrid;
            this.chartData = RYTTschart;
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