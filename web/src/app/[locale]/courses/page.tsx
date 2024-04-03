import { Box, Space } from "@mantine/core";
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
}: Readonly<{
  searchParams: {
    search?: string;
    country?: string;
    state?: string;
    city?: string;
    sector?: CourseSector;
    page?: number;
  };
}>) {
  const [countries, states, cities, courses] = await Promise.all([
    getAvailableCountries(),
    getAvailableStates(country),
    getAvailableCities(country, state),
    searchCourses({
      search,
      country,
      state,
      city,
      sector,
      page,
    }),
  ]);

  return (
    <Box pos="relative" display="flex">
      <Box pos="sticky" top={76} miw={300} h="fit-content">
        <CourseFilter
          countries={countries}
          states={states}
          cities={cities}
          total={courses.total}
        />
      </Box>
      <Space w="xl" />
      <Box w="100%">
        <CourseList courses={courses} />
      </Box>
    </Box>
  );
}
