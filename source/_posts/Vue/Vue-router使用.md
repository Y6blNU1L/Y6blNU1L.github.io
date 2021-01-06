---
title: Vue-router的使用
date: 2020-06-07 14:34:35
tag: Vue
---

# Vue-router的使用

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <script src="./vue-router.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>router使用</title>
    <style>
    /* vue样式 */
    .router-link-active{
        color:red;
        font-weight:100;
    }
    </style>
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
        <!-- <a href="#/login">登入</a>
        <a href="#/register">注册</a> -->

        <!-- 或者使用vue自带的标签,可以进行传参 -->
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>

        <!-- <router-view></router-view> -->
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <script>

        var login = {
            template: '<h1>登入组件</h1>',
            created(){
                // 生命周期 
            }
        }

        var register = {
            template: '<h1>注册组件</h1>',
        }

        var routerObj = new VueRouter({
            routes: [
                // 默认展示根路径显示的东西，但是不推荐
                // { path: '/', component: login },

                // 重定向
                { path: '/', redirect: '/login' },

                { path: '/login', component: login },
                { path: '/register', component: register }
            ],
            // 自定义样式类名，然后自己加样式
            // linkActiveClass:'myactive'
        })
        var vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {

            },
            router: routerObj
        })
    </script>
</body>

</html>


```

# 使用query方式进行参数传参

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <script src="./vue-router.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>router使用</title>
    <style>
    /* vue样式 */
    .router-link-active{
        color:red;
        font-weight:100;
    }
    </style>
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
        <!-- <a href="#/login">登入</a>
        <a href="#/register">注册</a> -->

        <!-- 或者使用vue自带的标签,可以进行传多个参 -->
        <router-link to="/login?id=10&name=zs">登录</router-link>
        <router-link to="/register">注册</router-link>

        <!-- <router-view></router-view> -->
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <script>

        var login = {
            template: '<h1>登入组件---{{this.$route.query.id}}--{{$route.query.name}}---</h1>',
            data(){
                return {
                    msg:'123',
                }
            },
            created(){
                // 生命周期 
                console.log(this.$route)
            }
        }

        var register = {
            template: '<h1>注册组件</h1>',
        }

        var routerObj = new VueRouter({
            routes: [
                // 默认展示根路径显示的东西，但是不推荐
                // { path: '/', component: login },

                // 重定向
                { path: '/', redirect: '/login' },

                { path: '/login', component: login },
                { path: '/register', component: register }
            ],
            // 自定义样式类名，然后自己加样式
            // linkActiveClass:'myactive'
        })
        var vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {

            },
            router: routerObj
        })
    </script>
</body>

</html>


```


# 使用params方式进行路由参数传参

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <script src="./vue-router.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>router使用</title>
    <style>
    /* vue样式 */
    .router-link-active{
        color:red;
        font-weight:100;
    }
    </style>
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
        <!-- <a href="#/login">登入</a>
        <a href="#/register">注册</a> -->

        <!-- 或者使用vue自带的标签,可以进行传多个参 -->
        <router-link to="/login/12/zs">登录</router-link>
        <router-link to="/register">注册</router-link>

        <!-- <router-view></router-view> -->
        <transition mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
    <script>

        var login = {
            template: '<h1>登入组件----{{this.route.params.id}}---</h1>',
            data(){
                return {
                    msg:'123',
                }
            },
            created(){
                // 生命周期 
                console.log(this.$route)
            }
        }

        var register = {
            template: '<h1>注册组件</h1>',
        }

        var routerObj = new VueRouter({
            routes: [
                // 默认展示根路径显示的东西，但是不推荐
                // { path: '/', component: login },

                // 重定向
                { path: '/', redirect: '/login' },
                // 占位符 类似于 /login?id=
                { path: '/login/:id/:name', component: login },
                { path: '/register', component: register }
            ],
            // 自定义样式类名，然后自己加样式
            // linkActiveClass:'myactive'
        })
        var vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {

            },
            router: routerObj
        })
    </script>
</body>

</html>


```
