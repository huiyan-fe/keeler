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
        var name = path.replace(RegExp(startPath + '/(.+)\.entry\.(jsx|scss)$'), '$1');
        entry[name] = entry[name] || [];
        entry[name].push('.' + path.replace(RegExp(pwd), ''));
    });
    // for scss
    startPath = Path.join(pwd, './src/static/scss');
    readFilesOfDir(startPath, function (path) {
        var name = path.replace(RegExp(startPath + '/(.+)\.entry\.(jsx|scss)$'), '$1');
        entry[name] = entry[name] || [];
        entry[name].push('.' + path.replace(RegExp(pwd), ''));
    });

    let newEntry = {};
    if (branches !== true) {
        const useBranchs = branches.split(',');
        const useKeys = useBranchs.forEach(name => {
            if (entry[`${name}/${name}`]) {
                newEntry[`${name}/${name}`] = entry[`${name}/${name}`];
            }
        });
    } else {
        newEntry = entry;
    }
        //
    fs.writeFileSync(Path.join(pwd, 'keel.entry.webpack.config.json'), JSON.stringify(newEntry), {
        flags: 'w'
    });
    console.log(chalk.cyan(`${chalk.white('[keeler]')} scanEntry result: `));
    console.log(chalk.cyan(JSON.stringify(newEntry)));
}

function readFilesOfDir(dir, cb) {
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

exports.scanEntry = function (process, pwd, branches) {
    scanEntry(pwd, branches);
}