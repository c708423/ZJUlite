// pages/detailinfo/detailinfo.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    placeoholdertext:'',
     subcommentstate:false,
      pageinfo : {},
      content:'',
      inputstate:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (e) {
      console.log('ok')
      var detail = wx.getStorageSync('infodetail')
      this.setData({pageinfo:detail})
      var k = this.handle(this.data.pageinfo.comment)
      console.log('前端处理评论',k)
      this.setData({showcomment:k});
    },
    handle:function(e){
      var ans=[];
      var temparr = new Array();
      console.log('temparr',temparr.push(1));
      for (var key in e){
          if (e[key].level == 0) ans = ans.concat(e[key]);
      }
      for (var key in e){
          if(e[key].level == 1) {
            for (var key2 in ans) {
              if (ans[key2].id == e[key].belong) { //e[key] 是 ans[key2]的子评论
                if (typeof ans[key2]['subcomment'] === 'undefined')
                  ans[key2]['subcomment'] = new Array();
                ans[key2]['subcomment'].push(e[key])
              }
            }
          }
      }
      return ans;
    },
    commsubmit: function(e) {
        var that = this
        console.log('submit the commit of 1 level');
        qcloud.request({
          url: config.service.hosturl + 'commentpost',
          method: 'POST',
          data: {
              content: that.data.content,
              level:0,
              belongto: that.data.pageinfo.infoid
          }
        })
    },
    contentChange: function(e) {
        this.setData({content: e.detail.value});
    },
    clickcomment: function(e){
        this.setData({inputstate:true})
        this.setData({commentlevel:0,
                      belongto:0,
                      content:e.detail.content})
        this.setData({
          placeoholdertext:"输入评论"
        })
    },
    hideinput: function(){
      this.setData({inputstate:false})
    },
    postcomment: function(e){
        var that = this
        console.log('页面收到组件的数据',e)
        this.setData({inputstate:false})
        qcloud.request({
          url: config.service.hosturl + 'commentpost',
          method: 'POST',
          data:{
            content: e.detail.data,
            level: that.data.commentlevel,
            infoid: that.data.pageinfo.infoid,
            belongto: that.data.belongto
          },
          success: function(res){
              console.log(res)
          }
        })
    },
    subcommentpost_statechange: function(){
      this.setData({subcommentstate:true});
    },
    openchat:function(){
        wx.navigateTo({
          url: '../chat/chat'
        })
    },
    subcommentpost: function(e){

      if (this.data.subcommentstate == false) return
      console.log(e)
      this.setData({
        commentlevel: 1,
        belongto: Number(e.currentTarget.id),
        inputstate: true,
        placeoholdertext:"@"
      })
      this.setData({ subcommentstate: false });
    }
  }
})
