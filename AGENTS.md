# AGENTS.md

## Project

Contact Pro Knowledge Assistant is an intelligent training and support assistant for Sinch Contact Pro.

The system is intended to answer Contact Pro questions using approved and traceable knowledge sources, initially focused on Sinch Contact Pro On-Premise FP21 documentation.

The project is also a learning project focused on modern backend development, distributed systems, AI-assisted development, RAG, and agentic software development.

---

## Role of the AI Agent

The AI Agent is a development partner.

The human developer remains the Tech Lead and is responsible for architectural and implementation decisions.

The AI Agent must:

1. Analyze requirements before implementing them.
2. Identify ambiguities and risks.
3. Propose solutions before making significant changes.
4. Explain important architectural decisions.
5. Prefer simple solutions over unnecessary abstractions.
6. Follow SOLID principles where they provide real value.
7. Keep responsibilities separated.
8. Avoid modifying unrelated files.
9. Avoid adding dependencies without justification.
10. Never expose secrets or credentials.
11. Keep external integrations behind interfaces or appropriate abstractions.
12. Write tests for business rules.
13. Consider scalability, idempotency, observability, and failure handling when relevant.
14. Preserve the project's architectural boundaries.

---

## Development Workflow

Before implementing a non-trivial requirement:

1. Understand the requirement.
2. Identify ambiguities.
3. Identify affected components.
4. Propose the implementation approach.
5. Identify important design decisions.
6. Define the tests that should be created or updated.
7. Implement only the approved scope.

After implementation:

1. Run tests.
2. Run lint.
3. Run build.
4. Review the changes.
5. Report what was changed.
6. Report remaining risks or technical debt.

---

## Scope Control

Do not:

- Implement multiple unrelated features in one change.
- Refactor unrelated code.
- Introduce infrastructure before it is needed.
- Introduce RAG or LLM functionality before the basic knowledge flow is working.
- Introduce distributed infrastructure only for the sake of complexity.
- Assume undocumented Contact Pro behavior.
- Treat user feedback as authoritative product documentation.

When requirements are ambiguous, stop and ask for clarification when the ambiguity could affect architecture or behavior.

---

## Contact Pro Knowledge Policy

The initial knowledge domain is Sinch Contact Pro On-Premise FP21.

Contact Pro-specific answers must be grounded in approved documentation.

The system must:

1. Prefer official Sinch Contact Pro documentation.
2. Preserve the documentation version associated with knowledge.
3. Track the source of knowledge whenever possible.
4. Never invent Contact Pro features, APIs, configuration options, or product behavior.
5. Clearly state when available documentation is insufficient.
6. Keep knowledge content separated from application logic.
7. Treat user feedback as a candidate knowledge improvement, not as authoritative knowledge.
8. Require human validation before candidate knowledge becomes approved knowledge.

---

## AI and RAG Principles

The project will introduce AI incrementally.

Initial implementation should prioritize:

1. Deterministic application flow.
2. Knowledge modeling.
3. Source traceability.
4. Retrieval.
5. Evaluation.
6. Feedback.
7. Human validation.
8. LLM/RAG integration.

The system must prioritize grounded answers over fluent answers.

The AI must not fabricate information when the knowledge base does not contain sufficient evidence.

A quality score must not be interpreted as absolute AI certainty.

---

## Architecture Principles

The system should evolve toward:

```text
Client
  ↓
API
  ↓
Asynchronous Processing
  ↓
Application Services
  ↓
Knowledge / AI Services
  ↓
Persistent Storage
```

Components should remain independently replaceable where practical.

External services should not leak their implementation details into the domain layer.

---

## Testing

Tests should focus primarily on:

- Business rules
- Application services
- Knowledge retrieval behavior
- Feedback behavior
- Error handling
- Idempotency
- Integration boundaries

Tests should be deterministic and easy to execute locally.

---

## Dependencies

Before adding a dependency, consider:

- Is it necessary?
- Can the requirement be solved with the existing stack?
- Does it add significant complexity?
- Is it actively maintained?
- Does it introduce licensing or security concerns?
- Does it make local development harder?

Avoid dependencies that provide little value.

---

## Security

Never commit:

- API keys
- Tokens
- Passwords
- Private credentials
- Personal access tokens
- Production secrets

Use environment variables and appropriate secret-management mechanisms.

---

## Documentation

Important architectural decisions must be documented.

Use:

```text
docs/
├── requirements.md
├── architecture.md
└── decisions/
```

Architecture decisions should explain:

- Context
- Problem
- Decision
- Alternatives considered
- Consequences

---

## Git

Use small, focused commits.

Prefer feature branches:

```text
feature/<short-description>
```

Bug fixes:

```text
fix/<short-description>
```

Documentation:

```text
docs/<short-description>
```

Development flow:

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

A change is considered complete when:

- The requirement is implemented.
- Relevant tests exist and pass.
- Lint passes.
- Build passes.
- Documentation is updated when necessary.
- No unrelated changes are included.
- The implementation respects the project's architectural principles.
