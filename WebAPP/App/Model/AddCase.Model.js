import { DefaultObj } from "../../Classes/DefaultObj.Class.js";
import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
  constructor(genData, PARAMETERS, pageId) {

    if (genData) {
      this.casename = genData['osy-casename'];
      this.PARAMETERS = PARAMETERS;
      this.techNames = DataModel.TechName(genData);
      this.commNames = DataModel.CommName(genData);
      this.emiNames = DataModel.EmiName(genData);
      this.title = "Model";
      this.desc = genData['osy-desc'];
      this.date = genData['osy-date'];
      this.ns = genData['osy-ns'];
      this.dt = genData['osy-dt'];
      this.mo = genData['osy-mo'];
      this.currency = genData['osy-currency'];
      this.years = genData['osy-years'];
      this.scenarios = genData['osy-scenarios'];
      this.techs = genData['osy-tech'];
      this.commodities = genData['osy-comm'];
      this.emissions = genData['osy-emis'];
      this.constraints = genData['osy-constraints']

      this.techCount = genData['osy-tech'].length;
      this.commCount = genData['osy-comm'].length;
      this.emisCount = genData['osy-emis'].length;
      this.scenariosCount = genData['osy-scenarios'].length;
      this.constraintsCount = genData['osy-constraints'].length;
      this.pageId = pageId;
    } else {
      let years = [];
      for (var i = 2020; i <= 2050; i++) { years.push(String(i)); }

      this.casename = null;
      this.PARAMETERS = PARAMETERS;
      this.techNames = { 'TEC_0': 'TEC_0' };
      this.commNames = { 'COM_0': 'COM_0' };
      this.emiNames = { 'EMI_0': 'EMI_0' };
      this.title = "Model";
      this.desc = null;
      this.date = null;
      this.ns = null;
      this.dt = null;
      this.mo = null;
      this.currency = null;
      this.years = years;
      this.scenarios = DefaultObj.defaultScenario(true);
      this.techs = DefaultObj.defaultTech(true);
      this.commodities = DefaultObj.defaultComm(true);
      this.emissions = DefaultObj.defaultEmi(true);
      this.constraints = [];
      this.techCount = 1;
      this.commCount = 1;
      this.emisCount = 1;
      this.scenariosCount = 1;
      this.constraintsCount = 0,
        this.pageId = pageId;
    }
  }
}
