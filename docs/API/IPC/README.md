## IPC通信

```javascript
// 在主进程中.
const { ipcMain } = require('electron')
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong')
})
```

```javascript
//在渲染器进程 (网页) 中。
const { ipcRenderer } = require('electron')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
})
ipcRenderer.send('asynchronous-message', 'ping')
```

### 方法(IpcMain)
```javascript
ipcMain.on(channel, listener) //注册一个监听
ipcMain.once(channel, listener) //注册一个只监听一次的监听
ipcMain.removeListener(channel, listener) //移除一个监听
ipcMain.removeAllListeners([channel]) //移除所有监听
```

### 方法(IpcRenderer)
```javascript
ipcRenderer.on(channel, listener) //注册一个监听
ipcRenderer.once(channel, listener) //注册一个只监听一次的监听
ipcRenderer.removeListener(channel, listener) //移除一个监听
ipcRenderer.removeAllListeners(channel) //移除所有监听
ipcRenderer.send(channel, ...args) //异步给指定的channel发送消息
ipcRenderer.sendSync(channel, ...args) //同步给指定的channel发送消息
```