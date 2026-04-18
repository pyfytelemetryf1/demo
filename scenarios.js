/**
 * Scenario metadata for the demo walkthrough.
 *
 * Each scenario has:
 *   id        - matches the tab data-scenario attribute
 *   title     - scenario display name
 *   slides[]  - ordered array of slide objects:
 *     image       - path to image (relative to demo/)
 *     title       - caption title
 *     description - caption description text
 *     group       - optional group tag (e.g., "OVERVIEW", "TECHNIQUE")
 *     disclaimer  - optional disclaimer text (for LLM slides)
 *     placeholder - if true, shows a placeholder instead of an image
 *     markdown    - if set, renders markdown content instead of an image
 */

const LLM_DISCLAIMER = 'LLM analysis uses a third-party service of your choice, only data you upload is sent to them. Their terms apply.';

const WELCOME_SLIDE = {
    markdown: '<p><strong>PyFy Telemetry F1</strong> is currently compatible with EA Sports F1 25*.</p>' +
        '<p class="welcome-slide-beta">Now in Beta on Win 10/11: supports 5 tracks (Abu Dhabi, Melbourne, Shanghai, Suzuka, Bahrain), more added regularly!<br/>Keyboard-friendly CLI with a built-in menu.</p>' +
        '<p class="welcome-slide-cta">Select another <a href="#" class="slide-open-drawer">walkthrough</a> from the menu,<br/>or get the app, free in the <a href="https://apps.microsoft.com/detail/9P60JSFXGLG0" target="_blank" rel="noopener" class="slide-link welcome-store-link">Microsoft Store</a>.</p>' +
        '<p>See key features in action before installing: <a href="#full-reel/1" class="slide-link">analysis charts</a>, <a href="#full-reel/9" class="slide-link">session comparisons</a>, <a href="#llm/1" class="slide-link">third-party coaching insights</a>, <a href="#" class="slide-link slide-open-csv">key telemetry data</a>, or a <a href="#install/1" class="slide-link">quick setup demo</a> (PC or Console).</p>' +
        '<p class="welcome-slide-fine-print">(no ads or in-app purchases, no account or cloud services, no data collection)</p>',
    title: 'PyFy Telemetry \u2014 F1 Performance Analysis (Beta)',
    description: 'Capture real-time sim racing telemetry and turn it into practical, corner-by-corner insights you can actually use to gain lap time.',
    group: 'WELCOME'
};

