export class DataModel{

    //RYT->VC->{}
    static getParamById(parameters){
        let paramById = {};
        const cloneData = JSON.parse(JSON.stringify(parameters));
        $.each(cloneData, function (group, array) {
            paramById[group] = {};
            $.each(array, function (id, obj) {
                paramById[group][obj.id] = obj;
                delete obj.id;
            });
        });
        return paramById;       
    }

    static getUnitData(genData, parameters){
        let unitData = {};
        let techUnits = this.getTechUnits(genData);
        let commUnits = this.getCommUnits(genData);
        let emiUnits = this.getEmiUnits(genData);

        $.each(parameters, function (group, array) {
            unitData[group] = {};
            $.each(array, function (id, obj) {
                unitData[group][obj.id] = {};
                //tech parameters
                $.each(genData['osy-tech'], function (id, tObj) {
                    unitData[group][obj.id][tObj.TechId] = {};
                    unitData[group][obj.id][tObj.TechId]['years'] = 'years';
                    unitData[group][obj.id][tObj.TechId]['percent'] = '%';
                    unitData[group][obj.id][tObj.TechId]['divide'] = '/';
                    unitData[group][obj.id][tObj.TechId]['multiply'] = '*';
                    unitData[group][obj.id][tObj.TechId]['hundert'] = '100';
                    unitData[group][obj.id][tObj.TechId]['thousand'] = '10<sup>3</sup>';
                    unitData[group][obj.id][tObj.TechId]['milion'] = '10<sup>6</sup>';
                    unitData[group][obj.id][tObj.TechId]['CapUnitId'] = techUnits[tObj.TechId]['CapUnitId'];
                    unitData[group][obj.id][tObj.TechId]['ActUnitId'] = techUnits[tObj.TechId]['ActUnitId'];
                    unitData[group][obj.id][tObj.TechId]['Currency'] = genData['osy-currency'];
                });
                //comm parameters
                $.each(genData['osy-comm'], function (id, cObj) {
                    unitData[group][obj.id][cObj.CommId] = {};
                    unitData[group][obj.id][cObj.CommId]['years'] = 'years';
                    unitData[group][obj.id][cObj.CommId]['percent'] = '%';
                    unitData[group][obj.id][cObj.CommId]['divide'] = '/';
                    unitData[group][obj.id][cObj.CommId]['multiply'] = '*';
                    unitData[group][obj.id][cObj.CommId]['hundert'] = '100';
                    unitData[group][obj.id][cObj.CommId]['thousand'] = '10<sup>3</sup>';
                    unitData[group][obj.id][cObj.CommId]['milion'] = '10<sup>6</sup>';
                    unitData[group][obj.id][cObj.CommId]['CommUnit'] = commUnits[cObj.CommId];
                    unitData[group][obj.id][cObj.CommId]['Currency'] = genData['osy-currency'];
                });
                //emi parameters
                $.each(genData['osy-emis'], function (id, eObj) {
                    unitData[group][obj.id][eObj.EmisId] = {};
                    unitData[group][obj.id][eObj.EmisId]['years'] = 'years';
                    unitData[group][obj.id][eObj.EmisId]['percent'] = '%';
                    unitData[group][obj.id][eObj.EmisId]['divide'] = '/';
                    unitData[group][obj.id][eObj.EmisId]['multiply'] = '*';
                    unitData[group][obj.id][eObj.EmisId]['hundert'] = '100';
                    unitData[group][obj.id][eObj.EmisId]['thousand'] = '10<sup>3</sup>';
                    unitData[group][obj.id][eObj.EmisId]['milion'] = '10<sup>6</sup>';
                    unitData[group][obj.id][eObj.EmisId]['EmiUnit'] = emiUnits[eObj.EmisId];
                    unitData[group][obj.id][eObj.EmisId]['Currency'] = genData['osy-currency'];
                });
                unitData[group][obj.id]['years'] = 'years';
                unitData[group][obj.id]['percent'] = '%';
                unitData[group][obj.id]['divide'] = '/';
                unitData[group][obj.id]['multiply'] = '*';
                unitData[group][obj.id]['hundert'] = '100';
                unitData[group][obj.id]['thousand'] = '10<sup>3</sup>';
                unitData[group][obj.id]['milion'] = '10<sup>6</sup>';
                unitData[group][obj.id]['hundert'] = '100';
                unitData[group][obj.id]['thousand'] = '10<sup>3</sup>';
            });
        });
        return unitData;       
    }

    static getRuleData(UNITDEFINITION){
        let ruleData = {};
        $.each(UNITDEFINITION, function (id, obj) {
            ruleData[id] = obj['name'];
        });
        return ruleData;       
    }

    static getUnitsDef(UNITDEFINITION){
        let unitsDef = {};
        $.each(UNITDEFINITION, function (id, obj) {
            unitsDef[id] = obj.name;
        });        
        return unitsDef;
    }

    //get name from id
    static TechName(genData){
        let techNames = {};
        $.each(genData['osy-tech'], function (id, obj) {
            techNames[obj['TechId']] = obj['Tech'];
        });
        return techNames;
    }

    /////////////////////////////////////////////////
    //tech data by id
    static getTechData(genData){
        let techNames = {};
        $.each(genData['osy-tech'], function (id, obj) {
            techNames[obj['TechId']] = obj;
        });
        return techNames;
    }

    static getScData(genData){
        let ScNames = {};
        $.each(genData['osy-scenarios'], function (id, obj) {
            ScNames[obj['ScenarioId']] = obj;
        });
        return ScNames;
    }

    static getCommData(genData){
        let commData = {};
        $.each(genData['osy-comm'], function (id, obj) {
            commData[obj['CommId']] = obj;
        });
        return commData;
    }

    static getEmiData(genData){
        let emiData = {};
        $.each(genData['osy-emis'], function (id, obj) {
            emiData[obj['EmisId']] = obj;
        });
        return emiData;
    }

    static getConData(genData){
        let conData = {};
        $.each(genData['osy-constraints'], function (id, obj) {
            conData[obj['ConId']] = obj;
        });
        return conData;
    }

    ///////////////////////////////////

    //get id from name
    static TechId(genData){
        let techIds = {};
        $.each(genData['osy-tech'], function (id, obj) {
            techIds[obj['Tech']] = obj['TechId'];
        });
        return techIds;
    }

    static ConId(genData){
        let conID = {};
        $.each(genData['osy-constraints'], function (id, obj) {
            conID[obj['Con']] = obj['ConId'];
        });
        return conID;
    }

    static getTechUnits(genData){
        let TechUnits = {};
        $.each(genData['osy-tech'], function (id, obj) {
            TechUnits[obj.TechId] = {};
            TechUnits[obj.TechId]['CapUnitId'] = obj['CapUnitId'];
            TechUnits[obj.TechId]['ActUnitId'] = obj['ActUnitId'];
        });
        return TechUnits;
    }

