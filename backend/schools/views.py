import json

from django.http import HttpRequest, HttpResponse
from django.http.response import JsonResponse

from schools.services import search_courses, search_schools, crawl_data
from schools.serializers import CourseSerializer, SchoolSerializer

from rest_framework import status
from rest_framework.decorators import api_view


@api_view(["POST"])
def school_list(request: HttpRequest):
    request_body: dict = json.loads(request.body)
    resources = search_schools(request_body)
    resource_serializer = SchoolSerializer(
        resources, many=True, context={"request": request}
    )
    return JsonResponse(
        {
            "data": resource_serializer.data,
            "total": resources.paginator.count,
            "page": int(request_body.get("page", 1)),
            "per_page": int(request_body.get("per_page", 12)),
            "has_more": resources.has_next(),
        },
        safe=False,
    )


@api_view(["POST"])
def course_list(request: HttpRequest):
    request_body: dict = json.loads(request.body)
    resources = search_courses(request_body)
    resource_serializer = CourseSerializer(
        resources, many=True, context={"request": request}
    )
    return JsonResponse(
        {
            "data": resource_serializer.data,
            "total": resources.paginator.count,
            "page": int(request_body.get("page", 1)),
            "per_page": int(request_body.get("per_page", 12)),
            "has_more": resources.has_next(),
        },
        safe=False,
    )


@api_view(["POST"])
def crawl(request: HttpRequest):
    crawl_data()
    return HttpResponse(status=status.HTTP_204_NO_CONTENT)
