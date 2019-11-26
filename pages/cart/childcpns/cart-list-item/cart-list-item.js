// pages/cart/childcpns/car-list-item/cart-list-item.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods:{
      type:Object,
      value:{}
    },
    index:{
      type:Number,
      value:0
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
    onCheckClick(e){
      // console.log(e)
      const index = e.currentTarget.dataset.index;
      this.triggerEvent('checkedClick',{index},{})
    }
  },
})
