[TOC]



## 介绍

ECMAScript和JavaScript

ECMA是标准，JS是实现

- 类似HTML5是标准，IE10、Chrome都是实现
- ECMAScript 简称 ECMA 或 ES

ECMA2015就是ES6

最新版本ECMA2019

## 基础语法

重复声明、控制修改、块级作用域

~~~html
var  	可以重复声明，不能限制修改，函数级作用域
let		不能重复声明，变量，块级作用域，可以彻底取代var
const	不能重复声明，常量，块级作用域
~~~

闭包是没有块级作用域的解决方案

~~~html
用闭包解决
<script>
window.onload = function () {
    let oBtn = document.getElementsByTagName("input");

    for (var i = 0; i < oBtn.length; i++) {
        // oBtn[i].onclick = function () {
        //     alert(i); // 结果都是3
        // }
        (function (i) {
            oBtn[i].onclick = function () {
                alert(i); // 这是闭包，实现分别打印0、1、2
            // 闭包每运行一次，产生一个闭包对象 这样就有三个i
            }
        })(i);
    }
}
</script>
<input type="button" value="a">
<input type="button" value="b">
<input type="button" value="c">


用let解决
<script>
window.onload = function () {
    let oBtn = document.getElementsByTagName("input");
    for (let i = 0; i < oBtn.length; i++) {
        oBtn[i].onclick = function () {
            alert(i); // 结果都是3
        }
    }
}
</script>
~~~



~~~javascript
ES5的var是函数级作用域
ES6的let是块级作用域	{}为准
比如:
if(){
   
   }
for(){
    
}
    
{
    var a = 12;
    let b = 13;
}
alert(a);
alert(b); // b is not defined
~~~



### 解构赋值

~~~javascript
let a = 12;
let b = 5;

json = {a:12, b: 5};
let {a,b} = json; // 名称不能变

arr = [12, 5, 8];
let [a, b, c] = arr; // 名称可以变，因为数组有顺序

应用:
$.ajax("xxx")请求返回的是
{
    code:
    message:
    data:
}
let {code,data} = $.ajax("xxx"); // 可以直接拿出值
    
注意:
    两边结构要一样
    右边必须得是个东西
    let {a,b} = {12,5} // 错误 ，右边不是数组，也不是json
    赋值和结构同时完成，在预处理阶段就会完成
~~~



~~~javascript
举例
let {a,b} = {a: 12, b: 5, c: 88};
console.log(a,b);  // 打印12 5,注意c会报错undefined
~~~



### 箭头函数

箭头函数和this、参数扩展、数组展开（vue属性映射）

不能使用arguments、不能当做构造函数（不能new）、借助父亲的this

~~~javascript
箭头函数
function () {
    ...
}
()=>{}
~~~



~~~html
举例数组排序
<script>
let arr = [12, 8, 37, 26];
arr.sort();
alert(arr); // 12,26,37,8按字符串排 为啥 typeof arr[0]是"number"
</script>

<script>
let arr = [12, 8, 37, 26];
arr.sort(function(n1, n2) {
    return n1 - n2; // 负数按原来顺序，整数颠倒顺序
});
alert(arr); // 8,12,26,37 从小到大排序
</script>

用箭头函数
<script>
let arr = [12, 8, 37, 26];
arr.sort((n1, n2) => {
    return n1 - n2;
});
alert(arr); // 8,12,26,37 从小到大排序
</script>
~~~



~~~javascript
简写
1.如果有且只有一个参数，()可以不写
function add(n) {
    return n + 5;
}
function show(n, fn) {
    alert(fn(n));
}
show(12, add); //17
show(12, n => n + 5); // 17

2.如果有且只有一个语句并且是return, {}可以不写
arr.sort((n1, n2) => n1 - n2);

~~~

### 修正this

~~~html
修正this
对比下面例子
<script>
let jsons = {
    a: 12,
    fn: function () {
        alert(this.a);
    }
}
jsons.fn(); // 打印12
    
let oDate = new Date();
oDate.fn = jsons.fn;

oDate.fn(); // this 指向oDate 弹出undefined
    
    
let jsons = {
    a: 12,
    fn: () => {
        alert(this.a); // this被固定在当前环境 这里指向window
    }
}
jsons.fn(); // 弹出undefined
</script>
~~~



~~~javascript
class Json {
    constructor() { // jsons的构造函数
        this.a = 12;
        this.fn = function() {
            alert(this.a);
        }
    }
}
let json = new Json();
json.fn();  // 弹出12


class Json {
    constructor() { // jsons的构造函数
        console.log(this);  // 打印json对象
        this.a = 12;
        this.fn = () => {
            alert(this.a);
        }
    }
}

let json = new Json();
// json.fn(); // 弹出12
let oDate = new Date();
oDate.fn = json.fn;

