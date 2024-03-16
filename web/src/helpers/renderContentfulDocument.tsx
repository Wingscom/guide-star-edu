import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import { Center, Stack, Text } from "@mantine/core";

export const renderContentfulDocument = (doc: Document) => {
  // TODO: Extend to pass option
  return documentToReactComponents(doc, {
    preserveWhitespace: true,
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        return (
          <Stack align="center" gap="xs">
            <img
              src={`https:${node.data.target.fields.file.url}`}
              width="100%"
              alt={node.data.target.fields.description}
            />
            <Text size="sm">{node.data.target.fields.title}</Text>
          </Stack>
        );
      },
    },
  });
};
