import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";
import { Anchor, Blockquote, Divider, List, Stack, Table, Text, Title } from "@mantine/core";

function isRichTextDocument(value: any): value is Document {
    return !!value && value.nodeType === "document" && Array.isArray(value.content);
}

export function renderContentfulDocument(doc: Document) {
    if (!doc) return null;

    let richDoc: Document | null = null;
    if (typeof doc === "string") {
        try {
            const parsed = JSON.parse(doc);
            if (isRichTextDocument(parsed)) richDoc = parsed;
        } catch {}
    } else if (isRichTextDocument(doc)) {
        richDoc = doc;
    }

    if (!richDoc) {
        return <Text style={{ whiteSpace: "pre-wrap" }}>{typeof doc === "string" ? doc : ""}</Text>;
    }

    const options: Options = {
        preserveWhitespace: true,
        renderMark: {
            [MARKS.BOLD]: (text) => (
                <Text span fw={700}>
                    {text}
                </Text>
            ),
            [MARKS.ITALIC]: (text) => (
                <Text span fs="italic">
                    {text}
                </Text>
            ),
            [MARKS.UNDERLINE]: (text) => (
                <Text span td="underline">
                    {text}
                </Text>
            ),
            [MARKS.CODE]: (text) => <code>{text}</code>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (_node, children) => <Text mb="sm">{children}</Text>,

            [BLOCKS.HEADING_1]: (_n, c) => (
                <Title order={1} mt="md" mb="sm">
                    {c}
                </Title>
            ),
            [BLOCKS.HEADING_2]: (_n, c) => (
                <Title order={2} mt="md" mb="sm">
                    {c}
                </Title>
            ),
            [BLOCKS.HEADING_3]: (_n, c) => (
                <Title order={3} mt="md" mb="xs">
                    {c}
                </Title>
            ),
            [BLOCKS.HEADING_4]: (_n, c) => (
                <Title order={4} mt="sm" mb="xs">
                    {c}
                </Title>
            ),
            [BLOCKS.HEADING_5]: (_n, c) => (
                <Title order={5} mt="sm" mb="xs">
                    {c}
                </Title>
            ),
            [BLOCKS.HEADING_6]: (_n, c) => (
                <Title order={6} mt="sm" mb="xs">
                    {c}
                </Title>
            ),

            [BLOCKS.UL_LIST]: (_n, c) => (
                <List withPadding mb="sm">
                    {c}
                </List>
            ),
            [BLOCKS.OL_LIST]: (_n, c) => (
                <List type="ordered" withPadding mb="sm">
                    {c}
                </List>
            ),
            [BLOCKS.LIST_ITEM]: (_n, c) => <List.Item>{c}</List.Item>,

            [BLOCKS.QUOTE]: (_n, c) => <Blockquote my="sm">{c}</Blockquote>,
            [BLOCKS.HR]: () => <Divider my="md" />,

            [INLINES.HYPERLINK]: (node, children) => {
                const href = (node.data.uri || "") as string;
                return (
                    <Anchor href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                    </Anchor>
                );
            },

            [BLOCKS.TABLE]: (_n, c) => (
                <Table withTableBorder withColumnBorders my="md">
                    <Table.Tbody>{c}</Table.Tbody>
                </Table>
            ),
            [BLOCKS.TABLE_ROW]: (_n, c) => <Table.Tr>{c}</Table.Tr>,
            [BLOCKS.TABLE_HEADER_CELL]: (_n, c) => <Table.Th>{c}</Table.Th>,
            [BLOCKS.TABLE_CELL]: (_n, c) => <Table.Td>{c}</Table.Td>,

            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const file = node?.data?.target?.fields?.file;
                const title = node?.data?.target?.fields?.title ?? "";
                const description = node?.data?.target?.fields?.description ?? title;
                const url = typeof file?.url === "string" ? `https:${file.url}` : undefined;

                if (!url) return null;

                return (
                    <Stack align="center" gap="xs" my="sm">
                        <img src={url} width="100%" alt={description} />
                        {title ? (
                            <Text size="sm" c="dimmed">
                                {title}
                            </Text>
                        ) : null}
                    </Stack>
                );
            },
        },
    };

    return documentToReactComponents(richDoc, options);
}
