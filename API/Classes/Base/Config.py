from pathlib import Path
import os
from dotenv import load_dotenv

#load environment variables
load_dotenv()

S3_BUCKET = os.environ.get("S3_BUCKET")
S3_KEY = os.environ.get("S3_KEY")
S3_SECRET = os.environ.get("S3_SECRET")

UPLOAD_FOLDER = Path('WebAPP')
ALLOWED_EXTENSIONS = set(['zip', 'application/zip'])
DATA_STORAGE = Path("WebAPP", 'DataStorage')
S3_BUCKET_LOCAL = Path("WebAPP", 'S3BucketLocal')
CLASS_FOLDER = Path("WebAPP", 'Classes')
EXTRACT_FOLDER = Path("")
SOLVERs_FOLDER = Path('API', 'SOLVERs')
HEROKU_DEPLOY = 0
AWS_STORAGE = 0
AWS_SYNC = 0

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
