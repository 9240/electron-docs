## 对话框(带Sync为同步)
```javascript
const { dialog } = require('electron')
dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'] 
})
```
### 方法
```javascript
// 打开文件
dialog.showOpenDialog({
    title: "请选择文件",
    defaultPath: "",
    filters: [
        {
            name: "txt",
            extensions: ["txt", "json", "js", "css", "styl", "html", "vue"]
        }
    ],
    buttonLabel: "打开文件"
}).then(result => {
    if (!result.canceled) {
        //todo
    }
}).catch(err => {
    //todo
});;

// 保存文件
dialog.showSaveDialog({
    title: "保存文件",
    defaultPath: "",
    filters: [
        {
            name: "txt",
            extensions: ["txt", "json", "js", "css", "styl", "html", "vue"]
        }
    ],
    buttonLabel: "保存文件"
}).then(result => {
    if (!result.canceled) {
        //todo
    }
}).catch(err => {
    //todo
});

// 消息提示框
dialog.showMessageBox({
    title: "标题",
    message: "提示的内容"
});

// 错误提示框
dialog.showErrorBox('标题','提示的内容')

```