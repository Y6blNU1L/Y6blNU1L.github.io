---
title: 31.31分页SQL
date: 2019-12-08 10:01:30
tags: JavaWeb
---

## 分页SQL

### MySql实现分页的sql

- mysql的分页语句

> select *from 表名 limit 页数X页面大小 ,页面大小

### 分页的实现

- 数据总数            【查询数据库，select  count(*)...】

- 页面大小（每页显示的数据条数）   【用户自定义】

- 总页数

  - 总页数=100/20=数据总数/页面大小

  - 总页数=103/20=数据总数/页面大小+1

    ----->

    总页数=数据总数%页面大小 ==0？ 数据总数/页面大小：数据总数/页面大小+1

- 当前页（页码）   【用户自定义】

- 当前页的对象集合（实体类集合）

### IStudentDao.java

```java
public interface IStudentDao {
	
	//查询总数据数
	public int getTotalCount();
	
	//查询的集合  currentPage:当前页码   pageSize:页面大小
	public List<Student>queryStudentsByPage(int currentPage,int pageSize);
	
	
	// 判断是否存在
	public boolean isExist(int sno);

	// 更改学生
	public boolean updataStudentBySno(int sno, Student student) ;

	// 删除数据
	public boolean deleteStudentBySno(int sno);

	// 增加数据
	public boolean addStudent(Student student) ;

	// 根据学号 查询学生
	public Student queryStudentBySno(int sno) ;

	// 查询全部学生
	public List<Student> queryAllStudents() ;
}
```

### StudentDaoImpl.java

```java
public class StudentDaoImpl implements IStudentDao {
	private static final String URL = "jdbc:mysql://localhost:3306/hba?"
			+ "characterEncoding=utf8";
	private static final String USER = "root";
	private static final String PWD = "123456";

	// 判断是否存在
	public boolean isExist(int sno) {
		return queryStudentBySno(sno) == null ? false : true;
	}

	// 更改学生
	public boolean updataStudentBySno(int sno, Student student) {
		String sql="update addstudent set  sname=? , sage=? where sno=?";
		Object []params= {student.getSname(),student.getSage(),sno};
		return DBUtil.executeUpdate(sql, params);
	}

	// 删除数据
	public boolean deleteStudentBySno(int sno) {
		String sql="delete from addstudent where sno=?";
		Object []params= {sno};
		return DBUtil.executeUpdate(sql, params);
	}

	// 增加数据
	public boolean addStudent(Student student) {
		String sql="insert into addstudent(sno,sname,sage) values(?,?,?)";
		Object [] params= {student.getSno(),student.getSname(),student.getSage()};
		return DBUtil.executeUpdate(sql, params);
	}

	// 根据学号 查询学生
	public Student queryStudentBySno(int sno) {
		Student student = null;
		PreparedStatement pstmt = null;
		Connection connection = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(URL, USER, PWD);
			// 查询数据库
			String sql = "select * from addstudent where sno = ? ";
			pstmt = connection.prepareStatement(sql);
			pstmt.setInt(1, sno);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				int no = rs.getInt("sno");
				String name = rs.getString("sname");
				int age = rs.getInt("sage");

				student = new Student(no, name, age);
			}
			return student;
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
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

	// 查询全部学生
	public List<Student> queryAllStudents() {
		List<Student> students = new ArrayList<>();
		Student student = null;
		PreparedStatement pstmt = null;
		ResultSet rs =null;
		try {
			String sql="select *from addstudent";
			rs = DBUtil.executeQuery(sql, null);
			while (rs.next()) {
				int no = rs.getInt("sno");
				String name = rs.getString("sname");
				int age = rs.getInt("sage");
				student = new Student(no, name, age);
				students.add(student);
			}
			return students;
		} 
		catch (SQLException e) {
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			DBUtil.closeAll(rs, pstmt, DBUtil.connection);
		}
	}

	@Override
	public int getTotalCount() {  //查询总数据量
		String sql="select count(1) from addstudent";
		return DBUtil.getTotalCount(sql);
	}

	@Override
	public List<Student> queryStudentsByPage(int currentPage, int pageSize) {
		String sql="select *from addstudent limit ? ,?";
		Object []params= {currentPage*pageSize,pageSize};
		List<Student>students=new ArrayList<>();
		ResultSet rs = DBUtil.executeQuery(sql, params);
		try {
			while(rs.next()) {
				Student student=new Student(rs.getInt("sno"),rs.getString("sname"),rs.getInt("sage"));
				students.add(student);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return students;
	}
}
```

### Page.java

```java
//分页帮助类
public class Page {
//	当前页
	private int currentPage;
//	页面大小
	private int pageSize;
//	当前页的数据集合
	private List<Student> students;
//	总数居
	private int totalCount;
//	总页数
	private int totalPage;
	
	
	
	public Page() {
	}

	public Page(int currentPage, int pageSize, List<Student> students, int totalCount, int totalPage) {
		super();
		this.currentPage = currentPage;
		this.pageSize = pageSize;
		this.students = students;
		this.totalCount = totalCount;
		this.totalPage = totalPage;
	}
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
//		总页数=数据总数%页面大小 ==0？ 数据总数/页面大小：数据总数/页面大小+1
		this.totalPage=this.totalCount % this.pageSize ==0?this.totalCount / this.pageSize :this.totalCount /this.pageSize+1; 
	}
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getTotalPage() {
		return totalPage;
	}
	
}
```

