export class DataModel{

    //get name from id
    static TechName(genData){
        let techNames = {};
        $.each(genData['osy-tech'], function (id, obj) {
            techNames[obj['TechId']] = obj['Tech'];
        });
        return techNames;
    }

    //get id from name
    static TechId(genData){
        let techIds = {};
        $.each(genData['osy-tech'], function (id, obj) {
            techIds[obj['Tech']] = obj['TechId'];
        });
        return techIds;
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

    static ParamName(parameters){
        let ParamName = {};
        $.each(parameters, function (id, obj) {
            ParamName[obj.id] = obj.value;
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

    static activityTechsComms(techs){
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

    static activityTechsEmis(techs){
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
    ////////////////////////////////////////////////////////JSON data structures
    static R(Rdata){
        let R = {};
        const cloneData = JSON.parse(JSON.stringify(Rdata));
        $.each(cloneData, function (param, obj1) {
            R[param] = {};
            $.each(obj1, function (sc, array) {
                R[param][sc] = {};
                $.each(array, function (id, obj) { 
                    R[param][sc] = obj
                });
            });
        });
        return R;
    }

    static Rgrid(genData, Rdata, parameters){
        let scName = this.ScName(genData);
        let paramName = this.ParamName(parameters);
        const cloneData = JSON.parse(JSON.stringify(Rdata));
        let Rgrid = {};
        $.each(cloneData, function (param, paramObj) {
            Rgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ParamId'] = param;
                    obj['Param'] = paramName[param];
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    Rgrid[param].push(obj);
                }); 
            });
        });
        return Rgrid;
    }

    static Rchart(genData, Rdata){
        let Rchart = {};
        let data = this.R(Rdata);
        $.each(Rdata, function (param, obj1) {
            Rchart[param] = [];
            let chunk = {};
            chunk['value'] = param;
            $.each(genData['osy-scenarios'], function (idS, sc) {
                if (typeof data[param][sc.ScenarioId]['value'] !== "undefined" ){
                    chunk[sc.ScenarioId] = data[param][sc.ScenarioId]['value'];
                }
            });
            Rchart[param].push(chunk);             
        });
        return Rchart;
    }

    static RY(RYdata){
        let RY = {};
        const cloneData = JSON.parse(JSON.stringify(RYdata));
        $.each(cloneData, function (param, obj1) {
            RY[param] = {};
            $.each(obj1, function (sc, array) {
                RY[param][sc] = {};
                $.each(array, function (id, obj) {
                    RY[param][sc] = obj
                });
            });
        });
        return RY;
    }

    static RYgrid(genData, RYdata, parameters){
        let scName = this.ScName(genData);
        let paramName = this.ParamName(parameters);
        const cloneData = JSON.parse(JSON.stringify(RYdata));
        let RYgrid = {};
        $.each(cloneData, function (param, paramObj) {
            RYgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ParamId'] = param;
                    obj['Param'] = paramName[param];
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    RYgrid[param].push(obj);
                }); 
            });
        });
        return RYgrid;
    }

    static RYchart(genData, RYdata){
        let RYchart = {};
        let RY = this.RY(RYdata);

        $.each(RY, function (param, array) {
            let chartData = [];
            $.each(genData['osy-years'], function (idY, year) { 
                let chunk = {};
                chunk['Year'] = year;
                $.each(genData['osy-scenarios'], function (idS, sc) {
                    chunk[sc.ScenarioId] = RY[param][sc.ScenarioId][year];
                });
                chartData.push(chunk);
            });
            RYchart[param] = chartData; 
        });
        return RYchart;
    }

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

    static RTgrid(genData, RTdata, parameters){
        let scName = this.ScName(genData);
        let paramName = this.ParamName(parameters);
        const cloneData = JSON.parse(JSON.stringify(RTdata));
        let RTgrid = {};
        $.each(cloneData, function (param, paramObj) {
            RTgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ParamId'] = param;
                    obj['Param'] = paramName[param];
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    RTgrid[param].push(obj);
                }); 
            });
        });
        return RTgrid;
    }

    static RTchart(genData, RTdata){
        let techName = this.TechName(genData);
        let RTchart = {};
        //RYTdata[VC] = [{tech, Sc,2000, 2020...}]
        let data = this.RT(RTdata);
        $.each(RTdata, function (param, obj1) {
            RTchart[param] = [];
            $.each(genData['osy-tech'], function (idT, tech) {
                let chunk = {};
                chunk['TechId'] = tech.TechId;
                chunk['Tech'] = techName[tech.TechId];
                $.each(genData['osy-scenarios'], function (idS, sc) {
                    if (typeof data[param][sc.ScenarioId][tech.TechId] !== "undefined" ){
                        chunk[sc.ScenarioId] = data[param][sc.ScenarioId][tech.TechId];
                    }
                });
                RTchart[param].push(chunk);
            });                
        });
        return RTchart;
    }

    static RE(REdata){
        let RE = {};
        const cloneData = JSON.parse(JSON.stringify(REdata));
        $.each(cloneData, function (param, obj1) {
            RE[param] = {};
            $.each(obj1, function (sc, array) {
                RE[param][sc] = {};
                $.each(array, function (id, obj) { 
                    RE[param][sc] = obj
                });
            });
        });
        return RE;
    }

    static REgrid(genData, REdata, parameters){
        let scName = this.ScName(genData);
        let paramName = this.ParamName(parameters);
        const cloneData = JSON.parse(JSON.stringify(REdata));
        let REgrid = {};
        $.each(cloneData, function (param, paramObj) {
            REgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ParamId'] = param;
                    obj['Param'] = paramName[param];
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    REgrid[param].push(obj);
                }); 
            });
        });
        return REgrid;
    }

    static REchart(genData, REdata){
        let emiName = this.EmiName(genData);
        let REchart = {};
        //RYTdata[VC] = [{tech, Sc,2000, 2020...}]
        let data = this.RE(REdata);
        $.each(REdata, function (param, obj1) {
            REchart[param] = [];
            $.each(genData['osy-emis'], function (idT, emi) {
                let chunk = {};
                chunk['EmiId'] = emi.EmisId;
                chunk['Emi'] = emiName[emi.EmisId];
                $.each(genData['osy-scenarios'], function (idS, sc) {
                    if (typeof data[param][sc.ScenarioId][emi.EmisId] !== "undefined" ){
                        chunk[sc.ScenarioId] = data[param][sc.ScenarioId][emi.EmisId];
                    }
                });
                REchart[param].push(chunk);
            });                
        });
        return REchart;
    }

    static RYT(RYTdata){
        let RYT = {};
        const cloneData = JSON.parse(JSON.stringify(RYTdata));
        $.each(cloneData, function (param, obj1) {
            RYT[param] = {};
            $.each(obj1, function (sc, array) {
                RYT[param][sc] = {};
                $.each(array, function (id, obj) {
                    RYT[param][sc][obj.TechId] = obj
                    delete obj.TechId;
                    delete obj.Tech;
                    delete obj.ScId;
                    delete obj.Sc;
                });
            });
        });
        return RYT;
    }

    static RYTgrid(genData, RYTdata){
        let techName = this.TechName(genData);
        let scName = this.ScName(genData);
        const cloneData = JSON.parse(JSON.stringify(RYTdata));
        let RYTgrid = {};
        $.each(cloneData, function (param, paramObj) {
            RYTgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['Tech'] = techName[obj['TechId']];
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    RYTgrid[param].push(obj);
                }); 
            });
        });
        return RYTgrid;
    }

    static RYTchart(genData, RYTdata){
        let RYTchart = {};
        //RYTdata[VC] = [{tech, Sc,2000, 2020...}]
        let data = this.RYT(RYTdata);
        $.each(RYTdata, function (param, obj1) {
            let chartData = {};
            $.each(genData['osy-years'], function (idY, year) { 
                $.each(genData['osy-tech'], function (idT, tech) {
                    let chunk = {};
                    chunk['Year'] = year;
                    if(!chartData[tech.TechId]){ chartData[tech.TechId] = []; }
                    $.each(genData['osy-scenarios'], function (idS, sc) {
                        if (typeof data[param][sc.ScenarioId][tech.TechId] !== "undefined" ){
                            chunk[sc.ScenarioId] = data[param][sc.ScenarioId][tech.TechId][year];
                        }
                    });
                    chartData[tech.TechId].push(chunk);
                });                
            });
            RYTchart[param] = chartData; 
        });
        return RYTchart;
    }

    static RYC(RYCdata){
        let RYC = {};
        const cloneData = JSON.parse(JSON.stringify(RYCdata));
        $.each(cloneData, function (param, obj1) {
            RYC[param] = {};
            $.each(obj1, function (sc, array) {
                RYC[param][sc] = {};
                $.each(array, function (id, obj) {
                    RYC[param][sc][obj.CommId] = obj
                    delete obj.CommId;
                    delete obj.Comm;
                    delete obj.ScId;
                    delete obj.Sc;
                });
            });
        });
        return RYC;
    }

    static RYCgrid(genData, RYCdata){
        let commName = this.CommName(genData);
        let scName = this.ScName(genData);
        let cloneData = JSON.parse(JSON.stringify(RYCdata));
        let RYCgrid = {};
        $.each(cloneData, function (param, paramObj) {
            RYCgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['Comm'] = commName[obj['CommId']];
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    RYCgrid[param].push(obj);
                }); 
            });
        });
        return RYCgrid;
    }

    static RYCchart(genData, RYCdata){
        let RYCchart = {};
        let data = this.RYC(RYCdata);
        $.each(RYCdata, function (param, array) {
            let chartData = {};
            $.each(genData['osy-years'], function (idY, year) { 
                $.each(genData['osy-comm'], function (idC, comm) {
                    let chunk = {};
                    chunk['Year'] = year;
                    if(!chartData[comm.CommId]){ chartData[comm.CommId] = []; }
                    $.each(genData['osy-scenarios'], function (idS, sc) {
                         chunk[sc.ScenarioId] = data[param][sc.ScenarioId][comm.CommId][year];
                    });
                    chartData[comm.CommId].push(chunk);
                });
            });
            RYCchart[param] = chartData; 
            
        });
        return RYCchart;
    }

    static RYE(RYEdata){
        let RYE = {};
        const cloneData = JSON.parse(JSON.stringify(RYEdata));
        $.each(cloneData, function (param, obj1) {
            RYE[param] = {};
            $.each(obj1, function (sc, array) {
                RYE[param][sc] = {};
                $.each(array, function (id, obj) {
                    RYE[param][sc][obj.EmisId] = obj
                    delete obj.EmisId;
                    // delete obj.Emis;
                    // delete obj.ScId;
                    // delete obj.Sc;
                });
            });
        });
        return RYE;
    }

    static RYEgrid(genData, RYEdata){
        let emiName = this.EmiName(genData);
        let scName = this.ScName(genData);
        let cloneData = JSON.parse(JSON.stringify(RYEdata));
        let RYEgrid = {};
        $.each(cloneData, function (param, paramObj) {
            RYEgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['Emis'] = emiName[obj['EmisId']];
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    RYEgrid[param].push(obj);
                }); 
            });
        });
        return RYEgrid;
    }

    static RYEchart(genData, RYEdata){
        let RYEchart = {};
        let data = this.RYE(RYEdata);
        $.each(RYEdata, function (param, array) {
            let chartData = {};
            $.each(genData['osy-years'], function (idY, year) { 
                $.each(genData['osy-emis'], function (idC, emi) {
                    let chunk = {};
                    chunk['Year'] = year;
                    if(!chartData[emi.EmisId]){ chartData[emi.EmisId] = []; }
                    $.each(genData['osy-scenarios'], function (idS, sc) {
                         chunk[sc.ScenarioId] = data[param][sc.ScenarioId][emi.EmisId][year];
                    });
                    chartData[emi.EmisId].push(chunk);
                });
            });
            RYEchart[param] = chartData; 
            
        });
        return RYEchart;
    }

    static RYTs(RYTsdata){
        let RYTs = {};
        const cloneData = JSON.parse(JSON.stringify(RYTsdata));
        $.each(cloneData, function (param, obj1) {
            RYTs[param] = {};
            $.each(obj1, function (sc, array) {
                RYTs[param][sc] = {};
                $.each(array, function (id, obj) {
                    RYTs[param][sc][obj['YearSplit']] = obj;
                    delete obj.YearSplit;
                });
            });
        });
        return RYTs;
    }

    static RYTsgrid(genData, RYTsdata){

        let scName = this.ScName(genData);
        let cloneData = JSON.parse(JSON.stringify(RYTsdata));
        let RYTsgrid = {};

        $.each(cloneData, function (param, paramObj) {
            RYTsgrid[param] = [];
            $.each(paramObj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    RYTsgrid[param].push(obj);
                }); 
            });
        });
        return RYTsgrid;
    }

    static RYTschart(genData, RYTsdata){
        let RYTs = this.RYTs(RYTsdata);
        let RYTschart = {};
        $.each(RYTsdata, function (param, obj1) {
            let chartData = []
            $.each(obj1, function (sc, array) {        
                $.each(array, function (id, obj) {
                    //if(!chartData[obj.YearSplit]){ chartData[obj.YearSplit] = []; }
                    chartData[obj.YearSplit] = [];  
                    $.each(genData['osy-years'], function (idY, year) {                  
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(genData['osy-scenarios'], function (idS, sc) {
                            chunk[sc.ScenarioId] = RYTs[param][sc.ScenarioId][obj.YearSplit][year];
                        });
                        chartData[obj.YearSplit].push(chunk);
                    });              
                });
            }); 
            RYTschart[param] = chartData;    
        });       
        return RYTschart;
    }

    static RYTC(RYTCdata){
        let RYTC = {};
        const cloneData = JSON.parse(JSON.stringify(RYTCdata));
        $.each(cloneData, function (param, obj1) {
            RYTC[param] = {};
            $.each(obj1, function (sc, array) {
                RYTC[param][sc] = {};
                $.each(array, function (id, obj) {
                    if(!RYTC[param][sc][obj.TechId]){ RYTC[param][sc][obj.TechId] = {}; }
                        RYTC[param][sc][obj.TechId][obj.CommId] = obj;
                        delete obj.TechId;
                        delete obj.CommId;   
                });
            });
        });
        return RYTC;
    }

    static RYTCgrid(genData, RYTCdata){
        let techName = this.TechName(genData);
        let commName = this.CommName(genData);
        let scName = this.ScName(genData);
        let cloneData = JSON.parse(JSON.stringify(RYTCdata));
        let RYTCgrid = {};

        $.each(cloneData, function (param, obj) {
            RYTCgrid[param] = [];
            $.each(obj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    obj['Tech'] = techName[obj['TechId']];
                    obj['Comm'] = commName[obj['CommId']];
                    RYTCgrid[param].push(obj);
                });
            });
        });
        return RYTCgrid;
    }

    static RYTCchart(genData, RYTCdata){
        let RYTCchart = {};
        let RYCT = this.RYTC(RYTCdata);
        $.each(RYTCdata, function (param, obj1) {
            RYTCchart[param] = {};
            $.each(obj1, function (sc, array) {
                if (array.length !== 0){
                    $.each(array, function (id, obj) {
                        if(!RYTCchart[param][obj.TechId]){ RYTCchart[param][obj.TechId] = {}; }
                        RYTCchart[param][obj.TechId][obj.CommId] =[]
                        $.each(genData['osy-years'], function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(genData['osy-scenarios'], function (idS, sc) {
                                chunk[sc.ScenarioId] = RYCT[param][sc.ScenarioId][obj.TechId][obj.CommId][year];
                            });
                            RYTCchart[param][obj.TechId][obj.CommId].push(chunk);
                        });
                    });
                }
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
                    if(!RYTE[param][sc][obj.TechId]){ RYTE[param][sc][obj.TechId] = {}; }
                        RYTE[param][sc][obj.TechId][obj.EmisId] = obj;
                        delete obj.TechId;
                        delete obj.EmisId;   
                });
            });
        });
        return RYTE;
    }

    static RYTEgrid(genData, RYTEdata){
        let techName = this.TechName(genData);
        let emiName = this.EmiName(genData);
        let scName = this.ScName(genData);
        let cloneData = JSON.parse(JSON.stringify(RYTEdata));
        let RYTEgrid = {};
        $.each(cloneData, function (param, obj) {
            RYTEgrid[param] = [];
            $.each(obj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    obj['Tech'] = techName[obj['TechId']];
                    obj['Emis'] = emiName[obj['EmisId']];
                    RYTEgrid[param].push(obj);
                });
            });
        });
        return RYTEgrid;
    }

    static RYTEchart(genData, RYTEdata){
        let RYTEchart = {};
        let RYTE = this.RYTE(RYTEdata);
        $.each(RYTEdata, function (param, obj1) {
            RYTEchart[param] = {};
            $.each(obj1, function (sc, array) {
                if (array.length !== 0){
                    $.each(array, function (id, obj) {
                        if(!RYTEchart[param][obj.TechId]){ RYTEchart[param][obj.TechId] = {}; }
                        RYTEchart[param][obj.TechId][obj.EmisId] =[]
                        $.each(genData['osy-years'], function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(genData['osy-scenarios'], function (idS, sc) {
                                chunk[sc.ScenarioId] = RYTE[param][sc.ScenarioId][obj.TechId][obj.EmisId][year];
                            });
                            RYTEchart[param][obj.TechId][obj.EmisId].push(chunk);
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
                    if(!RYTTs[param][sc][obj.TechId]){ RYTTs[param][sc][obj.TechId] = {}; }
                    RYTTs[param][sc][obj.TechId][obj.Timeslice] = obj;
                    delete obj.TechId;
                    delete obj.Timeslice;                    
                });
            });
        });
        return RYTTs;
    }

    static RYTTsgrid(genData, RYTTsdata){
        let techName = this.TechName(genData);
        let scName = this.ScName(genData);
        let cloneData = JSON.parse(JSON.stringify(RYTTsdata));
        let RYTTsgrid = {};

        $.each(cloneData, function (param, obj) {
            RYTTsgrid[param] = [];
            $.each(obj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    obj['Tech'] = techName[obj['TechId']];
                    RYTTsgrid[param].push(obj);
                });
            });
        });
        return RYTTsgrid;
    }

    static RYTTschart(genData, RYTTsdata){
        let RYTs = this.RYTTs(RYTTsdata);
        let timeslices = this.Timeslices(genData);
        let RYTTschart = {};

        $.each(RYTTsdata, function (param, obj1) {
            let chartData = {}
            $.each(genData['osy-tech'], function (idT, tech) {     
                chartData[tech.TechId] = {};
                $.each(timeslices, function (idS, ts) {   
                    chartData[tech.TechId][ts] = []; 
                    $.each(genData['osy-years'], function (idY, year) {                  
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(genData['osy-scenarios'], function (idS, sc) {
                            chunk[sc.ScenarioId] = RYTs[param][sc.ScenarioId][tech.TechId][ts][year];
                        });
                        chartData[tech.TechId][ts].push(chunk);
                    });              
                });
            }); 
            RYTTschart[param] = chartData;    
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
                    if(!RYCTs[param][sc][obj.CommId]){ RYCTs[param][sc][obj.CommId] = {}; }
                    RYCTs[param][sc][obj.CommId][obj.Timeslice] = obj;
                    delete obj.CommId;
                    delete obj.Timeslice; 
                });
            });
        });
        return RYCTs;
    }

    static RYCTsgrid(genData, RYCTsdata){
        let commName = this.CommName(genData);
        let scName = this.ScName(genData);
        let cloneData = JSON.parse(JSON.stringify(RYCTsdata));
        let RYCTsgrid = {};

        $.each(cloneData, function (param, obj) {
            RYCTsgrid[param] = [];
            $.each(obj, function (sc, array) {
                $.each(array, function (id, obj) {
                    obj['ScId'] = sc;
                    obj['Sc'] = scName[sc];
                    obj['Comm'] = commName[obj['CommId']];
                    RYCTsgrid[param].push(obj);
                });
            });
        });
        return RYCTsgrid;
    }

    static RYCTschart(genData, RYCTsdata){

        let RYCTs = this.RYCTs(RYCTsdata);
        let timeslices = this.Timeslices(genData);

        let RYCTschart = {};


        $.each(RYCTsdata, function (param, obj1) {
            let chartData = {}
            $.each(genData['osy-comm'], function (idT, comm) {     
                chartData[comm.CommId] = {};
                $.each(timeslices, function (idS, ts) {   
                    chartData[comm.CommId][ts] = []; 
                    $.each(genData['osy-years'], function (idY, year) {                  
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(genData['osy-scenarios'], function (idS, sc) {
                            chunk[sc.ScenarioId] = RYCTs[param][sc.ScenarioId][comm.CommId][ts][year];
                        });
                        chartData[comm.CommId][ts].push(chunk);
                    });              
                });
            }); 
            RYCTschart[param] = chartData;    
        }); 
        return RYCTschart;
    }
}