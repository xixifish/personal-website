import type { Metadata } from "next";
import { Sacramento, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  weight: ["500", "600", "700"],
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
      <body>{children}</body>
    </html>
  );
}
