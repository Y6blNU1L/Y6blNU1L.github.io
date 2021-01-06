---
title: php连接数据库
date: 2020-04-14 15:09:14
tags: PHP
---

```php
$conn=mysqli_connect("localhost","root","123456"); //域名、数据库账号和密码
    if (mysqli_connect_errno($conn))
    {
        echo "连接 MySQL 失败: " . mysqli_connect_error();
    }else{
        mysqli_query($conn,"set names 'utf8'");
        mysqli_select_db($conn,"login");//数据库名
        $sql="INSERT INTO register(username,password) VALUES ('$user','$pwd')"; //所要执行的sql语句
        $rs=mysqli_query($conn,$sql) or die('添加数据出错：'.mysqli_error());
        if (!$rs){ //失败
            
        }
        mysqli_close($conn); //关闭连接
    }
```
