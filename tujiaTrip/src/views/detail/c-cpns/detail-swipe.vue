<template>
  <div class="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" lazy-render>
      <template v-for="(item,index) in swipeData" :key="index">
        <van-swipe-item>
            <img :src="item.url" alt="">
        </van-swipe-item>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
    swipeData: {
        type: Array,
        default: () => []
    }
})
</script>

<style lang="less" scoped>
.my-swipe {
        img {
            width: 100%;
        }
    }

</style>