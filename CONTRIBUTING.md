# Contributing to SearchForYou

Thanks for your interest in improving **SearchForYou**! This is a lightweight,
dependency-free static site, so contributing is quick and friendly.

## Getting started

1. **Fork** the repository and **clone** your fork.
2. Open `index.html` directly in a browser, or serve the folder locally:
   ```bash
   # Python
   python3 -m http.server 8080
   # or Node
   npx serve .
   ```
   Then visit `http://localhost:8080`.

> Serving over `http(s)://` is recommended so the icon CDNs and clipboard
> features behave exactly as in production.

## Project layout

| File | What lives here |
| --- | --- |
| `index.html` | Markup and structure |
| `styles.css` | Design tokens, themes, animations |
| `script.js` | App logic, rendering, canvas, shared-link sequence |
| `engines.js` | Search engine catalogue and categories |
| `i18n.js` | Translations (English / Russian) |

## Ways to contribute

### Add a search engine
Add an entry to the `SEARCH_ENGINES` array in `engines.js`. Verify the search
URL works by appending an encoded query to it. Prefer engines that respect user
privacy, and pick the right category. Use a [Simple Icons](https://simpleicons.org)
slug when one exists, otherwise set `icon: null` for a lettered badge.

### Add or improve a translation
All user-facing strings live in `i18n.js`. Keep keys identical across languages.
To add a new language, create a new object alongside `en` and `ru` and add it to
the language switcher logic in `script.js`.

### Design & animations
CSS is organized into clearly labelled sections. Keep both the **dark** and
**light** themes looking great, and make sure animations are gated behind
`prefers-reduced-motion` where appropriate.

## Guidelines

- **No build step.** Keep the project pure HTML/CSS/JS — it must run straight from
  GitHub Pages.
- **No tracking.** Do not add analytics, cookies, or any backend calls.
- **Test both themes and both languages** before opening a PR.
- **Check `prefers-reduced-motion`** still produces a usable experience.
- Keep code style consistent with the surrounding files.

## Pull requests

1. Create a feature branch.
2. Commit with clear, descriptive messages.
3. Push and open a Pull Request describing **what** changed and **why**.

Happy hacking! 🔍
