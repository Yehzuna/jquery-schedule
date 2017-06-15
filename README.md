# jQuery Schedule (jqs)

## Requirements

- jQuery >= 1.12.4
- jQuery ui >= 1.12.1

## Demo

[Demo link](https://yehzuna.github.io/schedule/)

## Installation

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    
    <script src="dist/jquery.schedule.min.js"></script>
    <link rel="stylesheet" href="dist/jquery.schedule.min.css">

## Usage

```javascript
$("#schedule").jqs({
    mode: "edit"
});

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
```

## Data Format

```json
[
    {
        "day": "Day number (0-6)",
        "periods": [
            ["Period start", "Period end"]
        ]
    }
]
```

Example :
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
| `mode` | `string` | `read` | Define the schedule mode (read/edit)
| `data` | `array` | `[]` | Add a list of period by day
| `days` | `array` | `["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]` | Days list 
| `invalidPeriod` | `string` | `Invalid period.` | Error message
| `invalidPosition` | `string` | `Invalid position.` | Error message
| `removePeriod` | `string` | `Remove this period ?` | Error message


## Export

```javascript
// init
$("#schedule").jqs();

// export
var data = $("#schedule").jqs('export');
```
Export example (json string) :
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
- [ ] 12-hour clock support
- [ ] Popup error
- [ ] Add a compact mode

