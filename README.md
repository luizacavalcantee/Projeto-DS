# Projeto Desenvolvimento de Software

## 🚀 Rodando o Projeto com Docker

A maneira mais simples de executar o projeto completo (frontend, backend e banco de dados) é utilizando o Docker.

### Pré-requisitos

  - [Docker](https://www.docker.com/get-started/)
  - [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)

### Passos para Execução

1.  **Clonar repositório**

    Antes de tudo é necessário clocar o repositório na sua máquina com o comando a baixo:
    ```bash
    git clone https://github.com/luizacavalcantee/Projeto-DS.git
    ```

2.  **Configuração de Ambiente**

    O backend precisa de um arquivo de variáveis de ambiente para se conectar ao banco de dados e outros serviços. Crie um arquivo chamado `.env` dentro da pasta `server` (`server/.env`) com o seguinte conteúdo:

    ```ini
    # ###### GENERAL SETTINGS #######
    PROJECT_NAME=boilerplate

    # ###### SERVER SETTINGS #######
    SERVER_PORT=3001
    NODE_ENV=development

    # ###### DATABASE SETTINGS #######
    DATABASE_TYPE=postgres
    DATABASE_HOST=${PROJECT_NAME}-db
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASSWORD=docker
    DATABASE_DB=${PROJECT_NAME}

    # ###### TEST DATABASE SETTINGS #######
    DATABASE_TEST_HOST=localhost
    DATABASE_TEST_PORT=5433
    DATABASE_TEST_USER=postgres
    DATABASE_TEST_PASSWORD=docker
    DATABASE_TEST_DB=boilerplate-test

    DATABASE_URL=${DATABASE_TYPE}://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_DB}

    # ###### GEMINI API KEY
    GEMINI_API_KEY=

    # ###### JWT SETTINGS #######
    JWT_ACCESS_SECRET=0551c0ed-6389-46b1-839e-2e28fc191c89 # token for 30sec
    JWT_REFRESH_SECRET=92fba49f6912d14733332bb9ebaac1562f51ee685594acf103d71f685f70868b # token for 7 days

    # ###### S3 SETTINGS #######
    S3_ENDPOINT=XXXXXX.digitaloceanspaces.com
    S3_BUCKET=exemplo-bucket
    S3_KEY=
    S3_SECRET=
    ```

3.  **Construir e Iniciar os Contêineres**

    Na raiz do projeto, execute o seguinte comando. Isso fará o download das imagens, construirá os contêineres e os iniciará em segundo plano.

    ```bash
    docker compose up --build
    ```

4.  **Acessar a Aplicação**

    Pronto\! A aplicação agora está disponível no seu navegador.

      * **Frontend:** [http://localhost:8080/school/](https://www.google.com/search?q=http://localhost:8080/school/)
      * **API do Backend:** `http://localhost:8080/school-api/`

### Gerenciando os Contêineres

  * **Para parar tudo:**
    ```bash
    docker compose down
    ```
  * **Para parar e remover os volumes** (isso irá apagar todos os dados do seu banco de dados):
    ```bash
    docker compose down -v
    ```

-----

## Documentação de Decisões Arquiteturais (ADR)

As decisões arquiteturais do projeto estão documentadas na pasta `docs/adr/` seguindo o padrão [ADR](https://github.com/adr/adr-tools). Cada arquivo representa uma decisão importante tomada durante o desenvolvimento.

-----

## Testes Automatizados

O projeto utiliza **Jest** para a execução de testes automatizados. Para executar os testes localmente (fora do Docker), siga os passos abaixo.

### Backend (`/server`)

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
      * Para rodar os testes em modo "watch":
        ```bash
        pnpm test:watch
        ```
      * Para gerar um relatório de cobertura de testes:
        ```bash
        pnpm test:coverage
        ```

### Frontend (`/client`)

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
      * Para gerar um relatório de cobertura de testes:
        ```bash
        pnpm test:coverage
        ```
