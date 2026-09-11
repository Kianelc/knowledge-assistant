# Architecture

## 1. Overview

Contact Pro Knowledge Assistant is designed as an incremental system.

The architecture starts simple to validate the core business flow and evolves toward an asynchronous, scalable architecture as the project requirements increase.

The initial architecture intentionally avoids unnecessary infrastructure.

---

## 2. Architectural Evolution

The project will evolve through the following stages:

```text
Phase 1 — MVP

Client
  ↓
API
  ↓
Knowledge Service
  ↓
Knowledge Base
  ↓
Answer
```

```text
Phase 2 — Asynchronous Processing

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
Knowledge Service
```

```text
Phase 3 — AI / RAG

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
Knowledge Service
  ↓
Retrieval
  ↓
Vector Database
  ↓
LLM
  ↓
Grounded Answer
```

Infrastructure should only be introduced when the current phase requires it.

---

## 3. MVP Architecture

The first implementation will use a simple synchronous architecture.

```text
┌──────────────┐
│    Client    │
└──────┬───────┘
       │
       │ Question
       ▼
┌──────────────┐
│     API      │
└──────┬───────┘
       │
       ▼
┌────────────────────┐
│  Knowledge Service │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│   Local Knowledge   │
│       Source        │
└─────────┬──────────┘
          │
          ▼
┌──────────────┐
│    Answer    │
└──────────────┘
```

The first implementation may use local JSON files as the knowledge source.

---

## 4. Main Components

### 4.1 API

Responsible for:

- Receiving user questions.
- Validating requests.
- Calling the application layer.
- Returning the response.

The API must not contain Contact Pro knowledge or retrieval rules directly.

---

### 4.2 Knowledge Service

Responsible for:

- Searching the knowledge base.
- Identifying relevant knowledge.
- Applying knowledge-related business rules.
- Returning knowledge with its metadata.

The Knowledge Service should not depend directly on HTTP, Telegram, AWS, or a specific database.

---

### 4.3 Knowledge Repository

Responsible for retrieving knowledge.

The initial implementation can use a local JSON file.

Future implementations may use:

```text
JSON
  ↓
PostgreSQL
  ↓
Search Engine
  ↓
Vector Database
```

The application should depend on an abstraction rather than a specific storage implementation.

---

### 4.4 Answer Service

Responsible for constructing the response from retrieved knowledge.

For the MVP, this service does not require an LLM.

The answer must be constructed only from retrieved approved knowledge.

Future implementations may introduce an LLM behind an abstraction.

---

## 5. Domain Model

The initial domain should contain concepts such as:

```text
Question
KnowledgeItem
KnowledgeSource
Answer
```

A simplified relationship:

```text
Question
   │
   │ retrieves
   ▼
KnowledgeItem
   │
   ├── KnowledgeSource
   └── Version
          │
          ▼
        Answer
```

---

## 6. Knowledge Item

A knowledge item represents an approved piece of Contact Pro knowledge.

Example:

```json
{
  "id": "knowledge-001",
  "title": "Queue Configuration",
  "content": "Approved Contact Pro information...",
  "version": "FP21",
  "section": "System Configurator",
  "source": {
    "name": "Sinch Contact Pro Documentation",
    "url": "https://docs.cc.sinch.com/onpremise/2026/index.html"
  },
  "status": "approved"
}
```

The actual content must be based on approved Contact Pro documentation.

---

## 7. Knowledge Status

Knowledge should eventually support a lifecycle:

```text
candidate
    ↓
review
    ↓
approved
    ↓
published
```

Rejected knowledge must not be used as authoritative knowledge.

For the MVP, only:

```text
approved
```

knowledge is required.

---

## 8. Repository Abstraction

The application should define an abstraction similar to:

```text
KnowledgeRepository

+ search(query)
+ findById(id)
```

The initial implementation may be:

```text
JsonKnowledgeRepository
```

Future implementations may include:

```text
PostgresKnowledgeRepository
VectorKnowledgeRepository
```

The application layer should not need to change when the storage implementation changes.

---

## 9. Application Flow

For the MVP:

```text
1. Client sends question
        ↓
2. API validates request
        ↓
3. Application receives question
        ↓
4. Knowledge Service searches approved knowledge
        ↓
5. Relevant knowledge is returned
        ↓
6. Answer Service constructs grounded answer
        ↓
7. API returns answer and source
```

