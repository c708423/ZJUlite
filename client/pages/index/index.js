//index.js
//获取应用实例
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var that=this
Page({
  data: {
    anmiationstatus:0,
    animationData:{},
    startPointY:0,
    distance:0,
    contentcard:[],
    lastid:0,
    regstatus:'',
    allinfoget:0,
    talkcard:[
      { id: 'msgbox1', title: '木易安回复了你', content: '腾讯互动娱乐了解一下呢！朋友！'}
    ],
    tip_msg : "最近消息",
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
    currentclassify: '全部信息',
    classylist: {
      'classy0': '学业疑难',
      "classy1": '仙女集市',
      'classy2': '全部信息',
      'classy3': '失物招领',
      'classy4': '出国保研',
      'classy5': '出行玩乐',
      'classy6': '寻人征友',
      'classy7': '畅所欲言',
    },
    //upordown:0, //0表示向下，1表示向上
    userInfo:{}
  },
  gotosetting:function(){
    if(this.data.logged){
      wx.navigateTo({
        url: '../setting/setting',
      })
    }else{
      util.showModel('Fail', '请您在登录后使用');
    }
  },
  onShow:function(){
    this.reloadinfo()
  },
  gotomarks:function(){
    var logged=this.data.logged
    if(logged){
      wx.navigateTo({
        url: '../mark/mark?logged=' + logged,
      })
    }else{
      util.showModel('Fail', '请您在登录后使用');
    }
    
  },
  classifychange: function (e) {
    var that = this
    var curclassy = e.detail.id
    this.setData({
      currentclassify: curclassy,
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
        if (res.data.data.length) {
          that.setData({ lastid: res.data.data[res.data.data.length - 1].id })
        } else {
          that.setData({ allinfoget: 1 })
        }
      }
    })
  },
  mytouchstart:function(e){
    this.setData({
      startPointY : e.touches[0].pageY
    })
  },
  mytouchmove:function(e){
    if (this.data.showView['home']===0){return}
    var curPointY = e.touches[0].pageY
    var startPointY = this.data.startPointY
    var anmiationstatus = this.data.anmiationstatus
    if (startPointY - curPointY >= 15 && anmiationstatus===0) {
      this.setData({
        anmiationstatus:1
      })
      this.hidetab()
    } else if (curPointY - startPointY >= 15 && anmiationstatus === 0) {
      this.setData({
        anmiationstatus: 1
      })
      this.showtab()
    }
  },
  // mytouchend:function(e){
  //   console.log("滑动结束")
  // },
  hidetab: function () {
    var animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 500,
      timingFunction: 'ease',
      // 延迟多长时间开始
      delay: 10,
      transformOrigin: 'center bottom ',
      success: function (res) {
        that.setData({
          anmiationstatus: 0
        })
      }
    })
    animation.bottom('-110rpx').step();
    this.setData({
      animationData: animation.export(),
      anmiationstatus: 0
    });
  },
  showtab: function () {
    var animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 500,
      timingFunction: 'ease',
      // 延迟多长时间开始
      delay: 10,
      transformOrigin: 'center bottom ',
      success: function (res) {
        that.setData({
          anmiationstatus: 0
        })
      }
    })
    animation.bottom(0).step();
    this.setData({
      animationData: animation.export(),
      anmiationstatus: 0
    });
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
  },
  del_talkbox:function (e){
    var newtalkcard = this.data.talkcard,i;
    for (i=0;i<=newtalkcard.length;i++){
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
      if (this.data.allinfoget == 1) return;
      var that = this;
      setTimeout(function(){
        wx.request({
          url: config.service.hosturl + 'getinfo',
          data: {
            lastid: that.data.lastid
          },
          method: 'GET',
          success: function (res) {
            if (res.data.data.length == 0) {
              that.setData({ allinfoget:1});
              return;
            }
            that.setData({ lastid: res.data.data[res.data.data.length - 1].id })
            var tmpcontent = that.data.contentcard;
            tmpcontent = tmpcontent.concat(res.data.data);
            that.setData({contentcard: tmpcontent})
          }
        })
        that.setData({ contentcard: that.data.contentcard });
      }, 500);
  },
  onPullDownRefresh: function () {
      var that=this
      this.setData({
        pullstatus:0
      })
      //以下做数据处理
      setTimeout(function(){
        wx.stopPullDownRefresh()
        that.onLoad()
        that.setData({pullstatus:1})
      },1000)
  },
  allgoback: function(){
    var that = this;
    this.data.talkcard.forEach(function(value,index,arr){
      that.selectComponent('#' + value.id).goback();
    });
  },
  pushnewinfo:function(){
    if (this.data.userInfo.ZJUpass == 0 || typeof this.data.userInfo.ZJUpass === 'undefined') return; 
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
    //console.log(config.service.loginUrl)
    qcloud.setLoginUrl(config.service.loginUrl);
    qcloud.login({
      success: function (userInfo) {
        util.showSuccess('登录成功');
        that.setData({
          userInfo:userInfo,
          logged:true
        })
        wx.request({
          url: config.service.hosturl + 'userlogin',
          data: {
            openid: userInfo.openId,
            nickname: userInfo.nickName,
            avatarurl: userInfo.avatarUrl
          },
          method: 'post',
          success: function (res) {
            that.setData({
              regstatus:res.data.data[0].status
            })
          }
        })
      },
      fail: function (err) {
        console.log('登录失败', err);
      }
    });
  },
  reloadinfo: function(){
    var that = this
    wx.request({
      url: config.service.hosturl + 'getinfo',
      data: {
        lastid: 0
      },
      method: 'GET',
      success: function (res) {
        that.setData({ contentcard: res.data.data })
        console.log(res.data.data.length)
        that.setData({ lastid: res.data.data[res.data.data.length - 1].id })
        console.log(that.data.lastid)
      }
    })
  },
  onLoad: function(){
    this.reloadinfo()
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
        console.log(loginParams)
        console.log(loginResult);
        qcloud.requestLogin({
          loginParams, success(res) {
            console.log('this is res',res)
            util.showSuccess('登录成功');
            that.setData({
              userInfo: res,
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
  },
  openchat: function(e){
    wx.navigateTo({
      url: '../chat/chat'
    })
  }
})
