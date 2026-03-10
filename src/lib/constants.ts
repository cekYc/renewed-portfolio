import {
  Server,
  Database,
  Globe,
  Cpu,
  Shield,
  Container,
  type LucideIcon,
} from "lucide-react";

/* ─── Profile ─── */
export const PROFILE = {
  name: "Eray",
  fullName: "Eray Çiçek",
  username: "cekYc",
  title: "Backend-Focused Full-Stack Developer",
  tagline: "Building systems that think for themselves.",
  bio: `I'm a backend-focused developer who loves going deeper than the surface — from designing my own programming language (Zet Lang) to writing a recursive DNS resolver from scratch in Go with zero dependencies. I build with Python, Node.js, Go, Rust and C++ and I'm always chasing the next hard problem.`,
  location: "Tokat, Turkey",
  github: "https://github.com/cekYc",
  website: "https://erceky.gamer.gd",
  email: "eraycicek3729@gmail.com",
  availableFor: "Open to EU Opportunities",
  stats: {
    repos: 22,
    contributions: 148,
    languages: 10,
    followers: 3,
  },
};

/* ─── Navigation ─── */
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

/* ─── Roles for typewriter ─── */
export const ROLES = [
  "Backend Developer",
  "Systems Programmer",
  "Language Designer",
  "Full-Stack Engineer",
  "Open Source Builder",
];

