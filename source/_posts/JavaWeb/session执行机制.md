---
title: 9.9session执行机制
date: 2019-11-11 15:59:25
tags: JavaWeb
---

## session执行机制

### session：回话  

（**从开始到退出**）

- 浏览器网站： 开始-关闭
- 购物： 浏览、付款、退出

```
cookie.setMaxAge(10);  这里表示最大有效期是10秒
```

客户端第一次请求时，服务端session会产生唯一个sessionID，然后sessionID会复制给JSESSIONID放到Cookie里边，然后响应时Cookie会发送到客户端。此时客户端也有个JSESSIONID，与服务端的JSESSIONID一一对应，

**客户端：cookie(JSESSIONID)  -------    服务端：session(sessionID)**

客户端第二次或者第n次请求服务器时：服务端会先用客户端cookie中的JSESSIONID 去与服务端的session中的匹配sessionID，如果匹配成功，则（cookie的JSESSIONID  和 session的sessionID 一一对应），说明此用户不是第一次访问，就无须重新登入。

![M1yWND.jpg](https://s2.ax1x.com/2019/11/12/M1yWND.jpg)