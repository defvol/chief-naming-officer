var fs = require('fs')
var path = require('path')

/**
 * Get n-grams from a string
 * @param {String} text
 * @param {Number} order
 * @return {Array} ngrams
 */
module.exports.ngrams = function (text, order) {
  let ngrams = []
  for (let i = 0; i < text.length - order; i += order) {
    ngrams.push(text.substring(i, i + order))
  }

  return ngrams
}

/**
 * Get transitions for each state in the n-gram array
 * @param {Array} ngrams
 * @return {Object} dictionary
 */
module.exports.transitions = function (ngrams) {
  let dictionary = {}
  for (let i = 0; i < ngrams.slice(0, -1).length; i++) {
    let curr = ngrams[i]
    let next = ngrams[i + 1]
    dictionary[curr] = (dictionary[curr] || []).concat(next)
  }

  return dictionary
}

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
