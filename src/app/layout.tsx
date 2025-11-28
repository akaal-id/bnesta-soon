import type { Metadata } from "next";
import { Mulish, Lora } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-mulish",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  style: ['normal', 'italic'],
  weight: ["400", "500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BNesta Villas | Be at Your Nest",
  description:
    "Immerse yourself in BNesta Villas—serene spaces in Canggu, Bali designed for rest, recovery, and belonging.",
  icons: {
    icon: "/images/icon/onlyb.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} ${lora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
