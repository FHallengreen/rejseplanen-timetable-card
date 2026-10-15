# Rejseplanen Timetable Card

A Home Assistant dashboard card for Danish public transport departures via the [Rejseplanen API](https://labs.rejseplan.dk/).

![Rejseplanen Timetable Card showing S-tog, regional trains, metro and buses at København H](https://raw.githubusercontent.com/FHallengreen/rejseplanen-timetable-card/main/assets/preview.png)

*One card per service at København H: S-tog and metro in the light theme, regional & InterCity trains and buses in the dark theme.*

## Features

- Departures with line, destination, time, minutes until departure, and status (see [Status](#status))
- Cancelled departures are struck through so they can't be mistaken for running services
- Sorted by actual departure time, so delayed services move down the list
- Live countdown that ticks between sensor updates; departed services are hidden automatically
- Platform, stand, or bay information; stop names only shown when the board covers several stops
- Layout adapts to narrow and wide cards (masonry, sections, mobile)
- Official line colors for Metro, S-train, regional trains, Lokaltog, and Copenhagen buses
- Automatic transport mode detection (bus, train, metro, tram, boat)
- Danish, English, and Swedish translations (follows your Home Assistant language, see [Language](#language))

## Installation

### HACS (recommended)

1. Add this repository as a custom repository in HACS (Frontend)
2. Install "Rejseplanen Timetable Card"
3. Reload resources when prompted

### Manual

1. Download `rejseplanen-timetable-card.js` from the [latest release](../../releases/latest)
2. Copy to `config/www/rejseplanen-timetable-card/`
3. Add resource: URL `/local/rejseplanen-timetable-card/rejseplanen-timetable-card.js`, Type `JavaScript Module`
4. Hard refresh your browser (Ctrl+Shift+R)

## Sensor Setup

The card reads raw Rejseplanen API data from a REST sensor's `Departure` attribute. No template sensors are needed for basic use.

### Get an Access ID

Register at [Rejseplanen Labs](https://labs.rejseplan.dk/) to get your API key.

> [!IMPORTANT]
> Always include `format=json` in the API URL. Without it the API answers in XML, which the card cannot read (the card shows an error telling you so). XML responses also change structure on 2026-11-25 ([announcement](https://labs.rejseplan.dk/hc/da/articles/38992766513565)); JSON sensors are not affected.

> [!NOTE]
> How often data refreshes is set by `scan_interval` on the REST sensor (seconds), not by the card. Between refreshes the card keeps counting down locally.

### Option A: Nearby departures (all transport types)

Best for showing buses and other transport from stops near your location.

**configuration.yaml:**

```yaml
sensor:
  - platform: rest
    name: Rejseplanen nearby departures
    resource: !secret rejseplanen_url
    scan_interval: 240
    timeout: 30
    value_template: >
      {% if value_json is defined and value_json.Departure is defined %}
        {{ value_json.Departure | length }}
      {% else %}
        0
      {% endif %}
    json_attributes:
      - Departure
      - requestId
      - serverVersion
```

**secrets.yaml:**

```yaml
rejseplanen_url: "https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=YOUR_ACCESS_ID&originCoordLat=YOUR_LAT&originCoordLong=YOUR_LON&r=1000&maxStops=5&duration=120&maxJourneys=30&format=json"
```

**API parameters:**

| Parameter       | Description                        | Example  |
| --------------- | ---------------------------------- | -------- |
| `r`           | Search radius in meters            | `1000` |
| `maxStops`    | Max nearby stops to include        | `5`    |
| `maxJourneys` | Max total departures               | `30`   |
| `duration`    | Time window in minutes             | `120`  |
| `products`    | Transport type bitmask (see below) | `15`   |

> **Tip:** If buses fill up all results before train stations are reached, reduce `maxStops` or use a smaller radius. For trains, consider using **Option B** instead.

### Option B: Station departures (recommended for trains)

Best for showing departures from a specific station. Use `departureBoard` with a station ID to guarantee results from that station.

**configuration.yaml:**

```yaml
sensor:
  - platform: rest
    name: Rejseplanen København H trains
    resource: !secret rejseplanen_trains_url
    scan_interval: 240
    timeout: 30
    value_template: >
      {% if value_json is defined and value_json.Departure is defined %}
        {{ value_json.Departure | length }}
      {% else %}
        0
      {% endif %}
    json_attributes:
      - Departure
      - requestId
      - serverVersion
```

**secrets.yaml:**

```yaml
rejseplanen_trains_url: "https://www.rejseplanen.dk/api/departureBoard?accessId=YOUR_ACCESS_ID&id=8600626&duration=120&maxJourneys=15&useBus=0&useMetro=0&format=json"
```

**departureBoard parameters:**

| Parameter       | Description                                    | Example                    |
| --------------- | ---------------------------------------------- | -------------------------- |
| `id`          | Station ID (find via Rejseplanen location API) | `8600626` (København H) |
| `useBus`      | Include buses (0/1)                            | `0`                      |
| `useMetro`    | Include metro (0/1)                            | `0`                      |
| `useTog`      | Include trains (0/1)                           | `1`                      |
| `maxJourneys` | Max departures                                 | `15`                     |
| `duration`    | Time window in minutes                         | `120`                    |

### Products bitmask (for `nearbyDepartureBoard`)

| Bit | Value | Type                    |
| --- | ----- | ----------------------- |
| 1   | 1     | Long-distance (ICL/Lyn) |
| 2   | 2     | InterCity               |
| 3   | 4     | Regional trains         |
| 4   | 8     | S-tog                   |
| 5   | 16    | Metro                   |
| 6   | 32    | Bus                     |
| 7   | 64    | Ferry                   |
| 8   | 128   | Letbane/Tram            |

Sum the values you want: trains only = `15`, everything except bus = `223`, all = `255` (or omit).

### Example: one card per service

The screenshot at the top uses four sensors around København H, one per service, by combining a small radius with the `products` bitmask. YAML anchors keep the shared settings in one place.

**configuration.yaml:**

```yaml
sensor:
  - platform: rest
    name: København H · S-tog
    resource: !secret kbh_stog_url
    <<: &rejseplanen
      scan_interval: 240
      timeout: 30
      value_template: >
        {% if value_json is defined and value_json.Departure is defined %}
          {{ value_json.Departure | length }}
        {% else %}
          0
        {% endif %}
      json_attributes:
        - Departure

  - platform: rest
    name: København H · Regional & IC
    resource: !secret kbh_regional_url
    <<: *rejseplanen

  - platform: rest
    name: København H · Metro
    resource: !secret kbh_metro_url
    <<: *rejseplanen

  - platform: rest
    name: Hovedbanegården · Bus
    resource: !secret kbh_bus_url
    <<: *rejseplanen
```

**secrets.yaml** (same coordinates and radius, different `products`):

```yaml
kbh_stog_url: "https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=YOUR_ACCESS_ID&originCoordLat=55.672778&originCoordLong=12.564444&r=300&products=8&duration=60&maxJourneys=10&format=json"
kbh_regional_url: "https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=YOUR_ACCESS_ID&originCoordLat=55.672778&originCoordLong=12.564444&r=300&products=7&duration=60&maxJourneys=10&format=json"
kbh_metro_url: "https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=YOUR_ACCESS_ID&originCoordLat=55.672778&originCoordLong=12.564444&r=300&products=16&duration=60&maxJourneys=10&format=json"
kbh_bus_url: "https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=YOUR_ACCESS_ID&originCoordLat=55.672778&originCoordLong=12.564444&r=300&products=32&duration=60&maxJourneys=10&format=json"
```

`products=7` combines Lyn (1), InterCity (2) and regional trains (4); see the bitmask table above.

## Card Configuration

| Option        | Type    | Default      | Description                       |
| ------------- | ------- | ------------ | --------------------------------- |
| `entity`    | string  | *required* | Sensor entity ID                  |
| `show_name` | boolean | `true`     | Show entity name as card heading  |
| `max_items` | number  | `5`        | Max departures to display (1–20) |

### Examples

```yaml
# Simple
type: custom:rejseplanen-timetable-card
entity: sensor.rejseplanen_nearby_departures
max_items: 10

# One card per service (as in the screenshot)
type: grid
columns: 2
square: false
cards:
  - type: custom:rejseplanen-timetable-card
    entity: sensor.kobenhavn_h_s_tog
  - type: custom:rejseplanen-timetable-card
    entity: sensor.kobenhavn_h_metro
  - type: custom:rejseplanen-timetable-card
    entity: sensor.kobenhavn_h_regional_ic
  - type: custom:rejseplanen-timetable-card
    entity: sensor.hovedbanegarden_bus
```

You can also add the card from the UI: Dashboards → Edit → Add Card → search "Rejseplanen Timetable".

### Status

| Status                           | Meaning                                                                    |
| -------------------------------- | -------------------------------------------------------------------------- |
| **On time** (green)        | Live data from Rejseplanen confirms the departure is on time               |
| **Scheduled** (grey)       | No live data for this departure; the time is from the timetable            |
| **Delayed X min** (orange) | Live data shows the departure is late; the time shown is the expected time |
| **Cancelled** (red)        | The departure is cancelled and the row is struck through                   |

### Language

The card uses the language set in your Home Assistant **user profile** (click your name in the sidebar → **Language**). There is no card option for it.

| Profile language               | Card language |
| ------------------------------ | ------------- |
| Dansk                          | Danish        |
| Svenska                        | Swedish       |
| English, or any other language | English       |

This covers the card's own labels (status, "in X min", platform, editor). Stop names and destinations come from Rejseplanen and are shown as-is.

Times are always shown in 24-hour format (13:35), like Danish timetables, regardless of language or time format setting.

Missing your language? Add a file in `src/translations/` (copy `en.json`) and register it in `src/localize.ts`. PRs welcome.

## Optional: Template Sensor Filtering

For advanced filtering (by line, minimum time, etc.), create template sensors. The card reads the `Departure` attribute.

<details>
<summary>Filter by transport type</summary>

```yaml
template:
  - sensor:
      - name: Rejseplanen Buses
        unique_id: rejseplanen_buses
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set filtered = namespace(items=[]) %}
          {% for d in deps %}
            {% if 'Bus' in (d.ProductAtStop | default({})).catOutL | default('') | string %}
              {% set filtered.items = filtered.items + [d] %}
            {% endif %}
          {% endfor %}
          {{ filtered.items | length }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {% set filtered = namespace(items=[]) %}
            {% for d in deps %}
              {% if 'Bus' in (d.ProductAtStop | default({})).catOutL | default('') | string %}
                {% set filtered.items = filtered.items + [d] %}
              {% endif %}
            {% endfor %}
            {{ filtered.items }}
```

</details>

<details>
<summary>Filter by specific lines</summary>

```yaml
template:
  - sensor:
      - name: Rejseplanen My Lines
        unique_id: rejseplanen_my_lines
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set my_lines = ['2A', '5C', 'M1', 'M2'] %}
          {% set filtered = namespace(items=[]) %}
          {% for d in deps %}
            {% set line = (d.ProductAtStop | default({})).displayNumber | default('') %}
            {% if line in my_lines %}
              {% set filtered.items = filtered.items + [d] %}
            {% endif %}
          {% endfor %}
          {{ filtered.items | length }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {% set my_lines = ['2A', '5C', 'M1', 'M2'] %}
            {% set filtered = namespace(items=[]) %}
            {% for d in deps %}
              {% set line = (d.ProductAtStop | default({})).displayNumber | default('') %}
              {% if line in my_lines %}
                {% set filtered.items = filtered.items + [d] %}
              {% endif %}
            {% endfor %}
            {{ filtered.items }}
```

</details>

<details>
<summary>Filter by minimum time</summary>

```yaml
template:
  - sensor:
      - name: Rejseplanen Filtered by Time
        unique_id: rejseplanen_filtered_time
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set min_minutes = 10 %}
          {% set now = now() %}
          {% set filtered = namespace(items=[]) %}
          {% for d in deps %}
            {% set dep_time = d.rtTime | default(d.time, true) | default('') %}
            {% if dep_time | length >= 5 %}
              {% set mins = (dep_time[0:2] | int(0)) * 60 + (dep_time[3:5] | int(0)) - now.hour * 60 - now.minute %}
              {% if mins < -720 %}{% set mins = mins + 1440 %}{% endif %}
              {% if mins >= min_minutes %}
                {% set filtered.items = filtered.items + [d] %}
              {% endif %}
            {% endif %}
          {% endfor %}
          {{ filtered.items | length }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {% set min_minutes = 10 %}
            {% set now = now() %}
            {% set filtered = namespace(items=[]) %}
            {% for d in deps %}
              {% set dep_time = d.rtTime | default(d.time, true) | default('') %}
              {% if dep_time | length >= 5 %}
                {% set mins = (dep_time[0:2] | int(0)) * 60 + (dep_time[3:5] | int(0)) - now.hour * 60 - now.minute %}
                {% if mins < -720 %}{% set mins = mins + 1440 %}{% endif %}
                {% if mins >= min_minutes %}
                  {% set filtered.items = filtered.items + [d] %}
                {% endif %}
              {% endif %}
            {% endfor %}
            {{ filtered.items }}
```

</details>

### Filtering reference

| Field             | Values                                                                                                             | Use for                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `catOut`        | `Bus`, `MET`, `S`, `REG`, `IC`, `LYN`, `LOK`, `ØRE`                                               | Transport type matching |
| `catOutL`       | `Bus`, `S-Tog`, `Regionaltog`, `Metro`, `Letbane`, etc.                                                  | Readable type matching  |
| `displayNumber` | `2A`, `M1`, `A`, `354`, etc.                                                                               | Line filtering          |
| `icon.res`      | `prod_bus`, `prod_sub`, `prod_comm`, `prod_reg`, `prod_long`, `prod_loc`, `prod_tram`, `prod_ship` | Icon-based detection    |

## Line Colors

The card automatically applies official Danish transport colors:

| Category                | Lines                                                                                                                  | Color         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Metro**         | M1                                                                                                                     | Green         |
|                         | M2                                                                                                                     | Yellow        |
|                         | M3                                                                                                                     | Red           |
|                         | M4                                                                                                                     | Blue          |
| **S-train**       | A                                                                                                                      | Blue          |
|                         | B, BX                                                                                                                  | Green         |
|                         | C                                                                                                                      | Orange        |
|                         | E                                                                                                                      | Grey          |
|                         | F                                                                                                                      | Yellow        |
|                         | H                                                                                                                      | Red           |
| **DSB Trains**    | IC, ICL/LYN, REG                                                                                                       | DSB Red       |
| **Øresundståg** | ØRE, Øresund                                                                                                         | Green         |
| **Lokaltog**      | Hornbækbanen, Lille Nord, Frederiksværkbanen, Gribskovbanen, Nærumbanen, Østbanen, Odsherredsbanen, Tølløsebanen | Lokaltog Blue |
| **A-buses**       | 1A–9A                                                                                                                 | Red           |
| **S-buses**       | *S (Express)                                                                                                           | Blue          |
| **E-buses**       | E* (Express)                                                                                                           | Grey          |
| **N-buses**       | N* / *N (Night)                                                                                                        | Dark Blue     |
| **Regular buses** | Numeric (5C, 14, 150, etc.)                                                                                            | Yellow        |

## Development

```bash
npm install
npm run dev        # Development server
npm run typecheck  # TypeScript check
npm test           # Unit and render tests (Vitest)
npm run build      # Production build
```

Parsing logic lives in `src/departures.ts` and is tested against raw API fixtures in `tests/fixtures/`. See [CONTRIBUTING.md](CONTRIBUTING.md).

The build outputs `rejseplanen-timetable-card.js` in `dist/`.

## Troubleshooting

- **Card not found:** Ensure the resource is added in Lovelace resources and browser cache is cleared.
- **No data:** Verify the REST sensor updates correctly in Developer Tools → States. Check the `Departure` attribute exists.
- **No trains in nearby departures:** The `nearbyDepartureBoard` returns results by stop proximity. Bus stops closer to your coordinates fill the results first. Use `departureBoard` with a station ID for reliable train data, or reduce `maxStops`/`maxJourneys`.
- **"The sensor returns XML data":** Add `format=json` to the resource URL and restart Home Assistant.
- **Colors not showing:** Only recognized Danish lines get specific colors. Other lines use the default theme.

## Credits

Fork of [HomeAssistant_Trafiklab_Timetable_Card](https://github.com/MrSjodin/HomeAssistant_Trafiklab_Timetable_Card) adapted for Rejseplanen.

## License

MIT
