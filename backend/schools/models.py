from django.db import models

class School(models.Model):
  name = models.CharField(max_length=30,blank=False)
  country = models.CharField(max_length=30,blank=False)
  state = models.CharField(max_length=20,blank=False)
  city = models.CharField(max_length=20,blank=False)
  sources = models.JSONField(blank=False)
