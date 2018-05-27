// component/tabbar/tabbar.js
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
    title : {
      'home':'新鲜事',
      'talk':'我的消息',
      'new-msg':'我的聊天',
      'user':'个人中心'
    },
    blue_one : {
      'home':1,
      'talk':0,
      'new-msg':0,
      'user':0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select_bar: function(e){
      this.triggerEvent('barchange', {'id':e.currentTarget.id},{});
      var that = this;
      var newblue_one = {
        'home':0,
        'talk':0,
        'new-msg':0,
        'user':0
      };
      newblue_one[e.currentTarget.id] = 1;
      this.setData({blue_one:newblue_one});
      console.log(this.data.title[e.currentTarget.id]);
      wx.setNavigationBarTitle({
        title: that.data.title[e.currentTarget.id]//页面标题为路由参数
      })
    }
  }
})
