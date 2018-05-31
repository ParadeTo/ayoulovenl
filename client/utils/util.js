const regeneratorRuntime = require('./regenerator-runtime')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

var stringify = obj => 
  Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&')
var store = {}
var http = async ({ url, data, method, cache }) => {
  let res
  const key = url + stringify(data)

  if (cache) {
    res = store[key]
  }

  if (!res) {
    res = await new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        header: {
          'content-type': 'application/json'
        },
        data,
        success: res => {
          const data = res.data
          if (data && data.code === 0) {
            resolve(data.data)
          } else {
            reject(res.error)
          }
        },
        fail: reject
      })
    })

    store[key] = res
  }
  return res
}

module.exports = { http, formatTime, showBusy, showSuccess, showModel }
