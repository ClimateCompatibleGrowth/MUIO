from pathlib import Path
from API.Classes.Base import Config
from API.Classes.Base.FileClass import File
from API.Classes.Case.OsemosysClass import Osemosys

class UpdateCase(Osemosys):
    def __init__(self, case, genData):
        Osemosys.__init__(self, case)
        self.genDataUpdate =  genData

    def update_R(self):
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

    def update_RY(self):
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

    def update_RT(self):
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

    def update_RE(self):
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

    def update_RYCn(self):
        try:
            rycnJson = File.readFile(self.rycnPath) 
            RYCnsource = self.RYCn(rycnJson)
            years = self.genDataUpdate['osy-years']
            scenarios = self.genDataUpdate['osy-scenarios']
            constraints = self.genDataUpdate['osy-constraints']
            RYCndata = {}
            for ryt in self.PARAMETERS['RYCn']:
                RYCndata[ryt['id']] = {}
                for sc in scenarios:
                    RYCndata[ryt['id']][sc['ScenarioId']] = []  
                    for con in constraints:
                        chunk = {}
                        chunk['ConId'] = con['ConId']
                        for year in years:
                            if self.keys_exists(RYCnsource, ryt['id'], sc['ScenarioId'], year, con['ConId']):
                                chunk[year] = RYCnsource[ryt['id']][sc['ScenarioId']][year][con['ConId']]
                            elif  sc['ScenarioId'] == 'SC_0':
                                chunk[year] = ryt['default']
                            else:
                                chunk[year] = None
                        RYCndata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYCndata, self.rycnPath)
        except(IOError):
            raise IOError

    def update_RYT(self):
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

    def update_RYTCn(self):
        try:
            rytcnJson = File.readFile(self.rytcnPath) 
            RYTCnsource = self.RYTCn(rytcnJson)
            years = self.genDataUpdate['osy-years']
            scenarios = self.genDataUpdate['osy-scenarios']
            constraints = self.genDataUpdate['osy-constraints']
            
            RYTCndata = {}
            for ryt in self.PARAMETERS['RYTCn']:
                RYTCndata[ryt['id']] = {}
                for sc in scenarios:
                    RYTCndata[ryt['id']][sc['ScenarioId']] = []  
                    for con in constraints:
                        # imamo samo jedan skup tech za constraints
                        # if con[ryt['id']]:
                        if con['CM']:
                            # for tech in con[ryt['id']]:
                            for tech in con['CM']:
                                chunk = {}
                                chunk['TechId'] = tech
                                chunk['ConId'] = con['ConId']
                                for year in years:
                                    if self.keys_exists(RYTCnsource, ryt['id'], sc['ScenarioId'], year, tech, con['ConId']):
                                        chunk[year] = RYTCnsource[ryt['id']][sc['ScenarioId']][year][tech][con['ConId']]
                                    elif sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYTCndata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTCndata, self.rytcnPath)
        except(IOError):
            raise IOError

    def update_RYTM(self):
        try:
            rytmJson = File.readFile(self.rytmPath) 
            RYTMsource = self.RYTM(rytmJson)

            mo = int(self.genDataUpdate['osy-mo'])+1
            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            
            RYTMdata = {}
            for ryt in self.PARAMETERS['RYTM']:
                RYTMdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTMdata[ryt['id']][sc['ScenarioId']] = [] 
                    for tech in techs:
                        for m in range(1, mo):
                            chunk = {}
                            chunk['TechId'] = tech['TechId']
                            chunk['MoId'] = m
                            for year in years:
                                if self.keys_exists(RYTMsource, ryt['id'], sc['ScenarioId'], year, tech['TechId'], m):
                                    chunk[year] = RYTMsource[ryt['id']][sc['ScenarioId']][year][tech['TechId']][m]
                                elif sc['ScenarioId'] == 'SC_0':
                                    chunk[year] = ryt['default']
                                else:
                                    chunk[year] = None
                            RYTMdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTMdata, self.rytmPath)

        except(IOError):
            raise IOError

    def update_RYC(self):
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

    def update_RYE(self):
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

    def update_RYTs(self):
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

    def update_RYTC(self):
        try:
            rytcJson = File.readFile(self.rytcPath) 
            RYTCsource = self.RYTC(rytcJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            
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
                                    if self.keys_exists(RYTCsource, ryt['id'], sc['ScenarioId'], year, tech['TechId'], comm):
                                        chunk[year] = RYTCsource[ryt['id']][sc['ScenarioId']][year][tech['TechId']][comm]
                                    elif sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYTCdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTCdata, self.rytcPath)

        except(IOError):
            raise IOError

    def update_RYTCM(self):
        try:
            rytcmJson = File.readFile(self.rytcmPath) 
            RYTCMsource = self.RYTCM(rytcmJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            mo = int(self.genDataUpdate['osy-mo'])+1
            
            RYTEMdata = {}
            for ryt in self.PARAMETERS['RYTCM']:
                RYTEMdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTEMdata[ryt['id']][sc['ScenarioId']] = [] 
                    for tech in techs:
                        if tech[ryt['id']]:
                            for com in tech[ryt['id']]:
                                for m in range(1, mo):
                                    chunk = {}
                                    chunk['TechId'] = tech['TechId']
                                    chunk['CommId'] = com
                                    chunk['MoId'] = m
                                    for year in years:
                                        # if RYTCsource[ryt['id']][year][tech['TechId']][emi]:
                                        if self.keys_exists(RYTCMsource, ryt['id'], sc['ScenarioId'], year, tech['TechId'], com, m):
                                            chunk[year] = RYTCMsource[ryt['id']][sc['ScenarioId']][year][tech['TechId']][com][m]
                                        elif sc['ScenarioId'] == 'SC_0':
                                            chunk[year] = ryt['default']
                                        else:
                                            chunk[year] = None
                                    RYTEMdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTEMdata, self.rytcmPath)

        except(IOError):
            raise IOError

    def update_RYTE(self):
        try:
            ryteJson = File.readFile(self.rytePath) 
            RYTEsource = self.RYTE(ryteJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            
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
                                    # if RYTCsource[ryt['id']][year][tech['TechId']][comm]:
                                    if self.keys_exists(RYTEsource, ryt['id'], sc['ScenarioId'], year, tech['TechId'], comm):
                                        chunk[year] = RYTEsource[ryt['id']][sc['ScenarioId']][year][tech['TechId']][comm]
                                    elif sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYTEdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTEdata, self.rytePath)

        except(IOError):
            raise IOError

    def update_RYTEM(self):
        try:
            rytemJson = File.readFile(self.rytemPath) 
            RYTEMsource = self.RYTEM(rytemJson)

            years = self.genDataUpdate['osy-years']
            techs = self.genDataUpdate['osy-tech']
            scenarios = self.genDataUpdate['osy-scenarios']
            mo = int(self.genDataUpdate['osy-mo'])+1
            
            RYTEMdata = {}
            for ryt in self.PARAMETERS['RYTEM']:
                RYTEMdata[ryt['id']] = {}
                for sc in scenarios:
                    RYTEMdata[ryt['id']][sc['ScenarioId']] = [] 
                    for tech in techs:
                        if tech[ryt['id']]:
                            for emi in tech[ryt['id']]:
                                for m in range(1, mo):
                                    chunk = {}
                                    chunk['TechId'] = tech['TechId']
                                    chunk['EmisId'] = emi
                                    chunk['MoId'] = m
                                    for year in years:
                                        # if RYTCsource[ryt['id']][year][tech['TechId']][emi]:
                                        if self.keys_exists(RYTEMsource, ryt['id'], sc['ScenarioId'], year, tech['TechId'], emi, m):
                                            chunk[year] = RYTEMsource[ryt['id']][sc['ScenarioId']][year][tech['TechId']][emi][m]
                                        elif sc['ScenarioId'] == 'SC_0':
                                            chunk[year] = ryt['default']
                                        else:
                                            chunk[year] = None
                                    RYTEMdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYTEMdata, self.rytemPath)

        except(IOError):
            raise IOError

    def update_RYTTs(self):
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

    def update_RYCTs(self):
        try:
            ryctsJson = File.readFile(self.ryctsPath) 
            RYCTssource = self.RYCTs(ryctsJson)

            years = self.genDataUpdate['osy-years']
            comms = self.genDataUpdate['osy-comm']
            scenarios = self.genDataUpdate['osy-scenarios']
            ns = int(self.genDataUpdate['osy-ns'])
            nd = int(self.genDataUpdate['osy-dt'])

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
                                    if self.keys_exists(RYCTssource, ryt['id'], sc['ScenarioId'], year, comm['CommId'], "S"+s+d):
                                        chunk[year] = RYCTssource[ryt['id']][sc['ScenarioId']][year][comm['CommId']]["S"+s+d]
                                    elif sc['ScenarioId'] == 'SC_0':
                                        chunk[year] = ryt['default']
                                    else:
                                        chunk[year] = None
                                RYCTsdata[ryt['id']][sc['ScenarioId']].append(chunk)

            File.writeFile( RYCTsdata, self.ryctsPath)
        except(IOError):
            raise IOError

    def updateCase(self):
        try:
            for group, array in self.PARAMETERS.items():
                if array:
                    func_name = Config.UPDATE_F[group]
                    func = getattr(self,func_name) 
                    func() 

            # self.update_R()
            # self.update_RY()
            # self.update_RT()
            # self.update_RE()
            # self.update_RYTs()
            # self.update_RYT()
            # self.update_RYTM()
            # self.update_RYC()
            # self.update_RYE()
            # self.update_RYTC()
            # self.update_RYTCM()
            # self.update_RYTE()
            # self.update_RYTEM()
            # self.update_RYCTs()
            # self.update_RYTTs()
        except(IOError):
            raise IOError