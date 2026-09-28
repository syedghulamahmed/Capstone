# Deployment Guide

The capstone keeps a Vercel-compatible frontend and Render Blueprint for Dockerized API plus managed PostgreSQL. Provider limits change, so verify current pricing and limits before provisioning.

## Backend
Provision PostgreSQL and the API from render.yaml. Set JWT_SECRET, JWT_REFRESH_SECRET, CORS_ORIGIN, RESEND_API_KEY and EMAIL_FROM in the provider dashboard. Set CORS_ORIGIN to the exact HTTPS frontend origin. The Docker image runs prisma migrate deploy before the API.

## Frontend
Deploy the frontend directory as a Vite app. Set VITE_API_URL to the backend HTTPS origin and publish dist.

## Verification
1. Confirm /health returns HTTP 200.
2. Open /docs and /openapi.json.
3. Test Student, Company and Admin accounts.
4. Student applies; Company changes status; verify notification behavior.
5. Verify Secure + HttpOnly refresh cookie and exact CORS origin.
6. Run Lighthouse, benchmark and EXPLAIN against the deployed environment and save actual evidence.

Never commit .env or provider secrets.