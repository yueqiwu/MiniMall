// pages/home/home-cpns/home-recommend/home-recommend.js
import debounce from "../../../../utils/util.js"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    ImageLoad() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.triggerEvent('imageLoad', {}, {})
      },200) 
    },
    // d_ImageLoad:debounce(this.ImageLoad)
    
  }

})
