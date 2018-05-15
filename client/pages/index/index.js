Page({
  data: {
    come: false,
    showInput: false,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    messages: [],
    colors: ['#ff8b94', '#f3035b', '#fbbc00', '#80d7b5', '#1ec28a']
  },

  onLoad() {
    // wx.showModal({
    //   title: '你会来吗？',
    //   content: '游行至和聂玲真诚的邀请您来参加我们的婚礼',
    //   cancelText: '来不了啦',
    //   confirmText: '我要去',
    //   success: (result) => {
    //     if (result.confirm) {
    //       this.setData({
    //         come: true
    //       })
    //     }
    //   }
    // })

    // init messages
    this.initMessages()
  },

  showInput (e) {
    this.setData({
      showInput: true
    })
  },

  hideInput () {
    this.setData({
      showInput: false
    })
  },

  initMessages () {
    const arr = []
    const { colors } = this.data
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    for (let i = 0; i < 10; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const left = windowWidth + Math.random() * windowWidth * 2 + 'px'
      const top = Math.random() * (windowHeight - 80) + 'px'
      const duration = 10 * Math.random() + 10
      // const left
      arr.push({
        id: i,
        avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        content: '速度快感觉',
        color,
        left,
        top,
        duration
      })
    }
    this.setData({
      messages: arr
    })
  }
})