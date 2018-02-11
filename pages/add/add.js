const app = getApp()
Page({
  data: {
    title: '',
    content: '',
    time: '',
    memoList: []
  },

  onLoad: function () {
    var that = this;
    try {
      var value = wx.getStorageSync('memoList')
      if (value) {
        that.setData({
          memoList: value
        })
      }
    } catch (e) {
    }
  },

  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {
  },
  onPullDownRefresh: function () {
  },
  onReachBottom: function () {
  },
  onShareAppMessage: function () {
  },
  onShareAppMessage: function () {
  },
  back: function () {
    // console.log('click back')
    wx.navigateTo({
      url: '../index/index'
    })
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
        title: 'no contene',
        content: 'please input',
        showCancel: false
      })
    } else {
      that.data.memoList.unshift({ "title": title, "content": content, "time": time });
    }
    try {
      wx.setStorageSync('memoList', that.data.memoList)
    } catch (e) { }
    wx.redirectTo({
      url: '../index/index',
    })

  }

})