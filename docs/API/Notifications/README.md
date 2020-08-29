## 通知
```javascript
const { Notification } = require("electron");//在渲染进程中使用HTML5 API,在主进程中引入该模块
```

### 在渲染进程中使用HTML5 API

```javascript
let myNotification = new Notification('标题', {
  body: '通知正文内容'
})

myNotification.onclick = () => {
  console.log('通知被点击')
}
```
### 在主进程中使用 **Notification** 模块

**new Notification([options])**
```javascript
var notification = new Notification({
    title: '标题'，
    body: '通知正文内容'
}).show()
```
**<code>参数</code>Object(可选)**
1. <code>title</code> String - 通知的标题, 将在通知窗口的顶部显示.
2. <code>subtitle</code>String (可选) 通知的副标题, 显示在标题下面。 macOS
3. <code>body</code>String 通知的正文文本, 将显示在标题或副标题下面.
4. <code>silent</code>Boolean (可选) 在显示通知时是否发出系统提示音。
5. <code>icon</code>(String | NativeImage ) (可选) 用于在该通知上显示的图标。
6. <code>hasReply</code>Boolean (可选) 是否在通知中添加一个答复选项。 macOS
7. <code>timeoutType</code> String (optional) <code>Linux</code> <code>Windows</code> - The timeout duration of the notification. Can be 'default' or 'never'.
8. <code>replyPlaceholder</code>String (可选) 答复输入框中的占位符。 macOS
9. <code>sound</code>String (可选) 显示通知时播放的声音文件的名称。 macOS
10. <code>urgency</code> String (optional) <code>Linux</code> - The urgency level of the notification. Can be 'normal', 'critical', or 'low'.
11. <code>actions</code> NotificationAction[] (可选) <code>macOS</code> - 要添加到通知中的操作 请阅读 <code>NotificationAction</code>文档来了解可用的操作和限制。
12. <code>closeButton</code>Text String (可选) <code>macOS</code> - 自定义的警告框关闭按钮文字。如果该字符串为空，那么将使用本地化的默认文本。

**实例方法**
```javascript
notification.show()
notification.close()
```