//index.js
//获取应用实例
Page({
  data: {
    tip_msg : "最近消息",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showView:{
      'home':1,
      'user':0,
      'talk':0,
      'new-msg':0
    },
    sendmsg_state:0,
    pullstatus:1,
    searchstatus:0
  },
  cancelWhitepoint:function(e){
    if (this.data.sendmsg_state == 1) this.setData({sendmsg_state:0});
  },
  redirectToNews:function(){
    var stateHome = {
      'home': 0,
      'user': 0,
      'talk': 1,
      'new-msg': 0
    }
    this.setData({
      showView: stateHome
    });
    console.log(this.data.showView);
  },
  fresh_homepage: function(e){
    var stateHome = {
      'home':0,
      'user':0,
      'talk':0,
      'new-msg':0
    }
    stateHome[e.detail.id] = 1;
    this.setData({
      showView : stateHome
    });
    console.log(this.data.showView);
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  send_msg: function(){
    if (this.data.sendmsg_state == 0 ){
      this.setData({ sendmsg_state : 1});
    } else if (this.data.sendmsg_state == 1){
      this.setData({ sendmsg_state : 0});
    }
  },
  onReachBottom : function(){
      console.log('onReachBottom');
  },

  onPullDownRefresh: function () {
    var that=this
    console.log("onReachTop");
    this.setData({
      pullstatus:0
    })
    //以下做数据处理
    setTimeout(function(){
      wx.stopPullDownRefresh()
      that.setData({
        pullstatus: 1
      })
    },3000)
  },

  searchStatusChange: function(){
    var that = this
    var nowstatus = this.data.searchstatus
    nowstatus = 1 - nowstatus
    this.setData({
      searchstatus: nowstatus
    })
  }
})
