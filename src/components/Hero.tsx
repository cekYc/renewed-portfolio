"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDown, MapPin, Sparkles } from "lucide-react";
import { PROFILE, ROLES } from "@/lib/constants";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = ROLES[roleIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      if (charIndex < currentRole.length) {
        setCharIndex((c) => c + 1);
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex((r) => (r + 1) % ROLES.length);
      }
    }
  }, [charIndex, isDeleting, currentRole.length]);

  useEffect(() => {
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-40 w-125 h-125 rounded-full bg-accent-purple/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-125 h-125 rounded-full bg-accent-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-sm text-text-secondary"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
          </span>
          {PROFILE.availableFor}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-text-primary">Hi, I&apos;m </span>
          <span className="gradient-text">{PROFILE.name}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl text-text-secondary mb-4 h-10 font-mono"
        >
          <span className="text-accent-purple">&gt; </span>
          <span className="text-text-primary">
            {currentRole.substring(0, charIndex)}
          </span>
          <span className="cursor-blink text-accent-purple font-light">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-lg text-text-muted mb-4 max-w-2xl mx-auto"
        >
          {PROFILE.tagline}
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-2 text-text-muted text-sm mb-10"
        >
          <MapPin size={14} />
          <span>{PROFILE.location}</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 rounded-xl bg-linear-to-r from-accent-purple to-accent-blue text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/25 hover:scale-105 flex items-center gap-2"
          >
            <Sparkles size={18} />
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-xl border border-border-subtle text-text-secondary font-medium hover:text-text-primary hover:border-accent-purple/50 hover:bg-white/5 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-16 flex items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { label: "Repositories", value: PROFILE.stats.repos },
            { label: "Languages", value: `${PROFILE.stats.languages}+` },
            { label: "Contributions", value: PROFILE.stats.contributions },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-text-muted mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
