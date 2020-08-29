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