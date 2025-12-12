import { getInformationRegisterForm } from "./action";
import { RegistrationForm } from "./_components/RegistrationForm";
import { FieldDefinition } from "@/types/RegistrationFormExam";
import { getScopedI18n } from "@/locales/server";

export default async function RegistrationExam() {
    const pageT = await getScopedI18n("contactPage");
    const formContent = await getInformationRegisterForm();

    if (!formContent) {
        return <div>No registration form found.</div>;
    }

    return (
        <RegistrationForm
            title={formContent?.title}
            description={formContent?.description}
            fields={formContent?.fields as unknown as FieldDefinition[]}
            submitContent={formContent?.submit_content}
            exams={formContent?.exams}
        />
    );
}
