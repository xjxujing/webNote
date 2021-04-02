[TOC]

## js背景及知识结构

1. 什么是js

   - 一种轻量级编程语言

   - 借鉴java的结构和语法

   - 可插入在html中 编译 js解释器

   - 容易学

2. js能干什么

   - html+css 负责网页内容

   - js 负责网页行为

   ​	验证表单

   ​	检查浏览器

   ​	创建cookie

   ->>实现和用户的交互

3. js是由什么构成的--》怎么学习js

   - 逻辑处理  ECMAscript （欧洲计算机制造协会）

   ​	负责逻辑运算 定义变量 值 运算 数组 对象 类

   - 负责DOM操作 修改html元素  ->库   API
   - 负责和浏览器（BOM）交互 获得浏览器信息 

## 怎么使用js

1. script外部引用src

2. 直接加<script>标签

3. 在标签中加属性

   onclick = "     "

## 语法

1. 用字母、数字、特殊符号组成的命令

2. 字母大小写敏感

3. 一行一个命令 

   或者分号区分命令

   最好都用分号

4. 注释

   //单行注释

   /*   */ 多行注释

5. 输出

   alert()

   console.log()

### 值

- 数字
  + 整数
  + 小数 浮点数
- 字符串
- 布尔值

### 变量

直接量

变量是容器

​	把直接量（数字、字符串）打包下 变成对象  产生一个地址  放在变量中

#### 变量声明

创建变量	var x  

给变量一个值	x = "hello world"

​	可以写在一起	var x=1

​	可以同时声明多个变量	var x, y ,z

​											var x=1,y=2,z=3

变量名规则

- 数字、字母、下划线组成
- 第一位是字母或者下划线 一般是字母开始
- 区分大小写

### 运算符

- 算数运算符

  +-*/	还有取模%

  顺序	从左往右  先计算括号里面的  先乘除后加减  

  加法注意：

  ~~~javascript
  1 + "a"
  //有字符串 左右两边当字符串能处理  结果是1a
  
  1 + false 
  //有布尔值 true=1 false=0  结果是1+0=1
  
  false + "a"
  //结果是 falsea
  
  //- * /都是转成数字
  
  ~~~

- 赋值运算符

  a = a + 10

  a += 10

- 比较运算符

  ~~~javascript
  a = 1 > 2
  //a = false
  
  2 >= 2
  //true
  
  0 == false
  //返回true   == 比较值  两边都转成数字
  
  0 === false
  //返回false  0是数字  falase是布尔值   === 比较类型和值
  
  //  !=
  ~~~

- 逻辑运算符

  &&    两边是布尔值  得到的结果也是布尔值  true && true  返回true

  ||     a  ||  b 中一个true  返回true

  !    

- 按位运算符

  后面再说
  
- 自增运算符

  ~~~javascript
  ++a;
  a++;
   
  ~~~

  一元运算符操作一个变量  ++a

  二元运算符操作两个变量   a+b

  一元运算优先级高于二元运算

### 数据类型

`javaScript`是弱类型语言

- 目前有 6 种基本类型：

number:    int	float

string:  字符串

boolean: 只有两个值  true false

null: 只有一个值  对象是空 null

undefined: 只有一个值  undefined  变量未定义  var x   x这时候是undefied

- 1 种引用类型

object   除了上面，都是对象

null = = undefined   结果是true

`Number() String() Boolean()` 创建的是对象

#### 判断数据类型

常用4种方式

- `typeof`

  注意null function

  ​	`typeof null `会判断的是`"object"`

  ​	`typeof function(){}` 判断的是`"function"`

  无法判断对象的具体类型

- `Object.prototype.toString.call(x)`

  推荐使用此方法

  怎么判断数据类型是数组？ 用该方法

  不判断自定义的对象的具体类型   可以判断正则表达

- `instanceof`

  仅能判断对象的具体类型

  `1 instanceof Number ` 返回`false`

- constructor

  `(1).constructor`   返回`Number`

  查看对象对应的构造函数

  很方便造假
  
  
  
  ~~~javascript
  // 判断数组的方式
  var arr = [1,2,3]
  
  console.log(arr.constructor == Array);//返回true,这种方法判断数组不适用不同的window作用域（不同文档下）
  
  Object.prototype.toString.call(要判断的对象名) == "[object Array]"; //该方法判断数组最好
  
  
  // 类数组转数组
  Array.prototype.slice.call(类数组)
  Array.from(类数组)
  [...类数组名]
  ~~~
  
  

