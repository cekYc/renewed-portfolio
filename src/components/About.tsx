"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Terminal, Zap, BookOpen } from "lucide-react";
import { PROFILE, LANGUAGE_STATS } from "@/lib/constants";

const highlights = [
  {
    icon: <Code2 size={20} />,
    title: "Language Designer",
    desc: "Built my own programming language (Gojo Lang) with lexer, parser, interpreter in Python — then rewrote the compiler in Rust.",
  },
  {
    icon: <Terminal size={20} />,
    title: "Systems Thinker",
    desc: "Wrote a recursive DNS resolver in Go (zero deps), a system monitor in C++ with ImGui, and low-level protocol implementations.",
  },
  {
    icon: <Zap size={20} />,
    title: "Fast Learner",
    desc: "Went from first project to 22 repos across 10+ languages in under 4 months. Each project pushes into new territory.",
  },
  {
    icon: <BookOpen size={20} />,
    title: "Clean Engineer",
    desc: "Every project has professional docs, security layers (JWT, rate limiting, CORS), and production-ready architecture.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-mono text-accent-purple mb-3 tracking-widest uppercase">
            About Me
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
            More Than a Web Developer
          </h3>
          <div className="section-divider max-w-md mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Bio column - spans 3 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              {PROFILE.bio}
            </p>

            {/* Language distribution */}
            <div className="glass rounded-2xl p-6 mt-8">
              <h4 className="text-sm font-mono text-text-muted mb-4 tracking-wider uppercase">
                Language Distribution
              </h4>

              {/* Bar */}
              <div className="flex rounded-full overflow-hidden h-3 mb-4">
                {LANGUAGE_STATS.map((lang) => (
                  <motion.div
                    key={lang.name}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${lang.percentage}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full"
                    style={{ backgroundColor: lang.color }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {LANGUAGE_STATS.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center gap-1.5 text-xs text-text-muted"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    {lang.name}{" "}
                    <span className="text-text-muted/60">
                      {lang.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlights column - spans 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 grid gap-4"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="glass rounded-xl p-5 card-hover group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-accent-purple/10 text-accent-purple group-hover:bg-accent-purple/20 transition-colors shrink-0">
                    {h.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1 text-sm">
                      {h.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
