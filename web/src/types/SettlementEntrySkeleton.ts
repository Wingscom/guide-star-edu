import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type SettlementFields = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  bannerImage?: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
};

export type SettlementEntrySkeleton = {
  contentTypeId: typeof contentfulIds.settlement;
  fields: SettlementFields;
};
