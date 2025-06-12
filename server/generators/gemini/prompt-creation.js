const fs = require('fs');
const path = require('path');

// Recriando __dirname no contexto CommonJS
const filename = __filename;
const dirname = path.dirname(filename);
const filePath = path.resolve(dirname, '../../prisma/schema.prisma');

// Função para criar o prompt
module.exports = async function generatePrompt() {
  try {
    // Ler o conteúdo do arquivo
    const schemaContent = fs.readFileSync(filePath, 'utf-8');

    // Construir o prompt usando o conteúdo do arquivo
    const prompt = `
    Here is the content of my schema.prisma file:
    \`\`\`
    ${schemaContent}
    \`\`\`
    
    Based on this schema, create a seed file in TypeScript that inserts one, and ONLY ONE, instance for each entity described in the schema. Respect the relationships between entities and ensure consistency with the defined data types. The script must be compatible with Prisma. When making a relation, you dont need to specify the entire instance, just the instance id. At the catch(e), don't use process.exit(); throw an error instead. Only use try-catch when you call the function, not in the creation itself. You can follow this example
    
    \`\`\`
      import { PrismaClient } from '@prisma/client';

      const prisma = new PrismaClient();

      async function main() {
        const user = await prisma.user.create({
          data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'secret',
          },
        });
      }

      main()
        .catch((e) => {
          throw e;
        })
        .finally(async () => {
          await prisma.$disconnect();
        });
    \`\`\`
        `;

    return prompt;
  } catch (error) {
    console.error('Error reading the file:', error);
    return null;
  }
};
