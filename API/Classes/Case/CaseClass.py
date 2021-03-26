from pathlib import Path
from Classes.Base import Config
from Classes.Base.FileClass import File

class Case:
    def __init__(self, case, genData):
        self.case = case
        self.PARAMETERS = File.readParamFile(Path(Config.CLASS_FOLDER, 'Parameters.json'))
        self.genData =  genData
        self.RYTpath = Path(Config.DATA_STORAGE, case, "RYT.json")
        self.RYTCpath = Path(Config.DATA_STORAGE, case, "RYTC.json")
        self.RYTspath = Path(Config.DATA_STORAGE, case, "RYTs.json")
        self.RYCpath = Path(Config.DATA_STORAGE, case, "RYC.json")
        self.RYEpath = Path(Config.DATA_STORAGE, case, "RYE.json")
        self.RYTTspath = Path(Config.DATA_STORAGE, case, "RYTTs.json")
        self.RYCTspath = Path(Config.DATA_STORAGE, case, "RYCTs.json")
        self.RYTEpath = Path(Config.DATA_STORAGE, case, "RYTE.json")

    def default_RYT(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            
            RYTdata = {}
            for ryt in self.PARAMETERS['RYT']:
                RYTdata[ryt['id']] = []
                for tech in techs:
                    chunk = {}
                    chunk['TechId'] = tech['TechId']
                    for year in years:
                        chunk[year] = 0  
                    RYTdata[ryt['id']].append(chunk)

            File.writeFile( RYTdata, self.RYTpath)
        except(IOError):
            raise IOError

    def default_RYTC(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            
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
                                chunk[year] = 0  
                            RYTCdata[ryt['id']].append(chunk)

            File.writeFile( RYTCdata, self.RYTCpath)
        except(IOError):
            raise IOError

    def default_RYTE(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            
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
                                chunk[year] = 0  
                            RYTEdata[ryt['id']].append(chunk)

            File.writeFile( RYTEdata, self.RYTEpath)
        except(IOError):
            raise IOError

    def default_RYC(self):
        try:
            years = self.genData['osy-years']
            comms = self.genData['osy-comm']
            
            RYCdata = {}
            for ryt in self.PARAMETERS['RYC']:
                RYCdata[ryt['id']] = []
                for comm in comms:
                    chunk = {}
                    chunk['CommId'] = comm['CommId']
                    for year in years:
                        chunk[year] = 0  
                    RYCdata[ryt['id']].append(chunk)

            File.writeFile( RYCdata, self.RYCpath)
        except(IOError):
            raise IOError

    def default_RYE(self):
        try:
            years = self.genData['osy-years']
            emis = self.genData['osy-emis']
            
            RYEdata = {}
            for ryt in self.PARAMETERS['RYE']:
                RYEdata[ryt['id']] = []
                for emi in emis:
                    chunk = {}
                    chunk['EmisId'] = emi['EmisId']
                    for year in years:
                        chunk[year] = 0  
                    RYEdata[ryt['id']].append(chunk)

            File.writeFile( RYEdata, self.RYEpath)
        except(IOError):
            raise IOError

    def default_RYTs(self):
        try:
            years = self.genData['osy-years']
            seasons = int(self.genData['osy-ns'])
            days = int(self.genData['osy-dt'])
            
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
                            chunk[year] = 0  
                        RYTsdata[ryt['id']].append(chunk)

            File.writeFile( RYTsdata, self.RYTspath)
        except(IOError):
            raise IOError

    def default_RYTTs(self):
        try:
            years = self.genData['osy-years']
            techs = self.genData['osy-tech']
            ns = int(self.genData['osy-ns'])
            nd = int(self.genData['osy-dt'])
            
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
                                chunk[year] = 0  
                            RYTTsdata[ryt['id']].append(chunk)

            File.writeFile( RYTTsdata, self.RYTTspath)
        except(IOError):
            raise IOError

    def default_RYCTs(self):
        try:
            years = self.genData['osy-years']
            comms = self.genData['osy-comm']
            ns = int(self.genData['osy-ns'])
            nd = int(self.genData['osy-dt'])
            
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
                                chunk[year] = 0  
                            RYCTsdata[ryt['id']].append(chunk)

            File.writeFile( RYCTsdata, self.RYCTspath)
        except(IOError):
            raise IOError

    def createCase(self):
        try:
            self.default_RYT()
            self.default_RYTC()
            self.default_RYTs()
            self.default_RYC()
            self.default_RYE()
            self.default_RYTTs()
            self.default_RYCTs()
            self.default_RYTE()
        except(IOError):
            raise IOError