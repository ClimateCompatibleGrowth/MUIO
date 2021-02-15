from flask import Blueprint, request, jsonify
from zipfile import ZipFile
from pathlib import Path
from werkzeug.utils import secure_filename
import os
import json

from Classes.Base import Config

upload_api = Blueprint('UploadRoute', __name__)

@upload_api.route("/backupCase", methods=['POST'])
def backupCase():
    try:        
        case = request.form['case']
        casePath = Path('WebAPP', 'DataStorage',case)
        pathHome = str(Path.home())
        #path_to_download_folder = str(os.path.join(Path.home(), "Downloads", self.casePath+'.zip'))
        zipPath = Path(pathHome, 'Downloads')
        zippedFile = Path(pathHome, 'Downloads', case+'.zip')
        if(os.path.exists(zippedFile)):
            #raise CustomException('Case <b>'+self.case + '_copy</b> already exists, please rename existing case first!', 600)
            response = {
                "message": 'Case <b>'+case + '.zip</b> already exists in <b>'+ str(zipPath) +'</b>!',
                "status_code": "warning"
            }
        else:
            with ZipFile(zippedFile, 'w') as zipObj:
                # Iterate over all the files in directory
                for folderName, subfolders, filenames in os.walk(str(casePath)):
                    for filename in filenames:
                        #create complete filepath of file in directory
                        filePath = os.path.join(folderName, filename)
                        # Add file to zip
                        zipObj.write(filePath)            
            response = {
                "message": 'Case <b>'+ case + '</b> is saved to <b>'+ str(zipPath) +'</b>!',
                "status_code": "success"
            }
        return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404
    except OSError:
        raise OSError

#File extension checking
def allowed_filename(filename):
    return '.' in filename and filename.rsplit('.',1)[1] in Config.ALLOWED_EXTENSIONS

@upload_api.route('/uploadCase', methods=['GET', 'POST'])
def uploadCase():
    try:
        if request.method == 'POST':
            msg = []
            
            submitted_storage =  request.files.to_dict()
            for files in submitted_storage.items():
                file = files[1]
                submitted_file = file.filename
                #check if case exists
                case = os.path.splitext(submitted_file)[0]
                if not os.path.exists(Path(Config.DATA_STORAGE,case)):
                    if submitted_file and allowed_filename(submitted_file):
                        filename = secure_filename(submitted_file)
                        file.save(os.path.join(Config.UPLOAD_FOLDER, filename))
                    
                        with ZipFile(os.path.join(Config.UPLOAD_FOLDER, filename)) as zf:
                            #lists = zf.namelist()
                            genDataPath = 'WebAPP/DataStorage/'+case + '/genData.json'
                            if genDataPath in zf.namelist():
                                data = json.loads(zf.read(genDataPath))
                                #name = data['else-version']
                                name = data.get('else-version', None)
                                if name == '1.0':
                                    zf.extractall(os.path.join(Config.EXTRACT_FOLDER))
                                    msg.append({
                                        "message": "Case " + case +" have been uploaded!",
                                        "status_code": "success"
                                    })
                                else:
                                    msg.append({
                                        "message": "Case " + case +" is not valid ELSE ver 1.0 case!",
                                        "status_code": "error"
                                    })
                            else:
                                msg.append({
                                    "message": "Case " + case +" is not valid ELSE ver 1.0 case!",
                                    "status_code": "error"
                                })
                        
                        os.remove(os.path.join(Config.UPLOAD_FOLDER, filename))


                else:
                    msg.append({
                        "message": "Case " + case + " already exists!",
                        "status_code": "warning"
                    })
            response = {
                "response" :msg
            }
        return jsonify(response), 200
    except(IOError):
        raise IOError
    except OSError:
        raise OSError