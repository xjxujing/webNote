[TOC]







# JavaScript

引入js的两种方式

1. 嵌入代码
   	可以有多个代码块

2. 引入外部文件

   下载
   解析
   执行

## JS加载模式

1. 阻塞加载

   页面显示慢

2. 延迟加载

   脚本可以延迟到文档完全被解析和显示之后再执行

   单开一个线程（ 并发）  进行下载、解析

   DOM树结束后 再执行

~~~html
<script defer src="1.js"></script>

<!-- xhtml严格的写法 -->
<script defer="defer" src="1.js"></script>

效果和把<script></script>放在最后一样
~~~

3. 异步加载

   立即下载脚本，但不应妨碍页面中其他的操作

   单开一个线程（ 并发）  进行下载、解析  解析完成就可以塞回去执行

~~~html
<script async src="1.js"></script>

<!-- xhtml严格的写法 -->
<script async="async" src="1.js"></script>
~~~

小结：

| 延迟加载 defer                                               | 异步加载 async                                               |
| ------------------------------------------------------------ | :----------------------------------------------------------- |
| 1 并发<br />2 多个js,按定义的顺序执行<br />3 文档解析完才执行<br />4 在DOMContentLoaded事件之前执行完<br />5 只支持外部引入，IE7以前的除外 | 1 并发<br />2 多个js，不一定按顺序执行<br />3 加载完就执行，在load事件之前<br />4 在load事件之前执行完<br />5 只支持外部引入方式 |



## 数字

标准  IEEE-754  制定的  会有精度问题

~~~javascript
0.1 + 0.2 == 0.3 // false 由于转成二进制存储，精度丢失

整数没有精度丢失问题

0.1+0.3 ==  0.4  // true 就像1/3 + 2/3 =1一样,精度互相叠加抵消

实际生活中转成整数  换单位  小数变整数   最后显示再换回来单位

typeof  NaN    // 打印 number
~~~

确定小数位数math方法

科学计数法

进制

~~~javascript
// 二进制  0b开头
var x = 0b1010

// 八进制  0开头
var x = 012

// 十六进制  0x开头
var x = 0x00A

2^10 = 1024
1个字节B = 8位
1bit = 
1024个字节 = 1kB
1024kB = 1MB
1024MB = 1GB
TB PB ZB YB BB NB DB

~~~

| 二进制 | 八进制 | 十进制 | 十六进制 |
| ------ | ------ | ------ | -------- |
| 0000   | 0      | 0      | 0        |
| 0001   | 1      | 1      | 1        |
| 0010   | 2      | 2      | 2        |
| 0011   | 3      | 3      | 3        |
| 0100   | 4      | 4      | 4        |
| 0101   | 5      | 5      | 5        |
| 0110   | 6      | 6      | 6        |
| 0111   | 7      | 7      | 7        |
| 1000   | 10     | 8      | 8        |
| 1001   | 11     | 9      | 9        |
| 1010   | 12     | 10     | A        |
| 1011   | 13     | 11     | B        |
| 1100   | 14     | 12     | C        |
| 1101   | 15     | 13     | D        |
| 1110   | 16     | 14     | E        |
| 1111   | 17     | 15     | F        |



**数字用64位存储**

| 1位      | 10位         | 53位              |
| -------- | ------------ | ----------------- |
| 代表正负 | 代表指数部分 | 2^53 是最大安全值 |

**十进制转二进制**

- 正整数

  除`2`取余，再倒序

- 小数

  乘`2`取整，正序

  0.2转成二进制

  0.2 * 2	整数取0

  0.4 * 2	整数取0

  0.8 * 2	整数取1	1.6剩下0.6继续算

  0.6 * 2	整数取1

  0.2 * 2	整数取0

  .........	无穷无尽

- 小于1的小数

  拆成整数和小数部分分别计算

- 负整数

  正整数的基础上，取反并加1



## 字符串

组成： 单或双引号包裹的Unicode字符、数字、各种符号

ASCII：二进制一一对应字母，用128个字符，并且只占用1个字节（8位）来表示这些字母，默认8位来做字符的映射关系  最多能表示2^8（256）个字符

Unicode：用2个字节(16位)  可以映射2^16（65536）个字符

​	UTF-8是编码规则

注意：

- 在一行内，不然用 \ 换行
- 引号要成对
- 字符串中的字符都有自己下标的位置，可以用数组形式取到
- 特殊字符要用转移字符表示：换行、单引号

转义字符：改变字符本来的意思

\r  回车

