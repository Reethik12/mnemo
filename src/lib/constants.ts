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

// ═══════════════════════════════════════════════════════
// PHASE 2: WORKSPACE CONSTANTS
// ═══════════════════════════════════════════════════════

// ─── Sidebar Navigation ──────────────────────────────

import type { SidebarSection } from "@/types/navigation";

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    title: "Main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        iconKey: "home",
      },
    ],
  },
  {
    title: "Modules",
    items: [
      {
        id: "fabric",
        label: "Memory Fabric",
        href: "/dashboard/fabric",
        iconKey: "network",
        badge: "Soon",
        disabled: true,
      },
      {
        id: "intelligence",
        label: "Living Intelligence",
        href: "/dashboard/intelligence",
        iconKey: "brain",
        badge: "Soon",
        disabled: true,
      },
      {
        id: "exchange",
        label: "Memory Exchange",
        href: "/dashboard/exchange",
        iconKey: "share",
        badge: "Soon",
        disabled: true,
      },
      {
        id: "timeline",
        label: "Time Machine",
        href: "/dashboard/timeline",
        iconKey: "clock",
        badge: "Soon",
        disabled: true,
      },
      {
        id: "permissions",
        label: "Permissions",
        href: "/dashboard/permissions",
        iconKey: "shield",
        badge: "Soon",
        disabled: true,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        id: "settings",
        label: "Settings",
        href: "/settings",
        iconKey: "settings",
      },
      {
        id: "profile",
        label: "Profile",
        href: "/profile",
        iconKey: "user",
      },
      {
        id: "help",
        label: "Help",
        href: "/help",
        iconKey: "help",
      },
    ],
  },
];

// ─── Settings Sections ───────────────────────────────

export interface SettingsSection {
  id: string;
  title: string;
  description: string;
  iconKey: string;
}

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: "appearance",
    title: "Appearance",
    description: "Theme, accent color, and visual preferences",
    iconKey: "palette",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Manage notification preferences",
    iconKey: "bell",
  },
  {
    id: "language",
    title: "Language",
    description: "Language and regional settings",
    iconKey: "globe",
  },
  {
    id: "shortcuts",
    title: "Keyboard Shortcuts",
    description: "View and customize shortcuts",
    iconKey: "keyboard",
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description: "Motion, contrast, and reading preferences",
    iconKey: "accessibility",
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "Data sharing and session settings",
    iconKey: "lock",
  },
  {
    id: "account",
    title: "Account",
    description: "Email, password, and account management",
    iconKey: "user",
  },
  {
    id: "about",
    title: "About",
    description: "Version information and credits",
    iconKey: "info",
  },
];

// ─── Keyboard Shortcuts ──────────────────────────────

export interface KeyboardShortcut {
  keys: string[];
  description: string;
  category: string;
}

export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  {
    keys: ["⌘", "\\"],
    description: "Toggle sidebar",
    category: "Navigation",
  },
  { keys: ["⌘", "K"], description: "Open search", category: "Navigation" },
  {
    keys: ["⌘", ","],
    description: "Open settings",
    category: "Navigation",
  },
  { keys: ["Esc"], description: "Close modal / panel", category: "General" },
  {
    keys: ["⌘", "N"],
    description: "New memory (coming soon)",
    category: "Actions",
  },
];

// ─── Quick Actions ───────────────────────────────────

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  href?: string;
  disabled?: boolean;
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "new-memory",
    title: "New Memory",
    description: "Create a new memory",
    iconKey: "plus",
    disabled: true,
  },
  {
    id: "import",
    title: "Import Data",
    description: "Import from external sources",
    iconKey: "upload",
    disabled: true,
  },
  {
    id: "explore",
    title: "Explore Modules",
    description: "Discover available modules",
    iconKey: "grid",
    href: "#modules",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Configure your workspace",
    iconKey: "settings",
    href: "/settings",
  },
  {
    id: "help",
    title: "Help & Docs",
    description: "Get help and documentation",
    iconKey: "help",
    href: "/help",
  },
];

// ─── Dashboard Stats ─────────────────────────────────

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  description: string;
  iconKey: string;
}

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    id: "memories",
    label: "Memories",
    value: "0",
    description: "Start building your memory fabric",
    iconKey: "brain",
  },
  {
    id: "modules",
    label: "Available Modules",
    value: "6",
    description: "Explore the Mnemo ecosystem",
    iconKey: "grid",
  },
  {
    id: "offline",
    label: "Status",
    value: "Offline Ready",
    description: "Your data stays local",
    iconKey: "cloud",
  },
  {
    id: "privacy",
    label: "Privacy",
    value: "Enabled",
    description: "End-to-end encryption ready",
    iconKey: "shield",
  },
];

