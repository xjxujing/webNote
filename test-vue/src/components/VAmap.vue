<template>
    <div>
        <el-input v-model="address">
            <el-button slot="append" icon="el-icon-search" @click="searchPlace(address)"></el-button>
        </el-input>
        <div id="container"></div>

        <div class="info">
            <p id="info"></p>
        </div>

        <div id="panel"></div>
    </div>
</template>

<script>
import AMap from '../utils/Amap'

export default {
    name: 'VAmap',
    props: {},
    data() {
        return {
            lng: 117.469382,
            lat: 31.88794,
            resMap: null,
            map: null,

            address: ''
        }
    },

    created() {},

    mounted() {
        this.initAMap()
    },

    methods: {
        async initAMap() {
            try {
                this.resMap = await AMap()

                this.map = new this.resMap.Map('container', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zooms: [3, 19], //设置地图级别范围
                    zoom: 14, //初始化地图层级
                    zoomEnable: true, // 是否缩放
                    scrollWheel: true, // 是否支持滚轮缩放
                    dragEnable: true, // 是否支持鼠标拖拽平移
                    jogEnable: true, // 是否支持缓动效果
                    buildingAnimation: true, // 模块消失是否有动画效果
                    center: [this.lng, this.lat] //初始化地图中心点
                })

                // this.addMarker()
                // this.setPlugin()

                this.map.on('click', this.clickHandler)
            } catch (err) {
                console.error(err)
            }
        },

        // setPlugin() {
        //     return this.res Map.plugin(['AMap.InfoWindow'], ()=> {
        //         InfoWindow = new
        //     })
        // },

        // 创建点标记
        addMarker() {
            this.marker = new this.resMap.Marker({
                icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
                position: [this.lng, this.lat],
                offset: new this.resMap.Pixel(-13, -30),
                draggable: true
            })

            this.map.add(this.marker)
            this.map.setFitView()
            this.marker.on('dragend', this.showInfoM)
        },

        showInfoM(e) {
            let lat = e.lnglat.lat,
                lng = e.lnglat.lng
            console.log(lng, lat)
        },

        // 获取当前位置信息
        getCityInfo() {
            this.map.plugin('AMap.Geolocation', () => {
                let geolocation = new this.resMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,

                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,

                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new this.resMap.Pixel(10, 20),

                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,

                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: 'RB'
                })

                // geolocation.getCurrentPosition() //精准定位
                geolocation.getCityInfo() //定位到城市
                this.resMap.event.addListener(
                    geolocation,
                    'complete',
                    this.onComplete
                )
                this.resMap.event.addListener(
                    geolocation,
                    'error',
                    this.onError
                )
            })
        },

        //获取用户所在城市信息
        showCityInfo() {
            this.map.plugin('AMap.CitySearch', () => {
                let citysearch = new this.resMap.CitySearch()

                let _this = this
                // 自动获取用户IP，返回当前城市
                citysearch.getLocalCity()

                this.resMap.event.addListener(
                    citysearch,
                    'complete',
                    this.onComplete
                )
                this.resMap.event.addListener(citysearch, 'error', this.onError)
            })
        },

        searchPlace() {
            this.map.plugin('AMap.PlaceSearch', () => {
                let placesearch = new this.resMap.PlaceSearch({
                    city: '010', // 兴趣点城市
                    citylimit: false, //是否强制限制在设置的城市内搜索
                    // map: this.map, // 展现结果的地图实例
                    // panel: 'panel', // 结果列表将在此容器中进行展示。
                    autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                })

                placesearch.search(this.address)

                this.resMap.event.addListener(
                    placesearch,
                    'complete',
                    this.onSearchComplete
                )
                this.resMap.event.addListener(
                    placesearch,
                    'error',
                    this.onError
                )
            })
        },

        onSearchComplete(res) {
            let pois = res.poiList.pois
            console.log(pois)
            for (let i = 0; i < pois.length; i++) {
                let poi = pois[i]
                this.marker = []

                this.marker[i] = new this.resMap.Marker({
                    position: poi.location, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                    title: poi.name
                })
                // 将创建的点标记添加到已有的地图实例：
                this.map.add(this.marker[i])
                this.marker[i].on('click', this.showInfoM)

                var infoWindow
                this.map.plugin('AMap.InfoWindow', () => {
                    infoWindow = new this.resMap.InfoWindow({
                        autoMove: true,
                        offset: { x: 0, y: -30 }
                    })
                    this.map.setCenter(this.marker[i].getPosition())
                    infoWindow.setContent(this.createContent(pois[i]))
                })
                let _this = this
                this.marker[i].on('click', e => {
                    console.log(i)
                    infoWindow.open(_this.map, poi.location)

                    // _this.marker[i].getPosition()
                })
            }
            this.map.setFitView()
        },

        createContent(poi) {
            console.log(poi)
            //信息窗体内容
            var s = []
            s.push('<b>名称：' + poi.name + '</b>')
            s.push('地址：' + poi.address)
            s.push('电话：' + poi.tel)
            s.push('类型：' + poi.type)
            return s.join('<br>')
        },

        // 成功的结果
        onComplete(res) {
            console.log(res)
        },

        // 出错的结果
        onError(err) {
            console.error(err, '--定位出错--')
        },

        clickHandler(e) {
            alert(
                '您在[ ' +
                    e.lnglat.getLng() +
                    ',' +
                    e.lnglat.getLat() +
                    ' ]的位置点击了地图！'
            )
        }
    }
}
</script>

<style scoped>
#container {
    width: 800px;
    height: 500px;
}
</style>