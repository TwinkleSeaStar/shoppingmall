<template>
  <div class="nav-bar">
    <!-- <slot>不可以直接布局，需要在外层包装<div> -->
    <div class="left"><slot name="left"></slot></div>    
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;   
    line-height: 44px;     /* line-height可使文字上下居中 必须有内容高度才能撑起来*/
    text-align: center;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, .1);
  }
  .left, .right {
    width: 60px;
    /* background-color: red; */
  }
  .center {
    flex: 1;
    /* background-color: blue; */
  }
</style>