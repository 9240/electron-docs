## 文件对象
> DOM的文件接口提供了关于原生文件的抽象，以便用户可以直接使用HTML5文件API处理原生文件。 Electron已经向 <code>文件</code> 接口添加了一个 <code>path</code> 属性, 在文件系统上暴露出文件的真实路径

```html
<div id="drag" style="width: 200px;height: 200px;background-color: chartreuse;"></div>
<script type="text/javascript" charset="utf-8">
    const dragtest = document.querySelector('#drag')
    dragtest.ondrop = function(e){
        e.preventDefault() //必须阻止默认事件
        console.log(e.dataTransfer.files[0]) //拖拽到app上的文件的真实路径
    }
    dragtest.ondragover = function(e){
        e.preventDefault() //必须阻止默认事件
    }
</script>
```