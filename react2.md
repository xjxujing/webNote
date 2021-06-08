

# 基础

原生痛点

- 

- 
- 



react 特点

- 组件化 ，声明式编码（对面 命令式）。 提高效率和组件复用率
- React Native。移动端开发

- 虚拟 DOM + diff 算法。减少与真实 DOM 的交互





react 是 用于动态构建用户界面的 JavaScript 库(只关注于视图)

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

函数式组件：

1. React解析组件标签，找到了`MyComponent`组件
2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中

```html
<script type="text/babel">
		//1.创建类式组件
		class MyComponent extends React.Component {
			render(){
				//render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
				//render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
				console.log('render中的this:',this);
				return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
			}
		}
		//2.渲染组件到页面
		ReactDOM.render(<MyComponent/>,document.getElementById('test'))
</script>
```



类组件：

1. React解析组件标签，找到了`MyComponent`组件。

2. 发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。

3. 将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。





# 组件的三大属性

1. state

   - 状态必须通过`setState`进行更新,且更新是一种合并，不是替换
   - 构造器调用 1 次
   - render 调用 1 + n 次（初始化 + 渲染次数）
   - 方法调用几次

   理解：

   - state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)

   - 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)

     

   注意

   -  组件中render方法中的this为组件实例对象
   - 组件自定义的方法中this为undefined，如何解决：
     - 强制绑定this: 通过函数对象的`bind()`
     - 箭头函数
   - 状态数据，不能直接修改或更新
   
2. props

类组件

```jsx
//创建组件
class Person extends React.Component{

    constructor(props){
        //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
        // console.log(props);
        super(props)
        console.log('constructor',this.props);
    }

    //对标签属性进行类型、必要性的限制
    static propTypes = {  // 注意引入 PropTypes 库
        name:PropTypes.string.isRequired, //限制name必传，且为字符串
        sex:PropTypes.string,//限制sex为字符串
        age:PropTypes.number,//限制age为数值
    }

    //指定默认标签属性值
    static defaultProps = {
        sex:'男',//sex默认值为男
        age:18 //age默认值为18
    }

    render(){
        // console.log(this);
        const {name,age,sex} = this.props
        //props是只读的
        //this.props.name = 'jack' //此行代码会报错，因为props是只读的
        return (
            <ul>
                <li>姓名：{name}</li>
                <li>性别：{sex}</li>
                <li>年龄：{age+1}</li>
            </ul>
        )
    }
}

//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))


// 可以通过这种方式简写
// ReactDOM.render(<Person {...props}/>,document.getElementById('test1'))
```



函数组件

```jsx
//创建组件
function Person (props){
    const {name,age,sex} = props
    return (
        <ul>
            <li>姓名：{name}</li>
            <li>性别：{sex}</li>
            <li>年龄：{age}</li>
        </ul>
    )
}
Person.propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
}

//指定默认标签属性值
Person.defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```



3. **ref**
   - 字符串（不推荐 ，后面可能不支持，官网给了个链接说有一些问题 效率不高）
   - 回调
     - 内联函数（更新视图的时候，会调用两次。数据更新驱动页面 render）
     - 类的绑定函数
   - `createRef `调用后可以返回一个容器，该容器可以存储被ref所标识的节点, 用几个创建几个（推荐）



```jsx
// 回调形式

//创建组件
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this
        alert(input2.value)
    }
    render(){
        return(
            <div>
                <input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
            </div>
        )
    }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```





# 事件处理

自定义事件（合成事件）为了更好的兼容性

1. 通过`onXxx`属性指定事件处理函数(注意大小写)
   - `React`使用的是自定义(合成)事件, 而不是使用的原生 DOM 事件 —————— 为了更好的兼容性
   - `React`中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效

2. 通过`event.target`得到发生事件的 DOM 元素对象 ——————————不要过度使用 ref



# 非受控组件

输入类的 DOM **现用现取**

