---
title: 16.16JDBC调用存储过程和存储函数
date: 2019-11-16 16:02:20
tags: JavaWeb
---

## JDBC调用存储过程和存储函数

### CallableStatement : 调用存储过程、存储函数

connection.prepareCall( 参数：存储过程或者存储函数名)

参数格式：

存储过程（无返回值return，用out参数替代）：

​	{call   存储过程名(参数列表)}

存储函数  （有返回值return）：

​	{ ？  =  call   存储函数名(参数列表)}

### JDBC调用的存储过程步骤

- 产生调用存储过程的对象（CallableStatement） cstmt=connection.prepareCall("{call   存储过程名(参数列表) }")
- 通过setXxx()处理输出参数值
- 通过registerOutParameter(....)处理输出参数类型
- cstmt.execute() 执行
- 接收输出值用getXxx()

### JDBC调用的存储函数名步骤

- 产生调用存储函数名的对象（CallableStatement） cstmt=connection.prepareCall("{ ？  =  call   存储函数名(参数列表)}")
- 通过setXxx()处理输出参数值
- 通过registerOutParameter(....)处理输出参数类型
- cstmt.execute() 执行
- 接收输出值用getXxx()

