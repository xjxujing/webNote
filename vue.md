## 准备

原生实现的问题

UI和数据不同步

vue的原则 数据双向绑定 不操作dom

MVC	MVP	MVVM

前端渲染 VS 后台渲染

| 前端渲染                   | 后台渲染   |
| -------------------------- | ---------- |
| 降低服务器负担、带宽压力小 | SEO友好    |
| 用户体验好                 | 兼容性好   |
|                            | 安全性更好 |

vue的核心是数据  典型的MVVM开发模式



## 

## 指令

directive	补充了html的属性 



## 属性绑定 

 `v-bind`   `v-html`  `v-text`(少用)

~~~html
<div id="app">
    <input type="text" v-model="name">
    <span>你的姓名是:{{ name }}</span>
    <p>{{ great("morning") }}</p>
    <a v-bind:href="website">百度一下</a>
    <input type="text" v-bind:value="name">
    <p v-html="websiteTag"></p>
</div>

<script>
new Vue({
    el: '#app',
    data: {
        name: 'xujing',
        website: "https://baidu.com",
        websiteTag: "<a href='www.baidu.com'>这里是百度</a>"
    },
    methods: {
        great: function(timer) {
            return 'good ' + timer + ' ' + this.name + '!';
        }
    }
});
</script>
~~~

~~~html
class和style可以分别绑定数组和json对象

v-html 会转译标签 有风险
v-text 不转义标签
~~~

> methods不要用箭头函数 ，因为this会被固定指向window



## 事件绑定 

​	`v-on`

### 鼠标事件

事件修饰符

~~~html
<div class="app">
        <!-- 只能点击一次 -->
        <button v-on:click.once="add(1)">涨一岁</button>
    
        <button v-on:click="subtract(1)">减一岁</button>
        <button v-on:dblclick="add(10)">涨十岁</button>
        <button v-on:dblclick="subtract(10)">减十岁</button>

        <p>My age is {{ age }}</p>

        <div class="wrapper" @mousemove="updateXY">
            {{x}}, {{y}} - 
            <!-- 阻止冒泡 -->
            <span @mousemove.stop>Stop Moving</span>
        </div>

        <!-- 阻止默认事件,这里是点击a后默认跳转页面 -->
        <a @click.prevent="alert" href="http://baidu.com">百度一下</a>
</div>

<script>
new Vue({
    el: ".app",
    data: {
        age: 30,
        x: 0,
        y: 0
    },
    methods: {
        add: function (num) {
            this.age += num;
        },
        subtract: function (num) {
            this.age -= num;
        },
        updateXY: function (e) {
            console.log(e);
            this.x = e.offsetX;
            this.y = e.offsetY;
        },
        alert: function() {
            alert("hello!")
        }
    }
});
</script>
~~~



### 键盘事件

按键修饰符

~~~html
<div id="app">
    <h1>键盘事件</h1>
    <label for="">姓名: </label>
    <input type="text" @keyup="logName">
    <label for="">年龄: </label>
    <!-- 链式调用 -->
    <input type="text" @keyup.alt.enter="logAge">
</div> 

<script>
new Vue({
    el: "#app",
    methods: {
        logName: function () {
            console.log("你正在输入姓名");
        },
        logAge: function () {
            console.log("你正在输入年龄");
        }
    }
});
</script>
~~~



## 双向数据绑定

v-model

~~~html
input select textarea

text 和 textarea 元素使用 value 属性和 input 事件
checkbox 和 radio 使用 checked 属性和 change 事件
select 字段将 value 作为 prop 并将 change 作为事件

通过v-mode进来的数据都是字符串  数据计算加parseInt()
~~~

~~~html
<div id="app">
    <h1>键盘事件</h1>
    <label for="">姓名: </label>
    <!-- 借助ref标记实现数据绑定 -->
    <input ref="name" type="text" @keyup="logName">
    <span>{{ name }}</span>

    <label for="">年龄: </label>
    <!-- v-model绑定了data中的age -->
    <input type="text" v-model="age">
    <span>{{ age }}</span>
</div> 

