export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: "2020",
    title: "B.Tech Computer Science",
    description:
      "Started undergraduate studies in Computer Science, building foundations in algorithms, systems, and software engineering.",
    tag: "Education",
  },
  {
    year: "2022",
    title: "Machine Learning & Security Projects",
    description:
      "Deepened focus on ML systems and cybersecurity — building classifiers, security tools, and understanding adversarial techniques.",
    tag: "Exploration",
  },
  {
    year: "2024",
    title: "M.Tech at IIIT Hyderabad",
    description:
      "Admitted to IIIT Hyderabad for M.Tech in Computer Science, focusing on distributed systems and AI infrastructure.",
    tag: "Education",
  },
  {
    year: "2024–25",
    title: "Distributed Systems Deep Dive",
    description:
      "Built distributed search engine, payment gateway with 2PC, and explored consensus, replication, and partition tolerance.",
    tag: "Systems",
  },
  {
    year: "2025",
    title: "Security Research",
    description:
      "Advanced security research including network security analysis, vulnerability assessment, and secure system design patterns.",
    tag: "Security",
  },
  {
    year: "2025–26",
    title: "AI Infrastructure Engineering",
    description:
      "Building production AI serving infrastructure — model gateways, observability stacks, and scalable inference pipelines.",
    tag: "AI Infra",
  },
];