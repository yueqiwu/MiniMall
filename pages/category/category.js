// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "../../service/category.js"

import {
  POP,
  SELL,
  NEW
} from "../../common/const.js"

const details = [POP, NEW, SELL];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    subCategories: [],
    categoryDetail: {
      [POP]: [],
      [NEW]: [],
      [SELL]: []
    },
    currentType: POP
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._init();
  },

  //初始化函数
  _init() {
    this._getCategory().then((res) => {
      this._getSubCategory(res[0].maitKey);

      this._getCategoryDetails(res[0].miniWallkey);
    });
  },
  // ----------------------------绑定事件--------------------------
  menuClick(e) {
    //滚动条置顶
    this.selectComponent('.content').scrollTop();
    //tabControl都是第一个选项
    this.selectComponent('.content').initTabControl();

    const index = e.detail.currentIndex;
    const maitKey = this.data.categories[index].maitKey;
    const miniWallkey = this.data.categories[index].miniWallkey;
    
    this._getSubCategory(maitKey);

    this._getCategoryDetails(miniWallkey).then(()=>{
      this.setData({
        currentType: [POP]
      })
    });
  },
  tabClick(e) {

    const type = details[e.detail.index];
    this.setData({
      currentType: type,
    })
  },
  //-----------------------------网络请求---------------------------
  _getCategory() {
    return new Promise((resolve, reject) => {
      getCategory().then(res => {
        this.setData({
          categories: res.data.category.list
        });
        resolve(res.data.category.list);
        console.log(this.data.categories)
      })
    })
  },
  _getSubCategory(maitKey) {
    getSubcategory(maitKey).then(res => {
      this.setData({
        subCategories: res.data.list
      })
    })
  },
  _getCategoryDetail(miniWallkey, type) {
    getCategoryDetail(miniWallkey, type).then(res => {
      const categoryDetail = `categoryDetail.${type}`
      this.setData({
        [categoryDetail]: res
      })
    })
  },
  _getCategoryDetails(miniWallkey) {
    return Promise.all([this._getCategoryDetail(miniWallkey, POP),
      this._getCategoryDetail(miniWallkey, NEW),
      this._getCategoryDetail(miniWallkey, SELL)
    ])
  }
})