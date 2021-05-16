[TOC]



# CSS

## 引入方式

- 内部样式表style 看加载顺序

- 外部样式表link

  ```html
  <link rel="stylesheet" href="style.css">
  ```

  引入CSS是异步加载

  解析CSS是阻塞的

  注意：同时用内部样式和外部样式的时候，权重相同时，后加载的样式覆盖先加载的样式

- 行内样式，权重最高

  ```html
  <div id="warapper" class="wrapper" style="width: 100px"></div>
  
  <!-- 通过js引入的样式，会直接加在行内样式中 -->
  <script>
   	wrapper.style.width = "100px";
  </script>	
  ```

  

## 选择器权重  

| 权重 | 选择器                                  |
| ---- | --------------------------------------- |
| 1000 | 行间样式                                |
| 100  | id选择器                                |
| 10   | class选择器\|\|属性选择器\|\|伪类选择器 |
| 1    | 标签选择器                              |
| 0    | 通配符选择器                            |

256进制：256个标签的权重才能等于1个class的权重

!important	优先级最高



## 文档流

从上往下、一行一行、从左到右	这样的排列方式称为文档流

position: absolute / fixed  和  float   这三个脱离会文档流



## CSS 伪类顺序

~~~css
:link
:visited 
:hover 经过
:active 激活
~~~



## CSS属性前缀

来历：W3C小组	

1. 提出工作草案
2. 最终工作草案（差不多成形，浏览器会提前选择一些属性）
3. 候选推荐标准
4. 建议推荐标准
5. 形成推荐标准

```css
因为周期长，正式标准成立前，被选择的属性写成：(加上了内核)
-webkit-border: 1px solid #000;

-moz 火狐使用Mozilla浏览器引擎的浏览器
-webkit-   Safari、谷歌浏览器等使用Webkit引擎的浏览器
-o-
-ms-   IE
```

