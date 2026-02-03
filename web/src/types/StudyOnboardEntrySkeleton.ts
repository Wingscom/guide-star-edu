import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type StudyOnboardFields = {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    content: EntryFieldTypes.RichText
    slug: EntryFieldTypes.Text;
    thumbnail?: EntryFieldTypes.AssetLink;
};

export type StudyOnboardEntrySkeleton = {
    contentTypeId: typeof contentfulIds.studyOnboard;
    fields: StudyOnboardFields;
};
