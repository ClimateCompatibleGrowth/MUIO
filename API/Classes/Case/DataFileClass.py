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

    def generateDatafile( self ):
        try:
            defaultValue = self.getParamDefaultValues()
            emiIDs = self.getEmiIds()
            techIDs = self.getTechIds()
            commIDs = self.getCommIds()

            emiMap = self.getEmisMap()
            techMap = self.getTechsMap()
            commMap = self.getCommsMap()
            
            yearIDs = self.getYears()
            timesliceIDs = self.getTimeslices()

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
            f.write('{} {} {} {}{}{}'.format('set', 'MODE_OF_OPERATION',':=', '1', ';', '\n'))
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
            r = self.R()
            for id, param in self.PARAM['R'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                f.write('{} {} {}'.format('RE1', r[id], '\n'))
                f.write('{} {}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #next(iter(word_freq.items()))[1]
            #next(iter(commId))

            #T
            t = self.T()
            for id, param in self.PARAM['T'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format( techs, ':=', '\n'))
                rtString = ''
                for techId in techIDs:
                    rtString += '{} '.format(t[id][techId])
                f.write('{} {}{}'.format('RE1 ', rtString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RT
            rt = self.RT()
            for id, param in self.PARAM['RT'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format(techs, ':=', '\n'))
                rtString = ''
                for techId in techIDs:
                    rtString += '{} '.format(rt[id][techId])
                f.write('{}{}{}'.format('RE1 ', rtString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RE
            re = self.RE()
            for id, param in self.PARAM['RE'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format(emis, ':=', '\n'))
                reString = ''
                for emiId in emiIDs:
                    reString += '{} '.format(re[id][emiId])
                f.write('{}{}{}'.format('RE1 ', reString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RY
            ry = self.RY(File.readFile(self.ryPath))
            for id, param in self.PARAM['RY'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':','\n'))
                f.write('{}{}{}'.format(years, ':=', '\n'))
                ryString = ''
                for yearId in yearIDs:
                    ryString += '{} '.format(ry[id][yearId])
                f.write('{}{}{}'.format('RE1 ', ryString, '\n'))
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
                        rycString += '{} '.format(ryc[id][yearId][commId])
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
                        ryeString += '{} '.format(rye[id][yearId][emiId])
                    f.write('{} {}{}'.format(emiMap[emiId], ryeString, '\n'))
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
                            rytString += '{} '.format(ryt[id][yearId][techId])
                        f.write('{} {}{}'.format(techMap[techId], rytString, '\n'))
                    f.write('{}{}'.format(';', '\n'))
                else:
                    f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                    for techId in techIDs:
                        f.write('{} {}'.format('[RE1,'+ techMap[techId] +',*,*]:', '\n'))
                        f.write('{}{}{}'.format(years, ':=', '\n'))
                        rytString = ''
                        for yearId in yearIDs:
                            rytString += '{} '.format(ryt[id][yearId][techId])
                        f.write('{} {}{}'.format(1, rytString, '\n'))
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
                            ryttsString += '{} '.format(rytts[id][yearId][techId][timesliceId])
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
                            ryctsString += '{} '.format(rycts[id][yearId][commId][timesliceId])
                        f.write('{} {}{}'.format(timesliceId, ryctsString, '\n'))
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
                        rytsString += '{} '.format(ryts[yearId][timesliceId])
                    f.write('{} {}{}'.format(timesliceId, rytsString, '\n'))
            f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))

            #RYTC
            rytc = self.RYTC(File.readFile(self.rytcPath))
            for id, param in self.PARAM['RYTC'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                for activityTechId in activityTechIDs[id]:
                    for activityCommId in activityCommIDs[id][activityTechId]:
                        f.write('{}{}'.format('[RE1,'+ techMap[activityTechId] + ','+ commMap[activityCommId] +',*,*]:', '\n'))
                        f.write('{}{}{}'.format( years, ':=', '\n'))
                        rytcString = ''
                        for yearId in yearIDs:
                            rytcString += '{} '.format(rytc[id][yearId][activityTechId][activityCommId])
                        f.write('{} {}{}'.format(1, rytcString, '\n'))
                f.write('{}{}'.format(';', '\n'))
            f.write('{}{}'.format('', '\n'))


            #RYTE
            ryte = self.RYTE(File.readFile(self.rytePath))
            for id, param in self.PARAM['RYTE'].items():
                f.write('{} {} {} {} {} {}'.format('param', param,'default', defaultValue[id], ':=','\n'))
                for emissionTechId in emissionTechIDs[id]:
                    for activityEmissionId in activityEmissionIDs[id][emissionTechId]:
                        f.write('{}{}'.format('[RE1,'+ techMap[emissionTechId] +  ','+ emiMap[activityEmissionId] + ',*,*]:', '\n'))
                        f.write('{}{}{}'.format( years, ':=', '\n'))
                        ryteString = ''
                        for yearId in yearIDs:
                            ryteString += '{} '.format(ryte[id][yearId][emissionTechId][activityEmissionId])
                        f.write('{} {}{}'.format(1, ryteString, '\n'))
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

    def generateDatafile_bkp( self ):
        try:
            emiIDs = self.getEmiIds()
            techIDs = self.getTechIds()
            commIDs = self.getCommIds()
            yearIDs = self.getYears()
            timesliceIDs = self.getTimeslices()

            activityTechIDs = self.getActivityTechIds()
            activityCommIDs = self.getActivityCommIds()

            emissionTechIDs = self.getActivityEmissionTechIds()
            activityEmissionIDs = self.getActivityEmisionIds()

            emis = ''
            for emiId in emiIDs:
                emis += '{:<50}'.format(emiId) 

            techs = ''
            for techId in techIDs:
                techs += '{:<50}'.format(techId) 

            comms = ''
            for commId in commIDs:
                comms += '{:<50}'.format(commId) 

            years = ''
            for yearId in yearIDs:
                years += '{:<50}'.format(yearId)

            timeslices = ''
            for timesliceId in timesliceIDs:
                timeslices += '{:<50}'.format(timesliceId)

            #path = '"{}"'.format(self.resPath.resolve())

            if Config.AWS_STORAGE != 1:
                f = open(self.dataFile, mode="w")
            else:
                '''ako se koristi aws S3 storage direktno'''
                if not os.path.exists(Path(Config.S3_BUCKET_LOCAL,self.case)):
                    os.makedirs(Path(Config.S3_BUCKET_LOCAL,self.case))
                f = open(self.dataFileS3, mode="w")

            #f.write(json.dumps(data, ensure_ascii=False,  indent=4, sort_keys=False))
            f.write('####################\n#    Sets    #\n####################\n')
            f.write('{:<50}{}'.format('#', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'EMISSION',':=', emis, ';', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'REGION',':=', 'RE1', ';', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'MODE_OF_OPERATION',':=', '1', ';', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'COMMODITY',':=', comms, ';', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'STORAGE',':=','', ';', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'TECHNOLOGY',':=', techs, ';', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'YEAR',':=', years, ';', '\n'))
            f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('set', 'TIMESLICE',':=', timeslices, ';', '\n'))

            f.write('####################\n#     Parameters     #\n####################\n')
            # f.write('{:<50}{}'.format('#', '\n'))
            # f.write('{:<50}{:<50}{:<50}{}{:<50}{}'.format('param', 'ResultsPath',':=', path, ';', '\n'))
            # f.write('{:<50}{}'.format('', '\n'))

            #R
            r = self.R()
            for id, param in self.PARAM['R'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
                f.write('{:<50}{}{}'.format('RE1', r[id], '\n'))
                f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #T
            t = self.T()
            for id, param in self.PARAM['T'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':','\n'))
                f.write('{}{:<50}{}'.format( techs, ':=', '\n'))
                rtString = ''
                for techId in techIDs:
                    rtString += '{:<50f}'.format(t[id][techId])
                f.write('{:<50}{}{}'.format('RE1', rtString, '\n'))
                f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #RT
            rt = self.RT()
            for id, param in self.PARAM['RT'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':','\n'))
                f.write('{}{:<50}{}'.format(techs, ':=', '\n'))
                rtString = ''
                for techId in techIDs:
                    rtString += '{:<50f}'.format(rt[id][techId])
                f.write('{:<50}{}{}'.format('RE1', rtString, '\n'))
                f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #RYC
            #ryc = self.RYC(self.getJsonData('RYC.json'))
            ryc = self.RYC(File.readFile(self.rycPath))
            for id, param in self.PARAM['RYC'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
                f.write('{:<50}{}'.format('[RE1,*,*]:', '\n'))
                f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
                for commId in commIDs:
                    rycString = ''
                    for yearId in yearIDs:
                        rycString += '{:<50f}'.format(ryc[id][yearId][commId])
                    f.write('{:<50}{}{}'.format(commId, rycString, '\n'))
                f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #RYE 
            rye = self.RYE(File.readFile(self.ryePath))
            for id, param in self.PARAM['RYE'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
                f.write('{:<50}{}'.format('[RE1,*,*]:', '\n'))
                f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
                for emiId in emiIDs:
                    ryeString = ''
                    for yearId in yearIDs:
                        ryeString += '{:<50}'.format(rye[id][yearId][emiId])
                    f.write('{:<50}{}{}'.format(emiId, ryeString, '\n'))
                f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #RYT
            ryt = self.RYT(File.readFile(self.rytPath))
            for id, param in self.PARAM['RYT'].items():
                if id != 'VC':
                    f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
                    f.write('{:<50}{}'.format('[RE1,*,*]:', '\n'))
                    f.write('{}{:<50}{}'.format( years, ':=', '\n'))
                    for techId in techIDs:
                        rytString = ''
                        for yearId in yearIDs:
                            rytString += '{:<50}'.format(ryt[id][yearId][techId])
                        f.write('{:<50}{}{}'.format(techId, rytString, '\n'))
                    f.write('{:<50}{}'.format(';', '\n'))
                else:
                    f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
                    for techId in techIDs:
                        f.write('{:<50}{}'.format('[RE1,'+ techId +',*,*]:', '\n'))
                        f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
                        rytString = ''
                        for yearId in yearIDs:
                            rytString += '{:<50}'.format(ryt[id][yearId][techId])
                        f.write('{:<50}{}{}'.format(1, rytString, '\n'))
                    f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #RYTTs
            rytts = self.RYTTs(File.readFile(self.ryttsPath))
            for id, param in self.PARAM['RYTTs'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
 
                for techId in techIDs:
                    f.write('{:<50}{}'.format('[RE1,'+ techId +',*,*]:', '\n'))
                    f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
                    for timesliceId in timesliceIDs:
                        ryttsString = ''
                        for yearId in yearIDs:
                            ryttsString += '{:<50}'.format(rytts[id][yearId][techId][timesliceId])
                        f.write('{:<50}{}{}'.format(timesliceId, ryttsString, '\n'))
            f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #RYCTs
            rycts = self.RYCTs(File.readFile(self.ryctsPath))
            for id, param in self.PARAM['RYCTs'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
 
                for commId in commIDs:
                    f.write('{:<50}{}'.format('[RE1,'+ commId +',*,*]:', '\n'))
                    f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
                    for timesliceId in timesliceIDs:
                        ryctsString = ''
                        for yearId in yearIDs:
                            ryctsString += '{:<50}'.format(rycts[id][yearId][commId][timesliceId])
                        f.write('{:<50}{}{}'.format(timesliceId, ryctsString, '\n'))
            f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            #RYTs
            ryts = self.RYTs(File.readFile(self.rytsPath))
            for id, param in self.PARAM['RYTs'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':','\n'))
                f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
                for timesliceId in timesliceIDs:
                    rytsString = ''
                    for yearId in yearIDs:
                        rytsString += '{:<50}'.format(ryts[yearId][timesliceId])
                    f.write('{:<50}{}{}'.format(timesliceId, rytsString, '\n'))
            f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))

            # #RYTC
            # rytc = self.RYTC(File.readFile(self.rytcPath))
            # for id, param in self.PARAM['RYTC'].items():
            #     f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
            #     #for activityTechId in activityTechIDs[id]:
            #     for techId in techIDs:
            #         # f.write('{:<50}{}'.format('[RE1,'+ activityTechId +',*,*]:', '\n'))
            #         # f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
            #         #for activityCommId in activityCommIDs[id][activityTechId]:
            #         for commId in commIDs:
            #             f.write('{:<50}{}'.format('[RE1,'+ techId + ','+ commId +',*,*]:', '\n'))
            #             f.write('{}{:<50}{}'.format( years, ':=', '\n'))
            #             rytcString = ''
            #             for yearId in yearIDs:
            #                 if self.keys_exists(rytc, id, yearId, techId, commId):
            #                     rytcString += '{:<50}'.format(rytc[id][yearId][techId][commId])
            #                 else:
            #                     rytcString += '{:<50}'.format(0)
            #             f.write('{:<50}{}{}'.format(1, rytcString, '\n'))
            #     f.write('{:<50}{}'.format(';', '\n'))
            # f.write('{:<50}{}'.format('', '\n'))


            # #RYTE
            # ryte = self.RYTE(File.readFile(self.rytePath))
            # for id, param in self.PARAM['RYTE'].items():
            #     f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
            #     for techId in techIDs:
            #     #for emissionTechId in emissionTechIDs[id]:
            #         for emiId in emiIDs:
            #         #for activityEmissionId in activityEmissionIDs[id][techId]:
            #             f.write('{:<50}{}'.format('[RE1,'+ techId +  ','+ emiId + ',*,*]:', '\n'))
            #             f.write('{}{:<50}{}'.format( years, ':=', '\n'))
            #             ryteString = ''
            #             for yearId in yearIDs:
            #                 if self.keys_exists(ryte, id, yearId, techId, emiId):
            #                     ryteString += '{:<50}'.format(ryte[id][yearId][techId][emiId])
            #                 else:
            #                     ryteString += '{:<50}'.format(0)
            #             f.write('{:<50}{}{}'.format(1, ryteString, '\n'))
            #     f.write('{:<50}{}'.format(';', '\n'))
            # f.write('{:<50}{}'.format('', '\n'))


            #RYTC
            rytc = self.RYTC(File.readFile(self.rytcPath))
            for id, param in self.PARAM['RYTC'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
                for activityTechId in activityTechIDs[id]:
                    # f.write('{:<50}{}'.format('[RE1,'+ activityTechId +',*,*]:', '\n'))
                    # f.write('{:<50}{}{:<50}{}'.format('', years, ':=', '\n'))
                    for activityCommId in activityCommIDs[id][activityTechId]:
                        f.write('{:<50}{}'.format('[RE1,'+ activityTechId + ','+ activityCommId +',*,*]:', '\n'))
                        f.write('{}{:<50}{}'.format( years, ':=', '\n'))
                        rytcString = ''
                        for yearId in yearIDs:
                            rytcString += '{:<50}'.format(rytc[id][yearId][activityTechId][activityCommId])
                        f.write('{:<50}{}{}'.format(1, rytcString, '\n'))
                f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))


            #RYTE
            ryte = self.RYTE(File.readFile(self.rytePath))
            for id, param in self.PARAM['RYTE'].items():
                f.write('{:<50}{:<50}{:<50}{:<50}{:<50}{}'.format('param', param,'default', '0', ':=','\n'))
                for emissionTechId in emissionTechIDs[id]:
                    for activityEmissionId in activityEmissionIDs[id][emissionTechId]:
                        f.write('{:<50}{}'.format('[RE1,'+ emissionTechId +  ','+ activityEmissionId + ',*,*]:', '\n'))
                        f.write('{}{:<50}{}'.format( years, ':=', '\n'))
                        ryteString = ''
                        for yearId in yearIDs:
                            ryteString += '{:<50}'.format(ryte[id][yearId][emissionTechId][activityEmissionId])
                        f.write('{:<50}{}{}'.format(1, ryteString, '\n'))
                f.write('{:<50}{}'.format(';', '\n'))
            f.write('{:<50}{}'.format('', '\n'))


            f.write('{:<50}{}'.format('#', '\n'))
            f.write('{:<50}'.format('end;'))
            f.close

            if not os.path.exists(Path(Config.DATA_STORAGE,self.case,'res', 'csv')):
                os.makedirs(Path(Config.DATA_STORAGE,self.case,'res', 'csv'))

            # if Config.AWS_SYNC == 1:
            #     s3 = SyncS3()
            #     awsPath = str(self.case) + '/data.txt'
            #     s3.updateSync(str(self.dataFileS3), awsPath, Config.S3_BUCKET)
            #     #s3.resource.meta.client.upload_file(str(self.dataFileS3), Config.S3_BUCKET, awsPath )            

        # except(IOError, IndexError):
        #     return('File not found or file is empty')
        #ovako prosljedjujemo exception u prethodnom slucaju vracamo response u funkciju koja poziva writeFile
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError

    def readDataFile( self ):
        try:
            if Config.AWS_STORAGE != 1:
                f = open(self.dataFile, mode="r")
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

    # def downloadDataFile( self ):
    #     try:
    #         pathHome = str(Path.home())
    #         downloadPath = Path(pathHome, 'Downloads')
    #         dataFilePath = Path(downloadPath, 'data.txt')
            
    #         datafile = self.readDataFile()
    #         f = open(dataFilePath, mode="w")
    #         f.write(datafile)
    #         f.close

    #         return downloadPath
    #         # urllib.request.urlretrieve(self.dataFile, dataFile)
    #     except(IOError, IndexError):
    #         raise IndexError
    #     except OSError:
    #         raise OSError

    def run( self, solver ):
        try:
            modelfile = '"{}"'.format(self.osemosysFile.resolve())
            datafile = '"{}"'.format(self.dataFile.resolve())
            resultfile = '"{}"'.format(self.resFile.resolve())
            if solver == 'glpk':
                out = subprocess.run('glpsol -m ' + modelfile +' -d ' + datafile +' -o ' + resultfile, cwd=self.glpkFolder,  capture_output=True, text=True, shell=True)
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
    
    