---
title: 40.40JSTL基础及set、out、remove
date: 2019-12-09 17:05:12
tags: JavaWeb
---

## JSTL基础及set、out、remove

### 准备jar包

- jstl-1.2.jar
- standard-1.1.2.jar

### 引入tablib

```
<%@ taglib uri="http://java.sun.com/jsp/jstl/core"  prefix="c"%>
```

### 核心标签库

- 通用标签库

  - ```
    <c:set  />赋值
    
    <%
    	request.setAttribute("name","zhangsan");
    %>
    等价于
    <c:set var="name"  value="zhangsan" scope="request"/>
    ```

  - ```
    给对象的属性赋值
    ${requestScope.student.sname}
    等价于
    <c:set target="${requestScope.student}" property="sname"  values="zs" />

    ```
    
  - ```
    <c:out  />显示
    
    <c:out value="${requestScope.student}"
    
    <c:out value='<a href="https://www,baidu.com">百度</a>' escapeXml="false" />
    ```

  - ```
    <c:remove />删除属性
    ```

  - 

- 条件标签库

  - ```
    <c:if test="${10>2}" var="result" scope="request">
    	真 ${requestScope.result}
    </c:if>
    在使用test="" 一定要注意后面是否有空格！
    ```

- 迭代标签库

  - ```
    <c:forEach begin="0" end="5"  step="1" varStatus="status">
    	${status.index} //获取下标
    	循环了五次
    </c:forEach>
    ```

  - ```
    <c:forEach var="name" items="${requestScope.names}" >
    	${name} //name从names里面循环赋值
    </c:forEach>
    ```