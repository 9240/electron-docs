# 安全建议清单
## 1. 仅加载安全内容
任何不属于你的应用的资源都应该使用像<code>HTTPS</code>这样的安全协议来加载。 换言之， 不要使用不安全的协议 （如 <code>HTTP</code>）。 同理，我们建议使用<code>WSS</code>，避免使用<code>WS</code>，建议使用<code>FTPS</code>，避免使用<code>FTP</code>，等等诸如此类的协议。
### 为什么？
<code>HTTPS</code> 有三个主要好处：
1. 它对远程服务器进行身份验证, 确保您的应用程序连接到正确的主机而不是模仿器。
2. 确保数据完整性, 断言数据在应用程序和主机之间传输时未被修改。
3. 它对用户和目标主机之间的通信进行加密, 从而更难窃听应用程序和主机之间发送的信息。

### 怎么做？

```javascript
// 不推荐
browserWindow.loadURL ('http://example.com')
// 推荐 
browserWindow.loadURL ('https://example.com')
```
```html
<!-- 不推荐 -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">
<!-- 推荐 -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2. 禁止在所有渲染器中使用Node.js集成显示远程内容
在加载远程内容的任何呈现程序（<code>BrowserWindow</code>、<code>BrowserView</code>或 <code>&lt;webview&gt;</code>）中不启用Node.js集成至关重要。其目的是限制您授予远程内容的权限, 从而使攻击者在您的网站上执行 JavaScript 时更难伤害您的用户。
在此之后，你可以为指定的主机授予附加权限。例如，如果您打开一个指向<code>https://example.com/的BrowserWindow</code>，您可以为该网站提供所需的功能，但不能提供更多功能。
### 为什么？
如果攻击者跳过渲染进程并在用户电脑上执行恶意代码，那么这种跨站脚本(XSS) 攻击的危害是非常大的。 跨站脚本攻击很常见，通常情况下，威力仅限于执行代码的网站。 禁用Node.js集成有助于防止XSS攻击升级为“远程代码执行” (RCE) 攻击。

### 怎么做？

```javascript
// 不推荐
const mainWindow = new BrowserWindow({
    webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true
    }
})
mainWindow.loadURL('https://example.com')
```

```javascript
// 推荐
const mainWindow = new BrowserWindow({
    webPreferences: {
        preload: path.join(app.getAppPath(), 'preload.js')
    }
})
mainWindow.loadURL('https://example.com')
```

```html
<!-- 不推荐 -->
<webview nodeIntegration src="page.html"></webview>
<!-- 推荐 -->
<webview src="page.html"></webview>
```

当禁用Node.js集成时，你依然可以暴露API给你的站点以使用Node.js的模块功能或特性。 预加载脚本依然可以使用<code>require</code>等Node.js特性， 以使开发者可以暴露自定义API给远程加载内容。

在下面的预加载脚本例子中，后加载的网站内容可以使用<code>window.readConfig()</code>方法，但不能使用Node.js特性。

```javascript
const { readFileSync } = require('fs')
window.readConfig = function () {
    const data = readFileSync('./config.json')
    return data
}
```

## 3. 为远程内容开启上下文隔离
上下文隔离是Electron的一个特性，它允许开发者在预加载脚本里运行代码，里面包含Electron API和专用的JavaScript上下文。 实际上，这意味全局对象如<code> Array.prototype.push</code> 或 <code>JSON.parse</code>等无法被渲染进程里的运行脚本修改。

Electron使用了和Chromium相同的Content Scripts技术来开启这个行为。

即使当您使用<code>nodeIntegration: false</code>强制强隔离并阻止使用Node原语时，<code>contextIsolation</code>也必须使用。
### 为什么？
上下文隔离允许在渲染器中运行的每个脚本对其JavaScript环境进行更改，而不必担心与Electron API或预加载脚本中的脚本冲突。

上下文隔离虽然仍是实验性的电子功能，但它增加了安全性。它为Electron API和预加载脚本创建了一个新的JavaScript世界，从而减轻了所谓的“原型污染”攻击。

同时，预加载脚本依然能访问<code>document</code>和<code>window</code>对象。换个角度，就像你以很小的投入却得到双倍回报一样。
### 怎么做？

```javascript
// 主进程
const mainWindow = new BrowserWindow({
    webPreferences: {
        contextIsolation: true,
        preload: 'preload.js'
    }
})
```

```javascript
// 预加载脚本
// 在页面加载前设置变量
webFrame.executeJavaScript('window.foo = "foo";')
// 这个变量仅限于当前上下文，被加载的页面将无权访问
window.bar = 'bar'
document.addEventListener('DOMContentLoaded', () => {
    // 结果为 'undefined'，因为 window.foo 仅在主上下文中可用
    console.log(window.foo)
    // 结果为 'bar'，因为 window.bar 定义在本上下文中
    console.log(window.bar)
})
```

## 4. 处理来自远程内容的会话许可请求
当你使用Chromes时，也许见过这种许可请求：每当网站尝试使用某个特性时，就会弹出让用户手动确认(如网站通知)

此API基于Chromium permissions API，并已实现对应的许可类型。
### 为什么？
默认情况下，Electron将自动批准所有的许可请求，除非开发者手动配置一个自定义处理函数。 尽管默认如此，有安全意识的开发者可能希望默认反着来。
### 怎么做？

```javascript
const { session } = require('electron')
session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
    const url = webContents.getURL()
    if (permission === 'notifications') {
        // Approves the permissions request
        callback(true)
    }
    // Verify URL
    if (!url.startsWith('https://example.com/')) {
        // Denies the permissions request
        return callback(false)
    }
})
```

## 5. 不要禁用WebSecurity
*Electron的默认值即是建议值*

在渲染进程（<code>BrowserWindow</code>、<code>BrowserView</code> 和 <code>&lt;webview&gt;</code>）中禁用<code>webSecurity</code>将导致至关重要的安全性功能被关闭。

不要在生产环境中禁用<code>webSecurity</code>。
### 为什么？
禁用<code>webSecurity</code>将会禁止同源策略并且将<code>allowRunningInsecureContent</code>属性置<code>true</code>。 换句话说，这将使得来自其他站点的非安全代码被执行。
### 怎么做？

```javascript
// 不推荐
const mainWindow = new BrowserWindow({
    webPreferences: {
        webSecurity: false
    }
})
```

```javascript
// 推荐
const mainWindow = new BrowserWindow()
```

```html
<!-- 不推荐 -->
<webview disablewebsecurity src="page.html"></webview>
<!-- 推荐 -->
<webview src="page.html"></webview>
```

## 6. 定义一个内容安全策略
内容安全策略(CSP) 是应对跨站脚本攻击和数据注入攻击的又一层保护措施。 我们建议任何载入到Electron的站点都要开启。
### 为什么？
CSP允许Electron通过服务端内容对指定页面的资源加载进行约束与控制。 如果你定义<code>https://example.com</code>这个源，所属这个源的脚本都允许被加载，反之<code>https://evil.attacker.com</code>不会被允许加载运行。 对于提升你的应用安全性，设置CSP是个很方便的办法。

下面的CSP设置使得Electron只能执行自身站点和来自<code>apis.example.com</code>的脚本。

```javascript
// 不推荐
Content-Security-Policy: '*'
// 推荐
Content-Security-Policy: script-src 'self' https://apis.example.com
```
### CSP HTTP头
Electron 会处理<code>Content-Security-Policy</code>HTTP 标头，它可以在<code>webRequest.onHeadersReceived</code>中进行设置：
```javascript
const { session } = require('electron')
session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
        responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': ['default-src \'none\'']
        }
    })
})
```
### CSP元标签
CSP的首选传递机制是HTTP报头，但是在使用<code>file://</code>协议加载资源时，不可能使用此方法。在某些情况下，例如使用<code>file://</code>协议，使用<code>&lt;meta&gt;</code>标记直接在标记中的页面上设置策略可能很有用：

```javascript
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7. 不要设置<code>allowRunningInsecureContent</code>为<code>true</code>
*Electron的默认值即是建议值。*

