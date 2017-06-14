# jQuery Schedule (jqs)

## Requirements

- jQuery >= 1.12.4
- jQuery ui >= 1.12.1

## Installation

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    
    <script src="dist/jquery.schedule.min.js"></script>
    <link rel="stylesheet" href="dist/jquery.schedule.min.css">

## Usage examples

```
$("#schedule").jqs({
    mode: "edit"
});

$("#schedule").jqs({
    mode: "read"
    data: [
        {
            day: 0,
            periods: [
                ["20:00", "00:00"],
                ["00:00", "02:00"]]
        },
        {
            day: 3,
            periods: [
                ["00:00", "08:30"],
                ["09:00", "12:00"]
            ]
        }
    ]
});
```

## Options

| Option | Type | Default | Description
| --- | --- |  --- |  --- |
| `mode` | `string` | `read` | 
| `data` | `array` | `[]` | 
| `days` | `array` | `["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]` |
| `invalidPeriod` | `string` | `Invalid period.` | 
| `invalidPosition` | `string` | `Invalid position.` | 
| `removePeriod` | `string` | `Remove this period ?` | 

## Demo


## TODO
- [ ] Add a compact mode
- [ ] 12-hour clock support

