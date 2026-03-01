"use client";

import { Github, Heart, ArrowUp } from "lucide-react";
import { PROFILE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle/50">
      {/* Back to top */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <a
          href="#"
          className="flex items-center justify-center w-10 h-10 rounded-full glass hover:bg-accent-purple/20 text-text-muted hover:text-accent-purple transition-all duration-300 group"
        >
          <ArrowUp
            size={16}
            className="group-hover:-translate-y-0.5 transition-transform"
          />
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white font-bold text-sm">
              E
            </div>
            <div>
              <span className="font-semibold text-text-primary text-sm">
                {PROFILE.fullName}
              </span>
              <p className="text-xs text-text-muted">{PROFILE.title}</p>
            </div>
          </div>

          {/* Center: Made with */}
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            Built by cekYc
            using Next.js, TypeScript & Framer Motion
          </div>

          {/* Right: Links */}
          <div className="flex items-center gap-4">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Github size={18} />
            </a>
            <span className="text-xs text-text-muted">
              &copy; {new Date().getFullYear()} {PROFILE.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
