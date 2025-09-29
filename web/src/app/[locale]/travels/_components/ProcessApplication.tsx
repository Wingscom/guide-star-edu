"use client";

import { Accordion, Stack, Text } from "@mantine/core";
import { IStepApplicationVisa } from "@/types/TravelEntrySkeleton";

export type ProcessApplicationProps = {
    steps: IStepApplicationVisa[] | null | undefined;
    multiple?: boolean;
    defaultOpenIndex?: number;
    title: string;
};

export function ProcessApplication({
    steps,
    title,
    multiple = false,
    defaultOpenIndex,
}: ProcessApplicationProps) {
    const sortedSteps = Array.isArray(steps)
        ? [...steps].sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
        : [];

    if (!sortedSteps.length) return null;

    const defaultValue = defaultOpenIndex
        ? String(defaultOpenIndex)
        : String(sortedSteps[0]?.index ?? "1");

    return (
        <Stack>
            <Text variant="gradient" size="lg">
                {title}
            </Text>
            <Accordion
                variant="separated"
                multiple={multiple}
                defaultValue={multiple ? [defaultValue] : defaultValue}
                transitionDuration={500}
            >
                {sortedSteps.map((step) => (
                    <Accordion.Item key={step.index} value={String(step.index)}>
                        <Accordion.Control>
                            <Text fw={600}>
                                {step.index}. {step.title}
                            </Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text style={{ whiteSpace: "pre-wrap" }}>{step.description}</Text>
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Stack>
    );
}

export default ProcessApplication;
