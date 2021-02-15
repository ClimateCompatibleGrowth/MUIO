from flask import Blueprint, jsonify, request, session
import os
from pathlib import Path
import shutil
from distutils.dir_util import copy_tree
from Classes.Base import Config
from Classes.Base.FileClass import File
from Classes.Case.CaseClass import OsemosysCase

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
        src =  Path(Config.DATA_STORAGE, case)
        dest =  Path(Config.DATA_STORAGE, case + '_copy')
        case_copy = case + '_copy'
        if(os.path.isdir(dest)):
            response = {
                "message": 'Case <b>'+ case + '_copy</b> already exists, please rename existing case first!',
                "status_code": "warning"
            }
        else:
            shutil.copytree(str(src), str(dest) )
            #rename casename in genData
            casePath = Path(Config.DATA_STORAGE, case_copy, 'genData.json')
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
        casename = request.json['casename']
        dataJson = request.json['dataJson']
        if casename != None:
            RYTpath = Path(Config.DATA_STORAGE,casename,dataJson)
            RYTdata = File.readFile(RYTpath)
            response = RYTdata    
        else:  
            response = None     
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
            # RYTpath = Path(Config.DATA_STORAGE, case, "RYT.json")
            # RYTspath = Path(Config.DATA_STORAGE, case, "RYTs.json")
            # RYCpath = Path(Config.DATA_STORAGE, case, "RYC.json")

            #edit case sa istim imenom
            if case == casename:
                #update modela 
                updateRYTmodel(case, genData)
                updateRYTCmodel(case, genData)
                updateRYTsmodel(case, genData)
                updateRYCmodel(case, genData)
                updateRYEmodel(case, genData)
                updateRYTTsmodel(case, genData)
                updateRYCTsmodel(case, genData)
                updateRYTEmodel(case, genData)

                #update genData
                File.writeFile( genData, genDataPath)

                response = {
                    "message": "You have change case general data!",
                    "status_code": "edited"
                }
            #edit case sa drugim imenom, moramo provjeriit da li novo ime postoji u sistemu
            else:
                if not os.path.exists(Path(Config.DATA_STORAGE,casename)):
                    updateRYTmodel(case, genData)
                    updateRYTCmodel(case, genData)
                    updateRYTsmodel(case, genData)
                    updateRYCmodel(case, genData)
                    updateRYEmodel(case, genData)
                    updateRYTTsmodel(case, genData)
                    updateRYCTsmodel(case, genData)
                    updateRYTEmodel(case, genData)

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
                RYTpath = Path(Config.DATA_STORAGE, casename, "RYT.json")
                RYTCpath = Path(Config.DATA_STORAGE, casename, "RYTC.json")
                RYTspath = Path(Config.DATA_STORAGE, casename, "RYTs.json")
                RYCpath = Path(Config.DATA_STORAGE, casename, "RYC.json")
                RYEpath = Path(Config.DATA_STORAGE, casename, "RYE.json")
                RYTTspath = Path(Config.DATA_STORAGE, casename, "RYTTs.json")
                RYCTspath = Path(Config.DATA_STORAGE, casename, "RYCTs.json")
                RYTEpath = Path(Config.DATA_STORAGE, casename, "RYTE.json")

                File.writeFile( genData, genDataPath)
                default_RYT(genData, RYTpath)
                default_RYTC(genData, RYTCpath)
                default_RYTs(genData, RYTspath)
                default_RYC(genData, RYCpath)
                default_RYE(genData, RYEpath)
                default_RYTTs(genData, RYTTspath)
                default_RYCTs(genData, RYCTspath)
                default_RYTE(genData, RYTEpath)
                
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

def keys_exists(element, *keys):
    '''
    Check if *keys (nested) exists in `element` (dict).
    '''
    if not isinstance(element, dict):
        raise AttributeError('keys_exists() expects dict as first argument.')
    if len(keys) == 0:
        raise AttributeError('keys_exists() expects at least two arguments, one given.')

    _element = element
    for key in keys:
        try:
            _element = _element[key]
        except KeyError:
            return False
    return True

