import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type HeroFields = {
  title: EntryFieldTypes.Text;
  backgroundImage?: EntryFieldTypes.AssetLink;
  description: EntryFieldTypes.Text;
  actionText: EntryFieldTypes.Text;
};

export type HeroEntrySkeleton = {
  contentTypeId: typeof contentfulIds.hero;
  fields: HeroFields;
};
