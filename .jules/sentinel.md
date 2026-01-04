## 2024-05-22 - Missing .gitignore Exclusions
**Vulnerability:** The repository lacked critical `.gitignore` entries for `.env` files and `dist/` directories.
**Learning:** Initial project setup often overlooks secret management basics, leading to high risk of accidental key leakage.
**Prevention:** Always verify `.gitignore` presence and content as the first step in any security audit.