    static getCommUnits(genData){
        let CommUnits = {};
        $.each(genData['osy-comm'], function (id, obj) {
            CommUnits[obj['CommId']] = obj['UnitId'];
        });
        return CommUnits;
    }

    static getEmiUnits(genData){
        let EmiUnits = {};
        $.each(genData['osy-emis'], function (id, obj) {
            EmiUnits[obj['EmisId']] = obj['UnitId'];
        });
        return EmiUnits;
    }

    static CommName(genData){
        let commNames = {};
        $.each(genData['osy-comm'], function (id, obj) {
            commNames[obj['CommId']] = obj['Comm'];
        });
        return commNames;
    }

    static EmiName(genData){
        let emiNames = {};
        $.each(genData['osy-emis'], function (id, obj) {
            emiNames[obj['EmisId']] = obj['Emis'];
        });
        return emiNames;
    }

    static ScName(genData){
        let ScNames = {};
        $.each(genData['osy-scenarios'], function (id, obj) {
            ScNames[obj['ScenarioId']] = obj['Scenario'];
        });
        return ScNames;
    }

    static ConName(genData){
        let conNames = {};
        $.each(genData['osy-constraints'], function (id, obj) {
            conNames[obj.ConId] = obj.Con;
        });
        return conNames;
    }

    static ParamName(parameters){
        let ParamName = {};
        $.each(parameters, function (id, obj) {
            ParamName[obj.id] = obj.value;
        });
        return ParamName;
    }

    static AllParamName(parameters){
        let ParamName = {};
        $.each(parameters, function (group, array) {
            ParamName[group] = {};
            $.each(array, function (id, obj) {
                ParamName[group][obj.id] = obj.value;
            });
        });
        return ParamName;
    }

    static getParamData(parameters){
        let ParamName = {};
        $.each(parameters, function (group, array) {
            ParamName[group] = {};
            $.each(array, function (id, obj) {
                ParamName[group][obj.id] = obj;
            });
        });
        return ParamName;
    }

    static Timeslices(genData){
        let ts = [];
        let ns = parseInt(genData['osy-ns'])
        let nd = parseInt(genData['osy-dt'])

        for (let i = 1; i <= ns; i++) {
            for (let j = 1; j <= nd; j++) {
                ts.push('S'+i.toString()+j.toString())
            }
        }
        return ts;
    }

    static Mods(genData){
        let mods = [];
        let mo = parseInt(genData['osy-mo'])

        for (let j = 1; j <= mo; j++) {
            mods.push(j)
        }
        return mods;
    }

    /////////////////////////////////////////////////IAR OAR EAR INCR ITCR
    static activityTechs(techs){
        let ActivityTechs = {};
        ActivityTechs['IAR'] = [];
        ActivityTechs['OAR'] = [];
        $.each(techs, function (id, obj) {
            if (obj.IAR.length != 0 ) {
                ActivityTechs['IAR'].push(obj)
            }
            if ( obj.OAR.length != 0) {
                ActivityTechs['OAR'].push(obj)
            }
        });
        return ActivityTechs;
    }

    static activityComms(genData){
        let ActivityComms = {};
        ActivityComms['IAR'] = {};
        ActivityComms['OAR'] = {};
        let techs = genData['osy-tech'];
        let comms = genData['osy-comm'];

        $.each(techs, function (idT, objT) {
            if (objT.IAR.length != 0 ) {
                ActivityComms['IAR'][objT.TechId] = [];
                $.each(comms, function (idC, objC) {
                    if(objT.IAR.includes(objC.CommId)){
                        ActivityComms['IAR'][objT.TechId].push(objC);
                    }
                });
            }
            if ( objT.OAR.length != 0) {
                ActivityComms['OAR'][objT.TechId] = [];
                $.each(comms, function (idC, objC) {
                    if(objT.OAR.includes(objC.CommId)){
                      
                        ActivityComms['OAR'][objT.TechId].push(objC);
                    }
                });
            }
        });
        return ActivityComms;
    }

    static inputCapTechs(techs){
        let ActivityTechs = {};
        ActivityTechs['INCR'] = [];
        ActivityTechs['ITCR'] = [];
        $.each(techs, function (id, obj) {
            if (obj.INCR.length != 0 ) {
                ActivityTechs['INCR'].push(obj)
            }
            if ( obj.ITCR.length != 0) {
                ActivityTechs['ITCR'].push(obj)
            }
        });
        return ActivityTechs;
    }

    static inputCapComms(genData){
        let ActivityComms = {};
        ActivityComms['INCR'] = {};
        ActivityComms['ITCR'] = {};
        let techs = genData['osy-tech'];
        let comms = genData['osy-comm'];

        $.each(techs, function (idT, objT) {
            if (objT.INCR.length != 0 ) {
                ActivityComms['INCR'][objT.TechId] = [];
                $.each(comms, function (idC, objC) {
                    if(objT.INCR.includes(objC.CommId)){
                        ActivityComms['INCR'][objT.TechId].push(objC);
                    }
                });
            }
            if ( objT.ITCR.length != 0) {
                ActivityComms['ITCR'][objT.TechId] = [];
                $.each(comms, function (idC, objC) {
                    if(objT.ITCR.includes(objC.CommId)){
                      
                        ActivityComms['ITCR'][objT.TechId].push(objC);
                    }
                });
            }
        });
        return ActivityComms;
    }

    static emissionTechs(techs){
        let ActivityEmis = []
        $.each(techs, function (id, obj) {
            if (obj.EAR.length != 0 ) {
                ActivityEmis.push(obj);
            }
        });
        return ActivityEmis;
    }

    static activityEmis(genData){
        let ActivityEmis = {};
        ActivityEmis = {};
        let techs = genData['osy-tech'];
        let emis = genData['osy-emis'];

        $.each(techs, function (idT, objT) {
            if (objT.EAR.length != 0 ) {
                ActivityEmis[objT.TechId] = [];
                $.each(emis, function (idC, objE) {
                    if(objT.EAR.includes(objE.EmisId)){
                        ActivityEmis[objT.TechId].push(objE);
                    }
                });
            }
        });
        return ActivityEmis;
    }

    static constraintsCM(constraints){
        let constraintsCM = []
        $.each(constraints, function (id, obj) {
            if (obj.CM.length != 0 ) {
                constraintsCM.push(obj);
            }
        });
        return constraintsCM;
    }

    static constraintTechs(genData){
        let ConstraintTechs = {};
        let cons = genData['osy-constraints'];
        let techs = genData['osy-tech'];

        $.each(cons, function (id, con) {
            if (con.CM.length != 0 ) {
                ConstraintTechs[con.ConId] = [];
                $.each(techs, function (idT, obj) {
                    if(con.CM.includes(obj.TechId)){
                        ConstraintTechs[con.ConId].push(obj);
                    }
                });
            }
        });
        return ConstraintTechs;
    }


    ////////////////////////////////////////////////////////JSON data structures


    /////////////////////////////////////////////////////data model result//////////////////////

