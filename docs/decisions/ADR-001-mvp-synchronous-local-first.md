# ADR-001 — MVP síncrono e local-first

- **Status:** Accepted
- **Date:** 2026-10-01

## Contexto

O projeto precisa validar o fluxo principal de consulta de conhecimento técnico antes de adicionar tecnologias de maior complexidade, como filas, processamento assíncrono, LLM, embeddings, RAG, serviços AWS ou banco vetorial. O objetivo do MVP também é manter o custo em US$0 e permitir desenvolvimento e execução local.

## Decisão

O MVP será implementado com:

- NestJS + TypeScript;
- PostgreSQL;
- processamento síncrono;
- busca textual;
- resposta determinística baseada nos documentos recuperados;
- execução local sem dependência de serviços pagos.

O domínio não será acoplado diretamente ao mecanismo de recuperação. A aplicação deverá utilizar uma abstração de recuperação que permita substituir ou complementar a busca textual no futuro.

LLM, embeddings e RAG não serão utilizados na primeira versão.

## Motivos

Essa abordagem permite validar primeiro o problema de negócio central:

```text
Pergunta
   ↓
Recuperação de informação
   ↓
Contexto correto
   ↓
Resposta rastreável
```

Também reduz a complexidade inicial e facilita testes isolados das regras de negócio.

## Consequências positivas

- MVP mais simples de implementar e testar.
- Custo inicial igual a US$0.
- Execução local.
- Menor quantidade de infraestrutura.
- Limitações da busca textual poderão ser observadas antes de introduzir RAG.
- Menor acoplamento com fornecedores e tecnologias específicas.

## Consequências negativas

- Busca textual poderá apresentar limitações para perguntas semanticamente diferentes do texto armazenado.
- Respostas determinísticas serão menos flexíveis do que respostas geradas por LLM.
- Futuramente será necessário implementar uma nova estratégia de recuperação e geração caso os testes demonstrem essa necessidade.

## Alternativas consideradas

### LLM + RAG desde o início
Não adotado porque adicionaria complexidade e dependências externas antes de validar se são necessárias.

### AWS + processamento assíncrono desde o início
Não adotado porque não existe ainda uma necessidade concreta de escalabilidade ou processamento prolongado que justifique a infraestrutura.

### Busca textual diretamente acoplada aos casos de uso
Não adotado porque dificultaria a evolução para outras estratégias de recuperação.

## Critério para revisar esta decisão

Esta decisão deve ser revisitada quando os testes do MVP demonstrarem uma limitação concreta da busca textual ou quando houver necessidade real de processamento assíncrono, geração de respostas ou escala que justifique novas tecnologias.
