# Contact Pro Knowledge Assistant

Intelligent training and support assistant for **Sinch Contact Pro**.

The assistant helps users answer Contact Pro questions using approved and traceable knowledge sources, initially focused on **Sinch Contact Pro On-Premise FP21 documentation**.

## Project Goals

This is both a product and a learning project.

The project aims to explore:

- Modern backend development with TypeScript
- Distributed systems
- Asynchronous processing
- AI-assisted software development
- Retrieval-Augmented Generation (RAG)
- Knowledge management
- Human-in-the-loop AI
- Testing and software architecture

## How It Works

The initial concept is:

```text
User
  ↓
Question
  ↓
Knowledge Retrieval
  ↓
Contact Pro Documentation
  ↓
Grounded Answer
  ↓
User Feedback
```

If the available documentation is insufficient, the system should make that explicit rather than inventing an answer.

User feedback can become a **candidate knowledge improvement**, but it must be reviewed and validated by a human before becoming approved knowledge.

## Initial Knowledge Domain

The first knowledge domain is:

**Sinch Contact Pro On-Premise FP21**

Knowledge should preserve its source and product version whenever possible.

Official documentation is considered the source of truth for Contact Pro-specific information.

## Development Principles

- AI proposes; human decides.
- Build incrementally.
- Prefer simple solutions.
- Keep business logic independent from infrastructure.
- Test business rules.
- Avoid unnecessary dependencies.
- Do not introduce AI infrastructure before it is needed.
- Never invent undocumented Contact Pro behavior.
- Keep knowledge traceable to its source.

## Project Status

**Current phase:** Sprint 0 — Foundation

The project is currently establishing:

- Repository structure
- Development guidelines
- Requirements
- Initial architecture
- Architectural decision records

The first implementation will start only after the foundation is defined.

## Development

### Prerequisites

- Node.js
- npm
- Docker
- Git

### Local development

Development instructions will be added as the application components are introduced.

## Documentation

Project documentation is organized under `docs/`:

```text
docs/
├── requirements.md
├── architecture.md
└── decisions/
```

## License

This project is currently intended as a personal learning and development project.