```jsx
//创建组件
class Login extends React.Component{
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this
        alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input ref={c => this.username = c} type="text" name="username"/>
                密码：<input ref={c => this.password = c} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



# 受控组件

**输入类的 DOM 随着数据的变化也维护状态**

```jsx
//创建组件
class Login extends React.Component{

    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

//保存用户名到状态中
saveUsername = (event)=>{
    this.setState({username:event.target.value})
}

//保存密码到状态中
savePassword = (event)=>{
    this.setState({password:event.target.value})
}

//表单提交的回调
handleSubmit = (event)=>{
    event.preventDefault() //阻止表单提交
    const {username,password} = this.state
    alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
}

render(){
    return(
        <form onSubmit={this.handleSubmit}>
            用户名：<input onChange={this.saveUsername} type="text" name="username"/>
            密码：<input onChange={this.savePassword} type="password" name="password"/>
            <button>登录</button>
        </form>
    )
}
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```



# 高阶函数



高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。

1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。

2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。

常见的高阶函数有：`Promise、setTimeout、arr.map()`等等。





# 函数柯里化

函数的柯里化：通过函数调用继续**返回函数**的方式，实现**多次接收参数**最后**统一处理**的函数编码形式。 



```javascript
function sum(a){
    return(b)=>{
        return (c)=>{
        	return a+b+c
        }
    }
}
```

# 生命周期（旧）

1. 初始化阶段: 由`ReactDOM.render()`触发---**初次渲染**
   - `constructor()`
   - `componentWillMount()`
   - ` render()` 
   - `componentDidMount()` =====> 常用（例如：开启定时器、发送网络请求、订阅消息）
2. 更新阶段: 由组件内部`this.setSate()`或父组件`render`触发
   - `shouldComponentUpdate()`
   - `componentWillUpdate()`
   - `render()` =====> 必须使用的一个
   - `componentDidUpdate()`
   - `componentWillReceiveProps()` (第一次的时候不走)
3. 卸载组件: 由`ReactDOM.unmountComponentAtNode()`触发
   - `componentWillUnmount()`=====> 常用（例如：关闭定时器、取消订阅消息）



**都是给实例用的**



# 生命周期（新）

1. 初始化阶段: 由`ReactDOM.render()`触发---初次渲染
   - `constructor()`
   - `getDerivedStateFromProps`
   - `render()`
   - `componentDidMount() `=====> 常用（例如：开启定时器、发送网络请求、订阅消息）
2. 更新阶段: 由组件内部`this.setSate()`或父组件重新`render`触发
   - `getDerivedStateFromProps`
   - `shouldComponentUpdate()`
   - `render()`
   - `getSnapshotBeforeUpdate`
   - `componentDidUpdate()`
3. 卸载组件: 由`ReactDOM.unmountComponentAtNode()`触发
   - `componentWillUnmount()`  例如：关闭定时器、取消订阅消息





# key 的作用

- 简单的说: key 是虚拟 DOM 对象的标识, 在更新显示时 key 起着极其重要的作用。

- 详细的说: 当状态中的数据发生变化时，react 会根据【新数据】生成【新的虚拟DOM】。随后 React 进行【新虚拟DOM】与【旧虚拟DOM】的 diff 比较，比较**规则**如下：
  - 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key：
    - 若虚拟DOM中内容没变, 直接使用之前的真实DOM
    - 若虚拟DOM中内容变了, 则生成新的真实 DOM，随后替换掉页面中之前的真实DOM
  - 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key：根据数据创建新的真实 DOM，随后渲染到到页面



**用 index 作为 key 可能会引发的问题**：

- 若对数据进行：逆序添加、逆序删除等破坏顺序操作：会产生没有必要的真实 DOM 更新 ==> 界面效果没问题, 但效率低。
- 如果结构中还包含输入类的 DOM：会产生错误 DOM 更新 ==> 界面有问题。
- 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的。



开发中如何选择key?

- 最好使用每条数据的唯一标识作为 key , 比如 id、手机号、身份证号、学号等唯一值
- 如果确定只是简单的展示数据，用 index 也是可以的



# 脚手架

1. xxx脚手架: 用来帮助程序员快速创建一个基于xxx库的模板项目
   1. 包含了所有需要的配置（语法检查、`jsx`编译、`devServer`…）
   2. 下载好了所有相关的依赖
   3. 可以直接运行一个简单效果
2. react 提供了一个用于创建 react 项目的脚手架库: create-react-app
3. 项目的整体技术架构为:  `react + webpack + es6 + eslint`
4. 使用脚手架开发的项目的特点: **模块化, 组件化, 工程化**



```html
<!-- %PUBLIC_URL%代表public文件夹的路径 -->
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
<!-- 开启理想视口，用于做移动端网页的适配 -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器) -->
<meta name="theme-color" content="red" />
<!-- SEO -->
<meta name="description"content="Web site created using create-react-app"/>
<!-- 用于指定网页添加到手机主屏幕后的图标 -->
<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
<!-- 应用加壳时的配置文件 -->
<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

