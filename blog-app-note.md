blog-app

## 1.环境搭建及效果展示

搭建好脚手架后

~~~html
可以到build -> dev-server.js 
可以修改端口号，防止同时启动两个项目的时候冲突
var port = 8082
~~~

创建组件

~~~html
components文件夹
AddBlog.vue
内容准备好


删掉App.vue不需要的内容
import AddBlog 组件
~~~

~~~html
package.json中有下载的模块或插件
~~~



## 2.设定添加博客并实现post数据

~~~javascript
1.AddBlog	组件实现添加博客页面
h2 添加博客
form 表单

2.label博客标题
input text v-model=blog.title required

3.label博客内容
textarea v-model=blog.content
这里有数据绑定 所以data里可以给数据了
data () {
    return {
        blog:{
            title: '',
            content: '',
        }
    }
}

4.div.preview 展示上面绑定的内容
h3博客总览
p 博客标题： blog.title
p 博客内容 blog.content

前面两块用hr分割 测试下数据绑定是否成功 form提交到数据库


大体完成 添加细节
1.分类
form中 博客分类 div#checkboxes
label vue.js node.js angular4 
input checkbox value=vue.js
// 注意
点哪个分类就在会在data中加上哪个，这样数据库中可以存储分类
input 中v-model=blog.categories

用户选择vue.js的时候
data中
categories: []

preview中给
p 博客分类 可能会选择多个分类 所以这里展示分类的时候用遍历的方式
ul> li 
li v-for='item in blog.categories'

2.form中
label 作者  这里写的是固定的 实际中会根据数据遍历出来
select v-model=blog.author 这里加上数据绑定 选择谁的时候写进data.author中
option v-for=author in authors 

data中
authors: ['Hnery', 'Bucky', 'Amy']
blog: {
	author: ''
}
preview中记得展示作者p
~~~



~~~javascript
前面完成后准备提交
form中
button v-on:click.prevent=post  form表单提交记得阻止刷新页面

触发post，可以把数据提交到对应的内容中

逻辑代码中
这里使用vue-resource 回到终端
npm install vue-resource --save
main.js中记得引入import VueResource from ''
vue.use()
这里post到哪去
placeholderjson网站中 用这里提供的 /posts
参照数据格式提交数据
methods: {
	post： function() {
        thid.$http.post('地址', {
            title: this.blog.title,
            body: this.blog.content,
            userId: 1
        }).then(funciton (data) {
                console.log(data)  // 这里测试下提交后是否能拿到数据 测试成功的话 后面直接换数据库的地址
    	})
    }
}
~~~



~~~html
提交后提示博客添加成功 并且form不显示

逻辑中
data：
submmited: false

form v-if=submint
逻辑中
post方法 提交成功的后this.submmited=true

还需要提示博客已添加成功
div v-if=submmit
h3 博客发布成功
~~~

> 注意提交表单前输入是否内容的判断  input加了required表单还是可以提交



## 设置样式

~~~html
AddBlog.vue 的class改id
App.vue样式删掉

css
#add-blog:
* box-sizing: border-box

#add-blog:
margin 20px auto
max-width 600px;
padding 20px

label :
display block
margin 20px 0 20px

inputtext textarea select :
display block
width 100%
padding 8px

#checkboxes label:
display inline-block
margin-top 0

#checkboxes input:
display inlin-block
margin-right 10px

button:
display block
margin 20px 0
background crimson
color #fff
border 0
padding 14px
border-radius 4px
font-size 18px
cursor pointer

preview :
padding 10px 20px
border 1px dotted #ccc
margin 30px 0

h3 :
margin-top 10px

textarea :
height 200px
~~~



## 3.展示博客并请求数据

~~~javascript
components创建组件ShowBlogs.vue
在App.vue引入组件

h1 博客总览
div.single-blog  这里是请求来的数据遍历出来的v-for="blog in blogs"
h2 blog.title
article blog.body

data() {
    return {
        blogs:[]
    }
}
created() {
this.$http.get()  // 到placeholderjson中获取gets
.then((data)=>{
    console.log(data); //看看是否能获取数据
    this.blogs = data.body.slice(0,10); // 不要接受太多 获取数组后就可以遍历了
})
}
~~~

~~~html
#show-blogs:
max-width: 800px
margin 0 auto

.single-blog:
paddding 20px
margin 20px 0
box-sizing border-box
background #ccc
~~~



### 请求本地数据

~~~html
保存post.json到static 不能随便放 
~~~



### 自定义指令

~~~javascript
实现每个标题改变颜色
可以看看文档 钩子函数
bind
h2 v-rainbow

main.js中
第一各参数是指令名称, 第二个参数是对象绑定执行的东西
Vue.directive("rainbow",{
	bind(el, binding, vnode) {
		el.style.color = "#" + Math.random().toString(16).slice(2,8)  // 生成彩虹色
	}
})


实现内容展示不同的宽度
div v-theme="'width'"  这里的width参数会传给main.js 注意这里传的参数是字符串 可以传对象 数组

Vue.directive('theme', {
    bind(el,bingding,vnode) {
        if(binding.value === "width") {
            el.style.maxWidth = "1260px"
        }else if (binding.value == "narrow") {
			el.style.maxWidth = "560px"	
        }
        if(bingding.arg = "column") {
            el.style.background = "#6677cc"
            el.style.padding = "20px";
        }
    }
})
~~~





## 4.博客页面搜索功能





## 5.实现路由及路由参数

## 6.链接数据库firebase(POST)

## 7.链接数据库firebase(GET)



