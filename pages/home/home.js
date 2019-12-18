// pages/home/home.js
import {
  getMultiData,
  getProduct
} from "../../service/home.js"
import {
  POP,
  NEW,
  SELL
}from "../../common/const.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    tabControlList: ['流行', '新款', '精选'],
    currentType: POP,
    goods: {
      [POP]: {
        page: 0,
        list: []
      },
      [NEW]: {
        page: 0,
        list: []
      },
      [SELL]: {
        page: 0,
        list: []
      }
    },
    screenHeight: 0,
    showBackTop: false,
    showTabControl: false,
    tabControlTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this._getMultiData();
    this._getProduct(POP);
    this._getProduct(NEW);
    this._getProduct(SELL);
    this.data.screenHeight = wx.getSystemInfoSync().screenHeight;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this._getProduct(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  onPageScroll(e) {
    //小优化 scroll频繁触发的事件不要频繁的setData
    //------------返回顶部-----------------
    let flag = e.scrollTop > this.data.screenHeight;
    if (flag !== this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
    //------------tabControl---------------
    let flag2 = e.scrollTop >= this.data.tabControlTop;
    if (flag2 !== this.data.showTabControl) {
      this.setData({
        showTabControl: e.scrollTop >= this.data.tabControlTop
      })
    }

  },
  // ----------------------触发的事件--------------------------
  tabControlItemClick(e) {
    const types = [POP, NEW, SELL];
    this.setData({
      currentType: types[e.detail.index]
    });
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index);
    this.selectComponent('.tab-control-clone').setCurrentIndex(e.detail.index);
  },
  backToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
  },
  imageLoad() {
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  //-----------------------网络请求-----------------------------
  _getMultiData() {
    getMultiData().then(res => {
      let imageList = res.data.banner.list.map(item => item.image)
      this.setData({
        banners: imageList,
        recommends: res.data.recommend.list
      })
    })
  },
  _getProduct(type) {
    let page = this.data.goods[type].page + 1;
    getProduct(type, page).then(res => {
      // console.log(res);
      const newList = this.data.goods[type].list;
      newList.push(...res.data.list);
      const goodsList = `goods.${type}.list`;
      const newPage = `goods.${type}.page`;
      this.setData({
        [goodsList]: newList,
        [newPage]: page
      })
    })
  }
})