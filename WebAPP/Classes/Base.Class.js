import { Message } from "./Message.Class.js";
import { Html } from "./Html.Class.js";
import { SyncS3 } from "./SyncS3.Class.js";

export class Base {
    static HEROKU = 1;
    static AWS_SYNC = 0;
    //init sync flag to pull from S3 only one time when visit home page
    static INIT_SYNC = 1;

    static apiUrl() {
        let apiUrl
        if (this.HEROKU == 0) {
            //localhost
            apiUrl = "http://127.0.0.1:5000/";
        } else {
            //HEROKU
            apiUrl = "https://osemosys.herokuapp.com/";
        }
        return apiUrl
    }

    static initSyncS3() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "initSyncS3",
                async: true,
                type: 'GET',
                dataType: 'json',
                credentials: 'include',
                xhrFields: { withCredentials: true },
                crossDomain: true,
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static getSession() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "getSession",
                async: true,
                type: 'GET',
                dataType: 'json',
                credentials: 'include',
                xhrFields: { withCredentials: true },
                crossDomain: true,
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static setSession(titlecs) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "setSession",
                async: true,
                type: 'POST',
                data: JSON.stringify({ "case": titlecs }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                credentials: 'include',
                xhrFields: { withCredentials: true },
                crossDomain: true,
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static getCaseStudies() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "getCases",
                async: true,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                //credentials: 'include',
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }

                    reject(error);
                }
            });
        });
    }

    static getResultCSV(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "getResultCSV",
                async: true,
                type: 'POST',
                data: JSON.stringify({ "casename": casename }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static getCaseDesc(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "getDesc",
                async: true,
                type: 'POST',
                data: JSON.stringify({ "casename": casename }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static copyCaseStudy(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "copyCase",
                async: true,
                type: 'POST',
                data: JSON.stringify({ "casename": casename }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    //custom exception
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    static deleteCaseStudy(casename) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: this.apiUrl() + "deleteCase",
                async: true,
                type: 'POST',
                data: JSON.stringify({ "casename": casename }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    resolve(result);
                },
                error: function (xhr, status, error) {
                    //custom exception
                    if (error == 'UNKNOWN') { error = xhr.responseJSON.message }
                    reject(error);
                }
            });
        });
    }

    // static backupCaseStudy(casename) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "backupCase",
    //             async: true,  
    //             type: 'POST',
    //             dataType: 'json',
    //             data: JSON.stringify({ "casename": casename }),
    //             contentType: 'application/json; charset=utf-8',
    //             // credentials: 'include',
    //             // xhrFields: { withCredentials: true},
    //             // crossDomain: true,
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

    // static backupCaseStudy(casename) {
    //     return new Promise((resolve, reject) => {
    //         $.ajax({
    //             url:Base.apiUrl() + "backupCase?case="+casename,
    //             async: true,  
    //             type: 'GET',
    //             dataType: 'json',
    //             //data: JSON.stringify({ "casename": casename }),
    //             contentType: 'application/json; charset=utf-8',
    //             // credentials: 'include',
    //             // xhrFields: { withCredentials: true},
    //             // crossDomain: true,
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

    static uploadFunction = function () {
        var MyDropzone = new Dropzone("div#myDropzone", {
            //url: "http://127.0.0.1:5000/upload",
            url: Base.apiUrl() + "uploadCase",
            addRemoveLinks: true,
            maxFilesize: 20,
            uploadMultiple: true,
            acceptedFiles: "application/zip, .zip",
            dictDefaultMessage: `
                    <span class="text-center">
                      <span class="font-lg visible-xs-block visible-sm-block visible-lg-block"><span class="font-lg">
                        <i class="fa fa-caret-right text-danger"></i> Drop Case <span class="font-xs">to restore
                      </span>
                    </span>
                    <span>&nbsp&nbsp<h4 class="display-inline"> (Or Click)</h4></span> `,
            dictResponseError: 'Error uploading file!',
            dictFileTooBig: ` <i class="fa fa-caret-right text-danger"></i>Filers too big!`,
            dictRemoveFile: `Remove Case!`,
            dictInvalidFileType: "Not valid Osemosys ver 1.0 case!",
            // accept: function(file, done) {
            //   if (file.name == "justinbieber.jpg") {
            //     done("Naha, you don't.");
            //   }
            //   else { done(); }
            // },
            successmultiple: function (file, response) {
                $.each(file, function (key, value) {
                    if (response.response[key]['status_code'] == 'success') {

                        //let casename = value.name.slice(0, -4)
                        let casename = response.response[key]['casename'];
                        Html.apendCase(casename);
                        Message.bigBoxSuccess("Upload response", response.response[key]['message'], null);
                        value.previewElement.innerHTML = "";
                        $('#modalrestore').modal('toggle');
                        if (Base.AWS_SYNC == 1) {
                            SyncS3.deleteResultsPreSync(casename)
                                .then(response => {
                                    SyncS3.uploadSync(casename);
                                });
                        }

                    } else if (response.response[key]['status_code'] == 'warning') {
                        $('.dz-file-preview').removeClass("dz-success").addClass("dz-error")
                        //$(".dz-error-mark svg").css("background", "red"); 
                        Message.bigBoxWarning("Upload response", response.response[key]['message'], null);
                    } else if (response.response[key]['status_code'] == 'error') {
                        $('.dz-file-preview').removeClass("dz-success").addClass("dz-error")
                        //$(".dz-error-mark svg").css("background", "red"); 
                        Message.bigBoxDanger("Upload response", response.response[key]['message'], null);
                    }
                });
            },
            error: function (file, error) {
                Message.bigBoxDanger("Upload response", file.name + " failed to upload! " + error + " Please remove from dropzone.", null);
            },
        });
    }
}