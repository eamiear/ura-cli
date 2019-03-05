#!/usr/bin/env node

const program = require('commander')
const request = require('request')
const chalk = require('chalk')
const ora = require('ora')
const logger = require('../lib/logger')

program
  .option('-r, --repo [url]', 'use a custom online repo, default: "https://api.github.com/users/ura-admin-templates/repos"')
  .parse(process.argv)

/**
 * Get templates reop url
 */
const repo = program.repo || 'https://api.github.com/users/ura-admin-templates/repos'

/**
 * Padding
 */

console.log()
process.on('exit', () => {
  console.log()
})

/**
 * List repos
 */
const spinner = ora('request repos...')
spinner.start()
request({
  url: repo,
  headers: {
    'User-Agent': 'vot-cli'
  }
}, (err, res, body) => {
  spinner.stop()
  if (err) logger.fatal(err)
  const requestBody = JSON.parse(body)
  if (Array.isArray(requestBody)) {
    console.log('   Available online templates:')
    console.log()
    requestBody.forEach(repo => {
      console.log(
        '   ' + chalk.yellow('✧') +
        '   ' + chalk.blue(repo.name) +
        '   ' + repo.description
      )
    })
  } else {
    console.error(requestBody.message)
  }
})
