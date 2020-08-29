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