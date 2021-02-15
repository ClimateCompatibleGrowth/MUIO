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

    static RYT(RYTdata){
        let RYT = {};
        $.each(RYTdata, function (param, array) {
            RYT[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(!RYT[param][key]){
                        RYT[param][key] = {};
                    }
                    if(key != 'TechId'){
                        RYT[param][key][obj['TechId']] = val;
                    }
                });
            });
        });
        return RYT;
    }

    static RYTgrid(genData, RYTdata){
        let techName = this.TechName(genData);
        let RYTgrid = JSON.parse(JSON.stringify(RYTdata));
        $.each(RYTdata, function (param, array) {
            $.each(array, function (id, obj) {
                RYTgrid[param][id]['Tech'] = techName[obj['TechId']];
            });
        });
        return RYTgrid;
    }

    static RYTchart(genData, RYTdata){
        let RYTchart = {};
        let techData = this.RYT(RYTdata);
        $.each(RYTdata, function (param, array) {
            let chartData = [];
            $.each(genData['osy-years'], function (idY, year) { 
                let chunk = {};
                chunk['Year'] = year;
                $.each(genData['osy-tech'], function (idT, tech) {
                    if (typeof techData[param][year][tech.TechId] !== "undefined" ){
                        chunk[tech.TechId] = techData[param][year][tech.TechId];
                    }
                });
                //console.log('param ', param, ' tech ', tech.TechId, ' year ', year, ' chunk ', chunk)
                chartData.push(chunk);
            });
            RYTchart[param] = chartData; 
            
        });
        return RYTchart;
    }

    static RYC(RYCdata){
        let RYC = {};
        $.each(RYCdata, function (param, array) {
            RYC[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(!RYC[param][key]){
                        RYC[param][key] = {};
                    }
                    if(key != 'CommId'){
                        RYC[param][key][obj['CommId']] = val;
                    }
                });
            });
        });
        return RYC;
    }

    static RYCgrid(genData, RYCdata){
        let commName = this.CommName(genData);
        let RYCgrid = JSON.parse(JSON.stringify(RYCdata));
        $.each(RYCdata, function (param, array) {
            $.each(array, function (id, obj) {
                RYCgrid[param][id]['Comm'] = commName[obj['CommId']];
            });
        });
        return RYCgrid;
    }

    static RYCchart(genData, RYCdata){
        let RYCchart = {};
        let techData = this.RYC(RYCdata);
        $.each(RYCdata, function (param, array) {
            let chartData = [];
            $.each(genData['osy-years'], function (idY, year) { 
                let chunk = {};
                chunk['Year'] = year;
                $.each(genData['osy-comm'], function (idC, comm) {
                    if (typeof techData[param][year][comm.CommId] !== "undefined" ){
                        chunk[comm.CommId] = techData[param][year][comm.CommId];
                    }
                });
                chartData.push(chunk);
            });
            RYCchart[param] = chartData; 
            
        });
        return RYCchart;
    }

    static RYE(RYEdata){
        let RYE = {};
        $.each(RYEdata, function (param, array) {
            RYE[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(!RYE[param][key]){
                        RYE[param][key] = {};
                    }
                    if(key != 'EmisId'){
                        RYE[param][key][obj['EmisId']] = val;
                    }
                });
            });
        });
        return RYE;
    }

    static RYEgrid(genData, RYEdata){
        let emiName = this.EmiName(genData);
        let RYEgrid = JSON.parse(JSON.stringify(RYEdata));
        $.each(RYEdata, function (param, array) {
            $.each(array, function (id, obj) {
                RYEgrid[param][id]['Emis'] = emiName[obj['EmisId']];
            });
        });
        return RYEgrid;
    }

    static RYEchart(genData, RYEdata){
        let RYEchart = {};
        let techData = this.RYE(RYEdata);
        $.each(RYEdata, function (param, array) {
            let chartData = [];
            $.each(genData['osy-years'], function (idY, year) { 
                let chunk = {};
                chunk['Year'] = year;
                $.each(genData['osy-emis'], function (idC, emi) {
                    if (typeof techData[param][year][emi.EmisId] !== "undefined" ){
                        chunk[emi.EmisId] = techData[param][year][emi.EmisId];
                    }
                });
                chartData.push(chunk);
            });
            RYEchart[param] = chartData; 
            
        });
        return RYEchart;
    }

    static RYTs(RYTsdata){
        let RYTs = {};
        $.each(RYTsdata, function (param, array) {
            RYTs[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(key != 'YearSplit'){
                        if(!RYTs[param][key]){
                            RYTs[param][key] = {};
                        }
                        RYTs[param][key][obj['YearSplit']] = val;
                    }
                });
            });
        });
        return RYTs;
    }

    static RYTschart(genData, RYTsdata){
        let timeslice = this.RYTs(RYTsdata);
        let RYTschart = {};
        $.each(RYTsdata, function (param, array) {
            let chartData = []
            $.each(genData['osy-years'], function (idY, year) { 
                let chunk = {};
                chunk['Year'] = year;
                $.each(array, function (id, obj) {
                    if (typeof timeslice[param][year][obj.YearSplit] !== "undefined" ){
                        chunk[obj.YearSplit] = timeslice[param][year][obj.YearSplit];
                    }
                });
                //console.log('param ', param, ' tech ', tech.TechId, ' year ', year, ' chunk ', chunk)
                chartData.push(chunk);
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
                    if(!RYTC[param][key]){ RYTC[param][key] = {}; }
                    if(key != 'TechId' && key != 'CommId'){
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
        let techData = this.RYTC(RYTCdata);
        //console.log('techData ', techData)
        $.each(RYTCdata, function (param, array) {
            RYTCchart[param] = {};
            $.each(genData['osy-tech'], function (idT, tech) {
                RYTCchart[param][tech.TechId] = {};
                let chartData = [];
                $.each(genData['osy-years'], function (idY, year) {
                    if ( typeof techData[param][year][tech.TechId] !== "undefined"   ){
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(genData['osy-comm'], function (idC, comm) {
                            if (typeof techData[param][year][tech.TechId][comm.CommId]  !== "undefined" ){
                                chunk[comm['CommId']] = techData[param][year][tech.TechId][comm.CommId];
                            }
                        });
                        //console.log('param ', param, ' tech ', tech.TechId, ' year ', year, ' chunk ', chunk)
                        chartData.push(chunk);
                    }
                });
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
        $.each(RYTTsdata, function (param, array) {
            RYTTs[param] = {};
            $.each(array, function (id, obj) {
                $.each(obj, function (key, val) {
                    if(!RYTTs[param][key]){ RYTTs[param][key] = {}; }
                    if(key != 'TechId' && key != 'Timeslice'){
                        if(!RYTTs[param][key][obj['TechId']]){ RYTTs[param][key][obj['TechId']] = {}; }
                        RYTTs[param][key][obj['TechId']][obj['Timeslice']] = val;
                    }
                });
            });
        });
        return RYTTs;
    }

    static RYTTsgrid(genData, RYTTsdata){
        let techName = this.TechName(genData);
        let RYTTsgrid = JSON.parse(JSON.stringify(RYTTsdata));
        $.each(RYTTsdata, function (param, array) {
            $.each(array, function (id, obj) {
                RYTTsgrid[param][id]['Tech'] = techName[obj['TechId']];
            });
        });
        return RYTTsgrid;
    }

    static RYTTschart(genData, RYTTsdata){
        let RYTTschart = {};
        let techData = this.RYTTs(RYTTsdata);
        $.each(RYTTsdata, function (param, array) {
            RYTTschart[param] = {};
            $.each(genData['osy-tech'], function (idT, tech) {
                RYTTschart[param][tech.TechId] = {};
                let chartData = [];
                $.each(genData['osy-years'], function (idY, year) {
                    if ( typeof techData[param][year][tech.TechId] !== "undefined"   ){
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(array, function (idC, obj) {
                            if (typeof techData[param][year][tech.TechId][obj.Timeslice]  !== "undefined" ){
                                chunk[obj.Timeslice] = techData[param][year][tech.TechId][obj.Timeslice];
                            }
                        });
                        chartData.push(chunk);
                    }
                });
                RYTTschart[param][tech.TechId] = chartData; 
            });
        });
        return RYTTschart;
    }

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