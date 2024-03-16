import { BLogList } from "../blogs/_components/BlogList";
import { searchSettlements } from "./action";

export default async function BlogsPage({
  searchParams: { search, page },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const posts = await searchSettlements({ search, page });

  return <></>;
}
