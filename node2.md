## CMD

- 常用命令

```shell
# 列出当前目录下所有文件
dir

# 进入指定目录
cd 目录名

# 创建文件夹 hello
md hello

# 删除文件夹 hello
rd hello

# 直接进入某个盘
e:
```

- 环境变量（windows 系统的变量）

  CMD 中打开文件或程序，优先在当前目录下寻找，**找到了直接打开**，没找到会到**环境变量 path 中依次寻找**，直到找到为止。否则报错。**所以经常要访问的东西可以把它的文件路径添加到 path**。

  多个 path 英文分号分开

  

## 进程和线程

### 进程

- 负责程序运行提供必备的环境
- 相当于工厂中的车间

### 线程

- 计算机中最小的计算单位，负责执行进程中的程序
- 相当于工厂中的工人（任务管理器中看占用 CPU 大小）

### 单线程

一个人干活

### 多线程

多个人干活



## Node

为了实现高性能的 Web 服务器

- 在服务器端运行 JavaScript，跨平台的 JavaScript 运行环境
- V8 引擎，事件驱动，非租塞，异步 I/O 模型



传统的服务器是多线程的：每次都创建一个线程去处理新的请求

Node 服务器是单线程。后台有一个 I/O 线程池



## 模块化

- 一个 JS 文件就是一个模块

- 每一个 JS 文件的中的 JS 代码都是**独立运行在一个函数中**（不是全局作用域），所以一个模块中的变量和函数在其他模块中无法访问（触发 module 暴露出去）

> 可以在文件里直接打印 arguments，只有普通函数里面会有 arguments，还有 `arguments.callee`保存的是当前执行的函数 `console.log(arguments.callee + '')` 打印这个可以看到函数体



### 本质

node 执行模块中的代码时，代码的最上面添加

`function (exports, require, module, __filename, __dirname){`

代码的最下面添加`}`，也就是变成一个函数，在函数执行的时候传递了 5 个实参（`arguments.length == 5`）

`exports`: 对象，将变量或函数暴露到外部

`require`: 函数，用来引入外部的模块

`module`: 代表当前模块本身，exports 是 module 的属性（`module.exports === exports `）

`__filename`: 当前模块的完整路径

`__dirname`: 当前模块的所在文件夹的完整路径









引入：

`require()`函数引入外部模块，可以传文件的路径，如果用相对路径必须 . 或  .. 开头，该函数会返回一个对象，代表引入的模块。



导出：

`exports.x = '456465'`

`exports.fn = () => {} `

### 

### 核心模块

node 引擎提供

核心模块的标志就是模块的名字

### 文件模块

自己创建的模块

标志就是文件的路径（绝对路径 or 相对路径）



## 包 package

是一个压缩文件，解压后还原为目录，符合规范的目录应该包含如下文件（后面 3 个是文件夹， 不是必须的）：

`package.json` 描述文件

​     name version keywords(包可被搜索) maintainers bugs....

`bin` 可执行二进制文件

`lib` JS 代码

`doc` 文档

`test `单元测试





## NPM

Node package manager

npm 帮助 node 完成了第三方模块的发布、安装和依赖等。借助 npm, node 与第三方模块形成了生态系统 

```shell
# 看帮助
npm

# 看版本
npm -v

# 所有相关信息
npm version

# 搜索
npm search 包名

# 安装 根据 package.json 识别
npm install

# 创建 package.json
npm init

# 移除包
npm remove 包名

# 安装包并添加到依赖中
npm install --save 

# 全局安装，一些工具
npm install -g
```





## Buffer(缓冲区)

Buffer 的结构和数组类似，操作方法也类似

数组不能存储二进制的文件，buffer 专门用来存储二进制数据

元素为 16 进制的两位数（二进制太长了，显示的是 16 进制）

buffer 每个元素的范围都是 00-ff,  0-255

二进制的范围：00000000 - 11111111



计算机的一个 0 或 1，就是 1 位（bit）

8bit = 1byte(字节)

1024byte = 1kb

1024kb = 1mb

1024mb = 1GB 



### 转换

讲一个数据转成 buffer