原始类型

- 数字 Number
- 字符串 String
- 布尔值 Boolean

- 对象 Object

  系统自带的 

  - 数组 [ ]  把原始类型排列好

  有下标  从零开始

  - 函数

  自定义对象  {}

~~~javascript
var a
//这时候的数据类型是undefined

var a = null
//表示a 是对象（Object）, 是个空对象

typeof()
//看数据类型
~~~



### 自定义数据类型判断

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





### 数据类型的转换

- 转数字

  Number()  显示转换

  1 + "a"  隐式转换

- 转字符串

  String()  显示转换

  a.toString()  系统自带的





### 流程控制

条件判断

~~~javascript
if(表达式){
    语句
}
~~~

switch选择

~~~javascript
switch(表达式 的值){
    case: 1:
     	a = 1; 
        b ++;
        break;
        //break跳出
    case: 2:
        break;
    default:
        a ++;
        //默认做啥啥啥
}
~~~

循环

重复多次的做事情

~~~javascript
for( var a = 1; a <= 10; a++){
	console.log("XXXX");
}

// b< 10才是真正判断有效的次数
for(var a = 0, b= 0; a<5, b<10; a++, b++) {
    k = a+b; //18 a、b都是9
} 
~~~



~~~javascript
var a = 1;
  while(a <= 10){
  	console.log("XXXX");
  	a = a+1;
  }

  while(true){
      console.log("XXXX");
      a = a+1;
      if(a > 10){
          break;
      }
  }

  //break会跳出while或者switch的大括号 的结束的大括号

//while和for的区别 while一般用于不知道循环次数

  //continue跳到开始的大括号 开始执行循环

  do {
     console.log("XXXX");
      a = a+1; 
  }while(a <=10);
~~~



## 函数

代码的复用，把特定功能的语句打包放在一起

### 定义

~~~javascript
//定义了一个函数
function 函数名(参数){
	执行的语句
}

//调用方式一
函数名()；

//调用方式二
var fname = 函数名；
fname();
~~~

### 三种函数声明方法

~~~javascript
// 1 function 命令
function print(s) {
  console.log(s);
}

// 2 函数表达式
var print = function(s) {
  console.log(s);
};

var print = function x(){
  console.log(typeof x);
};
x // ReferenceError: x is not defined
print() // function
// 采用函数表达式声明函数时，function命令后面不带有函数名。如果加上函数名，该函数名只在函数体内部有效，在函数体外部无效。

// 3 Function 构造函数
var add = new Function(
  'x',
  'y',
  'return x + y'
);

// 等同于 
function add(x, y) {
  return x + y;
}
~~~



### 实参、形参

- 默认值问题（重要）

~~~javascript
function slogan(num, time){
    // if(time == undefined){
    //		time = 7;
	//	}
    time = time || 7;   //给time一个默认值
    
    for(var a = 1; a <= num; a++){
        console.log("XXXX");
    }
}

slogan(10);
~~~

### 动态参数

~~~javascript
//函数调用
// 传参 以数组的形式  存在arguments

// 实现任意参数的求和
function add(){
    var z = 0;
    for(var i = 0;i < arguments.length; i++){
        z += arguments[i];  
    }
    return z;
}

var rs = add(1,2,4,5,23);

// 完善后的写法
function add() {
    let result;
    let len = arguments.length;
    if (len) { // 有传入参数才会计算
        result = 0;
        for (let i = 0; i < len; i++) {
            result = result + arguments[i];
        }
    }
    return result;
}
~~~



### 返回值

~~~javascript
function add(x,y){
	var z = x+y;
	return z;
}
~~~

### 作用域

可访问变量的集合 （对象、函数）

1. 全局作用域（全局变量）

2. 局部作用域（局部变量）

注意函数内定义变量不加 var，会被认为是全局变量

### 预解析

js 不是编译类的语言  是解析语言

浏览器（ js 解析器）获得 js 文件时 ，不立刻执行代码 ，先全篇快速扫描 ，针对变量预先解析

**变量声明**、 **函数声明提前**

函数内也会预解析

~~~reStructuredText
先扫定义的变量  函数声明
	再扫函数声明中的变量
		有var定义的做局部变量   没有var的做全局变量 并且放在函数声明前 
