---
title: 50.2JNDI与tomcat连接池
date: 2019-12-16 12:57:12
tags: JavaWeb
---

## JNDI与tomcat连接池

### JNDI

将某个资源对象，以配置文件（tomcat/conf/context.xml）的形式写入

### 实现步骤

- tomcat/conf/context.xml配置：

```
<Environment name="jndiName" value="jndiValue" type="java.lang.String" />
```

- ### jsp中使用

```
<%
	Context ctx=new InitialContext();
	String testjndi=(String) ctx.lookup("java:comp/env/jndiName");
	out.print(testjndi);
%>

```

### 连接池

- 常见连接池
  - Tomcat-dbcp
  - dbcp
  - c3p0
  - druid

- 用数据源（`javax.sql.DataSource`）管理连接池

  - Tomcat-dbcp 在`tomcat/conf/context.xml`配置

  ```
  <Resource name="这个连接的名字" auth="Container" type="javax.sql.DataSource"   
  maxActive="400" maxIdle="20" maxWait="5000" Username="数据库名" password="数据库密码"  driverClassName="com.mysql.cj.jdbc.Driver"  url="jdbc:mysql://localhost:3306/库名" />
  ```

  ![Q4CHWd.png](https://s2.ax1x.com/2019/12/16/Q4CHWd.png)

  然后在项目WEB-INF/lib中加入jar包

  `mysql-connector-java-8.0.15.jar`

  然后在项目中的`web.xml`中配置

  ```
  <resource-ref>
  	<res-ref-name>这里写上面的Resource中name的属性值</res-ref-name>
  	<res-type>这里写写上面的Resource中type的属性值</res-type>
  	<res-auth>这里写写上面的Resource中auth的属性值</res-auth>
  </resource-ref>
  ```

  然后再连接类中写,来获取`connection`

  ```
  传统JDBC方式：
  connection = DriverManager.getConnection(URL, USER, PWD);
  
  数据源方式：
  Context ctx =new InitialContext();//context.xml
  DataSource ds=(DataSource) ctx.loolup("java:comp/env/这里写上面的Resource中name的属性值");
  connection=ds.getConnection();//获得连接对象
  ```

  - DBCP连接池
  
  准备jar包`commons-dbcp2-2.1.1.jar`、`commons-pool.jar`、`mysql-connector-java-8.0.15.jar`
  
  通用：`NoClassDefFoundError`异常，说明少``commons-pool.jar``包
  
  ![QoHkjS.png](https://s2.ax1x.com/2019/12/17/QoHkjS.png)
  
  ### BasicDataSource方式

```java
public class DBCPDemo {
	
	//获取DBCP方式的ds对象
	public static DataSource getDataSourceWithDBCP() {
		BasicDataSource  dbcp=new BasicDataSource();
		dbcp.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dbcp.setUrl("jdbc:mysql://localhost:3306/hba");
		dbcp.setPassword("123456");
		dbcp.setUsername("root");
		dbcp.setInitialSize(20);
		return dbcp;
	}

	public static void main(String[] args) throws Exception {
		System.out.println(getDataSourceWithDBCP().getConnection());
	}
}
```

### BasicDataSourceFactory方式

配置方式（ `.properties`文件,格式是key=value）：dbcpconfig.properties

核心：`BasicDataSourceFactory.createDataSource(props)`

```java
public class DBCPDemo {
	
	//获取DBCP方式的ds对象
	public static DataSource getDataSourceWithDBCP() {
		BasicDataSource  dbcp=new BasicDataSource();
		dbcp.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dbcp.setUrl("jdbc:mysql://localhost:3306/hba");
		dbcp.setPassword("123456");
		dbcp.setUsername("root");
		dbcp.setInitialSize(20);
		return dbcp;
	}
	
	public static DataSource getDataSourceWithDBCPByproperties() throws Exception {
		DataSource dbcp=null;
		Properties props=new Properties();
		InputStream input = new DBCPDemo().getClass().getClassLoader().getResourceAsStream("dbcpconfig.properties");
		props.load(input);
		dbcp=BasicDataSourceFactory.createDataSource(props);
		return dbcp;
	}

	public static void main(String[] args) throws Exception {
		//System.out.println(getDataSourceWithDBCP().getConnection());
		System.out.println(getDataSourceWithDBCPByproperties().getConnection());
	}
}
```

### dbcpconfig.properties

```properties
driverClassName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/hba
username=root
password=123456
initialSize=20
```

### c3p0连接池

使用`ComboPooledDataSource`,并且准备jar包`c3p0-0.9.5.2.jar`

![QXBAy9.png](https://s2.ax1x.com/2019/12/20/QXBAy9.png)

#### c3p0Demo.java

```java
public class c3p0Demo {
	public static DataSource  getDataSourceWithC3P0() {
		ComboPooledDataSource c3p0=new ComboPooledDataSource();
		try {
			c3p0.setDriverClass("com.mysql.cj.jdbc.Driver");
		} catch (PropertyVetoException e) {
			e.printStackTrace();
		}
		c3p0.setJdbcUrl("jdbc:mysql://localhost:3306/hba");
		c3p0.setUser("root");
		c3p0.setPassword("123456");
		return c3p0;
	}
	
	
	public static DataSource  getDataSourceWithC3P0ByXml() {
		ComboPooledDataSource c3p0=new ComboPooledDataSource();
		
		return c3p0;
	}
	public static void main(String[]args) throws Exception {
		//System.out.println(getDataSourceWithC3P0().getConnection());
		System.out.println(getDataSourceWithC3P0ByXml().getConnection());
	}
}
```

#### c3p0-config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<c3p0-config>
<!-- 默认配置 -->
	<default>
		<peoperty name="user">root</peoperty>
		<peoperty name="password">123456</peoperty>
		<peoperty name="driverClass">com.mysql.cj.jdbc.Driver</peoperty>
		<peoperty name="jdbUrl">jdbc:mysql://localhost:3306/hba</peoperty>
	</default>
	
<!-- 自定义配置 -->
	<named-config name="">
	
	</named-config>

</c3p0-config>
```

