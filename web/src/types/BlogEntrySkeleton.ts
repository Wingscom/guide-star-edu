import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type BlogFields = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  category: EntryFieldTypes.Text;
  date?: EntryFieldTypes.Date;
  thumbnail?: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
};

export type BlogEntrySkeleton = {
  contentTypeId: typeof contentfulIds.blog;
  fields: BlogFields;
};
