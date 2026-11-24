import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DotGlow } from "@/components/DotGlow";

const dmSans = DM_Sans({
  variable: "--font-body",
  axes: ["opsz"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jingchen-dev.vercel.app"),
  title: { default: "Jing Chen", template: "%s · Jing Chen" },
  description:
    "Designer and software engineer in Sydney, building accessible web apps.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body>
        <DotGlow />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
