# Base image with Bun
FROM oven/bun:1.1

# Install build tools required for native modules like better-sqlite3
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Install dependencies
COPY bun.lockb package.json ./
RUN bun install

# Copy rest of the source
COPY . .

# Build Astro site
RUN bun run build

# Expose port for server
EXPOSE 4040

# Serve the built static site
CMD ["bun", "x", "serve", "dist", "--port", "4040"]
