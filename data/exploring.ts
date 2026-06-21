export interface ExploringData {
  building: string;
  buildingDescription: string;
  learning: string[];
  reading: {
    title: string;
    author: string;
    note: string;
  };
  interests: string[];
}

export const exploring: ExploringData = {
  building: "AI Model Serving Gateway",
  buildingDescription:
    "Production infrastructure for multi-provider AI model routing with observability, fault tolerance, and intelligent load distribution.",
  learning: [
    "Kubernetes — container orchestration for scalable model serving",
    "AWS — cloud infrastructure for distributed AI workloads",
    "Advanced System Design — patterns for large-scale distributed systems",
  ],
  reading: {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    note: "The definitive guide to the architecture behind reliable, scalable, and maintainable data systems.",
  },
  interests: [
    "Agentic AI",
    "Large Scale Systems",
    "AI Infrastructure",
    "Distributed Consensus",
    "Observability Engineering",
  ],
};