export interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

export const skills: Skill[] = [
  { name: "Python", level: 92, color: "#818cf8", category: "Languages" },
  { name: "Go", level: 80, color: "#38bdf8", category: "Languages" },
  { name: "Distributed Systems", level: 88, color: "#818cf8", category: "Concepts" },
  { name: "System Design", level: 85, color: "#a78bfa", category: "Concepts" },
  { name: "Machine Learning", level: 82, color: "#fbbf24", category: "Concepts" },
  { name: "Docker & Containers", level: 78, color: "#38bdf8", category: "Infrastructure" },
  { name: "PostgreSQL & Redis", level: 80, color: "#34d399", category: "Infrastructure" },
  { name: "RabbitMQ & Celery", level: 76, color: "#f472b6", category: "Infrastructure" },
  { name: "gRPC & Protobuf", level: 78, color: "#fb923c", category: "Infrastructure" },
  { name: "Prometheus & Grafana", level: 75, color: "#f87171", category: "Observability" },
  { name: "PyTorch & FAISS", level: 80, color: "#fbbf24", category: "ML Tools" },
  { name: "React & Next.js", level: 72, color: "#7dd3fc", category: "Frontend" },
];