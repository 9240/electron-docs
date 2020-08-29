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

## BrowserView

> <code>BrowserView</code> 被用来让 <code>BrowserWindow</code> 嵌入更多的 web 内容。 它就像一个子窗口，除了它的位置是相对于父窗口。 这意味着可以替代<code>webview</code>标签.

```javascript
// 在主进程中
const { BrowserView, BrowserWindow } = require('electron')

let mainWin = new BrowserWindow({ width: 800, height: 600 })
mainWin.on('closed', () => {
    mainWin = null
})

let view = new BrowserView()
mainWin.setBrowserView(view)
view.setBounds({ id:1, x: 0, y: 0, width: 300, height: 300 })
view.webContents.loadURL('https://github.com')
```

### 静态方法
```javascript
BrowserView.getAllViews() //返回所有打开的BrowserView的数组
BrowserView.fromId(1) //返回id为1的BrowserView
BrowserView.fromWebContents(BrowserView.fromId(1).webContents) //返回webContents为BrowserView.fromId(1).webContents的BrowserView
```

### 实例方法
```javascript
browserView.destroy() // 强制关闭视图
browserView.isDestroyed() // 判断browserView是否被销毁
```

## BrowserWindow
```javascript
// 在主进程中.
const { BrowserWindow } = require('electron')

let win = new BrowserWindow({
    width: 800,
    height: 600,
    x: 100,
    y: 100,
    minWidth:200,
    minHeight:400,
    resizable:true,
    movable:true,
    minimizable:true,
    maximizable:true,
    closable:true,
    focusable:true,
    fullscreenable:false,
    title:'标题',
    show:false,
    frame:true,
    parent:null,
    modal:false
})
win.on('closed', () => {
  win = null
})

// 加载远程URL
win.loadURL('https://github.com')

// 或加载本地HTML文件
win.loadURL(`file://${__dirname}/app/index.html`)
```

### **<code>选项</code> Object (可选)**
1. <code>width</code> Integer (可选) - 窗口的宽度，单位为像素。默认为800
2. <code>height</code> Integer(可选) - 窗口的高度，单位为像素。默认为600
3. <code>x</code>Integer (optional) - (required if y is used) Window's left offset from screen. Default is to center the window
4. <code>y</code>Integer (optional) - (required if x is used) Window's top offset from screen. Default is to center the window
5. <code>useContentSize</code> Boolean (可选) - width 和 height 将设置为 web 页面的尺寸(译注: 不包含边框)
6. <code>center </code> Boolean(可选) - 窗口在屏幕居中
7. <code>minWidth</code> Integer (可选) - 窗口的最小宽度, 默认值为 0
8. <code>minHeight</code> Integer (可选) - 窗口的最小高度. 默认值为 0
9. <code>maxWidth</code> Integer (可选) - 窗口的最大宽度, 默认无限制
10. <code>maxHeight</code> Integer (可选) - 窗口的最大高度, 默认无限制
11. <code>resizable</code> Boolean (可选) - 窗口是否可以改变尺寸. 默认值为true
12. <code>movable</code> Boolean (可选) - 窗口是否可以移动
13. <code>minimizable</code> Boolean (可选) - 窗口是否可以最小化
14. <code>maximizable</code> Boolean (可选) - 窗口是否可以最大化动
15. <code>closable</code> Boolean (可选) - 窗口是否可以关闭
16. <code>focusable</code> Boolean (可选) - 窗口是否可以聚焦。 在 Windows 中设置 focusable: false 也意味着设置了skipTaskbar: true. 在 Linux 中设置 focusable: false 时窗口停止与 wm 交互, 并且窗口将始终置顶
17. <code>alwaysOnTop</code> Boolean (可选) -窗口是否永远在别的窗口的上面. 默认值为false
18. <code>fullscreen</code> Boolean (可选) - 窗口是否全屏. 当明确设置为 false 时，在 macOS 上全屏的按钮将被隐藏或禁用. 默认值为 false
19. <code>fullscreenable</code> Boolean (可选) - 窗口是否可以进入全屏状态. 在 macOS上, 最大化/缩放按钮是否可用 默认值为 true
20. <code>simpleFullscreen</code> Boolean (可选) - 在 macOS 上使用 pre-Lion 全屏. 默认为false
21. <code>skipTaskbar</code> Boolean (可选) - 是否在任务栏中显示窗口. 默认值为false
22. <code>kiosk Boolean</code> (可选) - kiosk 模式. 默认值为 false
23. <code>titleString</code>(可选) - 默认窗口标题 默认为"Electron"。 如果由loadURL()加载的HTML文件中含有标签<code>title</code>，此属性将被忽略。
24. <code>icon</code> (NativeImage | String) (可选) - 窗口的图标. 在 Windows 上推荐使用 ICO 图标来获得最佳的视觉效果, 默认使用可执行文件的图标
25. <code>show</code> Boolean (可选) - 窗口创建的时候是否显示. 默认值为true
26. <code>frame</code> Boolean (可选) - 设置为 false 时可以创建一个Frameless Window
27. <code>BrowserWindow</code> (可选) - 指定父窗口. 默认值为 null
28. <code>modal </code>Boolean (可选) -是否为模态窗. 仅供子窗口使用. 默认值为false
29. <code>acceptFirstMouse</code> Boolean (可选) - 是否允许单击页面来激活窗口. 默认值为 false
30. <code>disableAutoHideCursor</code> Boolean (可选) - 是否在输入时隐藏鼠标. 默认值为false
31. <code>autoHideMenuBar</code> Boolean (可选) - 自动隐藏菜单栏, 除非按了Alt键. 默认值为false
32. <code>backgroundColor</code> String(可选) - 窗口的背景颜色为十六进制值
33. <code>hasShadow </code>Boolean (optional) - 窗口是否有阴影. 默认值为 true
34. <code>titleBarStyle</code> String (可选) - 窗口标题栏的样式. 默认值为 default（hidden、hiddenInset、customButtonsOnHover）

### 实例事件
1. <code>'page-title-updated'</code> 文档标题更改时触发
2. <code>'close'</code> 在窗口要关闭的时候触发
3. <code>'closed'</code> 窗口已经关闭时触发
4. <code>'session-end'</code> Windows上强制关机或机器重启或会话注销而导致窗口会话结束时触发
5. <code>'unresponsive'</code> 网页变得未响应时触发
6. <code>'responsive' </code>未响应的页面变成响应时触发
7. <code>'blur'</code> 当窗口失去焦点时触发
8. <code>'focus' </code>当窗口获得焦点时触发
9. <code>'show'</code> 当窗口显示时触发
10. <code>'hide'</code> 当窗口隐藏时触发
11. <code>'ready-to-show'</code> 当页面已经渲染完成(但是还没有显示) 并且窗口可以被显示时触发
12. <code>'maximize'</code> 窗口最大化时触发
13. <code>'unmaximize'</code> 当窗口从最大化状态退出时触发
14. <code>'minimize'</code> 窗口最小化时触发
15. <code>'restore'</code>当窗口从最小化状态恢复时触发
16. <code>'will-resize'</code> 在调整窗口大小之前触发
17. <code>'resize' </code>调整窗口大小后触发
18. <code>'will-move'</code> 手动调整窗口大小时才会触发
19. <code>'move'</code> 窗口移动到新位置时触发
20. <code>'enter-full-screen'</code> 窗口进入全屏状态时触发
21. <code>'leave-full-screen'</code> 窗口离开全屏状态时触发

### 实例方法
```javascript
win.destroy()  // 强制关闭窗口
win.close()  // 尝试关闭窗口
win.focus()  // 聚焦于窗口
win.blur()   //取消窗口的聚焦
win.isFocused()  // 判断窗口是否聚焦
win.isDestroyed()   //判断窗口是否被销毁
win.show()  // 显示并聚焦于窗口
win.showInactive()  // 显示但不聚焦于窗口
win.hide()  // 隐藏窗口
win.isVisible()  // 判断窗口是否可见
win.isModal()  // 判断是否为模态窗口
win.maximize()  // 最大化窗口
win.unmaximize()  // 取消窗口最大化
win.isMaximized()   //判断窗口是否最大化
win.minimize()  // 窗口最小化
win.restore()   //将窗口从最小化状态恢复到以前的状态
win.isMinimized()   //判断窗口是否最小化
win.setFullScreen(flag)  // 设置窗口是否应处于全屏模式
win.isFullScreen()   //窗口当前是否已全屏
win.isNormal()   //窗口是否处于正常状态（未最大化，未最小化，不在全屏模式下）
win.setAspectRatio(aspectRatio)   //设置窗口宽高比
win.setBackgroundColor(backgroundColor)   //设置窗体的背景颜色
win.getBounds()   //返回窗口对象的位置及宽高
win.setContentBounds(bounds[, animate])   //设置窗口对象的位置及宽高
win.getContentBounds()   //返回窗口工作区的位置及宽高
win.getNormalBounds()   //返回正常状态下的窗口大小
win.setEnabled(enable)   //禁用或者启用窗口
win.isEnabled()   //判断是否启用窗口
win.setSize(width, height[, animate])   //调整窗口的大小
win.getSize()   //获取窗口的宽度和高度
```

### 静态方法
```javascript
BrowserWindow.getAllWindows() // 获取所有打开的窗口的数组
BrowserWindow.getFocusedWindow() // 获取当前获得焦点的窗口
```

## 剪切板
>在系统剪贴板上执行复制和粘贴操作。
```javascript
const { clipboard } = require('electron')
clipboard.write({
    text: 'test',
    html: '<b>Hi</b>',
    rtf: '{\\rtf1\\utf8 text}',
    bookmark: 'a title'
}) //第二个参数type默认是clipboard，selection只在Linux中可用
clipboard.readText('clipboard') //=>test
```

### 方法
```javascript
clipboard.readText([type]) //读取剪切板文字
clipboard.writeText(text) //写入剪切板文字
clipboard.readHTML([type]) 
clipboard.writeHTML(markup[, type])
clipboard.readImage([type])
clipboard.writeImage(image[, type])
clipboard.readRTF([type])
clipboard.writeRTF(text[, type])
clipboard.readBookmark()
clipboard.writeBookmark(title, url[, type])
clipboard.clear([type]) //清空剪切板
```

## 对话框(带Sync为同步)
```javascript
const { dialog } = require('electron')
dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'] 
})
```
### 方法
```javascript
// 打开文件
dialog.showOpenDialog({
    title: "请选择文件",
    defaultPath: "",
    filters: [
        {
            name: "txt",
            extensions: ["txt", "json", "js", "css", "styl", "html", "vue"]
        }
    ],
    buttonLabel: "打开文件"
}).then(result => {
    if (!result.canceled) {
        //todo
    }
}).catch(err => {
    //todo
});;

