# bb-watch

bb-watch is an easy to use watcher for backbase widget, extentions, ui components or themes.

## Features!

  - Watching directories for file changes

## Requirements

    - Node >= v6.x
    - NPM >= v5.x

## Installation

    $ npm install

## Development

    1. Create a `nt` directory at the same level of this repo
    2. Run `$ npm link` in that directory
    3. Make your changes to the `bb-watch` module
    4. Run build `$ npm run build` or `$ npm run watch`
    5. Re-run `$ nt` in a widget's directory

## Todo

  - TODO: continue on error in file that will be packges
  - TODO: make sass option only work for theme (when in theme- folder)
  - TODO: silence (no logs or any output?)
  - TODO: disable desktop notifications
  - TODO: make extensions able to set through option
  - TODO: way to specify port? 
  - TODO: fix notify icon path
  - TODO: save timing to csv file if prefer (for fun :p)
  - TODO: before import check if package is made (?)
  - TODO: can we make it more dynamic?
  - TODO: only load dependencies if needed (eg. don't import notify if you don't use notifications)
  - TODO: add cli + update documentation
