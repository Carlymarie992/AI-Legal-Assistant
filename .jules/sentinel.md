## 2026-01-07 - Missing Git Exclusion for Secrets
**Vulnerability:** The `.gitignore` file was missing entries for `.env` and `.env.*` files.
**Learning:** Initial project setups often overlook git ignore patterns for environment files, leading to high risk of accidental secret leakage.
**Prevention:** Always verify `.gitignore` explicitly excludes secret configuration files immediately upon project inspection.

## 2026-01-08 - Content Security Policy Implementation
**Vulnerability:** Missing `Content-Security-Policy` header in `index.html` allowed unrestricted resource loading and increased XSS risk.
**Learning:** Even in client-side apps with CDN dependencies, a basic CSP can be implemented by whitelisting specific domains (e.g., `esm.sh`, `cdn.tailwindcss.com`) and using `unsafe-inline` restrictively where necessary.
**Prevention:** Include a CSP meta tag in the HTML template of all new React projects, tailoring it to the specific CDNs and resources used.
