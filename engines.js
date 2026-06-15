/* ============================================================
   SearchForYou — search source catalogue
   Each source: { id, name, domain, url, encode, cat, color, icon }
     url    : query is appended to this string
     encode : whether to encodeURIComponent the query
     cat    : category id (see CATEGORIES)
     color  : brand color (used for the tick + logo tint + fallback)
     icon   : Simple Icons slug, or null to render a lettered tile
   NOTE: streaming/search endpoints are best-effort and may change;
         they are trivial to update right here.
   ============================================================ */

const CATEGORIES = [
    { id: 'web',         num: '01', accent: '#7aa2f7' },
    { id: 'privacy',     num: '02', accent: '#9ece6a' },
    { id: 'answers',     num: '03', accent: '#bb9af7' },
    { id: 'academic',    num: '04', accent: '#7dcfff' },
    { id: 'indie',       num: '05', accent: '#e0af68' },
    { id: 'dev',         num: '06', accent: '#f7768e' },
    { id: 'maps',        num: '07', accent: '#73daca' },
    { id: 'shop',        num: '08', accent: '#ff9e64' },
    { id: 'stream',      num: '09', accent: '#f7768e' },
    { id: 'streamru',    num: '10', accent: '#7aa2f7' }
];

const SEARCH_ENGINES = [
    /* ---------- 01 · Web ---------- */
    { id: 'google',     name: 'Google',         domain: 'google.com',         url: 'https://www.google.com/search?q=',                 encode: true, cat: 'web', color: '#4285F4', icon: 'google' },
    { id: 'bing',       name: 'Bing',           domain: 'bing.com',           url: 'https://www.bing.com/search?q=',                   encode: true, cat: 'web', color: '#0078D4', icon: 'microsoftbing' },
    { id: 'duckduckgo', name: 'DuckDuckGo',     domain: 'duckduckgo.com',     url: 'https://duckduckgo.com/?q=',                       encode: true, cat: 'web', color: '#DE5833', icon: 'duckduckgo' },
    { id: 'yahoo',      name: 'Yahoo',          domain: 'search.yahoo.com',   url: 'https://search.yahoo.com/search?p=',               encode: true, cat: 'web', color: '#6001D2', icon: 'yahoo' },
    { id: 'yandex',     name: 'Yandex',         domain: 'yandex.com',         url: 'https://yandex.com/search/?text=',                 encode: true, cat: 'web', color: '#FF0000', icon: 'yandex' },
    { id: 'baidu',      name: 'Baidu',          domain: 'baidu.com',          url: 'https://www.baidu.com/s?wd=',                      encode: true, cat: 'web', color: '#2932E1', icon: 'baidu' },
    { id: 'naver',      name: 'Naver',          domain: 'naver.com',          url: 'https://search.naver.com/search.naver?query=',     encode: true, cat: 'web', color: '#03C75A', icon: 'naver' },
    { id: 'seznam',     name: 'Seznam',         domain: 'seznam.cz',          url: 'https://search.seznam.cz/?q=',                     encode: true, cat: 'web', color: '#CC0000', icon: null },
    { id: 'sogou',      name: 'Sogou',          domain: 'sogou.com',          url: 'https://www.sogou.com/web?query=',                 encode: true, cat: 'web', color: '#FA6400', icon: null },
    { id: 'ask',        name: 'Ask',            domain: 'ask.com',            url: 'https://www.ask.com/web?q=',                       encode: true, cat: 'web', color: '#D5022B', icon: null },

    /* ---------- 02 · Privacy ---------- */
    { id: 'brave',      name: 'Brave Search',   domain: 'search.brave.com',   url: 'https://search.brave.com/search?q=',               encode: true, cat: 'privacy', color: '#FB542B', icon: 'brave' },
    { id: 'startpage',  name: 'Startpage',      domain: 'startpage.com',      url: 'https://www.startpage.com/sp/search?query=',       encode: true, cat: 'privacy', color: '#6573FF', icon: 'startpage' },
    { id: 'ecosia',     name: 'Ecosia',         domain: 'ecosia.org',         url: 'https://www.ecosia.org/search?q=',                 encode: true, cat: 'privacy', color: '#56AC58', icon: 'ecosia' },
    { id: 'qwant',      name: 'Qwant',          domain: 'qwant.com',          url: 'https://www.qwant.com/?q=',                        encode: true, cat: 'privacy', color: '#5C97FF', icon: 'qwant' },
    { id: 'mojeek',     name: 'Mojeek',         domain: 'mojeek.com',         url: 'https://www.mojeek.com/search?q=',                 encode: true, cat: 'privacy', color: '#A4C639', icon: null },
    { id: 'searxng',    name: 'SearXNG',        domain: 'searx.be',           url: 'https://searx.be/search?q=',                       encode: true, cat: 'privacy', color: '#3050FF', icon: 'searxng' },
    { id: 'swisscows',  name: 'Swisscows',      domain: 'swisscows.com',      url: 'https://swisscows.com/en/web?query=',              encode: true, cat: 'privacy', color: '#D81B60', icon: null },
    { id: 'metager',    name: 'MetaGer',        domain: 'metager.org',        url: 'https://metager.org/meta/meta.ger3?eingabe=',      encode: true, cat: 'privacy', color: '#FF7E00', icon: null },
    { id: 'gibiru',     name: 'Gibiru',         domain: 'gibiru.com',         url: 'https://gibiru.com/results.html?q=',               encode: true, cat: 'privacy', color: '#2E7D32', icon: null },
    { id: 'ddglite',    name: 'DDG Lite',       domain: 'lite.duckduckgo.com',url: 'https://lite.duckduckgo.com/lite/?q=',             encode: true, cat: 'privacy', color: '#DE5833', icon: null },

    /* ---------- 03 · Answer engines ---------- */
    { id: 'perplexity', name: 'Perplexity',     domain: 'perplexity.ai',      url: 'https://www.perplexity.ai/search?q=',              encode: true, cat: 'answers', color: '#20B8CD', icon: 'perplexity' },
    { id: 'phind',      name: 'Phind',          domain: 'phind.com',          url: 'https://www.phind.com/search?q=',                  encode: true, cat: 'answers', color: '#10A37F', icon: null },
    { id: 'andi',       name: 'Andi',           domain: 'andisearch.com',     url: 'https://andisearch.com/?q=',                       encode: true, cat: 'answers', color: '#FF6B6B', icon: null },
    { id: 'komo',       name: 'Komo',           domain: 'komo.ai',            url: 'https://komo.ai/search/search_result?q=',          encode: true, cat: 'answers', color: '#6C5CE7', icon: null },

    /* ---------- 04 · Academic ---------- */
    { id: 'wikipedia',  name: 'Wikipedia',      domain: 'wikipedia.org',      url: 'https://en.wikipedia.org/w/index.php?search=',     encode: true, cat: 'academic', color: '#A2A9B1', icon: 'wikipedia' },
    { id: 'wikidata',   name: 'Wikidata',       domain: 'wikidata.org',       url: 'https://www.wikidata.org/w/index.php?search=',     encode: true, cat: 'academic', color: '#339966', icon: 'wikidata' },
    { id: 'wolfram',    name: 'WolframAlpha',   domain: 'wolframalpha.com',   url: 'https://www.wolframalpha.com/input?i=',            encode: true, cat: 'academic', color: '#DD1100', icon: 'wolframalpha' },
    { id: 'scholar',    name: 'Google Scholar', domain: 'scholar.google.com', url: 'https://scholar.google.com/scholar?q=',            encode: true, cat: 'academic', color: '#4285F4', icon: 'googlescholar' },
    { id: 'arxiv',      name: 'arXiv',          domain: 'arxiv.org',          url: 'https://arxiv.org/abs/',                           encode: true, cat: 'academic', color: '#B31B1B', icon: 'arxiv' },
    { id: 'semantic',   name: 'Semantic Scholar',domain:'semanticscholar.org',url: 'https://www.semanticscholar.org/search?q=',        encode: true, cat: 'academic', color: '#1857B6', icon: 'semanticscholar' },
    { id: 'pubmed',     name: 'PubMed',         domain: 'pubmed.ncbi.nlm.nih.gov', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=',      encode: true, cat: 'academic', color: '#326295', icon: null },
    { id: 'base',       name: 'BASE',           domain: 'base-search.net',    url: 'https://www.base-search.net/Search/Results?lookfor=', encode: true, cat: 'academic', color: '#F58025', icon: null },

    /* ---------- 05 · Indie / Old Web ---------- */
    { id: 'marginalia', name: 'Marginalia',     domain: 'marginalia-search.com', url: 'https://search.marginalia.nu/search?query=',    encode: true, cat: 'indie', color: '#7E22CE', icon: null },
    { id: 'wiby',       name: 'Wiby',           domain: 'wiby.me',            url: 'https://wiby.me/?q=',                              encode: true, cat: 'indie', color: '#3B82F6', icon: null },
    { id: 'stract',     name: 'Stract',         domain: 'stract.com',         url: 'https://stract.com/search?q=',                     encode: true, cat: 'indie', color: '#F59E0B', icon: null },
    { id: 'yep',        name: 'Yep',            domain: 'yep.com',            url: 'https://yep.com/web?q=',                           encode: true, cat: 'indie', color: '#FF8A00', icon: null },
    { id: 'millionshort',name:'Million Short',  domain: 'millionshort.com',   url: 'https://millionshort.com/search?keywords=',        encode: true, cat: 'indie', color: '#22C55E', icon: null },
    { id: 'presearch',  name: 'Presearch',      domain: 'presearch.com',      url: 'https://presearch.com/search?q=',                  encode: true, cat: 'indie', color: '#1A56DB', icon: null },
    { id: 'searchmysite',name:'searchmysite',   domain: 'searchmysite.net',   url: 'https://searchmysite.net/search/?q=',              encode: true, cat: 'indie', color: '#0EA5E9', icon: null },
    { id: 'rightdao',   name: 'Right Dao',      domain: 'rightdao.com',       url: 'https://rightdao.com/search?q=',                   encode: true, cat: 'indie', color: '#9333EA', icon: null },

    /* ---------- 06 · Developer ---------- */
    { id: 'github',     name: 'GitHub',         domain: 'github.com',         url: 'https://github.com/search?q=',                     encode: true, cat: 'dev', color: '#8B95A5', icon: 'github' },
    { id: 'stackoverflow',name:'Stack Overflow',domain: 'stackoverflow.com',  url: 'https://stackoverflow.com/search?q=',              encode: true, cat: 'dev', color: '#F48024', icon: 'stackoverflow' },
    { id: 'mdn',        name: 'MDN',            domain: 'developer.mozilla.org', url: 'https://developer.mozilla.org/en-US/search?q=', encode: true, cat: 'dev', color: '#83D0F2', icon: 'mdnwebdocs' },
    { id: 'devdocs',    name: 'DevDocs',        domain: 'devdocs.io',         url: 'https://devdocs.io/#q=',                           encode: true, cat: 'dev', color: '#3B6E22', icon: null },
    { id: 'hackernews', name: 'HN Search',      domain: 'hn.algolia.com',     url: 'https://hn.algolia.com/?q=',                       encode: true, cat: 'dev', color: '#FF6600', icon: 'ycombinator' },
    { id: 'npm',        name: 'npm',            domain: 'npmjs.com',          url: 'https://www.npmjs.com/search?q=',                  encode: true, cat: 'dev', color: '#CB3837', icon: 'npm' },
    { id: 'pypi',       name: 'PyPI',           domain: 'pypi.org',           url: 'https://pypi.org/search/?q=',                      encode: true, cat: 'dev', color: '#3775A9', icon: 'pypi' },
    { id: 'crates',     name: 'crates.io',      domain: 'crates.io',          url: 'https://crates.io/search?q=',                      encode: true, cat: 'dev', color: '#E6B14C', icon: 'rust' },
    { id: 'reddit',     name: 'Reddit',         domain: 'reddit.com',         url: 'https://www.reddit.com/search/?q=',                encode: true, cat: 'dev', color: '#FF4500', icon: 'reddit' },
    { id: 'caniuse',    name: 'Can I Use',      domain: 'caniuse.com',        url: 'https://caniuse.com/?search=',                     encode: true, cat: 'dev', color: '#E8602C', icon: null },

    /* ---------- 07 · Maps ---------- */
    { id: 'gmaps',      name: 'Google Maps',    domain: 'google.com/maps',    url: 'https://www.google.com/maps/search/',              encode: true, cat: 'maps', color: '#34A853', icon: 'googlemaps' },
    { id: 'osm',        name: 'OpenStreetMap',  domain: 'openstreetmap.org',  url: 'https://www.openstreetmap.org/search?query=',      encode: true, cat: 'maps', color: '#7EBC6F', icon: 'openstreetmap' },
    { id: 'ymaps',      name: 'Yandex Maps',    domain: 'yandex.com/maps',    url: 'https://yandex.com/maps/?text=',                   encode: true, cat: 'maps', color: '#FF0000', icon: null },
    { id: 'dgis',       name: '2GIS',           domain: '2gis.ru',            url: 'https://2gis.ru/search/',                          encode: true, cat: 'maps', color: '#42AA48', icon: null },
    { id: 'bmaps',      name: 'Bing Maps',      domain: 'bing.com/maps',      url: 'https://www.bing.com/maps?q=',                     encode: true, cat: 'maps', color: '#0078D4', icon: null },

    /* ---------- 08 · Shopping ---------- */
    { id: 'amazon',     name: 'Amazon',         domain: 'amazon.com',         url: 'https://www.amazon.com/s?k=',                      encode: true, cat: 'shop', color: '#FF9900', icon: 'amazon' },
    { id: 'ebay',       name: 'eBay',           domain: 'ebay.com',           url: 'https://www.ebay.com/sch/i.html?_nkw=',            encode: true, cat: 'shop', color: '#E53238', icon: 'ebay' },
    { id: 'aliexpress', name: 'AliExpress',     domain: 'aliexpress.com',     url: 'https://www.aliexpress.com/wholesale?SearchText=', encode: true, cat: 'shop', color: '#E62E04', icon: 'aliexpress' },
    { id: 'etsy',       name: 'Etsy',           domain: 'etsy.com',           url: 'https://www.etsy.com/search?q=',                   encode: true, cat: 'shop', color: '#F1641E', icon: 'etsy' },
    { id: 'ozon',       name: 'Ozon',           domain: 'ozon.ru',            url: 'https://www.ozon.ru/search/?text=',                encode: true, cat: 'shop', color: '#005BFF', icon: null },
    { id: 'wildberries',name: 'Wildberries',    domain: 'wildberries.ru',     url: 'https://www.wildberries.ru/catalog/0/search.aspx?search=', encode: true, cat: 'shop', color: '#CB11AB', icon: null },

    /* ---------- 09 · Streaming · Global ---------- */
    { id: 'youtube',    name: 'YouTube',        domain: 'youtube.com',        url: 'https://www.youtube.com/results?search_query=',    encode: true, cat: 'stream', color: '#FF0000', icon: 'youtube' },
    { id: 'netflix',    name: 'Netflix',        domain: 'netflix.com',        url: 'https://www.netflix.com/search?q=',                encode: true, cat: 'stream', color: '#E50914', icon: 'netflix' },
    { id: 'spotify',    name: 'Spotify',        domain: 'open.spotify.com',   url: 'https://open.spotify.com/search/',                 encode: true, cat: 'stream', color: '#1DB954', icon: 'spotify' },
    { id: 'applemusic', name: 'Apple Music',    domain: 'music.apple.com',    url: 'https://music.apple.com/us/search?term=',          encode: true, cat: 'stream', color: '#FA2D48', icon: 'applemusic' },
    { id: 'primevideo', name: 'Prime Video',    domain: 'primevideo.com',     url: 'https://www.primevideo.com/search?phrase=',        encode: true, cat: 'stream', color: '#00A8E1', icon: 'primevideo' },
    { id: 'disney',     name: 'Disney+',        domain: 'disneyplus.com',     url: 'https://www.disneyplus.com/search?q=',             encode: true, cat: 'stream', color: '#113CCF', icon: 'disneyplus' },
    { id: 'max',        name: 'Max',            domain: 'play.max.com',       url: 'https://play.max.com/search?q=',                   encode: true, cat: 'stream', color: '#002BE7', icon: null },
    { id: 'hulu',       name: 'Hulu',           domain: 'hulu.com',           url: 'https://www.hulu.com/search?q=',                   encode: true, cat: 'stream', color: '#1CE783', icon: 'hulu' },
    { id: 'twitch',     name: 'Twitch',         domain: 'twitch.tv',          url: 'https://www.twitch.tv/search?term=',               encode: true, cat: 'stream', color: '#9146FF', icon: 'twitch' },
    { id: 'soundcloud', name: 'SoundCloud',     domain: 'soundcloud.com',     url: 'https://soundcloud.com/search?q=',                 encode: true, cat: 'stream', color: '#FF5500', icon: 'soundcloud' },
    { id: 'vimeo',      name: 'Vimeo',          domain: 'vimeo.com',          url: 'https://vimeo.com/search?q=',                      encode: true, cat: 'stream', color: '#1AB7EA', icon: 'vimeo' },
    { id: 'deezer',     name: 'Deezer',         domain: 'deezer.com',         url: 'https://www.deezer.com/search/',                   encode: true, cat: 'stream', color: '#A238FF', icon: 'deezer' },
    { id: 'tidal',      name: 'Tidal',          domain: 'tidal.com',          url: 'https://listen.tidal.com/search?q=',               encode: true, cat: 'stream', color: '#000000', icon: 'tidal' },
    { id: 'bandcamp',   name: 'Bandcamp',       domain: 'bandcamp.com',       url: 'https://bandcamp.com/search?q=',                   encode: true, cat: 'stream', color: '#629AA9', icon: 'bandcamp' },
    { id: 'lastfm',     name: 'Last.fm',        domain: 'last.fm',            url: 'https://www.last.fm/search?q=',                    encode: true, cat: 'stream', color: '#D51007', icon: 'lastdotfm' },
    { id: 'genius',     name: 'Genius',         domain: 'genius.com',         url: 'https://genius.com/search?q=',                     encode: true, cat: 'stream', color: '#FFFF64', icon: 'genius' },
    { id: 'crunchyroll',name: 'Crunchyroll',    domain: 'crunchyroll.com',    url: 'https://www.crunchyroll.com/search?q=',            encode: true, cat: 'stream', color: '#F47521', icon: 'crunchyroll' },
    { id: 'imdb',       name: 'IMDb',           domain: 'imdb.com',           url: 'https://www.imdb.com/find/?q=',                    encode: true, cat: 'stream', color: '#F5C518', icon: 'imdb' },

    /* ---------- 10 · Streaming · RU ---------- */
    { id: 'kinopoisk',  name: 'Кинопоиск',      domain: 'kinopoisk.ru',       url: 'https://www.kinopoisk.ru/index.php?kp_query=',     encode: true, cat: 'streamru', color: '#FF5500', icon: 'kinopoisk' },
    { id: 'yamusic',    name: 'Яндекс Музыка',  domain: 'music.yandex.ru',    url: 'https://music.yandex.ru/search?text=',             encode: true, cat: 'streamru', color: '#FFCC00', icon: null },
    { id: 'rutube',     name: 'RUTUBE',         domain: 'rutube.ru',          url: 'https://rutube.ru/search/?query=',                 encode: true, cat: 'streamru', color: '#14191F', icon: null },
    { id: 'ivi',        name: 'ivi',            domain: 'ivi.ru',             url: 'https://www.ivi.ru/search/?q=',                    encode: true, cat: 'streamru', color: '#FF0064', icon: null },
    { id: 'okko',       name: 'Okko',           domain: 'okko.tv',            url: 'https://okko.tv/search/',                          encode: true, cat: 'streamru', color: '#7B2FF7', icon: null },
    { id: 'vkvideo',    name: 'VK Видео',       domain: 'vk.com/video',       url: 'https://vk.com/search/video?q=',                   encode: true, cat: 'streamru', color: '#0077FF', icon: 'vk' },
    { id: 'zvuk',       name: 'Звук',           domain: 'zvuk.com',           url: 'https://zvuk.com/search?query=',                   encode: true, cat: 'streamru', color: '#7C4DFF', icon: null },
    { id: 'megogo',     name: 'MEGOGO',         domain: 'megogo.ru',          url: 'https://megogo.ru/ru/search-extended?q=',          encode: true, cat: 'streamru', color: '#FF6600', icon: null },
    { id: 'premier',    name: 'PREMIER',        domain: 'premier.one',        url: 'https://premier.one/search?query=',                encode: true, cat: 'streamru', color: '#FF3C2D', icon: null }
];

const ENGINE_MAP = Object.fromEntries(SEARCH_ENGINES.map(e => [e.id, e]));

if (typeof window !== 'undefined') {
    window.CATEGORIES = CATEGORIES;
    window.SEARCH_ENGINES = SEARCH_ENGINES;
    window.ENGINE_MAP = ENGINE_MAP;
}
