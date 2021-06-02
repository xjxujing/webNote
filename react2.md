# 基础

原生痛点

- 

- 
- 



react 特点

- 组件化 ，声明式编码（对面 命令式）。 提高效率和组件复用率
- React Native。移动端开发

- 虚拟 DOM + diff 算法。减少与真实 DOM 的交互



## 初识

```html
<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel" > /* 此处一定要写babel */
		//1.创建虚拟DOM
		const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 */
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
```



## 虚拟 DOM 创建的两种方式

JSX

```html
<script type="text/babel" > /* 此处一定要写babel */
//1.创建虚拟DOM
const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
<h1 id="title">
	<span>Hello,React</span>
</h1>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

JS

```html
<script type="text/javascript" > 
    //1.创建虚拟DOM
    const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
    //2.渲染虚拟DOM到页面
    ReactDOM.render(VDOM,document.getElementById('test'))
</script>
```

**babel 会把 JSX 转成 JS**

## 虚拟DOM

1. 本质是Object类型的对象（一般对象）

2. 虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实 DOM上那么多的属性。

3. 虚拟 DOM 最终会被 React 转化为真实 DOM，呈现在页面上。



## JSX 语法规则

全称 JavaScript XML

> XML 早起用于存储和数据传输，后来出现了 json



- 定义虚拟DOM时，不要写引号

- 标签中混入JS表达式时要用{}
- 样式的类名指定不要用`class`，要用 `className`
- 内联样式，要用`style={{key:value}}`的形式去写。
- 只有一个根标签
- 标签必须闭合
- 标签首字母
  - 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
  - 若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。





## 语句(代码)与 表达式

表达式。一个表达式会产生一个值，可以放在任何一个需要值的地方**。下面这些都是表达式：

-  `a`

-  `a+b`

-  `demo(1)`

-  `arr.map() `

-  `function test () {}`

  

语句(代码)。下面这些都是语句(代码)：

- `if(){}

- `for(){}``

- ``switch(){case:xxxx}`





## 模块与组件、模块化与组件化的理解

模块

1. 理解：向外提供特定功能的 JS 程序, 一般就是一个 JS 文件

2. 为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。
3. 复用 JS, 简化 JS 的编写, 提高 JS 运行效率

组件

1. 理解：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)

2. 为什么要用组件： 一个界面的功能更复杂

3. 作用：复用编码, 简化项目编码, 提高运行效率



模块化：当应用的js都以模块来编写的, 这个应用就是一个模块化的应用

组件化：当应用是以多组件的方式实现, 这个应用就是一个组件化的应用。可以包括 结构样式交互 资源





# 面向组件

> 浏览器会默认发个请求，找当前主机和端口 favicon.io 图标

```html
<script type="text/babel">
		//1.创建函数式组件
		function MyComponent(){
			console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
			return <h2>我是用函数定义的组件(适用于【简单组件】的定义)</h2>
		}
		//2.渲染组件到页面
		ReactDOM.render(<MyComponent/>,document.getElementById('test'))

	</script>
```



执行了`ReactDOM.render(<MyComponent/>.......)`之后，发生了什么？

1. React解析组件标签，找到了`MyComponent`组件
2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中



