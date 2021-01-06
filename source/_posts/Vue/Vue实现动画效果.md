---
title: Vue实现动画
date: 2020-05-22 16:48:24
tags: Vue
---
# Vue自带动画效果

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>自带动画</title>
    <!-- 自定义样式 -->
    <style>
        /* 时间点，进入之前 */
        
        .v-enter,
        /* 时间点，是动画离开之后的终止状态 */
        
        .v-leave-to {
            opacity: 0;
            transform: translateX(80px);
        }
        /* 时间段，入场 */
        
        .v-enter-active,
        /* 时间段，离场 */
        
        .v-leave-active {
            transition: all 0.8s ease;
        }
    </style>
</head>

<body>
    <div id="app">
        <input type="button" value="toggle" @click="flag=!flag">
        <!-- 先使用vue提供的transition将要动画的标签包裹起来 -->
        <transition>
            <h3 v-if="flag">哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</h3>
        </transition>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag: false,
            },
            methods: {

            },
        });
    </script>
</body>

</html>
```
# Vue自定义类动画

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>自定义动画</title>
    <!-- 自定义样式 -->
    <style>
        
        /* 自定义一个 ，不使用v-实现*/
        /* 时间点，进入之前 */
        
        .my-enter,
        /* 时间点，是动画离开之后的终止状态 */
        
        .my-leave-to {
            opacity: 0;
            transform: translateX(80px);
        }
        /* 时间段，入场 */
        
        .my-enter-active,
        /* 时间段，离场 */
        
        .my-leave-active {
            transition: all 1s ease;
        }
    </style>
</head>

<body>
    <div id="app">
        <input type="button" value="toggle2" @click="flag2=!flag2">
        <!-- 先使用vue提供的transition将要动画的标签包裹起来 -->
        <transition name="my">
            <h3 v-if="flag2">哦哦哦哦哦</h3>
        </transition>

    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag2: false
            },
            methods: {

            },
        });
    </script>
</body>

</html>

```
# 使用animate.css第三方库实现动画效果

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <link rel="stylesheet" href="./animate.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>第三方库动画</title>
    <!-- 自定义样式 -->
    <style>
        /* 参考第三方实现动画  https://animate.style/ */
        /* 入场animate__rubberBand  离场 animate__swing */
    </style>
</head>

<body>
    <div id="app">
        <input type="button" value="toggle" @click="flag=!flag">
        <!-- 先使用vue提供的transition将要动画的标签包裹起来 -->
        <transition enter-active-class="animate__bounce" leave-active-class="animate__bounceOut">
            <h3 v-if="flag" class="animate__animated">哈哈,你好呀</h3>
        </transition>
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag: false,
            },
            methods: {

            },
        });
    </script>
</body>

</html>
```
# 使用transition-group实现组过动画

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <!-- <link rel="stylesheet" href="./bootstrap.min.css"> -->
    <link rel="stylesheet" href="./animate.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>transition-group动画</title>
    <!-- 自定义样式 -->
    <style>
        li {
            border: 1px dashed red;
            margin: 5px;
            line-height: 35px;
            padding-left: 5px;
            font-size: 16px;
            width: 100%;
        }
        
        li:hover {
            background-color: hotpink;
            transition: all 0.4s ease;
        }
        
        .v-enter,
        .v-leave-to {
            opacity: 0;
            transform: translateY(80px);
        }
        
        .v-enter-active,
        .v-leave-active {
            transition: all 0.6s ease;
        }
        
        .v-move {
            transition: all 0.8s ease;
        }
        
        .v-leave-active {
            position: absolute;
        }
    </style>
</head>

<body>
    <div id="app">
        <div>
            <label>
                Id:
                <input type="text" v-model="id">
            </label>
            <label>
                Name:
                <input type="text" v-model="name">
            </label>
            <input type="button" value="添加" @click="add">
        </div>

        <!-- 列表过度需要transition-group渲染，通过tag属性将transition-group变成ul标签 -->
        <transition-group appear tag="ul">
            <li v-for="item in list" :key="item.id" @click="del(item.id)">
                {{item.id}}---{{item.name}}
            </li>
        </transition-group>


    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                list: [{
                    id: 1,
                    name: '老汪'
                }, {
                    id: 2,
                    name: '小河'
                }, {
                    id: 3,
                    name: 'abc'
                }]
            },
            methods: {
                add() {
                    this.list.push({
                        id: this.id,
                        name: this.name
                    })
                    this.id = this.name = ''
                },
                del(id) {

                    // 方法二  使用findIndex方法
                    var index = this.list.findIndex(item => {
                            if (item.id == id) {
                                return true;
                            }
                        })
                        // 从下标开始查找，删除几个元素
                    this.list.splice(index, 1)

                },
            },
        });
    </script>
</body>

</html>
```
