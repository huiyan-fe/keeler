#! /usr/bin/env node

'use strict';

const program = require('commander');
const init = require('../lib/init');
const build = require('../lib/build');

program
    .version(require('../package.json').version)
    .usage('[options] [project name]')
    .option('-i, --init', 'init project')
    .option('-b, --build [type]', 'build project')
    .parse(process.argv);

if (program.init) {
    const pwd = process.env.PWD;
    init.init(process, pwd);
};

if (program.build) {
    const pwd = process.env.PWD;
    if (program.build === 'online') {
        build.online(process, pwd);
    } else {
        build.dev(process, pwd);
    }
};


if (program.version) {
    console.log(require('../package.json').version)
};