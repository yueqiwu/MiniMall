// pages/cart/cart.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isCheckAll:false,
    totalPrice:0,
    totalCount:0,
    leftPosition:0
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
    //获得总计价格
    this._changeData()
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
    //改变总计价格
    this._changeData()
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
    //改变总计价格和数量
    this._changeData()

  },
  /**
   * 删除订单
   * leftPosition属性为零是因为可能是组件复用的原因 删除订单后下一个订单会自动滚动到上一个被删除的位置
   */
  deleteOrder(e){
    let slef = this;
    wx.showModal({
      title: '您确定要删除该订单吗？',
      success(res){
        if(res.confirm){
          const index = e.detail.index;
          slef.data.cartList.splice(index, 1);
          slef.setData({
            cartList: slef.data.cartList,
            leftPosition: 0
          });
          slef._changeData();
        }
      }
    })
  },
  /**
   * 全选按钮被点击时
   */
  checkAllClick(e) {
    //当前点击的状态
    const currentChecked = this.data.isCheckAll;
    if (!currentChecked) { //当前状态为false时 全部改成true
      this._changeCheckAll(true)
    } else {
      this._changeCheckAll(false)
    };

    //更新价格 数量 按钮状态
    this._changeData()
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

  /**
   * 判断是否为全选
   */
  _isCheckAll() {
    if (this.data.cartList.length === 0) return false;
    for (let i of this.data.cartList) {
      if (i.checked === false) {
        return false;
      }
    }
    return true;
  },

  /**
   * 更新价格 数量 全选按钮的状态
   */
  _changeData(){
    let total = 0
    let count = 0;
    for (let i of this.data.cartList) {
      if (i.checked) {
        total += Number(i.price) * i.count;
        count += i.count
      }
    }
    total = total.toFixed(2);
    
    this.setData({
      totalPrice: total,
      totalCount: count,
      isCheckAll:this._isCheckAll()
    })
  }
})