    static RT(RTdata){
        let RT = {};
        const cloneData = JSON.parse(JSON.stringify(RTdata));
        $.each(cloneData, function (param, obj1) {
            RT[param] = {};
            $.each(obj1, function (sc, array) {
                RT[param][sc] = {};
                $.each(array, function (id, obj) { 
                    RT[param][sc] = obj
                });
            });
        });
        return RT;
    }

    static RTgrid(RTdata){
        // // let scName = this.ScName(genData);
        // // let scData = this.getScData(genData);
        // // let paramName = this.ParamName(PARAMETERS['RT']);
        // // let unitData = this.getUnitData(genData, PARAMETERS);
        // // let paramById = this.getParamById(PARAMETERS);
        // const cloneData = JSON.parse(JSON.stringify(RTdata));
        // let RTgrid = {}

        // $.each(cloneData, function (param, paramObj) {
        //     RTgrid[param] = [];
        //     $.each(paramObj, function (sc, array) {
        //         $.each(array, function (id, obj) {
        //             // obj['ParamId'] = param;
        //             // obj['Param'] = paramName[param];
        //             // // obj['ScId'] = sc;
        //             // // obj['Sc'] = scName[sc];
        //             // obj['ScId'] = sc;
        //             // obj['Sc'] = scData[sc]['Scenario'];
        //             // obj['ScDesc'] = scData[sc]['Desc'];
        //             // $.each(genData['osy-tech'], function (id, tech) {
        //             //     let rule = paramById['RT'][param]['unitRule'];
        //             //     let data = unitData['RT'][param][tech.TechId];
        //             //     obj[tech.TechId+'_UnitId'] = jsonLogic.apply(rule, data);
        //             // });
        //             RTgrid[param].push(obj);
        //         }); 
        //     });
        // });
        return RTdata;
    }

    static RTchart(RTdata){
        //let techName = this.TechName(genData);
        // let RTchart = {};
        // //RYTdata[VC] = [{tech, Sc,2000, 2020...}]
        // //let data = this.RT(RTdata);
        // $.each(RTdata, function (param, obj) {
        //     let chartData = {};
           
        //     $.each(obj, function (cs, obj1) {
        //         chartData[cs] = [];
        //         $.each(obj1, function (tech, val) {
        //             let chunk = {};
        //             chunk['Tech'] = tech
        //             // $.each(genData['osy-tech'], function (idT, tech) {
        //             //     let chunk = {};
        //             //     chunk['TechId'] = tech.TechId;
        //             //     chunk['Tech'] = techName[tech.TechId];
        //             //     $.each(genData['osy-scenarios'], function (idS, sc) {
        //             //         if (typeof data[param][sc.ScenarioId][tech.TechId] !== "undefined" ){
        //             //             chunk[sc.ScenarioId] = data[param][sc.ScenarioId][tech.TechId];
        //             //         }
        //             //     });
        //             //     RTchart[param].push(chunk);
        //         });  
        //         RTchart[param] = chartData; 
        //     });             
        // });
        return RTdata;
    }

    static RYT(RYTdata){
        let RYT = {};
        const cloneData = JSON.parse(JSON.stringify(RYTdata));
        $.each(cloneData, function (param, obj1) {
            RYT[param] = {};
            $.each(obj1, function (cs, array) {
                RYT[param][cs] = {};
                $.each(array, function (id, obj) {
                    RYT[param][cs][obj.Tech] = obj
                    delete obj.Tech;
                });
            });
        });
        return RYT;
    }

    static RYTgrid(RYTdata){
        //let techData = this.getTechData(genData);
        // let scData = this.getScData(genData);
        // let unitData = this.getUnitData(genData, PARAMETERS);
        // let paramById = this.getParamById(PARAMETERS);

        const cloneData = JSON.parse(JSON.stringify(RYTdata));
        let RYTgrid = {};
        $.each(cloneData, function (param, paramObj) {
            RYTgrid[param] = {};
            $.each(paramObj, function (cs, array) {
                RYTgrid[param][cs] = [];
                $.each(array, function (id, obj) {
                    obj['Tech'] = obj.Tech;
                    //obj['TechDesc'] = techData[obj.TechId]['Desc'];
                    // obj['ScId'] = cs;
                    // obj['Sc'] = scData[cs]['Scenario'];
                    //obj['Cs'] = cs;
                    //obj['ScDesc'] = scData[cs]['Desc'];
                    // let rule = paramById['RYT'][param]['unitRule'];
                    // let data = unitData['RYT'][param][obj.TechId];
                    // obj['UnitId'] = jsonLogic.apply(rule, data);
                    RYTgrid[param][cs].push(obj);
                }); 
            });
        });
        return RYTgrid;
    }

    static RYTchart(genData, RYTdata){
        let RYTchart = {};
        let data = this.RYT(RYTdata);
        $.each(RYTdata, function (param, obj) {
            let chartData = {};
            $.each(obj, function (cs, obj1) {
                chartData[cs] = [];
                $.each(genData['osy-years'], function (idY, year) { 
                    let chunk = {};
                    chunk['Year'] = year;
                    $.each(genData['osy-tech'], function (idT, tech) {
                        chunk[tech.Tech] = data[param][cs][tech.Tech][year]   
                    });        
                    chartData[cs].push(chunk); 
                });        
            });
            RYTchart[param] = chartData; 
        });
        return RYTchart;
    }

    static RYE(RYEdata){
        let RYE = {};
        const cloneData = JSON.parse(JSON.stringify(RYEdata));
        $.each(cloneData, function (param, obj1) {
            RYE[param] = {};
            $.each(obj1, function (cs, array) {
                RYE[param][cs] = {};
                $.each(array, function (id, obj) {
                    RYE[param][cs][obj.Emi] = obj
                    delete obj.Emi;
                    // delete obj.Emis;
                    // delete obj.ScId;
                    // delete obj.Sc;
                });
            });
        });
        return RYE;
    }

    static RYEgrid(RYEdata){
        // let emiData = this.getEmiData(genData);
        // let scData = this.getScData(genData);
        // let unitData = this.getUnitData(genData, PARAMETERS);
        // let paramById = this.getParamById(PARAMETERS);
        let cloneData = JSON.parse(JSON.stringify(RYEdata));
        let RYEgrid = {};
        $.each(cloneData, function (param, paramObj) {
            RYEgrid[param] = [];
            $.each(paramObj, function (cs, array) {
                RYEgrid[param][cs] = [];
                $.each(array, function (id, obj) {
                    obj['Emi'] = obj.Emi;
                    // obj['EmiDesc'] = emiData[obj.EmisId]['Desc'];
                    // obj['ScId'] = sc;
                    // obj['Sc'] = scData[sc]['Scenario'];
                    // obj['ScDesc'] = scData[sc]['Desc'];
                    // let rule = paramById['RYE'][param]['unitRule'];
                    // let data = unitData['RYE'][param][obj.EmisId];
                    // obj['UnitId'] = jsonLogic.apply(rule, data);
                    RYEgrid[param][cs].push(obj);
                }); 
            });
        });
        return RYEgrid;
    }

