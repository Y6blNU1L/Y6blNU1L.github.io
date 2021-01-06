---
title: Kali解决中文乱码问题
date: 2020-01-05 22:23:18
tags: Kali
---
## Kali解决中文乱码问题

### 增加源

`root@kali:~#vim /etc/apt/sources.list`
加入以下源

```
#阿里云
deb http://mirrors.aliyun.com/kali kali-rolling main non-free contrib
deb-src http://mirrors.aliyun.com/kali kali-rolling main non-free contrib

#清华大学
deb http://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free
```

### 然后运行

`root@kali:~#apt-get update && apt-get upgrade && apt-get clean`

更新源并更新软件，一路y下去.

### 设置语言

`dpkg-reconfigure locales`

进入图形界面，选中`en_US.UTF-8 UTF-8`和`zh_CN.UTF-8 UTF-8`（空格是选择，tab是切换，*是选中）并将`en_US.UTF-8`选为默认。

### 安装中文字体

`root@kali:~#apt-get install xfonts-intl-chinese`

`root@kali:~#apt-get install ttf-wqy-microhei`

### 安装中文输入法

`root@kali:~#apt-get install fcitx fcitx-googlepinyin`
然后
`root@kali:~#im-config`
选择fcitx,一路OK即可。

### 重启

`root@kali:~#reboot`

重启之后，按`Ctrl+Space`切换中文输入法,按`shift`来回切换.