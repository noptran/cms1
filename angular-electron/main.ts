import { app, BrowserWindow, screen, ipcMain, Menu, dialog } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve, isLoggedIn;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

function createWindow() {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  Menu.setApplicationMenu(null);
  // Create the browser window.
  win = new BrowserWindow({
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
      enableRemoteModule: true,
    }
  });
  win.once('ready-to-show', () => {
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
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
  ipcMain.on('REQUEST_CHANNEL', (event: any, arg: any) => {
    win.webContents.openDevTools();
  });

  win.on('close', event => {
    if (isLoggedIn) {
      event.preventDefault();
      const response: any = dialog.showMessageBox(win,
        {
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

  ipcMain.on('IS_LOGGEDIN', (event: any, res: any) => {
    isLoggedIn = res;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
