// pages/detailinfo/detailinfo.js
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
      pageinfo : {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function (e) {
      console.log('ok')
      var detail = wx.getStorageSync('infodetail')
      this.setData({pageinfo:detail})
    },
  }
})
