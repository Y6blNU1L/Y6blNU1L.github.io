---
title: Map实现之HashMap
date: 2019-09-12 10:36:07
tags: Map实现之HashMap
---

#### Map实现之HashMap

 java.util包中的集合类包含 Java 中某些最常用的类。最常用的集合类是 List 和 Map。List 的具体实现包括 ArrayList 和 Vector，它们是可变大小的列表，比较适合构建、存储和操作任何类型对象元素列表。List 适用于按数值索引访问元素的情形。

​        Map 则提供了一个更通用的元素存储方法。Map 集合类用于存储元素对（称作“键”和“值”），其中每个键映射到一个值。从概念上而言，您可以将 List 看作是具有数值键的 Map。而实际上，除了 List 和 Map 都在定义 java.util 中外，两者并没有直接的联系。

> HashMap是基于哈希表的 Map 接口的实现。此实现提供所有可选的映射操作，并允许使用 null 值和 null 键。HashMap结合了ArrayList与LinkedList两个实现的优点，，虽然HashMap并不会向List的两种实现那样在某项操作上性能较高，但是在基本操作（get 和 put）上具有稳定的性能。

#### **HashMap设置元素**

Map通过`put`方法来在Map实例中关联指定值与指定键。如果该实例已经包含了一个该键的映射关系，则旧值被替换。

```java
Map map = new HashMap();  
map.put("user1", "小明");  
map.put("user2", "小强");  
map.put("user3", "小红");  
System.out.println("user1:" + map.get("user1"));  
System.out.println("user2:" + map.get("user2"));  
System.out.println("user3:" + map.get("user3"));  
map.put("user2", "小龙");  
System.out.println("user1:" + map.get("user1"));  
//打印结果  
user1:小明  
user2:小强  
user3:小红  
user1:小明  
```

首先，创建了一个HashMap的实例map，此时map实例中的table数组会默认初始化，创建一个长度为`DEFAULT_INITIAL_CAPACITY=16`的空数组。

​        然后，调用put方法将一对键、值（key,value）保存。当已存在Map实例中已存在指定key的映射时，会将新指定的value覆盖原value。

​        与LIst的相关实现`add`方法一样，HashMap的`put`方法是设置元素的入口，在put的过程中会进行一系列的判断与操作，所以只有将put方法理解透彻后HashMap的内部结构与机制才会更加清晰。

> HashMap进行put操作时按以下步骤执行：

- 判断key是否为空，如果为空则调用设置null的专有方法。
- 计算key的hash值。
- 通过hash与table数组的长度计算出该元素所要放置的数组下标。
- 遍历该下标下的Entry元素链，如果找到与指定key相同的Entry则直接替换该Entry的value值并返回。
- 如果未找到则添加一个新元素至该下标下的元素链前端。

> 以下是put方法的源代码:

```java
/**
 * 设置指定值
 */
public V put(K key, V value) {
	//1.首先判断key是否为null
	if (key == null)
		//如果为null则调用putForNullKey方法
		return putForNullKey(value);
	//2.计算key的hash值
	int hash = hash(key.hashCode());
	//3.根据计算后的hash值与table数组长度计算该key应放置到table数组的那个下标位置
	int i = indexFor(hash, table.length);
	//4.遍历该下标下的所有Entry，如果key已存在则覆盖该key所在Entry的value值
	for (Entry<K, V> e = table[i]; e != null; e = e.next) {
		Object k;
		if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
			V oldValue = e.value;
			e.value = value;
			e.recordAccess(this);
			return oldValue;
		}
	}

	modCount++;
	//5.如果该key不存在则新添加Entry元素至数组指定位置，并且该Entry作为此下标元素链的头部
	addEntry(hash, key, value, i);
	return null;
}
```

#### **HashMap获取元素**

既然已经了解了HashMap的内部结构已经设置元素时的相关操作步骤，那么获取元素其实也就比较容易理解了，首先根据指定的key去计算数组下标，然后遍历该下标下的Entry链，最后返回。

> 以下是get方法的源代码:

```java
/**
 * 返回指定key的value
 */
public V get(Object key) {
	// 1.判断可以是否为null
	if (key == null)
		return getForNullKey();
	// 2.计算key的hash值
	int hash = hash(key.hashCode());
	// 3.遍历table指定下标下的Entry链
	for (Entry<K, V> e = table[indexFor(hash, table.length)]; e != null; e = e.next) {
		Object k;
		// 4.如果找到则返回该Entry的value
		if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
			return e.value;
	}
	// 5.未找到则返回null
	return null;
}
```