```js
const str = 'fhqwhgads'

// 把 str 保存到 buf 中
const buf = Buffer.from(Buffer.from('fhqwhgads', 'utf8'))
console.log(buf.length) // 占用内存的大小
console.log(str.length) // 字符串长度
```



```js
const str = 'hello 哈哈'

// 把 str 保存到 buf 中
const buf = Buffer.from(str, 'utf8')
console.log(buf.length) // 12 = 6+6(一个汉字 3 个字节)
console.log(str.length) // 8
```

`buf.toString() `把缓冲区的 buffer 转成 字符串



### 创建

创建新的 buffer

```js
const buf = Buffer.alloc(5);
buf[0] = 88
buf[1] = 255
buf[2] = 256 // 只保存有效的 二进制
buf[5] = 77 // 无效
console.log(buf)

// 内存里分配了 5 个字节的空间，是直接对内存空间的操作，一旦创建就不会改变大小
// 只要数字在控制台或页面输出一定是十进制
// 或者借助 toString(16) 表示转成 16 进制的字符串
```





## 文件系统 fs

### 同步

手动操作的步骤

1. 打开文件

```js
fs.openSync(path, flags[, mode ])
 - path 要打开的文件路径
 - flags 打开文件要做的操作的类型: r 只读的 w 可写的
 - mode 设置	文件的操作权限 一般不传
 
 返回文件描述符，我们可以通过该描述符对文件进行各种操作
```

2. 向文件中写入内容

```js
fs.writeSync(fd, string[, position[, encoding]])
- fd 文件描述符
- string 要写入的内容
- position 写入的起始位置
- encoding 写入的编码，默认 utf-8
```

3. 保存并关闭文件（要记得关，默认不会自己关闭）

```js
fs.closeSync(fd)
```





### 异步

结果通过回调函数拿到

```js
fs.open('hello2.txt', 'w', (err, fd) => { // 错误优先，没有错误则为 null, fd 是文件描述符
  if(!err) {
     // 如果没有出错，则对文件进行写入操作
     fs.write(fd, '这是异步的内容', (err) => {
				if(!err) {
					console.log('写入成功')
        }
        fs.close(fd, err=> {
           if(!err) {
							console.log('文件关闭')
       		 }                                                                       
        })
     })           
  }
})
```





## 简单文件

```js
fs.writeFile(file, data[, options], callback)

- file 要操作文件的路径
- data 要写入的数据
- options 选项，可以对写入进行一些设置
```

默认会从头开始写  r+ 读写文件 a 是追加





## 流式文件

同步异步简单 API 不适合大文件写入，性能较差，容易导致内存溢出

持续的写流式文件

```js
fs.createWriteStream(path[, options])
- path 文件路径
- options 配置的参数

//1 createWriteStream 创建
const ws = fs.createWriteStream('hello.txt')
// 2 write 持续的写入
ws.write('12313')
ws.write('789')
ws.write('456')

// 3 关闭
ws.end()
```

通过监听 open close 事件 流的打开和关闭

```js
ws.once('open', () => {console.log('流打开了')})

ws.once('close', () => {console.log('流关闭了')})
```





## 读取文件

### 同步文件

### 异步文件

### 简单文件

```js
fs.readFile(path[, options], callback)
fs.readFileSync(path[, options])

- callback的参数
err 错误
data 是 buffer(用 data.toString() 转换)
```



例子

```js
fs.readFile('an.jpg', (err, data) => {
  if(!err) {
     fs.writeFile('hello.jpg', data, err => {
        if(!err) {
           console.log('文件写入成功')
        }
     })
  }
})
```



### 流文件

适用于大文件

```js
const rs = fs.createReadStream('an.jpg')
const ws = fs.createWriteStream('an2.jpg')

// 通过监听 data 事件
rs.on('data', data => {
  console.log(data.length)// 看看文件字节长度
	ws.write(data)
})

// 注意他们的关和开
```



```js
const rs = fs.createReadStream('an.jpg')
const ws = fs.createWriteStream('an2.jpg')
// 直接把可读流输出到可写流中
rs.pipe(ws)

```

## 文件其他操作

#### `fs.existsSync(path)`

#### `fs.stat(path[, options], callback)`