---

## 10. Unknown Information Flow

When relevant knowledge cannot be found:

```text
Question
   ↓
Knowledge Service
   ↓
No sufficient knowledge
   ↓
Answer Service
   ↓
Insufficient Knowledge Response
```

The system must not attempt to fill the missing information using assumptions.

---

## 11. Future Asynchronous Architecture

When asynchronous processing becomes necessary, the system will evolve toward:

```text
                    ┌───────────────┐
                    │     Client    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │      API      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Producer   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │      SQS      │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │    Consumer   │
                    └───────┬───────┘
                            │
                            ▼
                 ┌────────────────────┐
                 │ Application Layer  │
                 └─────────┬──────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        PostgreSQL       Redis       AI/RAG
```

The Producer and Consumer should remain independently deployable.

---

## 12. Future AI / RAG Architecture

The AI layer should be isolated behind application abstractions.

```text
Application
     │
     ▼
AI Service
     │
     ├── Retrieval
     │     └── Vector Database
     │
     └── Generation
           └── LLM
```

The application should not directly depend on a specific LLM provider.

Possible future implementations:

```text
AIService
   │
   ├── LocalAIService
   ├── OpenAIService
   ├── GeminiService
   └── OtherAIService
```

The concrete provider should be replaceable without changing the domain model.

---

## 13. External Integrations

External systems should be isolated from the domain layer.

Examples:

```text
Telegram
AWS SQS
PostgreSQL
Redis
Vector Database
LLM Provider
```

The application should communicate with these systems through appropriate interfaces or adapters.

---

## 14. Scalability

The architecture should support horizontal scaling where required.

The system must avoid relying on:

- Process-local state.
- In-memory state for persistent business information.
- Local files as the final production storage.
- Singleton state for distributed coordination.

Local JSON knowledge is acceptable only during the initial MVP.

---

## 15. Reliability

The asynchronous architecture must eventually consider:

- At-least-once message delivery.
- Idempotency.
- Retries.
- Dead-letter queues.
- Timeout handling.
- Partial failures.
- Observability.

These concerns will be introduced when asynchronous processing is implemented.

---

## 16. Security

Security responsibilities include:

- Environment-based configuration.
- Secret management.
- Input validation.
- Authentication when required.
- Authorization for administrative functionality.
- Avoiding sensitive information in logs.

Secrets must never be committed to the repository.

---

## 17. Local Development

The project should be runnable locally.

Initial MVP:

```text
Application
    ↓
Local JSON Knowledge
```

Later:

```text
Application
    ↓
Docker
    ├── PostgreSQL
    ├── Redis
    └── LocalStack / SQS
```

Cloud infrastructure should only be introduced after the local architecture is validated.

---

## 18. Architectural Principles

The project follows these principles:

### Simplicity First

Do not introduce infrastructure before it solves a real problem.

### Separation of Concerns

Domain logic must remain independent from infrastructure.

### Dependency Inversion

Application logic should depend on abstractions rather than concrete external services.

### Replaceability

External providers should be replaceable whenever practical.

### Traceability

Answers must be traceable to approved knowledge.

### Grounding

The system must prefer saying "I don't have enough information" over inventing an answer.

### Incremental Complexity

Architecture should evolve with demonstrated requirements.

---

## 19. Initial Technology Decisions

The initial implementation will use:

| Area              | Initial Choice       |
| ----------------- | -------------------- |
| Language          | TypeScript           |
| Runtime           | Node.js              |
| API Framework     | NestJS               |
| Knowledge Storage | JSON                 |
| Tests             | Jest                 |
| Package Manager   | npm                  |
| Containerization  | Docker when required |
| Cloud             | Not required for MVP |
| LLM               | Not required for MVP |
| Vector Database   | Not required for MVP |

Future infrastructure will be evaluated when the corresponding requirement appears.

---

## 20. Architecture Evolution Rule

Every significant architectural addition should answer:

1. What problem are we solving?
2. Why does the current architecture no longer solve it?
3. What alternatives were considered?
4. What new complexity does this introduce?
5. How will we test it locally?
6. What is the cost?
7. Can the component be removed or replaced later?

Architectural complexity must have a measurable reason to exist.
