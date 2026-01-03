## 2025-01-03 - Added Content Security Policy (CSP)
**Vulnerability:** Missing CSP meta tag allows execution of malicious scripts and unauthorized data loading.
**Learning:** React apps using `esm.sh` and CDN libraries like Tailwind require `unsafe-inline` in CSP for scripts and styles to function, but restricting domains still provides value.
**Prevention:** Add strict CSP meta tag to `index.html` blocking unknown domains.