    static RYEchart(genData, RYEdata){
        let RYEchart = {};
        let data = this.RYE(RYEdata);
        $.each(RYEdata, function (param, obj) {
            let chartData = {};
            $.each(obj, function (cs, obj1) {
                chartData[cs] = [];
                $.each(genData['osy-years'], function (idY, year) { 
                    let chunk = {};
                    chunk['Year'] = year;
                    $.each(genData['osy-emis'], function (idC, emi) {
                        chunk[emi.Emis] = data[param][cs][emi.Emis][year]  
                    });
                    chartData[cs].push(chunk);
                });
            });
            RYEchart[param] = chartData; 
            
        });
        return RYEchart;
    }

    static RYTM(RYTMdata){
        let RYTM = {};
        const cloneData = JSON.parse(JSON.stringify(RYTMdata));
        $.each(cloneData, function (param, obj1) {
            RYTM[param] = {};
            $.each(obj1, function (cs, array) {
                RYTM[param][cs] = {};
                $.each(array, function (id, obj) {
                    if(!RYTM[param][cs][obj.Tech]){ RYTM[param][cs][obj.Tech] = {}; }
                    RYTM[param][cs][obj.Tech][obj.MoId] = obj;
                    delete obj.Tech;
                    delete obj.MoId;                    
                });
            });
        });
        return RYTM;
    }

    static RYTMgrid(RYTMdata){
        // // let techData = this.getTechData(genData);
        // // let scData = this.getScData(genData);

        // // let unitData = this.getUnitData(genData, PARAMETERS);
        // // let paramById = this.getParamById(PARAMETERS);
        // let cloneData = JSON.parse(JSON.stringify(RYTMdata));
        // let RYTMgrid = {};

        // console.log('cloneData ', cloneData)
        // $.each(cloneData, function (param, obj) {
        //     RYTMgrid[param] = [];
        //     $.each(obj, function (sc, array) {
        //         $.each(array, function (id, obj) {
        //             obj['Tech'] = obj.Tech
        //             // obj['Tech'] = techData[obj.TechId]['Tech'];
        //             // obj['TechDesc'] = techData[obj.TechId]['Desc'];
        //             // obj['ScId'] = sc;
        //             // obj['Sc'] = scData[sc]['Scenario'];
        //             // obj['ScDesc'] = scData[sc]['Desc'];
        //             // let rule = paramById['RYTM'][param]['unitRule'];
        //             // let data = unitData['RYTM'][param][obj.TechId];
        //             // obj['UnitId'] = jsonLogic.apply(rule, data);
        //             RYTMgrid[param].push(obj);
        //         });
        //     });
        // });
        return RYTMdata;
    }

    static RYTMchart(genData, RYTMdata){
        let RYTM = this.RYTM(RYTMdata);
        let mods = this.Mods(genData);
        let RYTMchart = {};

        $.each(RYTMdata, function (param, obj) {
            let chartData = {}
    
            $.each(obj, function (cs, obj1) {
                chartData[cs] = {};
                $.each(mods, function (idS, mo) {   
                    chartData[cs][mo] = []; 
                    $.each(genData['osy-years'], function (idY, year) {                  
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(genData['osy-tech'], function (idT, tech) {     
                            chunk[tech.Tech] = RYTM[param][cs][tech.Tech][mo][year];
                        // $.each(genData['osy-scenarios'], function (idS, sc) {
                        //     chunk[sc.ScenarioId] = RYTM[param][sc.ScenarioId][tech.TechId][mo][year];
                        // });
                        
                        });  
                        chartData[cs][mo].push(chunk);            
                    });
                });
            }); 
            RYTMchart[param] = chartData;    
        });       
        return RYTMchart;
    }

    static RYTC(RYTCdata){
        let RYTC = {};
        const cloneData = JSON.parse(JSON.stringify(RYTCdata));
        $.each(cloneData, function (param, obj1) {
            RYTC[param] = {};
            $.each(obj1, function (cs, array) {
                RYTC[param][cs] = {};
                $.each(array, function (id, obj) {
                    if(!RYTC[param][cs][obj.Tech]){ RYTC[param][cs][obj.Tech] = {}; }
                        RYTC[param][cs][obj.Tech][obj.Comm] = obj;
                        delete obj.Tech;
                        delete obj.Comm;   
                });
            });
        });
        return RYTC;
    }

    static RYTCTechs(RYTCdata){
        let RYTCTechs = {};
        let RYTC = this.RYTC(RYTCdata);
        $.each(RYTC, function (param, obj1) {
            RYTCTechs[param] = {};
            $.each(obj1, function (cs, array) {
                //console.log(array)
                RYTCTechs[param][cs] = Object.keys(array);
            });
        });
        return RYTCTechs;
    }

    static RYTCgrid(RYTCdata){
        // let techData = this.getTechData(genData);
        // let commData = this.getCommData(genData);
        // let scData = this.getScData(genData);

        // let cloneData = JSON.parse(JSON.stringify(RYTCdata));
        // let RYTCgrid = {};

        // $.each(cloneData, function (param, obj) {
        //     RYTCgrid[param] = [];
        //     $.each(obj, function (sc, array) {
        //         $.each(array, function (id, obj) {
        //             obj['ScId'] = sc;
        //             obj['Tech'] = techData[obj.TechId]['Tech'];
        //             obj['TechDesc'] = techData[obj.TechId]['Desc'];
        //             obj['Sc'] = scData[sc]['Scenario'];
        //             obj['ScDesc'] = scData[sc]['Desc'];
        //             obj['Comm'] = commData[obj.CommId]['Comm'];
        //             obj['CommDesc'] = commData[obj.CommId]['Desc'];
        //             RYTCgrid[param].push(obj);
        //         });
        //     });
        // });
        // return RYTCgrid;
        return RYTCdata;
    }

