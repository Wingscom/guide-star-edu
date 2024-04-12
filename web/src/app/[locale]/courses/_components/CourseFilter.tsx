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
    search: StringParam,
    country: CountryParam,
    state: StringParam,
    city: StringParam,
    sector: StringParam,
    page: NumberParam,
  });
  const [searchValue, setSearchValue] = useState(query.search ?? "");
  const [debouncedSearchValue] = useDebouncedValue(searchValue, 500);
  const hasActiveFilter =
    query.search || query.country || query.state || query.city || query.sector;

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
    setSearchValue("");
    setQuery({
      search: undefined,
      country: undefined,
      state: undefined,
      city: undefined,
      sector: undefined,
      page: undefined,
    });
  };

  useEffect(() => {
    setQuery({ search: debouncedSearchValue }, "pushIn");
  }, [debouncedSearchValue]);

  return (
    <Stack>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
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
