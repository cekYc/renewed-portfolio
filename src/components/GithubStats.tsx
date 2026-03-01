"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { PROFILE } from "@/lib/constants";
import {
  GitCommitHorizontal,
  GitPullRequest,
  Star,
  GitFork,
  Calendar,
  Activity,
} from "lucide-react";

/* Pre-generate heatmap data at module level (pure, no React render scope) */
function generateHeatmap() {
  const weeks = 20;
  const days = 7;
  const cells: { week: number; day: number; level: number }[] = [];
  let seed = 42;
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      seed = (seed * 16807) % 2147483647;
      const rand = seed / 2147483647;
      let level = 0;
      if (rand > 0.6) level = 1;
      if (rand > 0.75) level = 2;
      if (rand > 0.88) level = 3;
      if (rand > 0.95) level = 4;
      cells.push({ week: w, day: d, level });
    }
  }
  return cells;
}
const HEATMAP_CELLS = generateHeatmap();

interface GitHubData {
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
}

function AnimatedCounter({
  value,
  duration = 2,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function GithubStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${PROFILE.username}`)
      .then((r) => r.json())
      .then((d) =>
        setData({
          publicRepos: d.public_repos,
          followers: d.followers,
          following: d.following,
          createdAt: d.created_at,
        })
      )
      .catch(() => {
        setData({
          publicRepos: PROFILE.stats.repos,
          followers: PROFILE.stats.followers,
          following: 4,
          createdAt: "2024-11-01T00:00:00Z",
        });
      });
  }, []);

  const stats = [
    {
      icon: <GitCommitHorizontal size={20} />,
      label: "Total Contributions",
      value: PROFILE.stats.contributions,
      suffix: "+",
      color: "#8b5cf6",
    },
    {
      icon: <GitPullRequest size={20} />,
      label: "Public Repos",
      value: data?.publicRepos ?? PROFILE.stats.repos,
      suffix: "",
      color: "#3b82f6",
    },
    {
      icon: <Star size={20} />,
      label: "Languages Used",
      value: PROFILE.stats.languages,
      suffix: "+",
      color: "#f59e0b",
    },
    {
      icon: <GitFork size={20} />,
      label: "Followers",
      value: data?.followers ?? PROFILE.stats.followers,
      suffix: "",
      color: "#06b6d4",
    },
    {
      icon: <Activity size={20} />,
      label: "Contribution Ratio",
      value: 99,
      suffix: "%",
      color: "#ec4899",
    },
    {
      icon: <Calendar size={20} />,
      label: "Months Active",
      value: 4,
      suffix: "",
      color: "#10b981",
    },
  ];

  const levelColors = [
    "rgba(255,255,255,0.03)",
    "rgba(139,92,246,0.2)",
    "rgba(139,92,246,0.4)",
    "rgba(139,92,246,0.65)",
    "rgba(139,92,246,0.9)",
  ];

  return (
    <section className="relative py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-mono text-accent-pink mb-3 tracking-widest uppercase">
            GitHub
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text-warm mb-6">
            Open Source Activity
          </h3>
          <div className="section-divider max-w-md mx-auto" />
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="glass rounded-xl p-6 text-center card-hover"
            >
              <div
                className="inline-flex p-3 rounded-xl mb-3"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution heatmap visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-mono text-text-muted tracking-wider">
              Contribution Activity
            </h4>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent-purple hover:text-accent-blue transition-colors font-mono"
            >
              View on GitHub →
            </a>
          </div>

          {/* Heatmap grid */}
          <div className="overflow-x-auto pb-2">
            <div
              className="inline-grid gap-0.75"
              style={{
                gridTemplateColumns: `repeat(20, 1fr)`,
                gridTemplateRows: `repeat(7, 1fr)`,
                gridAutoFlow: "column",
              }}
            >
              {HEATMAP_CELLS.map((cell, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView ? { opacity: 1, scale: 1 } : {}
                  }
                  transition={{
                    duration: 0.2,
                    delay: 0.8 + i * 0.003,
                  }}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs hover:ring-1 hover:ring-accent-purple/50 transition-all"
                  style={{
                    backgroundColor: levelColors[cell.level],
                  }}
                />
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-1.5 mt-4">
            <span className="text-[10px] text-text-muted mr-1">Less</span>
            {levelColors.map((color, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-xs"
                style={{ backgroundColor: color }}
              />
            ))}
            <span className="text-[10px] text-text-muted ml-1">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
