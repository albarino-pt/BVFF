# Use official Bun base image
FROM oven/bun

# Set working dir
WORKDIR /app

# Copy package files and install dependencies
COPY bun.lockb /app/
COPY package.json /app/
RUN bun install

# Copy all source files
COPY . /app

# Build Astro site
RUN bun run build

# Use static file server
# You can use `serve` (install via bun) or a minimal server
RUN bun add serve

# Expose port
EXPOSE 4040

# Serve the static site from dist folder
CMD ["bun", "x", "serve", "dist", "--port", "4040"]
