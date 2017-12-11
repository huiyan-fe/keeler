'use strict';

const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');

const chalk = require('chalk');

function scanEntry(pwd, branches) {
    console.log(chalk.cyan(`${chalk.white('[keeler]')} scanEntry at ${pwd}`));
    const entry = {};
    let startPath;
    // for app
    startPath = Path.join(pwd, './src/app');
    readFilesOfDir(startPath, function (path) {
        // console.log(path)
        var name = 'app/' + path.replace(RegExp(startPath + '/(.+)\.entry\.(jsx|scss)$'), '$1');
        entry[name] = entry[name] || [];
        entry[name].push('.' + path.replace(RegExp(pwd), ''));
    });
    // for scss
    startPath = Path.join(pwd, './src/static/scss');
    readFilesOfDir(startPath, function (path) {
        // console.log(path)
        var name = 'app/' + path.replace(RegExp(startPath + '/(.+)\.entry\.(jsx|scss)$'), '$1');
        entry[name] = entry[name] || [];
        entry[name].push('.' + path.replace(RegExp(pwd), ''));
    });

    //
    fs.writeFileSync(Path.join(pwd, 'keel.entry.webpack.config.json'), JSON.stringify(entry), {
        flags: 'w'
    });
    console.log(chalk.cyan(`${chalk.white('[keeler]')} scanEntry result: `));
    console.log(chalk.cyan(JSON.stringify(entry)));
}

function readFilesOfDir(dir, cb) {
    // console.log(dir)
    var dirs = fs.readdirSync(Path.join(dir));
    dirs.forEach((subDir) => {
        const useDri = Path.join(dir, subDir);
        const isFile = fs.statSync(useDri).isFile();
        if (isFile) {
            if (/\.entry\.(jsx|scss)$/.test(useDri)) {
                cb(useDri);
            }
        } else {
            readFilesOfDir(useDri, cb);
        }
    });
}

exports.scanEntry = function (process, pwd, order) {
    scanEntry(pwd);
}