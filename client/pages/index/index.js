//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    contentcard:[],
    lastid:0,
    allinfoget:0,
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
    searchstatus:0,
    logged:false,
    currentclassify:'全部信息',
    classylist:{
      'classy0': '学业疑难',
      "classy1": '仙女集市',
      'classy2': '全部信息',
      'classy3': '失物招领',
      'classy4': '出国保研',
      'classy5': '出行玩乐',
      'classy6': '寻人征友',
      'classy7': '畅所欲言',
    },
    userInfo:{}
  },
  classifychange:function(e){
    //console.log(e.detail.id)
    var that = this
    var curclassy=e.detail.id
      this.setData({
        currentclassify:curclassy,
        allinfoget: 0
      })
      wx.request({
        url: config.service.hosturl + "getinfo",
        data: {
          lastid: 0,
          classify: that.data.classylist[curclassy]
        },
        method: 'GET',
        success: function (res) {
          that.setData({ contentcard: res.data.data })
          if(res.data.data.length){
            that.setData({ lastid: res.data.data[res.data.data.length - 1].id })
          } else {
            that.setData({ allinfoget: 1 })
          }
          console.log(that.data.lastid)
        } 
      })
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
      var curclassy = this.data.currentclassify
      //console.log('onReachBottom');
      if (this.data.allinfoget == 1) return;
      var that = this;
      setTimeout(function(){
        wx.request({
          url: config.service.hosturl + 'getinfo',
          data: {
            lastid: that.data.lastid,
            classify: curclassy
          },
          method: 'GET',
          success: function (res) {
            //console.log(res)
            if (res.data.data.length == 0) {
              that.setData({ allinfoget:1});
              return;
            }
            that.setData({ lastid: res.data.data[res.data.data.length - 1].id })
            var tmpcontent = that.data.contentcard;
            tmpcontent = tmpcontent.concat(res.data.data);
            that.setData({contentcard: tmpcontent})
            console.log(tmpcontent)
          }
        })
        that.setData({ contentcard: that.data.contentcard });
      }, 500);
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
        that.onLoad()
        this.setData({pullstatus:1})
      },1000)
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
  // searchStatusChange: function(){
  //   var that = this
  //   var nowstatus = this.data.searchstatus
  //   nowstatus = 1 - nowstatus
  //   this.setData({
  //     searchstatus: nowstatus
  //   })
  //   wx.navigateTo({
  //     url: '../search/search',
  //   })
  // },
  opensearchpage:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  bindGetUserInfo: function (e) {
    if (this.data.logged) return;
    util.showBusy('正在登录');
    var that = this;
    console.log(e.detail)
    var userInfo = e.detail.userInfo;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 检查登录是否过期
          wx.checkSession({
            success: function () {
              // 登录态未过期
              util.showSuccess('登陆成功');
              console.log('登陆态未过期');
              that.setData({
                userInfo: userInfo,
                logged: true
              })
            },

            fail: function () {
              qcloud.clearSession();
              // 登录态已过期，需重新登录
              console.log('登陆态已过期');
              var options = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                userInfo: userInfo
              }
              that.doLogin(options);
            },
          });
        } else {
          util.showModel('用户未授权', e.detail.errMsg);
        }
      }
    });
  },
  onLoad: function(){
      var that = this
      wx.request({
        url: config.service.hosturl + "getinfo",
        data:{
          lastid:0,
        },
        method:'GET',
        success: function(res) {
          if (res.data.data.length == 0) {
            that.setData({ allinfoget: 1 });
            return;
          }
          that.setData({ contentcard:res.data.data})
          console.log(res.data.data.length)
          that.setData({ lastid: res.data.data[res.data.data.length - 1].id})
          console.log(that.data.lastid)
        }
      })
  },
  doLogin: function (options) {
    var that = this;
    wx.login({
      success: function (loginResult) {
        var loginParams = {
          code: loginResult.code,
          encryptedData: options.encryptedData,
          iv: options.iv,
        }
        console.log(loginResult);
        qcloud.requestLogin({
          loginParams, success() {
            util.showSuccess('登录成功');
            that.setData({
              userInfo: options.userInfo,
              logged: true
            })
          },
          fail(error) {
            util.showModel('登录失败', error)
            console.log('登录失败', error)
          }
        });
      },
      fail: function (loginError) {
        util.showModel('登录失败', loginError)
        console.log('登录失败', loginError)
      },
    });
  }
})
