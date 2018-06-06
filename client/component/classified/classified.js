// component/classified/classified.js
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
    selecttype: [0, 0, 1, 0, 0, 0, 0, 0]
  },

  /**
   * 组件的方法列表
   */
  methods: {
      change_type:function(e){
          var k = e.currentTarget.id,newarr = [];
          k = k.charAt(k.length - 1);
          newarr = [0, 0, 0, 0, 0, 0, 0, 0];
          newarr[k] = 1;
          this.setData({
            selecttype : newarr
          })
          console.log(this.data.selecttype);
          this.triggerEvent("classifychange",{'id':e.currentTarget.id},{});
      }
  }
})
