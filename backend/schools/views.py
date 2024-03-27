from django.http import HttpRequest, HttpResponse
from django.http.response import JsonResponse

from schools.services import search_schools, crawl_data
from schools.serializers import SchoolSerializer

from rest_framework import status
from rest_framework.decorators import api_view


@api_view(["GET"])
def school_list(request: HttpRequest):
    schools = search_schools(request.GET)
    school_serializer = SchoolSerializer(schools, many=True)
    return JsonResponse(
        {
            "data": school_serializer.data,
            "total": schools.paginator.count,
            "has_more": schools.has_next(),
        },
        safe=False,
    )


@api_view(["POST"])
def crawl(request: HttpRequest):
    crawl_data()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)
