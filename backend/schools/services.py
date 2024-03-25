from django.http import QueryDict
from django.core.paginator import Paginator

from schools.models import School

def search_schools(query: QueryDict):
  schools = School.objects.order_by("id").all()
  if query.get("search"):
    schools = schools.filter(name__contains=query.get("search"))
  if query.get("country"):
    schools = schools.filter(country__iexact=query.get("country"))
  if query.get("state"):
    schools = schools.filter(state__contains=query.get("state"))
  if query.get("city"):
    schools = schools.filter(city__contains=query.get("city"))

  page = query.get("page", 1)
  per_page = query.get("per_page", 12)
  paginator = Paginator(schools, per_page)
  return paginator.get_page(page)
