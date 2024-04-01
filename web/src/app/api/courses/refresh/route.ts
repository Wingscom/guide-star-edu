import { cacheTags } from "@/constants/cacheTags";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  revalidateTag(cacheTags.courses);
  return new Response(null, {
    status: 204,
  });
}
