/**
 * Demo walkthrough viewer — drawer navigation, keyboard, touch, preloading.
 */
(function () {
    'use strict';

    // --- State ---
    let currentScenarioId = null;
    let currentSlideIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let welcomeActive = true;

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
    const slideWelcome = document.getElementById('slide-welcome');
    const captionBar = document.querySelector('.caption-bar');
    const welcomeCsvLink = document.getElementById('welcome-csv-link');
    const welcomeWalkthroughLink = document.getElementById('welcome-walkthrough-link');
    const captionLeft = document.querySelector('.caption-left');
    const footerDisclaimer = document.querySelector('.footer-disclaimer');

    // --- Overflow chevrons (mobile/tablet) ---
    function createChevron() {
        const span = document.createElement('span');
        span.className = 'overflow-chevron';
        span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="12" height="12"><polyline points="6 9 12 15 18 9"></polyline></svg>';
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
    captionBar.addEventListener('click', function () {
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
    }

    // --- Drawer ---
    let drawerOpen = window.innerWidth > 1480 ? true : false;

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
        const headerRect = document.querySelector('.site-header').getBoundingClientRect();
        const footerRect = document.querySelector('.site-footer').getBoundingClientRect();
        drawer.style.top = headerRect.bottom + 'px';
        drawer.style.bottom = (window.innerHeight - footerRect.top + 1) + 'px';
    }
    // Size image to fit available space
    function sizeSlideImage() {
        const headerH = document.querySelector('.site-header').getBoundingClientRect().height;
        const captionH = document.querySelector('.caption-bar').getBoundingClientRect().height;
        const footerH = document.querySelector('.site-footer').getBoundingClientRect().height;
        const available = window.innerHeight - headerH - captionH - footerH - 40;
        slideImage.style.maxHeight = available + 'px';
        // Also size placeholders
        document.querySelectorAll('.slide-placeholder, .slide-markdown').forEach(el => {
            el.style.maxHeight = available + 'px';
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

    // --- Welcome screen ---
    function showWelcome() {
        welcomeActive = true;
        currentScenarioId = null;
        slideWelcome.hidden = false;
        slideContent.style.display = 'none';
        navPrev.style.display = 'none';
        navNext.style.display = 'none';
        captionBar.style.display = 'none';
        drawerItems.forEach(item => item.classList.remove('active'));
        history.replaceState(null, '', window.location.pathname);
    }

    function hideWelcome() {
        welcomeActive = false;
        slideWelcome.hidden = true;
        slideContent.style.display = '';
        navPrev.style.display = '';
        navNext.style.display = '';
        captionBar.style.display = '';
    }

    // --- Rendering ---
    function renderSlide() {
        const scenario = getCurrentScenario();
        const slide = getCurrentSlide();
        if (!scenario || !slide) return;
        if (welcomeActive) hideWelcome();

        const total = scenario.slides.length;

        // Clear existing placeholder/markdown
        const existing = slideContent.querySelectorAll('.slide-placeholder, .slide-markdown');
        existing.forEach(el => el.remove());

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
            slideContent.appendChild(mdDiv);
        } else {
            slideImage.style.display = '';
            slideImage.classList.remove('loaded');
            slideImage.classList.add('loading');
            slideImage.alt = slide.title;

            const img = new Image();
            img.onload = function () {
                slideImage.src = img.src;
                slideImage.classList.remove('loading');
                slideImage.classList.add('loaded');
                sizeSlideImage();
            };
            img.onerror = function () {
                slideImage.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'slide-placeholder';
                placeholder.innerHTML = '<div class="slide-placeholder-icon">&#128247;</div>' +
                    '<div>Image not available</div>';
                slideContent.appendChild(placeholder);
            };
            img.src = slide.image;
        }

        // Caption
        captionGroup.textContent = slide.group || '';
        captionTitle.textContent = slide.title || '';
        captionDescription.innerHTML = (slide.description || '').replace(/\n/g, '<br>');
        captionDisclaimer.textContent = slide.disclaimer || '';

        // Counter
        slideCounter.textContent = (currentSlideIndex + 1) + ' / ' + total;

        // Progress
        const pct = total > 1 ? (currentSlideIndex / (total - 1)) * 100 : 100;
        progressFill.style.width = pct + '%';

        // Arrows — always enabled (wrap around)
        navPrev.classList.remove('disabled');
        navNext.classList.remove('disabled');

        // Preload neighbors
        preloadAround(currentScenarioId, currentSlideIndex);

        // Reset expanded state on slide change
        captionLeft.classList.remove('expanded');
        captionChevron.classList.remove('flipped');

        // Update hash and sizing
        updateHash();
        sizeSlideImage();
        updateOverflowIndicators();
    }

    function switchScenario(scenarioId, slideId = 0) {
        if (welcomeActive) hideWelcome();
        currentScenarioId = scenarioId;
        currentSlideIndex = slideId;

        // Update drawer active state
        drawerItems.forEach(item => {
            item.classList.toggle('active', item.dataset.scenario === scenarioId);
        });

        // Close drawer on small screens after scenario switch
        if (drawerOpen)
        {
            if (window.innerWidth <= 2000) {
                closeDrawer();
            }
        }

        renderSlide();
    }

    function goToSlide(index) {
        const scenario = getCurrentScenario();
        if (!scenario) return;
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

    // Drawer item clicks
    drawerItems.forEach(item => {
        item.addEventListener('click', () => {
            switchScenario(item.dataset.scenario);
        });
    });

    // Arrow clicks
    navPrev.addEventListener('click', prevSlide);
    navNext.addEventListener('click', nextSlide);

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
                if (helpOverlay.hidden && csvOverlay.hidden) {
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

    viewer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    viewer.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
            if (dx < 0) nextSlide();
            else prevSlide();
        }
    }, { passive: true });

    // Prevent image dragging
    slideImage.addEventListener('dragstart', (e) => e.preventDefault());

    // --- Help Panel ---
    const drawerHelpBtn = document.getElementById('drawer-help-btn');
    const helpOverlay = document.getElementById('help-overlay');
    const helpClose = document.querySelector('.help-close');
    const helpBody = document.getElementById('help-body');
    let helpLoaded = false;

    function openHelp() {
        if (!helpLoaded) loadHelp();
        helpOverlay.hidden = false;
    }

    function closeHelp() {
        helpOverlay.hidden = true;
    }

    function loadHelp() {
        fetch('usage-guide.html')
            .then(r => {
                if (!r.ok) throw new Error('Not found');
                return r.text();
            })
            .then(html => {
                helpBody.innerHTML = html;
                helpLoaded = true;
            })
            .catch(() => {
                helpBody.innerHTML = '<p>User guide not available yet. ' +
                    'Visit the <a href="https://github.com/pyfytelemetryf1/pyfytelemetryf1-releases" ' +
                    'target="_blank" rel="noopener">GitHub repository</a> for documentation.</p>';
                helpLoaded = true;
            });
    }

    drawerHelpBtn.addEventListener('click', openHelp);
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
        // Handle TOC anchor clicks — scroll within the panel
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
    let activeCsvKey = 'feb22_laps';

    const CSV_LAPS_DESC = 'Each lap records total time, sector times, gap behind, tyre compound and age, temperature windows, AI difficulty, position, weather, lap type, assists, damage, lockups, spins, flashbacks, DRS, traffic conditions, and more.';
    const CSV_TURNS_DESC = 'Each turn of every lap: entry/apex/exit timings, distances, speeds, and gears; race position at entry and exit, lockups and wheelspins by severity and axle, tyre temperatures, brake bias, differential, and spatial samples.';

    const CSV_FILES = {
        feb22_laps: { url: 'sample-data/csv/feb22_laps.csv', label: 'Feb 22 \u2014 Laps' },
        feb22_turns: { url: 'sample-data/csv/feb22_turns.csv', label: 'Feb 22 \u2014 Turns' },
        feb01_laps: { url: 'sample-data/csv/feb01_laps.csv', label: 'Feb 01 \u2014 Laps' },
        feb01_turns: { url: 'sample-data/csv/feb01_turns.csv', label: 'Feb 01 \u2014 Turns' }
    };

    // Columns to hide per file type
    const HIDDEN_COLS = {
        laps: ['session_id', 'lap_id', 'lap_time_ms', 'sector1_ms', 'sector2_ms', 'sector3_ms'],
        turns: ['turn_series_distances', 'turn_series_times', 'turn_positions',
                'turn_speeds', 'turn_brakes', 'turn_throttles', 'turn_gears',
                'turn_wheel_angles', 'turn_slip_ratios', 'turn_yaw_rates', 'turn_longitudinal_g']
    };

    // Column index for the summary placeholder (turn_positions is first of the series block)
    const TURNS_SERIES_SUMMARY_COL = 'turn_series_distances';

    // Suffixes to trim from header names to save column width
    const SUFFIX_TRIM = ['_ms', '_sec'];

    // Explicit header renames for long column names
    const HEADER_RENAME = {
        'tyres_in_temp_window_score': 'tyres_in_temp_window',
        'tyres_in_optimal_temp_window_score': 'tyres_in_optimal_window',
        'tyres_in_optimal_carcass_temp_window': 'tyres_carcass_in_window'
    };

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
                if (rawHeaders[si] === 'turn_positions') { summarySourceIdx = si; break; }
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
            displayHeaders.push('spatial & technique samples\u2026');
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

    function formatValue(val) {
        // Trim floats to 3 decimal places
        if (val === '' || isNaN(val) || val.indexOf('|') !== -1 || val.indexOf(';') !== -1) return val;
        const n = Number(val);
        if (!isFinite(n)) return val;
        // Only trim if it actually has decimals beyond 3
        if (val.indexOf('.') !== -1 && val.split('.')[1].length > 3) {
            return n.toFixed(3);
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
                    const cls = classifyValue(val);
                    const display = formatValue(val);
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
        if (!csvOverlay.hidden) updateCSVHash();

        if (csvCache[key]) {
            showCSVData(csvCache[key]);
            return;
        }

        csvTableWrap.innerHTML = '<p class="csv-loading">Loading data...</p>';

        fetch(CSV_FILES[key].url)
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

    function updateCSVCaption() {
        const isLaps = activeCsvKey.indexOf('_laps') !== -1;
        csvCaptionLabel.textContent = isLaps ? 'Lap Data' : 'Turn Data';
        csvCaptionText.textContent = isLaps ? CSV_LAPS_DESC : CSV_TURNS_DESC;
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
        updateCSVHash();
    }

    function closeCSV() {
        csvOverlay.hidden = true;
        if (welcomeActive) {
            history.replaceState(null, '', window.location.pathname);
        } else {
            updateHash();
        }
    }

    function updateCSVHash() {
        const newHash = 'csv/' + activeCsvKey;
        if (window.location.hash.slice(1) !== newHash) {
            history.replaceState(null, '', '#' + newHash);
        }
    }

    const csvKeyOrder = Object.keys(CSV_FILES);

    function switchCsvTab(direction) {
        const idx = csvKeyOrder.indexOf(activeCsvKey);
        const next = ((idx + direction) % csvKeyOrder.length + csvKeyOrder.length) % csvKeyOrder.length;
        loadCSV(csvKeyOrder[next]);
    }

    drawerCsvBtn.addEventListener('click', openCSV);
    csvClose.addEventListener('click', closeCSV);
    csvOverlay.addEventListener('click', function (e) {
        if (e.target === csvOverlay) closeCSV();
    });

    csvTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            loadCSV(tab.dataset.csv);
        });
    });

    // --- URL hash routing ---
    function parseHash() {
        const hash = window.location.hash.slice(1);
        if (!hash) return;
        const parts = hash.split('/');

        // Handle #csv/feb22_laps etc.
        if (parts[0] === 'csv') {
            const csvKey = parts[1];
            if (csvKey && CSV_FILES[csvKey]) {
                activeCsvKey = csvKey;
                loadCSV(csvKey);
                openCSV();
            }
            return;
        }

        const scenarioId = parts[0];
        const slideIndex = parts[1] ? parseInt(parts[1]) - 1 : 0;

        const scenario = getScenario(scenarioId);
        if (scenario) {
            currentSlideIndex = Math.max(0, Math.min(slideIndex, scenario.slides.length - 1));
            switchScenario(scenarioId, currentSlideIndex);
        }
    }

    function updateHash() {
        // Don't overwrite the CSV hash when the overlay is open
        if (!csvOverlay.hidden) return;
        // No hash when on the welcome screen
        if (!currentScenarioId) return;
        const newHash = currentScenarioId + '/' + (currentSlideIndex + 1);
        if (window.location.hash.slice(1) !== newHash) {
            history.replaceState(null, '', '#' + newHash);
        }
    }

    window.addEventListener('hashchange', parseHash);

    // --- Init ---
    welcomeCsvLink.addEventListener('click', function (e) {
        e.preventDefault();
        openCSV();
    });

    document.getElementById('header-home').addEventListener('click', function () {
        showWelcome();
        if (window.innerWidth > 1480)
        {
            openDrawer();
        }
    });

    welcomeWalkthroughLink.addEventListener('click', function (e) {
        e.preventDefault();
        switchScenario(scenarioOrder[0]);
    });

    if (window.location.hash) {
        parseHash();
    } else {
        showWelcome();
    }

    updateOverflowIndicators();

})();
