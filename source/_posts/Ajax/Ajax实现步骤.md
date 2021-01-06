---
title: 2.2Ajax实现步骤
date: 2019-11-13 12:04:51
tags: Ajax
---

## Ajax实现步骤

1.创建Ajax对象

```
var xhr=new XMLHttpRequest();
```

2.Ajax请求地址以及请求方式

```
xhr.open('get','地址');
```

3.发送请求

```
xhr.send();
```

4.获取服务器给客户端的响应数据

```
xhr.onload=function(){
	consloe.log(xhr.responseText);
}
```

5.开启node服务器

