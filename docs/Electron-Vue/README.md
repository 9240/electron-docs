## electron-vue使用
在vue的基础上扩展了electron的API,正常使用第三方UI框架,JS库
1. 不推荐使用CDN（离线访问），确实要用在<code>src/index.ejs</code>中添加
2. css框架在<code>src/renderer/main.js</code>中引入
3. <code>__static</code>静态资源目录
4. 安装<code>electron-updater</code>,取消<code>src/main/index.js</code>底部的代码注释以启用自动更新