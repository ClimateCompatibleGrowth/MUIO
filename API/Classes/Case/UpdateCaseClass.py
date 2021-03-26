from pathlib import Path
#from Classes.Base import Config
from Classes.Base.FileClass import File
from Classes.Case.OsemosysClass import Osemosys

class UpdateCase(Osemosys):
    def __init__(self, case, genData):
        Osemosys.__init__(self, case)
        self.genDataUpdate =  genData

    def updateRYTmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #rytJson = OsemosysModel.getJsonData('RYT.json')
            rytJson = File.readFile(self.rytPath) 
            RYTsource = self.RYT(rytJson)
            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            
            RYTdata = {}
            for ryt in self.PARAMETERS['RYT']:
                RYTdata[ryt['id']] = []
                for tech in techs:
                    chunk = {}
                    chunk['TechId'] = tech['TechId']
                    for year in years:
                        if self.keys_exists(RYTsource, ryt['id'], year, tech['TechId']):
                            chunk[year] = RYTsource[ryt['id']][year][tech['TechId']]
                        else:
                            chunk[year] = 0  
                    RYTdata[ryt['id']].append(chunk)

            File.writeFile( RYTdata, self.rytPath)
        except(IOError):
            raise IOError

    def updateRYTsmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #rytsJson = OsemosysModel.getJsonData('RYTs.json')
            rytsJson = File.readFile(self.rytsPath) 
            RYTssource = self.RYTs(rytsJson)
            years = self.genDataUpdate['osy-years']

            seasons = int(self.genDataUpdate['osy-ns'])
            days = int(self.genDataUpdate['osy-dt'])
            
            RYTsdata = {}
            for ryt in self.PARAMETERS['RYTs']:
                RYTsdata[ryt['id']] = []
                for season in range(seasons):
                    for day in range(days):
                        chunk = {}
                        s = str(season + 1)
                        d = str(day + 1)
                        chunk['YearSplit'] = "S"+s+d
                        for year in years:
                            if self.keys_exists(RYTssource, year, "S"+s+d):
                                chunk[year] = RYTssource[year]["S"+s+d]
                            else:
                                chunk[year] = 0  
                        RYTsdata[ryt['id']].append(chunk)

            File.writeFile( RYTsdata, self.rytsPath)
        except(IOError):
            raise IOError

    def updateRYTCmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #rytcJson = OsemosysModel.getJsonData('RYTC.json')
            rytcJson = File.readFile(self.rytcPath) 
            RYTCsource = self.RYTC(rytcJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            
            RYTCdata = {}
            for ryt in self.PARAMETERS['RYTC']:
                RYTCdata[ryt['id']] = []
                for tech in techs:
                    if tech[ryt['id']]:
                        for comm in tech[ryt['id']]:
                            chunk = {}
                            chunk['TechId'] = tech['TechId']
                            chunk['CommId'] = comm
                            for year in years:
                                # if RYTCsource[ryt['id']][year][tech['TechId']][comm]:
                                if self.keys_exists(RYTCsource, ryt['id'], year, tech['TechId'], comm):
                                    chunk[year] = RYTCsource[ryt['id']][year][tech['TechId']][comm]
                                else:
                                    chunk[year] = 0 
                            RYTCdata[ryt['id']].append(chunk)

            File.writeFile( RYTCdata, self.rytcPath)

        except(IOError):
            raise IOError

    def updateRYTEmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #ryteJson = OsemosysModel.getJsonData('RYTE.json')
            ryteJson = File.readFile(self.rytePath) 
            RYTEsource = self.RYTE(ryteJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            
            RYTEdata = {}
            for ryt in self.PARAMETERS['RYTE']:
                RYTEdata[ryt['id']] = []
                for tech in techs:
                    if tech[ryt['id']]:
                        for comm in tech[ryt['id']]:
                            chunk = {}
                            chunk['TechId'] = tech['TechId']
                            chunk['EmisId'] = comm
                            for year in years:
                                # if RYTCsource[ryt['id']][year][tech['TechId']][comm]:
                                if self.keys_exists(RYTEsource, ryt['id'], year, tech['TechId'], comm):
                                    chunk[year] = RYTEsource[ryt['id']][year][tech['TechId']][comm]
                                else:
                                    chunk[year] = 0 
                            RYTEdata[ryt['id']].append(chunk)

            File.writeFile( RYTEdata, self.rytePath)

        except(IOError):
            raise IOError

    def updateRYCmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #rycJson = OsemosysModel.getJsonData('RYC.json')
            rycJson = File.readFile(self.rycPath) 
            RYCsource = self.RYC(rycJson)
            years = self.genDataUpdate['osy-years']
            comms = self.genDataUpdate['osy-comm']
            
            RYCdata = {}
            for ryt in self.PARAMETERS['RYC']:
                RYCdata[ryt['id']] = []
                for comm in comms:
                    chunk = {}
                    chunk['CommId'] = comm['CommId']
                    for year in years:
                        if self.keys_exists(RYCsource, ryt['id'], year, comm['CommId']):
                            chunk[year] = RYCsource[ryt['id']][year][comm['CommId']]
                        else:
                            chunk[year] = 0  
                    RYCdata[ryt['id']].append(chunk)

            File.writeFile( RYCdata, self.rycPath)
        except(IOError):
            raise IOError

    def updateRYEmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #ryeJson = OsemosysModel.getJsonData('RYE.json')
            ryeJson = File.readFile(self.ryePath) 
            RYEsource = self.RYE(ryeJson)
            years = self.genDataUpdate['osy-years']
            emis = self.genDataUpdate['osy-emis']
            
            RYEdata = {}
            for ryt in self.PARAMETERS['RYE']:
                RYEdata[ryt['id']] = []
                for emi in emis:
                    chunk = {}
                    chunk['EmisId'] = emi['EmisId']
                    for year in years:
                        if self.keys_exists(RYEsource, ryt['id'], year, emi['EmisId']):
                            chunk[year] = RYEsource[ryt['id']][year][emi['EmisId']]
                        else:
                            chunk[year] = 0  
                    RYEdata[ryt['id']].append(chunk)

            File.writeFile( RYEdata, self.ryePath)
        except(IOError):
            raise IOError

    def updateRYTTsmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #ryttsJson = OsemosysModel.getJsonData('RYTTs.json')
            ryttsJson = File.readFile(self.ryttsPath) 
            RYTTssource = self.RYTTs(ryttsJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            ns = int(self.genDataUpdate['osy-ns'])
            nd = int(self.genDataUpdate['osy-dt'])

            RYTTsdata = {}
            for ryt in self.PARAMETERS['RYTTs']:
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
                                if self.keys_exists(RYTTssource, ryt['id'], year, tech['TechId'], "S"+s+d):
                                    chunk[year] = RYTTssource[ryt['id']][year][tech['TechId']]["S"+s+d]
                                else:
                                    chunk[year] = 0  
                            RYTTsdata[ryt['id']].append(chunk)

            File.writeFile( RYTTsdata, self.ryttsPath)
        except(IOError):
            raise IOError

    def updateRYCTsmodel(self):
        try:
            #OsemosysModel = Osemosys(case)
            #ryctsJson = OsemosysModel.getJsonData('RYCTs.json')
            ryctsJson = File.readFile(self.ryctsPath) 
            RYCTssource = self.RYCTs(ryctsJson)

            years = self.genDataUpdate['osy-years']
            comms = self.genDataUpdate['osy-comm']
            ns = int(self.genDataUpdate['osy-ns'])
            nd = int(self.genDataUpdate['osy-dt'])

            RYCTsdata = {}
            for ryt in self.PARAMETERS['RYCTs']:
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
                                if self.keys_exists(RYCTssource, ryt['id'], year, comm['CommId'], "S"+s+d):
                                    chunk[year] = RYCTssource[ryt['id']][year][comm['CommId']]["S"+s+d]
                                else:
                                    chunk[year] = 0  
                            RYCTsdata[ryt['id']].append(chunk)

            File.writeFile( RYCTsdata, self.ryctsPath)
        except(IOError):
            raise IOError

    def updateCase(self):
        try:
            self.updateRYTmodel()
            self.updateRYTCmodel()
            self.updateRYTsmodel()
            self.updateRYCmodel()
            self.updateRYEmodel()
            self.updateRYTTsmodel()
            self.updateRYCTsmodel()
            self.updateRYTEmodel()
        except(IOError):
            raise IOError