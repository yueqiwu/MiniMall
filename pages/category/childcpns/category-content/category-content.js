// pages/category/childcpns/cateegory-content/category-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array,
      value:[]
    },
    categoryDetail:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    position:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollTop() {
      this.setData({
        position: 0
      })
    },
    tabClick(e){
      const index = e.detail.index;
      this.triggerEvent('tabClick',{index},{})
    },
    initTabControl(){
      this.selectComponent('.tabControl').setCurrentIndex(0);
    }
  }
})
