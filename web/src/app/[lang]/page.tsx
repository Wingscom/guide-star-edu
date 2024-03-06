import { Language, getLocale } from "./locales";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const loc = await getLocale(lang);
  return (
    <div className="flex flex-col">
    </div>
  );
}
