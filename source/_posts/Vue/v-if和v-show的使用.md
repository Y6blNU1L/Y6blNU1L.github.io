---
title: v-if和v-show的使用
date: 2020-05-16 17:01:29
tag: Vue
---

# v-if和v-show的使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <title>v-if和v-show的使用</title>
</head>

<body>
    <div id="app">
        <!-- 方法一 -->
        <input type="button" value="toggle" @click="toggle">
        <!-- 方法二 -->
        <input type="button" value="toggle2" @click="flag=!flag">

        <!-- v-if 的特点，每次都会删除或创建元素 -->
        <p v-if="flag">v-if控制的元素</p>
        <!-- v-show 的特点，style="display:none"或者style="display:" ，不会进行DOM的增删操作-->
        <p v-show="flag">v-show控制的元素</p>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag: true
            },
            methods: {
                toggle() {
                    this.flag = !this.flag
                }
            },
        })
    </script>
</body>

</html>

```
