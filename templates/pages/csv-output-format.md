# F1 Telemetry CSV Output Format

*Last updated: 2026-03-25T18:00:00Z - schema version: 0.3.0*

This document describes the CSV output format produced by the F1 Telemetry Logger.

## Output Files

The logger produces date-based CSV files in the `telemetry_logs/` directory:

- `{YYYY}_{MM}_{Mon}_{DD}_{Track}_{Session}_laps.csv` - Lap-level telemetry (e.g., `2026_01_Jan_30_AbuDhabi_Race_laps.csv`)
- `{YYYY}_{MM}_{Mon}_{DD}_{Track}_{Session}_turns.csv` - Turn-level telemetry (e.g., `2026_01_Jan_30_AbuDhabi_Race_turns.csv`)
- `errors.csv` - Error log, single append-only file (only created when errors occur)
- `listener_perf_metrics.csv` - System performance metrics

Each game session produces a separate pair of CSV files. Replay mode prefixes with `replay_`.

---

## Laps CSV (82 fields)

Each row represents one completed lap.

### Identity Fields
| Field | Type | Description |
|-------|------|-------------|
| `session_id` | string | Unique session identifier (e.g., `AbuDhabi_FP_Jan30_001`) |
| `lap_id` | string | Unique lap identifier (e.g., `AbuDhabi_FP_Jan30_001_L2`) |
| `timestamp_utc` | string | ISO 8601 timestamp when lap was recorded |
| `track` | string | Track name (e.g., `AbuDhabi`, `Monaco`, `Silverstone`) |
| `session_type` | string | Session type: `FP1`, `FP2`, `FP3`, `Q1`, `Q2`, `Q3`, `Race`, `TT` |
| `session_mode` | string | `ONLINE` or `LOCAL`. Empty values, or sessions recorded before this column existed, should be interpreted as `unknown` |
| `lap_number` | int | Lap number within the session |
| `total_race_laps` | int | Total laps in the race (from session packet, 0 for non-race sessions) |
| `position` | int | Race position (1-22) |
| `total_participants` | int | Number of cars on the grid at the start of the session (the denominator for `position`) |
| `ai_participants` | int | Number of AI participants at the start of the session (out of the `total_participants`) |
| `player_participants` | int | Number of human/player participants (out of the `total_participants`) at the start of the session |
| `lap_time` | string | Human-readable lap time (e.g., `1:30.252`) |
| `sector1_time` | string | Human-readable sector 1 time (e.g., `18.712`) |
| `sector2_time` | string | Human-readable sector 2 time |
| `sector3_time` | string | Human-readable sector 3 time |
| `gap_behind_sec` | float | Gap to car behind in seconds (0 when last) |
| `gap_ahead_sec` | float | Gap to car ahead in seconds (0 when leading) |
| `lap_time_ms` | int | Lap time in milliseconds |
| `sector1_ms` | int | Sector 1 time in milliseconds |
| `sector2_ms` | int | Sector 2 time in milliseconds |
| `sector3_ms` | int | Sector 3 time in milliseconds |

### Tyre Fields
| Field | Type | Description |
|-------|------|-------------|
| `tyre_compound` | string | Visual compound: `Soft`, `Medium`, `Hard`, `Inter`, `Wet` |
| `tyre_age_laps` | int | Laps on current tyre set |
| `tyre_wear` | string | Wear percentages as `FL\|FR\|RL\|RR` (e.g., `10\|10\|12\|12`) |
| `tyres_in_temp_window_score` | int | Tyre temperature window score (0-100). Asymmetric ranges: entry/exit surface temps vs `[core_min, core_max + 10]`, apex surface temps vs `[core_min - 7, core_max + 10]`. Formula: `round((samples_in_window / total_samples) * 100)`. 0 if no turn data or compound unknown. |
| `tyres_in_optimal_temp_window_score` | int | Optimal surface temperature score (0-100). Computes `surface_optimal = core_optimal + 10`, then checks entry/exit/apex surface temps against `[surface_optimal * 0.9, surface_optimal * 1.1]`, with apex lower bound relaxed by 7°C. 0 if no turn data or compound unknown. |
| `tyres_in_optimal_carcass_temp_window` | int | Optimal carcass temperature score (0-100). Checks 4 tyre carcass (inner) temps at apex of each turn against `core_optimal ± 10%`. Formula: `round((samples_in_optimal / total_samples) * 100)`. 0 if no turn data or compound unknown. |

