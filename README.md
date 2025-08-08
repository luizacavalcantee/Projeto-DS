# Projeto-DS

## Documentação de Decisões Arquiteturais (ADR)

As decisões arquiteturais do projeto estão documentadas na pasta `docs/adr/` seguindo o padrão [ADR](https://github.com/adr/adr-tools). Cada arquivo representa uma decisão importante tomada durante o desenvolvimento.

-----

## Testes Automatizados

O projeto utiliza **Jest** e **React Testing Library** para a execução de testes automatizados, garantindo a qualidade e a estabilidade do código. Os testes estão divididos entre o frontend e o backend.

Para executar os testes, siga os passos abaixo para cada ambiente.

### Backend (`/server`)

Os testes do backend focam em validar as regras de negócio e a lógica dos controllers de forma isolada (testes unitários).

1.  **Navegue até a pasta do servidor:**

    ```bash
    cd server
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Execute os testes:**

      * Para rodar todos os testes uma vez:
        ```bash
        pnpm test
        ```
      * Para rodar os testes em modo "watch" (executa novamente a cada alteração de arquivo):
        ```bash
        pnpm test:watch
        ```
      * Para gerar um relatório de cobertura de testes (o resultado ficará na pasta `server/coverage/`):
        ```bash
        pnpm test:coverage
        ```

-----

### Frontend (`/client`)

Os testes do frontend validam componentes de UI, hooks personalizados e fluxos de usuário.

1.  **Navegue até a pasta do cliente:**

    ```bash
    cd client
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    ```

3.  **Execute os testes:**

      * Para rodar todos os testes uma vez:
        ```bash
        pnpm test
        ```
      * Para rodar os testes em modo "watch":
        ```bash
        pnpm test:watch
        ```
      * Para gerar um relatório de cobertura de testes (o resultado ficará na pasta `client/coverage/`):
        ```bash
        pnpm test:coverage
        ```
