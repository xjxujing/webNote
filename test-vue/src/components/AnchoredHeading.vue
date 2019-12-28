<script>
export default {
    name: 'AnchoredHeading',
    
    model: {
        prop: 'level',
        event: 'change-level'
    },
    

    props: {
        level: {
            type: Number
        }
    },

    render: function(createElement) {
        return createElement(
            'h' + this.level, // 标签名称
            this.$slots.default // 子节点数组
        )
    },

    created() {

    },
    
    
    
    mounted() {
        setTimeout(() => {
            console.log(123)
            this.$emit('change-level', 6)
        }, 3000);
    }
    
}
</script>

<style scoped>
</style>