// export interface Project {
//   id: string;
//   title: string;
//   subtitle: string;
//   problem: string;
//   solution: string;
//   architecture: string[];
//   technologies: string[];
//   decisions: string[];
//   outcomes: string[];
//   category: string;
//   color: "indigo" | "sky" | "emerald" | "amber";
// }

// export const projects: Project[] = [
//   {
//     id: "ai-gateway",
//     title: "AI Model Serving Gateway",
//     subtitle: "Production-grade multi-provider AI routing infrastructure",
//     problem:
//       "Organizations deploying LLMs face fragmented provider landscapes, unreliable model endpoints, and no unified observability. Direct API calls create tight coupling, cascading failures, and zero visibility into latency, cost, or quality across providers.",
//     solution:
//       "Built a gateway that abstracts multiple AI providers behind a unified interface with intelligent routing, health monitoring, and full observability. The system automatically fails over between providers, tracks every request through distributed tracing, and exposes metrics for real-time monitoring.",
//     architecture: [
//       "API Gateway layer with request validation and rate limiting",
//       "Provider abstraction with pluggable adapters for OpenAI, Anthropic, local models",
//       "RabbitMQ-based async task queue for non-blocking request processing",
//       "Celery workers for model inference with configurable concurrency",
//       "Circuit breaker pattern per provider with exponential backoff",
//       "Prometheus metrics pipeline with custom latency and quality dashboards",
//       "Grafana dashboards for real-time system health and cost tracking",
//       "Jaeger distributed tracing across every request path",
//     ],
//     technologies: [
//       "Python",
//       "FastAPI",
//       "RabbitMQ",
//       "Celery",
//       "Prometheus",
//       "Grafana",
//       "Jaeger",
//       "Docker",
//       "Redis",
//     ],
//     decisions: [
//       "RabbitMQ over Kafka — event-driven with lower operational complexity for request queues",
//       "Circuit breakers per provider — isolation prevents cascade failures across the gateway",
//       "Jaeger for tracing — critical for debugging latency across async worker chains",
//     ],
//     outcomes: [
//       "Unified interface for 4+ AI providers with zero client-side changes",
//       "Sub-50ms gateway overhead on top of model inference time",
//       "Automatic failover reduced downtime from provider outages by 95%",
//       "Full request visibility from entry to inference completion",
//     ],
//     category: "AI Infrastructure",
//     color: "indigo",
//   },
//   {
//     id: "csao-recommendation",
//     title: "CSAO Recommendation System",
//     subtitle: "Session-aware recommendation with hybrid retrieval and learning-to-rank",
//     problem:
//       "Traditional collaborative filtering fails with cold-start users and sparse interaction data. Session-based systems struggle with intent drift — users exploring different categories within a single session get irrelevant recommendations.",
//     solution:
//       "Built a two-stage recommendation pipeline combining semantic similarity search with learning-to-rank. FAISS retrieves candidate items using SBERT embeddings, then a LightGBM LambdaRank model re-ranks candidates using session context, user history, and item features captured through a GRU-based session encoder.",
//     architecture: [
//       "SBERT encoder for generating item embeddings from text descriptions",
//       "FAISS index for approximate nearest neighbor retrieval at scale",
//       "GRU-based session encoder capturing sequential user intent",
//       "LightGBM LambdaRank for learning-to-rank with position-aware loss",
//       "Feature engineering pipeline combining content, collaborative, and session signals",
//       "Online serving with pre-computed embeddings and real-time session updates",
//     ],
//     technologies: [
//       "Python",
//       "PyTorch",
//       "FAISS",
//       "Sentence-BERT",
//       "LightGBM",
//       "GRU",
//       "Scikit-learn",
//       "NumPy",
//     ],
//     decisions: [
//       "FAISS over Elasticsearch — purpose-built for vector similarity, orders of magnitude faster",
//       "LambdaRank over pointwise models — directly optimizes ranking quality, not individual scores",
//       "GRU over Transformer for sessions — lighter weight, sufficient for short session sequences",
//     ],
//     outcomes: [
//       "10x faster candidate retrieval vs. brute-force similarity search",
//       "Significant improvement in NDCG over single-model baselines",
//       "Graceful cold-start handling through content-based FAISS retrieval",
//       "End-to-end pipeline from raw data to ranked recommendations",
//     ],
//     category: "Machine Learning",
//     color: "sky",
//   },
//   {
//     id: "distributed-search",
//     title: "Distributed Search Engine",
//     subtitle: "Full-stack web search with crawling, indexing, and PageRank",
//     problem:
//       "Understanding how search engines work at a systems level — from web crawling to ranking — requires building one. Most engineers use search engines without understanding the distributed systems challenges underneath.",
//     solution:
//       "Built a complete search engine from scratch: a distributed crawler that fetches and stores pages, an inverted index with compression, a PageRank implementation for link-based ranking, and a retrieval system that combines term frequency with authority scores.",
//     architecture: [
//       "Distributed web crawler with URL frontier and politeness policies",
//       "HTML parser and text extraction pipeline",
//       "Inverted index with term frequency and positional information",
//       "Block-max WAND indexing for efficient top-k retrieval",
//       "PageRank computation using iterative power method on link graph",
//       "Ranking function combining TF-IDF with PageRank authority scores",
//       "Simple REST API for query serving",
//     ],
//     technologies: [
//       "Python",
//       "BeautifulSoup",
//       "Whoosh",
//       "NetworkX",
//       "Redis",
//       "SQLite",
//       "Flask",
//     ],
//     decisions: [
//       "Inverted index over brute-force — essential for sub-second search over large corpora",
//       "PageRank as authority signal — pure text matching misses important pages with few keyword matches",
//       "Block-max WAND — enables efficient top-k retrieval without scoring every document",
//     ],
//     outcomes: [
//       "Functional search over thousands of crawled documents",
//       "PageRank effectively surfaced high-authority pages in results",
//       "Distributed crawler handled concurrency and duplicate URL detection",
//       "Complete understanding of the search stack from crawling to ranking",
//     ],
//     category: "Distributed Systems",
//     color: "emerald",
//   },
//   {
//     id: "strife-payment",
//     title: "Strife Payment Gateway",
//     subtitle: "gRPC-based payment processing with distributed transaction guarantees",
//     problem:
//       "Payment systems require absolute consistency — you cannot have a deduction without a corresponding credit. REST-based payment flows struggle with partial failures, network timeouts, and the need for atomic operations across services.",
//     solution:
//       "Designed a payment gateway using gRPC for low-latency inter-service communication and TLS for transport security. Implemented Two-Phase Commit for distributed transactions ensuring atomic money movement across accounts, with comprehensive error handling and rollback mechanisms.",
//     architecture: [
//       "gRPC service definitions with protobuf schemas for payment operations",
//       "TLS-encrypted transport layer for all inter-service communication",
//       "Two-Phase Commit coordinator for atomic cross-service transactions",
//       "Account service with optimistic locking and balance validation",
//       "Transaction log with write-ahead logging for crash recovery",
//       "Idempotency keys preventing duplicate transaction processing",
//     ],
//     technologies: [
//       "Go",
//       "gRPC",
//       "Protocol Buffers",
//       "TLS",
//       "PostgreSQL",
//       "Docker",
//       "gRPC Gateway",
//     ],
//     decisions: [
//       "gRPC over REST — binary protocol, streaming support, and strict schema contracts",
//       "2PC over Saga — payment correctness demands atomicity, not eventual consistency",
//       "TLS at transport level — mTLS between internal services for zero-trust architecture",
//     ],
//     outcomes: [
//       "Sub-10ms inter-service call latency with gRPC",
//       "Atomic transactions with guaranteed consistency or clean rollback",
//       "Zero duplicate transactions through idempotency key enforcement",
//       "Production-ready security with TLS-encrypted all communication",
//     ],
//     category: "Backend Engineering",
//     color: "amber",
//   },
// ];

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  gradient: string;
  iconBg: string;
  icon: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "ai-gateway",
    title: "AI Model Serving Gateway",
    subtitle: "Production-grade multi-provider AI routing infrastructure",
    description:
      "Unified gateway abstracting multiple AI providers with intelligent routing, health monitoring, circuit breakers, and full observability through Prometheus, Grafana, and Jaeger.",
    technologies: ["FastAPI", "RabbitMQ", "Celery", "Prometheus", "Grafana", "Jaeger"],
    gradient: "from-indigo-600/30 via-purple-600/20 to-transparent",
    iconBg: "bg-indigo-500/15",
    icon: "gateway",
  },
  {
    id: "csao-recommendation",
    title: "CSAO Recommendation System",
    subtitle: "Session-aware hybrid recommendation with learning-to-rank",
    description:
      "Two-stage pipeline combining FAISS semantic retrieval with LightGBM LambdaRank re-ranking, using GRU-based session encoders for sequential user intent.",
    technologies: ["PyTorch", "FAISS", "SBERT", "LightGBM", "GRU"],
    gradient: "from-sky-600/30 via-cyan-600/20 to-transparent",
    iconBg: "bg-sky-500/15",
    icon: "brain",
  },
  {
    id: "distributed-search",
    title: "Distributed Search Engine",
    subtitle: "Full-stack search with crawling, indexing, and PageRank",
    description:
      "Complete search engine from scratch — distributed crawler, inverted index with compression, PageRank computation, and Block-max WAND retrieval.",
    technologies: ["Python", "BeautifulSoup", "NetworkX", "Whoosh", "Flask"],
    gradient: "from-emerald-600/30 via-teal-600/20 to-transparent",
    iconBg: "bg-emerald-500/15",
    icon: "search",
  },
  {
    id: "strife-payment",
    title: "Strife Payment Gateway",
    subtitle: "gRPC payment processing with distributed transactions",
    description:
      "TLS-encrypted gRPC payment gateway with Two-Phase Commit for atomic cross-service transactions, idempotency keys, and write-ahead logging.",
    technologies: ["Go", "gRPC", "Protobuf", "TLS", "PostgreSQL"],
    gradient: "from-amber-600/30 via-orange-600/20 to-transparent",
    iconBg: "bg-amber-500/15",
    icon: "lock",
  },
];