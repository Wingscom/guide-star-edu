"use client";

import { useScopedI18n } from "@/locales/client";
import {
  Button,
  Flex,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { ContactPageResponse } from "../action";

export type ContactFormProps = {
  contactPageContent: ContactPageResponse;
};

export type ContactFormType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  contactMessage: string;
};

export function ContactForm({
  contactPageContent,
}: Readonly<ContactFormProps>) {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<ContactFormType>({ mode: "onBlur" });
  const pageT = useScopedI18n("contactPage");
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  const handleSubmit = handleFormSubmit((formValues) => {
    console.log("Submit form");
    // TODO: implement
  });

  return (
    <Flex direction="column">
      <Title size="5rem">{contactPageContent.contactFormTitle}</Title>
      <Space h="lg" />
      {contactPageContent.contactFormSubtitle && (
        <>
          <Text>{contactPageContent.contactFormSubtitle}</Text>
          <Space h="lg" />
        </>
      )}
      <TextInput
        size="md"
        withAsterisk
        label={pageT("labels.email")}
        {...register("email", {
          required: pageT("messages.emailRequired"),
          pattern: {
            value: emailRegex,
            message: pageT("messages.emailInvalid"),
          },
        })}
        error={errors.email?.message}
        w="100%"
      />
      <Space h="md" />
      <TextInput
        size="md"
        label={pageT("labels.fullName")}
        {...register("fullName")}
        w="100%"
      />
      <Space h="md" />
      <TextInput
        size="md"
        label={pageT("labels.phoneNumber")}
        {...register("phoneNumber")}
        w="100%"
      />
      <Space h="md" />
      <Textarea
        size="md"
        label={pageT("labels.contactMessage")}
        autosize
        {...register("contactMessage")}
        w="100%"
      />
      <Space h="lg" />
      <Button fullWidth onClick={handleSubmit}>
        {pageT("actions.submit")}
      </Button>
    </Flex>
  );
}
