---
title: 5.5JSP页面元素以及request对象
date: 2019-10-02 18:30:29
tags: JavaWeb
---

## JSP页面元素以及request对象

### JSP页面元素

#### a.脚本Scriptlet

- ```
  <%
  	//局部变量、java语句
  	String name="zhangshan";
  	out.print("hello..."+name);
  <%
  ```

- ```
  <%!
  	//全部变量、定义方法
  	public String bookName;
  	public void init(){
  		bookName="java书";
  	}
  <%
  ```

- ```
  <%=
  	输出表达式
  <%
  ```

  **修改web.xml、配置文件、java需要重启tomcat服务,但是如果修改JSP\HTML\CSS\JS 不需要重启，out.println()不能回车，要想回车,加“<br/>”**

#### b.指令

```
page指令
<% @page ....%>
page指定属性：
language：jsp页面使用的脚本语言
import：导入类
pageEncoding：jsp文件自身编码  jsp——>java
contentType:浏览器解析jsp的编码
<% @page language="java" contentType="text/html" charset=UTF-8 
	pageEncoding="UTF-8" import="java.util....." %>
```

#### c.注释

- html      <！---   ---->
- java        //    /**....**/
- jsp    <% ---  ---%>

### JSP九大内置对象

自带的，不需要new也能使用

- **out** ：输出对象，向客户端输出内容

- **pageContext**  ：JSP页面容器   

- **request**：请求对象；存储“客户端向服务端发送的请求信息”      

  request对象常见方法：

  > String getParameter (String name)  :根据请求的字段名key，返回字段值value

  > String [] getParameterValues ( String name ): 根据请求的字段名key，返回多个字段value

  > void setCharacterEncoding ("编码格式UTF-8" )

  > getRequestDispatcher("b.jsp").forward(request,response)     请求转发跳转页面   A-->B

  > getServerContext()  获取项目的ServletContext 对象

- **response **  ：响应对象

- **session**  ：会话对象   

- **application**    ：全局对象   

- **config**  ：配置对象（服务配置信息）

- **page**   ：当前JSP页面对象（相当于java中的this）

- **exception**   ：异常对象

> **四种范围对象（小--->大）**    尽量使用最小范围

- pageContext     当前页面有效（页面跳转后无效）
- request     同一次请求有效；其他请求无效（请求转发后有效；重定向后无效）
- session    同一次会话有效 （无论怎么跳转，都有效；关闭/切换浏览器后无效）
- application    全局有效;整个项目运行期间都有效（切换浏览器仍然有效）

以上四个共有的方法：

- Object getAttribute(String name) :根据属性名，或者属性值
- void setAttribute(String name ,Object obj)  :  设置属性值（新增，修改）
- void removeAttribute(String name) ：根据属性名，删除对象

---

