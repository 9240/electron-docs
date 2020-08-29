module.exports = {
    base:'/',
    title:'electron',
    themeConfig: {
      logo: '/electronLog.png',
      nav: [
        { text: '首页', link: '/' },        
      ],
      displayAllHeaders: true,
      sidebar: [
        {
          title: '环境配置',
          sidebarDepth: 0,
          collapsable: false,
          children: [
            {
              title: '开发环境搭建',
              path: '/Env/devEnv/', 
            }
          ]
        },
        {
          title: 'API',
          sidebarDepth: 0,
          collapsable: false,
          children: [
            {
              title: 'App',
              path: '/API/App/',  
            },
            {
              title: 'BrowserView',
              path: '/API/BrowserView/',
            },
            {
              title: 'BrowserWindow',
              path: '/API/BrowserWindow/',  
            },
            {
              title: 'webFrame',
              path: '/API/webFrame/',  
            },
            {
              title: '菜单',
              path: '/API/Menu/',  
            },
            {
              title: '通知',
              path: '/API/Notifications/',  
            },
            {
              title: '对话框',
              path: '/API/Dialog/',  
            },
            {
              title: '全局快捷键',
              path: '/API/GlobalShortcut/',  
            },
            {
              title: 'IPC',
              path: '/API/IPC/',  
            },
            {
              title: '网络',
              path: '/API/Net/',  
            },
            {
              title: 'remote',
              path: '/API/remote/',  
            },
            {
              title: '剪切板',
              path: '/API/Clipboard/',  
            },
            {
              title: '电源监视器',
              path: '/API/PowerMonitor/',  
            },
            {
              title: 'shell',
              path: '/API/shell/',  
            },
            {
              title: '数据共享',
              path: '/API/getGlobal/',  
            },
            {
              title: '最近打开',
              path: '/API/RecentDocument/',  
            },
            {
              title: '任务栏进度条',
              path: '/API/ProgressBar/',  
            },
            {
              title: '在线离线侦测',
              path: '/API/online&offline/',  
            },
            {
              title: '文件对象',
              path: '/API/fileDragDrop/',  
            },
            {
              title: '网页嵌入',
              path: '/API/WebEmbeds/',  
            },
            {
              title: '省电拦截器',
              path: '/API/powerSaveBlocker/',  
            },
            {
              title: '屏幕',
              path: '/API/screen/',  
            },
            {
              title: '摄像头',
              path: '/API/Camera/',  
            }
          ]
        },
        {
          title: 'electron-vue',
          sidebarDepth: 0,
          collapsable: false,
          children: [
            {
              title: '开发环境搭建',
              path: '/Env/devEnvVue/',  
            },
            {
              title: '使用',
              path: '/Electron-Vue/',  
            }
          ]
        },
        {
          title: '问题',
          sidebarDepth: 0,
          collapsable: false,
          children: [
            {
              title: '打包',
              path: '/quest/build/',  
            }
          ]
        },
        {
          title: '安全',
          sidebarDepth: 0,
          collapsable: false,
          children: [
            {
              title: '安全建议清单',
              path: '/Safety/',  
            }
          ]
        },
      ]
    }
}