~~~

### 闭包

解决变量私有化问题

有全局变量的的生命周期

起到局部变量的作用

**闭包是指有权访问另一个函数作用域中变量的函数**

~~~javascript
// 计数器每次调用都加一，counter 定义在里面，让这个方法是完整的！
function add(){
    var counter = 0;
    counter++;
    console.log("counter  = " + counter)
}
// 这样写，counter 一直是 1


// 换种写法
function add(){
    var counter = 0;  //局部变量
    
    plus = function(){  //此处才真正有效 需要调用这个方法
        counter ++; //伪全局变量  有全部变量的生命周期
        console.log("counter = " + counter);
    }
}
// plus 没有加 var，是全局函数

// 调用方式
add();  // 先调用add() counter 初始化为 0
plus(); // 然后就可以实现了
plus(); 

// 注意外面不能直接访问counter，counter是局部变量


// 再换种写法
function add(){
    var counter = 0;  // 局部变量
    
    var plus = function() {  // 此处才真正有效 需要调用这个方法
        counter ++; // 伪全局变量，有全部变量的生命周期
        console.log("counter = " + counter);
    }
    return plus;
}

var plus = add(); // 前面方法中定义的 plus 是局部的，这里调用 add 后返回值赋给另一个变量，可以是其他名字
plus();
plus();


// 闭包写法的由来如下

// 上面的写法简写
function add(){
    var counter = 0;  //局部变量
    
    return function() {  //此处才真正有效 需要调用这个方法
        counter++; //伪全局变量  有全部变量的生命周期
        console.log("counter  = " + counter);
    }
}
// 函数的立即执行：函数声明和函数执行放在一起
add()();

// 把 add 换成本身的内容,再加上var plus = , 得到闭包传统（标准）的写法
var plus = (function() {
    var counter = 0;  //局部变量
    
    return function(){  //此处才真正有效 需要调用这个方法
        counter ++; // 伪全局变量  有全部变量的生命周期
        console.log("counter  = " + counter);
    }
})();
~~~



再扫函数体的局部变量

​	有var 事

## 对象

变量 var

函数 function    一堆语句的集合

对象： 一堆变量  + 一堆函数的集合

### 对象的创建

~~~javascript
// 1 通过”字面量“方式创建
var obj1 = {
	x: 0,
	y: 1,
    z： function(){。。。}
}
// 属性名(string)： 属性值,
// 属性名有特殊字符必须加引号

var person1 = {
    name: "xiaoming",
    sex: "male",
    age: "19",
    slogan: function(){
        console.log("wo shi xiaoming");
    }
}

// 2 通过构造函数创建对象
function Person() {
    this.name = "dongjc";    //通过this关键字设置默认成员
    var worker = 'coding';    //没有this关键字，对象创建后，该变量为非成员
    this.age = 32;
    this.Introduce = function () {
        alert("My name is " + this.name + ".I'm " + this.age);
    };
    alert("My name is " + this.name + ".I'm " + this.age);
};
var person = new Person();
person.Introduce();

// 3 通过Object创建
var person = new Object();
person.name = "dongjc";
person.age = 32;
person.Introduce = function () {
        alert("My name is " + this.name + ".I'm " + this.age);
    };
person.Introduce();

参考阅读：
https://www.cnblogs.com/dongjc/p/5179561.html
~~~

类

- 系统自带的  Array

- 自己创建的

### 对象的属性的基本操作

增删改查  遍历

~~~javascript
//查  用 . 或者 []
person1.name  
//必须引号的必须用[]
person1["name"]


//改
person["name"] = "xiaoming2";

//加
直接赋值。。

//删
delet person1.name

//遍历
for (var pN  in person1 ){ // 这是遍历索引
    console.log("person1的属性名：" + pN + "值 = " + person1[pN] );
}

for value of result中的value是值
for value in result的value是索引
~~~



### 引用和赋值和类

赋值地址  就是引用

~~~javascript
var person1 = {
    name: "xiaoming",
    sex: "male",
    age: "19",
    slogan: function(){
        console.log("wo shi xiaoming");
    }
}

// 现在创建person2

// 用类的形式创建对象
// 创建一个构造函数(类),再new一个
var person2 = new PersonClass();

