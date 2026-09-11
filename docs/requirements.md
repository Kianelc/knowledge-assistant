# Requirements

## 1. Product

**Contact Pro Knowledge Assistant**

An intelligent training and support assistant for Sinch Contact Pro.

The system helps users find answers to Contact Pro questions using approved and traceable knowledge sources.

---

## 2. Objective

The initial objective is to build a working assistant capable of:

1. Receiving a Contact Pro question.
2. Identifying relevant knowledge.
3. Returning a grounded answer.
4. Showing the source used to construct the answer.

The system will later evolve to support AI-powered retrieval, RAG, feedback, knowledge evaluation, and human validation.

---

## 3. Initial Knowledge Domain

The initial knowledge domain is:

**Sinch Contact Pro On-Premise FP21**

The knowledge base must preserve the version associated with each piece of knowledge.

Contact Pro information must be based on approved documentation.

---

## 4. MVP

The MVP must support the following flow:

```text
User
  ↓
Question
  ↓
Knowledge Service
  ↓
Relevant Knowledge
  ↓
Answer
  ↓
Source
```

Example:

```text
User:
How do I configure a queue?

Assistant:
To configure a queue, access the appropriate Contact Pro
configuration area and configure the required queue settings.

Source:
Contact Pro On-Premise FP21
```

The exact answer must only contain information supported by the knowledge available to the system.

---

## 5. Functional Requirements

### FR-01 — Ask a Question

The system must allow a user to submit a natural-language question about Contact Pro.

Example:

```text
How do I configure a queue?
```

---

### FR-02 — Retrieve Knowledge

The system must search the available Contact Pro knowledge and identify relevant information.

For the first implementation, knowledge retrieval may use a simple deterministic mechanism such as:

- JSON files
- In-memory data
- Simple text matching

Vector databases and embeddings are not required for the MVP.

---

### FR-03 — Generate a Grounded Answer

The system must return an answer based only on the knowledge retrieved.

The system must not invent:

- Contact Pro features
- Configuration options
- APIs
- Product behavior
- Procedures

If sufficient information cannot be found, the system should explicitly indicate that the available knowledge is insufficient.

---

### FR-04 — Source Traceability

Every answer must identify the knowledge source whenever possible.

A knowledge item should contain metadata such as:

```text
source
title
version
section
url
```

Example:

```json
{
  "source": "Sinch Contact Pro Documentation",
  "version": "FP21",
  "title": "Queue Configuration",
  "section": "System Configuration",
  "url": "..."
}
```

---

### FR-05 — Knowledge Version

Knowledge must be associated with a Contact Pro version.

The system must not silently mix information from different product versions.

---

### FR-06 — Unknown Information

When the knowledge base does not contain sufficient information, the assistant must not fabricate an answer.

Example:

```text
I could not find enough information in the approved
Contact Pro knowledge base to answer this question.
```

---

## 6. Future Requirements

The following capabilities are intentionally outside the first MVP.

### FR-F01 — RAG

The system should eventually support:

```text
Question
   ↓
Embedding
   ↓
Vector Search
   ↓
Relevant Documents
   ↓
LLM
   ↓
Grounded Answer
```

---

### FR-F02 — User Feedback

Users should be able to evaluate an answer.

Possible feedback:

```text
👍 Helpful
👎 Not helpful
```

---

### FR-F03 — Feedback Explanation

When an answer is not helpful, the user should be able to explain what was missing or incorrect.

---

### FR-F04 — Candidate Knowledge

User feedback may generate a candidate knowledge improvement.

Candidate knowledge must not automatically become approved knowledge.

---

### FR-F05 — Human Validation

A human reviewer must be able to:

- Review candidate knowledge.
- Approve it.
- Reject it.
- Modify it.

Only approved knowledge can become part of the authoritative knowledge base.

---

### FR-F06 — Knowledge Quality

The system should eventually evaluate knowledge quality using multiple signals, such as:

- Source quality.
- Retrieval relevance.
- User feedback.
- Human validation.
- Knowledge freshness.
- Documentation version.

The resulting score must not be interpreted as absolute AI certainty.

---

### FR-F07 — Training / Quiz

A quiz capability may be added in the future using the same approved knowledge base.

The quiz is not part of the initial MVP.

---

## 7. Non-Functional Requirements

### NFR-01 — Traceability

Contact Pro answers should be traceable to their underlying knowledge source.

---

### NFR-02 — Testability

Business rules must be testable independently from external services.

---

### NFR-03 — Scalability

The architecture should allow the application to scale horizontally when required.

---

### NFR-04 — Resilience

External failures should not cause uncontrolled application failures.

The system should eventually support:

- Retries
- Idempotency
- Dead-letter processing
- Graceful failure

These capabilities should be introduced when asynchronous processing is implemented.

---

### NFR-05 — Local Development

The MVP must be executable locally without requiring cloud infrastructure.

---

### NFR-06 — Zero Cost MVP

The MVP must operate at **$0/month** in infrastructure and external service costs.

The MVP must not require paid cloud infrastructure or paid external APIs.

---

### NFR-07 — Explicit Cost Approval

Any infrastructure or external service that introduces recurring costs must be explicitly evaluated and approved before being introduced.

---

## 8. Initial User Stories

### US-01 — Ask a Question

**As a** Contact Pro user,

**I want** to ask a question about Contact Pro,

**so that** I can quickly find relevant information from the documentation.

---

### US-02 — See the Source

**As a** Contact Pro user,

**I want** to see where the answer came from,

**so that** I can verify the information.

---

### US-03 — Handle Unknown Information

**As a** Contact Pro user,

**I want** the assistant to tell me when it does not have enough information,

**so that** I am not given a potentially incorrect answer.

---

## 9. MVP Acceptance Criteria

The MVP is considered complete when:

- [ ] A user can submit a Contact Pro question.
- [ ] The system searches the local knowledge base.
- [ ] Relevant knowledge is identified.
- [ ] An answer is generated from the retrieved knowledge.
- [ ] The answer contains source information.
- [ ] The system does not fabricate information.
- [ ] Unknown questions are handled explicitly.
- [ ] Core business rules have automated tests.
- [ ] The application can run locally.
- [ ] No paid cloud infrastructure is required.

---

## 10. Initial Example Scenarios

### Scenario 1 — Known Question

**Given** the knowledge base contains information about queue configuration,

**When** the user asks:

```text
How do I configure a queue?
```

**Then** the system should return relevant information and its source.

---

### Scenario 2 — Unknown Question

**Given** the knowledge base does not contain information about a topic,

**When** the user asks a question about that topic,

**Then** the system should explicitly indicate that sufficient approved information was not found.

---

### Scenario 3 — Versioned Knowledge

**Given** knowledge exists for a specific Contact Pro version,

**When** the system retrieves that knowledge,

**Then** the answer must preserve the associated version information.

---

## 11. MVP Boundaries

The first implementation will NOT include:

- LLM
- Embeddings
- Vector database
- RAG
- Telegram
- AWS
- Human review interface
- User authentication
- Automatic knowledge updates
- Quiz functionality

These capabilities will be introduced incrementally after the core knowledge flow is working.

---

## 12. Development Principle

The project should evolve through small, verifiable increments.

The implementation order should prioritize:

```text
Requirements
    ↓
Domain Model
    ↓
Simple Knowledge Service
    ↓
API
    ↓
Tests
    ↓
Asynchronous Processing
    ↓
Persistent Storage
    ↓
Documentation Ingestion
    ↓
Retrieval
    ↓
RAG
    ↓
Feedback
    ↓
Human Validation
```

Complexity should be introduced only when it solves a concrete problem.
