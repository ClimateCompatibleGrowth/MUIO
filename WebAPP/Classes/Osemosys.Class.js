import { Base } from "./Base.Class.js";

export class Osemosys {
    
    static getParamFile() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "getParamFile",
                async: true,  
                type: 'GET',
                dataType: 'json',
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

    static run(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "run",
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
}