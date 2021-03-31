from flask import Blueprint, request, jsonify, send_file
from zipfile import ZipFile
from pathlib import Path
from werkzeug.utils import secure_filename
import os
import json
import shutil
import glob

from Classes.Base import Config
from Classes.Base.S3 import S3

upload_api = Blueprint('UploadRoute', __name__)

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


# def uploadDirectory(path,bucketname):
#     for root,dirs,files in os.walk(path):
#         for file in files:
#             s3.meta.client.upload_file(os.path.join(root,file),bucketname,file)

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
        '''prvo ispitamo da li u Downloads folderu vec imamo backup case sa istim imenom''' 
        #case = request.form['case']
        #case = request.json['casename']
        case = request.args.get('case')

        casePath = Path('WebAPP', 'DataStorage',case)
        zippedFile = Path('WebAPP', 'DataStorage', case+'.zip')

        '''File system data storage'''
        if Config.AWS_STORAGE != 1:
            with ZipFile(zippedFile, 'w') as zipObj:
                # Iterate over all the files in directory
                for folderName, subfolders, filenames in os.walk(str(casePath)):
                    for filename in filenames:
                        #create complete filepath of file in directory
                        filePath = os.path.join(folderName, filename)
                        # Add file to zip
                        zipObj.write(filePath)      

            '''AWS S3 data storage'''
        else:
            #casePath = Path(pathHome, 'Downloads', case)
            '''download folder from S3 bucket'''
            downloadPath = Path('WebAPP', 'DataStorage')
            casePath = Path('WebAPP', 'DataStorage', case)
            s3 = S3()
            download_dir(case, downloadPath, Config.S3_BUCKET, client=s3.client)
            '''zip downloaded folder'''
            with ZipFile(zippedFile, 'w') as zipObj:
                # Iterate over all the files in directory
                for folderName, subfolders, filenames in os.walk(str(casePath)):
                    for filename in filenames:
                        #create complete filepath of file in directory
                        filePath = os.path.join(folderName, filename)
                        # Add file to zip
                        zipObj.write(filePath) 
            #remove downloaded folder from local
            shutil.rmtree(casePath)

        return send_file(zippedFile.resolve(), as_attachment=True)
        #return jsonify(response), 200
    except(IOError):
        return jsonify('No existing cases!'), 404
    except OSError:
        raise OSError

#####radi backup sa localnim i S3 storage
# @upload_api.route("/backupCase", methods=['POST'])
# def backupCase():
#     try:    
#         '''prvo ispitamo da li u Downloads folderu vec imamo backup case sa istim imenom''' 
#         #case = request.form['case']
#         case = request.json['casename']
#         casePath = Path('WebAPP', 'DataStorage',case)
#         pathHome = str(Path.home())
#         zipPath = Path(pathHome, 'Downloads')
#         zippedFile = Path(pathHome, 'Downloads', case+'.zip')
#         if(os.path.exists(zippedFile)):
#             response = {
#                 "message": 'Case <b>'+case + '.zip</b> already exists in <b>'+ str(zipPath) +'</b>!',
#                 "status_code": "warning"
#             }
#         else:
#             '''File system data storage'''
#             if Config.AWS_STORAGE != 1:
#                 casePath = Path('WebAPP', 'DataStorage', case)
#                 with ZipFile(zippedFile, 'w') as zipObj:
#                     # Iterate over all the files in directory
#                     for folderName, subfolders, filenames in os.walk(str(casePath)):
#                         for filename in filenames:
#                             #create complete filepath of file in directory
#                             filePath = os.path.join(folderName, filename)
#                             # Add file to zip
#                             zipObj.write(filePath)            
#                 response = {
#                     "message": 'Case <b>'+ case + '</b> is saved to <b>'+ str(zipPath) +'</b>!',
#                     "status_code": "success"
#                 }
#                 '''AWS S3 data storage'''
#             else:
#                 #casePath = Path(pathHome, 'Downloads', case)
#                 '''download folder from S3 bucket'''
#                 downloadPath = Path('WebAPP', 'DataStorage')
#                 casePath = Path('WebAPP', 'DataStorage', case)
#                 s3 = S3()
#                 download_dir(case, downloadPath, Config.S3_BUCKET, client=s3.client)
#                 '''zip downloaded folder'''
#                 with ZipFile(zippedFile, 'w') as zipObj:
#                     # Iterate over all the files in directory
#                     for folderName, subfolders, filenames in os.walk(str(casePath)):
#                         for filename in filenames:
#                             #create complete filepath of file in directory
#                             filePath = os.path.join(folderName, filename)
#                             # Add file to zip
#                             zipObj.write(filePath) 
#                 #remove downloaded folder from local
#                 #casePath = Path(zipPath, case)
#                 shutil.rmtree(casePath)
#                 response = {
#                         "message": 'Case <b>'+ case + '</b> is saved to <b>'+ str(zipPath) +'</b>!',
#                         "status_code": "success"
#                     }

