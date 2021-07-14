# TestPouchdb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Latest Update

## Prerequisites

Angular version `8`
node version `8.16.1`
npm version `6.4.1`

## Generate Dist

Run `npm install` and `npm run build` to generate the dist folder

## Generate Package
## Prerequisites - Windows Machine - exe
## Prerequisites - Mac Machine - mac

Download / Clone `Angular Electron` from the following link [Angular Electron](https://github.com/maximegris/angular-electron/tree/angular8)

Copy the dist folder to `Angular Electron` folder

Make Sure that `@types/node` version should be `8.9.4` under package.json

Replace main.ts file of `Angular Electron` with your main.ts and also make sure the main.ts changes are reflected on main.js in `Angular Electron` project, if not try runing `npm run build` or `npm run serve` it will get updated

`NOTE:` make sure `electron:mac:1` and `electron:windows:1` is present on package.json in `Angular Electron` project else add bellow 2 lines
"electron:mac:1": "electron-builder build --mac",
"electron:windows:1": "electron-builder build --windows",

Run `npm install`

Run the `npm run electron:mac:1` to generate dmg

Run the `npm run electron:windows:1` to generate exe

# Generate MSI Package

## Prerequisites - Windows Machine

Install WiX Toolset - [You can download the latest release from the Releases page of the project in the Github repository here](https://github.com/wixtoolset/wix3/releases)

wix311.exe is the installer for the WiX Toolset build tools.

Installation Location `C:\Program Files (x86)\WiX Toolset v3.11\`


## Setting Environment Variable

After installing WiX you will need to expose the binaries path of the `WiX Toolset` to the `PATH` environment variable of Windows. This can be easily done, searching for environment variables in the start menu of Windows

![wix-environment-variable](/uploads/ba344d4706d36288669aea232a0205bb/wix-environment-variable.png)

![wix-edit-environment-variables](/uploads/42f4838088a4fca6ae07b9155c10b90e/wix-edit-environment-variables.png)


## Configure Main.Js
Clone the `msi-installer-electron` project from the following link [MSI Installer](https://gitlab.st-francis.org/sfcs/msi-installer-electron)

As per the `screenshot` update the following keywords 
`appDirectory` : Path of Angular-Electron/Release/win-unpacked
`description` : Description MSI
`exe` : Name of exe (exe location - Angular-Electron/Release/win-unpacked)
`name` : Name of msi
`manufacturer` : manufacturer of msi
`version` : version of msi
`outputDirectory` : Path of Angular-Electron/Release/win-unpacked

![msi_installer_electron-main_js](/uploads/2f3391af7d7cec1d3cd383e709bdba65/msi_installer_electron-main_js.png)

Run `npm install`

Run `node main.js`

Once above command executed, CIS.msi file will be generated in the location - `Path of Angular-Electron/Release/win-unpacked`


