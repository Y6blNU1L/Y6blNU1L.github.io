---
title: 安装python
date: 2020-04-14 15:15:20
tags: Centos
---

# 安装python3

## 一、查看位置
`whereis python`

显示如下：

python: /usr/bin/python2.7 /usr/bin/python /usr/lib/python2.7 /usr/lib64/python2.7 /etc/python /usr/include/python2.7 /usr/share/man/man1/python.1.gz

## 二、安装相关包
`yum install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gcc make`

## 三、安装扩展源
`yum -y install epel-release`
 
#安装pip
`yum install python-pip`

## 四、下载python的tar包
链接：https://pan.baidu.com/s/1MdmNlzJet2LiIphi-u-R6Q 
提取码：33it

将tar包放到`/usr/local/`目录下
依次执行以下命令
`tar -xf Python-3.7.0.tar`

#进入解压后的目录，依次执行下面命令进行手动编译
`mv Python-3.7.0 python3`

`cd python3`

`./configure prefix=/usr/local/python3`

`make && make install`


#如果出现can't decompress data; zlib not available这个错误，则需要安装相关库

#安装依赖zlib、zlib-devel
`yum install zlib zlib`
`yum install zlib zlib-devel`

如果最后没提示出错，就代表正确安装了，在/usr/local/目录下就会有python3目录

## 五、添加软链接
#将原来的链接备份
`mv /usr/bin/python /usr/bin/python.bak`
 
#添加python3的软链接
`ln -s /usr/local/python3/bin/python3 /usr/bin/python`
 
#测试是否安装成功了
`python3  -V`

## 六、更改yum配置

`vi /usr/bin/yum`

把#! /usr/bin/python修改为#! /usr/bin/python2
 
`vi /usr/libexec/urlgrabber-ext-down`

把#! /usr/bin/python 修改为#! /usr/bin/python2

这样就完成了。
