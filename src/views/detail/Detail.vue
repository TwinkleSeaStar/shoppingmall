<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>  
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 属性：topImages  传入值：top-images -->
      <detail-swiper :top-images= "topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :paramInfo="paramInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click="backClick" v-show="isShowBackTop"/>

    <!-- <toast :message="message" :show="show"/> -->

    <ul>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
      <li>10</li>
    </ul>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  // import Toast from 'components/common/toast/Toast'

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
  import emitter from '../../mitt/bus'
  import {debounce} from 'common/utils';
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {useToast} from 'components/common/toast/useToast'

  import {mapActions} from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo, 
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        // message: '',
        // show: false
      }
    },
    created() {
      // console.log(this.$route)

      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res)
        const data = res.result
        // 1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      });

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
      })

      // 4.给getThemeTopY赋值(防抖)
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE);

        // console.log(this.$refs.params.$el.offsetParent);
        console.log(this.themeTopYs); 
      })

      // 1.第一次获取，值不对
      // 值不对的原因：this.$refs.params.$el压根没有渲染
      // this.themeTopYs = []
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // 2.第二次获取：值不对
      // 值不对的原因：图片没有计算在内
      // 根据最新的数据，对应的DOM是已经被渲染出来
      // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片)
      // offsetTop值不对的时候，都是因为图片的问题
      // this.$nextTick(() => {
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs); 
      // })
    },
    mounted() {
      // 方法一：
      // const refresh = debounce(this.$refs.scroll.refresh, 50)

      // emitter.on('detailImageLoad', () => {
      //   refresh()
      // })
    },
    updated() {
    },
    unmounted() {   // vue3.x 中，destroyed 生命周期选项被重命名为 unmounted
      // console.log('destroyed')

      emitter.off('itemImageLoad', this.itemImgListener);
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh()

        this.getThemeTopY()
      },
      titleClick(index) {
        console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
        // console.log(position)

        // 1.获取y值
        const positionY = -position.y

        // 2.positionY和主题中值进行对比
        // [0, 7938, 9120, 9452]
        // positionY 在 0 和 7938 之间，index = 0
        // positionY 在 7938 和 9120 之间，index = 1
        // positionY 在 9120 和 9452 之间，index = 2
        // positionY 大于等于 9452，index = 3

        // 方法一：
        // const length = this.themeTopYs.length
        // for(let i = 0; i < length; i++) {
        //   if((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
        //     this.currentIndex = i;
        //     // console.log(this.currentIndex);
        //     this.$refs.nav.currentIndex = this.currentIndex
        //   }
        // }

        // 方法二：
        const length = this.themeTopYs.length
        for(let i = 0; i < length - 1; i++) {
          if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        // 3.是否显示回到顶部按钮
        this.listenShowBackTop(position)
      },
      addToCart() {
        // console.log('------')
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 2.将商品添加到购物车里(1.Promise 2.mapActions)
        // this.$store.commit('addCart', product)

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        
        // 使用mapActions
        this.addCart(product).then(res => {
          // console.log(res);

          // 1.普通方式封装toast
          // this.show = true;
          // this.message = res;
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // }, 1500)

          // 2.插件方式封装toast
          // vue2.x 调用toast
          // this.$toast.show(res, 2000)

          // vue3.x 调用toast
          const Toast = useToast();
          Toast(res, 2000);

        })
      }
    },

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100vh - 44px - 58px);
    overflow: hidden;
  }
</style>