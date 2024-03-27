import os

from typing import Any
from django.http import HttpRequest, JsonResponse

from rest_framework import status


class ApiKeyMiddleware:
    def __init__(self, get_response) -> None:
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> Any:
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        if (not "X-Api-Key" in request.headers) or (
            request.headers["X-Api-Key"] != os.getenv("API_KEY")
        ):
            return JsonResponse(
                {"error": "Unauthorized request"}, status=status.HTTP_401_UNAUTHORIZED
            )

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response
