pizza-app-note



## 搭建项目

~~~sh
# 安装全局命令
npm install --global vue-cli

# 查看当前版本
vue --version

# 项目创建目录
vue init webpack-simple pizza-app # 更加简洁

# cd 到项目文件夹下 安装项目所需要的模块
cnpm install

# 启动项目
npm run dev
~~~



## 创建组件

~~~html
src下创建文件夹components
导航 Header.vue 所有组件都会用

主页 Home.vue
菜单 Mnue.vue
管理 Admin.vue
关于我们 文件夹about About.vue 会有多个组件实现多级路由
登录 Login.vue
注册 Register.vue
~~~



## 制作导航

~~~html
1.引入Bootstrap样式
Bootstrap中文网 -> Bootstrap4中文文档
找到BootstrapCDN
CSS only 复制

到项目中的index.html 放到title下面

2.获取头部样式
Header.vue中 给模板后 给header -> nav -> 给calss
Bootstrap4中文文档 -> 快速入门 -> Components -> Navbar
选择样式复制class的内容

3.按需添加样式
svg图标
html标签

4.与App.vue关联
删掉App.vue中原始的内容
导入Header.vue,并注册
<script>
import Header from './components/Header'
export default {
  components: {
    appHeader: Header, // 驼峰命名不用加引号 标签是app-header,注意不要和html标签冲突
  }
}
</script>

打开localhost:8080可以看到页面效果
~~~



~~~html
给其他组件加上了模板 方便路由跳转查看
<template>
  <h1>这里是组件名称</h1>
</template>
~~~



## 配置路由

~~~shell
# 终端中关闭项目ctrl+c
# 安装路由模块 会安装到node_modules中
cnpm install vue-router --save  
~~~

~~~javascript
安装好后配置路由
// main.js中引入模块
import VueRouter from 'vue-router'

// 使用路由
Vue.use(VueRouter)

// 配置路由
const routes = [
  {path: '/', component: Home},
  {path: '/menu', component: Menu}, // 注意没有s 这里配置了组件
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/admin', component: Admin},
]

// 实例化并传参
const router = new VueRouter({
  routes,
  mode: 'history', // 去掉#
})

// Vue中使用
new Vue({
  el: '#app',
  router, // 在这里
  render: h => h(App)
})
~~~

路由配置完成后，还有

~~~html
<!-- Header.vue中需要路由的地方更改路径和标签 a标签替换掉不刷新 -->
<router-link to="/" class="nav-link">主页</router-link>

<!-- 路由出口,路由匹配到的组件被渲染在这里 -->
App.vue中添加<router-view></router-view>
~~~



## 路由的一些细节

~~~html
1.默认是a标签
<router-link to="/" class="nav-link">主页</router-link>

改成div标签
<router-link tag="div" to="/" class="nav-link">主页</router-link>


2.属性to可以动态绑定路由地址 可以逻辑改变地址
<router-link :to="homeLink" class="nav-link">主页</router-link>
<script>
export default {
    data() {
        return {
            homeLink: '/'
        }
    }
}
</script>

3.路径写错引导到正确的地址
配置的路由的时候加上一句
const routes = [
  {path: '/', component: Home},
  {path: '/menu', component: Menu}, // 注意没有s 这里配置了组件
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/admin', component: Admin},
  {path: '*', redirect: '/'}, 没有匹配到路径，默认跳转根路径
]
~~~



~~~html
4.路由起名
配置中设置names属性
const routes = [
  {path: '/', name: 'homeLink', component: Home}, 路由有了名字
  {path: '/menu', component: Menu}, // 注意没有s 这里配置了组件
  {path: '/login', component: Login},
  {path: '/register', component: Register},
  {path: '/admin', component: Admin},
  {path: '*', redirect: '/'}, 没有匹配到路径，默认跳转根路径
]

这里绑定一下
<router-link :to="{name: 'homeLink'}" class="nav-link">主页</router-link>
~~~



### 路由跳转方式

~~~html

（1）通过标签跳转
<router-link :to="{name: 'homeLink'}" class="nav-link">主页</router-link>

（2）通过方法跳转
点击一个button跳转到路由页面
注意template里面只能有一个根标签
<template>
  <div>
    <h1>Home</h1>
    <button @click="goToMenu" class="btn btn-success">Let's order!</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToMenu() {
      // 跳转到上一次浏览的页面
      // this.$router.go(-1);

      // 指定跳转地址
      // this.$router.replace('/menu');

      // 指定跳转路由的名字下
      // this.$router.replace({name: 'menuLink'});

      // 通过push跳转 压栈的方式(常用) push可以放更多的参数
      // this.$router.push('/menu');
      this.$router.push({name: 'menuLink'});
    }
  }
}
</script>
~~~







## 二级路由和三级路由

~~~html
路由到About.vue中,该页面会有二级路由
在About.vue中:
1.创建结构
结构中会有
 <!-- 使用 router-link 组件来导航 -->
<router-link></router-link>

<!-- 路由出口 -->
<!-- 路由匹配到的组件将渲染在这里 -->
<router-view></router-view>