// 保存文件
dialog.showSaveDialog({
    title: "保存文件",
    defaultPath: "",
    filters: [
        {
            name: "txt",
            extensions: ["txt", "json", "js", "css", "styl", "html", "vue"]
        }
    ],
    buttonLabel: "保存文件"
}).then(result => {
    if (!result.canceled) {
        //todo
    }
}).catch(err => {
    //todo
});

// 消息提示框
dialog.showMessageBox({
    title: "标题",
    message: "提示的内容"
});

// 错误提示框
dialog.showErrorBox('标题','提示的内容')

```

## 文件对象
> DOM的文件接口提供了关于原生文件的抽象，以便用户可以直接使用HTML5文件API处理原生文件。 Electron已经向 <code>文件</code> 接口添加了一个 <code>path</code> 属性, 在文件系统上暴露出文件的真实路径

```html
<div id="drag" style="width: 200px;height: 200px;background-color: chartreuse;"></div>
<script type="text/javascript" charset="utf-8">
    const dragtest = document.querySelector('#drag')
    dragtest.ondrop = function(e){
        e.preventDefault() //必须阻止默认事件
        console.log(e.dataTransfer.files[0]) //拖拽到app上的文件的真实路径
    }
    dragtest.ondragover = function(e){
        e.preventDefault() //必须阻止默认事件
    }
