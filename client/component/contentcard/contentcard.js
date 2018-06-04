// component/contentcard/contentcard.js
var that=this;
var util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //信息identity
    identity:{
      type:String,
      value:'78#%$jkf'
    },
    //信息类别
    infoclass:{
      type:Number,
      value:3
    },
    //信息右上角tag是否被标记 
    tagstatus:{
      type: Number,
      value: 0
    },
    //信息左下角心是否被标记
    likestatus: {
      type: Number,
      value: 0
    },
    //信息喜欢数
    likenum: {
      type: Number,
      value: 26
    },
    //评论信息
    comments:{
      type:Array,
      value:
      [
        { poster: 'wwwww', to: '', comment: '看院网通知' },
        { poster: '布布', to: '', comment: '看院网通知' },
        { poster: '呼呼', to: '', comment: '看院网通知' },
        { poster: '木易安', to: '', comment: '这个要看院网通知吧' },
        { poster: 'hihi', to: '木易安', comment: '院网吗' }
      ]
    },
    //评论数
    commentnum: {
      type: Number,
      value: 5
    },
    //评论区是否显示
    commentstatus:{
      type:Number,
      value:0
    },
    //是否想看
    seestatus:{
      type:Number,
      value:1
    },
    //信息发布时间
    date:{
      type:String,
      value:'20分钟前'
    },
    //信息包含的一张图片
    indexphoto:{
      type:String,
      value:'/asset/icon/timg.jpg'
    },
    //信息简略内容
    briefinfo:{
      type:String,
      value:'没有简略描述呢'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //infoclasscolor:信息类别对应颜色
    infoclasscolor: ['#F77B35', '#95DD6E', '#F77B35', '#95DD6E', '#F77B35', '#95DD6E', '#F77B35', '#95DD6E'],
    //infoclasstext：信息类别文字
    infoclasstext: ['学业疑难', '仙女集市', '箱包服饰', '失物招领', '出国保研', '出行玩乐', '寻人征友', '畅所欲言']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    transparencyRefresh:function(event){
        console.log(this);
    },
    changetagstatus:function(){
      var status = this.data.tagstatus
      this.setData({
        tagstatus: 1 - status
      })
      if(status===0){
        util.showSuccess('收藏成功')
      }
    },
    changelikestatus: function () {
      var status = this.data.likestatus
      var num = this.data.likenum
      if(status===0){
        num++
      }else{
        num--
      }
      this.setData({
        likestatus: 1 - status,
        likenum : num 
      })
    },
    changecommentstatus: function () {
      var status = this.data.commentstatus
      this.setData({
        commentstatus: 1 - status,
      })
    },
    changeseestatus: function () {
      var status = this.data.seestatus
      this.setData({
        seestatus: 1 - status,
      })
    },
    checkfordetail:function(){
      var id=this.data.identity
      wx.navigateTo({
        url: '../infodetail/infodetail?identity='+id,
      })
    }
  }
})
