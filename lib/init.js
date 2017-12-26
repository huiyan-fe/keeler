'use strict';
const os = require('os');
const fs = require('fs');
const util = require('util');
const Path = require('path');
const ChildPress = require('child_process');
const Package = require(Path.join(__dirname, '/bootstrap/react-v.0.1/package.json'));

const chalk = require('chalk');
const isWindow = os.platform == 'win32';

const opNpm = isWindow ? 'npm.cmd' : 'npm';
const opCp = isWindow ? 'cp.cmd' : 'cp';

// basic cp functions

var mkdir = function (dir) {
    // making directory without exception if exists
    try {
        fs.mkdirSync(dir);
    } catch (e) {
        if (e.code != "EEXIST") {
            throw e;
        }
    }
};

var rmdir = function (dir) {
    if (Path.existsSync(dir)) {
        var list = fs.readdirSync(dir);
        for (var i = 0; i < list.length; i++) {
            var filename = Path.join(dir, list[i]);
            var stat = fs.statSync(filename);

            if (filename == "." || filename == "..") {
                // pass these files
            } else if (stat.isDirectory()) {
                // rmdir recursively
                rmdir(filename);
            } else {
                // rm fiilename
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    } else {
        console.warn("warn: " + dir + " not exists");
    }
};

var copyDir = function (src, dest) {
    mkdir(dest);
    var files = fs.readdirSync(src);
    for (var i = 0; i < files.length; i++) {
        var current = fs.lstatSync(Path.join(src, files[i]));
        if (current.isDirectory()) {
            copyDir(Path.join(src, files[i]), Path.join(dest, files[i]));
        } else if (current.isSymbolicLink()) {
            var symlink = fs.readlinkSync(Path.join(src, files[i]));
            fs.symlinkSync(symlink, Path.join(dest, files[i]));
        } else {
            copy(Path.join(src, files[i]), Path.join(dest, files[i]));
        }
    }
};

var copy = function (src, dest) {
    var oldFile = fs.readFileSync(src);
    var newFile = fs.writeFileSync(dest, oldFile);
};
//

var paths = ['./src/app', './src/page', './src/static/js', './src/static/sass', './src/static/img'];

function initPackage() {
    console.log(chalk.cyan(`${chalk.white('[keeler]')} init project`));
    ChildPress.execFileSync(opNpm, ['init', '-y']);
}

function initFolder(basicPath) {
    console.log(chalk.cyan(`${chalk.white('[keeler]')} copy file to your project ${basicPath}`));
    copyDir(Path.join(__dirname, './demo/src'),  Path.join(basicPath, '/src'));
    copy(Path.join(__dirname, '/bootstrap/react-v.0.1/.babelrc'), Path.join(basicPath, '.babelrc'));
    copy(Path.join(__dirname, '/bootstrap/react-v.0.1/.postcssrc'), Path.join(basicPath, '.postcssrc'));
    copy(Path.join(__dirname, '/bootstrap/react-v.0.1/gulpfile.js'), Path.join(basicPath, 'gulpfile.js'));
    copy(Path.join(__dirname, '/bootstrap/react-v.0.1/webpack.config.js'), Path.join(basicPath, 'webpack.config.js'));

    // ChildPress.execFileSync(opCp, ['-r', Path.join(__dirname, './demo/src'), basicPath]);
    // ChildPress.execFileSync(opCp, ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/.babelrc'), basicPath]);
    // ChildPress.execFileSync(opCp, ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/.postcssrc'), basicPath]);
    // ChildPress.execFileSync(opCp, ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/gulpfile.js'), basicPath]);
    // ChildPress.execFileSync(opCp, ['-r', Path.join(__dirname, '/bootstrap/react-v.0.1/webpack.config.js'), basicPath]);
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
    initPackage(process.cwd());
    initFolder(process.cwd());
    initModuls(process.cwd());
    finish();
}