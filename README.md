# jQuery Schedule

A simple schedule management with jQuery.

[![Version](https://img.shields.io/npm/v/jquery-schedule.svg)](https://www.npmjs.org/package/jquery-schedule)
[![Version](https://img.shields.io/bower/v/jquery-schedule.svg)](https://github.com/Yehzuna/jquery-schedule)

## Requirements

jQuery >= 1.12.4

jQuery ui >= 1.12.1

## Demo

[Demo link](https://yehzuna.github.io/jquery-schedule/)

## Installation

**bower**

    bower install jquery-schedule
    
**npm**

    npm install jquery-schedule
    
**yarn**
    
    yarn add jquery-schedule
    
**scripts**

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    
    <script src="dist/jquery.schedule.min.js"></script>
    <link rel="stylesheet" href="dist/jquery.schedule.min.css">

## Usage

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
> 0 to 6

> Monday to Sunday

#### Hour format

24-hour clock 
> hh:mm

12-hour clock 
>hh:mm am/pm

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

| Option | Type | Default | Description
| --- | --- |  --- |  --- |
| `debug` | `bool` | `false` | Show log/error messages in console
| `mode` | `string` | `edit` | Define the schedule mode (read or edit)
| `confirm` | `bool` | `true` | Show a confirmation dialog when removing a period
| `hour` | `int` | `24` | Set the 12-hour or 24-hour clock (12/24)
| `data` | `array` | `[]` | Add a list of period by day
| `days` | `array` | `["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]` | Days list 
| `invalidPeriod` | `string` | `Invalid period.` | Debug message
| `invalidPosition` | `string` | `Invalid position.` | Debug message
| `removePeriod` | `string` | `Remove this period ?` | The confirmation dialog message


## Theming

| CSS Class | Description
| --- | --- |  
| `.jqs` | Main container |
| `.jqs-grid` | Main container |
| `.jqs-grid` | Main container |

## Methods 

#### Export

```javascript
// init
$("#schedule").jqs();

// export
var data = $("#schedule").jqs('export');
```
Export example (json) :

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

## TODO
- [x] 12-hour clock support
- [ ] Add a compact mode
- [ ] Theme