def default_RYT(genData, RYTpath):
    try:
        years = genData['osy-years']
        techs = genData['osy-tech']
        
        RYTdata = {}
        for ryt in Config.PARAMETERS['RYT']:
            RYTdata[ryt['id']] = []
            for tech in techs:
                chunk = {}
                chunk['TechId'] = tech['TechId']
                for year in years:
                    chunk[year] = 0  
                RYTdata[ryt['id']].append(chunk)

        File.writeFile( RYTdata, RYTpath)
    except(IOError):
        raise IOError

def updateRYTmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        rytJson = OsemosysModel.getJsonData('RYT.json')
        RYTsource = OsemosysModel.RYT(rytJson)
        years = genData['osy-years']
        techs = genData['osy-tech']
        
        RYTdata = {}
        for ryt in Config.PARAMETERS['RYT']:
            RYTdata[ryt['id']] = []
            for tech in techs:
                chunk = {}
                chunk['TechId'] = tech['TechId']
                for year in years:
                    if keys_exists(RYTsource, ryt['id'], year, tech['TechId']):
                        chunk[year] = RYTsource[ryt['id']][year][tech['TechId']]
                    else:
                        chunk[year] = 0  
                RYTdata[ryt['id']].append(chunk)

        File.writeFile( RYTdata, OsemosysModel.rytPath)
    except(IOError):
        raise IOError

def default_RYTs(genData, RYTspath):
    try:
        years = genData['osy-years']
        seasons = int(genData['osy-ns'])
        days = int(genData['osy-dt'])
        
        RYTsdata = {}
        for ryt in Config.PARAMETERS['RYTs']:
            RYTsdata[ryt['id']] = []
            for season in range(seasons):
                for day in range(days):
                    chunk = {}
                    s = str(season + 1)
                    d = str(day + 1)
                    chunk['YearSplit'] = "S"+s+d
                    for year in years:
                        chunk[year] = 0  
                    RYTsdata[ryt['id']].append(chunk)

        File.writeFile( RYTsdata, RYTspath)
    except(IOError):
        raise IOError

def updateRYTsmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        rytsJson = OsemosysModel.getJsonData('RYTs.json')
        RYTssource = OsemosysModel.RYTs(rytsJson)
        years = genData['osy-years']

        seasons = int(genData['osy-ns'])
        days = int(genData['osy-dt'])
        
        RYTsdata = {}
        for ryt in Config.PARAMETERS['RYTs']:
            RYTsdata[ryt['id']] = []
            for season in range(seasons):
                for day in range(days):
                    chunk = {}
                    s = str(season + 1)
                    d = str(day + 1)
                    chunk['YearSplit'] = "S"+s+d
                    for year in years:
                        if keys_exists(RYTssource, year, "S"+s+d):
                            chunk[year] = RYTssource[year]["S"+s+d]
                        else:
                            chunk[year] = 0  
                    RYTsdata[ryt['id']].append(chunk)

        File.writeFile( RYTsdata, OsemosysModel.rytsPath)
    except(IOError):
        raise IOError

def default_RYTC(genData, RYTCpath):
    try:
        years = genData['osy-years']
        techs = genData['osy-tech']
        
        RYTCdata = {}
        for ryt in Config.PARAMETERS['RYTC']:
            RYTCdata[ryt['id']] = []
            for tech in techs:
                if tech[ryt['id']]:
                    for comm in tech[ryt['id']]:
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        chunk['CommId'] = comm
                        for year in years:
                            chunk[year] = 0  
                        RYTCdata[ryt['id']].append(chunk)

        File.writeFile( RYTCdata, RYTCpath)
    except(IOError):
        raise IOError

def updateRYTCmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        rytcJson = OsemosysModel.getJsonData('RYTC.json')
        RYTCsource = OsemosysModel.RYTC(rytcJson)

        years = genData['osy-years']
        techs = genData['osy-tech']
        
        RYTCdata = {}
        for ryt in Config.PARAMETERS['RYTC']:
            RYTCdata[ryt['id']] = []
            for tech in techs:
                if tech[ryt['id']]:
                    for comm in tech[ryt['id']]:
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        chunk['CommId'] = comm
                        for year in years:
                            # if RYTCsource[ryt['id']][year][tech['TechId']][comm]:
                            if keys_exists(RYTCsource, ryt['id'], year, tech['TechId'], comm):
                                chunk[year] = RYTCsource[ryt['id']][year][tech['TechId']][comm]
                            else:
                                chunk[year] = 0 
                        RYTCdata[ryt['id']].append(chunk)

        File.writeFile( RYTCdata, OsemosysModel.rytcPath)

    except(IOError):
        raise IOError