<body>
    <!-- 若浏览器不支持js则展示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>
```

```
public ---- 静态资源文件夹
		favicon.icon ------ 网站页签图标
		index.html -------- 主页面
		logo192.png ------- logo 图
		logo512.png ------- logo 图
		manifest.json ----- 应用加壳的配置文件
		robots.txt -------- 爬虫协议文件
src ---- 源码文件夹
		App.css -------- App 组件的样式
		App.js --------- App 组件
		App.test.js ---- 用于给 App 做测试
		index.css ------ 样式
		index.js ------- 入口文件
		logo.svg ------- logo图
		reportWebVitals.js --- 页面性能分析文件(需要web-vitals库的支持)
		setupTests.js ---- 组件单元测试的文件(需要jest-dom库的支持)
```



/index.js

```js
//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'
//引入App组件
import App from './App'

//渲染App到页面
ReactDOM.render(<App/>,document.getElementById('root'))

```



# 样式模块

```jsx
import React,{Component} from 'react'
// css文件改名 然后取 hello.xxx
import hello from './index.module.css' 

export default class Hello extends Component{
	render(){
		return <h2 className={hello.title}>Hello,React!</h2>
	}
}
```



# 插件

vsCode 插件： ES7 React/Redux/GraphQL/React-Native snippets

`rcc` + Tab  类组件

`rfc` + Tab  函数组件



# Todo 例子

`uuid `

`nanoid`(推荐 很小)

```jsx
import {nanoid} from 'nanoid'


// 使用 id: nanoid()
```

**状态在哪里，操作状态的方法就在那里**





# 配置代理

总的思路就是 前端发送请求的地址**端口和域名**要和**前端**服务器一样，然后配置真实要请求的地址



比如：前端服务在 3000，后端服务在 500

- 在`package.json`中追加如下配置

```json
"proxy":"http://localhost:5000"  // 和服务器一致
```

**发送请求的时候直接写 3000（和前端服务一致）。发给 3000 的会被转发给 5000.**

注意：3000 有的资源，就不会再去服务器拿了（换句话说 3000 没有的找 5000）



优点：配置简单，前端请求资源时可以不加任何前缀。

缺点：不能配置多个代理。

工作方式：上述方式配置代理，当请求了3000不存在的资源时，那么该请求会转发给5000 （优先匹配前端资源）



- `src/setupProxy.js`   CJS 语法

```javascript
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/api1', {  // api1是需要转发的请求(所有带有/api1前缀的请求都会转发给5000)
            target: 'http://localhost:5000', //配置转发目标地址(能返回数据的服务器地址)
            changeOrigin: true, // 控制服务器接收到的请求头中 Host 字段的值 默认值是 false
            /* （算是配置了正向代理？）
         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
         	*/
            //去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
            pathRewrite: {'^/api1': ''} 
        }),
        proxy('/api2', { 
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrite: {'^/api2': ''}
        })
    )
}
```

优点：可以配置多个代理，可以灵活的控制请求是否走代理。

缺点：配置繁琐，前端请求资源时必须加前缀。



# `github` 搜索案例

注意：

1. [关于a标签target_blank使用rel=noopener](https://www.jianshu.com/p/c8319e095474)

2. 解构赋值+重命名

```js
// 获取用户的输入(连续解构赋值+重命名)
const { keyWordElement: { value: keyWord } } = this
```

3. 请求地址:  https://api.github.com/search/users?q=xxxxxx

4. 发布订阅： 先订阅 再发布（触发）

```jsx
import PubSub from 'pubsub-js'
```

5. fetch 文档

   https://github.github.io/fetch/

   https://segmentfault.com/a/1190000003810652

   

6. 实现注释折叠

```javascript
//#region

