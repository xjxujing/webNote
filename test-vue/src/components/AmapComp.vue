<template>
    <div>
        <div id="container"></div>
    </div>
</template>

<script>
export default {
    name: 'AmapComp',
    data() {
        return {};
    },

    mounted() {
        this.init();
    },
    methods: {
        init() {
            let map = new AMap.Map('container', {
                resizeEnable: true, //是否监控地图容器尺寸变化
                zoom: 11, //初始化地图层级
                center: [117.283042,31.86119] //初始化地图中心点
            });

            var marker = new AMap.Marker({
                position: map.getCenter(),
                icon:
                    '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
                offset: new AMap.Pixel(-13, -30),
                // 设置是否可以拖拽
                draggable: true,
                cursor: 'move',
                // 设置拖拽效果
                raiseOnDrag: true
            });

            map.on('complete', function() {
                // log.success('地图加载完成！'); 报错
                console.log('地图加载完成！')
            });
            marker.setMap(map);
        }
    }
};
</script>

<style scoped>
#container {
    width: 100%;
    height: 300px;
}
</style>
