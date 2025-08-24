# Rejseplanen Timetable Card

A Home Assistant Dashboard card that shows upcoming departures from Rejseplanen (Danish public transport).

![card](/assets/preview.png)

## Features
- Shows type, line, destination, time, minutes until departure, and status (on time / delayed / cancelled)
- Shows the Platform/Stand/Bay where the service departures from or arrives to
- Real-time indicator (RT) when applicable
- Line-specific colors for Danish Metro (M1-M4) and S-train lines (A, B, BX, C, E, F, H)
- Configurable number of items, optional heading
- Danish, English and Swedish translations

## Requirements
- Home Assistant 2024.1+ (tested)
- Rejseplanen REST sensor (see configuration example below)

## Installation

### HACS (recommended)
1. Add this repository as a custom repository in HACS (Frontend).
2. Install "Rejseplanen Timetable Card".
3. Reload resources when prompted.

### Manual
1. Download `rejseplanen-timetable-card.js` from the latest GitHub release.
2. Copy it to `config/www/rejseplanen-timetable-card/` on your HA instance.
3. Add a resource:
   - URL: `/local/rejseplanen-timetable-card/rejseplanen-timetable-card.js`
   - Type: `Dashboard`
4. Refresh your browser cache (Ctrl+Shift+R).

## Rejseplanen Sensor Setup

You need to configure a REST sensor to fetch data from Rejseplanen and a template sensor to format it for the card.

### Step 1: Add REST Sensor

Add this to your `configuration.yaml`:

```yaml
sensor:
  - platform: rest
    name: Rejseplanen nearby departures
    resource: !secret rejseplanen_url
    scan_interval: 240
    timeout: 30
    value_template: >
      {% if value_json is defined %}
        {{ value_json.requestId if value_json.requestId is defined else 'json_ok_no_requestId' }}
      {% else %}
        not_json
      {% endif %}
    json_attributes:
      - Departure
      - requestId
      - serverVersion
```

In your `secrets.yaml`, add your Rejseplanen API URL:
```yaml
rejseplanen_url: "https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=YOUR_ACCESS_ID&originCoordLat=YOUR_LATITUDE&originCoordLong=YOUR_LONGITUDE&r=1000&maxStations=15&duration=120&maxJourneys=30&format=json"
```

