## Contexto
O sistema precisa de autenticação segura e escalável, permitindo integração futura com outros serviços e aplicações.

## Decisão
Utilizar **JSON Web Tokens (JWT)** para autenticação e autorização de usuários.

## Consequências
- Facilidade de integração entre frontend e backend
- Stateless authentication
- Possibilidade de escalabilidade horizontal
- Necessidade de proteger e validar os tokens em cada requisição 