import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { StructuredData } from "@/components";
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

// Lazy load all sections
const Hero = dynamic(() => import("./home/Hero/Hero").then(mod => ({ default: mod.Hero })), {
  loading: () => <div style={{ minHeight: '100vh' }} />,
});

const SectionIntro = dynamic(() => import("./home/SectionIntro/SectionIntro").then(mod => ({ default: mod.SectionIntro })), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});

const Profile = dynamic(() => import("./home/Profile/Profile").then(mod => ({ default: mod.Profile })), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});

const Terrace = dynamic(() => import("./home/Terrace/Terrace").then(mod => ({ default: mod.Terrace })), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});

const CommonSpaces = dynamic(() => import("./home/CommonSpaces/CommonSpaces").then(mod => ({ default: mod.CommonSpaces })), {
  loading: () => <div style={{ minHeight: '600px' }} />,
});

// SEO Structured Data for each section
const heroStructuredData = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "BNesta Villas",
  "description": "Private calm. Simple living. BNesta Villas in Kerobokan, Bali - Opening January 2026. Be at Ease. Be Authentic. Be at Your Nest.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Tunjung I, Kerobokan Kelod",
    "addressLocality": "Kerobokan",
    "addressRegion": "Bali",
    "postalCode": "80117",
    "addressCountry": "ID"
  },
  "openingDate": "2026-01-01",
  "image": "/images/logo/bnesta-logo.png"
};

const introStructuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "BNesta Bali - A Quiet Retreat for a Steady Reset",
  "description": "BNesta is a private villa retreat in Kerobokan, designed for emotional recovery, spatial comfort, and daily habits. Stay in stillness. Reset in rhythm.",
  "mainEntity": {
    "@type": "LodgingBusiness",
    "name": "BNesta Villas",
    "description": "A private villa retreat designed for emotional recovery, spatial comfort, and daily habits."
  }
};

const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Five Villas, Five Atmospheres",
  "description": "Each of BNesta's five villas carries a different theme shaped by light, nature, or texture.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Five unique villa themes"
    }
  ]
};

const terraceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Daily Rhythm Restoration",
  "description": "BNesta is shaped to help guests naturally restore four simple daily habits: mindful nourishment, movement without pressure, daily stillness, and balanced rhythm.",
  "provider": {
    "@type": "LodgingBusiness",
    "name": "BNesta Villas"
  }
};

const experienceStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Effortless, Private Living",
  "description": "The BNesta experience feels quiet and intuitive. Check in is smooth, guidance is digital, and the villa responds softly to your presence.",
  "provider": {
    "@type": "LodgingBusiness",
    "name": "BNesta Villas"
  }
};

export default function Home() {
  return (
    <>
      <StructuredData data={heroStructuredData} />
      <StructuredData data={introStructuredData} />
      <StructuredData data={profileStructuredData} />
      <StructuredData data={terraceStructuredData} />
      <StructuredData data={experienceStructuredData} />
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


