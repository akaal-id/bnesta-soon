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
  alternates: {
    canonical: "https://www.bnesta.id/home",
  },
  openGraph: {
    title: "BNesta | Will Open in January 2026 | Kerobokan, Bali",
    description:
      "Private calm. Simple living. BNesta Villas in Kerobokan, Bali - Opening January 2026.",
    type: "website",
    locale: "en_US",
    siteName: "BNesta",
    url: "https://www.bnesta.id/home",
    images: [
      {
        url: "/images/icon/onlyb.png",
        width: 512,
        height: 512,
        alt: "BNesta Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BNesta | Will Open in January 2026 | Kerobokan, Bali",
    description:
      "Private calm. Simple living. BNesta Villas in Kerobokan, Bali - Opening January 2026.",
    images: ["/images/icon/onlyb.png"],
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
