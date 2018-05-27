// component/tipbox/tipbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newsNum: {
      type: Number,
      value: 15
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
    tapEvent: function(){
      this.setData({
        newsNum:0
      })
      this.triggerEvent('checknews')
    }
  }
})
