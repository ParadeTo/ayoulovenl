const regeneratorRuntime = require('../../utils/regenerator-runtime')
const consts = require('../../utils/constants')
const notify = require('../../utils/util')
const service = require('../../config').service

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

    // login
    // this.login()

    // init messages
    this.initMessages()
  },

  showInput (e) {
    this.setData({
      showInput: true
    })
  },

  hideInput (e) {
    this.setData({
      showInput: false
    })
  },

  wxLogin () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (loginRes) => {
          resolve(loginRes.code)
        },
        fail: () => {
          reject(new Error('Login fail'))
        }
      })
    })
  },

  async login (userInfo) {
    const code = await this.wxLogin()
    return new Promise((resolve, reject) => {
      wx.request({
        url: service.loginUrl,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          code,
          userInfo
        },
        success: res => {
          const data = res.data
          if (data && data.code === 0 && data.data.openid) {
            resolve(data.data.openid)
          }
        },
        fail: reject
      })
    })
  },

  async getOpenid (event) {
    try {
      let openid = wx.getStorageSync('openid')
      if (!openid) {
        openid = await this.login(event.detail.userInfo)
        wx.setStorageSync('openid', openid)
      }
      return openid
    } catch (err) {
      console.log(err)
      notify.showModel('失败', '获取信息失败')
    }
  },

  async wantGo (e) {
    const openid = await this.getOpenid(e)
    console.log(openid)
  },

  initMessages() {
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