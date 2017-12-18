'use strict';

const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');
const Package = require(Path.join(__dirname, '/bootstrap/react-v.0.1/package.json'));

const chalk = require('chalk');

var paths = ['./src/app', './src/page', './src/static/js', './src/static/sass', './src/static/img'];

function initPackage() {
    console.log(chalk.cyan(`${chalk.white('[keeler]')} init project`));
    ChildPress.execFileSync('npm', ['init', '-y']);
}

function initFolder(basicPath) {
    console.log(chalk.cyan(`${chalk.white('[keeler]')} copy file to your project ${basicPath}`));
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, './demo/src'), basicPath]);
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/.babelrc'), basicPath]);
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/.postcssrc'), basicPath]);
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/gulpfile.js'), basicPath]);
    ChildPress.execFileSync('cp', ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/webpack.config.js'), basicPath]);
}

function initModuls(basicPath) {
    const defalutModules = Package.devDependencies;
    const defalutScripts = Package.scripts;
    const installModules = [];
    for (var i in defalutModules) {
        installModules.push(`${i}@${defalutModules[i]}`);
    }
    const projectPack = require(Path.join(basicPath, 'package.json'));

    // for dependencies
    projectPack.devDependencies = projectPack.devDependencies || {}
    const projectDevDependencies = projectPack.devDependencies;
    Object.keys(defalutModules).map(modName => {
        projectDevDependencies[modName] = defalutModules[modName];
    });

    // for script
    projectPack.scripts = projectPack.scripts || {}
    const scripts = projectPack.scripts;
    Object.keys(defalutScripts).map(scriptKey => {
        if (scripts[scriptKey]) {
            scripts[`${scriptKey}:keeler_bck`] = scripts[scriptKey];
        }
        scripts[scriptKey] = defalutScripts[scriptKey];
    });

    fs.writeFileSync(Path.join(basicPath, 'package.json'), JSON.stringify(projectPack, null, '    '));
}

function finish() {
    console.log(chalk.cyan(`${chalk.white('[keeler]')} keeler has been finished the install process, please install dependencies by useing npm install`));
    console.log(chalk.cyan(`${chalk.white('[keeler]')} keeler 配置完成，请使用npm install安装依赖，后通过运行npm run dev进入开发环境`));
}

exports.init = (process, basicPath) => {
    initPackage(basicPath);
    initFolder(basicPath);
    initModuls(basicPath);
    finish();
}