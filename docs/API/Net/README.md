## 网络请求(electron中可以使用axios等流行的网络请求库)

```javascript
const { app } = require('electron')
app.on('ready', () => {
    const { net } = require('electron')
    const request = net.request('https://github.com')
    request.on('response', (response) => {
        console.log(response)
        var data;
        response.on('data', (chunk) => {
            data+=chunk
        })
        response.on('end', () => {
            console.log(data)
        })
    })
    request.end() //！！！注意
})
```