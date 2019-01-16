const {
  getStartingNgrams,
  next,
  ngrams,
  transitions
} = require('./utils')

module.exports = function (options = {}) {
  const nodes = ngrams(options.text, options.order)
  const edges = transitions(nodes)
  const beginnings = getStartingNgrams(nodes)
  const randomBeginning = next({ beginnings }, 'beginnings')

  let curr = randomBeginning
  let generated = []

  for (let i = 0; i < options.count; i++) {
    generated.push(curr)
    curr = next(edges, curr)
  }

  return generated.join('')
}
