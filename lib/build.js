const fs = require('fs');
const Path = require('path');
const ChildPress = require('child_process');

const chalk = require('chalk');

function scanEntry(pwd, branches) {
    console.log(chalk.cyan(`[strat] scanEntry at ${pwd}`));
    const startPath = Path.join(pwd, './src/app');
    const entry = {};
    readFilesOfDir(startPath, function (path) {
        var name = path.replace(RegExp(startPath + '/(.+)\.entry\.jsx$'), '$1');
        entry[name] = '.' + path.replace(RegExp(pwd), '');
    });
    // filter
    if (branches !== true) {
        let branArr = branches.split(',');
        for (var i in entry) {
            let fit = false;
            for (var j = 0; j < branArr.length; j++) {
                let reg = new RegExp('^' + './src/app/' + branArr[j]);
                if (reg.test(entry[i])) {
                    fit = true;
                    break;
                }
            }
            if (!fit) {
                delete entry[i];
            }
        }
    }
    //
    fs.writeFileSync(Path.join(pwd, './.keel/entry.js'), 'module.exports = ' + JSON.stringify(entry));
    console.log(chalk.cyan(`[finish] scanEntry`));
    console.log(chalk.cyan(JSON.stringify(entry)));
}

function readFilesOfDir(dir, cb) {
    var dirs = fs.readdirSync(Path.join(dir));
    dirs.forEach((subDir) => {
        const useDri = Path.join(dir, subDir);
        const isFile = fs.statSync(useDri).isFile();
        if (isFile) {
            if (/\.entry\.jsx$/.test(useDri)) {
                cb(useDri);
            }
        } else {
            readFilesOfDir(useDri, cb);
        }
    });
}

function startGulp(par) {
    console.log(chalk.cyan(`\nstart gulp: \n`));

    var env = Object.create(process.env);
    if (par.isDev) {
        env.NODE_ENV = 'dev'
    };

    // console.log(par.pwd);
    var ls = ChildPress.spawn('./node_modules/.bin/gulp', [], {
        env,
        stdio: "inherit"
    });
    // ls.stdout.on('data', (data) => {
    //     console.log(chalk.grey(`\t [gulp] ${data.toString().replace('\n', '')}`));
    // });
    // ls.stderr.on('data', (data) => {
    //     console.log(`[gulp error] ${data}`);
    // });
    // ls.on('close', (code) => {
    //     console.log(chalk.cyan(`\n[gulp finish] ${code}`));
    // });
}


exports.dev = function (process, pwd, branches) {
    console.log(chalk.cyan(`[build:dev]`));
    scanEntry(pwd, branches);
    startGulp({
        isDev: true,
        pwd
    });
}

exports.online = function (process, pwd) {
    console.log(chalk.cyan(`[build:online]`));
    scanEntry(pwd);
    startGulp({
        pwd
    });
}