oDate.fn(); // 弹出12
~~~



### 关于this chanke

~~~javascript
关于this chanke
var id = 1;
var obj = {id: 2}
function fn() {
    setTimeout(function() {
        console.log(this.id);
    }, 100);
    setTimeout(()=> {
        console.log(this.id);
    }, 100)
    
}
fn.call(obj);  // 打印1 因为setTimeout定时器 100ms后执行fn,这时候运行环境是window
// 用箭头函数 打印的是2 因为fn执行的时候就把this指向固定在obj  一般异步的操作会使用箭头函数
~~~



### 参数展开

~~~javascript
展开参数
收集参数
function show(a,b, ...c) { // 必须是这个格式
	console.log(a,b,c);
}
show(1,2,3,4,56);// c收集剩余的参数并放在数组中 a b 是命名参数, c是剩余参数
~~~



### 数组展开

~~~javascript
let arr1 = [12,5,8];
function show(a,b,c) {
    alert(a+b+c);
}

// show(arr1);// 12,5,8undefinedundefined
show(...arr1); // 25 相当于show(12,5,8)


// 连接数组
let arr1 = [12,5,8];
let arr2 =[4,5,6];
console.log(arr1.concat(arr2)); // [12,5,8,4,5,6]
alert(arr1 + arr2); // 12,5,84,5,6

let arr = [...arr1, ...arr2];
alert(arr);// 弹出12,5,8,4,5,6，是数组
~~~



### json展开

~~~javascript
一样的 ，把外边的{} []去掉，展开内容
~~~





## JSON对象

~~~javascript
JSON.stringify({a: 12,b:5})   转成字符串
JSON.parse() // 解序列化 转成json 注意要是标准写法 双引号

key和value必须要有双引号，不过js中可以简写
双引号在有的语言中表示字符
~~~



## Babel.js编译

语法检查、可单独可组合（webpack）

官网https://babeljs.io/

方法一：引入JS文件（不推荐）

~~~html
1.引入brower
2.<script type="text/babel"></script>

<!-- Load Babel -->
<!-- v6 <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script> -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel">
let a = 2;
let b = 3;
alert(a+b);
</script>
~~~

方法二： 编译js文件

~~~javascript
1.安装node.js,初始化项目 package.json
npm init -y
官网下载nodejs安装的时候选择了add path 安装在了D盘

2.安装babel-cli
npm i @babel/core @babel/cli @babel/preset-env -D //分别安装核心库、命令行使用、环境预设
npm i @babel/polyfill -S  // 兼容特别底版本的浏览器会用到
这里很慢的话用cpnm
先安装下npm install cnpm -g --registry=https://registry.npm.taobao.org
然后用cnpm命令

安装完成后，会生成node_modules文件夹

3.添加执行脚本 package.json 放在node_modules同级的目录下
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "babel src -d dest"  // 编译后的文件放在生成的dest文件夹下 编译前的js文件放在src文件夹下
  },

4.创建.babelrc配置文件，放在package.json同级的目录下
{
    "presets": ["@babel/preset-env"] // 表示按照环境预设的要求编译
}
windows创建以‘.’开头的文件提示必须键入名称
方法一: 
新建txt文件，修改文件名称的过程中’.name.’ 
窍门就是在最后面在加一个’.’

方法二： 
或者通过命令行，记得切换到该目录下 
echo 123 >.name
这个方式也会生成.name文件同时写入了’123’

5.执行编译
npm run build

// 注意目录位置 src待编译的js,dest生成编译好的js, package.json、.babelrc、node_modules与src、dest同级
~~~



## 异步操作

常见于ajax

异步操作：同时进行多个操作，用户体验好，但是代码混乱，回调回调回调

同步操作：一次只能进行一个操作，用户体验不好

~~~javascript
举例:
异步--麻烦
ajax(url, function (data) {
    ajax(url, function () {
        ...
    },function () {
        error
    })
}, function() {
        error
})
同步--简单
let data1 = ajax(url);
let data2 = ajax(url);
~~~

融合异步同步？



### Promise 

**Promise** 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值。

#### Promise.then

~~~javascript
Promise  封装异步操作
let p = new Promise(function (resolve, reject) {
    // resolve 解决
    // reject 拒绝
    $.ajax({
        url: "./1.txt",
        datatype: "json", // 请求的数据是数组,预期服务器返回的数据类型
        success(arr) {
            resolve(arr);
        },
        error(res) {
            reject(res);
        }
    });
});

p.then(function (arr) {
    alert("成功")
    console.log(arr);
}, function(res) {
    alert("失败"); // ajax需要服务器环境
    console.log(res);
});


Promise.all([
    p1, // 放promise对象
    p2
])
~~~