字符串的比较  很重要   在MDN上查看[链接](<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#Comparing_strings>)





## 运算规则

1. 先完成优先级高的

   优先级简单记忆：

   - 一元（a++） 二元(a+b) 三元(?:) 运算符

   - 操作的元素越多，优先级越低

   - 赋值运算最低

     void:  表明一个运算没有返回值

2. 同一优先级从左往右



## 堆和栈

数据结构的栈和堆，  数据的先进后出、先进先出

**内存分配的栈和堆**
栈：系统自动分配，物理内存连续的
堆： 动态创建，物理地址不连续，程序自行维护













## 函数：创建、return、作用域

1.创建方式

（1）静态方法

~~~javascript
// 第一种
function add(a, b) {
    return a + b;
}

// 第二种 
// 使用方式：立即执行 或者 赋给变量
var add = function (a, b) {
    return a + b;
}
~~~

（2）动态方法

~~~javascript
var add = new Function("a", "b", "return a+b");
~~~

函数分为创建阶段、使用阶段

2.return

~~~javascript
return只能返回一个值，可以是数组、对象
function add(a, b) {
    var c = [];
    c[0] = a + b;
    c[1] = a * b;
    return c;
}
var x = add(1, 2);
console.log(x[0] + " " + x[1]);  // 3 2


function add(a, b) {
    var c = {};
    c.a = a + b;
    c.b = a * b;
    return c;
}
var x = add(1, 2);
console.log(x.a + " " + x.b);  // 3 2
~~~

3.作用域

js是函数式作用域，每一个函数都是一个独立的事件

- 函数的嵌套
- 变量
- 动态函数不一样

~~~javascript
情况一
var x = 1;
function func() {
    var x = 2;
    function e1() {
        return x;
    }
    return e1();
}
var y = func();
console.log(y);  // 2

情况二
var x = 1;
function func() {
    var x = 2;
    function e1() {
        return x;
    }
    return e1;  // 这里去掉了括号
}
var y = func();
console.log(y); // 返回了e1整个方法
// 返回的是：
ƒ e1() {  
        return x;
    }
console.log(y());  // 2

情况三 动态函数
var x = 1;
function func() {
    var x = 2;
    function e1() {
        return x;
    }
    var e2 = new Function("return x"); // 这里是window对象创建的
    return e2;
}
var y = func();
console.log(y);
// 返回的是：
ƒ anonymous() {
return x
}
console.log(y()); // 1


情况四
var x = 1;
function func() {
    var x = 2;
    function e1() {
        return x;
    }
    var e2 = new Function("return x");
    return [e1, e2];
}
var y = func();
console.log(y[0]() + " " + y[1]());  // 返回 2 1
~~~

> 记住： 函数名是指针，函数是对象



## 函数的参数及arguments

形参和实参数量必须一样多吗？  不是必须的。

~~~javascript
function add(a, b, c) {
    console.log(c);
    return a + b;
    
    console.log(add.length);  // 形参的个数
    console.log(arguments.callee.length); // callee的使用
}
console.log( add(1, 2) );
~~~



arguments 

- 仅在函数里面有
- 专为函数参数设计的对象
- 伪数组 length ，通过下标 [] 可以获取值， 只能有这两个
- callee    指向函数本身

~~~javascript
// 实现任意参数的求和
function add(){
    var z = 0;
    for(var i = 0;i < arguments.length; i++){
        z += arguments[i];  
    }
    return z;
}
var rs = add(1,2,4,5,23);
~~~







## 函数的三大特性

| 特性             | 说明                 |
| ---------------- | -------------------- |
| 方法特性（）     | 运用大括号包裹的代码 |
| 对象特性   **.** | 获取对象的属性       |
| 类的特性 new     | 创建实例，类似对象   |

1. 方法特性：一堆需要重复利用的代码作为一个函数，打包在一起，方便在别的地方使用，（）表示运行函数

2. 对象特性

   函数：一种特殊的对象

   - 自有属性

     arguments	参数相关

     name	函数名

     length	形参个数

     prototype

     call 方法、apply 方法、bind 方法

     toString() 方法

   - 自定义属性

     可以定义变量和方法，**注意内部和外部**

3. 类：设计图、模型，new 一个样板

~~~javascript
下面解释了函数的对象特性
1.自有属性
// 定义一个函数，即创建了一个对象
function f() {
    
}

// f 是个对象
f;
// 函数的方法特性
f();

// 函数自带属性，下面在控制台直接输入
f.name  // 打印的是函数名 f
f.length // 打印的是函数形参的个数
f.toString() // 把函数转成字符串
f.arguments // 返回 null，如果不是 f 的属性会返回 undefined,只能在函数体内使用，返回实参，函数使用后又被置为null



2.自定义属性
f.x = 2; // 函数里面的x依然是1
function f(a, b) {
    f.x = 1;
}
f.y = 2;

// 下面在控制台直接输入
f.x  // 返回 undefined，{}花括号是定义的过程，并没有执行
f.y  // 2

// 函数里面带个函数
function f(a, b) {
    function e() {
        alert("e");
    }
}
f();
e(); // 调用不了

function f(a, b) {
    f.e = function () {
        alert("e");
    }   
}
f(); // 先运行
f.e(); // 再使用e

~~~



**计数器练习**：计算函数的运行次数

~~~javascript
// 一般写法
var x = 0;
function f() {
    return x ++;
}
for(var i = 0; i< 100; i++) {
    console.log("i = " + i + "x= " + f() );
}

// 存在安全性问题
var x = 0;
function e() {
    x = 0;
}
function f() {
    return x ++;
}
for(var i = 0; i< 100; i++) {
    console.log("i = " + i + " " + "x = " + f() );
    e();
}
// 上面x会被修改，一直是0

// 利用对象的属性实现“计算函数运行次数”
f.x = 0;
function e() {
    x = 0;
}
function f() {
    return f.x ++;
}
for(var i = 0; i< 100; i++) {
    console.log("i = " + i + " " + "x = " + f() );
    e();
}

// 或者这这样写
function f() {
    if( f.x == undefined ){
        console.log("f.x初始化");
        f.x = 0;
    }
    return f.x ++;
}
for(var i = 0; i< 100; i++) {
    console.log("i = " + i + " " + "x = " + f() );
    e();
}
~~~



## 函数的call、apply

定义：把函数临时赋值到对象上面并执行

两者区别：传递参数的形式不一样

~~~javascript
function.call(obj, args1, args2);

function.apply(obj, args);  args可以是伪数组，只要能用下标访问到

注意
1.第一个参数对象，如果不是也会强制转换成对象
2.this指针
~~~

~~~javascript
function add(a, b) {
    return a + b;
}
var obj = {
    
}
console.log( add.call(obj, 2, 3) );

// 这一行
add.call(obj, 2, 3);
// 相当于下面三行
obj.e = add;
obj.e(2, 3);
delete obj.e;


// 注意这种写法
var x = 1;
var y = 2;
function add() {
    // console.log(this); 这里指向window对象
    return this.x + this.y;
}
var obj = {
    x: 2,
    y: 2
}

console.log( add() ); // 打印 3
console.log("obj add: " + add.call(obj) ); // 打印 obj add: 4


// apply 和 call 的区别
function add(a, b) {
    return a + b;  
}
var obj = {};
console.log( "apply: " + add.apply(obj, [2,3]) );
console.log( add.call(obj, 2, 3) );
~~~



**应用场景**

一个初中班级和一个高中班级，收费标准是：
初中男生100，女生80，
高中男生120，女生100，
求需要收班服费用多少？

~~~javascript
// 初中班级人数
var obj1 = {
    boy: 100,
    girl: 80
}
// 高中班级人数
var obj2 = {
    boy: 50,
    girl: 45
}
function money(boym, girlm) {
    return this.boy * boym + this.girl * girlm;
}

console.log("初中收费: "money.call(obj1, 100, 80));
console.log("高中收费："money.call(obj2, 120, 100));
~~~



## 函数bind

定义：把函数拷贝一份，并插入到对象作用域上面

~~~javascript
obj.e = function.bind(obj, args1, args2);
~~~

~~~javascript
function add() {
    return this.x + this.y;
}
var obj = {
    x: 1,
    y: 2
}
var func = add.bind(obj);  //返回的是函数指针,赋给func后,func变成了一个方法
console.log(func);


// 相当于下面这种
function add() {
    return this.x + this.y;
}
var obj = {
    x: 1,
    y: 2,
    func: function () {
        return this.x + this.y;
    }
}
~~~

举例

~~~javascript
var x = 10;
var y = 20;
function add(a, b) {
    return this.x*a + this.y*b;
}
var obj1 = {
    x: 1,
    y: 2
}
var obj2 = {
    x: 5,
    y: 6
}
console.log( "add: " + add(10, 10) ); // 300

console.log( add.bind(obj1, 20)(10) ); // 40

obj2.e = add.bind(obj2, 20, 30);
console.log( obj2.e() ); // 280
console.log( obj2.e(10, 20) ); // 280 需要注意
~~~



## 函数this指针

this是函数体内自带的一个对象指针

**简单理解：哪个对象拥有函数，this就指向哪个对象**

一、三种基本用法：
普通对象使用函数
直接使用函数
函数对象使用函数

~~~javascript
// 普通对象使用函数
var x = 10;
var obj = {
    x: 1,
    e: function () {
        console.log(this.x)
    }
}
obj.e(); // 1

// 直接使用函数
function e() {
    console.log(this.x);
}
e(); // 10

// 函数对象使用函数
function f() { //这里的函数被当做一个对象，因此下面定义属性、方法
    f.x = 1000;
    f.e = function () {
        console.log(this.x);
    }
}
f();
f.e(); // 1000
~~~

~~~javascript
// 扩展
var x = 10;
function e() {
    console.log(this.x);
}
e(); // 10

function f() {
    f.x = 1000;
    f.e = function () {
        console.log(this.x);
    }
    function e2() {
        console.log("e2: "+ this.x);  // 打印10
    }
    e2(); // 这里执行了e2
}
f();
f.e(); // 1000
~~~



一个函数可以被多个对象拥有吗？

~~~javascript
var name= "win";
var objCC = {
    name: "CC",
    e: f
}
var objTT = {
    name: "TT",
    e: f
}
function f() {
    console.log(this.name);
}
f(); // win
objCC.e(); // CC
objTT.e(); // TT


// 注意这种
var name= "win";
var objCC = {
    name: "CC",
    e: f() // 这里执行了f(),打印结果是 win
}
var objTT = {
    name: "TT",
    e: f
}
function f() {
    console.log(this.name);
}
f();  // 再次打印 win
objCC.e();  // 这里会报错，Uncaught TypeError: objCC.e is not a function
objTT.e()


// 再注意下这种
var name= "win";
var objCC = {
    name: "CC",
    e: f()
}
var objTT = {
    name: "TT",
    e: f
}
function f() {
    console.log(this.name);
    return f; //这里返回了f
}
console.log( "直接执行f(): "+ f() );  // 注意这里也执行了f
f();
objCC.e();
objTT.e()

~~~



**二、理解类的特性**：
函数类使用函数

~~~javascript
function f() {
    this.name = "CC";
    this.e = function () {
        console.log(this.name);
    }
}
var name = "TT";

f(); // 先运行下，不出结果 ，这里f()理解成类
f.e(); // Uncaught TypeError: f.e is not a function,注意这里name被改成了CC

var cc1 = new f();
cc1.name = "cc1";
cc1.e();
~~~

注意：可以用call、apply、bind转换函数所有权

~~~html
事件函数、定时器函数
<input type="button" value="CC" id="btn">

<script>
var btn = document.getElementById("btn");
function f(){
    console.log(this);
}
// 事件函数
btn.onclick = f;
console.log("btn: " + btn); 
// 上面的打印btn: [object HTMLInputElement]对象

// 定时器函数
setTimeout(f, 1000); // 1秒后打印window对象 
</script>
~~~



**练习：自定义全类型读取**
给一个变量打印具体类型：
	如果是基本类型，打印出undefined、number、boolean、string
	如果是对象，打印对象类型
		1.js提供的对象类型
		2.自定义了类型

typeof	Object.prototype.toString.call	constructor(类型的构造函数)

~~~javascript
function func(x) {
    // 基本类型
    var type = typeof x;

    if(type == "object"){
        // js提供的对象类型
        type = Object.prototype.toString.call(x);

        if(type == "[object Object]") {
            // 自定义对象
            type = "[object " + x.constructor.name + "]";
        }
        
        if(type ==  "[object Null]"){
            // 因为null属于基本类型，为了统一
            type = "null";
        }
        return type;
    }
    return type;
}
~~~





## 对象

存在内存中，可以具有多个属性的数据

一、变量和对象的关系

~~~javascript
var num1 = 1;
var num2 = 1;
var num3 = num1;  
num3 = 3;
num2 = 2;

var obj1 = {a: 1};   // obj1，存着地址  {a: 1}放在堆里
var obj2 = {a: 1};	// obj2,存着另一个地址  {a: 1}放在堆里
var obj3 = obj1;   //  obj1存的地址赋给了obj3
obj3.a = 3;    
console.log(obj1.a);  // 3
~~~

二、如何复制一个对象？

~~~javascript
// 枚举法
var obj1 = {
    a: 1,
    b: 2
};
var obj2 = {};
for( var key in obj1 ){
    obj2[key] = obj1[key];
}
console.log(obj2);
// 注意只能复制可枚举的属性， for in 不是按顺序遍历的, 遍历可枚举的属性
~~~

三、对象销毁机制：无引用后定期自动回收



## 对象、类、原型

一、对象的创建方式
	基于构造函数定义的属性，并继承原型对象的属性，生成一个新的对象

~~~javascript
1.直接量
var a1= {}


2.构造函数
var a1= new A();
// 举例
function Book(name, page) { //这个函数是构造函数
    this.name = name;
    this.name = page;
}
var book1 = new Book("book1", 1);
var book2 = new Book("book2", 2);


3.create方法
var a1 = Object.create(原型对象,属性列表);
// 举例
var book3 = Object.create(null, {
    name: {
        value: "book3",
        enumerable: true, // 可枚举
    },
    page: {
    	value: "3",
	}
})
// 这种可以设置属性的特性
~~~



二、原型的使用

~~~javascript
function Book(name, page) {
    this.name = name;
    this.page = page;
}
var bookauthor = {author_name: "cc", author_age: "35"};
Book.prototype = bookauthor;

var book1 = new Book("book1", 1);
var book2 = new Book("book2", 2)
~~~



构造函数（类）	设置    原型（特殊的对象）
构造函数（类）	创建	对象

对象继承原型



## 原型、原型链、继承

一、基本内容

当前对象	有本地属性（私有属性）	本地属性被修改，只有当前对象的属性被修改
原型对象	有原型属性（公共属性）	原型属性被修改，所有对象的该属性都会被修改

二、继承原则

1. 本地有的属性用本地的属性

2. 本地没有的属性用原型属性

~~~javascript
function Book() {
    this.name = name;
    this.page = page;
    Book.prototype.author = "cc";
}

var book1 = new Book();
book1.author = "book1 tt";
var book2 = new Book();
~~~



3. 原型没有的找原型对象的原型

~~~javascript
// 构造国家
function CountryMake() {
    this.country = "China";
}

// var ccCountry = new CountryMake();

// 构造作者
function Author() {
    this.author = "cc"
}

Author.prototype = new CountryMake();
// var ccAuthor = new Author();

// 构造书
function Book() {
    this.name = "book";
    this.page = 10;
}
// Book.prototype.author = "cc";
// Book.prototype = ccAuthor;
Book.prototype = new Author();

var book1 = new Book();
book1.author = "book1 tt";
var book2 = new Book();

~~~



三、实用方法

- 获得原型`Object.getPrototypeOf`

~~~javascript
var book1 = new Book();
var book2 = new Book();

// 获得原型
var bookPrototype = Object.getPrototypeOf(book1);

// 通过修改原型的指针，修改原型对象
bookPrototype.author = "tt";
~~~

- 构造函数检测原型

~~~javascript
构造函数.isPrototypeOf(对象)
~~~

- for  /   in  可枚举属性  包括原型链

- 检测私有属性

~~~javascript
对象.hasOwnProperty(属性名)
~~~

- 获取私有属性

~~~javascript
Object.getOwnPropertyNames
返回的是数组
~~~

- 可枚举的私有属性的名称`Object.keys`



## 对象的属性的特性

获取属性值用`.`	多层级就用多个`.`

一、定义属性的特性

1. 修改单个属性特性`Object.defineProperty(对象，属性名字符串，特性描述对象)`

~~~javascript
var obj = { x: 1, y: 2 };

// 新加一个z属性，z属性不可修改
Object.defineProperty(obj,"z",{
    value: 3,
    writable: false, // 不可写
    enumerable: true, // 可枚举
    configurable: true // 可配置
})

// 新加一个z属性，z属性不可枚举
Object.defineProperty(obj,"z",{
    value: 3,
    writable: true, // 可写
    enumerable: false, // 不可枚举
    configurable: true // 可配置
})
for( var i in obj ) { // 这里遍历不到z
    console.log( i + ":" + obj[i] );
}

// 新加一个z属性，z属性不可配置
Object.defineProperty(obj,"z",{
    value: 3,
    writable: true, // 可写
    enumerable: true, // 可枚举
    configurable: false // 不可配置
})
delete obj.x;  // 可以删掉
delete obj.z;  // 删不掉，返回false
另外 设置了不可配置，其他特性也不能再修改

~~~

2. 修改多个属性特性`Object.defineProperties(对象，多属性特性描述对象)`

~~~javascript
var obj = { x: 1, y: 2 };
Object.defineProperties(obj, {
    z: {
        value: 3,
        writable: false,
        enumerable: true
    },
    t: {
        value: 3,
        writable: false,
        enumerable: true
    }
})
~~~



二、查看属性的特性`Object.getOwnPropertyDescriptor(对象，属性名字符串)`

~~~javascript
私有属性的特性描述
Object.getOwnPropertyDescriptor(obj, "t")
~~~



三、 `set`和`get`

**应用场景**

一个班级男生10人，女生8人，班费每人十元钱

~~~javascript
var class1 = {
    boy: 10,
    girl: 8,
    allmoney: 0,
    // num: 0
}
Object.defineProperty(class1,"onemoney",{
    set: function (money) {
        // this.onemoney = 10 // 这样会死循环		  
        // console.log("set num: " + this.num++);
        
        this.allmoney = money * (this.boy + this.girl);
    },
    get: function () {
        return "总共" + this.allmoney + "元";
    },
    enumerable: false,
    configurable: true
})

class1.allmoney = 10 // 这里调用set方法
~~~



## 对象的特性及克隆

为了不让别人乱动对象，设置对象的特性保护对象

| 函数                       | 不可添加新属性 | 不可设置特性 | 不可修改属性值 |
| -------------------------- | -------------- | ------------ | -------------- |
| Object.preventExtensions() | 是             | 否           | 否             |
| Object.seal()              | 是             | 是           | 否             |
| Object.freeze()            | 是             | 是           | 是             |

~~~javascript
var obj = { x: 1, y: 2 };
Object.preventExtensions(obj);
~~~



~~~javascript
var obj = { x: 1, y: 2 };
// Object.preventExtensions(obj);
Object.seal(obj);


Object.defineProperty(obj,"x", {
    writable: true,
    enumerable: false,
    configurable: true
})  // 会报错
~~~



二、查看对象的的特性

| 方法                |      |
| ------------------- | ---- |
| Object.isExtensible |      |
| Object.isSealed     |      |
| Object.isFrozen     |      |



三、对象克隆

~~~javascript
// 浅克隆
var obj = { x: 1, y: 2 };
var obj1 = {};

for(var i in obj) {
    obj1[i] = obj[i];
}

// 如果obj是复杂的
var obj = { x: 1, y: {x: 2} };
var obj1 = {};
for(var i in obj) {
    obj1[i] = obj[i];
}

// 这时候修改
obj1.y.x = 1000;
// 会同时修改obj.y.x
// obj.y.x == 1000

~~~



~~~javascript
// 深克隆  用递归的方式
var obj = { x: 1, y: {x: 2} };
function clone(obj) {
    var obj1= {};
    for( var i in obj ) {
        if(typeof obj[i] == "object"){
            obj1[i] = clone(obj[i]);
        }else{
            obj1[i] = obj[i];
        }
    }
    return obj1;
}
var obj1 = clone(obj);
~~~



~~~javascript
// 用原型克隆
var obj = { x: 1, y: {x: 2} };

function clone(obj) {
    function Temp(){}
    Temp.prototype = obj;
    return new Temp();
}

var obj1 = clone(obj);
~~~



## 数组详解

定义：有序数据结合
length、元素、API

注意：数组的值是有序的，对象的值是无序的

一、创建方式

~~~javascript
1.直接量
var a = [1, 2, 3]; // 推荐

2.构造函数
var a = new Array(1, 2, 3);

// 只有一个数，表示创建3个空的位置
var a = new Array(3);

~~~

二、遍历数组

~~~javascript
for(var i = 0; i< ary.length; i++){

}
for(var i in ary) {
    
}
~~~



注意：

- 数组的长度是弹性的
- 下标从0开始的非负整数，且小于2^23-1
- 下标不符合条件，将转换为字符串，成为对象属性  --》关联数组，不是有序数据了

~~~javascript
var a1 = [1, 2, 3, "a31"];
a1[-1] = 8;

// 打印a1出来如下
(4) [1, 2, 3, "a31", -1: 8]
0: 1
1: 2
2: 3
3: "a31"
-1: 8
length: 4  // 注意这里长度依然是4
__proto__: Array(0)


var a1 = [1, 2, 3, "a31"];
a1[-1] = 8;
a1[5] = 5;

// 打印a1出来如下
(6) [1, 2, 3, "a31", empty, 5, -1: 8]
0: 1
1: 2
2: 3
3: "a31"
5: 5
-1: 8
length: 6  // 数组的长度由最大下标决定
__proto__: Array(0)

~~~

 

三维数组

js本身不支持多维数组，模拟出多维数组

~~~javascript
var a1 = [1, 2, 3] // 一维数组
var a1 = [ [1, 2, 3], [1, 2, 3], [1, 2, 3] ] // 二维数组

a1[0][1]

~~~



## 数组API

~~~javascript
// 模拟堆栈
push()	//从尾部添加元素 原数组被修改
pop()	//从尾部删除元素 原数组被修改 出栈

shift()	   // 从头部删除元素  返回删除的元素  原数组被修改  
unshift()  // 在头部插入元素  返回新数组长度 原数组被修改
~~~



~~~javascript
// 连接数组
concat()   

var a = [0,1];
var a1 = [2,3];
var b = a.concat(a1)
console.log(b);  // [0, 1, 2, 3]

a.concat( [3,3],[3,4], 3, 4, 5 )
// 返回 (9) [0, 1, 3, 3, 3, 4, 3, 4, 5]
~~~

~~~javascript
// 删除元素的同时添加元素  原数组被修改
splice(要删除元素的开始下标，要删除的个数，要插入的元素)

var a = [0,1,2,3,4,5];
a.splice(1,3);  
// 返回结果：(3) [1, 2, 3] 返回删除的部分 

var a = [0,1,2,3,4,5];
a.splice(1,3,"1","2","3")
// 返回结果 (6) [0, "1", "2", "3", 4, 5]
~~~



~~~javascript
// 截取元素生成新数组，原数组不修改
slice(起始下标，结束下标)

var a = [0,1,2,3,4,5];
var b = a.slice(1, 4);
// b： [1, 2, 3]  //不包括结束下标

var a = [0,1,2,3,4,5];
var b = a.slice(-2);
// b: [4, 5]

var a = [0,1,2,3,4,5];
var b = a.slice(2);  // 一直到结束
//b: [2, 3, 4, 5]
~~~



~~~javascript
改变数组顺序
a.reverse() // 颠倒数组顺序  原数组被修改
a.sort() // // 数组顺序  原数组被修改
数字从小到大，字母从a-z

// 自定义排序
a.sort(规则)
var a = ["a","ac","b","c","ba"]
a.sort();  
 // 返回["a", "ac", "b", "ba", "c"]

想按照长度，然后由小到大排序
var a = ["a","ac","b","c","ba"]
a.sort(f);
function f(a, b) {
    return a.length - b.length;
    // if( a > b) return 1;正数 b a 
    // if( a < b) return -1;负数 a b 
    // if(a == b) return 0;
}  
// 返回["a", "b", "c", "ac", "ba"]
~~~



~~~javascript
获取下标
var a = ["a","ac","b","a","c","ba"]
a.indexOf("a")  // 返回0

a.indexOf("a"，2) // 返回3 查找第二个a

lastIndexOf()
~~~



~~~javascript
forEarch 每个元素定义回调
every 每个元素回调是否是true
some 一个元素回调是否是true
map返回包含结果的数组
filter返回结果为true的数组
reduce汇总元素
reduceRight 反向汇总元素
~~~

~~~javascript
var a = ["a","ac","b","a","c","ba"];

a.forEach(f); // 数组中每个参数执行函数
function f(value, index, ary) {
    console.log("index: " + index + "value: " + value)
}
// 打印结果
index: 0value: a
index: 1value: ac
index: 2value: b
index: 3value: a
index: 4value: c
index: 5value: ba
~~~



## 常见字符串处理需求

一、定义字符串

1.字符串直接量
	双引号、单引号

~~~javascript
var s = "aaa";
var s = "aa'a";
单引号里面可以有双引号
双引号里面不可以有双引号，要用转义字符
var s = "aa\"a"
~~~

2.字符串对象

~~~javascript
var a = String("aaa")
var a = String(1); 这里1也是字符串

var n = 1;
var s = String(++n, n++, n++);// 这里只有第一个参数生效
// s是"2",  n是4
~~~

二、Unicode编码

一本字典，目前有17页，65536个数字，每个数字对应一个符号
每一页：两个字节来存储0x0000	0xFFFF  英文及常用符号

两个字节是16位

早期ASCII码，0x00 - 0xFF 256个英文和常用符号



三、处理需求

1.字符和编码之间的转换

~~~javascript
var s = "cc你好aoh"
s.charCodeAt(0); // 99
s.charCodeAt(3); // 22909   这些数字在65536之间
编码：[99, 99, 20320, 22909, 97, 111, 104]


String.fromCharCode(99, 99, 20320, 22909, 97, 111, 104)
字符："cc你好aoh"


单个字符可以比较大小吗
"a" > "c"
false

字符串两个内容都是数字，按顺序往下比较编码

"22" > "223" // true
NaN == NaN // false
null == undefined // true
~~~

2.字符串长度和字节长度

~~~javascript
var s = "cc你好aoh"
var len = s.length; // 这是字符串长度

var lenB = 0;
for(var i = 0; i< len; i++) {
    if( s.charCodeAt(i) > 255){
        lenB = lenB + 2;
    }else {
        lenB ++;
    }
}

// lenB是字节长长度9 占内存9
~~~

3.字符串拼接

~~~javascript
var s1 = "cc"
var s2 = "你好"
var s3 = "ya"
var s = s1 + s2;
var ss = s1.concat(s2,s3);
~~~

4.字符串查找

~~~javascript
var s = "cc你好ya,ya"
s.charAt(0) // 返回c 字符
s.charCodeAt(0) // 返回99 字符编码

s.indexOf("xx"); // 返回-1 表示没有改字符串
s.indexOf("ya"); // 返回4，下标

p125
s.lastIndexOF()
indexOf()、lastIndexOf() 如果第二个参数是负数，当作0处理

match、search 注意正则的使用
~~~

5.字符串截取

~~~javascript
slice(起始下标，结束下标)  不包括结束下标
substring()

xxx当下标位置写反了，substring()会默认按照正确方式执行

// slice支持负数下标
s.slice(3,-1) 

s.substring(3,-1)  看成s.substring(3,0) ,然后按照xxx那条执行，即s.substring(0,3)
~~~

6.字符串替换

~~~javascript
replace
~~~

7.字符串和数组之间的转换（重要）

~~~javascript
1.数组转字符串
var ary = [1, 2, "asdf", false] 
ary.join()
//"1,2,asdf,false"  默认逗号隔开,原数组未被修改
注意：join性能优于+号


2.字符串转数组
var s = "abcdefg";
s.split() // var s = "abcdefg";
s.split("") //  ["a", "b", "c", "d", "e", "f", "g"]


var s = "has6dkhfhaeu8dnsah12hd"
s.split(/\d+/); //["has", "dkhfhaeu", "dnsah", "hd"]
~~~

8.URL编码

拼接网址中文要转成URL编码

~~~javascript
var u = encodeURI(url)  //转URL编码
decodeURI(u) //转unicode编码

encodeURIComponent(url) //把前面的http://都转成url编码
~~~





##  正则表达式

1.意义

描述字符模式的对象，字符组成的特殊格式的字符串

2.定义

~~~javascript
1.直接量（推荐）
/字符模式/标志字符

2.RegExp类
组合字符串或者接受>
~~~

[MDN正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)





---



# CSS

## 引入方式

- 内部样式表style 看加载顺序

- 外部样式表link

  ~~~html
  <link rel="stylesheet" href="style.css">
  ~~~

  引入CSS是异步加载

  解析CSS是阻塞的

  注意：同时用内部样式和外部样式的时候，权重相同时，后加载的样式覆盖先加载的样式

- 行内样式，权重最高

  ~~~html
  <div id="warapper" class="wrapper" style="width: 100px"></div>
  
  <!-- 通过js引入的样式，会直接加在行内样式中 -->
  <script>
   	wrapper.style.width = "100px";
  </script>	
  ~~~

  

## 选择器权重  

| 权重 | 选择器                                  |
| ---- | --------------------------------------- |
| 1000 | 行间样式                                |
| 100  | id选择器                                |
| 10   | class选择器\|\|属性选择器\|\|伪类选择器 |
| 1    | 标签选择器                              |
| 0    | 通配符选择器                            |

256进制：256个标签的权重才能等于1个class的权重

!import	优先级最高



## 文档流

从上往下、一行一行、从左到右	这样的排列方式称为文档流

position: absolute / fixed  和  float   这三个脱离会文档流



## CSS属性前缀

来历：W3C小组	

1. 提出工作草案
2. 最终工作草案（差不多成形，浏览器会提前选择一些属性）
3. 候选推荐标准
4. 建议推荐标准
5. 形成推荐标准

~~~css
因为周期长，正式标准成立前，被选择的属性写成：(加上了内核)
-webkiy-border: 1px solid #000;

-moz 火狐使用Mozilla浏览器引擎的浏览器
-webkit-   Safari、谷歌浏览器等使用Webkit引擎的浏览器
-o-
-ms-   IE

~~~

CSS前缀属性，可以在 can i use中查    [Can I use 一款前端兼容性自查工具](<https://blog.51cto.com/8312284/2083367>)



## CSS3常用选择器



~~~javascript
获取元素的所有属性
window.getComputedStyle(img).trnsition
~~~



**属性选择器**

~~~html
E[att]属性
E[att='val'] 属性att的值为"val"的元素
E[att~='val'] 属性att有多个值，val为其中一个
E[att^='val'] 属性att的值以"val"开头的元素
E[att$='val'] 属性att的值以"val"结尾的元素
E[att*='val'] 属性att的值包含"val"的元素
~~~

用的比较少。。。



**同级选择器**

~~~html
E + F 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F
E ~ F 匹配任何在E元素之后的同级F元素,兄弟选择器
~~~

做选项卡中用过 E~F



**伪类选择器**

~~~css
:not(s)不含有s选择符的元素E 

:first-child匹配父元素的第一个子元素
:last-child
:nth-child(n) 
:nth-last-child(n)

:first-of-type
:last-of-type
:nth-of-type(odd) 奇数行
:nth-last-of-type

:empty (dom树无内容)

:enable 匹配表单中激活的元素
:disabled 匹配表单中禁用的元素
:checked 匹配表单中被选中的radio(单选按钮)或checkbox(复选框)元素

:target
:root 根元素
~~~

基于整个标签



**伪元素选择器**

~~~css
::first-letter 设置对象内的第一个字符的样式
::first-line 设置对象内的第一行的样式
::before 
::after{content: ''}
::selection 设置对象被选择时的元素的样式
~~~

~~~css
body {
    /* 设置不能选择内容 */
    user-select: none;  
}
~~~

~~~css
每个html元素前后都有下面两个伪元素
before
after
清除浮动的原理
.clearfix::after {
    /* 给伪元素加上内容，就能看的见 */
    content: "";
    /* 伪元素是行内元素，只有块元素才需要清除浮动，所以要转成块元素 */
    display: block;
    /* 清除浮动 */
    clear: both;
}
/* div会有margin重叠，通过伪元素解决margin*/
.clearfix::before {
    content: "";
    /* 有table后，会给盒子上面加内容 */
    display: table;
}
/* 再清除浮动 */
.clearfix::after {
	content: "";
	display: table;
	clear: both;
}

合并后的写法
.clearfix::before, .clearfix::after {
    content: "";
	display: table;
}
.clearfix::after {
    clear: both;
}
详解清除浮动：
https://blog.csdn.net/FE_dev/article/details/68954481
~~~



## CSS3常用属性

~~~css
border-radius 圆角
一个值/四个值/每个值拆分成两个方向值

box-shadow 盒子阴影/（性能杀手）
box-shadow: x y [模糊半径] [阴影拓展半径] [阴影颜色] [投影方式]

text-shadow 文字阴影 /（性能杀手）
           text-shadow: x y [模糊半径] [阴影颜色]

/* 盒子阴影和文字阴影要少用 一个网页十个以内
阴影是浏览器性能杀手 */

rgba(r, g, b, a)
/* 注意与opacity的区别
rgba子元素不继承，opacity子元素继承透明度 */

~~~



~~~css
/* 线性渐变 */ 
background:linear-gradient(direction, color [percent], color [percent]);
属性值参数详解如下：
direction //渐变方向
        写方向：to bottom/to bottom right……
        写角度：0deg/45deg
color //渐变颜色
percent // 百分比

/* 径向渐变 */
background:radial-gradient(shape r/(a,b) at position, color [percent], color [percent]);
属性值参数详解如下：
shape //形状
        circle/ellipse
r/(a,b) // 半径/(长短轴)
position //中心点位置
        像素值/百分比/方向(top left)/也可以是一个值，第二个值默认center

*transparent透明
~~~



~~~html
实现背景颜色过度举例：
<style>
    .wrapper {
        width: 300px;
        heigth: 100px;
        /* 从100px的红色到200px的绿色 */
        background: linear-gradient(to right, red 100px, green 200px);
    }
</style>
<div class="wrapper"></div>
~~~



~~~css
CSS3 新增 background值：

指定绘制背景图像时的起点
background-origin:border-box | padding-box | content-box

指定背景的显示范围
background-clip: border-box | padding-box | content-box

指定背景中图像的尺寸
background-size:auto|length|percentage|cover|contain 属性值详解如下：
      cover// 背景图片充满盒子
      contain //让盒子保留一张完整背景图片

background-position
	精灵图
	/* 浏览器同时请求资源的个数有限，为了减少图片资源的加载 */


background: transparent url(image.jpg) repeat-y  scroll 50% 0 
background: #00FF00 url(bgimage.gif) no-repeat fixed top;
			color   image			repeat	attachment(滚动相关)	position

综合写法
background: [background-color] [background-image] [background-repeat] [background-attachment] [background-position] / [ background-size] [background-origin] [background-clip];
~~~



~~~css
CSS3 新增 border值：

可单独设置每边的border
border: border-width  border-style b order-color;

给border添加背景图片
border-image：url number style;属性值详解如下：
    url //图片地址
    number // 图片裁剪的值
    style // 图片添加的方式
例如：花边效果

~~~



~~~css
文字属性：文本溢出
text-overflow: clip|ellipsis|ellipsis-word 属性值详解如下：
    clip //不显示省略标记(…),而是简单裁切
    ellipsis //当对象文本一出时显示省略标记(…)，省略标记插入的位置是最后一个字符

white-space:nowrap 文本不会换行，直到遇到 <br> 标签为止。(css2.1)

单行打点：
text-overflow: ellipsis; // 设置溢出文本为“...”
white-space:nowrap;  //强制文本在一行内显示
overflow:hidden;  //溢出内容为隐藏

多行打点：
-webkit-line-clamp: 2;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-box-orient: vertical;//子元素被垂直排列
overflow:hidden;
多行打点兼容性不好，可用js操作（拼接，可以看下视频）

~~~



~~~css
文字属性：文本换行
word-wrap: normal|break-word; 属性值详解如下：
    normal //连续文本换行
    break-word //内容将在边界内换行（强制换行）

文字属性：文字字体
@font-face{
    font-family: 'ShadowsIntoLight’;
    src: url('./ShadowsIntoLight.ttf');/*兼容IE*/
    src: 
        url('./ShadowsIntoLight.eot?#iefix') format('embedded-opentype’),
        url('./ShadowsIntoLight.woff') format('woff’),
        url('./ShadowsIntoLight.ttf') format('truetype’),
        url('./ShadowsIntoLight.svg') format('svg');
}
地址：http://www.zhaozi.cn/s/all/ttf/index_2.php（这里的字体库更好看）
~~~



## 盒模型

~~~css
定义显示方式
定义显示方式 box-sizing: content-box(标准盒模型) | border-box(怪异盒模型)

可控大小
resize: nont | horizontal | vertical | both; 
结合属性overflow: auto; 

定义轮廓
 outline: outline-width outline-style outline-color;

~~~



## columns多列布局

~~~css
columns: column-width | column-count;。//每列的宽度  或  显示的列数

column-width //每列的宽度

column-conunt //显示的列数

column-gap // 列宽，默认由font-size决定

column-rule: column-rule-width column-rule-style column-style-colro //列边框样式

column-span: none(无) | all(横跨所有列)

~~~

用的不多



## flexbox弹性盒子

一种一维的布局模型，给flexbox的**直接子元素**之间提供了强大的空间分布和对齐的能力

注意：columns属性在伸缩容器上没效果，同时 float, clear和 vertical-align 属性在伸缩项目上页没有效果。

~~~html
所有CSS属性都会有一个初始值，所以 flex 容器中的所有 flex 元素都会初始默认效果：

主轴水平从左向右。元素排列为一行 (flex-direction 属性的初始值是 row)。

元素从左边起始线开始(justify-content:flex-start)。元素从主轴的起始线开始。

默认不拉伸(flex-grow:0)，但是会压缩(flex-shrink:1)不换行(flew-wrap:nowrap)。元素不会在主维度方向拉伸，但是可以缩小。

不设置高度时flex元素充满flex容器(align-items:stretch)。元素被拉伸来填充交叉轴大小。
~~~

**flex容器属性**

~~~h
1、flex-direction设置flex容器主轴的方向，属性值详解如下：
row // (默认)默认方向
row-reverse //默认方向 首尾互换
column  //垂直，从上到下
column-reverse //垂直 从下到上

2、flex-wrap 控制flex容器是单线还是多线，以及新线的堆叠方向，属性值详解如下：
nowrap //单行
wrap //多行
wrap-reverse // 新线上前排列

3、flex-flow: flex-direction flex-wrap;

4、justify-content 项目在主轴上的对齐方式，属性值详解如下：
flex-start //(默认) 主轴起始端(main-start)齐平
flex-end // 主轴末端(main-end)齐平
center //居中
space-between // 两端对齐，每两个flex元素之间的空隙相等
space-around // 每个项目两侧的距离相等

5、align-items 项目在交叉轴上的对齐方式，属性值详解如下：
flex-start // 交叉轴起始段(cross-start)齐平
flex-end // 交叉轴末端(cross-end)齐平
center // 居中对齐
baseline //flex元素的第一行文字为基准对齐
stretch //flex元素未设置高度时，高度充满flex容器高度 

6、align-content 多线的对齐方式，单线不起作用。属性值详解如下：
flex-start  //所有flex子元素交叉轴起始段(cross-start)齐平
flex-end //所有flex子元素交叉轴末端(cross-end)齐平
center //所有flex子元素居中对齐
stretch //未设置高度时占满整个交叉轴。默认值
space-between //交叉轴(cross)两端对齐
space-around //每跟轴两侧空隙相等

可以设置多个主轴，但只有一个交叉轴

~~~

**flex元素属性**

~~~css
1、flex-basis: length; //定义该元素的main-size。

2、flex-grow: number; //对剩余的空间设置拉伸比例，默认值为0(不拉伸)

3、flex-shrink: number; //压缩比例，默认值为1

4、flex: flex-grow flex-shrink flex-basis //默认值 0 1 auto

5、align-self单个项目在cross轴上的对齐方式，属性值详解如下：
flex-start  //cross-start齐平
flex-end //cross-end齐平
center //居中
baseline //第一行文字
stretch //为设置高度时 该元素高度为flex容器高度 

6、order：number; //该项目排列的位置 值从小到大排列
~~~



盒子居中的三种方式

- 定位absolute,	top,le ft各50%，再走margin-left，margin-top自己宽高的一半,可以用下面的方式（相对于自身宽高的一半）

  transform：translate(-50%, -50%)；

- 定位position,     top，left，bottom，right都是0，然后设置margin为auto

  这种方法只能设定已知宽、高的元素

- flexbox布局

[盒子居中的方式](https://blog.csdn.net/qq_30101879/article/details/78306979)



## HTML规范

1.引号

​    属性的定义，统一使用双引号。

2.嵌套 

​    1)块级元素与块级元素平级、内联元素与内联元素平级；

​    2)块级元素可以包含内联元素或某些块级元素，但内联元素不能包含块级元素，它只能包含其他的内联元素；

​    3)有几个特殊的块级元素只能包含内联元素，不能再包含块级元素   

​    注：a标签不能嵌套a标签（链接嵌套）、p标签不能嵌套块级标签（div）

3.语义化

​    1)通常情况下，每个标签都是有语义的，便于程序员理解。维护

​    2)外语义化的 HTML 结构，有助于机器（搜索引擎）理解。裸奔



## CSS规范

1.CSS 命名规则

​    1)样式类名全部用小写,首字符必须是字母,禁止数字或其他特殊字符。

