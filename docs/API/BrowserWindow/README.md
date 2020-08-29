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