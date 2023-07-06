<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <div class="div-control">        <!-- 外层盒子使用fixed定位，内层盒子正常使用弹性盒布局 -->
      <tab-control :titles="['流行' ,'新款', '精选']" @tabClick="tabClick" v-show="isTabFixed" ref="tabControl1"/>
    </div>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">  <!-- 向Scroll.vue的probeType属性传入数值3，probeType是驼峰，引用时采用 :probe-type -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行' ,'新款', '精选']" @tabClick="tabClick" ref="tabControl2"/> 
      <goods-list :goods="showGoods"/>
    </scroll> 

    <back-top @click="backClick" v-show="isShowBackTop"/>   
        
    <ul>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表</li>
      <li>列表95</li>
      <li>列表96</li>
      <li>列表97</li>
      <li>列表98</li>
      <li>列表99</li>
      <li>列表100</li>
    </ul>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper';
  import RecommendView from './childComps/RecommendView';
  import FeatureView from './childComps/FeatureView';

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll';

  import {getHomeMultidata, getHomeGoods} from 'network/home';     // 只有default导出，import才可删除{}
  import emitter from '../../mitt/bus';
  import {debounce} from 'common/utils';
  import {itemListenerMixin, backTopMixin} from 'common/mixin'

  export default {
    name: 'Home',
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        // result: null,
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()   // 调用methods里封装的函数。若不加this，调用的是import的getHomeMultidata

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')      
    },
    mounted() {
      // Vue2.x事件总线：监听item中图片加载完成
      // this.$bus.$on('itemImageLoad', () => {
      //   console.log('-------')
      // })

      // 1.图片加载完成的事件监听
      // const refresh = debounce(this.$refs.scroll.refresh, 50)

      // emitter.on('homeImageLoad', () => {
      //   // console.log('-------');
      //   // console.log(this.$refs.scroll.refresh)
      //   // this.$refs.scroll && this.$refs.scroll.refresh()
      //   refresh()
      // }) 
    },
    activated() {
      // console.log('activated')
      this.$refs.scroll.scrollTo(0, this.saveY)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听
      // console.log('Home deactivated')
      emitter.off('itemImageLoad', this.itemImgListener)
    },
    unmounted() {
      // console.log('home destroyed')
    },
    methods: {
      /**
       * 事件监听相关的方法
       */
      tabClick(index) {
        // console.log(index);
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        // console.log(position)
        this.listenShowBackTop(position);

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop 
      },
      loadMore() {
        // console.log('加载更多的方法')
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 获取tabControl的offsetTop
        // 所有的组件都有一个属性$el: 用于获取组件中的元素
        // offsetTop：元素到offsetParent顶部的距离

        // console.log(this.$refs.tabControl2.$el.offsetParent)
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop - 44
      },

      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          // this.result = res            // 函数执行完，res会被回收，将res保存到data的result中
          this.banners = res.data.banner.list;  
          this.recommends = res.data.recommend.list;  
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)   // this.goods[type].list.push(...res.data.records)
          this.goods[type].page += 1

          // 完成上拉加载更多
          this.$refs.scroll && this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  /* #home {
    padding-top: 44px;
  } */

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* .tab-control {
    position: sticky;     吸顶效果
    top: 44px;            当滚动高度达到44px，position由默认的static自动改为fixed

    z-index: 9;
  } */

  
  .div-control {
    width: 100%;
    position: fixed;
    z-index: 9;
  }

  .content {
    height: calc(100vh - var(--height-navbar) - var(--height-tabbar));
    overflow: hidden;
  }
</style>