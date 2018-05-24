const debug = require('debug')('koa-weapp-demo')

function isUpdate (newObj, oldObj) {
  for (let k in newObj) {
    if (newObj[k] !== oldObj[k]) {
      return true
    }
  }
  return false
}

// 登录授权接口
module.exports = async (ctx, next) => {
  // 登录成功
  debug(ctx.$wxInfo)
  ctx.state = {}
  if (ctx.$wxInfo && ctx.$wxInfo.openid) {
    const openid = ctx.$wxInfo.openid
    let userInfo
    const {
      nickName,
      gender,
      language,
      city,
      province,
      country,
      avatarUrl
    } = ctx.$wxInfo.userInfo

    const obj = {
      openid,
      nickname: nickName,
      gender,
      language,
      city,
      province,
      country,
      avatar_url: avatarUrl
    }

    // if openid not exist
    let userInfos = await global.DB.select('*').from('user').where({openid})

    if (userInfos.length === 0) {
      // 保存
      await global.DB('user').insert({
        ...obj,
        create_at: new Date(),
        update_at: new Date()
      })
    }

    if (isUpdate(obj, userInfos[0])) {
      await global.DB('user').update({...obj, update_at: new Date()}).where({openid})
    }

    userInfo = obj

    // 返回数据
    ctx.state.data = {
      userInfo
    }
  }
}
