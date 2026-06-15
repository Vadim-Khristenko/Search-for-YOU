/* ============================================================
   SearchForYou — localization (EN / RU)
   Keys bind to [data-i18n] (text) and [data-i18n-placeholder].
   ============================================================ */

const I18N = {
    en: {
        'meta.tagline': 'A directory of the whole search world.',

        'hero.kicker': 'NO.001 — SEARCH DIRECTORY',
        'hero.line1': 'Every',
        'hero.line2': 'engine.',
        'hero.line3': 'One prompt.',
        'hero.lead': 'Sixty-plus search sources — web, privacy, answers, academia, the indie old web, maps, shops and streaming, Russian and global. Pick one. Run it. Share it with cinema.',

        'cmd.label': 'QUERY',
        'cmd.placeholder': 'type, then hit run…',
        'cmd.run': 'RUN',
        'cmd.surprise': 'RANDOM',
        'cmd.share': 'SHARE',
        'cmd.custom': 'custom URL',

        'dir.heading': 'THE DIRECTORY',
        'dir.selected': 'SELECTED',
        'dir.count': 'sources',

        'cat.web': 'Web',
        'cat.privacy': 'Privacy',
        'cat.answers': 'Answers',
        'cat.academic': 'Academic',
        'cat.indie': 'Indie / Old Web',
        'cat.dev': 'Developer',
        'cat.maps': 'Maps',
        'cat.shop': 'Shopping',
        'cat.stream': 'Streaming · Global',
        'cat.streamru': 'Streaming · RU',

        'share.heading': 'SHAREABLE LINK',
        'share.copy': 'COPY',
        'share.copied': 'COPIED',
        'share.hint': 'Send it to anyone — they get the full boot-up search sequence before the results.',

        'success.title': 'MATCH FOUND',
        'success.subtitle': 'routing you to the source',

        'foot.note': 'Static. No backend, no cookies, no tracking. Yours to fork.',
        'foot.theme': 'THEME',
        'foot.skin': 'SKIN',

        'ctrl.lang': 'RU',
        'ctrl.theme': 'LIGHT',
        'ctrl.themeBack': 'DARK',
        'ctrl.skin': 'OLD WEB',
        'ctrl.skinBack': 'MODERN',

        'toast.needQuery': 'Type something to search first.',
        'toast.copied': 'Link copied.',
        'toast.copyFail': 'Copy failed — select the link manually.',
        'toast.random': 'Rolled →',

        'win.title': 'SearchForYou.exe',
        'win.menu1': 'File',
        'win.menu2': 'Edit',
        'win.menu3': 'Search',
        'win.menu4': 'Help',
        'win.start': 'Start',

        'boot.0': 'init search-for-you …',
        'boot.1': 'resolving source …',
        'boot.2': 'opening socket …',
        'boot.3': 'dispatching query …',
        'boot.4': 'match found.'
    },

    ru: {
        'meta.tagline': 'Каталог всего поискового мира.',

        'hero.kicker': '№001 — КАТАЛОГ ПОИСКА',
        'hero.line1': 'Любой',
        'hero.line2': 'поисковик.',
        'hero.line3': 'Один запрос.',
        'hero.lead': 'Более шестидесяти источников — веб, приватность, ответы, наука, инди-олдвеб, карты, магазины и стриминг, российский и мировой. Выбери. Запусти. Поделись с эффектом кино.',

        'cmd.label': 'ЗАПРОС',
        'cmd.placeholder': 'введите и нажмите «пуск»…',
        'cmd.run': 'ПУСК',
        'cmd.surprise': 'СЛУЧАЙНО',
        'cmd.share': 'ПОДЕЛИТЬСЯ',
        'cmd.custom': 'своя ссылка',

        'dir.heading': 'КАТАЛОГ',
        'dir.selected': 'ВЫБРАНО',
        'dir.count': 'источников',

        'cat.web': 'Веб',
        'cat.privacy': 'Приватность',
        'cat.answers': 'Ответы',
        'cat.academic': 'Наука',
        'cat.indie': 'Инди / Олдвеб',
        'cat.dev': 'Разработка',
        'cat.maps': 'Карты',
        'cat.shop': 'Покупки',
        'cat.stream': 'Стриминг · Мир',
        'cat.streamru': 'Стриминг · РФ',

        'share.heading': 'ССЫЛКА ДЛЯ ОТПРАВКИ',
        'share.copy': 'КОПИЯ',
        'share.copied': 'ГОТОВО',
        'share.hint': 'Отправьте кому угодно — получатель увидит полную «загрузочную» сцену поиска перед результатами.',

        'success.title': 'СОВПАДЕНИЕ',
        'success.subtitle': 'направляем к источнику',

        'foot.note': 'Статика. Без бэкенда, cookies и трекинга. Форкайте свободно.',
        'foot.theme': 'ТЕМА',
        'foot.skin': 'СКИН',

        'ctrl.lang': 'EN',
        'ctrl.theme': 'СВЕТ',
        'ctrl.themeBack': 'ТЬМА',
        'ctrl.skin': 'СТАРЫЙ ВЕБ',
        'ctrl.skinBack': 'СОВРЕМ.',

        'toast.needQuery': 'Сначала введите запрос.',
        'toast.copied': 'Ссылка скопирована.',
        'toast.copyFail': 'Не удалось скопировать — выделите ссылку вручную.',
        'toast.random': 'Выпало →',

        'win.title': 'SearchForYou.exe',
        'win.menu1': 'Файл',
        'win.menu2': 'Правка',
        'win.menu3': 'Поиск',
        'win.menu4': 'Справка',
        'win.start': 'Пуск',

        'boot.0': 'запуск search-for-you …',
        'boot.1': 'поиск источника …',
        'boot.2': 'открываю сокет …',
        'boot.3': 'отправляю запрос …',
        'boot.4': 'совпадение найдено.'
    }
};

if (typeof window !== 'undefined') {
    window.I18N = I18N;
}
