# ADR-001: Start with a Synchronous MVP Before Introducing Asynchronous Processing

## Status

Accepted

## Context

The Contact Pro Knowledge Assistant is expected to evolve into a system that may include asynchronous processing, message queues, AI/RAG, external integrations, and independently scalable components.

However, the first objective is to validate the core business capability:

1. Receive a Contact Pro question.
2. Search approved knowledge.
3. Identify relevant information.
4. Generate a grounded answer.
5. Return the source used for the answer.

Introducing queues, workers, cloud infrastructure, or distributed processing before validating this core flow would add unnecessary complexity to the initial implementation.

The project is also a learning project. The architecture should therefore allow the developer to learn and validate each layer incrementally.

## Decision

The first version of the system will use a synchronous architecture:

```text
Client
  ↓
API
  ↓
Knowledge Service
  ↓
Knowledge Repository
  ↓
Answer
```

The initial implementation will use a local JSON file as the knowledge repository.

The application will use abstractions around the repository so that the implementation can later be replaced by another storage or retrieval mechanism without changing the core application logic.

The MVP must run locally without requiring paid cloud services or paid external APIs.

Asynchronous processing will be introduced only when a concrete requirement justifies it.

Possible future architecture:

```text
Client
  ↓
API
  ↓
Producer
  ↓
Queue
  ↓
Consumer
  ↓
Application Services
```

## Alternatives Considered

### 1. Start with asynchronous processing

```text
Client → API → Producer → Queue → Consumer
```

Rejected for the MVP.

The system does not currently have a requirement that justifies the additional complexity of queues, workers, retries, dead-letter queues, and distributed processing.

### 2. Put all logic inside the API controller

```text
Controller
  ├── validate question
  ├── search knowledge
  ├── generate answer
  └── format response
```

Rejected.

Although simple initially, this approach would tightly couple HTTP concerns with application and business logic, making testing and future evolution harder.

### 3. Start directly with cloud/serverless infrastructure

Rejected for the MVP.

The initial version must have **zero infrastructure cost**.

Cloud infrastructure would introduce operational complexity and potentially recurring costs before the core product behavior has been validated.

The MVP should therefore remain fully executable locally.

## Consequences

### Positive

- Faster development feedback.
- Easier local development.
- Simpler debugging.
- Simpler automated tests.
- Focus on business rules before infrastructure.
- Easier learning progression.
- **Zero infrastructure cost for the MVP.**
- No cloud dependency for the MVP.
- Architecture can evolve incrementally.

### Negative

- The first version will not provide asynchronous processing.
- Long-running operations are not handled by workers.
- Retry and dead-letter mechanisms are not part of the MVP.
- A future requirement may require introducing a queue and consumer.
- Some future infrastructure concerns will need to be addressed when the system evolves.

These limitations are intentional and accepted for the MVP.

## When to Revisit This Decision

This decision should be revisited when the system has a concrete requirement such as:

- Long-running processing.
- AI/RAG processing with significant latency.
- Need for independent worker scaling.
- Queue-based retry requirements.
- External integrations requiring decoupling.
- Telegram or webhook processing that should not block the API.
- Increased throughput requirements.
- Need for asynchronous failure handling.

Any infrastructure that introduces recurring cost must be explicitly evaluated before being added to the project.

## Related Documents

- `docs/requirements.md`
- `docs/architecture.md`
- `AGENTS.md`
