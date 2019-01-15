var fs = require('fs')
var path = require('path')

/**
 * Get usage instructions
 * @return {String} the instructions to run this thing
 */
module.exports.usage = function () {
  var u = []
  u.push('Using markov chains to find name ideas for projects and such.')
  u.push('usage: chief-naming-officer [options]')
  u.push('')
  u.push(' --help prints this message')
  u.push(' --version prints package version')
  u.push('')
  return u.join('\n')
}

/**
 * Get module version from the package.json file
 * @return {String} version number
 */
module.exports.version = function () {
  var data = fs.readFileSync(path.join(__dirname, '..', 'package.json'))
  return JSON.parse(data).version
}
