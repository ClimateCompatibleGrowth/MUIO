import { DataModelResult } from "../../Classes/DataModelResult.Class.js";
import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {

    constructor(casename, genData, resData, VARIABLES, DATA, VIEW) {
        let group = 'RYT';
        let param = 'ANC';

        //console.log('VARIABLES ', VARIABLES)

        let VARGROUPS = DataModelResult.getVarById(VARIABLES);
        let VARIABLEOBJECT = DataModelResult.getVarialblesObject(VARIABLES);
        let VARNAMES = DataModel.AllParamName(VARIABLES);
        let pivotData = DataModelResult.getPivot(DATA, genData, VARIABLES, group, param);
        //let VIEWS = DataModelResult.getViews(VIEW['osy-views']);

        //console.log('VARGROUPS ', VARGROUPS)

        let VIEWS = DataModelResult.getAllViews(VIEW['osy-views']);

        let ChartTypes = [
            { name: 'Column', value: wijmo.olap.PivotChartType.Column },
            { name: 'Bar', value: wijmo.olap.PivotChartType.Bar },
            { name: 'Scatter', value: wijmo.olap.PivotChartType.Scatter },
            { name: 'Line', value: wijmo.olap.PivotChartType.Line },
            { name: 'Area', value: wijmo.olap.PivotChartType.Area },
            { name: 'Pie', value: wijmo.olap.PivotChartType.Pie },
        ];

        var colorSchemes = 
        { scheme01: ['#307DD7', '#AA4643', '#89A54E', '#71588F', '#4198AF'] ,
        scheme02: ['#7FD13B', '#EA157A', '#FEB80A', '#00ADDC', '#738AC8'] ,
        scheme03: ['#E8601A', '#FF9639', '#F5BD6A', '#599994', '#115D6E'] ,
        scheme04: ['#D02841', '#FF7C41', '#FFC051', '#5B5F4D', '#364651'] ,
        scheme05: ['#25A0DA', '#309B46', '#8EBC00', '#FF7515', '#FFAE00'] ,
        scheme06: ['#0A3A4A', '#196674', '#33A6B2', '#9AC836', '#D0E64B'] ,
        scheme07: ['#CC6B32', '#FFAB48', '#FFE7AD', '#A7C9AE', '#888A63'] ,
        scheme08: ['#3F3943', '#01A2A6', '#29D9C2', '#BDF271', '#FFFFA6'] ,
        scheme09: ['#1B2B32', '#37646F', '#A3ABAF', '#E1E7E8', '#B22E2F'] ,
        scheme10: ['#5A4B53', '#9C3C58', '#DE2B5B', '#D86A41', '#D2A825'] ,
        scheme11: ['#993144', '#FFA257', '#CCA56A', '#ADA072', '#949681'] ,
        scheme12: ['#105B63', '#EEEAC5', '#FFD34E', '#DB9E36', '#BD4932'] ,
        scheme13: ['#BBEBBC', '#F0EE94', '#F5C465', '#FA7642', '#FF1E54'] ,
        scheme14: ['#60573E', '#F2EEAC', '#BFA575', '#A63841', '#BFB8A3'] ,
        scheme15: ['#444546', '#FFBB6E', '#F28D00', '#D94F00', '#7F203B'] ,
        scheme16: ['#583C39', '#674E49', '#948658', '#F0E99A', '#564E49'] ,
        scheme17: ['#142D58', '#447F6E', '#E1B65B', '#C8782A', '#9E3E17'] ,
        scheme18: ['#4D2B1F', '#635D61', '#7992A2', '#97BFD5', '#BFDCF5'] ,
        scheme19: ['#844341', '#D5CC92', '#BBA146', '#897B26', '#55591C'] ,
        scheme20: ['#56626B', '#6C9380', '#C0CA55', '#F07C6C', '#AD5472'] ,
        scheme21: ['#96003A', '#FF7347', '#FFBC7B', '#FF4154', '#642223'] ,
        scheme22: ['#5D7359', '#E0D697', '#D6AA5C', '#8C5430', '#661C0E'] ,
        scheme23: ['#16193B', '#35478C', '#4E7AC7', '#7FB2F0', '#ADD5F7'] ,
        scheme24: ['#7B1A25', '#BF5322', '#9DA860', '#CEA457', '#B67818'] ,
        scheme25: ['#0081DA', '#3AAFFF', '#99C900', '#FFEB3D', '#309B46'] ,
        scheme26: ['#0069A5', '#0098EE', '#7BD2F6', '#FFB800', '#FF6800'] ,
        scheme27: ['#FF6800', '#A0A700', '#FF8D00', '#678900', '#0069A5'] ,
        osyScheme: ['#1B2B32', '#37646F', '#a0a8ac', '#71a06a', '#B22E2F', '#cccccc', '#999966', '#cc9900'] };

        var VAR_IDS = VARIABLEOBJECT.map(function (el) { return el.value; });


        this.casename = casename;
        this.genData = genData;
        this.resData = resData;
        this.pivotData = pivotData;
        this.group = group;
        this.param = param;
        this.VARIABLES = VARIABLES;
        this.VARGROUPS = VARGROUPS;
        this.VARNAMES = VARNAMES;
        this.VARIABLEOBJECT = VARIABLEOBJECT;
        this.VAR_IDS = VAR_IDS;
        this.VIEWS = VIEWS
        this.VIEW = null;
        this.DEFAULTVIEW = null;
        this.ChartTypes = ChartTypes;
        this.ColorSchemes = colorSchemes;
        this.TriggerUpdate = true;
        this.refreshPage = false;
    }
}