from flask import Blueprint, jsonify, request, session
import os
from pathlib import Path
import shutil
import time
from Classes.Base import Config
from Classes.Base.SyncS3 import SyncS3
from Classes.Base.FileClass import File
from Classes.Case.CaseClass import Case
from Classes.Case.UpdateCaseClass import UpdateCase

case_api = Blueprint('CaseRoute', __name__)

@case_api.route("/getCases", methods=['GET'])
def getCases():
    try:
        cases = [ f.name for f in os.scandir(Config.DATA_STORAGE) if f.is_dir() ]
        return jsonify(cases), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@case_api.route("/getDesc", methods=['POST'])
def getDesc():
    try:
        casename = request.json['casename']
        genDataPath = Path(Config.DATA_STORAGE,casename,"genData.json")
        genData = File.readFile(genDataPath)
        response = {
            "message": "Get case description success",
            "desc": genData['osy-desc']
        }
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@case_api.route("/copyCase", methods=['POST'])
def copy():
    try:
        case = request.json['casename']
        case_copy = case + '_copy'
        casePath = Path(Config.DATA_STORAGE, case_copy, 'genData.json')

        src =  Path(Config.DATA_STORAGE, case)
        dest =  Path(Config.DATA_STORAGE, case + '_copy')
        if(os.path.isdir(dest)):
            response = {
                "message": 'Case <b>'+ case + '_copy</b> already exists, please rename existing case first!',
                "status_code": "warning"
            }
        else:
            shutil.copytree(str(src), str(dest) )
            #rename casename in genData
            genData = File.readFile(casePath)
            genData['osy-casename'] = case_copy
            File.writeFile(genData, casePath)
            response = {
                "message": 'Case <b>'+ case + '</b> copied!',
                "status_code": "success"
            }
        return(response)
    except(IOError):
        raise IOError
    except OSError:
        raise OSError

@case_api.route("/deleteCase", methods=['POST'])
def deleteCase():
    try:        
        case = request.json['casename']
        
        casePath = Path(Config.DATA_STORAGE, case)
        shutil.rmtree(casePath)

        if case == session.get('osycase'):
            session['osycase'] = None
            response = {
                "message": 'Case <b>'+ case + '</b> deleted!',
                "status_code": "success_session"
            }
        else:
            response = {
                "message": 'Case <b>'+ case + '</b> deleted!',
                "status_code": "success"
            }
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404
    except OSError:
        raise OSError

@case_api.route("/getData", methods=['POST'])
def getData():
    try:
        start = time.time()
        casename = request.json['casename']
        dataJson = request.json['dataJson']
        if casename != None:
            dataPath = Path(Config.DATA_STORAGE,casename,dataJson)
            data = File.readFile(dataPath)
            diff = time.time() - start
            print('get data time ', diff)
            response = data   

        else:  
            response = None     
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@case_api.route("/getParamFile", methods=['GET'])
def getParamFile():
    try:
        configPath = Path(Config.DATA_STORAGE, 'Parameters.json')
        ConfigFile = File.readParamFile(configPath)
        response = ConfigFile       
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@case_api.route("/saveParamFile", methods=['POST'])
def saveParamFile():
    try:
        data = request.json['data']
        configPath = Path(Config.DATA_STORAGE, 'Parameters.json')
        File.writeFile( data, configPath)
        response = {
            "message": "You have updated parameters data!",
            "status_code": "success"
        }
       
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@case_api.route("/saveScOrder", methods=['POST'])
def saveScOrder():
    try:
        data = request.json['data']
        case = request.json['casename']
        genDataPath = Path(Config.DATA_STORAGE, case, 'genData.json')
        # File.writeFile( data, configPath)
        genData = File.readFile(genDataPath)
        genData['osy-scenarios'] = data
        File.writeFile( genData, genDataPath)
        response = {
            "message": "You have updated scenarios order data!",
            "status_code": "success"
        }
       
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@case_api.route("/updateData", methods=['POST'])
def updateData():
    try:
        data = request.json['data']
        param = request.json['param']
        case = session.get('osycase', None)
        dataJson = request.json['dataJson']
        dataPath = Path(Config.DATA_STORAGE, case, dataJson)
        if case != None:
            sourceData = File.readFile(dataPath)
            sourceData[param] = data
            File.writeFile( sourceData, dataPath)
            response = {
                "message": "You have updated data!",
                "status_code": "success"
            }      
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404

