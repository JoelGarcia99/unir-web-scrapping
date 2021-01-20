from flask import Flask, request

from .web_driver import driver
from .scrapper import session, forum

# Punto de ejecucion del programa
app = Flask(__name__)

driver = driver.get_webdriver()

# Por defecto usa el metodo GET
@app.route('/')
def index():
    return "Hola mundo"

@app.route('/login', methods=['POST'])
def login():
    message = "Login realizado"
    try:
        session.login(driver, request.form['user'], request.form['password'])
    except:
        message = "Ya hay un usuario en sesión o su usuario no es válido"
    return message

@app.route('/post', methods=['GET'])
def load_post():
    out = forum.load_forums(driver)
    return str(out)

@app.route('/status', methods=['GET'])
def isSignedIn():
    signed = session.isSignedIn(driver)
    return signed

