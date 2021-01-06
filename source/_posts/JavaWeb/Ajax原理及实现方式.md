---
title: 45.45Ajax原理及实现方式
date: 2019-12-15 10:28:18
tags: JavaWeb
---

## Ajax原理及实现方式

- 异步js

  - 异步刷新：只刷新修改的地方
  - js

  ```
  XMLHttpRequest对象
      
      XMLHttpRequest对象的方法：
      open( 方法名(提交方式get post),服务器地址,true) : 与服务端连接
      
      send():
      	get : send(null)
      	post :send(参数值)
      	
      setRequestHeader(header,value):
      	get: 不需要设置此方法
      	post: 需要设置：
      		1.如果请求元素包含了 文件上传：
      			setRequestHeader("Content-Type","multipart/form-data");
      		2.不包含文件上传
      			setRequestHeader("Content-Type","application/x-www-form-urlencoded")
      		
      XMLHttpRequest对象的属性
      
      readyState:请求状态
      status: 响应状态
      onreadystatechange: 回调函数
      responseText : 响应格式为String
      requestXML: 响应格式为XML
  ```

  ![QWP181.png](https://s2.ax1x.com/2019/12/14/QWP181.png)

   ![QWPUVe.png](https://s2.ax1x.com/2019/12/14/QWPUVe.png)

  ### MobileServlet.java

  ```java
  public class MobileServlet extends HttpServlet {
        	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        		request.setCharacterEncoding("utf-8");
        		response.setCharacterEncoding("utf-8");
        		response.setContentType("text/html; charset=UTF-8");
        		String mobile = request.getParameter("mobile");
        		PrintWriter out = response.getWriter();
        		if("1888888888".equals(mobile)) {
        			//servlet以输出流的方式将信息返回给客户端
        			out.write("true");
        		}else {
        			out.write("false");
        		}
        		out.close();
        	}
        
        	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        		doGet(request, response);
        	}
        
        }
  ```

  ### index.jsp

  ```jsp
  <%@ page language="java" contentType="text/html; charset=UTF-8"
              pageEncoding="UTF-8"%>
          <!DOCTYPE html>
          <html>
          <head>
          <meta charset="UTF-8">
          <script type="text/javascript">
          	function register(){
          		var mobile=document.getElementById("mobile").value;
          		//通过ajax异步方式请求服务端
          		xmlHttpRequest =new XMLHttpRequest();
          		
          		//设置xmlHttpRequest对象的回调函数
          		xmlHttpRequest.onreadystatechange = callBack;
          		
          		xmlHttpRequest.open("post","MobileServlet",true);
          		//设置post方式的头信息,get不需要
          		xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
          		xmlHttpRequest.send("mobile="+mobile);//K=V
          	}
          	
          	//定义回调函数(接收服务端的返回值)
          	function callBack(){
          		if(xmlHttpRequest.readyState ==4 && xmlHttpRequest.status ==200){
          			//接收服务端返回的数据
          			var data=xmlHttpRequest.responseText;//服务端返回值为String格式
          			console.log(data);
          			if(data== "true"){
          				alert("号码存在！");
          			}else{
          				alert("号码注册成功！");
          			}
          		}
          	}
          </script>
          <title>Insert title here</title>
          </head>
          <body>
          		手机：<input id="mobile"></br>
          		<input type="button" value="注册" onclick="register()">
          </body>
          </html>
  ```

- jquery

  ```
  $.ajax({
  	url:服务器地址,
  	请求方式:get / post,
  	data: 请求数据,
  	success:function(result,testStatus){
  	
  	},
  	error:function(xhr,errorMessage,e){
  	
  	}
  
  })
  ```

  ```
  $.get(
  	服务器地址,
  	请求数据,
  	function(result){
  	
  	},
      预期返回值类型（String\xml）
  );
  ```

  ```
  $.post(
  	服务器地址,
  	请求数据,
  	function(result){
  	
  	},	
  	预期返回值类型（String\xml）常见有xml\json\text
  );
  ```

  ```
  $(选择器).load(
  	服务器地址,
  	请求数据
  );
  //load：将服务端的返回值直接加载到$(xxx)所选中的元素中
  ```

  ```
  $.getJSON(
  	服务器地址,
  	JSON格式的请求数据.
  	function(result){
  	
  	},	
  );
  ```

  ### MobileServlet.java

  ```java
  public class MobileServlet extends HttpServlet {
  	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  		request.setCharacterEncoding("utf-8");
  		response.setCharacterEncoding("utf-8");
  		response.setContentType("text/html; charset=UTF-8");
  		String mobile = request.getParameter("mobile");
  		PrintWriter out = response.getWriter();
  		if("123".equals(mobile)) {
  			//servlet以输出流的方式将信息返回给客户端
  			out.write("true");
  			
  			//如果客户端是getJson(),则需要返回json数据
  			//out.write("{\"msg\":\"true\"}");
  		}else {
  			out.write("false");
  			
  			//如果客户端是getJson(),则需要返回json数据
  			//out.write("{\"msg\":\"false\"}");
  		}
  		out.close();
  	}
  
  	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  		doGet(request, response);
  	}
  
  }
  
  ```

  ### index2.jsp

  ```jsp
  <%@ page language="java" contentType="text/html; charset=UTF-8"
      pageEncoding="UTF-8"%>
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript">
  	function register(){
  		var $mobile =$("#mobile").val();
  		console.log("获取的手机号码为："+$mobile);
  		
  		$.ajax({
  			url:"MobileServlet",
  			请求方式:"post",
  			data: "mobile="+$mobile,
  			success:function(result,testStatus){
  				console.log(result);
  				if(result=="true"){
  					alert("号码存在！");
  				}else{
  					alert("号码注册成功！");
  				}
  			},
  			error:function(xhr,errorMessage,e){
  				alert("系统异常！");
  			}
  
  		})
  		
  		
  		
  		/*
  		$.post(
  				"MobileServlet",
  				"mobile="+$mobile,
  				function(result){
  					console.log(result);
  					if(result=="true"){
  						alert("号码存在！");
  					}else{
  						alert("号码注册成功！");
  					}
  				},	
  				"text"
  			);
  		*/
  		
  		/*
  		$.get(
  				"MobileServlet",
  				"mobile="+$mobile,
  				function(result){
  					console.log(result);
  					if(result=="true"){
  						alert("号码存在！");
  					}else{
  						alert("号码注册成功！");
  					}
  				},	
  				"text"
  			);
  		*/
  		
  		/*
  		$("#tip").load(
  				"MobileServlet",
  				"mobile="+$mobile
  		);
  		*/
  		
  		/*
  		//K-V
  		var student={"name":"zs","age":12};
  		//alert(stuent.name+"---"+student.age)
  		var students=[
  				{"name":"zs","age":12},
  				{"name":"ls","age":13},
  				{"name":"a","age":14},
  				{"name":"b","age":15},
  				{"name":"c","age":16},
  		];
  		alert(stuents[1].name+"---"+students[1].age);
  		*/
  		
  		/*
  		$.getJSON(
  				"MobileServlet",
  				//"mobile="+$mobile,
  				{"mobile":$mobile},
  				function(result){
  					console.log(result);
  					if(result.msg=="true"){
  						alert("号码存在！");
  					}else{
  						alert("号码注册成功！");
  					}
  				},		
  			);
  		*/
  	}
  	
  </script>
  <title>Insert title here</title>
  </head>
  <body>
  		手机：<input id="mobile"></br>
  		<input type="button" value="注册" onclick="register()">
  		<span id="tip"></span>
  </body>
  </html>
  ```

  ## Ajax处理JSON对象

  ### 准备jar包

  ![QWOcPf.png](https://s2.ax1x.com/2019/12/15/QWOcPf.png)

  ### Json.jsp

  ```jsp
  <%@ page language="java" contentType="text/html; charset=UTF-8"
      pageEncoding="UTF-8"%>
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Insert title here</title>
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript">
  function testJson(){
  	/*json只有一个对象
  	$.getJSON(
  			"jsonServlet",
  			{"name":"zs","age":21},
  			function(result){
  				console.log(result);
  				//js需要通过eval()函数将返回值转为一个js能够识别的json对象
  				var jsonStudent=eval(result.stu1);
  				alert(jsonStudent.name+"--"+jsonStudent.age);
  				
  			},		
  		);	
  	*/
  	
  	//返回多个对象时
  	$.getJSON(
  			"jsonServlet",
  			{"name":"aaa","age":88},
  			function(result){
  				//result: {"stu1":stu1,"stu2":stu2,"stu3":stu3}
  				console.log(result);
  				//js需要通过eval()函数将返回值转为一个js能够识别的json对象
  				var json=eval(result);
  				$.each(json,function(i,element){
  					alert(this.name+"---"+this.age);
  				})
  				//alert(jsonStudent.name+"--"+jsonStudent.age);
  				
  			},		
  		);	
  	
  }
  
  </script>
  </head>
  <body>
  		<input type="button" value="测试json" onclick="testJson()">
  </body>
  </html>
  ```

  ### Student.java

  ```java
  public class Student {
  	private String name;
  	private int age;
  	public String getName() {
  		return name;
  	}
  	public void setName(String name) {
  		this.name = name;
  	}
  	public int getAge() {
  		return age;
  	}
  	public void setAge(int age) {
  		this.age = age;
  	}
  }
  ```

  ### jsonServlet.java

  ```java
  public class jsonServlet extends HttpServlet {
  	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  			request.setCharacterEncoding("utf-8");
  			response.setCharacterEncoding("utf-8");
  			response.setContentType("text/html; charset=UTF-8");
  			PrintWriter out = response.getWriter();
  			//测试前端传来的数据
  			String name2=request.getParameter("name");
  			String  age2=request.getParameter("age");
  			System.out.println(name2+"---"+age2);
  			
  			
  			
  			Student stu1=new Student();
  			stu1.setAge(23);
  			stu1.setName("zs");
  			
  			Student stu2=new Student();
  			stu2.setAge(33);
  			stu2.setName("ls");
  			
  			Student stu3=new Student();
  			stu3.setAge(55);
  			stu3.setName("ww");
  			
  			JSONObject json=new JSONObject();
  			json.put("stu1", stu1);
  			json.put("stu2", stu2);
  			json.put("stu3", stu3);
  			//如果客户端是getJson(),则需要返回json数据
  			out.print(json);//返回json对象
  			out.close();
  	}
  
  	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
  		doGet(request, response);
  	}
  
  }
  ```

  

- xml