### Context Fields
| Field | Type | Description |
|-------|------|-------------|
| `ai_difficulty` | int | AI difficulty setting (0-110) |
| `assists_any` | bool | True if any driving assist is enabled (including simulation settings) |
| `damage_any` | bool | True if the car took damage beyond light contact (summary flag). Laps with it set are excluded from analysis |
| `weather` | string | `Clear`, `LightCloud`, `Overcast`, `LightRain`, `HeavyRain`, `Storm` |
| `time_of_day` | string | Time of day: `Night` (0-5h), `Morning` (6-11h), `Afternoon` (12-17h), `Evening` (18-23h). Empty if not reported. |

### DRS Fields
| Field | Type | Description |
|-------|------|-------------|
| `drs_or_sm_activated_count` | int | Times DRS (2025) or S-Mode (2026) was activated during the lap |
| `drs_or_sm_behind_activations` | int | Times car behind activated DRS (2025) or S-Mode (2026) |

### Energy Fields
| Field | Type | Description |
|-------|------|-------------|
| `fuel_load` | float | Fuel remaining at end of lap (kg) |
| `battery_deployed_total` | float | Total ERS battery energy used (0-100%+) |
| `battery_deployed_overtake` | float | Total ERS battery energy used with the overtake button held (0-100%+) |
| `battery_deployed_boost` | float | Total ERS battery energy used while boost was active (0-100%+). 2026 regulations only; 0 otherwise. Boost lasts one lap and is available only to a car within 1s of the car ahead at the boost measurement marker before that lap begins |
| `battery_recharged_total` | float | ERS battery level recharged during the lap (0-100%+) |
| `battery_start` | float | Remaining ERS battery at lap start (0-100%) |
| `battery_end` | float | Remaining ERS battery at lap end (0-100%) |

### Performance Fields
| Field | Type | Description |
|-------|------|-------------|
| `max_speed_kph` | int | Maximum speed reached during the lap (km/h) |

### Lap Type Flags
| Field | Type | Description |
|-------|------|-------------|
| `is_first_lap` | bool | True if lap 1 of a race (standing start) |
| `is_inlap` | bool | True if car pitted during this lap |
| `is_outlap` | bool | True if previous lap was an inlap |
| `is_safety_car` | bool | True if safety car was active |
| `time_in_pits_ms` | int | Total time spent in pit lane (ms), from pit entry to pit exit. 0 if car did not pit. |
| `pit_stop_time_ms` | int | Time spent stationary in pit box (ms), from arriving at box to being released. 0 if car did not pit. |

### Penalties and Issues
| Field | Type | Description |
|-------|------|-------------|
| `track_limits_violations` | int | Number of track limit violations |
| `corner_cutting_warnings` | int | Number of corner cutting warnings incurred on this lap |
| `time_penalties_received_sec` | int | Time penalties awarded during this lap, in seconds (collisions, corner cuts, false start, pit-lane speeding, unserved drive-through/stop-go converted by the game) |
| `stuck_in_traffic_turn_count` | int | Number of turns with traffic interference ahead |

### Lockup/Spin Events
| Field | Type | Description |
|-------|------|-------------|
| `lockups_count` | int | Total lockup events |
| `lockups_minor` | int | Minor lockups (brief, shallow) |
| `lockups_medium` | int | Medium lockups |
| `lockups_severe` | int | Severe lockups (long, deep) |
| `spins_count` | int | Total wheelspin events |
| `spins_minor` | int | Minor wheelspins |
| `spins_medium` | int | Medium wheelspins |
| `spins_severe` | int | Severe wheelspins |

