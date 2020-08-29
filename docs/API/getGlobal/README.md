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