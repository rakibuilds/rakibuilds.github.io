export type LabNote = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
};

export const labNotes: LabNote[] = [
  {
    slug: "future-of-local-ai",
    title: "The Future of Local AI in 2026",
    date: "Nov 17, 2026",
    excerpt: "Why I believe self-hosted AI is the only way to guarantee privacy and absolute control.",
    content: `
## The Cloud is Convenient, But Risky
Relying on third-party APIs for AI means sending your sensitive data to servers you don't control. In 2026, local AI is no longer just a hobby.

## Hardware is Catching Up
With the release of new consumer GPUs and Apple Silicon, running 70B parameter models locally is becoming a reality. 

### What this means for developers
You can now build entirely offline AI agents. This is a massive shift in how we think about data privacy.
    `
  },
  {
    slug: "building-rakibul-ai-labs",
    title: "Why I Built Rakibul AI Labs",
    date: "Nov 15, 2026",
    excerpt: "A personal playground for R&D, experimentation, and building from the ground up.",
    content: `
## The Solo Builder Journey
I wanted a space that wasn't just a standard portfolio. I wanted an R&D lab.

This site is built with Next.js, Three.js, and Tailwind. It's completely static, hosted on GitHub Pages, and shows my ongoing experiments.
    `
  }
];