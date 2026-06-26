// "use client";

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";

// const interests = [
//   "AI Infrastructure",
//   "Distributed Systems",
//   "Backend Engineering",
//   "Recommendation Systems",
//   "Machine Learning",
//   "System Design",
//   "Cyber Security",
//   "Agentic AI",
//   "Large Scale Systems",
// ];

// export default function About() {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   return (
//     <section id="about" className="py-section" ref={ref}>
//       <div className="section-container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={isInView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5 }}
//         >
//           <p className="section-label">About</p>
//           <h2 className="section-heading mb-8">
//             Systems thinker who builds
//             <br />
//             <span className="text-gradient-indigo">for production</span>
//           </h2>
//         </motion.div>

//         <div className="grid md:grid-cols-2 gap-16 mt-12">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="space-y-5"
//           >
//             <p className="text-body-lg text-foregroundSecondary leading-relaxed">
//               I&apos;m Shubham Dewangan, an M.Tech Computer Science student at
//               IIIT Hyderabad. I build production-oriented systems — not simple
//               CRUD applications — focusing on the architectural decisions that
//               make systems reliable, observable, and scalable.
//             </p>
//             <p className="text-body-lg text-foregroundSecondary leading-relaxed">
//               My work sits at the intersection of AI infrastructure and
//               distributed systems. I care deeply about why one technology is
//               chosen over another, and I believe engineering decisions should be
//               driven by trade-off analysis, not trend-following.
//             </p>
//             <p className="text-body-lg text-foregroundSecondary leading-relaxed">
//               I enjoy the kind of problems where the answer isn&apos;t
//               &ldquo;just add a library&rdquo; — it&apos;s understanding the
//               failure modes, the consistency requirements, and the operational
//               complexity of the system you&apos;re building.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5, delay: 0.2 }}
//           >
//             <p className="text-caption font-medium text-muted uppercase tracking-widest mb-5">
//               Areas of Focus
//             </p>
//             <div className="flex flex-wrap gap-2.5">
//               {interests.map((interest, i) => (
//                 <motion.span
//                   key={interest}
//                   initial={{ opacity: 0, scale: 0.95 }}
//                   animate={isInView ? { opacity: 1, scale: 1 } : {}}
//                   transition={{ duration: 0.3, delay: 0.25 + i * 0.04 }}
//                   className="inline-flex items-center px-3.5 py-2 rounded-card bg-surface border border-border text-body-sm text-foregroundSecondary hover:text-foreground hover:border-borderLight transition-all duration-200"
//                 >
//                   {interest}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const highlights = [
  {
    number: "4+",
    label: "Production Systems",
  },
  {
    number: "12+",
    label: "Technologies",
  },
  {
    number: "M.Tech",
    label: "IIIT Hyderabad",
  },
  {
    number: "3+",
    label: "Domains",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-section" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="section-label">About Me</p>
          <h2 className="section-heading mb-4">
            A bit more about me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-content">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-body-lg text-foregroundSecondary leading-relaxed">
              I build systems where the answer isn&apos;t &ldquo;just add a
              library&rdquo; — it&apos;s understanding failure modes, consistency
              requirements, and operational complexity. My work sits at the
              intersection of AI infrastructure and distributed systems.
            </p>
            <p className="text-body-lg text-foregroundSecondary leading-relaxed">
              I care deeply about why one technology is chosen over another.
              Whether it&apos;s RabbitMQ vs Kafka, gRPC vs REST, or FAISS vs
              Elasticsearch — every decision is driven by trade-off analysis,
              not trend-following.
            </p>
            <p className="text-body-lg text-foregroundSecondary leading-relaxed">
              Currently focused on building production AI serving infrastructure
              and exploring Kubernetes, cloud-native patterns, and agentic AI
              systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-5">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="text-section-xl font-bold text-gradient-indigo mb-1">
                    {item.number}
                  </div>
                  <div className="text-caption text-muted uppercase tracking-widest">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}