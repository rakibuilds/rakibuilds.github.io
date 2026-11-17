import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getContent } from "@/lib/content-loader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rakibuilds.github.io'),
  title: {
    default: "Rakibul AI Labs | AI Infrastructure & Local LLMs in Assam",
    template: "%s | Rakibul AI Labs",
  },
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
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rakibul AI Labs Banner",
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
    images: ["/og-image.webp"],
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
  const searchItems = [
    ...getContent('experiments').map((e) => ({
      ...e,
      type: 'experiments' as const,
    })),
    ...getContent('lab-notes').map((n) => ({
      ...n,
      type: 'lab-notes' as const,
    })),
    ...getContent('projects').map((p) => ({
      ...p,
      type: 'projects' as const,
    })),
  ];

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#03040a] text-white">
        <Navbar searchItems={searchItems} />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}