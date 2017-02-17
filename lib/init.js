const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');

const chalk = require('chalk');

var paths = ['./src/app', './src/page', './src/static/js', './src/static/sass', './src/static/img'];

function packageCheck(basicPath, cb) {
    const packagePath = Path.join(basicPath, './package.json');
    try {
        fs.statSync(packagePath);
    } catch (e) {
        console.log(chalk.cyan(`${chalk.bgRed(chalk.white('[warning]'))} ${packagePath} is not found, try to use the basic one`));
        ChildPress.execFileSync('cp', [Path.join(__dirname, './demo/package.json'), packagePath]);
        // fs.writeFileSync(packagePath, JSON.stringify(require('./demo/package.js').package));
    }
}

function initFolder(basicPath) {
    console.log(chalk.cyan(`[start] init project ${basicPath}`));
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, './demo/src'), basicPath]);
    ChildPress.execFileSync('cp', [Path.join(__dirname, './demo/gulpfile.js'), basicPath]);
    console.log(chalk.cyan(`${chalk.bgGreen(chalk.white('[finished]'))} init project ${basicPath}`));
}

exports.init = (process, basicPath) => {
    packageCheck(basicPath);
    initFolder(basicPath);
}