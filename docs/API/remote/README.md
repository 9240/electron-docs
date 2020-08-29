## remote
### electron中分主进程和渲染进程
1. **主进程中可以使用的模块**：app、autoUpdater、BrowserView,BrowserWindow、contentTracing、dialog、globalShortcut、inAppPurchase、ipcMain、Menu、MenuItem、net、netLog、通知、powerMonitor、powerSaveBlocker、protocol、screen、session、systemPreferences、触控板、Tray、webContents.
2. **渲染进程中可以使用的模块**：desktopCapturer、ipcRenderer、remote、webFrame
3. **两种进程都可用的模块**：clipboard、crashReporter、nativeImage、shell

**借助remote,可以在渲染进程中使用主进程中的模块**