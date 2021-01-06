---
title: Python使用smtplib发邮箱
date: 2020-01-15 19:52:02
tags: Python
---
## Python使用smtplib发邮箱
首先引入`smtplib库`和`email库`,为pthon3内置库，若在linux中要`pip install email`

下面是以自己QQ邮箱发给自己QQ邮箱为例

```
import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr

# 第三方 SMTP服务，如smtp.163.com/smtp.qq.com
mail_host = 'smtp.qq.com'
# 配置服务的端口，默认的邮件端口是25，在linux中运行中端口要改为465或587为ssl的端口
mail_port = '25'
# 发件人邮箱账号
login_sender = 'XXXXXX@qq.com'
# 发件人邮箱授权码而不是邮箱密码，授权码由邮箱官网可设置生成
login_pass = 'xxxxxxxxx'
# 收件人邮箱账号，也可以发给多个人['','','']
receivers = 'xxxxxxx@qq.com'
title_subject = '此处写邮箱标题内容'

# 获取test.txt文本内容,也可以自己写内容,
with open('test.txt', 'r', encoding='UTF-8') as f:
    # 将txt文件的所有内容读入到字符串str中
    str = f.read()  
    f.close()
# 这里str存储的内容即为邮件正文内容
msg = MIMEText(str, 'plain', 'utf-8')
# 发件人邮箱昵称、发件人邮箱账号
msg['From'] = formataddr(["这里写发件人的称昵", login_sender])
# 收件人邮箱昵称、收件人邮箱账号
msg['To'] = formataddr(["这里写收件人的称昵", receivers])
# 邮件的标题
msg['Subject'] = title_subject

try:
    # 设置发件人邮箱中的SMTP服务器
    server = smtplib.SMTP(mail_host, mail_port)
    # 如果是ssl则写为(上面一行要注释,下面一行取消注释)
    # server = smtplib.SMTP_SSL(mail_host, mail_port)
    # 发件人邮箱账号、邮箱授权码
    server.login(login_sender, login_pass)
    # 发件人邮箱账号、收件人邮箱账号、发送邮件
    server.sendmail(login_sender, [receivers, ], msg.as_string())
    print("已发送到"+receivers+"的邮箱中！")
    server.quit()  # 关闭连接
except smtplib.SMTPException:
    print("发送邮箱失败！")

```
