"use client";

import { useScopedI18n } from "@/locales/client";
import { CountryCode } from "@/types/CountryCode";
import { Button, Input, Stack, Text, useCombobox } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import {
  NumberParam,
  StringParam,
  createEnumParam,
  useQueryParams,
} from "use-query-params";
import { CourseSector } from "../_types/CourseSector";
import { CourseFilterCombobox } from "./CourseFilterCombobox";

export type CourseFilterProps = {
  total: number;
  countries: CountryCode[];
  states: string[];
  cities: string[];
};

export function CourseFilter({
  total,
  countries,
  states,
  cities,
}: Readonly<CourseFilterProps>) {
  const countryT = useScopedI18n("countries");
  const courseSectorT = useScopedI18n("courseSectors");
  const pageT = useScopedI18n("coursesPage");
  const CountryParam = createEnumParam(countries);
  const [query, setQuery] = useQueryParams({
    schoolName: StringParam,
    courseName: StringParam,
    country: CountryParam,
    state: StringParam,
    city: StringParam,
    sector: StringParam,
    page: NumberParam,
  });
  const [schoolSearchValue, setSchoolSearchValue] = useState(query.schoolName ?? "");
  const [debouncedSchoolSearchValue] = useDebouncedValue(schoolSearchValue, 500);
  const [courseSearchValue, setCourseSearchValue] = useState(query.courseName ?? "");
  const [debouncedCourseSearchValue] = useDebouncedValue(courseSearchValue, 500);
  const hasActiveFilter =
    query.schoolName ||
    query.courseName ||
    query.country ||
    query.state ||
    query.city ||
    query.sector;

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleSubmitCombobox = (
    field: "country" | "state" | "city" | "sector",
    value: string
  ) => {
    const valueToUpdate = value === "" ? undefined : value;
    if (field === "country") {
      setQuery(
        {
          country: valueToUpdate as CountryCode,
          state: undefined,
          city: undefined,
          page: 1,
        },
        "pushIn"
      );
      return;
    }
    if (field === "state") {
      setQuery({ state: valueToUpdate, city: undefined, page: 1 }, "pushIn");
      return;
    }
    setQuery({ [field]: valueToUpdate, page: 1 }, "pushIn");
  };

  const resetFilter = () => {
    setSchoolSearchValue("");
    setQuery({
      schoolName: undefined,
      courseName: undefined,
      country: undefined,
      state: undefined,
      city: undefined,
      sector: undefined,
      page: undefined,
    });
  };

  useEffect(() => {
    setQuery({ schoolName: debouncedSchoolSearchValue }, "pushIn");
  }, [debouncedSchoolSearchValue]);

  useEffect(() => {
    setQuery({ courseName: debouncedCourseSearchValue }, "pushIn");
  }, [debouncedCourseSearchValue]);

  return (
    <Stack>
      <Input
        value={schoolSearchValue}
        onChange={(e) => setSchoolSearchValue(e.currentTarget.value)}
        placeholder={pageT("labels.schoolName")}
      />
      <Input
        value={courseSearchValue}
        onChange={(e) => setCourseSearchValue(e.currentTarget.value)}
        placeholder={pageT("labels.courseName")}
      />
      <CourseFilterCombobox
        field="country"
        value={query.country ?? ""}
        options={countries}
        placeholder={pageT("labels.country")}
        getValueLabel={(value) => countryT(value as CountryCode)}
        onSubmit={handleSubmitCombobox}
      />
      <CourseFilterCombobox
        field="state"
        value={query.state ?? ""}
        options={states}
        placeholder={pageT("labels.state")}
        onSubmit={handleSubmitCombobox}
      />
      <CourseFilterCombobox
        field="city"
        value={query.city ?? ""}
        options={cities}
        placeholder={pageT("labels.city")}
        onSubmit={handleSubmitCombobox}
      />
      <CourseFilterCombobox
        field="sector"
        value={query.sector ?? ""}
        options={Object.values(CourseSector)}
        getValueLabel={(value) => courseSectorT(value as CourseSector)}
        placeholder={pageT("labels.sector")}
        onSubmit={handleSubmitCombobox}
      />
      {hasActiveFilter && (
        <Button onClick={resetFilter}>{pageT("actions.resetFilter")}</Button>
      )}
      <Text>{pageT("labels.total", { count: total })}</Text>
    </Stack>
  );
}
