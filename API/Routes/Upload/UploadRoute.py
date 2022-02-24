from flask import Blueprint, request, jsonify, send_file
from zipfile import ZipFile
from pathlib import Path
from werkzeug.utils import secure_filename
import os
import json
import glob

from API.Classes.Base import Config

upload_api = Blueprint('UploadRoute', __name__)

#File extension checking
def allowed_filename(filename):
    return '.' in filename and filename.rsplit('.',1)[1] in Config.ALLOWED_EXTENSIONS

def download_dir(prefix, local, bucket, client):
    """
    params:
    - prefix: pattern to match in s3
    - local: local path to folder in which to place files
    - bucket: s3 bucket with target contents
    - client: initialized s3 client object
    """
    keys = []
    dirs = []
    next_token = ''
    base_kwargs = {
        'Bucket':bucket,
        'Prefix':prefix,
    }
    while next_token is not None:
        kwargs = base_kwargs.copy()
        if next_token != '':
            kwargs.update({'ContinuationToken': next_token})
        results = client.list_objects_v2(**kwargs)
        contents = results.get('Contents')
        for i in contents:
            k = i.get('Key')
            if k[-1] != '/':
                keys.append(k)
            else:
                dirs.append(k)
        next_token = results.get('NextContinuationToken')
    for d in dirs:
        dest_pathname = os.path.join(local, d)
        if not os.path.exists(os.path.dirname(dest_pathname)):
            os.makedirs(os.path.dirname(dest_pathname))
    for k in keys:
        dest_pathname = os.path.join(local, k)
        if not os.path.exists(os.path.dirname(dest_pathname)):
            os.makedirs(os.path.dirname(dest_pathname))
        client.download_file(bucket, k, dest_pathname)

def upload_dir(s3, localDir, awsInitDir, bucketName, tag, prefix='\\'):
    """
    from current working directory, upload a 'localDir' with all its subcontents (files and subdirectories...)
    to a aws bucket
    Parameters
    ----------
    localDir :   localDirectory to be uploaded, with respect to current working directory
    awsInitDir : prefix 'directory' in aws
    bucketName : bucket in aws
    tag :        tag to select files, like *png
                 NOTE: if you use tag it must be given like --tag '*txt', in some quotation marks... for argparse
    prefix :     to remove initial '/' from file names

    Returns
    -------
    None
    """

    # mydirs daje listu svvih file i folder u localDir npr WebApp/DataStorage/Demo/genData.json
    mydirs = list(localDir.glob('**'))
    for mydir in mydirs:
        fileNames = glob.glob(os.path.join(mydir, tag))
        fileNames = [f for f in fileNames if not Path(f).is_dir()]
        #rows = len(fileNames)
        for i, FullfileName in enumerate(fileNames):
            #dobijemo ime file npr, genData.json
            fileName = str(FullfileName).replace(str(localDir), '')
            if fileName.startswith(prefix):  # only modify the text if it starts with the prefix
                fileName = fileName.replace(prefix, "", 1) # remove one instance of prefix
                fileName = fileName.replace('\\', '/')

            awsPath = str(awsInitDir) + '/' + str(fileName)
            # S3.resource.meta.client.upload_file(FullfileName, bucketName, awsPath)
            s3.resource.meta.client.upload_file(FullfileName, bucketName, awsPath)

@upload_api.route("/backupCase", methods=['GET'])
def backupCase():
    try:    
        #case = request.form['case']
        #case = request.json['casename']
        case = request.args.get('case')

        casePath = Path('WebAPP', 'DataStorage',case)
        zippedFile = Path('WebAPP', 'DataStorage', case+'.zip')

        '''File system data storage'''
        with ZipFile(zippedFile, 'w') as zipObj:
            # Iterate over all the files in directory
            for folderName, subfolders, filenames in os.walk(str(casePath)):
                for filename in filenames:
                    #create complete filepath of file in directory
                    filePath = os.path.join(folderName, filename)
                    # Add file to zip
                    zipObj.write(filePath)      


        return send_file(zippedFile.resolve(), as_attachment=True)
        #return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404
    except OSError:
        raise OSError

@upload_api.route('/uploadCase', methods=['POST'])
def uploadCase():
    try:
        
        msg = []
        submitted_storage =  request.files.to_dict()
        for files in submitted_storage.items():
            file = files[1]
            submitted_file = file.filename
            
            case = os.path.splitext(submitted_file)[0]

            if submitted_file and allowed_filename(submitted_file):
                filename = secure_filename(submitted_file)
                #spasiti zip u data storage
                file.save(os.path.join(Config.DATA_STORAGE, filename))
                #zipfiles = []
                with ZipFile(os.path.join(Config.DATA_STORAGE, filename)) as zf:
                    errorcode = 1
                    for zippedfile in zf.namelist():
                        # one = zippedfile
                        # two = Path(zippedfile)
                        # name = two.name
                        #zipfiles.append(Path(zippedfile).name)
                        zippedfilepath = Path(zippedfile)
                        zippedfilename = zippedfilepath.name
                        casename = zippedfilepath.parent.name
                        if 'genData.json' == zippedfilename:
                            errorcode = 0
                            
                            if not os.path.exists(Path(Config.DATA_STORAGE,casename)):
                                data = json.loads(zf.read(zippedfile))
                                #name = data['else-version']
                                name = data.get('osy-version', None)
                                if name == '1.0':
                                    zf.extractall(os.path.join(Config.EXTRACT_FOLDER))
                                    msg.append({
                                        "message": "Case " + casename +" have been uploaded!",
                                        "status_code": "success",
                                        "casename": casename
                                    })
                                else:
                                    msg.append({
                                        "message": "Case " + casename +" is not valid OSEMOSYS ver 1.0 case!",
                                        "status_code": "error"
                                    })
                            else:
                                msg.append({
                                    "message": "Case " + casename + " already exists!",
                                    "status_code": "warning"
                                })
                            
                    if errorcode == 1:
                        msg.append({
                            "message": "ZIP archive " + case +" is not valid archive!",
                            "status_code": "error"
                        })
                os.remove(os.path.join(Config.DATA_STORAGE, filename))
        
        response = {
            "response" :msg
        }

        return jsonify(response), 200
    except(IOError):
        raise IOError
    except OSError:
        raise OSError