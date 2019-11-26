// pages/cart/cart.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    totalPrice:0,
    totalCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取cartLIst
    this.setData({
      cartList: app.globalData.cartList
    });

    //页面加载时判断全选的状态
    this.selectComponent('.bottom-bar').setData({
      selected: this._isCheckAll()
    })

    //获得总计价格
    this.setData({
      totalPrice:this._getTotalPrice(),
      totalCount:this._getTotalCount()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //页面每次显示时更新购物车 虽然这两步与onload的一样 但是不重复哦
    this.setData({
      cartList: app.globalData.cartList
    });
    //页面显示时判断全选状态
    this.selectComponent('.bottom-bar').setData({
      selected: this._isCheckAll()
    })
    //改变总计价格
    this.setData({
      totalPrice: this._getTotalPrice(),
      totalCount: this._getTotalCount()

    })
  },

  /**
   * 单个商品的选择按钮被点击
   */
  checkedClick(e) {

    //改变单个商品选择按钮的状态
    const index = e.detail.index;
    const isChecked = this.data.cartList[index].checked;
    this.setData({
      [`cartList[${e.detail.index}].checked`]: !isChecked
    });

    //每点击一下都得判断checkAll的状态
    //改变checkAll按钮的状态
    this.selectComponent('.bottom-bar').setData({
      selected: this._isCheckAll()
    })

    //改变总计价格
    this.setData({
      totalPrice: this._getTotalPrice(),
      totalCount: this._getTotalCount()
    })

  },
  /**
   * 全选按钮被点击时
   */
  checkAllClick(e) {
    //当前点击的状态
    const currentChecked = e.detail.isChecked;
    if (!currentChecked) { //当前状态为false时 全部改成true
      this._changeCheckAll(true)
    } else {
      this._changeCheckAll(false)
    };

    this.selectComponent('.bottom-bar').setData({
      selected: !currentChecked
    })

    this.setData({
      totalPrice: this._getTotalPrice(),
      totalCount: this._getTotalCount()
    })
    // console.log(app.globalData.cartList)
  },

  /**
   * @params 全选or全不选
   */
  _changeCheckAll(boolean) {
    const newCartList = this.data.cartList.map((item, index) => {
      item.checked = boolean;
      return item;
    });
    this.setData({
      cartList: newCartList
    })
  },
  _isCheckAll() {
    if (this.data.cartList.length === 0) return false;
    for (let i of this.data.cartList) {
      if (i.checked === false) {
        return false;
      }
    }
    return true;
  },
  _getTotalPrice(){
    let total = 0
    for (let i of this.data.cartList){
      if(i.checked){
        total += Number(i.price);
      }
    }
    return total.toFixed(2);
  },
  _getTotalCount(){
    let count = 0;
    for(let i of this.data.cartList){
      count += i.count
    }
    return count
  }
})