### Damage Fields
| Field | Type | Description |
|-------|------|-------------|
| `damage_fl_wing` | int | Front-left wing damage (0-100%) |
| `damage_fr_wing` | int | Front-right wing damage (0-100%) |
| `damage_rear_wing` | int | Rear wing damage (0-100%) |
| `damage_body` | bool | True if floor, diffuser or sidepod damage is at least 10%. Lighter contact is reported in `wear_levels` |
| `damage_wheels` | bool | True if any brake damage > 0 |
| `damage_terminal` | bool | True if engine blown/seized or terminal damage |

### Wear Fields
| Field | Type | Description |
|-------|------|-------------|
| `wear_levels` | string | Engine and gearbox wear, plus any contact too light to mark the lap damaged, as `engine:N\|floor:M`. Only non-zero components appear; empty if there are none |

### Detailed Assists
| Field | Type | Description |
|-------|------|-------------|
| `assists_tc` | int | Traction control: 0=off, 1=medium, 2=full |
| `assists_abs` | int | Anti-lock brakes: 0=off, 1=on |
| `assists_gearbox` | int | Gearbox: 0=manual, 1=suggested, 2=auto |
| `assists_racing_line` | int | Racing line: 0=off, 1=corners, 2=full |
| `assists_others` | bool | True if any of: steering/braking/pit/ERS/DRS assists on, or any simulation setting is non-default |
| `other_assists` | string | Pipe-delimited enabled assists. Only enabled assists are listed. Example: `steering:On\|braking:High\|ers:On`. Mapping: `steering_assist`: 0=skip, 1=`steering:On`; `braking_assist`: 0=skip, 1=`braking:Low`, 2=`braking:Medium`, 3=`braking:High`; `pit_assist`: 0=skip, 1=`pit_assist:On`; `pit_release_assist`: 0=skip, 1=`pit_release:On`; `ers_assist`: 0=skip, 1=`ers:On`; `drs_or_sm_assist`: 0=skip, 1=`drs_or_sm:On`. |
| `assists_simulation_settings` | string | Non-default simulation settings. Empty if all defaults (unassisted). Format: `assisted_race_start:TRUE\|assisted_car_damage:Low\|assisted_collisions:Reduced`. Mapping: `race_starts` 0(Manual)=omitted, 1(Assisted)=`assisted_race_start:TRUE`; `car_damage` 3(Simulation)=omitted, 2(Standard)=`assisted_car_damage:Low`, 1(Reduced)=`assisted_car_damage:Medium`, 0(Off)=`assisted_car_damage:On`; `collisions` 2(On)=omitted, 1(P2P Off)=`assisted_collisions:Reduced`, 0(Off)=`assisted_collisions:On`. |
| `flashback_enabled` | int | Recovery mode: 0=None, 1=Flashbacks, 2=Auto-recovery |
| `flashback_occurred` | bool | True if flashback was used during lap |

### Validity Fields
| Field | Type | Description |
|-------|------|-------------|
| `lap_valid` | bool | True if lap time is valid |
| `sectors_invalid` | string | Pipe-delimited invalid sector numbers. Empty if all valid. Example: `1\|3` means sectors 1 and 3 are invalid. |

### Status Fields
| Field | Type | Description |
|-------|------|-------------|
| `is_complete` | bool | True if lap was fully completed (all 3 sectors posted) |
| `car_reg_year` | int | Season regulations the cars ran under: `2025` or `2026` |
| `version` | string | App version that produced this row (e.g., `0.2.7`) |

---

## Turns CSV (72 fields)

Each row represents one turn within a lap. Requires calibration data for the track.

### Identity Fields
| Field | Type | Description |
|-------|------|-------------|
| `lap_id` | string | Links to laps.csv (e.g., `AbuDhabi_FP_Jan30_001_L2`) |
| `turn_number` | int/string | Turn number (1-based), or `"RaceStart"` for the standing start (see below) |
| `flat_out` | bool | True if turn is taken flat-out (no braking) |