​    2)可以是单个单词,也可以是组合单词,要求能够描述清楚模块和元素的含义,使其具有语义化。

​    3)尽量用单个单词简单描述class名称。

​    4)双单词或多单词组合方式，推荐用中划线-

2.Class 和 ID

​    1)使用语义化、通用的命名方式；

​    2)使用连字符 - 作为 ID、Class 名称界定符，不要驼峰命名法和下划线；

​    3)避免选择器嵌套层级过多，尽量少于 3 级；.wrapper .box .list .item .demo

​    4)避免选择器和 Class、ID 叠加使用；

3.CSS属性书写顺序

​    1)布局方式、位置，相关属性包括：position, top, z-index, display, float等

​    2)盒模型，相关属性包括：width, height, padding, margin，border,overflow

​    3) 文本排版，相关属性包括：font, line-height, text-align

​    4)视觉外观，相关属性包括：color, background, list-style, transform, animation

​    5)其他

前端开发规范：https://www.w3cschool.cn/webdevelopment/q3k8wozt.html



## Media媒体查询

常见页面布局

1. 静态布局
   58、政府官网

2. 流式布局
   百分比

3. 自适应布局：媒体查询
   
4. 响应式布局

   综合前面布局 包括flexbox

   

   下面主要介绍媒体查询

   媒体查询

   - 媒体类型：指定的媒体类型匹配展示文档所使用的设备类型

   - 媒体特性：媒体特性表达式(0或多个)最终会被解析为true或false

     ~~~css
     /* link元素中的css媒体查询 */
     <link rel="stylesheet" href="demo.css" media="screen and (max-width: 800px)">
     
     /* 样式表中的css媒体查询 */
     /* 在彩色屏幕下，最大宽度是600px，设置的样式会生效 */
     @media screen and (max-width: 600px) {
         .demo{
             background: pink;
             color: deeppink;
         }
     }
     ~~~

     F12控制台Network可以看到所有引入（请求）的资源

   媒体类型有下图这些

   ![1559213194001](E:\笔记\imgCSS\媒体类型.png)

   媒体特性有下图这些

   ![1559213377089](E:\笔记\imgCSS\媒体特性.png)

   常用的有max-width	min-width	orentation

   - 媒体查询的逻辑操作符

     and操作符

     逗号分隔列表
     	等同于or逻辑操作符

     ~~~css
     @media (max-width: 300px), screen and (orientation: landscape)
     ~~~

     not操作符

     ~~~css
     @media not screen and (min-width: 500px) and (max-width: 800px)
     ~~~

     only操作符

     ​	防止老旧的浏览器不支持带媒体属性的查询而应用到给定的样式

     ~~~css
     @media only screen and (min-width: 500px) and (max-width: 800px)
     ~~~
     
     

