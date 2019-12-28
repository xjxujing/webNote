
<template>
    <div v-show="show" class="container">
        <div class="mask"></div>
        <div class="dialog">
            <div class="head">{{head}}</div>
            <div class="msg">{{msg}}</div>
            <div class="btn">
                <a class="btn_default" @click="cancel">取消</a>
                <a class="btn_main" @click="confirm">确认</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            msg: '',
            head: '',
            callback: ''
        }
    },
    methods: {
        cancel () {
            this.show = false;
        },
        confirm () {
            this.callback();
        }
    }
}
</script>