### Position Fields
| Field | Type | Description |
|-------|------|-------------|
| `position_entry` | int | Race position when entering the turn (1-20) |
| `position_exit` | int | Race position when exiting the turn (1-20) |

### Braking Fields
| Field | Type | Description |
|-------|------|-------------|
| `braking_start_dist` | float | Distance in lap (m) where braking started |
| `braking_start_speed` | float | Speed (km/h) at braking start |
| `braking_start_gear` | int | Gear at braking start |
| `time_at_braking_ms` | int | Lap time (ms) at braking start |
| `gap_behind_at_entry` | float | Gap to car behind at turn entry (0 when last) |
| `gap_ahead_at_entry` | float | Gap to car ahead at turn entry (0 when leading) |

### Entry Fields
| Field | Type | Description |
|-------|------|-------------|
| `entry_dist` | float | Distance in lap (m) at turn entry (calibrated zone_start) |
| `entry_speed` | float | Speed (km/h) at turn entry |
| `entry_gear` | int | Gear at turn entry |
| `time_at_entry_ms` | int | Lap time (ms) at turn entry |

### Apex Fields
| Field | Type | Description |
|-------|------|-------------|
| `apex_dist` | float | Distance in lap (m) at apex |
| `apex_speed` | float | Speed (km/h) at apex |
| `apex_gear` | int | Gear at apex |
| `time_at_apex_ms` | int | Lap time (ms) at apex |

### Exit Fields
| Field | Type | Description |
|-------|------|-------------|
| `exit_dist` | float | Distance in lap (m) at turn exit |
| `exit_speed` | float | Speed (km/h) at exit |
| `exit_gear` | int | Gear at exit |
| `time_at_exit_ms` | int | Lap time (ms) at exit |
| `gap_behind_at_exit` | float | Gap to car behind at exit |
| `gap_ahead_at_exit` | float | Gap to car ahead at exit (0 when leading) |

### Throttle Commitment Fields
| Field | Type | Description |
|-------|------|-------------|
| `throttle_committed_dist` | float | Distance in lap (m) where throttle committed (>= 65%) after apex |
| `throttle_committed_speed` | float | Speed (km/h) at throttle commitment |
| `throttle_committed_gear` | int | Gear at throttle commitment |
| `time_at_throttle_committed_ms` | int | Lap time (ms) at throttle commitment |

### Turn Metrics
| Field | Type | Description |
|-------|------|-------------|
| `time_in_turn_ms` | int | Total time spent in turn (ms) |
| `max_brake_before_apex` | int | Maximum brake pressure (0-100%) before calibrated apex |
| `max_throttle_after_apex` | int | Maximum throttle (0-100%) after calibrated apex |

### Battery Fields
| Field | Type | Description |
|-------|------|-------------|
| `battery_deployed_prev_straight` | float | ERS battery energy used between the previous turn's apex and this turn's apex (0 - 100%) |
| `battery_overtake_deployed_prev_straight` | float | ERS battery energy used with the overtake button held, between the previous turn's apex and this turn's apex (0 - 100%) |
| `battery_boost_deployed_prev_straight` | float | ERS battery energy used while boost was active, between the previous turn's apex and this turn's apex (0 - 100%). 2026 regulations only; 0 otherwise. See `battery_deployed_boost` for when boost is available |
| `battery_recharged_prev_straight` | float | ERS battery level recharged between the previous turn's apex and this turn's apex, covering the lift and the braking into the corner (0 - 100%) |

