// pages/cart/childcpns/cart-bottom-bar/cart-bottom-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selected: {
      type: Boolean,
      value: false
    },
    totalPrice:{
      type:Number,
      value:0
    },
    totalCount:{
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
    checkAllClick(e) {
      const isChecked = this.properties.selected;
      this.triggerEvent('checkAllClick', {
        isChecked
      }, {})
    }
  }
})