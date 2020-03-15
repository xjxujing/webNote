## 注释

~~~html
// 		不会编译到css中
/* */ 	会编译到css中
~~~

## 变量

~~~html
@	声明变量
1. 作为普通属性值 		@pink: pink;
2. 作为选择器和属性名 	#@{selector}
3. 作为URL	@{url}
4. 变量的延迟加载
~~~

~~~less
// 变量的延迟加载
@var: 0;

.class {
    @var: 1;
    .brass {
        @var: 2;
        three: @var; // 是3，等这个{}作用域的变量解析完后
        @var: 3;
    }
    one: @var
}


// 编译后
.class: {
    one: 1;
}

.class .brass {
    three: 3;
}
~~~



## 嵌套规则

~~~html
1.基本嵌套规则
2. 使用& 代表平级
~~~



## 混合

~~~html
混合就是将一系列属性从一个规则集引入到另一个规则集的方式
用 . 开头
~~~



~~~less
1. 普通混合 没有括号，会输入到css文件中
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
~~~



~~~less
2. 不带输出的混合 有括号
.bordered() {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
~~~



~~~less
3. 带参数的混合
.bordered(@color) {
  border-color: @color
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered(red);
}

.post a {
  color: red;
  .bordered(#ccc);
}
~~~



~~~less
4. 带参数并且有默认值的混合
5. 带多个参数的混合
.juzhong(@w: 10px, @h: 10px, @c: pink) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: @c;
    height: @h;
    width: @w;
}

#wrap {
    position: relative;
    width: 300px;
    height: 400px;
    border: 1px; solid;
    margin: 0 auto;
    .inner {
        .juzhong(100px, 100px, pink)
    }
    .inner2 {
        .juzhong()
    }
}
~~~



~~~less
6. 命名参数
.juzhong(@w: 10px, @h: 10px, @c: pink) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: @c;
    height: @h;
    width: @w;
}

#wrap {
    position: relative;
    width: 300px;
    height: 400px;
    border: 1px; solid;
    margin: 0 auto;
    .inner {
        .juzhong(100px, 100px, pink)
    }
    .inner2 {
        .juzhong(@c:black) // 只传一个参数
    }
}
~~~



~~~less
7. 匹配模式
画个三角形
#wrap{
    width: 0;
    height: 0;
    border-width: 40px;
    border-style: solid;
    border-color: transparent red transparent transparent;
    overflow: hidden; // 兼容IE6 触发haslayout
}



~~~

~~~less
抽取画三角形的代码trangle.less
.triangle(@w,@c) {
    width: 0;
    height: 0;
    border-width: @W;
    border-style: solid;
    border-color: transparent @C transparent transparent;
    overflow: hidden; // 兼容IE6 触发haslayout
}
~~~



~~~less
进一步完善 传入三角形方向  第一个参数方向，第二个参数宽度，第三个参数颜色
.triangle(@_) { // 定义同名混合，并且传入@_
    width: 0;
    height: 0;
    overflow: hidden; // 兼容IE6 触发haslayout
}

.triangle(L, @w, @c) { // 向上
    border-width: @w;
    border-style: dashed solid dashed dashed;
    border-color: transparent @C transparent transparent;
}

.triangle(B, @w, @c) { // 向下
    border-width: @w;
    border-style: solid dashed dashed dashed;
    border-color: @C transparent transparent transparent;
}
~~~

~~~less
@import "./trangle.less"

#wrap {
    .triangle(B, 40px, red)
}
~~~

 

~~~less
8. arguments变量
.border(@1, @2, @3) {
    border: @arguments
}

#wrap {
    .border(1px, solid, black)
}
~~~

### 



## less的计算

~~~html
calc 运行的时候执行，不是在编译的时候计算好，会影响性能

width: (100 + 100px) // 只需要一方带单位就行，最后计算的结果会保留下来
~~~



## 继承

~~~less
让 css 重复代码更少
不支持传参数
~~~

### 使用继承

~~~less
juzhong-extend.less  注意是继承类，不要带括号
.juzhong {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: 0 auto;
}
~~~

~~~less
@import "./juzhong-extend.less"
#wrap {
    position: relative;
    width: 300px;
    height: 300px;
    border: 1px solid;
    margin: 0 auto;
    .inner {
        &:extend(.juzhong);
        &:nth-child(1) {
            width: 100px;
            height: 100px;
            background-color: red;
        }
         &:nth-child(2) {
            width: 50px;
            height: 50px;
            background-color: yellow;
        }
    }
}
~~~



~~~css
编译后
.juzhong,
#wrap .inner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0 auto;
}
#wrap {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid;
  margin: 0 auto;
}
#wrap .inner:nth-child(1) {
  width: 100px;
  height: 100px;
  background-color: red;
}
#wrap .inner:nth-child(2) {
  width: 50px;
  height: 50px;
  background-color: yellow;
}

~~~

### 不用继承

~~~css

.juzhong(@w,@h,@c) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: 0 auto;
  	width:@w;
 	height:@h;
  	background-color:@c;
}

#wrap {
    position: relative;
    width: 300px;
    height: 300px;
    border: 1px solid;
    margin: 0 auto;
    .inner{
        &:nth-child(1) {
      		.juzhong(100px, 100px, red);
        }
         &:nth-child(2) {
      		.juzhong(50px, 50px, yellow);
           
        }
    }
}
~~~



~~~css
编译后  过多重复代码
#wrap {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid;
  margin: 0 auto;
}
#wrap .inner:nth-child(1) {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background-color: red;
}
#wrap .inner:nth-child(2) {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  background-color: yellow;
}
~~~



### 继承全部

~~~less

.juzhong {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0 auto;
}
.juzhong:hover {
  background: black !important;
}
#wrap {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid;
  margin: 0 auto;
  .inner{
      	&:extend(.juzhong all);
        &:nth-child(1) {
            width: 100px;
            height: 100px;
            background-color: red;
        }
         &:nth-child(2) {
            width: 50px;
            height: 50px;
            background-color: yellow;
           
        }
    }
}
~~~

~~~css
编译后
.juzhong,
#wrap .inner {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 0 auto;
}
.juzhong:hover,
#wrap .inner:hover {
  background: balck !important;
}
#wrap {
  position: relative;
  width: 300px;
  height: 300px;
  border: 1px solid;
  margin: 0 auto;
}
#wrap .inner:nth-child(1) {
  width: 100px;
  height: 100px;
  background-color: red;
}
#wrap .inner:nth-child(2) {
  width: 50px;
  height: 50px;
  background-color: yellow;
}
~~~



~~~html
<div id="wrap">
    <div class="inner">
        inner1
    </div>
    <div class="inner">
        inner2
    </div>
</div>
~~~



## 避免编译

~~~less

* {
    margin: 100 * 100px;
    padding: ~"calc(100px + 100)"
}
~~~

~~~css
编译后
* {
    margin: 100 * 100px;
    padding: calc(100px + 100) // ~""中的不会编译
}
~~~



## scss

~~~scss
使用混合（mixin）：
@include box-shadow2;

使用函数加参数：
$border-color: #999;
$border-color-light: lignten($border-color, )

使用继承 （placeholder）
@extend .box-shadow;


~~~



