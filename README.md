# jQuery Schedule

> A schedule management with jQuery.

[![GitHub release](https://img.shields.io/github/release/Yehzuna/jquery-schedule.svg)](https://github.com/Yehzuna/jquery-schedule)
[![Version](https://img.shields.io/npm/v/jquery-schedule.svg)](https://www.npmjs.org/package/jquery-schedule)

## Requirements

jQuery >= 3.2.*

jQuery ui >= 1.12.*


## Demo

[Link](https://yehzuna.github.io/jquery-schedule/)




## Install


### npm

    npm install jquery-schedule
    
### yarn
    
    yarn add jquery-schedule
    
### scripts

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    
    <script src="dist/jquery.schedule.min.js"></script>
    <link rel="stylesheet" href="dist/jquery.schedule.min.css">



## Usage examples

```javascript
// Base
$('#schedule').jqs();

// Full options
$('#schedule').jqs({
  mode: 'edit',
  hour: 24,
  days: 7,
  periodDuration: 30,
  data: [],
  periodOptions: true,
  periodColors: [],
  periodTitle: '',
  periodBackgroundColor: 'rgba(82, 155, 255, 0.5)',
  periodBorderColor: '#2a3cff',
  periodTextColor: '#000',
  periodRemoveButton: 'Remove',
  periodDuplicateButton: 'Duplicate',
  periodTitlePlaceholder: 'Title',
  daysList: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ],
  onInit: function () {},
  onAddPeriod: function () {},
  onRemovePeriod: function () {},
  onDuplicatePeriod: function () {},
  onClickPeriod: function () {}
});
```

## Data Format
The plugin use two data formats to render periods.

**Full**
```json
[
  {
    "day": "Day number",
    "periods": [
      {
        "start": "Period start time",
        "end": "Period end time",
        "title": "Period title",
        "backgroundColor": "Period background color",
        "borderColor":"Period border color",
        "textColor": "Period text color"
      }
    ]
  }
]
```
**Compact**
```json
[
  {
    "day": "Day number",
    "periods": [
      ["Period start time", "Period end time"]
    ]
  }
]
```
#### Day format
0 to 6 (Monday to Sunday)

#### Hour format
Two formats are supported :
- 24-hour clock (`hh:mm`)
- 12-hour clock (`hh:mm am/pm` or `h:m a/p`)

#### Colors support
- Hexadecimal `#000`
- RGB `rgb(0, 0, 0)`
- RGBa `rgb(0, 0, 0, 0.5)`

#### Examples
```json
[
  {
    "day": 0,
    "periods": [
      ["00:00", "02:00"]
    ]
  },
  {
    "day": 2,
    "periods": [
      {
        "start": "10:00",
        "end": "12:00",
        "title": "A black period",
        "backgroundColor": "rgba(0, 0, 0, 0.5)",
        "borderColor":"#000",
        "textColor": "#fff"
      }
    ]
  }
]
```

## Options

### `mode`
- Type: `string`
- Default: `edit` 
- Options: `read` `edit`

Define the schedule mode.

### `hour`
- Type: `integer`
- Default: `24` 
- Options: `12` `24`

Define the time format.

### `days`
- Type: `integer`
- Default: `7` 
- Options: `5` `7`

Define the number of days.

### `periodDuration`
- Type: `integer`
- Default : `30` 
- Options: `15` `30` `60`

Define the period duration interval.

### `data`
- Type: `array`
- Default : `[]`

Define periods on schedule init. (see data format section for more details)

### `periodOptions`
- Type: `boolean`
- Default : `true` 

Enable/Disable the option popup.

### `periodColors`
- Type: `array`
- Default : `[]` 

Define list of available colors in the option popup. Must be an array of 3 colors (`backgroundColor`, `borderColor` and `textColor`)

```json
{
  "periodColors": [
    ["backgroundColor", "borderColor", "textColor"],
    ["rgba(82, 155, 255, 0.5)", "#2a3cff", "#000000"],
    ["#000", "#fff", "#fff"]
  ]
}
```
### `periodTitle`
- Type: `string`
- Default : `""` 

Period default title.

### `periodBackgroundColor`
- Type: `string`
- Default : `rgba(82, 155, 255, 0.5)` 

Period default background color.

### `periodBorderColor`
- Type: `string`
- Default : `#2a3cff` 

Period default border color.

### `periodTextColor`
- Type: `string`
- Default : `#000` 

Period default text color.

### `periodRemoveButton`
- Type: `string`
- Default : `Remove` 

Label to the period remove button.

### `periodDuplicateButton`
- Type: `string`
- Default : `Duplicate` 

Label to the period duplicate button.

### `periodTitlePlaceholder`
- Type: `string`
- Default : `Title` 

Label to the title input placeholder in the option popup.

### `daysList`
- Type: `array`
- Default : `["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]`

Define list of days labels.



## Events

### `onInit(jqs)`
- `jqs` Schedule container

A callback fire after the schedule init.

### `onAddPeriod(period, jqs)`
- `period` The new period added
- `jqs` Schedule container

A callback fire after a new period is added. 

### `onRemovePeriod(period, jqs)`
- `period` The period to remove
- `jqs` Schedule container

A callback fire before a period is removed.

### `onDuplicatePeriod(period, jqs)`
- `period` The period to duplicate
- `jqs` Schedule container

A callback fire before a period is duplicated.

### `onPeriodClicked(event, period, jqs)`
- `event` click event
- `period` The period target
- `jqs` Schedule container

A callback fire on a period click.



## Methods 

### `export`
Export all periods to a JSON.

```javascript
var data = $('#schedule').jqs('export');
```
Example :

```json
[
  {"day":0,"periods":[]},
  {"day":1,"periods":[]},
  {"day":2,"periods":[
    {"start":"02:00","end":"04:00","title":"","backgroundColor":"rgba(82, 155, 255, 0.5)","borderColor":"rgb(42, 60, 255)","textColor":"rgb(0, 0, 0)"}
  ]},
  {"day":3,"periods":[]},
  {"day":4,"periods":[]},
  {"day":5,"periods":[]},
  {"day":6,"periods":[]}
]
```

### `import`
Import periods from a JSON.

```javascript
$('#schedule').jqs('import', [
  {
    'day': 0,
    'periods': [
      ['00:00', '04:00'],
      ['02:00', '04:00'] // Invalid period
    ]
  },
  {
    'day': 2,
    'periods': [
      {
        'start': '10:00',
        'end': '12:00',
        'title': 'A black period',
        'backgroundColor': 'rgba(0, 0, 0, 0.5)',
        'borderColor':'#000',
        'textColor': '#fff'
      }
    ]
  }
]);
```

Return a JSON with each period status.

```json
[
  {"day":0,"period":["00:00","04:00"],"status":true},
  {"day":0,"period":["02:00","04:00"],"status":false},
  {"day":2,"period":["10:00","12:00"],"status":true}
]
```

### `reset`
Reset the schedule. (remove all periods)

```javascript
$('#schedule').jqs('reset');
```



## Theming

**Plugin**

| CSS Class | Description |
| --- | --- |  
| `.jqs` | Plugin main container |
| `.jqs-table` | Schedule structure |
| `.jqs-grid` | Grid container |
| `.jqs-grid-head` | Header grid container |
| `.jqs-grid-line` | Line grid container |
| `.jqs-grid-day` | Grid day label |
| `.jqs-grid-hour` | Grid hour label |
| `.jqs-day` | Day container |
| `.jqs-day-remove` | Period remove button for the day |
| `.jqs-day-duplicate` | Period duplicate button for the day |
| `.jqs-mode-read` | Added on init |
| `.jqs-mode-edit` | Added on init |

**Period**

| CSS Class | Description |
| --- | --- |  
| `.jqs-period` | Period container |
| `.jqs-period-container` | Period placeholder (contains colors style) |
| `.jqs-period-time` | Period time container |
| `.jqs-period-title` | Period title container |
| `.jqs-period-remove` | Period remove button |
| `.jqs-period-duplicate` | Period duplicate button |
| `.jqs-period-15` | Added to `.jqs-period-container` when the period duration is 15mn |
| `.jqs-period-30` | Added to `.jqs-period-container` when the period duration is 30mn |
| `.jqs-period-helper` | Period helper |
| `.jqs-period-helper-time` | Period helper title |

**Popup**

| CSS Class | Description |
| --- | --- |  
| `.jqs-options` | Popup option container |
| `.jqs-options-time` | Popup title |
| `.jqs-options-title` | Title input |
| `.jqs-options-title-container` | Title input container |
| `.jqs-options-color` | Color items |
| `.jqs-options-color-container` | Color items container |
| `.jqs-options-remove` | Period remove button |
| `.jqs-options-duplicate` | Period duplicate button |
| `.jqs-options-close` | Popup close button |



## Todo
- Add custom data for periods (import/export/options)
- Add option to reduce schedule hours range
- Add option to disable period selection by day or not
- Add an option to define compact or full data export
- Responsive.
- Better options validation and tests.
