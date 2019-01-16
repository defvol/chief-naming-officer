const mgen = require('../lib/index')
const { readFile } = require('../lib/utils')
const test = require('tape')

test('index', async (t) => {
  const text = await readFile('./test/a.txt')
  const options = {
    count: 3,
    order: 2,
    text
  }

  const generated = mgen(options)
  t.true(generated.length > 2 && generated.length < 8)
  t.end()
})
