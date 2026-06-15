<div align="center">

# SEARCH//FORYOU

### A directory of the whole search world.

**One prompt. Every engine.** Eighty-plus search sources — web, privacy, answers,
academia, the indie old web, maps, shopping and streaming (Russian & global) — in a
single editorial directory. Pick a source, run it, or share a link that plays a
cinematic boot-up search sequence before landing on the results.

[**Live demo**](https://vadim-khristenko.github.io/Search-for-YOU/) · [Report a bug](https://github.com/Vadim-Khristenko/Search-for-YOU/issues) · [Request a feature](https://github.com/Vadim-Khristenko/Search-for-YOU/issues)

`HTML` · `CSS` · `Vanilla JS` · `No build step` · `GitHub Pages ready`

</div>

---

## Aesthetic

A committed visual direction: **Tokyo Night × AMOLED — terminal/editorial brutalism.**

- **True-black AMOLED** surface with the Tokyo Night palette: a dominant blue
  (`#7aa2f7`) and sharp violet / cyan / red accents. No flat gradients.
- **Editorial typography** — `Syne` for the oversized display headline, `JetBrains Mono`
  everywhere else, sized fluidly with `clamp()`.
- **Asymmetric layout** — a single dominant command bar as the anchor, a numbered
  category index, and the engines presented as a dense directory list (not a card grid).
- **Orchestrated motion** — staggered reveals on load and on every category switch; a
  boot-log sequence for shared links. Everything is gated behind `prefers-reduced-motion`.

## Themes & skins

Three independent switches live in the top bar:

| Switch | Options |
| --- | --- |
| **LANG** | English ⇄ Russian |
| **THEME** | Tokyo Night (AMOLED dark, default) ⇄ Tokyo Day (light) |
| **SKIN** | Modern ⇄ **Old Web** — a full Windows 95 re-skin with beveled controls, a title bar, a menu bar and a working taskbar clock |

Every choice is remembered in `localStorage`.

## The directory — 80+ sources

| # | Category | Sources |
| --- | --- | --- |
| 01 | **Web** | Google, Bing, DuckDuckGo, Yahoo, Yandex, Baidu, Naver, Seznam, Sogou, Ask |
| 02 | **Privacy** | Brave, Startpage, Ecosia, Qwant, Mojeek, SearXNG, Swisscows, MetaGer, Gibiru, DDG Lite |
| 03 | **Answers** | Perplexity, Phind, Andi, Komo |
| 04 | **Academic** | Wikipedia, Wikidata, WolframAlpha, Google Scholar, arXiv, Semantic Scholar, PubMed, BASE |
| 05 | **Indie / Old Web** | Marginalia, Wiby, Stract, Yep, Million Short, Presearch, searchmysite, Right Dao |
| 06 | **Developer** | GitHub, Stack Overflow, MDN, DevDocs, HN Search, npm, PyPI, crates.io, Reddit, Can I Use |
| 07 | **Maps** | Google Maps, OpenStreetMap, Yandex Maps, 2GIS, Bing Maps |
| 08 | **Shopping** | Amazon, eBay, AliExpress, Etsy, Ozon, Wildberries |
| 09 | **Streaming · Global** | YouTube, Netflix, Spotify, Apple Music, Prime Video, Disney+, Max, Hulu, Twitch, SoundCloud, Vimeo, Deezer, Tidal, Bandcamp, Last.fm, Genius, Crunchyroll, IMDb |
| 10 | **Streaming · RU** | Кинопоиск, Яндекс Музыка, RUTUBE, ivi, Okko, VK Видео, Звук, MEGOGO, PREMIER |

> Streaming/search endpoints are best-effort and occasionally change on the providers'
> side — they are trivial to update in [`engines.js`](engines.js).

## Usage

**Search** — type a query, choose a category and a source (or hit **RANDOM**), then press **RUN**.

**Share** — press **SHARE** (or `Ctrl`/`Cmd` + `Enter`) to generate a link. Anyone who
opens it sees the query typed out, a staggered boot-log, a **MATCH FOUND** flash, and an
auto-redirect to the real results.

**Shortcuts** — `/` focuses the prompt · double-click a source to run it instantly.

## Tech & structure

| File | Purpose |
| --- | --- |
| `index.html` | Editorial markup, directory and Windows 95 window chrome |
| `styles.css` | Design tokens, Tokyo Night dark/day themes, the Win95 skin, animations |
| `script.js` | Rendering, selection, search, sharing and the boot-up sequence |
| `engines.js` | The 80+ source catalogue and categories |
| `i18n.js` | English / Russian strings |
| `manifest.json` | PWA metadata |

- **Stack:** HTML5, CSS3, vanilla JavaScript — no frameworks, no build step.
- **Runtime dependencies (CDN):** Google Fonts (Syne, JetBrains Mono) and
  [Simple Icons](https://simpleicons.org) brand logos (with a lettered fallback).
- **Responsive** from 320 px phones to ultra-wide desktops (the directory goes two-up
  beyond 2100 px). **Privacy:** no backend, no cookies, no tracking.

## Deployment (GitHub Pages)

1. Fork this repository.
2. Go to **Settings → Pages**.
3. Set the source to **Deploy from a branch** and pick the branch + `/ (root)` folder.
4. The site goes live at `https://<username>.github.io/Search-for-YOU/`.

No build, no CI, no configuration.

## Customization

### Add or edit a source
Edit the `SEARCH_ENGINES` array in [`engines.js`](engines.js):

```javascript
{
    id: 'mysource',
    name: 'My Source',
    domain: 'mysource.com',
    url: 'https://mysource.com/search?q=', // query is appended here
    encode: true,                          // URL-encode the query
    cat: 'indie',                          // category id
    color: '#7aa2f7',                      // brand color for the tick
    icon: null                             // Simple Icons slug, or null for a lettered tile
}
```

### Palette
Tweak the Tokyo Night tokens in the `[data-theme="dark"]` / `[data-theme="light"]`
blocks of [`styles.css`](styles.css).

### Translations
Add or adjust strings in [`i18n.js`](i18n.js) under the `en` and `ru` objects.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE).

---

<div align="center">

**SEARCH//FORYOU** — because you can find it yourself. We just make it look incredible.

</div>
