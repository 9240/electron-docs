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
1. BrowserView.getAllViews() //返回所有打开的BrowserView的数组
2. BrowserView.fromId(1) //返回id为1的BrowserView
3. BrowserView.fromWebContents(BrowserView.fromId(1).webContents) //返回webContents为BrowserView.fromId(1).webContents的BrowserView
```

### 实例方法
```javascript
1. browserView.destroy() // 强制关闭视图
2. browserView.isDestroyed() // 判断browserView是否被销毁
```