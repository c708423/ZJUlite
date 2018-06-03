// component/contentcard/contentcard.js
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
      heart_icon: ["/asset/icon/heart.png","/asset/icon/heart_full.png"],
      comment_icon: ["/asset/icon/comment.png","/asset/icon/comment_full.png"],
      hidden_icon: ["/asset/icon/hidden_open.png","/asset/icon/hidden_close.png"],
      bookmark: ["/asset/icon/bookmark.png", "/asset/icon/bookmark_full.png"],
      heartnow:0,
      commentnow:0,
      hiddennow:0,
      bookmarknow:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    transparencyRefresh:function(event){
        console.log(this);
    },
    clickheart: function(e){
        var heart = this.data.heartnow
        heart += 1;
        heart %= 2;
        this.setData({
            heartnow:heart
        })
    },
    clickhidden: function (e) {
      var hidden = this.data.hiddennow
      hidden += 1;
      hidden %= 2;
      this.setData({
        hiddennow: hidden
      })
    },
    clickbookmark: function(e){
      var bookmark = this.data.bookmarknow
      bookmark += 1;
      bookmark %= 2;
      this.setData({bookmarknow:bookmark})
    }
  }
})
