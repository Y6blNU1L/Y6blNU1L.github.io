---
title: Vue组件化和模块化
date: 2020-05-23 14:48:24
tags: Vue
---
# 创建全局组件

- 模块化: 代码逻辑角度划分
- 组件化: UI界面角度划分

## component
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
    <title>动画</title>

    <body>
        <div id="app">
            <!-- 组件名称引用,若驼峰用 - 连接 ，非驼峰直接引用-->
            <my-com1></my-com1>
            <mycom2></mycom2>
            <mycom3></mycom3>
            <mycom4></mycom4>
        </div>

        <template id="temp1">
        <div>
            <h1>外部定义，有代码提示</h1>
        </div>
    </template>

        <script>
            // 使用Vue.extend
            var con1 = Vue.extend({
                // 指定组件要展示的html结构
                template: '<h3>Vue.extend创建的组件</h3>'
            });

            // 使用Vue.component('组件的名称',创建出来的组件模板对象)
            Vue.component('myCom1', con1);

            // 第二种方法
            Vue.component('mycom2', Vue.extend({
                // 指定组件要展示的html结构
                template: '<h3>Vue.extend创建的第二个组件</h3>'
            }));

            // 第三种方法
            Vue.component('mycom3', {
                // 指定组件要展示的html结构,这里只能有一个父元素，不能两个或者两个以上同级元素
                template: '<h3>Vue.extend创建的第三个组件</h3>'
            });

            // 第四种方法
            Vue.component('mycom4', {
                // #temp在外面
                template: '#temp1'
            });

            var vm = new Vue({
                el: '#app',
                data: {

                },
                methods: {

                },
            });
        </script>
    </body>

</html>
```

# 使用components定义私有组件

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
    <title>动画</title>

    <body>
        <div id="app">
            <!-- 组件名称引用,若驼峰用 - 连接 ，非驼峰直接引用-->
            <mycom4></mycom4>
        </div>

        <template id="temp2">
        <div>
            <h1>私有组件，外部定义，有代码提示</h1>
        </div>
    </template>

        <script>
            var vm = new Vue({
                el: '#app',
                data: {

                },
                methods: {

                },
                components: {
                    mycom4: {
                        template: '#temp2'
                    }
                }
            });
        </script>
    </body>

</html>

```
# 组件中的data

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
    <title>组件模块化</title>

    <body>
        <div id="app">
            <!-- 组件名称引用,若驼峰用 - 连接 ，非驼峰直接引用-->
            <mycom4></mycom4>
        </div>
        <script>
            Vue.component('mycom4', {
                template: '<h3>引用自己data数据: ---->{{msg}}</h3>',
                // data是一个函数，返回的是一个对象
                data: function() {
                    return {
                        msg: '组件data自定义的数据'
                    }
                }
            })
            var vm = new Vue({
                el: '#app',
                data: {

                },
                methods: {

                },

            });
        </script>
    </body>

</html>
```

# 实例
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
    <title>组件模块化</title>

    <body>
        <div id="app">
            <!-- 组件名称引用,若驼峰用 - 连接 ，非驼峰直接引用-->
            <!-- 互不影响 -->
            <mycom4></mycom4>
            <mycom4></mycom4>
            <mycom4></mycom4>
            
        </div>

        <template id="temp">
            <div>
                <input type="button" value="+1" @click="add">
                <h3>{{count}}</h3>
            </div>
        </template>
        <script>
            Vue.component('mycom4', {
                template: '#temp',
                // data是一个函数，返回的是一个对象
                data: function() {
                    return {count: 0};
                },
                methods: {
                    add() {
                        this.count++
                    }
                }
            })
            var vm = new Vue({
                el: '#app',
                data: {

                },
                methods: {

                },

            });
        </script>
    </body>

</html>
```
