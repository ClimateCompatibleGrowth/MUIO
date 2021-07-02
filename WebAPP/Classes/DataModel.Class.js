export class DataModel{

    static TechName(genData){
        let techNames = {};
        $.each(genData['osy-tech'], function (id, obj) {
            techNames[obj['TechId']] = obj['Tech'];
        });
        return techNames;
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
        $.each(RYTCdata, function (param, array) {
            RYTC[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(key != 'TechId' && key != 'CommId'){
                        if(!RYTC[param][key]){ RYTC[param][key] = {}; }
                        if(!RYTC[param][key][obj['TechId']]){ RYTC[param][key][obj['TechId']] = {}; }
                        RYTC[param][key][obj['TechId']][obj['CommId']] = val;
                    }
                });
            });
        });
        return RYTC;
    }

    static RYTCgrid(genData, RYTCdata){
        let techName = this.TechName(genData);
        let commName = this.CommName(genData);
        let RYTCgrid = JSON.parse(JSON.stringify(RYTCdata));
        $.each(RYTCdata, function (param, array) {
            $.each(array, function (id, obj) {
                RYTCgrid[param][id]['Tech'] = techName[obj['TechId']];
                RYTCgrid[param][id]['Comm'] = commName[obj['CommId']];
            });
        });
        return RYTCgrid;
    }

    static RYTCchart(genData, RYTCdata){
        let RYTCchart = {};
        let RYCT = this.RYTC(RYTCdata);
        $.each(RYTCdata, function (param, array) {
            RYTCchart[param] = {};
            $.each(genData['osy-tech'], function (idT, tech) {
                RYTCchart[param][tech.TechId] = {};
                let chartData = [];
                if (array.length !== 0){
                    $.each(genData['osy-years'], function (idY, year) {
                        //console.log('RYCT chunk ', RYCT[param][year][tech.TechId])
                        if ( typeof RYCT[param][year][tech.TechId] !== "undefined" ){
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(genData['osy-comm'], function (idC, comm) {
                                if (typeof RYCT[param][year][tech.TechId][comm.CommId]  !== "undefined" ){
                                    chunk[comm['CommId']] = RYCT[param][year][tech.TechId][comm.CommId];
                                }
                            });
                            //console.log('param ', param, ' tech ', tech.TechId, ' year ', year, ' chunk ', chunk)
                            chartData.push(chunk);
                        }
                    });
                }
                RYTCchart[param][tech.TechId] = chartData; 
            });
        });
        return RYTCchart;
    }

    static RYTE(RYTEdata){
        let RYTE = {};
        $.each(RYTEdata, function (param, array) {
            RYTE[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(!RYTE[param][key]){ RYTE[param][key] = {}; }
                    if(key != 'TechId' && key != 'EmisId'){
                        if(!RYTE[param][key][obj['TechId']]){ RYTE[param][key][obj['TechId']] = {}; }
                        RYTE[param][key][obj['TechId']][obj['EmisId']] = val;
                    }
                });
            });
        });
        return RYTE;
    }

    static RYTEgrid(genData, RYTEdata){
        let techName = this.TechName(genData);
        let emiName = this.EmiName(genData);
        let RYTEgrid = JSON.parse(JSON.stringify(RYTEdata));
        $.each(RYTEdata, function (param, array) {
            $.each(array, function (id, obj) {
                RYTEgrid[param][id]['Tech'] = techName[obj['TechId']];
                RYTEgrid[param][id]['Emis'] = emiName[obj['EmisId']];
            });
        });
        return RYTEgrid;
    }

    static RYTEchart(genData, RYTEdata){
        let RYTEchart = {};
        let techData = this.RYTE(RYTEdata);
        $.each(RYTEdata, function (param, array) {
            RYTEchart[param] = {};
            $.each(genData['osy-tech'], function (idT, tech) {
                RYTEchart[param][tech.TechId] = {};
                let chartData = [];
                $.each(genData['osy-years'], function (idY, year) {
                    if ( typeof techData[param][year][tech.TechId] !== "undefined"   ){
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(genData['osy-emis'], function (idC, emi) {
                            if (typeof techData[param][year][tech.TechId][emi.EmisId]  !== "undefined" ){
                                chunk[emi['EmisId']] = techData[param][year][tech.TechId][emi.EmisId];
                            }
                        });
                        chartData.push(chunk);
                    }
                });
                RYTEchart[param][tech.TechId] = chartData; 
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
                    if(!RYTTs[param][sc][obj['TechId']]){ RYTTs[param][sc][obj['TechId']] = {}; }
                    RYTTs[param][sc][obj['TechId']][obj['Timeslice']] = obj;
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

    // static RYTTschart(genData, RYTTsdata){
    //     let RYTs = this.RYTTs(RYTTsdata);
    //     let RYTTschart = {};
    //     $.each(RYTTsdata, function (param, obj1) {
    //         let chartData = {}
    //         $.each(obj1, function (sc, array) {        
    //             $.each(array, function (id, obj) {
                   
    //                 chartData[obj.TechId] = {};  
    //                  if(!chartData[obj.TechId][obj.Timeslice]){chartData[obj.TechId][obj.Timeslice] = []; }
    //                 $.each(genData['osy-years'], function (idY, year) {                  
    //                     let chunk = {};
    //                     chunk['Year'] = year;
    //                     $.each(genData['osy-scenarios'], function (idS, sc) {
    //                         chunk[sc.ScenarioId] = RYTs[param][sc.ScenarioId][obj.TechId][obj.Timeslice][year];
    //                     });
    //                     chartData[obj.TechId][obj.Timeslice].push(chunk);
    //                 });              
    //             });
    //         }); 
    //         RYTTschart[param] = chartData;    
    //     });       
    //     return RYTTschart;
    // }

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

    // static RYTTschart_(genData, RYTTsdata){
        
    //     let techData = this.RYTTs(RYTTsdata);
    //     let RYTTschart = {};
    //     $.each(RYTTsdata, function (param, array) {
    //         RYTTschart[param] = {};
    //         $.each(genData['osy-tech'], function (idT, tech) {
    //             RYTTschart[param][tech.TechId] = {};
    //             let chartData = [];
    //             $.each(genData['osy-years'], function (idY, year) {
    //                 if ( typeof techData[param][year][tech.TechId] !== "undefined"   ){
    //                     let chunk = {};
    //                     chunk['Year'] = year;
    //                     $.each(array, function (idC, obj) {
    //                         if (typeof techData[param][year][tech.TechId][obj.Timeslice]  !== "undefined" ){
    //                             chunk[obj.Timeslice] = techData[param][year][tech.TechId][obj.Timeslice];
    //                         }
    //                     });
    //                     chartData.push(chunk);
    //                 }
    //             });
    //             RYTTschart[param][tech.TechId] = chartData; 
    //         });
    //     });
    //     return RYTTschart;
    // }

    static RYCTs(RYCTsdata){
        let RYCTs = {};
        $.each(RYCTsdata, function (param, array) {
            RYCTs[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(!RYCTs[param][key]){ RYCTs[param][key] = {}; }
                    if(key != 'CommId' && key != 'Timeslice'){
                        if(!RYCTs[param][key][obj['CommId']]){ RYCTs[param][key][obj['CommId']] = {}; }
                        RYCTs[param][key][obj['CommId']][obj['Timeslice']] = val;
                    }
                });
            });
        });
        return RYCTs;
    }

    static RYCTsgrid(genData, RYCTsdata){
        let commName = this.CommName(genData);
        let RYCTsgrid = JSON.parse(JSON.stringify(RYCTsdata));
        $.each(RYCTsdata, function (param, array) {
            $.each(array, function (id, obj) {
                RYCTsgrid[param][id]['Comm'] = commName[obj['CommId']];
            });
        });
        return RYCTsgrid;
    }

    static RYCTschart(genData, RYCTsdata){
        let RYCTschart = {};
        let techData = this.RYCTs(RYCTsdata);
        $.each(RYCTsdata, function (param, array) {
            RYCTschart[param] = {};
            $.each(genData['osy-comm'], function (idT, comm) {
                RYCTschart[param][comm.CommId] = {};
                let chartData = [];
                $.each(genData['osy-years'], function (idY, year) {
                    if ( typeof techData[param][year][comm.CommId] !== "undefined"   ){
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(array, function (idC, obj) {
                            if (typeof techData[param][year][comm.CommId][obj.Timeslice]  !== "undefined" ){
                                chunk[obj.Timeslice] = techData[param][year][comm.CommId][obj.Timeslice];
                            }
                        });
                        chartData.push(chunk);
                    }
                });
                RYCTschart[param][comm.CommId] = chartData; 
            });
        });
        return RYCTschart;
    }
}