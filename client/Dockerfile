# Estágio 1: Builder - Instala dependências e constrói o projeto
FROM node:18-alpine AS builder
WORKDIR /app

# Copia os arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Executa o build de produção
RUN npm run build

# ---

# Estágio 2: Runner - A imagem final e otimizada
FROM node:18-alpine

WORKDIR /app

# Cria um usuário com menos privilégios por segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copia os arquivos da pasta 'standalone' gerada pelo build.
# Esta pasta contém o servidor otimizado.
COPY --from=builder /app/.next/standalone ./

# Copia a pasta 'public' e a pasta de assets estáticos para dentro
# da pasta 'standalone', que é onde o servidor vai procurar por elas.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Define o usuário 'nextjs' para rodar a aplicação
USER nextjs

EXPOSE 3000
ENV PORT 3000

# O comando para iniciar o servidor agora aponta para o 'server.js'
# que está dentro da pasta 'standalone'.
CMD ["node", "server.js"]
