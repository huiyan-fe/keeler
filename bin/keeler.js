#! /usr/bin/env node

'use strict';

const program = require('commander');
const init = require('../lib/init');
const build = require('../lib/build');
const add = require('../lib/add').add;

program
    .version(require('../package.json').version)
    .usage('[options] [param]')
    .option('-i, --init', 'init project')
    .option('-b, --build [name]', 'build project')


program
    .command('init')
    .description('init projiect')
    .action((options) => {
        const pwd = process.env.PWD;
        init.init(process, pwd);
    })

program
    .command('add [name]')
    .description('add an new page \t 添加一个新的页面')
    .action((name) => {
        const pwd = process.env.PWD;
        add(process, pwd, name);
    })

program.parse(process.argv);

// console.log(program.args)

if (program.init) {
    init.init(process);
};

if (program.build) {
    // console.log(process.env.npm_config_page)
    // console.log('xxxxxxxxxx', program.build)
        // console.log('---', program.build !== true)
    const pwd = process.cwd();
    build.scanEntry(process, pwd, program.build);
};


if (program.version) {
    console.log(require('../package.json').version)
};