默认情况下，Electron不允许网站在<code>HTTPS</code>中加载或执行非安全源(<code>HTTP</code>) 中的脚本代码、CSS或插件。 将<code>allowRunningInsecureContent</code>属性设为<code>true</code>将禁用这种保护。

当网站的初始内容通过<code>HTTPS</code>加载并尝试在子请求中加载<code>HTTP</code>的资源时，这被称为"混合内容"。
### 为什么？
通过<code>HTTPS</code>加载会将该资源进行加密传输，以保证其真实性和完整性。
### 怎么做？
```javascript
// 不推荐
const mainWindow = new BrowserWindow({
    webPreferences: {
        allowRunningInsecureContent: true
    }
})
```

```javascript
// 推荐
const mainWindow = new BrowserWindow({})
```

## 8. 不要开启实验室特性
*Electron的默认值即是建议值。*

Electron 的熟练用户可以通过<code>experimentalFeatures</code>属性来启用 Chromium 实验性功能。
### 为什么？
实验室特性，恰如其名，是实验性质且不对所有Chromium用户开启。更进一步说，这些特性对Electron的整体影响可能没有测试。

尽管存在合理的使用场景，但是除非你知道你自己在干什么，否则你不应该开启这个属性。
### 怎么做？
```javascript
// 不推荐
const mainWindow = new BrowserWindow({
    webPreferences: {
        experimentalFeatures: true
    }
})
```

