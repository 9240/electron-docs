## 开发环境搭建
### window
> Electron 支持Windows 7 及以上版本---任何在低版本Windows上开发Electron的尝试都将是徒劳无功的。 您可以使用微软向开发者免费提供的Windows 10虚拟机镜像。

首先，安装最新版本的Node.js 。访问Node.js下载页面，选择<code>Windows Installer</code>。 下载完成后， 执行安装程序，根据引导完成安装即可。

在安装过程中的配置界面, 请勾选<code>Node.js runtime</code>、<code>npm package manager</code>和<code>Add to PATH</code>这三个选项。

安装完成后，我们需要来确认Node.js是不是可以正常工作。 点击 开始 按钮，输入<code>PowerShell</code>，找到Windows PowerShell。 打开<code>PowerShell</code>或其他你喜欢的命令行客户端后，通过以下命令来确认 <code>node</code> 和 <code>npm</code>已经安装成功：
```bash
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```
如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的代码编辑器就可以开始开发工作了。
### MacOS
> Electron支持 macOS 10.10 (Yosemite) 及以上版本. 目前Apple不允许在非Apple电脑上运行macOS虚拟机，所以，如果你需要一台Mac的话，可以考虑租用Mac云服务。

首先，安装最新版本的Node.js 。 推荐安装最新的<code>长期支持版本</code>或者 <code>当前发行版本</code> 。 访问Node.js下载页面选择 <code>macOS Installer</code> 。 当然，你也可以使用Homebrew安装Node.js，但我们不推荐你这么做，因为许多工具并不兼容Homebrew安装Node.js的方式。

下载完成后， 执行安装程序，根据引导完成安装即可。

安装完成后，我们需要来确认Node.js是不是可以正常工作。 在<code>/Applications/Utilities</code>文件夹中找到macOS的<code>Terminal</code> 程序(或者直接使用Spotlight直接搜索关键词<code>Terminal</code>) 。 打开<code>Terminal</code>或其他你喜欢的命令行客户端后，通过以下命令来确认<code>node</code> 和 <code>npm</code>已经安装成功：
```bash
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```
如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的代码编辑器就可以开始开发工作了。
### Linux
> 一般来说，Electron支持Ubuntu 12.04、Fedora 21、Debian 8 及其以上版本。
首先，安装最新版本的Node.js 。 对于不同linux分支，安装步骤会有所差异。 假如你使用系统自带的包管理器，比如：<code>apt</code> 或者 <code>pacman</code>，请使用[Node.js 官方Linux安装指引](https://nodejs.org/en/download/package-manager/)。
打开你喜欢的命令行工具，通过以下命令来确认node 和 npm 在全局可用：
```bash
# 下面这行的命令会打印出Node.js的版本信息
node -v

# 下面这行的命令会打印出npm的版本信息
npm -v
```
如果上述命令均打印出一个版本号，就说明Node.js已经安装好了！ 然后，你只需要安装一个适合JavaScript开发的代码编辑器就可以开始开发工作了。