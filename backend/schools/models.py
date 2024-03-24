from djongo import models

class SchoolSource(models.Model):
  name = models.CharField(max_length=20)
  
  class Meta:
    abstract = True

# Create your models here.
class School(models.Model):
  name = models.CharField(max_length=30,blank=False)
  country = models.CharField(max_length=30,blank=False)
  state = models.CharField(max_length=20,blank=False)
  city = models.CharField(max_length=20,blank=False)
  sources = models.ArrayField(
    model_container=SchoolSource
  )

  objects = models.DjongoManager()
