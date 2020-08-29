## 任务栏的进度条

```javascript
const { BrowserWindow } = require('electron')
const mainWin = new BrowserWindow()
mainWin.setProgressBar(0.5) // 参数为0-1
```