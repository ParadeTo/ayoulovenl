const debug = require('debug')('koa-weapp-demo')

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
  let list = []
  let total = 0

  if (!page || !limit) {
    list = await global.DB('message').select('message.id', 'message.content', 'message.create_at', 'user.avatar_url').orderBy('message.create_at', 'desc')
              .leftJoin('user', 'message.openid', 'user.openid')
  } else {
    list = await global.DB('message').select('message.id', 'message.content', 'message.create_at', 'user.avatar_url').orderBy('message.create_at', 'desc').limit(limit).offset((page - 1) * limit)             .leftJoin('user', 'message.openid', 'user.openid')
  }

  total = await global.DB('message').count('openid as count')
  if (total && total.length > 0) {
    total = total[0].count
  } else {
    total = 0
  }
  debug(total)

  ctx.state = {
    code: 0,
    data: {
      list,
      total
    }
  }
}
