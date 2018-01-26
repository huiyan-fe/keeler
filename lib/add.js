'use strict';

const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');

// const Package = require(Path.join(__dirname, '/bootstrap/react-v.0.1/package.json'));

const chalk = require('chalk');



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


exports.add = function (process, basicPath, name) {
    // jsx
    const jsxPath = Path.join(__dirname, '/demo/src/app/demo/demo.entry.jsx');
    const jsxCont = fs.readFileSync(jsxPath);
    const jsxContReplace = jsxCont.toString().replace('hello world', `page of ${name}`).replace(/Demo/g, `${name.charAt(0).toUpperCase()}${name.slice(1)}`);
    mkdir(Path.join(basicPath, `/src/app/${name}/`));
    fs.writeFileSync(Path.join(basicPath, `/src/app/${name}/${name}.entry.jsx`), jsxContReplace);
    // scss
    const scssPath = Path.join(__dirname, '/demo/src/static/scss/demo/demo.entry.scss');
    const scssCont = fs.readFileSync(scssPath).toString();
    mkdir(Path.join(basicPath, `/src/static/scss/${name}/`));
    fs.writeFileSync(Path.join(basicPath, `/src/static/scss/${name}/${name}.entry.scss`), scssCont);
    // html
    const htmlPath = Path.join(__dirname, '/demo/src/page/demo/demo.html');
    const htmlCont = fs.readFileSync(htmlPath).toString();
    const htmlContReplace = htmlCont.replace(/DEMO/g, `${name}`);
    mkdir(Path.join(basicPath, `/src/page/${name}/`));
    fs.writeFileSync(Path.join(basicPath, `/src/page/${name}/${name}.html`), htmlContReplace);
    // console.log(basicPath)
}
