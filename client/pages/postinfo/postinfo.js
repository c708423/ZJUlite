// pages/postinfo/postinfo.js
Page({
  data: {
    files: [],
    classify_map:{
      'classy0':'学业疑难',
      'classy1':'仙女集市',
      'classy2':'箱包服饰',
      'classy3':'失物招领',
      'classy4':'出国保研',      
      'classy5':'出行玩乐',
      'classy6':'寻人征友',
      'classy7':'畅所欲言',
    },
    nowclass: 'classy0',
    checkboxItems: [
      { name: '显示我的位置', value: '0', checked: true }
    ],
    haveposition:[
      { name: '紫荆港', value:'0', checked:true},
      { name: '玉泉', value: '1' , checked:false},
      { name: '西溪', value: '2', checked: false },
      { name: '之江', value: '3', checked: false }
    ]
  },
  classifychagne:function(e){
    this.setData({nowclass:e.detail.id});
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count:2-this.data.files.length,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
    
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  onLoad:function(option){
    if (option.id!=undefined)
    this.setData({nowclass:option.id});
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },
  positionchage:function(e){
    console.log(e);
    var haveposition = this.data.haveposition,i;
    for (i=0;i<haveposition.length;i++){
      haveposition[i].checked = false;
      if (haveposition[i].value == e.currentTarget.id) 
      haveposition[i].checked = true;
    }
    this.setData({haveposition:haveposition});
  },
  submitinfo:function(e){
    wx.showToast({
      title: '已完成',
      icon: 'success',
      duration: 1500,
      success:function(){
        setTimeout(function () {
        wx.navigateBack({delta:1})
        },1500)
      }
    });
  }
});