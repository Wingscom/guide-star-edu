"use client";

import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Badge, Box, Card, Group, Image, Modal, SimpleGrid, Stack, Text } from "@mantine/core";
import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { ExamFields } from "@/types/Exam";
import { TypeListExams } from "../action";

type ExamListProps = {
    exams: TypeListExams;
};

export function ExamList({ exams }: Readonly<ExamListProps>) {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedExam, setSelectedExam] = useState<ExamFields | null>(null);

    const handleCardClick = (exam: ExamFields) => {
        setSelectedExam(exam);
        open();
    };

    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lgs" py="xl">
                {exams.map((exam, index) => {
                    const iconUrl = exam.icon?.fields.file;
                    console.log({ iconUrl });
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
                                        h={160}
                                        alt={exam?.title}
                                        fit="contain"
                                        p="md"
                                    />
                                )}
                            </Card.Section>

                            <Group justify="space-between" mt="md" mb="xs">
                                <Text fw={500}>{exam.title}</Text>
                                <Badge color="pink" variant="light">
                                    {exam.title}
                                </Badge>
                            </Group>

                            <Text size="sm" c="dimmed">
                                Fee: {exam.fee}
                            </Text>
                        </Card>
                    );
                })}
            </SimpleGrid>

            <Modal opened={opened} onClose={close} title={selectedExam?.title.values} size="lg">
                {selectedExam && (
                    <Stack>
                        {(selectedExam.icon as any)?.fields?.file?.url && (
                            <Box w={100} h={100} style={{ alignSelf: "center" }}>
                                <Image
                                    src={`https:${(selectedExam.icon as any)?.fields?.file?.url}`}
                                    alt={selectedExam.title.values}
                                    fit="contain"
                                />
                            </Box>
                        )}
                        <Group>
                            <Text fw={700}>Fee:</Text>
                            <Text>{selectedExam.fee.values}</Text>
                        </Group>
                        x
                        <Box>
                            <Text fw={700} mb="xs">
                                Description:
                            </Text>
                            {/* {selectedExam?.description &&
                                renderContentfulDocument(selectedExam.description)} */}
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
