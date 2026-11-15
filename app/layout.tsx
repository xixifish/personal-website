import type { Metadata } from "next";
import { Sacramento, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const dmSans = DM_Sans({
  variable: "--font-body",
  axes: ["opsz"],
  subsets: ["latin"],
});

const sacramento = Sacramento({
  variable: "--font-logo",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jing Chen",
  description:
    "Designer and software engineer in Sydney, building accessible web apps.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${sacramento.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