#         return jsonify(response), 200
#     except(IOError):
#         return jsonify('No existing cases!'), 404
#     except OSError:
#         raise OSError

#File extension checking
def allowed_filename(filename):
    return '.' in filename and filename.rsplit('.',1)[1] in Config.ALLOWED_EXTENSIONS

@upload_api.route('/uploadCase', methods=['POST'])
def uploadCase():
    try:
        
        msg = []
        submitted_storage =  request.files.to_dict()
        for files in submitted_storage.items():
            file = files[1]
            submitted_file = file.filename
            
            case = os.path.splitext(submitted_file)[0]

            if Config.AWS_STORAGE != 1:
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




                # #check if case exists
                # if not os.path.exists(Path(Config.DATA_STORAGE,case)):
                #     if submitted_file and allowed_filename(submitted_file):
                #         filename = secure_filename(submitted_file)
                #         file.save(os.path.join(Config.DATA_STORAGE, filename))
                #         with ZipFile(os.path.join(Config.DATA_STORAGE, filename)) as zf:
                #             #lists = zf.namelist()
                #             genDataPath = 'WebAPP/DataStorage/'+case + '/genData.json'
                #             if genDataPath in zf.namelist():
                #                 data = json.loads(zf.read(genDataPath))
                #                 #name = data['else-version']
                #                 name = data.get('osy-version', None)
                #                 if name == '1.0':
                #                     zf.extractall(os.path.join(Config.EXTRACT_FOLDER))
                #                     msg.append({
                #                         "message": "Case " + case +" have been uploaded!",
                #                         "status_code": "success"
                #                     })
                #                 else:
                #                     msg.append({
                #                         "message": "Case " + case +" is not valid OSEMOSYS ver 1.0 case!",
                #                         "status_code": "error"
                #                     })
                #             else:
                #                 msg.append({
                #                     "message": "Case " + case +" is not valid OSEMOSYS ver 1.0 case!",
                #                     "status_code": "error"
                #                 })
                #         os.remove(os.path.join(Config.DATA_STORAGE, filename))
                # else:
                #     msg.append({
                #         "message": "Case " + case + " already exists!",
                #         "status_code": "warning"
                #     })
            else:
                # my_bucket = S3.resource.Bucket(Config.S3_BUCKET)
                # result = my_bucket.meta.client.list_objects(Bucket=my_bucket.name, Delimiter='/')
                # cases = [ f.get('Prefix')[:-1] for f in result.get('CommonPrefixes')]
                s3 = S3()
                cases = s3.getCases()
                #zippedFilePath = Path(pathHome, 'Downloads')
                if not (case in cases):
                    if submitted_file and allowed_filename(submitted_file):
                        filename = secure_filename(submitted_file)
                        file.save(os.path.join(Config.DATA_STORAGE, filename))
                        with ZipFile(os.path.join(Config.DATA_STORAGE, filename)) as zf:
                            #lists = zf.namelist()
                            genDataPath = 'WebAPP/DataStorage/'+case + '/genData.json'
                            if genDataPath in zf.namelist():
                                data = json.loads(zf.read(genDataPath))
                                #name = data['else-version']
                                name = data.get('osy-version', None)
                                if name == '1.0':
                                    zf.extractall(os.path.join(Config.EXTRACT_FOLDER))
                                    #uploadDirectory(Path(Config.DATA_STORAGE, case), Config.S3_BUCKET)

                                    localDir = Path(Config.DATA_STORAGE, case)
                                    awsInitDir = case
                                    bucketName = Config.S3_BUCKET
                                    upload_dir(s3, localDir, awsInitDir, bucketName, '*')
                                    msg.append({
                                        "message": "Case " + case +" have been uploaded!",
                                        "status_code": "success"
                                    })
                                else:
                                    msg.append({
                                        "message": "Case " + case +" is not valid OSEMOSYS ver 1.0 case!",
                                        "status_code": "error"
                                    })
                            else:
                                msg.append({
                                    "message": "Case " + case +" is not valid OSEMOSYS ver 1.0 case!",
                                    "status_code": "error"
                                })
                        
                        os.remove(os.path.join(Config.DATA_STORAGE, filename))
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