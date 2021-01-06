---
title: 10.10session共享问题
date: 2019-11-12 13:50:09
tags: JavaWeb
---

## session共享问题

### session机制：

- session是存储在服务端
- session是在同一用户（客户）请求时共享
- 实现机制：第一次客户请求时  产生一个sessionID 复制给cookie的jsessionid 然后发给客户端。

### session方法

- getID()：获取sessionID
- boolean  isNew() ：判断是否是新用户
- void invalidate() : 使session失效 （退出登入、注销）
- void setAttribute()   :获取用户名
- Object getAttribute()  ：获取值
- void  setMaxInactival(秒)  ：设置最大有效  非活动时间
- int getMaxInactival()   ：获取最大有效  非活动时间

![M1fyGT.jpg](https://s2.ax1x.com/2019/11/12/M1fyGT.jpg)