<script>
new Vue({
    el: "#app",
    data: {
        name: "",
        age:"18"
    },
    methods: {
        logName: function () {
            this.name = this.$refs.name.value
            // console.log(this.$refs.name.value);
        },
        // logAge: function () {
        //     console.log("你正在输入年龄");
        // }
    }
});
</script>
~~~

~~~html
v-model是语法糖
<input type="text" :value="name" @input="name=$event.target.value">
~~~







## 计算属性

需要经过计算才能获得数据，建议放在computed（）中

~~~html
<div class="app">
    <button v-on:click="a++">A+20</button>
    <button v-on:click="b++">B+20</button>
    <p>A+1: {{ a }}</p>
    <p>B+1: {{ b }}</p>
    
    <!-- 注意使用计算属性这里不加() -->
    <p>这是A+20: {{ addtoA }}</p>  
    <p>这是B+20: {{ addtoB }}</p>
</div>

<script>
new Vue({
    el: ".app",
    data: {
        a: 0,
        b: 0,
        age: 20
    },
    /* 用methods下面两个函数会一起执行
    methods: {
        addtoA: function () {
            console.log(123);
            return this.a + this.age;
        },
        addtoB: function () {
            console.log(456);
            return this.b + this.age;
        }
    }
    */
   computed: {
        addtoA: function () {
            console.log(123);
            return this.a + this.age;
        },
        addtoB: function () {
            console.log(456);
            return this.b + this.age;
        }
    }
});
</script>

如果变化很大会使用computed属性  虚拟dom和真实dom不同的时候，才会触发计算属性
~~~



chanke

~~~javascript
computed: {
    output: function() {
        return this.count > 5 ? "大于五" : "小于五";    //computed会判断count是否发生变化 一般有返回值 这个设置给output  都是同步代码
    }
}
watch: {
    count: function(val) { // 当count数据发生变化的时候 执行该函数 并把最新的传给第一个参数val
        console.log(val); // 不用有返回值，直接逻辑操作
        this.ouutput2 = this.count > 5 ? "大于五" : "小于五";
        var vm = this;
        window.setTimeout(function(){ // 可以写异步操作
            vm.count = 0; // 2s之后count归零
        }, 2000);
    }
}
methods: {
    result: function() {  // 执行这个函数
        
    }
}
~~~







## 动态绑定CSS样式

~~~html
<div class="app">
<!-- 直接绑定事件,修改属性 -->
<!-- <span @click="changeColor = !changeColor" :class="{changeColor: changeColor}">xujing</span> -->

    <button @click="changeColor = !changeColor">change color</button>
    <button @click="changeLength = !changeLength">change length</button>
    <span v-bind:class="chClass">xujing</span>
</div>

<script>
new Vue({
    el: ".app",
    data: {
        changeColor: false,
        changeLength: false
    },
    computed: {
        chClass: function () {
            return {
                changeColor: this.changeColor,
                changeLength: this.changeLength
            };
        }
    }
});
</script>
~~~



## v-if 和v-show

~~~html
v-show控制的是display:none
v-if是删掉元素

表单中input隐藏了也会起作用

<div class="app">
    <button v-on:click="error = !error">toggle error</button>
    <button v-on:click="success = !success">toogle success</button>

    <!-- 元素会不在dom结构中 -->
    <!-- <p v-if="error">网络连接错误：404</p>
    <p v-else-if="success">网络连接成功：200</p> -->

    <!-- 控制元素dispay -->
    <p v-show="error">网络连接错误：404</p>
    <p v-show="success">网络连接成功：200</p>
</div>

<script>
new Vue({
    el: ".app",
    data: {
        error: false,
        success: false
    }
});
</script>
~~~



## v-for循环

~~~javascript
1. 数组 v-for="item,index in items"
2. json v-for="val,key in json"
3. 字符串 v-for="char,index in str"
4. 数组  v-for="i in num"
~~~