## 移动端布局

- 百分比布局

- flex布局

- 单位rem

  1rem 取决于 html 的 font-size，1em 取决于父级的 font-size大小

  通过 js 动态设置 html 的 font-size 属性值实现等比缩放

  ~~~html
  <style>
      body {
          margin: 0;
          padding: 0;
      }
      .demo {
          font-size: 1rem;
          width: 2rem;  /* 这里宽度占屏幕 20% */
          height: 2rem;
          background: pink;
      }
  </style>
  
  <div class="demo"></div>
  <script>
      // 通过 js 动态设置 html 的 font-size 属性值
      window.onload = function () {
          var w = document.documentElement.clientWidth;
          document.documentElement.style.fontSize = w/10 +"px";
          // document.documentElement 属性始终指向 HTML 页面中的 <html> 元素，是内置的快捷方式 p254
      }
  </script>
  ~~~

  

- 单位vw vh

  把屏幕分成100份

  ~~~html
  <style>
      body {
          margin: 0;
          padding: 0;
      }
      .demo {
          font-size: 1rem;
          width: 20vw;  /* 这里宽度占屏幕 20% ，不用 js 控制*/
          height: 2rem;
          background: pink;
      }
  </style>
  
  <div class="demo"></div>
  ~~~



**viewport**

物理像素：物理像素又被称为设备像素，他是显示设备中一个最小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。物理光子

