import { DataModel } from "../../Classes/DataModel.Class.js";
import { DataModelResult } from "../../Classes/DataModelResult.Class.js";

export class Model {

    constructor(casename, genData, resData, RYTCdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let years = genData['osy-years'];
            let comms = genData['osy-comm'];
            let cases = resData['osy-cases'];
            let cs = cases[0].Case;

            let RYTCgrid = DataModelResult.RYTCgrid( RYTCdata, genData, PARAMETERS);            
            let RYTCchart = DataModelResult.RYTCchart(genData, RYTCdata);
            //let RYTCchartAll = DataModel.RYTCchartAll(genData, RYTCdata);
            let ActivityTechs = DataModelResult.RYTCTechs(RYTCdata);
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);

            console.log('RYTCgrid ', RYTCgrid)
            console.log('RYTCchart ', RYTCchart)

            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(comms, function (id, obj) {
                datafieldsChart.push({ name: obj.Comm, type: 'number' });
                series.push({ dataField: obj.Comm, displayText: obj.Comm });
            });


            // datafields.push({ name: 'ScId', type: 'string' });
            // datafields.push({ name: 'Sc', type: 'string' });
            // datafields.push({ name: 'TechId', type: 'string' });
            datafields.push({ name: 'Tech', type: 'string' });
            // datafields.push({ name: 'CommId', type: 'string' });
            datafields.push({ name: 'Comm', type: 'string' });
            // datafields.push({ name: 'ScDesc', type: 'string' });
            datafields.push({ name: 'TechDesc', type: 'string' });
            datafields.push({ name: 'CommDesc', type: 'string' });

            //columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left' });
            columns.push({ text: 'Technology', datafield: 'Tech', pinned: true, editable: false, align: 'center' })
            columns.push({ text: 'Commodity', datafield: 'Comm', pinned: true, editable: false, align: 'center' })

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

            // console.log('RYTCchart ', RYTCchart)
            // console.log('RYTCchartAll ', RYTCchartAll)
            // console.log('ActivityTechs[param][0] ', ActivityTechs[param])
            // console.log('RYTCgrid[param][cs] ', RYTCgrid[param][cs])
            // console.log('RYTCchart[param][cs][ActivityTechs[param][0][Tech]] ', RYTCchart[param][cs][ActivityTechs[param][0]['Tech']])

            var srcGrid = {
                datatype: "json",
                localdata: RYTCgrid[param][cs],
                //root: param,
                datafields: datafields,
            };


            var srcChart = {
                datatype: "json",
                localdata: RYTCchart[param][cs][ActivityTechs[param][cs][0]],
                //root: param + '>' + ActivityTechs[param][0]['Tech'] + '>' + ActivityComms[param][ActivityTechs[param][0]['Tech']][0]['Comm'],
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.cases = cases;
            this.case = cs;
            this.years = years;
            this.techs = ActivityTechs;
            this.tech = ActivityTechs[param][cs][0];
            this.datafields = datafields;
            this.datafieldsChart = datafieldsChart;
            this.columns = columns;
            this.series = series;
            this.RYTCdata = RYTCdata;
            this.gridData = RYTCgrid;
            this.chartData = RYTCchart;
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
            this.scenarios = null;
            this.scenariosCount = null;
            this.techs = null;
            this.comms = null;
            this.datafields = null;
            this.datafieldsChart = null;
            this.columns = null;
            this.series = null;
            this.RYTCdata = null;
            this.gridData = null;
            this.chartData = null;
            this.genData = null;
            this.param = null;
            this.PARAMNAMES = null;
            this.group = group;
            this.srcGrid = null;
            this.srcChart = null;
            this.PARAMETERS = null;
        }

    }
}