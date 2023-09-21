<template>    
  <div class="city-group" top-page>
    <van-index-bar :sticky="false" :index-list="indexList" highlight-color="#ff9854">
        <van-index-anchor index="热门" />
        <div class="list">
        <template v-for="(item,index) in groupData.hotCities" :key="item.cityId">
            <div class="city" @click="handleCityClick(item.cityName)">{{ item.cityName }}</div>
        </template>
    </div>
    <template v-for="(item,index) in groupData.cities" :key="item.cityId">
        <van-index-anchor :index="item.group" />
        <template v-for="(iten,indey) in item.cities" :key="iten.cityId">
            <van-cell :title="iten.cityName" @click="handleCityClick(iten.cityName)"/>
        </template>
    </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '../../../store/modules/city';
const cityStore = useCityStore()
const router = useRouter()
//接收父组件传过来的数据
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})
//自定义索引列表
const indexList = computed(() => {
    const list = props.groupData.cities.map(item => item.group)
    list.unshift('#')
    return list
})
// 点击城市将主页城市改为选中城市并返回
const handleCityClick = (item) => {
    cityStore.currentCity = item
    router.back()
}
</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 1px 10px;
    .city {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 5px 8px;
        width: 70px;
        height: 28px;
        border-radius: 14px;
        font-size: 12px;
        background-color: #fff4ec;

    }
}
</style>