//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    memoList:[{titie:''},{content:''}],
    isrecordnull:false,
    ischeckboxnull:true,
    iseditnull:true,
    isdelAllnull:true,
    allLength:'0',
    delList:[],
    btnText:'删除全部',
    delFun:'delAll'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that=this
    try{
      var value = wx.getStorageSync('memoList');
      if (value) { 
        that.setData({
          memoList:value,
          isrecordnull:true,
          iseditnull: false,
          allLength: value.length
        })
     
      } 
    }catch (e) {
    // Do something when catch error
    } 

  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  hint:function(){
    wx.showModal({
      title: '关于备忘录',
      content: '一个',
      showCancel: false,
      cancelColor: '',
      confirmText: '晓得了',
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  toadd:function(){
    wx.navigateTo({
      url: '../add/add'
    })
  },
  edit:function(){
    var that=this
    that.setData({
      ischeckboxnull: !that.data.ischeckboxnull,
      isdelAllnull: !that.data.isdelAllnull
    })
  },
  delAll:function(){
    wx.showModal({
      content: '确认删除这' + this.data.allLength +'条记录吗?',
      success: function (res) {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 500
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          },500)
        }
      }
    }) 
  },
  delSin:function(e){
    var that=this
    wx.showModal({
      content: '确认删除这' + that.data.delList.length + '条记录吗?',
      success: function (res) {
        if (res.confirm) {
          var delList=that.data.delList
          delList.sort(function (a, b) {
            return b - a;
          })
          // console.log(delValue)
          for(var i=0;i<that.data.delList.length;i++){
              that.data.memoList.splice(delList[i],1)
          }  
          wx.setStorageSync('memoList', that.data.memoList)
          if(that.data.memoList.length=='0'){
            wx.clearStorageSync()
          }
          // console.log(memoList)
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          },1000)
        }
      }
    })
  },
  delMemo:function(e){
    console.log(e)
    this.setData({
       delList:e.detail.value,
       btnText: '删除' + e.detail.value.length + '条记录',
       delFun:'delSin'
    })
    if (e.detail.value.length=='0'){
      this.setData({
        btnText: '删除全部',
        delFun: 'delAll'
      })
    }
    // var Length =this.data.delMemo.length
    // this.setData({
    //   btnText: '删除'+Length+'条记录'
    // })
  }
  
})
