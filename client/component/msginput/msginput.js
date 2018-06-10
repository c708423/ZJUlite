// component/msginput/msginput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeoholdertext:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    postcomment: function(e){
      var that = this
      this.triggerEvent('postcomment',{
        data:that.data.content
      });
    },
    contentchange: function(e){
      this.setData({content:e.detail.value})
    }
  }
})
