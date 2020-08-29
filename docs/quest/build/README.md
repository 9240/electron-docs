## 打包遇到的问题

electron打包有多种工具,如<code>electron-packager</code>,<code>electron-builder</code>,<code>grunt-electron-installer</code>等,我使用<code>electron-builder</code>打包成功。
第一次打包会下载一些依赖文件,在大陆正常情况是下载不成功的,使用科学上网也可能下载不成功,执行打包命令时控制台会打印当前下载的文件的链接,复制链接，手动下载后解压到<code>\AppData\Local\electron-builder\Cache</code>目录
package.json文件的build字段参考如下:
```javascript
"build": {
    "appId": "com.test.app",
    "productName":"productName", 
    "copyright":"xxx",
    "directories": {
        "app": "./"
    },
    "icon": "./fav.ico",
    "nsis": {
        "oneClick": false,
        "allowToChangeInstallationDirectory": true,
        "perMachine": true,
        "runAfterFinish": false
    }
},
```