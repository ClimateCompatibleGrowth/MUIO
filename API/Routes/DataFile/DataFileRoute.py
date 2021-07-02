from flask import Blueprint, jsonify, request, send_file, session
from Classes.Case.DataFileClass import DataFile
from pathlib import Path
from Classes.Base import Config

datafile_api = Blueprint('DataFileRoute', __name__)

@datafile_api.route("/generateDataFile", methods=['POST'])
def generateDataFile():
    try:
        casename = request.json['casename']

        if casename != None:
            txtFile = DataFile(casename)
            txtFile.generateDatafile()
            response = {
                "message": "You have updated data!",
                "status_code": "success"
            }      
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@datafile_api.route("/readDataFile", methods=['POST'])
def readDataFile():
    try:
        casename = request.json['casename']
        if casename != None:
            txtFile = DataFile(casename)
            data = txtFile.readDataFile()
            response = data    
        else:  
            response = None     
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@datafile_api.route("/downloadDataFile", methods=['GET'])
def downloadDataFile():
    try:
        #casename = request.json['casename']
        #casename = 'DEMO CASE'
        # txtFile = DataFile(casename)
        # downloadPath = txtFile.downloadDataFile()
        # response = {
        #     "message": "You have downloaded data.txt to "+ str(downloadPath) +"!",
        #     "status_code": "success"
        # }         
        # return jsonify(response), 200
        #path = "/Examples.pdf"
        case = session.get('osycase', None)
        dataFile = Path(Config.DATA_STORAGE,case,'data.txt')
        return send_file(dataFile.resolve(), as_attachment=True, cache_timeout=0)
    
    except(IOError):
        return jsonify('No existing cases!'), 404

@datafile_api.route("/run", methods=['POST'])
def run():
    try:
        casename = request.json['casename']
        solver = request.json['solver']
        txtFile = DataFile(casename)
        response = txtFile.run(solver)     
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404