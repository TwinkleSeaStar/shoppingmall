<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default {
    name: 'GoodsList',
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        dafault() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;    /* flex-wrap 指定 flex 元素单行显示还是多行显示。需设置子元素的宽度，决定一行显示几个子元素*/  
    justify-content: space-around;   /* justify-content 用于设置弹性盒子元素在主轴（横轴）方向上的对齐方式。 */

    padding: 2px;
  }


</style>