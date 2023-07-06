<template>
  <div>
    <div id="shop-item">
      <div class="item-selector">
        <check-button :isChecked="itemInfo.checked" @click.native="checkClick"></check-button>
      </div>
      <div class="item-img">
        <img :src="itemInfo.image" alt="商品图片">
      </div>
      <div class="item-info">
        <div class="item-title">{{itemInfo.title}}</div>
        <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
        <div class="info-bottom">
          <div class="item-price">¥{{itemInfo.price}}</div>
          <div class="item-count">x{{itemInfo.count}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartListItem',
    components: {
      CheckButton
    },
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        this.itemInfo.checked = !this.itemInfo.checked
      }
    }
  }
</script>

<style scoped>
  #shop-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    /* flex: 14%; */
    display: flex;
    justify-content: center;    /* 定义了如何分配顺着弹性容器主轴(或者网格行轴) 的元素之间及其周围的空间 */
    align-items: center;        /* 将所有直接子节点上的 align-self 值设置为一个组，align-self 属性设置项目在其包含块中在交叉轴方向上的对齐方式。 */
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;           /* flex布局中，为使子元素溢出隐藏生效，父元素也要溢出隐藏 */
  }

  .item-title, .item-desc {     /* 单行文本超长溢出，以下三个属性需搭配使用 */
    white-space: nowrap;        /* whiteSpace属性设置如何处理文本中的空白符(比如空格和换行符),nowrap设置文本不会换行，文本会在在同一行上继续，直到遇到<br>标签为止。 */
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;      /*  想要justify-content生效，子元素不能使用flex:1  */
  }


  .info-bottom .item-price {
    color: orangered;
  }
</style>