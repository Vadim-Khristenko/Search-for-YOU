// Search engine configurations
const SEARCH_ENGINES = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        encode: true
    },
    yandex: {
        name: 'Yandex',
        url: 'https://yandex.ru/search/?text=',
        encode: true
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search?q=',
        encode: true
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=',
        encode: true
    }
};

// Animation states
const LOADING_MESSAGES = [
    'Поиск ответа...',
    'Сканирую интернет...',
    'Анализирую данные...',
    'Обрабатываю результаты...',
    'Обнаружено совпадение!'
];

class SearchForYou {
    constructor() {
        this.currentEngine = 'google';
        this.isAnimating = false;
        
        this.initializeElements();
        this.bindEvents();
        this.checkUrlParameters();
    }

    initializeElements() {
        // Form elements
        this.searchForm = document.getElementById('search-form');
        this.queryInput = document.getElementById('query-input');
        this.customUrlInput = document.getElementById('custom-url');
        this.engineButtons = document.querySelectorAll('.engine-btn');
        this.shareBtn = document.getElementById('share-btn');
        this.copyBtn = document.getElementById('copy-btn');
        
        // Display elements
        this.shareResult = document.getElementById('share-result');
        this.shareUrl = document.getElementById('share-url');
        this.loadingScreen = document.getElementById('loading-screen');
        this.successScreen = document.getElementById('success-screen');
        this.loadingText = document.getElementById('loading-text');
        this.typingCursor = document.querySelector('.typing-cursor');
    }

