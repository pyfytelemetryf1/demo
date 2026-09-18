/**
 * Scenario metadata for the demo walkthrough.
 *
 * Each scenario has:
 *   id - matches the tab data-scenario attribute
 *   title - scenario display name
 *   slides[] - ordered array of slide objects:
 *     image - path to image (relative to demo/)
 *     title - caption title
 *     description - caption description text
 *     group - optional group tag (e.g., "OVERVIEW", "TECHNIQUE")
 *     disclaimer - optional disclaimer text (for LLM slides)
 *     placeholder - if true, shows a placeholder instead of an image
 *     markdown - if set, renders markdown content instead of an image
 */

const LLM_DISCLAIMER = 'LLM analysis uses a third-party service of your choice, only data you upload is sent to them. Their terms apply.';

const WELCOME_SLIDE = {
    markdown: '<p><strong>PyFy Telemetry F1</strong> is compatible with EA Sports F1 25*, including the 2026 Season Pack (F1 26* DLC).<br/>Capture sim racing telemetry and turn it into practical, corner-by-corner coaching insights you can use right away to find lap time.</p><p class="welcome-slide-beta">Now in Beta on Win 10/11: <a href="?s=supported-tracks/1" class="slide-link">supports 19 tracks</a>, more added regularly!<br/>Keyboard-friendly CLI with a built-in menu and a polished UX.</p><p class="welcome-slide-cta">Get the app, free in the <a href="https://apps.microsoft.com/detail/9P60JSFXGLG0" target="_blank" rel="noopener" class="slide-link welcome-store-link">Microsoft Store</a>, or see <a href="?s=highlights/1" class="slide-link">key features</a> in the <a href="#" class="slide-open-drawer">menu</a>, including a <a href="?s=install/1" class="slide-link">quick setup guide</a> (PC or Console).</p><p class="welcome-slide-fine-print">(no ads or in-app purchases, no account or cloud services, no data collection)</p>',
    title: 'PyFy Telemetry: F1 Performance Analysis',
    description: 'Capture sim racing telemetry and turn it into practical, turn-by-turn/corner-by-corner insights you can use right away to gain lap time.',
    group: 'WELCOME'
};

