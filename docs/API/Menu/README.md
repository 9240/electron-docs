## 菜单
```javascript
const { Menu } = require("electron");
```
### 静态方法
```javascript
Menu.setApplicationMenu(menu) //设置菜单
Menu.getApplicationMenu() //返回菜单
Menu.buildFromTemplate(template) //构建菜单
```
### 实例方法
```javascript
menu.popup([options]) // 弹出上下文菜单
menu.closePopup() // 关闭上下文菜单
menu.append(menuItem) // 将菜单项追加到菜单
menu.getMenuItemById(id) // 返回具有指定id的菜单项
menu.insert(pos, menuItem) // 在指定位置插入菜单项
```

### 实例事件
1. <code>'menu-will-show'</code> 调用<code>menu.popup()</code>事件时触发该事件
2. <code>'menu-will-close'</code> 手动关闭弹出，或使用<code>menu.closePopup()</code>方法关闭弹出时，触发该事件

### 实例属性
1. <code>menu.items</code> 菜单项数组