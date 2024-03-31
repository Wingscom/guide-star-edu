from enum import Enum
from django.db import models


class School(models.Model):
    name = models.CharField(max_length=255, blank=False)
    country = models.CharField(max_length=3, blank=False)
    state = models.CharField(max_length=50, blank=False)
    city = models.CharField(max_length=50, blank=False)
    sources = models.JSONField(blank=False)


class Course(models.Model):
    name = models.CharField(max_length=255, blank=False)
    school = models.ForeignKey(
        School,
        on_delete=models.CASCADE,
    )
    commission = models.CharField(max_length=1000)
    tuition_fee = models.CharField(max_length=20)
    application_fee = models.CharField(max_length=20)
    duration = models.CharField(max_length=20)
    intake = models.CharField(max_length=20)
    sector = models.CharField(max_length=20, blank=False)


class Sector(Enum):
    HIGH_SCHOOL = "HIGH_SCHOOL"
    UNDERGRADUATE = "UNDERGRADUATE"
    POSTGRADUATE = "POSTGRADUATE"
    LANGUAGE = "LANGUAGE"
    VOCATIONAL = "VOCATIONAL"
