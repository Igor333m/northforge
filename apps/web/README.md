# Northforge Freight Web

Marketing site built with Next.js App Router and exported as a static site for deployment on Render.

## Local development

From the repository root:

```bash
npm install
npm run dev:web
```

Copy `apps/web/.env.example` to `apps/web/.env.local` and set:

```bash
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_form_id
```

## Static build

From the repository root:

```bash
npm install
npm run build --workspace=apps/web
```

The static export is written to `apps/web/out`.

## Security headers

`apps/web/public/_headers` is the single source of truth for HTTP response headers in production. Keep all security and rate-limit header definitions in this file.

`apps/web/next.config.ts` intentionally does not define `headers()` so header configuration does not drift between local and deployed environments.

## Deploy to Render

Use GitHub as the provider and connect the repository in Render. This repo includes a root-level `render.yaml`, so Render can import the static site settings automatically.

The blueprint configures:

- a static site service named `northforgefreight-web`
- the build command `npm install && npm run build --workspace=apps/web`
- the publish path `apps/web/out`
- prompted environment variables for `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` and `NEXT_PUBLIC_FORMSPREE_ID`

If you create the service manually instead of using the blueprint, use those same values in the Render dashboard.
