# Technical Knowledge Assistant

Assistente de conhecimento técnico para consultas sobre Terraform, com respostas contextualizadas e rastreáveis às fontes utilizadas.

## Objetivo

O projeto é um laboratório prático para estudar e aplicar, de forma incremental:

- Backend com Node.js, TypeScript e NestJS
- PostgreSQL e modelagem de dados
- Busca e recuperação de conhecimento
- Arquitetura de software
- Testes
- Processamento assíncrono
- Semantic Search, Embeddings e RAG
- LLMs
- AWS

As tecnologias serão introduzidas apenas quando resolverem um problema concreto do projeto.

## Como funciona

No MVP:

```text
Usuário
   ↓
HTTP API
   ↓
NestJS
   ↓
Busca textual
   ↓
PostgreSQL
   ↓
Documentos relevantes
   ↓
Resposta estruturada
   ↓
Fontes utilizadas
```

O sistema pode combinar:

```text
Documentação pública
+
Documentação interna geral
+
Documentação específica do cliente
```

sem misturar informações de clientes diferentes.

## Escopo inicial

O MVP permite:

- cadastrar documentos;
- associar documentos às suas fontes;
- associar documentação específica a clientes;
- consultar informações técnicas em linguagem natural;
- recuperar conteúdo relevante por busca textual;
- combinar informações de múltiplas fontes;
- informar quando não houver evidência suficiente;
- apresentar as fontes utilizadas;
- registrar feedback das respostas.

## Evolução planejada

O projeto será evoluído conforme as limitações reais forem encontradas.

```text
Busca textual
     ↓
Identificação de limitações
     ↓
Busca semântica
     ↓
Embeddings
     ↓
RAG
     ↓
LLM
```

A mesma lógica vale para infraestrutura:

```text
Local
  ↓
Necessidade real
  ↓
Serviço gratuito
  ↓
Serviço gerenciado, quando justificado
```

## Custo

O objetivo do MVP é **US$0/mês**.

Qualquer serviço pago deve ser justificado tecnicamente. O limite planejado para evolução é de **US$5/mês**, sem adoção automática de custos.

## Documentação

- [`requirements.md`](./requirements.md) — requisitos, casos de uso e critérios do MVP
- [`architecture.md`](./architecture.md) — arquitetura e evolução do sistema
- [`docs/decisions/ADR-001-mvp-synchronous-local-first.md`](./docs/decisions/ADR-001-mvp-synchronous-local-first.md) — decisão arquitetural do MVP

## Objetivo de aprendizado

Além de construir o sistema, o projeto busca documentar o motivo de cada decisão técnica e os trade-offs envolvidos, permitindo compreender não apenas **como implementar**, mas principalmente **por que determinada solução foi escolhida**.