//#endregion
```

7. 如果返回的是非 promise 值，默认是成功状态（哪怕返回的是 undefined ）

```javascript
fetch(`/api1/search/users2?q=${keyWord}`).then(
    response => {
        console.log('联系服务器成功了');
        return response.json()
    },
    error => {
        console.log('联系服务器失败了',error);
        return new Promise(()=>{})
    }
).then(
    response => {console.log('获取数据成功了',response);},
    error => {console.log('获取数据失败了',error);}
) 
```



```javascript
fetch(`/api1/search/users2?q=${keyWord}`).then(
    response => {
        console.log('联系服务器成功了');
        return response.json() // response.json() 是 promise
    }
).then(
    response => {console.log('获取数据成功了',response);},
) .catch(error => console.log('请求出错', error))

// promise 可以最后统一处理错误
```



```javascript
//发送网络请求---使用fetch发送（优化）
try {
    const response= await fetch(`/api1/search/users2?q=${keyWord}`)
    const data = await response.json()
    console.log(data);
    PubSub.publish('atguigu',{isLoading:false,users:data.items})
} catch (error) {
    console.log('请求出错',error);
    PubSub.publish('atguigu',{isLoading:false,err:error.message})
}
```



# 路由

## SPA

1. 单页Web应用（single page web application，SPA）。

2. 整个应用只有**一个完整的页面**。

3. 点击页面中的链接**不会刷新**页面，只会做页面的**局部更新。**

4. 数据都需要通过 ajax 请求获取, 并在前端异步展现。



## 路由的理解

1. 什么是路由
   - 一个路由就是一个映射关系 `key: value`
   -  key 为路径，value 可能是 function 或 component

2. 路由分类
   - 后端路由：
     -  理解： value 是 function, 用来处理客户端提交的请求。
     - 注册路由： `router.get(path, function(req, res))`
     - 工作过程：当 node 接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据
   - 前端路由：
     - 浏览器端路由，value是component，用于展示页面内容。
     - 注册路由:  `<Route path="/test" component={Test}>`
     - 工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件



 



## `react-router-dom`

路由 react  路由器 router

印记中文

分 `dom native`

`HashRouter`

``BrowserRouter`





## 路由组件和一般组件

路由匹配上后展示的组件，放 pages 里面



1.写法不同：

​            一般组件：`<Demo/>`

​            路由组件：`<Route path="/demo" component={Demo}/>`

​      2.存放位置不同：

​            一般组件：components

​            路由组件：pages

​      3.接收到的props不同：

​            一般组件：写组件标签时传递了什么，就能收到什么

​            路由组件：接收到三个固定的属性

​        

```
history:
    go: ƒ go(n) // 前进|后退 n 步
    goBack: ƒ goBack() 
    goForward: ƒ goForward()
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)
location:
    pathname: "/about"
    search: ""
    state: undefined
match:
    params: {}
    path: "/about"
    url: "/about"
```



## 基础用法



要包在同一个  `BrowserRouter`里面

```jsx
import {BrowserRouter, Link, Route} from 'react-router-dom'


{/* 在React中靠路由链接实现切换组件--编写路由链接 */}
<Link className="list-group-item" to="/about">About</Link>
<Link className="list-group-item" to="/home">Home</Link>


{/* 注册路由 */}
<Route path="/about" component={About}/>
<Route path="/home" component={Home}/>

// App 包裹 BrowserRouter
```



## `NavLink`

`activeClassName` 指定类名

```jsx
{/* 默认追加类名 acitve */}
<NavLink activeClassName="atguigu" className="list-group-item" to="/about">About</NavLink>
<NavLink activeClassName="atguigu" className="list-group-item" to="/home">Home</NavLink>
```





标签体内容是特殊的标签属性

```jsx
<MyNavLink to="/about">About</MyNavLink>
<MyNavLink to="/home">Home</MyNavLink>

// MyNavLink 的封装
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
	render() {
		// console.log(this.props); 写在 MyNavLink 里面的东西会放在 children
		return (
			<NavLink activeClassName="atguigu" className="list-group-item" {...this.props}/>
		)
	}
}
```



## switch

1. 通常情况下，path和component是一一对应的关系。

2. Switch可以提高路由匹配效率(单一匹配)。

```jsx
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
</Switch>
```





## replace





## 样式丢失问题

1. public/index.html 中 引入样式时不写 `./ `写 `/ `（常用）

2. public/index.html 中 引入样式时不写 `./` 写 `%PUBLIC_URL%` （常用）

