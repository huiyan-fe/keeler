'use strict';

const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');

// const Package = require(Path.join(__dirname, '/bootstrap/react-v.0.1/package.json'));

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

exports.add = function (process, basicPath, name) {
    // jsx
    const jsxPath = Path.join(__dirname, '/demo/src/app/demo/demo.entry.jsx');
    const jsxCont = fs.readFileSync(jsxPath);
    const jsxContReplace = jsxCont.toString().replace('hello world', `page of ${name}`);
    ChildPress.execFileSync('mkdir', ['-p', Path.join(basicPath, `/src/app/${name}/`)]);
    fs.writeFileSync(Path.join(basicPath, `/src/app/${name}/${name}.entry.jsx`), jsxContReplace);
    // scss
    const scssPath = Path.join(__dirname, '/demo/src/static/scss/demo/demo.entry.scss');
    const scssCont = fs.readFileSync(scssPath).toString();
    ChildPress.execFileSync('mkdir', ['-p', Path.join(basicPath, `/src/static/scss/${name}/`)]);
    fs.writeFileSync(Path.join(basicPath, `/src/static/scss/${name}/${name}.entry.scss`), scssCont);
    // html
    const htmlPath = Path.join(__dirname, '/demo/src/page/demo/demo.html');
    const htmlCont = fs.readFileSync(htmlPath).toString();
    const htmlContReplace = htmlCont.replace('DEMO', `${name}`);
    ChildPress.execFileSync('mkdir', ['-p', Path.join(basicPath, `/src/page/${name}/`)]);
    fs.writeFileSync(Path.join(basicPath, `/src/page/${name}/${name}.html`), htmlContReplace);
    // console.log(basicPath)
}