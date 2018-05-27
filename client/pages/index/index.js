//index.js
//获取应用实例
Page({
  data: {
    contentcard:['1','2','3','4','5','6','7','8'],
    talkcard:[
      { id: 'msgbox1', title: 'Qc0', content: 'sili23i收到收到机收到收到机收到收到机收到收到机收到收到机卡士力架老师看大家阿斯顿快乐机啊3李丹空间l'},
      { id: 'msgbox2', title: 'Qc1', content: 'si32il'},
      { id: 'msgbox3', title: 'Qc2', content: 'sil43sil'},
      { id: 'msgbox5', title: 'Qc3', content: 'si4234fdssdsil'}
    ],
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
  del_talkbox:function (e){
    console.log(e);
    var newtalkcard = this.data.talkcard,i;
    for (i=0;i<=newtalkcard.length;i++){
      console.log(this.data.talkcard[i].id);
      if (newtalkcard[i].id == e.detail.id) {
        newtalkcard.splice(i,1);
        break;
      }
    }
    this.setData({talkcard:newtalkcard})
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
      var that = this;
      setTimeout(function(){
        var len = that.data.contentcard.length;
        that.data.contentcard.push(len + 1);
        that.data.contentcard.push(len + 2);
        that.data.contentcard.push(len + 3);
        that.setData({ contentcard: that.data.contentcard });
      }, 1000);
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
  allgoback: function(){
    var that = this;
    console.log('all go back happen');
    this.data.talkcard.forEach(function(value,index,arr){
      that.selectComponent('#' + value.id).goback();
    });
  },
  pushnewinfo:function(){
    wx.navigateTo({
      url: '../postinfo/postinfo'
    })
  },
  pushnewitem:function(){
    wx.navigateTo({
      url: '../postinfo/postinfo?id=classy1'
    })
  },
  searchStatusChange: function(){
    var that = this
    var nowstatus = this.data.searchstatus
    nowstatus = 1 - nowstatus
    this.setData({
      searchstatus: nowstatus
    })
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
