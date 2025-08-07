// app.js - All scripts moved from index.html

// Global variables for sections and dots
let sections = [];
let dots = [];

// Initialize navigation after Alpine.js renders
function initializeNavigation() {
    sections = document.querySelectorAll('.scroll-section');
    dots = document.querySelectorAll('.nav-dot');

    // Add scroll event listener
    document.querySelector('.scroll-container').addEventListener('scroll', updateActiveDot);

    // Initialize active state
    updateActiveDot();
}

// Scroll to section function
function scrollToSection(index) {
    const currentSections = document.querySelectorAll('.scroll-section');
    if (currentSections[index]) {
        currentSections[index].scrollIntoView({behavior: 'smooth'});
    }
}

// Update active dot based on scroll position
function updateActiveDot() {
    const currentSections = document.querySelectorAll('.scroll-section');
    const currentDots = document.querySelectorAll('.nav-dot');
    const scrollPosition = document.querySelector('.scroll-container').scrollTop;
    const windowHeight = window.innerHeight;

    currentSections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop - windowHeight / 2 &&
            scrollPosition < sectionBottom - windowHeight / 2) {
            currentDots.forEach(dot => dot.classList.remove('active'));
            if (currentDots[index]) {
                currentDots[index].classList.add('active');
            }
        }
    });
}

// Wait for Alpine.js to render all content
document.addEventListener('alpine:rendered', () => {
    setTimeout(initializeNavigation, 100);
});

// Fallback initialization
setTimeout(initializeNavigation, 1000);

// Alpine.js initialization for lucide icons
document.addEventListener('alpine:init', () => {
    document.addEventListener('alpine:rendered', () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });
});

// Additional listener for x-html content loading
document.addEventListener('alpine:init', () => {
    const observer = new MutationObserver((mutations) => {
        let shouldUpdateIcons = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.querySelector('[data-lucide]')) {
                        shouldUpdateIcons = true;
                    }
                });
            }
        });

        if (shouldUpdateIcons && typeof lucide !== 'undefined') {
            setTimeout(() => {
                lucide.createIcons();
            }, 50);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Mobile menu initialization
document.addEventListener('alpine:rendered', () => {
    const burgerButton = document.querySelector('[data-lucide="menu"]')?.parentElement;
    const mobileMenu = document.getElementById('mobileMenu');
    const closeButton = document.getElementById('closeMenu');

    if (burgerButton && mobileMenu && closeButton) {
        // Open menu
        burgerButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0');
            }, 10);
            document.body.style.overflow = 'hidden';
        });

        // Close menu
        closeButton.addEventListener('click', () => {
            mobileMenu.classList.add('opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        });

        // Close menu when clicking on links
        mobileMenu.querySelectorAll('a, span').forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.add('opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                    document.body.style.overflow = '';
                }, 300);
            });
        });
    }
});

