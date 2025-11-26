import {
  Hero,
  SectionIntro,
  Terrace,
  Profile,
  SiteFooter,
} from "@/components";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SectionIntro />
        <Terrace />
        <Profile />
      </main>
      <SiteFooter />
    </>
  );
}