逻辑像素：一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

设备像素比(dpr) = 物理像素/逻辑像素
	

~~~javascript
viewport是严格等于浏览器的窗口。在桌面浏览器中，viewport就是浏览器窗口的宽度高度。但在移动端设备上就有点复杂。

viewport就是浏览器上，用来显示网页的那一部分的区域。Ios及新版本浏览器默认viewport为980px。

// 一般用js动态生成meta标签，来匹配不同的dpr
var oMeta = document.createElement("meta");
oMeta.setAttribute("name","viewport");

if(window.devicePixelRatio >= 2) {
    oMeta.setAttribute("contenr","width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no");
}
if(window.devicePixelRatio >= 3) {
    oMeta.setAttribute("contenr","width=device-width, initial-scale=0.3, minimum-scale=0.3, maximum-scale=0.3, user-scalable=no");
}

document.getElementsByTagName("head")[0].appendChild(oMeta);

// 公司开发一般给750px的设计稿，iphone6/7/8，dpr = 2,  宽度375

~~~

viewport默认有6个属性：

| 属性          |                                                          |
| ------------- | -------------------------------------------------------- |
| width         | 设置viewport宽度，可以为一个整数，或字符串"device-width" |
| initial-scale | 页面初始的缩放值，为数字，可以是小数                     |
| minimum-scale | 允许用户的最小缩放值，为数字，可以是小数                 |
| maximum-scale | 允许用户的最大缩放值，为数字，可以是小数                 |
| height        | 设置viewport的高度（一般不管，高度由内容撑开）           |
| user-scalable | 允许用户进行缩放，'no'为不允许，'yes’为允许              |



