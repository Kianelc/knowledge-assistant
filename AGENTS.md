# AGENTS.md

## Project

Contact Pro Knowledge Assistant is an intelligent training and support assistant for Sinch Contact Pro.

The initial knowledge domain is Sinch Contact Pro On-Premise FP21 documentation.

The project is also a learning project focused on backend development, distributed systems, AI-assisted development, RAG, and agentic software development.

---

## AI Agent Role

The AI Agent is a development partner.

The human developer is the Tech Lead and makes final architectural and implementation decisions.

The AI Agent must:

- Analyze requirements before implementation.
- Identify relevant ambiguities, risks, and affected components.
- Propose an approach before significant changes.
- Prefer simple solutions and avoid premature abstractions.
- Apply SOLID where it provides practical value.
- Keep responsibilities separated.
- Avoid unrelated changes and unnecessary dependencies.
- Keep external integrations behind appropriate abstractions.
- Write tests for business rules.
- Consider scalability, idempotency, observability, and failure handling when relevant.
- Preserve architectural boundaries.
- Never expose secrets or credentials.

---

## Development Workflow

For non-trivial changes:

1. Understand the requirement.
2. Identify ambiguities, risks, and affected components.
3. Propose the implementation approach.
4. Define relevant tests.
5. Implement only the requested scope.
6. Run tests, lint, and build.
7. Review the changes.
8. Report changes and remaining risks or technical debt.

For ambiguous requirements, ask for clarification when the ambiguity could affect architecture or behavior.

---

## Scope Control

Do not:

- Implement unrelated features.
- Refactor unrelated code.
- Introduce infrastructure before it is needed.
- Introduce RAG, LLMs, or distributed processing before the MVP requires them.
- Add complexity without a concrete requirement.
- Assume undocumented Contact Pro behavior.
- Treat user feedback as authoritative documentation.

---

## Contact Pro Knowledge Policy

Contact Pro-specific answers must be grounded in approved documentation.

The system must:

- Prefer official Sinch Contact Pro documentation.
- Preserve the associated documentation version.
- Track the knowledge source.
- Never invent Contact Pro features, APIs, configuration, or behavior.
- Clearly state when available knowledge is insufficient.
- Keep knowledge separate from application logic.
- Treat user feedback as candidate knowledge only.
- Require human validation before candidate knowledge becomes approved knowledge.

---

## AI and RAG Principles

AI capabilities are introduced incrementally.

Prioritize:

1. Deterministic application flow.
2. Knowledge modeling.
3. Source traceability.
4. Retrieval.
5. Evaluation.
6. Feedback.
7. Human validation.
8. LLM/RAG.

Prioritize grounded answers over fluent answers.

Never fabricate information when the knowledge base lacks sufficient evidence.

Quality scores must not be treated as absolute AI certainty.

---

## Architecture Principles

Start simple and evolve incrementally.

The MVP uses:

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

Future architecture may introduce:

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

Introduce asynchronous processing only when a concrete requirement justifies it.

Components should remain replaceable where practical.

External service implementations must not leak into the domain layer.

---

## Testing

Prioritize tests for:

- Business rules.
- Application services.
- Knowledge retrieval.
- Error handling.
- Integration boundaries.
- Idempotency when applicable.

Tests must be deterministic and runnable locally.

---

## Dependencies

Before adding a dependency, verify:

- It is necessary.
- Existing dependencies cannot solve the requirement.
- Complexity is justified.
- It is maintained.
- Licensing and security are acceptable.
- It does not unnecessarily complicate local development.

Avoid unnecessary dependencies.

---

## Cost

The MVP must operate at **$0/month** in infrastructure and external service costs.

Do not introduce paid cloud infrastructure or paid external APIs for the MVP.

Any recurring cost requires explicit evaluation and approval.

---

## Security

Never commit:

- API keys.
- Tokens.
- Passwords.
- Private credentials.
- Personal access tokens.
- Production secrets.

Use environment variables and appropriate secret-management mechanisms.

Never expose secrets in logs, code, tests, or documentation.

---

## Documentation

Document significant architectural decisions in:

```text
docs/
├── requirements.md
├── architecture.md
└── decisions/
```

ADRs should document:

- Context.
- Decision.
- Alternatives.
- Consequences.

---

## Git

Use small, focused commits.

Branch naming:

```text
feature/<short-description>
fix/<short-description>
docs/<short-description>
```

Flow:

```text
feature/*
    ↓
develop
    ↓
main
```

Do not commit directly to `main`.

---

## Definition of Done

A change is complete when:

- The requirement is implemented.
- Relevant tests pass.
- Lint passes.
- Build passes.
- Required documentation is updated.
- No unrelated changes are included.
- Architectural boundaries are preserved.
