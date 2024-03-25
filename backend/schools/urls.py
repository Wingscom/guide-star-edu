from django.urls import path
from schools import views
 
urlpatterns = [ 
  path("", views.school_list),
  path("crawl", views.crawl)
]
