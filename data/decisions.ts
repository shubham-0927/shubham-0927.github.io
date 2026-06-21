export interface Decision {
  question: string;
  answer: string;
  context: string;
  icon: string;
}

export const decisions: Decision[] = [
  {
    question: "Why RabbitMQ over Kafka?",
    answer:
      "For an AI gateway routing individual requests, you need per-message routing with low latency. RabbitMQ excels at this — it supports complex routing rules, acknowledgements per message, and lower operational overhead. Kafka is built for high-throughput event streaming and log aggregation, which is overkill and operationally heavier for request-level queuing.",
    context: "AI Model Serving Gateway",
    icon: "rabbit",
  },
  {
    question: "Why gRPC over REST?",
    answer:
      "Payment systems need strict API contracts, binary serialization for performance, and bidirectional streaming for real-time status. gRPC provides all three with protobuf schemas that catch contract violations at build time. REST's JSON payload is slower to serialize, lacks streaming, and has no schema enforcement.",
    context: "Strife Payment Gateway",
    icon: "grpc",
  },
  {
    question: "Why FAISS over Elasticsearch?",
    answer:
      "FAISS is purpose-built for vector similarity search — it uses optimized SIMD instructions, GPU acceleration, and memory-mapped indexes to retrieve nearest neighbors in microseconds. Elasticsearch added vector search as a feature, but it's fundamentally a text search engine with vector capabilities bolted on. For pure embedding similarity, FAISS is 10-100x faster.",
    context: "CSAO Recommendation System",
    icon: "vector",
  },
  {
    question: "Why Circuit Breakers?",
    answer:
      "When an AI provider degrades, you don't want to discover it by timing out on every request. Circuit breakers monitor failure rates and proactively stop sending traffic to unhealthy providers. Combined with fallback routing, this means the gateway degrades gracefully instead of cascading failures across the entire system.",
    context: "AI Model Serving Gateway",
    icon: "shield",
  },
  {
    question: "Why Two-Phase Commit over Saga?",
    answer:
      "In payments, you need atomicity — money leaves one account and enters another, or neither happens. Sagas provide eventual consistency through compensating transactions, which means temporary inconsistency windows. For financial transactions, 2PC's atomic commit or rollback is the correct consistency model, even with the availability trade-off.",
    context: "Strife Payment Gateway",
    icon: "lock",
  },
  {
    question: "Why LightGBM LambdaRank?",
    answer:
      "Pointwise models (regression, classification) predict individual relevance scores and don't optimize for ranking quality. LambdaRank directly optimizes NDCG by using pairwise gradients weighted by position — it learns that moving a relevant item from position 5 to 1 matters more than from 50 to 45. This makes it fundamentally better for ranking tasks.",
    context: "CSAO Recommendation System",
    icon: "rank",
  },
];