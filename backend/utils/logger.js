const info = (...params) => {
  if('test' !== process.env.NODE_ENV) {
    console.log(...params)
  }
}

const err = (...params) => {
  if('test' !== process.env.NODE_ENV) {
    console.error(...params)
  }
}

module.exports = { info, err }