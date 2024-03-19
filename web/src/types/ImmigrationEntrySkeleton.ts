import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type ImmigrationFields = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  thumbnail?: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
  date?: EntryFieldTypes.Date
};

export type ImmigrationEntrySkeleton = {
  contentTypeId: typeof contentfulIds.immigration;
  fields: ImmigrationFields;
};
