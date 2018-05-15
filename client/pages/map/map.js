// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 112.146190,
    latitude: 28.512600,
    markers: [{
      title: '华美达大酒店',
      iconPath: "./heart.png",
      latitude: 28.512600,
      longitude: 112.146190,
      width: 30,
      height: 30,
      label: {
        content: '时间：2018/10/05 12:00\n地点：湖南省桃江县华美达大酒店',
        textAlign: 'left',
        color: '#d3217b'
      }
    }]
  },

  onClickGo () {
    wx.openLocation({
      latitude: 28.512600,
      longitude: 112.146190,
      name: '华美达大酒店',
      address: '湖南省桃江县华美达大酒店'
    })
  }
})