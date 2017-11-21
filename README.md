# jQuery Schedule

A simple schedule management with jQuery and jQuery ui.

[![GitHub release](https://img.shields.io/github/release/Yehzuna/jquery-schedule.svg)](https://github.com/Yehzuna/jquery-schedule)
[![Version](https://img.shields.io/npm/v/jquery-schedule.svg)](https://www.npmjs.org/package/jquery-schedule)

## Requirements

jQuery >= 3.2.*

jQuery ui >= 1.12.*


## Demo

[View demo page](https://yehzuna.github.io/jquery-schedule/)




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
$("#schedule").jqs();

$("#schedule").jqs({
    mode: "read",
    data: [
        {
            "day": 0,
            "periods": [
                ["00:00", "02:00"],
                ["20:00", "00:00"]
            ]
        }
    ]
});

$("#schedule").jqs({
    hour: 12,
    data: [
        {
            "day": 0,
            "periods": [
                ["1pm", "3:30pm"]
            ]
        }
    ]
});

```

## Data Format
The plugin use this format 

```json
[
    {
        "day": "Day number",
        "periods": [
            ["Period start", "Period end"]
        ]
    }
]
```
#### Day format
0 to 6 (Monday to Sunday)

#### Hour format
Two formats are supported :
- 24-hour clock (`hh:mm`)
- 12-hour clock (`hh:mm am/pm`)

#### Example
```json
[
    {
        "day": 0,
        "periods": [
            ["00:00", "02:00"]
        ]
    }
]
```


## Options

### `mode`
- Type: `string`
- Default: `edit` 
- Options: `read` `edit`

Define the schedule mode

### `hour`
- Type: `int`
- Default: `24` 
- Options: `12` `24`

Define the time format

### `periodDuration`
- Type: `int`
- Default : `30` 
- Options: `15` `30` `60`

Define the period duration interval

### `data`
- Type: `array`
- Default : `[]`

Define periods on schedule init (see [import method](#import))

### `days`
- Type: `array`
- Default : `["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]`

Define days 



## Events

### `onInit(jqs)`
- `jqs` Schedule container

A callback fire just after the schedule init

### `onAddPeriod(period, jqs)`
- `period` The new period added
- `jqs` Schedule container

A callback fire after a new period is added. 

### `onRemovePeriod(period, jqs)`
- `period` The period to remove
- `jqs` Schedule container

A callback fire before a period is removed

### `onPeriodClicked(event, period, jqs)`
- `event` click event
- `period` The period target
- `jqs` Schedule container

A callback fire on a period click



## Methods 

### `export`
Export all periods in the schedule to a JSON.

```javascript
var data = $("#schedule").jqs('export');
```
Example :

```json
[
    {"day":0,"periods":[]},
    {"day":1,"periods":[]},
    {"day":2,"periods":[["10:30","13:00"]]},
    {"day":3,"periods":[]},
    {"day":4,"periods":[]},
    {"day":5,"periods":[]},
    {"day":6,"periods":[]}
]
```

### `import` <a href="#import"></a>
Import periods programmatically

```javascript
$("#schedule").jqs('import', [
    {
        day: 2,
        periods:[
            ["10:30","13:00"]
        ]
    }
]);
```

Return a JSON with each period status 

```json
[
  {"day": 2, "period": ["10:30","13:00"], "status": true}
]
```

### `reset`
Reset the schedule (remove all periods)

```javascript
$("#schedule").jqs('reset');
```



## Theming

| CSS Class | Description
| --- | --- |  
| `.jqs` | Plugin main container |
| `.jqs-table` | Define the schedule structure |
| `.jqs-grid` | Grid container |
| `.jqs-grid-head` | Header grid container. Contain  |
| `.jqs-grid-line` | Line grid container |
| `.jqs-grid-day` | Sets the style for the day title |
| `.jqs-grid-hour` | Sets the style for the hour title |
| `.jqs-day` | Day container |
| `.jqs-period` | Period container |
| `.jqs-period-container` | Sets css style for a period |
| `.jqs-period-title` | Sets css style for a period title |
| `.jqs-remove` | Sets the style for the remove button in a period |
| `.jqs-dialog-overlay` | Sets the style for the dialog overlay |
| `.jqs-dialog-container` | The dialog container |
| `.jqs-dialog` | Sets the style for the dialog |