~~~html
<div class="app">
    <!-- 数组遍历 -->
    <ul>
        <li v-for="i in charcters">
            {{i}}
        </li>
    </ul>
    <ul>
        <li v-for="i in users">
            {{i.name}} - {{i.age}}
        </li>
    </ul>

    <!-- 使用template当作临时元素,结果不会有临时元素 -->
    <template v-for="i in users">
        <p>{{i.name}} - {{i.age}}</p>
    </template>

    <!-- 获取到索引 -->
    <div v-for="(i,index) in users">
        <p>{{index + 1}}..{{i.name}} - {{i.age}}</p>
    </div>
    
    <!-- 遍历数组中的对象 -->
    <div v-for="(use, index) in users">
        <div v-for="(val, key) in use">
            {{key}} - {{val}}
        </div>
    </div>
    
    <!-- 使用key -->
    <div v-for="(use, index) in users">
        <div v-for="(val, key) in use" v-on:key="key">
            {{key}} - {{val}}
        </div>
    </div>
</div>

<script>
new Vue({
    el: ".app",
    data: {
        charcters: ["小红", "小明", "小花"],
        users: [
            { name: "cc", age: "22" },
            { name: "amiee", age: "18" },
            { name: "luwei", age: "23" },
        ]
    }
});
</script>
~~~



### 虚拟Dom

~~~html
:key属性
虚拟Dom是一个大json
<ul>
    <li>
    	<h2></h2>
        <p></p>
    </li>
</ul>
vue开始执行的时候先解析页面 生成自己的虚拟dom
~~~

~~~javascript
{
    tag:"ul",
    children:[
        {tag:"li",children:[
            ....
        ]}
    ]
}
实际操作的是虚拟dom  再渲染到dom 可以减少重复渲染的次数

vue需要跟踪数据的变化过程
对于循环生成的元素，通过key来标记,实现跟踪
数据中一般加id
~~~



~~~
虚拟DOM:
合并请求
快速查询
局部刷新
~~~



## 其他指令

~~~html
v-pre: 预编译
提高性能 防止意外

v-clock: 配合CSS 渲染后才会显示
*[v-block] {
	display: none
}
~~~



## 初始化多个vue对象

~~~html
<div class="app1">
    <h1>{{ title }}</h1>
    <button @click="changeTitle">改app2的标题</button>
</div>

<div class="app2">
    <h1>{{ title }}</h1>
    <button @click="changeTitle">改app1标题</button>
</div>


<script>
var one = new Vue({
    el: ".app1",
    data: {
        title: "app1的标题",
    },
    methods: {
        changeTitle: function () {
            two.title = "app2的标题改了"
        }
    }
});
// two.title = "111";
var two = new Vue({
    el: ".app2",
    data: {
        title: "app2的标题",
    },
    methods: {
        changeTitle: function () {
            one.title = "改变app1的标题"
        }
    }
});
</script>
~~~



## 初识组件

~~~html
<div class="app1">
    <greeting></greeting>
</div>
<div class="app2">
    <greeting></greeting>
</div>

<script>
Vue.component("greeting", {
    // 这里是模板
    template: `
    <p>
        {{name}}: 大家好，这是我女朋友@关晓彤
        <button v-on:click="changeName">改名字</button>
    </p>
    `,
    data: function () {
        return {
            name: "鹿晗"
        }
    },
    methods: {
        changeName: function() {
            this.name = "Herry"
        }
    }
});

new Vue({
    el: ".app1"
});
new Vue({
    el: ".app2"
});
</script>
~~~



## Vue Cli脚手架

~~~html
脚手架是通过webpack搭建的开发环境
使用ES6语法
打包和压缩JS为一个文件
项目文件在环境中编译，而不是浏览器
实现自动刷新页面
~~~



~~~shell
--save  和 --save-dev
一个放在package.json 的dependencies , 一个放在devDependencies里面
~~~



~~~sh

# mac安装全局命令用sudo
sudo npm install --global vue-cli
# 用cnpm更快

# 装好后查看当前版本
vue --version

# 创建到要创建的目录下执行:
vue init webpack vue-playlist # 创建基于webpack模板的新项目
vue init webpack-simple pizza-app # 更加简洁

Project name  # 项目名称不要有大写: vue-playlist
Project description	# 项目描述: vue基础知识
Author # 作者
Runtime + Compiler # 选择这个  独立运行和构建
Install vue-router # 先不装后面再装 n
Use ESinit to lint your code  # 代码要非常严谨 n
Setup unit tests with Karma + Mocha 	# 测试的 n
Setup e2e tests with Nightwatch		# n

