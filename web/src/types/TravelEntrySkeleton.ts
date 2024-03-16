import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type TravelFields = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  bannerImage?: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
};

export type TravelEntrySkeleton = {
  contentTypeId: typeof contentfulIds.travel;
  fields: TravelFields;
};
