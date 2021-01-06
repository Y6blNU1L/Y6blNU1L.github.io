---
title: 13.13JDBC原理及使用Statement访问数据库
date: 2019-11-14 08:53:17
tags: JavaWeb
---

## JDBC原理及使用Statement访问数据库

JDBC : Java DateBase Connectivity

可以为多种关系型数据库DBMS提供统一的访问方式，用Java来操作数据库

### JDBC架构

![MYfrgP.jpg](https://s2.ax1x.com/2019/11/14/MYfrgP.jpg)

### JDBC API  

![MYfovV.jpg](https://s2.ax1x.com/2019/11/14/MYfovV.jpg)

具体通过一下类、接口实现：

- DriverManager ：管理jdbc驱动
- Connection ：连接    (通过DriverManager产生)
- Statement （PreparedStatement）：增删改查     （通过Connection产生）
- CallableStatement ：调用数据库中的存储过程/存储函数    （通过Connection产生）
- Result : 返回的结果集   （通过Statement 产生）

### jdbc访问数据库的基本步骤

- 导入驱动，加载具体的驱动类
- 与数据库连接
- 发送sql，执行
- 处理结果集

### 数据库驱动

![MY4mFJ.jpg](https://s2.ax1x.com/2019/11/14/MY4mFJ.jpg)

![MYoUfJ.jpg](https://s2.ax1x.com/2019/11/14/MYoUfJ.jpg)

![MYorm6.jpg](https://s2.ax1x.com/2019/11/14/MYorm6.jpg)





### 代码实例

![MtintH.jpg](https://s2.ax1x.com/2019/11/14/MtintH.jpg)

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

	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		updata();
	}

}
```



如果运行出现`The server time zone value 'ÖÐ¹ú±ê×¼Ê±¼ä' is unrec` 错误，解决方法：

![MtCOde.jpg](https://s2.ax1x.com/2019/11/14/MtCOde.jpg)

