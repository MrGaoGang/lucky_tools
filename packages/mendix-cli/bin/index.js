#!/usr/bin/env node
 // process.env.NODE_PATH = __dirname + '/../node_modules/'

const program = require('commander')

program
    .version(require('../package.json').version)
    .usage('<command> [options]')
program
    .command('create <app-name>')
    .description('Use Vue to create a mendix widgets')
    .alias('i')
    .action((name, cmd) => {
        require('../lib/init.js')(name)
    })
program
    .parse(process.argv)

if (!program.args.length) {
    program.help()
}