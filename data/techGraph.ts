export interface TechNode {
  id: string;
  label: string;
  type: "project" | "technology";
  group?: string;
}

export interface TechEdge {
  source: string;
  target: string;
}

export const techNodes: TechNode[] = [
  // Projects
  { id: "ai-gateway", label: "AI Serving Gateway", type: "project" },
  { id: "csao", label: "CSAO Recommender", type: "project" },
  { id: "search", label: "Distributed Search", type: "project" },
  { id: "strife", label: "Strife Payments", type: "project" },

  // AI Gateway technologies
  { id: "fastapi", label: "FastAPI", type: "technology", group: "backend" },
  { id: "rabbitmq", label: "RabbitMQ", type: "technology", group: "messaging" },
  { id: "celery", label: "Celery", type: "technology", group: "async" },
  { id: "prometheus", label: "Prometheus", type: "technology", group: "observability" },
  { id: "grafana", label: "Grafana", type: "technology", group: "observability" },
  { id: "jaeger", label: "Jaeger", type: "technology", group: "observability" },
  { id: "redis", label: "Redis", type: "technology", group: "data" },
  { id: "docker", label: "Docker", type: "technology", group: "infra" },

  // CSAO technologies
  { id: "pytorch", label: "PyTorch", type: "technology", group: "ml" },
  { id: "faiss", label: "FAISS", type: "technology", group: "ml" },
  { id: "sbert", label: "SBERT", type: "technology", group: "ml" },
  { id: "lightgbm", label: "LightGBM", type: "technology", group: "ml" },
  { id: "gru", label: "GRU", type: "technology", group: "ml" },
  { id: "sklearn", label: "Scikit-learn", type: "technology", group: "ml" },

  // Search technologies
  { id: "bs4", label: "BeautifulSoup", type: "technology", group: "parsing" },
  { id: "whoosh", label: "Whoosh", type: "technology", group: "search" },
  { id: "networkx", label: "NetworkX", type: "technology", group: "graph" },
  { id: "flask", label: "Flask", type: "technology", group: "backend" },

  // Strife technologies
  { id: "go", label: "Go", type: "technology", group: "backend" },
  { id: "grpc", label: "gRPC", type: "technology", group: "rpc" },
  { id: "protobuf", label: "Protobuf", type: "technology", group: "rpc" },
  { id: "tls", label: "TLS", type: "technology", group: "security" },
  { id: "postgres", label: "PostgreSQL", type: "technology", group: "data" },
];

export const techEdges: TechEdge[] = [
  // AI Gateway
  { source: "ai-gateway", target: "fastapi" },
  { source: "ai-gateway", target: "rabbitmq" },
  { source: "ai-gateway", target: "celery" },
  { source: "ai-gateway", target: "prometheus" },
  { source: "ai-gateway", target: "grafana" },
  { source: "ai-gateway", target: "jaeger" },
  { source: "ai-gateway", target: "redis" },
  { source: "ai-gateway", target: "docker" },
  { source: "rabbitmq", target: "celery" },
  { source: "prometheus", target: "grafana" },

  // CSAO
  { source: "csao", target: "pytorch" },
  { source: "csao", target: "faiss" },
  { source: "csao", target: "sbert" },
  { source: "csao", target: "lightgbm" },
  { source: "csao", target: "gru" },
  { source: "csao", target: "sklearn" },
  { source: "sbert", target: "faiss" },
  { source: "pytorch", target: "sbert" },
  { source: "pytorch", target: "gru" },

  // Search
  { source: "search", target: "bs4" },
  { source: "search", target: "whoosh" },
  { source: "search", target: "networkx" },
  { source: "search", target: "flask" },

  // Strife
  { source: "strife", target: "go" },
  { source: "strife", target: "grpc" },
  { source: "strife", target: "protobuf" },
  { source: "strife", target: "tls" },
  { source: "strife", target: "postgres" },
  { source: "grpc", target: "protobuf" },
  { source: "grpc", target: "tls" },
];

export const groupColors: Record<string, string> = {
  backend: "#818cf8",
  messaging: "#f472b6",
  async: "#fb923c",
  observability: "#38bdf8",
  data: "#34d399",
  infra: "#a78bfa",
  ml: "#fbbf24",
  parsing: "#f87171",
  search: "#2dd4bf",
  graph: "#c084fc",
  rpc: "#60a5fa",
  security: "#4ade80",
};