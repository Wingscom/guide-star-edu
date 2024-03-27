from django.urls import path
from schools import views

urlpatterns = [
    path("search", views.school_list),
    path("crawl", views.crawl),
    path("courses/search", views.course_list),
    path("countries", views.country_list),
    path("countries/<str:country>/states", views.state_list),
    path("countries/<str:country>/states/<str:state>/cities", views.city_list),
]
