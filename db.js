const path = require('path')
const glob = require('glob')
const root = path.resolve(__dirname, './')
const data = {}

const files = glob.sync(root + '/**/[!_]*.js*', {
  nodir: true
})
const apiFiles = files.map((filePath) => {
  const [, url] = filePath.split('mock')
  return `${path.resolve(__dirname, './')}${url}`
})

apiFiles.forEach((filePath) => {
  if (!__filename.includes(filePath)) {
    const api = require(filePath)
    let [, _url] = filePath.split('mock')
    data[
      _url
        ?.replace(/\\/g, '-')
        .replace(/.json|.js/g, '')
        .slice(1, _url.length)
    ] = api
  }
})

console.log('routes=------------', data)
module.exports = () => {
  return data
}
