# Streak Trivia (Quiz)

## Descrição do Projeto

O objetivo deste projeto é implementar um quiz de perguntas e respostas no Telegram, onde os participantes devem acertar as respostas para avançar para as próximas rodadas. Os participantes que errarem serão eliminados, e o último a permanecer será o vencedor. 

O sistema deve ser escalável e seguir boas práticas de design e arquitetura distribuída, utilizando integração direta com o Telegram.

## Regras do Jogo

- 10 rodadas com envio de 1 pergunta por vez.
- Os participantes que acertarem avançam para a próxima rodada, os que errarem são eliminados.
- O último participante restante será o vencedor.
- As perguntas são enviadas simultaneamente para todos os participantes.
- Cada participante tem no máximo 10 segundos para responder a cada pergunta.
- Ao final de cada rodada, um ranking será enviado com os participantes classificados e eliminados, ordenado por tempo de resposta.

## Requisitos Técnicos

- **Canal**: Integração direta com o Telegram (sem conv API).
- **Linguagem de Programação**: Node.js, TypeScript.
- **Arquitetura**: Produtor -> Fila/Tópico -> Consumidor.
- **Banco de Dados**: PostgreSQL para registro de mensagens (MO e MT).
- **Cache**: Redis para controle de perguntas, ranking e participantes.
- **Mensageria**: Utilizar comunicação assíncrona (fila/tópico) com SQS, RabbitMQ, Kafka ou SNS.
- **Infraestrutura**: Utilização de Docker e AWS ECS.
- **Framework Web**: NestJS.
- **Serverless**: Lambda para produtores.

### Conceitos Aplicados

- **Design Patterns**: Singleton, Factory, Builder, Strategy, Observer, Chain of Responsibility, Dependency Injection.
- **Best Practices**: Clean Code (primeiros 5 capítulos), APIs REST, Mensageria assíncrona.
- **Conteinerização**: Docker, ECS.
- **Serverless**: Lambdas (AWS).
- **CI/CD**: Gitlab, Jenkins.
- **Arquitetura de Microserviços**: Implementação distribuída e escalável.

## Referências

- [Roadmap Backend](https://roadmap.sh/backend)
- [Clean Code Notes](https://github.com/JuanCrg90/Clean-Code-Notes)
- [Design Patterns](https://refactoring.guru/pt-br/design-patterns)
- [Producer-Consumer Pattern](https://dsysd-dev.medium.com/system-design-patterns-producer-consumer-pattern-1572f813329b)