```javascript
// 推荐
const mainWindow = new BrowserWindow({})
```

## 9. 不要使用 <code>enableBlinkFeatures</code>
*Electron的默认值即是建议值。*

Blink是Chromium里的渲染引擎名称。 就像<code>experimentalFeatures</code>一样，<code>enableBlinkFeatures</code>属性将使开发者启用被默认禁用的特性。
### 为什么？
通常来说，某个特性默认不被开启肯定有其合理的原因。 针对特定特性的合理使用场景是存在的。 作为开发者，你应该非常明白你为何要开启它，有什么后果，以及对你应用安全性的影响。 在任何情况下都不应该推测性的开启特性。
### 怎么做？
```javascript
// 不推荐
const mainWindow = new BrowserWindow({
    webPreferences: {
        enableBlinkFeatures: 'ExecCommandInJavaScript'
    }
})
```

```javascript
// 推荐
const mainWindow = new BrowserWindow()
```

## 10. 不要使用<code>allowpopups</code>
*Electron的默认值即是建议值。*

如果您正在使用<code>&lt;webview&gt;</code>,您可能需要页面和脚本加载进您的<code>&lt;webview&gt;</code>标签以打开新窗口。 开启<code>allowpopups</code>属性将使得<code>BrowserWindows</code>可以通过<code>window.open()</code>方法创建。 否则,<code>&lt;webview&gt;</code> 标签内不允许创建新窗口。
### 为什么？
如果你不需要弹窗，最好使用默认值以关闭新<code>BrowserWindows</code>的创建。 以下是最低的权限要求原则：若非必要，不要再网站中创建新窗口。
### 怎么做？
```html
<!-- 不推荐 -->
<webview allowpopups src="page.html"></webview>
<!-- 推荐 -->
<webview src="page.html"></webview>
```

## 11. 创建WebView前确认其选项
通过渲染进程创建的WebView是不开启Node.js集成的，且也不能由自身开启。 但是，WebView可以通过其<code>webPreferences</code>属性创建一个独立的渲染进程。

最好<code>&lt;webview&gt;</code>从主过程控制新标记的创建，并确认其<code>webPreferences</code>不禁用安全功能。
### 为什么？
由于<code>&lt;webview&gt;</code>它们位于DOM中，因此即使禁用了Node.js集成，也可以通过在您的网站上运行的脚本来创建它们。

Electron 可以让开发者关闭各种控制渲染进程的安全特性。 通常情况下，开发者并不需要关闭他们中的任何一种 - 因此你不应该允许创建不同配置的<code>&lt;webview&gt;</code>标签
### 怎么做？
在<code>&lt;webview&gt;</code>标签生效前，Electron将产生一个<code>will-attach-webview</code>事件到<code>webContents</code>中。 利用这个事件来阻止可能含有不安全选项的 <code>webViews</code> 创建。
```javascript
app.on('web-contents-created', (event, contents) => {
    contents.on('will-attach-webview', (event, webPreferences, params) => {
        // Strip away preload scripts if unused or verify their location is legitimate
        delete webPreferences.preload
        delete webPreferences.preloadURL
        // Disable Node.js integration
        webPreferences.nodeIntegration = false
        // Verify URL being loaded
        if (!params.src.startsWith('https://example.com/')) {
            event.preventDefault()
        }
    })
})
```
强调一下，这份列表只是将风险降到最低，并不会完全屏蔽风险。 如果您的目的是展示一个网站，浏览器将是一个更安全的选择。

