<template>
  <div class="detail" ref="detailRef" :class="{hideTab:!isHideTab}">
    <van-nav-bar
      title="房屋详情"
      left-arrow
      left-text="旅途"
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      
      
      <van-tabs
        v-model:active="active"
        scrollspy
        sticky
        title-active-color="#ff9854"
      >
      
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
        <van-tab title="描述">
          <detail-info :top-info="mainPart.topModule"></detail-info
        ></van-tab>
        <van-tab title="设施"
          ><detail-facility
            :house-facility="
              mainPart.dynamicModule.facilityModule.houseFacility
            "
          ></detail-facility
        ></van-tab>
        <van-tab title="房东"
          ><detail-landlord
            :landlord="mainPart.dynamicModule.landlordModule"
          ></detail-landlord
        ></van-tab>
        <van-tab title="评论"
          ><detail-comment
            :comment="mainPart.dynamicModule.commentModule"
          ></detail-comment
        ></van-tab>
        <van-tab title="须知"
          ><detail-notice
            :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
          ></detail-notice
        ></van-tab>
        <van-tab title="地图"
          ><detail-map
            :position="mainPart.dynamicModule.positionModule"
          ></detail-map
        ></van-tab>
      </van-tabs>
      <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import DetailSwipe from './c-cpns/detail-swipe.vue'
import DetailInfo from './c-cpns/detail-info.vue'
import DetailFacility from './c-cpns/detail-facility.vue'
import DetailLandlord from "./c-cpns/detail-landlord.vue";
import DetailComment from "./c-cpns/detail-comment.vue";
import DetailNotice from "./c-cpns/detail-notice.vue";
import DetailMap from "./c-cpns/detail-map.vue";
import DetailIntro from "./c-cpns/detail-intro.vue";
import { computed,ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getDetailInfos } from '../../service/modules/detail'
import useScroll from "@/hooks/useScroll";
//返回上一级
const router = useRouter()
const onClickLeft = () => {
  router.back()
}
//拿到houseId发送网络请求
const route = useRoute()
const houseId = route.params.id
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data
})
//是否显示tabs
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const isHideTab = computed(() => {
  return scrollTop.value >= 300;
});
const active = ref('')
</script>

<style lang="less" scoped>
.detail {
  height: 100vh;
  overflow-y: auto;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>