@case_api.route("/saveCase", methods=['POST'])
def saveCase():
    try:
        genData = request.json['data']
        casename = genData['osy-casename']
        case = session.get('osycase', None)

        #ako je izabran case, edit mode
        if case != None and case != '':
            genDataPath = Path(Config.DATA_STORAGE, case, "genData.json")

            #edit case sa istim imenom
            if case == casename:
                #update modela 
                caseUpdate = UpdateCase(case, genData)
                caseUpdate.updateCase() 

                #update genData
                File.writeFile( genData, genDataPath)

                response = {
                    "message": "You have change case general data!",
                    "status_code": "edited"
                }
            #edit case sa drugim imenom, moramo provjeriit da li novo ime postoji u sistemu
            else:
                if not os.path.exists(Path(Config.DATA_STORAGE,casename)):
                    #update modela 
                    caseUpdate = UpdateCase(case, genData)
                    caseUpdate.updateCase() 
                    #update gen data sa novim imenom
                    File.writeFile( genData, genDataPath)
                    #rename case sa novim imenom
                    os.rename(Path(Config.DATA_STORAGE,case), Path(Config.DATA_STORAGE,casename ))
                    session['osycase'] = casename
                    
                    response = {
                        "message": "You have change case general data!",
                        "status_code": "edited"
                    }
                #ako vec postoji case sa istim imenom
                else:
                    response = {
                        "message": "Case with same name already exists!",
                        "status_code": "exist"
                    }
        #novi case 
        else:
            if not os.path.exists(Path(Config.DATA_STORAGE,casename)):
                session['osycase'] = casename
                os.makedirs(Path(Config.DATA_STORAGE,casename))
                genDataPath = Path(Config.DATA_STORAGE, casename, "genData.json")
                File.writeFile( genData, genDataPath)
                case = Case(casename, genData)
                case.createCase()                
                response = {
                    "message": "You have created new case!",
                    "status_code": "created"
                }
            else:
                response = {
                    "message": "Case with same name already exists!",
                    "status_code": "exist"
                }       

        return jsonify(response), 200
    except(IOError):
        return jsonify('Error saving case IOError!'), 404


# @case_api.route("/deleteResultsPreSync", methods=['POST'])
# def deleteResultsPreSync():
#     try:        
#         case = request.json['casename']
        
#         resPath = Path(Config.DATA_STORAGE, case, 'res')
#         dataPath = Path(Config.DATA_STORAGE, case, 'data.txt')
#         shutil.rmtree(resPath)
#         os.remove(dataPath)

#         response = {
#             "message": 'Case <b>'+ case + '</b> deleted!',
#             "status_code": "success"
#         }
#         return jsonify(response), 200
#     except(IOError):
#         return jsonify('No existing cases!'), 404
#     except OSError:
#         raise OSError


# @case_api.route("/uploadSync", methods=['POST'])
# def uploadSync():
#     try:        
#         case = request.json['casename']

#         s3 = SyncS3()
#         localDir = Path(Config.DATA_STORAGE, case)
#         s3.uploadSync(localDir, case, Config.S3_BUCKET, '*')

#         response = {
#             "message": 'Case <b>'+ case + '</b> syncronized!',
#             "status_code": "success"
#         }
#         return jsonify(response), 200
#     except(IOError):
#         return jsonify('No existing cases!'), 404
#     except OSError:
#         raise OSError

# @case_api.route("/deleteSync", methods=['POST'])
# def deleteSync():
#     try:        
#         case = request.json['casename']

#         s3 = SyncS3()
#         s3.deleteCase(case)

#         response = {
#             "message": 'Case <b>'+ case + '</b> deleted!',
#             "status_code": "success"
#         }
#         return jsonify(response), 200
#     except(IOError):
#         return jsonify('No existing cases!'), 404
#     except OSError:
#         raise OSError

# @case_api.route("/updateSync", methods=['POST'])
# def updateSync():
#     try:        
#         case = request.json['casename']
#         filename = request.json['file']

#         s3 = SyncS3()
#         localDir = Path(Config.DATA_STORAGE, case, str(filename))
#         s3.updateSync(localDir, case, Config.S3_BUCKET)

#         response = {
#             "message": 'Case <b>'+ case + '</b> deleted!',
#             "status_code": "success"
#         }
#         return jsonify(response), 200
#     except(IOError):
#         return jsonify('No existing cases!'), 404
#     except OSError:
#         raise OSError

# @case_api.route("/updateSyncParamFile", methods=['GET'])
# def updateSyncParamFile():
#     try:        

#         case = ''
#         s3 = SyncS3()
#         localDir = Path(Config.DATA_STORAGE, "Parameters.json")

#         s3.updateSync(localDir, case, Config.S3_BUCKET)

#         response = {
#             "message": 'Case <b>'+ case + '</b> deleted!',
#             "status_code": "success"
#         }
#         return jsonify(response), 200
#     except(IOError):
#         return jsonify('No existing cases!'), 404
#     except OSError:
#         raise OSError
