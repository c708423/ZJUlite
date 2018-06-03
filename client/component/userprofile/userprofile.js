// component/userprofile/userprofile.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avaurl: {
      type: String,
      value: '/asset/icon/1.jpg',
      observer: function (newData, oldData) {
        if (newData == '') this.setData({avaurl:oldData});
      }
    },
    name:{
      type: String,
      value: '尚未登陆' ,
      observer: function (newData, oldData) {
        if (newData == '') this.setData({ name: oldData });
      }
    },
    logged:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    register: function () {
      if (this.data.logged) {
        wx.navigateTo({
          url: '../register/register'
        })
      }
    }
  }
})
