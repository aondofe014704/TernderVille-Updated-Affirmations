# Tenderville

Next.js 15 (App Router) + MongoDB + JWT. Deployed on Vercel.

## Quickstart

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev                  # http://localhost:3000
```

## Migration in progress

This project is being migrated from a Vite + Express monorepo. The old code is preserved in `.legacy-client/` and `.legacy-server/` (gitignored, local only).

Use the installer to scaffold in batches:

```bash
bash install.sh 1   # foundation (this batch)
bash install.sh 2   # lib + models
bash install.sh 3   # branded shell + error/loading/offline pages
bash install.sh 4   # public pages (Home, About, etc) + shadcn primitives
bash install.sh 5   # API routes + admin dashboard
```

Re-run any batch safely. Files you have edited will be skipped.

## Stack

- **Framework:** Next.js 15 App Router
- **DB:** MongoDB (Mongoose) with serverless connection caching
- **Auth:** JWT in httpOnly cookies, middleware-gated `/admin/*` routes
- **Images:** Cloudinary → next/image (auto WebP/AVIF)
- **UI:** Tailwind v4 + shadcn primitives
- **Deploy:** Vercel (Free / Hobby tier supported)

## Environment

See `.env.example`. Required for dev: `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
