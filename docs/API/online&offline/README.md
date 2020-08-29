## 在线离线 侦测

### 渲染进程(navigator.onLine)

```javascript
const alertOnlineStatus = () => {
    window.alert(navigator.onLine ? "online" : "offline");
};
window.addEventListener("online", alertOnlineStatus);
window.addEventListener("offline", alertOnlineStatus);
alertOnlineStatus();
```