import { contentfulIds } from "@/constants/contentfulIds";
import { EntryFieldTypes } from "contentful";
import { OverviewEntrySkeleton } from "./OverviewEntrySkeleton";

export type OverviewMenuSkeleton = {
  contentTypeId: typeof contentfulIds.countryMenu;
  fields: {
    title: EntryFieldTypes.Text;
    items: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<OverviewEntrySkeleton>
    >;
  };
};
