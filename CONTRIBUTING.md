# Contributing to SearchForYou

Thanks for your interest in improving **SearchForYou**! It's a lightweight,
dependency-free static site, so contributing is quick and friendly.

## Getting started

1. **Fork** the repository and **clone** your fork.
2. Serve the folder locally (recommended, so the icon CDN and clipboard behave as in production):
   ```bash
   python3 -m http.server 8080   # or: npx serve .
   ```
   Then open `http://localhost:8080`.

## Project layout

| File | What lives here |
| --- | --- |
| `index.html` | Editorial markup, directory, Windows 95 window chrome |
| `styles.css` | Design tokens, Tokyo Night dark/day themes, the Win95 skin, animations |
| `script.js` | Rendering, selection, search, sharing, boot-up sequence |
| `engines.js` | The source catalogue and categories |
| `i18n.js` | Translations (English / Russian) |

## Ways to contribute

### Add a search source
Add an entry to `SEARCH_ENGINES` in `engines.js`. Verify the search URL works by
appending an encoded query, pick the right `cat`, and use a
[Simple Icons](https://simpleicons.org) slug when one exists (otherwise `icon: null`
renders a lettered tile).

### Add or improve a translation
All user-facing strings live in `i18n.js`. Keep keys identical across languages. To add
a new language, create a new object alongside `en` / `ru` and extend the toggle in
`script.js`.

### Design & skins
CSS is organized into labelled sections. Keep the **Tokyo Night** (dark), **Tokyo Day**
(light) and **Windows 95** skins all looking sharp, and make sure motion stays gated
behind `prefers-reduced-motion`.

## Guidelines

- **No build step** — keep it pure HTML/CSS/JS so it runs straight from GitHub Pages.
- **No tracking** — no analytics, cookies, or backend calls.
- **Test all three skins, both themes and both languages**, from 320 px phones to
  ultra-wide desktops, before opening a PR.
- Match the code style of the surrounding files.

## Pull requests

1. Create a feature branch.
2. Commit with clear, descriptive messages.
3. Push and open a Pull Request describing **what** changed and **why**.

Happy hacking.
