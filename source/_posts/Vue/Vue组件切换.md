---
title: Vue组件切换
date: 2020-05-24 13:43:40
tags: Vue
---

# v-if 和 v-else

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>组件的切换</title>
</head>

<body>
    <div id="app">
        <a href="" @click.prevent="flag=true">登入</a>
        <a href="" @click.prevent="flag=false">注册</a>
        <login v-if="flag"></login>
        <register v-else="flag"></register>
    </div>
    <template id="temp1">
        <div>
            <h3>登入组件</h3>
        </div>
    </template>

    <template id="temp2">
        <div>
            <h3>注册组件</h3>
        </div>
    </template>
    <script>
        Vue.component('login', {
            template: '#temp1'
        });
        Vue.component('register', {
            template: '#temp2'
        });

        var vm = new Vue({
            el: '#app',
            data: {
                flag: true
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```
# 多个组件切换

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>组件的切换</title>
</head>

<body>
    <div id="app">
        <a href="" @click.prevent="comName='login'">登入</a>
        <a href="" @click.prevent="comName='register'">注册</a>
        <a href="" @click.prevent="comName='forget'">忘记</a>

        <!-- vue提供了component，来展示对应的名称组件 -->
        <!--component是一个占位符   :is="'属性'" -->
        <!-- <component :is="'login'"></component> -->
        <component :is="comName"></component>
    </div>
    <template id="temp1">
        <div>
            <h3>登入组件</h3>
        </div>
    </template>

    <template id="temp2">
        <div>
            <h3>注册组件</h3>
        </div>
    </template>

    <template id="temp3">
        <div>
            <h3>忘记组件</h3>
        </div>
    </template>
    <script>
        Vue.component('login', {
            template: '#temp1'
        });
        Vue.component('register', {
            template: '#temp2'
        });
        Vue.component('forget', {
            template: '#temp3'
        });

        var vm = new Vue({
            el: '#app',
            data: {
                comName: ''
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```
# 多组件切换加效果
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>组件的动画切换</title>
    <style>
        /* 时间点，进入之前 */
        
        .v-enter,
        /* 时间点，是动画离开之后的终止状态 */
        
        .v-leave-to {
            opacity: 0;
            transform: translateX(100px);
        }
        /* 时间段，入场 */
        
        .v-enter-active,
        /* 时间段，离场 */
        
        .v-leave-active {
            transition: all 1s ease;
        }
    </style>
</head>

<body>
    <div id="app">
        <a href="" @click.prevent="comName='login'">登入</a>
        <a href="" @click.prevent="comName='register'">注册</a>
        <a href="" @click.prevent="comName='forget'">忘记</a>

        <!-- vue提供了component，来展示对应的名称组件 -->
        <!--component是一个占位符   :is="'属性'" -->
        <!-- <component :is="'login'"></component> -->
        <!-- 通过 mode实现先离开后再进来的效果 -->
        <transition mode="out-in">
            <component :is="comName"></component>
        </transition>

    </div>
    <template id="temp1">
        <div>
            <h3>登入组件</h3>
        </div>
    </template>

    <template id="temp2">
        <div>
            <h3>注册组件</h3>
        </div>
    </template>

    <template id="temp3">
        <div>
            <h3>忘记组件</h3>
        </div>
    </template>
    <script>
        Vue.component('login', {
            template: '#temp1'
        });
        Vue.component('register', {
            template: '#temp2'
        });
        Vue.component('forget', {
            template: '#temp3'
        });

        var vm = new Vue({
            el: '#app',
            data: {
                comName: ''
            },
            methods: {

            },
        })
    </script>
</body>

</html>
```


# 组件父子传值

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
    <title>组件父子传值</title>

    <body>
        <div id="app">
            <!-- 组件名称引用,若驼峰用 - 连接 ，非驼峰直接引用-->
            <!-- 父组件在引用的时候可以使用属性绑定的形式传值 -->
            <son v-bind:parentmsg="msg"></son>
        </div>

        <script>
            var vm = new Vue({
                el: '#app',
                data: {
                    msg: '123(传值内容)'
                },
                methods: {

                },
                components: {
                    data() {
                        // 子组件自身私有的，可读可修改
                    },
                    // 结论: 子组件无法访问父组件的data上的数据
                    son: {

                        template: '<h3>这是子组件----{{parentmsg}}</h3>',
                        // 数组 从父组件传递过来的，只可读
                        props: ['parentmsg'],
                    }
                }

            });
        </script>
    </body>

</html>
```
# 组件父子传方法

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
    <title>组件传值-方法</title>

    <body>
        <div id="app">
            <com @func="show"></com>
        </div>

        <template id="temp1">
        <div>
            <h3>这是子组件</h3>
            <input type="button" value="子组件-点击触发" @click="sonshow">
        </div>
    </template>

        <script>
            // 私有或全局就都可以用
            Vue.component('com', {
                template: '#temp1',
                data() {
                    return {
                        sonmsg: {
                            name: '666',
                            age: 18
                        }
                    }
                },
                methods: {
                    sonshow() {
                        console.log('触发了子方法'),
                            // emit 触发
                            this.$emit('func')
                            // 传参情况下,第二个之后的参数都是传过去的参数(可多个)
                            // this.$emit('func', this.sonmsg)
                    }
                }
            });

            var vm = new Vue({
                el: '#app',
                data: {

                },
                methods: {
                    show(data) {
                        console.log('调用了父组件身上的方法');
                        // 传参的时候
                        // console.log('调用了父组件身上的方法---' + data);
                    }
                },
            });
        </script>
    </body>

</html>
```
