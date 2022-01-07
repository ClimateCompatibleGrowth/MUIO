from pathlib import Path
import pandas as pd
import json
import os
import subprocess
from Classes.Base import Config
from Classes.Case.OsemosysClass import Osemosys
from Classes.Base.FileClass import File
import pandas as pd


class DataFile(Osemosys):
    # def __init__(self, case):
        
    #     Osemosys.__init__(self, case)

    def gen_R(self):
        r = self.R(File.readFile(self.rPath))
        for id, param in self.PARAM['R'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for sc in self.scOrder:
                if r[id][sc['ScId']]['value'] is not None and sc['Active'] == True:
                    tmp = r[id][sc['ScId']]['value']
            self.f.write('{} {} {}'.format('RE1', tmp, '\n'))
            self.f.write('{} {}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RCn(self):
        rcn = self.RCn()
        self.f.write('{} {} {} {} {} {}'.format('param', 'UDCTag','default', -1, ':','\n'))
        self.f.write('{}{}{}'.format(self.cons, ':=', '\n'))
        rcnString = ''
        for conId in self.conIDs:
            if rcn[conId] is not None:
                tmp = rcn[conId]
                rcnString += '{} '.format(tmp)
        self.f.write('{}{}{}'.format('RE1 ', rcnString, '\n'))
        self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RY(self):
        ry = self.RY(File.readFile(self.ryPath))
        for id, param in self.PARAM['RY'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':','\n'))
            self.f.write('{}{}{}'.format(self.years, ':=', '\n'))
            ryString = ''
            for yearId in self.yearIDs:
                for sc in self.scOrder:
                    if ry[id][sc['ScId']][yearId] is not None and sc['Active'] == True:
                        tmp = ry[id][sc['ScId']][yearId]
                ryString += '{} '.format(tmp)
            self.f.write('{}{}{}'.format('RE1 ', ryString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RT(self):
        rt = self.RT(File.readFile(self.rtPath))
        for id, param in self.PARAM['RT'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':','\n'))
            self.f.write('{}{}{}'.format(self.techs, ':=', '\n'))
            rtString = ''
            for techId in self.techIDs:
                for sc in self.scOrder:
                    if rt[id][sc['ScId']][techId] is not None and sc['Active'] == True:
                        tmp = rt[id][sc['ScId']][techId]
                rtString += '{} '.format(tmp)
            self.f.write('{}{}{}'.format('RE1 ', rtString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RE(self):
        re = self.RE(File.readFile(self.rePath))
        for id, param in self.PARAM['RE'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':','\n'))
            self.f.write('{}{}{}'.format(self.emis, ':=', '\n'))
            reString = ''
            for emiId in self.emiIDs:
                for sc in self.scOrder:
                    if re[id][sc['ScId']][emiId] is not None and sc['Active'] == True:
                        tmp = re[id][sc['ScId']][emiId]
                reString += '{} '.format(tmp)
            self.f.write('{}{}{}'.format('RE1 ', reString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYCn(self):
        rycn = self.RYCn(File.readFile(self.rycnPath))
        for id, param in self.PARAM['RYCn'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            self.f.write('{} {}'.format('[RE1,*,*]:', '\n'))
            self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
            for conId in self.conIDs:
                rycnString = ''
                for yearId in self.yearIDs:
                    for sc in self.scOrder:
                        if rycn[id][sc['ScId']][yearId][conId] is not None and sc['Active'] == True:
                            tmp = rycn[id][sc['ScId']][yearId][conId]
                    rycnString += '{} '.format(tmp)
                self.f.write('{} {}{}'.format(self.conMap[conId], rycnString, '\n'))
        self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTs(self):
        ryts = self.RYTs(File.readFile(self.rytsPath))
        for id, param in self.PARAM['RYTs'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':','\n'))
            self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
            for timesliceId in self.timesliceIDs:
                rytsString = ''
                for yearId in self.yearIDs:
                    for sc in self.scOrder:
                        if ryts[id][sc['ScId']][yearId][timesliceId] is not None and sc['Active'] == True:
                            tmp = ryts[id][sc['ScId']][yearId][timesliceId]
                    rytsString += '{} '.format(tmp)
                self.f.write('{} {}{}'.format(timesliceId, rytsString, '\n'))
        self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYT(self):
        ryt = self.RYT(File.readFile(self.rytPath))
        for id, param in self.PARAM['RYT'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            self.f.write('{} {}'.format('[RE1,*,*]:', '\n'))
            self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
            for techId in self.techIDs:
                rytString = ''
                for yearId in self.yearIDs:
                    for sc in self.scOrder:
                        if ryt[id][sc['ScId']][yearId][techId] is not None and sc['Active'] == True:
                            tmp = ryt[id][sc['ScId']][yearId][techId]
                    rytString += '{} '.format(tmp)
                self.f.write('{} {}{}'.format(self.techMap[techId], rytString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTCn(self):
        rytcn = self.RYTCn(File.readFile(self.rytcnPath))
        for id, param in self.PARAM['RYTCn'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for conId in self.conIDs:
                if self.keys_exists(self.constraintTechIDs, id, conId):
                    for constraintTechId in self.constraintTechIDs[id][conId]:
                        self.f.write('{}{}'.format('[RE1,'+ self.techMap[constraintTechId] +',*,*]:', '\n'))
                        self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
                        rytcnString = ''
                        for yearId in self.yearIDs:
                            for sc in self.scOrder:
                                if rytcn[id][sc['ScId']][yearId][constraintTechId][conId] is not None and sc['Active'] == True:
                                    tmp = rytcn[id][sc['ScId']][yearId][constraintTechId][conId]
                            rytcnString += '{} '.format(tmp)
                        self.f.write('{} {}{}'.format(self.conMap[conId], rytcnString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTM(self):
        rytm = self.RYTM(File.readFile(self.rytmPath))
        for id, param in self.PARAM['RYTM'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for techId in self.techIDs:
                self.f.write('{} {}'.format('[RE1,'+ self.techMap[techId] +',*,*]:', '\n'))
                self.f.write('{}{}{}'.format(self.years, ':=', '\n'))
                for mod in self.modIds:
                    rytmString = ''
                    for yearId in self.yearIDs:
                        for sc in self.scOrder:
                            if rytm[id][sc['ScId']][yearId][techId][mod] is not None and sc['Active'] == True:
                                tmp = rytm[id][sc['ScId']][yearId][techId][mod]
                        rytmString += '{} '.format(tmp)
                    self.f.write('{} {}{}'.format(mod, rytmString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYC(self):
        ryc = self.RYC(File.readFile(self.rycPath))
        for id, param in self.PARAM['RYC'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            self.f.write('{} {}'.format('[RE1,*,*]:', '\n'))
            self.f.write('{}{}{}'.format(self.years, ':=', '\n'))
            for commId in self.commIDs:
                rycString = ''
                for yearId in self.yearIDs:
                    for sc in self.scOrder:
                        if ryc[id][sc['ScId']][yearId][commId] is not None and sc['Active'] == True:
                            tmp = ryc[id][sc['ScId']][yearId][commId]
                    rycString += '{} '.format(tmp)
                self.f.write('{} {}{}'.format(self.commMap[commId], rycString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYE(self):
        rye = self.RYE(File.readFile(self.ryePath))
        for id, param in self.PARAM['RYE'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            self.f.write('{} {}'.format('[RE1,*,*]:', '\n'))
            self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
            for emiId in self.emiIDs:
                ryeString = ''
                for yearId in self.yearIDs:
                    for sc in self.scOrder:
                        if rye[id][sc['ScId']][yearId][emiId] is not None and sc['Active'] == True:
                            tmp = rye[id][sc['ScId']][yearId][emiId]
                    ryeString += '{} '.format(tmp)
                self.f.write('{} {}{}'.format(self.emiMap[emiId], ryeString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTC(self):
        rytc = self.RYTC(File.readFile(self.rytcPath))
        for id, param in self.PARAM['RYTC'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for inputCapTechId in self.inputCapTechIds[id]:
                for inputCapCommId in self.inputCapCommIds[id][inputCapTechId]:
                    self.f.write('{}{}'.format('[RE1,'+ self.techMap[inputCapTechId] + ',*,*]:', '\n'))
                    self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
                    rytcString = ''
                    for yearId in self.yearIDs:
                        for sc in self.scOrder:
                            if rytc[id][sc['ScId']][yearId][inputCapTechId][inputCapCommId] is not None and sc['Active'] == True:
                                tmp = rytc[id][sc['ScId']][yearId][inputCapTechId][inputCapCommId]
                        rytcString += '{} '.format(tmp)
                    self.f.write('{} {}{}'.format(self.commMap[inputCapCommId], rytcString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTCM(self):
        rytcm = self.RYTCM(File.readFile(self.rytcmPath))
        for id, param in self.PARAM['RYTCM'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for activityTechId in self.activityTechIDs[id]:
                for activityCommId in self.activityCommIDs[id][activityTechId]:
                    self.f.write('{}{}'.format('[RE1,'+ self.techMap[activityTechId] + ','+ self.commMap[activityCommId] +',*,*]:', '\n'))
                    self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
                    for mod in self.modIds:
                        rytcString = ''
                        for yearId in self.yearIDs:
                            for sc in self.scOrder:
                                if rytcm[id][sc['ScId']][yearId][activityTechId][activityCommId][mod] is not None and sc['Active'] == True:
                                    tmp = rytcm[id][sc['ScId']][yearId][activityTechId][activityCommId][mod]
                            rytcString += '{} '.format(tmp)
                        self.f.write('{} {}{}'.format(mod, rytcString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTE(self):
        ryte = self.RYTE(File.readFile(self.rytePath))
        for id, param in self.PARAM['RYTE'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for emissionTechId in self.emissionTechIDs[id]:
                for activityEmissionId in self.activityEmissionIDs[id][emissionTechId]:
                    self.f.write('{}{}'.format('[RE1,'+ self.techMap[emissionTechId] +  ','+ self.emiMap[activityEmissionId] + ',*,*]:', '\n'))
                    self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
                    ryteString = ''
                    for yearId in self.yearIDs:
                        for sc in self.scOrder:
                            if ryte[id][sc['ScId']][yearId][emissionTechId][activityEmissionId] is not None and sc['Active'] == True:
                                tmp = ryte[id][sc['ScId']][yearId][emissionTechId][activityEmissionId]
                        ryteString += '{} '.format(tmp)
                    self.f.write('{} {}{}'.format(1, ryteString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTEM(self):
        rytem = self.RYTEM(File.readFile(self.rytemPath))
        for id, param in self.PARAM['RYTEM'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for emissionTechId in self.emissionTechIDs[id]:
                for activityEmissionId in self.activityEmissionIDs[id][emissionTechId]:
                    self.f.write('{}{}'.format('[RE1,'+ self.techMap[emissionTechId] +  ','+ self.emiMap[activityEmissionId] + ',*,*]:', '\n'))
                    self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
                    for mod in self.modIds:
                        ryteString = ''
                        for yearId in self.yearIDs:
                            for sc in self.scOrder:
                                if rytem[id][sc['ScId']][yearId][emissionTechId][activityEmissionId][mod] is not None and sc['Active'] == True:
                                    tmp = rytem[id][sc['ScId']][yearId][emissionTechId][activityEmissionId][mod]
                            ryteString += '{} '.format(tmp)
                        self.f.write('{} {}{}'.format(mod, ryteString, '\n'))
            self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYTTs(self):
        rytts = self.RYTTs(File.readFile(self.ryttsPath))
        for id, param in self.PARAM['RYTTs'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for techId in self.techIDs:
                self.f.write('{} {}'.format('[RE1,'+ self.techMap[techId] +',*,*]:', '\n'))
                self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
                for timesliceId in self.timesliceIDs:
                    ryttsString = ''
                    for yearId in self.yearIDs:
                        for sc in self.scOrder:
                            if rytts[id][sc['ScId']][yearId][techId][timesliceId] is not None and sc['Active'] == True:
                                tmp = rytts[id][sc['ScId']][yearId][techId][timesliceId]
                        ryttsString += '{} '.format(tmp)
                    self.f.write('{} {}{}'.format(timesliceId, ryttsString, '\n'))
        self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def gen_RYCTs(self):
        rycts = self.RYCTs(File.readFile(self.ryctsPath))
        for id, param in self.PARAM['RYCTs'].items():
            self.f.write('{} {} {} {} {} {}'.format('param', param,'default', self.defaultValue[id], ':=','\n'))
            for commId in self.commIDs:
                self.f.write('{} {}'.format('[RE1,'+ self.commMap[commId] +',*,*]:', '\n'))
                self.f.write('{}{}{}'.format( self.years, ':=', '\n'))
                for timesliceId in self.timesliceIDs:
                    ryctsString = ''
                    for yearId in self.yearIDs:
                        for sc in self.scOrder:
                            if rycts[id][sc['ScId']][yearId][commId][timesliceId] is not None and sc['Active'] == True:
                                tmp = rycts[id][sc['ScId']][yearId][commId][timesliceId]
                        ryctsString += '{} '.format(tmp)
                    self.f.write('{} {}{}'.format(timesliceId, ryctsString, '\n'))
        self.f.write('{}{}'.format(';', '\n'))
        self.f.write('{}{}'.format('', '\n'))

    def generateDatafile( self, caserunname ):
        try:
            self.defaultValue = self.getParamDefaultValues()
            self.emiIDs = self.getEmiIds()
            self.techIDs = self.getTechIds()
            self.commIDs = self.getCommIds()
            self.conIDs = self.getConIds()
            self.scOrder = self.getScOrder(caserunname)

            self.emiMap = self.getEmisMap()
            self.techMap = self.getTechsMap()
            self.commMap = self.getCommsMap()
            self.conMap = self.getConsMap()
            
            self.yearIDs = self.getYears()
            self.timesliceIDs = self.getTimeslices()
            self.modIds = self.getMods()

            self.activityTechIDs = self.getActivityTechIds()
            self.activityCommIDs = self.getActivityCommIds()

            self.inputCapTechIds = self.getInputCapTechIds()
            self.inputCapCommIds = self.getInputCapCommIds()

            self.emissionTechIDs = self.getActivityEmissionTechIds()
            self.activityEmissionIDs = self.getActivityEmisionIds()

            self.constraintTechIDs = self.getConstraintTechIds()

            self.techs = ''
            for techId in self.techIDs:
                self.techs += '{} '.format(self.techMap[techId]) 

            self.comms = ''
            for commId in self.commIDs:
                self.comms += '{} '.format(self.commMap[commId]) 

            self.emis = ''
            for emiId in self.emiIDs:
                self.emis += '{} '.format(self.emiMap[emiId])

            self.years = ''
            for yearId in self.yearIDs:
               self.years += '{} '.format(yearId)

            self.timeslices = ''
            for timesliceId in self.timesliceIDs:
                self.timeslices += '{} '.format(timesliceId)

            self.mods = ''
            for modId in self.modIds:
                self.mods += '{} '.format(modId)

            self.cons = ''
            for conId in self.conIDs:
                self.cons += '{} '.format(self.conMap[conId])

            # path = '"{}"'.format(self.resPath.resolve())
            self.resPath = Path('..', '..', '..', '..', 'WebAPP', 'DataStorage', self.case, 'res',caserunname, 'csv')
            path = '"{}"'.format(self.resPath)

            dataFilePath = Path(Config.DATA_STORAGE, self.case, 'res',caserunname,'data.txt')
            # self.f = open(self.dataFile, mode="w", encoding='utf-8')
            self.f = open(dataFilePath, mode="w", encoding='utf-8')


            #f.write(json.dumps(data, ensure_ascii=False,  indent=4, sort_keys=False))
            self.f.write('####################\n#Sets#\n####################\n')
            self.f.write('{} {}'.format('#', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'EMISSION',':=', self.emis, ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'REGION',':=', 'RE1', ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'MODE_OF_OPERATION',':=', self.mods, ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'COMMODITY',':=', self.comms, ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'STORAGE',':=','', ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'TECHNOLOGY',':=', self.techs, ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'YEAR',':=', self.years, ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'TIMESLICE',':=', self.timeslices, ';', '\n'))
            self.f.write('{} {} {} {}{}{}'.format('set', 'UDC',':=', self.cons, ';', '\n'))

            self.f.write('####################\n#Parameters#\n####################\n')

            #path
            self.f.write('{}{}'.format('#', '\n'))
            self.f.write('{} {} {} {} {} {}'.format('param', 'ResultsPath',':=', path, ';', '\n'))
            self.f.write('{}{}'.format('', '\n'))
            
            #trade route hard code
            self.f.write('{} {} {} {} {} {}'.format('param', 'TradeRoute ','default', '0', ':=','\n'))
            self.f.write('{} {}'.format(';', '\n'))
            self.f.write('{} {}'.format('', '\n'))

            self.gen_RCn()
            #dznamicaly call function depending on defined params
            for group, array in self.PARAM.items():
                if array:
                    func_name = Config.GEN_F[group]
                    func = getattr(self,func_name) 
                    func() 

            self.f.write('{}{}'.format('#', '\n'))
            self.f.write('{}'.format('end;'))
            self.f.close

            # if not os.path.exists(Path(Config.DATA_STORAGE,self.case,'res', 'csv')):
            #     resName = Path(Config.DATA_STORAGE,self.case,'res', 'csv')
            #     os.makedirs(resName, mode=0o777, exist_ok=False)

                #os.makedirs(name,0777)

        #ovako prosljedjujemo exception u prethodnom slucaju vracamo response u funkciju koja poziva writeFile
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def createCaseRun(self, caserunname, data):
        try:
            caseRunPath = Path(Config.DATA_STORAGE,self.case,'res', caserunname)
            csvPath = Path(Config.DATA_STORAGE,self.case,'res', caserunname, 'csv')
            resDataPath = Path(Config.DATA_STORAGE,self.case,'view', 'resData.json')

            if not os.path.exists(caseRunPath):
                os.makedirs(caseRunPath)
                os.makedirs(csvPath)
                if not os.path.exists(resDataPath):
                    File.writeFile( data, resDataPath)
                else:
                    resData = File.readFile(resDataPath)
                    resData['osy-cases'].append(data)
                    File.writeFile( resData, resDataPath)
                response = {
                    "message": "You have created a case run!",
                    "status_code": "success"
                } 
            else:
                response = {
                    "message": "Case with same name already exists!",
                    "status_code": "exist"
                } 

            return response
            # urllib.request.urlretrieve(self.dataFile, dataFile)
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def updateCaseRun(self, caserunname, oldcaserunname, data):
        try:
            caseRunPath = Path(Config.DATA_STORAGE,self.case,'res', oldcaserunname)
            newcaseRunPath = Path(Config.DATA_STORAGE,self.case,'res', caserunname)
            csvPath = Path(Config.DATA_STORAGE,self.case,'res', caserunname, 'csv')
            resDataPath = Path(Config.DATA_STORAGE,self.case,'view', 'resData.json')

            if not os.path.exists(newcaseRunPath):
                os.rename(caseRunPath, newcaseRunPath)

                if not os.path.exists(csvPath):
                    os.makedirs(csvPath)

                resData = File.readFile(resDataPath)

                resdata = resData['osy-cases']
                for i, case in enumerate(resdata):
                    if case['Case'] == oldcaserunname:
                        resData['osy-cases'][i] = data

                File.writeFile( resData, resDataPath)
                response = {
                    "message": "You have updated a case run!",
                    "status_code": "success"
                } 
            elif os.path.exists(newcaseRunPath) and caserunname==oldcaserunname:
                if not os.path.exists(csvPath):
                    os.makedirs(csvPath)

                resData = File.readFile(resDataPath)

                resdata = resData['osy-cases']
                for i, case in enumerate(resdata):
                    if case['Case'] == oldcaserunname:
                        resData['osy-cases'][i] = data

                File.writeFile( resData, resDataPath)
                response = {
                    "message": "You have updated a case run!",
                    "status_code": "success"
                } 
            else:
                response = {
                    "message": "Case with same name already exists!",
                    "status_code": "exist"
                } 

            return response
            # urllib.request.urlretrieve(self.dataFile, dataFile)
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def deleteCaseRun(self, caserunname):
        try:
            #caseRunPath = Path(Config.DATA_STORAGE,self.case,'res', caserunname)
            #resDataPath = Path(Config.DATA_STORAGE,self.case,'view', 'resData.json')

            resData = File.readFile(self.resDataPath)

            for obj in resData['osy-cases']:
                if obj['Case'] == caserunname:
                    resData['osy-cases'].remove(obj)

            File.writeFile( resData, self.resDataPath)
            response = {
                "message": "You have deleted a case run!",
                "status_code": "success"
            } 



            
            return response
            # urllib.request.urlretrieve(self.dataFile, dataFile)
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def readDataFile( self, caserunname ):
        try:
            
            #f = open(self.dataFile, mode="r")
            dataFilePath = Path(Config.DATA_STORAGE, self.case, 'res',caserunname,'data.txt')
            if os.path.exists(dataFilePath):
                f = open(dataFilePath, mode="r", encoding='utf-8-sig')
                data =  f.read()
                f.close
            else:
                data = None

            # f = open(self.dataFile, 'r')
            # file_contents = f.read()
            # f.close()
            return data
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def generateCSVfromCBC(self, data_file, results_file, caserunname, base_folder=os.getcwd()):
        pd.set_option('mode.chained_assignment', None)

        lines = []

        parsing = False

        data_all = []
        data_out = []
        data_inp = []
        output_table = []
        input_table = []
        storage_to = []
        storage_from = []

        with open(data_file, 'r') as f:
            for line in f:
                if line.startswith('set YEAR'):
                    start_year = line.split(' ')[3]
                if line.startswith('set COMMODITY'): # Extracts list of COMMODITIES from data file. Some models use FUEL instead.
                    fuel_list = line.split(' ')[3:-1]
                if line.startswith('set FUEL'): # Extracts list of FUELS from data file. Some models use COMMODITIES instead.
                    fuel_list = line.split(' ')[3:-1]
                if line.startswith('set TECHNOLOGY'):
                    tech_list = line.split(' ')[3:-1]
                if line.startswith('set STORAGE'):
                    storage_list = line.split(' ')[3:-1]
                if line.startswith('set MODE_OF_OPERATION'):
                    mode_list = line.split(' ')[3:-1]

                if line.startswith(";"):
                        parsing = False

                if parsing:
                    if line.startswith('['):
                        fuel = line.split(',')[2]
                        tech = line.split(',')[1]
                    elif line.startswith(start_year):
                        years = line.rstrip(':= ;\n').split(' ')[0:]
                        years = [i.strip(':=') for i in years]
                    else:
                        values = line.rstrip().split(' ')[1:]
                        mode = line.split(' ')[0]

                        if param_current=='OutputActivityRatio':
                            #data_out.append(tuple([fuel,tech,mode]))
                            #data_all.append(tuple([tech,mode]))
                            for i in range(0,len(years)):
                                output_table.append(tuple([tech,fuel,mode,years[i],values[i]]))

                        if param_current=='InputActivityRatio':
                            #data_inp.append(tuple([fuel,tech,mode]))
                            #data_all.append(tuple([tech,mode]))
                            for i in range(0,len(years)):
                                input_table.append(tuple([tech,fuel,mode,years[i],values[i]]))

                        if param_current == 'TechnologyToStorage' or param_current == 'TechnologyFromStorage':
                            if not line.startswith(mode_list[0]):
                                storage = line.split(' ')[0]
                                values = line.rstrip().split(' ')[1:]
                                for i in range(0,len(mode_list)):
                                    if values[i] != '0':
                                        if param_current == 'TechnologyToStorage':
                                            storage_to.append(tuple([storage,tech,mode_list[i]]))
                                            data_all.append(tuple([tech,mode_list[i]]))
                                        if param_current == 'TechnologyFromStorage':
                                            storage_from.append(tuple([storage,tech,mode_list[i]]))
                                            data_all.append(tuple([tech,mode_list[i]]))

                if line.startswith(('param OutputActivityRatio','param InputActivityRatio','param TechnologyToStorage','param TechnologyFromStorage')):
                    param_current = line.split(' ')[1]
                    parsing = True

        # try:
        #     os.makedirs(os.path.join(base_folder, 'csv'))
        # except FileExistsError:
        #     pass

        #Read CBC output file
        df = pd.read_csv(results_file, sep='\t')

        df.columns = ['temp']
        df['temp'] = df['temp'].str.lstrip(' *\n\t')
        df[['temp','value']] = df['temp'].str.split(')', expand=True)
        df = df.applymap(lambda x: x.strip() if isinstance(x,str) else x)
        df['value'] = df['value'].str.split(' ', expand=True)
        df[['parameter','id']] = df['temp'].str.split('(', expand=True)
        df['parameter'] = df['parameter'].str.split(' ', expand=True)[1]
        df = df.drop('temp', axis=1)
        #dodao regex jer je jvljao gresku python astype cannot convert string to float
        df['value'] = df['value'].replace(',','.', regex=True).astype(float).round(4)

        params = df.parameter.unique()
        all_params = {}
        cols = {'NewCapacity':['r','t','y'],
                'AccumulatedNewCapacity':['r','t','y'],
                'TotalCapacityAnnual':['r','t','y'],
                'CapitalInvestment':['r','t','y'],
                'AnnualVariableOperatingCost':['r','t','y'],
                'AnnualFixedOperatingCost':['r','t','y'],
                'SalvageValue':['r','t','y'],
                'DiscountedSalvageValue':['r','t','y'],
                'TotalTechnologyAnnualActivity':['r','t','y'],
                'RateOfActivity':['r','l','t','m','y'],
                'RateOfTotalActivity':['r','t','l','y'],
                'Demand':['r','l','f','y'],
                'TotalAnnualTechnologyActivityByMode':['r','t','m','y'],
                'TotalTechnologyModelPeriodActivity':['r','t'],
                'ProductionByTechnology':['r','l','t','f','y'],
                'ProductionByTechnologyAnnual':['r','t','f','y'],
                'AnnualTechnologyEmissionByMode':['r','t','e','m','y'],
                'AnnualTechnologyEmission':['r','t','e','y'],
                'AnnualEmissions':['r','e','y'],
                'DiscountedTechnologyEmissionsPenalty':['r','t','y'],
                'RateOfProductionByTechnology':['r','l','t','f','y'],
                'RateOfUseByTechnology':['r','l','t','f','y'],
                'UseByTechnology':['r','l','t','f','y'],
                'RateOfProductionByTechnologyByMode':['r','l','t','f','m','y'],
                'RateOfUseByTechnologyByMode':['r','l','t','f','m','y'],
                'TechnologyActivityChangeByMode':['r','t','m','y'],
                'TechnologyActivityChangeByModeCostTotal':['r','t','m','y'],
                'InputToNewCapacity':['r','t','f','y'],
                'InputToTotalCapacity':['r','t','f','y'],
                'DiscountedCapitalInvestment':['r','t','y'],
                'DiscountedOperatingCost':['r','t','y'],
                'TotalDiscountedCostByTechnology':['r','t','y'],            
                }

        for each in params:
            df_p = df[df.parameter == each]
            df_p[cols[each]] = df_p['id'].str.split(',',expand=True)
            cols[each].append('value')
            df_p = df_p[cols[each]] # Reorder dataframe to include 'value' as last column
            all_params[each] = pd.DataFrame(df_p) # Create a dataframe for each parameter
            df_p = df_p.rename(columns={'value':each})
            df_p.to_csv(os.path.join(base_folder, 'WebAPP','DataStorage',self.case,'res',caserunname,'csv', str(each) + '.csv'), index=None) # Print data for each paramter to a CSV file

        year_split = []
        parsing = False

        with open(data_file, 'r') as f:
            for line in f:
                if line.startswith(";"):
                    parsing = False
                if parsing:
                    if line.startswith(start_year):
                        years = line.rstrip().split(' ')[0:]
                        years = [i.strip(':=') for i in years]
                        years = list(filter(None, years))
                    elif not line.startswith(start_year):
                        time_slice = line.rstrip().split(' ')[0]
                        values = line.rstrip().split(' ')[1:]
                        for i in range(0,len(years)):
                            year_split.append(tuple([time_slice,years[i],values[i]]))
                if line.startswith('param YearSplit'):
                    parsing = True

        df_yearsplit = pd.DataFrame(year_split, columns=['l','y','YearSplit'])
        df_activity = all_params['RateOfActivity'].rename(columns={'value':'RateOfActivity'})

        df_output = pd.DataFrame(output_table, columns=['t','f','m','y','OutputActivityRatio'])
        df_out_ys = pd.merge(df_output, df_yearsplit, on='y')
        df_out_ys['OutputActivityRatio'] = df_out_ys['OutputActivityRatio'].astype(float)
        df_out_ys['YearSplit'] = df_out_ys['YearSplit'].astype(float)

        df_prod = pd.merge(df_out_ys, df_activity, on=['t','m','l','y'])
        df_prod['ProductionByTechnologyAnnual'] = df_prod['OutputActivityRatio']*df_prod['YearSplit']*df_prod['RateOfActivity']
        df_prod = df_prod.drop(['OutputActivityRatio','YearSplit','RateOfActivity'], axis=1)
        df_prod = df_prod.groupby(['r','t','f','y'])['ProductionByTechnologyAnnual'].sum().reset_index()
        df_prod['ProductionByTechnologyAnnual'] = df_prod['ProductionByTechnologyAnnual'].astype(float).round(4)
        df_prod.to_csv(os.path.join(base_folder,'WebAPP','DataStorage',self.case,'res', caserunname, 'csv', 'ProductionByTechnologyAnnual.csv'), index=None)
        all_params['ProductionByTechnologyAnnual'] = df_prod.rename(columns={'ProductionByTechnologyAnnual':'value'})


        df_input = pd.DataFrame(input_table, columns=['t','f','m','y','InputActivityRatio'])
        df_in_ys = pd.merge(df_input, df_yearsplit, on='y')
        df_in_ys['InputActivityRatio'] = df_in_ys['InputActivityRatio'].astype(float)
        df_in_ys['YearSplit'] = df_in_ys['YearSplit'].astype(float)

        df_use = pd.merge(df_in_ys, df_activity, on=['t','m','l','y'])
        df_use['UseByTechnologyAnnual'] = df_use['InputActivityRatio']*df_use['YearSplit']*df_use['RateOfActivity']
        df_use = df_use.drop(['InputActivityRatio','YearSplit','RateOfActivity'], axis=1)
        df_use = df_use.groupby(['r','t','f','y'])['UseByTechnologyAnnual'].sum().reset_index()
        df_use['UseByTechnologyAnnual'] = df_use['UseByTechnologyAnnual'].astype(float).round(4)
        df_use.to_csv(os.path.join(base_folder,'WebAPP','DataStorage',self.case,'res',caserunname, 'csv', 'UseByTechnologyAnnual.csv'), index=None)
        all_params['UseByTechnologyAnnual'] = df_use.rename(columns={'UseByTechnologyAnnual':'value'})

    def run( self, solver, caserunname ):
        try:
            self.dataFile = Path(Config.DATA_STORAGE, self.case, 'res',caserunname,'data.txt')
            self.resFile = Path(Config.DATA_STORAGE,self.case, 'res',caserunname,'results.txt')
            self.lpFile = Path(Config.DATA_STORAGE,self.case, 'res',caserunname,'lp.lp')
            # self.resCBCPath = Path('..', '..', '..', '..', 'WebAPP', 'DataStorage', self.case, 'res')
            # self.resPath = Path('..', '..', '..', '..', 'WebAPP', 'DataStorage', self.case, 'res', 'csv')

            modelfile = '"{}"'.format(self.osemosysFile.resolve())
            datafile = '"{}"'.format(self.dataFile.resolve())
            resultfile = '"{}"'.format(self.resFile.resolve())
            lpfile = '"{}"'.format(self.lpFile.resolve())
            

            glpfolder =self.glpkFolder.resolve()
            cbcfolder =self.cbcFolder.resolve()
            # respath = self.resPath.resolve()
            # resCBCPath = self.resCBCPath.resolve()
            if solver == 'glpk':

                # print('glpk folder ', self.glpkFolder)
                # print('glpk folder ', glpfolder)
                out = subprocess.run('glpsol -m ' + modelfile +' -d ' + datafile +' -o ' + resultfile, cwd=glpfolder,  capture_output=True, text=True, shell=True)
                #out = subprocess.run('glpsol -m ' + modelfile +' -d ' + datafile +' -o ' + resultfile, cwd=self.casePath,  capture_output=True, text=True, shell=False)
            else:
                #Matrix generation (creates an LP file with GLPK): glpsol --check -m [model].txt -d [data].txt --wlp [LPfile].lp
                #Optimisation (solves LP file with CBC): cbc [LPfile].lp solve -solu [results].txt
                subprocess.run('glpsol --check -m ' + modelfile +' -d ' + datafile +' --wlp ' + lpfile, cwd=glpfolder,  capture_output=True, text=True, shell=True)
                # out = subprocess.run('cbc ' + modelfile +' -d ' + datafile +' -o ' + resultfile, cwd=self.cbcFolder,  capture_output=True, text=True, shell=True)
                out = subprocess.run('cbc ' + lpfile +' solve -solu '  + resultfile, cwd=cbcfolder,  capture_output=True, text=True, shell=True)
                self.generateCSVfromCBC(self.dataFile, self.resFile, caserunname)
            if out.returncode != 0:
            
                response = {
                    "message": out.stdout,
                    "stdmsg": out.stderr,
                    "status_code": "error"
                }
            else:
                self.generateResultsViewer(caserunname)
                response = {
                    "message": out.stdout,
                    "status_code": "success"
                }           
            return response
            # urllib.request.urlretrieve(self.dataFile, dataFile)
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError
    
    def generateResultsViewer(self, caserunname):
        try:
            csvFolderPath = Path(Config.DATA_STORAGE,self.case,'res',caserunname, 'csv')
            viewFolderPath = Path(Config.DATA_STORAGE,self.case,'view')
            #CSV
            csvs = [f.name for f in os.scandir(csvFolderPath) ]
            # cases = [f.name for f in os.scandir(self.resultsPath) if not os.listdir(csvFolderPath) ]
            cases = [f.name for f in os.scandir(self.resultsPath) ]
            
            paramByName = {}
            for group, array in self.RESULTPARAMETERS.items():
                for obj in array:
                    o = {}
                    o['id'] = obj['id']
                    o['group'] = group
                    paramByName[obj['name']] = o

            DATA = {}
            for case in cases:
                for csv in csvs:
                    # df = pd.read_csv(Path('res','csv', csv))
                    df = pd.read_csv(Path(Config.DATA_STORAGE,self.case,'res', case, 'csv', csv))
                    data = df.to_json(orient='records', indent=2)
                    jsondata = json.loads(data)
                    if len(jsondata) != 0:
                        for param, paramobj in paramByName.items():
                            if param in jsondata[0]:
                                if paramobj['group'] not in DATA:
                                    DATA[paramobj['group']] = {}

                                if paramobj['group'] == 'RT':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tmp = {}
                                    for obj in jsondata:
                                        tmp[ obj['t']] =obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close     

                                if paramobj['group'] == 'RYT':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t']:
                                            tmp['Tech'] = obj['t']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close    

                                if paramobj['group'] == 'RYE':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    emi = jsondata[0]['e']
                                    tmp = {}
                                    for obj in jsondata:
                                        if emi == obj['e']:
                                            tmp['Emi'] = obj['e']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            emi = obj['e']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Emi'] = obj['e']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close    

                                if paramobj['group'] == 'RYTM':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    mod = jsondata[0]['m']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and mod == obj['m']:
                                            tmp['Tech'] = obj['t']
                                            tmp['MoId'] = obj['m']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            mod = obj['m']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['MoId'] = obj['m']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close    

                                if paramobj['group'] == 'RYTC':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    comm = jsondata[0]['f']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and comm == obj['f']:
                                            tmp['Tech'] = obj['t']
                                            tmp['Comm'] = obj['f']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            comm = obj['f']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['Comm'] = obj['f']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close    

                                if paramobj['group'] == 'RYTE':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    emi = jsondata[0]['e']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and emi == obj['e']:
                                            tmp['Tech'] = obj['t']
                                            tmp['Emi'] = obj['e']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            emi = obj['e']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['Emi'] = obj['e']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close    

                                if paramobj['group'] == 'RYTTs':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    ts = jsondata[0]['l']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and ts == obj['l']:
                                            tmp['Tech'] = obj['t']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            ts = obj['l']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close    

                                if paramobj['group'] == 'RYCTs':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    comm = jsondata[0]['f']
                                    ts = jsondata[0]['l']
                                    tmp = {}
                                    for obj in jsondata:
                                        if comm == obj['f'] and ts == obj['l']:
                                            tmp['Comm'] = obj['f']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            comm = obj['f']
                                            ts = obj['l']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Comm'] = obj['f']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close 

                                if paramobj['group'] == 'RYTEM':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    emi = jsondata[0]['e']
                                    mod = jsondata[0]['m']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and emi == obj['e'] and mod == obj['m']:
                                            tmp['Tech'] = obj['t']
                                            tmp['Emi'] = obj['e']
                                            tmp['MoId'] = obj['m']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            emi = obj['e']
                                            mod = obj['m']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['Emi'] = obj['e']
                                            tmp['MoId'] = obj['m']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close 

                                if paramobj['group'] == 'RYTCTs':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    comm = jsondata[0]['f']
                                    ts = jsondata[0]['l']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and comm == obj['f'] and ts == obj['l']:
                                            tmp['Tech'] = obj['t']
                                            tmp['Comm'] = obj['f']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            comm = obj['f']
                                            ts = obj['l']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['Comm'] = obj['f']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close 

                                if paramobj['group'] == 'RYTMTs':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    mod = jsondata[0]['m']
                                    ts = jsondata[0]['l']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and mod == obj['m'] and ts == obj['l']:
                                            tmp['Tech'] = obj['t']
                                            tmp['MoId'] = obj['m']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            mod = obj['m']
                                            ts = obj['l']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['MoId'] = obj['m']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close 

                                if paramobj['group'] == 'RYTCMTs':
                                    if paramobj['id'] not in DATA[paramobj['group']]:
                                        DATA[paramobj['group']][paramobj['id']] = {}
                                    DATA[paramobj['group']][paramobj['id']][case] = []
                                    tech = jsondata[0]['t']
                                    comm = jsondata[0]['f']
                                    mod = jsondata[0]['m']
                                    ts = jsondata[0]['l']
                                    tmp = {}
                                    for obj in jsondata:
                                        if tech == obj['t'] and comm == obj['f'] and mod == obj['m'] and ts == obj['l']:
                                            tmp['Tech'] = obj['t']
                                            tmp['Comm'] = obj['f']
                                            tmp['MoId'] = obj['m']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                        else:
                                            tech = obj['t']
                                            comm = obj['f']
                                            mod = obj['m']
                                            ts = obj['l']
                                            DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                            tmp = {}
                                            tmp['Tech'] = obj['t']
                                            tmp['Comm'] = obj['f']
                                            tmp['MoId'] = obj['m']
                                            tmp['Ts'] = obj['l']
                                            tmp[obj['y']] = obj[param]
                                    DATA[paramobj['group']][paramobj['id']][case].append(tmp)
                                    path = Path(viewFolderPath, paramobj['group']+'.json')
                                    f = open(path, mode="w")
                                    f.write(json.dumps( DATA[paramobj['group']], ensure_ascii=True,  indent=4, sort_keys=False))
                                    f.close 
                                break

        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    