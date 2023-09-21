<template>
<div class="city top-page">
    <div class="top">
       <van-search
    v-model="cityValue"
    show-action
    placeholder="城市/区域/位置"
    @cancel="onCancelClick"
    shape="round"
  />
  <van-tabs v-model:active="tabActive" color="#ff9854">
    <template v-for="(value,key,index) in allCities" :key="key">
        <van-tab :title=value.title :name="key"></van-tab>
    </template>
  </van-tabs>
    </div>
    <div class="content">
        <template v-for="(value,key,index) in allCities" :key="key">
            <city-group v-show="tabActive===key" :group-data="value"></city-group>
        </template>
    </div>
</div>
</template>

<script setup>
import useCityStore from '../../store/modules/city'
import { storeToRefs } from "pinia"
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import CityGroup from '../city/c-cpns/city-group.vue'
//发送网络请求获取信息
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)
//搜索框的操作 
const cityValue = ref('')
//点击取消返回上一级
const router = useRouter()
const onCancelClick = () => {
    router.back()
}
//tabs
const tabActive = ref()
</script>

<style lang="less" scoped>
.city {
    .top {
        position: relative;
        z-index: 9;
    }
    //局部滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}
</style>