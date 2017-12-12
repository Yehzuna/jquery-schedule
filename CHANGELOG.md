# jQuery Schedule

# 2.0.0
**Breaking changes**
- Remove confirmation feature on period remove (use `onRemovePeriod` callback then)
    - Remove `confirm` option
    - Remove confirm messages (`removePeriod`, `dialogYes` & `dialogNo`)
    - Remove classes
- Remove `debug` option
    - Remove debug messages (`invalidPosition` & `invalidPeriod`) 
- Refactoring a lot of CSS classes

**New features**
- Change period creation method. Use `mouseup` & `mousedown` events instead of `click` event 
- Add helper on period creation 
- Add `periodDuration` feature (Change the period interval to 15/30 or 60)
- Add `periodOptions` feature (Add a new popup when clicking on a period)
- Add new periods features
    - Custom title
    - Custom color for background, borders and text
    - Custom color selector (`periodColors` option)
    - Defaults style customisation (`periodTitle`, `periodBackgroundColor`, `periodBorderColor` & `periodTextColor`) 
- Update period data format to include new customisation features
- Add new translation (`periodRemoveButton` & `periodTitlePlaceholder`)
- Add new callbacks
    - `onInit`
    - `onAddPeriod`
    - `onRemovePeriod`
    - `onClickPeriod`
- Add compact mode support for Ante meridiem and Post meridiem `8am - 2pm -> 8 - 2p`

**Other changes**
- Period IDs standardization
- Remove useless global variables
- `reset` and `export` methods optimization
- Remove bower support
- Update jQuery version
- Add Bootstrap 4 on the demo page
- A lot of code clean !

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