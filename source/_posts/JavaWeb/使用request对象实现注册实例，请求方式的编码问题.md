---
title: 6.6使用request对象实现注册实例，请求方式的编码问题
date: 2019-11-09 09:53:43
tags: JavaWeb
---

## 使用request对象实现注册实例，请求方式的编码问题

### 提交方式

链接/文件名 ？参数名1=参数值1 & 参数名2=参数值2 & 参数名3=参数值3

get提交方式：method=“get”  和地址栏请求方式默认都属于get提交方式

> get与post请求方式的区别：

- get方式在地址栏显示请求信息，而post不会显示
- 文件上传必须是post方式

### 统一请求编码 request

**注意：tomcat 7默认编码是iso-8859-1，而tomcat 8默认编码是utf-8**

> get方式：

- 每一个变量去更改

  ```
  new String ("旧编码"，"新编码")
  ```

- 修改`server.xml`，一次性的更改tomcat默认的get提交方式编码

```
在Content标签内增加 URIEncoding="UTF-8" 属性
```

> post方式

```
在jsp页面内加入：request.setCharacterEncoding("UTF-8");
```

