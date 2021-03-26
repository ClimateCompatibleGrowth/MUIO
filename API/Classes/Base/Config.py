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
GLPK_FOLDER = Path('API', 'GLPK')
HEROKU_DEPLOY = 0
AWS_STORAGE = 0
AWS_SYNC = 0


# PARAMS = {
#     "R": 
#     {
#         "DM": "DepreciationMethod",
#         "DR": "DiscountRate"
#     },
#     "T": 
#     {
#         "TMPAL": "TotalTechnologyModelPeriodActivityLowerLimit",
#         "TMPAU": "TotalTechnologyModelPeriodActivityUpperLimit"
#     },
#     "RT": 
#     {
#             "CAU": "CapacityToActivityUnit",
#             "OL": "OperationalLife"
#     },
#     "RYT": 
#     {
#         "VC"       : "VariableCost",
#         "AF"       : "AvailabilityFactor",
#         "CC"       : "CapitalCost",
#         "FC"       : "FixedCost",
#         "RC"       : "ResidualCapacity",
#         "TAMaxC"   : "TotalAnnualMaxCapacity",
#         "TAMaxCI"  : "TotalAnnualMaxCapacityInvestment",
#         "TAMinC"   : "TotalAnnualMinCapacity",
#         "TAMinCI"  : "TotalAnnualMinCapacityInvestment",
#         "TAL"      : "TotalTechnologyAnnualActivityLowerLimit",
#         "TAU"      : "TotalTechnologyAnnualActivityUpperLimit"
#     },
#     "RYTC": 
#     {
#             "IAR": "InputActivityRatio",
#             "OAR": "OutputActivityRatio"
#     },
#     "RYTs": 
#         {"YS": "YearSplit"},
#     "RYC": 
#         {
#         "AAD": "AccumulatedAnnualDemand",
#         "SAD": "SpecifiedAnnualDemand"
#         },
#     "RYE": 
#         {
#             "AEL": "AnnualEmissionLimit",
#             "EP": "EmissionsPenalty"
#         },
#     "RYTTs": 
#         {"CF": "CapacityFactor"},
#     "RYCTs": 
#     {
#         "SDP": "SpecifiedDemandProfile"
#     },
#     "RYTE": 
#         {
#             "EAR": "EmissionActivityRatio"
#         }
# }