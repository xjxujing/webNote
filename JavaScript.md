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

定义：把函数临时赋值到对象上面**并执行**

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

- for  /   in  可枚举属性  包括**原型链**

- 检测私有属性

~~~javascript
对象.hasOwnProperty('属性名')
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
    writable: false, // 不可写		是否可以设置该属性值
    enumerable: true, // 可枚举	for 是否可以获得该值
    configurable: true // 可配置	是否可以删除或修改该属性特性
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
    // 注意set和get中都不允许出现onemoney,也就是当前设置的属性,会报错
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
push()	//从尾部添加元素 原数组被修改  返回新数组的长度
pop()	//从尾部删除元素 原数组被修改 出栈 返回删除的元素的值

shift()	   // 从头部删除元素  返回删除的元素  原数组被修改  
unshift()  // 在头部插入元素  返回新数组长度 原数组被修改
~~~



~~~javascript
// 连接数组 不会改变数组 返回新的数组
concat()   

var a = [0,1];
var a1 = [2,3];
var b = a.concat(a1)
console.log(b);  // [0, 1, 2, 3]

a.concat( [3,3],[3,4], 3, 4, 5 )
// 返回 (9) [0, 1, 3, 3, 3, 4, 3, 4, 5]
~~~

~~~javascript
// 删除元素的同时添加元素  原数组被修改 最后一个参数可以省略
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
a.reverse() // 颠倒数组顺序  原数组被修改 并返回该数组
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
    console.log("index: " + index + ",value: " + value)
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

~~~html
描述字符模式的对象，字符组成的特殊格式的字符串

普通字符串"a1"	正则`/a[0-9]/`

标志字符：g:全匹配	i:不分大小	m:多行匹配

字符模式组成：`A~Z a~z 0~9 + - * / () {}  ? = ^`等等  元字符

d 数字 w字母 s空白字符串
~~~



2.定义

~~~javascript
1.直接量（推荐）
/字符模式/标志字符

2.RegExp类
组合字符串或者接受
new RegExp("字符模式","标志字符")
~~~



3.字符模式

~~~javascript
1.字符范围
[abc][0-9][^abc] 比配的一个字符

var s = "asdf sfda gaer sga"
s.match("asd") // 会返回一个数组
s.match(/asd/) // 和上面效果一样
s.match(/[asd]/) // 匹配到a、s、d中任意一个就返回
s.match(/[^asd]/) // 没有匹配到a、s、d中任意一个就返回
s.match(/[0-9 a-z]/) // 中间的空格也是被匹配的
~~~



~~~javascript
2.逻辑或 |
/ (abc) | (123) /

var s = "asdf sfda gaer sga"
s.match(/asd|sfd/) // 匹配到asd就返回
s.match(/(asd)|(sfd)/) // asd sfd都匹配试试
~~~



~~~javascript
3.重复
+ 至少一个 1+
* 零个或多个 0+
? 零个或一个 0/1
{x} x个
{x,y} x到y个
{x,} 至少x个
默认贪婪模式 加上?变成懒惰模式
 
 var s = "tt tct tcct tccct tcccct tcccct"
 s.match(/tc+t/)  // 匹配到就返回
 s.match(/tc+t/g)  // 全部匹配完
 s.match(/tc{2,4}t/g) 
 
 . 代表任意单字符
 s.match(/t.+t/g) // ["tt tct tcct tccct tcccct tcccct"]
 s.match(/t.+?t/g)  //  ["tt t", "t t", "t t", "t t", "t t"]
 s.match(/t.*?t/g)  // ["tt", "tct", "tcct", "tccct", "tcccct", "tcccct"]
~~~



~~~javascript
 4.限定词
第一个单词^  注意是单词
最后一个单词$

 var s = "tt tct tcct tccct tcccct tcccct"
s.match(/tc*t/g) // ["tt", "tct", "tcct", "tccct", "tcccct", "tcccct"]
s.match(/^tc*t/g) // ["tt"]
s.match(/tc*t$/g) // ["tcccct"]
~~~



~~~javascript
5.声明量词 （条件判断）
(?=as) 目标是取?的内容
(?!as)

var s = "tt:cc qq=cc" // 想取到tt
s.match(/\w+(?=:)/) // ["tt", index: 0, input: "tt:cc qq=cc", groups: undefined]0: "tt"groups: undefinedindex: 0input: "tt:cc qq=cc"length: 1__proto__: Array(0)
~~~



~~~javascript
 6.表达式分组及引用
 s="a=1,b=2,c=d"
s.match(/\w+=\d+/) // ["a=1", index: 0, input: "a=1,b=2,c=d", groups: undefined]
s.match(/(\w+)=(\d+)/) // ["a=1", "a", "1", index: 0, input: "a=1,b=2,c=d", groups: undefined]
s.match(/(?:\w+)=(\d+)/) // ["a=1", "1", index: 0, input: "a=1,b=2,c=d", groups: undefined] 
?: 就不会被存到数组

引用
var s = "aa:bb bb:ss cc:tt tt:cc"
s.match(/(\w+):(\w+) \1\2/) // 按左括号的顺序 
// ["cc:tt tt:cc", "cc", "tt", index: 12, input: "aa:bb bb:ss cc:tt tt:cc", groups: undefined]
~~~



[MDN正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)




