原生实现的问题

UI和数据不同步



实例化vue对象

数据和方法

属性绑定

~~~html
<div id="app">
    <input type="text" v-model="name">
    <span>你的姓名是:{{ name }}</span>
    <p>{{ great("morning") }}</p>
</div>

<script>
new Vue({
    el: '#app',
    data: {
        name: 'xujing',
    },
    methods: {
        great: function(timer) {
            return 'good ' + timer + ' ' + this.name + '!';
        }
    }
});
</script>
~~~

