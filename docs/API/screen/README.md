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
1. screen.getCursorScreenPoint() // 返回当前鼠标的绝对位置
2. screen.getPrimaryDisplay() // 返回主窗口对象
3. screen.getAllDisplays() // 返回窗口数组
4. screen.getDisplayNearestPoint(point) // 返回离指定点最近的一个窗口
5. screen.getDisplayMatching(rect) // 返回离指定的图形最密切相交一个窗口
```
### 事件
```javascript
1. 'display-added' // 新的窗口被添加时触发
2. 'display-removed' // 旧的窗口被移除时触发
3. 'display-metrics-changed' // 窗口对象中的一个或多个值发生改变时触发
```