import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type ExamFields = {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    structure?: EntryFieldTypes.Object;
    fee: EntryFieldTypes.Number;
    icon?: EntryFieldTypes.AssetLink;
    freeStr: EntryFieldTypes.Symbol;
};

export type ExamEntrySkeleton = {
    contentTypeId: typeof contentfulIds.listExams;
    fields: ExamFields;
};
