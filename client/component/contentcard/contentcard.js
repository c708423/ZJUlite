// component/contentcard/contentcard.js
var that=this;
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatarurl:{
      type:String
    },
    infoid:{
      type:Number
    },
    nickname:{
      type:String
    },
    classify:{
      type: String,
      value:''
    },
    time: {
      type: String,
      value: '',
      observer: function (newVal, oldVal) {
        var t = new Date(newVal)
        this.setData({ showtime: this._timeToDate(t)})
      }
    },
    showtime:{
      type:String,
      value:''
    },
    content: {
      type: String,
      value: ''
    },
    likes: {
      type: Number,
      value: 0
    },
    comments:{
      type: Number,
      value:0
    },
    comment: {
      type: Object,
      observer: function (newVal, oldVal) {
        console.log(newVal)
      }
    },
    haveimg:{
      type:Number,
      value:0
    },
    imgurl:{
      type:String,
      value:''
    },
    logged:{
      type:Boolean,
      value:false
    },
    bookmarknow:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      heart_icon: ["/asset/icon/heart.png","/asset/icon/heart_full.png"],
      comment_icon: ["/asset/icon/comment.png","/asset/icon/comment_full.png"],
      hidden_icon: ["/asset/icon/hidden_open.png","/asset/icon/hidden_close.png"],
      bookmark: ["/asset/icon/bookmark.png", "/asset/icon/bookmark_full.png"],
      heartnow:0,
      commentnow:0,
      hiddennow:0,
      commentstatus:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    transparencyRefresh:function(event){
        console.log(this);
    },
    clickheart: function(e){
        var heart = this.data.heartnow
        heart += 1;
        heart %= 2;
        this.setData({
            heartnow:heart
        })
        console.log(this.data)
    },
    clickhidden: function (e) {
      var hidden = this.data.hiddennow
      hidden += 1;
      hidden %= 2;
      this.setData({
        hiddennow: hidden
      })
    },
    _timeToDate: function (date) {
      //获取js 时间戳

      var time = new Date().getTime();
      //去掉 js 时间戳后三位，与php 时间戳保持一致
      time = parseInt((time - date.getTime()) / 1000);

      //存储转换值
      var s;
      if (time < 60 * 10) {//十分钟内
        return '刚刚';
      } else if ((time < 60 * 60) && (time >= 60 * 10)) {
        //超过十分钟少于1小时
        s = Math.floor(time / 60);
        return s + "分钟前";
      } else if ((time < 60 * 60 * 24) && (time >= 60 * 60)) {
        //超过1小时少于24小时
        s = Math.floor(time / 60 / 60);
        return s + "小时前";
      } else if ((time < 60 * 60 * 24 * 3) && (time >= 60 * 60 * 24)) {
        //超过1天少于3天内
        s = Math.floor(time / 60 / 60 / 24);
        return s + "天前";
      } else {
        //超过3天
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
      }
    },
    clickbookmark: function(e){
      var bookmark = this.data.bookmarknow
      var userinfo = qcloud.getSession()
      var infoid = this.data.infoid
      if(this.data.logged){
        bookmark += 1;
        bookmark %= 2;
        this.setData({ bookmarknow: bookmark })
        if(bookmark===1){
          qcloud.request({
            url: config.service.hosturl + 'mark/add',
            method: "post",
            data: {
              userid: userinfo.userinfo.openId,
              infoid: infoid
            },
            success(res) {
              console.log(res);
            }
          })
        }else{
          qcloud.request({
            url: config.service.hosturl + 'mark/delete',
            method: "post",
            data: {
              userid: userinfo.userinfo.openId,
              infoid: infoid
            },
            success(res) {
              console.log(res);
            }
          })
        }
      }else{
        util.showModel('收藏失败', '您还未登录，请至个人中心登录后使用')
      }
    },
    opendetail: function(e){
      console.log(e);
      var postdata = {
        classify : this.data.classify,
        content: this.data.content,
        comments: this.data.comments,
        likes: this.data.likes,
        haveimg: this.data.haveimg,
        imgurl: this.data.imgurl,
        time: this.data.showtime,
        nickname: this.data.nickname,
        infoid: this.data.infoid,
        comment: this.data.comment,
        avatarurl: this.data.avatarurl
      }
      wx.setStorage({
        key: 'infodetail',
        data: postdata,
        success(){
          wx.navigateTo({
            url: '../detailinfo/detailinfo',
          })
        }
      })

    },
    clickcomment: function(e){
        var that = this;
        this.data.commentstatus += 1;
        this.data.commentstatus %= 2;
        this.setData({commentstatus: that.data.commentstatus})
    }
  }
})
