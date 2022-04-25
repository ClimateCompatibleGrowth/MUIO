import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {
    
    constructor (casename, genData, RYTCMdata, techSelect= null) {

        //let techsCount = genData['osy-tech'].length;
        let years = genData['osy-years'];
        let scenarios = genData['osy-scenarios'];

        //let ActivityTechs = DataModel.activityTechs(genData['osy-tech']);
        let allActivityTechs = DataModel.getAllActivityTechs(genData['osy-tech'])
        let ActivityComms = DataModel.activityComms(genData);
        let TechNames = DataModel.TechName(genData);
        let CommNames = DataModel.CommName(genData);

        // let TechUnits = DataModel.getTechUnits(genData);
        // let CommUnits = DataModel.getCommUnits(genData);

        console.log('RYTCMdata ', RYTCMdata);
        console.log('allActivityTechs ', allActivityTechs);
        console.log('ActivityComms ', ActivityComms);
        // console.log('TechNames ', TechNames);
        // console.log('TechUnits ', TechUnits);
        // console.log('CommUnits ', CommUnits);

        let index = 0;CommNames
        let labelIndex = {};
        let color = [];
        let label = [];

        $.each(ActivityComms, function (IO, obj) {
            $.each(obj, function (tech, array) {
                if (typeof labelIndex[tech] === "undefined" ){
                    if (techSelect == null){
                        labelIndex[tech] = index;
                        label.push(TechNames[tech]);
                        index++;
                        color.push('#3a3f51');
                    }else{
                        if(techSelect.includes(tech)){
                            labelIndex[tech] = index;
                            label.push(TechNames[tech]);
                            index++;
                            color.push('#3a3f51');
                        }
                    }

                }
                // $.each(array, function (id, objComm) {
                //     if (typeof labelIndex[objComm.CommId] === "undefined" ){
                //         labelIndex[objComm.CommId] = index;
                //         label.push(CommNames[objComm.CommId])
                //         index++;
                //         color.push('#71a06a')
                //     }
                // });
            });
        });


        let source = [];
        let target = [];
        let value = [];
        let labelLink = [];

        let techCount = label.length;

        let IAR = RYTCMdata.IAR.SC_0;
        let OAR = RYTCMdata.OAR.SC_0;

        console.log('IAR ', IAR);
        console.log('OAR ', OAR);

        $.each(OAR, function (idOAR, objOAR) {
            $.each(IAR, function (idIAR, objIAR) {
                if(objOAR.CommId == objIAR.CommId){
                    if (techSelect == null){
                        source.push(labelIndex[objOAR.TechId]);
                        target.push(labelIndex[objIAR.TechId]);
                        // labelLink.push(CommNames[objIAR.CommId] + ' Unit:' +CommUnits[objIAR.CommId] + '/' + TechUnits[objIAR.TechId]['ActUnitId']);
                        labelLink.push(CommNames[objIAR.CommId]);
    
                       // labelLink[sc][year].push(CommUnits[objData.CommId] + '/' + TechUnits[objData.TechId]['ActUnitId']);
                        value.push(1);
                    }else{
                        if(techSelect.includes(objOAR.TechId) || techSelect.includes(objIAR.TechId)){
                            source.push(labelIndex[objOAR.TechId]);
                            target.push(labelIndex[objIAR.TechId]);
                            // labelLink.push(CommNames[objIAR.CommId] + ' Unit:' +CommUnits[objIAR.CommId] + '/' + TechUnits[objIAR.TechId]['ActUnitId']);
                            labelLink.push(CommNames[objIAR.CommId]);
        
                        // labelLink[sc][year].push(CommUnits[objData.CommId] + '/' + TechUnits[objData.TechId]['ActUnitId']);
                            value.push(1);
                        }
                    }

                }
            });
        });

        // $.each(RYTCMdata, function (IO, obj) {
        //     $.each(obj, function (sc, array) {
        //         if (!source[sc]){source[sc] = {};}
        //         if (!target[sc]){target[sc] = {};}
        //         if (!value[sc]){value[sc] = {};}
        //         if (!labelLink[sc]){labelLink[sc] = {};}
        //         $.each(array, function (id, objData) {
        //             if(objData.MoId == 1){

        //                 $.each(years, function (idY, year) {
        //                     if (!source[sc][year]){source[sc][year] = [];}
        //                     if (!target[sc][year]){target[sc][year] = [];}
        //                     if (!value[sc][year]){value[sc][year] = [];}
        //                     if (!labelLink[sc][year]){labelLink[sc][year] = [];}
    
        //                     if(IO == 'IAR'){
        //                         source[sc][year].push(labelIndex[objData.CommId]);
        //                         target[sc][year].push(labelIndex[objData.TechId]);
        //                         labelLink[sc][year].push(CommUnits[objData.CommId] + '/' + TechUnits[objData.TechId]['ActUnitId']);
        //                         if(objData[year] != 0 && objData[year] != null){
        //                             value[sc][year].push(objData[year]);
        //                             //value[sc][year].push(1);
        //                         }else{
        //                             value[sc][year].push(1);
        //                         }
                                
        //                     }
        //                     if(IO == 'OAR'){
        //                         source[sc][year].push(labelIndex[objData.TechId]);
        //                         target[sc][year].push(labelIndex[objData.CommId]);
        //                         labelLink[sc][year].push(CommUnits[objData.CommId] + '/' + TechUnits[objData.TechId]['ActUnitId']);
        //                         if(objData[year] != 0 && objData[year] != null){
        //                             value[sc][year].push(objData[year]);
        //                             //value[sc][year].push(1);
        //                         }else{
        //                             value[sc][year].push(1);
        //                         }
                                
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // });

        //var label = Object.keys(labelIndex);


        console.log('labelIndex ', labelIndex);
        console.log('label ', label);
        console.log('color ', color);
        console.log('source ', source);
        console.log('target ', target);
        console.log('value ', value);
        // console.log('labelLink ', labelLink);
        // console.log('scenarios ', scenarios);

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