<!-- BEGIN:nextjs-agent-rules -->

# Next.js conventions for this project

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Detailed coding conventions for this app are in [.github/instructions/apps/web/nextjs.instructions.md](../../.github/instructions/apps/web/nextjs.instructions.md).

Key reminders:

- **App Router only** — no `pages/` directory.
- **Server Components by default** — `"use client"` only when strictly necessary.
- **Tailwind only** — no inline `style={{}}` except for dynamic values.
- **Auth tokens in memory** — never `localStorage`. Refresh token via `httpOnly` cookie.
- API calls go through `lib/api.ts`, not bare `fetch` calls scattered in components.
<!-- END:nextjs-agent-rules -->
