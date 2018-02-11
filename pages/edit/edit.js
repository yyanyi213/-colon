// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    id: '',
    memoList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    try {
      var value = wx.getStorageSync('memoList')
      if (value) {
        that.setData({
          memoList: value
        })
      }
    } catch (e) {
    }
    that.setData({
      title: options.title,
      content: options.content,
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  back: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  },
  del: function () {
    var that = this
    try {
      var value = wx.getStorageSync('memoList')
      if (value) {
        value.splice(that.data.id, 1)
      }
    } catch (e) {
      // Do something when catch error
    }
    wx.setStorageSync('memoList', value)
    if (that.data.memoList.length == '0') {
      wx.clearStorageSync()
    }
    setTimeout(function () {
      wx.redirectTo({
        url: '../index/index',
      })
    }, 1000)
  },

  inputtitle: function (e) {
    this.setData({
      title: e.detail.value
    })
  },

  inputcontent: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  save: function () {
    var that = this;
    var id = that.data.id;
    var title = that.data.title;
    var content = that.data.content;
    var t = new Date();
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var date = t.getDate();
    var hour = t.getHours();
    var min = t.getMinutes();
    var sec = t.getSeconds();
    var time = year + '-' + month + '-' + date + '  ' + hour + ':' + min + ':' + sec
    if (title == '') {
      wx.showModal({
        title: 'no content',
        content: 'please input',
        showCancel: false
      })
    } else {
      that.setData({
        content:'dfds'
      })
    }
    try {
      wx.setStorageSync('memoList', that.data.memoList)
    } catch (e) { }
    wx.redirectTo({
      url: '../index/index',
    })

  }
})