import { Cpu, Database, Code2, LucideIcon } from 'lucide-react';

export type Experiment = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  iconColor: string;
  link: string;
  content: string;
};

export const siteConfig = {
  name: "Rakibul AI Labs",
  github: "https://github.com/rakibuilds",
  twitter: "https://x.com/rakibuilds",
  mainPortfolio: "https://rakibul-labs.netlify.app/",
};

export const experiments: Experiment[] = [
  {
    slug: "local-llm-agent",
    title: "Local LLM Agent",
    description: "An autonomous agent running entirely offline using Ollama and LangChain for private data analysis and task execution.",
    tags: ["Python", "LangChain", "Ollama"],
    icon: Cpu,
    iconColor: "text-cyan-400",
    link: "https://github.com/rakibuilds",
    content: `
## The Hypothesis
Running LLMs locally requires significant hardware resources, and orchestrating an agent that can reliably use tools without hallucinating is difficult. Can we build a completely private agent?

## The Build
I built a fully offline agent using **Ollama** to serve the models and **LangChain** to manage the memory and tool usage. The system uses a local SQLite database for memory.

### Key Features
- **100% Offline:** No data ever leaves the machine.
- **Tool Use:** The agent can search local files and execute Python code safely.
- **Fast Inference:** Optimized using quantized GGUF models.
    `
  },
  {
    slug: "private-rag-system",
    title: "Private RAG System",
    description: "A self-hosted Retrieval-Augmented Generation pipeline that ensures complete data privacy without relying on external APIs.",
    tags: ["Next.js", "Supabase", "AI"],
    icon: Database,
    iconColor: "text-purple-400",
    link: "https://github.com/rakibuilds",
    content: `
## The Hypothesis
Most RAG systems rely on OpenAI or Pinecone, meaning sensitive documents are sent to third-party servers. Can we build a fast, local alternative?

## The Build
This pipeline uses **Supabase (pgvector)** to store document embeddings and a local embedding model (like Nomic-Embed) to process documents. 

### Architecture
1. Documents are chunked and embedded locally.
2. Vectors are stored in a self-hosted Supabase instance.
3. When a user asks a question, the app retrieves relevant chunks and sends them to a local LLM (Ollama) to generate the answer.
    `
  },
  {
    slug: "ui-component-lab",
    title: "UI Component Lab",
    description: "Experimental React components with Framer Motion and Three.js for modern, interactive web interfaces.",
    tags: ["React", "Three.js", "Framer Motion"],
    icon: Code2,
    iconColor: "text-emerald-400",
    link: "https://github.com/rakibuilds",
    content: `
## The Hypothesis
Standard web layouts are boring. How can we blend 3D graphics with standard web layouts without destroying performance?

## The Build
This lab contains various UI components that use WebGL and Framer Motion.

### Technologies Used
- **@react-three/fiber:** For declarative 3D rendering.
- **Framer Motion:** For fluid layout animations and page transitions.
- **Tailwind CSS:** For rapid styling.
    `
  }
];