from django.http import HttpRequest
from django.http.response import JsonResponse

from schools.services import search_schools
from schools.serializers import SchoolSerializer

from rest_framework.decorators import api_view

@api_view(['GET'])
def school_list(request: HttpRequest):
  schools = search_schools(request.GET)
  school_serializer = SchoolSerializer(schools, many=True)
  return JsonResponse({
    'data': school_serializer.data,
    'total': schools.paginator.count,
    'has_more': schools.has_next()}, safe=False)
