import { getAppLinks } from "@/links";
import { getCurrentLocale } from "@/locales/server";
import { BlogList } from "./_components/BlogList";
import { searchPosts } from "./action";

export default async function BlogsPage({
  searchParams: { search, page },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const posts = await searchPosts({ search, page });
  const locale = getCurrentLocale();
  const links = getAppLinks(locale);

  return <BlogList posts={posts} />;
}
