# TalentBridge — Internship & Placement Platform

TalentBridge is the integrated full-stack capstone: a realistic three-sided internship/placement platform for Students, Companies and Admins.

## Architecture
React/Vite → Express/TypeScript API → Prisma → PostgreSQL. Authentication uses short-lived JWT access tokens and rotated, revocable HttpOnly refresh cookies. Transactional email is isolated behind an email service with timeout/retry/idempotency.

See [ARCHITECTURE.md](ARCHITECTURE.md), [docs/ER-DIAGRAM.md](docs/ER-DIAGRAM.md), and [docs/CASE-STUDY.md](docs/CASE-STUDY.md).

## Features
- Responsive internship discovery, search, pagination and deadline-aware application UI
- Student applications and private resume uploads
- Company posting management, configurable active-posting limit and applicant status workflow
- Admin role and platform oversight boundaries
- Server-side deadlines, duplicate prevention and status transition rules
- Resend transactional email with graceful degradation, timeout, exponential retry and idempotency
- Indexed PostgreSQL queries and 30-second in-process cache
- Secure authentication, role/ownership authorization, rate limiting, strict CORS, Helmet and validation
- Swagger UI at `/docs` and OpenAPI JSON at `/openapi.json`
- Docker Compose local stack with PostgreSQL, backend and frontend

## Local setup
1. Copy `backend/.env.example` to `backend/.env`.
2. Run `docker compose up --build`.
3. Open `http://localhost:5173`; API docs are at `http://localhost:4000/docs`.
4. Migrations and an idempotent demo seed run automatically in the backend container.

## Environment
Backend: `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `CORS_ORIGIN`, `RESEND_API_KEY`, `EMAIL_FROM`, `MAX_ACTIVE_POSTINGS`, `PORT`, `UPLOAD_DIR`.
Frontend: `VITE_API_URL`.

`.env` is ignored by Git. `.env.example` contains placeholders only.

## Production
`render.yaml` provisions the API and managed PostgreSQL connection. Deploy `frontend` as a Vite project on Vercel. Set production secrets only in provider environment settings, set `CORS_ORIGIN` to the exact HTTPS frontend origin, and set `VITE_API_URL` to the exact HTTPS API origin.

The API container executes `prisma migrate deploy` before starting the application. Verify `/health` and `/docs` after deployment.

## Testing and evidence
Run `npm test` and `npm run build`. For performance, run `npm run benchmark` against a real API and save actual `EXPLAIN ANALYZE` output for the same dataset before/after the relevant index. Evidence belongs under `docs/evidence/`; never fabricate measurements or store secrets.

## Security
Bcrypt password hashing, 15-minute access tokens, refresh rotation/revocation, generic login errors, login rate limiting, strict CORS, Helmet, body-size limits, Zod validation, server-side ownership checks and private uploads are documented in `docs/SECURITY.md`.

## Demo accounts
Local seed credentials: `student@example.com`, `company@example.com`, `admin@example.com`, password `DemoPass1!`. They are development/demo credentials and must not be used as production secrets.

## Case study
See `docs/CASE-STUDY.md` for Context → Problem → Requirements → Design → Architecture → Database → Frontend → Backend → API → Challenges → Solutions → Security → Testing → Performance → Deployment → Result → Reflection.
