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
