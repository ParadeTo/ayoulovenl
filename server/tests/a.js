var regeneratorRuntime = require('./runtime.js')

function p () {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
}

async function a () {
  const res = await p()
  console.log(res)
}

a()
