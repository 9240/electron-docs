## webFrame
> 自定义渲染当前网页

```javascript
const { webFrame } = require('electron')
webFrame.setZoomFactor(2) // 将当前页缩放到200%
webFrame.getZoomFactor() // 获取当前的缩放比例
const cssKey = webFrame.insertCSS("h2{color:#fff;}") // 将css注入当前网页
webFrame.executeJavaScript(`
    setTimeout(()=>{
        console.log(1)
    },1000)
`) // 将js注入当前网页
```

### 方法
```javascript
1. webFrame.setZoomFactor(factor) // 设置缩放
2. webFrame.getZoomFactor() // 获取缩放倍数
3. webFrame.insertCSS(css) // 当前网页中注入css
4. webFrame.removeInsertedCSS(key) // 当前网页中删除注入的css,key取注入时的返回值
5. webFrame.executeJavaScript(code) // 当前网页中注入js
6. webFrame.clearCache() // 尝试释放不再使用的内存
```