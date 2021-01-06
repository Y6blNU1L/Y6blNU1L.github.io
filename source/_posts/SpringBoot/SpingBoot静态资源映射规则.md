---
title: SpingBoot静态资源映射规则
date: 2020-04-15 20:19:01
tags: SpringBoot
---

# SpingBoot静态资源映射规则

- `/**  访问当前项目的任何资源`
  - `classpath:/META-INF/resources/`
  - `classpath:/resources/`
  - `classpath:/static/`
  - `classpath:/public/`
  - `/`   当前项目的根路径

- localhost:8080/  找index页面
- 所有的**/favicon.ico都是在静态资源文件下找

# 模板引擎
Springboot推荐使用Thymeleaf模板引擎

## 引入Thymeleaf
在pom.xml文件里面引入
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
```
只要奖html页面放到`classpath:/templates/`,thymeleaf就能自动渲染

- 使用

```java
    @RequestMapping("/success")
    public String success(Map<String,Object>map){
        map.put("Hello","你好");
        return "success";
    }
```

```html
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<!-- 然后就可以使用语法了 -->
<div th:text="${Hello}"></div>
```
- 语法规则
 - `th:text  改变当前元素的文本内容`
 - `th:id   可以替换原生属性的值`

详情参考官网 https://www.thymeleaf.org/index.html