    static RYTCchart(genData, RYTCdata){
        let RYTCchart = {};
        let RYTC = this.RYTC(RYTCdata);
        $.each(RYTC, function (param, obj1) {
            RYTCchart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYTCchart[param][cs] = {};
                    $.each(obj2, function (tech, obj3) {

                        if(!RYTCchart[param][cs][tech]){ RYTCchart[param][cs][tech] = []; }
                        $.each(genData['osy-years'], function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;

                            $.each(RYTC[param][cs][tech], function (comm, obj) {
                                chunk[comm] = obj[year]
                            });
                            RYTCchart[param][cs][tech].push(chunk);
                        });
                    });
                }
            });
        });
        return RYTCchart;
    }

    static RYTCchartAll(genData, RYTCdata){
        let RYTCchart = {};
        let RYTC = this.RYTC(RYTCdata);
        $.each(RYTC, function (param, obj1) {
            RYTCchart[param] = {};
            $.each(genData['osy-years'], function (idY, year) {
                let chunk = {};
                chunk['Year'] = year;
                $.each(obj1, function (cs, obj2) {
                    if (obj2.length !== 0){
                        RYTCchart[param][cs] = [];

                            $.each(obj2, function (tech, obj3) {

                            //if(!RYTCchart[param][cs][tech]){ RYTCchart[param][cs][tech] = []; }
                    


                                $.each(RYTC[param][cs][tech], function (comm, obj) {
                                    chunk[tech+'_'+comm] = obj[year]
                                });
                                RYTCchart[param][cs].push(chunk);
                            });
                    }
                });
                    
            });
        });
        return RYTCchart;
    }

    static RYTE(RYTEdata){
        let RYTE = {};
        const cloneData = JSON.parse(JSON.stringify(RYTEdata));
        $.each(cloneData, function (param, obj1) {
            RYTE[param] = {};
            $.each(obj1, function (sc, array) {
                RYTE[param][sc] = {};
                $.each(array, function (id, obj) {
                    if(!RYTE[param][sc][obj.Tech]){ RYTE[param][sc][obj.Tech] = {}; }
                        RYTE[param][sc][obj.Tech][obj.Emi] = obj;
                        delete obj.Tech;
                        delete obj.Emis;   
                });
            });
        });
        return RYTE;
    }

    static RYTEgrid(RYTEdata){
        // let techData = this.getTechData(genData);
        // let emiData = this.getEmiData(genData);
        // let scData = this.getScData(genData);
        // let cloneData = JSON.parse(JSON.stringify(RYTEdata));
        // let RYTEgrid = {};
        // $.each(cloneData, function (param, obj) {
        //     RYTEgrid[param] = [];
        //     $.each(obj, function (sc, array) {
        //         $.each(array, function (id, obj) {
        //             obj['Tech'] = techData[obj.TechId]['Tech'];
        //             obj['TechDesc'] = techData[obj.TechId]['Desc'];
        //             obj['Emis'] = emiData[obj.EmisId]['Emis'];
        //             obj['EmiDesc'] = emiData[obj.EmisId]['Desc'];
        //             obj['ScId'] = sc;
        //             obj['Sc'] = scData[sc]['Scenario'];
        //             obj['ScDesc'] = scData[sc]['Desc'];
        //             RYTEgrid[param].push(obj);
        //         });
        //     });
        // });
        // return RYTEgrid;
        return RYTEdata;
    }

    static RYTETechs(RYTEdata){
        let RYTETechs = {};
        let RYTE = this.RYTE(RYTEdata);
        $.each(RYTE, function (param, obj1) {
            RYTETechs[param] = {};
            $.each(obj1, function (cs, array) {
                RYTETechs[param][cs] = Object.keys(array);
            });
        });
        return RYTETechs;
    }

    static RYTEchart(genData, RYTEdata){
        let RYTEchart = {};
        let RYTE = this.RYTE(RYTEdata);
        $.each(RYTE, function (param, obj1) {
            RYTEchart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYTEchart[param][cs] = {};
                    $.each(obj2, function (tech, obj3) {

                        if(!RYTEchart[param][cs][tech]){ RYTEchart[param][cs][tech] = []; }
                        $.each(genData['osy-years'], function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;

                            $.each(obj3, function (comm, obj) {
                                chunk[comm] = obj[year]
                            });
                            RYTEchart[param][cs][tech].push(chunk);
                        });
                    });
                }
            });
        });
        return RYTEchart;
    }

    static RYTTs(RYTTsdata){
        let RYTTs = {};
        const cloneData = JSON.parse(JSON.stringify(RYTTsdata));
        $.each(cloneData, function (param, obj1) {
            RYTTs[param] = {};
            $.each(obj1, function (sc, array) {
                RYTTs[param][sc] = {};
                $.each(array, function (id, obj) {
                    if(!RYTTs[param][sc][obj.Tech]){ RYTTs[param][sc][obj.Tech] = {}; }
                    RYTTs[param][sc][obj.Tech][obj.Ts] = obj;
                    delete obj.Tech;
                    delete obj.Ts;                    
                });
            });
        });
        return RYTTs;
    }

    static RYTTsgrid(RYTTsdata){
        // let techData = this.getTechData(genData);
        // let scData = this.getScData(genData);
        // let cloneData = JSON.parse(JSON.stringify(RYTTsdata));
        // let RYTTsgrid = {};

        // $.each(cloneData, function (param, obj) {
        //     RYTTsgrid[param] = [];
        //     $.each(obj, function (sc, array) {
        //         $.each(array, function (id, obj) {
        //             obj['ScId'] = sc;
        //             obj['Tech'] = techData[obj.TechId]['Tech'];
        //             obj['TechDesc'] = techData[obj.TechId]['Desc'];
        //             obj['Sc'] = scData[sc]['Scenario'];
        //             obj['ScDesc'] = scData[sc]['Desc'];
        //             RYTTsgrid[param].push(obj);
        //         });
        //     });
        // });
        // return RYTTsgrid;
        return RYTTsdata;
    }

    static RYTTschart(genData, RYTTsdata){
        let RYTTs = this.RYTTs(RYTTsdata);
        //let timeslices = this.Timeslices(genData);
        let RYTTschart = {};
        $.each(RYTTs, function (param, obj1) {
            RYTTschart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYTTschart[param][cs] = {};
                    $.each(obj2, function (tech, obj3) {

                        if(!RYTTschart[param][cs][tech]){ RYTTschart[param][cs][tech] = []; }
                        $.each(genData['osy-years'], function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(obj3, function (ts, obj) {
                                chunk[ts] = obj[year]
                            });
                            RYTTschart[param][cs][tech].push(chunk);
                        });
                    });
                }
            });
        });  
        return RYTTschart;
    }

    static RYCTs(RYCTsdata){
        let RYCTs = {};
        const cloneData = JSON.parse(JSON.stringify(RYCTsdata));
        $.each(cloneData, function (param, obj1) {
            RYCTs[param] = {};
            $.each(obj1, function (sc, array) {
                RYCTs[param][sc] = {};
                $.each(array, function (id, obj) {
                    if(!RYCTs[param][sc][obj.Comm]){ RYCTs[param][sc][obj.Comm] = {}; }
                    RYCTs[param][sc][obj.Comm][obj.Ts] = obj;
                    delete obj.Comm;
                    delete obj.Ts; 
                });
            });
        });
        return RYCTs;
    }

    static RYCTsgrid(genData, RYCTsdata, PARAMETERS){
        // let commData = this.getCommData(genData);
        // let scData = this.getScData(genData);
        // let unitData = this.getUnitData(genData, PARAMETERS);
        // let paramById = this.getParamById(PARAMETERS);
        // let cloneData = JSON.parse(JSON.stringify(RYCTsdata));
        // let RYCTsgrid = {};

        // $.each(cloneData, function (param, obj) {
        //     RYCTsgrid[param] = [];
        //     $.each(obj, function (sc, array) {
        //         $.each(array, function (id, obj) {
        //             obj['Comm'] = commData[obj.CommId]['Comm'];
        //             obj['CommDesc'] = commData[obj.CommId]['Desc'];
        //             obj['ScId'] = sc;
        //             obj['Sc'] = scData[sc]['Scenario'];
        //             obj['ScDesc'] = scData[sc]['Desc'];
        //             let rule = paramById['RYCTs'][param]['unitRule'];
        //             let data = unitData['RYCTs'][param][obj.CommId];
        //             obj['UnitId'] = jsonLogic.apply(rule, data);
        //             RYCTsgrid[param].push(obj);
        //         });
        //     });
        // });
        // return RYCTsgrid;
        return RYCTsdata;
    }

    static RYCTschart(genData, RYCTsdata){
        let RYCTs = this.RYCTs(RYCTsdata);
        let RYCTschart = {};
        $.each(RYCTs, function (param, obj1) {
            RYCTschart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYCTschart[param][cs] = {};
                    $.each(obj2, function (comm, obj3) {
                        if(!RYCTschart[param][cs][comm]){ RYCTschart[param][cs][comm] = []; }
                        $.each(genData['osy-years'], function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(obj3, function (ts, obj) {
                                chunk[ts] = obj[year]
                            });
                            RYCTschart[param][cs][comm].push(chunk);
                        });
                    });
                }
            });
        });  
        return RYCTschart;
    }

    static RYTEM(RYTEMdata){
        let RYTEM = {};
        const cloneData = JSON.parse(JSON.stringify(RYTEMdata));
        $.each(cloneData, function (param, obj1) {
            RYTEM[param] = {};
            $.each(obj1, function (sc, array) {
                RYTEM[param][sc] = {};
                $.each(array, function (id, obj) {
                    if(!RYTEM[param][sc][obj.Tech]){ RYTEM[param][sc][obj.Tech] = {}; }
                    if(!RYTEM[param][sc][obj.Tech][obj.Emi]){ RYTEM[param][sc][obj.Tech][obj.Emi] = {}; }
                        RYTEM[param][sc][obj.Tech][obj.Emi][obj.MoId] = obj;
                        delete obj.Tech;
                        delete obj.Emi; 
                        delete obj.MoId;   
                });
            });
        });
        return RYTEM;
    }

    static RYTEMTechs(RYTEMdata){
        let RYTEMTechs = {};
        let RYTEM = this.RYTEM(RYTEMdata);
        $.each(RYTEM, function (param, obj1) {
            RYTEMTechs[param] = {};
            $.each(obj1, function (cs, array) {
                RYTEMTechs[param][cs] = Object.keys(array);
            });
        });
        return RYTEMTechs;
    }

    static RYTEMEmis(RYTEMdata){
        let RYTEMemis = {};
        let RYTEM = this.RYTEM(RYTEMdata);
        $.each(RYTEM, function (param, obj1) {
            RYTEMemis[param] = {};
            $.each(obj1, function (cs, obj2) {
                RYTEMemis[param][cs] = {};
                $.each(obj2, function (tech, array) {
                    RYTEMemis[param][cs][tech] = Object.keys(array);
                });
            });
        });
        return RYTEMemis;
    }

    static RYTEMgrid(RYTEMdata){
        // let techData = this.getTechData(genData);
        // let emiData = this.getEmiData(genData);
        // let scData = this.getScData(genData);
        // let unitData = this.getUnitData(genData, PARAMETERS);
        // let paramById = this.getParamById(PARAMETERS);
        // let cloneData = JSON.parse(JSON.stringify(RYTEMdata));
        // let RYTEMgrid = {};
        // $.each(cloneData, function (param, obj) {
        //     RYTEMgrid[param] = [];
        //     $.each(obj, function (sc, array) {
        //         $.each(array, function (id, obj) {
        //             obj['Tech'] = techData[obj.TechId]['Tech'];
        //             obj['TechDesc'] = techData[obj.TechId]['Desc'];
        //             obj['Emis'] = emiData[obj.EmisId]['Emis'];
        //             obj['EmiDesc'] = emiData[obj.EmisId]['Desc'];
        //             obj['ScId'] = sc;
        //             obj['Sc'] = scData[sc]['Scenario'];
        //             obj['ScDesc'] = scData[sc]['Desc'];
        //             let rule = paramById['RYTEM'][param]['unitRule'];
        //             let data1 = unitData['RYTEM'][param][obj.EmisId];
        //             let data2 = unitData['RYTEM'][param][obj.TechId];
        //             const data = {...data1, ...data2};
        //             obj['UnitId'] = jsonLogic.apply(rule, data);
        //             RYTEMgrid[param].push(obj);
        //         });
        //     });
        // });
        // return RYTEMgrid;
        return RYTEMdata;
    }

    static RYTEMchart(genData, RYTEMdata){
        let RYTEMchart = {};
        let RYTEM = this.RYTEM(RYTEMdata);
        $.each(RYTEM, function (param, obj1) {
            RYTEMchart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYTEMchart[param][cs] = {};
                    $.each(obj2, function (tech, obj3) {
                        if(!RYTEMchart[param][cs][tech]){ RYTEMchart[param][cs][tech] = {}; }
                        $.each(genData['osy-years'], function (idY, year) {
       
                            $.each(obj3, function (emi, obj4) {
                                if(!RYTEMchart[param][cs][tech][emi]){ RYTEMchart[param][cs][tech][emi] = []; }
                                let chunk = {};
                                chunk['Year'] = year;
                                $.each(obj4, function (mod, obj) {
                                    chunk[mod] = obj[year]
                                });
                                RYTEMchart[param][cs][tech][emi].push(chunk);
                            });
                            
                           
                        });
                    });
                }
            });
        });  
        return RYTEMchart;
    }

    static RYTCTs(RYTCTsMdata){
        let RYTCTs = {};
        const cloneData = JSON.parse(JSON.stringify(RYTCTsMdata));
        $.each(cloneData, function (param, obj1) {
            RYTCTs[param] = {};
            $.each(obj1, function (sc, array) {
                RYTCTs[param][sc] = {};
                $.each(array, function (id, obj) {
                    if(!RYTCTs[param][sc][obj.Tech]){ RYTCTs[param][sc][obj.Tech] = {}; }
                    if(!RYTCTs[param][sc][obj.Tech][obj.Comm]){ RYTCTs[param][sc][obj.Tech][obj.Comm] = {}; }
                    RYTCTs[param][sc][obj.Tech][obj.Comm][obj.Ts] = obj;
                        delete obj.Tech;
                        delete obj.Comm; 
                        delete obj.Ts;   
                });
            });
        });
        return RYTCTs;
    }

    static RYTCTsTechs(RYTCTsdata){
        let RYTCTsTechs = {};
        let RYTCTs = this.RYTCTs(RYTCTsdata);
        $.each(RYTCTs, function (param, obj1) {
            RYTCTsTechs[param] = {};
            $.each(obj1, function (cs, array) {
                RYTCTsTechs[param][cs] = Object.keys(array);
            });
        });
        return RYTCTsTechs;
    }

    static RYTCTsComms(RYTCTsdata){
        let RYTCTsComms = {};
        let RYTCTs = this.RYTCTs(RYTCTsdata);
        $.each(RYTCTs, function (param, obj1) {
            RYTCTsComms[param] = {};
            $.each(obj1, function (cs, obj2) {
                RYTCTsComms[param][cs] = {};
                $.each(obj2, function (comm, array) {
                    RYTCTsComms[param][cs][comm] = Object.keys(array);
                });
            });
        });
        return RYTCTsComms;
    }

    static RYTCTsgrid(RYTCTsdata){
        return RYTCTsdata;
    }

    static RYTCTschart(genData, RYTCTsdata){
        let RYTCTschart = {};
        let RYTCTs = this.RYTCTs(RYTCTsdata);
        $.each(RYTCTs, function (param, obj1) {
            RYTCTschart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYTCTschart[param][cs] = {};
                    $.each(obj2, function (tech, obj3) {
                        if(!RYTCTschart[param][cs][tech]){ RYTCTschart[param][cs][tech] = {}; }
                        $.each(genData['osy-years'], function (idY, year) {
       
                            $.each(obj3, function (comm, obj4) {
                                if(!RYTCTschart[param][cs][tech][comm]){ RYTCTschart[param][cs][tech][comm] = []; }
                                let chunk = {};
                                chunk['Year'] = year;
                                $.each(obj4, function (ts, obj) {
                                    chunk[ts] = obj[year]
                                });
                                RYTCTschart[param][cs][tech][comm].push(chunk);
                            });
                            
                           
                        });
                    });
                }
            });
        });  
        return RYTCTschart;
    }

    static RYTMTs(RYTMTsMdata){
        let RYTMTs = {};
        const cloneData = JSON.parse(JSON.stringify(RYTMTsMdata));
        $.each(cloneData, function (param, obj1) {
            RYTMTs[param] = {};
            $.each(obj1, function (sc, array) {
                RYTMTs[param][sc] = {};
                $.each(array, function (id, obj) {
                    if(!RYTMTs[param][sc][obj.Tech]){ RYTMTs[param][sc][obj.Tech] = {}; }
                    if(!RYTMTs[param][sc][obj.Tech][obj.MoId]){ RYTMTs[param][sc][obj.Tech][obj.MoId] = {}; }
                    RYTMTs[param][sc][obj.Tech][obj.MoId][obj.Ts] = obj;
                        delete obj.Tech;
                        delete obj.MoId; 
                        delete obj.Ts;   
                });
            });
        });
        return RYTMTs;
    }

    static RYTMTsgrid(RYTMTsdata){
        return RYTMTsdata;
    }

    static RYTMTschart(genData, RYTMTsdata){
        let RYTMTschart = {};
        let RYTMTs = this.RYTMTs(RYTMTsdata);
        $.each(RYTMTs, function (param, obj1) {
            RYTMTschart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYTMTschart[param][cs] = {};
                    $.each(obj2, function (tech, obj3) {
                        if(!RYTMTschart[param][cs][tech]){ RYTMTschart[param][cs][tech] = {}; }
                        $.each(genData['osy-years'], function (idY, year) {
                            $.each(obj3, function (mod, obj4) {
                                if(!RYTMTschart[param][cs][tech][mod]){ RYTMTschart[param][cs][tech][mod] = []; }
                                let chunk = {};
                                chunk['Year'] = year;
                                $.each(obj4, function (ts, obj) {
                                    chunk[ts] = obj[year]
                                });
                                RYTMTschart[param][cs][tech][mod].push(chunk);
                            });
                        });
                    });
                }
            });
        });  
        return RYTMTschart;
    }

    static RYTCMTs(RYTCMTsMdata){
        let RYTCMTs = {};
        const cloneData = JSON.parse(JSON.stringify(RYTCMTsMdata));
        $.each(cloneData, function (param, obj1) {
            RYTCMTs[param] = {};
            $.each(obj1, function (cs, array) {
                RYTCMTs[param][cs] = {};
                $.each(array, function (id, obj) {
                    if(!RYTCMTs[param][cs][obj.Tech]){ RYTCMTs[param][cs][obj.Tech] = {}; }
                    if(!RYTCMTs[param][cs][obj.Tech][obj.Comm]){ RYTCMTs[param][cs][obj.Tech][obj.Comm] = {}; }
                    if(!RYTCMTs[param][cs][obj.Tech][obj.Comm][obj.MoId]){ RYTCMTs[param][cs][obj.Tech][obj.Comm][obj.MoId] = {}; }

                    RYTCMTs[param][cs][obj.Tech][obj.Comm][obj.MoId][obj.Ts] = obj;
                        delete obj.Tech;
                        delete obj.Comm; 
                        delete obj.MoId;
                        delete obj.Ts;   
                });
            });
        });
        return RYTCMTs;
    }

    static RYTCMTsTechs(RYTCMTsdata){
        let RYTCTsTechs = {};
        let RYTCMTs = this.RYTCMTs(RYTCMTsdata);
        $.each(RYTCMTs, function (param, obj1) {
            RYTCTsTechs[param] = {};
            $.each(obj1, function (cs, array) {
                RYTCTsTechs[param][cs] = Object.keys(array);
            });
        });
        return RYTCTsTechs;
    }

    static RYTCMTsComms(RYTCMTsdata){
        let RYTCTsComms = {};
        let RYTCMTs = this.RYTCMTs(RYTCMTsdata);
        $.each(RYTCMTs, function (param, obj1) {
            RYTCTsComms[param] = {};
            $.each(obj1, function (cs, obj2) {
                RYTCTsComms[param][cs] = {};
                $.each(obj2, function (comm, array) {
                    RYTCTsComms[param][cs][comm] = Object.keys(array);
                });
            });
        });
        return RYTCTsComms;
    }

    static RYTCMTsgrid(RYTCMTsdata){
        return RYTCMTsdata;
    }

    static RYTCMTschart(genData, RYTCMTsdata){
        let RYTCTschart = {};
        let RYTCMTs = this.RYTCMTs(RYTCMTsdata);
        $.each(RYTCMTs, function (param, obj1) {
            RYTCTschart[param] = {};
            $.each(obj1, function (cs, obj2) {
                if (obj2.length !== 0){
                    RYTCTschart[param][cs] = {};
                    $.each(obj2, function (tech, obj3) {
                        if(!RYTCTschart[param][cs][tech]){ RYTCTschart[param][cs][tech] = {}; }
                        $.each(genData['osy-years'], function (idY, year) {
       
                            $.each(obj3, function (comm, obj4) {
                                if(!RYTCTschart[param][cs][tech][comm]){ RYTCTschart[param][cs][tech][comm] = []; }
                                $.each(obj4, function (mod, obj5) {
                                    if(!RYTCTschart[param][cs][tech][comm][mod]){ RYTCTschart[param][cs][tech][comm][mod] = []; }
                                    let chunk = {};
                                    chunk['Year'] = year;
                                    $.each(obj5, function (ts, obj) {
                                        chunk[ts] = obj[year]
                                    });
                                    RYTCTschart[param][cs][tech][comm][mod].push(chunk);
                                });

                            });
                            
                           
                        });
                    });
                }
            });
        });  
        return RYTCTschart;
    }







    // static RYTs(RYTsdata){
    //     let RYTs = {};
    //     const cloneData = JSON.parse(JSON.stringify(RYTsdata));
    //     $.each(cloneData, function (param, obj1) {
    //         RYTs[param] = {};
    //         $.each(obj1, function (sc, array) {
    //             RYTs[param][sc] = {};
    //             $.each(array, function (id, obj) {
    //                 RYTs[param][sc][obj['YearSplit']] = obj;
    //                 delete obj.YearSplit;
    //             });
    //         });
    //     });
    //     return RYTs;
    // }

    // static RYTsgrid(genData, RYTsdata){

    //     //let scName = this.ScName(genData);
    //     let scData = this.getScData(genData);
    //     let cloneData = JSON.parse(JSON.stringify(RYTsdata));
    //     let RYTsgrid = {};

    //     $.each(cloneData, function (param, paramObj) {
    //         RYTsgrid[param] = [];
    //         $.each(paramObj, function (sc, array) {
    //             $.each(array, function (id, obj) {
    //                 obj['ScId'] = sc;
    //                 // obj['Sc'] = scName[sc];
    //                 obj['Sc'] = scData[sc]['Scenario'];
    //                 obj['ScDesc'] = scData[sc]['Desc'];
    //                 RYTsgrid[param].push(obj);
    //             }); 
    //         });
    //     });
    //     return RYTsgrid;
    // }

    // static RYTschart(genData, RYTsdata){
    //     let RYTs = this.RYTs(RYTsdata);
    //     let RYTschart = {};
    //     $.each(RYTsdata, function (param, obj1) {
    //         let chartData = []
    //         $.each(obj1, function (sc, array) {        
    //             $.each(array, function (id, obj) {
    //                 //if(!chartData[obj.YearSplit]){ chartData[obj.YearSplit] = []; }
    //                 chartData[obj.YearSplit] = [];  
    //                 $.each(genData['osy-years'], function (idY, year) {                  
    //                     let chunk = {};
    //                     chunk['Year'] = year;
    //                     $.each(genData['osy-scenarios'], function (idS, sc) {
    //                         chunk[sc.ScenarioId] = RYTs[param][sc.ScenarioId][obj.YearSplit][year];
    //                     });
    //                     chartData[obj.YearSplit].push(chunk);
    //                 });              
    //             });
    //         }); 
    //         RYTschart[param] = chartData;    
    //     });       
    //     return RYTschart;
    // }



    // static RYTCM(RYTCMdata){
    //     let RYTCM = {};
    //     const cloneData = JSON.parse(JSON.stringify(RYTCMdata));
    //     $.each(cloneData, function (param, obj1) {
    //         RYTCM[param] = {};
    //         $.each(obj1, function (sc, array) {
    //             RYTCM[param][sc] = {};
    //             $.each(array, function (id, obj) {
    //                 if(!RYTCM[param][sc][obj.TechId]){ RYTCM[param][sc][obj.TechId] = {}; }
    //                 if(!RYTCM[param][sc][obj.TechId][obj.CommId]){ RYTCM[param][sc][obj.TechId][obj.CommId] = {}; }
    //                     RYTCM[param][sc][obj.TechId][obj.CommId][obj.MoId] = obj;
    //                     delete obj.TechId;
    //                     delete obj.CommId; 
    //                     delete obj.MoId;   
    //             });
    //         });
    //     });
    //     return RYTCM;
    // }

    // static RYTCMgrid(genData, RYTCMdata, PARAMETERS){
    //     // let techName = this.TechName(genData);
    //     // let commName = this.CommName(genData);
    //     // let scName = this.ScName(genData);
    //     let techData = this.getTechData(genData);
    //     let commData = this.getCommData(genData);
    //     let scData = this.getScData(genData);
    //     let unitData = this.getUnitData(genData, PARAMETERS);
    //     let paramById = this.getParamById(PARAMETERS);
    //     let cloneData = JSON.parse(JSON.stringify(RYTCMdata));
    //     let RYTCMgrid = {};
    //     $.each(cloneData, function (param, obj) {
    //         RYTCMgrid[param] = [];
    //         $.each(obj, function (sc, array) {
    //             $.each(array, function (id, obj) {
    //                 // obj['ScId'] = sc;
    //                 // obj['Sc'] = scName[sc];
    //                 // obj['Tech'] = techName[obj['TechId']];
    //                 // obj['Comm'] = commName[obj['CommId']];
    //                 obj['Tech'] = techData[obj.TechId]['Tech'];
    //                 obj['TechDesc'] = techData[obj.TechId]['Desc'];
    //                 obj['Comm'] = commData[obj.CommId]['Comm'];
    //                 obj['CommDesc'] = commData[obj.CommId]['Desc'];
    //                 obj['ScId'] = sc;
    //                 obj['Sc'] = scData[sc]['Scenario'];
    //                 obj['ScDesc'] = scData[sc]['Desc'];
    //                 let rule = paramById['RYTCM'][param]['unitRule'];
    //                 let data1 = unitData['RYTCM'][param][obj.CommId];
    //                 let data2 = unitData['RYTCM'][param][obj.TechId];
    //                 const data = {...data1, ...data2};
    //                 obj['UnitId'] = jsonLogic.apply(rule, data);
    //                 RYTCMgrid[param].push(obj);
    //             });
    //         });
    //     });
    //     return RYTCMgrid;
    // }

    // static RYTCMchart(genData, RYTCMdata){
    //     let RYTCMchart = {};
    //     let RYTCM = this.RYTCM(RYTCMdata);
    //     $.each(RYTCMdata, function (param, obj1) {
    //         RYTCMchart[param] = {};
    //         $.each(obj1, function (sc, array) {
    //             if (array.length !== 0){
    //                 $.each(array, function (id, obj) {
    //                     if(!RYTCMchart[param][obj.TechId]){ RYTCMchart[param][obj.TechId] = {}; }
    //                     if(!RYTCMchart[param][obj.TechId][obj.CommId]){ RYTCMchart[param][obj.TechId][obj.CommId] = {}; }
    //                     RYTCMchart[param][obj.TechId][obj.CommId][obj.MoId] =[]
    //                     $.each(genData['osy-years'], function (idY, year) {
    //                         let chunk = {};
    //                         chunk['Year'] = year;
    //                         $.each(genData['osy-scenarios'], function (idS, sc) {
    //                             chunk[sc.ScenarioId] = RYTCM[param][sc.ScenarioId][obj.TechId][obj.CommId][obj.MoId][year];
    //                         });
    //                         RYTCMchart[param][obj.TechId][obj.CommId][obj.MoId].push(chunk);
    //                     });
    //                 });
    //             }
    //         });
    //     });
    //     return RYTCMchart;
    // }




}