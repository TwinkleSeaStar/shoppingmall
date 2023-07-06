<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：￥{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算({{checkedLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  import {mapGetters} from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item =>  item.checked).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false

        // 1.使用filter
        // filter()返回数组，包含了符合条件的所有元素。如果没有符合条件的元素则返回空数组。
        // return !(this.cartList.filter(item => !item.checked).length)
        
        // 2.使用find
        // find()返回符合测试条件的第一个数组元素值，如果没有符合条件的则返回 undefined。!undefined = true. 
        return !(this.cartList.find(item => !item.checked)) 

        // 3.普通遍历
        // for(let item of this.cartList) {
        //   if(!item.checked) {
        //     return false
        //   }
        // }
        // return true
      }
    },
    methods: {
      checkClick() {
        if(this.isSelectAll) {   // 全部选中
          this.cartList.forEach(item => item.checked = false)
        }else {    // 部分不选中或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if(!this.checkedLength == 0) {
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    width: 60px;
    margin-left: 10px;
    line-height: 0;           /* 消除父元素line-height对img的影响 */
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .price {
    flex: 1;
    margin-left: 20px;

  }

  .calculate {
    width: 90px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
</style>