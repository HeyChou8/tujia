<template>
  <div class="home-item-v9">
    <div class="item-inner">
        <div class="cover">
            <img :src="itemData.image.url" alt="">
        </div>
        <div class="info">
            <div class="summary">{{ itemData.summaryText }}</div>
            <div class="name">{{ itemData.houseName }}</div>
            <div class="price">
                <van-rate v-model="rateValue" :size="15" color="#fff" readonly allow-half/>
            ￥{{ itemData.finalPrice }}
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})
const rateValue = computed(() => {
    return Number(props.itemData.commentScore)
})
</script>

<style lang="less" scoped>
.home-item-v9 {
  width: 50%;
  .item-inner {
    position: relative;
    border-radius: 6px;
    margin: 5px;
    overflow: hidden;
    .cover{
        

        img {
      width: 100%;
    }
    }
    
  }
  .info {
    position: absolute;
    padding: 5px;
    bottom: 10px;
    left: 0;
    color: #fff;
    .summary {
      font-size: 12px;
    }
    .name {
    margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
        display: flex;
        justify-content: space-between;
        margin-top: 5px; 
    }
  }
}
</style>