"use client";

import {
    Button,
    Container,
    Flex,
    Paper,
    Select,
    Space,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { sendRegistrationEmail } from "../action";
import { RegistrationFormType } from "./RegistrationEmailTemplate";
import { FieldDefinition } from "@/types/RegistrationFormExam";
import { getScopedI18n } from "@/locales/server";

type RegistrationFormProps = {
    title: string;
    description?: string;
    fields: FieldDefinition[];
    submitContent: string;
    exams: string[];
};

export function RegistrationForm({
    title,
    description,
    fields,
    submitContent,
    exams,
}: Readonly<RegistrationFormProps>) {
    const {
        register,
        handleSubmit: handleFormSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationFormType>();

    const handleSubmit = handleFormSubmit(async (formValues) => {
        const result = await sendRegistrationEmail(formValues);
        if (result) {
            notifications.show({
                message: "Registration submitted successfully!",
                color: "green",
            });
            return;
        }
        notifications.show({
            message: "Failed to submit registration. Please try again.",
            color: "red",
        });
    });

    const renderField = (field: FieldDefinition) => {
        const commonProps = {
            label: field.label,
            withAsterisk: field.required,
            w: "100%",
            key: field.name,
            error: errors[field.name]?.message as string,
        };

        const validationRules = {
            required: field.required ? "This field is required" : false,
        };

        if (field.type === "select" && field.source === "Exam") {
            return (
                <Select
                    {...commonProps}
                    {...register(field.name, validationRules)}
                    data={exams}
                    onChange={(value) => setValue(field.name, value)}
                    error={errors[field.name]?.message as string}
                />
            );
        }

        if (field.type === "date") {
            return (
                <TextInput
                    {...commonProps}
                    type="date"
                    {...register(field.name, validationRules)}
                />
            );
        }

        return (
            <TextInput
                {...commonProps}
                type={field.type}
                {...register(field.name, {
                    ...validationRules,
                    pattern:
                        field.type === "email"
                            ? {
                                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                                  message: "Invalid email address",
                              }
                            : undefined,
                })}
            />
        );
    };

    return (
        <Container size="sm" py="xl">
            <Paper shadow="md" p="xl" radius="md" withBorder>
                <Title order={2} ta="center">
                    {title}
                </Title>
                {description && (
                    <Text c="dimmed" ta="center" mt="sm">
                        {description}
                    </Text>
                )}
                <Space h="xl" />
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="md">
                        {fields?.map((field) => renderField(field))}
                        <Button type="submit" loading={isSubmitting} fullWidth mt="xl">
                            {submitContent || "Submit"}
                        </Button>
                    </Flex>
                </form>
            </Paper>
        </Container>
    );
}
