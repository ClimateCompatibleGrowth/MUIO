import { DataModel } from "../../Classes/DataModelResult.Class.js";

export class Model {

    constructor(casename, genData, resData, RYTCMTsdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let years = genData['osy-years'];
            let cases = resData['osy-cases'];
            let cs = cases[0].Case;

            let RYTCMTsgrid = DataModel.RYTCMTsgrid(RYTCMTsdata);
            let RYTCMTschart = DataModel.RYTCMTschart(genData, RYTCMTsdata);
            
            let ActivityTechs = DataModel.RYTCMTsTechs(RYTCMTsdata);
            let ActivityComms = DataModel.RYTCMTsComms(RYTCMTsdata);

            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);
            let Timeslices = DataModel.Timeslices(genData);
            let mods = DataModel.Mods(genData)

            console.log('RYTCMTsdata ', RYTCMTsdata )
            console.log('DataModel.RYTCMTsgrid(RYTCMTsdata) ',DataModel.RYTCTs(RYTCMTsdata))
            console.log('RYTCMTsgrid ',RYTCMTsgrid)
            console.log('RYTCMTschart ',RYTCMTschart)

            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(Timeslices, function (id, ts) {
                datafieldsChart.push({ name: ts, type: 'number' });
                series.push({ dataField: ts, displayText: ts });
            });

            // datafields.push({ name: 'ScId', type: 'string' });
            // datafields.push({ name: 'Sc', type: 'string' });
            // datafields.push({ name: 'TechId', type: 'string' });
            datafields.push({ name: 'Tech', type: 'string' });
            // datafields.push({ name: 'CommId', type: 'string' });
            datafields.push({ name: 'Comm', type: 'string' });
            datafields.push({ name: 'Ts', type: 'string' });
            datafields.push({ name: 'MoId', type: 'string' });
            // datafields.push({ name: 'UnitId', type: 'string' });
            // datafields.push({ name: 'ScDesc', type: 'string' });
            // datafields.push({ name: 'TechDesc', type: 'string' });
            // datafields.push({ name: 'CommDesc', type: 'string' });

            // columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left' });
            columns.push({ text: 'Technology', datafield: 'Tech', pinned: true, editable: false, align: 'center' });
            columns.push({ text: 'Commodity', datafield: 'Comm', pinned: true, editable: false, align: 'center' });
            columns.push({ text: 'MoO', datafield: 'MoId', pinned: true, editable: false, align: 'center', cellsalign: 'center', maxwidth: '75' });
            columns.push({ text: 'Timeslice', datafield: 'Ts', pinned: true, editable: false, align: 'center', cellsalign: 'center', maxwidth: '75' });
            
            // columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center', cellclassname: cellclass });


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

            var srcGrid = {
                datatype: "json",
                localdata: RYTCMTsgrid[param][cs],
                //root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTCMTschart[param][cs][ActivityTechs[param][cs][0]][ActivityComms[param][cs][ActivityTechs[param][cs][0]][0]][mods[0]],
                //root: param + '>' + ActivityTechs[param][0]['TechId'] + '>' + ActivityComms[param][ActivityTechs[param][0]['TechId']][0]['CommId'] + '>' + mods[0],
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.cases = cases;
            this.case = cs;
            this.years = years;
            this.Timeslices = Timeslices;
            this.techs = ActivityTechs[param][cs];
            this.tech = ActivityTechs[param][cs][0];
            this.comms = ActivityComms[param][cs][this.tech];
            this.comm = ActivityComms[param][cs][this.tech][0]; 
            this.mods = mods;
            this.mod = mods[0];
            this.datafields = datafields;
            this.datafieldsChart = datafieldsChart;
            this.columns = columns;
            this.series = series;
            this.RYTCMTsdata = RYTCMTsdata;
            this.gridData = RYTCMTsgrid;
            this.chartData = RYTCMTschart;
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
            this.techIds = null;
            this.datafields = null;
            this.datafieldsChart = null;
            this.columns = null;
            this.series = null;
            this.RYTCMTsdata = null;
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