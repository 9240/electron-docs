## 网页嵌入electron的三种方法
> 如果要将Web内容嵌入electron中的<code>BrowserWindow</code>，则可以使用三个选项：<code>&lt;iframe&gt;</code>标签，<code>&lt;webview&gt;</code>标签和<code>BrowserViews</code>。每个选项提供的功能略有不同，在不同情况下很有用。为了帮助您在这两者之间进行选择，本指南将说明两者的区别和功能。

### iframe
> Electron中的iframe与常规浏览器中的iframe一样。<code>&lt;iframe&gt;</code>页面中的元素可以显示外部网页，前提是其内容安全策略允许。为了限制<code>&lt;iframe&gt;</code>标记中站点的功能数量，建议使用<code>sandbox</code>属性，并且仅允许您要支持的功能。
### webview
> WebView基于Chromium的WebView，Electron未明确支持。我们不保证WebView API在Electron的将来版本中仍然可用。使用<code>&lt;webview&gt;</code>标签，您需要在BrowserWindow中设置webPreferences.webviewTag = true。
WebView是一个自定义元素（<code>&lt;webview&gt;</code>），仅在Electron内部起作用。它们被实现为“进程外iframe”。这意味着与的所有通信<code>&lt;webview&gt;</code>都是使用IPC异步完成的。该<code>&lt;webview&gt;</code>元素具有许多类似于的自定义方法和事件，webContents可让您更好地控制内容。
与相比<code>&lt;iframe&gt;</code>，<code>&lt;webview&gt;</code>往往会稍微慢一些，但在加载和与第三方内容通信以及处理各种事件方面提供了更大的控制权。
### BrowserViews
> BrowserView不是DOM的一部分-相反，它们是在主进程中创建并由其控制的。它们只是现有窗口顶部的另一层Web内容。这意味着它们与您自己的BrowserWindow内容完全分开，并且它们的位置不受DOM或CSS的控制，而是通过在主过程中设置界限来控制的。
BrowserView提供了对其内容的最大控制，因为它们的实现webContents方式与实现方式相似BrowserWindow。但是，它们不是您DOM的一部分，而是覆盖在它们之上，这意味着您将必须手动管理它们的位置。