举例：
iphone6/7/8  dpr = 2 ,,两个物理像素等于1个逻辑像素
本身设备宽度是375px，排了750个光子，所以逻辑像素要放大2倍才能每个像素对应1个光子











**根据 dpr 的值来修改 viewport 实现1px的线？**

1.js动态生成mate标签

~~~html
<meta name="viewport"
content="width=device-width, initial-scale=0.5, maximum-scale=0.5,minimum-scale=0.5, user-scalable=no">
~~~



~~~html
很难对安卓手机进行兼容，下面解决对ios的不同 dpr 显示出 1px 的处理方法
<!-- 设置浏览器视口等于设备的宽度 -->
<!-- initial-scale 设置是否缩放,dpr = 2，设置0.5 -->
<!-- initial-scale 设置是否缩放,dpr = 3，设置0.3333 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
    body {
        margin: 0;
        padding: 0;
    }
    .demo {
        /* 这里border为1px 前面initial-scale = 0.5，可以找到 */
        /* 设置0.5px的话，浏览器可能解析成0 */
        border: 1px solid #000; 
        font-size: 1rem;
        width: 20vw;  /* 这里宽度占屏幕 20% ，不用 js 控制*/
        height: 2rem;
        background: pink;
    }
</style>
<div class="demo"></div>
~~~



