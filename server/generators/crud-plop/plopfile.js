module.exports = (plop) => {
  // Gerador para controlador, repositório, rotas e DTO com identificador único ou duplo
  plop.setGenerator('model', {
    description: 'Create a controller, repository, routes, and DTO for a model',
    prompts: [
      {
        type: 'input',
        name: 'model',
        message: 'Digite o nome do model (ex. User, Aviso):',
      },
      {
        type: 'list',
        name: 'identifierType',
        message: 'O modelo possui identificador único ou duplo?',
        choices: ['Único', 'Duplo'],
      },
      {
        type: 'input',
        name: 'model1',
        message: 'Digite o primeiro nome do identificador (ex. Product):',
        when: (answers) => answers.identifierType === 'Duplo',
      },
      {
        type: 'input',
        name: 'model2',
        message: 'Digite o segundo nome do identificador (ex. Category):',
        when: (answers) => answers.identifierType === 'Duplo',
      },
    ],
    actions: (data) => {
      const actions = [];

      // Escolher o template correto de acordo com o tipo de identificador
      const templatePath =
        data.identifierType === 'Duplo'
          ? 'templates/doubleId'
          : 'templates/singleId';

      // Ações para controlador, repositório, rotas e DTO
      actions.push(
        {
          type: 'add',
          path: `../../src/controllers/{{pascalCase model}}Controller.ts`,
          templateFile: `${templatePath}/Controller.ts.hbs`,
        },
        {
          type: 'add',
          path: `../../src/repositories/{{pascalCase model}}Repository.ts`,
          templateFile: `${templatePath}/Repository.ts.hbs`,
        },
        {
          type: 'add',
          path: `../../src/routes/{{pascalCase model}}Routes.ts`,
          templateFile: `${templatePath}/Routes.ts.hbs`,
        },
        {
          type: 'add',
          path: `../../src/DTOs/{{pascalCase model}}.ts`,
          templateFile: `${templatePath}/DTO.ts.hbs`,
        },
        {
          type: 'modify',
          path: '../../src/DTOs/index.ts',
          pattern: /^(import .*;\n)/,
          template:
            "import { {{pascalCase model}}, Update{{pascalCase model}} } from './{{pascalCase model}}';\n$1",
        },
        {
          type: 'modify',
          path: '../../src/controllers/index.ts',
          pattern: /(export {)/,
          template:
            "import {{pascalCase model}}Controller from './{{pascalCase model}}Controller';\n\n$1",
        },
        {
          type: 'modify',
          path: '../../src/repositories/index.ts',
          pattern: /(export {)/,
          template:
            "import {{pascalCase model}}Repository from './{{pascalCase model}}Repository';\n\n$1",
        },
        {
          type: 'append',
          path: '../../src/controllers/index.ts',
          template: 'export { {{pascalCase model}}Controller };\n',
          skipIfExists: true,
        },
        {
          type: 'append',
          path: '../../src/repositories/index.ts',
          template: 'export { {{pascalCase model}}Repository };\n',
          skipIfExists: true,
        },
        {
          type: 'append',
          path: '../../src/DTOs/index.ts',
          template:
            'export { {{pascalCase model}}, Update{{pascalCase model}} };\n',
          skipIfExists: true,
        },
        {
          type: 'modify',
          path: '../../src/routes/index.ts',
          pattern: /\n/,
          template:
            "\n\nimport {{pascalCase model}}Routes from './{{pascalCase model}}Routes';",
        },
        {
          type: 'modify',
          path: '../../src/routes/index.ts',
          pattern: /const router = Router\(\);/,
          template:
            "const router = Router();\n\nrouter.use('/{{camelCase model}}', {{pascalCase model}}Routes);",
        },
      );

      return actions;
    },
  });
};
