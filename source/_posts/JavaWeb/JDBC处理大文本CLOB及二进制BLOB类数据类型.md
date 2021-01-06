---
title: 17.17JDBC处理大文本CLOB及二进制BLOB类数据类型
date: 2019-11-17 10:39:39
tags: JavaWeb
---

## JDBC处理大文本CLOB及二进制BLOB类数据类型

> CLOB:大文本数据（小说  ->  数据）

> BLOB：二进制

### 使用clob存储文本

```java
public class JDBCClob {

	private static final String URL = "jdbc:mysql://localhost:3306/hba";
	private static final String USER = "root";
	private static final String PWD = "123456";
	//通过jdbc存储大文本数据
	public static void clobDemo() throws ClassNotFoundException, SQLException {
		Connection connection = null;
		PreparedStatement pstmt = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			// PreparedStatement
			String sql = "insert into mynovle value (?,?)";
			pstmt = connection.prepareStatement(sql);
			pstmt.setInt(1, 1);
			File file = new File("D:\\all.txt");
			InputStream in = new FileInputStream(file);
			Reader reader = new InputStreamReader(in, "utf-8");
			pstmt.setCharacterStream(2, reader, (int) file.length());
			int count = pstmt.executeUpdate();
			if (count > 0) {
				System.out.println("操作成功！");
			}
            reader.close();
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
	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		clobDemo();
	}
}

```

### 使用clob读取文本

```
public class JDBCClob {

	private static final String URL = "jdbc:mysql://localhost:3306/hba";
	private static final String USER = "root";
	private static final String PWD = "123456";
	// 读取文本
	public static void clobReaderDemo() throws ClassNotFoundException, SQLException {
		Connection connection = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			// PreparedStatement
			String sql = "select NOVEL from mynovel where id =?";
			pstmt = connection.prepareStatement(sql);
			pstmt.setInt(1, 1);

			rs = pstmt.executeQuery();
			if (rs.next()) {
				Reader reader = rs.getCharacterStream("NOVEL");
				Writer writer = new FileWriter("src/writer.txt");

				char[] chs = new char[100];
				int len = 1;
				while ((len = reader.read(chs)) != -1) {
					writer.write(chs, 0, len);
				}
				writer.close();
				reader.close();
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

	public static void main(String[] args) throws ClassNotFoundException, SQLException {
		clobReaderDemo();
	}
}
```

### 使用BLOB存储文件

```java
public class JDBCBlob {
	private static final String URL = "jdbc:mysql://localhost:3306/hba";
	private static final String USER = "root";
	private static final String PWD = "123456";

	public static void blobDemo() throws ClassNotFoundException, SQLException {
		Connection connection = null;
		PreparedStatement pstmt = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			// PreparedStatement
			String sql = "insert into mynovle value (?,?)";
			pstmt = connection.prepareStatement(sql);
			pstmt.setInt(1, 1);
			File file = new File("D:\\music.mp3");
			InputStream in = new FileInputStream(file);
			pstmt.setBinaryStream(2, in, (int) file.length());
			int count = pstmt.executeUpdate();
			if (count > 0) {
				System.out.println("操作成功！");
			}
			in.close();
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
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
		blobDemo();
	}
}
```

### 使用BLOB读取二进制文件

```java
public class JDBCBlob {
	private static final String URL = "jdbc:mysql://localhost:3306/hba";
	private static final String USER = "root";
	private static final String PWD = "123456";
	// 读取二进制文件
	public static void blobReaderDemo() throws ClassNotFoundException, SQLException {
		Connection connection = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");// 加载驱动类
			connection = DriverManager.getConnection(URL, USER, PWD);
			// PreparedStatement
			String sql = "select music from mynovel where id =?";
			pstmt = connection.prepareStatement(sql);
			pstmt.setInt(1, 1);

			rs = pstmt.executeQuery();
			if (rs.next()) {
				InputStream in = rs.getBinaryStream("music");
				OutputStream out = new FileOutputStream("src/music.mp3");
				byte[] chs = new byte[100];
				int len = 1;
				while ((len = in.read(chs)) != -1) {
					out.write(chs, 0, len);
				}
				out.close();
				in.close();
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
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
		blobReaderDemo();
	}
}
```