def default_RYTE(genData, RYTEpath):
    try:
        years = genData['osy-years']
        techs = genData['osy-tech']
        
        RYTEdata = {}
        for ryt in Config.PARAMETERS['RYTE']:
            RYTEdata[ryt['id']] = []
            for tech in techs:
                if tech[ryt['id']]:
                    for comm in tech[ryt['id']]:
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        chunk['EmisId'] = comm
                        for year in years:
                            chunk[year] = 0  
                        RYTEdata[ryt['id']].append(chunk)

        File.writeFile( RYTEdata, RYTEpath)
    except(IOError):
        raise IOError

def updateRYTEmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        ryteJson = OsemosysModel.getJsonData('RYTE.json')
        RYTEsource = OsemosysModel.RYTE(ryteJson)

        years = genData['osy-years']
        techs = genData['osy-tech']
        
        RYTEdata = {}
        for ryt in Config.PARAMETERS['RYTE']:
            RYTEdata[ryt['id']] = []
            for tech in techs:
                if tech[ryt['id']]:
                    for comm in tech[ryt['id']]:
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        chunk['EmisId'] = comm
                        for year in years:
                            # if RYTCsource[ryt['id']][year][tech['TechId']][comm]:
                            if keys_exists(RYTEsource, ryt['id'], year, tech['TechId'], comm):
                                chunk[year] = RYTEsource[ryt['id']][year][tech['TechId']][comm]
                            else:
                                chunk[year] = 0 
                        RYTEdata[ryt['id']].append(chunk)

        File.writeFile( RYTEdata, OsemosysModel.rytePath)

    except(IOError):
        raise IOError

def default_RYC(genData, RYTpath):
    try:
        years = genData['osy-years']
        comms = genData['osy-comm']
        
        RYCdata = {}
        for ryt in Config.PARAMETERS['RYC']:
            RYCdata[ryt['id']] = []
            for comm in comms:
                chunk = {}
                chunk['CommId'] = comm['CommId']
                for year in years:
                    chunk[year] = 0  
                RYCdata[ryt['id']].append(chunk)

        File.writeFile( RYCdata, RYTpath)
    except(IOError):
        raise IOError

def updateRYCmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        rycJson = OsemosysModel.getJsonData('RYC.json')
        RYCsource = OsemosysModel.RYC(rycJson)
        years = genData['osy-years']
        comms = genData['osy-comm']
        
        RYCdata = {}
        for ryt in Config.PARAMETERS['RYC']:
            RYCdata[ryt['id']] = []
            for comm in comms:
                chunk = {}
                chunk['CommId'] = comm['CommId']
                for year in years:
                    if keys_exists(RYCsource, ryt['id'], year, comm['CommId']):
                        chunk[year] = RYCsource[ryt['id']][year][comm['CommId']]
                    else:
                        chunk[year] = 0  
                RYCdata[ryt['id']].append(chunk)

        File.writeFile( RYCdata, OsemosysModel.rycPath)
    except(IOError):
        raise IOError
    
def default_RYE(genData, RYEpath):
    try:
        years = genData['osy-years']
        emis = genData['osy-emis']
        
        RYEdata = {}
        for ryt in Config.PARAMETERS['RYE']:
            RYEdata[ryt['id']] = []
            for emi in emis:
                chunk = {}
                chunk['EmisId'] = emi['EmisId']
                for year in years:
                    chunk[year] = 0  
                RYEdata[ryt['id']].append(chunk)

        File.writeFile( RYEdata, RYEpath)
    except(IOError):
        raise IOError

def updateRYEmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        ryeJson = OsemosysModel.getJsonData('RYE.json')
        RYEsource = OsemosysModel.RYE(ryeJson)
        years = genData['osy-years']
        emis = genData['osy-emis']
        
        RYEdata = {}
        for ryt in Config.PARAMETERS['RYE']:
            RYEdata[ryt['id']] = []
            for emi in emis:
                chunk = {}
                chunk['EmisId'] = emi['EmisId']
                for year in years:
                    if keys_exists(RYEsource, ryt['id'], year, emi['EmisId']):
                        chunk[year] = RYEsource[ryt['id']][year][emi['EmisId']]
                    else:
                        chunk[year] = 0  
                RYEdata[ryt['id']].append(chunk)

        File.writeFile( RYEdata, OsemosysModel.ryePath)
    except(IOError):
        raise IOError

