import {
  baseURL,
  timeOut
} from "./config.js";

export default function(options) {
  wx.showLoading({
    title: '数据正在加载...'
  })

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data || {},
      timeOut,
      success: function(res) {
        resolve(res.data)
      },
      fail: function(err) {
        reject(err)
      },
      complete: res=>{
        wx.hideLoading()
      }
    })
  })
}