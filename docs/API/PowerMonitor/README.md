## 电源监视器
> 监视电源状态的改变。
```javascript
powerMonitor.on('suspend',()=>{
    new Notification({
        title: '电源监视器',
        body: '系统挂起'
    }).show()
})
powerMonitor.on('resume',()=>{
    new Notification({
        title: '电源监视器',
        body: '系统恢复'
    }).show()
})
powerMonitor.on('on-ac',()=>{
    new Notification({
        title: '电源监视器',
        body: '交流电触发'
    }).show()
})
powerMonitor.on('on-battery',()=>{
    new Notification({
        title: '电源监视器',
        body: '使用电池电量触发'
    }).show()
})
powerMonitor.on('loca-screen',()=>{
    new Notification({
        title: '电源监视器',
        body: '当即将锁定屏幕时触发'
    }).show()
})
powerMonitor.on('unlock-screen',()=>{
    new Notification({
        title: '电源监视器',
        body: '屏幕解锁触发'
    }).show()
})
powerMonitor.getSystemIdleState(num)) //电脑num秒前的状态
powerMonitor.getSystemIdleTime() //电脑空闲的时间
```