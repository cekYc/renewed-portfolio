"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Github,
  Globe,
  MapPin,
  Send,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { PROFILE } from "@/lib/constants";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">(
    "idle"
  );
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Since there's no backend, we'll simulate and open mailto
    setTimeout(() => {
      setFormState("sent");
      const subject = encodeURIComponent(
        `Portfolio Contact from ${form.name}`
      );
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      );
      window.open(
        `mailto:${PROFILE.email}?subject=${subject}&body=${body}`,
        "_blank"
      );
      setTimeout(() => {
        setFormState("idle");
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    }, 800);
  };

  const contactLinks = [
    {
      icon: <Github size={20} />,
      label: "GitHub",
      value: "@cekYc",
      href: PROFILE.github,
      color: "#8b5cf6",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      color: "#3b82f6",
    },
    {
      icon: <MapPin size={20} />,
      label: "Location",
      value: PROFILE.location,
      href: "#",
      color: "#10b981",
    },
  ];

  return (
    <section id="contact" className="relative py-32 px-4" ref={ref}>
      {/* Background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-accent-purple/5 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-mono text-accent-blue mb-3 tracking-widest uppercase">
            Contact
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-6">
            Let&apos;s Work Together
          </h3>
          <p className="text-text-muted max-w-md mx-auto">
            Have a project in mind or just want to say hi? I&apos;m always open
            to new opportunities and interesting conversations.
          </p>
          <div className="section-divider max-w-md mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 p-4 glass rounded-xl card-hover group"
              >
                <div
                  className="p-2.5 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${link.color}15`,
                    color: link.color,
                  }}
                >
                  {link.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-text-muted mb-0.5">
                    {link.label}
                  </div>
                  <div className="text-sm text-text-primary truncate group-hover:text-accent-purple transition-colors">
                    {link.value}
                  </div>
                </div>
                {link.href !== "#" && (
                  <ExternalLink
                    size={14}
                    className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                )}
              </motion.a>
            ))}

            {/* Availability banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="p-4 rounded-xl bg-accent-green/5 border border-accent-green/20 mt-6"
            >
              <div className="flex items-center gap-2 text-accent-green text-sm font-medium mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green" />
                </span>
                Available for work
              </div>
              <p className="text-xs text-text-muted">
                Open to EU-based remote opportunities, especially in backend,
                systems, and full-stack development roles.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-text-muted mb-2 font-mono">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-2 font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-muted mb-2 font-mono">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-white/5 border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-accent-purple/50 focus:ring-1 focus:ring-accent-purple/20 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formState !== "idle"}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                  formState === "sent"
                    ? "bg-accent-green/20 text-accent-green"
                    : "bg-linear-to-r from-accent-purple to-accent-blue text-white hover:shadow-lg hover:shadow-accent-purple/25 hover:scale-[1.02]"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {formState === "idle" && (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
                {formState === "sending" && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </>
                )}
                {formState === "sent" && (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
