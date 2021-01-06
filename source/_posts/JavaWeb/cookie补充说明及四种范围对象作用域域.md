---
title: 12.12cookie补充说明及四种范围对象作用域
date: 2019-11-13 10:00:44
tags: JavaWeb
---

## cookie补充说明及四种范围对象作用域

客户端在第一次请求服务端时，如果服务端发现此请求没有JSESSIONID，则会创建一个name=SESIONID的cookie，并返回客户端

**Cookie：不是内置对象，要使用必须new，但是服务端会自动生成一个name=SESIONID的cookie**

---

四种范围对象作用域参考第5.5篇文章！

