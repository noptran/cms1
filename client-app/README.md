# SfcsCli

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
## Buid electron app - CIS
# One click application generation
* Download the electron source project https://drive.google.com/open?id=12Q2Uso81DJqjzaYvzSfyxSJnK-qqtn4W
* Build your angular application to electron using this commmand npm run electron -aot
* Once build completed, Copy the files inside dist folder
* From electron source project, open the project name as angular-electron
* In angular electron project, replace the dist files by using angular application dist files
* For windows use the command npm run electron:windows:1 to generate .exe file
* For mac use the command npx electron-builder build --mac .dmg file
# MSI File generation
* Download and install WIX Tools from  https://github.com/felixrieseberg/electron-wix-msi
* From electron source project, open the project name as msi-installer-test
* Open main.js file, And change the appDirectory path to end of /win-unpacked from generate by angular-electron project, 
  Find the /win-packed fiels in dist folder
* Change the outputDirectory path to destination path your local machine (i.e c:/user/Desktop)
* Run the command node main.js
* Open the outputDirectory path, You can find MSI package.
