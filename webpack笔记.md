## Babel 

### Babel 的原理

1. parse: 把代码 code 变成 AST
2. traverse: 遍历 AST 进行修改
3. generate: 把 AST 变成代码 code2

eg:  把 code 变成 code 2 把 let 变成 var

用 typescript 可以快速提示，不用看文档了



### 为什么必须要用 AST

你很难用正则表达式来替换，正则很容易把 let a = 'let' 变成 var a = 'var'

你需要识别每个单词的意思，才能做到只修改用于声明变量的 let

而  AST 能明确地告诉你每个 let 的意思



### 例子

```typescript
import traverse from "@babel/traverse"
import generate from "@babel/generator"

const code = `let a = 'let'; let b = 2`
const ast = parse(code, { sourceType: 'module' })
traverse(ast, {
  enter: item => {
   	// 如果当前节点类型是变量声明                   
    if(item.node.type === 'VariableDeclaration'){
      if(item.node.kind === 'let'){
        item.node.kind = 'var'
      }
    }
  }
})
const result = generate(ast, {}, code)
console.log(result.code)
```

```shell
# 运行 TS 代码
node -r ts-node/register xxx.ts

node -r ts-node/register --inspect-brk  xxx.ts
```

如果提示node版本升级，直接到官网下载覆盖

### Babel 作用

1. 代码转换

   - ES6 代码转成 ES5 代码

     可以，使用 @babel/core 和 @babel/preset-env 即可

   - 文件转 ES5 

     babel.transformFromAstSync 可以把 ast 变成 code2
     如果图方便，可以用 babel.transformSync 直接把 code 变成 code2
     @babel/preset-env 内置了很多转换规则

2. 依赖分析

   用哈希表存储文件依赖

- **简单依赖**

分析依赖的思路：

1.调用 collectCodeAndDeps('index.js')，代码中会有更多细节
2.先把 depRelation['index.js'] 初始化为 { deps: [], code: 'index.js的源码' }
3.然后把 index.js 源码 code 变成 ast
4.遍历 ast，看看 import 了哪些依赖，假设依赖了 a.js 和 b.js
5.把 a.js 和 b.js 写到 depRelation['index.js'].deps 里
6.最终得到的 depRelation 就收集了 index.js 的依赖，简单吧 

```js
{
  'index.js': {
    deps: [ 'a.js', 'b.js' ],
    code: "import a from './a.js'\r\n" +
      "import b from './b.js'\r\n" +
      'console.log(a.value + b.value)\r\n'
  }
}
```



- **嵌套的依赖**

如何分析整个项目的所有依赖关系（递归）

1.collectCodeAndDeps 太长了，缩写为 collect
2.调用 collect('index.js')
3.发现依赖 './a.js' 于是调用 collect('a.js')
4.发现依赖 './dir/a2.js' 于是调用 collect('dir/a2.js')
5.发现依赖 './dir_in_dir/a3.js' 于是调用 collect('dir/dir_in_dir/a3.js')
6.没有更多依赖了，a.js 这条线结束，发现下一个依赖 './b.js'
7.以此类推，其实就是递归

- **循环依赖**

一旦发现这个 key 已经在 keys 里了，就 return
这样分析过程就不是 a -> b -> a -> b -> ... 而是 a -> b -> return
注意我们只需要分析依赖，不需要执行代码，所以这样是可行的
**由于我们的分析不需要执行代码，所以叫做静态分析**
但如果我们执行代码，就会发现还是出现了循环



建议不要用循环依赖

### 小结

- 工具

  babel 可以把高级代码翻译为 ES5
  @babel/parser
  @babel/traverse
  @babel/generator
  @babel/core 包含前三者
  @babel/preset-env 内置很多规则

- AST

  parse: 把代码 code 变成 AST
  traverse: 遍历 AST 进行修改
  generate: 把 AST 变成代码 code2

- 循环依赖

  有的循环依赖可以正常执行
  有的循环依赖不可以
  但都可以做静态分析

- 代码技巧

  使用哈希表来存储数据
  通过检测 key 来避免重复



## 核心

### 分析

现象：

怎样才能运行 import / export

不同浏览器功能不同
现代浏览器可以通过 <script type=module> 来支持 import export
IE 8~15 不支持 import export，所以不可能运行

激进的兼容策略：把代码全放在 <script type=module> 里
缺点：不被 IE 8~15 支持；而且会导致文件请求过多。
**平稳的兼容策略：把关键字转译为普通代码，并把所有文件打包成一个文件**
缺点：需要写复杂的代码来完成这件事情，我们这节课要研究的就是这个





### 怎么把 import 变成一个函数

@babel/core 已经帮我们做了

import 关键字不见了，变成了 require()
export 关键字不见了，变成了 exports['default']



细节1

