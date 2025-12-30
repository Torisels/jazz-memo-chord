# syntax=docker/dockerfile:1

# ================================
# Base Stage
# ================================
FROM oven/bun:1-alpine AS base
WORKDIR /app

# By copying only the package.json and bun.lockb here, we ensure that the following `-deps` steps
# are independent of the source code. Therefore, the `-deps` steps will be skipped if only the source code changes.
COPY package.json bun.lock ./

# ================================
# Production Dependencies
# ================================
FROM base AS prod-deps
RUN bun install --production --frozen-lockfile --verbose --no-cache

# ================================
# Build Dependencies
# ================================
FROM base AS build-deps
RUN bun install --frozen-lockfile

# ================================
# Build Stage
# ================================
FROM build-deps AS build
COPY . .
RUN bun run build

# ================================
# Runtime Stage
# ================================
FROM oven/bun:1-alpine AS runtime
WORKDIR /app

# Set production environment
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 astro

# Copy production dependencies and built application
COPY --from=prod-deps --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=astro:nodejs /app/dist ./dist

# Switch to non-root user
USER astro

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the server directly with Bun
CMD ["bun", "./dist/server/entry.mjs"]
