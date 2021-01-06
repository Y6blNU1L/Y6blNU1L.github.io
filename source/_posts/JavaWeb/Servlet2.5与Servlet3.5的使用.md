---
title: 21.21Servlet2.5与Servlet3.5的使用
date: 2019-11-22 10:20:46
tags: JavaWeb
---

## Servlet2.5与Servlet3.5的使用

### Servlet2.5步骤

- 编写一个类，继承HttpServlet
- 重写doGet()、doPost()方法
- 编写web.xml中的映射关系

### Servlet2.5与Servlet3.5的区别

> Servlet3.5不需要在web.xml中配置，但需要在Servlet类中的定义处之上编写注解  `@WebServlet`("url-pattern的值")

### 项目根目录

- WebContent
- src

web.xml中的 /  代表(项目的根路径)：localhost:8080/项目名/

jsp中的 /  代表（服务器根路径）：localhost:8080/

### Servlet  5个生命周期

![MobrkD.jpg](https://s2.ax1x.com/2019/11/22/MobrkD.jpg)

- init()  :第一次访问Servlet时会被执行（只执行一次）
- service()  --> doGet()   doPost()  :调用几次，执行几次
- destroy()  :  关闭tomcat服务器时，执行一次

