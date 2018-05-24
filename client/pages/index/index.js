const regeneratorRuntime = require('../../utils/regenerator-runtime')
const consts = require('../../utils/constants')
const util = require('../../utils/util')
const service = require('../../config').service

Page({
  data: {
    come: wx.getStorageSync('userInfo').come,
    showInput: false,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    messages: [],
    interval: 2000,
    colors: ['#ff8b94', '#f3035b', '#fbbc00', '#80d7b5', '#1ec28a']
  },

  onLoad() {
    console.log(this.data.come)
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
    setInterval(() => {
      this.initMessages()
    }, this.data.interval)
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
    return await util.http({
      url: service.loginUrl,
      method: 'POST',
      data: {
        code,
        userInfo
      },
    })
  },

  async toggleCome (openid, come) {
    return await util.http({
      url: service.comeUrl + openid,
      method: 'POST',
      data: {
        come
      }
    })
  },

  // async

  async getUserInfo (event) {
    try {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        const data = await this.login(event.detail.userInfo)
        userInfo = data.userInfo
        wx.setStorageSync('userInfo', userInfo)
      }
      return userInfo
    } catch (err) {
      console.log(err)
      util.showModel('失败', '获取信息失败')
    }
  },

  async wantGo (e) {
    const userInfo = await this.getUserInfo(e)
    const come = this.data.come > 0 ? 0 : 1
    await this.toggleCome(userInfo.openid, come)
    this.setData({
      come
    })
  },

  initMessages() {
    // remove duration
    let arr = []
    const { colors } = this.data
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    for (let i = 0; i < 2; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      const left = windowWidth + Math.random() * windowWidth * 2 + 'px'
      const top = Math.random() * (windowHeight - 80) + 'px'
      const duration = 10 * Math.random() + 10
      // const left
      arr.push({
        id: Math.random(),
        avatar: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        content: i,
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