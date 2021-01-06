---
title: v-for的使用
date: 2020-05-16 16:14:26
tag: Vue
---

# v-for的使用

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>v-for的使用</title>
</head>

<body>
    <div id="app">
        <!-- 遍历数组 -->
        <p v-for="item in list">{{item}}</p>

        <!-- 获取下标 -->
        <p v-for="(item,i) in list">索引值:{{i}}-----每一项:{{item}}</p>

        <!-- 数组内含有多个对象 -->
        <p v-for="user in list2">{{user.id}}----{{user.name}}</p>
        <p v-for="(user,i) in list2">{{user.id}}----{{user.name}}---索引:{{i}}</p>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [1, 2, 3, 4, 5, 6],
                list2: [{
                    id: 1,
                    name: 'zs'

                }, {
                    id: 2,
                    name: 'ls'

                }, {
                    id: 3,
                    name: 'ww'

                }]
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```

# v-for遍历循环对象

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>v-for的使用</title>
</head>

<body>
    <div id="app">
        <!-- 遍历对象身上的键值对 -->
        <p v-for="(val,key,i) in user">值:{{val}}----键:{{key}}---索引:{{i}}</p>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                user: {
                    id: 1,
                    name: '咔咔叮',
                    age: 18,
                    sex: '男'
                }
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```

# v-for 迭代数字

```html


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>v-for的使用</title>
</head>

<body>
    <div id="app">
        <!-- 迭代数字，并且从1开始 -->
        <p v-for="count in 10">这是第{{count}} 次循环 </p>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {

            },
        })
    </script>
</body>

</html>
```

# v-for 使用案例

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>v-for的使用</title>
</head>

<body>
    <div id="app">
        <div>
            <label>
                ID:<input type="text" v-model="id">
            </label>


            <label>
                Name:<input type="text" v-model="name">
            </label>
            <input type="button" value="添加" @click="add">
        </div>

        <!-- v-for循环的时候，key属性只能使用 number或string-->
        <p v-for="item in list" :key="item.id">
            <input type="checkbox" name="" id=""> {{item.id}}---{{item.name}}
        </p>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                id: '',
                name: '',
                list: [{
                    id: 1,
                    name: '李四'
                }, {
                    id: 2,
                    name: '老王'
                }, {
                    id: 3,
                    name: '张三'
                }, ]
            },
            methods: {
                add() {
                    // 往后追加
                    this.list.push({
                            id: this.id,
                            name: this.name
                        })
                        // 往前追加使用unshift
                        // this.list.unshift({
                        //     id: this.id,
                        //     name: this.name
                        // })
                }
            },
        })
    </script>
</body>

</html>


```
