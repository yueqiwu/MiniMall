// pages/cart/childcpns/car-list-item/cart-list-item.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    },
    leftPosition: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemWidth: 0
  },
  lifetimes: {
    ready() {
      this.createSelectorQuery().select('.cart-list-item').boundingClientRect((rect) => {
        this.setData({
          itemWidth: rect.width
        })
      }).exec()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //选项按钮被点击
    onCheckClick(e) {
      // console.log(e)
      const index = e.currentTarget.dataset.index;
      this.triggerEvent('checkedClick', {
        index
      }, {})
    },
    //删除按钮被点击
    onDelete(e) {
      const index = e.currentTarget.dataset.index;
      this.triggerEvent('deleteOrder', {
        index
      }, {})
    },
    //手指离开屏幕 滑动回弹 做了防抖
    onTouchend(e) {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let limit = -(30 / 437) * this.data.itemWidth;//大约删除按钮长度的一半
        this.createSelectorQuery().select('.cart-list-item').boundingClientRect((rect) => {
          if (rect.left > limit) {
            this.setData({
              leftPosition: 0
            })
          } else {
            this.setData({
              leftPosition: this.data.itemWidth
            })
          }
        }).exec()
      }, 100)
    }
  },
})