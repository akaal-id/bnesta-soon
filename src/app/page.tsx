import { Hero } from "./home/Hero/Hero";
import { SectionIntro } from "./home/SectionIntro/SectionIntro";
import { Terrace } from "./home/Terrace/Terrace";
import { Profile } from "./home/Profile/Profile";
import { CommonSpaces } from "./home/CommonSpaces/CommonSpaces";
import { Footer } from "@/components";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SectionIntro />
        <Profile />
        <Terrace />
        <CommonSpaces />
      </main>
      <Footer />
    </>
  );
}


