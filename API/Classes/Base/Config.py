from pathlib import Path

UPLOAD_FOLDER = Path('WebAPP')
ALLOWED_EXTENSIONS = set(['zip', 'application/zip'])
DATA_STORAGE = Path("WebAPP", 'DataStorage')
EXTRACT_FOLDER = Path("")
SIM_PERIOD = 13
# PARAMETERS = {
#   "R": ["red", "white", "blue"],
#   "T": ["red", "white", "blue"],
#   "RT": ["red", "white", "blue"],
#   "RYT": ["VC", "AF", "CC", "FC", "RC", "TAMaxC", "TAMaxCI", "TAMinC", "TAMinCI", "TAL", "TAU" ]
# }
PARAMETERS = {
    "R": [{"DM": "Depreciation Method"}, {"DR": "Discount Rate"}],
    "T": [{"TMPAL": "Total Technology Model Period Activity Lower Limit"}, {"TMPAU": "Total Technology Model Period Activity Upper Limit"}],
    "RT": [{"CAU": "Capacity To Activity Unit"}, {"OL": "Operational Life"}],
    "RYT": 
    [
        {'id': "VC"       , 'value': "Variable Cost"},
        {'id': "AF"       , 'value': "Availability Factor "},
        {'id': "CC"       , 'value': "Capital Cost "},
        {'id': "FC"       , 'value': "Fixed Cost"},
        {'id': "RC"       , 'value': "Residual Capacity"},
        {'id': "TAMaxC"   , 'value': "Total Annual Max Capacity"},
        {'id': "TAMaxCI"  , 'value': "Total Annual Max Capacity Investment"},
        {'id': "TAMinC"   , 'value': "Total Annual Min Capacity"},
        {'id': "TAMinCI"  , 'value': "Total Annual Min Capacity Investment"},
        {'id': "TAL"      , 'value': "Total Technology Annual Activity Lower Limit"},
        {'id': "TAU"      , 'value': "Total Technology Annual Activity Upper Limit"}
    ],
    "RYTC": 
    [
        {'id': "IAR"       , 'value': "Input Activity Ratio"},
        {'id': "OAR"       , 'value': "Output Activity Ratio"}
    ],
    "RYTs": 
    [
        {'id': "YS"       , 'value': "Year Split"}
    ],
    "RYC": 
    [
        {"id": "AAD"       , "value": "Accumulated Annual Demand"},
        {"id": "SAD"       , "value": "Specified Annual Demand"}
    ],
    "RYE": 
    [
        {"id": "AEL"       , "value": "Annual Emission Limit"},
        {"id": "EP"       , "value": "Emissions Penalty"}
    ],
    "RYTTs": 
    [
        {'id': "CF"       , 'value': "Capacity Factor"}
    ],
    "RYCTs": 
    [
        {'id': "SDP"       , 'value': "Specified Demand Profile"}
    ],
    "RYTE": 
    [
        {'id': "EAR"       , 'value': "Emission Activity Ratio"}
    ]
}