---
title: 1.fs与http的使用
date: 2019-11-17 19:53:59
tags: Node
---

### fs与http的使用

```javascript
//引入fs、http模块
var http = require('http')
var fs = require('fs')
//创建服务器实例
var server = http.createServer()
server.on('request', function(req, res) {
    var url = req.url
    if (url === '/') {
        fs.readFile('./resource/index.html', function(error, data) {
            if (error) {
                //设置编码
                // text/plain  普通文本
                // text/html   网页
                res.setHeader('Content-Type', 'text/plain;charset=utf-8')
                res.end('文件读取失败！')
            } else {
                res.end(data)
            }
        })
    }
})
server.listen(3000, function() { //可以启动多可服务器，但端口号不能重复
    console.log('服务器启动成功！')
})
```

