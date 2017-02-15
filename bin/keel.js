#! /usr/bin/env node

const program = require('commander');

program
    .version(require('../package.json').version)
    .usage('[options] [project name]')
    .option('-i, --init', 'init project')
    .parse(process.argv);

if (program.init) {
    console.log('init project', process.env.PWD);
};
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbqSauce) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);