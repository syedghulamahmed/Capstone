# External Email Resilience

Resend is called only through emailService. Each call has a 5-second timeout, up to three attempts, exponential backoff of 250ms, 500ms and 1000ms, and a deterministic idempotency key. Retryable signals include 429, network/fetch errors, timeouts and 5xx responses.

The core database operation completes before notification. Provider failure therefore degrades notification delivery without losing the application or status change. Logs preserve the failure for operational follow-up.

At larger scale, replace best-effort delivery with a transactional outbox and durable worker queue.