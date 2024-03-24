from django.urls import re_path
from schools import views
 
urlpatterns = [ 
  re_path(r'^api/schools$', views.school_list),
]
