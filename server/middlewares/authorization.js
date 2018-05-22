const debug = require('debug')('koa-weapp-demo')
const config = require('../config')
const http = require('axios')

/**
 * 登录授权
 */
module.exports = async function (ctx, next) {
  debug(ctx.request.body)
  const { code, userInfo } = ctx.request.body
  const { appId, appSecret } = config
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  const res = await http({
    url,
    method: 'GET'
  })
  debug(res.data)
  if (res.data && res.data.openid) {
    ctx.$wxInfo = {
      openid: res.data.openid,
      userInfo
    }
  }
  await next()
}
