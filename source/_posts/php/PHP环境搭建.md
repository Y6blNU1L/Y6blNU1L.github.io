---
title: PHP环境搭建
date: 2020-02-14 13:25:36
tags: PHP
---

# PHP环境搭建 - windows

准备Apache和php的压缩包：

链接：https://pan.baidu.com/s/1xCLkkOwi-A3R8OEyfTen3A 
提取码：whjj
## 安装Apache

1.修改 Apache24\conf\ 目录下的 httpd.conf 配置，记事本打开httpd.conf文件
2.找到“Define SRVROOT”这一项，将后面引号内的值改为Apache的安装目录
3.修改默认的索引，以支持 PHP ：
```
# DirectoryIndex: sets the file that Apache will serve if a directory
# is requested.
#
<IfModule dir_module>
    DirectoryIndex index.html index.php index.htm
</IfModule>
```
4.开启 rewrite 功能：将下面这行代码前面的 # 去掉
```
LoadModule rewrite_module modules/mod_rewrite.so
```
5.文件的末尾添加对PHP的支持及PHP的安装路径
```
# php7 support
LoadModule php7_module "D:/php-7.4.2/php7apache2_4.dll"
AddType application/x-httpd-php .php .html .htm

# configure the path to php.ini
<IfModule php5_module> 
    PHPIniDir "D:/php-7.4.2" 
    AddType application/x-httpd-php .php
    AddType application/x-httpd-php-source .phps
</IfModule>
```
## 安装PHP
1.打开PHP的安装目录将php.ini-development先复制一份，然后把php.ini-development改为php.ini保存 
2、打开php.ini修改配置，查找; extension_dir = “ext” ，改为extension_dir = “ext的目录” 比如
```
extension_dir ="D:\php-7.4.2\ext"
```
2.修改需要加载的扩展文件，下面代码是取消部分扩展程序的注释之后的代码：
```
extension=php_bz2.dll
extension=php_curl.dll
extension=php_fileinfo.dll
extension=php_gd2.dll
extension=php_gettext.dll
;extension=php_gmp.dll
;extension=php_intl.dll
;extension=php_imap.dll
;extension=php_interbase.dll
;extension=php_ldap.dll
extension=php_mbstring.dll
extension=php_exif.dll      ; Must be after mbstring as it depends on it
extension=php_mysql.dll
extension=php_mysqli.dll
;extension=php_oci8_12c.dll  ; Use with Oracle Database 12c Instant Client
extension=php_openssl.dll
;extension=php_pdo_firebird.dll
extension=php_pdo_mysql.dll
;extension=php_pdo_oci.dll
extension=php_pdo_odbc.dll
extension=php_pdo_pgsql.dll
extension=php_pdo_sqlite.dll
extension=php_pgsql.dll
;extension=php_shmop.dll
 
; The MIBS data available in the PHP distribution must be installed. 
; See http://www.php.net/manual/en/snmp.installation.php 
;extension=php_snmp.dll
 
extension=php_soap.dll
extension=php_sockets.dll
extension=php_sqlite3.dll
;extension=php_sybase_ct.dll
extension=php_tidy.dll
extension=php_xmlrpc.dll
extension=php_xsl.dll
```
3.设置默认的时区：
```
[Date]
; Defines the default timezone used by the date functions
; http://php.net/date.timezone 选择时区列表网址
date.timezone = Asia/Shanghai
```

## 启动Apache服务
1、设置环境变量 
右键我的电脑,属性->高级,找到最下面的环境变量按钮，选中当前用户的PATH变量,编辑新建以下条目: 
D:\Apache24\bin 
D:\php-7.4.2 
D:\php-7.4.2\ext 
2、安装apache服务 
以管理员身份打开命令行,执行`httpd.exe -k install `

出现`Apache2.4 service is successfully installed`字样说明服务启动成功。
3、启动服务 
找到apache的安装目录下的bin文件夹，双击ApacheMonitor.exe，双击之后apache就开启了。 
可以在任务栏选择下图图标，右键打开Apache Service Monitor窗口，点击start即可。
4、此时在浏览器地址栏输入localhost，回车后就会出现apache的界面。说明配置成功！
5、接下来在 Apache安装目录/htdocs的目录下新建一个phpinfo.php文件，内容为：
```php
<?php
phpinfo();
?>
```
保存后，在浏览器输入127.0.0.1/phpinfo.php，回车，出现关于PHP的版本信息.
6.至此php环境搭建完成，可以将php文件放入htdocs文件夹中运行了。
