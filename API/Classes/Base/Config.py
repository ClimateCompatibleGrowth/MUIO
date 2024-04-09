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

PINNED_COLUMNS = ('Sc', 'Tech', 'Comm', 'Emis','Stg', 'Timeslice', 'MoO', 'UnitId')

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
    "RS"   : 'default_RS', 
    "RYCn" : 'default_RYCn', 
    "RYTs" : 'default_RYTs',     
    "RYT"  : 'default_RYT',
    "RYS"  : 'default_RYS',
    "RYTCn": 'default_RYTCn',    
    "RYTM" : 'default_RYTM',     
    "RYC"  : 'default_RYC',     
    "RYE"  : 'default_RYE',     
    "RYTC" : 'default_RYTC',  
    "RYTCM": 'default_RYTCM' , 
    "RYTSM": 'default_RYTSM' ,   
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
    "RS"   : 'update_RS',
    "RYCn" : 'update_RYCn',
    "RYTs" : 'update_RYTs',     
    "RYT"  : 'update_RYT', 
    "RYS"  : 'update_RYS',  
    "RYTCn": 'update_RYTCn',
    "RYTM" : 'update_RYTM',     
    "RYC"  : 'update_RYC',     
    "RYE"  : 'update_RYE',     
    "RYTC" : 'update_RYTC',  
    "RYTCM": 'update_RYTCM' ,  
    "RYTSM": 'update_RYTSM' ,   
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
    "RS"   : 'gen_RS',
    "RYCn" : 'gen_RYCn', 
    "RYTCn": 'gen_RYTCn',   
    "RYTs" : 'gen_RYTs',     
    "RYT"  : 'gen_RYT', 
    "RYS"  : 'gen_RYS', 
    "RYTM" : 'gen_RYTM',     
    "RYC"  : 'gen_RYC',     
    "RYE"  : 'gen_RYE',     
    "RYTC" : 'gen_RYTC',  
    "RYTCM": 'gen_RYTCM' , 
    "RYTSM": 'gen_RYTSM' ,  
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

#needed for validation of inputs
PARAMETERS_C = {
        'DiscountRate': ['r'],
        'OutputActivityRatio':['r','f','t','y','m'],
        'InputActivityRatio':['r','f','t','y','m'],
        'EmissionActivityRatio':['r','e''t','y','m'],
        'TotalAnnualMaxCapacityInvestment':['r','t','y'],
        'TotalAnnualMinCapacityInvestment':['r','t','y'],
        'TotalTechnologyAnnualActivityUpperLimit':['r','t','y'],
        'TotalTechnologyAnnualActivityLowerLimit':['r','t','y'],
        'TotalAnnualMaxCapacity':['r','t','y'],
        'ResidualCapacity': ['r','t','y'],
        'AvailabilityFactor': ['r','t','y'],
        'CapacityToActivityUnit': ['r','t'],
        'DiscountRateIdv': ['r','t'],
        'OperationalLife': ['r','t'],
        'TotalTechnologyModelPeriodActivityLowerLimit': ['r','t'],
        'TotalTechnologyModelPeriodActivityUpperLimit': ['r','t'],
        'CapacityFactor': ['r','t', 'y', 'l'],
        'YearSplit': ['r','y', 'l'],
        'SpecifiedDemandProfile': ['r','f','y','l']
    }

PARAMETERS_C_full = {
        'DiscountRate': ['r', 'DiscountRate'],
        'OutputActivityRatio':['r','f','t','y','m','OutputActivityRatio'],
        'InputActivityRatio':['r','f','t','y','m','InputActivityRatio'],
        'EmissionActivityRatio':['r','e','t','y','m','EmissionActivityRatio'],
        'TotalAnnualMaxCapacityInvestment':['r','t','y','TotalAnnualMaxCapacityInvestment'],
        'TotalAnnualMinCapacityInvestment':['r','t','y','TotalAnnualMinCapacityInvestment'],
        'TotalTechnologyAnnualActivityUpperLimit':['r','t','y','TotalTechnologyAnnualActivityUpperLimit'],
        'TotalTechnologyAnnualActivityLowerLimit':['r','t','y','TotalTechnologyAnnualActivityLowerLimit'],
        'TotalAnnualMaxCapacity':['r','t','y','TotalAnnualMaxCapacity'],
        'ResidualCapacity': ['r','t','y','ResidualCapacity'],
        'AvailabilityFactor': ['r','t','y','AvailabilityFactor'],
        'CapacityToActivityUnit': ['r','t','CapacityToActivityUnit'],
        'DiscountRateIdv': ['r','t','DiscountRateIdv'],
        'OperationalLife': ['r','t','OperationalLife'],
        'TotalTechnologyModelPeriodActivityLowerLimit': ['r','t','TotalTechnologyModelPeriodActivityLowerLimit'],
        'TotalTechnologyModelPeriodActivityUpperLimit': ['r','t','TotalTechnologyModelPeriodActivityUpperLimit'],
        'CapacityFactor': ['r','t', 'y', 'l','CapacityFactor'],
        'YearSplit': ['r','y', 'l','YearSplit'],
        'SpecifiedDemandProfile': ['r','f','y','l','SpecifiedDemandProfile']
    }

