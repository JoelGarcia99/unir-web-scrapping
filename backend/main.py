from flask import Flask

from .web_driver import driver
from .scrapper import session

# Punto de ejecucion del programa
app = Flask(__name__)

driver = driver.get_webdriver()

@app.route('/login', methods=['POST'])
def login():
    try:
        session.login(driver, "garciajunior796@gmail.com", "JoelJrGarciA.1999")
    except:
        print("Ya hay un usuario en sesión")
    return "Login realizado"

