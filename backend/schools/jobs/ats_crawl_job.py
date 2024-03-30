import requests
import logging
from bs4 import BeautifulSoup

from schools.models import Course, School

logger = logging.getLogger()


def crawl() -> None:
    soup = get_soup_from_url("https://ats.org.vn/courses/filter")
    country_options = soup.find(id="filter-country").find_all("option")
    countries = get_values_from_options(country_options)

    for country in countries:
        school_country = get_code_from_name(country["name"])
        country_value = country["value"]
        soup = get_soup_from_url(
            f"https://ats.org.vn/courses/filter?country={country_value}"
        )
        state_options = soup.find(id="filter-state").find_all("option")
        states = get_values_from_options(state_options)
        states = translate_states(states)

        for state in states:
            state_value = state["value"]
            soup = get_soup_from_url(
                f"https://ats.org.vn/courses/filter?country={country_value}&state={state_value}"
            )
            city_options = soup.find(id="filter-city").find_all("option")
            cities = get_values_from_options(city_options)

            for city in cities:
                city_value = city["value"]
                soup = get_soup_from_url(
                    f"https://ats.org.vn/courses/filter?country={country_value}&state={state_value}&city={city_value}"
                )
                craw_courses(soup, school_country, state, city)

                next_link = soup.find("a", class_="page-link", rel="next")
                if not next_link:
                    continue

                while next_link:
                    soup = get_soup_from_url(next_link["href"])
                    craw_courses(soup, school_country, state, city)
                    next_link = soup.find("a", class_="page-link", rel="next")


def craw_courses(soup: BeautifulSoup, school_country: str, state: dict, city: dict):
    course_elements = soup.find("div", class_="list-schcool").find_all(
        "div", class_="item"
    )

    for course_element in course_elements:
        school_name = course_element.find("p", class_="title2").text
        school_record, school_created = School.objects.get_or_create(
            name=school_name,
            country=school_country,
            state=state["name"],
            city=city["name"],
            defaults={"sources": ["ats"]},
        )

        if school_created:
            logger.info(
                "Create a new school %s in %s, %s, %s",
                school_name,
                school_country,
                state["name"],
                city["name"],
            )

        if "ats" not in school_record.sources:
            school_record.sources.append("ats")

        school_record.save()
        process_course(course_element, school_record)


def process_course(course_element: BeautifulSoup, school: School):
    course_name = course_element.find("h5").text
    course_sector_raw = course_element.find("span", class_="s3").text
    course_sector = resolve_course_sector(course_sector_raw)
    course_tuition_raw = course_element.find("span", class_="cl1").text
    course_tuition_fee = resolve_tuition_fee(course_tuition_raw)
    course_record, course_created = Course.objects.get_or_create(
        name=course_name,
        school_id=school.id,
        defaults={"sector": course_sector},
    )

    if course_created:
        logger.info("Create a new course: %s", course_name)

    if course_record.sector != course_sector:
        logger.info(
            "Update course sector with %s for school: %s",
            course_sector,
            school.name,
        )
        course_record.sector = course_sector

    if course_record.tuition_fee != course_tuition_fee:
        logger.info(
            "Update course tuition fee with %s for school: %s",
            course_tuition_fee,
            school.name,
        )
        course_record.tuition_fee = course_tuition_fee

    course_record.save()


def resolve_tuition_fee(raw: str):
    words = raw.split(" ")
    return f"{words[1]} {words[0]}"


def resolve_course_sector(raw: str):
    if "Trung học" in raw:
        return "HIGH_SCHOOL"
    if "Dự bị đại học" in raw:
        return "UNDERGRADUATE"
    if "Đại học" in raw:
        return "UNDERGRADUATE"
    if "Cao học" in raw:
        return "POSTGRADUATE"
    if "Tiến sĩ" in raw:
        return "POSTGRADUATE"
    if "Cao đẳng" in raw:
        return "UNDERGRADUATE"
    if "Tiếng Anh" in raw:
        return "LANGUAGE"
    if "Chứng chỉ Sau đại học" in raw:
        return "POSTGRADUATE"

    logger.error(f"Unhandled sector {raw}")
    raise Exception(f"Unhandled sector {raw}")


def translate_states(states: list):
    return list(
        map(
            lambda state: {
                "name": state["name"]
                .replace("Bắc", "North")
                .replace("Name", "South")
                .replace("Đông", "East")
                .replace("Tây", "West"),
                "value": state["value"],
            },
            states,
        )
    )


def get_code_from_name(name: str):
    match name:
        case "Mỹ":
            return "US"
        case "Anh":
            return "GB"
        case "Úc":
            return "AU"
        case "Canada":
            return "CA"
        case "New Zealand":
            return "NZ"
        case "Singapore":
            return "SG"
        case _:
            logger.error("Unhandled country name %s", name)
            raise Exception(f"Unhandled country name {name}")


def get_values_from_options(options: list):
    return list(
        filter(
            lambda item: item["value"],
            map(lambda item: {"name": item.text, "value": item["value"]}, options),
        )
    )


def get_soup_from_url(url: str):
    page = requests.get(url)
    return BeautifulSoup(page.text, "html.parser")
