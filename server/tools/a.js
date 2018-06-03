const DB = require('./initdb')
DB.debug(true)
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

// select('test24')
// insert()

async function where() {
  const res = await DB('message').select('id').where({openid: 'oz_7S5IDP-8lZTxZOxxwvUHpCTow'}).whereBetween('create_at', [new Date(new Date().getTime() - 20 * 60 * 1000), new Date()]).debug(true)
  console.log(res)
  return res
}

console.log(where())