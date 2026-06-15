/* ============================================================
   SearchForYou — internationalization (EN / RU)
   Keys map to [data-i18n] (textContent) and
   [data-i18n-placeholder] (placeholder attr) in the markup.
   ============================================================ */

const I18N = {
    en: {
        'hero.badge': '25+ search engines · one portal',
        'hero.titleA': 'Search',
        'hero.titleB': 'ForYou',
        'hero.tagline': 'Because you can find it yourself — but we make it cinematic.',
        'hero.sub': 'Mainstream, privacy, AI, academic & indie old-web search in one place.',

        'search.placeholder': 'Type anything…',
        'engines.heading': 'Choose your engine',
        'engines.surprise': 'Surprise me',

        'cat.all': 'All',
        'cat.main': 'Mainstream',
        'cat.privacy': 'Privacy',
        'cat.ai': 'AI',
        'cat.academic': 'Academic',
        'cat.indie': 'Indie / Old Web',
        'cat.dev': 'Developer',

        'custom.summary': 'Or point to a custom URL',
        'actions.search': 'Find the answer',
        'actions.share': 'Share query',

        'share.heading': 'Your shareable link',
        'share.copy': 'Copy',
        'share.copied': 'Copied!',
        'share.description': "Send it to anyone — they'll get the full cinematic search animation before landing on the results.",
        'share.native': 'Share',

        'feat.privacy.t': 'Privacy first',
        'feat.privacy.d': 'No tracking, no cookies, no backend. Pure static, runs entirely in your browser.',
        'feat.engines.t': '25+ engines',
        'feat.engines.d': 'Mainstream, privacy, AI, academic and indie old-web search — all curated for you.',
        'feat.fun.t': 'Cinematic links',
        'feat.fun.d': 'Reply to "just google it" with a link that plays an epic search sequence.',

        'success.title': 'ANSWER FOUND!',
        'success.subtitle': 'Redirecting you now…',

        'footer.text': 'SearchForYou — because you can find it yourself. We just make it look incredible.',
        'footer.made': 'Crafted with',

        'toast.needQuery': 'Type something to search first 🙂',
        'toast.copied': 'Link copied to clipboard!',
        'toast.copyFail': "Couldn't copy — select the link manually.",
        'toast.surprise': 'Engine roulette →',
        'toast.shared': 'Shared!',

        'loading.0': 'Searching…',
        'loading.1': 'Scanning the web…',
        'loading.2': 'Crawling indexes…',
        'loading.3': 'Ranking results…',
        'loading.4': 'Match found!',

        'lang.name': 'EN'
    },

    ru: {
        'hero.badge': '25+ поисковиков · один портал',
        'hero.titleA': 'Search',
        'hero.titleB': 'ForYou',
        'hero.tagline': 'Потому что вы способны найти это сами — а мы сделаем это кинематографично.',
        'hero.sub': 'Массовые, приватные, ИИ, академические и инди-поисковики старого веба — в одном месте.',

        'search.placeholder': 'Введите что угодно…',
        'engines.heading': 'Выберите поисковик',
        'engines.surprise': 'Удиви меня',

        'cat.all': 'Все',
        'cat.main': 'Массовые',
        'cat.privacy': 'Приватность',
        'cat.ai': 'ИИ',
        'cat.academic': 'Академические',
        'cat.indie': 'Инди / Старый веб',
        'cat.dev': 'Для разработчиков',

        'custom.summary': 'Или укажите свою ссылку (Custom URL)',
        'actions.search': 'Найти ответ',
        'actions.share': 'Поделиться запросом',

        'share.heading': 'Ваша ссылка для отправки',
        'share.copy': 'Копировать',
        'share.copied': 'Скопировано!',
        'share.description': 'Отправьте её кому угодно — получатель увидит эпическую анимацию поиска перед переходом к результатам.',
        'share.native': 'Поделиться',

        'feat.privacy.t': 'Приватность прежде всего',
        'feat.privacy.d': 'Без трекинга, cookies и бэкенда. Чистая статика, всё работает прямо в браузере.',
        'feat.engines.t': '25+ поисковиков',
        'feat.engines.d': 'Массовые, приватные, ИИ, академические и инди-поисковики — всё подобрано для вас.',
        'feat.fun.t': 'Кинематографичные ссылки',
        'feat.fun.d': 'Ответьте на «да загугли сам» ссылкой, запускающей эпическую сцену поиска.',

        'success.title': 'ОТВЕТ НАЙДЕН!',
        'success.subtitle': 'Перенаправляем вас…',

        'footer.text': 'SearchForYou — потому что вы способны найти это сами. А мы сделаем это красиво.',
        'footer.made': 'Сделано с',

        'toast.needQuery': 'Сначала введите запрос 🙂',
        'toast.copied': 'Ссылка скопирована в буфер обмена!',
        'toast.copyFail': 'Не удалось скопировать — выделите ссылку вручную.',
        'toast.surprise': 'Рулетка поисковиков →',
        'toast.shared': 'Отправлено!',

        'loading.0': 'Поиск ответа…',
        'loading.1': 'Сканирую интернет…',
        'loading.2': 'Обхожу индексы…',
        'loading.3': 'Ранжирую результаты…',
        'loading.4': 'Совпадение найдено!',

        'lang.name': 'RU'
    }
};

if (typeof window !== 'undefined') {
    window.I18N = I18N;
}
