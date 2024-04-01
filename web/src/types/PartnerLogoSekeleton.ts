import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";

export type PartnerLogoFields = {
  name: EntryFieldTypes.Text;
  url: EntryFieldTypes.Text;
  image: EntryFieldTypes.AssetLink;
  background: EntryFieldTypes.Text<"Dark" | "Light" | "Neutral">;
};

export type PartnerLogoSkeleton = {
  contentTypeId: typeof contentfulIds.partnerLogo;
  fields: PartnerLogoFields;
};
