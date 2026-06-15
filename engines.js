/* ============================================================
   SearchForYou — search engine catalogue
   Each engine: { id, name, url, encode, cat, color, icon }
   - url      : query is appended to this string
   - encode   : whether to encodeURIComponent the query
   - cat      : category id (see CATEGORIES)
   - color    : brand color used for the badge glow / fallback
   - icon     : Simple Icons slug (https://cdn.simpleicons.org/<icon>)
                or null to render a lettered monogram instead
   ============================================================ */

const CATEGORIES = [
    { id: 'all',      icon: 'layout-grid' },
    { id: 'main',     icon: 'globe' },
    { id: 'privacy',  icon: 'shield-check' },
    { id: 'ai',       icon: 'sparkles' },
    { id: 'academic', icon: 'graduation-cap' },
    { id: 'indie',    icon: 'compass' },
    { id: 'dev',      icon: 'code-2' }
];

const SEARCH_ENGINES = [
    /* ---------- Mainstream ---------- */
    { id: 'google',     name: 'Google',        url: 'https://www.google.com/search?q=',            encode: true, cat: 'main',     color: '#4285F4', icon: 'google' },
    { id: 'bing',       name: 'Bing',          url: 'https://www.bing.com/search?q=',              encode: true, cat: 'main',     color: '#0078D4', icon: 'microsoftbing' },
    { id: 'yandex',     name: 'Yandex',        url: 'https://yandex.com/search/?text=',            encode: true, cat: 'main',     color: '#FF0000', icon: 'yandex' },
    { id: 'duckduckgo', name: 'DuckDuckGo',    url: 'https://duckduckgo.com/?q=',                  encode: true, cat: 'main',     color: '#DE5833', icon: 'duckduckgo' },
    { id: 'baidu',      name: 'Baidu',         url: 'https://www.baidu.com/s?wd=',                 encode: true, cat: 'main',     color: '#2932E1', icon: 'baidu' },

    /* ---------- Privacy ---------- */
    { id: 'brave',      name: 'Brave Search',  url: 'https://search.brave.com/search?q=',          encode: true, cat: 'privacy',  color: '#FB542B', icon: 'brave' },
    { id: 'startpage',  name: 'Startpage',     url: 'https://www.startpage.com/sp/search?query=',  encode: true, cat: 'privacy',  color: '#6573FF', icon: 'startpage' },
    { id: 'ecosia',     name: 'Ecosia',        url: 'https://www.ecosia.org/search?q=',            encode: true, cat: 'privacy',  color: '#56AC58', icon: 'ecosia' },
    { id: 'qwant',      name: 'Qwant',         url: 'https://www.qwant.com/?q=',                   encode: true, cat: 'privacy',  color: '#5C97FF', icon: 'qwant' },
    { id: 'mojeek',     name: 'Mojeek',        url: 'https://www.mojeek.com/search?q=',            encode: true, cat: 'privacy',  color: '#A4C639', icon: null },
    { id: 'searxng',    name: 'SearXNG',       url: 'https://searx.be/search?q=',                  encode: true, cat: 'privacy',  color: '#3050FF', icon: 'searxng' },
    { id: 'swisscows',  name: 'Swisscows',     url: 'https://swisscows.com/en/web?query=',         encode: true, cat: 'privacy',  color: '#D81B60', icon: null },

    /* ---------- AI ---------- */
    { id: 'perplexity', name: 'Perplexity',    url: 'https://www.perplexity.ai/search?q=',         encode: true, cat: 'ai',       color: '#20B8CD', icon: 'perplexity' },
    { id: 'phind',      name: 'Phind',         url: 'https://www.phind.com/search?q=',             encode: true, cat: 'ai',       color: '#10A37F', icon: null },
    { id: 'you',        name: 'You.com',       url: 'https://you.com/search?q=',                   encode: true, cat: 'ai',       color: '#9D4EDD', icon: null },
    { id: 'andi',       name: 'Andi',          url: 'https://andisearch.com/?q=',                  encode: true, cat: 'ai',       color: '#FF6B6B', icon: null },

    /* ---------- Academic & Knowledge ---------- */
    { id: 'wikipedia',  name: 'Wikipedia',     url: 'https://en.wikipedia.org/w/index.php?search=',encode: true, cat: 'academic', color: '#A2A9B1', icon: 'wikipedia' },
    { id: 'wolfram',    name: 'WolframAlpha',  url: 'https://www.wolframalpha.com/input?i=',       encode: true, cat: 'academic', color: '#DD1100', icon: 'wolframalpha' },
    { id: 'scholar',    name: 'Scholar',       url: 'https://scholar.google.com/scholar?q=',       encode: true, cat: 'academic', color: '#4285F4', icon: 'googlescholar' },
    { id: 'arxiv',      name: 'arXiv',         url: 'https://arxiv.org/abs/',                      encode: true, cat: 'academic', color: '#B31B1B', icon: 'arxiv' },
    { id: 'semantic',   name: 'Semantic',      url: 'https://www.semanticscholar.org/search?q=',   encode: true, cat: 'academic', color: '#1857B6', icon: 'semanticscholar' },
    { id: 'pubmed',     name: 'PubMed',        url: 'https://pubmed.ncbi.nlm.nih.gov/?term=',      encode: true, cat: 'academic', color: '#326295', icon: null },

    /* ---------- Indie / Old Web ---------- */
    { id: 'marginalia', name: 'Marginalia',    url: 'https://search.marginalia.nu/search?query=',  encode: true, cat: 'indie',    color: '#7E22CE', icon: null },
    { id: 'wiby',       name: 'Wiby',          url: 'https://wiby.me/?q=',                         encode: true, cat: 'indie',    color: '#3B82F6', icon: null },
    { id: 'stract',     name: 'Stract',        url: 'https://stract.com/search?q=',                encode: true, cat: 'indie',    color: '#F59E0B', icon: null },
    { id: 'yep',        name: 'Yep',           url: 'https://yep.com/web?q=',                      encode: true, cat: 'indie',    color: '#FF8A00', icon: null },
    { id: 'millionshort',name:'Million Short', url: 'https://millionshort.com/search?keywords=',   encode: true, cat: 'indie',    color: '#22C55E', icon: null },
    { id: 'presearch',  name: 'Presearch',     url: 'https://presearch.com/search?q=',             encode: true, cat: 'indie',    color: '#1A56DB', icon: null },

    /* ---------- Developer ---------- */
    { id: 'github',     name: 'GitHub',        url: 'https://github.com/search?q=',                encode: true, cat: 'dev',      color: '#8B95A5', icon: 'github' },
    { id: 'stackoverflow',name:'Stack Overflow',url:'https://stackoverflow.com/search?q=',         encode: true, cat: 'dev',      color: '#F48024', icon: 'stackoverflow' },
    { id: 'mdn',        name: 'MDN',           url: 'https://developer.mozilla.org/en-US/search?q=',encode: true, cat: 'dev',     color: '#000000', icon: 'mdnwebdocs' },
    { id: 'devdocs',    name: 'DevDocs',       url: 'https://devdocs.io/#q=',                      encode: true, cat: 'dev',      color: '#3B6E22', icon: 'devdotto' },
    { id: 'hackernews', name: 'HN Search',     url: 'https://hn.algolia.com/?q=',                  encode: true, cat: 'dev',      color: '#FF6600', icon: 'ycombinator' }
];

/* Quick lookup by id */
const ENGINE_MAP = Object.fromEntries(SEARCH_ENGINES.map(e => [e.id, e]));

if (typeof window !== 'undefined') {
    window.CATEGORIES = CATEGORIES;
    window.SEARCH_ENGINES = SEARCH_ENGINES;
    window.ENGINE_MAP = ENGINE_MAP;
}
