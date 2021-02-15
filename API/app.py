#import sys
import os
from flask import Flask, jsonify, request, session, render_template, make_response
from flask_cors import CORS
from pathlib import Path
from datetime import timedelta
#import json

from Routes.Upload.UploadRoute import upload_api
from Routes.Case.CaseRoute import case_api
from Routes.Calculation.CalculationRoute import calc_api



# template_dir = os.path.abspath('WebAPP')
# static_dir = os.path.abspath('WebAPP')

template_dir = os.path.abspath('WebAPP')
static_dir = os.path.abspath('WebAPP')


# template_dir = os.path.join(sys._MEIPASS, 'WebAPP') 
# static_dir = os.path.join(sys._MEIPASS, 'WebAPP') 
#gets absolute path
# template_dir = Path('WebAPP').resolve()
# static_dir = Path('../WebAPP').resolve()
#template_dir = 'WebAPP'
#static_dir = '../WebAPP'


app = Flask(__name__, static_url_path='', static_folder=static_dir,  template_folder=template_dir)

app.permanent_session_lifetime = timedelta(days=5)
app.config['SECRET_KEY'] = '12345'

app.register_blueprint(upload_api)
app.register_blueprint(case_api)
app.register_blueprint(calc_api)


CORS(app)

#potrebno kad je front end na drugom serveru 127.0.0.1
@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    #response.headers['Content-Type'] = 'application/javascript'
    return response

# @app.errorhandler(CustomException)
# def handle_invalid_usage(error):
#     response = jsonify(error.to_dict())
#     response.status_code = error.status_code
#     return response

#entry point to frontend
@app.route("/", methods=['GET'])
def home():
    return render_template('index.html')


@app.route("/getSession", methods=['GET'])
def getSession():
    try:
        response = {
            "session": session.get('osycase', None)
        }
        return jsonify(response), 200
    except( KeyError ):
        return jsonify('No selected parameters!'), 404

@app.route("/setSession", methods=['POST'])
def setSession():
    try:
        cs = request.json['case']
        #session.permanent= True
        session['osycase'] = cs
        response = {"osycase": session['osycase']}
        return jsonify(response), 200
    except( KeyError ):
        return jsonify('No selected parameters!'), 404


if __name__ == '__main__':
    #potrebno radi module js importa u index.html ES6 modules
    #Flask.__version__
    import mimetypes
    mimetypes.add_type('application/javascript', '.js')
    app.run(host='127.0.0.1', port=5000)