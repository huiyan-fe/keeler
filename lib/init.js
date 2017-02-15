const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');

const chalk = require('chalk');

var paths = ['./src/app', './src/page', './src/static/js', './src/static/sass', './src/static/img'];

exports.init = (basicPath) => {
    console.log(chalk.cyan(`[start] init project ${basicPath}`))
    paths.forEach((path) => {
        const buildPath = Path.join(basicPath, path);
        ChildPress.execFileSync('mkdir', ['-p', buildPath]);
        console.log(chalk.gray(`\t mkdir ${buildPath}`))
    });
    console.log(chalk.cyan(`${chalk.bgGreen(chalk.white('[finished]'))} init project ${basicPath}`))
}