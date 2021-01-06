---
title: Kali的22端口未开放解决方案
date: 2020-01-05 19:10:30
tags: Kali
---

## Kali的22端口未开放解决方案

`root@localhost:~# netstat -tlnp`
出现以下：
```
Active Internet connections (only servers)

Proto Recv-Q Send-Q Local Address          Foreign Address        State      PID/Program name
```
没有看见TCP端口22，所以，SSH服务没有运行。
## 解决方案
首先，编辑 sshd_config 文件，允许远程登入。
`nano /etc/ssh/sshd_config`

将 #PasswordAuthentication yes 修改为：`PasswordAuthentication yes`

将 #PermitRootLogin yes 修改为：`PermitRootLogin yes`,如果没有，自行添加。

按CTRL+X保存文件然后退出nano.

其次，运行如下命令将SSHD服务设置为开机自启动：

`update-rc.d ssh enable`
重启即可！
