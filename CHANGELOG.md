# jQuery Schedule

# 2.0.0
**Breaking changes**
- Remove confirm feature (use `onRemovePeriod` callback then)
    - Remove `confirm` option
    - Remove confirm popup messages (`removePeriod`, `dialogYes` & `dialogNo`)
    - Remove theming class
- Remove `debug` option
    - Remove debug messages (`invalidPosition` & `invalidPeriod`) 
- Rename `.jqs-wrapper` to `.jqs-day`
- Remove `remove button` in period

**New features**
- Add `periodDuration` option (15/30/60)
- Add new option popup on period click
    - custom title
    - custom color
    - remove button
- Add new callbacks
    - `onInit`
    - `onAddPeriod`
    - `onRemovePeriod`
    - `onPeriodClicked`

**Other changes**
- Remove bower support
- Update jQuery version
- use Bootstrap 4 on demo page
- Remove useless global variables 
- Code clean
- `reset` and `export` methods optimization
- Period IDs standardization

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