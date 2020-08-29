## 调用摄像头
```html
<video width="100%" height="100%"></video>
<script>
    window.onload = function(){
        let video = document.querySelector("video");
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: { facingMode: "user", width: 640, height: 360 }  //调用前置摄像头
                // video: { facingMode: { exact: "environment" } } //后置摄像头
            })
            .then(function (stream) {
                console.log(stream);
                video.srcObject = stream;
                video.play();
            })
            .catch(function (err) {
                console.log(`连接视频流错误: ${err}`);
            });
    }
</script>
```