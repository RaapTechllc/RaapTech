# RaapTech Website

Customer-facing Next.js 15 website for RaapTech LLC.

## Stack
- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Docker / docker-compose deployment

## Scripts
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run start`

## Environment
Copy `.env.example` to `.env` and set:

- `RAAPTECH_CONTACT_WEBHOOK_URL` — server-side webhook target for contact form delivery
- `RAAPTECH_HOST_PORT` — host port for the containerized site (`3035` on DVM)

## Contact Flow
`/contact` submits to the local Next.js API route at `/api/contact`, which validates the payload and forwards it to the configured lead-intake webhook.

## Local Verification
1. `npm install`
2. `npm run build`
3. `npm run lint`
4. Start the app and verify:
   - `/`
   - `/about`
   - `/services`
   - `/projects`
   - `/contact`
5. Submit a test contact form and confirm the intake target receives it.

## DVM Deploy
Deployment path on DVM:
- `/home/dvm/projects/raaptech-website`

Standard deploy:
1. Sync the current repo contents to `/home/dvm/projects/raaptech-website`
2. Set `.env` with `RAAPTECH_CONTACT_WEBHOOK_URL`
3. Run `docker compose up -d --build`
4. Verify `http://100.97.87.28:3035`

## Rollback
From `/home/dvm/projects/raaptech-website` on DVM:
1. `git log --oneline -5`
2. `git checkout <known-good-commit>`
3. `docker compose up -d --build`

## Troubleshooting
- If `/services` 404s live, the live container is probably still serving an older image/source tree or the wrong host-port mapping.
- If contact submission fails, verify `RAAPTECH_CONTACT_WEBHOOK_URL` is set in the container environment and the webhook target is active.
- If build fails on DVM, clear stale image layers and rebuild: `docker compose build --no-cache web`.
