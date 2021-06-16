from flask import Blueprint, jsonify, request
import json
from Classes.Case.OsemosysClass import Osemosys

viewdata_api = Blueprint('ViewDataRoute', __name__)

@viewdata_api.route("/viewData", methods=['POST'])
def viewData():
    try:
        casename = request.json['casename']
        #byType = request.json['byType']
        if casename != None:
            osy = Osemosys(casename)
            data = {}
            data['Tech'] = osy.viewDataByTech()
            data['Comm'] = osy.viewDataByComm()
            data['Emi'] = osy.viewDataByEmi()
            # if byType == 'Tech':
            #     data = osy.viewDataByTech()
            # if byType == 'Comm':
            #     data = osy.viewDataByComm()
            # if byType == 'Emi':
            #     data = osy.viewDataByEmi()
            response = data    
        else:  
            response = None     
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@viewdata_api.route("/updateViewData", methods=['POST'])
def updateViewData():
    try:
        #casename, updateType, groupId, paramId, TechId, CommId, EmisId, Timeslice
        casename = request.json['casename']
        updateType = request.json['updateType']
        year = request.json['year']
        groupId = request.json['groupId']
        paramId = request.json['paramId']
        TechId = request.json['TechId']
        CommId = request.json['CommId']
        EmisId = request.json['EmisId']
        Timeslice = request.json['Timeslice']
        value = request.json['value']

        if casename != None:
            osy = Osemosys(casename)
            data = osy.updateViewData(casename, updateType, year, groupId, paramId, TechId, CommId, EmisId, Timeslice, value)
            response = {
                "message": "You have updated view data!",
                "status_code": "success"
            }
        else:
            response = {
                "message": "No case data selected!",
                "status_code": "error"
            }
       
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404
