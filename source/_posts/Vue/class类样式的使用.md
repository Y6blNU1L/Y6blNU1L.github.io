---
title: 使用class类样式
date: 2020-05-16 15:34:55
tag: Vue
---

# 使用class类样式

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>样式的使用</title>
    <script src="./vue.js"></script>
    <style>
        .red {
            color: red;
        }
        
        .thin {
            font-weight: 200;
        }
        
        .italic {
            font-style: italic;
        }
        
        .active {
            letter-spacing: 0.5em;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 基本情况 -->
        <p class="red">哈哈哈哈哈哈11</p>

        <!-- 使用 v-bind，直接传递一个数组 -->
        <p :class="['red','active']">哈哈哈哈哈哈22</p>

        <!-- 使用 v-bind，直接传递一个数组 并使用三元表达式-->
        <p :class="['red',flag?'active':'']">哈哈哈哈哈哈33</p>

        <!-- 使用 v-bind，直接传递一个数组和数组增加对象 -->
        <p :class="['red',{'active':flag}]">哈哈哈哈哈哈33</p>


        <!-- 使用 v-bind，直接使用对象 -->
        <p :class="{'red':flag,'active':flag,'thin':flag}">哈哈哈哈哈哈44</p>

        <p :class="{red:flag,active:flag}">哈哈哈哈哈哈55</p>
        <p :class="{red:flag,active:false,thin:true}">哈哈哈哈哈哈66</p>

        <!-- 使用 v-bind，直接使用-->
        <p :class="classObj">classObj</p>

    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag: true, //使用三元表达式
                classObj: {
                    red: true,
                    active: false,
                    thin: true
                }
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```

# 绑定style行内样式

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>样式的使用</title>
    <script src="./vue.js"></script>
    <style>
        .red {
            color: red;
        }
        
        .thin {
            font-weight: 200;
        }
        
        .italic {
            font-style: italic;
        }
        
        .active {
            letter-spacing: 0.5em;
        }
    </style>
</head>

<body>
    <div id="app">
        <!-- 使用对象的形式 -->
        <h1 :style="{color:'red','font-weight':'100'}">哈哈哈1</h1>
        <!-- 直接引用 -->
        <h1 :style="styleObj">哈哈哈2</h1>

        <!-- 使用数组的形式引用 -->
        <h1 :style="[styleObj,styleObj2]">哈哈哈3</h1>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                styleObj: {
                    color: 'red',
                    'font-weight': '100'
                },
                styleObj2: {
                    'font-size': '20px'
                }
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```