## 12. 禁用或限制导航
如果您的应用程序不需要导航或仅需要导航到已知页面，则最好将导航完全限制在该已知范围内，而不允许任何其他类型的导航。
### 为什么？
导航是一种常见的攻击手段。如果攻击者可以说服您的应用程序离开当前页面，则可能会迫使您的应用程序打开Internet上的网站。即使将您的应用程序webContents配置为更安全（例如已nodeIntegration禁用或contextIsolation启用），让您的应用程序打开随机网站也会使开发应用程序的工作变得更加容易。

常见的攻击模式是，攻击者诱使您的应用程序用户与该应用程序进行交互，以使其导航至攻击者的页面之一。通常通过链接，插件或其他用户生成的内容来完成此操作。
### 怎么做？
如果您的应用程序已经不需要导航，你可以调用<code>event.preventDefault()</code>的<code>will-navigate</code>处理程序。如果您知道您的应用可能会导航到哪些页面，请检查事件处理程序中的URL，仅在与您期望的URL匹配时才进行导航。

我们建议您对URL使用Node的解析器。有时可能会愚弄简单的字符串比较- <code>startsWith('https://example.com')</code>测试会让它<code>https://example.com.attacker.com</code>通过。
```javascript
const URL = require('url').URL
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
        if (parsedUrl.origin !== 'https://example.com') {
            event.preventDefault()
        }
    })
})
```

## 13. 禁用或限制新窗口的创建
如果您拥有一组已知的窗口，则最好限制在应用程序中创建其他窗口。
### 为什么？
就像导航一样，新的创建<code>webContents</code>是常见的攻击媒介。攻击者试图说服您的应用创建具有比以前更多特权的新窗口，框架或其他渲染器进程。或打开了以前无法打开的页面。

如果除了您需要创建的窗口之外，您还不需要创建其他窗口，则禁用该创建将免费为您提供一点额外的安全性。对于打开一个<code>BrowserWindow</code>并且不需要在运行时打开任意数量的其他窗口的应用程序，通常是这种情况。
### 怎么做？
<code>webContents</code>将<code>new-window</code>在创建新窗口之前发出事件。除了其他参数外，还将传递该事件，<code>url</code>请求打开窗口以及用于创建该窗口的选项。我们建议您使用事件检查窗口的创建，将其限制为仅您需要的。

```javascript
const { shell } = require('electron')
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', async (event, navigationUrl) => {
        // In this example, we'll ask the operating system
        // to open this event's url in the default browser.
        event.preventDefault()
        await shell.openExternal(navigationUrl)
    })
})
```

## 14. 请勿使用<code>openExternal</code>不受信任的内容
Shell <code>openExternal</code>允许使用桌面的本机实用程序打开给定的协议URI。例如，在macOS上，此功能类似于<code>open</code>终端命令实用程序，并将基于URI和文件类型关联打开特定的应用程序。
### 为什么？
使用不当<code>openExternal</code>可能会损害用户的主机。当openExternal与不受信任的内容一起使用时，可以利用它来执行任意命令。

### 怎么做？
webContents将new-window在创建新窗口之前发出事件。除了其他参数外，还将传递该事件，url请求打开窗口以及用于创建该窗口的选项。我们建议您使用事件检查窗口的创建，将其限制为仅您需要的。

```javascript
//  不推荐
const { shell } = require('electron')
shell.openExternal(USER_CONTROLLED_DATA_HERE)
```

```javascript
//  推荐
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')

```

## 15. 禁用<code>remote</code>模块
该<code>remote</code>模块为渲染器进程提供了一种访问通常仅在主进程中可用的API的方式。使用它，渲染器可以调用主流程对象的方法，而无需显式发送进程间消息。如果您的桌面应用程序不运行不受信任的内容，这可能是使渲染器进程访问并使用仅对主进程可用的模块（例如与GUI相关的模块（对话框，菜单等））的有用方法。

