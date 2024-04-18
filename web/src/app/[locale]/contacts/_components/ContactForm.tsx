"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import {
  Button,
  Flex,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ContactPageResponse } from "../action";

export type ContactFormProps = {
  contactPageContent: ContactPageResponse;
  sendContactEmail: (request: ContactFormType) => Promise<boolean>;
};

export type ContactFormType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  contactMessage: string;
};

export function ContactForm({
  contactPageContent,
  sendContactEmail,
}: Readonly<ContactFormProps>) {
  const locale = useCurrentLocale();
  const links = getAppLinks(locale);
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<ContactFormType>({ mode: "onBlur" });
  const router = useRouter();
  const pageT = useScopedI18n("contactPage");
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;

  const handleSubmit = handleFormSubmit(async (formValues) => {
    const result = await sendContactEmail(formValues);
    if (result) {
      notifications.show({
        message: pageT("messages.sendMailSuccess"),
        color: "green",
      });
      router.push(links.home());
      return;
    }
    notifications.show({
      message: pageT("messages.sendMailFailure"),
      color: "red",
    });
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
          required: pageT("messages.required"),
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
        withAsterisk
        label={pageT("labels.fullName")}
        {...register("fullName", {
          required: pageT("messages.required"),
        })}
        error={errors.fullName?.message}
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
        withAsterisk
        label={pageT("labels.contactMessage")}
        autosize
        {...register("contactMessage", {
          required: pageT("messages.required"),
        })}
        w="100%"
        error={errors.contactMessage?.message}
      />
      <Space h="lg" />
      <Button fullWidth onClick={handleSubmit}>
        {pageT("actions.submit")}
      </Button>
    </Flex>
  );
}