// ES5中没有关键词class  ES6有关键词class

// 把函数当做类来使用
function PersonClass(){
    this.name = "xiaoming";  //为了区分函数和类  
    this.sex = "male";
    this.age = "19";
    
    this.slogan = function (){
        console.log("wo shi xiaoming");
    }
}
var person1 = new PersonClass();
var person2 = new PersonClass();
person2.name = "xioaming2";


// 构造函数方式
function PersonClass(pName, pSex, pAge){
    this.name = pName || "xiaoming2";  // 设置了默认值
    this.sex = pSex;
    this.age = pAge;
    
    this.slogan = function (){
        console.log("wo shi " + this.name);
    }
}
var person1 = new personClass("xiaoming", "male", 18);
~~~



### 系统自带的构造函数（类）

~~~javascript
var obj1 = {};
var obj2 = new Object();  // 一个空对象


// 万物皆对象  值 + 方法
Number()
	.toString()
Stiring()
Boolean()
Array()

Date()

var data1 = new Date();

date1.getDay();

// 计算代码性能：耗时
var time1 = new Date(); //获得当前时间 本地电脑
var t = 0;
for(var i = 0; i< 100000; i++){
   	t++;
}
var time2 = new Date();
var  n = time2.getTime() - time1.getTime();

// Math不是类 不能new  是命名空间 Math是一个全局对象
Math.radom(); // 0-1 之间的浮点数
Math.radom()*10
// 1-10 之间的整数
Math.floor(Math.random() * 10 + 1)
~~~





## 命名空间

多个人一起

自己的方法都放在一个里面  var cc = {}

cc.age

系统提供的类  有好用的方法





## 表单

输入：内容

```
文本：普通	密码

单选框

多选框

下拉框	
```

提交：提交按钮

http超文本传输协议  保证浏览器和服务器的通信

浏览器主动请求 服务器接受后处理 返回请求结果 浏览器根据结果展示出来

GET POST请求

```html
<form action="" method="">
    <!-- action控制提交给服务器的是哪个网页 -->
    <!-- method默认GET方式  提交的内容放在网址里-->
    POST在控制台network->head可以看到信息
    用户名<input type="text" name="user">
    密码 <input type="password" name="pas">
    性别 <input type="radio" name="sex" value="">男
    	<input type="radio" name="sex" value="">女
    
    复选框
    <input type="checkbox" name="" id="" value="">看书
    <input type="checkbox" name="" id="" value="">吃饭
    <input type="checkbox" name="" id="" value="">睡觉
    
    下拉框
    <select>
        <option value="" value=""></option>
    </select>
    
    <!-- 提交按钮 -->
    <input type="submit">
    <!-- 这里的提交会在url显示 -->
  显示的是name=value 提交给后台（用户名和密码那里直接是输入框中的内容为value）
    post提交不会改变网址 会放在head头里面
</form>
```







## BOM

1.弹窗

```javascript
alert()  只有一个确认  要是字符串才能alert出来
confirm()  确认或取消 返回的是布尔值
prompt("输入啥啥啥"， "默认值啥啥啥")  什么都不输入返回null

都是同步  阻断式
```

2.获取浏览器导航栏信息

- url

```javascript
location.herf 完整的网址
location.toString()

Location.search
 包含URL参数的一个DOMString，开头有一个“?”。
Location.hash
包含块标识符的DOMString，开头有一个“#”
```

- 刷新页面

```javascript
location.reload() 刷新
location.replace()
location.href   当前页面url
```

- 浏览器历史

```javascript
history.back() 后退
history.forward() 前进
history.go() 正数前进 负数后退

history.length  查看有多少历史记录
```

- 浏览器信息 

```javascript
navigator 
关注userAgent字段
navigator.userAgent 查看浏览器信息
```

- 分辨率

```javascript
screen
屏幕大小height weight
浏览器屏幕 不包括系统下方任务栏 availHeight
```

3.计时器

```javascript
1 循环执行
var sil = setInterval(函数名, 时间);
停掉
clearInterval(sil);
```

```javascript
2 一次执行
var sil = setTimeout(函数名，时间)；
停止
clearTimeout();
```

例子

```javascript
var num = 0;
function add() {
    console.log("num = " + ++num)
} 
var sil = setInterval(add, 1000);

//设置10秒后停止
function end() {
    console.log("setTimeout clearInterval")
    clearInterval(sil);
}
setTimeout(end, 10000);
```



