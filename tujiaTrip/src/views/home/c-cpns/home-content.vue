<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
        <template v-for="(item,index) in houseList" :key="item.data.houseId">
            <home-item-v9 v-if="item.discoveryContentType === 9"
            :item-data = item.data
            @click="itemClick(item.data)"></home-item-v9>
            <home-item-v3 v-if="item.discoveryContentType === 3"
            :item-data = item.data
            @click="itemClick(item.data)"></home-item-v3>
        </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import HomeItemV3 from '../../../components/home-item-v3/home-item-v3.vue'
import HomeItemV9 from '../../../components/home-item-v9/home-item-v9.vue'
import useHomeStore from '../../../store/modules/home';
const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)
const router = useRouter()
//点击进入详情页
const itemClick = (item) => {
    router.push({
        path:`/detail/${item.houseId}`,
    })
}
</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-wrap: wrap;
}
.title {
    font-size: 22px;
    padding: 10px;
  }
</style>