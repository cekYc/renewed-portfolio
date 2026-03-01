"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import { PROJECTS, PROJECT_TAGS, type ProjectTag } from "@/lib/constants";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTag, setActiveTag] = useState<ProjectTag>("Featured");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filtered = PROJECTS.filter((p) => {
    if (activeTag === "All") return true;
    if (activeTag === "Featured") return p.featured;
    return p.tags.includes(activeTag);
  });

  return (
    <section id="projects" className="relative py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-mono text-accent-green mb-3 tracking-widest uppercase">
            Projects
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
            What I&apos;ve Built
          </h3>
          <div className="section-divider max-w-md mx-auto" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <Filter size={16} className="text-text-muted self-center mr-2" />
          {PROJECT_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTag === tag
                  ? "bg-accent-purple/20 text-accent-purple border border-accent-purple/30"
                  : "text-text-muted hover:text-text-secondary border border-transparent hover:border-border-subtle"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const isExpanded = expandedProject === project.title;
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className={`glass rounded-2xl overflow-hidden card-hover group ${
                    project.featured ? "ring-1 ring-accent-purple/10" : ""
                  }`}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1"
                    style={{
                      background: `linear-gradient(90deg, ${project.languageColor}, ${project.languageColor}80)`,
                    }}
                  />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{project.icon}</span>
                        <div>
                          <h4 className="font-bold text-text-primary group-hover:text-accent-purple transition-colors">
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                backgroundColor: project.languageColor,
                              }}
                            />
                            <span className="text-xs text-text-muted">
                              {project.language}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
                        >
                          <Github size={16} />
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-text-muted hover:text-accent-purple hover:bg-white/5 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-text-muted mb-4 leading-relaxed border-t border-border-subtle pt-4">
                            {project.longDescription}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand toggle */}
                    <button
                      onClick={() =>
                        setExpandedProject(
                          isExpanded ? null : project.title
                        )
                      }
                      className="flex items-center gap-1 text-xs text-accent-purple hover:text-accent-blue transition-colors mb-4"
                    >
                      {isExpanded ? (
                        <>
                          Less <ChevronUp size={12} />
                        </>
                      ) : (
                        <>
                          More details <ChevronDown size={12} />
                        </>
                      )}
                    </button>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-text-muted font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Category tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full border border-accent-purple/20 text-[10px] text-accent-purple/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Show all link */}
        {activeTag === "Featured" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center mt-10"
          >
            <button
              onClick={() => setActiveTag("All")}
              className="text-sm text-text-muted hover:text-accent-purple transition-colors font-mono"
            >
              View all {PROJECTS.length} projects →
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
