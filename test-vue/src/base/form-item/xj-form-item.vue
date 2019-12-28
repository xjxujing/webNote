<template>
    <div>
        <label for></label>
        <p></p>
    </div>
</template>

<script>
export default {
    name: 'xj-form-item',

    props: {
        label: {
            type: String,
            default: ''
        },

        prop: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
</style>