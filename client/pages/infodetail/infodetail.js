// pages/infodetail/infodetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster:{
      avatar:'/asset/icon/1.jpg',
      nickname:'阿狸狸狸',
      logintime:'10min ago'
    },
    info:{
      infoclass:3,
      infodetail:'抱抱大家，想问一下一般留学基金怎么申请哇？求申过的大神给指条路吧！',
      likenum:26,
      likestatus:0,
      photos:[],
      comments:[
        { poster: 'wwwww', to: '', comment: '看院网通知', posterava: '', toava: ''},
        { poster: '布布', to: '', comment: '看院网通知', posterava: '', toava: '' },
        { poster: '呼呼', to: '', comment: '看院网通知', posterava: '', toava: ''},
        { poster: '木易安', to: '', comment: '这个要看院网通知吧', posterava: '', toava: ''},
        { poster: 'hihi', to: '木易安', comment: '院网吗', posterava: '', toava: ''}
      ],
      commentnum:5
    },
    //是否登录并激活为zju账户
    registerstatus: 1,
    //infoclasscolor:信息类别对应颜色
    infoclasscolor: ['#F77B35', '#95DD6E', '#F77B35', '#95DD6E', '#F77B35', '#95DD6E', '#F77B35', '#95DD6E'],
    //infoclasstext：信息类别文字
    infoclasstext: ['学业疑难', '仙女集市', '箱包服饰', '失物招领', '出国保研', '出行玩乐', '寻人征友', '畅所欲言']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.identity)
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


  changelikestatus: function () {
    var param = this.data.info
    var status = param.likestatus
    var num = param.likenum
    if (status === 0) {
      num++
    } else {
      num--
    }
    param.likestatus = 1 - status
    param.likenum = num
    this.setData({
      info:param
    })
  },
})