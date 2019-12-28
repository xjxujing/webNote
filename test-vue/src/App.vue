<template>
    <div id="app">
        <!-- <VAmap /> -->
        <!-- 高德地图 -->
        <!-- <VAmap2 /> -->

        <!-- 组件使用v-model -->
        <!-- <anchored-heading v-model="level">Hello world!</anchored-heading> -->

        <!-- <TestMock></TestMock> -->

        <!-- 使用带表单验证的表单组件 -->
        <Index />
    </div>
</template>

<script>
import VAmap from './components/VAmap.vue'
import VAmap2 from './components/VAmap2.vue'

import AnchoredHeading from './components/AnchoredHeading'
import TestMock from './components/TestMock'


import Index from './components/index'

export default {
    name: 'app',
    components: {
        VAmap,
        VAmap2,

        AnchoredHeading,

        TestMock,

        Index
    },

    data() {
        return {
            level: 1
        }
    },

    watch: {
        level: {
            handler(val, oldVal) {
                console.log(val, oldVal)
            }
        }
    },

    methods: {}
}
</script>

<style>
</style>
