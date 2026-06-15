/* ============================================================
   SearchForYou — application logic
   Vanilla JS, no build step. Depends on i18n.js & engines.js.
   ============================================================ */

(() => {
    'use strict';

    const LS_THEME = 'sfy-theme';
    const LS_LANG  = 'sfy-lang';
    const LS_ENGINE = 'sfy-engine';

    /* ---------- tiny helpers ---------- */
    const $  = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const refreshIcons = () => { if (window.lucide) window.lucide.createIcons(); };

    /* ============================================================
       i18n
       ============================================================ */
    const I18N = window.I18N;
    const savedLang = localStorage.getItem(LS_LANG);
    let lang = savedLang || ((navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en');
    if (!I18N[lang]) lang = 'en';

    const t = (key) => (I18N[lang] && I18N[lang][key]) || (I18N.en[key]) || key;

    function applyLang() {
        document.documentElement.lang = lang;
        $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
        $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
        const label = $('#lang-label');
        if (label) label.textContent = t('lang.name');
        // re-render category tab labels
        $$('.cat-tab').forEach((tab) => {
            const span = $('.cat-label', tab);
            if (span) span.textContent = t('cat.' + tab.dataset.cat);
        });
    }

    function toggleLang() {
        lang = lang === 'en' ? 'ru' : 'en';
        localStorage.setItem(LS_LANG, lang);
        applyLang();
    }

    /* ============================================================
       Theme
       ============================================================ */
    function getInitialTheme() {
        const saved = localStorage.getItem(LS_THEME);
        if (saved) return saved;
        return 'dark'; // dark by default, per design
    }
    let theme = getInitialTheme();

    function applyTheme() {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        const meta = $('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', theme === 'dark' ? '#07070d' : '#f4f5fb');
    }

    function toggleTheme() {
        theme = theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(LS_THEME, theme);
        applyTheme();
    }

    /* ============================================================
       Toast
       ============================================================ */
    let toastTimer;
    function toast(msg) {
        const el = $('#toast');
        if (!el) return;
        el.textContent = msg;
        el.classList.remove('hidden');
        requestAnimationFrame(() => el.classList.add('show'));
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            el.classList.remove('show');
            setTimeout(() => el.classList.add('hidden'), 400);
        }, 2600);
    }

    /* ============================================================
       Engine + category rendering
       ============================================================ */
    const ENGINES = window.SEARCH_ENGINES;
    const ENGINE_MAP = window.ENGINE_MAP;
    const CATEGORIES = window.CATEGORIES;

    let currentEngine = localStorage.getItem(LS_ENGINE) || 'google';
    if (!ENGINE_MAP[currentEngine]) currentEngine = 'google';
    let activeCat = 'all';

    function engineBadge(engine) {
        const color = encodeURIComponent(engine.color.replace('#', ''));
        if (engine.icon) {
            const src = `https://cdn.simpleicons.org/${engine.icon}/${color}`;
            return `<span class="engine-badge"><img src="${src}" alt="" loading="lazy"
                onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'monogram',textContent:'${engine.name[0]}'}))"></span>`;
        }
        return `<span class="engine-badge"><span class="monogram">${engine.name[0]}</span></span>`;
    }

    function renderCategories() {
        const wrap = $('#category-tabs');
        wrap.innerHTML = CATEGORIES.map((c) => `
            <button type="button" class="cat-tab${c.id === activeCat ? ' active' : ''}" data-cat="${c.id}" role="tab">
                <i data-lucide="${c.icon}"></i>
                <span class="cat-label">${t('cat.' + c.id)}</span>
            </button>`).join('');
        $$('.cat-tab', wrap).forEach((tab) => {
            tab.addEventListener('click', () => {
                activeCat = tab.dataset.cat;
                $$('.cat-tab').forEach((t2) => t2.classList.toggle('active', t2 === tab));
                renderEngines();
            });
        });
        refreshIcons();
    }

    function renderEngines() {
        const grid = $('#engine-grid');
        const list = activeCat === 'all' ? ENGINES : ENGINES.filter((e) => e.cat === activeCat);
        grid.innerHTML = list.map((e, i) => `
            <button type="button" class="engine-btn${e.id === currentEngine ? ' active' : ''}"
                    data-engine="${e.id}" style="--c:${e.color}; animation-delay:${i * 22}ms"
                    title="${e.name}">
                ${engineBadge(e)}
                <span class="engine-name">${e.name}</span>
            </button>`).join('');
        $$('.engine-btn', grid).forEach((btn) => {
            btn.addEventListener('click', () => selectEngine(btn.dataset.engine));
        });
        refreshIcons();
    }

    function selectEngine(id, { silent = false } = {}) {
        if (!ENGINE_MAP[id]) return;
        currentEngine = id;
        localStorage.setItem(LS_ENGINE, id);
        $$('.engine-btn').forEach((b) => b.classList.toggle('active', b.dataset.engine === id));
        hideShareResult();
        if (!silent && !$('.engine-btn[data-engine="' + id + '"]')) {
            // engine not visible in current category — jump to "all"
            activeCat = 'all';
            $$('.cat-tab').forEach((tb) => tb.classList.toggle('active', tb.dataset.cat === 'all'));
            renderEngines();
        }
    }

    function surprise() {
        const pick = ENGINES[Math.floor(Math.random() * ENGINES.length)];
        activeCat = 'all';
        $$('.cat-tab').forEach((tb) => tb.classList.toggle('active', tb.dataset.cat === 'all'));
        currentEngine = pick.id;
        localStorage.setItem(LS_ENGINE, pick.id);
        renderEngines();
        const btn = $('.engine-btn[data-engine="' + pick.id + '"]');
        if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        toast(`${t('toast.surprise')} ${pick.name}`);
    }

    /* ============================================================
       Search + share
       ============================================================ */
    const queryInput = $('#query-input');
    const customUrlInput = $('#custom-url');

    function buildSearchUrl(query, engineId, customUrl) {
        if (customUrl) return customUrl;
        const engine = ENGINE_MAP[engineId] || ENGINE_MAP[currentEngine];
        return engine.url + (engine.encode ? encodeURIComponent(query) : query);
    }

    function doSearch(e) {
        if (e) e.preventDefault();
        const query = queryInput.value.trim();
        const customUrl = customUrlInput.value.trim();
        if (!query && !customUrl) { toast(t('toast.needQuery')); queryInput.focus(); return; }
        window.location.href = buildSearchUrl(query, currentEngine, customUrl);
    }

    function generateShareUrl() {
        const query = queryInput.value.trim();
        const customUrl = customUrlInput.value.trim();
        if (!query) { toast(t('toast.needQuery')); queryInput.focus(); return; }

        const params = new URLSearchParams();
        params.set('q', query);
        params.set('engine', currentEngine);
        if (customUrl) params.set('custom', customUrl);

        const base = window.location.origin + window.location.pathname;
        const shareUrl = `${base}?${params.toString()}`;

        $('#share-url').value = shareUrl;
        const box = $('#share-result');
        box.classList.remove('hidden');
        box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // try native share on supported devices
        if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
            navigator.share({ title: 'SearchForYou', text: query, url: shareUrl }).catch(() => {});
        }
    }

    function hideShareResult() {
        const box = $('#share-result');
        if (box) box.classList.add('hidden');
    }

    async function copyShareUrl() {
        const input = $('#share-url');
        const btn = $('#copy-btn');
        const label = $('.copy-text', btn);
        const original = label.textContent;
        try {
            await navigator.clipboard.writeText(input.value);
        } catch {
            input.select();
            try { document.execCommand('copy'); } catch { toast(t('toast.copyFail')); return; }
        }
        label.textContent = t('share.copied');
        btn.classList.add('copied');
        toast(t('toast.copied'));
        setTimeout(() => { label.textContent = original; btn.classList.remove('copied'); }, 2000);
    }

    /* ============================================================
       Shared-link cinematic sequence
       ============================================================ */
    let isAnimating = false;

    async function typeText(text) {
        const cursor = $('.typing-cursor');
        cursor.classList.add('active');
        queryInput.value = '';
        for (let i = 0; i <= text.length; i++) {
            queryInput.value = text.slice(0, i);
            await delay(55 + Math.random() * 70);
        }
        cursor.classList.remove('active');
        await delay(400);
    }

    async function playLoading(query) {
        const screen = $('#loading-screen');
        const textEl = $('#loading-text');
        const queryEl = $('#loading-query');
        screen.classList.remove('hidden');
        queryEl.textContent = `"${query}"`;
        for (let i = 0; i < 5; i++) {
            textEl.textContent = t('loading.' + i);
            await delay(720 + Math.random() * 320);
        }
    }

    async function showSuccess() {
        $('#loading-screen').classList.add('hidden');
        const s = $('#success-screen');
        s.classList.remove('hidden');
        refreshIcons();
        await delay(1500);
    }

    async function runSharedAnimation(query, engineId, customUrl) {
        if (isAnimating) return;
        isAnimating = true;
        if (engineId && ENGINE_MAP[engineId]) selectEngine(engineId, { silent: true });

        const target = buildSearchUrl(query, engineId, customUrl);

        if (prefersReduced()) { window.location.href = target; return; }

        await typeText(query);
        await playLoading(query);
        await showSuccess();
        window.location.href = target;
    }

    function checkUrlParams() {
        const p = new URLSearchParams(window.location.search);
        const query = p.get('q');
        if (!query) return false;
        runSharedAnimation(query, p.get('engine'), p.get('custom'));
        return true;
    }

    /* ============================================================
       Animated network background (canvas)
       ============================================================ */
    function initCanvas() {
        if (prefersReduced()) return;
        const canvas = $('#bg-canvas');
        const ctx = canvas.getContext('2d');
        let w, h, dpr, nodes = [], raf;

        const cssVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = canvas.width = innerWidth * dpr;
            h = canvas.height = innerHeight * dpr;
            canvas.style.width = innerWidth + 'px';
            canvas.style.height = innerHeight + 'px';
            const count = Math.min(80, Math.floor((innerWidth * innerHeight) / 22000));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.25 * dpr,
                vy: (Math.random() - 0.5) * 0.25 * dpr,
                r: (Math.random() * 1.6 + 0.8) * dpr
            }));
        }

        const mouse = { x: -9999, y: -9999 };
        window.addEventListener('mousemove', (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
        window.addEventListener('mouseout', () => { mouse.x = -9999; mouse.y = -9999; });

        function draw() {
            ctx.clearRect(0, 0, w, h);
            const lineColor = cssVar('--canvas-line');
            const dotColor = cssVar('--canvas-dot');
            const maxDist = 130 * dpr;

            for (const n of nodes) {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > w) n.vx *= -1;
                if (n.y < 0 || n.y > h) n.vy *= -1;
            }
            // links
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const dx = a.x - b.x, dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < maxDist) {
                        ctx.globalAlpha = (1 - dist / maxDist) * 0.55;
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = 1 * dpr;
                        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
                    }
                }
            }
            // mouse links
            for (const n of nodes) {
                const dx = n.x - mouse.x, dy = n.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < maxDist * 1.6) {
                    ctx.globalAlpha = (1 - dist / (maxDist * 1.6)) * 0.7;
                    ctx.strokeStyle = dotColor;
                    ctx.lineWidth = 1 * dpr;
                    ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
                }
            }
            // dots
            ctx.globalAlpha = 1;
            ctx.fillStyle = dotColor;
            for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); }

            raf = requestAnimationFrame(draw);
        }

        let resizeTimer;
        window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); });
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) cancelAnimationFrame(raf);
            else draw();
        });

        resize();
        draw();
    }

    /* ============================================================
       Hero rotator (subtle cycling subtitle)
       ============================================================ */
    function initRotator() {
        const phrases = {
            en: ['Mainstream, privacy, AI, academic & indie old-web search in one place.',
                 'Tired of "just google it"? Send a link that searches with style.',
                 'Discover engines you never knew existed — Marginalia, Wiby, Stract & more.'],
            ru: ['Массовые, приватные, ИИ, академические и инди-поисковики — в одном месте.',
                 'Устали от «да загугли сам»? Отправьте ссылку, что ищет со стилем.',
                 'Откройте поисковики, о которых не знали — Marginalia, Wiby, Stract и другие.']
        };
        const el = $('#hero-rotator');
        if (!el || prefersReduced()) return;
        let i = 0;
        setInterval(() => {
            const arr = phrases[lang] || phrases.en;
            i = (i + 1) % arr.length;
            el.style.opacity = '0';
            setTimeout(() => { el.textContent = arr[i]; el.style.opacity = '1'; }, 350);
        }, 5200);
        el.style.transition = 'opacity 0.35s ease';
    }

    /* ============================================================
       Wire up events + init
       ============================================================ */
    function init() {
        applyTheme();
        applyLang();
        renderCategories();
        renderEngines();
        refreshIcons();

        $('#theme-toggle').addEventListener('click', toggleTheme);
        $('#lang-toggle').addEventListener('click', () => { toggleLang(); renderCategories(); renderEngines(); });
        $('#surprise-btn').addEventListener('click', surprise);
        $('#search-form').addEventListener('submit', doSearch);
        $('#share-btn').addEventListener('click', generateShareUrl);
        $('#copy-btn').addEventListener('click', copyShareUrl);

        const clearBtn = $('#clear-btn');
        queryInput.addEventListener('input', () => {
            clearBtn.classList.toggle('hidden', !queryInput.value);
            hideShareResult();
        });
        clearBtn.addEventListener('click', () => {
            queryInput.value = '';
            clearBtn.classList.add('hidden');
            queryInput.focus();
        });
        customUrlInput.addEventListener('input', hideShareResult);

        // keyboard: "/" focuses the search box
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement !== queryInput && document.activeElement !== customUrlInput) {
                e.preventDefault(); queryInput.focus();
            }
        });

        initCanvas();
        initRotator();

        // shared-link sequence takes over if ?q= present
        checkUrlParams();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
