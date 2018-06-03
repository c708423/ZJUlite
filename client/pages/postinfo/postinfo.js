// pages/postinfo/postinfo.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
    files: [],
    newprice: 0,
    oldprice: 0,
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
    content:'',
    nowclass: 'classy0',
    checkboxItems: [
      { name: '显示我的位置', value: '0', checked: true }
    ],
    haveposition:[
      { name: '紫荆港', value:'紫荆港', checked:true},
      { name: '玉泉', value: '玉泉' , checked:false},
      { name: '西溪', value: '西溪', checked: false },
      { name: '之江', value: '之江', checked: false }
    ]
  },
  classifychagne:function(e){
    this.setData({nowclass:e.detail.id});
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var files_data=that.data.files;
        console.log(res.tempFilePaths[0]);
        files_data.push({ state: 0, url: res.tempFilePaths[0],progress:0,posturl:""});
        that.setData({
          files: files_data
        });
        var upload_process = wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: that.data.files[0].url,
          name: 'file',

          success: function (res) {
            // util.showSuccess('上传图片成功')
            console.log(res)
            res = JSON.parse(res.data)
            console.log(res)
            var files_data = that.data.files;
            files_data[0].posturl = res.data.imgUrl;
            that.setData({
              files:files_data
            })
          },
          fail: function (e) {
            util.showModel('上传图片失败')
          }
        })
        upload_process.onProgressUpdate((res) => {
          console.log('上传进度', res.progress);
          let files_data = that.data.files;
          files_data[0].state = 1;
          if (res.progress == 100) files_data[0].state = 2;
          files_data[0].progress = res.progress;
          that.setData({files:files_data});
        })
      }
    })
    
  },
  pricenewinput: function(e) {
    this.setData({newprice:e.detail.value});
  },
  priceoldinput: function(e) {
    this.setData({oldprice:e.detail.value})
  },
  previewImage: function (e) {
    var i,k=[];
    for (i=0;i<this.data.files.length;i++){
      k.push(this.data.files[i].url);
    }
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: k // 需要预览的图片http链接列表
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
    var that = this;
    var nowposition;
    var haveimg,imgurl;
    for (var i in this.data.haveposition){
      if (this.data.haveposition[i].checked){
          nowposition = this.data.haveposition[i].value;
      }
    }
    if (this.data.files.length == 0) {
      haveimg = 0;
      imgurl='';
    }else{
      haveimg = 1;
      imgurl = this.data.files[0].posturl
    }
    console.log(this.data.oldprice)
    qcloud.request({
      url: config.service.hosturl + 'infopost',
      method:"POST",
      data:{
        classify:that.data.classify_map[that.data.nowclass],
        content:that.data.content,
        haveimg: haveimg,
        imgurl: imgurl,
        localvisible: that.data.checkboxItems[0].checked,
        location:nowposition,
        oldprice:that.data.oldprice,
        newprice:that.data.newprice
      },
      success (res){
        console.log(res);
      }
    })
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
  },
  content_complete: function(e){
    this.setData({content:e.detail.value});
  }
});