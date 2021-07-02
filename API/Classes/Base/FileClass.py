#import ujson as json
import json
from pathlib import Path
from Classes.Base import Config
from Classes.Base.S3 import S3

class File:
    @staticmethod
    def readFile(path):
        try:
            if Config.AWS_STORAGE != 1:    
                f = open(path, mode="r")
                data = json.loads(f.read())
                f.close
            else:
                s3 = S3()
                content_object = s3.resource.Object(Config.S3_BUCKET, path.parent.name +'/'+ path.name)
                file_content = content_object.get()['Body'].read().decode('utf-8')
                data = json.loads(file_content)
            return data
        except( IndexError):
            raise IndexError
        except(IOError):
            raise IOError
        except OSError:
            raise OSError

    @staticmethod
    def writeFile(data, path):
        try:
            if Config.AWS_STORAGE != 1:
                f = open(path, mode="w")
                #json
                # f.write(json.dumps(data, ensure_ascii=False, separators=(',', ':')))
                f.write(json.dumps(data, ensure_ascii=False,  indent=4, sort_keys=False))
                #usjon
                #f.write(json.dumps(data))
                f.close
            else:
                s3 = S3()
                s3object = s3.resource.Object(Config.S3_BUCKET, path.parent.name +'/'+ path.name)
                #s3object.put(Body=data)
                s3object.put(Body=(bytes(json.dumps(data).encode('UTF-8'))))
        # except(IOError, IndexError):
        #     return('File not found or file is empty')
        #ovako prosljedjujemo exception u prethodnom slucaju vracamo response u funkciju koja poziva writeFile
        except(IOError, IndexError):
            raise IndexError
        except OSError:
            raise OSError
        
        #drugi nacin pisanj u file
        #with open(self.hData, mode="w") as f:
        #json.dump(data,f)

    @staticmethod
    def readParamFile(path):
        try:
            f = open(path, mode="r")
            data = json.loads(f.read())
            f.close
            return data
        except( IndexError):
            raise IndexError
        except(IOError):
            raise IOError
        except OSError:
            raise OSError