但是，如果您的应用程序可以运行不受信任的内容，并且即使您对渲染器进程进行相应的沙箱处理，则该<code>remote</code>模块也可以使恶意代码更容易逃脱沙箱并通过主进程的更高特权来访问系统资源。因此，在这种情况下应禁用它。
### 为什么？
remote使用内部IPC通道与主进程进行通信。“原型污染”攻击可以向内部IPC通道授予恶意代码访问权限，然后可以通过模仿<code>remote</code>IPC消息并获得对具有更高特权的主进程模块的访问来逃脱沙箱。

此外，预加载脚本可能会意外将模块泄漏到沙盒渲染器。泄漏的<code>remote</code>恶意代码具有大量用于执行攻击的主要过程模块。

禁用该<code>remote</code>模块可消除这些攻击媒介。启用上下文隔离还可以阻止“原型污染”攻击的成功。
### 怎么做？
webContents将new-window在创建新窗口之前发出事件。除了其他参数外，还将传递该事件，url请求打开窗口以及用于创建该窗口的选项。我们建议您使用事件检查窗口的创建，将其限制为仅您需要的。

```javascript
//  不推荐渲染进程中运行不信任的内容
const mainWindow = new BrowserWindow({})
```

```javascript
//  推荐
const mainWindow = new BrowserWindow({
    webPreferences: {
        enableRemoteModule: false
    }
})
```

```html
<!-- 不推荐渲染进程中运行不信任的内容  -->
<webview src="page.html"></webview>
<!-- 推荐 -->
<webview enableremotemodule="false" src="page.html"></webview>
```

## 16. 过滤<code>remote</code>模块
如果您不能禁用该<code>remote</code>模块，则应过滤全局，节点和电子模块（所谓的内置模块），这些模块可通过<code>remote</code>您的应用程序不需要访问。这可以通过完全阻止某些模块并用仅公开您的应用程序所需功能的代理替换其他模块来完成。
### 为什么？
由于主进程具有系统访问权限，因此在受损的渲染器进程中运行的恶意代码手中，由主进程模块提供的功能可能很危险。通过将可访问模块的数量限制到应用程序所需的最少数量，并过滤掉其他模块，可以减少恶意代码可用于攻击系统的工具集。

请注意，最安全的选择是完全禁用远程模块。如果选择过滤访问而不是完全禁用该模块，则必须非常小心以确保通过过滤器允许的模块无法进行特权升级。

### 怎么做？
```javascript
const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality
const allowedModules = new Set(['crypto'])
const proxiedModules = new Map(['fs', readOnlyFsProxy])
const allowedElectronModules = new Set(['shell'])
const allowedGlobals = new Set()
app.on('remote-require', (event, webContents, moduleName) => {
    if (proxiedModules.has(moduleName)) {
        event.returnValue = proxiedModules.get(moduleName)
    }
    if (!allowedModules.has(moduleName)) {
        event.preventDefault()
    }
})
app.on('remote-get-builtin', (event, webContents, moduleName) => {
    if (!allowedElectronModules.has(moduleName)) {
        event.preventDefault()
    }
})
app.on('remote-get-global', (event, webContents, globalName) => {
    if (!allowedGlobals.has(globalName)) {
        event.preventDefault()
    }
})
app.on('remote-get-current-window', (event, webContents) => {
    event.preventDefault()
})
app.on('remote-get-current-web-contents', (event, webContents) => {
    event.preventDefault()
})
```

## 17. 使用当前版本的 Electron

您应该努力使用最新的 Electron 版本。当新版本发布时，您应尽快更新您的应用。

### 为什么？
与使用较新版本的那些组件的应用程序相比，使用较早版本的Electron，Chromium和Node.js构建的应用程序更容易成为目标。一般而言，较旧版本的Chromium和Node.js的安全性问题和漏洞利用更为广泛。

Chromium和Node.js都是由成千上万的优秀开发人员构建的令人印象深刻的工程壮举。鉴于它们的受欢迎程度，它们的安全性由同样熟练的安全性研究人员仔细测试和分析。这些研究人员中有许多是负责任地披露漏洞的，这通常意味着研究人员将在发布问题之前给Chromium和Node.js一些时间来修复问题。如果您的应用程序运行的是最新版本的Electron（因此也称为Chromium和Node.js），则其安全性尚未广为人知，它将更加安全。