import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import StarField from "@/components/StarField/StarField";
import Preloader from "@/components/Preloader/Preloader";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ryuzv.io",
  description: "Pesonal Portofolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* <Preloader /> */}
        <StarField />
        {children}
        <MusicPlayer />
        <Script defer src="https://cloud.umami.is/script.js" data-website-id="9bb242ba-b5f6-4a89-ad5a-719b112fa7eb" strategy="afterInteractive" />
      </body>
    </html>
  );
}
