# Portfolio Builder

A multi-tenant portfolio platform. Users sign up, manage their content (articles, experience, achievements, services, events) from a dashboard, choose one of six templates, and publish a public site at `/<handle>`.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · PostgreSQL 16 · Drizzle ORM · TipTap · JWT sessions (`jose`)

## Quick start

```bash
cp .env.example .env              # then set JWT_SECRET (openssl rand -base64 48)
docker compose up -d db           # Postgres on localhost:5434
pnpm install
pnpm db:push                      # create the schema
pnpm db:seed                      # demo user "sarah"
pnpm dev                          # http://localhost:3000
```

Demo login (seeded, development only): `sarah@example.com` / `password123`. Public demo portfolio: <http://localhost:3000/sarah>.

## Templates

`developer_terminal`, `minimal_swiss`, `aurora_studio`, `bento_grid`, `fancy_creative`, `simple_professional`.

Preview any portfolio in another template with `?template=<id>` (persists for 24h via cookie; clear it with `?exit_preview=true`), or open `/preview/<id>` to see the demo user in that template. Switch a user's saved template from the CLI:

```bash
pnpm tsx scripts/set-template.ts sarah aurora_studio ocean
```

## Project layout

| Path | Purpose |
|---|---|
| `src/app/(auth)` | Login / register |
| `src/app/(dashboard)/dashboard` | Authenticated CRUD for all content, profile, theme studio, inbox |
| `src/app/(portfolio)/[handle]` | Public portfolio pages and detail routes |
| `src/actions` | Server Actions (zod-validated, scoped to the signed-in user) |
| `src/db/schema` | Drizzle tables; every content table belongs to a user |
| `src/components/templates` | Template components and per-template subpages |
| `src/proxy.ts` | Route protection and template-preview handling (Next 16 `proxy`) |
| `src/lib/rich-text.ts` | Markdown → HTML conversion and HTML sanitizing for user content |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` / `build` / `start` | Next.js dev server, production build, production server |
| `pnpm lint` | ESLint |
| `pnpm db:push` | Sync schema to the database |
| `pnpm db:generate` / `db:migrate` | Generate / apply SQL migrations |
| `pnpm db:seed` | Reset and seed the demo user |
| `pnpm db:studio` | Drizzle Studio |

## Security notes

- `JWT_SECRET` is required in production (minimum 32 characters); the app refuses to sign or verify sessions without it. Development falls back to an insecure placeholder with a warning.
- All user-authored rich text is sanitized (`sanitize-html`) before rendering, so scripts, event handlers and `javascript:` URLs are stripped.

## Docker

`docker compose up -d` builds and runs the app (standalone output) alongside Postgres. It reads `.env` and fails fast if `JWT_SECRET` is not set.
