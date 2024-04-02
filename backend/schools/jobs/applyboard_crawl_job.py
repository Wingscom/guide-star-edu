import logging
import os
import requests
import time

from schools.models import Course, School, Sector

logger = logging.getLogger()


def crawl() -> None:
    page = 1
    page_size = 100
    total = 10000
    program_levels = [
        "certificate",
        "diploma",
        "3_year_bachelors",
        "bachelors",
        "masters_degree",
        "post_graduate_certificate,post_graduate_diploma,doctoral_phd,non_credential",
        "advanced_diploma,topup_degree,integrated_masters",
        "english",
        "grade_1,grade_2,grade_3,grade_4,grade_5,grade_6,grade_7,grade_8,grade_9,grade_10,grade_11,grade_12",
    ]
    for program_level in program_levels:
        while (page - 1) * page_size < total:
            response = requests.get(
                "https://www.applyboard.com/api/content/search/v2/search",
                params={
                    "sort": "relevance",
                    "page[number]": page,
                    "page[size]": page_size,
                    "filter[levels]": program_level,
                },
            )
            try:
                search_response = response.json()
                total = search_response["meta"]["counts"]["total"]
                courses = search_response["data"]

                for course in courses:
                    course_attributes = course["attributes"]
                    school = course_attributes["school"]
                    school_record, school_created = School.objects.get_or_create(
                        name=school["name"].strip(),
                        country=school["countryCode"],
                        state=school["province"].strip(),
                        city=school["city"].strip(),
                        defaults={"sources": ["applyboard"]},
                    )

                    if school_created:
                        logger.info(
                            "Create a new school %s in %s, %s",
                            school_record.name,
                            school_record.country,
                            school_record.state,
                        )

                    if "applyboard" not in school_record.sources:
                        logger.info(
                            "Update school source with applyboard for school: %s",
                            school_record.name,
                        )
                        school_record.sources.append("applyboard")

                    school_record.save()

                    course_name: str = (
                        course_attributes["name"].strip().replace("\n", "")
                    )
                    course_sector = resolve_course_sector(
                        course_attributes["programLevel"]
                    )
                    course_record, course_created = Course.objects.get_or_create(
                        name=course_name,
                        school_id=school_record.id,
                        sector=course_sector,
                    )

                    if course_created:
                        logger.info("Create a new course: %s", course_name)

                    application_fee = "{:,}".format(course_attributes["applicationFee"])
                    application_fee = (
                        f"{course_attributes['currency']} {application_fee}"
                    )
                    tuition_fee = "{:,}".format(course_attributes["tuition"])
                    tuition_fee = f"{course_attributes['currency']} {tuition_fee}"
                    commission = ""

                    if "commissionAmount" in course_attributes:
                        commission = "{:,}".format(
                            course_attributes["commissionAmount"]
                        )
                        commission = f"{course_attributes['currency']} {commission}"

                    duration = (
                        course_attributes["minLength"]
                        if course_attributes["minLength"]
                        == course_attributes["maxLength"]
                        else f"{course_attributes['minLength']}-{course_attributes['maxLength']}"
                    )

                    if course_record.application_fee != application_fee:
                        logger.info(
                            "Update course application_fee with %s for school: %s",
                            application_fee,
                            school_record.name,
                        )
                        course_record.application_fee = application_fee

                    if course_record.tuition_fee != tuition_fee:
                        logger.info(
                            "Update course tuition_fee with %s for school: %s",
                            tuition_fee,
                            school_record.name,
                        )
                        course_record.tuition_fee = tuition_fee

                    if course_record.commission != commission:
                        logger.info(
                            "Update course commission with %s for school: %s",
                            commission,
                            school_record.name,
                        )
                        course_record.commission = commission

                    if course_record.duration != duration:
                        logger.info(
                            "Update course duration with %s for school: %s",
                            duration,
                            school_record.name,
                        )
                        course_record.duration = duration

                    course_record.save()

                page = page + 1
            except requests.JSONDecodeError:
                logger.error(f"Failed to parse json for response: {response.text}")
            time.sleep(1)
        page = 1
        time.sleep(5)


def resolve_course_sector(level: str):
    match level:
        case "english":
            return Sector.LANGUAGE.name
        case (
            "grade_1"
            | "grade_2"
            | "grade_3"
            | "grade_4"
            | "grade_5"
            | "grade_6"
            | "grade_7"
            | "grade_8"
            | "grade_9"
            | "grade_10"
            | "grade_11"
            | "grade_12"
        ):
            return Sector.HIGH_SCHOOL.name
        case (
            "certificate"
            | "diploma"
            | "advanced_diploma"
            | "3_year_bachelors"
            | "topup_degree"
            | "bachelors"
            | "integrated_masters"
        ):
            return Sector.UNDERGRADUATE.name
        case (
            "post_graduate_certificate"
            | "post_graduate_diploma"
            | "masters_degree"
            | "doctoral_phd"
            | "non_credential"
        ):
            return Sector.POSTGRADUATE.name
        case _:
            logger.error(f"Unhandled level {level}")
            raise Exception(f"Unhandled level {level}")