**Get your Access ID:**
- Register at [Rejseplanen Labs](https://help.rejseplanen.dk/hc/da/articles/214174465)
- Replace `YOUR_ACCESS_ID` with your API key
- Replace `YOUR_LATITUDE` and `YOUR_LONGITUDE` with your location coordinates
- Adjust `r` (radius in meters), `duration` (minutes), and `maxJourneys` as needed

## Add the card

**That's it!** The card can now work directly with the Rejseplanen REST sensor. No template sensors needed!

You can add the card from the UI (recommended) or via YAML.

### UI (Visual editor)
- Go to Dashboards → Edit Dashboard → Add Card → search for "Rejseplanen Timetable".
- Choose `sensor.rejseplanen_nearby_departures` in the CONFIG tab
- Adjust `max_items` as needed

### Basic YAML example:
```yaml
type: custom:rejseplanen-timetable-card
entity: sensor.rejseplanen_nearby_departures
show_name: true
max_items: 15
```

## Optional: Filtered Sensors

If you want to filter departures or create separate cards for specific transport types, you can create template sensors:

```yaml
template:
  - sensor:
      # Filter by time: Only show departures at least 10 minutes away
      - name: Rejseplanen Filtered by Time
        unique_id: rejseplanen_filtered_time
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set now = now() %}
          {% set filtered = [] %}
          {% for d in deps %}
            {% set dep_time = d.rtTime if d.rtTime else d.time %}
            {% if dep_time %}
              {% set dep_hour = dep_time[0:2] | int(0) %}
              {% set dep_min = dep_time[3:5] | int(0) %}
              {% set dep_total = dep_hour * 60 + dep_min %}
              {% set now_total = now.hour * 60 + now.minute %}
              {% set minutes_until = dep_total - now_total %}
              {% if minutes_until < -720 %}{% set minutes_until = minutes_until + 1440 %}{% endif %}
              {% if minutes_until >= 10 %}
                {% set filtered = filtered + [d] %}
              {% endif %}
            {% endif %}
          {% endfor %}
          {{ filtered | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {% set now = now() %}
            {% set filtered = [] %}
            {% for d in deps %}
              {% set dep_time = d.rtTime if d.rtTime else d.time %}
              {% if dep_time %}
                {% set dep_hour = dep_time[0:2] | int(0) %}
                {% set dep_min = dep_time[3:5] | int(0) %}
                {% set dep_total = dep_hour * 60 + dep_min %}
                {% set now_total = now.hour * 60 + now.minute %}
                {% set minutes_until = dep_total - now_total %}
                {% if minutes_until < -720 %}{% set minutes_until = minutes_until + 1440 %}{% endif %}
                {% if minutes_until >= 10 %}
                  {% set filtered = filtered + [d] %}
                {% endif %}
              {% endif %}
            {% endfor %}
            {{ filtered }}
      
      # Filter by specific lines: Only show specific lines (e.g., Metro M1 and M2)
      - name: Rejseplanen My Lines
        unique_id: rejseplanen_my_lines
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set my_lines = ['M1', 'M2', '5A'] %}
          {% set filtered = [] %}
          {% for d in deps %}
            {% set line = d.ProductAtStop.displayNumber if d.ProductAtStop.displayNumber is defined else d.name %}
            {% if line in my_lines %}
              {% set filtered = filtered + [d] %}
            {% endif %}
          {% endfor %}
          {{ filtered | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {% set my_lines = ['M1', 'M2', '5A'] %}
            {% set filtered = [] %}
            {% for d in deps %}
              {% set line = d.ProductAtStop.displayNumber if d.ProductAtStop.displayNumber is defined else d.name %}
              {% if line in my_lines %}
                {% set filtered = filtered + [d] %}
              {% endif %}
            {% endfor %}
            {{ filtered }}
      
      # Blacklist: Exclude specific lines (e.g., night buses)
      - name: Rejseplanen Without Lines
        unique_id: rejseplanen_blacklist
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set blacklist = ['1N', '2N', '3N'] %}
          {% set filtered = [] %}
          {% for d in deps %}
            {% set line = d.ProductAtStop.displayNumber if d.ProductAtStop.displayNumber is defined else d.name %}
            {% if line not in blacklist %}
              {% set filtered = filtered + [d] %}
            {% endif %}
          {% endfor %}
          {{ filtered | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {% set blacklist = ['1N', '2N', '3N'] %}
            {% set filtered = [] %}
            {% for d in deps %}
              {% set line = d.ProductAtStop.displayNumber if d.ProductAtStop.displayNumber is defined else d.name %}
              {% if line not in blacklist %}
                {% set filtered = filtered + [d] %}
              {% endif %}
            {% endfor %}
            {{ filtered }}
      
      # Filter by station (replace 'YourStation' with your actual station name)
      - name: Rejseplanen Specific Station
        unique_id: rejseplanen_station
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set filtered = deps | selectattr('stop', 'defined') | selectattr('stop', 'search', 'YourStation') | list %}
          {{ filtered | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {{ deps | selectattr('stop', 'defined') | selectattr('stop', 'search', 'YourStation') | list }}

```yaml
template:
  - sensor:
      # Filter: Only buses
      - name: Rejseplanen Buses
        unique_id: rejseplanen_buses
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set buses = deps | selectattr('ProductAtStop.catOutL', 'defined') | selectattr('ProductAtStop.catOutL', 'search', 'Bus') | list %}
          {{ buses | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {{ deps | selectattr('ProductAtStop.catOutL', 'defined') | selectattr('ProductAtStop.catOutL', 'search', 'Bus') | list }}
      
      # Filter: Only trains (S-tog)
      - name: Rejseplanen Trains
        unique_id: rejseplanen_trains
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set trains = deps | selectattr('ProductAtStop.catOutL', 'defined') | selectattr('ProductAtStop.catOutL', 'search', 'S-Tog') | list %}
          {{ trains | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {{ deps | selectattr('ProductAtStop.catOutL', 'defined') | selectattr('ProductAtStop.catOutL', 'search', 'S-Tog') | list }}
      
      # Filter: Only metro
      - name: Rejseplanen Metro
        unique_id: rejseplanen_metro
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set metro = deps | selectattr('ProductAtStop.catOut', 'defined') | selectattr('ProductAtStop.catOut', 'eq', 'MET') | list %}
          {{ metro | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {{ deps | selectattr('ProductAtStop.catOut', 'defined') | selectattr('ProductAtStop.catOut', 'eq', 'MET') | list }}
      
      # Filter: Specific lines only (e.g., bus 2A and 12)
      - name: Rejseplanen My Lines
        unique_id: rejseplanen_my_lines
        state: >
          {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
          {% set my_lines = deps | selectattr('ProductAtStop.displayNumber', 'defined') | selectattr('ProductAtStop.displayNumber', 'in', ['2A', '12']) | list %}
          {{ my_lines | count }}
        attributes:
          Departure: >
            {% set deps = state_attr('sensor.rejseplanen_nearby_departures','Departure') or [] %}
            {{ deps | selectattr('ProductAtStop.displayNumber', 'defined') | selectattr('ProductAtStop.displayNumber', 'in', ['2A', '12']) | list }}
```

**Filtering Tips:**
- The card reads the `Departure` attribute directly from Rejseplanen API
- Use simple Jinja filters in template sensors to create filtered views
- Filter by `ProductAtStop.catOutL` (Bus, S-Tog, Metro, etc.)
- Filter by `ProductAtStop.displayNumber` for specific lines
- Filter by `stop` field for specific stations

### YAML examples with filtered sensors:

```yaml
type: vertical-stack
cards:
  - type: custom:rejseplanen-timetable-card
    entity: sensor.rejseplanen_buses
    show_name: false
    max_items: 7
  - type: custom:rejseplanen-timetable-card
    entity: sensor.rejseplanen_trains
    show_name: false
    max_items: 6
  - type: custom:rejseplanen-timetable-card
    entity: sensor.rejseplanen_metro
    show_name: false
    max_items: 4
```

**Note:** Line-specific colors for Metro (M1, M2, M3, M4) and S-train lines (A, B, BX, C, E, F, H) are automatically applied based on the `line` attribute.

## Configuration options
- `entity` (required): Sensor entity id.
- `show_name` (optional, default: true): Show entity friendly name as card heading.
- `max_items` (optional, default: 5): Maximum number of departures to display.

## Line Colors

The card automatically applies official Danish transport colors:

**Metro:**
- M1: Green (#0A9A48)
- M2: Yellow (#FFC917)
- M3: Red (#EE3B43)
- M4: Blue (#1EBAE5)

**S-train:**
- A: Blue (#0173B7)
- B/BX: Green (#72BF44)
- C: Orange (#E87722)
- E: Grey (#8B8C8E)
- F: Yellow (#FFC917)
- H: Red (#E30613)

**Buses (Copenhagen):**
- A-buses (1A, 2A, 3A, etc.): Red (#E30613)
- S-buses (Express): Blue (#0173B7)
- E-buses (Express): Grey (#5A5A5A)
- N-buses (Night): Dark Blue (#003366)
- Regular buses (12, 14, 150, etc.): Yellow (#FFC917)

Other lines will use the default color scheme.

## Sensor Data Format

The card reads directly from the Rejseplanen API response in the `Departure` attribute. The card automatically converts this to the internal format, calculating:
- Line number from `ProductAtStop.displayNumber`
- Destination from `direction`
- Time and minutes until departure from `time`/`rtTime`
- Transport mode (bus/metro/train/tram) from `ProductAtStop.catOut`/`catOutL`/`icon`
- Platform from `rtTrack`/`track`/`rtPlatform`
- Delays from comparing `time` and `rtTime`

**Backwards compatibility:** The card also supports preprocessed `upcoming` arrays from template sensors for users who prefer filtering in Jinja templates

## Development

```bash
npm install
npm run dev    # Development server
npm run build  # Production build
```

The build outputs `trafiklab-timetable-card.js` in the `dist/` folder.

## Troubleshooting
- **Card not found**: Ensure the resource is added in Lovelace resources and browser cache is cleared.
- **No updates**: Verify the sensor updates correctly and the entity_id is valid.
- **Colors not showing**: Line-specific colors only apply to recognized lines (M1-M4, A-H). Other lines use default colors.
- **Wrong transport mode**: Check the mode detection logic in your template sensor matches Rejseplanen's response format.

## License
MIT