const SCENARIOS = {
    highlights: {
        title: 'Top Features',
        slides: [
            {
                image: 'images/highlights/turn_time_delta.png',
                title: 'Time Left on Table',
                description: 'Four steps to faster lap times: get time back right now, find extra pace against a target reference, fix your technique, optimize ERS.\nFirst, time back now: execute closer to your best, consistently, in the top three turns/corners or complexes named here.',
                group: 'FIND LAP TIME / TURN ANALYSIS'
            },
            {
                image: 'images/highlights/turn_time_delta_reference.png',
                title: 'Time Gained / Lost per Turn vs Reference',
                description: 'Then, find more pace: turn by turn against the track’s built-in reference.\nRed is where you’re slower, green is where you’re faster. Focus on the named corners that are worth the most.',
                group: 'FIND MORE PACE / TURN ANALYSIS'
            },
            {
                image: 'images/highlights/braking_consistency.png',
                title: 'Braking Consistency',
                description: 'Your braking point at every priority corner, lap by lap, comparing your median (in orange) to the reference (dashed purple).\nA wide spread away from the reference means you’re leaving lap time on the table.',
                group: 'TECHNIQUE / CONSISTENCY'
            },
            {
                image: 'images/highlights/throttle_consistency.png',
                title: 'Throttle Consistency',
                description: 'Where you commit to throttle on exit, lap by lap. The purple dash is the reference.\nLate or scattered commitment is exit speed left on the table.',
                group: 'TECHNIQUE / CONSISTENCY'
            },
            {
                image: 'images/highlights/racing_line_t1.png',
                title: 'Racing Line - T1',
                description: 'Then, fix the technique, starting with racing lines. One line per lap for highest-yield corners, vs the purple dashed reference.\nThe footnote names divergences worth correcting.',
                group: 'TECHNIQUE / RACING LINE'
            },
            {
                image: 'images/highlights/brake_traces_gear.png',
                title: 'Brake Traces & Gear Overlay - T6',
                description: 'Brake pressure, pedal release, and gear downshifts through a specific turn/corner. Highest-yield turns are detected automatically.\nThe fastest lap is highlighted vs the dashed purple reference. See whether you\'re correctly trail braking to the apex.',
                group: 'TECHNIQUE / TRAIL BRAKING'
            },
            {
                image: 'images/highlights/throttle_traces_t6.png',
                title: 'Throttle Traces - T6',
                description: 'Throttle application and modulation past the apex of a specific turn/corner. Highest-yield turns are detected automatically.\nThe fastest lap is highlighted vs the dashed purple reference. See whether you\'re getting back on throttle early enough.',
                group: 'TECHNIQUE / THROTTLE APPLICATION'
            },
            {
                image: 'images/highlights/standing_start.png',
                title: 'Standing Start Analysis at Lights Out',
                description: 'Reaction time, traction, throttle application and wheel spin off the line, two races side by side, plus places gained or lost into Turn 1.',
                group: 'TECHNIQUE / RACE START'
            },
            {
                image: 'images/highlights/ers_deployment.png',
                title: 'ERS Deployment Pattern',
                description: 'Finally, optimize ERS. How much battery you deploy on the run to each corner, lap by lap, against the reference pattern (dashed purple).\nThe straights where the reference spends more are the straights where you leave time on the table.',
                group: 'ENERGY / ERS MANAGEMENT'
            },
            {
                image: 'images/highlights/ers_harvesting.png',
                title: 'ERS Harvesting Pattern',
                description: 'The other half of ERS: battery recovered into each corner, lap by lap, against the reference (dashed purple).\nOver-harvesting where the reference does not is speed scrubbed on entry.',
                group: 'ENERGY / ERS MANAGEMENT'
            },
            {
                image: 'images/highlights/llm_report.png',
                title: 'External AI Coaching (Optional)',
                description: 'The built-in chart analysis already tells you exactly what to fix and where to find pace. But for a plain-English debrief in the style of a Race Engineer,\ndrag and drop the analysis ZIP into your preferred external LLM, or open your browser-based AI/LLM straight from the app’s menu.',
                group: 'EXTERNAL AI COACHING',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/highlights/lap_times_progression.png',
                title: 'Lap Times Progression',
                description: 'Every clean lap in order, with median vs the reference. Outlier laps are detected and annotated.',
                group: 'RACE PACE'
            },
            {
                image: 'images/highlights/scorecard.png',
                title: 'Session Scorecard',
                description: 'The whole session on one card: context, race start, technique scores, consistency scores, plus the two\nbiggest opportunities (identified per turn/corner) to gain lap time or find extra pace right now.',
                group: 'SESSION OVERVIEW'
            },
            {
                image: 'images/highlights/fastest_lap_track_map.png',
                title: 'Lap Heat Map vs Reference',
                description: 'Your fastest lap drawn on the circuit, comparing speed deltas vs. the reference through each turn. For example: T5 is faster in, slower out; the reverse should be true.\nShows where to find more speed next, at a glance.',
                group: 'TRACK MAP'
            }
        ]
    },
    'full-reel': {
        title: 'Single Race vs Reference',
        slides: [
            {
                image: 'images/full-reel/01_comparison_turn_time_delta.png',
                title: 'Time Gained / Lost per Turn vs Reference',
                description: 'Find more pace: turn by turn against the track’s built-in reference.\nRed is where you’re slower, green is where you’re faster. The footnote names the corners worth the most.',
                group: 'FIND MORE PACE / TURN ANALYSIS'
            },
            {
                image: 'images/full-reel/02_turns_time_left_on_table.png',
                title: 'Time Left on Table',
                description: 'Get time back right now: the gap between your median and your best through each corner is pace you already have.\nExecute closer to your best, consistently, in the three turns/corners named here.',
                group: 'FIND LAP TIME / TURN ANALYSIS'
            },
            {
                image: 'images/full-reel/03_technique_braking_point_consistency.png',
                title: 'Braking Point Consistency',
                description: 'Your braking point at every priority corner, lap by lap, comparing your median (in orange) to the reference (dashed purple).\nA wide spread away from the reference means you’re leaving lap time on the table.',
                group: 'TECHNIQUE / CONSISTENCY'
            },
            {
                image: 'images/full-reel/04_technique_throttle_committed_consistency.png',
                title: 'Throttle Committed Consistency',
                description: 'Where you commit to throttle on exit, lap by lap. The purple dash is the reference.\nLate or scattered commitment is exit speed left on the table.',
                group: 'TECHNIQUE / CONSISTENCY'
            },
            {
                image: 'images/full-reel/05_start_standing_start_analysis.png',
                title: 'Standing Start Analysis',
                description: 'Reaction time, traction, throttle application and wheel spin off the line, plus places gained or lost into Turn 1.',
                group: 'TECHNIQUE / RACE START'
            },
            {
                image: 'images/full-reel/06_lines_T6_racing_line.png',
                title: 'Racing Line - T6',
                description: 'Then, fix the technique, starting with racing lines. One line per lap for highest-yield corners, vs the purple dashed reference.\nThe footnote names divergences worth correcting.',
                group: 'TECHNIQUE / RACING LINE'
            },
            {
                image: 'images/full-reel/07_technique_T6_brake_traces_gear_overlay.png',
                title: 'Brake Traces & Gear Overlay - T6',
                description: 'Brake pressure, pedal release, and gear downshifts through a specific turn/corner. Highest-yield turns are detected automatically.\nThe fastest lap is highlighted vs the dashed purple reference. See whether you\'re correctly trail braking to the apex.',
                group: 'TECHNIQUE / TRAIL BRAKING'
            },
            {
                image: 'images/full-reel/08_technique_T6_throttle_traces.png',
                title: 'Throttle Traces - T6',
                description: 'Throttle application and modulation past the apex of a specific turn/corner. Highest-yield turns are detected automatically.\nThe fastest lap is highlighted vs the dashed purple reference. See whether you\'re getting back on throttle early enough.',
                group: 'TECHNIQUE / THROTTLE APPLICATION'
            },
            {
                image: 'images/full-reel/09_technique_T6_speed_traces.png',
                title: 'Speed Traces - T6',
                description: 'Entry, minimum and exit speed through T6, lap by lap, vs the dashed purple reference.',
                group: 'TECHNIQUE / SPEED TRACES'
            },
            {
                image: 'images/full-reel/10_lines_T12_T13_T14_racing_line.png',
                title: 'Racing Line - T12+T13+T14',
                description: 'Then, fix the technique, starting with racing lines. One line per lap for highest-yield corners, vs the purple dashed reference.\nThe footnote names divergences worth correcting.',
                group: 'TECHNIQUE / RACING LINE'
            },
            {
                image: 'images/full-reel/11_technique_T12_T13_T14_brake_traces_gear_overlay.png',
                title: 'Brake Traces & Gear Overlay - T12+T13+T14',
                description: 'Brake pressure, pedal release, and gear downshifts through the T12-T13-T14 complex. Corner boundaries and the reference apex are marked.\nThe fastest lap is highlighted vs the dashed purple reference. See whether you\'re correctly trail braking to each apex.',
                group: 'TECHNIQUE / TRAIL BRAKING'
            },
            {
                image: 'images/full-reel/12_technique_T12_T13_T14_speed_traces.png',
                title: 'Speed Traces - T12+T13+T14',
                description: 'Speed through the T12-T13-T14 complex, lap by lap, vs the dashed purple reference.\nSee where your minimum speed sits, and how much speed you carry out of each corner.',
                group: 'TECHNIQUE / SPEED TRACES'
            },
            {
                image: 'images/full-reel/13_energy_ers_deployment_pattern.png',
                title: 'ERS Deployment Pattern',
                description: 'Finally, optimize ERS. How much battery you deploy on the run to each corner, lap by lap, against the reference pattern (dashed purple).\nThe straights where the reference spends more are the straights where you leave time on the table.',
                group: 'ENERGY / ERS MANAGEMENT'
            },
            {
                image: 'images/full-reel/14_energy_ers_harvesting_pattern.png',
                title: 'ERS Harvesting Pattern',
                description: 'The other half of ERS: battery recovered into each corner, lap by lap, against the reference (dashed purple).\nOver-harvesting where the reference does not is speed scrubbed on entry.',
                group: 'ENERGY / ERS MANAGEMENT'
            },
            {
                image: 'images/full-reel/15_overview_scorecard.png',
                title: 'Session Scorecard',
                description: 'The whole session on one card: context, race start, technique scores, consistency scores, plus the two\nbiggest opportunities (identified per turn/corner) to gain lap time or find extra pace right now.',
                group: 'SESSION OVERVIEW'
            },
            {
                image: 'images/full-reel/16_comparison_turn_time_delta_two_races.png',
                title: 'Time Gained / Lost per Turn vs Another Selected Race',
                description: 'The reference lap is the target to chase, but you can also compare two of your own races, turn by turn, and see what improved or regressed.\nPick your strongest session as the baseline, or the one you want to learn from.',
                group: 'PROGRESSION / RACE VS RACE'
            },
            {
                image: 'images/full-reel/17_overview_lap_times_progression.png',
                title: 'Clean Lap Times Progression',
                description: 'Every clean lap in order, with median vs the reference. Outlier laps are detected and annotated.',
                group: 'RACE PACE'
            },
            {
                image: 'images/full-reel/18_overview_lap_times_per_stint.png',
                title: 'Clean Lap Times Per Stint',
                description: 'Pace within each tyre stint: fastest, slowest and the trend.\nSee whether you’re extracting performance from each tyre compound you used.',
                group: 'RACE PACE'
            },
            {
                image: 'images/full-reel/19_overview_lap_times_vs_tyre_age.png',
                title: 'Tyre Degradation',
                description: 'Added cost per lap as tyres age: fuel-normalized lap times per stint, with compound degradation in ms/lap.\nSteeper than expected means you\'re overdriving the tyre or not handling loss of grip efficiently.',
                group: 'RACE PACE'
            },
            {
                image: 'images/full-reel/20_overview_tyre_management.png',
                title: 'Tyre Management',
                description: 'Tyre surface and carcass temperatures versus their optimal windows, lap by lap and stint by stint.',
                group: 'TYRE MANAGEMENT'
            },
            {
                image: 'images/full-reel/21_overview_fastest_lap_telemetry.png',
                title: 'Fastest Lap Telemetry',
                description: 'Your fastest lap plotted at high resolution: brake, throttle, steering, lateral G, speed and gear with the turn zones marked.',
                group: 'ADVANCED / FULL LAP TELEMETRY'
            },
            {
                image: 'images/full-reel/22_overview_fastest_lap_track_map.png',
                title: 'Lap Heat Map vs Reference',
                description: 'Your fastest lap drawn on the circuit, comparing speed deltas vs. the reference through each turn. For example: T5 is faster in, slower out; the reverse should be true.\nShows where to find more speed next, at a glance.',
                group: 'ADVANCED / FULL LAP TELEMETRY'
            }
        ]
    },
    llm: {
        title: 'External AI Coaching (Optional)',
        slides: [
            {
                image: 'images/llm/abudhabi_01_priorities.png',
                title: 'Top 3 Priorities - Abu Dhabi',
                description: 'The built-in chart analysis already tells you exactly what to fix and where to find pace, but for a plain-English debrief in the style of a Race Engineer, drag and drop the analysis ZIP into your preferred AI/LLM, or open your browser-based LLM straight from the app’s menu. The LLM will explain your Top 3 Priorities for improving, what\'s going wrong, the estimated time you could claw back, and what to fix.',
                group: 'TOP 3 PRIORITIES',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/abudhabi_03_turns.png',
                title: 'Technique Analysis for Priority Corners',
                description: 'Zoom in on exactly what to fix for priority corners: racing line, braking point, trail brake, lockups, apex speed, throttle application, or strategically sacrificing speed through one corner of a complex, to win the exit to the next one. Estimates how much time you\'d get back.',
                group: 'TECHNIQUE / DEEP DIVE',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/abudhabi_04_race_mgmt.png',
                title: 'ERS and Tyre Management',
                description: 'ERS deployment and harvesting tips, tyre temperature management, and race start analysis.',
                group: 'ERS / RACE MANAGEMENT',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/abudhabi_06_assessment.png',
                title: 'Driver Assessment & Summary',
                description: 'For offline races, assess driver progression toward a new AI level target, and potential assists to remove.\nFor online races, assess racecraft in wheel-to-wheel action, avoiding incidents, and pure pace against the human field.',
                group: 'DRIVER LEVEL ASSESSMENT',
                disclaimer: LLM_DISCLAIMER
            }
        ]
    },
    'supported-tracks': {
        title: 'Supported Tracks',
        slides: [
            {
                markdown: '<p>PyFyTelemetry F1 currently supports detailed turn-level/corner-level analysis at <strong>19 tracks</strong>:</p><ul class="supported-tracks-list"><li><a href="?s=supported-tracks/2" class="slide-link"><strong>Madrid</strong></a> - Madring <strong>NEW</strong></li><li><a href="?s=supported-tracks/3" class="slide-link"><strong>Abu Dhabi</strong></a> - Yas Marina Circuit</li><li><a href="?s=supported-tracks/4" class="slide-link"><strong>Austria</strong></a> - Red Bull Ring</li><li><a href="?s=supported-tracks/5" class="slide-link"><strong>Bahrain</strong></a> - Bahrain International Circuit</li><li><a href="?s=supported-tracks/6" class="slide-link"><strong>Azerbaijan</strong></a> - Baku City Circuit</li><li><a href="?s=supported-tracks/7" class="slide-link"><strong>Spain</strong></a> - Circuit de Barcelona-Catalunya</li><li><a href="?s=supported-tracks/8" class="slide-link"><strong>Hungary</strong></a> - Hungaroring</li><li><a href="?s=supported-tracks/9" class="slide-link"><strong>Qatar</strong></a> - Lusail International Circuit</li><li><a href="?s=supported-tracks/10" class="slide-link"><strong>Melbourne</strong></a> - Albert Park Circuit</li><li><a href="?s=supported-tracks/11" class="slide-link"><strong>Florida</strong></a> - Miami International Autodrome</li><li><a href="?s=supported-tracks/12" class="slide-link"><strong>Monte Carlo</strong></a> - Circuit de Monaco</li><li><a href="?s=supported-tracks/13" class="slide-link"><strong>Montreal</strong></a> - Circuit Gilles Villeneuve</li><li><a href="?s=supported-tracks/14" class="slide-link"><strong>Italy</strong></a> - Autodromo Nazionale di Monza</li><li><a href="?s=supported-tracks/15" class="slide-link"><strong>China</strong></a> - Shanghai International Circuit</li><li><a href="?s=supported-tracks/16" class="slide-link"><strong>Great Britain</strong></a> - Silverstone Circuit</li><li><a href="?s=supported-tracks/17" class="slide-link"><strong>Singapore</strong></a> - Marina Bay Street Circuit</li><li><a href="?s=supported-tracks/18" class="slide-link"><strong>Belgium</strong></a> - Circuit de Spa-Francorchamps</li><li><a href="?s=supported-tracks/19" class="slide-link"><strong>Japan</strong></a> - Suzuka International Racing Course</li><li><a href="?s=supported-tracks/20" class="slide-link"><strong>Netherlands</strong></a> - Circuit Zandvoort</li></ul>',
                title: 'Supported Tracks',
                description: '',
                group: 'OVERVIEW'
            },
            {
                image: 'images/tracks/Madrid.png',
                title: 'Madrid - NEW in 0.3.0',
                description: 'Madring',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/AbuDhabi.png',
                title: 'Abu Dhabi',
                description: 'Yas Marina Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Austria.png',
                title: 'Austria',
                description: 'Red Bull Ring',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Bahrain.png',
                title: 'Bahrain',
                description: 'Bahrain International Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Baku.png',
                title: 'Azerbaijan',
                description: 'Baku City Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Catalunya.png',
                title: 'Spain',
                description: 'Circuit de Barcelona-Catalunya',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Hungaroring.png',
                title: 'Hungary',
                description: 'Hungaroring',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Losail.png',
                title: 'Qatar',
                description: 'Lusail International Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Melbourne.png',
                title: 'Melbourne',
                description: 'Albert Park Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Miami.png',
                title: 'Florida',
                description: 'Miami International Autodrome',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Monaco.png',
                title: 'Monte Carlo',
                description: 'Circuit de Monaco',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Montreal.png',
                title: 'Montreal',
                description: 'Circuit Gilles Villeneuve',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Monza.png',
                title: 'Italy',
                description: 'Autodromo Nazionale di Monza',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Shanghai.png',
                title: 'China',
                description: 'Shanghai International Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Silverstone.png',
                title: 'Great Britain',
                description: 'Silverstone Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Singapore.png',
                title: 'Singapore',
                description: 'Marina Bay Street Circuit',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Spa.png',
                title: 'Belgium',
                description: 'Circuit de Spa-Francorchamps',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Suzuka.png',
                title: 'Japan',
                description: 'Suzuka International Racing Course',
                group: 'TRACK MAP'
            },
            {
                image: 'images/tracks/Zandvoort.png',
                title: 'Netherlands',
                description: 'Circuit Zandvoort',
                group: 'TRACK MAP'
            },
            {
                markdown: '<p><strong>PyFy Telemetry F1 version 0.3.0</strong> adds multiple new features:</p><ul class="whats-new-list"><li>2026-regulations support: S-Mode (Active Aero), Boost, 24-car grids, etc.</li><li>2026 UDP telemetry format</li><li>Support for Madrid - newest 2026 track (19 tracks supported in total)</li><li>Reference laps on all eligible charts to aim for an achievable target</li><li>Circuit mini-map on each chart for clear spatial orientation</li><li>Online races support (coaching pace reproducibility and racecraft) in addition to offline races</li><li>Significant UX improvements in the CLI menus - one keypress analysis, charts open as a reel immediately with set defaults, etc.</li><li>Major performance improvements in chart rendering and analysis</li><li>Battery harvesting chart and analysis against reference</li><li>Racing-line analysis directly on the chart</li><li>Scorecard redesigned for high-level overview and coaching</li></ul>',
                title: 'New in 0.3.0',
                description: 'PyFy Telemetry F1 0.3.0 adds new key features: support for 2026 regulations and 2026 UDP telemetry format, support for the new Madrid track, reference laps and minimap on every chart, online race analysis, redesigned scorecard, significant performance boost, and more.',
                group: 'NEW IN 0.3.0'
            }
        ]
    },
    install: {
        title: 'Quick Setup',
        slides: [
            {
                image: 'images/install/01_store_listing.png',
                title: 'Get the App - Directly from the Microsoft Store',
                description: 'Search for "PyFy Telemetry" in the Store, or use the direct link at the bottom of this page. Click "Get" to download.\nNo admin privileges required, no user accounts or in-app purchases, no data collected or transmitted: all information stays local.',
                group: 'STEP 1'
            },
            {
                image: 'images/install/03_store_installed.png',
                title: 'Installation Complete',
                description: 'Once installed, click Open to launch the app for the first time.',
                group: 'STEP 1'
            },
            {
                image: 'images/install/04_first_start.png',
                title: 'First Start',
                description: 'On first launch, the app creates a default configuration and starts listening right away.\nAn installation note points to "Telemetry & Settings > Listener settings", where you can change ports and capture options or add a Desktop shortcut.',
                group: 'STEP 2'
            },
            {
                image: 'images/install/05_first_run_settings.png',
                title: 'Listener Settings (Optional)',
                description: 'Defaults should work out-of-the-box. To change them, open "Telemetry & Settings > Listener settings" in the app.\nIt is recommended to keep "Enable raw telemetry capture" on.',
                group: 'STEP 2'
            },
            {
                image: 'images/install/06_app_ready.png',
                title: 'Ready to Start',
                description: 'The app is now listening for telemetry. The status bar shows network ports and recording/processing status.',
                group: 'STEP 3'
            },
            {
                image: 'images/install/07_f1_settings_menu.png',
                title: 'F1 25 - Telemetry Settings',
                description: 'Then, confirm/adjust your game settings. In F1 25, go to Settings and select "Telemetry Settings".',
                group: 'STEP 4'
            },
            {
                image: 'images/install/08_f1_udp_settings.png',
                title: 'F1 25 - UDP Configuration',
                description: 'Set UDP Telemetry to On, IP Address to 127.0.0.1, Send rate to 60Hz, and the UDP Port to match the app\'s listen port (<strong>20774</strong> by default). Set UDP Format to <strong>2026</strong> if you\'ve purchased the DLC, or 2025 otherwise.',
                group: 'STEP 4'
            },
            {
                image: 'images/install/09_simpro_manager.png',
                title: 'SimPro Manager (Optional)',
                description: 'That\'s it, the one-time setup is complete. You can start capturing your first session: see <a href="?s=capture/1" class="drawer-link">demo</a>.\nIf you use Simagic SimPro Manager, or other sim racing software, set its own UDP Listen Port to match the app\'s forwarding port (20775).',
                group: 'STEP 5'
            },
            {
                image: 'images/install/10_console_app_settings.png',
                title: 'Console Setup - App Settings',
                description: 'Playing on console? Run the app on a separate Windows device (e.g. on a laptop). In "Telemetry & Settings > Listener settings",\nenable [Advanced] Allow broadcast IP - this lets the app receive telemetry from your console. You\'ll be prompted to allow a Windows Firewall exception.',
                group: 'CONSOLE SETUP (Step 1)'
            },
            {
                image: 'images/install/11_console_f1_settings.png',
                title: 'Console Setup - Game Settings',
                description: 'In F1 25 Telemetry Settings, set UDP Broadcast Mode to On. This broadcasts telemetry to all devices on your local network, including the Windows device running the app.\nAll other settings remain the same as the PC setup.',
                group: 'CONSOLE SETUP (Step 2)'
            }
        ]
    },
    capture: {
        title: 'Capture Your First Session',
        slides: [
            {
                image: 'images/capture/01_live_capture.png',
                title: 'Live Capture',
                description: 'Start the app. Then, start your F1 25 race. The companion app runs in the background; it automatically detects sessions and records telemetry.',
                group: 'STEP 1'
            },
            {
                image: 'images/capture/02_main_menu.png',
                title: 'Session Complete',
                description: 'After the race, the "Latest Race: Charts & Analysis" quick action will be displayed. Use that to browse through a reel of selected charts that show exactly where and how you can improve your lap times.\nYou can also browse through all your sessions in the "Telemetry & Settings" menu.',
                group: 'STEP 2'
            },
            {
                image: 'images/capture/05_generate_charts.png',
                title: 'Analysis Charts - Coaching Insights',
                description: 'Select "Generate analysis charts" from the menu. Choose a session and get prioritized coaching insights instantly. The reel opens automatically.\nOptionally, select "Prepare LLM analysis request" to get a bundled ZIP file that you can drag & drop directly into an external LLM for analysis.',
                group: 'STEP 3'
            }
        ]
    }
};

// Append the welcome/CTA slide to the end of every scenario
Object.keys(SCENARIOS).forEach(function (id) {
    var slides = SCENARIOS[id].slides;
    if (slides[slides.length - 1] !== WELCOME_SLIDE) {
        slides.push(WELCOME_SLIDE);
    }
});

/**
 * Stable entry points the app links to (Help menu). Each resolves to the
 * slide that currently carries that content; the site build writes an
 * app-link-N/ redirect page per entry. Never renumber or reuse an entry:
 * shipped builds keep pointing at it. Add a new number for new content.
 */
const APP_LINKS = {
    'app-link-1': 'supported-tracks/1',   // supported tracks
    'app-link-2': 'install/7',            // in-game UDP telemetry settings
    'app-link-3': 'supported-tracks/21'   // new in 0.3.0
};
