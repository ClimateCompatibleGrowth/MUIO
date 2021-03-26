import boto3
import os
import glob
import threading
from pathlib import Path
from collections.abc import Iterable 
from Classes.Base import Config

class S3():
    def __init__(self):
        self.resource = boto3.resource(
        "s3",
        aws_access_key_id=Config.S3_KEY,
        aws_secret_access_key=Config.S3_SECRET
        )

        self.client = boto3.client(
            's3',
            aws_access_key_id=Config.S3_KEY,
            aws_secret_access_key=Config.S3_SECRET
        )

    def getCases(self):
        try:
            my_bucket = self.resource.Bucket(Config.S3_BUCKET)
            result = my_bucket.meta.client.list_objects(Bucket=my_bucket.name, Delimiter='/')
            if isinstance(result.get('CommonPrefixes'), Iterable):
                cases = [ f.get('Prefix')[:-1] for f in result.get('CommonPrefixes')]
            else:
                cases = []
            return cases
        except(IOError):
            raise IOError

    def s3Copy(self, my_bucket, obj, case, newcase):
        old_source = { 'Bucket': Config.S3_BUCKET, 'Key': obj.key }
        # replace the prefix
        new_key = obj.key.replace(case, newcase, 1)
        new_obj = my_bucket.Object(new_key)
        new_obj.copy(old_source)


    def copyCase(self, case, newcase):
        try:
            my_bucket = self.resource.Bucket(Config.S3_BUCKET)
            objects =  my_bucket.objects.filter(Prefix=case)
            for obj in objects:
                # old_source = { 'Bucket': Config.S3_BUCKET, 'Key': obj.key }
                # # replace the prefix
                # new_key = obj.key.replace(case, newcase, 1)
                # new_obj = my_bucket.Object(new_key)
                #new_obj.copy(old_source)
                threading.Thread(target = self.s3Copy, args=(my_bucket, obj, case, newcase,)).start()

            # for fname in filenames:
            #     t = threading.Thread(target = upload, args=(fname,)).start()
        except(IOError):
            raise IOError

    def deleteCase(self, case):
        try:
            my_bucket = self.resource.Bucket(Config.S3_BUCKET)
            my_bucket.objects.filter(Prefix=case+"/").delete()
        except(IOError):
            raise IOError


    