// ─── Module Cards (Dashboard) ────────────────────────

export interface ModuleCard {
  id: string;
  title: string;
  description: string;
  iconKey: string;
  gradient: string;
  glowColor: string;
  href: string;
  status: "coming-soon" | "active" | "beta";
}

export const MODULE_CARDS: ModuleCard[] = [
  {
    id: "memory-fabric",
    title: "Universal Memory Fabric",
    description:
      "One connected knowledge graph from every memory source. Your data woven into a persistent, intelligent fabric.",
    iconKey: "network",
    gradient: "from-[#6D5BFF] to-[#8F7DFF]",
    glowColor: "rgba(109, 91, 255, 0.2)",
    href: "/dashboard/fabric",
    status: "coming-soon",
  },
  {
    id: "living-intelligence",
    title: "Living Intelligence",
    description:
      "AI that understands, connects, and reasons across your memories. Not search — understanding.",
    iconKey: "brain",
    gradient: "from-[#8F7DFF] to-[#B794F4]",
    glowColor: "rgba(143, 125, 255, 0.2)",
    href: "/dashboard/intelligence",
    status: "coming-soon",
  },
  {
    id: "memory-exchange",
    title: "Memory Exchange",
    description:
      "Securely share memories with people, teams, and AI agents. Collaboration through shared understanding.",
    iconKey: "share",
    gradient: "from-[#4CC9F0] to-[#6DD5FA]",
    glowColor: "rgba(76, 201, 240, 0.2)",
    href: "/dashboard/exchange",
    status: "coming-soon",
  },
  {
    id: "time-machine",
    title: "Memory Time Machine",
    description:
      "Replay and traverse your memories across time. See how your knowledge evolved and rediscover forgotten insights.",
    iconKey: "clock",
    gradient: "from-[#6D5BFF] to-[#4CC9F0]",
    glowColor: "rgba(109, 91, 255, 0.15)",
    href: "/dashboard/timeline",
    status: "coming-soon",
  },
  {
    id: "permissions-twin",
    title: "Permissions & Digital Twin",
    description:
      "Complete ownership over your memory. AI representations that act on your behalf with full control.",
    iconKey: "shield",
    gradient: "from-[#B794F4] to-[#6D5BFF]",
    glowColor: "rgba(183, 148, 244, 0.2)",
    href: "/dashboard/permissions",
    status: "coming-soon",
  },
];

// ─── FAQ Items ───────────────────────────────────────

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is Mnemo?",
    answer:
      "Mnemo is the world's first Living Memory Operating System. It creates a persistent knowledge graph that grows with you across applications, devices, AI agents and time.",
  },
  {
    id: "faq-2",
    question: "How is Mnemo different from note-taking apps?",
    answer:
      "Unlike traditional note-taking apps, Mnemo doesn't just store files — it stores understanding. It builds connections between your memories automatically and provides intelligent context.",
  },
  {
    id: "faq-3",
    question: "Is my data private?",
    answer:
      "Absolutely. Mnemo is built with a privacy-first architecture. You own every memory and control what AI can access. End-to-end encryption is enabled by default.",
  },
  {
    id: "faq-4",
    question: "What modules are available?",
    answer:
      "Mnemo includes six core modules: Universal Memory Fabric, Living Intelligence, Memory Exchange, Memory Time Machine, Memory Permissions, and Digital Twin. These modules are being rolled out progressively.",
  },
  {
    id: "faq-5",
    question: "Can I use Mnemo offline?",
    answer:
      "Mnemo is designed to work offline. Your core data stays local and syncs when connectivity is available.",
  },
];

// ─── User Menu ───────────────────────────────────────

export interface UserMenuItem {
  id: string;
  label: string;
  href?: string;
  iconKey: string;
  action?: "logout";
}

export const USER_MENU_ITEMS: UserMenuItem[] = [
  { id: "profile", label: "Profile", href: "/profile", iconKey: "user" },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    iconKey: "settings",
  },
  { id: "help", label: "Help", href: "/help", iconKey: "help" },
];

// ═══════════════════════════════════════════════════════
// PHASE 3: MEMORY WORKSPACE CONSTANTS
// ═══════════════════════════════════════════════════════

