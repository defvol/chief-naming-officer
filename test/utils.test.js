var test = require('tape')
var utils = require('../lib/utils')

test('getStartingNgrams', function (t) {
  const text = 'The quick fox jumped over a lazy dog'
  const expected = ['The', ' qu', ' fo', 'ove', ' la', 'dog']
  const ngrams = utils.ngrams(text, 3)
  t.deepEqual(utils.getStartingNgrams(ngrams), expected)
  t.end()
})

test('next', function (t) {
  const transitions = {
    'a': ['a', 'a', 'a', 'a', 'b'],
    'b': ['a', 'b']
  }

  let freq = { a: 0, b: 0 }
  for (let i = 0; i < 100; i++) {
    let next = utils.next(transitions, 'a')
    freq[next]++
  }

  t.true(freq['a'] > 60 && freq['a'] < 100)
  t.true(freq['b'] > 0 && freq['b'] < 40)
  t.end()
})

test('ngrams', function (t) {
  const text = 'The quick fox'
  const expected = ['The', ' qu', 'ick', ' fo']
  const got = utils.ngrams(text, 3)
  t.deepEqual(got, expected)
  t.end()
})

test('transitions', function (t) {
  const text = 'it is what it is supposed to be, is it?'
  const ngrams = utils.ngrams(text, 3)
  const got = utils.transitions(ngrams)
  t.deepEqual(got['is '], ['wha', 'it?'])
  t.deepEqual(got['e, '], ['is '])
  t.deepEqual(got['t i'], ['t i', 's s'])
  t.equal(ngrams.length, 13)
  t.equal(Object.keys(got).length, 10)
  t.end()
})

test('usage', function (t) {
  var got = utils.usage()
  t.true(got.match(/usage/), 'returns some instructions')
  t.true(got.length > 50, 'lots of instructions')
  t.end()
})

test('version', function (t) {
  var got = utils.version()
  t.true(got.match(/^\d+\.\d+\.\d+$/), 'finds basic semver in package.json')
  t.end()
})
