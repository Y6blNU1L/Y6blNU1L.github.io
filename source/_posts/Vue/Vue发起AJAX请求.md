---
title: Vue发起AJAX请求
date: 2020-05-19 15:54:09
tags: Vue
---

# Vue发起AJAX请求
api
```
+ get请求地址:http://www.alihba.fun:8899/api
+ post请术地址: http://vue.studyit.io/api/post
+ jsonp请求地址: http://vue.studyit.10/api/jsonp

```
# vue-resoursce

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>api</title>
    <script src="./vue.js"></script>
    <!-- 依赖于vue，注意先后顺序 -->
    <script src="./vue-resource.js"></script>
</head>

<body>
    <div id="app">
        <input type="button" value="get" @click="getInfo">
    </div>

    <script>
        var vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {
                getInfo() {
                    // get请求， .then设置的成功或返回的回调
                    this.$http.get('http://www.alihba.fun:8899/api').then(result => {
                        console.log(result)
                    }).catch(err => {
                        console.log(err)
                    });

                    //post请求， application/x-wwww-form-urlencoded
                    this.$http.post('http://vue.studyit.io/api/post', {}, {
                        emulateJSON: true
                    }).then(result => {
                        console.log(result)
                    }).catch(err => {
                        console.log(err)
                    });

                    //jsonp请求， application/x-wwww-form-urlencoded
                    this.$http.jsonp('http://vue.studyit.10/api/jsonp').then(result => {
                        console.log(result)
                    }).catch(err => {
                        console.log(err)
                    })

                }
            },
        })
    </script>
</body>

</html>
```

# 结合Node手写JSONP服务器

## 服务器Node代码
```js
var http = require('http');
var urlModell = require('url');

var server = http.createServer();
server.on('request', function(req, res) {
    console.log('收到客户端请求！');
    const { pathname: url, query } = urlModell.parse(req.url, true);
    if (url == '/getInfo') {
        // 返回前端一个json格式
        var data = {
            name: 'abc',
            age: 18,
            sex: '男',
        };
        var scriptStr = `${query.callback}(${JSON.stringify(data)})`;
        res.end(scriptStr);
    } else {
        // 设置编码防止乱码
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('404页面不存在');
    }
});
//启动服务器 node http.js
server.listen(3000, function() {
    console.log('服务器启动成功！');
});
//浏览器访问localhost:3000
```

## 客户端

```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>客户端</title>
</head>

<body>
    <script>
        function show(data) {
            // 打印后台返回的json
            console.log(data);
        }
    </script>
    <script src="http://127.0.0.1:3000/getInfo?callback=show"></script>
</body>

