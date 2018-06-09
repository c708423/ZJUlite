// pages/search/search.js
var config = require('../../config')
const date = new Date()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issearching:1,
    focus: true,
    text: '',
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
    search: {
      currentclassify: '全部信息',
      pickmode: 2,
      beforedate: [date.getFullYear(), date.getMonth()+1, date.getDate()-1],
      todate: [date.getFullYear(), date.getMonth()+1, date.getDate()]
    },
    contentcard: [],
    logged:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      logged:options.logged
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
  bindKeyInput: function (e) {
    this.setData({
      text: e.detail.value
    })
  },
  classifychange: function (e) {
    var that = this
    var curclassy = e.detail.id
    var newsearch = this.data.search
    newsearch.currentclassify = this.data.classylist[curclassy]
    this.setData({
      search: newsearch
    })
  },
  gotosearch: function (e) {
    //console.log(e.detail)
    this.setData({
      issearching:0
    })
    var that = this
    var searchinfo = this.data.search
    var text = this.data.text
    var timein
    var timeout
    timein = searchinfo.beforedate[0] + '-' + searchinfo.beforedate[1] + '-' + searchinfo.beforedate[2]
    timeout = searchinfo.todate[0] + '-' + searchinfo.todate[1] + '-' + searchinfo.todate[2]
    //console.log("here")
    wx.request({
      url: config.service.hosturl + "searchinfo",
      method:'get',
      data:{
        classify: searchinfo.currentclassify,
        mode: searchinfo.pickmode,
        timein: timein,
        timeout: timeout,
        text: text
      },
      success:function(res){
        that.setData({ contentcard: res.data.data })
      }
    })

  },
  tapsearch: function () {
    var event = {
      detail: this.data.text
    }
    this.gotosearch(event)
  },
  changestatus: function (e) {
    //console.log(e.detail)
    var newsearch = {
      currentclassify: this.data.search.currentclassify,
      pickmode: e.detail.pickmode,
      beforedate: e.detail.beforedate,
      todate: e.detail.todate
    }
    this.setData({
      search: newsearch
    })
    console.log(this.data.search)
  },
  getfocus:function(e){
    this.setData({
      issearching:1
    })
  }
})