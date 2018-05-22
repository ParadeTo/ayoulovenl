const debug = require('debug')('koa-weapp-demo')
// 登录授权接口
module.exports = async (ctx, next) => {
  // 登录成功
  debug(ctx.$wxInfo)
  ctx.state = {}
  if (ctx.$wxInfo && ctx.$wxInfo.openid) {
    const openid = ctx.$wxInfo.openid
    const {
      nickName,
      gender,
      language,
      city,
      province,
      country,
      avatarUrl
    } = ctx.$wxInfo.userInfo

    // if openid not exist
    let userInfo = await global.DB.select('*').from('user').where({openid})

    if (userInfo.length === 0) {
      // 保存
      await global.DB('user').insert({
        openid,
        nickname: nickName,
        gender,
        language,
        city,
        province,
        country,
        avatar_url: avatarUrl,
        created_at: new Date()
      })
      // 查找
      userInfo = await global.DB.select('*').from('user').where({openid})
    }

    userInfo = userInfo[0]
    // 返回数据
    ctx.state.data = {
      userInfo
    }
  }
}
