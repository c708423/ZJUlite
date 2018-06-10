// pages/setperson/setperson.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    files: [],
    nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo = qcloud.getSession()
    this.setData({
      userinfo: userinfo.userinfo
    })
  },
  previewImage: function (e) {
    var i, k = [];
    for (i = 0; i < this.data.files.length; i++) {
      k.push(this.data.files[i].url);
    }
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: k // 需要预览的图片http链接列表
    })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var files_data = that.data.files;
        console.log(res.tempFilePaths[0]);
        files_data.push({ state: 0, url: res.tempFilePaths[0], progress: 0, posturl: "" });
        that.setData({
          files: files_data
        });
        var upload_process = wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: that.data.files[0].url,
          name: 'file',

          success: function (res) {
            // util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            var files_data = that.data.files;
            files_data[0].posturl = res.data.imgUrl;
            that.setData({
              files: files_data
            })
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
        upload_process.onProgressUpdate((res) => {
          console.log('上传进度', res.progress);
          let files_data = that.data.files;
          files_data[0].state = 1;
          if (res.progress == 100) files_data[0].state = 2;
          files_data[0].progress = res.progress;
          that.setData({ files: files_data });
        })
      }
    })

  },
  inputchange:function(e){
    console.log(e)
    this.setData({
      nickname:e.detail.value
    })
    
  },
  submit:function(){
    var posturl = this.data.files[0].posturl
    var openid = this.data.userinfo.openId
    var nickname = this.data.nickname
    wx.request({
      url: config.service.hosturl + 'changeuserinfo',
      data: {
        openid: openid,
        nickname: nickname,
        avatarurl: posturl
      },
      method: 'post',
      success: function (res) {
        wx.navigateBack({

        })
        console.log(res)
      }
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
  
  }
})