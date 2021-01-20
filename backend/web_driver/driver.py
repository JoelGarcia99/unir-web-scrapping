import sys
from selenium import webdriver

def get_webdriver():
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')

    # Cargando el webdriver de chrome
    driver = webdriver.Chrome('backend/web_driver/chromedriver.exe',chrome_options=chrome_options)
    return driver