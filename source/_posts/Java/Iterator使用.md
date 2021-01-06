---
title: Iterator使用
date: 2019-09-12 15:42:34
tags: Iterator使用
---

### Iterator使用

> **迭代器（Iterator）**

迭代器是一种设计模式，它是一个对象，它可以遍历并选择序列中的对象，而开发人员不需要了解该序列的底层结构。迭代器通常被称为“轻量级”对象，因为创建它的代价小。

Java中的Iterator功能比较简单，并且只能单向移动：

#### 使用方法：

- 使用方法iterator()要求容器返回一个Iterator。第一次调用Iterator的next()方法时，它返回序列的第一个元素。注意：iterator()方法是java.lang.Iterable接口,被Collection继承。
- 使用`next()`获得序列中的下一个元素。
- 使用`hasNext()`检查序列中是否还有元素。
- 使用`remove()`将迭代器新返回的元素删除。

Iterator是Java迭代器最简单的实现，为List设计的ListIterator具有更多的功能，它可以从两个方向遍历List，也可以从List中插入和删除元素。

```java
list l = new ArrayList();
 l.add("aa");
 l.add("bb");
 l.add("cc");
 for (Iterator iter = l.iterator(); iter.hasNext();) {
     String str = (String)iter.next();
     System.out.println(str);
 }
 /*迭代器用于while循环
 Iterator iter = l.iterator();
 while(iter.hasNext()){
     String str = (String) iter.next();
     System.out.println(str);
 }
 */
```

#### **Iterator的接口定义：**

```java
public interface Iterator {  
　　boolean hasNext();  
　　Object next();  
　　void remove();  
} 
```



使用：Object next()：返回迭代器刚越过的元素的引用，返回值是Object，需要强制转换成自己需要的类型

`boolean hasNext()`：判断容器内是否还有可供访问的元素

`void remove()`：删除迭代器刚越过的元素

迭代使用方法：（迭代其实可以简单地理解为遍历，是一个标准化遍历各类容器里面的所有对象的方法类）

```java
for(Iterator it = c.iterator(); it.hasNext(); ) {  
　　Object o = it.next();  
　　 //do something  
} 
```

