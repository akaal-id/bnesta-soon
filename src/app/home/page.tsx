import type { Metadata } from "next";
import { Hero } from "./Hero/Hero";
import { SectionIntro } from "./SectionIntro/SectionIntro";
import { Terrace } from "./Terrace/Terrace";
import { Profile } from "./Profile/Profile";
import { Footer } from "@/components";

export const metadata: Metadata = {
  title: "BNesta | Will Open in January 2026 | Kerobokan, Bali",
  description:
    "Private calm. Simple living. BNesta Villas in Kerobokan, Bali - Opening January 2026. Be at Ease. Be Authentic. Be at Your Nest.",
  keywords: [
    "BNesta",
    "Bali",
    "Kerobokan",
    "Villa",
    "Luxury",
    "Private",
    "Simple Living",
    "January 2026",
  ],
  openGraph: {
    title: "BNesta | Will Open in January 2026 | Kerobokan, Bali",
    description:
      "Private calm. Simple living. BNesta Villas in Kerobokan, Bali - Opening January 2026.",
    type: "website",
    locale: "en_US",
    siteName: "BNesta",
  },
  twitter: {
    card: "summary_large_image",
    title: "BNesta | Will Open in January 2026 | Kerobokan, Bali",
    description:
      "Private calm. Simple living. BNesta Villas in Kerobokan, Bali - Opening January 2026.",
  },
};

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SectionIntro />
        <Profile />
        <Terrace />
      </main>
      <Footer />
    </>
  );
}
