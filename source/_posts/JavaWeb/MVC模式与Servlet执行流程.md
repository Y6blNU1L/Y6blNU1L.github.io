---
title: 20.20MVC模式与Servlet执行流程
date: 2019-11-21 09:48:52
tags: JavaWeb
---

## MVC模式与Servlet执行流程

### MVC设计模式

- M：Model  模型：功能，用JavaBean实现
- V：View   视图：用于显示与用户交互
- C：Controller  控制器：接受请求，将请求跳转到模型进行处理；模型处理完毕后，再将处理的结果返回给请求处。一般使用Servlet实现

### MVC模型

![M5ERRx.jpg](https://s2.ax1x.com/2019/11/21/M5ERRx.jpg)

### MVC模型理解

![M5VVyT.jpg](https://s2.ax1x.com/2019/11/21/M5VVyT.jpg)

### Servlet

java类必须符合的一定规范：

- 必须继承java.servlet.http.HttpServlet
- 必须重写取照片那个的doGet()或doPost()方法
  - doGet():接收并处理get提交方式的请求
  - doPost():接收并处理post提交方式的请求

要想使用Servlet，必须配置（Servlet2.5）web.xml或者（Servlet3.0）@WebServlet

### web.xml配置方法

![Mo4uVJ.jpg](https://s2.ax1x.com/2019/11/22/Mo4uVJ.jpg)

### Servlet流程

```
请求 -->  <url-pattern>  --> <servlet-mapping>中的<servlet-name>去匹配<servlet>中的<servlet-name>然后需找到<servlet-class>
```

#### index.jsp

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<a href="WelcomeServlet">WelcomeServlet</a>
	<form action="WelcomeServlet"  method="Post">
		<input type="submit" />
	</form>
</body>
</html>
```



#### web.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <display-name>ServletProject</display-name>
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
  
  
  <servlet>
  	<servlet-name>WelcomeServlet</servlet-name>
  	<servlet-class>com.WelcomeServlet</servlet-class>
  </servlet>
  

  <servlet-mapping>
  	<servlet-name>WelcomeServlet</servlet-name>
  	<url-pattern>/WelcomeServlet</url-pattern>
  </servlet-mapping>
</web-app>
```

#### java的Servlet代码

```java
public class WelcomeServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//System.out.println("doGet...");
		this.doGet(req,resp);
	}
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//System.out.println("dopost...");
		this.doGet(req,resp);
	}
}
```