# cd 到项目文件夹下
cnpm install # 安装项目所需要的模块
~~~



~~~css
项目文件内容
build 构建客户端和服务端 可以改变端口号
config 配置文件夹
src	后续工作内容的目录
static 静态文件

index.html 入口文件
package.json  依赖的东西
README.md 对应的指令
~~~



~~~shell
npm run dev	# 开启8081(或者其他编号)的端口 展示当前项目的页面内容
~~~



### src目录

~~~javascript
执行index.html(入口文件)  ->  执行main.js实例化vue对象 执行App.vue   ->  App.vue

main.js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',

  // 模板调用组件前需要在这里注册组件'./App'
  components: { App },

  // 模板：组件调用标签 也可以是普通标签
  template: '<App/>' 
})

~~~



~~~html
App.vue	根组件  每个组件都会有模板、行为、样式
<!-- 1.模板: html结构 -->
<template>
  <!-- 这里有且只能有一个根标签 -->
  <div id="app">
    <h1>{{title}}</h1>
  </div>
</template>

<!-- 2.行为: 处理逻辑 -->
<script>
// import HelloWorld from './components/HelloWorld'
export default {
  name: 'App',
  data() {
    return {
      title: "这是我的第一个vue组件项目"
    }
  }
}
</script>

<!-- 3.行为: 解决样式 -->
<style>
    
</style>

~~~



## vue组件嵌套

~~~html
在 components 文件夹下写一个组件 Users.vue
<template>
  <div class="users">
    <ul>
      <li v-for="(user,index) in users" :key="index">{{ user }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      users: ["Herry", "Bucky", "Amy"]
    };
  }
};
</script>

<style>
    
</style>
~~~



全局注册组件 在main.js中添加

~~~javascript
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Users from './components/Users' // 这里导入

Vue.config.productionTip = false

// 全局注册在组件: 第一参数是起的名字当做调用标签，第二个参数是对应的组件
Vue.component("users", Users);  // 这里添加

/* eslint-disable no-new */
new Vue({
  el: '#app',

  // 模板调用组件前需要在这里注册组件'./App'
  components: { App },
  // 模板：组件调用标签 也可以是普通标签
  template: '<App/>' 
})

~~~



局部注册组件 在App.vue中添加

~~~html
<!-- 1.模板: html结构 -->
<template>
  <div id="app">
    <h1>{{title}}</h1>
    <users></users>  不管全局注册组件还是局部注册组件 都要在这里使用
  </div>
</template>

<!-- 2.行为: 处理逻辑 -->
<script>
import Users from './components/Users' // 这里导入组件

export default {
  name: 'App',
  data() {
    return {
      title: "这是我的第一个vue脚手架项目"
    }
  },
  components: {
    "users": Users  // 这里注册组件  注意组件调用标签不可以和html原生标签冲突
  }
}
</script>

<!-- 3.行为: 解决样式 -->
<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>

~~~

## 组件CSS作用域

scoped可以限制各自作用域



## 属性传值

### 父组件向子组件传值

父组件放好数据，然后父组件中的**子组件标签**绑定v-bind，在子组件中拿数据props

~~~javascript
数据放在父组件
data() {
	return {
        zzz: xxx
    }
}

并绑定
<子组件标签 v-bind:aaa="zzz"></组件标签>


子组件
props: {
    aaa: {
        type: Boolean,
        required: true,
            default:
    } 
}
~~~



### 子组件向父组件传值

（通过事件传值）

触发子组件的方法时，会影响父组件的内容

子组件在方法中自定义事件,并绑定事件响应方法  父组件标签中**子组件标签**绑定该事件v-on,并给响应该事件的方法，父组件中实现对应方法,

~~~javascript
子组件
<v-on:click="changeTitle"></>
methods: {
    changeTitle: function () {
        // 注册事件，第一个参数自定义的事件名称，第二参数是传的内容
        this.$emit("titleChanged","向父组件传值");
    }
}


父组件中
<子组件标签 v-on:titleChanged="updateTilte($event)"></组件标签>

