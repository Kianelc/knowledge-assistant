# Architecture

## 1. Objetivo

A arquitetura do MVP deve ser simples o suficiente para permitir implementação e aprendizado rápidos, mas com separação clara entre domínio, persistência e mecanismo de recuperação. A principal decisão arquitetural é evitar que o domínio dependa diretamente da tecnologia de busca utilizada. Isso permite começar com busca textual e, caso exista uma necessidade real, evoluir para busca semântica, embeddings e RAG.

## 2. Arquitetura do MVP

```text
Client / HTTP
      |
      v
 NestJS API
      |
      v
 Application Layer
      |
      +--------------------+
      |                    |
      v                    v
Knowledge Retrieval    Answer Builder
      |                    |
      +---------+----------+
                |
                v
           PostgreSQL
```

## 3. Principais componentes

### API
Responsável por receber requisições HTTP, validar entrada e retornar respostas.

### Application Layer
Orquestra os casos de uso e coordena recuperação, regras de contexto, composição da resposta e feedback.

### Knowledge Retrieval
Responsável por encontrar documentos relevantes para uma pergunta.

No MVP, a implementação será baseada em busca textual no PostgreSQL.

A aplicação deve depender de uma abstração conceitual de recuperação, e não diretamente de SQL de busca ou de uma futura tecnologia vetorial.

Exemplo conceitual:

```text
RetrievalService
      |
      +--> TextSearchRetrieval   (MVP)
      |
      +--> SemanticRetrieval     (futuro)
      |
      +--> RAGRetrieval          (futuro)
```

O MVP implementará apenas `TextSearchRetrieval`.

### Answer Builder
Responsável por transformar as informações recuperadas em uma resposta estruturada.

No MVP, a resposta será determinística e baseada no conteúdo encontrado, sem LLM.

No futuro, um componente de geração poderá ser adicionado sem alterar a responsabilidade do mecanismo de recuperação.

### PostgreSQL
Responsável pela persistência de:

- clientes;
- fontes;
- documentos;
- perguntas;
- respostas;
- feedbacks.

## 4. Modelo conceitual inicial

```text
Source
  |
  | 1:N
  v
Customer
  ^
  | 0:1
Document
```

A associação com `Customer` é obrigatória apenas para documentos provenientes de `INTERNAL_CUSTOMER`.

Consulta:

```text
Question
   |
   v
Retrieval
   |
   +--> Document A
   +--> Document B
   +--> Document C
   |
   v
Answer
   |
   +--> Sources used
   |
   v
Feedback
```

## 5. Contexto de cliente

O contexto do cliente é uma regra do domínio, não apenas um filtro de banco.

Para uma pergunta sobre o Cliente A:

```text
PUBLIC
       +
INTERNAL_GENERAL
       +
INTERNAL_CUSTOMER (Customer A)
       |
       v
   Pode ser utilizado
```

Enquanto:

```text
INTERNAL_CUSTOMER (Customer B)
       |
       X
Não pode ser utilizado
```

## 6. Rastreabilidade

A recuperação deve manter a cadeia:

```text
Question
   ↓
Retrieved Document
   ↓
Source
   ↓
Answer
```

Isso permite que cada parte relevante da resposta seja relacionada à origem utilizada.

## 7. Evolução para RAG

RAG não faz parte do MVP.

A arquitetura, porém, deve manter separadas estas responsabilidades:

```text
Question
   ↓
Retrieval
   ↓
Context
   ↓
Answer Generation
```

No MVP:

```text
Question
   ↓
Text Search
   ↓
Document content
   ↓
Deterministic Answer
```

Evolução possível:

```text
Question
   ↓
Semantic Retrieval
   ↓
Chunks/Embeddings
   ↓
Retrieved Context
   ↓
LLM
   ↓
Answer
```

A introdução de RAG deverá ocorrer apenas quando a busca textual demonstrar uma limitação concreta que justifique a complexidade adicional.

## 8. Evolução para processamento assíncrono

O MVP será síncrono.

A arquitetura deve evitar que regras de negócio dependam de HTTP ou de uma execução síncrona específica, permitindo posteriormente introduzir:

```text
API
 ↓
Queue
 ↓
Worker
 ↓
Processing
```

Isso poderá ser usado futuramente para ingestão de documentos, geração de embeddings ou outras tarefas demoradas.

## 9. Princípios arquiteturais

- Simplicidade antes de infraestrutura.
- Domínio independente da tecnologia de busca.
- Persistência separada das regras de negócio.
- Rastreabilidade como requisito transversal.
- Contexto do cliente como regra explícita.
- Evolução orientada por problemas reais.
- Serviços gratuitos/local-first no MVP.