#### **HashMap移除元素**

>  HashMap实现了Map接口的`remove`方法，所以可以通过`remove`方法移除已经添加的元素：

```java
Map map = new HashMap();
map.put("user1", "小明");
map.put("user2", "小强");
map.put("user3", "小红");
map.remove("user2");
System.out.println("user1:" + map.get("user1"));
System.out.println("user2:" + map.get("user2"));
System.out.println("user3:" + map.get("user3"));
//打印结果：
user1:小明
user2:null
user3:小红
```

 当主动调用`remove`方法时，会根据指定的key删除该节点元素。

> 以下是remove方法的源代码：

```java
/**
 * 删除指定key下内容
 */
public V remove(Object key) {
	Entry<K, V> e = removeEntryForKey(key);
	return (e == null ? null : e.value);
}

/**
 * 根据指定key删除元素
 */
final Entry<K, V> removeEntryForKey(Object key) {
	int hash = (key == null) ? 0 : hash(key.hashCode());
	int i = indexFor(hash, table.length);
	Entry<K, V> prev = table[i];
	Entry<K, V> e = prev;

	while (e != null) {
		Entry<K, V> next = e.next;
		Object k;
		if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) {
			modCount++;
			size--;
			if (prev == e)
				table[i] = next;
			else
				prev.next = next;
			e.recordRemoval(this);
			return e;
		}
		prev = e;
		e = next;
	}

	return e;
}
```

#### **HashMap的遍历**

>  HashMap的遍历通常采用以下几种方式：

-   通过`entrySet()`方法可以获取HashMap实例所有Entry的Set返回，所以通过`entrySet`方法返回并迭代可以获取所有Entry元素：

  ```java
  Map map = new HashMap();
  map.put("user1", "小明");
  map.put("user2", "小强");
  map.put("user3", "小红");
  Iterator iter = map.entrySet().iterator();
  while (iter.hasNext()) {
  	Map.Entry entry = (Map.Entry) iter.next();
  	Object key = entry.getKey();
  	Object value = entry.getValue();
  	System.out.println("key:" + key + ";value:" + value);
  	// 然后移除元素
  	if (key.toString().equals("user1")) {
  		iter.remove();
  	} else if (key.toString().equals("user2")) {
  		entry.setValue("小海");
  	}
  
  }
  System.out.println(map.get("user1"));
  System.out.println(map.get("user2"));
  System.out.println(map.get("user3"));
  
  // 打印结果：
  key:user2;value:小强
  key:user1;value:小明
  key:user3;value:小红
  null
  小海
  小红
  ```

  

- Map还提供了`keySet`方法，用于返回所有key的Set形式，然后迭代此Set再通过get方法就可以获取相应元素的value：

  ```java
  Map map = new HashMap();
  map.put("user1", "小明");
  map.put("user2", "小强");
  map.put("user3", "小红");
  Iterator iter = map.keySet().iterator();
  while (iter.hasNext()) {
  	Object key = iter.next();
  	Object value = map.get(key);
  	System.out.println("key:" + key + ";value:" + value);
  	// 然后移除元素
  	if (key.toString().equals("user1")) {
  		iter.remove();
  	}
  }
  System.out.println(map.get("user1"));
  System.out.println(map.get("user2"));
  System.out.println(map.get("user3"));
  
  // 打印结果：
  key:user2;value:小强
  key:user1;value:小明
  key:user3;value:小红
  null
  小强
  小红
  ```

  

- 通过`values`方法直接返回所有value：

```java
Map map = new HashMap();
map.put("user1", "小明");
map.put("user2", "小强");
map.put("user3", "小红");
//转换成数组
String[] names= (String[]) map.values().toArray(new String[map.size()]);
for (String name : names){
	System.out.println(name);
}
//采用迭代
Collection nameArray =&nbsp; map.values();

Iterator iter = nameArray.iterator();

while (iter.hasNext()) {

&nbsp;String name=iter.next().toString();

&nbsp;System.out.println(name);

}
// 打印结果：
小强
小明
小红
```



​	