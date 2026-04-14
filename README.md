# Rejseplanen Timetable Card

A Home Assistant dashboard card for Danish public transport departures via the [Rejseplanen API](https://help.rejseplanen.dk/hc/da/articles/214174465).

![card](/assets/preview.png)

## Features

- Departures with line, destination, time, minutes until departure, and status (on time / delayed / cancelled)
- Platform, stand, or bay information
- Real-time indicator (RT)
- Official line colors for Metro, S-train, regional trains, Lokaltog, and Copenhagen buses
- Automatic transport mode detection (bus, train, metro, tram, boat)
- Danish, English, and Swedish translations

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

Register at [Rejseplanen Labs](https://help.rejseplanen.dk/hc/da/articles/214174465) to get your API key.

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

| Parameter | Description | Example |
|-----------|-------------|---------|
| `r` | Search radius in meters | `1000` |
| `maxStops` | Max nearby stops to include | `5` |
| `maxJourneys` | Max total departures | `30` |
| `duration` | Time window in minutes | `120` |
| `products` | Transport type bitmask (see below) | `15` |

> **Tip:** If buses fill up all results before train stations are reached, reduce `maxStops` or use a smaller radius. For trains, consider using **Option B** instead.

### Option B: Station departures (recommended for trains)

Best for showing departures from a specific station. Use `departureBoard` with a station ID to guarantee results from that station.

**configuration.yaml:**
```yaml
sensor:
  - platform: rest
    name: Rejseplanen Kokkedal trains
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
rejseplanen_trains_url: "https://www.rejseplanen.dk/api/departureBoard?accessId=YOUR_ACCESS_ID&id=8600664&duration=120&maxJourneys=15&useBus=0&useMetro=0&format=json"
```

**departureBoard parameters:**

| Parameter | Description | Example |
|-----------|-------------|---------|
| `id` | Station ID (find via Rejseplanen location API) | `8600664` (Kokkedal St.) |
| `useBus` | Include buses (0/1) | `0` |
| `useMetro` | Include metro (0/1) | `0` |
| `useTog` | Include trains (0/1) | `1` |
| `maxJourneys` | Max departures | `15` |
| `duration` | Time window in minutes | `120` |

### Products bitmask (for `nearbyDepartureBoard`)

| Bit | Value | Type |
|-----|-------|------|
| 1 | 1 | Long-distance (ICL/Lyn) |
| 2 | 2 | InterCity |
| 3 | 4 | Regional trains |
| 4 | 8 | S-tog |
| 5 | 16 | Metro |
| 6 | 32 | Bus |
| 7 | 64 | Ferry |
| 8 | 128 | Letbane/Tram |

Sum the values you want: trains only = `15`, everything except bus = `223`, all = `255` (or omit).

### Combining both

Use two REST sensors for a dashboard with separate bus and train cards:

```yaml
sensor:
  - platform: rest
    name: Rejseplanen nearby departures
    resource: !secret rejseplanen_url
    # ... (as above)

  - platform: rest
    name: Rejseplanen trains
    resource: !secret rejseplanen_trains_url
    # ... (as above)
```

## Card Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | *required* | Sensor entity ID |
| `show_name` | boolean | `true` | Show entity name as card heading |
| `max_items` | number | `5` | Max departures to display (1–20) |

### Examples

```yaml
# Simple
type: custom:rejseplanen-timetable-card
entity: sensor.rejseplanen_nearby_departures
max_items: 10

# Separate cards for buses and trains
type: vertical-stack
cards:
  - type: custom:rejseplanen-timetable-card
    entity: sensor.rejseplanen_trains
    show_name: true
    max_items: 6
  - type: custom:rejseplanen-timetable-card
    entity: sensor.rejseplanen_nearby_departures
    show_name: true
    max_items: 8
```

You can also add the card from the UI: Dashboards → Edit → Add Card → search "Rejseplanen Timetable".

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

| Field | Values | Use for |
|-------|--------|---------|
| `catOut` | `Bus`, `MET`, `S`, `REG`, `IC`, `LYN`, `LOK`, `ØRE` | Transport type matching |
| `catOutL` | `Bus`, `S-Tog`, `Regionaltog`, `Metro`, `Letbane`, etc. | Readable type matching |
| `displayNumber` | `2A`, `M1`, `A`, `354`, etc. | Line filtering |
| `icon.res` | `prod_bus`, `prod_sub`, `prod_comm`, `prod_reg`, `prod_long`, `prod_loc`, `prod_tram`, `prod_ship` | Icon-based detection |

## Line Colors

The card automatically applies official Danish transport colors:

| Category | Lines | Color |
|----------|-------|-------|
| **Metro** | M1 | Green |
| | M2 | Yellow |
| | M3 | Red |
| | M4 | Blue |
| **S-train** | A | Blue |
| | B, BX | Green |
| | C | Orange |
| | E | Grey |
| | F | Yellow |
| | H | Red |
| **DSB Trains** | IC, ICL/LYN, REG | DSB Red |
| **Øresundståg** | ØRE, Øresund | Green |
| **Lokaltog** | Hornbækbanen, Lille Nord, Frederiksværkbanen, Gribskovbanen, Nærumbanen, Østbanen, Odsherredsbanen, Tølløsebanen | Lokaltog Blue |
| **A-buses** | 1A–9A | Red |
| **S-buses** | *S (Express) | Blue |
| **E-buses** | E* (Express) | Grey |
| **N-buses** | N* / *N (Night) | Dark Blue |
| **Regular buses** | Numeric (5C, 14, 150, etc.) | Yellow |

## Development

```bash
npm install
npm run dev    # Development server
npm run build  # Production build
```

The build outputs `rejseplanen-timetable-card.js` in `dist/`.

## Troubleshooting

- **Card not found:** Ensure the resource is added in Lovelace resources and browser cache is cleared.
- **No data:** Verify the REST sensor updates correctly in Developer Tools → States. Check the `Departure` attribute exists.
- **No trains in nearby departures:** The `nearbyDepartureBoard` returns results by stop proximity. Bus stops closer to your coordinates fill the results first. Use `departureBoard` with a station ID for reliable train data, or reduce `maxStops`/`maxJourneys`.
- **Colors not showing:** Only recognized Danish lines get specific colors. Other lines use the default theme.

## Credits

Fork of [HomeAssistant_Trafiklab_Timetable_Card](https://github.com/MrSjodin/HomeAssistant_Trafiklab_Timetable_Card) adapted for Rejseplanen.

## License

MIT
