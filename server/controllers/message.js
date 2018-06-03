const debug = require('debug')('koa-weapp-demo')

exports.add = async (ctx, next) => {
  const { openid, content } = ctx.request.body

  if (!openid) throw new Error('openid 不能为空')
  if (!content) throw new Error('内容不能为空')
  if (content.length > 50) throw new Error('内容太长')

  let user = await global.DB('user').select('openid').where({openid})
  if (user.length === 0) throw new Error('用户不存在')

  // 十分钟之内只能发十条
  const msgs = await global.DB('message').select('id').where({openid})
    .whereBetween('create_at', [new Date(new Date().getTime() - 10 * 60 * 1000), new Date()])
  debug('-------------------')
  debug(msgs)
  if (msgs && msgs.length >= 10) throw new Error('发送过于频繁，请十分钟后再次尝试')

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
    list = await global.DB('message').select('message.id', 'message.content', 'message.create_at', 'user.avatar_url')
      .orderBy('message.create_at', 'desc')
      .leftJoin('user', 'message.openid', 'user.openid')
  } else {
    list = await global.DB('message').select('message.id', 'message.content', 'message.create_at', 'user.avatar_url')
      .orderBy('message.create_at', 'desc').limit(limit).offset((page - 1) * limit)
      .leftJoin('user', 'message.openid', 'user.openid')
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
