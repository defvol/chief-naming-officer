const fs = require('fs')
const mgen = require('../lib/index')
const test = require('tape')

function readFile (fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(fname, (err, res) => {
      if (err) return reject(err)
      const text = res.toString()
        .replace(/\n/g, ' ')
        .trim()
      resolve(text)
    })
  })
}

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
