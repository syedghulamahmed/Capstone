# Known Limitations

- In-process cache is not shared across multiple API instances.
- Local-disk uploads are not durable across ephemeral hosting; object storage is recommended.
- Email is best-effort; an outbox/worker is the next production hardening step.
- Final Lighthouse, EXPLAIN, benchmark, sandbox-email and public deployment evidence must be captured from real infrastructure, not invented.