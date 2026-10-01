# Requirements

## 1. Objetivo

Construir um assistente de conhecimento técnico que permita consultar informações sobre Terraform em linguagem natural e retornar respostas contextualizadas, com rastreabilidade das fontes utilizadas. O MVP deve resolver o problema com uma abordagem simples e determinística, sem depender inicialmente de LLM, embeddings ou RAG.

## 2. Escopo do MVP

- API backend em NestJS + TypeScript.
- Persistência em PostgreSQL.
- Base de conhecimento composta por fontes públicas e documentação interna fictícia.
- Suporte a documentação geral e documentação específica de clientes fictícios.
- Busca textual para recuperação de conteúdo relevante.
- Resposta estruturada baseada exclusivamente no conteúdo recuperado.
- Identificação das fontes utilizadas na resposta.
- Registro de perguntas e respostas.
- Registro de feedback do usuário.
- Tratamento explícito de informação insuficiente.

## 3. Fontes de conhecimento

### PUBLIC
Documentação pública e oficial do Terraform e de componentes relacionados.

### INTERNAL_GENERAL
Documentação interna fictícia aplicável de forma geral à organização, como padrões, procedimentos, runbooks e decisões técnicas.

### INTERNAL_CUSTOMER
Documentação interna fictícia vinculada a um cliente específico, contendo informações de arquitetura, configuração, restrições e procedimentos daquele cliente.

## 4. Casos de uso

### UC-01 — Consultar uma informação técnica

**Objetivo:** responder uma pergunta técnica geral.

**Exemplo:**
> Como criar um bucket S3 usando Terraform?

**Fluxo:**
1. Usuário envia a pergunta.
2. Sistema identifica o contexto da consulta.
3. Sistema busca informações relevantes na base de conhecimento.
4. Sistema seleciona os documentos relevantes.
5. Sistema monta uma resposta baseada nas informações encontradas.
6. Sistema apresenta as fontes utilizadas.

**Exceções:**
- Nenhuma informação relevante encontrada.
- Informação insuficiente para responder com segurança.

### UC-02 — Consultar informação técnica considerando um cliente

**Objetivo:** responder considerando particularidades de um cliente específico.

**Exemplo:**
> Como criar um bucket S3 para o Cliente A?

**Fluxo:**
1. Usuário informa a pergunta e o cliente, explícita ou implicitamente.
2. Sistema identifica o contexto do cliente.
3. Sistema busca conhecimento geral e específico aplicável.
4. Documentos de outros clientes são excluídos.
5. Sistema consolida as informações aplicáveis.
6. Sistema monta a resposta.
7. Sistema apresenta as fontes utilizadas.

**Exceções:**
- Não existe documentação específica do cliente.
- Existe documentação geral, mas o contexto do cliente é insuficiente.
- Informação insuficiente para responder.

### UC-03 — Consolidar informações complementares ou conflitantes

**Objetivo:** responder perguntas que dependem de múltiplas fontes.

**Exemplo:**
> Como configurar X seguindo a documentação do Terraform e o padrão interno da empresa?

**Fluxo:**
1. Usuário envia a pergunta.
2. Sistema identifica as fontes relevantes.
3. Sistema recupera informações de cada fonte.
4. Sistema identifica informações complementares ou divergentes.
5. Sistema consolida apenas informações suportadas pelas fontes.
6. Sistema mantém a origem de cada informação.
7. Sistema apresenta a resposta e as fontes utilizadas.

**Regras:**
- Informações complementares podem ser utilizadas conjuntamente.
- Conflitos não devem ser ocultados arbitrariamente.
- O sistema não deve apresentar como fato uma informação sem suporte.

## 5. Requisitos funcionais

### Consulta

- **RF-01** O sistema deve receber perguntas em linguagem natural.
- **RF-02** O sistema deve consultar a base de conhecimento.
- **RF-03** O sistema deve recuperar documentos ou trechos relevantes, mantendo sua relação com o documento de origem.
- **RF-04** O sistema deve produzir uma resposta baseada no conteúdo recuperado.
- **RF-05** O sistema deve apresentar as fontes utilizadas na resposta.
- **RF-06** O sistema deve informar explicitamente quando não houver informação suficiente e não deve inventar conteúdo.

