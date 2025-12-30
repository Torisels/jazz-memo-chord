# DevOps Configuration

This directory contains Docker configuration files for the jazz-memo-chord application.

## Files

- `Dockerfile` - Multi-stage Docker build for production
- `.dockerignore` - Files to exclude from Docker build context
- `docker-compose.yml` - Complete stack including app and PostgreSQL database

## Quick Start

### Production Build

Build and run the production container:

```bash
# Build the image
docker build -f devops/Dockerfile -t jazz-memo-chord:latest .

# Run the container
docker run -p 3000:3000 \
  -e PUBLIC_SUPABASE_URL=your_supabase_url \
  -e PUBLIC_SUPABASE_ANON_KEY=your_anon_key \
  jazz-memo-chord:latest
```

### Docker Compose

Run the complete stack (app + database):

```bash
# Start all services
docker-compose -f devops/docker-compose.yml up -d

# Start with Supabase Studio for development
docker-compose -f devops/docker-compose.yml --profile development up -d

# View logs
docker-compose -f devops/docker-compose.yml logs -f app

# Stop all services
docker-compose -f devops/docker-compose.yml down

# Stop and remove volumes
docker-compose -f devops/docker-compose.yml down -v
```

## Environment Variables

Create a `.env` file in the project root with:

```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Architecture

### Dockerfile Stages

Following Astro's recommended Docker build pattern:

1. **base**: Copies only package files (package.json, bun.lockb) for optimal layer caching
2. **prod-deps**: Installs production dependencies only
3. **build-deps**: Installs all dependencies (including devDependencies)
4. **build**: Builds the Astro application
5. **runtime**: Minimal Bun Alpine runtime with production dependencies and built assets

### Optimizations

- **Layer caching**: Package files copied separately so dependency installation is cached independently of source code
- **Smaller final image**: Only production dependencies in runtime stage
- **Bun everywhere**: Fast dependency installation and runtime performance
- **Direct server execution**: Runs `bun ./dist/server/entry.mjs` for optimal performance
- **Non-root user**: Security best practice
- **Health check**: Container orchestration support

## Services

- **app** (port 3000): Astro application
- **postgres** (port 5432): PostgreSQL database with migrations
- **studio** (port 3001): Supabase Studio (development profile only)

## Database Migrations

Migrations in `supabase/migrations/` are automatically applied when the PostgreSQL container starts for the first time.
