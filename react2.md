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



