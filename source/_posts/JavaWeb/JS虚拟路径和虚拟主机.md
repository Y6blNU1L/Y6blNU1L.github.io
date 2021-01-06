---
title: 2.2虚拟路径和虚拟主机
date: 2019-09-17 20:58:10
tags: JavaWeb
---

## 虚拟路径和虚拟主机

### 虚拟路径 

1.将web项目配置到webapps以外的目录。

2.在apache\conf\server.xml中的Host标签中添加上Context的标签，

其中属性有：

> docBase:实际路径

> path：虚拟路径（绝对路径、相对路径,相对于webapps）

**注意需要重启！！**

第二种方式：

在apache\conf\Catalina\localhost\里面新建  “项目名.xml”  ,并且文件写入

> <Context docBase="" path=""  />



### 虚拟主机

通过www.test.com访问本机

a.    conf/server,xml     在Engine标签中添加Host标签,其中属性为：

> appBase=" 项目所在的位置"  

> name=“www.test.com”

> 在Host标签内在添加Context标签，属性有docBase=“”   path=“/”

> **更改Engine中默认引擎的defaultHost=“”中的值，改成www.test.com**

> 在C盘的windows\System32\drivers\etc\hosts\   中添加映射 127.0.0.1    www.test.com

**注意需要重启！！**

