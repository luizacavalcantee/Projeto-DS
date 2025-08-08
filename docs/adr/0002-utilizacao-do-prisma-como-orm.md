# 2. Utilização do Prisma como ORM para Acesso ao Banco de Dados

* **Status:** Aceito

* **Contexto:**
  Para o nosso backend em Node.js, precisávamos de uma forma segura e eficiente para interagir com o banco de dados. As alternativas eram escrever queries SQL manualmente (o que é propenso a erros e SQL injection), ou usar outros ORMs como o TypeORM ou Sequelize. O principal requisito era ter segurança de tipos (type-safety) entre o banco de dados e o nosso código TypeScript.

* **Decisão:**
  Decidimos adotar o **Prisma**. Ele funciona como um ORM de nova geração que gera um cliente de banco de dados totalmente tipado a partir de um arquivo de schema (`schema.prisma`). Isso garante que nossas operações de banco de dados sejam consistentes com nosso código TypeScript, evitando erros em tempo de execução.

* **Consequências:**
  * **Positivo:** Type-safety completo na camada de dados. O Prisma Studio facilita a visualização e manipulação dos dados. O sistema de migrações é declarativo e fácil de usar.
  * **Negativo:** Adiciona uma camada de abstração e uma nova ferramenta ao fluxo de trabalho. Operações muito complexas podem ser mais difíceis de escrever do que com SQL puro.