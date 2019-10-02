

node.js简单、性能高   注意没有window对象、document对象(浏览器才有)

## 卸载低版本

1. 卸载Node本身、删除nodejs目录
2. 手动删除node_modules文件夹 公共cli
3. C盘用户---当前账户---删除node_modules文件夹 装的包

一般可以直接覆盖安装  brew remove node

## 运行程序



## 包的概念

~~~html
一、前台引入包<script></script>

二、后台引入包
1.安装    
npm i multer

2.引入	
const multer = require('multer')

3.用
~~~



## 系统模块

node.js写服务器 web服务器

~~~javascript
const http = require('http')

// 创建服务器
let server = http.createServer(() => {
    // 每次浏览器请求,就会收到一个回调
    console.log('请求来了')
})

// 监听--等待客户端的连接
server.listen(8080)

// 端口--一台服务器可以开很多个服务
// 1-65535 小于1024不让用
~~~



~~~javascript
补充
let re = /\d+/
let re = /http:\/\//

new RegExp('\\d+')
new RegExp('http:\/\/')
~~~



### http

~~~javascript
const http = require('http')

// 创建服务器
let server = http.createServer((req, res) => {
    // 把响应的内容发给客户端
    res.write('abc')
    // 结束请求
    res.end()
})

// 监听--等待客户端的连接
server.listen(8080)
~~~

### fs

~~~javascript
const fs = require('fs')

// 异步
fs.writeFile(path, data callback) 
fs.readFile(path, callback)

fs.writeFile('./a.txt','asdfgh',err=>{
	if(err){
    	 console.log('失败')
    }else {
        console.log('成功')
    }
})


fs.readFile('./a.txt',(err,data) => {
	if(err){
        console.log(err)
    }else {
		console.log(data.toString())
    }
})

~~~



## 一个简单的请求

~~~javascript
const http = require('http')
const fs = require('fs')

// 创建服务器
let server = http.createServer((req, res) => {
    console.log(req.url)
    // req.url => '/1.html'
    // => www/1.html  www是文件夹
    // 1.接受浏览器的请求
    // 2.读文件 浏览器会解析文件
    fs.readFile(`www${req.url}`, (err,buffer) => {
		if(err){
            // res.write('错了')
            res.writeHeader(404) // 用状态码 给机器看
            res.write('Not Found') // 给人看
            res.end()
        }else {
            res.writeHeader(200)
            res.write(buffer)
            res.end()
        }
    })
})

// 监听--等待客户端的连接
server.listen(8080)
~~~



## 服务器需满足

1. 可以响应请求
2. 进行数据交互
3. 往数据库存储数据

## HTTP

### 协议

~~~html
HTTP 1.0 RFC-1945
HTTP 1.1 RFC-2616 持久连接
HTTPS    RFC-2818 安全协议 非对称加密
HTTP 2.0 RFC-7XXX 加密 头部压缩 服务器端推送 管线操作 多路复用
~~~

### 报文

~~~
头 <=32k 信息
体 <=2G(根据版本) 数据
~~~

### 状态码

~~~html
浏览器和服务器之间用数字表示结果
1xx	信息(websockt)
2xx	成功
3xx	重定向
4xx	请求错误	404网址打错
5xx	服务器错误
~~~

### 请求方法

~~~html
GET 获取
数据在URL中 容量很小 顶多32k 一次发送

POST 发送
数据在body中 容量更大 很多次发送

学习数据交互就是学习如何处理GET请求或POST请求
~~~



## 接受浏览器的GET数据

前端`form-get.html`

~~~html
<form action="http://localhost:8080/aaa" method="get">
    用户：<input type="text" name="username" /><br>
    密码：<input type="password" name="password" /><br>
    <input type="submit" value="提交">
</form>
~~~

后端`serve_get.js`

~~~javascript
const http = require('http')
const url = require('url')
const queryString = require('queryString')
// 创建服务器
let server = http.createServer((req, res) => {
    // 1.使用url模块(推荐)
    let { pathname, query } = url.parse(req.url, true)
    console.log(pathname, query)
    
    // 2.使用queryString模块
    let [ url, query ] = req.url.split('?')
    let get = queryString.parse(query)
    console.log(url, get)
    // /aaa { username: 'xujing_xj@foxmail.com', password: '789' }
})

// 监听--等待客户端的连接
server.listen(8080)
~~~



## 接受POST数据

前端`form-post.html`

~~~html
<form action="http://localhost:8080/aaa" method="post">
    用户：<input type="text" name="username" /><br>
    密码：<input type="password" name="password" /><br>
    <input type="submit" value="提交">
</form>
~~~

后端`server_post.js`

~~~js
const http = require('http')
const querystring = require('querystring')

