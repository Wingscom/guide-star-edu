import os
import requests

def crawl():
  auth_response = requests.post("https://yes-commission.api.pinxed.com/users/login",
                                data={'username': os.getenv('YES_EDU_USERNAME'), 'password': os.getenv('YES_EDU_PASSWORD')})
  access_token = auth_response.json()['token']
  schools_response = requests.get("https://yes-commission.api.pinxed.com/school/",
                              headers={'Authorization': f'JWT {access_token}' })
  data = schools_response.json()