/* ─── Skills ─── */
export interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js / Express / NestJS", level: 90, color: "#10b981" },
      { name: "Python / FastAPI / Flask", level: 88, color: "#3b82f6" },
      { name: "Go", level: 75, color: "#06b6d4" },
      { name: "Rust", level: 60, color: "#f59e0b" },
      { name: "PHP / Laravel", level: 65, color: "#8b5cf6" },
    ],
  },
  {
    title: "Frontend",
    icon: Globe,
    skills: [
      { name: "React / Next.js", level: 85, color: "#3b82f6" },
      { name: "TypeScript", level: 88, color: "#06b6d4" },
      { name: "Tailwind CSS", level: 82, color: "#10b981" },
      { name: "Angular", level: 55, color: "#ec4899" },
      { name: "HTML / CSS", level: 90, color: "#f59e0b" },
    ],
  },
  {
    title: "Database & ORM",
    icon: Database,
    skills: [
      { name: "PostgreSQL", level: 85, color: "#3b82f6" },
      { name: "MySQL", level: 75, color: "#f59e0b" },
      { name: "Prisma", level: 88, color: "#8b5cf6" },
      { name: "SQLAlchemy", level: 70, color: "#10b981" },
      { name: "Redis", level: 65, color: "#ec4899" },
    ],
  },
  {
    title: "Systems & Low-Level",
    icon: Cpu,
    skills: [
      { name: "C++", level: 70, color: "#3b82f6" },
      { name: "DNS / Network Protocols", level: 75, color: "#06b6d4" },
      { name: "Compiler / Interpreter Design", level: 72, color: "#f59e0b" },
      { name: "WebAssembly", level: 55, color: "#ec4899" },
      { name: "Linux /proc Internals", level: 65, color: "#10b981" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Container,
    skills: [
      { name: "Docker / Docker Compose", level: 78, color: "#3b82f6" },
      { name: "Git / GitHub", level: 90, color: "#8b5cf6" },
      { name: "Vercel / Netlify", level: 80, color: "#06b6d4" },
      { name: "WebSocket / Socket.IO", level: 82, color: "#10b981" },
      { name: "REST API Design", level: 90, color: "#f59e0b" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    skills: [
      { name: "JWT / OAuth / Auth Flows", level: 85, color: "#8b5cf6" },
      { name: "Rate Limiting / CORS / Helmet", level: 80, color: "#3b82f6" },
      { name: "HMAC / Token Rotation", level: 75, color: "#06b6d4" },
      { name: "bcrypt / Input Validation", level: 82, color: "#10b981" },
      { name: "TLS / HTTPS", level: 70, color: "#f59e0b" },
    ],
  },
];

/* ─── Projects ─── */
export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  tags: string[];
  github: string;
  demo?: string;
  language: string;
  languageColor: string;
  featured: boolean;
  icon: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Gojo Lang",
    description: "A custom programming language with its own compiler, interpreter, and browser-based IDE.",
    longDescription:
      "Designed from scratch with a Python interpreter (v7, Turing-complete), then rewrote the compiler in Rust for native performance. Includes a WebAssembly-powered IDE running serverless in the browser with Monaco Editor, Pyodide, and Jujutsu Kaisen-themed visuals. Fibonacci-40 benchmark: 2x faster than Go, 50x faster than Python.",
    tech: ["Rust", "Python", "React", "WebAssembly", "Pyodide", "Monaco Editor"],
    tags: ["Systems", "Compiler", "Language Design"],
    github: "https://github.com/cekYc/renewed-gojo-lang-source",
    demo: "https://gojo-lang-ide.netlify.app",
    language: "Rust / Python",
    languageColor: "#dea584",
    featured: true,
    icon: "🧬",
  },
  {
    title: "Ceky Resolver",
    description: "A full recursive DNS resolver built from scratch in Go — zero external dependencies.",
    longDescription:
      "Resolves domains iteratively from root servers. Includes ad-blocking engine (~78K domains), DNS-over-TLS (DoT), DNS-over-HTTPS (DoH), live web dashboard with SSE, auto-generated ECDSA P-256 TLS certs, goroutine-per-request concurrency, and sync.Pool buffer reuse. RFC 1035/6891/7858/8484 compliant.",
    tech: ["Go", "DNS", "DoH/DoT", "SSE", "TLS", "Goroutines"],
    tags: ["Systems", "Networking", "Security"],
    github: "https://github.com/cekYc/ceky-resolver",
    language: "Go",
    languageColor: "#00ADD8",
    featured: true,
    icon: "🌐",
  },
  {
    title: "Repo Monitor",
    description: "GitHub profile analyzer with interactive visualizations and advanced analytics.",
    longDescription:
      "Analyzes any GitHub user's repos with SSE streaming, language distribution charts, contribution heatmaps, developer persona gamification, repo health scoring, user comparison, PNG export, embeddable SVG badges, i18n (TR/EN), and PWA support. Built with Next.js 16 App Router + Turbopack.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Recharts", "Octokit", "SSE"],
    tags: ["Frontend", "API", "Data Viz"],
    github: "https://github.com/cekYc/repo-monitor-2",
    demo: "https://ceky-repo-monitor.vercel.app",
    language: "TypeScript",
    languageColor: "#3178c6",
    featured: true,
    icon: "📊",
  },
  {
    title: "Real-Time Messaging",
    description: "WhatsApp/Discord-inspired messaging app with WebSocket-based real-time communication.",
    longDescription:
      "Dual-token JWT auth with silent refresh, private + group chats, typing indicators, read receipts, presence tracking, file attachments (10MB, MIME validated), cursor-based pagination, optimistic UI. 8 Prisma models, full security stack (Helmet, CORS, rate limiting, bcrypt).",
    tech: ["React 19", "Express 5", "Socket.IO", "Prisma", "PostgreSQL", "JWT"],
    tags: ["Full-Stack", "Real-Time", "WebSocket"],
    github: "https://github.com/cekYc/be-like-whatsapp-or-discord",
    language: "TypeScript",
    languageColor: "#3178c6",
    featured: true,
    icon: "💬",
  },
  {
    title: "ModaShop E-Commerce",
    description: "Full-stack e-commerce MVP with admin panel, payments, and Docker infrastructure.",
    longDescription:
      "NestJS 10 + Prisma 5 backend, Next.js 14 frontend. Features: product variants (size/color), cart, checkout, admin dashboard, JWT + refresh token rotation, rate limiting, HMAC-SHA256 webhooks, magic bytes MIME protection. Dockerized with PostgreSQL 15 + Redis.",
    tech: ["NestJS", "Next.js 14", "Prisma", "PostgreSQL", "Redis", "Docker"],
    tags: ["Full-Stack", "E-Commerce", "DevOps"],
    github: "https://github.com/cekYc/ModaShop",
    language: "TypeScript",
    languageColor: "#3178c6",
    featured: true,
    icon: "🛒",
  },
  {
    title: "System Monitor",
    description: "Cross-platform system monitoring with ImGui + OpenGL glassmorphism UI.",
    longDescription:
      "C++ desktop app for Linux & Windows. Monitors CPU (per-core), RAM, GPU (NVIDIA), network, disk I/O, battery. Reads /proc filesystem on Linux, Win32 API on Windows. ImGui + GLFW + OpenGL3 rendering with real-time 120-sample history graphs and sortable process table.",
    tech: ["C++", "ImGui", "GLFW", "OpenGL3", "Win32 API", "/proc"],
    tags: ["Systems", "Desktop", "Cross-Platform"],
    github: "https://github.com/cekYc/System-Monitor",
    language: "C++",
    languageColor: "#f34b7d",
    featured: true,
    icon: "🖥️",
  },
  {
    title: "Bank Campaign Scraper",
    description: "Automated scraping + AI categorization of Turkish bank credit card campaigns.",
    longDescription:
      "Scrapes 7 Turkish banks with Playwright, categorizes campaigns with a weighted scoring system (20 categories, 1000+ brands). FastAPI backend, JWT auth, personal wallet system. MySQL + SQLAlchemy.",
    tech: ["Python", "FastAPI", "Playwright", "SQLAlchemy", "MySQL", "JWT"],
    tags: ["Backend", "Scraping", "AI"],
    github: "https://github.com/cekYc/bank-campaign-scraping-and-categorization",
    language: "Python",
    languageColor: "#3572A5",
    featured: false,
    icon: "🏦",
  },
  {
    title: "IoT Dashboard",
    description: "Real-time IoT temperature monitoring with simulated sensor data.",
    longDescription:
      "Simulates 5 temperature sensors, stores data in PostgreSQL, displays live via Flask + Chart.js with auto-refresh every 5 seconds.",
    tech: ["Python", "Flask", "PostgreSQL", "Chart.js"],
    tags: ["Backend", "IoT", "Data Viz"],
    github: "https://github.com/cekYc/real_time_iot_dashboard",
    language: "Python",
    languageColor: "#3572A5",
    featured: false,
    icon: "🌡️",
  },
  {
    title: "StackStart",
    description: "Full-stack project scaffolder supporting 35+ technologies.",
    longDescription:
      "A Next.js app that generates boilerplate for different tech stacks. Supports 35+ frameworks and libraries.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    tags: ["Frontend", "DevTools"],
    github: "https://github.com/cekYc/stackstart",
    language: "TypeScript",
    languageColor: "#3178c6",
    featured: false,
    icon: "🚀",
  },
];

