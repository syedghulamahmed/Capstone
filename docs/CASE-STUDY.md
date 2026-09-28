# TalentBridge Case Study

## Context
The capstone required a realistic three-sided internship/placement platform rather than a CRUD demo.

## Problem
Students need reliable internship discovery and application tracking. Companies need controlled postings and applicant workflows. Administrators need platform oversight.

## Requirements
Responsive UI, reusable components, REST API, normalized relational database, secure authentication, role/ownership authorization, search/filter/pagination, secure uploads, transactional email, deadlines/limits, caching, testing, security review, and deployment documentation.

## Design
React/Vite frontend, Express/TypeScript API, Prisma ORM, PostgreSQL and Resend. Business rules live in service modules and are reinforced with database constraints.

## Architecture
See ARCHITECTURE.md for the data flow and trust boundaries.

## Database
Users may have Student or Company profiles. Companies own internships. Students create applications. Applications have an explicit lifecycle. Refresh tokens are hashed and revocable.

## Frontend
The interface presents searchable internship cards, deadline state, responsive layouts, loading/error/confirmation messaging, and a lazy-loaded details module.

## Backend/API
Validation, authentication, authorization, structured logging, rate limiting, OpenAPI, service-layer workflows and consistent error envelopes are used at the API boundary.

## Challenges
The key reliability problem is coupling core business actions to an external email provider.

## Solutions
Email calls are isolated behind emailService, bounded by a timeout, retried for transient failures, and given deterministic idempotency keys. Failures are logged without failing the application/status transaction.

## Security
Bcrypt password hashing, short-lived access tokens, refresh rotation/revocation, generic login errors, rate limiting, strict CORS, Helmet, validation and private upload handling are documented in docs/SECURITY.md.

## Testing
Automated backend API tests and business-rule contract tests are included. Final deployment should be exercised through the full three-role flow before presentation.

## Performance
Deadline indexes, selective Prisma projections, 30-second caching and lazy loading address frequent reads and initial bundle work. Actual performance numbers must be captured from a real environment.

## Deployment
Docker Compose reproduces PostgreSQL + backend + frontend locally. Render/Vercel configuration is included for production provisioning.

## Result
The repository is the integrated capstone representation of the engineering work from Weeks 1–5.

## Reflection
With more time I would use object storage for uploads, Redis for shared caching, a transactional outbox/worker for guaranteed email delivery, and Playwright for the complete browser flow.