
export class Model {
    constructor (casename, genData, pageId) {
      if(casename){

        let scenarios =  genData['osy-scenarios'];
        let scMap = {};
        $.each(scenarios, function (id, sc) {
          scMap[sc.ScenarioId] = sc;
        });

        this.casename = casename;
        this.title = "Geneate data file";
        this.scenarios = scenarios;
        this.scenariosCount = scenarios.length;
        this.scMap = scMap;
        this.pageId = pageId;
      }else{
        this.casename = null;
        this.title = "Generate data file";
        this.scenarios = null;
        this.pageId = pageId;
      }
    }
}
