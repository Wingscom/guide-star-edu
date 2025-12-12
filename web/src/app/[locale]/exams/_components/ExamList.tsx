"use client";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Badge, Box, Card, Group, Image, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { TypeListExams } from "../action";

type ExamItem = NonNullable<TypeListExams>[number];

type ExamListProps = {
    exams: TypeListExams;
};

export function ExamList({ exams }: Readonly<ExamListProps>) {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null);

    const handleCardClick = (exam: ExamItem) => {
        setSelectedExam(exam);
        open();
    };

    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" py="xl">
                {exams.map((exam, index) => {
                    const iconFile = exam.icon?.fields?.file;
                    const iconUrl = iconFile?.url;

                    return (
                        <Card
                            key={index}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            onClick={() => handleCardClick(exam)}
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Section>
                                {iconUrl && (
                                    <Image
                                        src={`https:${iconUrl}`}
                                        h={200}
                                        w="100%"
                                        alt={exam.title as string}
                                        fit="cover"
                                        style={{
                                            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                            filter: "blur(0.5px)",
                                        }}
                                    />
                                )}
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>{exam.title as string}</Text>
                                <Badge color="pink" variant="light">
                                    {exam.freeStr as string}
                                </Badge>
                            </Group>

                            <Text size="sm" c="dimmed">
                                Fee: {exam.fee as number}
                            </Text>
                        </Card>
                    );
                })}
            </SimpleGrid>

            <Modal opened={opened} onClose={close} title={selectedExam?.title as string} size="lg">
                {selectedExam && (
                    <Stack>
                        <Box>
                            <Text fw={700} mb="xs">
                                Description:
                            </Text>
                            {selectedExam.description &&
                                renderContentfulDocument(selectedExam.description)}
                        </Box>
                        {selectedExam.structure && (
                            <Box>
                                <Text fw={700} mb="xs">
                                    Structure:
                                </Text>
                                <pre
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        backgroundColor: "var(--mantine-color-gray-1)",
                                        padding: "10px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    {JSON.stringify(selectedExam.structure, null, 2)}
                                </pre>
                            </Box>
                        )}
                    </Stack>
                )}
            </Modal>
        </>
    );
}