`import b from './b.js' `/ 变成了
`var _b = _interopRequireDefault(require("./b.js"))`
`b.value` 变成了 
`_b['default'].value`

_ 下划线前缀是为了避免与其他变量重名
该函数的意图是给模块添加 'default'
为什么要加 default：CommonJS 模块没有默认导出，加上方便兼容
内部实现：return m && m.__esModule ? m : { "default": m }
其他 _interop 开头的函数大多都是为了兼容旧代码



细节2

`export default a` 变成了
`var _default = a; exports["default"] = _default;`
简化一下就是 `exports["default"] = a`



结论

import 关键字会变成 require 函数

export 关键字会变成 exports 对象





### 怎么把文件都打包成一个文件

打包成一个什么样的文件？

肯定包含了所有模块，然后能执行所有模块=====>

把所有依赖分析出来，然后只需要执行入口文件即可



dist.js

```js
ver depRelation = [
  {
			key: 'index.js',
      deps: ['a.js', 'b.js'],
      code: function(require, module, exports) {}
  },
  {
			key: 'a.js',
      deps: ['b.js'],
      code: function(require, module, exports) {}
  },
  {
			key: 'b.js',
      deps: ['a.js'],
      code: function(require, module, exports) {}
  }
]
var moudles = {} // 作为缓存
execute(depRelation[0].key)
function execute(key) {}
```



## loader 原理

### 分析

我们的 bundler 只能加载 JS
我们想要加载 CSS
如果我们能把 CSS 变成 JS，那么就可以加载 CSS 了

把 CSS 变字符串放到 js 然后创建 style 标签 style.innerHTML = str

### loader 长什么样子

- 一个 loader 可以是一个普通函数

```js
function transform(code){
  const code2 = doSomething(code)
  return code2
}
module.exports = transform // 用 module 是为了兼容 Node.js
```

- 一个 loader 也可以是一个异步函数

```js
async function transform(code){
  const code2 = await doSomething(code)
  return code2
}
module.exports = transform // 旧版本 Node.js 不支持 export 关键字
```

### 单一职责

每个 loader 只做一件事

css-loader : 只把 css 转 js

style-loader: 只把转过的 css 放进 html 里面

sass-loader、less-loader 这些 loader 是把代码从一种语言转译为另一种
因此将这样的 loader 连接起来不会出问题
**但 style-loader 是在插入代码，不是转译，所以需要寻找插入时机和插入位置**
插入代码的时机应该是在获取到 css-loader 的结果之后
插入代码的位置应该是在就代码的下面



### Webpack 官方 style-loader 的思路

style-loader 在 pitch 钩子里通过 css-loader 来 require 文件内容
然后在文件内容后面添加 injectStylesIntoStyleTag(content, ...) 代码
我可以告诉你核心代码在哪，并说出大概思路
想深入了解需要自己调试代码（下节课讲怎么调试）



### 使用过哪些 loader

- 加载 .scss 文件

  写个 sass-loader 把 SCSS 文件转为 CSS

  再交给 css-loader 转为 JS

  最后用 style-loader 创建 style 标签

- 加载 .less 文件

  写个 less-loader 把 LESS 文件转为 CSS

  再交给 css-loader 转为 JS

  最后用 style-loader 创建 style 标签

- 加载 .styl 文件

- 加载 .ts 文件

  awesome-typescript-loader
  或者 ts-loader

- 加载 .md 文件

  markdown-loader

- 加载 .html 文件

  html-loader

- 加载 .txt 文件

  raw-loader

- 加载 .vue 文件

  vue-loader

  **没有 react-loader 因为本身就是 js文件，babel 支持 jsx语法**

### **思考**

`import logo from './images/logo.png';`
React:` <img src={logo} /> `
这个要用什么 loader，其工作原理是什么？至少有两种思路

方案：遇到 png 结尾的文件，直接放到 public 文件，然后获取到相对路径，把相对路径作为默认导出，如果比较小可以转成 Base64 编码



### 看过那些 loader 源码

- raw-loader

- css-loader

### 自己写一个 loader

按照文档初始化一个项目
看别人怎么写的
复制过来
改一改，有问题就翻自定义插件文档
测试（文档里有示例，也可以抄别人的思路）
发布到 npm
在项目里使用它 markdown-loader

markdown-loader 加载 md 转成 html

### 小结

webpack 的 loader 是什么？

webpack 自带的打包器只能支持 JS 文件，当我们想要加载 css/less/scss/stylus/ts/md 文件时，就需要用 loader，loader 的原理就是把文件内容包装成能运行的 JS比如，加载 css 需要用到 style-loader 和 css-loader，单一职责原则，css-loader 把代码从 CSS 代码变成` export default str `形式的 JS 代码，style-loader 把代码挂载到 head 里的 style 标签里，回答完毕



