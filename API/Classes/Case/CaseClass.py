from pathlib import Path
import os
import shutil
from distutils.dir_util import copy_tree

from Classes.Base import Config
from Classes.Base.FileClass import File

class OsemosysCase:
    def __init__(self, case):
        self.case = case
        self.casePath = Path(Config.DATA_STORAGE,case)
        self.zipPath = Path(Config.DATA_STORAGE,case+'.zip')
        self.genData = Path(Config.DATA_STORAGE,case,'genData.json')
        self.rytPath = Path(Config.DATA_STORAGE,case,'RYT.json')
        self.rytcPath = Path(Config.DATA_STORAGE,case,'RYTC.json')
        self.rytsPath = Path(Config.DATA_STORAGE,case,'RYTs.json')
        self.rycPath = Path(Config.DATA_STORAGE,case,'RYC.json')
        self.ryePath = Path(Config.DATA_STORAGE,case,'RYE.json')
        self.ryttsPath = Path(Config.DATA_STORAGE,case,'RYTTs.json')
        self.ryctsPath = Path(Config.DATA_STORAGE,case,'RYCTs.json')
        self.rytePath = Path(Config.DATA_STORAGE,case,'RYTE.json')

    def getYears(self):
        genData = File.readFile(self.genData)
        years = genData['osy-years']
        return years

    def getTechIds(self):
        genData = File.readFile(self.genData)
        techIds = [ tech['TechId'] for tech in genData["osy-tech"]]
        return techIds

    def getCommIds(self):
        genData = File.readFile(self.genData)
        commIds = [ tech['CommId'] for tech in genData["osy-comm"]]
        return commIds
    
    def getActivityTechIds(self):
        genData = File.readFile(self.genData)
        techIds = [ tech['TechId'] for tech in genData["osy-tech"] if tech['IAR'] or tech['OAR'] ]
        return techIds

    def getActivityCommIds(self):
        genData = File.readFile(self.genData)
        commIds = {}
        for param in Config.PARAMETERS['RYTC']:
            commIds[param['id']] = {}
            for tech in genData["osy-tech"]:
                if tech[param['id']]: 
                    commIds[param['id']][tech['TechId']] = tech[param['id']]
        return commIds

    def getJsonData(self, JsonFile):
        path = Path(Config.DATA_STORAGE,self.case,JsonFile)
        JsonData = File.readFile(path)
        return JsonData

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