def default_RYTTs(genData, RYTTspath):
    try:
        years = genData['osy-years']
        techs = genData['osy-tech']
        ns = int(genData['osy-ns'])
        nd = int(genData['osy-dt'])
        
        RYTTsdata = {}
        for ryt in Config.PARAMETERS['RYTTs']:
            RYTTsdata[ryt['id']] = []
            for tech in techs:
                for season in range(ns):
                    for day in range(nd):
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        s = str(season + 1)
                        d = str(day + 1)
                        chunk['Timeslice'] = "S"+s+d
                        for year in years:
                            chunk[year] = 0  
                        RYTTsdata[ryt['id']].append(chunk)

        File.writeFile( RYTTsdata, RYTTspath)
    except(IOError):
        raise IOError

def updateRYTTsmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        ryttsJson = OsemosysModel.getJsonData('RYTTs.json')
        RYTTssource = OsemosysModel.RYTTs(ryttsJson)

        years = genData['osy-years']
        techs = genData['osy-tech']
        ns = int(genData['osy-ns'])
        nd = int(genData['osy-dt'])

        RYTTsdata = {}
        for ryt in Config.PARAMETERS['RYTTs']:
            RYTTsdata[ryt['id']] = []
            for tech in techs:
                for season in range(ns):
                    for day in range(nd):
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        s = str(season + 1)
                        d = str(day + 1)
                        chunk['Timeslice'] = "S"+s+d
                        for year in years:
                            if keys_exists(RYTTssource, ryt['id'], year, tech['TechId'], "S"+s+d):
                                chunk[year] = RYTTssource[ryt['id']][year][tech['TechId']]["S"+s+d]
                            else:
                                chunk[year] = 0  
                        RYTTsdata[ryt['id']].append(chunk)

        File.writeFile( RYTTsdata, OsemosysModel.ryttsPath)
    except(IOError):
        raise IOError

def default_RYCTs(genData, RYCTspath):
    try:
        years = genData['osy-years']
        comms = genData['osy-comm']
        ns = int(genData['osy-ns'])
        nd = int(genData['osy-dt'])
        
        RYCTsdata = {}
        for ryt in Config.PARAMETERS['RYCTs']:
            RYCTsdata[ryt['id']] = []
            for comm in comms:
                for season in range(ns):
                    for day in range(nd):
                        chunk = {}
                        chunk['CommId'] = comm['CommId']
                        s = str(season + 1)
                        d = str(day + 1)
                        chunk['Timeslice'] = "S"+s+d
                        for year in years:
                            chunk[year] = 0  
                        RYCTsdata[ryt['id']].append(chunk)

        File.writeFile( RYCTsdata, RYCTspath)
    except(IOError):
        raise IOError

def updateRYCTsmodel(case, genData):
    try:
        OsemosysModel = OsemosysCase(case)
        ryctsJson = OsemosysModel.getJsonData('RYCTs.json')
        RYCTssource = OsemosysModel.RYCTs(ryctsJson)

        years = genData['osy-years']
        comms = genData['osy-comm']
        ns = int(genData['osy-ns'])
        nd = int(genData['osy-dt'])

        RYCTsdata = {}
        for ryt in Config.PARAMETERS['RYCTs']:
            RYCTsdata[ryt['id']] = []
            for comm in comms:
                for season in range(ns):
                    for day in range(nd):
                        chunk = {}
                        chunk['CommId'] = comm['CommId']
                        s = str(season + 1)
                        d = str(day + 1)
                        chunk['Timeslice'] = "S"+s+d
                        for year in years:
                            if keys_exists(RYCTssource, ryt['id'], year, comm['CommId'], "S"+s+d):
                                chunk[year] = RYCTssource[ryt['id']][year][comm['CommId']]["S"+s+d]
                            else:
                                chunk[year] = 0  
                        RYCTsdata[ryt['id']].append(chunk)

        File.writeFile( RYCTsdata, OsemosysModel.ryctsPath)
    except(IOError):
        raise IOError