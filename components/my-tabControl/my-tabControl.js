// components/my-tabControl/my-tabControl.js
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
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(e){
      let index = e.currentTarget.dataset.index;
      this.setData({
        currentIndex:index
      });

      //向父组件传参
      this.triggerEvent('tabClick',{index:index},{})
    },
    setCurrentIndex(index){
      this.setData({
        currentIndex:index
      })
    }
  }
})
