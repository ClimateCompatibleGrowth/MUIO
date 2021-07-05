from pathlib import Path
import os
from Classes.Base import Config
from Classes.Base.FileClass import File

class Case:
    def __init__(self, case, genData):
        self.case = case
        self.PARAMETERS = File.readParamFile(Path(Config.DATA_STORAGE, 'Parameters.json'))
        self.genData =  genData
        self.Rpath = Path(Config.DATA_STORAGE, case, "R.json")
        self.RYpath = Path(Config.DATA_STORAGE, case, "RY.json")
        self.RTpath = Path(Config.DATA_STORAGE, case, "RT.json")
        self.REpath = Path(Config.DATA_STORAGE, case, "RE.json")
        self.RYTpath = Path(Config.DATA_STORAGE, case, "RYT.json")
        self.RYTCpath = Path(Config.DATA_STORAGE, case, "RYTC.json")
        self.RYTspath = Path(Config.DATA_STORAGE, case, "RYTs.json")
        self.RYCpath = Path(Config.DATA_STORAGE, case, "RYC.json")
        self.RYEpath = Path(Config.DATA_STORAGE, case, "RYE.json")
        self.RYTTspath = Path(Config.DATA_STORAGE, case, "RYTTs.json")
        self.RYCTspath = Path(Config.DATA_STORAGE, case, "RYCTs.json")
        self.RYTEpath = Path(Config.DATA_STORAGE, case, "RYTE.json")

    def default_R(self):
        try:
            scenarios = self.genData['osy-scenarios']
            Rdata = {}
            for rt in self.PARAMETERS['R']:
                Rdata[rt['id']] = {}
                for sc in scenarios:
                    Rdata[rt['id']][sc['ScenarioId']] = []
                    chunk = {}
                    if sc['ScenarioId'] == 'SC_0':
                        chunk['value'] = rt['default']
                    else:
                        chunk['value'] = None
                    Rdata[rt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( Rdata, self.Rpath)
        except(IOError):
            raise IOError

    def default_RY(self):
        try:
            years = self.genData['osy-years']
            scenarios = self.genData['osy-scenarios']
            RYdata = {}
            for ry in self.PARAMETERS['RY']:
                RYdata[ry['id']] = {}
                for sc in scenarios:
                    RYdata[ry['id']][sc['ScenarioId']] = []
                    chunk = {}
                    for year in years:
                        if sc['ScenarioId'] == 'SC_0':
                            chunk[year] = ry['default']
                        else:
                            chunk[year] = None
                    RYdata[ry['id']][sc['ScenarioId']].append(chunk)
            File.writeFile( RYdata, self.RYpath)
        except(IOError):
            raise IOError

    def default_RT(self):
        try:
            techs = self.genData['osy-tech']
            scenarios = self.genData['osy-scenarios']
            RTdata = {}
            for rt in self.PARAMETERS['RT']:
                RTdata[rt['id']] = {}
                for sc in scenarios:
                    RTdata[rt['id']][sc['ScenarioId']] = []
                    chunk = {}
                    for tech in techs:
                        if sc['ScenarioId'] == 'SC_0':
                            chunk[tech['TechId']] = rt['default']
                        else:
                            chunk[tech['TechId']] = None
                    RTdata[rt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RTdata, self.RTpath)
        except(IOError):
            raise IOError

    def default_RE(self):
        try:
            emis = self.genData['osy-emis']
            scenarios = self.genData['osy-scenarios']
            REdata = {}
            for rt in self.PARAMETERS['RE']:
                REdata[rt['id']] = {}
                for sc in scenarios:
                    REdata[rt['id']][sc['ScenarioId']] = []
                    chunk = {}
                    for emi in emis:
                        if sc['ScenarioId'] == 'SC_0':
                            chunk[emi['EmisId']] = rt['default']
                        else:
                            chunk[emi['EmisId']] = None
                    REdata[rt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( REdata, self.REpath)
        except(IOError):
            raise IOError

    def default_RYTs(self):
        try:
            years = self.genData['osy-years']
            seasons = int(self.genData['osy-ns'])
            days = int(self.genData['osy-dt'])
            scenarios = self.genData['osy-scenarios']
            RYTsdata = {}
            for ryt in self.PARAMETERS['RYTs']:
                RYTsdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTsdata[ryt['id']][sc['ScenarioId']] = []    
                    for season in range(seasons):
                        for day in range(days):
                            chunk = {}
                            s = str(season + 1)
                            d = str(day + 1)
                            chunk['YearSplit'] = "S"+s+d
                            for year in years:
                                if sc['ScenarioId'] == 'SC_0':
                                    chunk[year] = ryt['default']
                                else:
                                    chunk[year] = None
                            RYTsdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTsdata, self.RYTspath)
        except(IOError):
            raise IOError

    def default_RYT(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            scenarios = self.genData['osy-scenarios']
            
            RYTdata = {}
            for ryt in self.PARAMETERS['RYT']:
                RYTdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTdata[ryt['id']][sc['ScenarioId']] = []
                    for tech in techs:
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        for year in years:
                            if sc['ScenarioId'] == 'SC_0':
                                chunk[year] = ryt['default']
                            else:
                                chunk[year] = None
                        RYTdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTdata, self.RYTpath)
        except(IOError):
            raise IOError

    def default_RYC(self):
        try:
            years = self.genData['osy-years']
            comms = self.genData['osy-comm']
            scenarios = self.genData['osy-scenarios']
            
            RYCdata = {}
            for ryt in self.PARAMETERS['RYC']:
                RYCdata[ryt['id']] = {}
                for sc in scenarios:
                    RYCdata[ryt['id']][sc['ScenarioId']] = []
                    for comm in comms:
                        chunk = {}
                        chunk['CommId'] = comm['CommId']
                        for year in years:
                            if sc['ScenarioId'] == 'SC_0':
                                chunk[year] = ryt['default']
                            else:
                                chunk[year] = None
                        RYCdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYCdata, self.RYCpath)
        except(IOError):
            raise IOError

    def default_RYE(self):
        try:
            years = self.genData['osy-years']
            emis = self.genData['osy-emis']
            scenarios = self.genData['osy-scenarios']
            
            RYEdata = {}
            for ryt in self.PARAMETERS['RYE']:
                RYEdata[ryt['id']] = {}
                for sc in scenarios:
                    RYEdata[ryt['id']][sc['ScenarioId']] = []
                    for emi in emis:
                        chunk = {}
                        chunk['EmisId'] = emi['EmisId']
                        for year in years:
                            if sc['ScenarioId'] == 'SC_0':
                                chunk[year] = ryt['default']
                            else:
                                chunk[year] = None
                        RYEdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYEdata, self.RYEpath)
        except(IOError):
            raise IOError

    def default_RYTC(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            scenarios = self.genData['osy-scenarios']
            
            RYTCdata = {}
            for ryt in self.PARAMETERS['RYTC']:
                RYTCdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTCdata[ryt['id']][sc['ScenarioId']] = []    
                    for tech in techs:
                        if tech[ryt['id']]:
                            for comm in tech[ryt['id']]:
                                chunk = {}
                                chunk['TechId'] = tech['TechId']
                                chunk['CommId'] = comm
                                for year in years:
                                    if sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None 
                                RYTCdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTCdata, self.RYTCpath)
        except(IOError):
            raise IOError

    def default_RYTE(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            scenarios = self.genData['osy-scenarios']
            
            RYTEdata = {}
            for ryt in self.PARAMETERS['RYTE']:
                RYTEdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTEdata[ryt['id']][sc['ScenarioId']] = []  
                    for tech in techs:
                        if tech[ryt['id']]:
                            for comm in tech[ryt['id']]:
                                chunk = {}
                                chunk['TechId'] = tech['TechId']
                                chunk['EmisId'] = comm
                                for year in years:
                                    if sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYTEdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTEdata, self.RYTEpath)
        except(IOError):
            raise IOError

    def default_RYTTs(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            ns = int(self.genData['osy-ns'])
            nd = int(self.genData['osy-dt'])
            scenarios = self.genData['osy-scenarios']
            
            RYTTsdata = {}
            for ryt in self.PARAMETERS['RYTTs']:
                RYTTsdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTTsdata[ryt['id']][sc['ScenarioId']] = []    
                    for tech in techs:
                        for season in range(ns):
                            for day in range(nd):
                                chunk = {}
                                chunk['TechId'] = tech['TechId']
                                s = str(season + 1)
                                d = str(day + 1)
                                chunk['Timeslice'] = "S"+s+d
                                for year in years:
                                    if sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYTTsdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTTsdata, self.RYTTspath)
        except(IOError):
            raise IOError

    def default_RYCTs(self):
        try:
            years = self.genData['osy-years']
            comms = self.genData['osy-comm']
            ns = int(self.genData['osy-ns'])
            nd = int(self.genData['osy-dt'])
            scenarios = self.genData['osy-scenarios']
            
            RYCTsdata = {}
            for ryt in self.PARAMETERS['RYCTs']:
                RYCTsdata[ryt['id']] = {}
                for sc in scenarios:
                    RYCTsdata[ryt['id']][sc['ScenarioId']] = []  
                    for comm in comms:
                        for season in range(ns):
                            for day in range(nd):
                                chunk = {}
                                chunk['CommId'] = comm['CommId']
                                s = str(season + 1)
                                d = str(day + 1)
                                chunk['Timeslice'] = "S"+s+d
                                for year in years:
                                    if sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYCTsdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYCTsdata, self.RYCTspath)
        except(IOError):
            raise IOError

    def createCase(self):
        try:
            self.default_R()
            self.default_RY()
            self.default_RT()
            self.default_RE()
            self.default_RYTs()
            self.default_RYT()
            self.default_RYC()
            self.default_RYE()
            self.default_RYTC()
            self.default_RYTE()
            self.default_RYCTs()
            self.default_RYTTs()
            
        except(IOError):
            raise IOError