## DOM

文档对象模型

一、DOM树

人类理解的是`html`文件 

浏览器理解的是数据结构 DOM 树

	进行查找 修改 遍历 操作

Document
|------ Root Element：html
		|------ Element：head
				|------ Element：title
						|------ Text 
		|------ Element：body
				|------- Element：p
						|------ Text 

--document节点 有且仅有一个

--元素节点（标签节点） 改变该节点、改变样式

--文本节点



二、获取节点

三种常用的方法：

1.通过 id 查找

2.通过标签名查找

3.通过class名查找

~~~javascript
var p1 = document.getElementById("p1");
//返回的是节点

var ps = document.getElementsByTagName("p");
//返回的是数组

var p1 = ps[0];  
//与id获取的结果相同，是个节点

var  = document.getElementsByClassName("txt");
//返回的数组
~~~

4.区别

- 返回结果不同

- id方式只能在document下使用

  tag、class可以在任意元素节点上使用

举例

~~~javascript
var div1 = document.getElementById("div1");
var ps = div1.getElementsByClassNme("txt1");
~~~



三、创建和删除节点

~~~javascript
//创建标签节点
var p = document.createElement("p");
//创建文本节点
var p1txt = document.createTextNode("p1");
p.appendChild(p1txt);

//添加标签节点
div1.appendChild(p);

//删除节点
var div2 = document.getElementById("div2");
div1.removeChild();

//自己删自己
div2.parentNode.removeChild(div2);
~~~

四、修改节点属性和内容

1 修改属性

~~~javascript
//html已经定义好的属性 对象的点 先获取后修改
var img1 = document.getElementById("img1");
img1.src

//注意
img1.className = 
//不能用class 因为是js的关键字

//css的属性获取
img1.style.width = 
txt.style.color = 

//修改自定义属性
   	//获取自定义属性的值
img1.getAttribute("属性名");
	//设置自定义属性 和 属性值
img1.getAttribute("属性名"， "属性值");

//删除属性
img1.removeAttribute("属性名")
~~~

2  修改内容

~~~javascript
var p1 = document.getElementById("p1");
p1.innerHtml = "文本内容"
//可以直接加标签
p1.innerHtml = "<a></a>" //会解析标签

//直接加文本
p1.textContent = "会是纯文本内容"
~~~



**数据结构**

线性：单链表    循环列表    队列    栈    数组

树形：二叉树 	平衡树 	红黑树 

网状：有向图	无向图	（寻路算法	A*算法 ）



## 事件

一、几个概念

- 事件源：产生事件的地方
- 事件的类型：点击 键盘
- 事件的对象 ：记录好 发生事件的信息
- 事件的处理程序：函数
- 注册：把以后会发生的事情 先提前报备

二、注册

实现注册的两种方式：

1. 通过`html`的属性
   - 属性名： on+事件的名字
   - 属性值：方法名

​	直接在`html`设定

```html
<div onclick="add()"></div>
```

​	通过`js`元素对象设定

```javascript
var num = 0;
function add() {
    console.log("点击: "+ ++num)
}
```

对象的时候只需要写函数的名字就可，不用带括号

2. 通过调用系统提供的方法

```javascript
div1.addEventListener("事件类型"， 函数， 事件的处理方式)
//事件处理方式是布尔值 false冒泡  true捕获

div.removeEventListener()
//删除事件
//ie8及之前不支持addEventListener()
//用attachEvent() detachEvent()
```



三、事件函数和事件对象

事件函数 有 事件对象`event`：

提供了事件的详细信息：

- 具体事件发生的元素
- 鼠标的位置
- 点击的状态
- 键盘的按键

```javascript
MouseEvent  
//基于屏幕左上角  多个屏幕是合并屏幕的位置
screenX
ScreenY
//基于浏览器左上角
ClientX
ClientY

KeyboardEvent
//code是对应的按键的值

//ie8及之前的不支持event参数
//在事件函数中加上windows.event;可以按照下方的方式写
var e = event || window.event
```

- 注意有的事件对象会有默认值

举例

a标签默认点击连接后跳转到新页面

我需要的是当前页面的某些刷新

这时候需要取消默认值