3. 使用 `HashRouter`



## 精准匹配

1.默认使用的是**模糊匹配**（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）

2.开启严格匹配：`<Route exact={true} path="/about" component={About}/>`

3.严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由

```jsx
<Switch>
    <Route exact path="/about" component={About}/>
    <Route exact path="/home" component={Home}/>
</Switch>
```

**出问题再用**



## `redirect`

一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

```jsx
<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>
```



## 嵌套路由

1.注册子路由时要写上父路由的path值

2.路由的匹配是按照注册路由的顺序进行的



## 路由传参

ajax 传的参数有` body params query` 

- `params`参数
  1. 路由链接(携带参数)：`<Link to='/demo/test/tom/18'}>详情</Link>`
  2. 注册路由(声明接收)：`<Route path="/demo/test/:name/:age" component={Test}/>`
  3. 接收参数：`this.props.match.params`



- search参数

  1. 路由链接(携带参数)：`<Link to='/demo/test?name=tom&age=18'}>详情</Link>`

  2. 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`

  3. 接收参数：`this.props.location.search`

     备注：获取到的search是`urlencoded`编码字符串，需要借助 `querystring` 解析

```jsx
import qs from 'querystring'

// 接收search参数
const {search} = this.props.location
const {id,title} = qs.parse(search.slice(1))
```

- state参数

  1. 路由链接(携带参数)：

     ​	`<Link to={{ pathname:'/demo/test',state: {name: 'tom',age: 18} }}>详情</Link>`

  2. 注册路由(无需声明，正常注册即可)：`<Route path="/demo/test" component={Test}/>`

  3. 接收参数：`this.props.location.state`

     备注：刷新也可以保留住参数



## 编程式路由导航

借助`this.prosp.history`对象上的 API 对操作路由跳转、前进、后退

- `this.prosp.history.push()`

- `this.prosp.history.replace()`

- `this.prosp.history.goBack()`

- `this.prosp.history.goForward()`

- `this.prosp.history.go()`





## `BrowserRouter`与`HashRouter`的区别

1. 底层原理不一样：
   - `BrowserRouter`使用的是H5的history API，不兼容IE9及以下版本
   -  `HashRouter`使用的是URL的哈希值

2. path 表现形式不一样

​            `BrowserRouter`的路径中没有 #,例如：localhost:3000/demo/test

​            `HashRouter`的路径包含#, 例如：localhost:3000/#/demo/test

3. 刷新后对路由state参数的影响
   - `BrowserRouter`没有任何影响，因为`state`保存在`history`对象中。
   - `HashRouter`刷新后会导致路由`state`参数的丢失！！！

​    4. 备注：`HashRouter`可以用于解决一些路径错误相关的问题。



# redux

## 精简版

1. 去除Count组件自身的状态

2. `src`下建立:

​			-redux

​            -store.js

​			-count_reducer.js

3. store.js：

​          1).引入redux中的`createStore`函数，创建一个store

​          2).`createStore`调用时要传入一个为其服务的reducer

​          3).记得暴露`store`对象

4. count_reducer.js：

​          1).`reducer`的本质是一个函数，接收：`preState,action`，返回加工后的状态

​          2).r`educer`有两个作用：初始化状态，加工状态

​          3).`reducer`被第一次调用时，是store自动触发的，

​                  传递的`preState`是`undefined,`

​                  传递的action是:`{type:'@@REDUX/INIT_a.2.b.4}`

5. 在 index.js 中监测 store 中状态的改变，一旦发生改变重新渲染 `<App/>`

​        备注：redux 只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。



## 完整版

新增文件：

1. count_action.js 专门用于创建 action 对象
2. constant.js 放置容易写错的 type 值



## 异步 action

1. 明确：延迟的动作不想交给组件自身，想交给action

2. 何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。

3. 具体编码：

   1. `yarn add redux-thunk`，并配置在 store.js 中

      ```js
      import {createStore, applyMiddleware} from 'redux'
      
      //引入redux-thunk，用于支持异步action
      import thunk from 'redux-thunk'
      
      
      createStore(reducer,applyMiddleware(thunk))
      ```

      

   2. 创建`action`的函数不再返回一般对象，而是一个函数，该函数中写异步任务。

      ```js
      const INCREMENT = 'increment'
      const DECREMENT = 'decrement'
      
      //同步action，就是指action的值为Object类型的一般对象
      export const createIncrementAction = data => ({type:INCREMENT,data})
      export const createDecrementAction = data => ({type:DECREMENT,data})
      
      //异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
      export const createIncrementAsyncAction = (data,time) => {
      	return (dispatch)=>{
      		setTimeout(()=>{
                  // 异步任务有结果后，分发一个同步的action去真正操作数据。
      			dispatch(createIncrementAction(data)) 
      		},time)
      	}
      }
      ```

      

   3. 异步任务有结果后，分发一个同步的action去真正操作数据。

      

4. 备注：异步 action 不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步 action。



## react-redux

1. 明确两个概念：

​            1).UI组件:不能使用任何 redux 的 API，只负责页面的呈现、交互等。

