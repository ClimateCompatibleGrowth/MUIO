import { DataModelResult } from "../../Classes/DataModelResult.Class.js";
import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {

    constructor(casename, genData, resData, VARIABLES, DATA, VIEW) {

        let group = 'RYT';
        let param = 'ANC';

        let VARGROUPS = DataModelResult.getVarById(VARIABLES);
        console.log('VARGROUPS ', VARGROUPS)
        let VARNAMES = DataModel.AllParamName(VARIABLES);
        // console.log('VARNAMES ', VARNAMES)
        // console.log('DATA', DATA)
        let pivotData = DataModelResult.getPivot(DATA, genData, VARIABLES, group, param);
        //console.log('pivotData ', pivotData)

        let VIEWS = VIEW['osy-views'];

        // console.log('DATA', DATA)
        // console.log('pivot Data', pivotData)

        this.casename = casename;
        this.genData = genData;
        this.resData = resData;
        this.pivotData = pivotData;
        this.group = group;
        this.param = param;
        this.VARIABLES = VARIABLES;
        this.VARGROUPS = VARGROUPS;
        this.VARNAMES = VARNAMES;
        this.VIEWS = VIEWS
        this.VIEW = null;
        this.DEFAULTVIEW = null;
    }
}