# Etapa de build
FROM oven/bun:1.1 as builder

WORKDIR /app

# Copiar arquivos do projeto
COPY . .

# Instalar dependências (usa lockfile do bun)
RUN bun install --frozen-lockfile

# Fazer build do Astro
RUN bun run build


# Etapa de produção
FROM oven/bun:1.1

WORKDIR /app

# Copiar arquivos da build
COPY --from=builder /app /app

# Instalar apenas dependências de produção
RUN bun install --production --frozen-lockfile

# Porta usada pelo servidor (padrão 4321 se usares astro preview/bun serve)
EXPOSE 4321

# Variáveis de ambiente para TinaCMS
ENV NODE_ENV=pro_
