// component/searchpicker/searchpicker.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

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
    pickmode:2,
    years: years,
    year: date.getFullYear(),
    months: months,
    month: date.getMonth(),
    days: days,
    day: date.getDate(),
    value: [9999, 1, 1],
    beforedate: [date.getFullYear(), date.getMonth(), date.getDate()],
    todate: [date.getFullYear(), date.getMonth(), date.getDate()]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    beforetap:function(){
      this.setData({
        pickmode:1
      })
      this.changestatus()
    },
    totap: function () {
      this.setData({
        pickmode: 2
      })
      this.changestatus()
    },
    aftertap: function () {
      this.setData({
        pickmode: 3
      })
      this.changestatus()
    },
    threeday: function () {
      this.setData({
        pickmode: 4
      })
      this.changestatus()
    },
    fiveday: function () {
      this.setData({
        pickmode: 5
      })
      this.changestatus()
    },
    sevenday: function () {
      this.setData({
        pickmode: 6
      })
      this.changestatus()
    },
    beforebindChange: function (e) {
      const val = e.detail.value
      this.setData({
        beforedate: [this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]]]
      })
      this.changestatus()
    },
    tobindChange: function (e) {
      const val = e.detail.value
      this.setData({
        todate: [this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]]]
      })
      this.changestatus()
    },
    changestatus:function(){
      var status={
        pickmode: this.data.pickmode,
        beforedate: this.data.beforedate,
        todate: this.data.todate
      }
      this.triggerEvent('changestatus', status)
    }
  }
})
