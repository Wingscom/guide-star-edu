"use client";

import {
  Button,
  Flex,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { Locale } from "../../locales";
import { ContactPageResponse } from "../action";
import { useForm } from "react-hook-form";

export type ContactFormProps = {
  contactPageContent: ContactPageResponse;
  locale: Locale;
};

export type ContactFormType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  contactMessage: string;
};

export function ContactForm({ contactPageContent, locale }: ContactFormProps) {
  const {
    register,
    formState: { errors },
  } = useForm<ContactFormType>();
  const pageLocale = locale.contactPage;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  return (
    <Flex direction="column">
      <Title size="5rem">{contactPageContent.contactFormTitle}</Title>
      <Space h="sm" />
      {contactPageContent.contactFormSubtitle && (
        <>
          <Text>{contactPageContent.contactFormSubtitle}</Text>
          <Space h="md" />
        </>
      )}
      <TextInput
        size="md"
        withAsterisk
        label={pageLocale.labels.email}
        {...register("email", {
          required: pageLocale.messages.emailRequired,
          pattern: {
            value: emailRegex,
            message: pageLocale.messages.emailInvalid,
          },
        })}
        error={errors.email?.message}
        className="w-full"
      />
      <Space h="md" />
      <TextInput
        size="md"
        label={pageLocale.labels.fullName}
        {...register("fullName")}
        className="w-full"
      />
      <Space h="md" />
      <TextInput
        size="md"
        label={pageLocale.labels.phoneNumber}
        {...register("phoneNumber")}
        className="w-full"
      />
      <Space h="md" />
      <Textarea
        size="md"
        label={pageLocale.labels.contactMessage}
        autosize
        {...register("contactMessage")}
        className="w-full"
      />
      <Space h="lg" />
      <Button fullWidth>{pageLocale.actions.submit}</Button>
    </Flex>
  );
}
