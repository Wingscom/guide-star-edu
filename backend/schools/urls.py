from django.urls import path
from schools import views

urlpatterns = [
    path("search", views.school_list),
    path("crawl", views.crawl),
    path("courses/search", views.course_list),
    path("countries", views.country_list),
]