const SCENARIOS = {
    highlights: {
        title: 'Chart Highlights',
        slides: [
            {
                image: 'images/highlights/turn_time_delta.png',
                title: 'Time Left on Table',
                description: 'PyFy Telemetry captures real-time F1 sim racing telemetry and turns it into corner-by-corner insights. This chart shows per-turn time variance: the gap between your best and median lap through each corner, sorted by potential gain.',
                group: 'TURN ANALYSIS'
            },
            {
                image: 'images/highlights/braking_consistency.png',
                title: 'Braking Consistency',
                description: 'Compare braking points across turns between sessions. Find where you\'re inconsistent.',
                group: 'COMPARISON'
            },
            {
                image: 'images/highlights/throttle_consistency.png',
                title: 'Throttle Consistency',
                description: 'Compare throttle application points across turns between sessions. Spot where you\'re leaving speed on the table.',
                group: 'COMPARISON'
            },
            {
                image: 'images/highlights/turn_time_delta_comparison.png',
                title: 'Turn Time Delta \u2014 Session Comparison',
                description: 'Where you gained or lost the most time between two races, sorted by impact. Red = slower, green = faster.',
                group: 'COMPARISON'
            },
            {
                image: 'images/highlights/racing_line_chicane.png',
                title: 'Racing Line \u2014 T6+T7 Chicane',
                description: 'Every lap\'s racing line through the T6-T7 chicane overlaid \u2014 one outlier lap is immediately visible.',
                group: 'RACING LINES'
            },
            {
                image: 'images/highlights/standing_start.png',
                title: 'Standing Start Analysis at Lights Out',
                description: 'Reaction time, traction, throttle application, and wheel spin \u2014 compared across race starts.',
                group: 'RACE START'
            },
            {
                image: 'images/highlights/scorecard.png',
                title: 'Session Scorecard',
                description: 'At-a-glance session summary: difficulty, assists, technique metrics, and consistency scores.',
                group: 'SCORECARD'
            },
            {
                image: 'images/highlights/llm_report.png',
                title: 'LLM Performance Report (Optional)',
                description: 'Export your CSV telemetry and charts as a single zip file that you can drag and drop into your preferred LLM. A purpose-built AI skill produces consistent, structured coaching, focused on 3 actionable priorities for your next session.',
                group: 'LLM ANALYSIS',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/highlights/brake_traces_gear.png',
                title: 'Brake Traces & Gear Overlay',
                description: 'Per-turn brake application with gear selection \u2014 see your braking consistency lap by lap.',
                group: 'TECHNIQUE'
            },
            {
                image: 'images/highlights/lap_times_per_stint.png',
                title: 'Lap Times Per Stint',
                description: 'See pace evolution within each tyre stint. Spot degradation and outlier laps.',
                group: 'STRATEGY'
            },
            {
                image: 'images/highlights/lap_times_progression.png',
                title: 'Lap Times Progression',
                description: 'Compare clean lap times across sessions. Outlier laps are automatically detected and annotated.',
                group: 'OVERVIEW'
            },
            {
                image: 'images/highlights/tyre_degradation.png',
                title: 'Tyre Wear & Degradation',
                description: 'Track tyre wear across stints. Plan your strategy with data.',
                group: 'STRATEGY'
            },
            {
                image: 'images/highlights/track_map_abudhabi.png',
                title: 'Track Map',
                description: 'Full track layout colored by speed, with apex speeds annotated at each turn.',
                group: 'TRACK MAP'
            },
            WELCOME_SLIDE
        ]
    },
    'full-reel': {
        title: 'Full Analysis Reel',
        slides: [
            // Overview
            { image: 'images/full-reel/01_overview_lap_times_progression.png', title: 'Clean Lap Times Comparison', description: 'Lap-by-lap comparison of clean times across two race sessions, with median lines and outlier annotations.', group: 'OVERVIEW' },
            { image: 'images/full-reel/02_overview_lap_times_per_stint_race1.png', title: 'Lap Times Per Stint \u2014 Race 1', description: 'Pace evolution within each tyre stint. Outlier laps are automatically detected and annotated — e.g. an incident at T13+T14.', group: 'OVERVIEW' },
            { image: 'images/full-reel/03_overview_lap_times_per_stint_race2.png', title: 'Lap Times Per Stint \u2014 Race 2', description: 'Pace evolution within each tyre stint for the reference race session. Outlier laps are automatically detected and annotated.', group: 'OVERVIEW' },
            { image: 'images/full-reel/04_overview_lap_times_vs_tyre_age.png', title: 'Lap Times vs Tyre Age', description: 'How lap times evolve with tyre wear across both sessions.', group: 'OVERVIEW' },
            { image: 'images/full-reel/05_comparison_fuel_normalized_pace.png', title: 'Fuel-Normalized Pace', description: 'True pace comparison with fuel weight effects removed. Particularly useful when comparing race sessions of different lengths e.g. Medium (20 lap) race vs Short (15 lap) race.', group: 'OVERVIEW' },
            // Race Start
            { image: 'images/full-reel/06_start_standing_start_analysis.png', title: 'Standing Start Analysis', description: 'Reaction time, speed build-up, traction, throttle modulation, and wheel spin compared between two race starts.', group: 'RACE START' },
            // Turn Analysis
            { image: 'images/full-reel/07_turns_time_left_on_table_race1.png', title: 'Time Left on Table \u2014 Race 1', description: 'Per-turn time variance: the gap between your best and median performance. Sorted by potential gain.', group: 'TURN ANALYSIS' },
            { image: 'images/full-reel/08_turns_time_left_on_table_race2.png', title: 'Time Left on Table \u2014 Race 2', description: 'Per-turn time variance for the reference race session.', group: 'TURN ANALYSIS' },
            { image: 'images/full-reel/09_comparison_turn_time_delta.png', title: 'Turn Time Delta', description: 'Sorted by impact: where you gained or lost the most time between the two races.', group: 'TURN ANALYSIS' },
            { image: 'images/full-reel/10_comparison_braking_consistency.png', title: 'Braking Consistency Comparison', description: 'Braking point variance per turn across both sessions. Lower spread means more consistent braking.', group: 'TURN ANALYSIS' },
            { image: 'images/full-reel/11_comparison_throttle_consistency.png', title: 'Throttle Consistency Comparison', description: 'Throttle application point variance per turn across both sessions.', group: 'TURN ANALYSIS' },
            // Scorecard
            { image: 'images/full-reel/12_experimental_scorecard.png', title: 'Session Scorecard', description: 'At-a-glance session summary: difficulty, assists, progression, technique, and consistency metrics.', group: 'SCORECARD' },
            // Racing Lines — T12+T13+T14
            { image: 'images/full-reel/13_lines_T12_T13_T14_racing_line_race1.png', title: 'Racing Line \u2014 T12+T13+T14 (Race 1)', description: 'Every lap\'s line through the T12-T13-T14 complex overlaid. Colors distinguish individual laps.', group: 'RACING LINES' },
            { image: 'images/full-reel/14_lines_T12_T13_T14_racing_line_race2.png', title: 'Racing Line \u2014 T12+T13+T14 (Race 2)', description: 'T12-T13-T14 racing lines from the reference session for comparison.', group: 'RACING LINES' },
            // Racing Lines — T6+T7
            { image: 'images/full-reel/15_lines_T6_T7_racing_line_race1.png', title: 'Racing Line \u2014 T6+T7 (Race 1)', description: 'Connected corner complex \u2014 line consistency through the T6-T7 chicane.', group: 'RACING LINES' },
            { image: 'images/full-reel/16_lines_T6_T7_racing_line_race2.png', title: 'Racing Line \u2014 T6+T7 (Race 2)', description: 'T6-T7 chicane lines from the reference session for comparison.', group: 'RACING LINES' },
            // Racing Lines — T5
            { image: 'images/full-reel/17_lines_T5_racing_line_race1.png', title: 'Racing Line \u2014 T5 (Race 1)', description: 'Racing line consistency through Turn 5.', group: 'RACING LINES' },
            { image: 'images/full-reel/18_lines_T5_racing_line_race2.png', title: 'Racing Line \u2014 T5 (Race 2)', description: 'Turn 5 lines from the reference session for comparison.', group: 'RACING LINES' },
            // Racing Lines — T9
            { image: 'images/full-reel/19_lines_T9_racing_line_race1.png', title: 'Racing Line \u2014 T9 (Race 1)', description: 'Mid-circuit racing line overlay for Turn 9.', group: 'RACING LINES' },
            { image: 'images/full-reel/20_lines_T9_racing_line_race2.png', title: 'Racing Line \u2014 T9 (Race 2)', description: 'Turn 9 lines from the reference session for comparison.', group: 'RACING LINES' },
            // Racing Lines — T16
            { image: 'images/full-reel/21_lines_T16_racing_line_race1.png', title: 'Racing Line \u2014 T16 (Race 1)', description: 'Line consistency through the final corner complex.', group: 'RACING LINES' },
            { image: 'images/full-reel/22_lines_T16_racing_line_race2.png', title: 'Racing Line \u2014 T16 (Race 2)', description: 'Final corner lines from the reference session for comparison.', group: 'RACING LINES' },
            // Technique — T12+T13+T14
            { image: 'images/full-reel/23_technique_T12_T13_T14_brake_traces_gear_overlay_race1.png', title: 'T12+T13+T14 Brake Traces & Gear \u2014 Race 1', description: 'Brake pressure and gear selection through the T12-T13-T14 complex across all laps.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/24_technique_T12_T13_T14_brake_traces_gear_overlay_race2.png', title: 'T12+T13+T14 Brake Traces & Gear \u2014 Race 2', description: 'T12-T13-T14 braking from the reference session.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/25_technique_T12_T13_T14_throttle_traces_race1.png', title: 'T12+T13+T14 Throttle Traces \u2014 Race 1', description: 'Throttle application through the T12-T13-T14 complex across all laps, helps notice e.g. the large variation/hesitation on throttle, costing lap time.\nThe turn complex is automatically selected by the chart analysis feature as time is being lost here.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/26_technique_T12_T13_T14_throttle_traces_race2.png', title: 'T12+T13+T14 Throttle Traces \u2014 Race 2', description: 'T12-T13-T14 throttle from the reference session.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/27_technique_T12_T13_T14_speed_traces_race1.png', title: 'T12+T13+T14 Speed Traces \u2014 Race 1', description: 'Speed profile through the T12-T13-T14 complex across all laps.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/28_technique_T12_T13_T14_speed_traces_race2.png', title: 'T12+T13+T14 Speed Traces \u2014 Race 2', description: 'T12-T13-T14 speed profiles from the reference session for comparison.', group: 'TECHNIQUE' },
            // Technique — T6+T7
            { image: 'images/full-reel/29_technique_T6_T7_brake_traces_gear_overlay_race1.png', title: 'T6+T7 Brake Traces & Gear \u2014 Race 1', description: 'Brake and gear through the chicane complex.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/30_technique_T6_T7_brake_traces_gear_overlay_race2.png', title: 'T6+T7 Brake Traces & Gear \u2014 Race 2', description: 'Chicane braking from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/31_technique_T6_T7_throttle_traces_race1.png', title: 'T6+T7 Throttle Traces \u2014 Race 1', description: 'Throttle through the chicane complex.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/32_technique_T6_T7_throttle_traces_race2.png', title: 'T6+T7 Throttle Traces \u2014 Race 2', description: 'Chicane throttle from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/33_technique_T6_T7_speed_traces_race1.png', title: 'T6+T7 Speed Traces \u2014 Race 1', description: 'Speed through the chicane complex.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/34_technique_T6_T7_speed_traces_race2.png', title: 'T6+T7 Speed Traces \u2014 Race 2', description: 'Chicane speeds from the reference session for comparison.', group: 'TECHNIQUE' },
            // Technique — T5
            { image: 'images/full-reel/35_technique_T5_brake_traces_gear_overlay_race1.png', title: 'T5 Brake Traces & Gear \u2014 Race 1', description: 'Brake and gear analysis for Turn 5.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/36_technique_T5_brake_traces_gear_overlay_race2.png', title: 'T5 Brake Traces & Gear \u2014 Race 2', description: 'Turn 5 braking from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/37_technique_T5_throttle_traces_race1.png', title: 'T5 Throttle Traces \u2014 Race 1', description: 'Throttle through Turn 5.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/38_technique_T5_throttle_traces_race2.png', title: 'T5 Throttle Traces \u2014 Race 2', description: 'Turn 5 throttle from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/39_technique_T5_speed_traces_race1.png', title: 'T5 Speed Traces \u2014 Race 1', description: 'Speed profile through Turn 5.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/40_technique_T5_speed_traces_race2.png', title: 'T5 Speed Traces \u2014 Race 2', description: 'Turn 5 speeds from the reference session for comparison.', group: 'TECHNIQUE' },
            // Technique — T9
            { image: 'images/full-reel/41_technique_T9_brake_traces_gear_overlay_race1.png', title: 'T9 Brake Traces & Gear \u2014 Race 1', description: 'Brake and gear analysis for Turn 9.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/42_technique_T9_brake_traces_gear_overlay_race2.png', title: 'T9 Brake Traces & Gear \u2014 Race 2', description: 'Turn 9 braking from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/43_technique_T9_throttle_traces_race1.png', title: 'T9 Throttle Traces \u2014 Race 1', description: 'Throttle application through Turn 9.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/44_technique_T9_throttle_traces_race2.png', title: 'T9 Throttle Traces \u2014 Race 2', description: 'Turn 9 throttle from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/45_technique_T9_speed_traces_race1.png', title: 'T9 Speed Traces \u2014 Race 1', description: 'Speed profile through Turn 9.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/46_technique_T9_speed_traces_race2.png', title: 'T9 Speed Traces \u2014 Race 2', description: 'Turn 9 speeds from the reference session for comparison.', group: 'TECHNIQUE' },
            // Technique — T16
            { image: 'images/full-reel/47_technique_T16_brake_traces_gear_overlay_race1.png', title: 'T16 Brake Traces & Gear \u2014 Race 1', description: 'Brake and gear analysis for the final corner.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/48_technique_T16_brake_traces_gear_overlay_race2.png', title: 'T16 Brake Traces & Gear \u2014 Race 2', description: 'Final corner braking from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/49_technique_T16_throttle_traces_race1.png', title: 'T16 Throttle Traces \u2014 Race 1', description: 'Throttle application through the final corner.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/50_technique_T16_throttle_traces_race2.png', title: 'T16 Throttle Traces \u2014 Race 2', description: 'Final corner throttle from the reference session for comparison.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/51_technique_T16_speed_traces_race1.png', title: 'T16 Speed Traces \u2014 Race 1', description: 'Speed through the final corner complex.', group: 'TECHNIQUE' },
            { image: 'images/full-reel/52_technique_T16_speed_traces_race2.png', title: 'T16 Speed Traces \u2014 Race 2', description: 'Final corner speeds from the reference session for comparison.', group: 'TECHNIQUE' },
            // Energy
            { image: 'images/full-reel/53_energy_ers_deployment_pattern_race1.png', title: 'ERS Deployment Pattern \u2014 Race 1', description: 'Energy recovery and deployment across the lap. Optimize your ERS strategy.', group: 'ENERGY' },
            { image: 'images/full-reel/54_energy_ers_deployment_pattern_race2.png', title: 'ERS Deployment Pattern \u2014 Race 2', description: 'ERS usage from the reference session for comparison.', group: 'ENERGY' },
            { image: 'images/full-reel/55_energy_battery_lifecycle_race1.png', title: 'Battery Lifecycle \u2014 Race 1', description: 'Battery charge level throughout the race. See charge/discharge cycles.', group: 'ENERGY' },
            { image: 'images/full-reel/56_energy_battery_lifecycle_race2.png', title: 'Battery Lifecycle \u2014 Race 2', description: 'Battery patterns from the reference session for comparison.', group: 'ENERGY' },
            // Tyre Management
            { image: 'images/full-reel/57_overview_tyre_management_race1.png', title: 'Tyre Management \u2014 Race 1', description: 'Tyre temperature tracking across stints.', group: 'TYRE MANAGEMENT' },
            { image: 'images/full-reel/58_overview_tyre_management_race2.png', title: 'Tyre Management \u2014 Race 2', description: 'Tyre temperature tracking across stints from the reference session.', group: 'TYRE MANAGEMENT' },
            // Outliers
            { image: 'images/full-reel/59_overview_excluded_lap_times.png', title: 'Excluded Laps', description: 'Standing start laps, in-laps, out-laps, safety car laps, and laps with damage are usually excluded from most charts focusing on race pace. This chart shows them for comparison.', group: 'OVERVIEW' },
            // Fastest Lap Telemetry
            { image: 'images/full-reel/60_overview_fastest_lap_telemetry_race1.png', title: 'Fastest Lap Telemetry \u2014 Race 1', description: 'Full 6-panel telemetry dashboard for your fastest lap: brake, throttle, steering, speed, and gear shifts with turn zones overlaid for context.', group: 'TELEMETRY' },
            { image: 'images/full-reel/61_overview_fastest_lap_telemetry_race2.png', title: 'Fastest Lap Telemetry \u2014 Race 2', description: 'Fastest lap telemetry dashboard from the reference session for comparison.', group: 'TELEMETRY' }
        ]
    },
    llm: {
        title: 'External LLM Insights',
        slides: [
            // Abu Dhabi Race — Feb 22 vs Feb 01
            {
                image: 'images/llm/abudhabi_01_priorities.png',
                title: 'Top 3 Priorities \u2014 Abu Dhabi',
                description: 'Export your CSV telemetry and charts as a single zip file that you can drag and drop into your preferred LLM. A purpose-built AI skill produces consistent, structured coaching, focused on 3 actionable priorities for your next session.',
                group: 'ABU DHABI',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/abudhabi_03_turns.png',
                title: 'Turn-by-Turn Analysis',
                description: 'Deep dive into specific corners: braking points, apex speeds, throttle application, and what the data says you should change.',
                group: 'ABU DHABI',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/abudhabi_04_race_mgmt.png',
                title: 'Race Management',
                description: 'ERS deployment strategy, battery lifecycle patterns, tyre temperature management, and fuel-adjusted pace analysis.',
                group: 'ABU DHABI',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/abudhabi_05_comparison.png',
                title: 'Cross-Race Comparison & Assessment',
                description: 'Session-to-session progression: what improved, what regressed, and an overall driver level assessment with specific targets.',
                group: 'ABU DHABI',
                disclaimer: LLM_DISCLAIMER
            },
            // Melbourne Race — Mar 08 vs Mar 05
            {
                image: 'images/llm/melbourne_01_priorities.png',
                title: 'Top 3 Priorities \u2014 Melbourne',
                description: 'Same structured coaching framework, different track. The LLM adapts its analysis to Melbourne\'s specific layout and challenges.',
                group: 'MELBOURNE',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/melbourne_03_turns.png',
                title: 'Turn-by-Turn Analysis',
                description: 'Corner-specific breakdown for Melbourne: braking zones, trail-braking opportunities, and throttle modulation through key corners.',
                group: 'MELBOURNE',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/melbourne_04_race_mgmt.png',
                title: 'Race Management',
                description: 'ERS deployment, battery patterns, tyre temperatures, and surface management analysis.',
                group: 'MELBOURNE',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/melbourne_05_comparison.png',
                title: 'Race Start & Cross-Race Comparison',
                description: 'Standing start analysis between sessions, plus a comparison of where time was gained or lost across the two races.',
                group: 'MELBOURNE',
                disclaimer: LLM_DISCLAIMER
            },
            {
                image: 'images/llm/melbourne_06_assessment.png',
                title: 'Driver Assessment & Summary',
                description: 'Overall driver level evaluation with specific strengths, areas for improvement, and the top insights to carry forward (see <a href="#llm/5" class="drawer-link">Top 3 Priorities</a>).',
                group: 'MELBOURNE',
                disclaimer: LLM_DISCLAIMER
            }
        ]
    },
    'supported-tracks': {
        title: 'Supported Tracks',
        slides: [
            {
                markdown: '<p>PyFy Telemetry F1 currently supports <strong>18 tracks</strong>:</p>' +
                    '<ul class="supported-tracks-list">' +
                    '<li>Yas Marina Circuit</li>' +
                    '<li>Red Bull Ring</li>' +
                    '<li>Bahrain International Circuit</li>' +
                    '<li>Baku City Circuit</li>' +
                    '<li>Circuit de Barcelona-Catalunya</li>' +
                    '<li>Hungaroring</li>' +
                    '<li>Lusail International Circuit</li>' +
                    '<li>Albert Park Circuit</li>' +
                    '<li>Miami International Autodrome</li>' +
                    '<li>Circuit de Monaco</li>' +
                    '<li>Circuit Gilles Villeneuve</li>' +
                    '<li>Autodromo Nazionale di Monza</li>' +
                    '<li>Shanghai International Circuit</li>' +
                    '<li>Silverstone Circuit</li>' +
                    '<li>Marina Bay Street Circuit</li>' +
                    '<li>Circuit de Spa-Francorchamps</li>' +
                    '<li>Suzuka International Racing Course</li>' +
                    '<li>Circuit Zandvoort</li>' +
                    '</ul>',
                title: 'Supported Tracks',
                description: '',
                group: 'OVERVIEW'
            },
            { image: 'images/tracks/AbuDhabi.png', title: 'Yas Marina Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Austria.png', title: 'Red Bull Ring', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Bahrain.png', title: 'Bahrain International Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Baku.png', title: 'Baku City Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Catalunya.png', title: 'Circuit de Barcelona-Catalunya', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Hungaroring.png', title: 'Hungaroring', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Losail.png', title: 'Lusail International Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Melbourne.png', title: 'Albert Park Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Miami.png', title: 'Miami International Autodrome', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Monaco.png', title: 'Circuit de Monaco', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Montreal.png', title: 'Circuit Gilles Villeneuve', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Monza.png', title: 'Autodromo Nazionale di Monza', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Shanghai.png', title: 'Shanghai International Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Silverstone.png', title: 'Silverstone Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Singapore.png', title: 'Marina Bay Street Circuit', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Spa.png', title: 'Circuit de Spa-Francorchamps', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Suzuka.png', title: 'Suzuka International Racing Course', description: '', group: 'TRACK MAP' },
            { image: 'images/tracks/Zandvoort.png', title: 'Circuit Zandvoort', description: '', group: 'TRACK MAP' }
        ]
    },
    install: {
        title: 'Quick Setup',
        slides: [
            {
                image: 'images/install/01_store_listing.png',
                title: 'Get the App \u2014 directly from the Microsoft Store',
                description: 'Search for "PyFy Telemetry" in the Store, or use the direct link on the left-hand side of this page. Click Get to download. No admin privileges required, no user accounts or in-app purchases, no data collected or transmitted \u2014 all information stays local.',
                group: 'STEP 1'
            },
            {
                image: 'images/install/03_store_installed.png',
                title: 'Installation Complete',
                description: 'Once installed, click Open to launch the app for the first time.',
                group: 'STEP 1'
            },
            {
                image: 'images/install/04_first_run_config.png',
                title: 'First-Run Configuration',
                description: 'On first launch, the app walks you through a first-run configuration. Press Enter to accept each default.',
                group: 'STEP 2'
            },
            {
                image: 'images/install/05_first_run_settings.png',
                title: 'Review Settings',
                description: 'Defaults should work out-of-the-box. All settings can be changed later from the app menu. It is highly recommended to enable raw telemetry capture. See User Guide on the side panel for details.',
                group: 'STEP 2'
            },
            {
                image: 'images/install/06_app_ready.png',
                title: 'Ready to Start',
                description: 'The app is now listening for telemetry. The status bar shows network ports and recording/processing status. Finally, confirm/adjust your game settings.',
                group: 'STEP 3'
            },
            {
                image: 'images/install/07_f1_settings_menu.png',
                title: 'F1 25 \u2014 Telemetry Settings',
                description: 'In F1 25, go to Settings and select "Telemetry Settings".',
                group: 'STEP 4'
            },
            {
                image: 'images/install/08_f1_udp_settings.png',
                title: 'F1 25 \u2014 UDP Configuration',
                description: 'Set UDP Telemetry to On, IP Address to 127.0.0.1, Send rate to 60Hz, and the UDP Port to match the app\'s listening port (20774).',
                group: 'STEP 4'
            },
            {
                image: 'images/install/09_simpro_manager.png',
                title: 'SimPro Manager (Optional)',
                description: 'That\'s it, the one-time setup is complete. You can start capturing your first session: see <a href="#capture/1" class="drawer-link">demo</a>. If you use Simagic SimPro Manager, or other sim racing software, set its own UDP Listen Port to match the app\'s forwarding port (20775).',
                group: 'STEP 5'
            },
            {
                image: 'images/install/10_console_app_settings.png',
                title: 'Console Setup \u2014 App Settings',
                description: 'Playing on console? Run the app on a separate Windows device (e.g. on a laptop). During setup, enable [Advanced] Allow broadcast IP \u2014 this lets the app receive telemetry from your console. You\'ll be prompted to allow a Windows Firewall exception.',
                group: 'CONSOLE SETUP'
            },
            {
                image: 'images/install/11_console_f1_settings.png',
                title: 'Console Setup \u2014 Game Settings',
                description: 'In F1 25 Telemetry Settings, set UDP Broadcast Mode to On. This broadcasts telemetry to all devices on your local network, including the Windows device running the app. All other settings remain the same as the PC setup.',
                group: 'CONSOLE SETUP'
            }
        ]
    },
    capture: {
        title: 'Capture Your First Session',
        slides: [
            {
                image: 'images/capture/01_live_capture.png',
                title: 'Live Capture',
                description: 'Start the app. Then, start your F1 25 race. The app automatically detects the session and records telemetry in real time \u2014 track, session type, and lap count update live.',
                group: 'STEP 1'
            },
            {
                image: 'images/capture/02_main_menu.png',
                title: 'Session Complete',
                description: 'After the race, open the menu. CSVs and raw capture files are saved automatically to your telemetry logs folder.',
                group: 'STEP 2'
            },
            {
                image: 'images/capture/03_laps_csv.png',
                title: 'Lap-by-Lap Data',
                description: 'Every lap is recorded with lap times, gap behind, tyre compound and age, temperature windows, AI difficulty, position, weather, lap type, assists, damage, lockups, spins, flashback usage, DRS, traffic conditions, and more. Open in Excel or any spreadsheet viewer for quick review.',
                group: 'STEP 3'
            },
            {
                image: 'images/capture/04_turns_csv.png',
                title: 'Turn-by-Turn Data',
                description: 'Each turn of every lap: entry/apex/exit timings, distances, speeds, gears, and more. Race position at entry/exit, lockups and wheelspin by severity and axle, tyre temperatures, brake bias, differential, and spatial samples. The foundation for all analysis charts.',
                group: 'STEP 4'
            },
            {
                image: 'images/capture/05_generate_charts.png',
                title: 'Generate Analysis Charts',
                description: 'Select "Generate analysis charts" from the menu. Pick one or two sessions and the app produces a complete analysis reel in seconds. See <a href="#full-reel/1" class="drawer-link">demo</a>.\nSimilarly, select "Prepare LLM analysis request" to get a bundled zip file that you can directly drag & drop into an external LLM for analysis. See <a href="#llm/1" class="drawer-link">demo</a>.',
                group: 'STEP 5'
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
