---
title: 44.44session绑定、钝化、活化
date: 2019-12-12 13:07:48
tags: JavaWeb
---

## session绑定、钝化、活化

### session的钝化活化

- 钝化：内存   -->  硬盘
- 活化：  硬盘  -->  内存

### session对象的四种状态

监听session绑定事件和解绑：HttpSessionBindingListener   不需要配置web.xml

- session.setAttribute("a",xxx)
- session.removeAttribute("a")

监听session对象的钝化、活化：HttpSessionActivationListener   不需要配置web.xml

- 钝化
- 活化

### 如何钝化、活化

配置tomcat安装目录/conf/context.xml。

钝化、活化的本质是序列化、反序列化，因此需要实现Serializable接口。

总结：钝化、活化实际执行是通过context.xml中进行配置而进行。

### 绑定、解绑

#### BeanListener.java

```java
public class BeanListener implements HttpSessionBindingListener {

	@Override
	public void valueBound(HttpSessionBindingEvent event) {
		System.out.println("绑定：Bean对象（将Bean对象增加到session域中），绑定的对象："+this+"sessionId:"+event.getSession().getId());
	}

	@Override
	public void valueUnbound(HttpSessionBindingEvent event) {
		System.out.println("解绑：Bean对象（将Bean对象从session域中移除），解绑的对象："+this+"sessionId:"+event.getSession().getId());
	}

}
```

#### binding.jsp

```jsp
<%@page import="com.listener.BeanListener"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		BeanListener bean=new BeanListener();
		session.setAttribute("bean", bean);
	%>
</body>
</html>
```

### 钝化、活化

#### BindListener2.java

```java
public class BindListener2 implements HttpSessionActivationListener,Serializable {
	private  int num;
	private String user;
	
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}


	//活化之后
	@Override
	public void sessionDidActivate(HttpSessionEvent event) {
		System.out.println("活化之后: BindListener2对象将会随着session的活化而活化");
	}
	//钝化之前
	@Override
	public void sessionWillPassivate(HttpSessionEvent event) {
		System.out.println("钝化之前: BindListener2对象将会随着session的钝化而钝化");
	}

}
```

#### write.jsp

```jsp
<%@page import="com.listener.BindListener2"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
	BindListener2 bean=new BindListener2();
	bean.setNum(10);
	bean.setUser("zs");
	//将bean保存在硬盘里面（tomcat配置好的路径）
	session.setAttribute("bean", bean);
	%>
</body>
</html>
```

#### read.jsp

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
	从以盘中读取session域中的对象(活化):<br/>
	num:${sessionScope.bean.num}</br>
	user:${sessionScope.bean.user}</br>
</body>
</html>
```

#### web.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://java.sun.com/xml/ns/javaee" xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd" id="WebApp_ID" version="2.5">
  <display-name>UpAndDown</display-name>
  <!-- 配置监听器  -->
  <listener>
  	<listener-class>com.listener.BindListener2</listener-class>
  </listener>
  
  <welcome-file-list>
    <welcome-file>index.html</welcome-file>
    <welcome-file>index.htm</welcome-file>
    <welcome-file>index.jsp</welcome-file>
    <welcome-file>default.html</welcome-file>
    <welcome-file>default.htm</welcome-file>
    <welcome-file>default.jsp</welcome-file>
  </welcome-file-list>
</web-app>
```

#### tomcat中的context.xml文件

```
<?xml version="1.0" encoding="UTF-8"?>
<Context>
	<!--通过配置实现钝化、活化
	maxIdleSwap:最大的空闲时间、如果超过改时间将会被钝化
	FileStore:通过该类具体实现钝化操作
	directory:相对路径：D:\apache-tomcat-7.0.94\work\Catalina\localhost\UpAndDown
	-->
    <Manager className="org.apache.catalina.session.PersistentManager"  maxIdleSwap="5" >
    	<Store className="org.apache.catalina.session.FileStore" directory="lq" ></Store>
    </Manager>

</Context>
```