// 创建服务器
let server = http.createServer((req, res) => {
    // cnosole.log(req.method) // POST
    let arr = []
    req.on('data', buffer => {
        // console.log(buffer) // 二进制的
        arr.push(buffer)
    })
    req.on('end', () => {
        let buffer = Buffer.concat(arr)
        
        // 一般不要toString转成字符串
        let post = querystring.parse(buffer.toString())
        console.log(post)
    })
})

// 监听--等待客户端的连接
server.listen(8080)
~~~



合并`server_total.js`

~~~javascript
const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')

http.createServer((req, res) => {
    let path = '', get = {}, post = {}

    if (req.method === 'GET') {
        let { pathname, query } = url.parse(req.url, true)

        path = pathname
        get = query
        complete()

    } else if (req.method === 'POST') {
        path = req.url
        let arr = []

        req.on('data', buffer => {
            arr.push(buffer)
        })

        req.on('end', () => {
            let buffer = Buffer.concat(arr)

            post = querystring.parse(buffer.toString())
            complete()
        })
    }
    
    function complete() {
        // 前面数据接收完毕后，进行的操作放在complete
        console.log(path, get, post)
    }
}).listen(8080)
~~~



## 接口-API

前端的请求，服务器能处理

1.请求文件-结果

2.请求接口-操作

~~~javascript
注册接口
/reg?username=xxx&password=xxx
{ error: 0, msg: '为什么' }

登录接口
/login?username=xxx&password=xxx
{ error: 0, msg: '为什么' }
~~~



~~~javascript
http://localhost:8080/reg?username=blue&password=123
http://localhost:8080/login?username=blue&password=123
~~~



### 模拟注册登录

~~~javascript
const http = require('http')
const url = require('url')
const querystring = require('querystring')
const fs = require('fs')

// 模拟数据库存数据的json对象
let users = {}

http.createServer((req, res) => {
    let path = '', get = {}, post = {}
    if (req.method === 'GET') {
        let { pathname, query } = url.parse(req.url, true)

        path = pathname
        get = query
        complete()

    } else if (req.method === 'POST') {
        path = req.url
        let arr = []

        req.on('data', buffer => {
            arr.push(buffer)
        })

        req.on('end', () => {
            let buffer = Buffer.concat(arr)

            post = querystring.parse(buffer.toString())
            complete()
        })
    }


    function complete() {
        console.log(path)
        if (path === '/reg') {
            console.log('reg')
            let { username, password } = get
            Boolean
            console.log(Boolean(users[username]))
            if (users[username]) {
                res.write(JSON.stringify({ error: 1, msg: '用户名已存在' }))
                res.end()
            } else {
                users[username] = password
                res.write(JSON.stringify({ error: 0, msg: '' }))
                res.end()
            }

        } else if (path === '/login') {
            console.log('login')

            let { username, password } = get

            if (!users[username]) {
                res.write(JSON.stringify({ error: 1, msg: '找不到用户名' }))
                res.end()
            } else if (users[username] != password) {
                res.write(JSON.stringify({ error: 1, msg: '密码不正确' }))
                res.end()
            } else {
                res.write(JSON.stringify({ error: 0, msg: '' }))
                res.end()
            }
        } else {
            console.log('readfile')
            fs.readFile(`www${req.url}`, (err, buffer) => {
                if (err) {
                    // res.write('错了')
                    res.writeHeader(404) // 用状态码 给机器看
                    res.write('Not Found') // 给人看
                    res.end()
                } else {
                    res.writeHeader(200)
                    res.write(buffer)
                    res.end()
                }
            })
        }
    }

}).listen(8080)
~~~

前端

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    用户: <input type="text" id="user"><br>
    密码: <input type="password" id="pass"><br>
    <input type="button" value="注册" id="btn1">
    <input type="button" value="登录" id="btn2">
    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
    <script>
        $(function () {
            $('#btn1').click(() => {
                $.ajax({
                    url: '/reg',
                    data: {
                        username: $('#user').val(),
                        password: $('#pass').val()
                    },
                    dataType: 'json'
                }).then(json => {
                    console.log(json)

                    if (json.error) {
                        alert(json.msg)
                    } else {
                        alert('注册成功')

                    }
                }, err => {
                    alert('注册失败,请刷新重试')
                })
            })

            $('#btn2').click(() => {
                $.ajax({
                    url: '/login',
                    data: {
                        username: $('#user').val(),
                        password: $('#pass').val()
                    },
                    dataType: 'json'
                }).then(json => {
                    if (json.error) {
                        alert(json.msg)
                    } else {
                        alert('登录成功')
                    }
                }, err => {
                    alert('登录失败,请刷新重试')
                })
            })
        })
    </script>

</body>

</html>
~~~



