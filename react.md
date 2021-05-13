### 特点

- 声命式设计 描述应用

- 高效 减少操作 DOM

- 灵活

- JSX

- 组件化

- 单向响应的数据流

### 准备

1  CDN 引入

2  vscode 插件 ES7 react/..(完整 react 开发环境)、Sublime Babel(Oceanic Next 语法高亮 JSX) 、Monokai pro（vscode 主题）

3  调试工具 React-Dev-Tool





### `Redux`

应用层的状态管理（ 这里指 数据 和 UI ）



### 环境配置





## 组件

### 使用 Class 创建组件

CDN 引入 react、react-dom、babel ( 处理 JSX 语法 )

### 组件状态

data 数据、 UI 状态

### DOM 事件

### this 对象

### 修改状态



##  Create React App

```powershell
# 安装
npx create-react-app my-app
```

### 单页面应用

### 组件嵌套

### Props 传参

### 列表渲染

### 容器组件

- state
- 生命周期
- 不包含 UI
- 类创建

### UI 组件

- 没有 state
- props 传数据
- 只包含 UI
- 函数创建





## 例子

```react
class App extends React.Component {
      state = {
        name: 'Lucy',
        age: 20
      }

      handleClick = (e) => {
        this.setState({
          name: 'niuniu'
        })
      }
      handleMouseover(e) {
        console.log(e.target, e.pageX)
      }
      handleCopy(e) {
        console.log('触发复制')
      }
      render() {
        return (
          <div className="app-content">
            <h1>欢迎！</h1>
            <p>{Math.random() * 10}</p>
            <p>姓名：{this.state.name}, 年龄：{this.state.age}</p>
            <button onClick={this.handleClick}>按钮</button>
            <button onMouseOver={this.handleMouseover}>悬停</button>
            <p onCopy={this.handleCopy}>这里复制文本</p>
          </div>
        )
      }
    }
    // 注意 id="app" 的 DOM 已经准备好
    ReactDOM.render(<App />, document.getElementById('app'))

```





## React Router

### routers

```jsx
BrowserRouter 

Route

Link

NavLink

Switch
```



### route parameters

```jsx
props.history.push('/about')

当组件不受路由控制的时候使用 withRouter([组件名]) 获取路由参数

props.history
props.match.params
```

### redirects



## Higher Order Components(HOC)

react 复用组件的技巧

参数为组件，返回一个新组件的函数





## 图片导入



## Redux

1. MDN 使用

JavaScript 状态容器 可预测化的状态管理 codepen 中的例子 ， babel cdnjs.com

```javascript
const { createStore } = Redux

// 3.
const initState = {
    todos: [],
    posts: []
}

// 2.
function myReducer(state = initState, action) {
   if(action.type === 'ADD_POST') {
  console.log([...state.posts, action.post])
     return {
       ...state,
       posts: [...state.posts, action.post]
     }
   } 
}

// 1.
const store = createStore(myReducer)


// 6. 订阅 store (监听 store 如果 state 变化就执行)  注意顺序
store.subscribe(() => {
    console.log('store 已更新', store.getState())
});



// 4.
const postAction = {
    type: 'ADD_POST',
    post: 'my first blog'
}

// 5. 
store.dispatch(postAction)

```





2. react 项目中使用

```shell
npm install redux react-redux
```



```javascript
// rootReducer.js
const initState = {
    posts: [
        {id: '1'}
    ]
}

const rootReducer = (state = initState, action) => {
    return state
}

export default rootReducer
```



```react
// index.js
import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(rootReducer)

ReactDOM.render(
	<React.StrictMode>
    	// Provider 包裹组件
		<Provider store={store}><App /></Provider>
    </React.StrictMode>,
	document.getElementById('root')
)
```



```react
// Home.js
import { connect } from 'react-redux'
import { Component } from 'react'


class Home extends Component {
    render() {
        // 看看有哪些结果
        console.log(this.props)
    }
    
}

const mapStateToProps  = (state, ownProps) => {
    // ownProps 相当于获取 props
    return {
        posts: state.posts
    }
}  // 和 reducer 关联


const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => dispatch({
            type: 'DELETE_POST',
            id: id
        })
    }
}

// rootReducer 可以和 store 拿数据了
export default connect(mapStateToProps, mapDispatchToProps)(Home) 
```