    bindEvents() {
        // Form submission
        this.searchForm.addEventListener('submit', (e) => this.handleSearch(e));
        
        // Engine selection
        this.engineButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.selectEngine(e));
        });
        
        // Share functionality
        this.shareBtn.addEventListener('click', () => this.generateShareUrl());
        this.copyBtn.addEventListener('click', () => this.copyToClipboard());
        
        // Input events
        this.queryInput.addEventListener('input', () => this.hideShareResult());
        this.customUrlInput.addEventListener('input', () => this.hideShareResult());
    }

    checkUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        const engine = urlParams.get('engine');
        const customUrl = urlParams.get('custom');

        if (query) {
            // This is a shared link - start the animation sequence
            this.startSharedLinkAnimation(query, engine, customUrl);
        }
    }

    async startSharedLinkAnimation(query, engine, customUrl) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Set the query in the input
        this.queryInput.value = '';
        
        // Set the engine if provided
        if (engine && SEARCH_ENGINES[engine]) {
            this.selectEngineByName(engine);
        }

        // Start typing animation
        await this.typeText(query);
        
        // Start search animation
        await this.playSearchAnimation();
        
        // Show success screen
        await this.showSuccessScreen();
        
        // Redirect to search results or custom URL
        this.redirectToResults(query, engine, customUrl);
    }

    async typeText(text) {
        this.typingCursor.classList.add('active');
        
        for (let i = 0; i <= text.length; i++) {
            this.queryInput.value = text.substring(0, i);
            await this.delay(100 + Math.random() * 100); // Variable typing speed
        }
        
        this.typingCursor.classList.remove('active');
        await this.delay(500);
    }

    async playSearchAnimation() {
        this.loadingScreen.classList.remove('hidden');
        
        for (let i = 0; i < LOADING_MESSAGES.length; i++) {
            this.loadingText.textContent = LOADING_MESSAGES[i];
            await this.delay(800 + Math.random() * 400);
        }
    }

    async showSuccessScreen() {
        this.loadingScreen.classList.add('hidden');
        this.successScreen.classList.remove('hidden');
        await this.delay(1500);
    }

    redirectToResults(query, engine, customUrl) {
        if (customUrl) {
            window.location.href = customUrl;
        } else {
            const searchEngine = SEARCH_ENGINES[engine] || SEARCH_ENGINES[this.currentEngine];
            const searchUrl = searchEngine.url + (searchEngine.encode ? encodeURIComponent(query) : query);
            window.location.href = searchUrl;
        }
    }

    handleSearch(e) {
        e.preventDefault();
        
        const query = this.queryInput.value.trim();
        const customUrl = this.customUrlInput.value.trim();
        
        if (!query) {
            this.queryInput.focus();
            return;
        }

        if (customUrl) {
            // Direct redirect to custom URL
            window.location.href = customUrl;
        } else {
            // Redirect to search engine
            const searchEngine = SEARCH_ENGINES[this.currentEngine];
            const searchUrl = searchEngine.url + encodeURIComponent(query);
            window.location.href = searchUrl;
        }
    }

    selectEngine(e) {
        // Remove active class from all buttons
        this.engineButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Set current engine
        this.currentEngine = e.target.dataset.engine;
        
        // Hide share result if visible
        this.hideShareResult();
    }

    selectEngineByName(engineName) {
        this.currentEngine = engineName;
        
        // Update UI
        this.engineButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.engine === engineName) {
                btn.classList.add('active');
            }
        });
    }

    generateShareUrl() {
        const query = this.queryInput.value.trim();
        const customUrl = this.customUrlInput.value.trim();
        
        if (!query) {
            this.queryInput.focus();
            return;
        }

        // Build URL parameters
        const params = new URLSearchParams();
        params.set('q', query);
        params.set('engine', this.currentEngine);
        
        if (customUrl) {
            params.set('custom', customUrl);
        }

        // Generate the share URL
        const baseUrl = window.location.origin + window.location.pathname;
        const shareUrl = `${baseUrl}?${params.toString()}`;
        
        // Display the share URL
        this.shareUrl.value = shareUrl;
        this.shareResult.classList.remove('hidden');
        this.shareResult.classList.add('fade-in');
        
        // Scroll to share result
        this.shareResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.shareUrl.value);
            
            // Visual feedback
            const originalText = this.copyBtn.querySelector('.copy-text').textContent;
            this.copyBtn.querySelector('.copy-text').textContent = 'Скопировано!';
            this.copyBtn.classList.add('copied');
            
            setTimeout(() => {
                this.copyBtn.querySelector('.copy-text').textContent = originalText;
                this.copyBtn.classList.remove('copied');
            }, 2000);
            
        } catch (err) {
            // Fallback for older browsers
            this.shareUrl.select();
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = this.copyBtn.querySelector('.copy-text').textContent;
            this.copyBtn.querySelector('.copy-text').textContent = 'Скопировано!';
            this.copyBtn.classList.add('copied');
            
            setTimeout(() => {
                this.copyBtn.querySelector('.copy-text').textContent = originalText;
                this.copyBtn.classList.remove('copied');
            }, 2000);
        }
    }

    hideShareResult() {
        this.shareResult.classList.add('hidden');
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Enhanced animations with performance optimization
class AnimationHelper {
    static addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        document.querySelectorAll('.search-container, .footer').forEach(el => {
            observer.observe(el);
        });
    }

    static addHoverEffects() {
        // Add subtle hover effects to interactive elements
        const buttons = document.querySelectorAll('button, .engine-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    static optimizeAnimations() {
        // Reduce animations for users who prefer reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
            
            // Add CSS to disable animations
            const style = document.createElement('style');
            style.textContent = `
                .reduce-motion *,
                .reduce-motion *::before,
                .reduce-motion *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Performance monitoring
class PerformanceMonitor {
    static init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            
            // Check bundle size
            this.checkBundleSize();
        });
    }

    static checkBundleSize() {
        const resources = performance.getEntriesByType('resource');
        let totalSize = 0;
        
        resources.forEach(resource => {
            if (resource.transferSize) {
                totalSize += resource.transferSize;
            }
        });
        
        console.log('Total resources size:', (totalSize / 1024).toFixed(2), 'KB');
        
        if (totalSize > 512 * 1024) { // 512KB limit
            console.warn('Bundle size exceeds 512KB target');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    new SearchForYou();
    
    // Initialize animation helpers
    AnimationHelper.addScrollAnimations();
    AnimationHelper.addHoverEffects();
    AnimationHelper.optimizeAnimations();
    
    // Initialize performance monitoring
    PerformanceMonitor.init();
    
    console.log('SearchForYou initialized successfully! 🔍');
});

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // We could register a service worker here for caching
        // navigator.serviceWorker.register('/sw.js');
    });
}