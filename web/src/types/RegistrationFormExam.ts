import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type RegistrationFormExamFields = {
    title: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    fields: EntryFieldTypes.Object;
    submit_content: EntryFieldTypes.Symbol;
    exams: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
};

export type RegistrationFormExamEntrySkeleton = {
    contentTypeId: typeof contentfulIds.registrationFormEnglishExam;
    fields: RegistrationFormExamFields;
};

export interface FieldDefinition {
    name: string;
    type: "text" | "email" | "select" | "date";
    label: string;
    required: boolean;
    source?: string;
}
