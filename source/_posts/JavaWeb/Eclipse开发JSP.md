---
title: 4.4Eclipse开发JSP
date: 2019-09-18 18:08:50
tags: JavaWeb
---

## Eclipse开发JSP

### 在Eclipse中创建Web项目

#### 访问方式

在浏览器中可以直接访问WebContent中的文件，

例如localhost:8080/MyJspProject/index.jsp,

其中的index.jsp就在WebContent目录中,

但是WEB-INF中的文件无法通过客户端（浏览器）直接访问,

只能通过请求转发来访问。

**注意：并不是任何的内部跳转都能访问WEB-INF；原因是跳转有两种方式：请求转发和重定向**

#### 配置tomcat运行时的环境

jsp<--->servlet

**a.将tomcat/lib中的servlet-api.jar到构件路径**

**b. 右键项目 -->Build Path -->Add library -->Server Runtime**

#### 统一字符集编码

a.编码分类：

设置jsp文件的编码（jsp文件的pageEncoding属性）： jsp-->java

设置浏览器读取jsp文件的编码（jsp中的content属性）

**一般统一编码UTF-8**

b.文本编码：

**将整个Eclipse中的文件统一设置**