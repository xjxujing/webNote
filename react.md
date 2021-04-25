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





## 组件

### 使用 Class 创建组件

CDN 引入 react、react-dom、babel ( 处理 JSX 语法 )

### 组件状态

data 数据、 UI 状态

### DOM 事件

### this 对象

### 修改状态

### 例子

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



##  Create React App

```powershell
# 安装
npx create-react-app my-app
```









## React Router

### routers

### route parameters

### redirects





## Redux

### stores

### actions

### reduces



