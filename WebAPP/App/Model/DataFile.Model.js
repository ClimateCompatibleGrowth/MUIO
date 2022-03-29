
export class Model {
    constructor (casename, genData, resData, pageId) {
      if(casename){

        let scenarios =  genData['osy-scenarios'];
        //let scenarios =  resData['osy-cases'][0]['Scenarios']
        let scMap = {};
        $.each(scenarios, function (id, sc) {
          scMap[sc.ScenarioId] = sc;
        });
        let cases = resData['osy-cases'];

        // let cs;
        // if (resData['osy-cases'] !== undefined && resData['osy-cases'].length != 0) {
        //   // array empty or does not exist
        //   cs = cases[0]['Case'];
        // }else{
        //   cs = null;
        // }

        let cs = null;

        let scBycs = {};
        $.each(resData['osy-cases'], function (id, cs) {
          scBycs[cs.Case] = cs.Scenarios
        });

        this.casename = casename;
        this.cs = cs;
        this.scBycs = scBycs;
        this.title = "Run model";
        this.scenarios = scenarios;
        this.scenariosCount = scenarios.length;
        this.scMap = scMap;
        this.cases = cases;
        this.pageId = pageId;
      }else{
        this.casename = null;
        this.title = "Generate data file";
        this.scenarios = null;
        this.pageId = pageId;
      }
    }
}
