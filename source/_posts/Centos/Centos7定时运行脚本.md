---
title: Centos7 定时运行pyhon脚本
date: 2020-01-15 15:00:48
tags: Centos
---
## python定时任务

终端运行
`crontab -e`

加入要运行的py脚本：
```
* * * * *  /opt/python3/bin/python3   /opt/python3/project/bilibili100.py
```
`:wq`保存，退出即可。

注意如果程序有操作文件，比如读取或写入的时候，文件路径要用绝对路径！不然会保存在根目录下，即在root文件夹下面。

```
* * * * * 
*所代表的的含义
M: 分（0-59） 
H：时（0-23）
D：天（1-31）
m: 月（1-12）
d: 周（0-6） 0为星期日
```

centos下启动、重启、停止、查询状态的命令
`service crond start`
`service crond restart`
`service crond stop`
`service crond status`

centos下查询日志
`tailf /var/log/cron`

centos下设置crond【定时任务】为开机启动和开机不启动

`systemctl is-enabled crond.service`  --- 查看crond是否为开机自启动
`systemctl enable crond.service`  --- 将服务设置为开启启动
`systemctl disable crond.service`  --- 关闭服务开机自启动
