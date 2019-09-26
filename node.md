

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



## 系统包

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
    1. 接受浏览器的请求
    2. 读文件 浏览器会解析文件
    fs.readFile(`www$(req.url)`,(err,buffer) => {
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
数据放在URL中 容量很小 顶多32k

POST 发送
容量更大

学习数据交互就是学习如何处理GET请求或POST请求
~~~



## 接受浏览器的GET数据

~~~javascript
serve_get.js
const http = require('http')
const url = require('url')
const queryString = require('queryString')
// 创建服务器
let server = http.createServer((req, res) => {
    // 使用url模块
    let [pathname, query] = url.parse(req.url, true)
    console.log(pathname, query)
    
    // 使用queryString模块
    let [url, query] = req.url.split('?')
    let get = queryString.parse(query)
    console.log(url, get)
})

// 监听--等待客户端的连接
server.listen(8080)
~~~

~~~html
<form action="http://localhost:8080/aaa" method="get">
    用户：<input type="text" name="username" /><br>
    密码：<input type="password" name="password" /><br>
    <input type="submit" value="提交">
</form>
~~~



