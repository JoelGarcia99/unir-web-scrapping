import json

from flask import Flask, request, jsonify
from flask_cors import CORS

from .web_driver import driver
from .scrapper import session, forum

# Punto de ejecucion del programa
app = Flask(__name__)
CORS(app)

driver = driver.get_webdriver()

# Por defecto usa el metodo GET
@app.route('/')
def index():
    return "Hola mundo"

@app.route('/login', methods=['POST'])
def login():
    message = True
    try:
        session.login(driver, request.get_json()['user'], request.get_json()['password'])
    except:
        message = False

    response = jsonify({"success": message})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/post', methods=['GET'])
def load_post():
    res = forum.load_forums(driver)
    print(res)
    response = jsonify(res)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/status', methods=['GET'])
def isSignedIn():
    response = jsonify({"active": True if session.isSignedIn(driver) else False})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

