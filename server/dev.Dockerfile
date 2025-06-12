# dockerfile used for production. no further configuration is needed

FROM node:20.9.0-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

################################################################################

FROM base AS builder

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . .

RUN pnpm generate

################################################################################

FROM base AS runner

COPY --from=builder /home/node/app /home/node/app

RUN ls node_modules/.pnpm/ \
| grep "@prisma+client" \
| awk '{print $1}' \
| xargs -I {} chown -R node:node /home/node/app/node_modules/.pnpm/{}/node_modules/.prisma \
&& chown -R node:node /home/node/app/prisma/

USER node

EXPOSE 3001

CMD [ "pnpm", "dev" ]

# para a documentação seguida para construção desse arquivo, vá para o step 3 do link:

# https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt
