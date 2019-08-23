[TOC]



JQuery中没有事件，都变成了方法

~~~javascript
// 点击事件的处理
JQuery.prototype.click = function () {
    this.onclick = function () {}  
}
~~~





## 简介

**DOM操作复杂**
DOM元素的获取
给DOM元素添加属性
DOM元素的运动效果

**兼容问题**
浏览器宽高
事件event获取源
设置监听事件

解决兼容、操作简单、功能丰富
jQuery是一个高效、精简并且功能丰富的 JavaScript 工具库

[jQuery中文官网](<https://www.jquery123.com/>)   [官方网站](http://jquery.com/)

**特点**
语法简单、开发高效
文件够轻、短小精悍
插件丰富、拓展性强



## 引用及DOM选择

一、引用

1.离线引用	直接下载JQuery到本地

~~~html
<script src="jquery-3.4.1.js"></script>
<script>
jQuery();
</script>
~~~

2.前端管理工具引用	npm

3.在线引用	CDN

~~~html
<script src="https://code.jquery.com/jquery-3.4.1.js"
        integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script>
jQuery();
</script>
~~~



二、DOM选择

~~~html
<script src="jquery-3.4.1.js"></script>
<script>
    console.log( document.getElementById("dom").innerHTML )

    // jQuery("#dom")返回的不是原生dom,[0]才是原生dom
    console.log( jQuery("#dom").text() );

</script>
~~~



~~~html
<div id="dom">hi there</div>
<ul>
    <li>li</li>
</ul>

<script src="jquery-3.4.1.js"></script>
<script>
    console.log( document.getElementById("dom") )

    // 支持CSS3选择器
    console.log( jQuery("ul > li, div").text() );  // 打印hi thereli

</script>
~~~



~~~html
<div id="dom">hi there</div>
<ul>
    <li>li</li>
    <li>li</li>
    <li>li</li>
</ul>

<script src="jquery-3.4.1.js"></script>
<script>
    var oLi = document.getElementsByTagName("li");
    console.log( $(oLi) );
</script>
~~~



$()可以放什么？

1.可以放CSS选择器，支持CSS3（字符串）

2.可以放原生的dom对象（类数组）

3.可以放类数组、数组（只要有索引值）

4.可以放函数并执行（DOM解析完后就执行）

5.可以放空值null、undefined、对象

~~~html
<ul>
    <li>li</li>
    <li>li</li>
    <li>li</li>
</ul>

<script src="jquery-3.4.1.js"></script>
<script>
    $(function () {
        console.log( $("li").text() )
    })
    // 上面的就是按照下面的方式， 等价
    $(document).ready(function () {
        console.log( $("li").text() )
    })
</script>
~~~



## 整体框架封装

1.如何全局使用JQuery

2.如何无 new 操作

3.改变init原型

4.链式操作

~~~html
<div id="dom">hi there</div>
<!-- <script src="jquery-3.4.1.js"></script> -->
<script>

//1.闭包 2.命名空间，，jquery采用闭包的方式
(function () {

    window.jQuery = window.$ = jQuery;

    function jQuery(id) {
        return new init(id);
    }


    var init = jQuery.prototype.init = function init(id) {
        // console.log(id);
        var dom = document.getElementById(id.slice(1));
        // console.log(this); 返回的是Window对象
        this[0] = dom;
        this.length = 1;
        return this;
    }

    jQuery.prototype.text = function () {
        console.log("text");
        return this;
    }
    jQuery.prototype.css = function () {
        console.log("css");
        
        // 实现链式操作
    	return this;
    }

    // 改变init的原型
    init.prototype = jQuery.prototype;

})();

// 一个 函数执行后没有返回结果的话,返回undefined
console.log( $("#dom").css().text() ); //window.jQuery();

</script>
~~~



~~~javascript
// 实现链式操作
$("#dom").css("color","red").text()
~~~





## 文本属性

`text()`相当于`js`中的`innerText`   获取标签里面的文本   赋值可以赋一组  可填字符串、函数

`html()`相当于`js`中的`innerHTML`   获取标签里面所有的内容   赋值可以赋一组 可填字符串、函数

`val()`相当于`js`中的`value`   获取标签里面所有的内容   赋值可以赋一组  可填字符串、函数、数组   返回的是字符串

~~~html
取值
<div id="test">Hello</div>
<button id="btn">按钮</button>
<script src="./jquery-3.4.1.js"></script>
<script>
    $("#btn").click(function () {
        console.log($("#test").text()); // Hello 不传参 返回字符串
    })
</script>

改值
<div id="test">Hello</div>
<button id="btn">按钮</button>
<script src="./jquery-3.4.1.js"></script>
<script>
    $("#btn").click(function () {
        console.log($("div").text(1)); // 传参  返回JQuery对象
    })
</script>

~~~



~~~html
<div id="test">
    Hello
</div>
<div id="test2">Hr在吗</div>
<button id="btn">按钮</button>

<script src="./jquery-3.4.1.js"></script>
<script>
    $("#btn").click(function () {
        $("div").text(function (index, ele) {
            console.log(ele)  // 打印对应的text
            console.log(index) // 打印div的索引值
        });
    })
</script>
~~~



~~~html
<script>
    $("#btn").click(function () {
        console.log($("div").html()); // 只取第一个div的内容，不会遍历
    })
</script>
~~~



~~~html
<input type="text" value="YourName">
<button id="btn">按钮</button>
<script src="./jquery-3.4.1.js"></script>
<script>
   $("#btn").click(function () {
       console.log($("input").val())  // val()取值取第一个，赋值赋一组
   })

</script>
~~~



~~~html
请选出喜欢我的理由
<select multiple name="list" id="list"> // multiple可多选
    <option value="cute">可爱</option>
    <option value="tender" selected>温柔</option>
    <option value="no-reason">没有理由</option>
</select>
<button id="btn">按钮</button>

<script src="./jquery-3.4.1.js"></script>
<script>
   $("#btn").click(function () {
       $("select").val(["no-reason"])  //点击按钮后，选择框变成没有理由
   }) 
</script>
~~~



## 特性属性

`prop()`相当于`js`的	`property`		只能获取特性  获取不存在的特性或自定义的属性是undefined

`attr()`	`setAttribute getAttribute`		获取属性 获取不存在属性是undefined

都可以放对象，都一次只能取一个

~~~html
取值 一次只能取一个
<div id="test" lecturer="amiee">test</div>

<script src="./jquery-3.4.1.js"></script>
<script>
// 获取id属性值
console.log( $("div").attr("id") );  //test  返回字符串
console.log( $("div").prop("id") );  //test		返回字符串

console.log( $("div").attr("lecturer") ); //amiee
console.log( $("div").prop("lecturer") ); //undefined
</script>
~~~



固有属性	html自带的属性（特性）：id	title	href	src	alt	type	value

新增属性	自定义的属性

~~~html
赋值
<div>test</div>
<p>pp</p>

<script src="./jquery-3.4.1.js"></script>
<script>
$("div").attr("id","test");// setAttribute   返回JQuery对象
$("p").prop("id","test"); // 相当于 p.id = test

</script>
~~~



~~~html
批量给值 放对象
<div>test</div>
<div>test</div>
<p>pp</p>
<p>pp</p>


<script src="./jquery-3.4.1.js"></script>
<script>
$("div").attr({
    id:"test",
    lecturer:"aimee"
});
$("p").prop({
    id:"test",
    lecturer:"aimee"  // 这个设置不上
});

</script>
~~~



实现点击一个复选框，其他框都选中：

~~~html
<ul class="star">
    <li class="title">
        <input type="checkbox">
        <span>明星</span>
    </li>
    <li>
        <input type="checkbox">
        <span>小盆友</span>
    </li>
    <li>
        <input type="checkbox">
        <span>刘昊然</span>
    </li>
    <li>
        <input type="checkbox">
        <span>易烊千玺</span>
    </li>
    <li>
        <input type="checkbox">
        <span>可爱多</span>
    </li>
</ul>

<div lecturer="amiee">test</div>

<script id="" src="./jquery-3.4.1.js"></script>
<script>
    $(".title input").change(function () {
        if ($(".title input").prop("checked")) {  // 这里prop返回的是true或者false attr()判断不出来
            $("ul input").prop("checked", true)
        } else {
            $("ul input").prop("checked", false)
        }
    })

    // 下面的四个选项全选的时候会自动加上第一个，或者下面四个有一个没选中，第一个都不会被选中
    var oInput = $("ul input").not(".title input");
    var len = oInput.length;

    oInput.change(function () {
        for (var i = 0; i < len; i++) {
            if ( !oInput.eq(i).prop("checked") ) {
                $(".title input").prop("checked", false);
                return;
            }
        }
        $(".title input").prop("checked", true);
    })

</script>
~~~



`removeProp()`相当于`js`的	`property`		只能删除通过prop设定的自定义属性  （自定义属性不会进DOM，是可以添加属性的，但是可以打印出来）   自带的属性不能清除，可以设置为空或者false

`removeAttr()` 从所有匹配的元素中移除指定的属性。	`setAttribute getAttribute`



## class属性操作

`addClass()`      可以放字符串、函数

`removeClass()`

~~~javascript
$("div").addClass("test").removeClass("test");
~~~



~~~html
<div>div</div>
<div>div</div>
<div>div</div>

<script id="" src="./jquery-3.4.1.js"></script>
<script>

$("div").addClass(function (index, className) {
    console.log(index+ "-" + className)
});
~~~



~~~html
偶数的li标签加上单独的样式
<ul>
    <li class="active">1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>

<script id="" src="./jquery-3.4.1.js"></script>
<script>

$("div").addClass(function (index) {
    if(index%2 == 0) {
        return "active test";
    }
});

</script>
~~~



~~~html
选购列表练习
<style>
    body,ul, li {
        margin: 0;
        padding: 0;
        list-style: none;
    } 
    li {
        width: 300px;
        margin: 10px;
        padding: 0 10px;
        line-height: 50px;
        background:#ededed;
        border-radius: 10px;
    }
    li span {
        float: right;
    }
    button {
        width: 100px;
        height: 25px;
        padding: 0 10px;
        background: pink;
        border-radius: 5px;
        outline: none;
    }
    .active {
        color: #fff;
        background: #23a1ec;
    }
</style>

<ul>
    <li>
        枸杞
        <span>￥300</span>
    </li>
    <li>
        可乐
        <span>￥200</span>
    </li>
    <li>
        红枣
        <span>￥200</span>
    </li>
    <li>
        菊花
        <span>￥200</span>
    </li>
    <li>
        啤酒
        <span>￥100</span>
    </li>
    <li>
        咖啡
        <span>￥200</span>
    </li>
</ul>
<button>BUY</button>
<script id="" src="./jquery-3.4.1.js"></script>
<script>
    $("li").click(function () {
        // console.log(this); this指向的是原生dom

        if( $(this).attr("class") == "active"){
            $(this).removeClass("active");
        }else {
            $(this).addClass("active");
        }
    })
</script>

~~~



`hasClass()`   	单独判断是否有某个类名，返回布尔值，只能放字符串

`toggleClass()`	 直接判断是否有某个类型  `toggleClass("active", true)`表示一直添加某类名，`false`为一直不添加

~~~javascript
选购的优化
$("li").click(function () {
    $(this).toggleClass("active");
})
~~~



## CSS样式属性

`css("样式名"，"样式值")`   改值	同时会返回对象

​	同时改多个样式（放对象）：`css( { "样式名"："样式值"，"样式名"："样式值"} ) `

`css("width")` 返回字符串（样式值）

`css（["width","background"])`	返回的是对象 （JQuery）

~~~html
取值
<style>
    .one {
        width: 100px;
        height: 100px;
        background-color: red;
    }
</style>
</head>

<body>
<div class="one"></div>

<script src="./jquery-3.4.1.js"></script>
<script>
    $(".one").click(function () {
        console.log( $(this).css("width") );  // 100,颜色是rgba()
    })
 //background 是复合属性
</script>
~~~



~~~html
改值
<script>
    $(".one").click(function () {
        console.log( $(this).css("width","300") );
        $(this).css("width","+=300");
    })
</script>
~~~



`width()` 	获取`content`   返回的数字

`innerWidth()`   获取`content + padding`  	`innerWidth("100")`  传值只会改变`content`的值

`outerWidth()`   获取`content + padding + border`		传值只会改变`content`的值

`outerWidth(true)`  获取`content + padding + border + margin`    

~~~javascript
取值
$(".one").css("width"); //"100px"
$(".one").width(); //100 number

改值
$(".one").width("200");  //px可加可不加
~~~



`offset()`	返回对象 包括`top` `left`     

`position()`  返回对象 包括`top` `left`     不能传值

~~~javascript
取值
$(".one").offset()   //返回one相对document的top, left值的对象 
$(".one").position()  // 返回相对于最近的有定位的父级的位置


改值
$(".one").offset({  // 相对父级定位
    top: "",
    left: ""
}) 
$(".one").position() // 不能传值
~~~



`scrollLeft()` 

`scrollTop() ` 滚动条往下滚动了多少

~~~javascript
取值
$(document).scrollTop()  // 返回数字
$(document).scrollLeft()  // 返回数字

改值
$(document).scrollTop(100) 
$(document).scrollLeft() 
~~~



浏览器文本阅读时自动向下滚动练习

~~~html
<script src="./jquery-3.4.1.js"></script>
<script>
    var newTop;
    var timer  = setInterval(function () {

        // 滚动条滚动的距离 + 浏览器窗口高度 = 文档高度  这里+1才行 视频中没有+1
        if( $(document).scrollTop() + $(window).height()+1 >= $("body").height()  ) {
            clearInterval(timer);
            console.log("clear");
        }else {
            newTop = $(document).scrollTop();
            $(document).scrollTop(newTop + 2);
            console.log(newTop);
        }
    },100)
</script>
~~~



## DOM的筛选遍历

`odd/even/first/last/eq`

~~~javascript
$("li:first").css("color", "red");
$("li").first().css("color", "red");

$("li:last").css("color", "red");
$("li").last().css("color", "red");

$("li:odd").css("color", "red");  // 选择索引值的奇数
$("li:even").css("color", "red"); // 选择索引值的偶数
// 选择索引值的奇数
$("li:eq(2)").css("color", "red");  // 填索引值 字符串也行，可以填负数
$("li").eq(2).css("color", "red"); 
~~~



`prev/prevAll/next/nextAll/siblings`

~~~javascript
$("li:eq(2)").prev("p").css("background","orange");// 设置上面的兄弟元素, 如果不是p,返回的JQuery对象length是0

$("li:eq(2)").prevAll("p").css("background","orange");

$("li:eq(2)").next("p").css("background","orange");

注意这种写法：
$("li").nextAll().css("background","orange");

$("li:eq(2)").siblings().css("background","orange"); //设置了所有的兄弟元素
~~~



`filter/not/is/slice/map/has`   可以放CSS选择器、函数、原生dom

~~~html
filter 符合条件的留下
<ul>
    <li>1</li>
	<li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
<script src="./jquery-3.4.1.js"></script>
<script>
$("li").filter(function (index, ele) {
    // if(index%2 == 0) {
    //     return true
    // }
    return index % 2 == 0;  //哪个返回真，哪个就留下
}).css("background", "red"); // 2 4 背景变了
</script>


not 符合条件的不要
<ul>
    <li class="test">1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
<script src="./jquery-3.4.1.js"></script>
<script>
$("li").not(".test").css("background", "red");
</script>


is 加强判断
<script>
$("li").is(".test");  // 只要li中有一个class值是test，就返回true,加强判断
</script>


slice 经常用
<script>
$("li").slice(2,4).css("background","red");  //  填索引值，选取索引值2 3 
</script>


// each遍历后，返回的还是选中的那组li  放在JQuery对象中
<script src="./jquery-3.4.1.js"></script>
<script>
var arr = [];
$("li").each(function (index, ele) {
    // console.log(ele); 打印的是li标签
    // this指向每个li
    arr.push( $(ele).find(".name").text() );

    // 拼接成字符串
    arr.join(",");
});
</script>


// map遍历后，返回的 取决于return的内容 放在JQuery对象中
<script src="./jquery-3.4.1.js"></script>
<script>
var arr = [];
$("li").map(function (index, ele) {
    // console.log(ele); 打印的是li
    if( $(ele).find(".age").text() > 16) {
        return ele;
    }
}).css("background", "red");
</script>

// has 后代中有没有符合条件的 父级 
<script src="./jquery-3.4.1.js"></script>
<script>
$("li").has("p").css("background", "red"); // 注意这里css生效的是子元素有p标签的li标签  返回的是符合条件的li并放在JQuery对象中
</script>
~~~



## DOM查询操作

`offsetParent/parent/parents/closest`

~~~javascript
parent 找直接父元素  传选择器
$("span").parent(); //返回父级元素，放在JQuery对象
$("span").parent("li"); // 找直接父元素是li的，找不到就返回空

parents  找祖先元素 传选择器
$("span").parents(); // 返回祖先元素，并放在JQuery对象
$("span").parents("li");

closest 找离自己最近的祖先元素 必须传参
$("span").closest("div"); // 是从自身开始找的，必须传参数：选择器 JQuery对象 原生dom

offsetParent()找离自己最近的有定位的祖先元素
一直找到html 返回JQuery对象 不能传参数
~~~



`children/find/end/add/addBack`

~~~javascript
$("ul").children(); // 获取直接子元素  返回的是JQuery对象
$("span").children(".test"); //只获取类名是test的子元素

$("ul").find(".test");   // 找后代元素 返回的是JQuery对象  有prevObject  Object > ul >li


$("ul").find("li:eq(2)").css("color","blue");
$("ul").find("li:eq(3)").css("color","red");

// 链式操作
$("ul").find("li:eq(3)").css("color","red").prevObject.find("li:eq(2)").css("color","blue");


// prevObject被封装成了一个方法  回退到上一个对象
$("ul").find("li:eq(3)").css("color","red").end().find("li:eq(2)").css("color","blue");


// 第一个和最后一个li想同时设置背景颜色
$("li:first").css("background","orange");
$("li:last").css("background","orange");

// 简写  add()可以传选择器、原生dom、JQuery对象 html标签 把他们一起放到JQuery对象中
$("li:first").add("li:last").css("background","orange");


// 想设置li下面的li  然后一起设置点击事件
$("li").css("color", "yellow").nextAll().css("color","blue").addBack().click
(function () {
    console.log( $(this).text() )
});
~~~



## DOM插入操作

`before()、insertBefore()、after()、insertAfter()`

~~~javascript
before()
$("li").before($("h2")); // 把h2标签插入到li标签前面  作为兄弟节点  可以放JQuery对象  返回的是li的JQuery对象

$("li").before(document.getElementsByTagName("h2")); //可以放dom

$("li").before(function (index, value) {
    console.log(index + "-" + value)
});// 可以放函数

$("<span></span>");  // 创建span元素
$("li").before("<span></span>");  // 直接创建span元素，并放在liq前面
~~~



~~~javascript
$("h2").insertbefore($("li"));  // 把h2放到li前面  返回的是h2的JQuery对象

after()、 insertAfter() 同上
~~~



`append()、appendTo()、prepend()、prependTo()`

~~~javascript
$("ul").append("<li>li2</li>");  //相当于appendChild()  插入到子元素的最后面
$("ul").append($("h2"));  // 可以放JQuery对象  返回的ul的JQuery对象


$("h2").appendTo($("ul")); // 把h2插入到ul中  返回的h2的JQuery对象

prepend()、prependTo()同上 插入到子元素的最前面
~~~



## DOM替换操作

`replaceAll()、replaceWith()`

~~~html
<ul>
    <li class="one">one</li>
    <li class="two">two</li>
</ul>
<li class="three">three</li>

<script>
$(".three").replaceAll($("two")); // 把two替换成了three
    
$(".two").replaceWith($("three")); // 把two替换成了three
</script>

~~~



## DOM删除操作

`empty()、remove()、detach()、clone()`

~~~javascript
$("ul").empty(); //把ul的所有子元素清空
$("ul").html(""); // 和上面效果一样
$("ul").text(""); // 和上面效果一样


var one= $(".one").click(function () {
	$(this).remove();   //点击当前元素，清除当前元素  返回JQuery对象
})


var two= $(".two").click(function () {
	$(this).detach();   //点击当前元素，清除当前元素 返回JQuery对象 还能返回绑定在DOM元素上的事件
})

$(".btn").click(function () {
    $("ul").append(function () {
        return one.add(two); // 注意返回后，在点击one无效，因为被remove删除绑定的事件了
    })
})

~~~



## DOM克隆操作

~~~javascript
var clone = $(".two").clone();
var cloneTrue = $(".two").clone(true);
var clones = "<li>li</li>"
$(".clone").click(function () {
	$("ul").append(clone);  // 克隆出来的元素不克隆事件
    $("ul").append(cloneTrue); // 把所有都克隆了
    //克隆元素会重新再添加一遍 不会增加
    
    
    $("ul").append(clones);  // 每次都新创建一个li
    // 如果拿到是索引 就是重复的添加一遍
    // 如果拿到的是新元素 就不断添加
})
~~~



## DOM包裹操作

`wrap()、wrapAll()、wrapInner()、unwrap()`

~~~javascript
// 给每个li都加div
$("li").wrap('<div class="box"></div>');


$("li").wrapAll('<div class="box"></div>'); //把所有li都放在JQuery对象中，整个添加div,破坏了原本的dom结构，顺序看li本身，按第一个来


$("li").wrapInner('<div class="box"></div>'); // 把div放在li里面

$("li").unwrap() // 解除包裹 不放参数 结构化标签不会被清除html body head
~~~



## 鼠标事件

`click/dblclick/contextmenu/event.which`

~~~javascript
$("li").click(function () {
    // this是原生dom
	console.log( $(this).text() );
})

$(document).dblclick(function () { //双击
    // this是原生dom
	console.log( $(this).text() );
})



event.which == 3 //右键

// 取消默认事件，右键可以不出现菜单  传不传e不确定
$(document).contextmenu(function (e??) {
    return false;
})

~~~



`mouseenter/mouseleave/mouseover/mouseout/mousedown/mousemove/mouseup`

~~~javascript
// 不冒泡
$("div").mouseenter(function () {
	console.log("enter");
}).mouseleave(function () {
	console.log("leave");
})

// mouseover/mouseout冒泡
$("div").mouseover(function () {
	console.log("enter");
}).mouseout(function () {
	console.log("leave");
})
~~~



~~~html
拖动鼠标，小方块也跟着移动练习
<style>
.box {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 100px;
    height: 100px;
    background: orange;
}
</style>

<div class="box">box</div>

<script src="./jquery-3.4.1.js"></script>
<script>

$(".box").mousedown(function (e) {
    // 返回当前元素相对document的top, left值的对象
    var offset = $(this).offset();
    var dis = {};

    dis.x = e.pageX - offset.left;
    dis.y = e.pageY - offset.left;

    var _this = this;
    // 鼠标移动太快，会与元素脱离 所以绑定在document上
    $(document).mousemove(function (e) {
        // 注意这里this的指向
        $(_this).css({
            left: e.pageX - dis.x,
            top: e.pageY - dis.y
        });
    }).mouseup(function () {
        // 解除绑定的事件
        $(this).off("mousemove mouseup");
    })
    return false; // 加这个，防止拖拽成文字

})

</script>
~~~



## 焦点事件

`focus/blur/change/input`

~~~javascript
$("input").focus(function () { //获得焦点
	$(this).val("");
});


$("input").focus(function () { //获得焦点
	$(this).val("");
    $(this).css("color","#ccc");  
}).blur(function () {
	$(this).css("color","#000");  // 失去焦点 颜色变黑
}).change(function () { //valur改变 会触发change
    console.log("更新");
});
~~~

`keydown/keyup/keypress(字符键)`

~~~javascript
键盘按下(keydown\keypress)的时候，输入到input框之前就会监听到事件,所以要想获取内容，要在输入内容之后，所以是keyup事件
$("input").keyup(function () {
    consoloe.log( $(this).val() );
})

$("input").keydown(function () {
    console.log(e.which); // 键盘位置的值 键值代码 不分大小 适用于判断按下的是哪个键
}).keypress(function () {
    console.log(e.which);  //当前按下字母的ASCII码值 区分大小写
})
~~~

 

## 滚轮事件

`scroll`

~~~html
<div class="wrapper">
    <div class="item">0</div>
    <div class="item">1</div>
    <div class="item">2</div>
</div>

<div class="one"></div>

<script src="./jquery-3.4.1.js"></script>
<script>
    $(window).scroll(function () {
        // 滚轮滚过的距离 + 浏览器窗口高度 >= body的高度  这里谷歌浏览器不成功 其他可以记一下
        if ( $(document).scrollTop() + $(window).height() >= $("body").height() ) {
            $(".wrapper").append('<div class="item">' +  $(".item").length + '</div>')
        }
    })

</script>
~~~



## 取消默认事件

`event.preventDefault/event.stopPropagation/return false`

~~~javascript
$("a").click(function (e) {
    e.preventDefault();
})

event.stopPropagation // 取消冒泡
~~~



## jQuery.toggle()事件

~~~javascript
$(selected).toggle()事件 // 会自动获得当前对象的显示或者隐藏状态，并且使用触发事件进行切换。

$("idname").click(function(){  //绑定点击事件
    $(this).toggle();//进行显示 隐藏替换
});

1.传入布尔值时，
true显示元素
false隐藏元素
注意改变的是CSS的display属性

2.传入数值或字符串
毫秒为单位 数值越大，动画越慢
字符串 'fast' 和 'slow' 分别代表200 和 600毫秒的延时。 还有'normal'

3.传入函数
回调函数，动画执行结束后调用
~~~





## on / off / trigger / one

`on/off/trigger/one`

~~~javascript
$("li").click(function () {
    
})
// 功能同上
$("li").on("click", function () {
    
})
~~~



事件委托

~~~javascript
$("ul").on("click", "li"，function () {
	console.log($(this).text()); // 点哪个li打印哪个li的文本内容，如果不加参数"li",打印全部li的文本内容
})

$("ul").on("click", "li", {name: "aimee"}, function (e) {
	console.log(e.data); // 打印{name: "aimee"}
})
~~~



~~~javascript
解除事件
$(".btn").off("click"); // 解除btn上面的点击事件

单独解除某个函数
function test() {
}
$(".btn").on("click", text);

$(".btn").off("click", test); // 不要直接放匿名函数，解除不掉，因为分别是两个函数 ，必须拿到函数名称(指针)
~~~



~~~javascript
// 只执行一遍
$(".btn").one("click", text);
~~~



比如百度搜索首页，点击登录操作后，这一部分是html结构动态生成的，不登录后是直接隐藏的，所以点击生成结构只需要进行一遍，可以用到one，这么做性能更好。不点击就不用生成的登录界面

***注意 登录画面出来后，右上角的x 在写js的时候，这部分结构并不存在，是绑定不上事件的，所以写的时候绑定在父级。

~~~javascript
$(".btn").trigger("click"); //页面打开时就触发一次改时间

$("p").on("click",function () {
    $(this).text("pp");
});
$("button").on("click", function () {
     $("p").tigger("click");  // 点击button后触发p上面的click        
});


$("p").on("click",function (e, a, b) {
    $(this).text("pp");
    console.log(a + "-" + "b")
});
$("button").on("click", function () {
     $("p").tigger("click",["aa","bb"]);  // 点击button后触发p上面的click        
});


// 自定义事件move 消失
$("p").on("move",function (e, a, b) {
    $(this).css("display","none");
});
$("p").on("color",function (e, a, b) {
    $(this).css("color","red");
});
$("button").on("click", function () {
     $("p").tigger("move");  
});
~~~



## 框架

jQueryUI	elementUI

zepto.js是小JQuery框架

​	touch手势操作，主要用在移动端



## 动画显示和隐藏

`$().hide/show`

`slideDown/slideUp/slideToggle`

~~~javascript
$(".box").show() 
$(".box").show()  不放时间

$(".box").slideDown(); 向下展示出来
$(".box").slideUp(); 向上收回去
$(".box").slideToggle(); 综合上面两个，可以放函数，动画完成后执行函数
~~~



`fadeIn/fadeOut/fadeToggle/fadeTo`

~~~html
淡入淡出效果
~~~



`animate/stop`

~~~javascript
$(".box").animate({ // 返回的是对象可以链式操作 会形成动画队列 不建议写在f回调函数中
    left: 500,
    top: 300
}, 2000, linear, function() {
	console.log(123);
})  要做动画的属性，时间ms，动画运动速率， 动画完成后的做什么（回调函数）
~~~

这里提供的动画速率选择很少，可以用easing.js有更多选择      [easing.js网址](https://www.helloweba.net/javascript/212.html)

动画速率可以看菜鸟教程 用哪个值



~~~javascript
第一个参数 是否取消动画队列 
第二个参数 是否立即完成当前动画
默认都是false
$(".box").stop(false);
$(".box").stop(false, false); 
$(".box").stop(true);
~~~

~~~javascript
$("rigth").click(function () {
$(".box").stop(false,true).animate({
    left: "+=100px",
    width: "+=20px",
    height: "+=20px"
	})
}) // 加上stop更好的响应点击事件 ，队列不堆积
~~~





前面的是 实例方法，选择出来`$()`，然后执行`JQuery`对象原型上的方法

## 工具方法

定义在函数上的方法

~~~javascript
var arr = ["a", "b", "c"];
$.type(arr); // 返回array
// 返回object null

$("div").each();
$.each
~~~

工具方法会为实例方法提供底层搭建

实例方法一般封装在工具方法的基础上

工具方法方便扩展

~~~javascript
// 判断数据类型
Obejct.prototype.toString.call();  // 返回[object 数据类型]
~~~

~~~javascript
var str = "    asdf sdf  fara   "
$.trim(str);  // 只清除字符串两边的空格
~~~



`$.makeArray()/$.inArray()/$.each()`

~~~javascript
// 把类数组变成数组
$.makeArray($("li")); // 原型里面有pop\push等方法

// 找数组中的值
var arr =["a", "b", "c"];
$.inArray("b", arr, 2); // 返回索引值，找不到返回-1 最后一个参数表示从该目标的第二个位置开始查找
~~~



~~~javascript
var data = [
    {
        name: "amiee",
        age: 18
    },
    {
        name: "cc",
        age: 20
    },
    {
        name: "luwei",
        age: 22
    }
];
var str= "";
$.each(data, function (index, ele) {  //把数据插入到p标签  拼接好，集体插入，性能更好
    // this这里指向ele
    str += '<p>' + ele.name + ',' + ele.age + '</p>';
});
$("div").append(str);
$("li").each(function () { // 这里循环遍历一堆li 处理的是dom元素
    
})
~~~

~~~javascript
var data2 = {
    amiee: 18,
    cc: 20,
    luwei: 22
};
var str= "";
$.each(data2, function (key, value) {  //把数据插入到p标签  拼接好，集体插入，性能更好
    // this这里指向ele
    str += '<p>' + key + ',' + value + '</p>';
});
~~~



`$.merge()`  可以合并有索引的  合并数组或类数组

~~~javascript
var arr1 = ["a", "b", "c"];
var arr2 = ["d", "e", "f"]
console.log($.merge(arr1, arr2)); // 返回["a", "b", "c", "d", "e", "f"] 改变arr1,返回的也是arr1

var arrLike1 ={
    0: "a",
    1: "b",
    2: "c",
    length: 3
};
var arrLike2 ={
    0: "d",
    1: "e",
    2: "f",
    length: 3
};
console.log($.merge(arrLike1, arrLike2));
打印的是
{0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", length: 6}
0: "a"
1: "b"
2: "c"
3: "d"
4: "e"
5: "f"
length: 6
__proto__: Object
~~~



~~~javascript
 var arr1 = ["a", "b", "c"];
        var arr2 = ["d", "e", "f"];

        var arrLike1 = {
            0: "a",
            1: "b",
            2: "c",
            length: 3
        };
        var arrLike2 = {
            0: "d",
            1: "e",
            2: "f",
            length: 3
        };
        console.dir($.merge(arr1, arrLike2));  // 返回的是数组
        console.dir($.merge(arrLike1, arr2));  // 返回的是对象
~~~



`$.noConflict()`

~~~javascript
// 如果其他类库也用了$,把$权限移交出去 用JQuery替代
$.noConflict();
JQuery("div");

// JQuery也不能用了
var j = $.noConflict(true);
j("div");
~~~

~~~html
<!--引用不同的JQuery版本-->
<script src="jquery-1.7.2.min.js"></script>
<script>
    var $1 = $.noConflict();
</script>
<script src="jquery-3.4.1.min.js"></script>
<script>
    var $2 = $.noConflict();
</script>


console.log(j.prototype.jquery); // 看版本 一般是后引入的版本
~~~



`$.data()`

~~~html
<div class="box" data-name="amiee"></div>

<script>
var box = document.getElementsByClassName("box")[0];
var data = box.dataset;
console.log(data.name);  // amiee
    

$(".box").click(function () {
    console.log($(this).data("name")); //实例方法
})
$(".box").data("age", "19"); // 给dom添加data-age

// 工具方法   
var box = $(".box");
$.data(box, {
    age: 20,
    aa: "aa"
});
console.log($.data(box, "aa"));
</script>
~~~



## extend

1.合并对象

~~~javascript
// 合并对象
var people1 = {
    aimee: {
        age: 18,
        sex: "female"
    },
    luwei: 20
};
var people2 = {
    cc: {
        age: 22,
        sex: "male"
    }
};
$.extend(people1, people2);
console.log(people1);

//打印Object
//aimee: {age: 18, sex: "female"}
//cc: {age: 22, sex: "male"}
//luwei: 20
//	__proto__: Object
~~~



~~~javascript
var obj = {};
var people1 = {
    aimee: {
        age: 18,
        sex: "female"
    },
    luwei: 20
};
var people2 = {
    cc: {
        age: 22,
        sex: "male"
    }
};
$.extend(obj, people1, people2);// 这是浅拷贝
people2.cc.age = 50;
console.log(obj); 


$.extend(true, obj, people1, people2); // 这是深拷贝
people2.cc.age = 50;
console.log(obj); 
~~~



2.拓展方法

~~~javascript
var people1 = {
    aimee: {
        age: 18,
        sex: "female"
    },
    luwei: 20,
    aa: function () {
        console.log("aa")
    }
};
var people2 = {
    cc: {
        age: 22,
        sex: "male"
    }
};
$.extend(people1); // 合并people1对象到$函数中 可以直接使用people1中的属性和方法
console.log($.luwei); // 20
// 注意这样不行$.people1.aa();
$.aa();

//$.trim()就是这样实现的
$.extend({
    trim: function( text ) {
	
	}
})
~~~



~~~javascript
// 扩展找最大值最小值方法  创造的是工具方法
var arr = [20, 10, 5, 55, 30];

$.extend({
    max: function (arr) {
        var max = arr[0];
        for(var i = 1; i< arr.length; i++ ) {
            var cur = arr[i]
            cur > max ? max = cur : null 
        }
        return max;
    },
    min: function (arr) {
        var min = arr[0];
        for(var i = 1; i< arr.length; i++ ) {
            var cur = arr[i]
            cur < min ? min = cur : null 
        }
        return min;
    },
});

console.log($.max(arr));  // 55
console.log($.min(arr));  // 5

~~~



`$.fn.extend()`  定义在fn上，也就是原型上

~~~html
对象合并同$.extend()

拓展方法合并到原型上就是实例方法
$.fn.extend()
$().dd();


举例：如何实现实例方法
<style> 
.box {
    width: 100px;
    height: 100px;
    background: #f67;
}
</style>

<div class="box"></div>

<script src="./jquery-3.4.1.js"></script>
<script>
$(".box").mouseenter(function () {
    $(this).bling();
    // $(this).fadeOut(200).fadeIn(200);
});

$.fn.extend({
    bling: function () {
        this.fadeOut(200).fadeIn(200);
        return this;
    }
});
</script>
~~~



## callback

`$.Callbacks()` 回调队列对象

~~~javascript
1.解决作用域问题
2.观察者模式
var cb = $.Callbacks();
function wakeUp() {
    console.log("早");
}
cb.add(wakeUp);
(function () {
    function eating() {
        console.log("吃早饭");
    };
    cb.add(eating);  // 通过add()观察方法
})();

$("#box").click(function () {
    cb.fire();  // 通过fire方法发布
    // wakeUp();
    // eating();
});	
~~~



callback的实现

~~~javascript
var cb = {
    callbacks: [], // 源码中是list
    add: function (fn) {
        this.callbacks.push(fn);
    },
    fire: function () {
        this.callbacks.forEach(function (fn) {
            fn();
        });
    }
};
cb.add(function wakeUp(){
    console.log("早");
})
cb.add(function eating(){
    console.log("吃早饭");
})
cb.fire();
~~~



~~~javascript
传入参数
$.Callback("");
// once 只能fire一次
// memory fire()触发后 下次在添加新的回调函数直接执行
// unique 添加多个同名回调函数时候只能添加一次
// stopOnFalse 回调函数中有return false，遇到这个函数就停止队列

add(wakeUp, wakeUp)
add([wakeUp, wakeUp])
~~~





`$.Deferred()`

~~~javascript
延迟对象
var dtd = $.Deferred();  // 状态只能有一个
dtd.resovle(); // 成功状态
dtd.reject(); // 失败状态
dtd.notify(); // 进行中


举例
var dtd = $.Deferred(); // 创建延迟对象
dtd.notify(); // 成功状态

dtd
    .done(su)  // 响应成功状态
    .fail(er) // 响应失败状态
    .progress(ing);  // 响应进行状态

function su() {
    console.log("成功了");
}
function er() {
    console.log("失败了")
}
function ing() {
    console.log("进行中")
}
~~~

模式 发布与订阅模式



## JQuery构造函数源码



## ajax

~~~html
<script>
    $(".btn").on("click", function () {
        console.log(123)
        $.ajax({
            type: "GET",
            url: "./getNews.php",
            success: function (data) {
                console.log(data);
            },
            error: function (err) {  // 返回的是response对象
                console.log(err);
            },
            
            headers: {name: "amiee"}, // 发送的请求头
            context: document.getElementsByClassName("ul")[0], // 设置Ajax相关回调函数的上下文
        })
    });
// $.ajax({
//     type: "POST",
//     url: "./post.php",
//     success: function (data) {
//         console.log(data);
//     },
//     error: function(err) {
//         console.log(err);
//     },
//     // data: "username=amiee&age=18"
//     data: {username:"amiee", age:18}
// })

</script>
~~~



### jsonp

参数

~~~html
crossDomain 同域请求为false， 跨域请求为true

dataType 预期服务器返回的数据类型
"xml"、"html"、"script"、"json"、"jsonp"、"text"

jsonp   回调函数名称需要填写的地方，如百度搜索接口的'cb'

jsonpCallback 回调函数名称，如百度搜索接口的‘asdf'
~~~



eg: 百度联想词接口 https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=d&cb=asdf

~~~javascript
var oUl = document.getElementsByTagName("ul")[0];
// console.log(oUl);
$("input").on("input", function () {
    $.ajax({
        type: "GET",
        url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
        // success: function (data) {
        //     console.log(data);
        // },
        // error: function (err) {
        //     console.log(err); 
        // },
        data: 'wd=' + $("input").val(),
        crossDomain: true,
        dataType: "jsonp", // 预期服务器返回的数据类型,如果不给，后台需要通过content-type声明数据
        // 常见类型有text xml json jsonp
        jsonp: "cb",
        jsonpCallback: "asdf"
    })
});

function asdf(data) {
    // var data = JSON.parse(data);
    var data = data.s;
    var str = "";

    if(data.length > 0) {
        oUl.style.display = "block";
        data.forEach(function (ele, index) {
        // console.log(ele);
        str += '<li>' + ele + '</li>';
    });
    }else {
        oUl.style.display = "none";
    }
    oUl.innerHTML = str;
    // $("ul").append(str);
}
~~~



$.ajax() —> deferred对象  自动返回状态

~~~javascript
$("button").on("click", function () {
    $.ajax({
        type: "GET",
        url: "./getNews.php",
        // success: function (data) {   // 请求成功后执行的 一般很少用
        //     console.log(data);
        // },
        // error: function (err) {
        //     console.log(err);
        // },
        // data: 'wd=' + $("input").val(),
        // crossDomain: true,
        // dataType: "jsonp",
        // jsonp: "cb",
        // jsonpCallback: "asdf"
    }).done(function (data) {  // 请求成功后执行的   注意ajax对象也是一个Deferred对象
        console.log(data);
    }).fail(function (err) { // 请求失败后执行的
        console.log(err);
    })
});
~~~



~~~javascript
$("button").on("click", function () {
    $.ajax({
        type: "GET",
        url: "./getNews.php",
        // success: function (data) {
        //     console.log(data);
        // },
        // error: function (err) {
        //     console.log(err);
        // },
        // data: 'wd=' + $("input").val(),
        // crossDomain: true,
        // dataType: "jsonp",
        // jsonp: "cb",
        // jsonpCallback: "asdf"
    }).then(function (data) { // 可以按顺序接受数据
        console.log(data);
    }, function (err) {
        console.log(err);
    })
});



 }).always(function (data) {  // 不管成功和失败都执行这个函数
        console.log(data);
    }
~~~

