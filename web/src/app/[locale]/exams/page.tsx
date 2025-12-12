import { getInformationRegisterForm, getListExamsAvailable } from "./action";
import { RegistrationForm } from "./_components/RegistrationForm";
import { ExamList } from "./_components/ExamList";
import { Container, Space } from "@mantine/core";
import { FieldDefinition } from "@/types/RegistrationFormExam";

export default async function RegistrationExam() {
    const formContent = await getInformationRegisterForm();
    const exams = await getListExamsAvailable();

    return (
        <Container size="xl">
            {exams && exams.length > 0 && (
                <>
                    <ExamList exams={exams} />
                    <Space h="xl" />
                </>
            )}

            {formContent ? (
                <RegistrationForm
                    title={formContent?.title}
                    description={formContent?.description}
                    fields={formContent?.fields as unknown as FieldDefinition[]}
                    submitContent={formContent?.submit_content}
                    exams={formContent?.exams}
                />
            ) : (
                <div>No registration form found.</div>
            )}
        </Container>
    );
}
