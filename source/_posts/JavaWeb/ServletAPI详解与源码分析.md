---
title: 22.22Servlet API详解与源码分析
date: 2019-11-23 18:56:53
tags: ServletAPI详解与源码分析
---

## Servlet API详解与源码分析

### Servlet API 由两个软件包组成

- HTTP协议包
- 非HTTP协议包

目前学习的Servlet是位于`javax.servlet.http`

### Servlet继承关系

![Mqe456.jpg](https://s2.ax1x.com/2019/11/23/Mqe456.jpg)

![MquvI1.jpg](https://s2.ax1x.com/2019/11/23/MquvI1.jpg)

### web.xml

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
  <!--在整个Web容器中设置初始化参数-->
  <context-param>
  	<param-name>globalParam</param-name>
  	<param-value>globalValue...</param-value>
 
  </context-param>
  
  
  <servlet>
  	<servlet-name>WelcomeServlet</servlet-name>
  	<servlet-class>com.WelcomeServlet</servlet-class>
  	
  	<init-param>
  		<param-name>servletParam</param-name>
  		<param-value>servletValue...</param-value>
  	</init-param>
  </servlet>
  
  <servlet-mapping>
  	<servlet-name>WelcomeServlet</servlet-name>
  	<url-pattern>/WelcomeServlet</url-pattern>
  </servlet-mapping>
</web-app>
```

### Servlet类

```java
public class WelcomeServlet extends HttpServlet {
	@Override
	public void init() throws ServletException {
		System.out.println("init...");
		//获取当前servlet的初始值
		String value=super.getInitParameter("servletParam");
		System.out.println("当前servlet的参数servletParam的值是："+value);
		//获取当前web容器的初始化参数
		ServletContext servletContext=super.getServletContext();
		String globalValue= servletContext.getInitParameter("globalParam");
		System.out.println("当前当前web容器的初始化参数的值是："+globalValue);
	}
	
	@Override
	public void destroy() {
		System.out.println("destroy...");
	}
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

