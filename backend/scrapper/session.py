from selenium import webdriver
from selenium.webdriver.common.keys import Keys # Emular acciones de teclado
from selenium.webdriver.support.ui import WebDriverWait # para esperar a que la página cargue
from selenium.webdriver.common.by import By # para hacer búsquedas parametrizadas
from selenium.webdriver.support import expected_conditions as EC # Para condicionar WebDriverWait

# El driver hace referencia a un webdriver
def login(driver, username, password):
    driver.get("https://crosscutting.unir.net/login?ReturnUrl=%2fauthorize%3fclient_id%3dsakai%26redirect_uri%3dhttps%253A%252F%252Fcampusvirtual.unir.net%252Foauth-tool%252Fcrosscutting%252Fcallback%26response_type%3dcode%26state%3d245d7cd5e6ff497dafff1d29212d9fca&client_id=sakai&redirect_uri=https%3A%2F%2Fcampusvirtual.unir.net%2Foauth-tool%2Fcrosscutting%2Fcallback&response_type=code&state=245d7cd5e6ff497dafff1d29212d9fca")
    # Componentes HTML de inicio de sesión
    username_box = driver.find_element_by_name("Username")
    password_box = driver.find_element_by_name("Password")

    username_box.send_keys(username)
    password_box.send_keys(password)

    password_box.send_keys(Keys.RETURN) # RETURN es la tecla enter

    # Esperando a que la sesion cargue
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "main-content"))
    )

    return True