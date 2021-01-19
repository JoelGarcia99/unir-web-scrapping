import sys
from selenium import webdriver

def get_webdriver(path='./chromedriver.exe'):
    sys.path.insert(0,path)

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    # Cargando el webdriver de chrome
    driver = webdriver.Chrome('chromedriver',chrome_options=chrome_options)
    return driver