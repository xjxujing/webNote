webpack是模块打包机

~~~html
分析项目结构，找到js模块以及其它的一些浏览器不能直接运行的拓展语言(SCSS、TypeScript、 png),并将其打包为合适的格式供浏览器使用
~~~



## 可以做的事

~~~html
代码转换（ES6转ES5,LESS转CSS）、文件优化(压缩代码体积，合并文件)、代码分割(公共模块抽离,路由懒加载,模块合并)、自动更新（热更新）、代码校检、自动发布
~~~



## 需要掌握

ES6 和node基础

~~~html
webpack常见配置
webpack高级配置
webpack优化策略
astc抽象语法树
webpack的Tapable
掌握webpack流程，手写webpack
手写webpack中常见的loader
手写webpack中常见plugin
~~~



## 实践



### 安装

~~~shell
npm init -y  # 生成package.json

# 安装webpack核心库、命令行工具、webpack服务器，并保存到开发环境
npm add webpack webpack-cli webpack-dev-server -D
~~~



~~~json
// 结合webpack中文文档-> 指南
"scripts": {
    "start": "webpack --config webpack.config.js"
}
~~~

### 加载js

根目录下新建 `webpack.config.js`，查看文档起步 -> 使用一个配置文件

~~~javascript
// 引用 node 包的 path 工具
const path = require('path')

module.exports = {
    mode: 'development', // 默认production,开发环境会压缩
    entry: './src/index.js',
    output: {
        filename: '[hash:8]-bundle.js', // 随机的哈希名
        path: path.resolve(__dirname, 'dist') // 打包之后，再根目录下新建dist文件夹，打包后的文件放在这个目录下
      }
}
~~~



### 加载css

~~~shell
npm add style-loader css-loader -D
~~~



~~~javascript
// 引用 node 包的 path 工具
const path = require("path");

module.exports = {
    mode: "development", // 默认production,开发环境会压缩
    entry: "./src/index.js",
    output: {
        filename: "bundle.js", // 随机的哈希名
        path: path.resolve(__dirname, "dist") // 打包之后，再根目录下新建dist文件夹，打包后的文件放在这个目录下
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 正则匹配到 css 结尾的文件
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};

~~~



### 自动更新

`dev-server`

`webpack.config.js`

~~~javascript
"devServer": {
   "contentBase": './dist'
},
~~~

`packjson.json`

~~~javascript
"scripts:" {
    "start": "webpack-dev-server --open",
     "build": "webpack"
}
~~~

控制台可以看到`HMR(HotModuleReplacement)`

