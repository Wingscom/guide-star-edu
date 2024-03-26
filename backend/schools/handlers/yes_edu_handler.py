import os
import requests
import logging
import json

logger = logging.getLogger()

from schools.models import School, Course, Sector

def crawl() -> None:
  auth_response = requests.post("https://yes-commission.api.pinxed.com/users/login",
                                data={'username': os.getenv('YES_EDU_USERNAME'), 'password': os.getenv('YES_EDU_PASSWORD')})
  access_token = auth_response.json()['token']
  schools_response = requests.get("https://yes-commission.api.pinxed.com/school/",
                              headers={'Authorization': f'JWT {access_token}' }).json()

  for school_data in schools_response:
    logger.debug("Processing school data: %s", json.dumps(school_data))
    school_state: str | list = school_data["state"]

    if isinstance(school_state, list):
      for s in school_state:
        create_or_update_school(school_data, s)
      continue
    create_or_update_school(school_data, school_state)

def create_or_update_school(school_data, state: str):
  school_name = str(school_data["name"])
  school_country = str(school_data["country"])
  school_city = ""

  if len(school_country) > 3:
    school_country = map_country_name_to_code(school_country)

  if school_country == "US":
    if state != "ALL":
      state, school_city = state.split(", ", 1)
    else:
      state = ""

  school_record, school_created = School.objects.get_or_create(name=school_name, country=school_country, state=state, defaults={"sources": ["yes_edu"]})
  
  if school_created:
    logger.info("Create a new school %s in %s, %s", school_name, school_country, state)
    
  if school_city:
    school_record.city = school_city

  if "yes_edu" not in school_record.sources:
    logger.info("Update school source with yes_edu for school: %s", school_record.name)
    school_record.sources.append("yes_edu")

  school_record.save()

  for course_data in school_data["course"]:
    logger.debug("Processing course data: %s", json.dumps(course_data))
    course_name: str = course_data["course"].strip().replace("\n", "")
    course_sector = resolve_course_sector_from_name(course_name, school_data["type"])
    course_record, course_created = Course.objects.get_or_create(name=course_name, school_id=school_record.id, defaults={"sector": course_sector})

    if course_created:
      logger.info("Create a new course: %s", course_name)

    if course_record.sector != course_sector:
      logger.info("Update course sector with %s for school: %s", course_sector, school_record.name)
      course_record.sector = course_sector

    if course_record.commission != course_data["commission"]:
      logger.info("Update course commision with %s for school: %s", course_data["commission"], school_record.name)
      course_record.commission = course_data["commission"]

    course_record.save()

def resolve_course_sector_from_name(name: str, school_type: str):
  lower_name = name.lower()
  if ("english" in lower_name) or ("elicos" in lower_name):
    return Sector.LANGUAGE.name
  if ("11" in lower_name) or ("12" in lower_name):
    return Sector.HIGH_SCHOOL.name
  if ("bachelor" in lower_name):
    return Sector.UNDERGRADUATE.name
  if ("master" in lower_name) or ("phd" in lower_name) or ("postgraduate" in lower_name):
    return Sector.POSTGRADUATE.name
  if ("vocational" in lower_name):
    return Sector.VOCATIONAL.name
  return map_school_type_to_course_sector(school_type)

def map_school_type_to_course_sector(school_type: str):
  if school_type == "University":
    return Sector.UNDERGRADUATE.name
  if school_type == "College":
    return Sector.UNDERGRADUATE.name
  if school_type == "English School":
    return Sector.LANGUAGE.name
  return Sector.HIGH_SCHOOL.name

def map_country_name_to_code(name: str):
  if name == "Australia":
    return "AU"

  return name
