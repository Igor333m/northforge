# My App

Full-stack monorepo with a Next.js frontend, NestJS backend, and a standalone calculator subdomain.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS |
| Backend | NestJS, TypeScript, TypeORM, Passport JWT |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Infra | Docker Compose |
| Package manager | npm workspaces |

## Project Structure

```
/
├── apps/
│   ├── web/          ← Next.js frontend
│   └── api/          ← NestJS backend
├── packages/
│   └── shared/       ← Shared TypeScript types and DTOs
├── infra/
│   └── docker-compose.yml
└── calculator/       ← Standalone JS/HTML calculator (calc.yourdomain.com)
```

## Prerequisites

- [Node.js 20+](https://nodejs.org)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (running)
- npm 10+

## Getting Started

**1. Install dependencies**

```bash
npm install
```

**2. Set up environment variables**

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

Edit both files and fill in your values before running.

**3. Start the database and cache**

```bash
docker compose -f infra/docker-compose.yml up -d
```

**4. Run database migrations**

```bash
npm run migration:run --workspace=apps/api
```

**5. Start the backend**

```bash
npm run dev --workspace=apps/api
```

API will be available at `http://localhost:3001`  
Swagger docs at `http://localhost:3001/api/docs`

**6. Start the frontend**

```bash
npm run dev --workspace=apps/web
```

App will be available at `http://localhost:3000`

## Environment Variables

### `apps/api/.env`

```env
# Database
DATABASE_URL=postgresql://dev:dev@localhost:5432/myapp

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_ACCESS_SECRET=change-me
JWT_REFRESH_SECRET=change-me-too
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=30d

# App
PORT=3001
NODE_ENV=development
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Useful Commands

```bash
# Stop Docker services
docker compose -f infra/docker-compose.yml down

# Generate a new database migration
npm run migration:generate --workspace=apps/api -- src/migrations/MigrationName

# Run tests
npm test --workspace=apps/api

# Build for production
npm run build --workspace=apps/web
npm run build --workspace=apps/api
```

## Subdomains (Production)

| Subdomain | Points to |
|---|---|
| `yourdomain.com` | Next.js app |
| `api.yourdomain.com` | NestJS API |
| `calc.yourdomain.com` | Standalone calculator |

## VS Code Setup

Open the repo in VS Code and accept the prompt to install recommended extensions. GitHub Copilot is pre-configured with project-specific instructions in `.github/copilot-instructions.md`.
