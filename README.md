<div align="center">

# 🔍 SearchForYou

### The search portal that does it with style.

**One portal. 25+ search engines. Zero tracking.**
From Google to indie old-web gems like *Marginalia* and *Wiby* — pick an engine, search with cinematic flair, and share links that play an epic search animation before landing on the results.

[**▶ Live demo**](https://vadim-khristenko.github.io/Search-for-YOU/) · [Report a bug](https://github.com/Vadim-Khristenko/Search-for-YOU/issues) · [Request a feature](https://github.com/Vadim-Khristenko/Search-for-YOU/issues)

`HTML` · `CSS` · `Vanilla JS` · `No build step` · `GitHub Pages ready`

</div>

---

## ✨ Highlights

- **🌑 Dark-first design** — a deep, glassmorphic dark theme by default, with a polished light theme one tap away. Your choice is remembered.
- **🌍 Bilingual UI** — full **English** and **Russian** localization with an instant language switch.
- **🛰️ 25+ search engines** — neatly grouped into **Mainstream**, **Privacy**, **AI**, **Academic**, **Indie / Old Web** and **Developer** categories.
- **🎬 Cinematic shareable links** — reply to *"just google it"* with a link that types out the query, sweeps a radar, and reveals a triumphant **"ANSWER FOUND!"** before redirecting.
- **🎲 Surprise me** — feeling adventurous? Let the engine roulette pick one for you.
- **🪐 Living background** — an animated, mouse-reactive node network on `<canvas>`, plus drifting aurora blobs.
- **🧩 Icon-rich** — [Lucide](https://lucide.dev) for the UI and [Simple Icons](https://simpleicons.org) for authentic engine logos.
- **🔒 Privacy by design** — pure static site. No backend, no cookies, no analytics. Everything runs in your browser.
- **♿ Thoughtful** — respects `prefers-reduced-motion`, keyboard-friendly (press `/` to focus search), and fully responsive.

## 🛰️ Included search engines

| Category | Engines |
| --- | --- |
| **Mainstream** | Google, Bing, Yandex, DuckDuckGo, Baidu |
| **Privacy** | Brave Search, Startpage, Ecosia, Qwant, Mojeek, SearXNG, Swisscows |
| **AI** | Perplexity, Phind, You.com, Andi |
| **Academic** | Wikipedia, WolframAlpha, Google Scholar, arXiv, Semantic Scholar, PubMed |
| **Indie / Old Web** | Marginalia, Wiby, Stract, Yep, Million Short, Presearch |
| **Developer** | GitHub, Stack Overflow, MDN, DevDocs, Hacker News |

## 🚀 Usage

### Search
1. Type your query.
2. Pick a category and a search engine (or hit **Surprise me**).
3. Press **Find the answer** — you're redirected to the results.

### Create a shareable link
1. Type your query and choose an engine (or set a **Custom URL**).
2. Press **Share query**.
3. Copy the generated link and send it to anyone.

### What the recipient sees
Opening a shared link triggers the full sequence:
- ⌨️ **Typing animation** — the query appears character by character
- 🛰️ **Radar search** — sweeping radar with pinging detections and a progress bar
- ✅ **"ANSWER FOUND!"** — a satisfying success reveal
- 🔁 **Auto-redirect** — straight to the real results

> Users with `prefers-reduced-motion` enabled skip straight to the results.

## 🛠️ Tech & structure

| File | Purpose |
| --- | --- |
| `index.html` | Markup and semantic structure |
| `styles.css` | Design tokens, dark/light themes, animations |
| `script.js` | App logic, rendering, canvas background, shared-link sequence |
| `engines.js` | Search engine catalogue and categories |
| `i18n.js` | English / Russian translations |
| `manifest.json` | PWA metadata |

- **Stack:** HTML5, CSS3, vanilla JavaScript — no frameworks, no build step.
- **Runtime dependencies (CDN):** Google Fonts, [Lucide](https://lucide.dev) icons, [Simple Icons](https://simpleicons.org) logos.
- **Compatibility:** all modern browsers.

## 📦 Deployment (GitHub Pages)

This project is fully static and ready for GitHub Pages:

1. Fork this repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set source to **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then **Save**.
5. Your site goes live at `https://<username>.github.io/Search-for-YOU/`.

No build, no CI, no configuration required.

## 🎨 Customization

### Add or edit a search engine
Edit the `SEARCH_ENGINES` array in [`engines.js`](engines.js):

```javascript
{
    id: 'myengine',
    name: 'My Engine',
    url: 'https://myengine.com/search?q=', // query is appended here
    encode: true,                          // URL-encode the query
    cat: 'indie',                          // main | privacy | ai | academic | indie | dev
    color: '#a855f7',                      // brand color for the badge glow
    icon: null                             // Simple Icons slug, or null for a lettered badge
}
```

### Theme colors
Tweak the brand gradient and theme tokens in the `:root` and `[data-theme]` blocks of [`styles.css`](styles.css):

```css
:root {
    --grad-1: #6366f1;
    --grad-2: #a855f7;
    --grad-3: #22d3ee;
}
```

### Translations
Add or adjust strings in [`i18n.js`](i18n.js) under the `en` and `ru` objects. Add a new language by adding a key alongside them.

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

Released under the [MIT License](LICENSE).

---

<div align="center">

**SearchForYou** — because you can find it yourself. We just make it look incredible. ✨

</div>
