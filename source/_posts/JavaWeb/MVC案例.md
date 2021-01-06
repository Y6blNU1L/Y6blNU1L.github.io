---
title: 23.23MVC案例
date: 2019-11-24 16:51:57
tags: JavaWeb
---

## MVC案例

![MOcrWR.jpg](https://s2.ax1x.com/2019/11/24/MOcrWR.jpg)

### 实现流程

![MOgbC9.jpg](https://s2.ax1x.com/2019/11/24/MOgbC9.jpg)

### login.jsp代码

```
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>登录</title>
</head>
<body>
	<form action="LoginServlet" method="post">
		用户名：<input type="text" name="uname" /></br> 
		密码:<input type="password" name="upwd" /></br> 
		<input type="submit" value="登录" /></br>
	</form>

</body>
</html>
```

### web.xml

```
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://java.sun.com/xml/ns/javaee"
	xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
	id="WebApp_ID" version="2.5">
	<display-name>MVCProject</display-name>
	<welcome-file-list>
		<welcome-file>login.jsp</welcome-file>
		<welcome-file>index.htm</welcome-file>
		<welcome-file>index.jsp</welcome-file>
		<welcome-file>default.html</welcome-file>
		<welcome-file>default.htm</welcome-file>
		<welcome-file>default.jsp</welcome-file>
	</welcome-file-list>
	<servlet>
		<description></description>
		<display-name>LoginServlet</display-name>
		<servlet-name>LoginServlet</servlet-name>
		<servlet-class>com.servlet.LoginServlet</servlet-class>
	</servlet>
	<servlet-mapping>
		<servlet-name>LoginServlet</servlet-name>
		<url-pattern>/LoginServlet</url-pattern>
	</servlet-mapping>
</web-app>
```

### LoginDao.java

```java
//模型层，用于处理登录（查询数据库）
public class LoginDao {
	private static final String URL = "jdbc:mysql://localhost:3306/hba";
	private static final String USER = "root";
	private static final String PWD = "123456";

	public static int login(Login login) {// 登录
		int flag = -1;// 默认登录失败 -1系统异常；0用户名密码有误；1正常
		PreparedStatement pstmt = null;
		Connection connection = null;
		ResultSet rs = null;
		int result = -1;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(URL, USER, PWD);
			// 查询数据库
			String sql = "select count(*) from login where uname = ? and upwd = ?";
			pstmt = connection.prepareStatement(sql);
			pstmt.setString(1, login.getUname());
			pstmt.setString(2, login.getUpwd());
			rs = pstmt.executeQuery();
			if (rs.next()) {
				result = rs.getInt(1);
			}
			if (result > 0) {// 登入成功
				return 1;
			} else {
				return 0;// 登入失败（用户名或密码有误）
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return -1;// 登入失败（系统异常）
		} catch (SQLException e) {
			e.printStackTrace();
			return -1;// 登入失败（系统异常）
		} catch (Exception e) {
			e.printStackTrace();
			return -1;// 登入失败（系统异常）
		} finally {
			try {
				// 先开后关
				if (rs != null)
					rs.close();
				if (pstmt != null)
					pstmt.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

}
```

### Login.java

```java
public class Login {
	private String uname;
	private String upwd;

	public Login() {
	}

	public Login(String uname, String upwd) {
		this.uname = uname;
		this.upwd = upwd;
	}

	public String getUname() {
		return uname;
	}

	public void setUname(String uname) {
		this.uname = uname;
	}

	public String getUpwd() {
		return upwd;
	}

	public void setUpwd(String upwd) {
		this.upwd = upwd;
	}

}

```

### LoginServlet.java

```java
//控制器层：接收view请求，并分发给模型处理
public class LoginServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String name = request.getParameter("uname");
		String pwd = request.getParameter("upwd");
		Login login = new Login(name, pwd);
		// 调用模型层的登入功能
		int result = LoginDao.login(login);
		if (result > 0) {// 成功
			response.sendRedirect("welcome.jsp");
		} else {// 失败
			response.sendRedirect("login.jsp");
		}

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}
```

