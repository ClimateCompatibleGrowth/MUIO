import { Base } from "./Base.Class.js";

export class Osemosys {
    
    static saveCase(data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "saveCase",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "data": data }),
                dataType: 'json',
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

    static updateData(data, param, dataJson) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url:Base.apiUrl() + "updateData",
                async: true,  
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify({ "data": data, "param": param, "dataJson": dataJson }),
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
    
    /////////////////////////////////////////////ELSE
    // static updatecData(data, year) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "updatecData",
    //             async: true,  
    //             type: 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify({ "data": data }),
    //             dataType: 'json',
    //             contentType: 'application/json; charset=utf-8',
    //             success: function (result) {             
    //                 resolve(result);
    //             },
    //             error: function(xhr, status, error) {
    //                 if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
    //                 reject(error);
    //             }
    //         });
    //     });
    // }

    // static updatehData(data, year) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "updatehData",
    //             async: true,  
    //             type: 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify({ "data": data, "year": year }),
    //             dataType: 'json',
    //             contentType: 'application/json; charset=utf-8',
    //             success: function (result) {             
    //                 resolve(result);
    //             },
    //             error: function(xhr, status, error) {
    //                 if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
    //                 reject(error);
    //             }
    //         });
    //     });
    // }

    // static updatetData(data, year) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "updatetData",
    //             async: true,  
    //             type: 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify({ "data": data }),
    //             dataType: 'json',
    //             contentType: 'application/json; charset=utf-8',
    //             success: function (result) {             
    //                 resolve(result);
    //             },
    //             error: function(xhr, status, error) {
    //                 if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
    //                 reject(error);
    //             }
    //         });
    //     });
    // }

    // static getcData(casename) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "getcData",
    //             async: true,  
    //             type: 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify({ "casename": casename }),
    //             dataType: 'json',
    //             contentType: 'application/json; charset=utf-8',
    //             success: function (result) {             
    //                 resolve(result);
    //             },
    //             error: function(xhr, status, error) {
    //                 if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
    //                 reject(error);
    //             }
    //         });
    //     });
    // }

    // static gethData(casename) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "gethData",
    //             async: true,  
    //             type: 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify({ "casename": casename }),
    //             dataType: 'json',
    //             contentType: 'application/json; charset=utf-8',
    //             success: function (result) {             
    //                 resolve(result);
    //             },
    //             error: function(xhr, status, error) {
    //                 if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
    //                 reject(error);
    //             }
    //         });
    //     });
    // }

    // static gettData(casename) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "gettData",
    //             async: true,  
    //             type: 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify({ "casename": casename }),
    //             dataType: 'json',
    //             contentType: 'application/json; charset=utf-8',
    //             success: function (result) {             
    //                 resolve(result);
    //             },
    //             error: function(xhr, status, error) {
    //                 if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
    //                 reject(error);
    //             }
    //         });
    //     });
    // }

    // static genData(casename) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "genData",
    //             async: true,  
    //             type: 'POST',
    //             data: JSON.stringify({ "casename": casename }),
    //             dataType: 'json',
    //             contentType: 'application/json; charset=utf-8',
    //             success: function (result) {          
    //                 resolve(result);
    //             },
    //             error: function(xhr, status, error) {
    //                 if(error == 'UNKNOWN'){ error =  xhr.responseJSON.message }
    //                 reject(error);
    //             }
    //         });
    //     });
    // }
}