```javascript
//取消默认操作
event.preventDefault();

//a.onclick添加事件 用：
return false;
//只针对a.onclick才可以使用  addEventListener无效

//ie8
event.returnvalue = false;
```



四、事件的传播

互相嵌套的标签，只有被点的标签才能发生点击事件？

默认情况下，点击页面的节点，在传播路径上的标签 ，都会监听到对应的事件

1.传播路径

- 事件流：接受事件的顺序

- 两个阶段

  捕获

  从起始点传播的目标位置

- 冒泡

  从目标位置传播到起始点

  addEventListener

  注意：并不是所有都有冒泡事件 如键盘的输入时间

​	终止冒泡事件`e.stopPropagation();`

2.事件代理

```javascript
event.target
//只在一个父级元素绑定事件，就可以控制子元素的事件，性能优化

点击li时，会冒泡到ul,触发ul的绑定的点击事件
```









## 引入js的两种方式

1. 嵌入代码

   可以有多个代码块

2. 引入外部文件

   下载

   解析

   执行



## js加载模式

### 阻塞加载

页面显示慢



### 延迟加载

表示脚本可以延迟到文档完全被解析和显示之后再执行

单开一个线程（ 并发）  进行下载、解析（加载的概念包括了下载和解析以及执行？）

DOM树结束后 再执行

~~~html
<script defer src="1.js"></script>

<!-- xhtml严格的写法 -->
<script defer="defer" src="1.js"></script>

效果和把<script></script>放在最后一样
~~~



### 异步加载

立即下载脚本，但不应妨碍页面中其他的操作

单开一个线程（ 并发）  进行下载、解析  解析完成就可以塞回去执行

~~~html
<script async src="1.js"></script>

<!-- xhtml严格的写法 -->
<script async="async" src="1.js"></script>
~~~

区别

| 延迟加载 defer                                               | 异步加载 async                                               |
| ------------------------------------------------------------ | :----------------------------------------------------------- |
| 1 并发<br />2 多个js,按定义的顺序执行<br />3 文档解析完才执行<br />4 在DOMContentLoaded事件之前执行完<br />5 只支持外部引入，IE7以前的除外 | 1 并发<br />2 多个js，不一定按顺序执行<br />3 加载完就执行，在load事件之前<br />4 在load事件之前执行完<br />5 只支持外部引入方式 |





## 数字

![1558531255920](E:\笔记\img\1558531255920.png)

0.1+0.2 = = 0.3 返回false

由于转成二进制存储，导致精度丢失

整数没有精度丢失的问题

标准  IEEE-754  制定的  会有精度问题

0.1+0.3 ==  0.4    返回true   就像1/3 + 2/3 =1一样   精度互相叠加 抵消

实际生活中转成整数  换单位  小数变整数   最后显示再换回来单位

确定小数位数math方法

科学计数法

typeof  NaN    返回number

### 进制

~~~javascript
// 二进制  0b开头
var x = 0b1010

// 八进制  0开头
var x = 012

// 十六进制  0x开头
var x = 0x00A


2^10 = 1024
计算机最小存储计量单位是 bit
1个字节B = 8位  utf-8 1个汉字 3个字节
(1Byte = 8 bit)
1024Bytes(1024字节) = 1kB
1024kB = 1MB
1024MB = 1GB
TB PB ZB YB BB NB DB
~~~



2^53就是最大安全值

前面的1位代表正负

10位代表指数部分

### 十进制转二进制

#### 正整数	

除以二取余数  倒序

#### 小数	

乘二取整 正序

​	0.2  转成二进制

​	0.2 * 2       0

​	0.4 * 2		0

​	0.8 * 2		1     1.6剩下0.6继续算

​	0.6 * 2		1  	

​	0.2 * 2 		0         无穷无尽

00110........

#### 大于1的小数

拆成整数和小数部分分别计算

#### 负整数

正整数的基础上，取反并加1



## 字符串

组成： 单或双引号包裹的Unicode字符、数字、各种符号

二进制一一对应字母     用128个字符  并且只占用1个字节（8位）来表示这些字母  --》 ASCII   默认8位来做字符的映射关系  最多能表示2^8（256）个字符

产生Unicode字符  用2个字节(16位)  可以映射2^16（65536）个字符

​	UTF-8是编码规则

注意：

- 在一行内   不然用 \ 换行
- 引号要成对
- 字符串中的字符都有自己下标的位置，可以用数组形式取到
- 特殊字符要用转移字符表示：换行、单引号

