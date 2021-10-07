import urllib.request
from pathlib import Path
from flask import jsonify
import os
import subprocess
from Classes.Base import Config
from Classes.Case.OsemosysClass import Osemosys
from Classes.Base.FileClass import File
from Classes.Base.S3 import S3

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

    def generateDatafile( self ):
        try:
            self.defaultValue = self.getParamDefaultValues()
            self.emiIDs = self.getEmiIds()
            self.techIDs = self.getTechIds()
            self.commIDs = self.getCommIds()
            self.conIDs = self.getConIds()
            self.scOrder = self.getScOrder()

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
            path = '"{}"'.format(self.resPath)

            if Config.AWS_STORAGE != 1:
                self.f = open(self.dataFile, mode="w", encoding='utf-8')
            else:
                '''ako se koristi aws S3 storage direktno'''
                if not os.path.exists(Path(Config.S3_BUCKET_LOCAL,self.case)):
                    os.makedirs(Path(Config.S3_BUCKET_LOCAL,self.case))
                self.f = open(self.dataFileS3, mode="w")

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

            if not os.path.exists(Path(Config.DATA_STORAGE,self.case,'res', 'csv')):
                resName = Path(Config.DATA_STORAGE,self.case,'res', 'csv')
                os.makedirs(resName, mode=0o777, exist_ok=False)

                #os.makedirs(name,0777)

        #ovako prosljedjujemo exception u prethodnom slucaju vracamo response u funkciju koja poziva writeFile
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def generateDatafile_bkp( self ):
        try:
            self.defaultValue1 = self.getParamDefaultValues()
            defaultValue = self.getParamDefaultValues()
            emiIDs = self.getEmiIds()
            techIDs = self.getTechIds()
            commIDs = self.getCommIds()
            scOrder = self.getScOrder()

            emiMap = self.getEmisMap()
            techMap = self.getTechsMap()
            commMap = self.getCommsMap()
            
            yearIDs = self.getYears()
            timesliceIDs = self.getTimeslices()
            modIds = self.getMods()

            activityTechIDs = self.getActivityTechIds()
            activityCommIDs = self.getActivityCommIds()

            emissionTechIDs = self.getActivityEmissionTechIds()
            activityEmissionIDs = self.getActivityEmisionIds()

            emis = ''
            for emiId in emiIDs:
                #emis += '{:<50}'.format(emiId) 
                #emis += '{} '.format(next(iter(emiId.items()))[1]) 
                emis += '{} '.format(emiMap[emiId])

            techs = ''
            for techId in techIDs:
                # techs += '{:<50}'.format(techId) 
                #techs += '{} '.format(next(iter(techId.items()))[1]) 
                techs += '{} '.format(techMap[techId]) 

            comms = ''
            for commId in commIDs:
                # comms += '{:<50}'.format(commId) 
                #comms += '{} '.format(next(iter(commId.items()))[1]) 
                comms += '{} '.format(commMap[commId]) 

            years = ''
            for yearId in yearIDs:
                # years += '{:<50}'.format(yearId)
                years += '{} '.format(yearId)

            timeslices = ''
            for timesliceId in timesliceIDs:
                # timeslices += '{:<50}'.format(timesliceId)
                timeslices += '{} '.format(timesliceId)

            mods = ''
            for modId in modIds:
                # timeslices += '{:<50}'.format(timesliceId)
                mods += '{} '.format(modId)

            #path = '"{}"'.format(self.resPath.resolve())

            if Config.AWS_STORAGE != 1:
                f = open(self.dataFile, mode="w")
            else:
                '''ako se koristi aws S3 storage direktno'''
                if not os.path.exists(Path(Config.S3_BUCKET_LOCAL,self.case)):
                    os.makedirs(Path(Config.S3_BUCKET_LOCAL,self.case))
                f = open(self.dataFileS3, mode="w")

            #f.write(json.dumps(data, ensure_ascii=False,  indent=4, sort_keys=False))
            f.write('####################\n#Sets#\n####################\n')
            f.write('{} {}'.format('#', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'EMISSION',':=', emis, ';', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'REGION',':=', 'RE1', ';', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'MODE_OF_OPERATION',':=', mods, ';', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'COMMODITY',':=', comms, ';', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'STORAGE',':=','', ';', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'TECHNOLOGY',':=', techs, ';', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'YEAR',':=', years, ';', '\n'))
            f.write('{} {} {} {}{}{}'.format('set', 'TIMESLICE',':=', timeslices, ';', '\n'))

            f.write('####################\n#Parameters#\n####################\n')
            # f.write('{:<50}{}'.format('#', '\n'))
            # f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('param', 'ResultsPath',':=', path, ';', '\n'))
            # f.write('{:<50}{}'.format('', '\n'))

            #trade route hard code
            f.write('{} {} {} {} {} {}'.format('param', 'TradeRoute ','default', '0', ':=','\n'))
            f.write('{} {}'.format(';', '\n'))
            f.write('{} {}'.format('', '\n'))

            #R
            r = self.R(File.readFile(self.rPath))
            for id, param in self.PARAM['R'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                for sc in scOrder:
                    if r[id][sc['ScId']]['value'] is not None and sc['Active'] == True:
                        tmp = r[id][sc['ScId']]['value']
                f.write('{} {} {}'.format('RE1', tmp, '\n'))
                f.write('{} {}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #self.gen_R(f, scOrder)
            #next(iter(word_freq.items()))[1]
            #next(iter(commId))

            #RY
            ry = self.RY(File.readFile(self.ryPath))
            for id, param in self.PARAM['RY'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format(years, ':=', '\n'))
                ryString = ''
                for yearId in yearIDs:
                    for sc in scOrder:
                        if ry[id][sc['ScId']][yearId] is not None and sc['Active'] == True:
                            tmp = ry[id][sc['ScId']][yearId]
                    ryString += '{} '.format(tmp)
                f.write('{}{}{}'.format('RE1 ', ryString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RT
            rt = self.RT(File.readFile(self.rtPath))
            for id, param in self.PARAM['RT'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format(techs, ':=', '\n'))
                rtString = ''
                for techId in techIDs:
                    for sc in scOrder:
                        if rt[id][sc['ScId']][techId] is not None and sc['Active'] == True:
                            tmp = rt[id][sc['ScId']][techId]
                    rtString += '{} '.format(tmp)
                f.write('{}{}{}'.format('RE1 ', rtString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RE
            re = self.RE(File.readFile(self.rePath))
            for id, param in self.PARAM['RE'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format(emis, ':=', '\n'))
                reString = ''
                for emiId in emiIDs:
                    for sc in scOrder:
                        if re[id][sc['ScId']][emiId] is not None and sc['Active'] == True:
                            tmp = re[id][sc['ScId']][emiId]
                    reString += '{} '.format(tmp)
                f.write('{}{}{}'.format('RE1 ', reString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYTs
            ryts = self.RYTs(File.readFile(self.rytsPath))
            for id, param in self.PARAM['RYTs'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format( years, ':=', '\n'))
                for timesliceId in timesliceIDs:
                    rytsString = ''
                    for yearId in yearIDs:
                        for sc in scOrder:
                            if ryts[id][sc['ScId']][yearId][timesliceId] is not None and sc['Active'] == True:
                                tmp = ryts[id][sc['ScId']][yearId][timesliceId]
                        rytsString += '{} '.format(tmp)
                    f.write('{} {}{}'.format(timesliceId, rytsString, '\n'))
            f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYT
            ryt = self.RYT(File.readFile(self.rytPath))
            for id, param in self.PARAM['RYT'].items():
                if id not in ('VC', 'TAMLL', 'TAMUL', 'TADML', 'TAIML'):
                    f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                    f.write('{} {}'.format('[RE1,*,*]:', '\n'))
                    f.write('{}{}{}'.format( years, ':=', '\n'))
                    for techId in techIDs:
                        rytString = ''
                        for yearId in yearIDs:
                            for sc in scOrder:
                                if ryt[id][sc['ScId']][yearId][techId] is not None and sc['Active'] == True:
                                    tmp = ryt[id][sc['ScId']][yearId][techId]
                            rytString += '{} '.format(tmp)
                        f.write('{} {}{}'.format(techMap[techId], rytString, '\n'))
                    f.write('{}{}'.format(';', '\n'))

                else:

                    f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                    for techId in techIDs:
                        f.write('{} {}'.format('[RE1,'+ techMap[techId] +',*,*]:', '\n'))
                        f.write('{}{}{}'.format(years, ':=', '\n'))
                        rytString = ''
                        for yearId in yearIDs:
                            for sc in scOrder:
                                if ryt[id][sc['ScId']][yearId][techId] is not None and sc['Active'] == True:
                                    tmp = ryt[id][sc['ScId']][yearId][techId]
                            rytString += '{} '.format(tmp)
                        f.write('{} {}{}'.format(1, rytString, '\n'))
                    f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYTM
            rytm = self.RYTM(File.readFile(self.rytmPath))
            for id, param in self.PARAM['RYTM'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                for techId in techIDs:
                    f.write('{} {}'.format('[RE1,'+ techMap[techId] +',*,*]:', '\n'))
                    f.write('{}{}{}'.format(years, ':=', '\n'))
                    for mod in modIds:
                        rytmString = ''
                        for yearId in yearIDs:
                            for sc in scOrder:
                                if rytm[id][sc['ScId']][yearId][techId][mod] is not None and sc['Active'] == True:
                                    tmp = rytm[id][sc['ScId']][yearId][techId][mod]
                            rytmString += '{} '.format(tmp)
                        f.write('{} {}{}'.format(mod, rytmString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYC
            ryc = self.RYC(File.readFile(self.rycPath))
            for id, param in self.PARAM['RYC'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                f.write('{} {}'.format('[RE1,*,*]:', '\n'))
                f.write('{}{}{}'.format(years, ':=', '\n'))
                for commId in commIDs:
                    rycString = ''
                    for yearId in yearIDs:
                        for sc in scOrder:
                            if ryc[id][sc['ScId']][yearId][commId] is not None and sc['Active'] == True:
                                tmp = ryc[id][sc['ScId']][yearId][commId]
                        rycString += '{} '.format(tmp)
                    f.write('{} {}{}'.format(commMap[commId], rycString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYE 
            rye = self.RYE(File.readFile(self.ryePath))
            for id, param in self.PARAM['RYE'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                f.write('{} {}'.format('[RE1,*,*]:', '\n'))
                f.write('{}{}{}'.format( years, ':=', '\n'))
                for emiId in emiIDs:
                    ryeString = ''
                    for yearId in yearIDs:
                        for sc in scOrder:
                            if rye[id][sc['ScId']][yearId][emiId] is not None and sc['Active'] == True:
                                tmp = rye[id][sc['ScId']][yearId][emiId]
                        ryeString += '{} '.format(tmp)
                    f.write('{} {}{}'.format(emiMap[emiId], ryeString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYTC
            # rytc = self.RYTC(File.readFile(self.rytcPath))
            # for id, param in self.PARAM['RYTC'].items():
            #     f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
            #     for activityTechId in activityTechIDs[id]:
            #         for activityCommId in activityCommIDs[id][activityTechId]:
            #             f.write('{}{}'.format('[RE1,'+ techMap[activityTechId] + ','+ commMap[activityCommId] +',*,*]:', '\n'))
            #             f.write('{}{}{}'.format( years, ':=', '\n'))
            #             rytcString = ''
            #             for yearId in yearIDs:
            #                 for sc in scOrder:
            #                     if rytc[id][sc['ScId']][yearId][activityTechId][activityCommId] is not None and sc['Active'] == True:
            #                         tmp = rytc[id][sc['ScId']][yearId][activityTechId][activityCommId]
            #                 rytcString += '{} '.format(tmp)
            #             f.write('{} {}{}'.format(1, rytcString, '\n'))
            #     f.write('{}{}'.format(';', '\n'))
            # f.write('{}{}'.format('', '\n'))

            #RYTCM
            rytcm = self.RYTCM(File.readFile(self.rytcmPath))
            for id, param in self.PARAM['RYTCM'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                for activityTechId in activityTechIDs[id]:
                    for activityCommId in activityCommIDs[id][activityTechId]:
                        f.write('{}{}'.format('[RE1,'+ techMap[activityTechId] + ','+ commMap[activityCommId] +',*,*]:', '\n'))
                        f.write('{}{}{}'.format( years, ':=', '\n'))
                        for mod in modIds:
                            rytcString = ''
                            for yearId in yearIDs:
                                for sc in scOrder:
                                    if rytcm[id][sc['ScId']][yearId][activityTechId][activityCommId][mod] is not None and sc['Active'] == True:
                                        tmp = rytcm[id][sc['ScId']][yearId][activityTechId][activityCommId][mod]
                                rytcString += '{} '.format(tmp)
                            f.write('{} {}{}'.format(mod, rytcString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYTE
            # ryte = self.RYTE(File.readFile(self.rytePath))
            # for id, param in self.PARAM['RYTE'].items():
            #     f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
            #     for emissionTechId in emissionTechIDs[id]:
            #         for activityEmissionId in activityEmissionIDs[id][emissionTechId]:
            #             f.write('{}{}'.format('[RE1,'+ techMap[emissionTechId] +  ','+ emiMap[activityEmissionId] + ',*,*]:', '\n'))
            #             f.write('{}{}{}'.format( years, ':=', '\n'))
            #             ryteString = ''
            #             for yearId in yearIDs:
            #                 for sc in scOrder:
            #                     if ryte[id][sc['ScId']][yearId][emissionTechId][activityEmissionId] is not None and sc['Active'] == True:
            #                         tmp = ryte[id][sc['ScId']][yearId][emissionTechId][activityEmissionId]
            #                 ryteString += '{} '.format(tmp)
            #             f.write('{} {}{}'.format(1, ryteString, '\n'))
            #     f.write('{}{}'.format(';', '\n'))
            # f.write('{}{}'.format('', '\n'))

            rytem = self.RYTEM(File.readFile(self.rytemPath))
            for id, param in self.PARAM['RYTEM'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                for emissionTechId in emissionTechIDs[id]:
                    for activityEmissionId in activityEmissionIDs[id][emissionTechId]:
                        f.write('{}{}'.format('[RE1,'+ techMap[emissionTechId] +  ','+ emiMap[activityEmissionId] + ',*,*]:', '\n'))
                        f.write('{}{}{}'.format( years, ':=', '\n'))
                        for mod in modIds:
                            ryteString = ''
                            for yearId in yearIDs:
                                for sc in scOrder:
                                    if rytem[id][sc['ScId']][yearId][emissionTechId][activityEmissionId][mod] is not None and sc['Active'] == True:
                                        tmp = rytem[id][sc['ScId']][yearId][emissionTechId][activityEmissionId][mod]
                                ryteString += '{} '.format(tmp)
                            f.write('{} {}{}'.format(mod, ryteString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYTTs
            rytts = self.RYTTs(File.readFile(self.ryttsPath))
            for id, param in self.PARAM['RYTTs'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
 
                for techId in techIDs:
                    f.write('{} {}'.format('[RE1,'+ techMap[techId] +',*,*]:', '\n'))
                    f.write('{}{}{}'.format( years, ':=', '\n'))
                    for timesliceId in timesliceIDs:
                        ryttsString = ''
                        for yearId in yearIDs:
                            for sc in scOrder:
                                if rytts[id][sc['ScId']][yearId][techId][timesliceId] is not None and sc['Active'] == True:
                                    tmp = rytts[id][sc['ScId']][yearId][techId][timesliceId]
                            ryttsString += '{} '.format(tmp)
                        f.write('{} {}{}'.format(timesliceId, ryttsString, '\n'))
            f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYCTs
            rycts = self.RYCTs(File.readFile(self.ryctsPath))
            for id, param in self.PARAM['RYCTs'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
 
                for commId in commIDs:
                    f.write('{} {}'.format('[RE1,'+ commMap[commId] +',*,*]:', '\n'))
                    f.write('{}{}{}'.format( years, ':=', '\n'))
                    for timesliceId in timesliceIDs:
                        ryctsString = ''
                        for yearId in yearIDs:
                            for sc in scOrder:
                                if rycts[id][sc['ScId']][yearId][commId][timesliceId] is not None and sc['Active'] == True:
                                    tmp = rycts[id][sc['ScId']][yearId][commId][timesliceId]
                            ryctsString += '{} '.format(tmp)
                        f.write('{} {}{}'.format(timesliceId, ryctsString, '\n'))
            f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))


            f.write('{}{}'.format('#', '\n'))
            f.write('{}'.format('end;'))
            f.close

            if not os.path.exists(Path(Config.DATA_STORAGE,self.case,'res', 'csv')):
                os.makedirs(Path(Config.DATA_STORAGE,self.case,'res', 'csv'))

        #ovako prosljedjujemo exception u prethodnom slucaju vracamo response u funkciju koja poziva writeFile
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def readDataFile( self ):
        try:
            if Config.AWS_STORAGE != 1:
                #f = open(self.dataFile, mode="r")
                f = open(self.dataFile, mode="r", encoding='utf-8-sig')
                data =  f.read()
                f.close
            else:
                s3 = S3()
                content_object = s3.resource.Object(Config.S3_BUCKET, self.dataFile.parent.name +'/'+ self.dataFile.name)
                file_content = content_object.get()['Body'].read().decode('utf-8')
                data = file_content
            # f = open(self.dataFile, 'r')
            # file_contents = f.read()
            # f.close()
            return data
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def run( self, solver ):
        try:
            modelfile = '"{}"'.format(self.osemosysFile.resolve())
            datafile = '"{}"'.format(self.dataFile.resolve())
            resultfile = '"{}"'.format(self.resFile.resolve())
            if solver == 'glpk':
                print(modelfile)
                print(datafile)
                print(resultfile)
                out = subprocess.run('glpsol -m ' + modelfile +' -d ' + datafile +' -o ' + resultfile, cwd=self.glpkFolder,  capture_output=True, text=True, shell=False)
                #out = subprocess.run('glpsol -m ' + modelfile +' -d ' + datafile +' -o ' + resultfile, cwd=self.casePath,  capture_output=True, text=True, shell=False)
            else:
                out = subprocess.run('cbc ' + modelfile +' -d ' + datafile +' -o ' + resultfile, cwd=self.cbcFolder,  capture_output=True, text=True, shell=True)
            if out.returncode != 0:
            
                response = {
                    "message": out.stdout,
                    "stdmsg": out.stderr,
                    "status_code": "error"
                }
            else:
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
    
    