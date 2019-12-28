<template>
    <div>
        <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
        >
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <AmapComp />
    </div>
</template>

<script>
import AmapComp from '@/components/AmapComp';

export default {
    name: 'HelloWorld',

    components: {
        AmapComp
    },
    data() {
        return {
            input: ''
        };
    }
};
</script>
