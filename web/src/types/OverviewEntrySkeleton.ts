import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type OverviewFields = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  thumbnail?: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
};

export type OverviewEntrySkeleton = {
  contentTypeId: typeof contentfulIds.countryOverview;
  fields: OverviewFields;
};
