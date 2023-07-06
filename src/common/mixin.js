// 导出对象
import {debounce} from './utils'
import emitter from '../mitt/bus'

import BackTop from 'components/content/backTop/BackTop';
import {BACKTOP_DISTANCE} from './const'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 50)

    this.itemImgListener = () => {
      this.refresh()
    }
    
    emitter.on('itemImageLoad', this.itemImgListener)     // emitter.on('接收的事件名称', (传递的参数) => {})

    // 等价于
    // emitter.on('itemImageLoad', this.refresh) 

    console.log('我是混入中的内容')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = (-position.y) > BACKTOP_DISTANCE
    }
  }
}