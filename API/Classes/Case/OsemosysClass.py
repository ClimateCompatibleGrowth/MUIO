from pathlib import Path
import os
import shutil
from distutils.dir_util import copy_tree

from Classes.Base import Config
from Classes.Base.FileClass import File

class Osemosys():
    def __init__(self, case):
        self.case = case
        self.PARAMETERS = File.readParamFile(Path(Config.CLASS_FOLDER, 'Parameters.json'))
        self.genData =  File.readFile(Path(Config.DATA_STORAGE,case,'genData.json'))
        #Case.__init__(self, case)
        self.casePath = Path(Config.DATA_STORAGE,case)
        self.zipPath = Path(Config.DATA_STORAGE,case+'.zip')
        #self.genData = Path(Config.DATA_STORAGE,case,'genData.json')
        self.rytPath = Path(Config.DATA_STORAGE,case,'RYT.json')
        self.rytcPath = Path(Config.DATA_STORAGE,case,'RYTC.json')
        self.rytsPath = Path(Config.DATA_STORAGE,case,'RYTs.json')
        self.rycPath = Path(Config.DATA_STORAGE,case,'RYC.json')
        self.ryePath = Path(Config.DATA_STORAGE,case,'RYE.json')
        self.ryttsPath = Path(Config.DATA_STORAGE,case,'RYTTs.json')
        self.ryctsPath = Path(Config.DATA_STORAGE,case,'RYCTs.json')
        self.rytePath = Path(Config.DATA_STORAGE,case,'RYTE.json')
        self.dataFile = Path(Config.DATA_STORAGE,case,'data.txt')
        self.dataFileS3 = Path(Config.S3_BUCKET_LOCAL,case,'data.txt')
        self.resFile = Path(Config.DATA_STORAGE,case,'results.txt')
        self.osemosysFile = Path(Config.GLPK_FOLDER,'osemosys.txt')
        self.glpkFolder = Path(Config.GLPK_FOLDER,'glpk-4.65', 'w64')
        self.resPath = Path(Config.DATA_STORAGE,case,'res', 'csv')

        d = {}
        for k, l in self.PARAMETERS.items():
            tmp = {}
            for de in l:
                tmp[de['id']] = de['value'].replace(" ", "")
            d[k] = tmp
        self.PARAM = d

    def keys_exists(self, element, *keys):
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
        
    def getYears(self):
        years = self.genData['osy-years']
        return years

    def getTimeslices(self):
        seasons = int(self.genData['osy-ns'])
        days = int(self.genData['osy-dt'])
        timeslice = []
        for season in range(seasons):
            for day in range(days):
                s = str(season + 1)
                d = str(day + 1)
                timeslice.append("S"+s+d)
        return timeslice 

    def getTechIds(self):
        techIds = [ tech['TechId'] for tech in self.genData["osy-tech"]]
        return techIds

    def getTechs(self):
        techs = [ {tech['TechId']:tech['Tech']} for tech in self.genData["osy-tech"]]
        return techs

    def getTechsMap(self):
        techs = {tech['TechId']: tech['Tech'] for tech in self.genData["osy-tech"] }
        return techs

    def getEmiIds(self):
        emiIds = [ tech['EmisId'] for tech in self.genData["osy-emis"]]
        return emiIds

    def getEmis(self):
        emis = [ {tech['EmisId']: tech['Emis']} for tech in self.genData["osy-emis"]]
        return emis

    def getEmisMap(self):
        emis = {tech['EmisId']: tech['Emis'] for tech in self.genData["osy-emis"] }
        return emis

    def getCommIds(self):
        commIds = [ tech['CommId'] for tech in self.genData["osy-comm"]]
        return commIds

    def getComms(self):
        comms = [ {tech['CommId']: tech['Comm']} for tech in self.genData["osy-comm"]]
        return comms

    def getCommsMap(self):
        comms = {tech['CommId']: tech['Comm'] for tech in self.genData["osy-comm"] }
        return comms
    
    # def getActivityTechIds(self):
    #     genData = File.readFile(self.genData)
    #     techIds = [ tech['TechId'] for tech in genData["osy-tech"] if tech['IAR'] or tech['OAR'] ]
    #     return techIds

    #output actTech['IAR'] = ['Tech_1', 'Tech_2'...]
    def getActivityTechIds(self):
        techIds = {}
        for param in self.PARAMETERS['RYTC']:
            techIds[param['id']] = []
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    techIds[param['id']].append(tech['TechId'])
        return techIds

    #output actTech['IAR']['Tech_1'] = ['Comm_1', 'Comm_2'...]
    def getActivityCommIds(self):
        commIds = {}
        for param in self.PARAMETERS['RYTC']:
            commIds[param['id']] = {}
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    commIds[param['id']][tech['TechId']] = tech[param['id']]
        return commIds

    def getActivityEmissionTechIds(self):
        techIds = {}
        for param in self.PARAMETERS['RYTE']:
            techIds[param['id']] = []
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    techIds[param['id']].append(tech['TechId'])
        return techIds

    def getActivityEmisionIds(self):
        commIds = {}
        for param in self.PARAMETERS['RYTE']:
            commIds[param['id']] = {}
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    commIds[param['id']][tech['TechId']] = tech[param['id']]
        return commIds

    def R(self):
        R = {}
        for id in self.PARAM['R']:
            R[id] = {}
            R[id] = self.genData["osy-"+id.lower()]
        return R

    def T(self):
        T = {}
        for id in self.PARAM['T']:
            T[id] = {}
            for tech in self.genData["osy-tech"]:
                T[id][tech['TechId']] = tech[id]
        return T

    def RT(self):
        RT = {}
        for id in self.PARAM['RT']:
            RT[id] = {}
            for tech in self.genData["osy-tech"]:
                RT[id][tech['TechId']] = tech[id]
        return RT

    def RYT(self, RYTdata):
        RYT = {}
        for param, array in RYTdata.items():
            RYT[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYT[param]:
                        RYT[param][year] = {}
                    if (year != 'TechId'):
                        if obj['TechId'] not in RYT[param][year]:
                            RYT[param][year][obj['TechId']] = {}
                        RYT[param][year][obj['TechId']] = val
        return RYT

    def RYTs(self, RYTsdata):
        RYTs = {}
        for param, array in RYTsdata.items():
            RYTs[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYTs:
                        RYTs[year] = {}
                    if (year != 'YearSplit'):
                        if obj['YearSplit'] not in RYTs[year]:
                            RYTs[year][obj['YearSplit']] = {}
                        RYTs[year][obj['YearSplit']] = val
        return RYTs

    def RYTC(self, RYTCdata):
        RYTC = {}
        for param, array in RYTCdata.items():
            RYTC[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYTC[param]:
                        RYTC[param][year] = {}
                    if (year != 'TechId' and year != 'CommId'):
                        if obj['TechId'] not in RYTC[param][year]:
                            RYTC[param][year][obj['TechId']] = {}
                        RYTC[param][year][obj['TechId']][obj['CommId']] = val
        return RYTC

    def RYTE(self, RYTEdata):
        RYTE = {}
        for param, array in RYTEdata.items():
            RYTE[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYTE[param]:
                        RYTE[param][year] = {}
                    if (year != 'TechId' and year != 'EmisId'):
                        if obj['TechId'] not in RYTE[param][year]:
                            RYTE[param][year][obj['TechId']] = {}
                        RYTE[param][year][obj['TechId']][obj['EmisId']] = val
        return RYTE

    def RYC(self, RYCdata):
        RYC = {}
        for param, array in RYCdata.items():
            RYC[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYC[param]:
                        RYC[param][year] = {}
                    if (year != 'CommId'):
                        if obj['CommId'] not in RYC[param][year]:
                            RYC[param][year][obj['CommId']] = {}
                        RYC[param][year][obj['CommId']] = val
        return RYC

    def RYE(self, RYEdata):
        RYE = {}
        for param, array in RYEdata.items():
            RYE[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYE[param]:
                        RYE[param][year] = {}
                    if (year != 'EmisId'):
                        if obj['EmisId'] not in RYE[param][year]:
                            RYE[param][year][obj['EmisId']] = {}
                        RYE[param][year][obj['EmisId']] = val
        return RYE

    def RYTTs(self, RYTTsdata):
        RYTTs = {}
        for param, array in RYTTsdata.items():
            RYTTs[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYTTs[param]:
                        RYTTs[param][year] = {}
                    if (year != 'TechId' and year != 'Timeslice'):
                        if obj['TechId'] not in RYTTs[param][year]:
                            RYTTs[param][year][obj['TechId']] = {}
                        RYTTs[param][year][obj['TechId']][obj['Timeslice']] = val
        return RYTTs

    def RYCTs(self, RYCTsdata):
        RYCTs = {}
        for param, array in RYCTsdata.items():
            RYCTs[param] = {}
            for obj in array:
                for year, val in obj.items():
                    if year not in RYCTs[param]:
                        RYCTs[param][year] = {}
                    if (year != 'CommId' and year != 'Timeslice'):
                        if obj['CommId'] not in RYCTs[param][year]:
                            RYCTs[param][year][obj['CommId']] = {}
                        RYCTs[param][year][obj['CommId']][obj['Timeslice']] = val
        return RYCTs