​            2).容器组件：负责和 redux 通信，将结果交给 UI 组件。



2. 如何创建一个容器组件————靠 react-redux 的 connect 函数

​            `connect(mapStateToProps,mapDispatchToProps)(UI组件)`

​			` mapStateToProps`映射状态，返回值是一个对象

​            `mapDispatchToProps`映射操作状态的方法，返回值是一个对象

3. 注意容器组件中的 store 是靠 props 传进去的，**而不是在容器组件中直接引入**

   

4. 注意`mapDispatchToProps`，也可以是一个对象



**优化**

1. 容器组件和UI组件整合一个文件

2. 无需自己给容器组件传递store，给`<App/>`包裹一个`<Provider store={store}>`即可。

3. 使用了react-redux后也不用再自己检测redux中状态的改变了，容器组件可以自动完成这个工作。

4. `mapDispatchToProps`也可以简单的写成一个对象

5. 一个组件要和 redux “打交道”要经过哪几步？
   - 定义好UI组件---不暴露
   - 引入connect生成一个容器组件，并暴露，写法如下：

```jsx
connect(
    state => ({key:value}), //映射状态
    {key: xxxxxAction} //映射操作状态的方法
)(UI组件)
```

6. 在 UI 组件中通过`this.props.xxxxxxx`读取和操作状态





## react-redux 数据共享版

1. 定义一个 Person 组件，和 Count 组件通过 redux 共享数据。

2. 为Person组件编写：reducer、action，配置 constant 常量。

3. 重点：Person 的 reducer 和 Count 的Reducer要使用`combineReducers`进行合并，

​          合并后的总状态是一个对象！！！

4. 交给 store 的是总 reducer，最后注意在组件中取出状态的时候，记得 “取到位”。

```js
// store.js

//引入 createStore，专门用于创建 redux 中最为核心的 store 对象
import {createStore,applyMiddleware,combineReducers} from 'redux'
//引入为 Count 组件服务的 reducer
import countReducer from './reducers/count'
//引入为 Count 组件服务的reducer
import personReducer from './reducers/person'
//引入 redux-thunk，用于支持异步 action
import thunk from 'redux-thunk'

//汇总所有的 reducer 变为一个总的 reducer
const allReducer = combineReducers({
	he:countReducer,
	rens:personReducer
})

//暴露 store
export default createStore(allReducer,applyMiddleware(thunk))
```



##  纯函数

一类特别的函数: 只要是同样的输入(实参)，必定得到同样的输出(返回)。必须遵守以下一些约束：

- 不得改写参数数据
- 不会产生任何副作用，例如**网络请求**，**输入和输出设备**
- 不能调用`Date.now()`或者`Math.random()`等不纯的方法  



**redux 的 reducer 函数必须是一个纯函数**



## 开发者工具

1. `yarn add redux-devtools-extension`
2. store 中进行配置

```js
// store.js
import {composeWithDevTools} from 'redux-devtools-extension'

// 如果没有异步 
// const store = createStore(allReducer, composeWithDevTools())
const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
```





## 小结

1. 所有变量名字要规范，尽量触发对象的简写形式。

2. reducers文件夹中，编写index.js专门用于汇总并暴露所有的reducer



```jsx
// /index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.render(
	/* 此处需要用Provider包裹App，目的是让App所有的后代容器组件都能接收到store */
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
)
```



