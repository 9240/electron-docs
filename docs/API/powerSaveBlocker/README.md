## 省电拦截器
> 阻止系统进入低功耗 (休眠) 模式。

```javascript
const { powerSaveBlocker } = require('electron')

const id = powerSaveBlocker.start('prevent-display-sleep') // 阻止操作系统关闭显示器
console.log(powerSaveBlocker.isStarted(id))
```

### 方法
```javascript
1. powerSaveBlocker.start(type) // type取值prevent-app-suspension(仅防止应用程序被挂起)|prevent-display-sleep(阻止操作系统关闭显示器)
2. powerSaveBlocker.stop(id) // 停止指定的省电拦截器
3.powerSaveBlocker.isStarted(id) // 指定的省电拦截器是否启动
```