</script>
```

## 网页间共享数据
1. 使用<code>localStorage</code>，<code>sessionStorage</code> 或者 <code>IndexedDB</code>。
2. 使用<code>Electron</code>内的IPC机制实现，将数据村子主进程的某个全局变量中，然后在多个渲染进程中使用<code>remote</code>模块来访问它。
```javascript
// 在主进程中
global.data = {
    item:'value'
}

// 渲染进程中
// 第一个页面设置item
require('electron').remote.getGlobal('data').item = 'new value'

// 第二个页面获取item
require('electron').remote.getGlobal('data').item // => 'new value'
```

## 全局快捷键

```javascript
const { app, globalShortcut } = require('electron')
app.on('ready', () => {
  // 注册一个 'ctrl+X' 的全局快捷键
    const ret = globalShortcut.register('ctrl+X', () => {
        console.log('ctrl+X is pressed')
    })
    if (!ret) {
        console.log('registration failed')
    }
    // 检查快捷键是否注册成功
    console.log(globalShortcut.isRegistered('ctrl+X'))
})

app.on('will-quit', () => {
    // 注销快捷键
    globalShortcut.unregister('ctrl+X')
    // 注销所有快捷键
    globalShortcut.unregisterAll()
})
```

### 方法
```javascript
globalShortcut.register(accelerator, callback) //注册快捷键
globalShortcut.isRegistered(accelerator) //全局快捷键是否注册成功
globalShortcut.unregister(accelerator) //注销的全局快捷键。
globalShortcut.unregisterAll() //注销所有的全局快捷键
```

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

## 菜单
```javascript
const { Menu } = require("electron");
```
### 静态方法
```javascript
Menu.setApplicationMenu(menu) //设置菜单
Menu.getApplicationMenu() //返回菜单
Menu.buildFromTemplate(template) //构建菜单
```
### 实例方法
```javascript
menu.popup([options]) // 弹出上下文菜单
menu.closePopup() // 关闭上下文菜单
menu.append(menuItem) // 将菜单项追加到菜单
menu.getMenuItemById(id) // 返回具有指定id的菜单项
menu.insert(pos, menuItem) // 在指定位置插入菜单项
```

### 实例事件
1. <code>'menu-will-show'</code> 调用<code>menu.popup()</code>事件时触发该事件
2. <code>'menu-will-close'</code> 手动关闭弹出，或使用<code>menu.closePopup()</code>方法关闭弹出时，触发该事件

### 实例属性
1. <code>menu.items</code> 菜单项数组

## 网络请求(electron中可以使用axios等流行的网络请求库)

```javascript
const { app } = require('electron')
app.on('ready', () => {
    const { net } = require('electron')
    const request = net.request('https://github.com')
    request.on('response', (response) => {
        console.log(response)
        var data;
        response.on('data', (chunk) => {
            data+=chunk
        })
        response.on('end', () => {
            console.log(data)
        })
    })
    request.end() //！！！注意
})
```

## 通知
```javascript
const { Notification } = require("electron");//在渲染进程中使用HTML5 API,在主进程中引入该模块
```

### 在渲染进程中使用HTML5 API

```javascript
let myNotification = new Notification('标题', {
  body: '通知正文内容'
})

