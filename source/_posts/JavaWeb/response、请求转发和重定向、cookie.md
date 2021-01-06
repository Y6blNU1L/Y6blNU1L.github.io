---
title: 7.7response、请求转发和重定向、cookie
date: 2019-11-09 16:30:20
tags: JavaWeb
---

## response、请求转发和重定向、cookie

### response

request   客户端-    ->    服务端

response  客户端    <--    服务端

> response：响应对象，提供的方法：

- void addCookie （Cookie cookie）：服务端向客户端增加cookie对象
- void sendRedirect (String location)  throws  IOException   ： 页面跳转的一种方法
- void setContentType （String type）：设置服务端响应的编码（设置服务端的ContentType类型）

### 请求转发和重定向

> **请求转发、重定向的区别**

![Mmy6P0.png](https://s2.ax1x.com/2019/11/09/Mmy6P0.png)

> **请求转发**

![Mmy8UI.png](https://s2.ax1x.com/2019/11/09/Mmy8UI.png)

> **重定向**

![MmyG5t.png](https://s2.ax1x.com/2019/11/09/MmyG5t.png)

### cookie

Cookie (客户端，不是内置对象) ：Cookie是由服务端产生，在发送给客户端保存.需要new一个对象

```
Cookie cookie=new Cookie("name","name的值");
```

> Cookie :  name=value

- public Cookie (String name , String value)
- String getName()
- String getValue()
- void setMaxAge(int expiry)   最大有效期（秒）

> 服务端准备Cookie发送给客户端：

- response.addCookie (Cookie cookie)

> 客户端获取cookie：

- request.getCookies()

**注意：不能直接获取某一个单独对象，只能一次性将全部cookie全部获取**

通过浏览器访问，可以发现除了自己设置的Cookie对象外，还有name为  JSESSIONID的Cookie