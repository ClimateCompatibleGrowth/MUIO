import { DataModelResult } from "../../Classes/DataModelResult.Class.js";
import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {

    constructor(casename, genData, resData, VARIABLES, DATA, VIEW) {

        
        this.d = 2;
        this.decimal = 'd' + this.d;
        
        //console.log('VARIABLES ', VARIABLES)
        console.log('resData ', resData)
        console.log('DATA ', DATA)

        let group = 'RYT';
        let param = 'ANC';

        let VARGROUPS = DataModelResult.getVarById(VARIABLES);
        let pivotData = DataModelResult.getPivot(DATA, genData, VARIABLES, group, param);
        let VARNAMES = DataModel.AllParamName(VARIABLES);
        let VIEWS = VIEW['osy-views'];

        //console.log('PARAMETERS ', PARAMETERS)
        //console.log('VARGROUPS ', VARGROUPS)
        //console.log('VIEWS', VIEWS)

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
        // this.VIEW = VIEWS['ANC'][0]['osy-viewId'];
        this.VIEW = null;
        this.DEFAULTVIEW = null;
    
    }
}