## 源码赏析

### 准备工作

1. 准备 IDE

   可折叠代码、去到定义的函数，返回和前进

2. 准备 源码

   （1）创建一个 demo 项目，调试 webpck 、webpack-cli

```shell
# 创建 demo 文件夹，创建 package.json
yarn init -y
yarn add webpack@5.10.1 webpack-cli@4.2.0

# 新建 src/index.js，打包这个文件
npx webpack-cli
```

​		（2）下载 webpack-cli 代码，切到一致的版本（和 demo 同级）

​		（3）下载 webpack 代码，切到一致的版本（和 demo 同级）

### 调试方法



```shell
# 直接创建 demo ,使用浏览器调试
node --inspect-brk .\node_modules\webpack-cli\bin\cli.js
```

方式二 软连接

```shell
# 下载 webpack-cli 代码，切到一致的版本
git reset --hard webpack-cli@4.2.0


# 把源码注册到缓存  ,后面可以直接运行 yarn link webpack-cli
cd packages/webpack-cli
yarn link
```



### 带着问题





## Plugin 原理

webpack打包会有一些阶段：

init   run   compile   compilation   make   aftercompile   seal   codeGen   emit   done

初始化   运行   编译开始 编译过程 开始编译（做文件的处理） 编译结束 代码封装合并  生成最终代码 文件写到硬盘 结束



imagemin-webpack-plugin  压缩图片 src/inde.js apply 里面是主要逻辑  emit 的时候

clean-webpack-plugin 清除 build 目录  emit 时候 done时候

ProvidePlugin 自动全局使用



### 如何自己写plugin

[文档](https://webpack.js.org/contribute/writing-a-plugin/#creating-a-plugin)

对 webpack hooks 的了解
对编译原理的了解
对 chunk、hash、module、dep、factory 等概念的理解



## Loader 与 Plugin 的区别

loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。

plugin是一个扩展器，可以介入 webpack 的每个阶段，插入一些操作，删文件改文件都是可以的 压缩图片、





## 优化

### 开发体验优化

1. module.rules： 使用 `test、include` 配置 **确保转译尽可能少的文件** 命中 Loader 要应用规则的文件 `cacheDirectory`开启缓存

2. **优化文件监听的性能**，watchOptions 忽略 /node_modules/
3. resolve.moudles：直接去当前目录的 node_modules 目录找模块 配置 resolve.moudles 但是如果第三方依赖中有 node_modules  会出现找不到
4. resolve.mainFields：只采用 main 字段作为入口文件的描述字段，以减少搜索步骤
5. resolve.extensions：自动解析确定的扩展。频率最高的后缀放在第一位，以减少尝试次数



**单独打包**

- runtime 单独打包， 如果不单独打包，修改 webpack 配置的是时候会导致用户的缓存失效，必须重新下载最新的 main.js。单独打包只要不改 index.js 或源码，就不需要重新下载提高了整个页面的加载性能

- node 的依赖单独打包

  比如 react、vue如果打包到 main.js，打包会很慢。也没有必要反复打包，单独打包可以缓存下来，编译的时候缓存之前的文件

固定 **moduleIds**

```js
//webpack.config.js
module.exports = {
    optimization: {
       	moduleIds: 'deterministic', // 固定 moduleIds
        runtimeChunk: 'single' // runtime 单独打包
        splitChunks: {//分割代码块
            cacheGroups: {
                vendor: { // node_modules 里面的目录一般叫 vendor
                   // 当配置 common 的时候加上，vendor 的优先级要比 common高
                   priority: 10, // 先考虑 node_modules,然后看有没有被多次引用
                    minSize: 0, // 如果不写，react 文件太小，会直接跳过
                    // 匹配 /node_modules/ 或 \node_modules\
                    test: /[\\/]node_modules[\\/]/,
                    // 哪些文件要单独打包， initial 表示同步文件单独打包
                    // 还有async(异步文件打包) 和 all(同步异步都单独打包) 
                    chunks: 'all',
                    name: 'vendors'
                    // 上面配置的结果是把符合条件的打包为 vendors.xxx.js                   
                },
  						// 如果是多页面配置
 							common: {                                                                                   priority: 5,
                    //公共模块
                    chunks: 'initial',
                    name: 'common',
                    minSize: 0, // 100 代表大小超过100个字节， 0 代表不管文件都小都生效
                    minChunks: 3 // 最少引入了3次
                }
            }
        }
    }
}
```





### 代码质量优化

#### Tree shaking

- 保留 ES6 模块化语句  .babelrc
- 使用UglifyJsPlugin插件 mode:"production"默认已经开启，告诉webpack每个模块明确使用exports，诸如/* unused harmony export */这样的注释
- 



## 多页面配置







