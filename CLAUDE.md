# IsaPhilo Enterprise website: working rules

## Code comments (always)
- Comment all code you add or change so it is easy to read, debug and maintain.
- Explain *why* (intent, constraints, browser quirks, business rules), not just *what*.
- Put a short header comment on new files and components saying what they do and where they are used.
- In CSS, label each block with the UI it styles and any breakpoint or override it depends on.
- Note known pitfalls next to the code (e.g. "must stay above the mobile action bar", "Apple has no install API").

## Git
- Commit and push only when asked.
- Never add `Co-Authored-By` lines or any other co-author/contributor attribution to commits or PRs.

## Project notes
- Stack: Vite + React 19 single-page app; styles in `src/index.css`.
- `npm run build` = generate error pages → vite build → pre-render SEO pages into `dist/`.
- Hosted on Hostinger (Apache/LiteSpeed); routing and error pages live in `public/.htaccess`.
- Header/footer surface colour: `--chrome-bg` / `--chrome-bg-solid` in `src/index.css`.
