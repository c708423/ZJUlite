// component/tabbar/tabbar.js
var animation = wx.createAnimation({
  // 动画持续时间，单位ms，默认值 400
  duration: 1000,
  /**
   *  linear  动画一直较为均匀
   *  ease    从匀速到加速在到匀速
   *  ease-in 缓慢到匀速
   *  ease-in-out 从缓慢到匀速再到缓慢
   * 
   *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
   *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
   */
  timingFunction: 'ease',
  // 延迟多长时间开始
  delay: 10,
  /**
   * 以什么为基点做动画  效果自己演示
   * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
   * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
   */
  transformOrigin: 'center bottom ',
  success: function (res) {
  }
});
Component({
  /**
   * 组件的属性列表
   */

  properties: {
    animationData: {
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ishide:0,
    
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
      wx.setNavigationBarTitle({
        title: that.data.title[e.currentTarget.id]//页面标题为路由参数
      })
    },
  }
})
