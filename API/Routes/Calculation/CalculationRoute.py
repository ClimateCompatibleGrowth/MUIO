from flask import Blueprint, jsonify, request, session
import os
import json
import pandas as pd
from pathlib import Path

from Classes.Base import Config
from Classes.Base.FileClass import File

calc_api = Blueprint('CalculationRoute', __name__)

@calc_api.route("/normalizePattern", methods=['POST'])
def normalizePattern():
    try:
        casename = request.json['casename']

        if casename != None:
            genDataPath = Path(Config.DATA_STORAGE, casename, "genData.json")
            hDataPath = Path(Config.DATA_STORAGE, casename, "hData.json")
            tDataPath = Path(Config.DATA_STORAGE, casename, "tData.json")

            genData = File.readFile(genDataPath)
            hData = File.readFile(hDataPath)
            tData = File.readFile(tDataPath)

            YEARS = genData['osy-years']
            UNITS = [unit['UnitId'] for unit in genData['osy-units'] ]

            GD = pd.json_normalize(genData,  "osy-units")
            TD = pd.DataFrame(tData)

            def egFunc(unit,year):
                ic = GD[GD.UnitId == unit].values[0, 5]
                cf = TD[(TD.UnitId == unit) & (TD.Year == year)].values[0, 3]
                return ic * cf * Config.SIM_PERIOD  

            # EG = {}
            # for unit in UNITS:
            #     EG[unit] = {}
            #     ic = GD[GD.UnitId == unit].iat[0, 5]
            #     for year in YEARS:
            #         cf = TD[(TD.UnitId == unit) & (TD.Year == year)].iat[0, 3]
            #         EG[unit][year] = ic * cf * 8760 
            #EG2 = { year: { unit: egFunc(unit, year) for unit in UNITS  } for year in YEARS }
            EG = { unit: { year: egFunc(unit, year) for year in YEARS  } for unit in UNITS }

            EG = pd.DataFrame.from_dict(EG)
            EG['SUM'] = EG.sum(axis=1)

            HDP = {}
            LF = {}
            CF = {}
            PMAX = {}
            NHDP = {}
            NHP = {}
            HD = {}
            HG = {}

            JSON = {}
            COLUMN_NAMES = ["Hour", "Demand"] + UNITS
            HOUR = [i for i in range(1, Config.SIM_PERIOD)]

            for year in YEARS:
                CF[year] = {}
                NHP[year] = {}
                HG[year] = {}
                HDP[year] = pd.json_normalize(hData, year)
                LF[year] = HDP[year]['Demand'].sum() / (HDP[year]['Demand'].max() * Config.SIM_PERIOD /100)
                PMAX[year] = EG.at[year, 'SUM']  / (LF[year] * Config.SIM_PERIOD /100) * 1000
                NHDP[year] = HDP[year]['Demand'] / HDP[year]['Demand'].max()
                HD[year] = NHDP[year] * PMAX[year]
                #data frame za upis u file
                df = pd.DataFrame(columns = COLUMN_NAMES)
                df['Hour'] = HOUR
                df['Demand'] = HD[year]
                for unit in UNITS:
                    CF[year][unit] = HDP[year][unit].sum() / ( HDP[year][unit].max() * Config.SIM_PERIOD /100 )
                    NHP[year][unit] = HDP[year][unit] / HDP[year][unit].max()
                    HG[year][unit] = NHP[year][unit] * TD[(TD.UnitId == unit) & (TD.Year == year)].values[0, 2]
                #data frame za upis u file i punjenje glavnog JSON za upis
                    df[unit] = HG[year][unit]
                JSON[year] = json.loads(df.to_json( orient='records'))

            #hDataPath = Path(Config.DATA_STORAGE, casename, "calc", "hData.json")
            #File.writeFile( JSON, hDataPath)
            response = JSON
        else:
            response = None

        return jsonify(response), 200
    except(IOError):
        return jsonify('Error saving case IOError!'), 404

    ######################3citsti DICT
        # hData = {}
        # for year in years:
        #     hData[year] = {}
        #     for i in range(10):
        #         hData[year][i] = {}
        #         hData[year][i]['Hour'] = i 
        #         for unit in units:
        #             if unit['int']:
        #                 hData[year][i][unit['unitId']] = 0 
