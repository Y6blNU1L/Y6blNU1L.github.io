---
title: 18.18JSP访问数据库
date: 2019-11-19 15:16:42
tags: JavaWeb
---

## JSP访问数据库

- 导包，如果是Java项目，将jar包复制到工程里边，然后右键built Path，如果是web项目，只需要将jar复制到 WEB-INF/bin 目录下即可。

### 数据库结构如下：

![M2mKyQ.jpg](https://s1.ax1x.com/2019/11/19/M2mKyQ.jpg)

### java代码如下：

```java
package com;

import java.sql.*;

public class LoginDao {
	public int login(String name, String pwd) // 1成功 0失败 -1系统异常
	{
		String URL = "jdbc:mysql://localhost:3306/hba";
		String USER = "root";
		String PWD = "123456";
		Statement stmt = null;
		Connection connection = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			stmt = connection.createStatement();
			// String name=request.getParameter("uname");
			// String pwd=request.getParameter("upwd");
			// 查询数据库
			String sql = "select count(*) from login where uname = '" + name + "' and upwd=' " + pwd + "' ";
			// 查询是executeQuery()
			rs = stmt.executeQuery(sql);
			int count = -1;
			if (rs.next()) {
				count = rs.getInt(1);
			}
			return count;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return -1;
		} catch (SQLException e) {
			e.printStackTrace();
			return -1;
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		} finally {
			try {
				// 先开后关
				if (rs != null)
					rs.close();
				if (stmt != null)
					stmt.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}

```

### JSP代码如下：

```jsp
index.jsp

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<form action="check.jsp" method="post">
		用户名：<input type="text" name="uname" /><br/>
		密码：<input type="password" name="upwd" /><br/>
		<input type="submit" value="登入" /><br/>
	</form>
	
</body>
</html>


check.jsp

<%@page import="com.LoginDao"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
		String name = request.getParameter("uname");
		String pwd = request.getParameter("upwd");
		LoginDao dao = new LoginDao();
		int result = dao.login(name, pwd);
		if (result > 0) {
			out.print("登入成功！");
		} else if (result == 0) {
			out.print("用户名或密码输入错误！");
		} else {
			out.print("系统异常！");
		}
	%>
</body>
</html>

```

