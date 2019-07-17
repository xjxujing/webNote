需求分析

添加代办：

1. 输入内容 回车 自动添加代办  没有代办事项的时候下方提示不显示
2. 可进行删除
3. 可标记已完成 再点击标记未完成
4. 每增加一条代办 下方标记多少条代办
5. 可清除已完成的代办
6. 切换代办状态 待完成  已完成
7. 可全部选中 或全部不选中 代办计数和清理已完成代办状态会变化
8. 双击修改代办 esc推出修改 回车确定修改 点击别处确定修改  往回删完后 之间删掉这个待办



~~~css
初始化webpack模板
vue init webpack todolist

到文件夹下
cnpm install 安装模块

克隆todomvc的模板
git clone https://github.com/tastejs/todomvc-app-template
把里面的index.html覆盖掉todolist下的html
启动项目
npm run dev可以看到html结构 把index.html中的CSS外链和js外链注释

打开todomvc的package.json文件
查看dependencies的todomvc-app-css版本
在工程目录下npm install todomvc-app-css

在main.js 中引入CSS(原来的内容全部删掉)
import "todomvc-app-css"
main.js引入vue
import Vue from "vue"

实例化Vue


输入代办事项下方添加待办事项
data   todo:" " todos:[ ]
v-model.trim="todo"  注意删除两边空白
@keyup.enter = addtodo
methods   addtodo this.todos.push(this.todo)
li   v-for = todo in todo

    
删除代办事项
在button元素绑定@click=remove(index) 借助索引删除 所以前面循环的时候加上索引
删除的是todos[ ]中的内容splice(index,1)


标记代办事项完成添加删除线和✓
设置todos[ content: this.todo, completed: false] 注意修改前面的循环
点击勾 添加completed的样式(有删除线)
input checkbox v-model[todo.completed] 点击了勾 checked 也就是v-model 绑定的 todo.completed 变为true
class={completed: todo.completed} 也会变为true


实现全选
点击全选，下面会全选
下面每个都选中， 全选会点亮
v-model="isAll"绑定的是checkbox的checked属性
点击全选  isAll的值变为true 下方每个checkbox的v-model绑定的值要变成true
遍历todo.completed = true 这个方法放在isAll对象中的set中 并统一放computed属性中

下面代办事项每个都选中  放在get()方法中
判断所有todo.completed = false?不好


设置一个filters 实现全部代办，已完成代办和未完成代办的分组
all(todos)  return
active(todos)   todos.filter(return !todo.completed) 没有打勾的返回
completed(todos)  todos.filter(return todo.completed)  打钩的返回

只要没有有代办事项 全选就会亮
get()  active(todos).length === 0    



修改代办事项统计
remain   return active(todos).length


双击修改待办事项
修改代办事项会加上属性editing 
:class = {editing: }
label绑定 @dblclick = "editTodo(todo)"
editTodo(todo): this.editTodoed = todo  当下todo的内容要给正在编辑内容 editTodoed初始化为null 因为todo是个对象
editing可以通过 todo === editTodoed判断 全等的时候 editing样式生效
添加焦点
自定义指令v-focus
directives: {
    focus(el){
	el.focus()
    }
}

编辑中 
esc 取消编辑并还原
enter 或者 失去焦点  会保存修改
回退 删该事项


清除已完成事项
~~~



动画过渡问题

缓存问题







vue生命周期

响应式原理