### IStudentService.java

```java
public interface IStudentService {
	//根据学号查学生
	public Student queryStudentBySno(int sno) ;
	
	//查询全部学生
	public List<Student> queryAllStudents();
	
	public List<Student>queryStudentsByPage(int currentPage,int pageSize);
	public int getTotalCount();
	
	
	public boolean updateStudent(int sno,Student student) ;
	
	
	public boolean deleteStudent(int sno) ;
	
	
	public boolean addStudent(Student student);
			
}

```

### StudentServiceImpl.java

```java

//业务逻辑层：逻辑性增删改查
public class StudentServiceImpl implements IStudentService {
	
	IStudentDao studentDao=new StudentDaoImpl();
	
	//根据学号查学生
	public Student queryStudentBySno(int sno) {
		return studentDao.queryStudentBySno(sno);
	}
	//查询全部学生
	public List<Student> queryAllStudents(){
		return studentDao.queryAllStudents();
	}
	
	public boolean updateStudent(int sno,Student student) {
		if(studentDao.isExist(sno)) {
			return	studentDao.updataStudentBySno(sno, student);
		}
			return false;
	}
	
	public boolean deleteStudent(int sno) { 
		if(studentDao.isExist(sno)) {
			return	studentDao.deleteStudentBySno(sno);	 
		}
			return false;
	}
	
	public boolean addStudent(Student student) {
		if(!studentDao.isExist(student.getSno())) {
			studentDao.addStudent(student);
			return true;
		}else {
			System.out.println("此人存在！");
			return false;
		}
	}
	//查询当前页的数据集合
	@Override
	public List<Student> queryStudentsByPage(int currentPage, int pageSize) {
		return studentDao.queryStudentsByPage(currentPage, pageSize);
	}
	//查询数据总条数
	@Override
	public int getTotalCount() {
		return studentDao.getTotalCount();
	}

}
```

### queryStudentByPage.java

```java
public class queryStudentByPage extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		IStudentService  studentService=new StudentServiceImpl();
		int count = studentService.getTotalCount();
		Page page=new Page();
		
		String cPage=request.getParameter("currentPage");
		if(cPage==null) {
			cPage="1";
		}
		int currentPage = Integer.parseInt(cPage);
		page.setCurrentPage(currentPage);
		
		int totalCount = studentService.getTotalCount();
		page.setTotalCount(totalCount);
		
		//设置页面大小
		int pageSize=3;
		page.setPageSize(pageSize);
		
		List<Student> students= studentService.queryStudentsByPage(currentPage, pageSize);
		System.out.println(students);
		System.out.println(count);
		page.setStudents(students);
		
		
		request.setAttribute("p", page);
		request.getRequestDispatcher("index.jsp").forward(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
```

### index.jsp

```jsp
<%@page import="com.entity.Page"%>
<%@page import="java.util.List"%>
<%@page import="com.entity.Student"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript">
	$(document).ready(function () {
		$("tr:odd").css("background-color","#5BFAFA");
	});
</script>
<title>数据库表单</title>
</head>
<body>
<%
/*
	当前页：currentPage
	页面大小：pageSize
	当前页的数据集合：students
	总数居：totalCount
	总页数：totalPage
*/
%>

<%
	String error=(String)request.getAttribute("error");
if(error!=null){
	if(error.equals("error")){
		out.print("增加失败！");
	}else if(error.equals("success")){
		out.print("增加成功！");
	}
}
%>
	<table border="1px">
		<tr>
			<th>学号</th>
			<th>姓名</th>
			<th>年龄</th>
			<th>操作</th>
		</tr>
		<%
		Page p=(Page)request.getAttribute("p");
			for (Student student : p.getStudents()) {
		%>
		<tr>
			<td><a href="queryStudentBySnoServlet?sno=<%=student.getSno()%>"><%=student.getSno()%></a></td>
			<td><%=student.getSname()%></td>
			<td><%=student.getSage()%></td>
			<td><a href="deleteStudentServlet?sno=<%=student.getSno()%>">删除</a>
		</tr>
		<%
			}
		%>
	</table>
	</br>
	</br>
	<a href="add.jsp">新增</a><br/>
	<%
		if(p.getCurrentPage()==p.getTotalPage()){//尾页
	%>
			<a href="queryStudentByPage?currentPage=1">首页</a>
			<a href="queryStudentByPage?currentPage=<%=p.getCurrentPage()-1%>">上一页</a>
	<% 
		}

		else if(p.getCurrentPage()==1){ //首页
	%>
			<a href="queryStudentByPage?currentPage=<%=p.getCurrentPage()+1%>">下一下</a>
			<a href="queryStudentByPage?currentPage=<%=p.getTotalPage()%>">尾页</a>
	<% 
		}
		else{//中间
	%>
			<a href="queryStudentByPage?currentPage=1">首页</a>
			<a href="queryStudentByPage?currentPage=<%=p.getCurrentPage()-1%>">上一页</a>
			<a href="queryStudentByPage?currentPage=<%=p.getCurrentPage()+1%>">下一下</a>
			<a href="queryStudentByPage?currentPage=<%=p.getTotalPage()%>">尾页</a>
	<% 
		}
	%>
	<%=p.getCurrentPage()%>/<%=p.getTotalPage()%>页
</body>
</html>
```

