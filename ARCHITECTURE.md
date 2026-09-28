# Architecture

Browser -> React/Vite -> Express REST API -> Prisma -> PostgreSQL. Resend is an external dependency isolated behind emailService.

Routes/controllers translate HTTP into service calls. Services own business rules and external integrations. Prisma is the persistence boundary. Middleware owns security and request logging.

Critical flow: student login -> access token + HttpOnly refresh cookie -> internship search -> server-side deadline check -> application creation -> best-effort confirmation email -> company status transition after ownership check -> best-effort status email.

Business rules: applications are rejected with 409 after deadline; a company cannot exceed MAX_ACTIVE_POSTINGS future active postings; duplicate applications are prevented by a database unique constraint; only the owning company or admin may change status; terminal statuses cannot transition further.

Caching: the public internship list is a frequent read, so a 30-second in-process cache reduces repeated reads. Writes and expiry checks invalidate it. Redis would be appropriate for horizontally scaled deployment.
