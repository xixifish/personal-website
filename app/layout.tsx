import type { Metadata } from "next";
import { Kalam, Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-body",
  weight: ["400", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const kalam = Kalam({
  variable: "--font-hand",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jing Chen",
  description:
    "Designer and software engineer in Sydney, building accessible web apps.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lato.variable} ${kalam.variable}`}>
      <body>{children}</body>
    </html>
  );
}
