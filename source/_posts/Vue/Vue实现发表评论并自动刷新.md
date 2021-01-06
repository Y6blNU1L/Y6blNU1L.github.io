---
title: Vue实现发表评论并自动刷新
date: 2020-05-28 19:13:03
tags: Vue
---

# 实现发表评论并自动刷新

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="./vue.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <!-- <link rel="stylesheet" href="./animate.min.css"> -->
    <!-- Vue尽量不要使用jquery -->
    <title>列表评论</title>

<body>
    <div id="app">
        <cmt-box @func="load"></cmt-box>
        <ul class="list-group">
            <li class="list-group-item" v-for="item in list" :key="item.id">
                <span class="badge">评论:{{item.user}}</span>
                {{item.content}}
            </li>
        </ul>

    </div>
    <template id="temp">
        <div>
            <div class="form_group">
                <label>评论人: </label>
                <input type="text" class="form-control" v-model="user">
            </div>

            <div class="form_group">
                <label>评论内容: </label>
                <textarea class="form-control" v-model="content"></textarea>
            </div>

            <div class="form_group">
                <input type="button" value="发表评论" class="btn btn-primary" @click="postComment">
            </div>
        </div>
    </template>

    <script>
        var commentBox = {
            data() {
                return {
                    user: '',
                    content: ''
                }
            },
            template: '#temp',
            methods: {
                postComment() {
                    var comment = { id: Date.now(), user: this.user, content: this.content }
                    var list = JSON.parse(localStorage.getItem('cmts') || '[]')
                    list.unshift(comment)
                    localStorage.setItem('cmts', JSON.stringify(list))
                    this.user = this.content = ''
                    this.$emit('func')

                }
            }
        }

        var vm = new Vue({
            el: '#app',
            data: {
                list: [
                    { id: Date.now(), user: '李白', content: '哈喽' },
                    { id: Date.now(), user: '老王', content: '123' },
                    { id: Date.now(), user: '李四', content: '666' },
                ]
            },
            created() {
                this.load()
            },
            methods: {
                load() {
                    var list = JSON.parse(localStorage.getItem('cmts') || '[]')
                    this.list = list
                }
            },
            components: {
                'cmt-box': commentBox
            }
        });
    </script>
</body>

</html>

```
