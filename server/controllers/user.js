const debug = require('debug')('koa-weapp-demo')

exports.getUserInfo = async (ctx, next) => {
  const openid = ctx.params.openid
  debug(openid)

  if (typeof openid === 'undefined') {
    return
  }

  const users = await global.DB('user').select('*').where({openid})
  debug(users)

  if (users && users.length > 0) {
    ctx.state = {
      data: {
        ...users[0]
      }
    }
  }
}

exports.come = async (ctx, next) => {
  const come = ctx.request.body.come || 0
  const openid = ctx.params.openid

  if (typeof openid === 'undefined') return

  await global.DB('user').update({come, update_at: new Date()}).where({openid})

  ctx.state = {
    code: 0
  }
}
