import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rakibul AI Labs | AI Infrastructure & Local LLMs in Assam",
  description: "Rakibul AI Labs is a premier AI research sandbox based in Assam, India. We build self-hosted AI infrastructure, run local LLMs, and develop agentic AI workflows. Explore our experiments in privacy-first AI.",
  keywords: [
    "AI in Assam", 
    "Rakibul AI Labs", 
    "Local LLMs", 
    "Self-hosted AI", 
    "Agentic Workflows", 
    "AI infrastructure India", 
    "Rakibul Islam AI",
    "Assam tech startups",
    "open source AI Assam"
  ],
  authors: [{ name: "Rakibul Islam" }],
  creator: "Rakibul Islam",
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    title: "Rakibul AI Labs | AI Infrastructure & Local LLMs",
    description: "Building self-hosted AI systems, local LLMs, and agentic workflows from Assam, India.",
    url: "https://rakibuilds.github.io/",
    siteName: "Rakibul AI Labs",
    images: [
      {
        url: "/logo.svg", 
        width: 800,
        height: 800,
        alt: "Rakibul AI Labs Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakibul AI Labs",
    description: "Building self-hosted AI systems, local LLMs, and agentic workflows from Assam, India.",
    creator: "@rakibuilds",
    images: ["/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#03040a] text-white">
        {children}
      </body>
    </html>
  );
}