"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var win, serve, isLoggedIn;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
function createWindow() {
    var electronScreen = electron_1.screen;
    var size = electronScreen.getPrimaryDisplay().workAreaSize;
    electron_1.Menu.setApplicationMenu(null);
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        icon: path.join(__dirname + '/src/assets/icons/png/icon.png'),
        backgroundColor: '#43b4c4',
        webPreferences: {
            nodeIntegration: true,
            backgroundThrottling: false,
            devTools: true,
            enableRemoteModule: true
        }
    });
    win.once('ready-to-show', function () {
        win.show();
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/sfcs-mobile-forms-app/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // close the devtool
    // win.webContents.on('devtools-opened', () => { win.webContents.closeDevTools(); });
    process.on('uncaughtException', function (err) {
        console.log('White Screen Issue', err);
    });
    // Emitted when the window is closed.
    win.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    electron_1.ipcMain.on('REQUEST_CHANNEL', function (event, arg) {
        win.webContents.openDevTools();
    });
    win.on('close', function (event) {
        if (isLoggedIn) {
            event.preventDefault();
            var response = electron_1.dialog.showMessageBox(win, {
                type: 'question',
                buttons: ['Logout', 'Cancel'],
                title: 'Confirm',
                message: 'Please logout before closing the app'
            });
            if (response === 0) {
                // trigger logout function
                event.sender.send('LOGOUT');
            }
        }
    });
    electron_1.ipcMain.on('IS_LOGGEDIN', function (event, res) {
        isLoggedIn = res;
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
