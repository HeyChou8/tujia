<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item,index) in tabBarData" :key="item">
      <van-tabbar-item :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon>
          <img v-if="index !== currentIndex" :src="getAssetURL(item.image)" alt="">
          <img v-else :src="getAssetURL(item.imageActive)" alt="">
        </template>
      </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabBarData from '@/assets/data/tab-bar';
import getAssetURL from "@/utils/load_asset_img"
import { watch,ref } from 'vue';
import { useRoute } from 'vue-router';
//监听路由改变时，找到对应的索引，设置currentIndex
const currentIndex = ref(0)
const route = useRoute()
watch(route,(newValue) => {
  const index = tabBarData.findIndex(item => item.path === newValue.path)
  if(index === -1) return
  currentIndex.value = index
})
</script>

<style lang="less" scoped>
.tab-bar {
  img {
    height: 28px;
  }
}
</style>