# Etapa 1: build
FROM node:18 AS builder

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Etapa 2: imagem final
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app .

ENV NODE_ENV=production
EXPOSE 4321

CMD ["pnpm", "start"]
