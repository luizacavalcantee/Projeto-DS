const dotenv = require('dotenv');
const fs = require('fs');
const {
  GoogleGenerativeAI,
} = require('../../node_modules/@google/generative-ai');
const generatePrompt = require('./prompt-creation');

dotenv.config();

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY, // Passando a chave API corretamente
);

async function main() {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Gera o prompt
  const prompt = await generatePrompt();

  const result = await model.generateContent(prompt, {
    maxOutputTokens: 8192,
    temperature: 0.3, // Criatividade balanceada
    topP: 0.95, // Probabilidade acumulativa
    topK: 50, // Amostra de 50 palavras para escolher
  });
  const response = await result.response;
  let text = response.text();

  // Remove os delimitadores de código ```typescript```
  text = text
    .replace(/```typescript/g, '')
    .replace(/```/g, '')
    .replace(/^\n/, ''); // Remove o \n inicial

  return text;
}

async function writeToFile() {
  const final = await main();
  const filePath = './prisma/seed.ts';

  // Escreve o conteúdo no arquivo
  fs.writeFile(filePath, final, (err) => {
    if (err) {
      console.error('Erro ao escrever no arquivo:', err);
    } else {
      console.log(`Arquivo '${filePath}' escrito com sucesso!`);
    }
  });
}

writeToFile();
