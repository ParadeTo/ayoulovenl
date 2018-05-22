const DB = require('./initdb')

async function select () {
  const res = await DB.select('openid').from('user').where({openid: 'test1'})
  console.log(res)
}

async function insert () {
  try {
    const res = await DB('user').insert({
      openid: 'test24',
      nickname: 'asdg',
      gender: 1,
      language: 'asdg',
      city: 'sadg',
      province: 'asdg',
      country: 'china',
      avatar_url: 'http://www.baidu.com',
      created_at: new Date()
    })
    throw new Error('e')
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

select()
insert()