2.css3 transform:scale缩放

~~~css
/* 另一种方法 css3 transform:scale缩放 */
@media
only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and ( min--moz-device-pixel-ratio: 2),
only screen and ( -o-min-device-pixel-ratio: 2/1),
only screen and ( min-device-pixel-ratio: 2),
only screen and ( min-resolution: 192dpi),
only screen and ( min-resolution: 2dppx){ 
    div{
             ……
        transform: scale(0.5, 0.5);
        transform-origin: 0 0; // 设置缩放原点
      }
}
~~~



**综合解决方案**

方案一：手淘解决方案 flexbile（可解决1px显示和等比缩放）

<http://g.tbcdn.cn/mtb/lib-flexible/0.3.4/??flexible_css.js,flexible.js>

1、根据屏幕大小动态改变html的fontSize，达到等比缩放问题

2、给body设置fontSize，字体大小可以直接继承body的font-size

3、给html标签添加data-dpr属性，可以通过查找该属性，给不同dpr元素设置个性化属性

```css
 [data-dpr='2'] div{
 font-size:  26px;
 }
```

方案二： Vw+postcss(插件) （推荐）

根据设置稿（如宽度750px的设计稿），以px为单位写大小，转换成vw。解决等比缩放问题。  使用插件px2vw   cssrem

px to rem移动端？？ 自动浏览器css样式前缀Autoprefixer

至于小于等于1px的线，以px为单位不专成vw。 postcss-write-svg插件主要用来处理移动端1px的解决方案。该插件主要使用的是border-image和background来做1px的相关处理，编译出来是border-image或者background



**dpr 不同的设备上图片的适配问题？**

1.media媒体查询

~~~css
@media
only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and ( min--moz-device-pixel-ratio: 2),
only screen and ( -o-min-device-pixel-ratio: 2/1),
only screen and ( min-device-pixel-ratio: 2),
only screen and ( min-resolution: 192dpi),
only screen and ( min-resolution: 2dppx){ 
    background: url(高清图); //dpr是2
    background: url(标清图); //dpr是1
}
~~~

