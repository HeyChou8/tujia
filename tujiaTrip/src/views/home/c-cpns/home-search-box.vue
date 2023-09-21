<template>
  <div class="search-box">
    <!-- 位置 -->
    <div class="position">
      <div class="city" @click="handleCityClick">
      <span>{{ currentCity }}</span>
    </div>
    <div class="location" @click="handleLocationClick">
      <span>我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
    </div>
    <!-- 日期范围 -->
    <div class="date-range section" @click="isShow=true">
      <div class="start">
        <span class="tip">入住</span>
        <span class="time">{{ startDateStr }}</span>
      </div>
      <div class="stay">共{{stayCount}}晚</div>
      <div class="end">
        <span class="tip">离店</span>
        <span class="time">{{ endDateStr }}</span>
      </div>
    </div>
    <van-calendar
      v-model:show="isShow"
      type="range"
      @confirm="onConfirm"
      :round="false"
      color="#ff9854"
    />
    <!-- 价格/人数选择 -->
    <div class="section">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword">关键字/位置/民宿名</div>
  </div>
    <!-- 热门建议 -->
    <div class="hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
      <div
        class="item"
        :style="{
          color: item.tagText.color,
          background: item.tagText.background.color,
        }"
      >
        {{ item.tagText.text }}
      </div>
    </template>
    </div>
    <!-- 开始搜索 -->
    <div class="search-btn" @click="handleSearchClick">
      <div class="btn">开始搜索</div>
    </div>
  
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import useCityStore from '../../../store/modules/city';
import useMainStore from '../../../store/modules/main'
import useHomeStore from '../../../store/modules/home'
import { formatMonthDay, getDiffDay } from "@/utils/format_date";
import { computed, ref } from 'vue'
// 点击城市跳转到城市页面
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)
const router = useRouter()
const handleCityClick = () => {
  router.push('/city')
}
//利用h5新特性获取位置信息
const handleLocationClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log('获取位置成功',res)
    },
    (err) => {
      console.log('获取位置失败',err)
    },
    {
      enableHighAccuracy:true,
      timeout: 5000,
      maximumAge:0
    }
  )
}
//日期范围的处理
const mainStore = useMainStore()
const { startDate,endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stayCount = computed(() => getDiffDay(startDate.value, endDate.value))
// 操作日历
const isShow = ref(false)
const onConfirm = (value) => {
  startDate.value = value[0]
  endDate.value = value[1]
  isShow.value = false
}
//热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)
//搜索按钮
const handleSearchClick = () => {
  router.push({
    path: '/search',
  })
}
</script>

<style lang="less" scoped>
.position {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  .city {
    font-size: 17px;
  }
  .location {
    span {
      font-size: 12px;
      margin-right: 5px;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.section {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 10px;
  .start,
  .end {
    font-size: 17px;
    color: #999;
  }
  .stay {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 13px;
    color: #666;
  }
}
.keyword {
  font-size: 17px;
  color: #999;
}
.hot-suggests {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  margin-left: 10px;
  .item {
    padding: 5px;
    font-size: 12px;
    margin: 3px;
  }
}
.search-btn {
  display: flex;
  justify-content: center;
  .btn {
    width: 342px;
    height: 38px;
    border-radius: 19px;
    line-height: 38px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    background-image: var(--theme-linear-gradient);
  }
}
</style>    