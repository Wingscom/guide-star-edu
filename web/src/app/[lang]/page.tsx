import { Countries } from "./_components/Countries/Countries";
import { Hero } from "./_components/Hero/Hero";
import { News } from "./_components/News/News";
import { Questions } from "./_components/Questions/Questions";
import { Language } from "./locales";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  return (
    <div className="flex flex-col">
      <Hero lang={lang} />
      <Countries lang={lang} />
      <News lang={lang} />
      <Questions />
    </div>
  );
}
