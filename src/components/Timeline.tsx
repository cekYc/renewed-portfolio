"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TIMELINE } from "@/lib/constants";

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative py-32 px-4" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent-purple/3 to-transparent pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-sm font-mono text-accent-orange mb-3 tracking-widest uppercase">
            Journey
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
            My Development Timeline
          </h3>
          <p className="text-text-muted max-w-lg mx-auto">
            From first commit to building programming languages — in under 4
            months.
          </p>
          <div className="section-divider max-w-md mx-auto mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-accent-purple/50 via-accent-blue/30 to-transparent" />

          {TIMELINE.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className={`relative flex items-start mb-12 ${
                  isLeft
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-0 md:mr-8" : "md:pl-0 md:ml-8"
                  }`}
                >
                  <div className="glass rounded-xl p-6 card-hover group">
                    {/* Date badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-mono mb-3">
                      {event.date}
                    </div>

                    <h4 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                      {event.title}
                    </h4>

                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                      {event.description}
                    </p>

                    {/* Tech tags */}
                    {event.tech && (
                      <div className="flex flex-wrap gap-1.5">
                        {event.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-text-muted font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                    className="w-12 h-12 rounded-full bg-bg-card border-2 border-accent-purple/30 flex items-center justify-center text-lg z-10 hover:scale-110 hover:border-accent-purple transition-all duration-300"
                  >
                    {event.icon}
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            );
          })}

          {/* End dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute left-6 md:left-1/2 -translate-x-1/2 bottom-0"
          >
            <div className="w-4 h-4 rounded-full bg-accent-purple animate-pulse-glow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
