// const debug = require('debug')('koa-weapp-demo')

exports.add = async (ctx, next) => {
  const { openid, content } = ctx.request.body

  if (!openid) throw new Error('openid must not be empty')
  if (!content) throw new Error('内容不能为空')
  if (content.length > 50) throw new Error('内容太长')

  let user = await global.DB('user').select('openid').where({openid})
  if (user.length === 0) throw new Error('用户不存在')

  await global.DB('user').update({message: 1}).where({openid})
  await global.DB('message').insert({content, openid, create_at: new Date()})

  ctx.state = {
    code: 0
  }
}

exports.get = async (ctx, next) => {
  let { page, limit } = ctx.query
  let list
  if (!page || !limit) {
    list = await global.DB('message').select('*').orderBy('create_at', 'desc')
  } else {
    list = await global.DB('message').select('*').orderBy('create_at', 'desc').limit(limit).offset((page - 1) * limit)
  }
  ctx.state = {
    code: 0,
    data: list
  }
}
