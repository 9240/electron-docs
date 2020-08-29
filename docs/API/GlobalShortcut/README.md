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