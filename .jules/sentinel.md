## 2025-02-28 - Insecure Vite Configuration
**Vulnerability:** Explicitly defining `process.env.API_KEY` in `vite.config.ts` using `define`.
**Learning:** This exposes the secret API key in the global scope of the client-side bundle, making it accessible to anyone who inspects the code.
**Prevention:** Use `import.meta.env` for client-side environment variables and do not manually expose secrets in `vite.config.ts` unless necessary and safe (e.g. public keys).
