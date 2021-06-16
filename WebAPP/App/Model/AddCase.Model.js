import { DefaultObj } from "../../Classes/DefaultObj.Class.js";
import { JqxSources } from "../../Classes/JqxSources.Class.js";

export class Model {
    constructor (genData, pageId) {


      if(genData){
        this.casename = genData['osy-casename'];
        this.title = "Case study";
        this.desc = genData['osy-desc'];
        this.date = genData['osy-date'];
        this.dr = genData['osy-dr'];
        this.dm = genData['osy-dm'];
        this.rmpt = genData['osy-rmpt'];
        this.ns = genData['osy-ns'];
        this.dt = genData['osy-dt'];
        this.currency = genData['osy-currency'];
        this.years = genData['osy-years'];
        this.scenarios = genData['osy-scenarios'];
        this.techs = genData['osy-tech'];
        this.commodities = genData['osy-comm'];
        this.emissions = genData['osy-emis'];

        this.srcTech = JqxSources.srcTech(this.techs);
        this.srcComm = JqxSources.srcComm(this.commodities);
        this.srcEmi = JqxSources.srcEmi(this.emissions);
        //this.srcScenario = JqxSources.srcScenario(this.scenarios);

        //this.columnsTech = JqxSources.techGridColumns(new $.jqx.dataAdapter(this.commodities));

        this.techCount = genData['osy-tech'].length;
        this.commCount = genData['osy-comm'].length;
        this.emisCount = genData['osy-emis'].length;
        //this.scenariosCount = genData['osy-scenarios'].length;
        this.pageId = pageId;
      }else{
        let years=[];
        for(var i = 2020; i <= 2050; i++) { years.push(String(i)); }

        this.casename = null;
        this.title = "Case study";
        this.desc = null;
        this.date = null;
        this.dr = null;
        this.dm = null;
        this.rmpt = null;
        this.ns = null;
        this.dt = null;
        this.currency = null;
        this.years = years;
        //this.scenarios = DefaultObj.defaultScenario(true);
        this.techs = DefaultObj.defaultTech(true);
        this.commodities = DefaultObj.defaultComm(true);
        this.emissions = DefaultObj.defaultEmi(true);

        this.srcTech = JqxSources.srcTech(this.techs);
        this.srcComm = JqxSources.srcComm(this.commodities);
        this.srcEmi = JqxSources.srcEmi(this.emissions);
        //this.columnsTech = JqxSources.techGridColumns(new $.jqx.dataAdapter(this.commodities));
        
        this.techCount = 1;
        this.commCount = 1;
        this.emisCount = 1;
        //this.scenariosCount = 1;
        this.pageId = pageId;
      }
    }
}