2.js动态改图片

~~~javascript
window.onload = function () {
    if(window.devicePixelRatio > 1) {
    var images = Array.prototype.slice.call(document.getElementsByTagName("img"));
    images.forEach(function (ele, index) {
        var lowers = images[index].getAttribute("src");
        var highres = lowers.replace(".", "@2x.");
        images[index].setAttribute("src", highres);
    })
    }
}
~~~

由于高清图放普通屏上不锐利（不影响）
标清图放高清屏上会模糊
一般直接只用高清图

小结移动端布局三个问题：比缩放问题、不同 dpr 的1px显示问题（针对IOS）、不同 dpr 图片适配问题



## Bootstrap快速使用

Bootstrap （UI 类框架）是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。  

bootstrap4引用了flex布局

特点：虽然可以直接使用 Bootstrap 提供的 CSS 样式表，但Bootstrap 的源码是基于最流行的 CSS 预处理脚本 Less和 Sass 开发的。你可以采用预编译的 CSS 文件快速开发，也可以从源码定制自己需要的样式。

你的网站和应用能在 Bootstrap 的帮助下通过同一份代码快速、有效适配手机、平板、PC 设备，这一切都是 CSS 媒体查询（Media Query）的功劳。

Bootstrap 提供了全面、美观的文档。你能在这里找到关于 HTML 元素、HTML 和 CSS 组件、jQuery 插件方面的所有详细文档。

- 全局样式：表格、按钮、辅助类
- 组件：按钮组、下拉菜单、字体图标、导航条
- 栅格系统  .col-md-offset-*
- 插件：模态框、轮播图

[Bootstrap中文网](http://www.bootcss.com/)



## transform形状变换

CSS3中动画、形变

transform属性向元素应用 2D 或 3D 转换。该属性允许我们对元素进行移动、缩放、旋转或倾斜。

~~~javascript
transform: translate | scale | rotate | skew
transform: translate(-50%， -50%) scale()

移动: translate
translateX()
translateY()
translateZ() //有3D效果
translate3d(x,y,z) //有3D效果  这里是矢量值 往合力方向移动
简写：translate(x,y)

缩放：scale   +-代表方向  默认中心位置是缩放原点
scaleX()
scaleY()
scaleZ() //有3D效果
scale3d(x,y,z) //有3D效果
简写：scale(x,y) | scale(n)   ->scale(n,n)

旋转: rotate
rotateX()
rotateY()
rotateZ()
rotate3d(x,y,z) //有3D效果
简写：rotate()rotateZ()

倾斜：skew
skewX(ndeg)
skewY(ndeg)
scale3d(x,y) //有3D效果
简写：skew(x, y)


transform-origin //设置元素原点位置
transform-origin: 50% 50% 0; //默认值
X轴方向：left | center | right | length | %
Y轴方向：top | center | bottom | length | %
Z轴方向：length


~~~

练习设置时钟圆盘

~~~html
<style>
        body, ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        ul {
            position: relative;
            margin: 0 auto;
            width: 300px;
            height: 300px;
            border: 1px solid black;
            border-radius: 50%;
        }
        li {
            position: absolute;
            left: 50%;
            width: 2px;
            height: 10px;
            background: black;
        }
        li {
            transform-origin: 0 150px;
        }
</style>

<ul></ul>

<script>
    var oUl = document.getElementsByTagName("ul")[0];
    var str = "";
    for(var i = 1; i<= 12; i++) {
        str += '<li style="transform: rotate('+ i * 30 + 'deg)"></li>';
    }
    console.log(str);
    oUl.innerHTML = str;
</script>
~~~



left会重新layout 或者重新repay    translateX不会引起重新的layout(性能更好)





## transition过渡动画

~~~css
transition: property duration timing-function delay;

transition-property //规定设置过渡效果的 CSS 属性的名称。
transition-duration //规定完成过渡效果需要多少秒或毫秒。
transition-timing-function  //规定速度效果的速度曲线。
transition-delay    //定义过渡效果何时开始。

~~~

~~~css
transition-timing-function 规定设置过渡效果的 CSS 属性的名称。属性值详解如下：
transition-timing-function: linear | ease | ease-in | ease-out | ease-in-out | cubic-
bezier(n,n,n,n);  

linear //匀速, cubic-bezier(0,0,1,1) 
ease //慢快慢， cubic-bezier(0.25,0.1,0.25,1) 
ease-in //慢速开始的过渡， cubic-bezier(0.42,0,1,1) 
ease-out //慢速结束的过渡， cubic-bezier(0,0,0.58,1) 
ease-in-out //慢速开始和结束的过渡， cubic-bezier(0.42,0,0.58,1) 
cubic-bezier(n,n,n,n) //在 cubic-bezier 函数中定义自己的值。可能的值是 0 ~1 之间的数值。

~~~

有数字值的属性才能有过渡效果





## animation动画

优点：有Y轴或Z轴可以开启浏览器渲染动画GPU加速
缺点：老版本浏览器不支持

~~~css
animation:动画名称 动画时间 运动曲线  何时开始  播放次数  是否反方向;
~~~



~~~css
animation 属性是一个简写属性，用于设置动画属性。属性值详解如下：

animation-name  //规定需要绑定到选择器的 keyframe 名称。。
animation-duration  //规定完成动画所花费的时间，以秒或毫秒计。
animation-timing-function   //规定动画的速度曲线。
animation-delay //规定在动画开始之前的延迟。

animation-iteration-count   //规定动画应该播放的次数。
animation-direction //规定是否应该轮流反向播放动画。
animation-fill-mode //属性规定动画在播放之前或之后，其动画效果是否可见。
animation-play-state //属性规定动画正在运行还是暂停。

~~~



~~~css
animation-iteration-count   规定动画应该播放的次数。属性值详解如下：
        n //播放n次
        infinite //无限次

animation-direction 规定是否应该轮流反向播放动画。属性值详解如下：
        normal //默认值，按照顺序正常播放
        reverse //动画反向播放
        alternate //动画在奇数次正向，偶数次反向播放
        alternate-reverse //动画在奇数次反向，偶数次正向播放

~~~



~~~css
animation-fill-mode 规定动画在播放之前或之后，其动画效果是否可见。属性值详解如下：
        none    //不改变默认行为。
        forwards    停留在最后一帧
//当动画完成后，保持最后一个属性值（在最后一个关键帧中定义）。
        backwards   在第一帧等待
//在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。  在哪一个位置等待延迟
        both    //向前和向后填充模式都被应用。 在第一帧等待 停留在最后一帧

animation-play-state 属性规定动画正在运行还是暂停。属性值详解如下：
        paused  //规定动画已暂停。
        running //规定动画正在播放。

~~~



~~~css
@keyframes move {
    100% {
        left: 600px;
    }
}
等同于
@keyframes move {
    0% {
        left: 100px;
    }
    100% {
        left: 600px;
    }
}
等同于
@keyframes move {
    from {
        left: 100px;
    }
    to {
        left: 600px;
    }
}
~~~



~~~javascript
练习动画项目要点：
1.感知鼠标滑过方向图片遮罩效果，注意长方形压缩
2.根据鼠标进入和移出的方向，控制描述文字进入和移出
~~~



## 3D变换动画

perspective 景深
定义：3D 元素距视图的距离，以像素计。当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。

~~~css
放在在父元素
perspective：600px;

保留3d效果(3D空间)
transform-style: preserve-3d;
~~~

~~~css
transform-style指定嵌套元素是怎样在三维空间中呈现。
transform-style: flat|preserve-3d;
注：设置了transfrom-style:preserve-3d的元素，不能防止子元素溢出，即不能设置overflow:hidden；否则persever-3d失效；
~~~

~~~css
perspective-origin视点得位置
      perspective-origin: x y;//默认50% 50% 50%;
~~~

~~~css
backface-visibility 属性定义当元素背面是否可见。 
backface-visibility: visible | hidden;
~~~

