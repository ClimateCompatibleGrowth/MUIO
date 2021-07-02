from pathlib import Path
#from Classes.Base import Config
from Classes.Base.FileClass import File
from Classes.Case.OsemosysClass import Osemosys

class UpdateCase(Osemosys):
    def __init__(self, case, genData):
        Osemosys.__init__(self, case)
        self.genDataUpdate =  genData

    def updateRmodel(self):
        try:
            rJson = File.readFile(self.rPath) 
            Rsource = self.R(rJson)
            scenarios = self.genDataUpdate['osy-scenarios']
            Rdata = {}
            for r in self.PARAMETERS['R']:
                Rdata[r['id']] = {}
                for sc in scenarios:
                    Rdata[r['id']][sc['ScenarioId']] = []
                    chunk = {}
                    if self.keys_exists(Rsource, r['id'], sc['ScenarioId'], 'value'):
                        chunk['value'] = Rsource[r['id']][sc['ScenarioId']]['value']
                    elif sc['ScenarioId'] == 'SC_0':
                        chunk['value'] = r['default']
                    else:
                        chunk['value'] = None
                    Rdata[r['id']][sc['ScenarioId']].append(chunk)


            File.writeFile( Rdata, self.rPath)
        except(IOError):
            raise IOError

    def updateRYmodel(self):
        try:
            ryJson = File.readFile(self.ryPath) 
            RYsource = self.RY(ryJson)
            years = self.genDataUpdate['osy-years']
            scenarios = self.genDataUpdate['osy-scenarios']

            RYdata = {}
            for ry in self.PARAMETERS['RY']:
                RYdata[ry['id']] = {}
                for sc in scenarios:
                    RYdata[ry['id']][sc['ScenarioId']] = []
                    chunk = {}
                    #chunk['ryVar'] = ry['id']
                    for year in years:
                        if self.keys_exists(RYsource, ry['id'], sc['ScenarioId'], year):
                            chunk[year] = RYsource[ry['id']][sc['ScenarioId']][year]
                        elif sc['ScenarioId'] == 'SC_0':
                            chunk[year] = ry['default']
                        else:
                            chunk[year] = None
                    RYdata[ry['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYdata, self.ryPath)
        except(IOError):
            raise IOError

    def updateRTmodel(self):
        try:
            rtJson = File.readFile(self.rtPath) 
            RTsource = self.RT(rtJson)
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            RTdata = {}
            for rt in self.PARAMETERS['RT']:
                RTdata[rt['id']] = {}
                for sc in scenarios:
                    RTdata[rt['id']][sc['ScenarioId']] = []
                    chunk = {}
                    for tech in techs:
                        if self.keys_exists(RTsource, rt['id'], sc['ScenarioId'], tech['TechId']):
                            chunk[tech['TechId']] = RTsource[rt['id']][sc['ScenarioId']][tech['TechId']]
                        elif sc['ScenarioId'] == 'SC_0':
                            chunk[tech['TechId']] = rt['default']
                        else:
                            chunk[tech['TechId']] = None
                    RTdata[rt['id']][sc['ScenarioId']].append(chunk)
            File.writeFile( RTdata, self.rtPath)
        except(IOError):
            raise IOError

    def updateREmodel(self):
        try:
            reJson = File.readFile(self.rePath) 
            REsource = self.RE(reJson)
            emis = self.genDataUpdate['osy-emis']
            scenarios = self.genDataUpdate['osy-scenarios']

            RTdata = {}
            for rt in self.PARAMETERS['RE']:
                RTdata[rt['id']] = {}
                for sc in scenarios:
                    RTdata[rt['id']][sc['ScenarioId']] = []
                    chunk = {}
                    for emi in emis:
                        if self.keys_exists(REsource, rt['id'], sc['ScenarioId'], emi['EmisId']):
                            chunk[emi['EmisId']] = REsource[rt['id']][sc['ScenarioId']][emi['EmisId']]
                        elif sc['ScenarioId'] == 'SC_0':
                            chunk[emi['EmisId']] = rt['default']
                        else:
                            chunk[emi['EmisId']] = None
                    RTdata[rt['id']][sc['ScenarioId']].append(chunk)


            File.writeFile( RTdata, self.rePath)
        except(IOError):
            raise IOError

    def updateRYTmodel(self):
        try:
            rytJson = File.readFile(self.rytPath) 
            RYTsource = self.RYT(rytJson)
            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            
            RYTdata = {}
            for ryt in self.PARAMETERS['RYT']:
                RYTdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTdata[ryt['id']][sc['ScenarioId']] = []
                    for tech in techs:
                        chunk = {}
                        chunk['TechId'] = tech['TechId']
                        for year in years:
                            if self.keys_exists(RYTsource, ryt['id'], sc['ScenarioId'], year, tech['TechId']):
                                chunk[year] = RYTsource[ryt['id']][sc['ScenarioId']][year][tech['TechId']]

                            elif  sc['ScenarioId'] == 'SC_0':
                                chunk[year] = ryt['default']
                            else:
                                chunk[year] = None
                        RYTdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTdata, self.rytPath)
        except(IOError):
            raise IOError

    def updateRYCmodel(self):
        try:
            rycJson = File.readFile(self.rycPath) 
            RYCsource = self.RYC(rycJson)
            years = self.genDataUpdate['osy-years']
            comms = self.genDataUpdate['osy-comm']
            scenarios = self.genDataUpdate['osy-scenarios']
           
            RYCdata = {}
            for ryt in self.PARAMETERS['RYC']:
                RYCdata[ryt['id']] = {}
                for sc in scenarios:
                    RYCdata[ryt['id']][sc['ScenarioId']] = []                
                    for comm in comms:
                        chunk = {}
                        chunk['CommId'] = comm['CommId']
                        for year in years:
                            if self.keys_exists(RYCsource, ryt['id'], sc['ScenarioId'], year, comm['CommId']):
                                chunk[year] = RYCsource[ryt['id']][sc['ScenarioId']][year][comm['CommId']]
                            elif sc['ScenarioId'] == 'SC_0':
                                chunk[year] = ryt['default']
                            else:
                                chunk[year] = None
                        RYCdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYCdata, self.rycPath)
        except(IOError):
            raise IOError

    def updateRYEmodel(self):
        try:
            ryeJson = File.readFile(self.ryePath) 
            RYEsource = self.RYE(ryeJson)
            years = self.genDataUpdate['osy-years']
            emis = self.genDataUpdate['osy-emis']
            scenarios = self.genDataUpdate['osy-scenarios']
            
            RYEdata = {}
            for ryt in self.PARAMETERS['RYE']:
                RYEdata[ryt['id']] = {}
                for sc in scenarios:
                    RYEdata[ryt['id']][sc['ScenarioId']] = []  
                    for emi in emis:
                        chunk = {}
                        chunk['EmisId'] = emi['EmisId']
                        for year in years:
                            if self.keys_exists(RYEsource, ryt['id'], sc['ScenarioId'], year, emi['EmisId']):
                                chunk[year] = RYEsource[ryt['id']][sc['ScenarioId']][year][emi['EmisId']]
                            elif sc['ScenarioId'] == 'SC_0':
                                chunk[year] = ryt['default']
                            else:
                                chunk[year] = None
                        RYEdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYEdata, self.ryePath)
        except(IOError):
            raise IOError

    def updateRYTsmodel(self):
        try:
            rytsJson = File.readFile(self.rytsPath) 
            RYTssource = self.RYTs(rytsJson)
            years = self.genDataUpdate['osy-years']
            scenarios = self.genDataUpdate['osy-scenarios']

            seasons = int(self.genDataUpdate['osy-ns'])
            days = int(self.genDataUpdate['osy-dt'])
            
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
                                if self.keys_exists(RYTssource, ryt['id'], sc['ScenarioId'], year, "S"+s+d):
                                    chunk[year] = RYTssource[ryt['id']][sc['ScenarioId']][year]["S"+s+d]
                                elif sc['ScenarioId'] == 'SC_0':
                                    chunk[year] = ryt['default']
                                else:
                                    chunk[year] = None
                            RYTsdata[ryt['id']][sc['ScenarioId']].append(chunk)

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
                                    chunk[year] = ryt['default']
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
                                    chunk[year] = ryt['default'] 
                            RYTEdata[ryt['id']].append(chunk)

            File.writeFile( RYTEdata, self.rytePath)

        except(IOError):
            raise IOError

    def updateRYTTsmodel(self):
        try:
            ryttsJson = File.readFile(self.ryttsPath) 
            RYTTssource = self.RYTTs(ryttsJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            ns = int(self.genDataUpdate['osy-ns'])
            nd = int(self.genDataUpdate['osy-dt'])

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
                                    if self.keys_exists(RYTTssource, ryt['id'], sc['ScenarioId'], year, tech['TechId'], "S"+s+d):
                                        chunk[year] = RYTTssource[ryt['id']][sc['ScenarioId']][year][tech['TechId']]["S"+s+d]
                                    elif sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYTTsdata[ryt['id']][sc['ScenarioId']].append(chunk)

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
                                    chunk[year] = ryt['default']
                            RYCTsdata[ryt['id']].append(chunk)

            File.writeFile( RYCTsdata, self.ryctsPath)
        except(IOError):
            raise IOError

    def updateCase(self):
        try:
            self.updateRmodel()
            self.updateRYmodel()
            self.updateRTmodel()
            self.updateREmodel()
            self.updateRYTsmodel()
            self.updateRYTmodel()
            self.updateRYCmodel()
            self.updateRYEmodel()
            self.updateRYCTsmodel()
            self.updateRYTEmodel()
            self.updateRYTCmodel()
            self.updateRYTTsmodel()
        except(IOError):
            raise IOError