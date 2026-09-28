# TalentBridge — Internship & Placement Platform

TalentBridge is a portfolio-grade three-sided SaaS platform for students, companies, and program administrators. It integrates secure authentication, role/ownership authorization, internship lifecycle rules, applications, transactional email, secure uploads, search/filter/pagination, caching, testing, Docker, OpenAPI, and deployment documentation.

## Roles
- Student: browse internships, search/filter, apply once, upload a resume, track application status.
- Company: create internships, stay within the active-posting limit, review applicants, transition status.
- Admin: oversee users, internships and applications.

## Local development
1. Copy .env.example to .env.
2. Run docker compose up --build.
3. Open http://localhost:5173 and API docs at http://localhost:4000/docs.
4. Demo seed data is created automatically by the backend container.

## Environment
Backend: DATABASE_URL, JWT_SECRET, JWT_REFRESH_SECRET, CORS_ORIGIN, RESEND_API_KEY, EMAIL_FROM, MAX_ACTIVE_POSTINGS, PORT, UPLOAD_DIR. Frontend: VITE_API_URL.

## Production
Commit Prisma migrations and run npx prisma migrate deploy during the backend release step. Configure managed PostgreSQL, HTTPS frontend/backend URLs, exact CORS origin, JWT secrets and Resend credentials.

## Performance
The application uses indexed deadline/company/status queries, selective Prisma projections, a 30-second server cache for the frequent internship list, and lazy-loaded details. Run npm run benchmark against a real API and execute the EXPLAIN SQL files on the same dataset. Record actual numbers only.

## Security
Bcrypt, short-lived access tokens, refresh-token rotation/revocation, generic login errors, login rate limiting, strict CORS, Helmet, JSON size limits, Zod validation, ownership checks, private uploads and no public uploads route.

## Testing
Backend: cd backend && npm test. Frontend: cd frontend && npm test. Builds: npm run build in each package.

## Demo accounts
student@example.com / DemoPass1!
company@example.com / DemoPass1!
admin@example.com / DemoPass1!

These are local demo credentials only.
