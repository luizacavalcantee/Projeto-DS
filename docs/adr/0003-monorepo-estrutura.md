## Contexto
O projeto possui frontend e backend distintos, mas relacionados, e a equipe deseja facilitar o versionamento e integração entre ambos.

## Decisão
Adotar uma estrutura **monorepo**, com as pastas `client/` para o frontend e `server/` para o backend.

## Consequências
- Facilidade de manutenção e integração
- Versionamento unificado
- Possibilidade de compartilhamento de código/utilitários
- Necessidade de organização clara para evitar dependências cruzadas indesejadas 