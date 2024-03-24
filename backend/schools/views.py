from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from schools.models import School
from schools.serializers import SchoolSerializer

from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def school_list(request):
  if request.method == 'GET':
    schools = School.objects.all()
    school_serializer = SchoolSerializer(schools, many=True)
    return JsonResponse(school_serializer.data, safe=False)
  elif request.method == 'POST':
    create_request = JSONParser().parse(request)
    school_serializer = SchoolSerializer(data=create_request)
    if (school_serializer.is_valid()):
      school_serializer.save()
      return JsonResponse(school_serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(school_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
