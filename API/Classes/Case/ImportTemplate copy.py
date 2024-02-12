from pathlib import Path
import pandas as pd
import string
import random
import json
import os.path
import time

from Classes.Base import Config
from Classes.Case.CaseClass import Case
from Classes.Base.FileClass import File

class ImportTemplate():
    def __init__(self,template):
        self.PARAMETERS = File.readParamFile(Path(Config.DATA_STORAGE, 'Parameters.json'))
        self.VARIABLES = File.readParamFile(Path(Config.DATA_STORAGE, 'ResultParameters.json'))
        self.TEMPLATE_PATH = Path(Config.DATA_STORAGE, template)

    def getTechById(self, techs):
        techNames = {}
        for tech in techs:
            techNames[tech['TechId']] = tech['Tech']
        return techNames

    def getTechGroupById(self, techGroups):
        techGroupNames = {}
        for tech in techGroups:
            techGroupNames[tech['TechGroupId']] = tech['TechGroup']
        return techGroupNames

    def getTechGroupByName(self, techGroups):
        techGroupNames = {}
        for tech in techGroups:
            techGroupNames[tech['TechGroup']] = tech['TechGroupId']
        return techGroupNames

    def getCommById(self, comms):
        commNames = {}
        for comm in comms:
            commNames[comm['CommId']] = comm['Comm']
        return commNames

    def getTechByName(self, techs):
        techNames = {}
        for tech in techs:
            techNames[tech['Tech']] = tech['TechId']
        return techNames

    def getCommByName(self, comms):
        commNames = {}
        for comm in comms:
            commNames[comm['Comm']] = comm['CommId']
        return commNames

    def getEmiById(self, emis):
        emiNames = {}
        for emi in emis:
            emiNames[emi['EmisId']] = emi['Emis']
        return emiNames

    def getEmiByName(self, emis):
        emiNames = {}
        for emi in emis:
            emiNames[emi['Emis']] = emi['EmisId']
        return emiNames

    def getId(self, type):
        st = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(5))
        return type+'_'+st

    def defaultTech(self, name, desc="Default technology", capunit="GW", actunit="PJ", first=False ):
        if(first):
            id = 'TEC_0'
        else:
            id = self.getId('TEC')
        
        defaultObj = [
            {
                "TechId": id,
                "Tech":name,
                "Desc": desc,
                "CapUnitId": capunit,
                "ActUnitId": actunit,
                "IAR": [],
                "OAR": [],
                "EAR": [],
                "INCR": [],
                "ITCR": [],
            }
        ]
        return defaultObj

    def defaultTechGroup(self, name, desc="Default technology group", first=False):
        if(first):
            id = 'TG_0'
        else:
            id = self.getId('TG')
            
        defaultObj = [
            {
                "TechGroup": name,
                "TechGroupId":id,
                "Desc": desc,
            }
        ]
        return defaultObj
        
    def defaultTs(self, name, desc="Default timeslice", first=False):
        if(first):
            id = 'TS_0'
        else:
            id = self.getId('TS')
        
        defaultTs = [
            {
                "TsId": id,
                "Ts":name,
                "Desc": desc
            }
        ]
        return defaultTs
    
    def defaultComm(self, name, desc="Default commodity", unit="PJ", first=False):
        if(first):
            id = 'COM_0'
        else:
            id = self.getId('COM')
        
        defaultComm = [
            {
                "CommId": id,
                "Comm":name,
                "Desc": desc,
                "UnitId": unit
            }
        ]
        return defaultComm

    def defaultEmi(self, name, desc="Default emission", unit="Ton", first=False):
        if(first):
            id = 'EMI_0'
        else:
            id = self.getId('EMI')
        
        defaultEmi = [
            {
                "EmisId": id,
                "Emis":name,
                "Desc": desc,
                "UnitId": unit
            }
        ]
        return defaultEmi

    def defaultUnit(self):
        id = self.getId('UT')
        defaultUnit = [
            {
                "UnitId": id,
                "Unitname":id,
                "IC": 0,
                "LT": 0,
                "CT": 0,
                "h": False,
                "Fuel": "Lignite"
            }
        ]
        return defaultUnit
        
    def defaultScenario(self, first=False):
        if(first):
            id = 'SC_0'
        else:
            id = self.getId('SC')
        
        defaultObj = [
            {
                "ScenarioId": id,
                "Scenario":id,
                "Desc": "Base scenario",
                "Active": True
            }
        ]
        return defaultObj

    def defaultConstraint(self, first=False):
        if(first):
            id = 'CO_0'
        else:
            id = self.getId('CO')
        
        emptyArray = ['TEC_0']
        defaultObj = [
            {
                "ConId": id,
                "Con":id,
                "Desc": "Default constraint ",
                "Tag": 1,
                "CM": emptyArray
            }
        ]
        return defaultObj
        
    def defaultCase(self, first=False):
        if(first):
            id = 'CS_0'
        else:
            id = self.getId('CS')
        
        defaultObj = [
            {
                "Case": id,
                "CaseId":id,
                "Runtime": "Base scenario",
                "Scenarios": []
            }
        ]
        return defaultObj

    def refR(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['REGION'] not in outObj:
                outObj[obj['REGION']] = {}
            region = obj['REGION']
            val = obj['VALUE']
            #trenutno imamo samojedan trgion pa koristimo RE1
            outObj['RE1'] = val
        return outObj
    
    def refRT(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['TECHNOLOGY'] not in outObj:
                outObj[obj['TECHNOLOGY']] = {}
            tech = obj['TECHNOLOGY']
            val = obj['VALUE']
            outObj[tech] = val
        return outObj

    def refRE(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['EMISSION'] not in outObj:
                outObj[obj['EMISSION']] = {}
            emi = obj['EMISSION']
            val = obj['VALUE']
            outObj[emi] = val
        return outObj

    def refRY(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['YEAR'] not in outObj:
                outObj[obj['YEAR']] = {}
            yr = obj['YEAR']
            val = obj['VALUE']
            outObj[yr] = val
        return outObj

    def refRYTCM(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['TECHNOLOGY'] not in outObj:
                outObj[obj['TECHNOLOGY']] = {}
            if obj['FUEL'] not in outObj[obj['TECHNOLOGY']]:
                outObj[obj['TECHNOLOGY']][obj['FUEL']] = {}
            if obj['MODE_OF_OPERATION'] not in outObj[obj['TECHNOLOGY']][obj['FUEL']]:
                outObj[obj['TECHNOLOGY']][obj['FUEL']][obj['MODE_OF_OPERATION']] = {}
            tech = obj['TECHNOLOGY']
            comm = obj['FUEL']
            mod = obj['MODE_OF_OPERATION']
            del obj['REGION']
            del obj['TECHNOLOGY']
            del obj['FUEL']
            del obj['MODE_OF_OPERATION']
            outObj[tech][comm][mod] = obj
        return outObj

    def refRYTEM(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['TECHNOLOGY'] not in outObj:
                outObj[obj['TECHNOLOGY']] = {}
            if obj['EMISSION'] not in outObj[obj['TECHNOLOGY']]:
                outObj[obj['TECHNOLOGY']][obj['EMISSION']] = {}
            if obj['MODE_OF_OPERATION'] not in outObj[obj['TECHNOLOGY']][obj['EMISSION']]:
                outObj[obj['TECHNOLOGY']][obj['EMISSION']][obj['MODE_OF_OPERATION']] = {}
            tech = obj['TECHNOLOGY']
            emi = obj['EMISSION']
            mod = obj['MODE_OF_OPERATION']
            del obj['REGION']
            del obj['TECHNOLOGY']
            del obj['EMISSION']
            del obj['MODE_OF_OPERATION']
            outObj[tech][emi][mod] = obj
        return outObj

    def refRYTM(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['TECHNOLOGY'] not in outObj:
                outObj[obj['TECHNOLOGY']] = {}
            if obj['MODE_OF_OPERATION'] not in outObj[obj['TECHNOLOGY']]:
                outObj[obj['TECHNOLOGY']][obj['MODE_OF_OPERATION']] = {}
            tech = obj['TECHNOLOGY']
            mod = obj['MODE_OF_OPERATION']
            del obj['REGION']
            del obj['TECHNOLOGY']
            del obj['MODE_OF_OPERATION']
            outObj[tech][mod] = obj
        return outObj

    def refRYTTs(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['TECHNOLOGY'] not in outObj:
                outObj[obj['TECHNOLOGY']] = {}
            if obj['TIMESLICE'] not in outObj[obj['TECHNOLOGY']]:
                outObj[obj['TECHNOLOGY']][obj['TIMESLICE']] = {}
            tech = obj['TECHNOLOGY']
            mod = obj['TIMESLICE']
            del obj['REGION']
            del obj['TECHNOLOGY']
            del obj['TIMESLICE']
            outObj[tech][mod] = obj
        return outObj

    def refRYCTs(self, xlsObj):
        outObj = {}
        for obj in xlsObj:
            if obj['FUEL'] not in outObj:
                outObj[obj['FUEL']] = {}
            if obj['TIMESLICE'] not in outObj[obj['FUEL']]:
                outObj[obj['FUEL']][obj['TIMESLICE']] = {}
            comm = obj['FUEL']
            mod = obj['TIMESLICE']
            del obj['REGION']
            del obj['FUEL']
            del obj['TIMESLICE']
            outObj[comm][mod] = obj
        return outObj

    def importProcess(self, data):
        try:
            start_time = time.time()
            template_file = data['osy-template']
            casename = data['osy-casename']
            currency = data['osy-currency']
            version = data['osy-version']
            description = data['osy-desc']
            date = data['osy-date']
            data = data['osy-data']
            tgArray = []
            txtOut = ""

            df_sheet_all = pd.read_excel(self.TEMPLATE_PATH, sheet_name=None, engine='openpyxl')

            techs_xls =  df_sheet_all['TECHNOLOGY']
            comms_xls =  df_sheet_all['FUEL']
            emis_xls =  df_sheet_all['EMISSION']
            years_xls = df_sheet_all['YEAR']
            moo_xls = df_sheet_all['MODE_OF_OPERATION']
            ts_xls = df_sheet_all['TIMESLICE']

            if 'TECHGROUP' in df_sheet_all:
                tg_xls = df_sheet_all['TECHGROUP']
                tg_data = tg_xls.to_json(orient='records', indent=2)
                tgArray = json.loads(tg_data)

            iar_xls = df_sheet_all['InputActivityRatio']
            oar_xls = df_sheet_all['OutputActivityRatio']
            ear_xls = df_sheet_all['EmissionActivityRatio']


            techs_xls.rename(columns = {'VALUE':'TECHNOLOGY'}, inplace = True)
            comms_xls.rename(columns = {'VALUE':'COMMODITY'}, inplace = True)
            emis_xls.rename(columns = {'VALUE':'EMISSION'}, inplace = True)
            years_xls.rename(columns = {'VALUE':'YEARS'}, inplace = True)
            moo_xls.rename(columns = {'VALUE':'MODE_OF_OPERATION'}, inplace = True)
            ts_xls.rename(columns = {'VALUE':'TIMESLICE'}, inplace = True)

            techs_data = techs_xls.to_json(orient='records', indent=2)
            comms_data = comms_xls.to_json(orient='records', indent=2)
            emis_data = emis_xls.to_json(orient='records', indent=2)

            iar_data = iar_xls.to_json(orient='records', indent=2)
            oar_data = oar_xls.to_json(orient='records', indent=2)
            ear_data = ear_xls.to_json(orient='records', indent=2)

            techsArray = json.loads(techs_data)
            commsArray = json.loads(comms_data)
            emisArray = json.loads(emis_data)

            iarArray = json.loads(iar_data)
            oarArray = json.loads(oar_data)
            earArray = json.loads(ear_data)

            yearsArray = years_xls['YEARS'].astype(str).values.tolist()
            mooValue = moo_xls['MODE_OF_OPERATION'].count()
            tsTmp = ts_xls['TIMESLICE'].astype(str).values.tolist()

            nsArray = []
            dtArray = []
            for obj in tsTmp:
                tmp1 = obj[1:2]
                tmp2 = obj[-1]
                nsArray.append(tmp1)
                dtArray.append(tmp2)

            ns = max(nsArray)
            dt = max(dtArray)

            print('READ OF XLS DONE!')
            print("--- %s seconds ---" % (time.time() - start_time))
            txtOut = ("Read of xls template done in --- {} seconds ---{}".format(time.time() - start_time, '\n'))

            techgroups = []
            if not tgArray:
                techgroups.append(self.defaultTechGroup('TG_0', first=True)[0])
            else:
                for obj in tgArray:
                    tGroup = obj['TECHGROUP']
                    tGroupDesc = obj['DESCRIPTION']
                    if tGroupDesc is None:
                        tGroupDesc = "Default technology group"
                    if obj==0:
                        techgroups.append(self.defaultTechGroup(tGroup, tGroupDesc, True)[0])
                    else:
                        techgroups.append(self.defaultTechGroup(tGroup, tGroupDesc)[0])

            techs = []
            if not techsArray:
                techs.append(self.defaultTech('TEC_0', first=True)[0])
            else:
                for obj in techsArray:
                    tech = obj['TECHNOLOGY']
                    if obj.get('DESCRIPTION') is not None:
                        desc = obj['DESCRIPTION']
                    else:
                        desc = "Default commodity"
                    if obj.get('UNITOFCAPACITY') is not None:
                        unitcap = obj['UNITOFCAPACITY']
                    else:
                        unitcap = "GW"
                    if obj.get('UNITOFACTIVITY') is not None:
                        unitact = obj['UNITOFACTIVITY']
                    else:
                        unitact = "PJ"

                    if obj==0:
                        techs.append(self.defaultTech(tech, desc, unitcap, unitact, first=True)[0])
                    else:
                        techs.append(self.defaultTech(tech, desc, unitcap, unitact)[0])

            comms = []
            if not commsArray:
                comms.append(self.defaultComm('COM_0', first=True)[0])
            else:
                for obj in commsArray:
                    com = obj['COMMODITY']
                    if obj.get('DESCRIPTION') is not None:
                        desc = obj['DESCRIPTION']
                    else:
                        desc = "Default commodity"
                    if obj.get('UNIT') is not None:
                        unit = obj['UNIT']
                    else:
                        unit = "PJ"
                    if obj==0:
                        comms.append(self.defaultComm(com, desc, unit, True)[0])
                    else:
                        comms.append(self.defaultComm(com, desc, unit)[0])

            emis = []
            if not emisArray:
                emis.append(self.defaultEmi('EMI_0', first=True)[0])
            else:
                for obj in emisArray:
                    emi = obj['EMISSION']
                    if obj.get('DESCRIPTION') is not None:
                        desc = obj['DESCRIPTION']
                    else:
                        desc = "Default emission"
                    if obj.get('UNIT') is not None:
                        unit = obj['UNIT']
                    else:
                        unit = "Ton"
                    if obj==0:
                        emis.append(self.defaultEmi(emi, desc, unit, True)[0])
                    else:
                        emis.append(self.defaultEmi(emi, desc, unit)[0])



            #populate IAR and OAR
            techId = self.getTechByName(techs)
            commId = self.getCommByName(comms)
            emiId = self.getEmiByName(emis)
            tgId = self.getTechGroupByName(techgroups)

            iarObj = {}
            oarObj = {}
            earObj = {}
            techgroupObj = {}

            for iar in iarArray:
                if iar['TECHNOLOGY'] not in iarObj:
                    iarObj[iar['TECHNOLOGY']] = []
                if commId[iar['FUEL']] not in iarObj[iar['TECHNOLOGY']]:
                    iarObj[iar['TECHNOLOGY']].append(commId[iar['FUEL']])

            for oar in oarArray:
                if oar['TECHNOLOGY'] not in oarObj:
                    oarObj[oar['TECHNOLOGY']] = []
                if commId[oar['FUEL']] not in oarObj[oar['TECHNOLOGY']]:
                    oarObj[oar['TECHNOLOGY']].append(commId[oar['FUEL']])

            for ear in earArray:
                if ear['TECHNOLOGY'] not in earObj:
                    earObj[ear['TECHNOLOGY']] = []
                if emiId[ear['EMISSION']] not in earObj[ear['TECHNOLOGY']]:
                    earObj[ear['TECHNOLOGY']].append(emiId[ear['EMISSION']])

            for tech in techsArray:
                ##if 'TECHGROUP' in tech:
                if tech['TECHNOLOGY'] not in techgroupObj:
                    techgroupObj[tech['TECHNOLOGY']] = []
                if 'TECHGROUP' in tech:
                    if tech['TECHGROUP'] is not None:
                        #techgroupObj[tech['TECHNOLOGY']].append(tgId[tech['TECHGROUP']])
                        #######################################################################3
                        # tg_list = tech['TECHGROUP'].split(",")
                        # for tg in tg_list:
                        #     techgroupObj[tech['TECHNOLOGY']].append(tgId[tg])
                        techgroupObj[tech['TECHNOLOGY']] = [tgId[x.strip()] for x in tech['TECHGROUP'].split(',')]


            for tech in techs:
                if tech['Tech'] in iarObj:
                    tech['IAR'] = iarObj[tech['Tech']]
                if tech['Tech'] in oarObj:
                    tech['OAR'] = oarObj[tech['Tech']]
                if tech['Tech'] in earObj:
                    tech['EAR'] = earObj[tech['Tech']]
                if tech['Tech'] in techgroupObj:
                    tech['TG'] = techgroupObj[tech['Tech']]

            print('TECHS COMMS IAR OAR DONE!')
            print("--- %s seconds ---" % (time.time() - start_time))
            txtOut = txtOut + ("Technlogies, commodities, emissions, years, IAR, OAR, EAR done in --- {} seconds ---{}".format(time.time() - start_time, '\n'))
            genData = {}
            genData["osy-version"] = version
            genData["osy-casename"] = casename
            genData["osy-desc"] = description
            genData["osy-date"] = date
            genData["osy-currency"] = currency
            genData["osy-ns"] = ns
            genData["osy-dt"] = dt
            genData["osy-mo"] = str(mooValue)

            genData["osy-tech"] = techs
            genData["osy-techGroups"] = techgroups
            genData["osy-comm"] = comms

            genData["osy-emis"] = emis
            genData["osy-scenarios"] = self.defaultScenario(True)
            genData["osy-constraints"] = []
            genData["osy-years"] = yearsArray

            casename = genData['osy-casename']

            viewDef = {}
            for group, lists in self.VARIABLES.items():
                for list in lists:
                    viewDef[list['id']] = []


            if not os.path.exists(Path(Config.DATA_STORAGE,casename)):
                os.makedirs(Path(Config.DATA_STORAGE,casename))

            genDataPath = Path( Config.DATA_STORAGE,casename, "genData.json")
            File.writeFile(genData, genDataPath)

            case = Case(casename, genData)
            case.createCase()  

            resPath = Path(Config.DATA_STORAGE,casename,'res')
            viewPath = Path(Config.DATA_STORAGE,casename,'view')
            resDataPath = Path(Config.DATA_STORAGE,casename,'view','resData.json')
            viewDataPath = Path(Config.DATA_STORAGE,casename,'view','viewDefinitions.json')
            if not os.path.exists(resPath):
                os.makedirs(resPath, mode=0o777, exist_ok=False)
            if not os.path.exists(viewPath):
                os.makedirs(viewPath, mode=0o777, exist_ok=False)
                resData = {
                    "osy-cases":[]
                }
                File.writeFile( resData, resDataPath)
                viewData = {
                    "osy-views": viewDef
                }
                File.writeFile( viewData, viewDataPath)

            print('MODEL STRUCTURE FINISHED!')
            print("--- %s seconds ---" % (time.time() - start_time))
            txtOut = txtOut + ("Model structure finished in --- {} seconds ---{}".format(time.time() - start_time, '\n'))
            if data:
                techName = self.getTechById(techs)
                commName = self.getCommById(comms)
                emiName = self.getEmiById(emis)


                for key, array in self.PARAMETERS.items():
                    if key != 'R__':
                        print(key + ' PARAM')
                        #procitaj json file koji odgovara xls objektu i updatuj podatke
                        path = Path(Config.DATA_STORAGE,casename, key +'.json')
                        jsonData = File.readFile(path)

                        for a in array:
                            txtOut = txtOut + ("Parameter {} done in  --- {} seconds ---{}".format(a['value'], time.time() - start_time, '\n'))
                            #moramo izbaciti spaces iz naziva parama
                            sheet_name = a['value'].replace(" ", "")

                            #ovi su problem jer nisu jednoznacni kad se skrate na 31 char, poseban slucaj
                            if sheet_name == 'TotalTechnologyModelPeriodActivityUpperLimit':
                                sheet_name = 'TotalTechnologyPeriodActivityUp'
                            if sheet_name == 'TotalTechnologyModelPeriodActivityLowerLimit':
                                sheet_name = 'TotalTechnologyPeriodActivityLo'

                            #max duzina sheet name tako da vse moramo skratit na 31 da bi procitali iz xls sheets
                            if len(sheet_name)>31:
                                sheet_name = sheet_name[0:31]
                                
                            #procitaj podatke iz xls
                            if sheet_name in df_sheet_all:
                                #ako ima podataka u xls napravi bjekat od xls podataka
                                xls = df_sheet_all[sheet_name]
                                xlsData = xls.to_json(orient='records', indent=2)
                                xlsArray = json.loads(xlsData)

                                if key == 'R':
                                    xlsObj = self.refR(xlsArray)
                                    jsonData[a['id']]['SC_0'][0]['value'] = xlsObj['RE1']

                                if key == 'RT':
                                    xlsObj = self.refRT(xlsArray)
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for tech, val in el.items():
                                                t = techName[tech] 
                                                if t in xlsObj:
                                                    el[tech] = xlsObj[t]


                                if key == 'RE':
                                    xlsObj = self.refRE(xlsArray)
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for emi, val in el.items():
                                                e = emiName[emi] 
                                                if e in xlsObj:
                                                    el[emi] = xlsObj[e]

                                if key == 'RY':
                                    xlsObj = self.refRY(xlsArray)
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for yr, val in el.items():
                                                if int(yr) in xlsObj:
                                                    el[yr] = xlsObj[int(yr)]

                                if key == 'RYT':
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for arr in xlsArray:
                                                if arr['TECHNOLOGY'] == techName[el['TechId']]:
                                                    for yr, val in el.items():
                                                        if yr != 'TechId':
                                                            el[yr] = arr[yr]
                                                    break
                                    #File.writeFile( jsonData, path)

                                if key == 'RYC':
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for arr in xlsArray:
                                                if arr['FUEL'] == commName[el['CommId']]:
                                                    for yr, val in el.items():
                                                        if yr != 'CommId':
                                                            el[yr] = arr[yr]
                                                    break
                                    #File.writeFile( jsonData, path)
                
                                if key == 'RYE':
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for arr in xlsArray:
                                                if arr['EMISSION'] == emiName[el['EmisId']]:
                                                    for yr, val in el.items():
                                                        if yr != 'EmisId':
                                                            el[yr] = arr[yr]
                                                    break
                                    #File.writeFile( jsonData, path)

                                if key == 'RYTs':
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for arr in xlsArray:
                                                if arr['TIMESLICE'] == el['YearSplit']:
                                                    for yr, val in el.items():
                                                        if yr != 'YearSplit':
                                                            if str(arr['YEAR']) == yr:
                                                                el[yr] = arr['VALUE']
                                                                break
                                                
                                    #File.writeFile( jsonData, path)

                                if key == 'RYTCM':
                                    xlsObj = self.refRYTCM(xlsArray)

                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for yr, val in el.items():
                                                if yr != 'TechId' and yr != 'CommId' and yr != 'MoId':
                                                    t = techName[el['TechId']] 
                                                    c = commName[el['CommId']]
                                                    m = el['MoId']
                                                    if t in xlsObj:
                                                        if c in xlsObj[t]:
                                                            if m in xlsObj[t][c]:
                                                                el[yr] = xlsObj[t][c][m][yr]
                            
                                    #File.writeFile( jsonData, path)

                                if key == 'RYTEM':
                                    xlsObj = self.refRYTEM(xlsArray)
                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for yr, val in el.items():
                                                if yr != 'TechId' and yr != 'EmisId' and yr != 'MoId':
                                                    t = techName[el['TechId']] 
                                                    e = emiName[el['EmisId']]
                                                    m = el['MoId']
                                                    if t in xlsObj:
                                                        if e in xlsObj[t]:
                                                            if m in xlsObj[t][e]:
                                                                el[yr] = xlsObj[t][e][m][yr]

                                if key == 'RYTM':
                                    xlsObj = self.refRYTM(xlsArray)

                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for yr, val in el.items():
                                                if yr != 'TechId' and yr != 'MoId':
                                                    t = techName[el['TechId']] 
                                                    m = el['MoId']
                                                    if t in xlsObj:
                                                        if m in xlsObj[t]:
                                                            el[yr] = xlsObj[t][m][yr]

                                if key == 'RYTTs':
                                    xlsObj = self.refRYTTs(xlsArray)

                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for yr, val in el.items():
                                                if yr != 'TechId' and yr != 'Timeslice':
                                                    t = techName[el['TechId']] 
                                                    ts = el['Timeslice']
                                                    if t in xlsObj:
                                                        if ts in xlsObj[t]:
                                                            el[yr] = xlsObj[t][ts][yr]
                            

                                if key == 'RYCTs':
                                    xlsObj = self.refRYCTs(xlsArray)

                                    for sc, obj in jsonData[a['id']].items():
                                        for el in obj:
                                            for yr, val in el.items():
                                                if yr != 'CommId' and yr != 'Timeslice':
                                                    c = commName[el['CommId']] 
                                                    ts = el['Timeslice']
                                                    if c in xlsObj:
                                                        if ts in xlsObj[c]:
                                                            el[yr] = xlsObj[c][ts][yr]
                                    #File.writeFile( jsonData, path)
                        File.writeFile( jsonData, path)

            os.remove(self.TEMPLATE_PATH)
            print('IMPOERT FINISHED WITH DATA!')
            print("--- %s seconds ---" % (time.time() - start_time))
            txtOut = txtOut + ("IMPORT FINISHED WITH DATA IN  --- {} seconds ---{}".format( time.time() - start_time, '\n'))
            response = {
                "message": "Import process finished!",
                "status_code": "success",
                "output": txtOut
            }  

            return response
        except(IOError, IndexError):
            #raise IndexError
            response = {
                "message": IOError,
                "status_code": "error",
                "output": IndexError
            }  
        except OSError:
            #raise OSError
            response = {
                "message": IOError,
                "status_code": "error",
                "output": IndexError
            }  
