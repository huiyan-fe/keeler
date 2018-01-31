#! /usr/bin/env node

'use strict';

const program = require('commander');
const init = require('../lib/init');
const build = require('../lib/build');
const add = require('../lib/add').add;

program
    .version(require('../package.json').version)
    .usage('[options] [param]')
    .option('-i, --init', 'init project \t 初始化项目')
    .option('-b, --build [name]', 'build project')
    .option('-a, --add [name]', 'add a new page \t 添加一个新的页面')

program
    .command('init')
    .description('init projiect \t 初始化项目')
    .action((options) => {
        const pwd = process.cwd();
        init.init(process, pwd);
    })

program
    .command('build')
    .description('build projiect \t 建立项目索引')
    .action((options) => {
        const pwd = process.cwd();
        build.scanEntry(process, pwd, process.env.PAGE);
    })

program
    .command('add [name]')
    .description('add a new page \t 添加一个新的页面')
    .action((name) => {
        if (name) {
            const pwd = process.cwd();
            add(process, pwd, name);
        } else {
            console.log('[keeler warning!] add muse hava a name')
        }
    })

program.parse(process.argv);

// console.log(program.args)

if (program.init) {
    init.init(process);
};

if (program.build) {
    const pwd = process.cwd();
    build.scanEntry(process, pwd, process.env.PAGE);
};

if (program.add) {
    if (program.add !== true) {
        const name = program.add;
        const pwd = process.cwd();
        add(process, pwd, name);
    } else {
        console.log('[keeler warning!] add muse hava a name')
    }
};