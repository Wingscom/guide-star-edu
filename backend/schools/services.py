from django.http import QueryDict
from django.core.paginator import Paginator

from schools.models import Course, School

from schools.handlers.yes_edu_handler import crawl as crawl_yes_edu


def search_schools(query: QueryDict):
    schools = School.objects.order_by("id").all()
    if query.get("search"):
        schools = schools.filter(name__contains=query.get("search"))
    if query.get("country"):
        schools = schools.filter(country__iexact=query.get("country"))
    if query.get("state"):
        schools = schools.filter(state__iexact=query.get("state"))
    if query.get("city"):
        schools = schools.filter(city__iexact=query.get("city"))

    page = query.get("page", 1)
    per_page = query.get("per_page", 12)
    paginator = Paginator(schools, per_page)
    return paginator.get_page(page)


def search_courses(query: dict):
    courses = Course.objects.prefetch_related("school").order_by("id").all()
    if query.get("search"):
        courses = courses.filter(name__contains=query.get("search"))
    if query.get("sector"):
        courses = courses.filter(sector__iexact=query.get("sector"))
    if query.get("country"):
        courses = courses.filter(school__country__iexact=query.get("country"))
    if query.get("state"):
        courses = courses.filter(school__state__iexact=query.get("state"))
    if query.get("city"):
        courses = courses.filter(school__city__iexact=query.get("city"))

    page = query.get("page", 1)
    per_page = query.get("per_page", 12)
    paginator = Paginator(courses, per_page)
    return paginator.get_page(page)


def crawl_data():
    crawl_yes_edu()


def get_school_countries():
    return (
        School.objects.order_by("country")
        .values_list("country", flat=True)
        .distinct()
        .order_by("country")
    )


def get_school_states(country: str):
    return (
        School.objects.filter(country=country)
        .order_by("state")
        .values_list("state", flat=True)
        .distinct()
        .order_by("state")
    )


def get_school_cities(country: str, state: str):
    return (
        School.objects.filter(country=country, state=state)
        .order_by("city")
        .values_list("city", flat=True)
        .distinct()
        .order_by("city")
    )