myNotification.onclick = () => {
  console.log('通知被点击')
}
```
### 在主进程中使用 **Notification** 模块

**new Notification([options])**
```javascript
var notification = new Notification({
    title: '标题'，
    body: '通知正文内容'
}).show()
```
**<code>参数</code>Object(可选)**
1. <code>title</code> String - 通知的标题, 将在通知窗口的顶部显示.
2. <code>subtitle</code>String (可选) 通知的副标题, 显示在标题下面。 macOS
3. <code>body</code>String 通知的正文文本, 将显示在标题或副标题下面.
4. <code>silent</code>Boolean (可选) 在显示通知时是否发出系统提示音。
5. <code>icon</code>(String | NativeImage ) (可选) 用于在该通知上显示的图标。
6. <code>hasReply</code>Boolean (可选) 是否在通知中添加一个答复选项。 macOS
7. <code>timeoutType</code> String (optional) <code>Linux</code> <code>Windows</code> - The timeout duration of the notification. Can be 'default' or 'never'.
8. <code>replyPlaceholder</code>String (可选) 答复输入框中的占位符。 macOS
9. <code>sound</code>String (可选) 显示通知时播放的声音文件的名称。 macOS
10. <code>urgency</code> String (optional) <code>Linux</code> - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
11. <code>actions</code> NotificationAction[] (可选) <code>macOS</code> - 要添加到通知中的操作 请阅读 <code>NotificationAction</code>文档来了解可用的操作和限制。
12. <code>closeButton</code>Text String (可选) <code>macOS</code> - 自定义的警告框关闭按钮文字。如果该字符串为空，那么将使用本地化的默认文本。

**实例方法**
```javascript
notification.show()
notification.close()
```

## 在线离线 侦测

### 渲染进程(navigator.onLine)

```javascript
const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? "online" : "offline");
};
window.addEventListener("online", alertOnlineStatus);
window.addEventListener("offline", alertOnlineStatus);
alertOnlineStatus();
```

## 电源监视器
> 监视电源状态的改变。
```javascript
powerMonitor.on('suspend',()=>{
    new Notification({
        title: '电源监视器',
        body: '系统挂起'
    }).show()
})
powerMonitor.on('resume',()=>{
    new Notification({
        title: '电源监视器',
        body: '系统恢复'
    }).show()
})
powerMonitor.on('on-ac',()=>{
    new Notification({
        title: '电源监视器',
        body: '交流电触发'
    }).show()
})
powerMonitor.on('on-battery',()=>{
    new Notification({
        title: '电源监视器',
        body: '使用电池电量触发'
    }).show()
})
powerMonitor.on('loca-screen',()=>{
    new Notification({
        title: '电源监视器',
        body: '当即将锁定屏幕时触发'
    }).show()
})
powerMonitor.on('unlock-screen',()=>{
    new Notification({
        title: '电源监视器',
        body: '屏幕解锁触发'
    }).show()
})
powerMonitor.getSystemIdleState(num)) //电脑num秒前的状态
powerMonitor.getSystemIdleTime() //电脑空闲的时间
```

## 省电拦截器
> 阻止系统进入低功耗 (休眠) 模式。

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep') // 阻止操作系统关闭显示器
console.log(powerSaveBlocker.isStarted(id))
```

