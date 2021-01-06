---
title: Vue使用钩子函数实现半场动画
date: 2020-05-22 16:52:49
tags: Vue
---

# 钩子函数实现半场动画

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
    <title>钩子函数</title>
    <!-- 自定义样式 -->
    <style>
        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
        }
    </style>
</head>

<body>
    <div id="app">
        <input type="button" value="动起来" @click="flag=!flag">
        <!-- 动画的入场生命周期 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-if="flag"></div>
        </transition>

    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag: false,
            },
            methods: {
                beforeEnter(el) {
                    // 动画入场之前，尚未开始
                    // 可以设置动画开始之前的起始样式
                    el.style.transform = "translate(0,0)"

                },
                enter(el, done) {
                    el.offsetWidth
                        // 结束的状态
                    el.style.transform = "translate(200px,200px)"
                    el.style.transition = "all 1s ease"
                        // done是afterEnter()函数的引用
                    done()
                },
                afterEnter(el) {
                    // 动画完成之后
                    el.style.opacity = 0;
                    this.flag = !this.flag
                }
            },
        });
    </script>
</body>

</html>
```