// Alpine.js data and stores
document.addEventListener('alpine:init', () => {
    // Platform Store
    Alpine.store('platform', {
        currentPlatform: 'shopify',
        setPlatform(platform) {
            this.currentPlatform = platform;
            const url = new URL(window.location);
            url.searchParams.set('platform', platform);
            window.history.replaceState({}, '', url);
        },
        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const platformFromUrl = urlParams.get('platform');
            if (platformFromUrl && ['shopify', 'salla'].includes(platformFromUrl)) {
                this.currentPlatform = platformFromUrl;
            }
        }
    });

    // Translation Store
    Alpine.store('translations', {
        currentLang: 'en',
        texts: {
            en: {
                // Hero & Navigation
                trustedCommerce: 'TRUSTED COMMERCE',
                buildTrust: 'Build Trust,<br>Boost Sales',
                scaleBusinessDesc: 'Scale your business with confidence by showcasing authentic customer experiences',
                getStarted: 'Get Started',
                pricing: 'Pricing',
                contactUs: 'Contact us',
                howTo: 'How to',
                demoGen: 'Demo Gen',
                shopify: 'Shopify',
                startFreeTrial: 'Start free trial',
                demoStore: 'Demo Store',

                // Language switcher keys
                language: 'Language',
                english: 'English',
                arabic: 'العربية',

                // Platform switcher keys
                platform: 'Platform',
                platformShopify: 'Shopify',
                platformSalla: 'Salla',
                loginToSalla: 'Login to Salla',

                // Feature Sections
                globalReviews: 'GLOBAL REVIEWS',
                importGlobalTitle: 'Import 1000+ Global Reviews in Minutes',
                importGlobalDesc: 'Multi-platform imports with photos & videos in one click. Build trust with verified reviews from global marketplaces.',
                startImporting: 'Start Importing',
                watchDemo: 'Watch Demo',
                globalTranslation: 'GLOBAL TRANSLATION',
                reviewsLanguageTitle: 'Reviews That Speak Every Language',
                reviewsLanguageDesc: 'Automatic translation based on your markets and customers. Let customers read reviews in their preferred language, breaking down barriers for global engagement.',
                productReviews: 'PRODUCT REVIEWS',
                uniteReviewsTitle: 'Unite Your Product Reviews',
                uniteReviewsDesc: 'Connect similar products, combine their reviews and boost your sales with unified product feedback.',
                instantRatings: 'INSTANT RATINGS',
                zeroDelayTitle: 'Zero Delay,<br>Instant Ratings',
                zeroDelayDesc: 'Display product ratings instantly with no loading time. Stars appear immediately on your product, collection, and home pages.',
                liveDemo: 'Live Demo',
                googleIntegration: 'GOOGLE INTEGRATION',
                reviewsGoogleTitle: 'Your Reviews, Now on Google',
                reviewsGoogleDesc: 'Get more clicks with review-rich Google listings. Boost your visibility and attract more customers by showcasing your reviews directly in search results.',
                connectGoogle: 'Connect Google',
                analytics: 'ANALYTICS',
                dataDrivenTitle: 'Data-Driven Review Power',
                dataDrivenDesc: 'Track sources, languages, and impact in real-time. Make informed decisions with comprehensive analytics and insights from your customer reviews.',
                viewAnalytics: 'View Analytics',
                easyIntegration: 'EASY INTEGRATION',
                oneClickTitle: 'One Click, All Templates',
                oneClickDesc: 'Reviews Everywhere in Seconds. Instant setup across product, collection & home pages with seamless template integration.',
                installNow: 'Install Now',

                // Pricing Section
                pricingTitle: "Boost Your Store's Trust & Sales",
                pricingDescription: 'Start your 16-day free premium trial today',
                priceMonth: '/month',

                // Plans
                planExplorer: 'Explorer',
                planStarter: 'Starter',
                planGrowth: 'Growth',
                planGlobal: 'Global Seller',
                mostValuable: 'Most valuable',

                // Features
                planExplorerFeature1: 'AliExpress reviews',
                planExplorerFeature2: 'Original language only',
                planExplorerFeature3: 'Basic review moderation',
                planExplorerFeature4: 'CSV import (10 published)',
                planExplorerFeature5: 'Automatic + Manual review request',
                planStarterFeature1: 'AliExpress, Shopee, Amazon reviews',
                planStarterFeature2: '1 extra language',
                planStarterFeature3: '5 groups, 10 products each',
                planStarterFeature4: 'Review synchronization',
                planStarterFeature5: 'Unlimited CSV import',
                planGrowthFeature1: 'All supported platforms',
                planGrowthFeature2: '2 extra languages + Live Translation',
                planGrowthFeature3: '10 groups, unlimited products',
                planGrowthFeature4: '100,000 review limit',
                planGrowthFeature5: 'Review synchronization',
                planGlobalFeature1: 'All supported platforms',
                planGlobalFeature2: '4 extra languages + Live Translation',
                planGlobalFeature3: '50 groups, unlimited products',
                planGlobalFeature4: '500,000 review limit',
                planGlobalFeature5: 'Review synchronization',

                // Buttons
                getStarted16DayTrial: 'Get Started - 16 Days Trial',

                // Comparison
                showComparison: 'Show full comparison',
                hideComparison: 'Hide comparison',

                // Comparison Table Headers
                comparisonFeature: 'Feature',
                comparisonExplorer: 'Explorer',
                comparisonStarter: 'Starter',
                comparisonGrowth: 'Growth',
                comparisonGlobal: 'Global Seller',

                // Comparison Table Features
                reviewImport: 'Review Import',
                reviewTranslation: 'Review Translation',
                productGrouping: 'Product Grouping',
                reviewSynchronization: 'Review Synchronization',
                reviewModeration: 'Review Moderation',
                csvImport: 'CSV Import',
                reviewRequest: 'Review Request',
                designCustomization: 'Design Customization',
                reviewLimit: 'Review Limit',
                advancedStats: 'Advanced Statistics',

                // Comparison Table Values
                aliExpress: 'AliExpress',
                aliExpressShopeeAmazon: 'AliExpress, Shopee, Amazon',
                allPlatforms: 'All supported platforms',
                originalLanguageOnly: 'Translate original language only',
                oneExtraLanguage: '1 extra language',
                twoExtraLanguagesLive: '2 extra languages + Live Translation',
                fourExtraLanguagesLive: '4 extra languages + Live Translation',
                fiveGroupsTenProducts: '5 groups, 10 products each',
                tenGroupsUnlimited: '10 groups, unlimited products',
                fiftyGroupsUnlimited: '50 groups, unlimited products',
                unlimitedTenPublished: 'Unlimited (10 published)',
                unlimited: 'Unlimited',
                automaticManual: 'Automatic + Manual',
                reviewLimit500: '500',
                reviewLimit40k: '40,000',
                reviewLimit100k: '100,000',
                reviewLimit500k: '500,000',

                // Footer keys
                footerDescription: 'Amplify Your Store\'s Credibility and Sales',
                quickLinks: 'Quick Links',
                revuNovaOnShopify: 'RevuNova on Shopify',
                youTubeChannel: 'YouTube Channel',
                contact: 'Contact',
                stayUpdated: 'Stay Updated',
                enterEmail: 'Enter your email',
                subscribe: 'Subscribe',
                allRightsReserved: 'RevuNova. All rights reserved.'
            },
            ar: {
                // Hero & Navigation
                trustedCommerce: 'تجارة موثوقة',
                buildTrust: 'ابنِ الثقة،<br>عزز مبيعاتك',
                scaleBusinessDesc: 'وسّع نطاق عملك بثقة من خلال عرض تجارب العملاء الحقيقية',
                getStarted: 'ابدأ الآن',
                pricing: 'الأسعار',
                contactUs: 'تواصل معنا',
                howTo: 'كيفية الاستخدام',
                demoGen: 'إنشاء عرض',
                shopify: 'شوبيفاي',
                startFreeTrial: 'ابدأ التجربة المجانية',
                demoStore: 'متجر تجريبي',

                // Language switcher keys
                language: 'اللغة',
                english: 'الإنجليزية',
                arabic: 'العربية',

                // Platform switcher keys
                platform: 'المنصة',
                platformShopify: 'شوبيفاي',
                platformSalla: 'سلة',
                loginToSalla: 'تسجيل الدخول إلى سلة',

                // Feature Sections
                globalReviews: 'مراجعات عالمية',
                importGlobalTitle: 'استورد أكثر من 1000 مراجعة عالمية في دقائق',
                importGlobalDesc: 'استيراد من منصات متعددة مع الصور ومقاطع الفيديو بنقرة واحدة. ابنِ الثقة بمراجعات موثوقة من الأسواق العالمية.',
                startImporting: 'ابدأ الاستيراد',
                watchDemo: 'شاهد العرض',
                globalTranslation: 'ترجمة عالمية',
                reviewsLanguageTitle: 'مراجعات تتحدث كل اللغات',
                reviewsLanguageDesc: 'ترجمة تلقائية بناءً على أسواقك وعملائك. دع العملاء يقرؤون المراجعات بلغتهم المفضلة.',
                productReviews: 'مراجعات المنتجات',
                uniteReviewsTitle: 'وحّد مراجعات منتجاتك',
                uniteReviewsDesc: 'اربط المنتجات المتشابهة، واجمع مراجعاتها، وعزز مبيعاتك بتعليقات موحدة.',
                instantRatings: 'تقييمات فورية',
                zeroDelayTitle: 'بدون تأخير،<br>تقييمات فورية',
                zeroDelayDesc: 'اعرض تقييمات المنتج على الفور دون أي وقت تحميل. تظهر النجوم فورًا.',
                liveDemo: 'عرض حي',
                googleIntegration: 'تكامل مع جوجل',
                reviewsGoogleTitle: 'مراجعاتك، الآن على جوجل',
                reviewsGoogleDesc: 'احصل على المزيد من النقرات مع قوائم جوجل الغنية بالمراجعات. عزز ظهورك.',
                connectGoogle: 'ربط مع جوجل',
                analytics: 'التحليلات',
                dataDrivenTitle: 'قوة المراجعات المبنية على البيانات',
                dataDrivenDesc: 'تتبع المصادر واللغات والتأثير في الوقت الفعلي. اتخذ قرارات مستنيرة.',
                viewAnalytics: 'عرض التحليلات',
                easyIntegration: 'تكامل سهل',
                oneClickTitle: 'نقرة واحدة، كل القوالب',
                oneClickDesc: 'مراجعات في كل مكان في ثوانٍ. إعداد فوري عبر صفحات المنتج والمجموعة.',
                installNow: 'ثبّت الآن',

                // Pricing Section
                pricingTitle: 'عزز ثقة ومبيعات متجرك',
                pricingDescription: 'ابدأ تجربتك المميزة المجانية لمدة 16 يومًا اليوم',
                priceMonth: '/شهر',

                // Plans
                planExplorer: 'المستكشف',
                planStarter: 'المبتدئ',
                planGrowth: 'النمو',
                planGlobal: 'البائع العالمي',
                mostValuable: 'الأكثر قيمة',

                // Features
                planExplorerFeature1: 'مراجعات AliExpress',
                planExplorerFeature2: 'اللغة الأصلية فقط',
                planExplorerFeature3: 'إدارة أساسية للمراجعات',
                planExplorerFeature4: 'استيراد CSV (10 منشورة)',
                planExplorerFeature5: 'طلب مراجعة تلقائي + يدوي',
                planStarterFeature1: 'مراجعات AliExpress, Shopee, Amazon',
                planStarterFeature2: 'لغة إضافية واحدة',
                planStarterFeature3: '5 مجموعات، 10 منتجات لكل منها',
                planStarterFeature4: 'مزامنة المراجعات',
                planStarterFeature5: 'استيراد CSV غير محدود',
                planGrowthFeature1: 'جميع المنصات المدعومة',
                planGrowthFeature2: 'لغتان إضافيتان + ترجمة حية',
                planGrowthFeature3: '10 مجموعات، منتجات غير محدودة',
                planGrowthFeature4: 'حد 100,000 مراجعة',
                planGrowthFeature5: 'مزامنة المراجعات',
                planGlobalFeature1: 'جميع المنصات المدعومة',
                planGlobalFeature2: '4 لغات إضافية + ترجمة حية',
                planGlobalFeature3: '50 مجموعة، منتجات غير محدودة',
                planGlobalFeature4: 'حد 500,000 مراجعة',
                planGlobalFeature5: 'مزامنة المراجعات',

                // Buttons
                getStarted16DayTrial: 'ابدأ - تجربة 16 يومًا',

                // Comparison
                showComparison: 'عرض المقارنة الكاملة',
                hideComparison: 'إخفاء المقارنة',

                // Comparison Table Headers
                comparisonFeature: 'الميزة',
                comparisonExplorer: 'المستكشف',
                comparisonStarter: 'المبتدئ',
                comparisonGrowth: 'النمو',
                comparisonGlobal: 'البائع العالمي',

                // Comparison Table Features
                reviewImport: 'استيراد المراجعات',
                reviewTranslation: 'ترجمة المراجعات',
                productGrouping: 'تجميع المنتجات',
                reviewSynchronization: 'مزامنة المراجعات',
                reviewModeration: 'إدارة المراجعات',
                csvImport: 'استيراد CSV',
                reviewRequest: 'طلب مراجعة',
                designCustomization: 'تخصيص التصميم',
                reviewLimit: 'حد المراجعات',
                advancedStats: 'إحصائيات متقدمة',

                // Comparison Table Values
                aliExpress: 'AliExpress',
                aliExpressShopeeAmazon: 'AliExpress, Shopee, Amazon',
                allPlatforms: 'جميع المنصات المدعومة',
                originalLanguageOnly: 'ترجمة اللغة الأصلية فقط',
                oneExtraLanguage: 'لغة إضافية واحدة',
                twoExtraLanguagesLive: 'لغتان إضافيتان + ترجمة حية',
                fourExtraLanguagesLive: '4 لغات إضافية + ترجمة حية',
                fiveGroupsTenProducts: '5 مجموعات، 10 منتجات لكل منها',
                tenGroupsUnlimited: '10 مجموعات، منتجات غير محدودة',
                fiftyGroupsUnlimited: '50 مجموعة، منتجات غير محدودة',
                unlimitedTenPublished: 'غير محدود (10 منشورة)',
                unlimited: 'غير محدود',
                automaticManual: 'تلقائي + يدوي',
                reviewLimit500: '500',
                reviewLimit40k: '40,000',
                reviewLimit100k: '100,000',
                reviewLimit500k: '500,000',

                // Footer keys
                footerDescription: 'عزز مصداقية متجرك ومبيعاتك',
                quickLinks: 'روابط سريعة',
                revuNovaOnShopify: 'RevuNova على شوبيفاي',
                youTubeChannel: 'قناة يوتيوب',
                contact: 'اتصل بنا',
                stayUpdated: 'ابق محدثاً',
                enterEmail: 'أدخل بريدك الإلكتروني',
                subscribe: 'اشتراك',
                allRightsReserved: 'RevuNova. جميع الحقوق محفوظة.'
            }
        },
        t(key) {
            return this.texts[this.currentLang]?.[key] || this.texts.en[key] || key;
        },
        setLanguage(lang) {
            this.currentLang = lang;
            const url = new URL(window.location);
            url.searchParams.set('lang', lang);
            window.history.replaceState({}, '', url);

            if (lang === 'ar') {
                document.documentElement.setAttribute('dir', 'rtl');
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
            }
        },
        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const langFromUrl = urlParams.get('lang');
            if (langFromUrl && this.texts[langFromUrl]) {
                this.setLanguage(langFromUrl);
            } else {
                this.setLanguage(this.currentLang);
            }
        }
    });

    // Feature Sections Data
    Alpine.data('featureSections', () => ({
        sections: [
            {
                gradient: 'from-[#0A0500] via-[#1A0800] to-[#2A1500]',
                badge: {
                    get text() { return Alpine.store('translations').t('globalReviews'); },
                    color: 'text-[#FF9933]'
                },
                get title() { return Alpine.store('translations').t('importGlobalTitle'); },
                get description() { return Alpine.store('translations').t('importGlobalDesc'); },
                buttons: {
                    primary: {
                        get text() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? Alpine.store('translations').t('loginToSalla')
                                : Alpine.store('translations').t('startImporting');
                        },
                        get url() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? 'http://salla.revunova.com/login'
                                : 'https://apps.shopify.com/revunova';
                        },
                        get icon() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? '#sallaIcon'
                                : '#shopify-icon';
                        },
                        bg: 'bg-[#FF9933]',
                        hover: 'hover:bg-[#FFB366]'
                    },
                    secondary: {
                        get text() { return Alpine.store('translations').t('watchDemo'); },
                        border: 'border-[#FF9933]',
                        hover: 'hover:bg-[#FF9933]/10',
                        url: 'https://youtu.be/xqM0eRYo_r8?t=35'
                    }
                },
                image: 's2.png'
            },
            {
                gradient: 'from-[#1A0B4E] via-[#2B1B7E] to-[#0BC7F0]',
                badge: {
                    get text() { return Alpine.store('translations').t('globalTranslation'); },
                    color: 'text-[#0BC7F0]'
                },
                get title() { return Alpine.store('translations').t('reviewsLanguageTitle'); },
                get description() { return Alpine.store('translations').t('reviewsLanguageDesc'); },
                buttons: {
                    primary: {
                        get text() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? Alpine.store('translations').t('loginToSalla')
                                : Alpine.store('translations').t('getStarted');
                        },
                        get url() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? 'http://salla.revunova.com/login'
                                : 'https://apps.shopify.com/revunova';
                        },
                        get icon() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? '#sallaIcon'
                                : '#shopify-icon';
                        },
                        bg: 'bg-[#0BC7F0]',
                        hover: 'hover:bg-[#1AD7FF]'
                    },
                    secondary: {
                        get text() { return Alpine.store('translations').t('watchDemo'); },
                        border: 'border-[#0BC7F0]',
                        hover: 'hover:bg-[#0BC7F0]/10',
                        url: 'https://youtu.be/xqM0eRYo_r8?t=133'
                    }
                },
                image: 's333333333.png'
            },
            {
                gradient: 'from-black via-[#1A0505] to-[#3B0808]',
                badge: {
                    get text() { return Alpine.store('translations').t('productReviews'); },
                    color: 'text-[#FF6B6B]'
                },
                get title() { return Alpine.store('translations').t('uniteReviewsTitle'); },
                get description() { return Alpine.store('translations').t('uniteReviewsDesc'); },
                buttons: {
                    primary: {
                        get text() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? Alpine.store('translations').t('loginToSalla')
                                : Alpine.store('translations').t('getStarted');
                        },
                        get url() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? 'http://salla.revunova.com/login'
                                : 'https://apps.shopify.com/revunova';
                        },
                        get icon() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? '#sallaIcon'
                                : '#shopify-icon';
                        },
                        bg: 'bg-[#FF6B6B]',
                        hover: 'hover:bg-[#FF8585]'
                    },
                    secondary: {
                        get text() { return Alpine.store('translations').t('watchDemo'); },
                        border: 'border-[#FF6B6B]',
                        hover: 'hover:bg-[#FF6B6B]/10',
                        url: 'https://www.youtube.com/watch?v=V3Vfe3aWOMQ'
                    }
                },
                image: 's5.png'
            },
            {
                gradient: 'from-[#1A0B2E] via-[#2B1B4E] to-[#0B1B3E]',
                badge: {
                    get text() { return Alpine.store('translations').t('instantRatings'); },
                    color: 'text-[#FF1B8D]'
                },
                get title() { return Alpine.store('translations').t('zeroDelayTitle'); },
                get description() { return Alpine.store('translations').t('zeroDelayDesc'); },
                buttons: {
                    primary: {
                        get text() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? Alpine.store('translations').t('loginToSalla')
                                : Alpine.store('translations').t('getStarted');
                        },
                        get url() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? 'http://salla.revunova.com/login'
                                : 'https://apps.shopify.com/revunova';
                        },
                        get icon() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? '#sallaIcon'
                                : '#shopify-icon';
                        },
                        bg: 'bg-[#FF1B8D]',
                        hover: 'hover:bg-[#FF4DA6]'
                    },
                    secondary: {
                        get text() { return Alpine.store('translations').t('liveDemo'); },
                        border: 'border-[#FF1B8D]',
                        hover: 'hover:bg-[#FF1B8D]/10',
                        url: 'https://revunova.myshopify.com/products/bose-soundlink-flex-bluetooth-speaker-stone-blue?_bt=BAh7BkkiC19yYWlscwY6BkVUewhJIglkYXRhBjsAVEkiG3JldnVub3ZhLm15c2hvcGlmeS5jb20GOwBGSSIIZXhwBjsAVEkiHTIwMjUtMDEtMjdUMjE6MTE6NTcuNzk5WgY7AFRJIghwdXIGOwBUSSIecGVybWFuZW50X3Bhc3N3b3JkX2J5cGFzcwY7AEY%3D--6b2c69346d557a126fbd50439c92960e4874d342'
                    }
                },
                image: 's6.png',
                imageClass: 'w-90 max-md:mb-12 object-contain'
            },
            {
                gradient: 'from-[#050303] via-[#2E0B0B] to-[#4E1B2B]',
                badge: {
                    get text() { return Alpine.store('translations').t('googleIntegration'); },
                    color: 'text-[#FF7676]'
                },
                get title() { return Alpine.store('translations').t('reviewsGoogleTitle'); },
                get description() { return Alpine.store('translations').t('reviewsGoogleDesc'); },
                buttons: {
                    primary: {
                        get text() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? Alpine.store('translations').t('loginToSalla')
                                : Alpine.store('translations').t('connectGoogle');
                        },
                        get url() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? 'http://salla.revunova.com/login'
                                : 'https://apps.shopify.com/revunova';
                        },
                        get icon() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? '#sallaIcon'
                                : '#shopify-icon';
                        },
                        bg: 'bg-[#FF7676]',
                        hover: 'hover:bg-[#FF9494]'
                    }
                },
                image: 's7777.png',
                imageClass: 'max-md:mb-12 w-90 max-h-[70vh] object-contain'
            },
            {
                gradient: 'from-[#1B0311] via-[#350C25] to-[#7F2276]',
                badge: {
                    get text() { return Alpine.store('translations').t('analytics'); },
                    color: 'text-[#FF69B4]'
                },
                get title() { return Alpine.store('translations').t('dataDrivenTitle'); },
                get description() { return Alpine.store('translations').t('dataDrivenDesc'); },
                buttons: {
                    primary: {
                        get text() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? Alpine.store('translations').t('loginToSalla')
                                : Alpine.store('translations').t('viewAnalytics');
                        },
                        get url() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? 'http://salla.revunova.com/login'
                                : 'https://apps.shopify.com/revunova';
                        },
                        get icon() {
                            return Alpine.store('platform').currentPlatform === 'salla'
                                ? '#sallaIcon'
                                : '#shopify-icon';
                        },
                        bg: 'bg-[#FF69B4]',
                        hover: 'hover:bg-[#FF85C2]'
                    }
                },
                image: 's4.png',
                imageClass: 'max-md:mb-12 w-90 max-h-[70vh] object-contain'
            }
        ]
    }));

    // Initialize platform store
    Alpine.store('platform').init();
});


function initializeCards() {
    const cards = document.querySelectorAll('.falling-card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from({length: 101}, (_, i) => i / 100)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio; // Visibility ratio
            if (ratio > 0) {
                // Element is in view, move to original position
                entry.target.style.transform = `translateZ(0) translateY(${(1 - ratio) * -200}px)`;
                entry.target.style.opacity = `${ratio}`;
            } else {
                // Element is out of view, move upwards and fade out
                entry.target.style.transform = `translateZ(300px) translateY(-200px)`;
                entry.target.style.opacity = '0';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}

window.addEventListener('load', () => {
    initializeCards();
});
