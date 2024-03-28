"use client";

import { useScopedI18n } from "@/locales/client";
import { CountryCode } from "@/types/CountryCode";
import { Input, Stack, useCombobox } from "@mantine/core";
import { KeyboardEvent } from "react";
import {
  NumberParam,
  StringParam,
  createEnumParam,
  useQueryParams,
} from "use-query-params";
import { CourseFilterCombobox } from "./CourseFilterCombobox";
import { CourseSector } from "../_types/CourseSector";

export type CourseFilterProps = {
  countries: CountryCode[];
  states: string[];
  cities: string[];
};

export function CourseFilter({ countries, states, cities }: CourseFilterProps) {
  const countryT = useScopedI18n("countries");
  const courseSectorT = useScopedI18n("courseSectors");
  const pageT = useScopedI18n("coursesPage");
  const CountryParam = createEnumParam(countries);
  const [query, setQuery] = useQueryParams({
    search: StringParam,
    country: CountryParam,
    state: StringParam,
    city: StringParam,
    sector: StringParam,
    page: NumberParam,
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;

    setQuery({ search: e.currentTarget.value }, "pushIn");
  };

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

  return (
    <Stack>
      <Input
        defaultValue={query.search ?? ""}
        onKeyDown={handleSearchKeyDown}
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
    </Stack>
  );
}
