---
title: 14.14使用JDBC切换数据库以及PreparedStatement的使用
date: 2019-11-15 12:04:55
tags: JavaWeb
---

## 使用JDBC切换数据库以及PreparedStatement的使用

![MauhCt.jpg](https://s2.ax1x.com/2019/11/15/MauhCt.jpg)

```java
public class jdbcDemo {
	private static final String URL = "jdbc:mysql://localhost:3306/hba";
	private static final String USER = "root";
	private static final String PWD = "123456";

	public static void updata() throws ClassNotFoundException, SQLException {
		Statement stmt = null;
		Connection connection = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			stmt = connection.createStatement();
			// 增加数据库
			// String sql="insert into student value ('王伟',18)";
			// 删除数据库
			// String sql = "delete from student where uage=19";
			// 更改数据库
			String sql = "update student set uname='aaa' where  uage=18  ";
			// 增删改是executeUpdate()
			int count = stmt.executeUpdate(sql);
			if (count > 0) {
				System.out.println("操作成功！");
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (stmt != null)
					stmt.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	public static void query() {
		Statement stmt = null;
		Connection connection = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			stmt = connection.createStatement();
			// 查询数据库
			String sql = "select *from student";
			// 查询是executeQuery()
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				//下标的形式。从1开始
//				String name = rs.getString(1);
//				int age = rs.getInt(2);
				
				//或者如下（字段查询）
				String name = rs.getString("uname");
				int age = rs.getInt("uage");
				
				System.out.println(name + "---" + age);
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
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

	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		//updata();
		query();
	}

}
```

### Connection产生操作数据库对象

- Connection产生Statement对象：createStatement()
-  Connection产生PreparedStatement对象：PrepareStatement() 
-  Connection产生CallableStatement对象：PrepareCall() 

### Statement操作数据库

- 增删改 ：executeUpdate()；
- 查询：executeQuery();

### PreparedStatement操作数据库

> public  interface   PreparedStatement  extend  Statement

### ResultSet 保存结果集

- next()  : 光标下移，判断是否有下一条数据
- getXxx(字段名/位置) : 获取具体的字段值

```java
public class JDBCPreparedStatement {

	private static final String URL = "jdbc:mysql://localhost:3306/hba";
	private static final String USER = "root";
	private static final String PWD = "123456";

	public static void updata() throws ClassNotFoundException, SQLException {
		Connection connection = null;
		PreparedStatement pstmt = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			/*
			 * Statement stmt = connection.createStatement(); // 增加数据库 // String
			 * sql="insert into student value ('王伟',18)"; // 删除数据库 // String sql =
			 * "delete from student where uage=19"; // 更改数据库 String sql =
			 * "update student set uname='aaa' where  uage=18  "; // 增删改是executeUpdate() int
			 * count = stmt.executeUpdate(sql);
			 */

			// PreparedStatement

			String sql = "insert into student value (?,?)";
			pstmt = connection.prepareStatement(sql);
			pstmt.setString(1, "bbb");
			pstmt.setInt(2, 25);
			int count = pstmt.executeUpdate();

			if (count > 0) {
				System.out.println("操作成功！");
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (pstmt != null)
					pstmt.close();
				if (connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}

	public static void query() {
		PreparedStatement pstmt = null;
		Connection connection = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			// 查询数据库
			String sql = "select *from student where uname like ? ";
			pstmt = connection.prepareStatement(sql);
			pstmt.setString(1, "bbb");

			// 查询是executeQuery()
			rs = pstmt.executeQuery();
			while (rs.next()) {
				// 下标的形式。从1开始
//				String name = rs.getString(1);
//				int age = rs.getInt(2);

				// 或者如下（字段查询）
				String name = rs.getString("uname");
				int age = rs.getInt("uage");

				System.out.println(name + "---" + age);
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
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

	public static void main(String[] args) throws ClassNotFoundException, SQLException {
//		updata();
		query();
	}

}
```

### PreparedStatement与Statement在使用时的区别

- Statement

  ```
  sql
  executeUpdate(sql)
  ```

- PreparedStatement

  ```
  sql（可能存在占位符？）
  在创建PreparedStatement对象时，将sql预编译PreparedStatement(sql)
  executeUpdate()
  setXxx()  替换占位符？
  ```

  

