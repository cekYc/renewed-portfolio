import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eray — Backend-Focused Full-Stack Developer",
  description:
    "Portfolio of EraycekYc — building programming languages, DNS resolvers, real-time apps, and everything in between. Python · Node.js · Go · Rust · C++",
  keywords: [
    "Eray",
    "cekYc",
    "portfolio",
    "backend developer",
    "full-stack",
    "Go",
    "Rust",
    "TypeScript",
    "Python",
    "systems programming",
  ],
  authors: [{ name: "Eray", url: "https://github.com/cekYc" }],
  openGraph: {
    title: "Eray — Backend-Focused Full-Stack Developer",
    description:
      "Building programming languages, DNS resolvers, real-time apps, and everything in between.",
    url: "https://github.com/cekYc",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-bg-primary text-text-primary noise-bg grid-bg`}
      >
        {children}
      </body>
    </html>
  );
}
