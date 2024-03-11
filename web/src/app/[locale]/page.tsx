import { Countries } from "./_components/Countries/Countries";
import { Hero } from "./_components/Hero/Hero";
import { News } from "./_components/News/News";
import { Questions } from "./_components/Questions/Questions";

export default async function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Countries />
      <News />
      <Questions />
    </div>
  );
}
