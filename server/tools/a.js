const DB = require('./initdb')

async function select (openid) {
  const res = await DB.select('*').from('user').where({openid})
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

select('test24')
// insert()