父组件中
methods: {
    updateTilte: function (title) {
        this.title = title;
	}
}
<子组件标签 v-bind:title>
~~~





传值：基本类型

传引用（数组和对象）传的是地址

## 生命周期

组件实例化创建到结束

1.寻找问题

2.解决需求

### 钩子函数

钩子函数在捕获消息的第一时间执行

~~~javascript
子组件中   钩子函数
 // lifecycle hooks
    beforeCreate(){
        alert('组件实例化之前执行的函数');
    },
    created(){
        alert('组件实例化完毕,但页面还未显示');
    },
    beforeMount(){
        alert('组件挂载前,页面仍未显示,但虚拟dom已配置');
    },
    mounted(){
        alert('组件挂载后,此方法执行,页面显示');
    },
        
    beforeUpdate(){
        alert('组件更新前,页面仍未更新，但虚拟dom已配置');
    },
    updated(){
        alert('组件更新,方法执行后页面显示');
    }


beforeDestory(){
        alert('组件销毁前');
    }
Destoryed(){
        alert('组件销毁前');
    }
~~~



官网图解

- 标红部分是生命周期的构造函数

### 生命周期详解

~~~css
创建vue实例 new Vue()

1.beforeCreate() 
[组件实例化之前执行的函数]
a.数据的检测 监听配置 Obsever Data
b.初始化事件html中绑定是事件监听methods init Events


2.created() 页面一旦出现就做的事
[组件实例化完毕,但页面还未显示]
a.是否元素挂载点 Has "el" option ?  如果没有vm.$mount(el) is called  这样触发
b.是否有template Has "template" option
应用: 封装的事件可以在这里拿到 数据和方法都可拿到和执行
可以异步处理数据、初始化
this.$nextTick(()=>{}) nextTick更新数据后立刻处理数据


如果有template   通过render函数编译
如果没有template  html作为模板


3.beforeMount()  
[组件挂载前,页面仍未显示,但虚拟dom已配置]
判断el对应的dom元素是否已经加载进文档流


4.mounted()  
[组件挂载后,此方法执行,页面显示]
a.mounted 可以对数据监测 如果数据更新 可以正常读取dom数据 
有初始数据的dom渲染 这里有事件队列的概念 可以获取dom
	aa.更新前beforeUpdated()  
	[组件更新前,页面仍未更新，但虚拟dom已配置]
		
	ab.更新后updated()  
	[组件更新,方法执行后页面显示] 

应用: updated()中,数据更新的统一处理可以在这里进行 如果分别处理用$nextTick
watch: {}对具体某个数变化做统一处理
注意: 如果没有el 这样触发new Vue().$mount("#app")



5.实例销毁
销毁前beforeDestory() 解除所有事件绑定 数据监听 销毁组件
销毁后destoryed
vm.$destory()
~~~

 



### render函数

~~~javascript
// 模板 -> 编译 -> ast数结构 -> render函数 -> 虚拟dom -> 真实html 

new Vue({
    el: "#app",
    render: function(createElement) { // createElement是个函数
        // 1 字符串dom节点
        // 2 对象 div的class或者id 也可以没有
        // 3 数组 文本节点
        return createElement("div", [ "hi", createElement( "p",["liuluwei"] ) ] )
    }
})
createElement() // 也可以直接放组件
// <div>
//	hi
//	<p>liuluwei</p>
// </div>
~~~









~~~html
node_model 下
vue文件夹 src是源码 core
dist是打包后
~~~







## 路由

router是指根据URL分配到对应的处理程序（前端可以理解是网页代码）

页面用a标签，每次点击都会发送请求，但实际很多单页面只需要修改下页面逻辑就可以达到目的

路由也是实现页面跳转，但是性能会更好

对于前端，浏览器配合超链接实现路由功能，但是对于单页面已经不适用

~~~css
安装
npm install vue-router --save-dev   安装路由模块 并保存 可以用cnpm

npm run dev 重启项目
~~~

### Vue-Router使用

~~~javascript
回到main.js
// 导入路由模块:
inport VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)

