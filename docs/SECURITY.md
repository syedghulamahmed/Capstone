# OWASP-Informed Security Review

- Broken Access Control: role middleware and server-side company ownership checks.
- Cryptographic Failures: bcrypt password hashes; refresh tokens stored as SHA-256 hashes.
- Injection: Prisma parameterization and Zod validation.
- Insecure Design: explicit status transitions, deadline enforcement, posting limit, duplicate-application constraint.
- Security Misconfiguration: Helmet, strict CORS, body-size limit, no public upload directory.
- Identification/Auth Failures: 15-minute access tokens, refresh rotation/revocation, generic login errors, login rate limiting.
- Software/Data Integrity: migrations are committed and applied with prisma migrate deploy.
- Logging/Monitoring: structured request and error logs.
- SSRF: no arbitrary server-side URL fetch feature is exposed.

A key authorization finding from earlier work was addressed by checking resource ownership server-side instead of trusting client-provided company identity.