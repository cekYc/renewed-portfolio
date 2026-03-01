"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";
import { NAV_LINKS, PROFILE } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 right-0 z-60 h-0.5">
        <motion.div
          className="h-full bg-linear-to-r from-accent-purple via-accent-blue to-accent-cyan"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-accent-purple to-accent-blue flex items-center justify-center text-white font-bold text-sm">
                E
              </div>
              <span className="font-semibold text-text-primary hidden sm:block">
                {PROFILE.fullName}
              </span>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-accent-purple"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-purple rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* GitHub + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                <Github size={20} />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-strong overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
