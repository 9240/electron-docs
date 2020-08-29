## app
### 钩子函数
1. <code>'will-finish-launching'</code> 当应用程序完成基础的启动的时候被触发。
2. <code>'ready'</code> 当 Electron 完成初始化时被触发
3. <code>'window-all-closed'</code> 当所有的窗口都被关闭时触发。
4. <code>'before-quit'</code> 在应用程序开始关闭窗口之前触发。
5. <code>'will-quit'</code> 当所有窗口都已关闭并且应用程序将退出时发出。
6. <code>'quit'</code> 在应用程序退出时发出。
7. <code>'browser-window-blur'</code> 在 browserWindow 失去焦点时发出。
8. <code>'browser-window-focus'</code> 在 browserWindow 获得焦点时发出。
9. <code>'browser-window-created'</code> 在创建新的 browserWindow 时发出。
10. <code>'web-contents-created'</code> 在创建新的 webContents 时发出。
11. <code>'session-created'</code> 当 Electron创建了一个新的 session后被触发.
12. <code>'remote-require'</code> 在 webContents 的渲染器进程中调用 remote.require() 时发出
13. <code>'remote-get-global'</code> 在 webContents 的渲染器进程中调用 remote.getGlobal() 时发出。
### 方法
1. <code>app.quit()</code> 关闭所有窗口 将首先发出 before-quit 事件。
2. <code>app.exit()</code> 立即退出程序并返回
3. <code>app.relaunch()</code> 从当前实例退出，重启应用。
4. <code>app.isReady()</code>  Electron是否已经完成初始化,返回true或false
5. <code>app.whenReady()</code> 当Electron 初始化完成。
6. <code>app.focus()</code> 在 Windows 上, 使应用的第一个窗口获取焦点。
7. <code>app.getAppPath()</code> 获取当前应用程序所在目录
8. <code>app.getVersion()</code> 获取应用程序的版本
9. <code>app.getName()</code> 获取当前应用程序的名称
10. <code>app.setName(name)</code> 设置当前应用程序的名称
11. <code>app.getLocale()</code> 获取应用程序的语言环境