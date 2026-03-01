"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { SKILL_CATEGORIES } from "@/lib/constants";

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative py-32 px-4" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-full h-150 -translate-y-1/2 bg-linear-to-r from-accent-purple/3 via-transparent to-accent-blue/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-mono text-accent-cyan mb-3 tracking-widest uppercase">
            Skills & Technologies
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
            My Tech Arsenal
          </h3>
          <div className="section-divider max-w-md mx-auto" />
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === i
                    ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon size={16} />
                {cat.title}
              </button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Active category large view */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              {(() => {
                const Icon = SKILL_CATEGORIES[activeCategory].icon;
                return (
                  <div className="p-3 rounded-xl bg-accent-purple/10">
                    <Icon size={24} className="text-accent-purple" />
                  </div>
                );
              })()}
              <div>
                <h4 className="text-xl font-bold text-text-primary">
                  {SKILL_CATEGORIES[activeCategory].title}
                </h4>
                <p className="text-sm text-text-muted">
                  {SKILL_CATEGORIES[activeCategory].skills.length} technologies
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {SKILL_CATEGORIES[activeCategory].skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      {skill.name}
                    </span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: skill.color }}
                    >
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}CC, ${skill.color})`,
                        boxShadow: `0 0 10px ${skill.color}40`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* All categories overview (mini cards) */}
          <div className="grid grid-cols-2 gap-4 content-start">
            {SKILL_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const avgLevel = Math.round(
                cat.skills.reduce((sum, s) => sum + s.level, 0) /
                  cat.skills.length
              );
              return (
                <motion.button
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  onClick={() => setActiveCategory(i)}
                  className={`glass rounded-xl p-5 text-left card-hover transition-all duration-300 ${
                    activeCategory === i
                      ? "ring-1 ring-accent-purple/40 glow-purple"
                      : ""
                  }`}
                >
                  <Icon
                    size={20}
                    className={`mb-3 ${
                      activeCategory === i
                        ? "text-accent-purple"
                        : "text-text-muted"
                    }`}
                  />
                  <h5 className="text-sm font-semibold text-text-primary mb-1">
                    {cat.title}
                  </h5>
                  <p className="text-xs text-text-muted mb-3">
                    {cat.skills.length} skills
                  </p>

                  {/* Mini circular progress */}
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
                      <circle
                        cx="22"
                        cy="22"
                        r="18"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="3"
                      />
                      <motion.circle
                        cx="22"
                        cy="22"
                        r="18"
                        fill="none"
                        stroke={
                          activeCategory === i ? "#8b5cf6" : "#64748b"
                        }
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={`${(avgLevel / 100) * 113} 113`}
                        initial={{ strokeDasharray: "0 113" }}
                        animate={
                          isInView
                            ? {
                                strokeDasharray: `${
                                  (avgLevel / 100) * 113
                                } 113`,
                              }
                            : {}
                        }
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-text-muted">
                      {avgLevel}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
