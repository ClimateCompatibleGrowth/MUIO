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
HEROKU_DEPLOY = 1
AWS_STORAGE = 0
AWS_SYNC = 0

TECH_GROUPS = ('RYT', 'RYTC', 'RYTE', 'RYTTs')
COMM_GROUPS = ('RYC', 'RYTC', 'RYCTs')
EMIS_GROUPS = ('RYE', 'RYTE')