/* ─── Journey / Timeline ─── */
export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: string;
  tech?: string[];
}

export const TIMELINE: TimelineEvent[] = [
  {
    date: "Dec 2025",
    title: "First Steps: IoT Dashboard & Portfolio",
    description:
      "Started the journey with a real-time IoT temperature dashboard using Python + Flask + PostgreSQL. Built first portfolio site.",
    icon: "🌱",
    tech: ["Python", "Flask", "PostgreSQL", "HTML"],
  },
  {
    date: "Dec 2025",
    title: "Gojo Lang v7.0 — Own Programming Language",
    description:
      "Designed and built a Turing-complete interpreted language from scratch in Python. Variables, loops, arrays, standard library — the works.",
    icon: "🧬",
    tech: ["Python", "Compiler Design"],
  },
  {
    date: "Dec 2025",
    title: "Full-Stack Deep Dive",
    description:
      "Built e-commerce (ModaShop), appointment systems (Laravel + Angular), and a meal planner in PHP. Explored the full web spectrum.",
    icon: "⚡",
    tech: ["NestJS", "Next.js", "Laravel", "Angular", "PHP"],
  },
  {
    date: "Jan 2026",
    title: "Gojo Lang IDE & Renewed Compiler",
    description:
      "Created a browser-based IDE with React + Pyodide (WebAssembly). Then rewrote the entire compiler in Rust for native speed.",
    icon: "🔥",
    tech: ["Rust", "React", "WebAssembly", "Pyodide"],
  },
  {
    date: "Jan 2026",
    title: "Bank Campaign Scraper & Repo Monitor",
    description:
      "Built an AI-powered campaign scraper (Playwright + FastAPI) and a GitHub profile analyzer with interactive charts.",
    icon: "📊",
    tech: ["Python", "FastAPI", "Playwright", "Next.js", "TypeScript"],
  },
  {
    date: "Feb 2026",
    title: "Systems Programming: C++ & Go",
    description:
      "Wrote a cross-platform system monitor in C++ with ImGui/OpenGL. Built a recursive DNS resolver in Go with zero dependencies — DoH, DoT, ad-blocking dashboard.",
    icon: "🌐",
    tech: ["C++", "Go", "ImGui", "OpenGL", "DNS"],
  },
  {
    date: "Feb 2026",
    title: "Real-Time Messaging App",
    description:
      "Built a WhatsApp/Discord-like messaging platform with Socket.IO, dual-token auth, typing indicators, read receipts, and presence tracking.",
    icon: "💬",
    tech: ["React 19", "Express 5", "Socket.IO", "Prisma"],
  },
  {
    date: "Mar 2026",
    title: "Repo Monitor 2.0 — Feature-Complete",
    description:
      "Rebuilt Repo Monitor with Next.js 16, SSE streaming, developer personas, health scoring, i18n, PWA, comparison mode, and embeddable badges.",
    icon: "🚀",
    tech: ["Next.js 16", "TypeScript", "SSE", "PWA"],
  },
];

/* ─── Language stats for visualization ─── */
export const LANGUAGE_STATS = [
  { name: "TypeScript", percentage: 35, color: "#3178c6" },
  { name: "Python", percentage: 22, color: "#3572A5" },
  { name: "Go", percentage: 12, color: "#00ADD8" },
  { name: "Rust", percentage: 8, color: "#dea584" },
  { name: "C++", percentage: 8, color: "#f34b7d" },
  { name: "JavaScript", percentage: 7, color: "#f1e05a" },
  { name: "PHP", percentage: 5, color: "#4F5D95" },
  { name: "Other", percentage: 3, color: "#64748b" },
];

/* ─── Tags / Filters for projects ─── */
export const PROJECT_TAGS = [
  "All",
  "Featured",
  "Systems",
  "Full-Stack",
  "Frontend",
  "Backend",
  "Real-Time",
] as const;

export type ProjectTag = (typeof PROJECT_TAGS)[number];
