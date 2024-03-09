import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

export const renderContentfulDocument = (doc: Document) => {
  // TODO: Extend to pass option
  return documentToReactComponents(doc)
}
