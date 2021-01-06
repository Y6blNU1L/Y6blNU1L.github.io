---
title: 1.1JSP环境搭建及入门
date: 2019-09-16 17:32:06
tags: JavaWeb
---

## JSP环境搭建及入门

> JSP：动态网页

> CS架构：Client Server 

> BS架构：Broswer Server

### 下载并配置Tomcat 7服务器

a.配置jdk。（java_home 、classpath、path）

b.配置tomcat_home,在环境变量path中配置tomcat的所在根本目录。

c.执行tomcat的bin目录中的startup.bat文件看是否配置成功,关闭则执行shutdown.bat文件。

d.默认端口是8080。

e.本地访问，localhost:8080,若有页面，则开启服务成功。

### 状态码

**404：资源部存在**

**200：一切正常**

**403：权限不足**

**300/301：页面重定向**

**500：服务器内部错误**

