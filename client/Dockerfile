# Estágio 1: Builder - Instala dependências e constrói o projeto
FROM node:18-alpine AS builder
WORKDIR /app

# --- CORREÇÃO SHARP (Parte 1) ---
# Instala dependências do sistema necessárias para a biblioteca 'sharp'
RUN apk add --no-cache libc6-compat

# Copia os arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instala as dependências (agora com a 'sharp')
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Executa o build de produção
RUN npm run build

# Estágio 2: Runner - A imagem final e otimizada
FROM node:18-alpine

WORKDIR /app

# Cria um usuário com menos privilégios por segurança
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copia os arquivos da pasta 'standalone' gerada pelo build.
COPY --from=builder /app/.next/standalone ./

# Copia a pasta 'public' e a pasta de assets estáticos
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# --- CORREÇÃO DE PERMISSÃO ---
# Mude o proprietário de todos os arquivos da aplicação para o usuário 'nextjs'
# Isso deve ser feito ANTES de trocar de usuário com o comando USER
RUN chown -R nextjs:nodejs /app

# Define o usuário 'nextjs' para rodar a aplicação
USER nextjs

EXPOSE 8001
ENV PORT 8001

# O comando para iniciar o servidor
CMD ["node", "server.js"]