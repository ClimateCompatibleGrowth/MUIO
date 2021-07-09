import { Base } from "./Base.Class.js";

export class Osemosys {
    
    static getParamFile() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "getParamFile",
                async: true,  
                type: 'GET',
                dataType: 'json',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                success: function (result) {            
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }
    
    static saveParamFile(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "saveParamFile",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "data": data }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static saveScOrder(data, casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "saveScOrder",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "data": data, "casename": casename }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static saveCase(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "saveCase",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "data": data }),
                contentType: 'application/json; charset=utf-8',
                // credentials: 'include',
                // xhrFields: { withCredentials: true},
                // crossDomain: true,
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static generateDataFile(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "generateDataFile",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename }),
                contentType: 'application/json; charset=utf-8',
                // credentials: 'include',
                // xhrFields: { withCredentials: true},
                // crossDomain: true,
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static run(casename, solver) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "run",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename, "solver": solver  }),
                contentType: 'application/json; charset=utf-8',
                // credentials: 'include',
                // xhrFields: { withCredentials: true},
                // crossDomain: true,
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static readDataFile(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "readDataFile",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename }),
                contentType: 'application/json; charset=utf-8',
                // credentials: 'include',
                // xhrFields: { withCredentials: true},
                // crossDomain: true,
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static downloadDataFile(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "downloadDataFile",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename }),
                contentType: 'application/json; charset=utf-8',
                // credentials: 'include',
                // xhrFields: { withCredentials: true},
                // crossDomain: true,
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static getData(casename, dataJson) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "getData",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename, "dataJson": dataJson }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static getDataDirectly(casename, jsonFile) {
        return new Promise((resolve, reject) => {
            $.ajax({
                //url:Base.apiUrl() + "getData",
                url: 'WebAPP/DataStorage/'+casename+'/'+jsonFile,
                async: true,  
                type: 'GET',
                dataType: 'json',
                //data: JSON.stringify({ "casename": casename, "dataJson": dataJson }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static updateData(data, param, dataJson) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "updateData",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "data": data, "param": param, "dataJson": dataJson }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static viewData(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "viewData",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static viewTEData(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "viewTEData",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename }),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static updateViewData(casename, year, ScId, groupId, paramId, TechId, CommId, EmisId, Timeslice, value) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "updateViewData",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename, year: year, ScId: ScId,
                 groupId: groupId, paramId: paramId, TechId: TechId, CommId: CommId, EmisId:EmisId, Timeslice: Timeslice, value: value}),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    
    static updateTEViewData(casename, ScId, GroupId, ParamId, TechId, EmisId, value) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "updateTEViewData",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "casename": casename, scId:ScId,
                 groupId: GroupId, paramId: ParamId, techId: TechId, emisId: EmisId, value: value}),
                contentType: 'application/json; charset=utf-8',
                success: function (result) {             
                    resolve(result);
                },
                error: function(xhr, status, error) {
                    if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }
}