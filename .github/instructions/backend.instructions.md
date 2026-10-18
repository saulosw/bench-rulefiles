---
applyTo: "src/backend/**"
---

# Backend handlers

- A handler never throws `Error` (or any other class) directly. Every failure the caller should
  see goes through `fail(status, code, message)` from `src/backend/http.ts`, so the client always
  gets a status and a stable `code`.
- Handlers validate their input before touching the store.
