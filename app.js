//app.js
App({
  onLaunch: function() {},
  addToCart: function(obj) {
    let oldObj = this.globalData.cartList.find(item =>
      item.iid === obj.iid
    )
    if (oldObj) {
      oldObj.count += 1;
      wx.showToast({
        title: '商品数量+1',
      })
    } else {
      obj.count = 1;
      obj.checked = true;
      this.globalData.cartList.push(obj);
      wx.showToast({
        title: '已成功加入购物车',
      })
    }
  },
  globalData: {
    cartList: []
  }
})