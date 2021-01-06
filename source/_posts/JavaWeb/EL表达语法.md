---
title: 38.38EL表达语法
date: 2019-12-09 16:23:35
tags: JavaWeb
---

## EL表达语法

传统的在JSP中用java代码显示数据的弊端：  类型转换、处理null、代码掺杂

### 用法

#### 点操作符

> ${ 域对象. 域对象中的属性.属性.级联属性}

#### 中括号操作符

```
${ ["域对象"]["域对象中的属性"]["属性"]["级联属性"]}
```

#### EL关系运算符

![QwRL8I.png](https://s2.ax1x.com/2019/12/09/QwRL8I.png)

#### EL逻辑运算符

- Empty运算符： 判断一个值是否为null   --> ture

#### EL表达式的隐式对象

- 作用域访问对象

  - pageScope
  - requestScope
  - sessionScope
  - applicationScope

- 参数访问对象（获取表单数据）

  - request.getParameter()

    - ```
      ${param.name的值}
      ```

  - request.getParameterValues()

    - ```
      ${paramValues.name的值}
      ```

- JSP隐式对象

  - pageContext

    - ```
      ${pageContext.方法名去掉()和get,并且首字母小写}
      ```

