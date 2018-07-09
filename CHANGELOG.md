# jQuery Schedule

# 2.2.0
**Breaking changes**
- Rename the `days` option to `daysList`

**New features**
- Add a new option `days` to change number of days per week to 5 or 7  

# 2.1.0
**New features**
- Add a duplicate button for periods
    - This feature allows to copy the selected period to all days if space is available
    - Periods already placed are not overwritten
- Add a duplicate button for days
    - This feature allows to copy all periods in a day to all other days if space is available
    - Periods already placed are not overwritten
- Add a remove button for days
    - Remove all periods in the selected day
- Add a new callback `onDuplicatePeriod`
- Add a new option `periodDuplicateButton`

**Other changes**
- Source code cleaning
- Hover effect lighten for buttons in the popup
- New icon for remove button
- Add `onRemovePeriod` event to the `reset` method
- Hide the remove button for very small period (15mn)
- Fixed: Time not displayed properly in the helper when a period is created

# 2.0.1
- Fixed : IE11 time error in the option popup

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