// 配置路由 是个数组
const router = new VueRouter({
    routes: [
        {path: '/',componet: Home}, // 没有s
        {path: '/Helloworld',componet: HelloWorld},
    ],
    mode: 'history'  // 删掉网址中的#
})
// 实例化中使用
new Vue({
    router,
})
~~~



~~~html
// 根组件中模板加上
<ul>
    <li>
        <router-link to="/">Home</router-link>
        <router-link to="/Helloworld">Helloworld</router-link>
    </li>
</ul>
<router-view></router-view>
~~~



### vue-resource的使用

~~~css
npm vue-resource --save  安装模块

安装好后重启
~~~

~~~js
回到main.js
import VueResource from 'vue-resource'

Vue.use(VueResource)

使用以下接口:
jsonplaceholder.typicode.com   提供fake online api
http://jsonplaceholder.typicode.com/users


到Home.vue中
组件实例化完毕,但页面还未显示的时候拿到数据  钩子函数
created(){  // 组件实例化完毕,但页面还未显示
    this.$http.get('http://jsonplaceholder.typicode.com/users')
    .then((data)=>{
        console.log(data);
    })
},
~~~



## 实现跨域请求

本地请求：保存post.json到static 不能随便放 



### fetch

~~~javascript
在App.vue中
添加钩子函数
created(){   // 组件实例化完毕,但页面还未显示
    // fetch
    fetch("/apis/test/testToken.php",{
       method:"post",
       headers:{
         "Content-type":"application/json",  // 可以加也可以不加
         token:"f4c902c9ae5a2a9d8f84868ad064e706" // 该接口需要有token
       },
       body:JSON.stringify({username:"henry",password:"321321"})  // 必须要传的json数据 要转成字符串
     })
    .then(result => {
       // console.log(result)
       return result.json()   // 解读readableStream要进行json解析
     })   // 解析完后还要then
     .then(data => {
       console.log(data)
     })
  }

搜索vue proxytable
到config->index.js    搜索proxyTable

跨域配置
proxyTable: {
      '/apis': {
        // 测试环境
        target: 'http://www.thenewstep.cn/',  // 接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
            '^/apis': ''   //需要rewrite重写的,
        }              
      }
    }, 
        
重新配置后一定要重启 npm run dev
~~~

### axios

axios是目前主流的http请求库，基于Promise实现异步

封装的ajax 返回的一个promise 还自带了前端拦截器 自动转化json等功能

~~~javascript
cnpm install --save axios

main.js中
import axios from 'axios' 引入模块

// 全局配置
Vue.prototype.$axios = axios 全局使用
axios.defaults.baseURL = "" 通用的接口
设置请求头
axios.defaults.headers.common['Authorization'] = "Token"  拿到令牌
axios.defaults.headers.post["Content-type"] =  "application/urlencode"
axios.defaults.headers.get["Accepts"] =  "application/json"


如果全局配置很多内容 可以在src下 新建axios-auth.js
import后
const instance=axios.create({
    baseURL:""
})
instance.defaults.headers.common["sth"] = "sth"

export default instance


App.vue中配置
created(){   // 组件实例化完毕,但页面还未显示
    // axios
    this.$axios.post("/apis/test/testToken.php",{username:"hello",password:"123456"})
        .then(data => {
          console.log(data)
        })
  }
也要在index.js中解决跨域问题

设置token
main.js中
axios.defaults.headers.common['token'] = "f4c902c9ae5a2a9d8f84868ad064e706"
axios.defaults.headers.post["Content-type"] = "application/json"  可以加可以不加
~~~



~~~javascript
局部引用axios

组件内 
import axios from 'axios'

methods: {
    post: function () {
        var _this=this;
        axios.post("",this.blog).then(function(data) {
            console.log(data)
            _this.submmited =true // 个人博客的代码中这句话this的指向
        })
        
        axios.post("",this.blog).then((data) =>{
            this.submmited =true // 这里的this指向还是之前的
        })
    }
}
~~~



## Vue-Cli3.0

在这里看文档

https://github.com/vuejs/vue-cli

~~~shell
升级vue-cli  mac加sudo
npm install -g @vue/cli

vue --help  k

