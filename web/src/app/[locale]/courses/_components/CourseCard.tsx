import { Card, Divider, Group, Stack, Text, Title } from "@mantine/core";
import { Course } from "../_types/Course";
import { getScopedI18n } from "@/locales/server";

export type CourseCardProps = {
  course: Course;
};

export async function CourseCard({ course }: CourseCardProps) {
  const countryT = await getScopedI18n("countries");
  const sectorT = await getScopedI18n("courseSectors");
  const pageT = await getScopedI18n("coursesPage");

  return (
    <Card withBorder radius="md">
      <Stack>
        <Title order={4}>{course.school.name}</Title>
        <Text>{sectorT(course.sector)}</Text>
        <Title order={3}>{course.name}</Title>
        <Divider />
        <Group justify="space-between">
          <Text fw={500}>{pageT("labels.country")}</Text>
          <Text>{countryT(course.school.country)}</Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>{pageT("labels.location")}</Text>
          <Text>
            {course.school.city
              ? `${course.school.state}, ${course.school.city}`
              : course.school.state}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>{pageT("labels.applicationFee")}</Text>
          <Text>{course.application_fee}</Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>{pageT("labels.tuitionFee")}</Text>
          <Text>{course.tuition_fee}</Text>
        </Group>
        <Group justify="space-between">
          <Text fw={500}>{pageT("labels.duration")}</Text>
          <Text>{course.duration}</Text>
        </Group>
      </Stack>
    </Card>
  );
}
