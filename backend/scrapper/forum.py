import json
import functools

def __access_subforum(driver, parent, first=False):
  f = {} # esto almacenara el contenido del subforo
  parent.click() # haciendo click en el foro para acceder a subforos  

  # Limite de la recursion
  limit = driver.find_elements_by_css_selector(".itemToolBar .button")
  if len(limit) > 0: 
    replies = driver.find_elements_by_css_selector("div.hierItemBlock")
    
    for reply in replies:
      key = reply.find_elements_by_css_selector("div.messageMetadata span.textPanelFooter")
      key = tuple(map(lambda x:x.text, key))
      key = functools.reduce(lambda x, y: x + " " + y, key)
      f[key] = reply.find_elements_by_css_selector("div.textPanel")[0].text

    return f

  # Este es el boton de retroceder
  backClassTag = "table.specialLink div.specialLink a"

  # Estos son los temas del foro o los subforos
  if first: tag = ".specialLink a.title"
  else: tag = ".firstChild a.messagetitlelink"

  # Obteniendo los componentes de cada foro o subforo
  search_results = driver.find_elements_by_css_selector(tag)

  # Yendo en produndidad a cada entrada de este subforo de forma recursiva
  for i in range(len(search_results)):
    sub_key = search_results[i].text # nombre del foro/subforo
    f[sub_key] = __access_subforum(driver, search_results[i]) # llamada recursiva

    # Retrocediendo para seguir con el siguiente subforo
    backClass = driver.find_elements_by_css_selector(backClassTag)[-1]
    backClass.click()

    # Esta linea es importante para volver a recuperar los elementos del DOM
    # puesto que en las llamadas recursivas este cambia
    search_results = driver.find_elements_by_css_selector(tag) 

  return f

def __access_forum(driver):

    # Redireccionando a la seccion de foros
    driver.get("https://campusvirtual.unir.net/portal/site/PER1518-2-7403-222/tool/62ed58f7-740f-4395-83e2-d2eeb5ac2651/discussionForum/forumsOnly/dfForums")

    forum = {} # foro principal

    search_results = driver.find_elements_by_css_selector("table.forumHeader a.title")

    for i in range(len(search_results)):
        key = search_results[i].text # nombre del foro
        forum[key] = __access_subforum(driver, search_results[i], first=True)

        # componente de retroceder
        backClass = driver.find_elements_by_css_selector("h3.specialLink a")
        if backClass is None or len(backClass) == 0: break
        
        backClass[-1].click() # El elemento de retroceder siempre es el ultimo, por eso el -1
        search_results = driver.find_elements_by_css_selector("table.forumHeader a.title")

    return forum

# Este driver debe tener una sesion activa en la
# plataforma de la UNIR
def load_forums(driver):
    outupt = __access_forum(driver)
    response_json = json.dumps(outupt)
    response_json = json.loads(response_json)

    return response_json