### Events in Turn
| Field | Type | Description |
|-------|------|-------------|
| `lockups` | int | Total lockups in this turn |
| `spins` | int | Total wheelspins in this turn |
| `lockups_front_minor` | int | Minor front axle lockups in turn |
| `lockups_front_medium` | int | Medium front axle lockups in turn |
| `lockups_front_severe` | int | Severe front axle lockups in turn |
| `lockups_rear_minor` | int | Minor rear axle lockups in turn |
| `lockups_rear_medium` | int | Medium rear axle lockups in turn |
| `lockups_rear_severe` | int | Severe rear axle lockups in turn |
| `spins_minor` | int | Minor wheelspins in turn |
| `spins_medium` | int | Medium wheelspins in turn |
| `spins_severe` | int | Severe wheelspins in turn |
| `in_traffic` | bool | True if traffic affected this turn |
| `collision_events` | int | Number of collision events that this car was involved in during this turn |
| `corner_cutting_events` | int | Corner-cutting warnings issued during the turn |
| `time_penalties_received_sec` | int | Time penalties that ticked while the car was in this turn's zone. Collision and corner-cut penalties are earned where they tick; a false start or pit-lane penalty lands where the game announced it, so the lap column is the reliable total |
| `retried_with_flashback` | bool | True if this turn was re-executed after a flashback rewind |

### Tyre Temperatures
| Field | Type | Description |
|-------|------|-------------|
| `tyre_temps_entry` | string | Tyre surface temps at turn entry: `FL\|FR\|RL\|RR` (e.g., `90\|91\|98\|99`) |
| `tyre_temps_apex` | string | Tyre surface temps at apex: `FL\|FR\|RL\|RR` (e.g., `92\|93\|100\|101`) |
| `tyre_temps_exit` | string | Tyre surface temps at turn exit: `FL\|FR\|RL\|RR` (e.g., `93\|94\|101\|102`) |
| `tyre_carcass_temps` | string | Tyre carcass (inner) temps at apex: `FL\|FR\|RL\|RR` (e.g., `85\|86\|88\|89`). Captured at apex only since carcass temps change slowly. |

### Setup Fields
| Field | Type | Description |
|-------|------|-------------|
| `brake_bias` | int | Front brake bias percentage at turn entry (live value from MFD) |
| `differential` | int | On-throttle differential percentage at turn entry (live value) |
| `off_throttle_diff` | int | Off-throttle differential percentage at turn entry |
| `engine_braking` | int | Engine braking percentage at turn entry |

### Turn Sampling

These fields capture telemetry at evenly-spaced distances through each turn, from zone entry to exit. Regular turns use 20 sample points. The RaceStart turn uses variable density (~1 sample per 10m, minimum 20), resulting in more samples for longer acceleration zones. Samples are equidistant in **space**, not time.

#### Reference Fields
| Field | Type | Description |
|-------|------|-------------|
| `turn_series_distances` | string | N distances in meters: `290\|295\|300\|...` (N=20 for regular turns, variable for RaceStart). Use as reference for sampling series fields. |
| `turn_series_times` | string | N lap times in ms: `18500\|18620\|18750\|...`. Use as reference for sampling series fields. |

#### Car telemetry sampling Fields within turn
| Field | Type | Description |
|-------|------|-------------|
| `turn_positions` | string | N X;Z world positions: `X1;Z1\|X2;Z2\|...` |
| `turn_speeds` | string | N speeds in km/h: `293\|280\|250\|...` |
| `turn_brakes` | string | N brake percentages: `0\|15\|80\|...` |
| `turn_throttles` | string | N throttle percentages: `0\|0\|10\|...` |
| `turn_gears` | string | N gear numbers: `8\|8\|7\|6\|5\|4\|3\|...` |

Use `turn_series_distances` and `turn_series_times` as reference axes when analyzing the other fields.

#### Vehicle Dynamics Fields within turn
| Field | Type | Description |
|-------|------|-------------|
| `turn_wheel_angles` | string | N front wheel steering angles in radians (4 decimal places): `0.0234\|0.0456\|...` |
| `turn_slip_ratios` | string | N wheel slip ratios (RL;RR;FL;FR per sample, 3 decimal places): `0.001;0.002;0.003;0.004\|...` |
| `turn_yaw_rates` | string | N yaw rates in rad/s (3 decimal places): `0.123\|0.456\|...` |
| `turn_longitudinal_g` | string | N longitudinal G-force values (2 decimal places): `0.12\|-0.45\|...` |

