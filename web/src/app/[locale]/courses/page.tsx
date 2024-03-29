import { Grid, GridCol } from "@mantine/core";
import { CourseFilter } from "./_components/CourseFilter";
import { CourseList } from "./_components/CourseList";
import { CourseSector } from "./_types/CourseSector";
import {
  getAvailableCities,
  getAvailableCountries,
  getAvailableStates,
  searchCourses,
} from "./actions";

export default async function SearchPage({
  searchParams: { search, country, state, city, sector, page = 1 },
}: {
  searchParams: {
    search?: string;
    country?: string;
    state?: string;
    city?: string;
    sector?: CourseSector;
    page?: number;
  };
}) {
  const countries = await getAvailableCountries();
  const states = await getAvailableStates(country);
  const cities = await getAvailableCities(country, state);
  const courses = await searchCourses({
    search,
    country,
    state,
    city,
    sector,
    page,
  });

  return (
    <Grid gutter="xl">
      <GridCol span={{ base: 12, sm: 4 }}>
        <CourseFilter
          countries={countries}
          states={states}
          cities={cities}
          total={courses.total}
        />
      </GridCol>
      <GridCol span={{ base: 12, sm: 8 }}>
        <CourseList courses={courses} />
      </GridCol>
    </Grid>
  );
}
