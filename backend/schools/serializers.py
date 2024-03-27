from schools.models import School
from rest_framework import serializers


class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = School
        fields = ["id", "name", "country", "state", "city", "sources"]
