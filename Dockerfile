# Etapa de build
FROM node:22-alpine AS builder

WORKDIR /app

# Instalar dependências do sistema (python3, make, g++, etc)
RUN apk add --no-cache python3 make g++ sqlite

# Copiar arquivos do projeto
COPY . .

# Instalar dependências com pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# Build do Astro
RUN pnpm run build

# Etapa final: imagem pequena para produção
FROM node:22-alpine AS runner

WORKDIR /app

# Copiar apenas o necessário da imagem de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Variáveis de ambiente (ajusta conforme necessário)
ENV NODE_ENV=production
ENV PORT=4321

EXPOSE 4321

# Comando para iniciar o site
CMD ["pnpm", "run", "preview"]