</html>
```

# axios

## 水果后台管理案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Access-Control-Allow-Origin" content="*" />
    <script src="./vue.js"></script>
    <link rel="stylesheet" href="./bootstrap.min.css">
    <script src="./vue-resource.js"></script>
    <script src="./axios.min.js"></script>
    <!-- Vue尽量不要使用jquery -->
    <title>水果数据后台案例</title>
</head>

<body>
    <div id="app">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">添加水果</h3>
            </div>
            <div class="panel-body">
                <div class="panel-body form-inline">
                    <label>
                        ID:
                        <input type="text" class="form-control" v-model="Id">
                    </label>
                    <label>
                        水果名字:
                        <input type="text" class="form-control" v-model="Name">
                    </label>
                    <label>
                        水果规格:
                        <input type="text" class="form-control" v-model="guige">
                    </label>
                    <label>
                        水果价格:
                        <input type="text" class="form-control" v-model="price">
                    </label>
                    <label>
                        水果数量:
                        <input type="text" class="form-control" v-model="number">
                    </label>
                    <label>
                        水果地址:
                        <input type="text" class="form-control" v-model="address">
                    </label>
                    <label>
                        水果网站:
                        <input type="text" class="form-control" v-model="web" @keyup.enter="add">
                    </label>
                    <input type="button" value="添加" class="btn btn-primary" @click="add">
                    <label>
                        搜索关键字:
                        <input type="text" class="form-control" v-model="keywords" id="search">
                    </label>
                </div>
            </div>
        </div>

        <table class="table table-bordered table-hover table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>水果名字</th>
                    <th>水果规格</th>
                    <th>水果价格</th>
                    <th>水果数量</th>
                    <th>水果地址</th>
                    <th>水果网站</th>
                    <th>时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <!-- 定义一个search方法，通过传参的形式来进行查找 -->
                <tr v-for="item in search(keywords)" ::key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.guige}}</td>
                    <td>{{item.price}}</td>
                    <td>{{item.number}}</td>
                    <td><img style="width: 50px;height:50px" :src="item.address">{{item.address}}</img>
                    </td>
                    <td>{{item.web}}</td>
                    <td>{{item.ctime | dateFormat}}</td>
                    <td><a href="#" @click.prevent="del(item.id)">删除</a></td>
                </tr>
            </tbody>
        </table>

    </div>
    <script>
        // 全局时间过滤器
        Vue.filter('dateFormat', function() {
            var now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            var day = now.getDay(); //得到周几
            var hour = now.getHours(); //得到小时
            var minu = now.getMinutes(); //得到分钟
            var sec = now.getSeconds(); //得到秒
            var MS = now.getMilliseconds(); //获取毫秒
            var week;
            month = month + 1;
            if (month < 10) month = '0' + month;
            if (date < 10) date = '0' + date;
            if (hour < 10) hour = '0' + hour;
            if (minu < 10) minu = '0' + minu;
            if (sec < 10) sec = '0' + sec;
            if (MS < 100) MS = '0' + MS;
            var arr_week = new Array(
                '星期日',
                '星期一',
                '星期二',
                '星期三',
                '星期四',
                '星期五',
                '星期六'
            );
            week = arr_week[day];
            var time = '';
            time =
                year +
                '年' +
                month +
                '月' +
                date +
                '日' +
                ' ' +
                hour +
                ':' +
                minu +
                ':' +
                sec +
                ' ' +
                week;
            return time;
        });
        var vm = new Vue({
            el: '#app',
            data: {
                Id: '',
                Name: '',
                guige: '',
                price: '',
                number: '',
                address: '',
                web: '',
                keywords: '',
                list: []
            },
            created() { //当vm实例初始化完毕后，会自动执行生命周期函数
                // 调用接口
                this.getApi()
            },
            methods: {
                getApi() {
                    axios({
                        method: 'get',
                        url: 'http://www.alihba.fun/project3/dataApi.php',
                    }).then(result => {
                        // console.log(result)
                        var product = result.data.product;
                        var count = product.length;
                        for (i = 0; i < count; i++) {
                            console.log(product[i])
                            proID = product[i]['proID']
                            proguige = product[i]['proguige']
                            proimage = product[i]['proimage']
                            promount = product[i]['promount']
                            proname = product[i]['proname']
                            proprice = product[i]['proprice']
                            proweb = product[i]['proweb']
                            this.list.push({
                                id: proID,
                                name: proname,
                                guige: proguige,
                                price: proprice,
                                number: promount,
                                address: proimage,
                                web: proweb,
                                ctime: new Date()
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        alert('获取数据失败！')
                    })
                },
                add() {
                    if (this.Id != '' && this.Name != '' && this.guige != '' && this.price != '' && this.number != '' && this.address != '') {
                        this.list.push({
                            id: this.Id,
                            name: this.Name,
                            guige: this.guige,
                            price: this.price,
                            number: this.number,
                            address: this.address,
                            web: this.web,
                            ctime: new Date()
                        })
                        this.Id = this.Name = '';
                        this.guige = this.price = '';
                        this.number = this.address = '';
                        this.web = '';
                    } else {
                        alert('添加的物品不能为空！')
                    }

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
                search(keywords) {
                    // 方法二
                    return this.list.filter(item => {
                        // es6语法
                        if (item.name.includes(keywords)) {
                            return item;
                        }
                    })

                }
            }
        })
    </script>
</body>

</html>
```