### 方法
```javascript
powerSaveBlocker.start(type) // type取值prevent-app-suspension(仅防止应用程序被挂起)|prevent-display-sleep(阻止操作系统关闭显示器)
powerSaveBlocker.stop(id) // 停止指定的省电拦截器
powerSaveBlocker.isStarted(id) // 指定的省电拦截器是否启动
```

## 任务栏的进度条

```javascript
const { BrowserWindow } = require('electron')
const mainWin = new BrowserWindow()
mainWin.setProgressBar(0.5) // 参数为0-1
```

## RecentDocument(底部的最近打开)

```javascript
// 增加一个文件到最近文件列表
const { app } = require('electron')
app.addRecentDocument('D://新建文本.txt')
```

```javascript
// 清空最近文件列表
const { app } = require('electron')
app.clearRecentDocuments()
```

## remote
### electron中分主进程和渲染进程
1. **主进程中可以使用的模块**：app、autoUpdater、BrowserView,BrowserWindow、contentTracing、dialog、globalShortcut、inAppPurchase、ipcMain、Menu、MenuItem、net、netLog、通知、powerMonitor、powerSaveBlocker、protocol、screen、session、systemPreferences、触控板、Tray、webContents.
2. **渲染进程中可以使用的模块**：desktopCapturer、ipcRenderer、remote、webFrame
3. **两种进程都可用的模块**：clipboard、crashReporter、nativeImage、shell

**借助remote,可以在渲染进程中使用主进程中的模块**

## 屏幕
> 检索有关屏幕大小、显示器、光标位置等的信息。
```javascript
const { app, BrowserWindow, screen } = require('electron')
let win
app.on('ready', () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({ width, height })
  win.loadURL('https://github.com')
})
```

### 方法
```javascript
screen.getCursorScreenPoint() // 返回当前鼠标的绝对位置
screen.getPrimaryDisplay() // 返回主窗口对象
screen.getAllDisplays() // 返回窗口数组
screen.getDisplayNearestPoint(point) // 返回离指定点最近的一个窗口
screen.getDisplayMatching(rect) // 返回离指定的图形最密切相交一个窗口
```
### 事件
```javascript
'display-added' // 新的窗口被添加时触发
'display-removed' // 旧的窗口被移除时触发
'display-metrics-changed' // 窗口对象中的一个或多个值发生改变时触发
```

## shell

```javascript
const { shell } = require('electron')
shell.openExternal('https://github.com')// 在用户的默认浏览器中打开URL
```

