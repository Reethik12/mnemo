/**
 * Centralized content and configuration constants for Mnemo.
 * All static data used across components lives here.
 */

// ─── Navigation ──────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Vision", href: "#vision" },
  { label: "Architecture", href: "#architecture" },
];

// ─── Site Metadata ───────────────────────────────────

export const SITE = {
  name: "Mnemo",
  tagline: "The Living Memory Operating System",
  description:
    "The world's first Living Memory Operating System. Unlike ChatGPT memory or NotebookLM, Mnemo creates a persistent memory fabric that grows with you across applications, devices, AI agents and time.",
  url: "https://mnemo.ai",
} as const;

// ─── Modules ─────────────────────────────────────────

export interface ModuleInfo {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  gradient: string;
  glowColor: string;
}

export const MODULES: ModuleInfo[] = [
  {
    id: "memory-fabric",
    title: "Universal Memory Fabric",
    description:
      "One connected knowledge graph from every memory source. Your data woven into a persistent, intelligent fabric.",
    iconKey: "network",
    gradient: "from-[#6D5BFF] to-[#8F7DFF]",
    glowColor: "rgba(109, 91, 255, 0.2)",
  },
  {
    id: "living-intelligence",
    title: "Living Intelligence",
    description:
      "AI that understands, connects, and reasons across your memories. Not search — understanding.",
    iconKey: "brain",
    gradient: "from-[#8F7DFF] to-[#B794F4]",
    glowColor: "rgba(143, 125, 255, 0.2)",
  },
  {
    id: "memory-exchange",
    title: "Memory Exchange",
    description:
      "Securely share memories with people, teams, and AI agents. Collaboration through shared understanding.",
    iconKey: "share",
    gradient: "from-[#4CC9F0] to-[#6DD5FA]",
    glowColor: "rgba(76, 201, 240, 0.2)",
  },
  {
    id: "time-machine",
    title: "Memory Time Machine",
    description:
      "Replay and traverse your memories across time. See how your knowledge evolved and rediscover forgotten insights.",
    iconKey: "clock",
    gradient: "from-[#6D5BFF] to-[#4CC9F0]",
    glowColor: "rgba(109, 91, 255, 0.15)",
  },
  {
    id: "permissions-twin",
    title: "Memory Permissions & Digital Twin",
    description:
      "Complete ownership over your memory. AI representations that act on your behalf with full control.",
    iconKey: "shield",
    gradient: "from-[#B794F4] to-[#6D5BFF]",
    glowColor: "rgba(183, 148, 244, 0.2)",
  },
];

// ─── Features ────────────────────────────────────────

export interface FeatureInfo {
  id: string;
  title: string;
  description: string;
  iconKey: string;
}

export const FEATURES: FeatureInfo[] = [
  {
    id: "knowledge-graph",
    title: "Persistent Knowledge Graph",
    description:
      "Every interaction builds a living knowledge graph that grows smarter over time.",
    iconKey: "graph",
  },
  {
    id: "cross-app",
    title: "Cross-Application Memory",
    description:
      "Memory that travels with you across apps, devices, and AI agents seamlessly.",
    iconKey: "layers",
  },
  {
    id: "connections",
    title: "Intelligent Connections",
    description:
      "Automatically discover hidden connections between your ideas, notes, and conversations.",
    iconKey: "connections",
  },
  {
    id: "understanding",
    title: "Real-Time Understanding",
    description:
      "AI that doesn't just store — it comprehends context, intent, and meaning.",
    iconKey: "sparkle",
  },
  {
    id: "privacy",
    title: "Privacy-First Architecture",
    description:
      "Your memories are yours. End-to-end encryption with granular permission controls.",
    iconKey: "lock",
  },
  {
    id: "developer",
    title: "Developer-Friendly APIs",
    description:
      "Build on top of Mnemo's memory fabric with clean, well-documented APIs.",
    iconKey: "code",
  },
];

// ─── Footer ──────────────────────────────────────────

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Modules", href: "#modules" },
      { label: "Architecture", href: "#architecture" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

// ─── Architecture Layers ─────────────────────────────

export interface ArchitectureLayer {
  id: string;
  title: string;
  description: string;
  items: string[];
  gradient: string;
}

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "applications",
    title: "Applications Layer",
    description: "Where you interact with your memories",
    items: ["Your Apps", "AI Agents", "Devices", "Integrations"],
    gradient: "from-[#4CC9F0]/10 to-[#4CC9F0]/5",
  },
  {
    id: "intelligence",
    title: "Mnemo Intelligence",
    description: "Where understanding happens",
    items: [
      "Knowledge Graph",
      "Memory Fabric",
      "Reasoning Engine",
      "Temporal Index",
    ],
    gradient: "from-[#8F7DFF]/10 to-[#6D5BFF]/5",
  },
  {
    id: "infrastructure",
    title: "Cognee Cloud",
    description: "Where everything is powered",
    items: [
      "Processing Pipeline",
      "Vector Storage",
      "Graph Database",
      "Security Layer",
    ],
    gradient: "from-[#6D5BFF]/10 to-[#B794F4]/5",
  },
];
