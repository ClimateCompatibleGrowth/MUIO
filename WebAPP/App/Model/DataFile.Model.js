
export class Model {
    constructor (casename, genData, resData, pageId) {
      if(casename){

        let scenarios =  genData['osy-scenarios'];
        let scMap = {};
        $.each(scenarios, function (id, sc) {
          scMap[sc.ScenarioId] = sc;
        });
        let cases = resData['osy-cases'];

        let cs;
        if (resData['osy-cases'] !== undefined && resData['osy-cases'].length != 0) {
          // array empty or does not exist
          console.log('not empt')
          cs = cases[0]['Case'];
      }else{
        cs = null;
      }

        this.casename = casename;
        this.title = "Run model";
        this.scenarios = scenarios;
        this.scenariosCount = scenarios.length;
        this.scMap = scMap;
        this.cases = cases;
        this.cs = cs;
        this.pageId = pageId;
      }else{
        this.casename = null;
        this.title = "Generate data file";
        this.scenarios = null;
        this.pageId = pageId;
      }
    }
}