#### $.ajax()的秘密

~~~javascript
$.ajax()本身就是promise,所以可以直接用then();

$.ajax({
    url: "./1.txt",
    datatype: "json", // 预期服务器返回的数据类型是json
}).then(arr => {
    console.log(arr);
}, res => {
    console.log(res);
});
~~~



#### Promise.all

promise 自身就是一个封装，可以对各种异步操作作统一处理  需要都成功才成功

~~~javascript
// 同时请求三个接口
Promise.all([
    $.ajax({url: "./1.txt", dataType: "json"}),
    $.ajax({url: "./2.txt", dataType: "json"}),
    $.ajax({url: "./3.txt", dataType: "json"}),
]).then(arr=>{ // 成功返回的是数组
    console.log(arr);
    let [data1, data2, data3] = arr; // 利用解构赋值快速获取要返回的结果
    console.log(data2);
},res=>{ // 只要请求的有一个失败就全部失败
    alert("失败")
});


// 或者直接下面这样写
Promise.all([
    $.ajax({url: "./1.txt", dataType: "json"}),
    $.ajax({url: "./2.txt", dataType: "json"}),
    $.ajax({url: "./3.txt", dataType: "json"}),
]).then(([data1, data2, data3])=>{ // 成功返回的是数组
    console.log(data2);
},res=>{ // 只要请求的有一个失败就全部失败
    alert("失败")
});
~~~



#### Promise.race

竞速

可能用法： cdn读取，哪个快用哪个 

都失败才走失败的回调，只要有一个成功就用哪个

~~~javascript
举例
// 比如不同用户请求不同的广告接口
if (user_data.vip) { // vip用户，vip广告
    let user_data = $.ajax({ url: "./1.txt", dataType: "json" });
    let user_data2 = $.ajax({ url: "./2.txt", dataType: "json" });
}else { // 普通用户，普通广告
    let user_data3 = $.ajax({ url: "./3.txt", dataType: "json" });
}

// 请求如下
ajax("httpxxxx/api/user").then(user_data=>{
    if(user_data.vip){
        ajax("httpxxx/api/vip_item").then(...);
    }
}, res=>{
    alert("xxx");
})
~~~



### async/await

generator/yield 已经被废弃 生成器和暂停

async/await 函数的特殊形式

~~~javascript
async function show() { // 声明函数中包含异步操作
    xxx;
    xxx;
    let data = await $.ajax(); // 声明该操作要等待 并收集数据
}

普通函数	一直执行到结束 碰到return
async函数		能够暂停
await 后面是一个Promise对象或者任何要等待的值
~~~



~~~javascript
async function show() {
    let a = 12;
    let b = 5;

    let data = await $.ajax({
        url: './1.txt',
        dataType: 'json'
    });
    alert(a + b + data[0]);
}

show(); // 弹出18

1.txt的内容 [1,2,3]
~~~



上面的原理可以看成：

~~~javascript
async function show() {
    let a = 12;
    let b = 5;

    let data = await $.ajax({
        url: './1.txt',
        dataType: 'json'
    }).then(function() {
        show2();
    })
    function show2() {
        alert(a + b + data[0]);
    }
}
~~~

因为本身没有错误处理，利用try  catch 处理错误

~~~javascript
async function show() {
    let a = 12;
    let b = 5;

    try {
        let data = await $.ajax({
            url: './1.txt',
            dataType: 'json'
        });
        alert(a + b + data[0]);
    } catch (e) {
        alert("失败");
    }
}
show();
~~~



### 总结

~~~javascript
function doCall() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            if (Math.random() > 0.5) {
                resolve("child");
            } else {
                reject();
            }
        }, 3000);
    });
};
let result = doCall();
// 通过回调知道成功还是失败
result.then(function () {
    console.log(":)");
}, function (err) {
    console.log(":(");
});

// async function waitResult() {
//     // await后面是一个Promise对象或者任何要等待的值
//     let result = await doCall();
//     console.log(result);
// };
// waitResult();
~~~





## ES6面向对象

机器语言 >> 汇编语言 >> 低级语言（面向函数，面向过程）>> 高级语言（面向对象) >> 模块系统 >> 框架 >> 系统接口（API）

### ES5

~~~javascript
// 以函数的形式写对象
function Person(name, age) { // 既是类又是构造函数
    // 添加属性
    this.name = name;
    this.age = age;

    // 也可以这样添加方法
    // this.showName = function() {
    //     alert(this.name);
    // };
    // this.showAge = function() {
    //     alert(this.age);
	// }
}
// 添加方法
Person.prototype.showName = function() {
    alert(this.name);
}
Person.prototype.showAge = function() {
    alert(this.age);
}
let p = new Person("blue", 18);
p.showName();
p.showAge();
~~~



