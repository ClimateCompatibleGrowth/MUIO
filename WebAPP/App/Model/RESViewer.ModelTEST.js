import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYTCMdata, techSelect= null) {

        // let allActivityTechs = DataModel.getAllActivityTechs(genData['osy-tech'])
  
        let TechNames = DataModel.TechName(genData);
        let CommNames = DataModel.CommName(genData);

        let act = DataModel.getAllActivityTechsSankey(genData['osy-tech'], techSelect, TechNames)


        let allActivityTechs = act['ddlTechs']
        let labelIndex = act['labelIndex'];
        let color = act['color'];
        let label = act['label'];

        let actIAR= act['actIAR'];
        let actOAR= act['actOAR'];

        let source = [];
        let target = [];
        let value = [];
        let labelLink = [];

        let techCount = label.length;

        $.each(actIAR, function (commIdIar, techArrayIar) {
            $.each(techArrayIar, function (i, techIdIar) {
                if (commIdIar in actOAR){
                    $.each(actOAR[commIdIar], function (j, techIdOar) {
                        labelLink.push(CommNames[commIdIar]);
                        source.push(labelIndex[techIdOar]);
                        target.push(labelIndex[techIdIar]);
                        value.push(1);
                    })
                }
            });
        });


        console.log('actIAR ', actIAR)
        console.log('actOAR ', actOAR)
        console.log('label ', label) 

        console.log('labelIndex ', labelIndex);
        console.log('label ', label);
        console.log('color ', color);
        console.log('source ', source);
        console.log('target ', target);
        console.log('value ', value);
        console.log('labelLink ', labelLink);
        //console.log('scenarios ', scenarios);

        this.casename = casename; 
        this.techCount = techCount;
        this.allActivityTechs = allActivityTechs;
        this.label = label;
        this.color = color;
        this.height = 600;

        this.source = source;
        this.target = target;
        this.value = value;
        this.labelLink = labelLink;

        this.genData = genData;
        this.RYTCMdata = RYTCMdata;
    }
}