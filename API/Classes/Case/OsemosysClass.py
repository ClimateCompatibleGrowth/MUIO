from pathlib import Path

from Classes.Base import Config
from Classes.Base.FileClass import File

class Osemosys():
    def __init__(self, case):
        self.case = case
        self.PARAMETERS = File.readParamFile(Path(Config.DATA_STORAGE, 'Parameters.json'))
        self.genData =  File.readFile(Path(Config.DATA_STORAGE,case,'genData.json'))
        #Case.__init__(self, case)
        self.casePath = Path(Config.DATA_STORAGE,case)
        self.zipPath = Path(Config.DATA_STORAGE,case+'.zip')

        #self.genData = Path(Config.DATA_STORAGE,case,'genData.json')

        self.rPath = Path(Config.DATA_STORAGE,case,'R.json')
        self.ryPath = Path(Config.DATA_STORAGE,case,'RY.json')
        self.rtPath = Path(Config.DATA_STORAGE,case,'RT.json')
        self.rePath = Path(Config.DATA_STORAGE,case,'RE.json')
        self.rycnPath = Path(Config.DATA_STORAGE,case,'RYCn.json')
        self.rytPath = Path(Config.DATA_STORAGE,case,'RYT.json')
        self.rytcnPath = Path(Config.DATA_STORAGE,case,'RYTCn.json')
        self.rytmPath = Path(Config.DATA_STORAGE,case,'RYTM.json')
        self.rytcPath = Path(Config.DATA_STORAGE,case,'RYTC.json')
        self.rytcmPath = Path(Config.DATA_STORAGE,case,'RYTCM.json')
        self.rytsPath = Path(Config.DATA_STORAGE,case,'RYTs.json')
        self.rycPath = Path(Config.DATA_STORAGE,case,'RYC.json')
        self.ryePath = Path(Config.DATA_STORAGE,case,'RYE.json')
        self.ryttsPath = Path(Config.DATA_STORAGE,case,'RYTTs.json')
        self.ryctsPath = Path(Config.DATA_STORAGE,case,'RYCTs.json')
        self.rytePath = Path(Config.DATA_STORAGE,case,'RYTE.json')
        self.rytemPath = Path(Config.DATA_STORAGE,case,'RYTEM.json')

        self.dataFile = Path(Config.DATA_STORAGE,case,'data.txt')
        self.dataFileS3 = Path(Config.S3_BUCKET_LOCAL,case,'data.txt')
        self.resFile = Path(Config.DATA_STORAGE,case,'results.txt')
        self.osemosysFile = Path(Config.SOLVERs_FOLDER,'osemosys.txt')

        self.glpkFolder = Path(Config.SOLVERs_FOLDER,'glpk-4.65', 'w64')
        self.cbcFolder = Path(Config.SOLVERs_FOLDER,'COIN-OR', 'win32-msvc11', 'bin')
        self.resPath = Path(Config.DATA_STORAGE,case,'res', 'csv')

        d = {}
        for k, l in self.PARAMETERS.items():
            tmp = {}
            for de in l:
                tmp[de['id']] = de['value'].replace(" ", "")
            d[k] = tmp
        self.PARAM = d

    def getParamDefaultValues(self):
        d = {}
        for k, l in self.PARAMETERS.items():
            for de in l:
                d[de['id']] = de['default']
        return d

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

    def getMods(self):
        mo = int(self.genData['osy-mo'])+1
        mods = []
        for m in range(1, mo):
            mods.append(m)
        return mods 

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
    
    def getConIds(self):
        conIds = [ tech['ConId'] for tech in self.genData["osy-constraints"]]
        return conIds

    def getConsMap(self):
        cons = {con['ConId']: con['Con'] for con in self.genData["osy-constraints"] }
        return cons

    def getScIds(self):
        scIds = [ sc['ScenarioId'] for sc in self.genData["osy-scenarios"]]
        return scIds

    def getScOrder(self):
        scIds = [ {'ScId': sc['ScenarioId'], 'Sc': sc['Scenario'], 'Active': sc['Active']} for sc in self.genData["osy-scenarios"]]
        return scIds

    #output actTech['IAR'] = ['Tech_1', 'Tech_2'...]
    def getActivityTechIds(self):
        techIds = {}
        for param in self.PARAMETERS['RYTCM']:
            techIds[param['id']] = []
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    techIds[param['id']].append(tech['TechId'])
        return techIds

    #output actTech['IAR']['Tech_1'] = ['Comm_1', 'Comm_2'...]
    def getActivityCommIds(self):
        commIds = {}
        for param in self.PARAMETERS['RYTCM']:
            commIds[param['id']] = {}
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    commIds[param['id']][tech['TechId']] = tech[param['id']]
        return commIds


    #output actTech['INCR'] = ['Tech_1', 'Tech_2'...]
    def getInputCapTechIds(self):
        techIds = {}
        for param in self.PARAMETERS['RYTC']:
            techIds[param['id']] = []
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    techIds[param['id']].append(tech['TechId'])
        return techIds

    #output actTech['INCR']['Tech_1'] = ['Comm_1', 'Comm_2'...]
    def getInputCapCommIds(self):
        commIds = {}
        for param in self.PARAMETERS['RYTC']:
            commIds[param['id']] = {}
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    commIds[param['id']][tech['TechId']] = tech[param['id']]
        return commIds

    def getConstraintTechIds(self):
        techIds = {}
        for param in self.PARAMETERS['RYTCn']:
            techIds[param['id']] = {}
            for con in self.genData["osy-constraints"]:
                if con[param['id']]: 
                    techIds[param['id']][con['ConId']] = []
                    for tech in con[param['id']]:
                        techIds[param['id']][con['ConId']].append(tech)
        return techIds

    def getActivityEmissionTechIds(self):
        techIds = {}
        for param in self.PARAMETERS['RYTEM']:
            techIds[param['id']] = []
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    techIds[param['id']].append(tech['TechId'])
        return techIds

    def getActivityEmisionIds(self):
        commIds = {}
        for param in self.PARAMETERS['RYTEM']:
            commIds[param['id']] = {}
            for tech in self.genData["osy-tech"]:
                if tech[param['id']]: 
                    commIds[param['id']][tech['TechId']] = tech[param['id']]
        return commIds

    def R(self, Rdata):
        R = {}
        for param, obj1 in Rdata.items():
            R[param] = {}
            for sc, array in obj1.items():
                R[param][sc] = {}
                for o in array:
                    R[param][sc]['value'] = o['value']
                        
        return R

    def RCn(self):
        RCn = {}
        for con in self.genData["osy-constraints"]:
            RCn[con['ConId']] = con['Tag']
        return RCn

    def RY(self, RYdata):
        RY = {}
        for param, obj1 in RYdata.items():
            RY[param] = {}
            for sc, array in obj1.items():
                RY[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        RY[param][sc][year] = val
        return RY

    def RT(self, RTdata):
        RT = {}
        for param, obj1 in RTdata.items():
            RT[param] = {}
            for sc, array in obj1.items():
                RT[param][sc] = {}
                for o in array:
                    for tech, val in o.items():
                        RT[param][sc][tech] = val
        return RT

    def RE(self, REdata):
        RE = {}
        for param, obj1 in REdata.items():
            RE[param] = {}
            for sc, array in obj1.items():
                RE[param][sc] = {}
                for o in array:
                    for emi, val in o.items():
                        RE[param][sc][emi] = val
        return RE
   
    def RYCn(self, RYCndata):
        RYCn = {}
        for param, obj1 in RYCndata.items():
            RYCn[param] = {}
            for sc, array in obj1.items():
                RYCn[param][sc] = {}
                for o in array:
                    for year, val in o.items():
                        if (year != 'ConId'):
                            if year not in RYCn[param][sc]:
                                RYCn[param][sc][year] = {}   
                            RYCn[param][sc][year][o['ConId']] = val
        return RYCn

    def RYT(self, RYTdata):
        RYT = {}
        for param, obj1 in RYTdata.items():
            RYT[param] = {}
            for sc, array in obj1.items():
                RYT[param][sc] = {}
                for o in array:
                    for year, val in o.items():
                        if (year != 'TechId'):
                            if year not in RYT[param][sc]:
                                RYT[param][sc][year] = {}   
                            RYT[param][sc][year][o['TechId']] = val
        return RYT

    def RYTCn(self, RYTCndata):
        RYTCn = {}
        for param, obj1 in RYTCndata.items():
            RYTCn[param] = {}
            for sc, array in obj1.items():
                RYTCn[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'TechId' and year != 'ConId'):
                            if year not in RYTCn[param][sc]:
                                RYTCn[param][sc][year] = {}
                            if obj['TechId'] not in RYTCn[param][sc][year]:
                                RYTCn[param][sc][year][obj['TechId']] = {}
                            RYTCn[param][sc][year][obj['TechId']][obj['ConId']] = val
        return RYTCn

    def RYTM(self, RYTMdata):
        RYTM = {}
        for param, obj1 in RYTMdata.items():
            RYTM[param] = {}
            for sc, array in obj1.items():
                RYTM[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'TechId' and year != 'MoId'):
                            if year not in RYTM[param][sc]:
                                RYTM[param][sc][year] = {}
                            if obj['TechId'] not in RYTM[param][sc][year]:
                                RYTM[param][sc][year][obj['TechId']] = {}
                            RYTM[param][sc][year][obj['TechId']][obj['MoId']] = val
        return RYTM

    def RYC(self, RYCdata):
        RYC = {}
        for param, obj1 in RYCdata.items():
            RYC[param] = {}
            for sc, array in obj1.items():
                RYC[param][sc] = {}
                for o in array:
                    for year, val in o.items():
                        if (year != 'CommId'):
                            if year not in RYC[param][sc]:
                                RYC[param][sc][year] = {}
                            RYC[param][sc][year][o['CommId']] = val
        return RYC

    def RYE(self, RYEdata):
        RYE = {}
        for param, obj1 in RYEdata.items():
            RYE[param] = {}
            for sc, array in obj1.items():
                RYE[param][sc] = {}
                for o in array:
                    for year, val in o.items():
                        if year not in RYE[param][sc]:
                            RYE[param][sc][year] = {}
                        if (year != 'EmisId'):
                            RYE[param][sc][year][o['EmisId']] = val
        return RYE

    def RYTs(self, RYTsdata):
        RYTs = {}
        for param, obj1 in RYTsdata.items():
            RYTs[param] = {}
            for sc, array in obj1.items():
                RYTs[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'YearSplit'):
                            if year not in RYTs[param][sc]:
                                RYTs[param][sc][year] = {}
                            RYTs[param][sc][year][obj['YearSplit']] = val
        return RYTs

    def RYTC(self, RYTCdata):
        RYTC = {}
        for param, obj1 in RYTCdata.items():
            RYTC[param] = {}
            for sc, array in obj1.items():
                RYTC[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'TechId' and year != 'CommId'):
                            if year not in RYTC[param][sc]:
                                RYTC[param][sc][year] = {}
                            if obj['TechId'] not in RYTC[param][sc][year]:
                                RYTC[param][sc][year][obj['TechId']] = {}
                            RYTC[param][sc][year][obj['TechId']][obj['CommId']] = val
        return RYTC

    def RYTCM(self, RYTCMdata):
        RYTCM = {}
        for param, obj1 in RYTCMdata.items():
            RYTCM[param] = {}
            for sc, array in obj1.items():
                RYTCM[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'TechId' and year != 'CommId' and year != 'MoId'):
                            if year not in RYTCM[param][sc]:
                                RYTCM[param][sc][year] = {}
                            if obj['TechId'] not in RYTCM[param][sc][year]:
                                RYTCM[param][sc][year][obj['TechId']] = {}
                            if obj['CommId'] not in RYTCM[param][sc][year][obj['TechId']]:
                                RYTCM[param][sc][year][obj['TechId']][obj['CommId']] = {}
                            RYTCM[param][sc][year][obj['TechId']][obj['CommId']][obj['MoId']] = val
        return RYTCM

    def RYTE(self, RYTEdata):
        RYTE = {}
        for param, obj1 in RYTEdata.items():
            RYTE[param] = {}
            for sc, array in obj1.items():
                RYTE[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'TechId' and year != 'EmisId'):
                            if year not in RYTE[param][sc]:
                                RYTE[param][sc][year] = {}
                            if obj['TechId'] not in RYTE[param][sc][year]:
                                RYTE[param][sc][year][obj['TechId']] = {}
                            RYTE[param][sc][year][obj['TechId']][obj['EmisId']] = val
        return RYTE

    def RYTEM(self, RYTEMdata):
        RYTEM = {}
        for param, obj1 in RYTEMdata.items():
            RYTEM[param] = {}
            for sc, array in obj1.items():
                RYTEM[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'TechId' and year != 'EmisId' and year != 'MoId'):
                            if year not in RYTEM[param][sc]:
                                RYTEM[param][sc][year] = {}
                            if obj['TechId'] not in RYTEM[param][sc][year]:
                                RYTEM[param][sc][year][obj['TechId']] = {}
                            if obj['EmisId'] not in RYTEM[param][sc][year][obj['TechId']]:
                                RYTEM[param][sc][year][obj['TechId']][obj['EmisId']] = {}
                            RYTEM[param][sc][year][obj['TechId']][obj['EmisId']][obj['MoId']] = val
        return RYTEM

    def RYTTs(self, RYTTsdata):
        RYTTs = {}
        for param, obj1 in RYTTsdata.items():
            RYTTs[param] = {}
            for sc, array in obj1.items():
                RYTTs[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'TechId' and year != 'Timeslice'):
                            if year not in RYTTs[param][sc]:
                                RYTTs[param][sc][year] = {}
                            if obj['TechId'] not in RYTTs[param][sc][year]:
                                RYTTs[param][sc][year][obj['TechId']] = {}
                            RYTTs[param][sc][year][obj['TechId']][obj['Timeslice']] = val
        return RYTTs

    def RYCTs(self, RYCTsdata):
        RYCTs = {}
        for param, obj1 in RYCTsdata.items():
            RYCTs[param] = {}
            for sc, array in obj1.items():
                RYCTs[param][sc] = {}
                for obj in array:
                    for year, val in obj.items():
                        if (year != 'CommId' and year != 'Timeslice'):
                            if year not in RYCTs[param][sc]:
                                RYCTs[param][sc][year] = {} 
                            if obj['CommId'] not in RYCTs[param][sc][year]:
                                RYCTs[param][sc][year][obj['CommId']] = {}
                            RYCTs[param][sc][year][obj['CommId']][obj['Timeslice']] = val
        return RYCTs

    def viewDataByTech(self):
        jsonData = {}
        data = {}
        for tech in self.genData["osy-tech"]:
            data[tech['TechId']] = []
            for group, array in self.PARAMETERS.items():
                if group in Config.TECH_GROUPS:
                    jsonData[group] =  File.readFile(Path(Config.DATA_STORAGE,self.case, group+'.json'))
                    for obj in array:
                        byTech = {}
                        byTech['groupId'] = group
                        byTech['param'] = obj['id']
                        byTech['paramName'] = obj['value']
                        for sc, array in jsonData[group][obj['id']].items():
                            byTech['ScId'] = sc
                            for obj2 in array:
                                if obj2['TechId'] == tech['TechId']:
                                    byTech['TechId'] = tech['TechId']
                                    if 'CommId' not in obj:
                                        byTech['CommId'] = None
                                    if 'EmisId' not in obj:
                                        byTech['EmisId'] = None
                                    if 'ConId' not in obj:
                                        byTech['ConId'] = None
                                    if 'Timeslice' not in obj:
                                        byTech['Timeslice'] = None
                                    if 'MoId' not in obj:
                                        byTech['MoId'] = None
                                    for k,v in obj2.items():
                                        if k != 'TechId':
                                            byTech[k] = v
                                    data[tech['TechId']].append(byTech.copy())
        return data

    def viewDataByComm(self):
        jsonData = {}
        data = {}
        for tech in self.genData["osy-comm"]:
            data[tech['CommId']] = []
            for group, array in self.PARAMETERS.items():
                if group in Config.COMM_GROUPS:
                    jsonData[group] =  File.readFile(Path(Config.DATA_STORAGE,self.case, group+'.json'))
                    for obj in array:
                        byComm = {}
                        byComm['groupId'] = group
                        byComm['param'] = obj['id']
                        byComm['paramName'] = obj['value']
                        for sc, array in jsonData[group][obj['id']].items():
                            byComm['ScId'] = sc
                            for obj2 in array:
                                if obj2['CommId'] == tech['CommId']:
                                    byComm['CommId'] = tech['CommId']
                                    if 'TechId' not in obj:
                                        byComm['TechId'] = None
                                    if 'EmisId' not in obj:
                                        byComm['EmisId'] = None
                                    if 'ConId' not in obj:
                                        byComm['ConId'] = None
                                    if 'Timeslice' not in obj:
                                        byComm['Timeslice'] = None
                                    if 'MoId' not in obj:
                                        byComm['MoId'] = None
                                    for k,v in obj2.items():
                                        if k != 'CommId':
                                            byComm[k] = v
                                    data[tech['CommId']].append(byComm.copy())
        return data

    def viewDataByEmi(self):
        jsonData = {}
        data = {}
        for tech in self.genData["osy-emis"]:
            data[tech['EmisId']] = []
            for group, array in self.PARAMETERS.items():
                if group in Config.EMIS_GROUPS:
                    jsonData[group] =  File.readFile(Path(Config.DATA_STORAGE,self.case, group+'.json'))
                    for obj in array:
                        byEmi = {}
                        byEmi['groupId'] = group
                        byEmi['param'] = obj['id']
                        byEmi['paramName'] = obj['value']
                        for sc, array in jsonData[group][obj['id']].items():
                            byEmi['ScId'] = sc
                            for obj2 in array:
                                if obj2['EmisId'] == tech['EmisId']:
                                    byEmi['EmisId'] = tech['EmisId']
                                    if 'TechId' not in obj:
                                        byEmi['TechId'] = None
                                    if 'CommId' not in obj:
                                        byEmi['CommId'] = None
                                    if 'ConId' not in obj:
                                        byEmi['ConId'] = None
                                    if 'Timeslice' not in obj:
                                        byEmi['Timeslice'] = None
                                    if 'MoId' not in obj:
                                        byEmi['MoId'] = None
                                    for k,v in obj2.items():
                                        if k != 'EmisId':
                                            byEmi[k] = v
                                    data[tech['EmisId']].append(byEmi.copy())
        return data

    def viewRTByTech(self):
        jsonData = {}
        data = {}
        for tech in self.genData["osy-tech"]:
            data[tech['TechId']] = []
            for group, array in self.PARAMETERS.items():
                if group in Config.SINGLE_TECH_GROUPS:
                    jsonData[group] =  File.readFile(Path(Config.DATA_STORAGE,self.case, group+'.json'))
                    for obj in array:
                        byTech = {}
                        byTech['groupId'] = group
                        byTech['param'] = obj['id']
                        byTech['paramName'] = obj['value']
                        for sc, array in jsonData[group][obj['id']].items():
                            byTech['ScId'] = sc
                            for obj2 in array:
                                for k,v in obj2.items():
                                    if k == tech['TechId']:
                                        byTech['value'] = v
                                data[tech['TechId']].append(byTech.copy())
        return data

    def viewREByEmi(self):
        jsonData = {}
        data = {}
        for tech in self.genData["osy-emis"]:
            data[tech['EmisId']] = []
            for group, array in self.PARAMETERS.items():
                if group in Config.SINGLE_EMIS_GROUPS:
                    jsonData[group] =  File.readFile(Path(Config.DATA_STORAGE,self.case, group+'.json'))
                    for obj in array:
                        byEmi = {}
                        byEmi['groupId'] = group
                        byEmi['param'] = obj['id']
                        byEmi['paramName'] = obj['value']
                        for sc, array in jsonData[group][obj['id']].items():
                            byEmi['ScId'] = sc
                            for obj2 in array:
                                for k,v in obj2.items():
                                    if k == tech['EmisId']:
                                        byEmi['value'] = v
                                data[tech['EmisId']].append(byEmi.copy())
        return data


    def updateViewData(self, casename, year, ScId, GroupId, ParamId, TechId, CommId, EmisId, Timeslice, value):
        try:
            jsonPath = Path(Config.DATA_STORAGE,casename, GroupId+'.json')
            jsonData = File.readFile(jsonPath)

            for obj in jsonData[ParamId][ScId]:
                if ((obj['TechId'] == TechId if TechId is not None else True) and 
                    (obj['CommId'] == CommId if CommId is not None else True) and 
                    (obj['EmisId'] == EmisId if EmisId is not None else True) and
                    (obj['Timeslice'] == Timeslice if Timeslice is not None else True)):
                    obj[year] = value
            File.writeFile( jsonData, jsonPath)
        except(IOError):
            raise IOError

    def updateTEViewData(self, casename, ScId, GroupId, ParamId, TechId, EmisId, value):
        try:
            jsonPath = Path(Config.DATA_STORAGE,casename, GroupId+'.json')
            jsonData = File.readFile(jsonPath)

            for obj in jsonData[ParamId][ScId]:
                for k,v in obj.items():
                    if ((k == TechId if TechId is not None else True) and 
                        (k == EmisId if EmisId is not None else True)):
                        obj[k] = value
            File.writeFile( jsonData, jsonPath)
        except(IOError):
            raise IOError           