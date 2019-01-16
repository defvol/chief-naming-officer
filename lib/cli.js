#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2))
const pack = require('./index')
const {
  readFile,
  usage,
  version
} = require('./utils')

async function run () {
  const paramError = !argv.filename || !argv.count || !argv.order
  if (argv.version || argv.v) {
    console.log(version())
  } else if (argv.help || argv.h || paramError) {
    console.log(usage())
  } else {
    let params = Object.assign({}, argv)
    params.text = await readFile(argv.filename)
    console.log(pack(params))
  }
}

run()
