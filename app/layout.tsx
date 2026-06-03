import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Slovenske narodne pesmi",
  description: "Zbirka slovenskih narodnih pesmi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sl">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}