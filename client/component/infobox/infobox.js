// component/msgbox/msgbox.js
const DEL_WIDTH = 150;
const DEL_MOVEOFFSET = 75;
var animation = wx.createAnimation({
  // 动画持续时间，单位ms，默认值 400
  duration: 50,
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
  transformOrigin: 'left top 0',
  success: function (res) {
  }
});
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '默认'
    },
    content: {
      type: String,
      value: '默认'
    },
    msgboxid: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    openchat: false,
    del_state: 0,
    new_msgnum: 1,
    touchstartx: 0,
    touchstarty: 0,
    touchnowx: 0,
    touchnowy: 0,
    offsetX: 0,
    animationData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    realdel: function (e) {
      if (this.data.del_state == 1) {
        this.triggerEvent('del_talkbox', { 'id': this.properties.msgboxid }, {});
        this.setData({ del_state: 0 });
      }
    },
    triggerdel2: function (e) {
      if (this.data.del_state == 1) this.setData({ del_state: 2 });
      else this.setData({ del_state: 0 });
    },
    triggerdel: function (e) {
      console.log('del');
      this.setData({ del_state: 1 });
    },
    delstart: function (e) {
      this.setData({
        openchat: true
      })
      this.setData({ offsetX: 0 });
      this.setData({ touchstartx: e.touches[0].clientX, touchstarty: e.touches[0].clientY });
    },
    delend: function (e) {

      if (this.data.offsetX > DEL_MOVEOFFSET) {
        animation.left('-' + DEL_WIDTH + 'rpx').step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.left('0rpx').step();
        this.setData({
          animationData: animation.export()
        })
        var that = this;
        setTimeout(function () {
          that.setData({
            animationData: {}
          })
        }, 60);

      }
    },
    delmove: function (e) {
      this.setData({ openchat: false })
      this.setData({ touchnowx: e.touches[0].clientX, touchnowy: e.touches[0].clientY });
      if (e.touches[0].clientX > this.data.touchstartx) {
        this.setData({ touchstartx: e.touches[0].clientX });
      } else if (e.touches[0].clientX < this.data.touchstartx - DEL_WIDTH) {
        this.setData({ touchstartx: e.touches[0].clientX + DEL_WIDTH });
      };
      var offset = this.data.touchstartx - e.touches[0].clientX;
      this.setData({ offsetX: offset });
    },
    goback: function (e) {
      animation.left('0rpx').step();
      this.setData({
        animationData: animation.export()
      });
    },
    openit: function (e) {
      console.log('in open end', this.data.openchat)
      if (this.data.openchat) {
        wx.navigateTo({
          url: '../detailinfo/detailinfo',
        })
        this.setData({ openchat: false })
      }
    },
    bindok: function (e) {
      console.log('ok')
    }
  }
})
