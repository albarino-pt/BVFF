# Use the official Bun image as the base
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies into a temporary directory for caching
FROM base AS install

# 👇 Instala as dependências necessárias para node-gyp
RUN apt update && apt install -y python3 make g++ && \
    mkdir -p /temp/dev

COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile || bun install

# Install production dependencies (excluding devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules and project files
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Run the app in development mode
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app .
RUN chown -R bun:bun /usr/src/app
USER bun
EXPOSE 4321
CMD ["bun", "dev"]