```jsx
// /App.js
import React, { Component } from 'react'
import Count from './containers/Count' //引入的 Count 的容器组件
import Person from './containers/Person' //引入的 Person 的容器组件

export default class App extends Component {
	render() {
		return (
			<div>
				<Count/>
				<hr/>
				<Person/>
			</div>
		)
	}
}
```



```js
// /src/reduce/store.js
/* 
	该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/

//引入createStore，专门用于创建redux中最为核心的store对象
import {createStore,applyMiddleware} from 'redux'
//引入汇总之后的reducer
import reducer from './reducers'
//引入redux-thunk，用于支持异步action
import thunk from 'redux-thunk'
//引入redux-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

//暴露store 
export default createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))
```

```js
// 汇总 reducer
// /src/redux/reducers/index.js

//引入combineReducers，用于汇总多个reducer
import {combineReducers} from 'redux'
//引入为Count组件服务的reducer
import count from './count'
//引入为Person组件服务的reducer
import persons from './person'

//汇总所有的reducer变为一个总的reducer
export default  combineReducers({
	count,
	persons
})
```

```js
// /src/redux/reducers/count.js

/* 
	1.该文件是用于创建一个为 Count 组件服务的 reducer，reducer 的本质就是一个函数
	2.reducer函数会接到两个参数，分别为：之前的状态(preState)，动作对象(action)
*/
import {INCREMENT,DECREMENT} from '../constant'

const initState = 0 //初始化状态
export default function countReducer(preState=initState,action){
	// console.log('countReducer@#@#@#');
	//从action对象中获取：type、data
	const {type,data} = action
	//根据type决定如何加工数据
	switch (type) {
		case INCREMENT: //如果是加
			return preState + data
		case DECREMENT: //若果是减
			return preState - data
		default:
			return preState
	}
}
```



```jsx
// /container/Count/index.jsx

import React, { Component } from 'react'
//引入action
import {
	increment,
	decrement,
	incrementAsync
} from '../../redux/actions/count'
//引入connect用于连接UI组件与redux
import {connect} from 'react-redux'

//定义UI组件
class Count extends Component {

	state = {carName:'奔驰c63'}

	//加法
	increment = ()=>{
		const {value} = this.selectNumber
		this.props.increment(value*1)
	}
	//减法
	decrement = ()=>{
		const {value} = this.selectNumber
		this.props.decrement(value*1)
	}
	//奇数再加
	incrementIfOdd = ()=>{
		const {value} = this.selectNumber
		if(this.props.count % 2 !== 0){
			this.props.increment(value*1)
		}
	}
	//异步加
	incrementAsync = ()=>{
		const {value} = this.selectNumber
		this.props.incrementAsync(value*1,500)
	}

	render() {
		//console.log('UI组件接收到的props是',this.props);
		return (
			<div>
				<h2>我是Count组件,下方组件总人数为:{this.props.renshu}</h2>
				<h4>当前求和为：{this.props.count}</h4>
				<select ref={c => this.selectNumber = c}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>当前求和为奇数再加</button>&nbsp;
				<button onClick={this.incrementAsync}>异步加</button>&nbsp;
			</div>
		)
	}
}

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
	state => ({
		count: state.count,
		personCount: state.persons.length
	}),
	{ increment, decrement, incrementAsync }
)(Count)

```



```js
// /src/redux/actions/count.js
/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT} from '../constant'

//同步action，就是指action的值为Object类型的一般对象
export const increment = data => ({type:INCREMENT,data})
export const decrement = data => ({type:DECREMENT,data})

//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const incrementAsync = (data,time) => {
	return (dispatch)=>{
		setTimeout(()=>{
			dispatch(increment(data))
		},time)
	}
}
```





# 打包



```powershell
npm run build

npm i serve -g


# 以 build 为根目录启动服务
serve build
```



 

# 扩展

`webpack` 的 plugin 下载 引入 实例化 3 步后才能用。  loader 下载后直接用



## `antd` 按需引入样式



1. 安装依赖：`yarn add react-app-rewired customize-cra babel-plugin-import less less-loader`

2. 修改 `package.json`

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}     
```



3. 根目录下创建config-overrides.js

```js
const { override, fixBabelImports,addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: { '@primary-color': 'green' },
        }
    }),
);
```

备注：不用在组件里亲自引入样式了，即：`import 'antd/dist/antd.css'`应该删掉





