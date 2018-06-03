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
    lastLoadTime: null,
    times: 0,
    page: 1,
    limit: 10,
    total: null,
    content: '',
    userInfo: null,
    logining: false,
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
    this.initMessages()
    setInterval(() => {
      this.initMessages()
    }, 5000)
  },

  async showInput (e) {
    this.setData({
      logining: true
    })

    const userInfo = await this.getUserInfo(e)
    this.setData({
      showInput: true,
      logining: false
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

  async getMessages (page, limit) {
    const res = await util.http({
      url: service.getMessagesUrl,
      methos: 'POST',
      data: {
        page,
        limit
      },
      cache: true
    })

    return res
  },

  async getUserInfo (event) {
    try {
      let userInfo = wx.getStorageSync('userInfo')
      if (!userInfo) {
        const data = await this.login(event && event.detail.userInfo)
        userInfo = data.userInfo
        wx.setStorageSync('userInfo', userInfo)
      }

      this.setData({
        userInfo: userInfo
      })
      return userInfo
    } catch (err) {
      console.log(err)
      util.showModel('失败', String(JSON.stringify(err)))
    }
  },

  async wantGo (e) {
    this.setData({
      logining: true
    })

    const userInfo = await this.getUserInfo(e)
    const come = this.data.come > 0 ? 0 : 1
    await this.toggleCome(userInfo.openid, come)
    this.setData({
      come,
      logining: false
    })
  },

  handleInput (e) {
    this.data.content = e.detail.value
  },

  async sendMessage (e) {
    const userInfo = await this.getUserInfo()
    
    try {
      const res = await util.http({
        url: service.addMessageUrl,
        method: 'POST',
        data: {
          openid: userInfo.openid,
          content: this.data.content
        }
      })

      if (res) {
        const pos = this.getRandomPos()
        this.setData({
          content: '',
          messages: [
            ...this.data.messages, 
            { 
              ...userInfo,
              id: Math.floor(Math.random() * 10000),
              content: this.data.content,
              ...pos
            }
          ]
        })
      }
    } catch (e) {
      wx.showToast({
        title: String(e) || '发送失败',
        icon: 'none'
      })
    }
  },

  getRandomPos () {
    const colors = this.data.colors
    const { windowWidth, windowHeight } = wx.getSystemInfoSync()
    const color = colors[Math.floor(Math.random() * colors.length)]
    const left = windowWidth + 100 + Math.random() * windowWidth + 'px'
    const top = Math.random() * (windowHeight - 80) + 'px'
    const duration = 5 + Math.random() * 5
    return {
      left,
      top,
      duration,
      color,
    }
  },

  async initMessages() {
    const { colors, messages } = this.data
    let { total, page, limit } = this.data
    let arr = messages.slice()

    if (typeof total === 'number' && Math.ceil(total / limit) < page) {
      return  
    } 

    const res = await this.getMessages(page, limit)
    let list = res.list

    if (list && list.length > 0) {
      list = list.map(l => {
        const { left, top, color, duration } = this.getRandomPos()
        return {
          ...l,
          color,
          left,
          top,
          duration,
          start: new Date().getTime()
        }
      })
      arr = arr.concat(list)
    }

    this.setData({
      messages: arr,
      page: page + 1,
      total: res.total || 0
    })
  }
})