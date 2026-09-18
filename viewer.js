/**
 * Demo walkthrough viewer - drawer navigation, keyboard, touch, preloading.
 */
(function () {
    'use strict';

    // --- Layout breakpoints ---
    var DRAWER_AUTO_OPEN_MIN = 1480;    // drawer starts open above this width
    // A page built from the shell with its own content (guide, sample data):
    // the drawer and overlays work, the slide viewer stays hidden and the
    // URL and meta tags are the page's own.
    var PAGE = document.body.getAttribute('data-page');
    function siteRoot() { return window.SITE_ROOT || ''; }
    var DRAWER_KEEP_OPEN_MIN = 2000;    // keep drawer open after scenario switch above this width

    // --- Analytics ---
    function registerEvent(path, title) {
        if (window.goatcounter && goatcounter.count) {
            goatcounter.count({ path: path, title: title, event: true });
        }
    }

    function registerPageView(path) {
        if (window.goatcounter && goatcounter.count) {
            goatcounter.count({ path: path });
        }
    }

    // --- State ---
    let currentScenarioId = null;
    let currentSlideIndex = 0;
    let renderGeneration = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    // --- DOM refs ---
    const drawerItems = document.querySelectorAll('.drawer-item[data-scenario]');
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.querySelector('.drawer-close');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const slideImage = document.querySelector('.slide-image');
    const slideArea = document.querySelector('.slide-area');
    const slideContent = document.querySelector('.slide-content');
    const captionGroup = document.querySelector('.caption-group');
    const captionTitle = document.querySelector('.caption-title');
    const captionDescription = document.querySelector('.caption-description');
    const captionDisclaimer = document.querySelector('.caption-disclaimer');
    const slideCounter = document.querySelector('.slide-counter');
    const progressFill = document.querySelector('.progress-fill');
    const navPrev = document.querySelector('.nav-prev');
    const navNext = document.querySelector('.nav-next');
    const captionBar = document.querySelector('.caption-bar');
    const captionLeft = document.querySelector('.caption-left');
    const footerDisclaimer = document.querySelector('.footer-disclaimer');

    // --- Overflow chevrons (mobile/tablet) ---
    function createChevron() {
        const span = document.createElement('span');
        span.className = 'overflow-chevron';
        span.innerHTML = '<span class="overflow-more" aria-hidden="true">\u2026</span>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="6 9 12 15 18 9"></polyline></svg>';
        return span;
    }

    const captionChevron = createChevron();
    document.querySelector('.caption-right').appendChild(captionChevron);

    const footerChevron = createChevron();
    footerDisclaimer.parentNode.appendChild(footerChevron);

    const drawerSecondary = document.querySelector('.drawer-menu-secondary');
    const drawerSecondaryChevron = createChevron();
    drawerSecondary.parentNode.insertBefore(drawerSecondaryChevron, drawerSecondary.nextSibling);

    function checkOverflow(el, chevron) {
        if (el.scrollHeight > el.clientHeight + 2) {
            chevron.classList.add('visible');
        } else {
            chevron.classList.remove('visible');
            chevron.classList.remove('flipped');
            el.classList.remove('expanded');
        }
    }

    function toggleExpand(el, chevron) {
        const expanding = !el.classList.contains('expanded');
        el.classList.toggle('expanded');
        chevron.classList.toggle('flipped', expanding);
    }

    // Caption bar: tap to expand, tap image to collapse
    captionBar.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        if (captionChevron.classList.contains('visible')) {
            toggleExpand(captionLeft, captionChevron);
            sizeSlideImage();
        }
    });

    slideArea.addEventListener('click', function () {
        if (captionLeft.classList.contains('expanded')) {
            captionLeft.classList.remove('expanded');
            captionChevron.classList.remove('flipped');
            sizeSlideImage();
        }
    });

    // Footer disclaimer: tap to expand/collapse
    footerDisclaimer.addEventListener('click', function () {
        if (footerChevron.classList.contains('visible')) {
            toggleExpand(footerDisclaimer, footerChevron);
        }
    });
    footerChevron.addEventListener('click', function () {
        if (footerChevron.classList.contains('visible')) {
            toggleExpand(footerDisclaimer, footerChevron);
        }
    });

    // Drawer secondary menu: tap to expand/collapse
    drawerSecondary.addEventListener('click', function () {
        if (drawerSecondaryChevron.classList.contains('visible')) {
            toggleExpand(drawerSecondary, drawerSecondaryChevron);
        }
    });
    drawerSecondaryChevron.addEventListener('click', function () {
        if (drawerSecondaryChevron.classList.contains('visible')) {
            toggleExpand(drawerSecondary, drawerSecondaryChevron);
        }
    });

    function updateOverflowIndicators() {
        checkOverflow(captionLeft, captionChevron);
        checkOverflow(footerDisclaimer, footerChevron);
        checkOverflow(drawerSecondary, drawerSecondaryChevron);
        if (!csvOverlay.hidden) checkOverflow(csvCaptionText, csvCaptionChevron);
        // Markdown slide chevron
        var mdDiv = slideContent.querySelector('.slide-markdown');
        var mdChev = slideContent.querySelector('.md-chevron');
        if (mdDiv && mdChev) {
            if (mdDiv.classList.contains('expanded')) {
                mdChev.classList.add('visible');
            } else {
                checkOverflow(mdDiv, mdChev);
            }
        }
    }

    // --- Drawer ---
    let drawerOpen = window.innerWidth > DRAWER_AUTO_OPEN_MIN ? true : false;

    function openDrawer() {
        drawerOpen = true;
        drawer.classList.remove('closed');
        document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
        drawerOpen = false;
        drawer.classList.add('closed');
        document.body.classList.remove('drawer-open');
    }

    function toggleDrawer() {
        if (drawerOpen) 
            closeDrawer();
        else 
            openDrawer();
    }

    // Position drawer between header and footer
    function positionDrawer() {
        const stripRect = document.getElementById('topic-strip').getBoundingClientRect();
        const footerRect = document.querySelector('.site-footer').getBoundingClientRect();
        drawer.style.top = stripRect.bottom + 'px';
        drawer.style.bottom = (window.innerHeight - footerRect.top + 1) + 'px';
    }
    // Size image to fit available space
    function slideRoom() {
        // The slide area is centred in its container and may overflow it, so the container is the measure.
        const style = getComputedStyle(slideArea);
        return document.querySelector('.viewer-container').clientHeight
            - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    }

    function sizeSlideImage() {
        const available = slideRoom();
        slideImage.style.maxHeight = available + 'px';
        // Also size placeholders and markdown, which keep their chevron under them
        document.querySelectorAll('.slide-placeholder, .slide-markdown').forEach(el => {
            const chevron = el.nextElementSibling;
            let chevronH = 0;
            if (chevron && chevron.classList.contains('md-chevron')) {
                // Reserve the chevron's room whether or not it shows yet.
                const hidden = !chevron.classList.contains('visible');
                if (hidden) chevron.classList.add('visible');
                chevronH = chevron.offsetHeight;
                if (hidden) chevron.classList.remove('visible');
            }
            el.style.maxHeight = (available - chevronH) + 'px';
        });
    }

    positionDrawer();
    sizeSlideImage();
    window.addEventListener('resize', () => { positionDrawer(); sizeSlideImage(); updateOverflowIndicators(); });

    if (drawerOpen) 
        openDrawer();
    else
        closeDrawer();

    hamburgerBtn.addEventListener('click', toggleDrawer);
    drawerClose.addEventListener('click', closeDrawer);

    // --- Helpers ---
    // Scenario order derived from drawer DOM, not from SCENARIOS object
    const scenarioOrder = Array.from(drawerItems).map(item => item.dataset.scenario);

    function getScenario(id) {
        return SCENARIOS[id];
    }

    function getCurrentScenario() {
        return getScenario(currentScenarioId);
    }

    function getCurrentSlide() {
        const scenario = getCurrentScenario();
        return scenario ? scenario.slides[currentSlideIndex] : null;
    }

    // --- Preloading ---
    const preloadCache = new Set();

    function preloadImage(src) {
        if (!src || preloadCache.has(src)) return;
        preloadCache.add(src);
        const img = new Image();
        img.src = src;
    }

    function preloadAround(scenarioId, index) {
        const scenario = getScenario(scenarioId);
        if (!scenario) return;
        for (let offset = -1; offset <= 2; offset++) {
            const i = (index + offset + scenario.slides.length) % scenario.slides.length;
            const slide = scenario.slides[i];
            if (slide && slide.image) preloadImage(slide.image);
        }
    }

    // --- Rendering ---
    function renderSlide() {
        const scenario = getCurrentScenario();
        const slide = getCurrentSlide();
        if (!scenario || !slide) return;

        const total = scenario.slides.length;

        // Clear existing placeholder/markdown/chevron and restore caption
        const existing = slideContent.querySelectorAll('.slide-placeholder, .slide-markdown, .md-chevron');
        existing.forEach(el => el.remove());
        slideContent.classList.remove('slide-content-column');
        captionBar.style.display = '';

        if (slide.placeholder) {
            slideImage.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'slide-placeholder';
            placeholder.innerHTML = '<div class="slide-placeholder-icon">&#128247;</div>' +
                '<div>Screenshot coming soon</div>';
            slideContent.appendChild(placeholder);
        } else if (slide.markdown) {
            slideImage.style.display = 'none';
            const mdDiv = document.createElement('div');
            mdDiv.className = 'slide-markdown';
            mdDiv.innerHTML = slide.markdown;
            slideContent.classList.add('slide-content-column');
            slideContent.appendChild(mdDiv);
            // Chevron - sibling after markdown div
            const mdChev = createChevron();
            mdChev.className = 'overflow-chevron md-chevron';
            slideContent.appendChild(mdChev);
            mdChev.addEventListener('click', function () {
                if (mdChev.classList.contains('visible')) {
                    toggleExpand(mdDiv, mdChev);
                    if (mdDiv.classList.contains('expanded')) {
                        captionBar.style.display = 'none';
                        mdDiv.style.setProperty('max-height', (slideRoom() - mdChev.offsetHeight) + 'px', 'important');
                    } else {
                        captionBar.style.display = '';
                        sizeSlideImage();
                    }
                }
            });
        } else {
            slideImage.style.display = '';
            slideImage.classList.remove('loaded');
            slideImage.classList.add('loading');
            slideImage.alt = slide.title;

            renderGeneration++;
            var expectedGeneration = renderGeneration;
            const img = new Image();
            img.onload = function () {
                if (expectedGeneration !== renderGeneration) return;
                slideImage.src = img.src;
                slideImage.classList.remove('loading');
                slideImage.classList.add('loaded');
                sizeSlideImage();
            };
            img.onerror = function () {
                if (expectedGeneration !== renderGeneration) return;
                slideImage.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'slide-placeholder';
                placeholder.innerHTML = '<div class="slide-placeholder-icon">&#128247;</div>' +
                    '<div>Image not available</div>';
                slideContent.appendChild(placeholder);
            };
            img.src = slide.image;
        }

        // Caption; the welcome slide closing every reel says it all itself
        captionGroup.textContent = slide.group || '';
        captionTitle.textContent = slide.title || '';
        captionDescription.innerHTML = slide.group === 'WELCOME' ? '' : (slide.description || '').replace(/\n/g, '<br>');
        captionDisclaimer.textContent = slide.disclaimer || '';

        // Counter
        slideCounter.textContent = (currentSlideIndex + 1) + ' / ' + total;

        // Progress
        const pct = total > 1 ? (currentSlideIndex / (total - 1)) * 100 : 100;
        progressFill.style.width = pct + '%';

        // Arrows - always enabled (wrap around). Set real hrefs so Googlebot sees an internal
        // link from every slide to its neighbours (enables deep indexing of all slides in a reel).
        const prevIdx = (currentSlideIndex - 1 + total) % total;
        const nextIdx = (currentSlideIndex + 1) % total;
        navPrev.setAttribute('href', '?s=' + currentScenarioId + '/' + (prevIdx + 1));
        navNext.setAttribute('href', '?s=' + currentScenarioId + '/' + (nextIdx + 1));
        navPrev.classList.remove('disabled');
        navNext.classList.remove('disabled');

        // Preload neighbors
        preloadAround(currentScenarioId, currentSlideIndex);

        // Reset expanded state on slide change
        captionLeft.classList.remove('expanded');
        captionChevron.classList.remove('flipped');

        // Update URL, canonical, meta tags, and sizing - defer sizing to next frame so caption bar has reflowed
        updateURL();
        updateMetaTags();
        requestAnimationFrame(function () {
            sizeSlideImage();
            // Force reflow before checking overflow so maxHeight is applied
            void document.body.offsetHeight;
            updateOverflowIndicators();
        });
    }

    function switchScenario(scenarioId, slideId = 0) {
        const landing = scenarioId !== currentScenarioId;
        currentScenarioId = scenarioId;
        currentSlideIndex = slideId;
        if (landing && !mobileNotice.hidden) hideMobileNotice();

        // Update drawer active state
        drawerItems.forEach(item => {
            item.classList.toggle('active', item.dataset.scenario === scenarioId);
        });

        // Close drawer on small screens after scenario switch
        if (drawerOpen)
        {
            if (window.innerWidth <= DRAWER_KEEP_OPEN_MIN) {
                closeDrawer();
            }
        }

        renderSlide();
        updateTopicStrip();
        if (landing) showMobileNotice(scenarioId);
    }

    function goToSlide(index) {
        const scenario = getCurrentScenario();
        if (!scenario) return;
        hideMobileNotice();
        // Wrap around
        const total = scenario.slides.length;
        currentSlideIndex = ((index % total) + total) % total;
        renderSlide();
    }

    function nextSlide() {
        goToSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentSlideIndex - 1);
    }

    // --- Event Handlers ---

    // Let ctrl/cmd/shift/middle-click fall through so users can open links in new tabs.
    function isPlainLeftClick(e) {
        return !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0;
    }

    // Drawer item clicks
    drawerItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (PAGE || !isPlainLeftClick(e)) return;
            e.preventDefault();
            registerEvent('click/reel/' + item.dataset.scenario, item.dataset.scenario);
            switchScenario(item.dataset.scenario);
        });
    });

    // Topic strip: the current reel or page lit, chips open in place
    const topicStrip = document.getElementById('topic-strip');
    const topicChips = Array.from(topicStrip.querySelectorAll('.topic-chip'));
    const STRIP_TOPICS = topicChips.map(chip => chip.dataset.topic);

    function updateTopicStrip() {
        let topic = PAGE ? 'more' : (currentStateParam() || '').split('/')[0];
        if (STRIP_TOPICS.indexOf(topic) === -1) topic = 'more';
        topicChips.forEach(chip => {
            const active = chip.dataset.topic === topic;
            chip.classList.toggle('active', active);
            if (active) chip.setAttribute('aria-current', 'page');
            else chip.removeAttribute('aria-current');
            if (active && topicStrip.scrollWidth > topicStrip.clientWidth) {
                topicStrip.scrollLeft = chip.offsetLeft - (topicStrip.clientWidth - chip.offsetWidth) / 2;
            }
        });
    }

    topicChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            if (chip.dataset.topic === 'more') {
                e.preventDefault();
                registerEvent('click/topic/more', 'more');
                toggleDrawer();
                return;
            }
            if (PAGE || !isPlainLeftClick(e)) return;
            e.preventDefault();
            registerEvent('click/topic/' + chip.dataset.topic, chip.textContent);
            applyState(chip.dataset.topic + '/1');
        });
    });

    // On a phone, a floating note under the strip on the first landing on a
    // chart reel, once per browser session; the first move or the x removes it.
    const mobileNotice = document.getElementById('mobile-notice');
    const NOTICE_REELS = ['highlights', 'full-reel'];

    function showMobileNotice(scenarioId) {
        let shown = false;
        try { shown = sessionStorage.getItem('mobileNoticeShown') === '1'; } catch (err) { shown = false; }
        if (shown || window.innerWidth > 600 || NOTICE_REELS.indexOf(scenarioId) === -1) return;
        mobileNotice.style.top = topicStrip.getBoundingClientRect().bottom + 'px';
        mobileNotice.hidden = false;
        try { sessionStorage.setItem('mobileNoticeShown', '1'); } catch (err) { /* private mode */ }
    }

    function hideMobileNotice() {
        mobileNotice.hidden = true;
    }

    mobileNotice.querySelector('.mobile-notice-close').addEventListener('click', hideMobileNotice);

    // Arrow clicks - preventDefault on plain left-click so we stay in SPA mode. ctrl/cmd/shift/
    // middle-click fall through so the adjacent-slide link opens in a new tab.
    navPrev.addEventListener('click', function (e) {
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        prevSlide();
    });
    navNext.addEventListener('click', function (e) {
        if (!isPlainLeftClick(e)) return;
        e.preventDefault();
        nextSlide();
    });

    // Keyboard
    document.addEventListener('keydown', (e) => {
        // Don't handle keys when help or drawer is open
        const helpOverlay = document.getElementById('help-overlay');

        switch (e.key) {
            case 'ArrowLeft':
                if (!csvOverlay.hidden) {
                    e.preventDefault();
                    switchCsvTab(-1);
                } else if (helpOverlay.hidden) {
                    e.preventDefault();
                    prevSlide();
                }
                break;
            case 'ArrowRight':
                if (!csvOverlay.hidden) {
                    e.preventDefault();
                    switchCsvTab(1);
                } else if (helpOverlay.hidden) {
                    e.preventDefault();
                    nextSlide();
                }
                break;
            case 'Home':
                if (helpOverlay.hidden && csvOverlay.hidden) {
                    e.preventDefault();
                    goToSlide(0);
                }
                break;
            case 'End':
                if (helpOverlay.hidden && csvOverlay.hidden && getCurrentScenario()) {
                    e.preventDefault();
                    goToSlide(getCurrentScenario().slides.length - 1);
                }
                break;
            case 'Escape':
                e.preventDefault();
                if (!csvOverlay.hidden) {
                    closeCSV();
                } else if (!helpOverlay.hidden) {
                    closeHelp();
                } else if (drawerOpen) {
                    closeDrawer();
                } else {
                    goToSlide(0);
                }
                break;
            case '?':
                if (!e.ctrlKey && !e.metaKey && !e.altKey && csvOverlay.hidden) {
                    e.preventDefault();
                    if (helpOverlay.hidden) openHelp();
                    else closeHelp();
                }
                break;
            case 'm':
            case 'M':
                if (!e.ctrlKey && !e.metaKey && !e.altKey && helpOverlay.hidden && csvOverlay.hidden) {
                    toggleDrawer();
                }
                break;
        }

        // Number keys switch scenarios (based on drawer order)
        if (e.key >= '1' && e.key <= String(scenarioOrder.length) && !e.ctrlKey && !e.metaKey && !e.altKey) {
            if (helpOverlay.hidden && csvOverlay.hidden) {
                const idx = parseInt(e.key) - 1;
                if (idx < scenarioOrder.length) {
                    switchScenario(scenarioOrder[idx]);
                }
            }
        }
    });

    // Touch/swipe
    const viewer = document.querySelector('.viewer-container');

    let multiTouch = false;
    viewer.addEventListener('touchstart', (e) => {
        if (e.touches.length > 1) { multiTouch = true; return; }
        multiTouch = false;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    viewer.addEventListener('touchend', (e) => {
        // A pinch (two fingers at any point of the gesture) zooms; it never turns the page.
        if (multiTouch) {
            if (e.touches.length === 0) multiTouch = false;
            return;
        }
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) nextSlide();
            else prevSlide();
        }
    }, { passive: true });

    // Handle interactive links inside markdown slides
    slideContent.addEventListener('click', function (e) {
        var drawerLink = e.target.closest('.slide-open-drawer');
        if (drawerLink) {
            e.preventDefault();
            registerEvent('click/open-drawer', 'Open drawer (slide)');
            openDrawer();
            return;
        }
        var csvLink = e.target.closest('.slide-open-csv');
        if (csvLink) {
            e.preventDefault();
            registerEvent('click/csv-viewer', 'Browse Example Data (slide)');
            openCSV();
            return;
        }
        var storeLink = e.target.closest('.welcome-store-link');
        if (storeLink) {
            registerEvent('click/store', 'Microsoft Store (welcome)');
            return;
        }
    });

    // Delegated handler for any in-page <a href="?s=..."> link (welcome slide, caption copy, etc.).
    // Drawer items and nav arrows have their own handlers - skip them here to avoid double-firing.
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;
        if (link.classList.contains('drawer-item') || link.classList.contains('nav-arrow')) return;
        var href = link.getAttribute('href') || '';
        if (href.indexOf('?s=') !== 0) return;
        var stateParam = href.slice(3);
        registerEvent('click/link?s=' + stateParam, link.textContent);
        if (isPlainLeftClick(e)) {
            e.preventDefault();
            applyState(stateParam);
        }
    });

    // Prevent image dragging
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    // --- Help Panel ---
    const drawerHelpBtn = document.getElementById('drawer-help-btn');
    const helpOverlay = document.getElementById('help-overlay');
    const helpClose = document.querySelector('.help-close');
    const helpBody = document.getElementById('help-body');
    const helpTitle = helpOverlay.querySelector('.help-panel-header h2');
    // The two documents the overlay shows: the guide and the CSV reference it links to.
    const HELP_DOCS = {
        'guide': { file: 'usage-guide.html', title: 'User Guide', path: 'guide/',
            description: 'How to install, capture telemetry, review CSV output, generate analysis charts, and prepare LLM analysis requests with PyFy Telemetry F1.' },
        'csv-format': { file: 'csv-format.html', title: 'CSV Output Format', path: 'csv-format/',
            description: 'The CSV output format of PyFy Telemetry F1: every column of the per-lap and per-turn telemetry files, what it measures, its unit and how it is derived.' }
    };
    const helpLoaded = {};
    let helpDoc = 'guide';

    function openHelp(doc) {
        doc = HELP_DOCS[doc] ? doc : 'guide';
        if (doc !== helpDoc || !helpLoaded[doc]) {
            helpDoc = doc;
            helpTitle.textContent = HELP_DOCS[doc].title;
            loadHelp(doc);
        }
        helpOverlay.hidden = false;
        updateURL();
        updateMetaTags();
        updateTopicStrip();
    }

    function closeHelp() {
        helpOverlay.hidden = true;
        updateURL();
        updateMetaTags();
        updateTopicStrip();
    }

    function loadHelp(doc) {
        helpBody.innerHTML = '<p class="help-loading">Loading...</p>';
        fetch(siteRoot() + HELP_DOCS[doc].file)
            .then(r => {
                if (!r.ok) throw new Error('Not found');
                return r.text();
            })
            .then(html => {
                if (doc !== helpDoc) return;
                helpBody.innerHTML = html;
                helpBody.scrollTop = 0;
                helpLoaded[doc] = true;
            })
            .catch(() => {
                if (doc !== helpDoc) return;
                helpBody.innerHTML = '<p>' + HELP_DOCS[doc].title + ' not available yet. ' +
                    'Visit the <a href="https://github.com/pyfytelemetryf1/pyfytelemetryf1-releases" ' +
                    'target="_blank" rel="noopener">GitHub repository</a> for documentation.</p>';
                helpLoaded[doc] = true;
            });
    }

    drawerHelpBtn.addEventListener('click', function (e) {
        if (PAGE || !isPlainLeftClick(e)) return;
        e.preventDefault();
        registerEvent('click/user-guide', 'User Guide');
        openHelp('guide');
    });
    helpClose.addEventListener('click', closeHelp);
    helpOverlay.addEventListener('click', (e) => {
        if (e.target === helpOverlay) closeHelp();
    });

    // Back-to-top button in usage guide
    helpBody.addEventListener('scroll', () => {
        const btn = document.getElementById('guide-back-to-top');
        if (btn) {
            btn.classList.toggle('visible', helpBody.scrollTop > 200);
        }
    });
    helpBody.addEventListener('click', (e) => {
        if (e.target.id === 'guide-back-to-top') {
            helpBody.scrollTo({ top: 0, behavior: 'smooth' });
        }
        const docLink = e.target.closest('a[href="csv-format/"], a[href="guide/"]');
        if (docLink && isPlainLeftClick(e)) {
            e.preventDefault();
            registerEvent('click/' + docLink.getAttribute('href').slice(0, -1), docLink.textContent);
            openHelp(docLink.getAttribute('href').slice(0, -1));
            return;
        }
        // Handle TOC anchor clicks - scroll within the panel
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const targetId = decodeURIComponent(link.getAttribute('href').slice(1));
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    // --- CSV Viewer ---
    const csvOverlay = document.getElementById('csv-overlay');
    const csvClose = document.querySelector('.csv-close');
    const csvTabs = document.querySelectorAll('.csv-tab');
    const csvTableWrap = document.getElementById('csv-table-wrap');
    const csvCaptionLabel = document.querySelector('.csv-caption-label');
    const csvCaptionText = document.querySelector('.csv-caption-text');
    const drawerCsvBtn = document.getElementById('drawer-csv-btn');
    let csvCache = {};

    // The sample files and the column rules come from data-manifest.js,
    // built from templates/pages/sample-data.json.
    const SAMPLE = window.SAMPLE_DATA || { files: [], columns: {
        hidden: { laps: [], turns: [] }, summary_source: 'turn_positions',
        summary_label: '', trim_suffixes: [], rename: {} } };
    const CSV_FILES = {};
    SAMPLE.files.forEach(function (f) { CSV_FILES[f.key] = f; });
    const HIDDEN_COLS = SAMPLE.columns.hidden;
    const SUFFIX_TRIM = SAMPLE.columns.trim_suffixes;
    const HEADER_RENAME = SAMPLE.columns.rename;
    let activeCsvKey = SAMPLE.files.length ? SAMPLE.files[0].key : '';

    function parseCSV(text, fileKey) {
        const lines = text.replace(/\r/g, '').trim().split('\n');
        if (lines.length === 0) return { headers: [], rows: [], displayHeaders: [] };
        const rawHeaders = lines[0].split(',');
        const isLaps = fileKey.indexOf('_laps') !== -1;
        const isTurns = !isLaps;
        const hidden = isLaps ? HIDDEN_COLS.laps : HIDDEN_COLS.turns;

        // Find the summary source column index (turn_positions) for the ellipsis cell
        let summarySourceIdx = -1;
        if (isTurns) {
            for (let si = 0; si < rawHeaders.length; si++) {
                if (rawHeaders[si] === SAMPLE.columns.summary_source) { summarySourceIdx = si; break; }
            }
        }

        // Build visible column indices
        const visibleIdx = [];
        for (let i = 0; i < rawHeaders.length; i++) {
            if (hidden.indexOf(rawHeaders[i]) === -1) visibleIdx.push(i);
        }

        const headers = [];
        const displayHeaders = [];
        for (let v = 0; v < visibleIdx.length; v++) {
            const h = rawHeaders[visibleIdx[v]];
            headers.push(h);
            // Apply explicit renames first
            let dh = HEADER_RENAME[h] || h;
            // Trim trailing _ms / _sec for display
            for (let s = 0; s < SUFFIX_TRIM.length; s++) {
                if (dh.length > SUFFIX_TRIM[s].length && dh.slice(-SUFFIX_TRIM[s].length) === SUFFIX_TRIM[s]) {
                    dh = dh.slice(0, -SUFFIX_TRIM[s].length);
                    break;
                }
            }
            displayHeaders.push(dh);
        }

        // Append summary column for turns
        if (isTurns) {
            headers.push('_series_summary');
            displayHeaders.push(SAMPLE.columns.summary_label);
        }

        const rows = [];
        for (let r = 1; r < lines.length; r++) {
            if (!lines[r].trim()) continue;
            const allCols = lines[r].split(',');
            const row = [];
            for (let v2 = 0; v2 < visibleIdx.length; v2++) {
                row.push(allCols[visibleIdx[v2]] || '');
            }
            // Append summary value: turn_positions truncated with ellipsis
            if (isTurns && summarySourceIdx >= 0) {
                const positions = allCols[summarySourceIdx] || '';
                // Show first few values then ellipsis
                const parts = positions.split('|');
                let preview = parts.slice(0, 5).join('|');
                if (parts.length > 5) preview += '|\u2026';
                row.push(preview);
            } else if (isTurns) {
                row.push('\u2026');
            }
            rows.push(row);
        }
        return { headers: headers, displayHeaders: displayHeaders, rows: rows };
    }

    function classifyValue(val) {
        if (val === 'True') return 'csv-val-true';
        if (val === 'False') return 'csv-val-false';
        if (val !== '' && !isNaN(val) && val.indexOf('|') === -1 && val.indexOf(';') === -1) return 'csv-val-num';
        return '';
    }

    function formatValue(val, header) {
        // Trim lap_id to counter + lap suffix (e.g. _001_L2)
        if (header === 'lap_id') {
            var parts = val.split('_');
            if (parts.length >= 2) return parts.slice(-2).join('_');
        }
        // A measurement written with more than 3 decimals (a distance, a fuel
        // load) is shown to 1; times and gaps keep their 3.
        if (val === '' || isNaN(val) || val.indexOf('|') !== -1 || val.indexOf(';') !== -1) return val;
        var n = Number(val);
        if (!isFinite(n)) return val;
        if (val.indexOf('.') !== -1 && val.split('.')[1].length > 3) {
            return n.toFixed(1);
        }
        return val;
    }

    function renderCSVTable(data) {
        const isSummary = data.headers[data.headers.length - 1] === '_series_summary';
        const lastIdx = data.displayHeaders.length - 1;
        let html = '<table class="csv-table"><thead><tr>';
        for (let h = 0; h < data.displayHeaders.length; h++) {
            if (isSummary && h === lastIdx) {
                html += '<th class="csv-val-summary">' + escapeHTML(data.displayHeaders[h]) + '</th>';
            } else if (data.headers[h] === 'timestamp_utc') {
                html += '<th class="csv-col-ts">' + escapeHTML(data.displayHeaders[h]) + '</th>';
            } else {
                html += '<th>' + escapeHTML(data.displayHeaders[h]) + '</th>';
            }
        }
        html += '</tr></thead><tbody>';
        for (let r = 0; r < data.rows.length; r++) {
            html += '<tr>';
            for (let c = 0; c < data.displayHeaders.length; c++) {
                const val = data.rows[r][c];
                if (isSummary && c === lastIdx) {
                    html += '<td class="csv-val-summary">' + escapeHTML(val) + '</td>';
                } else {
                    const cls = data.headers[c] === 'timestamp_utc' ? 'csv-col-ts' : classifyValue(val);
                    const display = formatValue(val, data.headers[c]);
                    html += '<td' + (cls ? ' class="' + cls + '"' : '') + '>' + escapeHTML(display) + '</td>';
                }
            }
            html += '</tr>';
        }
        html += '</tbody></table>';
        return html;
    }

    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function loadCSV(key) {
        activeCsvKey = key;
        csvTabs.forEach(function (tab) {
            const isActive = tab.dataset.csv === key;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        if (!csvOverlay.hidden) {
            updateURL();
            updateMetaTags();
        }

        if (csvCache[key]) {
            showCSVData(csvCache[key]);
            return;
        }

        csvTableWrap.innerHTML = '<p class="csv-loading">Loading data...</p>';

        fetch(siteRoot() + CSV_FILES[key].url)
            .then(function (r) {
                if (!r.ok) throw new Error('Not found');
                return r.text();
            })
            .then(function (text) {
                const data = parseCSV(text, key);
                csvCache[key] = data;
                if (activeCsvKey === key) showCSVData(data);
            })
            .catch(function () {
                csvTableWrap.innerHTML = '<p class="csv-loading">Could not load CSV file.</p>';
            });
    }

    const csvCaptionChevron = createChevron();
    csvCaptionChevron.classList.add('csv-caption-chevron');
    csvCaptionText.parentNode.appendChild(csvCaptionChevron);
    csvCaptionText.addEventListener('click', function () {
        if (csvCaptionChevron.classList.contains('visible')) toggleExpand(csvCaptionText, csvCaptionChevron);
    });
    csvCaptionChevron.addEventListener('click', function () {
        if (csvCaptionChevron.classList.contains('visible')) toggleExpand(csvCaptionText, csvCaptionChevron);
    });

    function updateCSVCaption() {
        const entry = CSV_FILES[activeCsvKey] || { label: '', description: '' };
        csvCaptionLabel.textContent = entry.label;
        csvCaptionText.textContent = entry.description;
        csvCaptionText.classList.remove('expanded');
        csvCaptionChevron.classList.remove('flipped');
        checkOverflow(csvCaptionText, csvCaptionChevron);
    }

    function showCSVData(data) {
        csvTableWrap.innerHTML = renderCSVTable(data);
        csvTableWrap.scrollTop = 0;
        csvTableWrap.scrollLeft = 0;
        updateCSVCaption();
    }

    function openCSV() {
        csvOverlay.hidden = false;
        if (!csvCache[activeCsvKey]) loadCSV(activeCsvKey);
        updateURL();
        updateMetaTags();
        updateTopicStrip();
        updateOverflowIndicators();
    }

    function closeCSV() {
        csvOverlay.hidden = true;
        updateURL();
        updateMetaTags();
        updateTopicStrip();
    }

    const csvKeyOrder = Object.keys(CSV_FILES);

    function switchCsvTab(direction) {
        const idx = csvKeyOrder.indexOf(activeCsvKey);
        const next = ((idx + direction) % csvKeyOrder.length + csvKeyOrder.length) % csvKeyOrder.length;
        loadCSV(csvKeyOrder[next]);
    }

    drawerCsvBtn.addEventListener('click', function (e) {
        if (PAGE || !isPlainLeftClick(e)) return;
        e.preventDefault();
        registerEvent('click/csv-viewer', 'Browse Example Data');
        openCSV();
    });
    csvClose.addEventListener('click', closeCSV);
    csvOverlay.addEventListener('click', function (e) {
        if (e.target === csvOverlay) closeCSV();
    });

    csvTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            loadCSV(tab.dataset.csv);
        });
    });

    // --- URL state routing (?s=scenario/slide or ?s=data/csvKey) ---
    const DEFAULT_STATE = 'highlights/1';
    const CANONICAL_ROOT = 'https://pyfytelemetryf1.github.io/demo/';

    function currentStateParam() {
        if (!helpOverlay.hidden) return helpDoc;
        if (!csvOverlay.hidden) return 'data/' + activeCsvKey;
        if (currentScenarioId) return currentScenarioId + '/' + (currentSlideIndex + 1);
        return null;
    }

    function buildCanonical(s) {
        if (!s || (s === DEFAULT_STATE && !window.location.search)) return CANONICAL_ROOT;
        // The overlays are the in-page view of two pages of their own.
        if (HELP_DOCS[s]) return CANONICAL_ROOT + HELP_DOCS[s].path;
        if (s.indexOf('data/') === 0) return CANONICAL_ROOT + 'sample-data/';
        return CANONICAL_ROOT + '?s=' + s;
    }

    function updateURL() {
        if (PAGE) return;
        const s = currentStateParam();
        if (!s) return;
        const currentSearch = window.location.search;
        // Don't pollute the root URL with ?s=highlights/1 on initial load
        if (!currentSearch && s === DEFAULT_STATE) return;
        const newSearch = '?s=' + s;
        if (currentSearch !== newSearch) {
            history.replaceState(null, '', newSearch);
            registerPageView('/?s=' + s);
        }
    }

    function updateMetaTags() {
        if (PAGE) return;
        const s = currentStateParam();
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute('href', buildCanonical(s));
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', buildCanonical(s));

        // Overlays: generic titles, not slide-specific
        if (!helpOverlay.hidden) {
            const doc = HELP_DOCS[helpDoc];
            document.title = doc.title + ' - PyFy Telemetry';
            setMeta('description', doc.description);
            setMeta('og:title', doc.title + ' - PyFy Telemetry');
            setMeta('og:description', doc.description);
            return;
        }
        if (!csvOverlay.hidden) {
            const entry = CSV_FILES[activeCsvKey] || { label: 'Telemetry Data', description: '' };
            document.title = 'Example Telemetry Data: ' + entry.label + ' - PyFy Telemetry';
            setMeta('description', entry.description.slice(0, 200));
            setMeta('og:title', 'Example Telemetry Data: ' + entry.label + ' - PyFy Telemetry');
            setMeta('og:description', entry.description.slice(0, 200));
            return;
        }

        const slide = getCurrentSlide();
        if (!slide) return;
        const title = (slide.title || 'Demo') + ' - PyFy Telemetry';
        document.title = title;
        if (slide.description) {
            const plainDesc = slide.description.replace(/<[^>]*>/g, '').slice(0, 200);
            setMeta('description', plainDesc);
            setMeta('og:title', title);
            setMeta('og:description', plainDesc);
        }
    }

    function setMeta(name, content) {
        const selector = name.indexOf(':') === -1
            ? 'meta[name="' + name + '"]'
            : 'meta[property="' + name + '"]';
        const el = document.querySelector(selector);
        if (el) el.setAttribute('content', content);
    }

    function applyState(stateParam) {
        const parts = stateParam.split('/');
        if (HELP_DOCS[parts[0]]) {
            openHelp(parts[0]);
            return true;
        }
        if (parts[0] === 'data') {
            const csvKey = parts[1];
            if (csvKey && CSV_FILES[csvKey]) {
                activeCsvKey = csvKey;
                loadCSV(csvKey);
                openCSV();
            }
            return true;
        }
        const scenario = getScenario(parts[0]);
        if (!scenario) return false;
        if (!helpOverlay.hidden) helpOverlay.hidden = true;
        if (!csvOverlay.hidden) csvOverlay.hidden = true;
        const slideIdx = parts[1] ? parseInt(parts[1]) - 1 : 0;
        switchScenario(parts[0], Math.max(0, Math.min(slideIdx, scenario.slides.length - 1)));
        return true;
    }

    function parseURL() {
        const s = new URLSearchParams(window.location.search).get('s');
        if (s) return applyState(s);
        // Legacy hash fallback (#scenario/slide or #csv/key) - redirects to ?s= via applyState
        const hash = window.location.hash.slice(1);
        if (!hash) return false;
        if (hash.indexOf('csv/') === 0) return applyState('data/' + hash.slice(4));
        return applyState(hash);
    }

    // back/forward within the same document (in case of external links)
    window.addEventListener('popstate', parseURL);

    // --- Init ---
    document.getElementById('header-home').addEventListener('click', function () {
        if (PAGE) { window.location.href = siteRoot() || './'; return; }
        switchScenario('highlights', 0);
        if (window.innerWidth > DRAWER_AUTO_OPEN_MIN) {
            openDrawer();
        }
    });

    // --- External link analytics ---
    document.querySelector('.drawer-footer').addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;
        var href = link.href || '';
        if (href.indexOf('apps.microsoft.com') !== -1) registerEvent('click/store', 'Microsoft Store');
        else if (href.indexOf('/issues/new') !== -1) registerEvent('click/file-issue', 'File an issue');
        else if (href.indexOf('github.com') !== -1) registerEvent('click/github', 'GitHub');
    });

    document.querySelector('.footer-links').addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;
        var href = link.href || '';
        if (href.indexOf('apps.microsoft.com') !== -1) registerEvent('click/store', 'Microsoft Store (footer)');
        else if (href.indexOf('github.com') !== -1) registerEvent('click/github', 'GitHub (footer)');
    });

    // Initialize from URL first, so the original ?s=... (or legacy #...) isn't overwritten by a
    // premature updateURL(). Then, if no scenario ended up loaded (e.g. URL opened only an
    // overlay like ?s=guide / ?s=data/..., or had no state at all), fall back to highlights
    // as the background scenario.
    if (!PAGE) {
        const urlHandled = parseURL();
        if (!currentScenarioId) {
            switchScenario('highlights');
        }
        if (!urlHandled && window.innerWidth > DRAWER_AUTO_OPEN_MIN) {
            openDrawer();
        }
    }

    updateOverflowIndicators();
    updateTopicStrip();

})();
