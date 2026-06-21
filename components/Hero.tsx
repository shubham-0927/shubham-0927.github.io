"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import NetworkVisualization from "./NetworkVisualization";
import { useMousePosition } from "@/lib/useMousePosition";

export default function Hero() {
  const mouse = useMousePosition();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax background gradients */}
      <div
        className="absolute inset-0 bg-gradient-indigo-subtle will-change-transform"
        style={{
          transform: `translate(${mouse.normalizedX * 15}px, ${mouse.normalizedY * 15}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />
      <div
        className="absolute inset-0 bg-gradient-sky-subtle will-change-transform"
        style={{
          transform: `translate(${mouse.normalizedX * -10}px, ${mouse.normalizedY * -10}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Network visualization */}
      <div className="absolute inset-0 opacity-60">
        <NetworkVisualization />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/80 backdrop-blur-sm text-caption text-foregroundSecondary">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
            M.Tech CS · IIIT Hyderabad
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-hero-xl md:text-hero-lg font-semibold text-foreground tracking-tight mb-6"
        >
          Building AI Infrastructure
          <br />
          <span className="text-gradient-indigo">& Distributed Systems</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
          className="text-body-lg text-foregroundSecondary max-w-2xl mx-auto mb-10"
        >
          I design and build production-oriented systems — AI serving gateways,
          recommendation pipelines, and distributed backends that handle scale
          with engineering rigor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-card bg-indigo-500 hover:bg-indigo-600 text-white text-body-sm font-medium transition-colors duration-200 shadow-glow-indigo"
          >
            View Projects
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-card border border-border hover:border-borderLight bg-surface/80 hover:bg-surfaceLight text-foreground text-body-sm font-medium transition-all duration-200"
          >
            About Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { icon: Github, href: "https://github.com/shubhamdewangan", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/shubhamdewangan", label: "LinkedIn" },
            { icon: Mail, href: "mailto:shubhamdewangan@example.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted hover:text-foreground transition-colors duration-200 p-2"
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}