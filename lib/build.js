'use strict';

const os = require('os');
const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');

const chalk = require('chalk');

const isWindow = os.platform == 'win32';

function scanEntry(pwd, branches) {

    console.log(chalk.cyan(`${chalk.white('[keeler]')} scanEntry at ${pwd}`));
    const entry = {};
    let startPath;
    const connection = (isWindow ? '\\' : '/');
    const prefix = 'app' + connection;
    // for app
    startPath = Path.join(pwd, './src/app');
    readFilesOfDir(startPath, function (path) {
        var name = prefix + path.replace(startPath, '').replace(/^[^\w]/, '').replace(/\.entry\.(jsx|scss)$/, '');
        entry[name] = entry[name] || [];
        entry[name].push('.' + connection + Path.relative(pwd, path));
    });
    // for scss
    startPath = Path.join(pwd, './src/static/scss');
    readFilesOfDir(startPath, function (path) {
        var name = prefix + path.replace(startPath, '').replace(/^[^\w]/, '').replace(/\.entry\.(jsx|scss)$/, '');
        entry[name] = entry[name] || [];
        entry[name].push('.' + connection + Path.relative(pwd, path));
    });

    let newEntry = {};
    if (branches && branches !== true) {
        const useBranchs = branches.split(',');
        const useKeys = useBranchs.forEach(name => {
            if (entry[`${prefix}${name}${connection}${name}`]) {
                newEntry[`${prefix}${name}${connection}${name}`] = entry[`${prefix}${name}${connection}${name}`];
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
    var dirs = fs.readdirSync(dir);
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