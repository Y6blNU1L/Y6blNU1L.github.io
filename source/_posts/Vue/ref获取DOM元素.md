---
title: ref获取DOM元素
date: 2020-06-07 13:53:42
tag: Vue
---

# ref获取DOM元素

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <!-- Vue尽量不要使用jquery -->
    <title>ref获取Dom</title>
</head>

<body>
    <div id="app">
        <input type="button" value="获取" @click="getElement">
        <h3 ref="haha">哈哈哈</h3>
        <login ref="mylogin"></login>
    </div>
    <script>

        var login = {
            template: '<h1>登入组件</h1>',
            data() {
                return { msg: 'son data msg' }
            },
            methods: {
                show() {
                    alert('子方法')
                }
            }
        }
        var vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {
                getElement() {
                    // 正常获取Dom
                    // console.log(this.$refs);
                    // console.log(this.$refs.haha.innerHTML);

                    // 获取子方法
                    console.log(this.$refs.mylogin.msg);
                    this.$refs.mylogin.show()
                }
            },
            components: {
                login
            }
        })
    </script>
</body>

</html>

```
