## 2024-02-18 - [CSP for CDN-heavy Architecture]
**Vulnerability:** Missing Content Security Policy (CSP) in `index.html`.
**Learning:** This repo relies heavily on CDNs (`esm.sh`, `cdn.tailwindcss.com`) and inline scripts (Import Maps, Tailwind Config) which complicates CSP. Specifically, `cdn.tailwindcss.com` injects styles dynamically, forcing `style-src 'unsafe-inline'`.
**Prevention:** Used SHA-256 hashes for the specific inline scripts (ImportMap and Tailwind Config) to allow them without enabling `script-src 'unsafe-inline'`, maintaining a higher security posture for scripts despite the style limitation.
