import { getAppLinks } from "@/links";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  // TODO: Get user language
  const lang = "vi";
  const links = getAppLinks(lang);
  redirect(links.home());
}
