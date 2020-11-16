

vue2 过渡到 vue3

JS 过渡到 TS

Vue 3 + Vite + Vue Router + TypeScript



## vscode 插件

代码提示：Vue 3 Snippets

自动导入模块：Auto Input



## Vue 2 和 Vue 3 的区别

- Vue 3 的 `Template `支持多个根标签， Vue 2 不支持
- Vue 3 有 `createApp()`，Vue 2 是`new Vue()`
- Vue 3 是`createApp(组件)` ，Vue 2是`new Vue({template, render})`
- Vue 3`v-model` 代替 Vue 2 的 `v-model` 和 `.sync`
- Vue 3  `setup() `里面 `context.emit` （几乎不用 `this.$emit`），Vue 2 使用`this.$emit`

# Vite 搭建官网

cmd / git bash / Terminal 进入学习目录

## 项目搭建

```shell
# 进入 D 盘
D: 

# 进入文件夹
cd xujing

# 全局安装 create-vite-app
yarn global add create-vite-app@1.18.0
npm i -g -create-vite-app@1.18.0

# 会有提示 cva or create-vite-app 是全局命令

# 创建项目目录 
cva gulu-ui-1

# 按提示操作 (vite版本 v1.0.0-rc3)
```





vite 文档 给的命令

```shell
npm init vite-app <project-name>

yarn create vite-app <project-name>

# 等价于,全局安装 create-vite-app 后
cva <project-name>

# 等价于
npx create-vite-app <project-name>
```





## 引入 Vue Router 4

```shell
# 查看 vue-router 所有版本号
npm info vue-router versions

# 安装
yarn add vue-router@4.0.0-beta.3
```

main.js => main.ts

```javascript
// 代码会有提示
// 三个 create 分别对应：内存型路由、 Hash 型路由、History 型路由
import {createWebHashHistory, createRouter} from 'vue-router'
import Frank from './components/Frank.vue'

const history = createWebHashHistory()
const router = createRouter({
    history: history,
    routes: [
        {path: '/', component: Frank}
    ]
}) // ts 检测


const app = createApp(App)
app.use(router)
app.mount('#app')

// 添加 <router-view> <router-link>
```

> 提示找不到模块
> 因为，TS 只能理解 .ts  文件，无法理解 .vue 文件
>
> google   Vue 3  can not find module
>
> 1. shims-vue.d.ts
> 2. 尤大的方案



## Aside 的显示和隐藏

App.vue

```vue
<script lang="ts">
    import {ref, provide} from 'vue'
    export default {
        name: 'App',
        setup() {
            // 后面改成 asideVisible
            const menuVisible = ref(false)
            provide('xxx', menuVisible) // set
        }
    }
</script>
```

Topnav.vue

```vue
<script lang="ts">
    import {inject} from 'vue'
    
    export default {
        name: 'App',
        setup() {
            // 后面改成 asideVisible
            const menuVisible = inject<Ref<boolean>>('xxx') // get
            
            const toggleMenu = () => {
               menuVisible.value = !menuVisible.value
           }
           return {toggleMenu}
        }
    }
</script>
```

Doc.vue

```vue
<script lang="ts">
    import {inject} from 'vue'
    
    export default {
        name: 'App',
        setup() {
            // 后面改成 asideVisible
            const menuVisible = inject<Ref<boolean>>('xxx') // get
            return {menuVisible}
           
        }
    }
</script>
```



## 移动端 H5 切换 Aside

用媒体查询

App.vue

```vue
<script lang="ts">
    import {ref, provide} from 'vue'
    export default {
        name: 'App',
        setup() {
            const width = document.documentElement.clientWith
            // 后面改成 asideVisible
            const menuVisible = ref(width <= 500 ? false : true)
            provide('xxx', menuVisible) // set
        }
    }
</script>
```



# Switch 组件

## 初始化组件

## 切换开关状态

## 添加 value 属性和 input 事件





# Button 组件

可以参考 AntD、Bulma、Element、iView、Vuetify 等

## 需求

- 可以有不同的等级
- 可以是链接、可以是文字
- 可以  click、focus、鼠标悬浮
- 可以改变大小，size
- 可以禁用，disabled
- 可以加载中，loading

## API 设计

```html
<Button
        @click=?
        @focus=?
        @mounseover=?
        theme="button / link / text"
        level="main / normal / minor"
        size="big / normal / small"
        disabled
        loading></Button>
```





```vue
<template>
	<div :size="size">
        <button v-bind="$attrs">
            <slot />
    	</button>
        
    </div>

</template>

<script lang="ts">
    export default {
        inheritAttrs: false,  // 组件的根元素不继承事件，使用 $attrs 继承传给组件标签的属性
        setup(props, context) {
           	// const {size, onClick, onMounseOver} = context.attrs
            
            //注意把 $attrs 换成 rest ,这是如何分开组件标签传过来的属性
            const {size,  ...rest} = context.attrs 
            return {size, rest}
        }
    }
</script>
```

## 小结

- 默认所有属性都绑定到根元素
- 使用 `inheritAttrs: false` 取消默认绑定
- 使用 `$attrs` 或者 `context.attrs` 获取所有属性
- 使用 `v-bind=$attrs` 批量绑定属性
- 使用 ` const {size,  ...rest} = context.attrs  ` 将属性分开



## props V.S. attrs

- props 要先声明才能取值，attrs不用先声明
- props 不包含事件，attrs 包含
- props 没有声明的属性，会跑到 attrs 里
- props 支持  string 以外的类型，attrs 只有 string 类型

## 样式注意点

```scss
.button {
    white-space: nowrap; // 处理元素中的空白
    box-shadow: 0 1px 0 fade-out; // sass 提供的 fade-out 函数
    
    & + & {
        // .button + .button
    }
    
    &:focus {
        outline: none;
    }
    &::-moz-focus-inner {
        border: 0; // 兼容 firefox
    }
}
```



## UI 库的 CSS 注意事项

- 不能使用`scoped`，因为 data-v-xxx 生成的数据不一样，使用者不好覆盖样式
- 必须加自己的前缀，通用的名称很容易被使用者覆盖

## CSS 最小影响原则

```scss
// <div class="xxx gulu-"></div>
[class^="gulu-"], [class*=" gulu-"] {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul,
ol {
    list-style: none;
}
...
```

[为什么这样写 font-family](https://github.com/zenozeng/fonts.css)





# Dialog 组件

# Tabs 组件

# 官网细节完善

# 发布到 npm