---
title: Centos7 yum安装tomcat
date: 2020-01-15 14:48:44
tags: Centos
---
# Centos7 yum安装tomcat

安装wget
`yum install -y wget`
进入root目录下
`cd ~`
选择yum安装tomcat需要的jdk-1.8，就不用再手动配置环境变量。
` yum -y install java-1.8*`
查看JDK版本
`java -version`
进入你想安装tomcat的目录下，我这选择在opt下面
`cd /opt/`
下载tomcat压缩包
`wget http://mirrors.shu.edu.cn/apache/tomcat/tomcat-8/v8.5.37/bin/apache-tomcat-8.5.37.tar.gz`
解压
`tar -zxvf apache-tomcat-8.5.37.tar.gz`
重命名改成tomcat
`mv apache-tomcat-8.5.37  tomcat`
启动tomcat
`cd ./tomcat/bin/`然后`./startup.sh`
关闭防火墙
`systemctl stop firewalld`    #关闭防火墙
`systemctl status firewalld`  #查看状态
`systemctl disable firewalld`   #开机自动关闭
查看tomcat默认端口8080是否开启
`netstat -ntlp`

然后在云服务器上面配置8080端口安全组

浏览器打开：`公网ip:8080`,即可访问
