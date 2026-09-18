# User Guide

## 1. Quick Start

Install the app from the Microsoft Store and launch it. The first start creates a default configuration (network ports, capture preferences) and shows a short installation note. You can change the settings, and create a Desktop shortcut, from **Telemetry & Settings > Listener settings**.

Once configured, the app starts listening for telemetry automatically. Just start the game and start driving - the app detects each session, records your telemetry, and saves it when you're done.

The main screen shows a status bar confirming the app is active. Press the indicated keys to open the menu for analysis, settings, and more.

## 2. Setting Up F1 25 and Your Sim Racing Software

The app sits between your game and your sim racing software (e.g., Simagic SimPro Manager, Simhub, or similar). The game sends telemetry data to the app, and the app forwards it to your sim software - so your wheel display, dashboard, and other peripherals continue to work normally.

### In-game setup (F1 25)

1. Open the **Settings** menu in F1 25, then find the **Telemetry** settings
2. Set **UDP Telemetry** to **On**
3. Set **UDP Port** to **20774** (the app's default listen port)
4. Set **UDP Send Rate** to **60Hz** for best accuracy
5. Set **UDP Format** to **2026** or **2025** - both are supported. The app follows either format depending on what the game sends, and picks up a change of format with every new (race) session.
   **Note** use the 2026 UDP format when driving 2026 regulations cars, as that enables capturing new 2026 fields such as Boost mode and SMode. The 2026 UDP format fully supports 2025 regulations cars, so it allows driving both regulation years. 

### Sim racing software setup

In your sim racing software, set the telemetry input port to **20775** (the app's default forward port). The app receives on 20774 and forwards to 20775 - your software reads from 20775 as if the game were sending directly.

If your software already uses a different port, consider changing it to `20775` or change the app's forward port in Settings to match.

### If you don't use sim racing software

The app works fine on its own - it captures and analyzes telemetry regardless of whether forwarding is active. The forward port setting can be left default.

### Console setup

If you play F1 25 on a console, run the app on a separate Windows device on the same local network (e.g. on a laptop). Two additional settings are required:

1. **In the app**: enable **[Advanced] Allow broadcast IP** in **Telemetry & Settings > Listener settings**. You'll be prompted to allow a Windows Firewall exception - accept it so the app can receive data from other devices on your network.
2. **In F1 25**: go to Telemetry Settings and set **UDP Broadcast Mode** to **On**. This broadcasts telemetry to all devices on your local network.

All other settings (ports, capture preferences, etc.) remain the same as the PC setup above.

## 3. Capture Your First Telemetry

Start the app before launching a session in F1 25. The app auto-detects when a session begins and starts recording. When the session ends (or you exit), it saves the data automatically.

Once a race is completed, the app will display an action on the bottom bar `Latest Race: Charts & Analysis` which you can use to generate analysis charts and prepare an LLM analysis request to drag & drop into your preferred LLM. You can also use the app menu at any point to generate analysis charts or prepare the LLM analysis request - see the sections below. 

After your session, you can also find output files in your `telemetry_logs/` folder which you can open from the app menu:

- **`{Date}_{Track}_{Session}_laps.csv`** - one row per completed lap
- **`{Date}_{Track}_{Session}_turns.csv`** - one row per turn per lap (requires calibration data for the track)

The app refers to these files as processed telemetry files or CSV telemetry files.

### Raw telemetry capture (recommended)

By default, the app also saves a raw binary capture file in `telemetry_logs/raw_telemetry/`. This is the complete telemetry stream from your session.

**Why keep raw captures:** These allow you to regenerate your session telemetry data at any point in the future using newer features (and potentially fixes) from newer versions of the app (useful when track calibration data improves or new features are added). They also enable generating a specific subset of high-resolution lap charts (5-panel telemetry charts with brake/throttle, steering and lateral G, speed, gear shifts).

Every other chart in the chart analysis will still work without these, including the feature that bundles the data for third-party LLM analysis. 

**Disk space:** A raw capture is roughly 0.5 GB for a 15-lap race. If disk space is tight, you can disable raw capture in Settings - but you'll lose the ability to replay sessions later or to generate high-resolution lap charts.

## 4. Generate Analysis Charts

Once you've recorded your session, the best way to analyze the data and get actionable insights/coaching tips is to either generate analysis charts from the data, or package a telemetry analysis request for your preferred LLM. From the menu, select **Generate analysis charts**. This creates a curated set of actionable performance charts from your session data, which focus on concrete turns or turn complexes to improve, and **how** to improve them (by looking at consistency, pace, technique, and race management).

The app identifies four categories of immediately actionable improvements: 

1. **Consistency** improvements for specific turns/complexes (this is race pace recoverable **right now**) - *Time Left on Table* chart. 
2. **Pure pace** improvements compared to a reference (this is where you can find more over a single lap) - *Time Gained/Lost per Turn vs. reference* chart. 
3. **Race management** improvements (race start, ERS management, tyre management, traffic & incidents handling). 
4. **Technique** improvements (which are the key to improving turns/complexes identified in #1 and #2) via specific drill-downs into braking points, braking modulation, throttle application points, throttle modulation, gear shifts, racing lines, entry/apex/exit speeds per turn. 

### Quick start

1. The Charts sub-menu starts by showing your available tracks and sessions - pick one (using arrow keys or by typing a number; `B` goes back a step)
2. Charts are then generated and placed into your `telemetry_logs/analysis/` folder. The app auto-selects clean laps and highest yield turns based on your specific measurements, driving style, and results within that particular session
3. The chart reel opens automatically in your browser when ready - page through with the left and right arrow keys
4. Switch back to the app to change the highlighted turns and generate again, or to open the chart reel folder, or to return to the main menu.

### Single-session vs. comparison mode

- **Single session (recommended)**: Analyzes one session against the coaching categories above (consistency, pace, race management, technique). Additionally compares your session data with established reference lap times, so you can see where you're behind, where you're ahead, and what needs changing. 
- **Reference lap**: when available (depending on track and session type), overlays the track's shipped reference lap on your charts as guidance. Usually drawn as a purple dashed line labelled "Reference lap", its goal is to set an achievable target for race/quali pace for very short (5-lap) races in dry conditions on Soft tyres. You can then see an exact overlay of your data versus the reference, for example for lap times, time spent in each turn, braking points, brake modulation, throttle points, throttle modulation, gear shifts, racing lines, ERS deployment & harvesting, etc. 
- **Comparison** (two sessions on the same track): Adds cross-race delta charts showing exactly where you gained or lost time between sessions. Use this mode to track your own progression between sessions. 

### Menu options explained

- **Highlighted focus turns**: The turns that get detailed technique charts (brake traces, throttle traces, speed, racing lines). Auto-detection picks the turns where you lose the most time. Offered after the charts are generated, so you can look first and then change them: enter e.g. `1,5,6+7` to focus on specific turns (use `+` for chicanes treated as one complex) and the charts are generated again.
- **Laps included**: Chosen for you. Inlaps, outlaps, standing start laps and safety car laps are excluded so only representative laps are analyzed; they are still shown and analyzed in separate charts. 

### Highest-value charts

- **Time left on table** - Shows how much time you're losing per turn compared to your own best. This is race pace recoverable right now. The biggest bars are your highest-priority improvement areas.
- **Time Gained/Lost vs reference/vs second race** - Waterfall chart showing where you gained or lost time or against the reference lap (or against another one of your own sessions), turn by turn.
- **Braking/throttle consistency** - Scatter plots of your braking point vs reference and throttle commitment distances vs reference. Tight clusters mean consistent execution; wide spread means you're losing time to variability.
- **Standing start analysis** (Race/Sprint) - Reaction time, traction, throttle application, and position changes off the line.
- **Lap time progression, lap times per stint, fuel-normalized lap time** - shows your lap time medians, slowest/fastest per stint, and normalizes lap time with fuel load (especially useful when comparing raw pace between 2 sessions that had different number of total laps (e.g. Medium vs Long races)).
- **Racing line** (per focus turn) - Spatial view of your line through the turn, with all clean laps overlaid, drawn from the driver's view (entry at the bottom heading up). Shows apex consistency and exit trajectory. With a reference lap selected, the reference line is drawn purple and dashed over your laps.
- **Technique traces** (per focus turn) - Overlaid brake, throttle, speed, and gear traces for all clean laps. Shows exactly how your inputs vary lap-to-lap. With a reference lap selected, its trace is drawn purple and dashed on the same distance-into-the-corner axis, and its apex is marked with a dotted vertical line.
- **ERS deployment, harvesting, and battery lifecycle** analyzed per straight/run down to each turn vs the reference, and lap-over-lap. Shows battery deployment and recharge/recuperation patterns, and provides insights into single lap tactics (deployment vs harvesting zones) and race-level strategy (battery drain patterns lap over lap).
- **Scorecard** - The first chart in the set: a summary card with session context (AI difficulty, assists, weather, positions), your technique and consistency scores, and two opportunities - the corner(s) or complexes where you lose most time against your own best lap, and the corner(s) or complexes with the biggest gap to the reference. Scores measured per corner are shown as a percentage of corners inside the band, with the corner most worth working on named. Can be used for an at-a-glance overview of your strengths and opportunities within the session.

The full chart set also includes: tyre degradation vs. tyre age (races over 5 laps with a pit stop or one stint of at least 8 laps - shorter races cannot show wear), tyre temperature window scoring, and full-lap telemetry overlays (fastest vs. slowest). The LLM request bundle additionally carries advanced physics charts (yaw rate and longitudinal G traces) per highlighted turn, for the model's incident analysis.

## 5. Generate an LLM Analysis Request

From the menu, select **Prepare LLM analysis request**. This generates all the analysis charts and bundles them with your CSV data and an analysis skill file into a single ZIP file, ready to upload to an AI for a coaching report. 

Use this option when you prefer an LLM's help to pinpoint and interpret the data for you - directly from the charts produced by the app. The LLM will identify three precise actionable insights you can apply right away in your next session, and it will also pinpoint precise technique changes you will need to correct and an estimated time you will recover by implementing each change. 

The skill file is specifically designed to extract repeatable, consistent, high-value coaching tips from the LLM, by providing it a precise framework for analysis and how to evaluate and explain it step by step, together with accurate, machine-consumable telemetry analysis (the app pre-generates and prepares the relevant telemetry analysis and charts, including metadata that helps LLMs precisely read the data). The embedded LLM skill is designed to ensure that the LLMs produce meaningful advice and analysis, with the most accurate in-depth understanding of the data possible. 

**Note** The app does not use any LLM and does not connect or send data to any LLM. The prepared zip file is a bundle that can be drag & dropped by users into their preferred web-based LLM (or the LLMs suggested by the app, since those have been tested to work with the analysis skill). Interactions with the LLM happen outside the scope of the app and are subject to the particular LLM terms of service. 
The app will help as much as possible by opening two windows for you side-by-side: the web-based LLM of your choice, and the File Explorer with the zip selected, ready for dragging and dropping. 

### Quick start

1. Pick your track and session(s) - same flow as chart generation
2. The app creates the ZIP in its own subfolder per session under `telemetry_logs/llm_analysis_requests/`
3. Choose how to send it: if you pick Claude or ChatGPT directly from the menu, the app helps as much as possible by opening the LLM web page with a short message prompt ready, and also opening the file explorer with the zip file selected and ready for dragging and dropping into the prompt window. 
    Alternatively, choose "open the folder" so you can drag & drop the zip file into any other LLM web service you typically use. The app provides you a suggestion for a prompt message to write. 
    **Note** This requires you to already have an account/subscription with the LLM service, and for you to already be logged into your account in your default web browser. 
4. Drag and drop the zip file, and send it together with the prefilled prompt message. You are now on the web platform of the specific LLM, no longer in the app. 
5. The LLM will produce a written coaching report with actionable tips. The file can be downloaded or read directly in the browser. 
6. You can ask the LLM follow-up questions of any kind based on your session and data. 
7. Return to the app to change the highlighted turns and rebuild the request, or to return to the main menu. 

### How to use the ZIP

1. Open **Claude Opus 5**, **ChatGPT 5.6 Sol**, or your preferred web-based LLM
2. Drag and drop the ZIP file into the chat
3. Ask: *"Please follow the instructions in the zip file to help me analyze my F1 telemetry, thanks!"*
4. Review the analysis, then follow up with any questions. 

**Tip for ChatGPT users:** Use stronger wording to get the full structured analysis: *"Please follow the instructions in the zip file to analyze my F1 telemetry. Please systematically go through the thinking phase and output phase exactly as instructed to produce the precise intended structure, thanks!"*

The ZIP contains:

- **`llm_telemetry_analysis_request.md`** - the LLM telemetry analysis skill (the AI reads this first)
- **`charts/`** - all generated chart PNGs plus a LLM-specific summary of the data and chart manifest
- **`data/`** - laps and turns CSVs plus field/schema documentation
- **`reference/`** - the reference lap's own telemetry, if available

### Providing additional context

You can also provide the LLM additional context (e.g. `It was the first time I raced without assists at this track. Braking felt off at a few key corners.` or `In the first race, I was just getting oriented on this new track so I was using racing line, in the second race I disabled racing line and I was pushing hard to find the limits of grip, therefore I crashed out on Lap 7.`), or ask it for specific follow-ups: `I'm not comfortable with my braking point at turn T3, how does it look from the data, and what should I focus on to improve my confidence at that turn?`). 

## 6. Generate a Per-Lap Telemetry Plot

From the menu, select **Generate per-lap telemetry plots** and pick a session from the list. The app plots your telemetry and automatically opens the reel. Each lap produces a high-resolution 6-panel chart showing the full telemetry trace across the lap distance (brake and throttle inputs, steering angle, lateral G-force, speed in km/h, gear, colored bands representing the turn zones from entry to exit). Additionally, each lap gets a heat track map drawn against the reference lap, showing where it was either faster or slower than the reference.

**Requires a raw capture file** (`.bin`). Once the plots are ready, you can change the plotted laps (either a single lap, e.g. 3, or a range of laps, e.g. 1-5) or the selected car.

## 7. Review Your Telemetry Data

From the menu, select **Open telemetry logs folder** to browse your output files.

### What to look for in the laps CSV

Open a `_laps.csv` file in any spreadsheet app (Excel, Google Sheets) for a quick at-a-glance review of your session. The most useful columns to scan:

- **lap_time** / **sector times** - your pace progression across the session
- **session type, track info** - track and whether this was a FP/Quali/race session
- **session_mode** - `ONLINE` or `LOCAL`. Empty values, or sessions recorded before this column existed, should be read as unknown
- **ai_difficulty** - the AI level you raced against. Not meaningful in an ONLINE session
- **position** - where you finished each lap
- **total_participants** - number of cars on the grid at the start of the session (the denominator for `position`)
- **ai_participants** / **player_participants** - how many of those were AI, and how many were human players
- **gap_behind**, **gap_ahead** - the gaps to the car behind and in front. 
- **tyre_compound** / **tyre_age_laps** - stint strategy and tyre age
- **assists_any** - whether any assists were active (you can find the exact assists that were used in further columns)
- **damage_any** - whether you picked up damage (you can find the exact damage and severity in further columns)
- **weather and time of day** - session conditions
- **lap type** - whether this was an inlap, outlap, safety car lap, standing start lap etc. 
- **flashback used/enabled** - whether flashbacks were enabled and whether they were actually used on a particular lap. 
- **lockups_count** / **spins_count** - how clean your driving was
- **traffic conditions**: whether you were stuck in traffic for a particular lap, whether DRS was used, whether the car behind had DRS activated,
- **track_limits_violations** - rule infringements

See [CSV_OUTPUT_FORMAT.md](CSV_OUTPUT_FORMAT.md) for the complete field reference.

### The turns CSV

The `_turns.csv` contains per-turn detail: braking points, apex speeds, throttle commitment, racing line coordinates, tyre temperatures, and more. This data is dense - it's most useful when consumed through the analysis charts rather than viewed directly.

A few fields worth checking directly:

- **position_entry** / **position_exit** - position changes through corners (useful for reviewing race battles)
- **time_at_entry_ms** on the **RaceStart** row - your standing start reaction time in milliseconds
- **basic setup per turn** - differential, brake bias. 
- **max throttle,  max brake** - throttle and brake profile through the turn. 
- **lockups and spins severity per axle** - lockup and wheelspin profile through the turn. 

## 8. Regenerate Session Data

The app refers to re-generating CSV data as `replaying a telemetry file`. 
From the menu, select **Regenerate session data with the latest features**. This re-processes a raw capture file to regenerate the CSV output - useful when calibration data has been updated or after an app update adds new features or fixes.

You can:

- **Refresh all telemetry data from captures** - replays every capture, or just the 20 most recent. 
- **Regenerate only the sessions with no telemetry output** - finds capture files that don't have corresponding CSVs and re-generates them. 
- **Select an individual capture** - pick a specific capture to replay.

Regenerating needs raw captures on disk. Enable raw captures in Listener Settings to be able to use this feature with future releases of the app. 

**Note** Replayed output files are prefixed with `replay_` (e.g., `replay_2026_01_Jan_30_AbuDhabi_Race_laps.csv`) in order to keep the original version intact. 

## 9. Changing Listener Settings

From the menu, select **Listener settings** to adjust:

- **Listen port** - the port the game sends telemetry to (default: 20774). Change this if the game is configured to send on a different port.
- **Forward port** - the port your sim software reads from (default: 20775). Match this to your software's input port.
- **Enable raw telemetry capture** - toggle raw binary capture on/off. On by default (recommended).
- **Enable dashboard patching** - replaces the in-game fuel display with gap-behind data on your wheel display. Off by default.
- **Allow broadcast IP** - enable if you run the game on a different machine than the app. Off by default (localhost only).
- **Desktop shortcut** - create a desktop shortcut for quick access.

After saving, the app restarts automatically with the new settings.

## 10. Turn-level telemetry support

The app includes turn-level analysis and reference data for 19 tracks: Abu Dhabi, Austria, Bahrain, Baku, Catalunya, Hungaroring, Losail, Madrid, Melbourne, Miami, Monaco, Montreal, Monza, Shanghai, Silverstone, Singapore, Spa, Suzuka and Zandvoort.

More tracks and refinements to existing tracks are added with each release. 

For tracks without that data, the app still records lap-level telemetry (lap times, tyre data, etc.) but turn-by-turn analysis is not available.

## 11. Output Files Reference

All output goes to your `telemetry_logs/` folder.

| Location | Contents |
|----------|----------|
| `telemetry_logs/` | Per-session `_laps.csv` and `_turns.csv` files |
| `telemetry_logs/raw_telemetry/` | Raw binary capture files (`.bin`) |
| `telemetry_logs/analysis/` | Analysis chart sets, one folder per run, each with a `reel.html` |
| `telemetry_logs/llm_analysis_requests/` | LLM analysis ZIP bundles, one folder per request |
| `telemetry_logs/charts/` | optional, high-resolution lap telemetry plots, one folder per run, each with a `reel.html` |

File naming follows the pattern: `{YYYY}_{MM}_{Mon}_{DD}_{Track}_{Session}` (e.g., `2026_01_Jan_30_AbuDhabi_Race_laps.csv`).

For complete CSV field documentation, see [CSV_OUTPUT_FORMAT.md](CSV_OUTPUT_FORMAT.md).

## Appendix: Chart descriptions

**Lap times progression.** Lap time vs lap number, compound-colored, with median line and range band. Metrics: fastest, median, slowest, range.

**Lap times per stint.** Box plots per stint showing median, spread, and compound. One chart per race.

**Lap times vs tyre age.** Fuel-normalized lap time against tyre age, one trendline per stint fitted to clean laps only. Shows the tyre degradation rate.

**Fuel normalized pace.** Every lap corrected to the lightest fuel load seen across both races, using a fixed per-circuit rate. Metrics: fuel-adj. fastest/median/slowest, and the correction applied in ms/kg.

**Excluded lap times.** The laps excluded from the clean set and the reasons why: first lap, in-lap, out-lap, safety car, damage, invalid.

**Standing start analysis.** Composite: speed+gear overlay, throttle application, rear wheel slip, reaction time bar. Metrics below: traction apex, T1 approach, position delta, wheelspin count.

**Time left on table.** Bar chart showing median time lost vs personal best per turn, sorted by potential. The biggest bars are where the most time is lost to inconsistency. One per race.

**Time Gained/Lost per Turn vs the reference (or vs another session).** Waterfall showing where the session lost or gained time against the reference lap (or against another baseline session), per turn. Sorted by biggest opportunities.

**Braking consistency.** Braking point consistency: scatter of braking distances from entry point per turn (lap over lap) vs the reference (and compared to baseline session when using comparison mode). Wide spread means time is being left on the table.

**Throttle consistency.** Throttle committed consistency: scatter of throttle committed distance from turn apex (lap over lap) vs the reference (and compared to baseline session when using comparison mode). Wide spread means exit speed is being left on the table.

**Brake traces with gear shifts overlay.** Brake pressure (20-point series) overlaid for all clean laps, with gear steps on a second axis. Look for: consistency of braking point, pressure modulation, trail-braking, and downshift timing relative to braking onset.

**Throttle traces.** Throttle application overlaid. Look for: throttle pickup point, hesitation (lifting), getting onto throttle too late past the apex vs the reference.

**Speed traces.** Speed through the turn overlaid. Look for: entry speed consistency, minimum speed (apex), exit speed.

**Racing line.** Spatial trajectory through a turn, all clean laps overlaid, drawn from the driver's view: the entry, marked (0), sits at the bottom heading up. Look for: line consistency between laps, apex hit rate, exit trajectory spread vs the reference.

**ERS deployment pattern.** Battery deployed (%) per straight (turn-to-turn). Shows where energy is being spent. One per race.

**ERS harvesting pattern.** Battery recovered (%) per straight. The counterpart to deployment.

**Battery lifecycle.** Battery charge level (start/end) across laps. Shows drain/recovery balance over the race.

**Tyre management.** Surface temperature window score, optimal window score, and carcass temperature score lap-over-lap.

**Yaw rate.** Rotational velocity through the turn. High variance = inconsistent rotation/stability.

**Longitudinal g.** Acceleration/deceleration forces. Shows braking intensity and traction utilization.

**Fastest lap telemetry.** Brake and throttle, steering, lateral G, speed and gear plotted at high resolution over a full lap distance, with turn zone markers, for the fastest lap.

**Slowest lap telemetry.** Brake and throttle, steering, lateral G, speed and gear plotted at high resolution over a full lap distance, with turn zone markers, for the slowest lap.

**Fastest lap track map.** The fastest lap drawn on the circuit, showing speed deltas versus the reference lap at each corner. The line's color is a gradient based on the delta. Speeds mentioned under each turn label are at apex.

**Slowest lap track map.** The slowest lap drawn on the circuit, similarly to the fastest lap's track map.

**Scorecard.** At a glance session overview. Session context and stats, difficulty and assists, high-level outcomes, race start scores, aggregated technique scores, aggregated consistency scores, biggest opportunities to improve next.

[F1 Telemetry CSV Output Format](CSV_OUTPUT_FORMAT.md)
