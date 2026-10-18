---
applyTo: "src/backend/**"
---

# Backend handlers

- An order can be cancelled only within 30 minutes of `placedAt`; after that the warehouse has
  picked it, and cancelling must fail with `fail(409, 'cancel-window-closed', …)`.
- Never read the time with `Date.now()` or `new Date()`; use `clock.now()` from
  `src/backend/clock.ts`, so tests can freeze time.
