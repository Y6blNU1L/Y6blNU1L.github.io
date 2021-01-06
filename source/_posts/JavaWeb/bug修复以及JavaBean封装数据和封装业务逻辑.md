---
title: 19.19JavaBean封装数据和封装业务逻辑
date: 2019-11-20 12:17:04
tags: JavaWeb
---

## JavaBean封装数据和封装业务逻辑

​	 JavaBean 是一种JAVA语言写成的可重用组件。为写成JavaBean，类必须是具体的和公共的，并且具有无参数的构造器。JavaBean 通过提供符合一致性设计模式的公共方法将内部域暴露成员属性，set和get方法获取。众所周知，属性名称符合这种模式，其他Java 类可以通过自省机制(反射机制)发现和操作这些JavaBean 的属性。 

### JavaBean的作用

- 减轻jsp的复杂度
- 提高代码的复用率

### JavaBean的定义

- public修饰的类   public无参构造
- 所有属性都是private，并且提供set/get ，如果是boolean，则get可以替换成is

```java
package com.entity;

public class Person {
	private int id;
	private String name;
	private boolean isChina;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isChina() {
		return isChina;
	}
	public void setChina(boolean isChina) {
		this.isChina = isChina;
	}
}

```

### JavaBean使用层面：

- 封装`业务逻辑`的JavaBean  
- 封装`数据`的JavaBean

### 实例

- 封装对象

```java
package com.entity;

public class Login {
	//数据库表里面有啥字段,然后进行封装
	private String uname;
	private String upwd;
	
	public Login() {
		
	}
	
	public Login(String uname, String upwd) {
		super();
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

- 封装类

```java
package com.dao;

import java.sql.*;

import com.entity.Login;

public class LoginDao {
	// public int login(String name, String pwd) // 1成功 0失败 -1系统异常
	public int login(Login login) {
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
			// String sql = "select count(*) from login where uname = '" + name + "' and
			// upwd=' " + pwd + "' ";
			String sql = "select count(*) from login where uname = '" + login.getUname() + "' and upwd=' "
					+ login.getUpwd() + "' ";
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

- jsp操作

```jsp
<%@page import="com.dao.LoginDao"%>
<%@page import="com.entity.Login"%>
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
		String name = request.getParameter("uname");
		String pwd = request.getParameter("upwd");
		//实例化一个封装类的对象
		Login login = new Login(name, pwd);
		//传入封装的对象
		LoginDao dao = new LoginDao(login);
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