### Contexto de cliente

- **RF-07** O sistema deve permitir consultas contextualizadas por cliente.
- **RF-08** O sistema não deve utilizar documentação exclusiva de outros clientes em uma consulta específica.
- **RF-09** O sistema deve combinar conhecimento geral e específico do cliente quando ambos forem aplicáveis.

### Múltiplas fontes

- **RF-10** O sistema deve consultar múltiplas fontes quando a pergunta exigir.
- **RF-11** O sistema deve consolidar informações complementares.
- **RF-12** O sistema deve preservar a origem das informações recuperadas.
- **RF-13** O sistema deve detectar e preservar conflitos entre fontes, sem selecionar uma fonte de forma arbitrária.

### Base de conhecimento

- **RF-14** O sistema deve permitir cadastrar documentos na base de conhecimento.
- **RF-15** Cada documento deve possuir origem, tipo de fonte e contexto.
- **RF-16** Documentos do tipo `INTERNAL_CUSTOMER` devem estar associados a um cliente.
- **RF-17** O sistema deve permitir atualizar documentos sem perder sua identificação e origem.

### Feedback

- **RF-18** O sistema deve permitir avaliar uma resposta como correta, incorreta ou incompleta.
- **RF-19** O usuário deve poder fornecer informação adicional ao registrar feedback.
- **RF-20** Informação fornecida em feedback não deve alterar automaticamente uma fonte original.
- **RF-21** Informações adicionais provenientes de feedback devem poder ser analisadas posteriormente para incorporação controlada à base de conhecimento.

### Rastreabilidade

- **RF-22** Toda informação utilizada em uma resposta deve ser rastreável ao documento e à fonte de origem.
- **RF-23** A resposta deve manter a associação com os documentos recuperados que a fundamentaram.

## 6. Requisitos não funcionais

- **NFR-01 — Custo:** o MVP deve operar com custo mensal de US$0.
- **NFR-02 — Limite de custo:** qualquer evolução que introduza custo deve ser explicitamente avaliada; o limite planejado do projeto é de US$5/mês.
- **NFR-03 — Desenvolvimento local:** o sistema deve poder ser executado localmente sem serviços pagos.
- **NFR-04 — Testabilidade:** regras de negócio devem ser testáveis sem dependência de serviços externos.
- **NFR-05 — Rastreabilidade:** informações retornadas devem possuir referência à origem.
- **NFR-06 — Evolução:** a arquitetura não deve acoplar a aplicação a uma estratégia única de recuperação, permitindo futura adoção de busca semântica, embeddings e RAG.
- **NFR-07 — Resiliência futura:** a arquitetura deve permitir introduzir processamento assíncrono, retries, idempotência e filas posteriormente sem reescrever o domínio principal.
- **NFR-08 — Segurança de contexto:** dados específicos de clientes devem permanecer isolados por contexto.

## 7. Fora do escopo do MVP

- LLM generativo.
- Embeddings.
- Banco vetorial.
- Pipeline RAG.
- Processamento assíncrono de ingestão.
- AWS ou infraestrutura paga.
- Documentação real ou confidencial de clientes.
- Interface frontend dedicada.

## 8. Critérios de sucesso do MVP

O MVP será considerado funcional quando conseguir:

1. cadastrar documentos públicos, internos gerais e internos específicos de um cliente;
2. receber uma pergunta técnica;
3. recuperar conteúdo relevante por busca textual;
4. produzir uma resposta baseada somente no conteúdo recuperado;
5. combinar informações de diferentes fontes quando aplicável;
6. bloquear documentos de outros clientes em consultas contextualizadas;
7. informar quando não houver evidência suficiente;
8. mostrar as fontes utilizadas;
9. registrar feedback sem alterar automaticamente a fonte original.
