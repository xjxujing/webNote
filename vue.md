## 

原生实现的问题

UI和数据不同步



## 实例化vue对象

## 数据和方法

## 属性绑定 

 `v-bind`

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
el: 
~~~



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



### 双向数据绑定

~~~html
input select textarea

输入框中输入内容 页面中相应的地方跟着变动
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



## 计算属性

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



## v-if

~~~html
<div class="app">
    <button v-on:click="error = !error">toggle error</button>
    <button v-on:click="success= !success">toogle success</button>

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