继承

~~~javascript
function Person(name, age) { // 既是类又是构造函数
    // 添加属性
    this.name = name;
    this.age = age;
}
// 添加方法
Person.prototype.showName = function() {
    alert(this.name);
}
Person.prototype.showAge = function() {
    alert(this.age);
}

function Worker(name, age, job) {
    Person.call(this, name, age); // 完成父类属性的继承
    this.job = job;
}
Worker.prototype = new Person(); // 继承父类的方法
Worker.prototype.constructor = Worker; // 纠正子类实例化后的构造函数
Worker.prototype.showJob = function () {
    alert(this.job);
};

let w = new Worker("blue", 18 , "suibian");
w.showName();
w.showAge();
w.showJob();

/*
1.constructor指向问题
2.属性共享问题
3.参数
*/
~~~





### ES6

~~~javascript
class Person{ // 这是类  语法糖: 通过原本的一些语法包装一下换种方便的写法
    constructor(name,age) { // 这是构造函数
        this.name = name;
        this.age = age;
    } // 注意没有逗号
    // 添加方法,减少属性的复用,这里方法自动定义在原型上
    showName () {
        alert(this.name);
    }
    showAge () {
        alert(this.age);
    }
}
let p = new Person("blue", 18);
p.showName();
p.showAge();
~~~

统一了写法

继承（面向对象精髓）

~~~javascript
class Person{ // 这是类
    constructor(name,age) { // 这是构造函数
        this.name = name;
        this.age = age;
    }
    // 添加方法
    showName () {
        alert(this.name);
    }
    showAge () {
        alert(this.age);
    }
}

class Worker extends Person {
    constructor (name, age, job) { // 自己的属性
        super(name, age); // 继承父类

        this.job = job; // 定义自己的属性
    }
    // 自动继承方法
    showJob () {
        alert(this.job);
    }
}

let w = new Worker("blue", 18 , "suibian")
w.showName();
w.showAge();
w.showJob();

~~~



## 模块化

所有的高级语言离不开模块	Java中是包	python中是模块

需要模块化，才能支撑大型项目开发

没有模块>> CMD（同步的，node中使用） >> AMD（异步加载，按需） >> 语言提供模块支持



### ES6模块

模块使用就两件事

1.定义：声明模块

2.使用：使用模块

ES6的模块系统浏览器不支持，所以需要编译，**常用webpack**(webpack是nodejs写，要遵循路径完整)

视频39:00

- 模块mod1.js文件需要导出（export）

- 普通index.js文件需要引入（import）

  ~~~javascript
  这些js放在js文件夹下
  ~~~

- 需要webpack.config.js设置导出

  ~~~javascript
  const path = require('path');
  
  module.exports = {  // 这是CMD的写法
      mode: 'development', // 编译模式,生产模式production
      entry: './js/index.js', // 要编译的文件
      output: {  // 编译出口
          path: path.resolve(__dirname, "build"), // 会解析成绝对路径
          filename: 'bundle.js' // 输出的文件名，一般把打包之后的文件叫bundle(一捆)
      }
  }
  ~~~

  

- 需要webpack编译，然后引入编译后的文件使用

  ~~~javascript
  编译后的文件放在build中
  ~~~



### 导出

~~~javascript
// 导出变量
export let a = 12;
export const a =12;

// 导出一堆变量
let a,b,c = ...;
export {a, b, c, ...};

// 导出函数
export function show() {
    ...
}

// 导出class
export class Person {
    
}

// 导出默认成员
export default 99;  // import不加*就默认导出这个
~~~

### 引入

~~~javascript
// 引入所有成员
import * as mod1 from 'xxx'

// 引入默认成员
import mod1 from 'xxx'

// 引入部分成员
import { a, b as name } from 'xxx'  // b名称变成name

// 只引入 可引入css文件
import 'xxx'

// 异步引入, 当函数用
let p = await import('./mod1');  // 如果引过来是个promise,需要await
~~~



## ES7\8\9

~~~javascript
ES7
1.幂操作
Math.pow(3,5)  // 3的5次方
3**5; 	// ES7

2.判断数组是否存在某个值
let arr = [12,8,9,26]
consoloe.log(8 in arr); // 打印false 因为in 只能检测key，数组的key是下标 该数组没有下标8
console.log(arr.indexOf(8) != -1); // 返回true,表示arr存在8, 这是获取indexOf获取下标
console.log(arr.includes(8)) // ES7 直接返回true,判断是否存在
~~~

~~~javascript
ES8(ECMA 2017)
promise是ES5.5的
async/await是ES8的
~~~

~~~javascript
ES9
rest/spread 类似 async/await
异步迭代 
Promise.fianlly ()
正则表达式增强
~~~