### 方法
```javascript
shell.showItemInFolder(fullPath) //在文件管理器中显示给定路径的文件,并选中
shell.openItem(fullPath) //以桌面的默认方式打开给定的文件
shell.openExternal(url) //在用户的默认浏览器中打开URL
shell.moveItemToTrash(fullPath) //把路径为fullPath的文件移动到垃圾箱,返回操作状态
shell.beep() //播放哔哔的声音
```

## 网页嵌入electron的三种方法
> 如果要将Web内容嵌入electron中的<code>BrowserWindow</code>，则可以使用三个选项：<code>&lt;iframe&gt;</code>标签，<code>&lt;webview&gt;</code>标签和<code>BrowserViews</code>。每个选项提供的功能略有不同，在不同情况下很有用。为了帮助您在这两者之间进行选择，本指南将说明两者的区别和功能。

### iframe
> Electron中的iframe与常规浏览器中的iframe一样。<code>&lt;iframe&gt;</code>页面中的元素可以显示外部网页，前提是其内容安全策略允许。为了限制<code>&lt;iframe&gt;</code>标记中站点的功能数量，建议使用<code>sandbox</code>属性，并且仅允许您要支持的功能。
### webview
> WebView基于Chromium的WebView，Electron未明确支持。我们不保证WebView API在Electron的将来版本中仍然可用。使用<code>&lt;webview&gt;</code>标签，您需要在BrowserWindow中设置webPreferences.webviewTag = true。
WebView是一个自定义元素（<code>&lt;webview&gt;</code>），仅在Electron内部起作用。它们被实现为“进程外iframe”。这意味着与的所有通信<code>&lt;webview&gt;</code>都是使用IPC异步完成的。该<code>&lt;webview&gt;</code>元素具有许多类似于的自定义方法和事件，webContents可让您更好地控制内容。
与相比<code>&lt;iframe&gt;</code>，<code>&lt;webview&gt;</code>往往会稍微慢一些，但在加载和与第三方内容通信以及处理各种事件方面提供了更大的控制权。
### BrowserViews
> BrowserView不是DOM的一部分-相反，它们是在主进程中创建并由其控制的。它们只是现有窗口顶部的另一层Web内容。这意味着它们与您自己的BrowserWindow内容完全分开，并且它们的位置不受DOM或CSS的控制，而是通过在主过程中设置界限来控制的。
BrowserView提供了对其内容的最大控制，因为它们的实现webContents方式与实现方式相似BrowserWindow。但是，它们不是您DOM的一部分，而是覆盖在它们之上，这意味着您将必须手动管理它们的位置。

## webFrame
> 自定义渲染当前网页

```javascript
const { webFrame } = require('electron')
webFrame.setZoomFactor(2) // 将当前页缩放到200%
webFrame.getZoomFactor() // 获取当前的缩放比例
const cssKey = webFrame.insertCSS("h2{color:#fff;}") // 将css注入当前网页
webFrame.executeJavaScript(`
    setTimeout(()=>{
        console.log(1)
    },1000)
`) // 将js注入当前网页
```

### 方法
```javascript
webFrame.setZoomFactor(factor) // 设置缩放
webFrame.getZoomFactor() // 获取缩放倍数
webFrame.insertCSS(css) // 当前网页中注入css
webFrame.removeInsertedCSS(key) // 当前网页中删除注入的css,key取注入时的返回值
webFrame.executeJavaScript(code) // 当前网页中注入js
webFrame.clearCache() // 尝试释放不再使用的内存
```

## 打包遇到的问题

electron打包有多种工具,如<code>electron-packager</code>,<code>electron-builder</code>,<code>grunt-electron-installer</code>等,我使用<code>electron-builder</code>打包成功。
第一次打包会下载一些依赖文件,在大陆正常情况是下载不成功的,使用科学上网也可能下载不成功,执行打包命令时控制台会打印当前下载的文件的链接,复制链接，手动下载后解压到<code>\AppData\Local\electron-builder\Cache</code>目录
package.json文件的build字段参考如下:
```javascript
"build": {
    "appId": "com.test.app",
    "productName":"productName", 
    "copyright":"xxx",
    "directories": {
        "app": "./"
    },
    "icon": "./fav.ico",
    "nsis": {
        "oneClick": false,
        "allowToChangeInstallationDirectory": true,
        "perMachine": true,
        "runAfterFinish": false
    }
},
```