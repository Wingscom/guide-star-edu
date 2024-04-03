import { SimpleGrid } from "@mantine/core";
import { Pagination } from "../../_components/ui/Pagination/Pagination";
import { SearchCourseResponse } from "../actions";
import { CourseCard } from "./CourseCard";

export type CourseListProps = {
  courses: SearchCourseResponse;
};

export async function CourseList({ courses }: Readonly<CourseListProps>) {
  return (
    <div>
      <SimpleGrid spacing="xl" cols={{ base: 1, md: 2 }} mb="xl">
        {courses.data.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
      <Pagination totalItems={courses.total} />
    </div>
  );
}
