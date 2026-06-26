"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";

const links = [
  {
    label: "Email",
    href: "mailto:shubhamdewangan@example.com",
    value: "shubhamdewangan@example.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    href: "https://github.com/shubhamdewangan",
    value: "github.com/shubhamdewangan",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shubhamdewangan",
    value: "linkedin.com/in/shubhamdewangan",
    icon: Linkedin,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-content-narrow text-center mb-14"
        >
          <p className="section-label">Contact</p>
          <h2 className="section-heading mb-4">Let&apos;s connect</h2>
          <p className="section-description mx-auto">
            If you&apos;re working on something interesting in AI infrastructure,
            distributed systems, or backend engineering — I&apos;d love to hear
            about it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-content-narrow mx-auto">
          {links.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            >
              <TiltCard className="glass-card-hover p-6 group" tiltAmount={2}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-surfaceLighter border border-border flex items-center justify-center text-muted group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all duration-200">
                    <link.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-caption text-muted uppercase tracking-widest mb-1">
                      {link.label}
                    </p>
                    <p className="text-body-sm text-foregroundSecondary group-hover:text-foreground transition-colors duration-200">
                      {link.value}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-muted group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200 mt-auto"
                  />
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}