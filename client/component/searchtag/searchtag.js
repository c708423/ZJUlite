// component/searchtag/searchtag.js
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
    iconleft:300
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapevent:function(){
      //console.log("aa");
      this.setData({
        iconleft:80
      })
      wx.navigateTo({
        url: '../search/search',
      })
      //this.triggerEvent('searchStatusChange')
    },
    tapleave:function(){
      this.setData({
        iconleft: 300
      })
      //this.triggerEvent('searchStatusChange')
    }
  }
})