CSS前缀属性，可以在 can i use中查    [Can I use 一款前端兼容性自查工具](<https://blog.51cto.com/8312284/2083367>)



## CSS3常用选择器

```javascript
获取元素的所有属性
window.getComputedStyle(img).trnsition
```



**属性选择器**

```html
E[att]属性
E[att='val'] 属性att的值为"val"的元素
E[att~='val'] 属性att有多个值，val为其中一个
E[att^='val'] 属性att的值以"val"开头的元素
E[att$='val'] 属性att的值以"val"结尾的元素
E[att*='val'] 属性att的值包含"val"的元素

```

用的比较少。。。



**同级选择器**

```html
E + F 毗邻元素选择器，匹配所有紧随E元素之后的同级元素F
E ~ F 匹配任何在E元素之后的同级F元素,兄弟选择器
```

做选项卡中用过 E~F



**伪类选择器**

```css
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
:root 根元素html

```

基于整个标签



**伪元素选择器**

```css
::first-letter 设置对象内的第一个字符的样式
::first-line 设置对象内的第一行的样式
::before 
::after{content: ''}
::selection 设置对象被选择时的元素的样式
```

```css
body {
    /* 设置不能选择内容 */
    user-select: none;  
}
```

```css
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
```



## CSS3常用属性

```css
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
```



```css
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

```



```html
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
```



```css
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

```



```css
CSS3 新增 border值：

可单独设置每边的border
border: border-width  border-style b order-color;

给border添加背景图片
border-image：url number style;属性值详解如下：
    url //图片地址
    number // 图片裁剪的值
    style // 图片添加的方式
例如：花边效果


```



```css
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
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;//子元素被垂直排列
text-overflow: ellipsis;
overflow:hidden;
多行打点兼容性不好，可用js操作（拼接，可以看下视频）
```



```css
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

```



## 盒模型

```css
定义显示方式
定义显示方式 box-sizing: content-box(标准盒模型) | border-box(怪异盒模型)

可控大小
resize: none | horizontal | vertical | both; 
结合属性overflow: auto; 

定义轮廓
 outline: outline-width outline-style outline-color;
```



## columns多列布局

```css
columns: column-width | column-count;。//每列的宽度  或  显示的列数

column-width //每列的宽度

column-count //显示的列数

column-gap // 列宽，默认由font-size决定

column-rule: column-rule-width column-rule-style column-style-colro //列边框样式

column-span: none(无) | all(横跨所有列)
```

用的不多



## flexbox弹性盒子

一种一维的布局模型，给flexbox的**直接子元素**之间提供了强大的空间分布和对齐的能力

注意：columns属性在伸缩容器上没效果，同时 float, clear和 vertical-align 属性在伸缩项目上页没有效果。

```html
所有CSS属性都会有一个初始值，所以 flex 容器中的所有 flex 元素都会初始默认效果：

主轴水平从左向右。元素排列为一行 (flex-direction 属性的初始值是 row)。

元素从左边起始线开始(justify-content:flex-start)。元素从主轴的起始线开始。

默认不拉伸(flex-grow:0)，但是会压缩(flex-shrink:1)不换行(flew-wrap:nowrap)。元素不会在主维度方向拉伸，但是可以缩小。

不设置高度时flex元素充满flex容器(align-items:stretch)。元素被拉伸来填充交叉轴大小。

```

**flex容器属性**

```h
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

7、order

```

**flex元素属性**

```css
1、flex-basis: length; // 定义该元素的 main-size。

2、flex-grow: number; // 对剩余的空间设置拉伸比例，默认值为0(不拉伸)

3、flex-shrink: number; // 压缩比例，默认值为1

4、flex: flex-grow flex-shrink flex-basis //默认值 0 1 auto

5、align-self 单个项目在 cross 轴上的对齐方式，属性值详解如下：
flex-start  // cross-start 齐平
flex-end // cross-end 齐平
center // 居中
baseline // 第一行文字
stretch // 为设置高度时 该元素高度为 flex 容器高度 

6、order：number; //该项目排列的位置 值从小到大排列
```



盒子居中的三种方式

- 定位`absolute,top,left`各50%，再走`margin-left，margin-top`自己宽高的一半,可以用下面的方式（相对于自身宽高的一半）

  transform：translate(-50%, -50%)；

- 定位position,  top，left，bottom，right都是0，然后设置`margin`为auto

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

     ```css
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
     ```
     

F12控制台Network可以看到所有引入（请求）的资源

媒体类型有下图这些



媒体特性有下图这些



常用的有`max-width	min-width	orentation`

- 媒体查询的逻辑操作符
  
  and操作符
  
  逗号分隔列表
     	等同于or逻辑操作符
  
  ```css
     @media (max-width: 300px), screen and (orientation: landscape)
  ```
  
   not操作符
  
   ```css
  @media not screen and (min-width: 500px) and (max-width: 800px)
   ```
  
     only操作符
  
  ​	防止老旧的浏览器不支持带媒体属性的查询而应用到给定的样式
  
  ```css
   @media only screen and (min-width: 500px) and (max-width: 800px)
  ```
  
     

## 移动端布局

- 百分比布局

- `flex`布局

- 单位`rem`

  `1rem `取决于`html `的 `font-size`，`1em ` 一般取决于父级的 `font-size`大小，如果自己有`font-size`，则取决于自身的`font-size`

  通过 js 动态设置 html 的 font-size 属性值实现等比缩放

  ```html
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
  ```
  

  
- 单位`vw vh`

  把屏幕分成`100`份

  ```html
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
  ```



**viewport**

物理像素：物理像素又被称为设备像素，他是显示设备中一个最小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。物理光子

逻辑像素：一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。

设备像素比(dpr) = 物理像素/逻辑像素

​	[查看设备像素比的网站](https://bjango.com/articles/min-device-pixel-ratio/)

```javascript
viewport 是严格等于浏览器的窗口。在桌面浏览器中，viewport 就是浏览器窗口的宽度高度。但在移动端设备上就有点复杂。

viewport就是浏览器上，用来显示网页的那一部分的区域。iOS及新版本浏览器默认viewport为980px。

// 一般用js动态生成meta标签，来匹配不同的dpr
var oMeta = document.createElement("meta");
oMeta.setAttribute("name","viewport");

if(window.devicePixelRatio >= 2) {
    oMeta.setAttribute("content","width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no");
}
if(window.devicePixelRatio >= 3) {
    oMeta.setAttribute("content","width=device-width, initial-scale=0.3, minimum-scale=0.3, maximum-scale=0.3, user-scalable=no");
}

document.getElementsByTagName("head")[0].appendChild(oMeta);

// 公司开发一般给750px的设计稿，iphone6/7/8，dpr = 2,  宽度375
```

`viewport`默认有6个属性：

| 属性          |                                                            |
| ------------- | ---------------------------------------------------------- |
| width         | 设置`viewport`宽度，可以为一个整数，或字符串`device-width` |
| initial-scale | 页面初始的缩放值，为数字，可以是小数                       |
| minimum-scale | 允许用户的最小缩放值，为数字，可以是小数                   |
| maximum-scale | 允许用户的最大缩放值，为数字，可以是小数                   |
| height        | 设置viewport的高度（一般不管，高度由内容撑开）             |
| user-scalable | 允许用户进行缩放，`no`为不允许，`yes`为允许                |



举例：
iphone6 / 7 / 8 ，dpr = 2 两个物理像素等于1个逻辑像素
本身设备宽度是 375px，排了 750 个光子，所以逻辑像素要放大2倍才能每个像素对应 1 个光子



**根据 dpr 的值来修改 viewport 实现1px的线？**

1.js动态生成mate标签

```html
<meta name="viewport"
content="width=device-width, initial-scale=0.5, maximum-scale=0.5,minimum-scale=0.5, user-scalable=no">

```



```html
很难对安卓手机进行兼容，下面解决对 iOS 的不同 dpr 显示出 1px 的处理方法
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

```



2.css3 transform:scale缩放

```css
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

```



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

```css
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

```

2.js动态改图片

```javascript
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

```

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

```javascript
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
简写：rotate() rotateZ()

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
```

练习设置时钟圆盘

```html
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
```



left会重新layout 或者重新repay    translateX不会引起重新的layout(性能更好)





## transition过渡动画

```css
transition: property duration timing-function delay;

transition-property //规定设置过渡效果的 CSS 属性的名称。
transition-duration //规定完成过渡效果需要多少秒或毫秒。
transition-timing-function  //规定速度效果的速度曲线。
transition-delay    //定义过渡效果何时开始。

```

```css
transition-timing-function 规定设置过渡效果的 CSS 属性的名称。属性值详解如下：
transition-timing-function: linear | ease | ease-in | ease-out | ease-in-out | cubic-
bezier(n,n,n,n);  

linear //匀速, cubic-bezier(0,0,1,1) 
ease //慢快慢， cubic-bezier(0.25,0.1,0.25,1) 
ease-in //慢速开始的过渡， cubic-bezier(0.42,0,1,1) 
ease-out //慢速结束的过渡， cubic-bezier(0,0,0.58,1) 
ease-in-out //慢速开始和结束的过渡， cubic-bezier(0.42,0,0.58,1) 
cubic-bezier(n,n,n,n) //在 cubic-bezier 函数中定义自己的值。可能的值是 0 ~1 之间的数值。

```

有数字值的属性才能有过渡效果





## animation动画

优点：有Y轴或Z轴可以开启浏览器渲染动画GPU加速
缺点：老版本浏览器不支持

```css
animation:动画名称 动画时间 运动曲线  何时开始  播放次数  是否反方向;
```



```css
animation 属性是一个简写属性，用于设置动画属性。属性值详解如下：

animation-name  //规定需要绑定到选择器的 keyframe 名称。。
animation-duration  //规定完成动画所花费的时间，以秒或毫秒计。
animation-timing-function   //规定动画的速度曲线。
animation-delay //规定在动画开始之前的延迟。

animation-iteration-count   //规定动画应该播放的次数。
animation-direction //规定是否应该轮流反向播放动画。
animation-fill-mode //属性规定动画在播放之前或之后，其动画效果是否可见。
animation-play-state //属性规定动画正在运行还是暂停。

```



```css
animation-iteration-count   规定动画应该播放的次数。属性值详解如下：
        n //播放n次
        infinite //无限次

animation-direction 规定是否应该轮流反向播放动画。属性值详解如下：
        normal //默认值，按照顺序正常播放
        reverse //动画反向播放
        alternate //动画在奇数次正向，偶数次反向播放
        alternate-reverse //动画在奇数次反向，偶数次正向播放
```



```css
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

```



```css
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
```



```javascript
练习动画项目要点：
1.感知鼠标滑过方向图片遮罩效果，注意长方形压缩
2.根据鼠标进入和移出的方向，控制描述文字进入和移出
```



## 3D变换动画

perspective 景深
定义：3D 元素距视图的距离，以像素计。当为元素定义 perspective 属性时，其子元素会获得透视效果，而不是元素本身。

```css
放在在父元素
perspective: 600px;

保留3d效果(3D空间)
transform-style: preserve-3d;
```

```css
transform-style指定嵌套元素是怎样在三维空间中呈现。
transform-style: flat|preserve-3d;
注：设置了transfrom-style:preserve-3d的元素，不能防止子元素溢出，即不能设置overflow:hidden；否则persever-3d失效；
```

```css
perspective-origin视点得位置
      perspective-origin: x y;//默认50% 50% 50%;
```

```css
backface-visibility 属性定义当元素背面是否可见。 
backface-visibility: visible | hidden;
```



# HTML

## 概述

一、历史

HTML 1.0  IETF草案 
HTML 2.0 IETF规范
HTML 3.2  W3C规范
HTML4.01 W3C规范（1999年）
一段爱恨情仇……（WHATWG。。。2006年W3C与WHATWG合作）
HTML5 W3C规范（2008年）

注意：HTML5是规范

```html
<!DOCTYPE html>
```



二、HTML5理念

避免不必要的复杂
支持已有的写法
解决实际问题
优雅降级
用户优先： 用户>开发者>浏览器厂商>标准制定者>理论上的完美



三、标准模式、怪异模式（IE6混杂模式盒模型）

验证：
document.compatMode
BackCompat 表示怪异模式 按照各个浏览器解析
CSS1Compat 表示标准模式 按照规范解析

区别：

- 标准盒模型和ie6混杂模式盒模型
- table字体在标准模式下继承body, 怪异模式不继承body
- ie6以下版本中可以给span等行级元素这是宽高
- 即使父级没有高度，也可以这是百分比高度
- ie6以下margin: 0 auto不能左右居中
- ie6以下图片的padding失效

问题：盒模型有哪些？



四、主要新特性

主要的新特性：

（1）新的语义化的标签

- 新语义元素
- forms 2表单元素 HTML网页表单的改进，其中为<input>标记引入了新属性。
- 音视频
- 画布

（2）新的API

- 拖放
- 文件读取
- 回调函数管理api
- 地理位置
- 执行脚本多线程 worker

（3）网络

- 本地存储
- websocket   新的协议
- HistoryAPI   原有的拓展
- 跨文档通信 postmessage   新添加的

问题：HTML5有哪些新特性？

问题：谈谈你对语义化的理解？
	更方便查询关键字、对于程序而言更方便开发和维护、新标签本身会有默认样式，裸奔的时候更好看



记得用新标签做下布局



## HTML5结构元素

1.header 整个页面的头部，某块区域的标题、页眉。

2.footer 文档或者某一块的底部、页脚

3.main 主要内容区域

4.nav 导航链接部分

5.section 页面中一个内容区域

6.article 它代表一个独立的、完整的相关内容块。  比如博客包括博文和评论完整的内容

7.aside 元素表示一个页面的一部分， 它的内容跟这个页面的其它内容的关联性不强，或者是没有关联，单独存在。
页面广告有的是frame做的，然后插到页面上的

8.figure 标签规定独立的流内容（图像、图表、照片、代码等等） 单独拿出来不影响阅读



## HTML5功能元素

video 视频

```html
<video width=500  controls  src=""></video>
```

audio 音频

```html
<audio src="" controls></audio>	本身没有大小
```

source 资源

```html
<audio controls>
	<source src=".mp3">
    <source src=".ogg">
</audio>
```

figcaption 标签定义 figure 元素的标题（了解）

​	h1,h2可以替代

canvas画布

​	动画很耗性能，要遍历DOM,重排重绘
​	canvas节省性能

```html
通过js绘制
<canvas width=500 height=500></canvas>
```

progress进程

```html
<progress id="pro" max=100 min=0 value=50></progress>
<script>

var timer = setInterval(function () {
    if(pro.value == 100) {
		clearInterval(timer);
        return;
    }
    pro.value += 10;
    
},1000)
</script>
```



## HTML5表单元素

```html
<input type="text">	文本框
<input type="radio" name=""> 小圆点  name值一样是单选
<input type="checkbox">	复选框
<input type="password">	密码
<input type="submit">	提交
<input type="button">	按钮
	    <input type="button" value="ok">

<input type="file">  上传文件
	    <input type="file" multiple> 上传多个文件
```

**举例**

```html
get请求，把数据拼接到url后面
<form action="">
    这里没有文本框 不写的话默认提交name对应的是on
    <input type="radio" name="sex" value="male">男
    <input type="radio" name="sex" value="female">女
    <input type="submit">
</form>

<form action="">
    <input type="checkbox" name="fruit" value="a">苹果
    <input type="checkbox" name="fruit" value="b">草莓
    <input type="checkbox" name="fruit" value="c">菠萝
   <input type="submit">
</form>
```

新增type值

```html
<input type="tel"> 电话号码 移动端弹出数字键盘
<input type="range"> 可拖动的进度条，比如音量大小
	

<input type="number">  只能填数字 和 某些符号
     <input id="range"  type="range" max="100" min="0" step="10" value="0">
	前端会直接判断是否符合要求          
                    
<input type="search">


<input type="email">
     <input type="email" value="">              
 
<input type="date">
<input type="month">
<input type="week">
<input type="time">


<input type="datetime-local">表示本地日期和时间
<input type="color">

```

**举例**

```html
<form action="">
    value是设置默认值的
    <input id="range"  type="range" max="100" min="0" step="10" value="0">
    <input type="submit">
</form>

<script>
range.onclick = function () {
    console.log(this.value);
    // 谁调用这个函数，this就指向谁
}
</script>
```

新属性

```html
multiple 可上传多个文件
placeholder 提示
pattern 验证input类型输入框中内容是否与正则匹配

```

```html
<form action="">
    <input id="test" type="text" pattern="^\d{6}$" name="num">
</form>

<script>
var reg = /^\d{6}$/g;
test.onblur = function () { // 失去焦点
    if(reg.test(this.value)) {
        this.style.borderColor = "green";
    }else {
        this.style.borderColor = "red";  
    }
}

```

注意：邮箱、密码（必须要有大小写，不能纯数字，不小于几位）的匹配规则的写法



## **audio/video媒体**

 一、基本使用

```html
<audio src="./source/song.mp3"></audio>
<video src="./source/video.mp4“ poster=""></video>

<!-- js动态创建 -->
1.var audio = document.createElement("audio"); 
                                          
2.var audio = new Audio("./song.mp3");
audio.controls = true;
document.body.appChild(audio);
```



二、浏览器支持情况

canPlayType()方法：

audio.canPlayType() 返回probably或者maybe，返回空为不支持

```html
<audio id="myAudio" src=""></audio>

<script>
var myAudio = document.getElementById("myAudio");

if(myAudio.canPlayType) {
    if(myAudio.canPlayType("audio/mpeg") != "") {
        document.write("您的浏览器支持mp3编码");
    }
    if(myAudio.canPlayType('audio/ogg; codecs="vobis"') != "") {
        document.write("您的浏览器支持ogg编码");
    }

    if(myAudio.canPlayType('audio/mp4; codecs="mp4a.40.5"') != "") {
        document.write("您的浏览器支持aac编码");
    }
}
</script>
```

属性值：

```css
autoplay/controls/loop
preload(none/metadata/auto):是否预加载
    none:不进行预加载。
    metatata:部分预加载。 
    auto:全部预加载

currentSrc: 返回资源链接(注意要资源加载完成才能获取到)
可由在该事件下获取：
myAudio.oncanPlay = function () {
    console.log(myAudio.currentSrc);
}

duration：媒体持续时间(总时长，注意要资源加载完成才能获取到)
可由在该事件下获取:
myAudio.oncanPlay = function () {
    console.log(myAudio.duration);
}

currentTime: 返回或设置资源当前时间 

volume: 音量[0-1]，可读可写
muted:静音


playbackRate: 读取或设置媒体资源播放的当前速率（大于1快放， 大于0小于1慢放，无倒放）

paused/ended/seeking: 查询媒体播放状态，返回true/false
    paused:是否暂停
    ended:是否结束了
    seeking:正在请求某一播放位置的媒体数据

played/buffered/seekable: 均返回一个TimeRanges对象
    (timeRanges对象的length属性为部分时间段，end(i)返回已播放时间段的结束时间，start(i)返回已播放时间段的开始时间)
    played：标明媒体资源在浏览器中已播放的时间范围。
    buffered: 确定浏览器已经缓存媒体文件
    seekable: 表明可以对当前媒体资源进行请求

```

控制音量：

```html
<script>
var myAudio = document.getElementById("myAudio");

current.onclick = function () {
    // 打印当前播放的时间位置
    console.log(myAudio.currentTime)
}

lessVolume.onclick = function () {
    myAudio.volume -= 0.1
    // 打印当前音量
    console.log(myAudio.volume);
}
addVolume.onclick = function () {
    myAudio.volume += 0.1;
    console.log(myAudio.volume);
}
</script>


完善后
<audio id="myAudio" src="./金玟岐 - 岁月神偷.mp3" controls></audio>
<button id="current"></button>
<button id="lessVolume">-</button>
<button id="addVolume">+</button>

<script>
var myAudio = document.getElementById("myAudio");

current.onclick = function () {
    // 打印当前播放的时间位置
    console.log(myAudio.currentTime)
}

lessVolume.onclick = function () {
    // 小数的处理:要换成整数之间的运算
    var volume = parseInt( (myAudio.volume - 0.1) * 10 ) / 10;
    if(volume >=0 && volume <=1){
        myAudio.volume = volume;
    }
    // 打印当前音量
    console.log(myAudio.volume);
}
addVolume.onclick = function () {
    var volume = parseInt( (myAudio.volume + 0.1) * 10 ) / 10;
    if(volume >=0 && volume <=1){
        myAudio.volume = volume;
    }
    console.log(myAudio.volume);
}

</script>
```



方法：

```css
play() 播放
pause() 停止
load():重置媒体元素并重新载入媒体，可中止正在进行的任务或事件
```

事件

```css
play: 媒体开始播放时触发
pause：媒体暂停时出发
ended:  资源播放结束
canplay: 浏览器能够开始播放媒体数据，但是不确定已当前的速率能否顺利的播放完媒体。
```



## Canvas画布

一、应用场景
1、游戏场景
2、大量数据图表
3、动画
Demo网站(codepen.io) 

用途广泛、使用频率高   Jquery插件库 查看Canvas特效

问题：图片处理（滤镜效果）  canvas和svg的区别



二、发展简史及支持情况

1、Canvas标记由Apple在Safari 1.3 Web浏览器中引入。
2、目前主流浏览器都支持，ie9之前的不支持
3、html5

```html
<style>
    canvas {
        width: 200px;
        height: 200px;
        border: 1px solid red;
    }
</style>

<!-- 这里的width没有px单位, 是相对单位 如果不写CSS，会默认400px-->
<canvas id="myCanvas" width="400" height="400"></canvas>

<script>
var myCanvas = document.getElementById("myCanvas");

console.log(myCanvas.offsetHeight); // 202

// canvas的API这样获取,canvas是画布，ctx相当于拿到了画笔
var ctx = myCanvas.getContext("2d");
</script>
```



### 绘制图形

```javascript
// 先给画笔的位置，画另一个图形重新给画笔位置
ctx.moveTo(100, 100);

// 给线宽，从中间向两边变宽，填充渲染是从中间线向内填充的
ctx.lineWidth = 20;
// 线的颜色
ctx.strokeStyle = 'red'
// 画到(200,100)的坐标
ctx.lineTo(200, 100);

// 渲染出来：描边渲染
ctx.stroke();

// 画矩形
ctx.rect(100,100,100,100);

// 填充颜色
ctx.fillStyle = 'red';
// 填充渲染 未闭合的图形也可以填充，开始位置和结束位置连上
ctx.fill();
// 下面的闭合不存在缺口，针对粗线
ctx.closePath();
```



```javascript
画个三角形
// 先给画笔的位置
ctx.moveTo(100, 100);

ctx.lineTo(200, 100);
ctx.lineTo(200, 200);
ctx.lineTo(100,100);
```



**beginPath() 画另一个的时候，另开一个路径**

fill和stroke方法都是作用在当前的所有子路径
若想开辟新的路径，需要使用beginPath()方法。
在绘制新路径之前使用beginPath()

```javascript
2、矩形
rect(x, y, w, h); 
strokeRect(x, y, w, h);// 不会对之前的路径产生影响
fillRect( x, y, w, h); // 不会对之前的路径产生影响
```



```javascript
3、圆形
arc(x, y, r, sAngle, eAngle, c); // c是false，顺时针

ctx.arc(200, 200, 100, 0, Math.PI * 2) // 画一个圆
ctx.stroke();

ctx.arc(200, 200, 100, 0, Math.PI * 0.5) // 画四分之一圆弧
ctx.stroke();
```



```javascript
4、曲线：两条切线之间的弧或者曲线
arcTo(x1, y1, x2, y2, r);
```



```javascript
5、二次方、三次方曲线方程
quadraticCurveTo(cpx, cpy,x, y);
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x,y);
```



### 设置图形样式

```javascript
1、线样式
lineWidth: 线条宽度

lineCap:  线两头样式 butt/square/round

lineJoin: 两线拐角处 miter/round/bevel

miterLimit: 绘制交点的方式 
```



```js
2、渐变：
createLinearGradient(x1, y1, x2, y2); 线性渐变
createRadialGradient(x1, y1, r1, x2, y2, r2); 径向渐变。
练习：由透明到橘黄到透明的甜甜圈

3、绘制图案
createPattern(img, 'repeat|repeat-x|repeat-y|no-repeat');
img:图片、画布、视频元素
注意：等资源加载完
```



```html
练习渐变
<canvas id="myCanvas" width="400" height="400"></canvas>

<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var bg = ctx.createLinearGradient(0,100,400,100);

bg.addColorStop(0, "red");
bg.addColorStop(0.5, "orange");
bg.addColorStop(1, "green");

ctx.fillStyle = bg;
ctx.fillRect(0,0,400,100);
ctx.fillRect(0,0,200,100); // 只会画一半，到orange 这里是填充的方向
</script>

甜甜圈练习
<canvas id="myCanvas" width="400" height="400"></canvas>

<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var bg = ctx.createRadialGradient(200,200,50,200,200,100);

bg.addColorStop(0, "transparent");
bg.addColorStop(0.5, "orange");
bg.addColorStop(1, "transparent");

ctx.fillStyle = bg;
ctx.fillRect(0,0,400,400);
</script>
```



```html
练习绘制图案
<canvas id="myCanvas" width="400" height="400"></canvas>
<img id="img" src="./timg.jpg" alt="">
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
var img = document.getElementById("img");

img.onload = function () {
    var bg = ctx.createPattern(img, 'no-repeat');
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,400,400);
}
</script>
视频poster也可以用这种方式
```



### 操作图形

```css
1、translate(dx, dy)   重新映射画布上的 (0,0) 位置

var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

// 会挪动整个画布
ctx.translate(100,100);

// 起始弧度是0，终止弧度是~
ctx.arc(100, 100 , 100, 0, Math.PI*2 )
ctx.fill();

// 也会平移
ctx.rect(300,300,50,50);
ctx.stroke();


2、scale(sx, sy)   缩放当前绘图

// 整个画布都会缩放
ctx.scale(0.5, 2);


3、rotate(Math.PI)   旋转当前的绘图

// 整个画布都会旋转
ctx.rotate(Math.PI*0.25);


4、save() restore()  保存当前图像状态的一份拷贝，栈中弹出存储的图形状态并恢复

ctx.save()
ctx.restore()


5、setTransform(a, b, c, d, e, f) 变换矩阵，先重置再变换
      参数：水平缩放、水平倾斜、垂直倾斜、垂直缩放、水平移动、垂直移动 和线性代数有关
 练习：验证码
6、transform(a, b, c, d, e, f) 在之前的基础上变换
练习：缩放图形
```





```html
例子，画一个旋转海螺形
<style>
canvas {
/* width: 200px;
 height: 200px; */
border: 1px solid red;
}
</style>

<canvas id="myCanvas" width="400" height="400"></canvas>
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var w = myCanvas.width;
    h = myCanvas.height;

ctx.translate(200,100);
for(var i = 1; i< 60; i++) {
    // 每个圆都向右平移后再缩放
    // ctx.translate(30,30);
    // 每次再原来的基础上大小乘0.95
    // ctx.scale(0.95,0.95);

    ctx.transform(0.95,0,0,0.95,30,30);

    ctx.rotate(Math.PI/12);

    // 每次都开启新路径
    ctx.beginPath();

    ctx.fillStyle ="red";
    ctx.globalAlpha = "0.4";
    ctx.arc(0,0,50,0,Math.PI*2,true)

    // 闭合
    ctx.closePath();
    ctx.fill();
}

</script>
```





```css
7、clearRect(x, y, dx, dy);
       擦除当前区域
练习：实现矩形落地动画

8、 globalCompositeOperation
       组合图形
这里可是设置新绘制图案和后绘制的图案的组合方式
ctx.globalCompositeOperation = 'source-over' ;
```



```html
<canvas id="myCanvas" width="400" height="400"></canvas>
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var w = myCanvas.width;
    h = myCanvas.height;
ctx.fillRect(0,0,w,h);

// 拖动鼠标实现擦除效果
myCanvas.onmousemove = function (e) {
    ctx.clearRect(e.clientX-25,e.clientY-25,50,50);
}

</script>



升级版擦除效果！！！利用组合图形
<canvas id="myCanvas" width="400" height="400"></canvas>
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var w = myCanvas.width;
    h = myCanvas.height;

ctx.fillStyle = "red";
ctx.fillRect(0,0,400,400);

ctx.globalCompositeOperation = "destination-out";

myCanvas.onmousemove = function (e) {
    ctx.beginPath();
    ctx.arc(e.clientX,e.clientY,50,0,Math.PI*2);

    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();
}
```





```html
练习：实现小方块落地
<canvas id="myCanvas" width="400" height="400"></canvas>
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var w = myCanvas.width;
    h = myCanvas.height;
ctx.fillRect(100,0,50,50);

var y = 0;
ctx.fillRect(100,y,50,50);
// 做一个小方块落地，比DOM省性能
var timer = setInterval(function () {
    ctx.clearRect(0,0,w,h);
    y += 10;
    if(y>=350){
        clearInterval(timer);
        ctx.fillRect(100,350,50,50);
    }else {
        ctx.fillRect(100,y,50,50);
    }
}, 50)

</script>
```



### 绘制图像

```css
1、 drawImage导入图片
drawImage(image, x, y); 在画布上定位图像
drawImage(image, x, y, width, height); 在画布上定位图像,并规定图像的宽度和高度
drawImage(image, sx, sy, swidth, sheight, x, y, width, height); 剪切图像，并在画布上定位被剪切的部分

2、getImageData(x, y, dx, dy) // 同源策略

<canvas id="myCanvas" width="400" height="400"></canvas>
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var w = myCanvas.width;
    h = myCanvas.height;

var img = new Image();
img.src = "./timg.jpg";

img.onload = function () {
    ctx.drawImage(img, 0,0,w,h);
    var data = ctx.getImageData(0,0,400,400);
    console.log(data); // 报错，防服务器才能看到
}
</script>


3、createImageData(w, h) 创建新的空白 ImageData 对象

4、putImageData(imgData, x, y)  将图像数据放回画布上


抽取canvas为图片
canvas.toDataURL() ; 将canvas的内容抽取成⼀张图片, base64编码格式   注意这里不是ctx.啥啥啥
注：同源策略的限制，要开启服务器，在www目录下打开
将canvas的内容放入img元素里


模糊问题
1、位图像素放大会失真，canvas为位图像素。
2、canvas 绘图时，会从两个物理像素的中间位置开始绘制并向两边扩散 0.5 个物理像素。由于不存在 0.5 个像素，两边都取了1个像素，视觉上就造成了模糊。
解决方案：
放大再缩小展示

```



```html
练习绘制图像
<canvas id="myCanvas" width="400" height="400"></canvas>
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var w = myCanvas.width;
    h = myCanvas.height;

var img = new Image();
img.src = "./timg.jpg";

img.onload = function () {
    ctx.drawImage(img, 200, 200, 200, 200, 100, 100, 100, 100); 
}
</script>
```



```html
<canvas id="myCanvas" width="400" height="400"></canvas>
<script>
var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

var w = myCanvas.width;
    h = myCanvas.height;

var img = new Image();
img.src = "./timg.jpg";

img.onload = function () {
    ctx.drawImage(img, 0,0,w,h);
    var data = ctx.getImageData(0,0,400,400);
    console.log(data); // 报错，防服务器才能看到
}
</script>
```





## SVG

svg属于xml，不属于html5，严格遵循Xml， svg是矢量图，canvas是位图

一、使用

```css
Html:
<svg xmlns=“http://www.w3.org/2000/svg” version=“1.1”></svg>

Js:
var char = "http://www.w3.org/2000/svg";
var svg = document. createElementNS(char, 'svg’);

SVG元素对象一般通过调用setAttribute()方法来设定属性值
```

二、应用

1、图形（脑图）
2、图标、logo（矢量图）
3、动效	loading图

三、历史

1、在2003 年，SVG 1.1 被确立为 W3C 标准
2、Firefox、IE9+、Chrome、Safari

四、基础元素

```css
直线
<line x1="100" y1="100" x2="200" y2="100"></line>
矩形
<rect x="100" y="100" width="100" height="100" rx="20"ry="50"></rect>
圆形
<circle cx="100" cy="100" r="50"></circle>
椭圆
<ellipse rx="100" ry="50" cx="250" cy="250"></ellipse>
多边形
<polygon points="100 100, 70 150, 130 150"></polygon>
折线
<polyline points="0 100, 100 35, 200 150, 300 75, 400 150, 500 20"></polyline>  默认会填充 设成透明
字体
<text x="300" y="300">蝉壳</text>

属性可以直接写在标签里比如 stroke fill stroke-width fill-opciaty
```

五、基础样式

```css
1、fill: transparent;

2、stroke: red;

3、stroke-width: 10px;

4、stroke-opacity/fill-opacity: 0.5;

5、stroke-linecap: butt/round/square;

6、stroke-linejoin:bevel/round/miter;
```

重要元素：路径

```css
<path>元素可以定义一个路径，属性说明如下：
d: 定义路径指令:
M = moveto 移动到
L = lineto 画线到
H = horizontal lineto 水平线到
V = vertical lineto 垂直线到
C = curveto三次贝塞尔曲线到
S = smooth curveto光滑三次贝塞尔曲线到
Q = quadratic Bezier curve二次贝塞尔曲线到
T = somooth quadratic Bezier curve 光滑二次贝塞尔曲线到
A = elliptical Arc 椭圆弧 A 70 120 0 1 1 150 200

path的d属性用来绘制圆弧 “M cx cy A rx ry x-axis-rotation large-arc-flag sweep-flag x y”
cx cy为起点坐标，x y为终点坐标
x=cx+rxcos(π/2+θ)
y=cy−rysin(π/2+θ)

rx ry 两个半轴长度
x-axis-rotation 是椭圆相对于坐标系的旋转角度，角度数而非弧度数。
large-arc-flag 是标记绘制大弧(1)还是小弧(0)部分。
sweep-flag 是标记向顺时针(1)还是逆时针(0)方向绘制。

Z = closepath关闭路径
注：以上所有命令均允许小写，大写表示绝对定位，小写表示相对定位

```

[svg在线作图](https://editor.method.ac/)

路经属性

```css
1、stroke-dasharray: 10px;
画10空10
2、stroke-dashoffset: 15px;
缩回去多少
注：getTotalLength()获取路径长度  一般支持path

```



练习

### 直线缩回动画

```html
<style>
svg {
    border: 1px solid red;
}

path {
    fill: transparent;
    stroke: black;
    stroke-width: 3px;
    stroke-dasharray: 300px;
    stroke-dashoffset: 15px;
}
</style>

<svg width="500" height="500" xmlns=“http://www.w3.org/2000/svg” version=“1.1”>
    <path id="move" d="M 100 100 L 400 100"></path>
</svg>

<script>
var stroke = 10;
var timer = setInterval(function () {
    stroke += 10;
    if(stroke < 300) {
        move.style.strokeDashoffset = stroke + "px";

    }else {
        clearInterval(timer);
        move.style.strokeDashoffset = 300 + "px";

    }
},100)
</script>
```

### 曲线缩回动画

```html
<style>
svg {
    border: 1px solid red;
}

path {
    fill: none;
    stroke: black;
    stroke-width: 3px;
    /* stroke-dasharray: 300px; */
    /* stroke-dashoffset: 15px; */
}
</style>
<svg width="500" height="500" xmlns=“http://www.w3.org/2000/svg” version=“1.1”>
    <path id="move" d="M 100 100  A 70 120 90 1 1 150 200"></path>
</svg>

<script>
var total = move.getTotalLength();
console.log(total);
move.style.strokeDasharray = total + "px";
var stroke = 0;
var timer = setInterval(function () {
    stroke += 10;
    if(stroke < total) {
        move.style.strokeDashoffset = stroke + "px";

    }else {
        clearInterval(timer);
        move.style.strokeDashoffset = total + "px";

    }
},100)
</script>
```

### 利用缩回属性制作签名笔顺效果

```html
<style>
@keyframes show {
    to {
        stroke-dashoffset: 0;
    }
}
</style>

<body>
<svg>
	<path>。。。</path>
    <path>。。。。</path>
</svg>
</body>

<script>
var pathList = document.getElementsByTagName("path");
var delay = 0;
var len = pathList.length;

for(var i = 0; i< pathList.length; i ++) {
    var curLen = pathList[i].getTotalLength();

    pathList[i].style.strokeDasharray = curLen;
    pathList[i].style.strokeDashoffset = curLen;
    pathList[i].style.animation = "show " + curLen + "ms linear" + delay + "ms forwards";
    delay += curLen;
}
</script>
```







### 渐变

```html
1.线性渐变
<defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="100%">
        <stop offset="0%" style="stop-color:rgb(255,255,0);"/>
        <stop offset="100%" style="stop-color:rgb(255,0,0);"/>
    </linearGradient>
</defs>
<rect x="0" y="0" width="500" height="500"style="fill:url(#bg1)"/>

2.径向渐变
<defs>
    <radialGradient id="bg2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style="stop-color:green;"/>
        <stop offset="100%" style="stop-color:red;"/>
    </radialGradient>
</defs>

```



### 滤镜

```html
1.高斯滤镜
<defs>
    <filter id="Gaussian_Blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20"/>
    </filter>
</defs>
<rect x="0" y="0" width="500" height="500" fill=”yellow” style="filter:url(#Gaussian_Blur)"/>

2.其他滤镜
http://www.w3school.com.cn/svg/svg_filters_intro.asp

```



### viewbox

```css
1.、viewBox属性
<svg width="400" height="300" viewBox="0,0,40,30" style="border:1px solid #cd0000;">
    <rect x="10" y="5" width="20" height="15" fill="#cd0000"/>
</svg>

2、preserveAspectRatio(作用的对象都是viewBox) 
preserveAspectRatio="xMidYMid meet"
参数1：viewBox在svg中对齐方式（图片）
参数2：高宽比
meet:保持纵横比缩放viewBox适应viewport
slice:保持纵横比同时比例小的方向放大填满viewport
(在均匀缩放的同时保持viewbox的宽高比)
none: 不保持自己的宽高，扭曲纵横比以充分适应viewport

```



### svg动画练习

```html
<svg width="500" height="500" xmlns=“http://www.w3.org/2000/svg” version=“1.1”>
    <text x="0" y="450" stroke="#ff6700">蝉壳
        <animate attributeName="x" from="0" to="400" begin="2s" dur="1s"></animate>
        <animate attributeName="y"  to="100" begin="2s" dur="1s"></animate>
    </text>
</svg>
```



## svg和canvas对比







## Drag和Drog拖放操作

拖放API基础

```css
要加 draggable 属性

事件：
dragstart 被拖放元素 开始被拖拽时触发

drag 被拖放元素 在拖拽的过程中触发

dragend 被拖放元素 拖拽完成时

dragenter 目标元素 拖放元素进入目标元素时 以鼠标位置为准

dragover 目标元素 拖放元素在目标元素上时	e.preventDefault();取消默认事件dragleave

dragleave 目标元素 拖放元素在目标元素上离开  

drop 目标元素 被拖放的元素在目标元素上同时鼠标放开触发的事件 
        注：需要阻止dragover的默认行为才会触发drop事件
```



```html
<div class="drag" draggable="true">drag</div>
<div class="target">目标元素</div>

<script>
    var drag = document.getElementsByClassName("drag")[0];
    target = document.getElementsByClassName("target")[0];

    target.addEventListener("dragover", function (e) {
        e.preventDefault();
    })
    target.addEventListener("drop", function() {
        this.appendChild(drag);
    })

</script>
```



DataTransfer对象

```css
注意先要调用e.dataTransfer
dataTransfer 对象，它是事件对象的一个属性，用于从被拖动元素向放置目标传递字符串格式的数据。
1、getData()向DataTransfer对象中读取数据

2、setData()从DataTransfer对象中存放数据
```

练习

```html
<div class="drag" draggable="true">drag</div>
<div class="drag2" draggable="true">drag2</div>

<div class="target">目标元素</div>


<script>
    var drag = document.getElementsByClassName("drag")[0];
    var drag2 = document.getElementsByClassName("drag2")[0];
    var target = document.getElementsByClassName("target")[0];

    drag.addEventListener("dragstart", function (e) {
        var dt = e.dataTransfer;
        dt.setData("id", this.className)
    })
    drag2.addEventListener("dragstart", function (e) {
        var dt = e.dataTransfer;
        dt.setData("id", this.className)
    })


    target.addEventListener("dragover", function (e) {
        e.preventDefault();
    })
    target.addEventListener("drop", function(e) {
        var dt = e.dataTransfer;
        var text = dt.getData("id");
        // console.log();
        this.appendChild(document.getElementsByClassName(text)[0]);
    })
</script>
```





## 文件操作

fileList and file

```css
1、fileList: 表示用户选择的文件列表 是个数组

2、files: 表示file控件内的每一个被选择的文件对象。fileList为这些file对象的列表
 var list = file.files
```



fileReader对象

```css
负责把文件读入内存，并且读取文件中的数据。
var reader = new FileReader();
创建个对象后，有下面这些方法
1、读取并显示文件
readAsText() 读取为文本数据
readAsBinaryString()读取为二进制字符串
readAsDataURL()读取为DataURL字符串  常读取图片
readAsArrayBuffer()读取为一个ArrayBuffer对象
abort()中断读取操作
2、检测读取事件 abort()
onabort：数据读取中断时触发
onprogress: 数据读取中触发
onerror: 数据读取出错时触发
onload：数据读取完成时触发  只有读取成功时才触发
onloadstart: 数据开始读取时触发
onloadend: 数据读取完成时触发，无论成功还是失败
```





练习读取文件

```html
<input id="file" type="file" multiple>
<input id="btn" type="button" value="提交">

<script>
btn.onclick =function() {
    var list = file.files
    console.log(list);
    var len = list.length
    for(var i = 0; i< len; i++) {
        if(list[i].type == "image/jpeg") {
            // 应该执行的是上传代码
            alert(list[i].name + "上传成功");
        }
        if(list[i].type == "") {
            var reader = new FileReader();
            // console.log(reader);
            reader.readAsText(list[i]);

            // 文件读取完成后把结果打印一下
            reader.onload = function () {
                console.log(reader.result);
                // 这里是进行读取完成后上传
            }
        }
    }
}
</script>
```



Blob对象

```css
1、blob对象的访问

2、blob对象的创建

3、截取blob对象blob.slice(start, end)  裁剪文件，分段上传文件，网络不好的时候很有用
```

```html
<script>
// 注意这里必须是[]
var blob = new Blob(['asdf']);
var reader = new FileReader();

// reader.readAsText(blob.slice(0,2));  这样只打印as
reader.readAsText(blob);

reader.onload = function () {
    console.log(reader.result);
}
</script>
```





## ECharts

[5分钟上手echarts](https://echarts.baidu.com/tutorial.html#5 分钟上手 ECharts)

 ECharts，一个使用JavaScript实现的开源可视化库, 提供直观，交互丰富，可高度个性化定制的数据可视化图表。

three.js 

webgl 3d



## 优化Web动画

分别用setInterval、setTimeout实现动画

注意只是在做动画的时候更好！其他情况并不适用

```html
<script>
var oDemo = document.getElementsByClassName("demo")[0];

// setInterval实现
var timer = setInterval(move, 1000);

function move() {
    var l = oDemo.offsetLeft;
    console.log(l);
    if (l + 16 < 100) {
        oDemo.style.left = l + 16 + "px";

    }else {
        oDemo.style.left = 100 + "px";
        clearInterval(timer);
    }
}

// setTimeout实现
var timer2;
function move() {
    var l = oDemo.offsetLeft;
    // console.log(l);
    if (l < 500) {
        oDemo.style.left = l + 9 + "px";
        // move();
        timer2 = setTimeout(move, 100);
    }else {
        oDemo.style.left = 500 + "px";
    }
}
move();

</script>
```



**计时器做动画存在的问题**

1、当前窗口不在动画页面时，计时器仍将继续工作
2、回调函数执行耗时，当计时器设定的时间小于函数的执行时间，函数没执行完，计时器开始执行会堆积
3、设置动画频率高，倒是过度绘制，出现掉帧（导致不流畅）
	浏览器屏幕刷新频率 1000ms/60次 = 16.7ms / 次



**requestAnimationFrame优势**

这是HTML5提供的，使用方式和`setTimeout`一样

1、当前窗口不在动画页面时，停止工作
2、浏览器刷新屏幕时自动执行，无需设置时间间隔
3、浏览器优化

```javascript
// requestAnimationFrame实现
var timer2;
function move() {
    var l = oDemo.offsetLeft;
    // console.log(l);
    if (l < 500) {
        oDemo.style.left = l + 9 + "px";
        // move();
         var req = requestAnimationFrame(move);
    }else {
        oDemo.style.left = 500 + "px";
    }
}
move();


清空：
cancelAnimationFrame(req);
```



兼容性写法

```javascript
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        // 如果以上浏览器都不行，只能退而求其次执行下面的，后面时间不是绝对的，根据CPU情况
        function () {
            window.setTimeout(callback, 1000 / 60)
        }
})();

// 取消写法同上
window.cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        // 如果以上浏览器都不行，只能退而求其次执行下面的，后面时间不是绝对的，根据CPU情况
        function () {
            window.clearTimeout(timer)
        }
})();
```





canvas和requestAnimationFrame应用的例子

```html
<script>
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function () {
                window.setTimeout(callback, 1000 / 60)
            }
    })();


    var canvas, ctx;
    init();
    request();


    function init() {
        canvas = document.createElement("canvas");
        canvas.width = 210;
        canvas.height = 210;

        ctx = canvas.getContext("2d");
        document.body.appendChild(canvas)
    }
    function request() {
        requestAnimationFrame(request);
        draw();
    }

    function draw() {
        var time = new Date().getTime() * 0.002;
        var x = Math.sin(time) * 96 + 105;
        var y = Math.cos(time * 0.9) * 96 + 105;

        ctx.fillStyle = "pink";
        ctx.fillRect(0, 0, 210, 210);

        ctx.fillStyle = "rgb(255, 0, 0)";
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2, true);
        // 闭合图形，粗线不会有缺口
        ctx.closePath();
        // 填充渲染
        ctx.fill();
    }
</script>
```



## Geolocation地理位置信息

一般公司开发不用这个，会用其他已经封装好的

```javascript
1、window.navigator.geolocation对象 返回经纬坐标等元数据信息

2、获取当前地理位置
navigator.geolocation.getCurrentPosition(suc, err, obj);

参数1：suc成功回调，会返回position对象，有参数option，属性如下：
accuracy:经纬度的精度
altitude:null海拔
altitudeAccuracy:null海拔的精度
heading:null设备前进方向
latitude:34.0653347纬度
longitude:-118.24389099999999经度
speed:null设备前进速度
timestamp: 获取地理位置信息的时间

参数2：err失败回调，有参数error对象，属性如下：
code属性： 1 用户拒绝了位置服务
		  2 获取不到位置信息  网络断开
		  3 获取信息超时
message属性：错误信息字符串

参数3：obj 可选参数	    
	enableHighAccuracy：是否要求高精度的地理位置信息，需要设备支持 值是true
	timeout: 超时限制
	maximumAge: 缓存有效时间，若为0则无条件重新获取新地理信息 ,单位是毫秒

    
3、监事位置信息
      var id = navigator.geolocation.watchPosition(suc, err, obj);
      持续定期的自动获取用户的当前地理位置信息，并同计时器一样有个位置标识。
4、停止获取位置信息
       navigator.geolocation.clearWatch(id);
    
```





```javascript
navigator.geolocation.getCurrentPosition(suc, err, obj);

//function suc() {
//  console.log("suc"); // 谷歌浏览器不成功
//}
function suc(position) {
    console.log(position);
}
function err() {
    console.log("err");
}
var obj = {
    timeout: 100
}

```



```javascript
var obj = {
    timeout: 100
}

var id = navigator.geolocation.watchPosition(suc, err, obj);
function suc(position) {
    console.log(position);
}
function err(positionError) {
    console.log(positionError);
}
```



## worker多线程处理

使用场景：
大型数据运算、计时器、异步请求、访问navigator部分属性、js核心对象

局限性
1、不能跨域加载（所以我放到了服务器下）
2、worker文件不能访问DOM

```html
<script>
var worker = new Worker("worker.js");

// 传值给子线程
worker.postMessage(10);

// 响应子线程
worker.onmessage = function (e) {
    console.log(e.data); // 10000 必须在网络中使用
    if(e.data == 10000){
        worker.terminate();
        worker.postMessage(20);
    }    
} 
</script>
```

```html
<script>
close();
// 响应值
onmessage = function(e) {
    console.log(e.data); // 10
    var val = e.data * 10 * 10 *10;
    this.postMessage(val);
}

</script>
```



结束worker
1、close() 在worker文件中使用
2、terminate() 在worker对象上调用（worker.terminate）



## 三列布局

定位
两边固定宽度 left0, right0 中间的给做小宽度

浮动
左右按顺序给flot  中间的元素放最后

flex
左右给固定宽度 中间给flex-grow：1小的时候，由内容撑开，父级给一个最小宽度





## 两列布局

左侧固定，右侧自适应 

定位
左侧绝对定位，右侧设置margin-left， 或者给定位设置left 和rigth:0

浮动
左侧浮动，右侧加个margin-left, 或者设置overflow hidden  触发BFC，变成独立区域，对别的盒子不产生影响

flex
右侧给flex-grow:1(拉伸)





## 重排重绘

重排：当DOM元素影响了元素的几何属性（例如宽和高），浏览器需要重新计算元素的几何属性，同样其它元素的几何属性也会和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为“重排”。“回流”

重绘：完成重排后，浏览器会重新绘制受影响的部分到屏幕上中，该过程称为“重绘”。



重排发生的情况：

添加或删除可见的DOM元素。

元素位置改变。

元素的尺寸改变（width/height padding border margin）。

内容改变。

页面渲染器初始化。

浏览器窗口尺寸改变。



重绘发生的情况：

重绘发生在元素的可见的外观被改变，但并没有影响到布局的时候。

比如，仅修改DOM元素的字体颜色（只有Repaint，因为不需要调整布局）



## 浏览器的优化：渲染队列

以下属性或方法会刷新渲染队列

可以把这些值先赋给一个值，一起执行  注意读写操作分开

```css
offsetTop、offsetLeft、offsetWidth、offsetHeight

clientTop、clientLeft、clientWidth、clientHeight

scrollTop、scrollLeft、scrollWidth、scrollHeight

getComputedStyle()（IE中currentStyle）
```



## 重绘与重排的性能优化列

```html
1、分离读写操作
2、样式集中改变
document.getElementById("d1").style.cssText = "color:red; font-size:13px;";

3、缓存布局信息
div.style.left = div.offsetLeft + 1 + 'px';
div.style.top = div.offsetTop + 1 + 'px';

这种读操作完就执行写操作造成了2次重排
缓存可以进行优化
var curLeft = div.offsetLeft;
var curTop = div.offsetTop;
div.style.left = curLeft + 1 + 'px';
div.style.top = curTop + 1 + 'px';


4、元素批量修改
         先把li插入到ul中，再把ul插入到dom不好，利用文档碎片中documentFragment
<script>
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 10; i++) {
        var li = document.createElement("li");
        li.innerHTML = i;
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
</script>


或者拼接字符串
var str = "";
for (var i = 0; i < 10; i++) {
    str += "<li>" + i + "</li>";
}
ul.innerHTML = str;


《高性能javascript》
```

