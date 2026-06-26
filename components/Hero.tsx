"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import NetworkVisualization from "./NetworkVisualization";
import HeroGraphic from "./HeroGraphic";
import { useMousePosition } from "@/lib/useMousePosition";

export default function Hero() {
  const mouse = useMousePosition();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background parallax */}
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

      {/* Network canvas */}
      <div className="absolute inset-0 opacity-40">
        <NetworkVisualization />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 section-container w-full py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-5"
            >
              <span className="text-body-lg text-muted">
                Hello, I&apos;m
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="text-hero-xl md:text-hero-lg font-bold text-foreground tracking-tight mb-4"
            >
              Shubham{" "}
              <span className="text-gradient-indigo">Dewangan</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-8 h-px bg-indigo-500 dark:bg-indigo-400" />
              <span className="text-body-md font-medium text-indigo-500 dark:text-indigo-400">
                AI Infrastructure & Distributed Systems
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="text-body-lg text-foregroundSecondary max-w-xl mb-8 leading-relaxed"
            >
              M.Tech CS at IIIT Hyderabad. I build production-oriented systems
              — AI serving gateways, recommendation pipelines, and distributed
              backends that handle scale with engineering rigor.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-card bg-indigo-500 hover:bg-indigo-600 text-white text-body-sm font-medium transition-all duration-200 shadow-glow-indigo hover:shadow-lg"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-card border border-border hover:border-borderLight bg-surface/80 hover:bg-surfaceLight text-foreground text-body-sm font-medium transition-all duration-200"
              >
                <Download size={15} strokeWidth={1.5} />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex items-center gap-5"
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
                  className="w-10 h-10 rounded-full border border-border bg-surface/50 flex items-center justify-center text-muted hover:text-foreground hover:border-borderLight transition-all duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Graphic */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow behind graphic */}
              <div className="absolute inset-0 -m-12 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent rounded-full blur-2xl" />
              <HeroGraphic />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
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