import type { MemoryCategory, MemorySort, Memory } from "@/types";

export const MEMORY_CATEGORIES: MemoryCategory[] = [
  "Personal",
  "Work",
  "Learning",
  "Research",
  "Journal",
  "Ideas",
  "Music",
  "Books",
  "Travel",
  "Health",
  "Uncategorized",
];

export const MEMORY_SORT_OPTIONS: MemorySort[] = [
  "Newest",
  "Oldest",
  "Alphabetical",
  "Updated Recently",
  "Pinned First",
  "Favorites First",
];

export const DEFAULT_MEMORY: Omit<Memory, "id" | "createdAt" | "updatedAt"> = {
  title: "",
  content: "",
  category: "Uncategorized",
  tags: [],
  pinned: false,
  favorite: false,
  archived: false,
};

export const MOCK_MEMORIES: Memory[] = [
  {
    id: "mem-1",
    title: "Project Ideas for 2026",
    content: "1. Living OS\n2. AI Agents\n3. Memory Fabric",
    createdAt: new Date("2026-07-01T10:00:00Z").toISOString(),
    updatedAt: new Date("2026-07-01T10:00:00Z").toISOString(),
    category: "Ideas",
    tags: ["tech", "planning"],
    pinned: true,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-2",
    title: "Meeting Notes: Design Sync",
    content: "Discussed the new glassmorphism UI and Aurora backgrounds.",
    createdAt: new Date("2026-07-01T12:00:00Z").toISOString(),
    updatedAt: new Date("2026-07-01T12:00:00Z").toISOString(),
    category: "Work",
    tags: ["design", "sync"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-3",
    title: "Weekly Journal",
    content: "Feeling great about the progress on Phase 3.",
    createdAt: new Date("2026-07-01T18:00:00Z").toISOString(),
    updatedAt: new Date("2026-07-02T09:00:00Z").toISOString(),
    category: "Journal",
    tags: ["personal", "reflection"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-4",
    title: "Books to Read",
    content: "- Snow Crash\n- Dune\n- The Three-Body Problem",
    createdAt: new Date("2026-06-25T14:30:00Z").toISOString(),
    updatedAt: new Date("2026-06-25T14:30:00Z").toISOString(),
    category: "Books",
    tags: ["reading", "scifi"],
    pinned: false,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-5",
    title: "Travel Itinerary: Japan",
    content: "Tokyo -> Kyoto -> Osaka",
    createdAt: new Date("2026-06-20T08:15:00Z").toISOString(),
    updatedAt: new Date("2026-06-20T08:15:00Z").toISOString(),
    category: "Travel",
    tags: ["vacation", "planning"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-6",
    title: "Workout Routine",
    content: "Push, Pull, Legs split",
    createdAt: new Date("2026-06-15T07:00:00Z").toISOString(),
    updatedAt: new Date("2026-06-15T07:00:00Z").toISOString(),
    category: "Health",
    tags: ["fitness"],
    pinned: true,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-7",
    title: "React Server Components Research",
    content: "Notes on streaming and server actions.",
    createdAt: new Date("2026-06-10T16:45:00Z").toISOString(),
    updatedAt: new Date("2026-06-10T16:45:00Z").toISOString(),
    category: "Research",
    tags: ["react", "webdev"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-8",
    title: "Grocery List",
    content: "Eggs, Milk, Bread, Coffee beans",
    createdAt: new Date("2026-07-02T08:00:00Z").toISOString(),
    updatedAt: new Date("2026-07-02T08:00:00Z").toISOString(),
    category: "Personal",
    tags: ["shopping"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-9",
    title: "New Synth Patches",
    content: "Experimenting with FM synthesis for the new track.",
    createdAt: new Date("2026-06-05T20:20:00Z").toISOString(),
    updatedAt: new Date("2026-06-05T20:20:00Z").toISOString(),
    category: "Music",
    tags: ["production"],
    pinned: false,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-10",
    title: "Learning Rust",
    content: "Borrow checker concepts and ownership rules.",
    createdAt: new Date("2026-06-01T11:11:00Z").toISOString(),
    updatedAt: new Date("2026-06-01T11:11:00Z").toISOString(),
    category: "Learning",
    tags: ["rust", "programming"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-11",
    title: "Mock Memory 11: Personal Log",
    content:
      "This is auto-generated mock content for memory 11. It relates to Personal and discusses topics like shopping and programming.",
    createdAt: "2026-06-21T00:19:24.137Z",
    updatedAt: "2026-06-21T00:19:24.137Z",
    category: "Personal",
    tags: ["shopping", "programming"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-12",
    title: "Mock Memory 12: Work Log",
    content:
      "This is auto-generated mock content for memory 12. It relates to Work and discusses topics like production and ai.",
    createdAt: "2026-06-19T23:19:24.138Z",
    updatedAt: "2026-06-19T23:19:24.138Z",
    category: "Work",
    tags: ["production", "ai"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-13",
    title: "Mock Memory 13: Learning Log",
    content:
      "This is auto-generated mock content for memory 13. It relates to Learning and discusses topics like rust and finance.",
    createdAt: "2026-06-18T22:19:24.138Z",
    updatedAt: "2026-06-18T22:19:24.138Z",
    category: "Learning",
    tags: ["rust", "finance"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-14",
    title: "Mock Memory 14: Research Log",
    content:
      "This is auto-generated mock content for memory 14. It relates to Research and discusses topics like programming and cooking.",
    createdAt: "2026-06-17T21:19:24.138Z",
    updatedAt: "2026-06-17T21:19:24.138Z",
    category: "Research",
    tags: ["programming", "cooking"],
    pinned: true,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-15",
    title: "Mock Memory 15: Journal Log",
    content:
      "This is auto-generated mock content for memory 15. It relates to Journal and discusses topics like ai and movies.",
    createdAt: "2026-06-16T20:19:24.138Z",
    updatedAt: "2026-06-16T20:19:24.138Z",
    category: "Journal",
    tags: ["ai", "movies"],
    pinned: false,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-16",
    title: "Mock Memory 16: Ideas Log",
    content:
      "This is auto-generated mock content for memory 16. It relates to Ideas and discusses topics like finance and tech.",
    createdAt: "2026-06-15T19:19:24.138Z",
    updatedAt: "2026-06-15T19:19:24.138Z",
    category: "Ideas",
    tags: ["finance", "tech"],
    pinned: false,
    favorite: false,
    archived: true,
  },
  {
    id: "mem-17",
    title: "Mock Memory 17: Music Log",
    content:
      "This is auto-generated mock content for memory 17. It relates to Music and discusses topics like cooking and design.",
    createdAt: "2026-06-14T18:19:24.138Z",
    updatedAt: "2026-06-14T18:19:24.138Z",
    category: "Music",
    tags: ["cooking", "design"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-18",
    title: "Mock Memory 18: Books Log",
    content:
      "This is auto-generated mock content for memory 18. It relates to Books and discusses topics like movies and planning.",
    createdAt: "2026-06-13T17:19:24.138Z",
    updatedAt: "2026-06-13T17:19:24.138Z",
    category: "Books",
    tags: ["movies", "planning"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-19",
    title: "Mock Memory 19: Travel Log",
    content:
      "This is auto-generated mock content for memory 19. It relates to Travel and discusses topics like tech and sync.",
    createdAt: "2026-06-12T16:19:24.138Z",
    updatedAt: "2026-06-12T16:19:24.138Z",
    category: "Travel",
    tags: ["tech", "sync"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-20",
    title: "Mock Memory 20: Health Log",
    content:
      "This is auto-generated mock content for memory 20. It relates to Health and discusses topics like design and reflection.",
    createdAt: "2026-06-11T15:19:24.138Z",
    updatedAt: "2026-06-11T15:19:24.138Z",
    category: "Health",
    tags: ["design", "reflection"],
    pinned: false,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-21",
    title: "Mock Memory 21: Uncategorized Log",
    content:
      "This is auto-generated mock content for memory 21. It relates to Uncategorized and discusses topics like planning and reading.",
    createdAt: "2026-06-10T14:19:24.138Z",
    updatedAt: "2026-06-10T14:19:24.138Z",
    category: "Uncategorized",
    tags: ["planning", "reading"],
    pinned: true,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-22",
    title: "Mock Memory 22: Personal Log",
    content:
      "This is auto-generated mock content for memory 22. It relates to Personal and discusses topics like sync and scifi.",
    createdAt: "2026-06-09T13:19:24.138Z",
    updatedAt: "2026-06-09T13:19:24.138Z",
    category: "Personal",
    tags: ["sync", "scifi"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-23",
    title: "Mock Memory 23: Work Log",
    content:
      "This is auto-generated mock content for memory 23. It relates to Work and discusses topics like reflection and vacation.",
    createdAt: "2026-06-08T12:19:24.138Z",
    updatedAt: "2026-06-08T12:19:24.138Z",
    category: "Work",
    tags: ["reflection", "vacation"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-24",
    title: "Mock Memory 24: Learning Log",
    content:
      "This is auto-generated mock content for memory 24. It relates to Learning and discusses topics like reading and fitness.",
    createdAt: "2026-06-07T11:19:24.138Z",
    updatedAt: "2026-06-07T11:19:24.138Z",
    category: "Learning",
    tags: ["reading", "fitness"],
    pinned: false,
    favorite: false,
    archived: true,
  },
  {
    id: "mem-25",
    title: "Mock Memory 25: Research Log",
    content:
      "This is auto-generated mock content for memory 25. It relates to Research and discusses topics like scifi and react.",
    createdAt: "2026-06-06T10:19:24.138Z",
    updatedAt: "2026-06-06T10:19:24.138Z",
    category: "Research",
    tags: ["scifi", "react"],
    pinned: false,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-26",
    title: "Mock Memory 26: Journal Log",
    content:
      "This is auto-generated mock content for memory 26. It relates to Journal and discusses topics like vacation and webdev.",
    createdAt: "2026-06-05T09:19:24.138Z",
    updatedAt: "2026-06-05T09:19:24.138Z",
    category: "Journal",
    tags: ["vacation", "webdev"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-27",
    title: "Mock Memory 27: Ideas Log",
    content:
      "This is auto-generated mock content for memory 27. It relates to Ideas and discusses topics like fitness and shopping.",
    createdAt: "2026-06-04T08:19:24.138Z",
    updatedAt: "2026-06-04T08:19:24.138Z",
    category: "Ideas",
    tags: ["fitness", "shopping"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-28",
    title: "Mock Memory 28: Music Log",
    content:
      "This is auto-generated mock content for memory 28. It relates to Music and discusses topics like react and production.",
    createdAt: "2026-06-03T07:19:24.138Z",
    updatedAt: "2026-06-03T07:19:24.138Z",
    category: "Music",
    tags: ["react", "production"],
    pinned: true,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-29",
    title: "Mock Memory 29: Books Log",
    content:
      "This is auto-generated mock content for memory 29. It relates to Books and discusses topics like webdev and rust.",
    createdAt: "2026-06-02T06:19:24.138Z",
    updatedAt: "2026-06-02T06:19:24.138Z",
    category: "Books",
    tags: ["webdev", "rust"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-30",
    title: "Mock Memory 30: Travel Log",
    content:
      "This is auto-generated mock content for memory 30. It relates to Travel and discusses topics like shopping and programming.",
    createdAt: "2026-06-01T05:19:24.138Z",
    updatedAt: "2026-06-01T05:19:24.138Z",
    category: "Travel",
    tags: ["shopping", "programming"],
    pinned: false,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-31",
    title: "Mock Memory 31: Health Log",
    content:
      "This is auto-generated mock content for memory 31. It relates to Health and discusses topics like production and ai.",
    createdAt: "2026-05-31T04:19:24.138Z",
    updatedAt: "2026-05-31T04:19:24.138Z",
    category: "Health",
    tags: ["production", "ai"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-32",
    title: "Mock Memory 32: Uncategorized Log",
    content:
      "This is auto-generated mock content for memory 32. It relates to Uncategorized and discusses topics like rust and finance.",
    createdAt: "2026-05-30T03:19:24.138Z",
    updatedAt: "2026-05-30T03:19:24.138Z",
    category: "Uncategorized",
    tags: ["rust", "finance"],
    pinned: false,
    favorite: false,
    archived: true,
  },
  {
    id: "mem-33",
    title: "Mock Memory 33: Personal Log",
    content:
      "This is auto-generated mock content for memory 33. It relates to Personal and discusses topics like programming and cooking.",
    createdAt: "2026-05-29T02:19:24.138Z",
    updatedAt: "2026-05-29T02:19:24.138Z",
    category: "Personal",
    tags: ["programming", "cooking"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-34",
    title: "Mock Memory 34: Work Log",
    content:
      "This is auto-generated mock content for memory 34. It relates to Work and discusses topics like ai and movies.",
    createdAt: "2026-05-28T01:19:24.138Z",
    updatedAt: "2026-05-28T01:19:24.138Z",
    category: "Work",
    tags: ["ai", "movies"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-35",
    title: "Mock Memory 35: Learning Log",
    content:
      "This is auto-generated mock content for memory 35. It relates to Learning and discusses topics like finance and tech.",
    createdAt: "2026-05-27T00:19:24.138Z",
    updatedAt: "2026-05-27T00:19:24.138Z",
    category: "Learning",
    tags: ["finance", "tech"],
    pinned: true,
    favorite: true,
    archived: false,
  },
  {
    id: "mem-36",
    title: "Mock Memory 36: Research Log",
    content:
      "This is auto-generated mock content for memory 36. It relates to Research and discusses topics like cooking and design.",
    createdAt: "2026-05-25T23:19:24.138Z",
    updatedAt: "2026-05-25T23:19:24.138Z",
    category: "Research",
    tags: ["cooking", "design"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-37",
    title: "Mock Memory 37: Journal Log",
    content:
      "This is auto-generated mock content for memory 37. It relates to Journal and discusses topics like movies and planning.",
    createdAt: "2026-05-24T22:19:24.138Z",
    updatedAt: "2026-05-24T22:19:24.138Z",
    category: "Journal",
    tags: ["movies", "planning"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-38",
    title: "Mock Memory 38: Ideas Log",
    content:
      "This is auto-generated mock content for memory 38. It relates to Ideas and discusses topics like tech and sync.",
    createdAt: "2026-05-23T21:19:24.138Z",
    updatedAt: "2026-05-23T21:19:24.138Z",
    category: "Ideas",
    tags: ["tech", "sync"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-39",
    title: "Mock Memory 39: Music Log",
    content:
      "This is auto-generated mock content for memory 39. It relates to Music and discusses topics like design and reflection.",
    createdAt: "2026-05-22T20:19:24.138Z",
    updatedAt: "2026-05-22T20:19:24.138Z",
    category: "Music",
    tags: ["design", "reflection"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-40",
    title: "Mock Memory 40: Books Log",
    content:
      "This is auto-generated mock content for memory 40. It relates to Books and discusses topics like planning and reading.",
    createdAt: "2026-05-21T19:19:24.138Z",
    updatedAt: "2026-05-21T19:19:24.138Z",
    category: "Books",
    tags: ["planning", "reading"],
    pinned: false,
    favorite: true,
    archived: true,
  },
  {
    id: "mem-41",
    title: "Mock Memory 41: Travel Log",
    content:
      "This is auto-generated mock content for memory 41. It relates to Travel and discusses topics like sync and scifi.",
    createdAt: "2026-05-20T18:19:24.138Z",
    updatedAt: "2026-05-20T18:19:24.138Z",
    category: "Travel",
    tags: ["sync", "scifi"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-42",
    title: "Mock Memory 42: Health Log",
    content:
      "This is auto-generated mock content for memory 42. It relates to Health and discusses topics like reflection and vacation.",
    createdAt: "2026-05-19T17:19:24.138Z",
    updatedAt: "2026-05-19T17:19:24.138Z",
    category: "Health",
    tags: ["reflection", "vacation"],
    pinned: true,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-43",
    title: "Mock Memory 43: Uncategorized Log",
    content:
      "This is auto-generated mock content for memory 43. It relates to Uncategorized and discusses topics like reading and fitness.",
    createdAt: "2026-05-18T16:19:24.138Z",
    updatedAt: "2026-05-18T16:19:24.138Z",
    category: "Uncategorized",
    tags: ["reading", "fitness"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-44",
    title: "Mock Memory 44: Personal Log",
    content:
      "This is auto-generated mock content for memory 44. It relates to Personal and discusses topics like scifi and react.",
    createdAt: "2026-05-17T15:19:24.138Z",
    updatedAt: "2026-05-17T15:19:24.138Z",
    category: "Personal",
    tags: ["scifi", "react"],
    pinned: false,
    favorite: false,
    archived: false,
  },
  {
    id: "mem-45",
    title: "Mock Memory 45: Work Log",
    content:
      "This is auto-generated mock content for memory 45. It relates to Work and discusses topics like vacation and webdev.",
    createdAt: "2026-05-16T14:19:24.138Z",
    updatedAt: "2026-05-16T14:19:24.138Z",
    category: "Work",
    tags: ["vacation", "webdev"],
    pinned: false,
    favorite: true,
    archived: false,
  },
];
