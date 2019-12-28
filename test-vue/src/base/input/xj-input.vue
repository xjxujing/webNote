<template>
    <input :type="type" :placeholder="placeholder" @input="$emit('input', $event.target.value)" />
</template>

<script>
import {myMixins} from '@/mixins/test'

export default {
    name: 'xj-input',

    mixins: [myMixins],

    model: {
        prop: 'value',
        event: 'input'
    },

    props: {
        value: {
            type: String,
            default: ''
        },

        type: {
            type: String,
            default: 'text'
        },

        placeholder: {
            type: String,
            default: ''
        }
    },

    methods: {}
}
</script>

<style lang="scss" scoped>
input {
    padding: 10px 20px;
    border: 1px solid #dedede;
    border-radius: 4px;
    outline: none;
    width: 300px;
    font-size: 14px;
}
</style>