import { getAppLinks } from "@/links";
import { redirect } from "next/navigation";

export default function Home() {
  // TODO: Get user language
  const lang = "en";
  const links = getAppLinks(lang);
  redirect(links.home());
}
