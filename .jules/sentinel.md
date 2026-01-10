## 2026-01-07 - Missing Git Exclusion for Secrets
**Vulnerability:** The `.gitignore` file was missing entries for `.env` and `.env.*` files.
**Learning:** Initial project setups often overlook git ignore patterns for environment files, leading to high risk of accidental secret leakage.
**Prevention:** Always verify `.gitignore` explicitly excludes secret configuration files immediately upon project inspection.

## 2026-01-07 - Unsafe Build-Time Secret Injection
**Vulnerability:** `vite.config.ts` manually injected `process.env.GEMINI_API_KEY` using `define`. This exposes server-side secrets to the client bundle if not carefully managed and is a non-standard practice in Vite (which uses `import.meta.env`).
**Learning:** Hardcoding `process.env` replacements in build tools can lead to accidental secret exposure in the final bundle, even if the code currently doesn't reference it (dead code), or if a dependency accidentally references `process.env`.
**Prevention:** Avoid using `define` to inject `process.env` secrets in Vite. Use the standard `import.meta.env` and `VITE_` prefix system which is designed to handle this safely.
