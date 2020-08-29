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