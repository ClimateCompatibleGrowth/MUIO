from pathlib import Path
import os
#from dotenv import load_dotenv
import platform

#load environment variables
#load_dotenv()

SYSTEM = platform.system()

# S3_BUCKET = os.environ.get("S3_BUCKET")
# S3_KEY = os.environ.get("S3_KEY")
# S3_SECRET = os.environ.get("S3_SECRET")

#S3 bucket is not used in Osemosys
S3_BUCKET = ""
S3_KEY = ""
S3_SECRET = ""

ALLOWED_EXTENSIONS = set(['zip', 'application/zip'])
ALLOWED_EXTENSIONS_XLS = set(['xls', 'xlsx'])

UPLOAD_FOLDER = Path('WebAPP')
WebAPP_PATH = Path('WebAPP')
DATA_STORAGE = Path("WebAPP", 'DataStorage')
CLASS_FOLDER = Path("WebAPP", 'Classes')
EXTRACT_FOLDER = Path("")
SOLVERs_FOLDER = Path('WebAPP', 'SOLVERs')


#absolute paths
# OSEMOSYS_ROOT = os.path.abspath(os.getcwd())
# UPLOAD_FOLDER = Path(OSEMOSYS_ROOT, 'WebAPP')
# WebAPP_PATH = Path(OSEMOSYS_ROOT, 'WebAPP')
# DATA_STORAGE = Path(OSEMOSYS_ROOT, "WebAPP", 'DataStorage')
# CLASS_FOLDER = Path(OSEMOSYS_ROOT, "WebAPP", 'Classes')
# EXTRACT_FOLDER = Path(OSEMOSYS_ROOT, "")
# SOLVERs_FOLDER = Path(OSEMOSYS_ROOT, 'WebAPP', 'SOLVERs')

os.chmod(DATA_STORAGE, 0o777)

HEROKU_DEPLOY = 0
AWS_SYNC = 0

PINNED_COLUMNS = ('Sc', 'Tech', 'Comm', 'Emis', 'Timeslice', 'MoO', 'UnitId')

TECH_GROUPS = ('RYT', 'RYTM', 'RYTC', 'RYTCn', 'RYTCM', 'RYTE', 'RYTEM', 'RYTTs')
COMM_GROUPS = ('RYC', 'RYTC', 'RYTCM','RYCTs')
EMIS_GROUPS = ('RYE', 'RYTE', 'RYTEM')

SINGLE_TECH_GROUPS = ['RT']
SINGLE_EMIS_GROUPS = ['RE']

DEFAULT_F ={
    "R"    : 'default_R',     
    "RT"   : 'default_RT',     
    "RY"   : 'default_RY',     
    "RE"   : 'default_RE',  
    "RYCn" : 'default_RYCn', 
    "RYTs" : 'default_RYTs',     
    "RYT"  : 'default_RYT',
    "RYTCn": 'default_RYTCn',    
    "RYTM" : 'default_RYTM',     
    "RYC"  : 'default_RYC',     
    "RYE"  : 'default_RYE',     
    "RYTC" : 'default_RYTC',  
    "RYTCM": 'default_RYTCM' ,   
    "RYTE" : 'default_RYTE',  
    "RYTEM": 'default_RYTEM' , 
    "RYTM" : 'default_RYTM',     
    "RYTTs": 'default_RYTTs',     
    "RYCTs": 'default_RYCTs'
}

UPDATE_F ={
    "R"    : 'update_R',     
    "RT"   : 'update_RT',     
    "RY"   : 'update_RY',     
    "RE"   : 'update_RE', 
    "RYCn" : 'update_RYCn',
    "RYTs" : 'update_RYTs',     
    "RYT"  : 'update_RYT',  
    "RYTCn": 'update_RYTCn',
    "RYTM" : 'update_RYTM',     
    "RYC"  : 'update_RYC',     
    "RYE"  : 'update_RYE',     
    "RYTC" : 'update_RYTC',  
    "RYTCM": 'update_RYTCM' ,   
    "RYTE" : 'update_RYTE',  
    "RYTEM": 'update_RYTEM' , 
    "RYTM" : 'update_RYTM',     
    "RYTTs": 'update_RYTTs',     
    "RYCTs": 'update_RYCTs'
}

GEN_F ={
    "R"    : 'gen_R',   
    "RT"   : 'gen_RT',     
    "RY"   : 'gen_RY',     
    "RE"   : 'gen_RE', 
    "RYCn" : 'gen_RYCn', 
    "RYTCn": 'gen_RYTCn',   
    "RYTs" : 'gen_RYTs',     
    "RYT"  : 'gen_RYT',  
    "RYTM" : 'gen_RYTM',     
    "RYC"  : 'gen_RYC',     
    "RYE"  : 'gen_RYE',     
    "RYTC" : 'gen_RYTC',  
    "RYTCM": 'gen_RYTCM' ,   
    "RYTE" : 'gen_RYTE',  
    "RYTEM": 'gen_RYTEM' , 
    "RYTM" : 'gen_RYTM',     
    "RYTTs": 'gen_RYTTs',     
    "RYCTs": 'gen_RYCTs'
}

#full var list 38
VARIABLES_C = {
        'NewCapacity':['r','t','y'],
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
        'EmissionByActivityChange':['r','t','e','m','y'],
        'AnnualTechnologyEmission':['r','t','e','y'],
        'AnnualEmissions':['r','e','y'],
        'DiscountedTechnologyEmissionsPenalty':['r','t','y'],
        'RateOfProductionByTechnology':['r','l','t','f','y'],
        'RateOfUseByTechnology':['r','l','t','f','y'],
        'UseByTechnology':['r','l','t','f','y'],
        'UseByTechnologyAnnual':['r','t','f','y'],
        'RateOfProductionByTechnologyByMode':['r','l','t','m','f','y'],
        'RateOfUseByTechnologyByMode':['r','l','t','m','f','y'],
        'TechnologyActivityChangeByMode':['r','t','m','y'],
        'TechnologyActivityChangeByModeCostTotal':['r','t','m','y'],
        'InputToNewCapacity':['r','t','f','y'],
        'InputToTotalCapacity':['r','t','f','y'],
        'DiscountedCapitalInvestment':['r','t','y'],
        'DiscountedOperatingCost':['r','t','y'],
        'TotalDiscountedCostByTechnology':['r','t','y'],
        'NewStorageCapacity':['r','s','y'],
        'SalvageValueStorage':['r','s','y'],
        'NumberOfNewTechnologyUnits':['r','t','y'],
        'Trade':['r','rr','l','f','y']
    }