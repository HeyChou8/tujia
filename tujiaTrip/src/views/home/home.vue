<template>
  <div class="home" ref="homeRef">
    <home-nav-bar></home-nav-bar>
    <home-banner></home-banner>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar></search-bar>
    </div>
    <home-content></home-content>
    <button @click="loadingBtnClick">加载更多</button>
  </div>
</template>
<script>
export default { name: "home"}
</script>
<script setup>
import HomeNavBar from './c-cpns/home-nav-bar.vue'
import HomeBanner from './c-cpns/home-banner.vue'
import HomeSearchBox from './c-cpns/home-search-box.vue'
import HomeCategories from './c-cpns/home-categories.vue'
import HomeContent from './c-cpns/home-content.vue'
import SearchBar from '../../components/search-bar/search-bar.vue'
import useHomeStore from '@/store/modules/home';
import useScroll from '@/hooks/useScroll'
import { watch,ref, computed, onActivated } from 'vue'
//统一发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestsData()
homeStore.fetchCategoriesData()
homeStore.fetchHouseListData()
const loadingBtnClick = () => {
  homeStore.fetchHouseListData()
}
//监听滚动到底部
const homeRef = ref()
const {isReachBottom,scrollTop} = useScroll(homeRef)
watch(isReachBottom,(newValue) => {
  if(newValue){
    homeStore.fetchHouseListData().then(() =>{
      isReachBottom.value = false
    })
  }
})
//是否显示search-bar
const isShowSearchBar = computed(() => {
  return scrollTop.value > 400
})
// 跳转回home时，保留原来的位置
onActivated(()=>{
  homeRef.value?.scrollTo({
    top:scrollTop.value
  })
})
</script>

<style lang="less" scoped>
.home {
  height: calc(100vh - 60px);
  overflow-y: auto;
  box-sizing: border-box;
}
.search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>