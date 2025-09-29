import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type TravelFields = {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    slug: EntryFieldTypes.Text;
    country: string;
};

export type TravelEntrySkeleton = {
    contentTypeId: typeof contentfulIds.travel;
    fields: TravelFields;
};

export interface IStepApplicationVisa {
    title: string;
    index: number;
    description: string;
}

export type StepApplicationVisaFields = {
    title: EntryFieldTypes.Text;
    index: EntryFieldTypes.Integer;
    description: EntryFieldTypes.Text;
};

export type VisaApplicationProcessFields = {
    title: EntryFieldTypes.Text;
    steps: IStepApplicationVisa[];
};

export type StepApplicationVisaEntrySkeleton = {
    contentTypeId: typeof contentfulIds.processApplicationVisa;
    fields: VisaApplicationProcessFields;
};