2.创建组件
Contact.vue
快递信息    Delivery.vue
历史订单    History.vue
点餐引导    OrderingGuide.vue
~~~



## 路由守卫方式

### 全局守卫

不管点击那个页面，只要不是登录状态，就会提示登录并引导进登录界面，只能点击登录和注册

~~~javascript
在main.js中
// 全局守卫 to进入哪个路由,from从哪个路由离开,next回调函数执行展示路由页面
router.beforeEach((to, from, next) => {
  // alert('还没有登录, 请先登录!');
  // next();
  // console.log(to.path); // 拿到跳转的当前路径

  // 判断store.gettes.isLogin === false
  if (to.path === '/login' || to.path === '/register') {
    next();
  }else {
    alert('还没有登录, 请先登录!');
    next('/login');
  }
})

后续看vuex判断状态等等


// 全局后置钩子用得很少 to进入哪个路由,from从哪个路由离开
router.afterEach((to, from) => {
  alert('after each');
})

~~~



### 路由独享守卫

~~~javascript
main.js路由配置的数组中的对象中单独加入beforeEnter方法
{
    path: '/admin', name: 'adminLink', component: Admin, beforeEnter: (to, from, next) => {
        // alert('非登录状态,不能访问管理页面');
        // next(false);// 不传值，点击alert的确定后又进入该页面

        // 判断store.gettes.isLogin === false  可以通过stroe拿到登录状态
        if (to.path === '/login' || to.path === '/register') {
            next();
        } else {
            alert('还没有登录, 请先登录!');
            next('/login');
        }
    }
},
~~~



### 组件内的守卫

~~~javascript
相应的组件内
export default {
data() {
    return {
      name: "Henry"
    };
  },
// 进入路由之前做的事情 会找不到data，数据渲染之前执行beforeRouteEnter
  beforeRouteEnter: (to, from, next) => {
    // alert('hello ' + this.name );
    // next(); // 这里可以正常进入路由，这时候data已经渲染完

    next(vm => {
      alert("Hello " + vm.name);
    });
  }
  
 
  beforeRouteLeave: (to, from, next) => {
    if (confirm("确定离开吗?") == true) {
      next();
    } else {
      next(false); // 不跳转
    }
  }

}
~~~



## 代码抽离

~~~javascript
main.js中有跟多路由配置信息单独拿出来
src下新建文件routes.js

把配置的路由信息和导入模块一起赋值到routes.js中

import Home from './components/Home'
import Menu from './components/Menu'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Admin'
import About from './components/about/About'

// 二级路由
import Contact from './components/about/Contact'
import Delivery from './components/about/Delivery'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'

// 三级路由
import Phone from './components/about/contact/Phone'
import PersonName from './components/about/contact/PersonName'

export const routes = [
    { path: '/', name: 'homeLink', component: Home },
    { path: '/menu', name: 'menuLink', component: Menu },
    { path: '/login', name: 'loginLink', component: Login },
    { path: '/register', name: 'registerLink', component: Register },
    {
      path: '/admin', name: 'adminLink', component: Admin,
      // beforeEnter: (to, from, next) => {
      // 路由独享守卫
      // alert('非登录状态,不能访问管理页面');
      // next(false);// 传false不跳转 不传值，点击alert的确定后又进入该页面
  
      // 判断store.gettes.isLogin === false
      // if (to.path === '/login' || to.path === '/register') {
      //   next();
      // } else {
      //   alert('还没有登录, 请先登录!');
      //   next('/login');
      // }
      // }
    },
    {
      path: '/about', name: 'aboutLink', redirect: '/about/contact', component: About, children: [
        {
          path: '/about/contact', name: 'contactLink', redirect: '/personname', component: Contact, children: [
            { path: '/phone', name: 'phone', component: Phone },
            { path: '/personname', name: 'personName', component: PersonName }
          ]
        },
        { path: '/about/delivery', name: 'deliveryLink', component: Delivery },
        { path: '/about/history', name: 'historyLink', component: History },
        { path: '/about/orderingGuide', name: 'orderingGuideLink', component: OrderingGuide },
      ]
    },
    { path: '*', redirect: '/' },
  ]

赋值好后要加上export导出 然后main.js中要引入
import { routes } from './routes'
~~~



## 复用router-view

~~~html
App.vue
<div class="container">
    <!-- 栅格系统 -->
    <div class="row">
        <!-- 小屏幕12列 中屏幕4列 -->
        <div class="col-sm-12 col-md-4">
            <router-view name="orderingGuide"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
            <router-view name="delivery"></router-view>
        </div>
        <div class="col-sm-12 col-md-4">
            <router-view name="history"></router-view>  这里加了name属性
        </div>
 </div>
    
    
 routes.js中配置
    export const routes = [
    { path: '/', name: 'homeLink', components: {
        default: Home, // 默认显示Home组件,
        'orderingGuide': OrderingGuide,
        'delivery': Delivery,
        'history': History,
    } },
~~~





## 控制滚动行为

**注意: 这个功能只在支持 history.pushState 的浏览器中可用。**