<template>
    <div>
        <div class="add">
            <input type="number" v-model="obj.id" />
            <input type="text" v-model="obj.name" />
            <input type="text" v-model="obj.content" />
            <button @click="addList">添加</button>
            <button @click="updateList">修改</button>
        </div>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{item.id}}:*****:{{item.name}}:{{item.content}}--------
                <button @click="deleteList(item.id)">删除</button>
            </li>
        </ul>

        <!-- 全局通知组件 -->
        <el-button @click="toast()">按钮</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            obj: {
                //将添加的数据存到obj对象中
                id: 0,
                name: '',
                content: ''
            }
        }
    },
    created() {
        this.getData()
    },
    methods: {
        toast() {
            this.$showToast('弹窗标题', '这里显示提示的内容')
        },

        // 查询列表数据
        getData() {
            this.$http.get('http://yapi.zhang-chu.com/mock/128/pc/list').then(res => {
                console.log(res)
            })
        },

        // 删除列表数据
        deleteList(id) {
            this.$http
                .post('/list', {
                    params: {
                        id: id
                    }
                })
                .then(res => {
                    this.list = res.data.data
                })
        },

        // 增加列表数据
        addList() {
            // console.log("****"+this.obj);
            this.$http
                .post('/listAdd', {
                    params: {
                        obj: this.obj
                    }
                })
                .then(res => {
                    // console.log("请求成功"+res.data.data);
                    this.list = res.data.data
                })
        },

        // 修改列表数据
        updateList() {
            var that = this
            this.$http
                .post('/listUpdate', {
                    params: {
                        obj: this.obj
                    }
                })
                .then(function(res) {
                    // console.log("请求的数据"+res.data.data);
                    that.list = res.data.data
                })
        }
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
li {
    list-style: none;
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
