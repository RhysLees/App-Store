'use strict'

import { app, protocol, BrowserWindow, dialog, ipcMain,globalShortcut } from "electron";
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

import { autoUpdater } from "electron-updater";


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 750,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  win.removeMenu();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    // win.loadURL(path.join(__dirname, "index.html" + to));
  }

  // win.once("ready-to-show", () => {
  //   autoUpdater.checkForUpdates();
  // });
}


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  } else {
      globalShortcut.register("CommandOrControl+R", () => false);
			globalShortcut.register("F5", () => false);
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on("app_version", (event) => {
	event.sender.send("app_version", { version: app.getVersion() });
});
ipcMain.on("app_check_update", (event) => {
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = false;
  autoUpdater.checkForUpdates();
});
ipcMain.on("app_update_download", (event) => {
	autoUpdater.downloadUpdate();
});
ipcMain.on("app_update_install", (event) => {
	autoUpdater.quitAndInstall();
});

//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = (text) => {
	win.webContents.send("message", text);
};

autoUpdater.on("checking-for-update", () => {
  sendStatusToWindow("Checking for update...");
  win.webContents.send("update_check");
});
autoUpdater.on("update-available", (info) => {
  sendStatusToWindow("Update available.");
  win.webContents.send("update_available", info);
});
autoUpdater.on("update-not-available", (info) => {
  sendStatusToWindow("Update not available.");
  win.webContents.send("update_not_available", info);
});
autoUpdater.on("download-progress", (progressObj) => {
	sendStatusToWindow(
		`Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
  );
  win.webContents.send("download_percent", progressObj);
});

autoUpdater.on("update-downloaded", (event, releaseNotes, releaseName) => {
  win.webContents.send("update_downloaded");
  sendStatusToWindow("Update downloaded; will install now");

	// const dialogOpts = {
	// 	type: "info",
	// 	buttons: ["Restart", "Later"],
	// 	title: "Application Update",
	// 	message: process.platform === "win32" ? releaseNotes : releaseName,
	// 	detail:
	// 		"A new version has been downloaded. Restart the application to apply the updates.",
	// };

	// dialog.showMessageBox(dialogOpts).then((returnValue) => {
	// 	if (returnValue.response === 0) autoUpdater.quitAndInstall();
	// });
});

autoUpdater.on("error", (message) => {
  win.webContents.send("update_error", message);

  console.error("There was a problem updating the application");
  console.error(message);
  
});