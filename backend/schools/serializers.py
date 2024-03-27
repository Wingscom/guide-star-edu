from schools.models import Course, School
from rest_framework import serializers


class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ["id", "name", "country", "state", "city", "sources"]


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "id",
            "name",
            "school",
            "tuition_fee",
            "application_fee",
            "duration",
            "intake",
            "sector",
        ]
        depth = 1
