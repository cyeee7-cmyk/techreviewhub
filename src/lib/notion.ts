import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATA_SOURCE_ID = process.env.NOTION_DATA_SOURCE_ID || "";

interface NotionPageItem {
  id: string;
  properties: Record<string, any>;
  created_time: string;
  last_edited_time: string;
}

function getPlainText(prop: any): string {
  if (!prop) return "";
  if (prop.type === "title") {
    return prop.title?.map((t: any) => t.plain_text).join("") || "";
  }
  if (prop.type === "rich_text") {
    return prop.rich_text?.map((t: any) => t.plain_text).join("") || "";
  }
  return "";
}

function getSelectName(prop: any): string {
  if (!prop || prop.type !== "select") return "";
  return prop.select?.name || "";
}

function getMultiSelectNames(prop: any): string[] {
  if (!prop || prop.type !== "multi_select") return [];
  return prop.multi_select?.map((s: any) => s.name) || [];
}

function getNumber(prop: any): number | null {
  if (!prop || prop.type !== "number") return null;
  return prop.number;
}

function getUrl(prop: any): string {
  if (!prop || prop.type !== "url") return "";
  return prop.url || "";
}

function getDate(prop: any): string {
  if (!prop || prop.type !== "date") return "";
  return prop.date?.start || "";
}

function getCheckbox(prop: any): boolean {
  if (!prop || prop.type !== "checkbox") return false;
  return prop.checkbox || false;
}

function getStatus(prop: any): string {
  if (!prop || prop.type !== "status") return "";
  return prop.status?.name || "";
}

export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  type: string;
  category: string;
  tags: string[];
  excerpt: string;
  date: string;
  rating: number | null;
  affiliateLink: string;
  status: string;
  faq: { question: string; answer: string }[];
  author: string;
  readingTime: number | null;
  featured: boolean;
  pros: string[];
  cons: string[];
  content: string;
}

function mapNotionPageToPost(page: NotionPageItem): NotionPost {
  const props = page.properties;

  const faqRaw = getPlainText(props["FAQ"]);
  let faq: { question: string; answer: string }[] = [];
  try {
    faq = JSON.parse(faqRaw);
  } catch {
    if (faqRaw) {
      faq = [{ question: "FAQ", answer: faqRaw }];
    }
  }

  const prosRaw = getPlainText(props["Pros"]);
  const consRaw = getPlainText(props["Cons"]);

  return {
    id: page.id,
    title: getPlainText(props["Name"]),
    slug: getPlainText(props["Slug"]),
    type: getSelectName(props["Type"]),
    category: getSelectName(props["Category"]),
    tags: getMultiSelectNames(props["Tags"]),
    excerpt: getPlainText(props["Excerpt"]),
    date: getDate(props["Date"]),
    rating: getNumber(props["Rating"]),
    affiliateLink: getUrl(props["Affiliate Link"]),
    status: getStatus(props["Status"]),
    faq,
    author: getSelectName(props["Author"]),
    readingTime: getNumber(props["Reading Time"]),
    featured: getCheckbox(props["Featured"]),
    pros: prosRaw ? prosRaw.split("|").map((s: string) => s.trim()).filter(Boolean) : [],
    cons: consRaw ? consRaw.split("|").map((s: string) => s.trim()).filter(Boolean) : [],
    content: "",
  };
}

export async function getAllPosts(): Promise<NotionPost[]> {
  if (!DATA_SOURCE_ID) return [];

  const response = await notion.dataSources.query({
    data_source_id: DATA_SOURCE_ID,
    page_size: 100,
  });

  return response.results
    .filter((item: any) => item.properties)
    .map((item: any) => mapNotionPageToPost(item as NotionPageItem));
}

export async function getPublishedPosts(): Promise<NotionPost[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.status === "Done" && p.slug);
}

export async function getPostBySlug(slug: string): Promise<NotionPost | null> {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostsByType(type: string): Promise<NotionPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.type === type);
}

export async function getPostsByCategory(category: string): Promise<NotionPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.category === category);
}

export async function getFeaturedPosts(): Promise<NotionPost[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.featured);
}

export async function getPageContent(pageId: string): Promise<string> {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    let content = "";
    for (const block of blocks.results as any[]) {
      if (block.type === "paragraph") {
        const text = block.paragraph?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += text + "\n\n";
      } else if (block.type === "heading_1") {
        const text = block.heading_1?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += `# ${text}\n\n`;
      } else if (block.type === "heading_2") {
        const text = block.heading_2?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += `## ${text}\n\n`;
      } else if (block.type === "heading_3") {
        const text = block.heading_3?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += `### ${text}\n\n`;
      } else if (block.type === "bulleted_list_item") {
        const text = block.bulleted_list_item?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += `- ${text}\n`;
      } else if (block.type === "numbered_list_item") {
        const text = block.numbered_list_item?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += `1. ${text}\n`;
      } else if (block.type === "divider") {
        content += "---\n\n";
      } else if (block.type === "quote") {
        const text = block.quote?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += `> ${text}\n\n`;
      } else if (block.type === "callout") {
        const text = block.callout?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        if (text) content += `> 💡 ${text}\n\n`;
      } else if (block.type === "code") {
        const text = block.code?.rich_text
          ?.map((t: any) => t.plain_text)
          .join("");
        const lang = block.code?.language || "";
        if (text) content += `\`\`\`${lang}\n${text}\n\`\`\`\n\n`;
      } else if (block.type === "image") {
        const caption = block.image?.caption
          ?.map((t: any) => t.plain_text)
          .join("");
        if (caption) content += `![${caption}](image)\n\n`;
      }
    }

    return content.trim();
  } catch {
    return "";
  }
}
