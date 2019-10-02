

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



### 模拟注册登录

~~~javascript
http://localhost:8080/reg?username=blue&password=123
http://localhost:8080/login?username=blue&password=123
~~~

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



## 模块系统

1.定义模块

`CMD` 同步
`AMD`
`ESM`  可延迟加载、分布加载

~~~html
1.导出
module 批量导出
exports

2.导入
require
如果有路径，去路径下面找
如果没有，先找node_modules，再找系统node_modules
~~~

~~~javascript
exports.a = 12
exports.b = 5

// 导出json
module.exports = { a: 12, b: 5}
// 导出函数
module.exports = function () {
	console.log('aa')
}
// 导出类
module.exports = class {
    constructor(name) {
        this.name = name
    }
    show() {
        console.log(this.name)
    }
}

const mod1 = require('mod1')
mod1.a   mod1.b
~~~



## package.json

~~~shell
npm----包管理器
npm init
npm init -y 默认都是y


npm i yarn -g  (facebook react)
yarn add xxx


bower----前端包管理工具
npm i bower -g
bower i jquery
~~~



~~~javascript
{
  "name": "package",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "xujing",
  "license": "ISC",
   // 开发依赖 -D
  "devDependencies": {
    "koa": "^2.8.2" // 2.8.* 2.8中的最高版本  ^表示向上兼容 
  }
}

~~~

package-lock.json 错误信息

## 系统模块

### assert

断言: 符合要求就过 ，不符合要求就报错

~~~javascript
const assert = require('assert')
assert(条件,'消息')

函数内容步骤很多可以加断言确保中间是正确的
还有函数的参数
~~~

~~~javascript
// 深层比较 ==
assert.deepEqual(变量, 预期值, msg)
// ===
assert.deepStrictEqual(变量, 预期值, msg)
~~~



### path

路径相关 路径拼装

~~~javascript
const path = require('path')

let str = '/root/a/b/1.txt'

console.log(path.dirname(str)) // /root/a/b 提取路径
console.log(path.extname(str)) // .txt 提取后缀名
console.log(path.basename(str)) // 1.txt 提取文件名
console.log(path.resolve('/root/a/b', '../c', 'build', '..', 'strict'))  // E:\root\a\c\strict  路径整合
console.log(path.resolve(__dirname, 'build')) // 快速获取某个文件的绝对路径  E:\NOTE\node2\package\build
~~~



### url

~~~javascript
const url = require('url')

let str = 'https://www.bilibili.com/video/av60349461/?p=6'
console.log(url.parse(str))
打印:
Url {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.bilibili.com',
  port: null,
  hostname: 'www.bilibili.com',
  hash: null,
  search: '?p=6',
  query: 'p=6', // 如果key值相同,合并到数组
  pathname: '/video/av60349461/',
  path: '/video/av60349461/?p=6',
  href: 'https://www.bilibili.com/video/av60349461/?p=6' }
~~~



### querystring

请求数据格式

~~~javascript
const querystring = require('querystring')

console.log(querystring.parse('a=12&b=5&c=9'))
// [Object: null prototype] { a: '12', b: '5', c: '9' } 解析query字符串

console.log(querystring.stringify({ a: 12, b: 6 }))
// a=12&b=6 拼成query字符串
~~~



### net

网络通信模块

OSI七层参考模型 处于传输层

~~~javascript
数据通信
GET
POST
	普通数据 querystring
   	文件数据
~~~



## 处理POST文件（二进制数据）

前端

~~~html
<form action="http://localhost:8080/upload" method="POST" enctype="multipart/form-data">
    用户: <input type="text" name="username"><br>
    密码: <input type="password" name="password"><br>
    <input type="file" name="f1">
    <input type="submit" value="提交">
</form>
~~~

后端

~~~javascript
const http = require('http')

http.createServer((req,res)=>{
    let arr = []
    req.on('data',buffer=>{
        arr.push(buffer)
    })
    
    req.on('end',()=>{
        let buffer = Buffer.concat(arr)

        console.log(buffer.toString())
    })
}).listen(8080)
~~~





~~~javascript
------WebKitFormBoundaryLpr886V2oAr7H9Ou // 分隔符  +\r\n 可以从req.headers中得到
Content-Disposition: form-data; name="username"

blu
------WebKitFormBoundaryLpr886V2oAr7H9Ou
Content-Disposition: form-data; name="password"

456
------WebKitFormBoundaryLpr886V2oAr7H9Ou 
Content-Disposition: form-data; name="f1"; filename="aaa.txt" // 字段说明
Content-Type: text/plain

asdfghjk
------WebKitFormBoundaryLpr886V2oAr7H9Ou--
~~~



用分割符切分

~~~javascript
[
	null,
    "\r\n字段信息\r\n\r\n内容\r\n",
     "\r\n字段信息\r\n\r\n内容\r\n",
     "\r\n字段信息\r\n\r\n内容\r\n",
    "--"
]

去掉第0个和最后1个
[
    "\r\n字段信息\r\n\r\n内容\r\n",
     "\r\n字段信息\r\n\r\n内容\r\n",
     "\r\n字段信息\r\n\r\n内容\r\n",
]
    
每一项
"\r\n字段信息\r\n\r\n内容\r\n",
    
"字段信息\r\n\r\n内容"
 
"字段信息"  "内容"
    
注意：是在二进制下操作
~~~



### bufer操作

预备知识

~~~javascript
let buffer = new Buffer('abc\r\nsdjkfljklds\r\ndkfjakdjs')
let buffer2 = new Buffer('\r\n')
console.log(buffer.indexOf(buffer2)) // 3


let buffer = new Buffer('abc\r\nsdjkfljklds\r\ndkfjakdjs')
console.log(buffer.slice(0,3).toString()) // abc
~~~

进行分割

~~~javascript
let buffer = new Buffer('abc\r\nsdjkfljklds\r\ndkfjakdjs')

function bufferSplit(buffer, delimiter) {
    let arr = []
    let n = 0

    while ((n = buffer.indexOf(delimiter)) != -1) {
        arr.push(buffer.slice(0, n))
        buffer = buffer.slice(n + delimiter.length)
    }
    arr.push(buffer)

    return arr
}
console.log(bufferSplit(buffer,'\r\n').map(b=>b.toString())) // [ 'abc', 'sdjkfljklds', 'dkfjakdjs' ]
~~~



封装进buffer_util.js

~~~javascript
exports.bufferSplit = function (buffer, delimiter) {
    let arr = []
    let n = 0

    while ((n = buffer.indexOf(delimiter)) != -1) {
        arr.push(buffer.slice(0, n))
        buffer = buffer.slice(n + delimiter.length)
    }
    arr.push(buffer)

    return arr
}
~~~



