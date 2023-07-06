<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: false
    }
  },
  computed: {
    // /home -> item1(/home)     true
    // /home -> item2(/category) false
    // /home -> item3(/cart)     false
    // /home -> item4(/profile)  false
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      console.log('itemClick');
      this.$router.replace(this.path);
    }  
  }
}
</script>

<style scoped>
/* 当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素。 */

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

/* 如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用 >>> 操作符 */
  .tab-bar-item >>> img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;     /* 去掉图片下面的空间 */
    margin-bottom: 2px;
  }
</style>