转义字符：改变字符本来的意思

\r  回车

字符串的比较  很重要   在MDN上查看

[链接](<https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String#Comparing_strings>)



## 运算规则

运算规则

1. 先完成优先级高的

2. 同一优先级从左往右

   

优先级简单记忆：

- 一元（a++） 二元(a+b) 三元(?:) 运算符

- 操作的元素越多，优先级越低

- 赋值运算最低

  void:  表明一个运算没有返回值

  

## 堆和栈

数据结构的栈和堆，  数据的先进后出、先进先出

内存分配的栈和堆：

栈：系统自动分配，物理内存连续的

堆： 动态创建，物理地址不连续，程序自行维护





## 函数



## 函数的参数和arguments



## 递归

函数自己调用自己 并且要有终止条件（保证不会死循环）

~~~javascript
function f(n){
    console.log(n);
    if(n <= 1){
        return;
    }
    return f(n-1)
}

//运行f(3),按顺序打印3 2 1 
~~~

递归思维：把复杂的问题，拆成越来越简单的问题，直到能够获得结果

​	栈的概念：先进后出（不是存储，是数据结构）



### **利用arguments.callee实现递归**

~~~javascript
function factorial(num) { 
    if(num<=1) { 
        return 1; 
    }else { 
        return num * arguments.callee(num-1); 
    } 
} 

~~~

[参考](<https://blog.csdn.net/qq_16339527/article/details/53231725>)





## 闭包

三要素

- 嵌套结构的函数
- 内部函数访问了外部函数的变量
- 在外部函数的外面，调用内部函数

~~~javascript
// 闭包函数
function f(){
    var a = 1;
    function e(){
        a ++;
        console.log(a);
    }
    return e;
}
var fe = f();
fe();


// 闭包另一种写法
var fee;
function f(){
    var a = 1;
    fee = function e(){
        a ++;
        console.log(a);
    }
// return e;  //不一定要有返回值
}
// var fe = f();
// fe();
f()
fee();	


// 普通函数
function f1(){
    var a = 1;
    function e1(){
        a ++;
        console.log("普通函数" + a);
    }
   	e1();
}
~~~

概念

​	闭包是由函数以及创造该函数的词法环境组合而成

​	这个环境包含了这个闭包创建时所能访问的所有全局变量

简单的类的特性

  会产生闭包对象

~~~html
常见错误
循环内使用闭包函数
解决方法
1.使用立即执行函数
2.使用多个闭包函数
<ul>
    <li>li1</li>
    <li>li2</li>
    <li>li3</li>
    <li>li4</li>
    <li>li5</li>
</ul>

<script>
function showID(id){
    console.log("li: " + id );
}
function setClick(){
    var ary = document.getElementsByTagName("li");
    for(var i = 0;i< 5; i++){
        ary[i].onclick = function(){
            showID(i + 1);
        }
    }
}
</script>
最后打印的都是  li : 6 

重新写;
<script>
function showID(id){
    console.log("li: " + id );
}
function clickMake(id){
    return function (){
        showID(id);
    }
}    
function setClick(){
    var ary = document.getElementsByTagName("li");
    for(var i = 0;i< 5; i++){
        ary[i].onclick = clickMake(i+1);        
            // function(){
           //  showID(i + 1);
      //   }
    }
}
</script>


立即执行函数
<script>
function showID(id){
    console.log("li: " + id );
}
function setClick(){
    var ary = document.getElementsByTagName("li");
    for(var i = 0;i< 5; i++){
        // 形成匿名函数的闭包
        (function (){
            var id = i
            ary[i].onclick = function(){
                showID(i + 1);
            };
        })
        // ary[i].onclick = clickMake(i+1);
    }
}
</script>


es6大法好！！闭包消耗性能
<script>
function showID(id){
    console.log("li: " + id );
}
function setClick(){
    var ary = document.getElementsByTagName("li");
    for(var i = 0;i < 5; i++){
        let id = i;
        ary[id].onclick = function (){
            showID(id + 1);
        }

        // 形成匿名函数的闭包
        //(function (){
            //var id = i
            //ary[i].onclick = function(){
                //showID(i + 1);
            //};
        //})
        // ary[i].onclick = clickMake(i+1);
    //}
}
</script>

~~~