Use `turn_series_distances` and `turn_series_times` as reference axes when analyzing the other fields.

### Metadata Fields
| Field | Type | Description |
|-------|------|-------------|
| `version` | string | App version that produced this row (e.g., `0.2.7`) |

### RaceStart Turn

In Race sessions, Lap 1 includes a special `turn_number="RaceStart"` row that tracks the standing start phase from first car movement to T1's braking zone. This only appears on standing starts (not Safety Car restarts).

| Field | RaceStart Meaning |
|-------|---------------------|
| `time_at_entry_ms` | Driver reaction time: milliseconds from lights-out to first car movement (±16ms precision) |
| `entry_dist/speed/gear` | First car movement off the grid line (speed near 0, Gear 1) |
| `apex_dist/speed/gear` | First upshift to Gear 3 (end of traction phase) |
| `exit_dist/speed/gear` | Approach to T1 braking zone (high speed, Gear 4-5) |
| `braking_start_dist` | Typically 0 (no braking during launch) |
| `max_brake_before_apex` | Typically 0 |
| `throttle_committed_dist` | First point after Gear 3 where throttle >= 65% (usually immediate) |

---

## Errors CSV (9 fields, `errors.csv`)

Single append-only error log, created lazily (only when errors occur). Each row records a processing error.

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | string | Session time or ISO timestamp |
| `session_id` | string | Human-readable session ID |
| `lap_id` | string | Lap ID if available |
| `version` | string | App version |
| `listener_context` | string | CLI flags/config summary |
| `error_area` | string | Component where error occurred (e.g., `CarStatus`, `LapData`) |
| `error_message` | string | Error description |
| `error_traceback` | string | Full Python traceback |
| `raw_packet_hex` | string | Hex dump of the packet that triggered the error |

---

## Performance CSV (10 fields, `listener_perf_metrics.csv`)

System performance metrics for debugging latency issues. Sampled every ~5 seconds (300 packets at 60Hz).

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | string | ISO 8601 timestamp |
| `version` | string | App version that produced this row (e.g., `0.2.7`) |
| `packet_id` | int | F1 25 packet type ID |
| `socket_read_ms` | float | Time to read from socket (ms) |
| `forward_ms` | float | Time to forward packet (ms) |
| `capture_write_ms` | float | Time to write raw bin capture (ms, 0 if capture off) |
| `processing_ms` | float | Total processing time (ms) |
| `laps_processing_ms` | float | Lap-related processing time (ms) |
| `turns_processing_ms` | float | Turn-related processing time (ms) |
| `writer_ms` | float | CSV write time (ms) |

---

## Notes

### Session ID Format
```
{Track}_{SessionType}_{MonthDay}_{Counter}
```
Example: `AbuDhabi_FP_Jan30_001`

### Lap ID Format
```
{SessionID}_L{LapNumber}
```
Example: `AbuDhabi_FP_Jan30_001_L2`

### Artifact Lap Filtering
Artifact laps are automatically filtered out based on `driver_status`:
- `IN_GARAGE` (driver_status=0): Car is in garage
- `FLYING_LAP` (driver_status=1): AI-driven flying lap in FP/Quali
- Incomplete L1: Lap 1 with no sector 1 time (restarted before completing)

### Calibration Data
Turn-level data requires calibration files in `telemetry_logs/calibration/{track}/{session_type}_turns.json`. Run calibration mode with AI cars to generate these files.

### Data Types
- `string`: Text values (may be empty)
- `int`: Integer values
- `float`: Decimal values
- `bool`: `True` or `False`

### CSV Format
- Standard CSV with comma delimiters
- UTF-8 encoding
- Header row on first line
- Boolean values as Python literals (`True`/`False`)
