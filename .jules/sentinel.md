## 2026-01-07 - Missing Git Exclusion for Secrets
**Vulnerability:** The `.gitignore` file was missing entries for `.env` and `.env.*` files.
**Learning:** Initial project setups often overlook git ignore patterns for environment files, leading to high risk of accidental secret leakage.
**Prevention:** Always verify `.gitignore` explicitly excludes secret configuration files immediately upon project inspection.
