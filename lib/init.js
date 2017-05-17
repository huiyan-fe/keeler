'use strict';

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
    }
}

function initFolder(basicPath) {
    console.log(chalk.cyan(`[start] init project ${basicPath}`));
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, './demo/src'), basicPath]);
    ChildPress.execFileSync('cp', [Path.join(__dirname, './demo/gulpfile.js'), basicPath]);
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, './demo/.keel'), basicPath]);
    console.log(chalk.cyan(`${chalk.bgGreen(chalk.white('[finished]'))} init project ${basicPath}`));
}

function initModuls() {
    var modules = {
        "babel-core": "^6.23.1",
        "babel-loader": "^6.3.1",
        "babel-preset-es2015": "^6.22.0",
        "babel-preset-react": "^6.23.0",
        "babel-preset-stage-3": "^6.22.0",
        "gulp": "^3.9.1",
        "gulp-rev": "^7.1.2",
        "gulp-rev-replace": "^0.4.3",
        "gulp-sass": "^3.1.0",
        "gulp-webpack": "^1.5.0",
        "react": "^15.4.2",
        "react-dom": "^15.4.2",
        "webpack": "^2.2.1",
        "webpack-stream": "^3.2.0"
    }
    let modules = [];
    for (var i in modules) {
       modules.push(`${i}@${modules[i]}`);
    }
     console.log(chalk.cyan(`install modules ${modules.join(' ')}`));
     ChildPress.execFileSync('npm', ['install', `${modules.join(' ')}`, '--save-dev']);
}

exports.init = (process, basicPath) => {
    packageCheck(basicPath);
    initModuls();
    initFolder(basicPath);
}
