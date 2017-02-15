#! /usr/bin/env node

const program = require('commander');
const init = require('../lib/init');

program
    .version(require('../package.json').version)
    .usage('[options] [project name]')
    .option('-i, --init', 'init project')
    .parse(process.argv);

if (program.init) {
    const pwd = process.env.PWD;
    init.init(pwd);
};
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);