create 创建新项目
add 添加插件
invoke 从已经创建好的项目调用插件
inspect 检查webpack配置
serve 开发环境
build 生产环境  打包上线的时候用
ui UI界面
init 生成一个项目
~~~

~~~shell
安装vue cli3后还是可以使用 vue2.0的 vue init webpack 项目名称
npm install -g @vue/cli-init
~~~



### 安装插件

~~~shell
vue add vuetify  安装ui

如果安装的模块对界面影响不大
npm install
~~~

### 环境变量



### 独立运行.vue文件

~~~shell
# 终端中
vue serve Hello.vue

npm install	 -g的提示安装
~~~



### 图形页面构建项目



### vue.config.js



## vuex

主要应用于Vue.js中管理数据状态的一个库

创建一个集中的数据存储，供程序中所有组件访问

store可以理解为单一数据源 ：	C1  C2  C3  C4

~~~shell
# 安装vuex
npm install vuex --save
~~~



## 项目打包

~~~html
打包 npm run build
生成dist文件夹
打开index.html 把/static 前面的/ 删掉
~~~



Vue响应式核心原理

~~~javascript
深度遍历了data属性的Object.defineProperty() 实现数据劫持？
Oberserve观察者


~~~



## vue动画

~~~shell
cnpm i vue2-animate -D

main.js 
import 'vue2-animate/dist/vue2-animate.min.css'
~~~

### 一个东西

~~~html
<input type="button" value="显示或隐藏" @click="b=!b">
<transition name="fade"> 可以是fadeDown fadeUp
	<div class="box" v-if="b"></div>
</transition>

<script>
data() {
	return {
		b: true
    }
}
</script>

<style>
    .box {
        width: 200px;
        height:200px;
        background: #ccc;
        animation-duratoin: 1s;
    }
</style>
~~~



### 一组东西

~~~html
<input type="button" value="显示或隐藏" @click="b=!b">
动画的name可以是bounce
<transition-group tag="ul" class="list" name="fade">
        <li v-for="item,index in arr" @click="del(index)" :key="index">{{item}}</li>
</transition-group>
注意key最好用数据的id

<script>
data() {
	return {
		b: true，
        arr:[12,5,8,9,33,27]
    }
},
methods:{
	del(index) {
        this.arr.splice(index,1);
    }
</script>

<style>
    .list li {
        w100
        h100
        margin 20
        list-style none
        bac #ccc
        animation-duration: 10s
    }
</style>
~~~

[animate.css官网](https://daneden.github.io/animate.css/)





## vue原理

### 数据单项绑定

~~~html
<div id="div1">
	姓名：{{name}}<br>
	年龄：{{age}}
</div>

<script>
let el = document.getElementById("div1")
let template = el.innerHTML;

// Proxy
let _data = {
    "name": "blue",
    "age": 18
}
let data = new Proxy(_data, {
    set(obj, name, value) {
        obj[name] = value;
        // console.log("数据改变");

        render();
    },
    // get(){}  不要有这个
});

render();
function render() {
    el.innerHTML = template.replace(/\{\{\w+\}\}/g, str => {
        str = str.substring(2, str.length - 2);

        return _data[str];
    });
}
// data.name = "blue2"
</script>
~~~

### 数据双向绑定

~~~html
<div id="div1">
    <input type="text" v-model="name"><br>
    姓名：{{name}}<br>
    年龄：{{age}}
</div>
<script>
    let el = document.getElementById("div1")
    let template = el.innerHTML;

    // Proxy
    let _data = {
        "name": "blue",
        "age": 18
    }
    let data = new Proxy(_data, {
        set(obj, name, value) {
            obj[name] = value;
            // console.log("数据改变");

            render();
        },
    });

    render();

    function render() {
        // 数据渲染
        el.innerHTML = template.replace(/\{\{\w+\}\}/g, str => {
            str = str.substring(2, str.length - 2);

            return _data[str];
        });


        // 找所有的v-model
        Array.from(el.getElementsByTagName("input"))
        .filter(ele=>ele.getAttribute("v-model"))
        .forEach(input=>{
            let name = input.getAttribute("v-model");
            input.value = _data[name];

            input.oninput = function(){
                data[name] = this.value;
            }
        })
    }
</script>
~~~

