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



### 函数

箭头函数和this、参数扩展、数组展开（vue属性映射）

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



## 原生对象扩展

Array

~~~html
map 映射 	一一对应 []
reduce	缩减到一个
filter	过滤 不一定返回几个
forEach	没有返回值 遍历
~~~



map

~~~javascript
// 映射成绩是否及格
let arr = [68,53,12,98,65];
let arr2 = arr.map(function(item) {
    if(item >= 60) {
        return "及格";
    }else {
        return "不及格";
    }
    // return item >= 60 ? "及格" : "不及格";
});
console.log(arr, arr2);


等同于:
let arr = [68,53,12,98,65];
let arr2 = arr.map(item => item >= 60 ? "及格" : "不及格"); // true转成包邮 false不包邮 这种的转换
console.log(arr, arr2);
~~~



reduce

~~~javascript
// 求和
let arr = [68,53,12,98,65];
let result = arr.reduce(function (tmp, item, index) {
    return tmp + item; // p98
});
alert(result); //296  购物车求和

// 求平均数
let arr = [68,53,12,98,65];
let result = arr.reduce(function (tmp, item, index) {
    if(index == arr.length - 1){
        return (tmp + item)/arr.length;
    }else {
        return tmp + item;
    }
});
alert(result); //59.2
~~~



filter

~~~javascript
let arr = [68,53,12,98,65,83,16];
let result = arr.filter(item => {
    if(item%2 == 1) {
        return false;
    }else {
        return true;
    }
});
// let result = arr.filter(item => item%2 == 0);
alert(result); //只剩偶数
~~~



forEach

~~~javascript
let arr = [68,53,12,98,65,83,16];

arr.forEach((item,index) => {
    console.log(`第${index}个是${item}`); // 模板字符串
});
~~~



## JSON对象

~~~javascript
JSON.stringify({a: 12,b:5})   转成字符串
JSON.parse() // 解序列化 转成json 注意要是标准写法 双引号

key和value必须要有双引号，不过js中可以简写
双引号在有的语言中表示字符
~~~

