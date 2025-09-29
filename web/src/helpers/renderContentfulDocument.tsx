import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS, Document } from "@contentful/rich-text-types";
import { Anchor, Blockquote, Divider, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";

function isRichTextDocument(value: any): value is Document {
    return !!value && value.nodeType === "document" && Array.isArray(value.content);
}

export function renderContentfulDocument(doc: Document | string | null | undefined) {
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

            // Use native lists to avoid SSR/client boundary issues with Mantine List
            [BLOCKS.UL_LIST]: (_n, c) => (
                <ul style={{ paddingLeft: 24, marginBottom: "0.75rem" }}>{c}</ul>
            ),
            [BLOCKS.OL_LIST]: (_n, c) => (
                <ol style={{ paddingLeft: 24, marginBottom: "0.75rem" }}>{c}</ol>
            ),
            [BLOCKS.LIST_ITEM]: (_n, c) => <li style={{ marginBottom: 6 }}>{c}</li>,

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
                <table style={{ width: "100%", borderCollapse: "collapse", margin: "1rem 0" }}>
                    <tbody>{c}</tbody>
                </table>
            ),
            [BLOCKS.TABLE_ROW]: (_n, c) => <tr>{c}</tr>,
            [BLOCKS.TABLE_HEADER_CELL]: (_n, c) => (
                <th
                    style={{
                        border: "1px solid var(--mantine-color-gray-3)",
                        padding: 8,
                        textAlign: "left",
                    }}
                >
                    {c}
                </th>
            ),
            [BLOCKS.TABLE_CELL]: (_n, c) => (
                <td style={{ border: "1px solid var(--mantine-color-gray-3)", padding: 8 }}>{c}</td>
            ),

            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                const file = node?.data?.target?.fields?.file;
                const details = file?.details?.image;
                const width: number | undefined = details?.width;
                const height: number | undefined = details?.height;
                const title = node?.data?.target?.fields?.title ?? "";
                const description = node?.data?.target?.fields?.description ?? title;
                const url = typeof file?.url === "string" ? `https:${file.url}` : undefined;

                if (!url) return null;

                return (
                    <Stack align="center" gap="xs" my="sm">
                        {width && height ? (
                            <Image
                                src={url}
                                alt={description}
                                width={width}
                                height={height}
                                style={{ width: "100%", height: "auto" }}
                            />
                        ) : (
                            <div style={{ position: "relative", width: "100%", minHeight: 200 }}>
                                <Image
                                    src={url}
                                    alt={description}
                                    fill
                                    sizes="100vw"
                                    style={{ objectFit: "contain" }}
                                />
                            </div>
                        )}
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
