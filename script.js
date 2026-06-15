/* ============================================================
   SearchForYou — application logic
   Vanilla JS, no build step. Depends on i18n.js & engines.js.
   ============================================================ */

(() => {
    'use strict';

    const LS = { theme: 'sfy-theme', lang: 'sfy-lang', skin: 'sfy-skin', engine: 'sfy-engine', cat: 'sfy-cat' };

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const I18N = window.I18N;
    const ENGINES = window.SEARCH_ENGINES;
    const ENGINE_MAP = window.ENGINE_MAP;
    const CATEGORIES = window.CATEGORIES;

    /* ---------- state ---------- */
    const savedLang = localStorage.getItem(LS.lang);
    let lang = savedLang || ((navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en');
    if (!I18N[lang]) lang = 'en';

    let theme = localStorage.getItem(LS.theme) || 'dark';
    let skin = localStorage.getItem(LS.skin) || 'modern';
    let currentEngine = localStorage.getItem(LS.engine) || 'google';
    if (!ENGINE_MAP[currentEngine]) currentEngine = 'google';
    let activeCat = localStorage.getItem(LS.cat) || ENGINE_MAP[currentEngine].cat;
    if (!CATEGORIES.some((c) => c.id === activeCat)) activeCat = 'web';

    const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.en[k] || k;

    /* ============================================================
       i18n
       ============================================================ */
    function applyLang() {
        document.documentElement.lang = lang;
        $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
        $$('[data-i18n-placeholder]').forEach((el) => { el.placeholder = t(el.dataset.i18nPlaceholder); });
        $('#lang-label').textContent = t('ctrl.lang');
        updateControlLabels();
    }

    function updateControlLabels() {
        $('#theme-label').textContent = theme === 'dark' ? t('ctrl.theme') : t('ctrl.themeBack');
        $('#skin-label').textContent = skin === 'modern' ? t('ctrl.skin') : t('ctrl.skinBack');
        $('#foot-theme').textContent =
            skin === 'win95' ? 'WINDOWS 95' : (theme === 'dark' ? 'TOKYO NIGHT' : 'TOKYO DAY');
    }

    /* ============================================================
       theme / skin
       ============================================================ */
    function applyTheme() {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        const meta = $('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', skin === 'win95' ? '#008080' : (theme === 'dark' ? '#000000' : '#e1e2e7'));
    }
    function applySkin() {
        document.documentElement.setAttribute('data-skin', skin);
        document.body.setAttribute('data-skin', skin);
        applyTheme();
        if (skin === 'win95') startClock();
    }

    /* ============================================================
       toast
       ============================================================ */
    let toastTimer;
    function toast(msg) {
        const el = $('#toast');
        el.textContent = msg;
        el.classList.remove('hidden');
        requestAnimationFrame(() => el.classList.add('show'));
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.classList.add('hidden'), 300); }, 2400);
    }

    /* ============================================================
       rendering: category nav + engine list
       ============================================================ */
    function renderCategories() {
        const nav = $('#category-nav');
        nav.innerHTML = CATEGORIES.map((c) => `
            <li><button type="button" class="cat-item${c.id === activeCat ? ' active' : ''}" data-cat="${c.id}">
                <span class="cat-num">${c.num}</span><span class="cat-label">${t('cat.' + c.id)}</span>
            </button></li>`).join('');
        $$('.cat-item', nav).forEach((b) => b.addEventListener('click', () => setCategory(b.dataset.cat)));
    }

    function engineTick(e) {
        const hex = encodeURIComponent(e.color.replace('#', ''));
        if (e.icon) {
            return `<span class="er-tick"><img src="https://cdn.simpleicons.org/${e.icon}/${hex}" alt="" loading="lazy"
                onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'mono-letter',textContent:'${e.name[0]}'}))"></span>`;
        }
        return `<span class="er-tick"><span class="mono-letter">${e.name[0]}</span></span>`;
    }

    function renderEngines() {
        const list = $('#engine-list');
        const items = ENGINES.filter((e) => e.cat === activeCat);
        list.innerHTML = items.map((e, i) => `
            <li><button type="button" class="engine-row${e.id === currentEngine ? ' active' : ''}"
                    data-engine="${e.id}" style="--c:${e.color}; --i:${i}" role="option">
                <span class="er-num">${String(i + 1).padStart(2, '0')}</span>
                ${engineTick(e)}
                <span class="er-name">${e.name}</span>
                <span class="er-domain">${e.domain}</span>
                <span class="er-go">↵</span>
            </button></li>`).join('');
        $$('.engine-row', list).forEach((b) => {
            b.addEventListener('click', () => selectEngine(b.dataset.engine));
            b.addEventListener('dblclick', () => { selectEngine(b.dataset.engine); runSearch(); });
        });
        $('#dir-count').textContent = items.length;
    }

    function setCategory(id) {
        activeCat = id;
        localStorage.setItem(LS.cat, id);
        $$('.cat-item').forEach((b) => b.classList.toggle('active', b.dataset.cat === id));
        renderEngines();
    }

    function selectEngine(id, { jump = true } = {}) {
        if (!ENGINE_MAP[id]) return;
        currentEngine = id;
        localStorage.setItem(LS.engine, id);
        const eng = ENGINE_MAP[id];
        if (jump && eng.cat !== activeCat) { setCategory(eng.cat); }
        $$('.engine-row').forEach((b) => b.classList.toggle('active', b.dataset.engine === id));
        $('#dir-selected').textContent = eng.name;
        hideShare();
    }

    function surprise() {
        const e = ENGINES[Math.floor(Math.random() * ENGINES.length)];
        selectEngine(e.id);
        const row = $('.engine-row[data-engine="' + e.id + '"]');
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        toast(t('toast.random') + ' ' + e.name + ' · ' + e.domain);
    }

    /* ============================================================
       search + share
       ============================================================ */
    const queryInput = () => $('#query-input');
    const customInput = () => $('#custom-url');

    function buildUrl(query, engineId, custom) {
        if (custom) return custom;
        const e = ENGINE_MAP[engineId] || ENGINE_MAP[currentEngine];
        return e.url + (e.encode ? encodeURIComponent(query) : query);
    }

    function runSearch(ev) {
        if (ev) ev.preventDefault();
        const q = queryInput().value.trim();
        const c = customInput().value.trim();
        if (!q && !c) { toast(t('toast.needQuery')); queryInput().focus(); return; }
        window.location.href = buildUrl(q, currentEngine, c);
    }

    function makeShare() {
        const q = queryInput().value.trim();
        const c = customInput().value.trim();
        if (!q) { toast(t('toast.needQuery')); queryInput().focus(); return; }
        const p = new URLSearchParams();
        p.set('q', q);
        p.set('engine', currentEngine);
        if (c) p.set('custom', c);
        const url = window.location.origin + window.location.pathname + '?' + p.toString();
        $('#share-url').value = url;
        $('#share-result').classList.remove('hidden');
        $('#share-result').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) {
            navigator.share({ title: 'SearchForYou', text: q, url }).catch(() => {});
        }
    }
    function hideShare() { $('#share-result').classList.add('hidden'); }

    async function copyShare() {
        const input = $('#share-url');
        const btn = $('#copy-btn');
        const original = t('share.copy');
        try { await navigator.clipboard.writeText(input.value); }
        catch { input.select(); try { document.execCommand('copy'); } catch { toast(t('toast.copyFail')); return; } }
        btn.textContent = t('share.copied');
        btn.classList.add('copied');
        toast(t('toast.copied'));
        setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1800);
    }

    /* ============================================================
       shared-link boot sequence
       ============================================================ */
    let animating = false;

    async function typeQuery(text) {
        const input = queryInput();
        input.value = '';
        for (let i = 0; i <= text.length; i++) {
            input.value = text.slice(0, i);
            await delay(45 + Math.random() * 55);
        }
        await delay(350);
    }

    async function bootSequence(query) {
        const screen = $('#loading-screen');
        const log = $('#boot-log');
        $('#boot-query').textContent = '"' + query + '"';
        log.innerHTML = '';
        screen.classList.remove('hidden');
        for (let i = 0; i < 5; i++) {
            const li = document.createElement('li');
            li.textContent = t('boot.' + i);
            log.appendChild(li);
            if (i === 4) li.classList.add('done');
            await delay(i === 4 ? 500 : 640 + Math.random() * 260);
        }
        await delay(300);
    }

    async function showSuccess() {
        $('#loading-screen').classList.add('hidden');
        $('#success-screen').classList.remove('hidden');
        await delay(1400);
    }

    async function runShared(query, engineId, custom) {
        if (animating) return;
        animating = true;
        if (engineId && ENGINE_MAP[engineId]) selectEngine(engineId);
        const target = buildUrl(query, engineId, custom);
        if (reduced()) { window.location.href = target; return; }
        await typeQuery(query);
        await bootSequence(query);
        await showSuccess();
        window.location.href = target;
    }

    function checkParams() {
        const p = new URLSearchParams(window.location.search);
        const q = p.get('q');
        if (!q) return;
        runShared(q, p.get('engine'), p.get('custom'));
    }

    /* ============================================================
       win95 clock
       ============================================================ */
    let clockTimer;
    function startClock() {
        const el = $('#win-clock');
        if (!el || clockTimer) return;
        const tick = () => {
            const d = new Date();
            el.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
        };
        tick();
        clockTimer = setInterval(tick, 15000);
    }

    /* ============================================================
       init
       ============================================================ */
    function init() {
        applySkin();   // also calls applyTheme
        applyLang();
        renderCategories();
        renderEngines();
        selectEngine(currentEngine, { jump: false });

        $('#lang-toggle').addEventListener('click', () => {
            lang = lang === 'en' ? 'ru' : 'en';
            localStorage.setItem(LS.lang, lang);
            applyLang(); renderCategories(); renderEngines();
            $('#dir-selected').textContent = ENGINE_MAP[currentEngine].name;
        });
        $('#theme-toggle').addEventListener('click', () => {
            theme = theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem(LS.theme, theme);
            applyTheme(); updateControlLabels();
        });
        $('#skin-toggle').addEventListener('click', () => {
            skin = skin === 'modern' ? 'win95' : 'modern';
            localStorage.setItem(LS.skin, skin);
            applySkin(); updateControlLabels();
        });

        $('#search-form').addEventListener('submit', runSearch);
        $('#surprise-btn').addEventListener('click', surprise);
        $('#share-btn').addEventListener('click', makeShare);
        $('#copy-btn').addEventListener('click', copyShare);

        const customToggle = $('#custom-toggle');
        customToggle.addEventListener('click', () => {
            const ci = customInput();
            ci.classList.toggle('hidden');
            customToggle.classList.toggle('active');
            if (!ci.classList.contains('hidden')) ci.focus();
        });
        queryInput().addEventListener('input', hideShare);
        customInput().addEventListener('input', hideShare);

        // "RANDOM"-style keyboard: "/" focuses, "r" randoms when not typing
        document.addEventListener('keydown', (e) => {
            const typing = document.activeElement === queryInput() || document.activeElement === customInput();
            if (e.key === '/' && !typing) { e.preventDefault(); queryInput().focus(); }
        });

        // make a "share" affordance: long-style — bind RANDOM's sibling? expose share via Ctrl+Enter
        $('#search-form').addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); makeShare(); }
        });

        checkParams();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    // expose share for the aux flow (Share via custom toggle long-press is overkill; expose globally)
    window.__sfyShare = makeShare;
})();
