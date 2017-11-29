# jQuery Schedule

# 2.0.0
**Breaking changes**
- Remove confirm on remove feature (use `onRemovePeriod` callback then)
    - Remove `confirm` option
    - Remove confirm messages (`removePeriod`, `dialogYes` & `dialogNo`)
    - Remove theming classes
- Remove `debug` option
    - Remove debug messages (`invalidPosition` & `invalidPeriod`) 
- Rename `.jqs-wrapper` to `.jqs-day`
- Remove the delete button in periods
- Update import and export JSON to include title and colors features

**New features**
- Change period creation method. Use `mouseup` & `mousedown` events instead of `click` event 
- Add `periodDuration` option (15/30/60)
- Add new popup when clicking on a period
- New features on periods
    - Custom title
    - Custom color for background, borders and text
- Add new callbacks
    - `onInit`
    - `onAddPeriod`
    - `onRemovePeriod`
    - `onClickPeriod`
- Add compact mode support for Ante meridiem and Post meridiem `8am - 2pm -> 8 - 2p`

**Other changes**
- `reset` and `export` methods optimization
- Remove useless global variables
- Remove bower support to yarn
- Update jQuery version
- Use Bootstrap 4 on the demo page
- Period IDs standardization
- Code clean

# 1.2.1
- Fixed : Block position error with Bootstrap 3.x

# 1.2.0
- Add a new feature to import periods programmatically (import)
- Add a new feature to remove all periods (reset)
- JSlint better support
- Remove extra tests when periods are generate
- Remove yarn lock file for npm

# 1.1.0
- Add debug option. Remove console error/log messages in production mode 
- Add confirm option. Show a confirmation dialog when removing a period
- Add custom confirmation dialog
- Add new Theming section to the README
- Add class `jqs-grid-hour` and `jqs-period-title`
- Rename class `jqs-period-placeholder` to `jqs-period-container`

# 1.0.1

- Fixed : Periods overlaps when a period extremity overlaps another
- Add a descriptive banner in all dist files
- Remove compass comments in css files
- Add npm and bower badges in README
- Add a CHANGELOG file

# 1.0.0

First public release