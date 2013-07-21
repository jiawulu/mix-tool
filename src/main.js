#!/usr/bin/env node

var program = require('commander'),
    fs = require('fs'),
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    sys = require('sys'),
    mustache = require('mustache'),
    TMP = './plugin.mus',
    ENCODING = 'utf-8';

argv = process.argv,
    APP_REPO = "git@github.com:jiawulu/testing.git";

function generate() {
    var name = program.name;

    function template(name) {
        //TODO
        console.log(name);
        var view = {
            name : name,
            title : program.title || name
        }
        var html = mustache.to_html(fs.readFileSync(TMP, ENCODING), view);
        console.log(html);
        if (!fs.existsSync("plugins")) {
            fs.mkdirSync("plugins");
        }
        fs.writeFile('plugins/' + name + '.js', html, function (err) {
            if (err) throw err;
            console.log('It\'s saved!');
        });
    }

    if (name) {
        template(name);
    } else {
        rl.question("please input the plugin\'s name?", function (answer) {
            name = answer;
            template(name);
            rl.close();
        });
    }
}

//定义参数,以及参数内容的描述
program.version('0.0.1')
    .usage('[options] [value ...]')
    .option('-n, --name <string>', 'plugin\'s name')
    .option('-t, --title <string>', 'plugin\'s title at the top navi bar')
    .option('-p, --port <n>', 'http server port,default is 80', parseInt)
    .option('-r, --route <string>', 'plugin\'s route, can be a regex');

//添加额外的文档描述
program.on('init', function () {

    exec = require('child_process').exec;
    cmds = [];

    if (!fs.existsSync("testing")) {
        cmds.push("rm -rf testing ");
        cmds.push("git clone " + APP_REPO);
    } else {
        console.error("dist dir alerady exist : testing")
    }
    cmds.push("cd testing");
//    cmds.push("npm install");
//    cmds.push("grunt");

    exec(cmds.join("&&"), function (err, stdout, stderr) {
        console.log(err);
        console.log(stdout);
        console.log(stderr);
        console.log("Do you wanna generate a plugin, y/n");

        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', function (data) {
            process.stdin.end();
            if ("y" === data) {
                //TODO
                generate();
            }
        });
    })
});
program.on('generate',generate);
program.on('release', function () {
    console.log('release')
});
program.on('server', function () {
    console.log('server')
});
program.on('*', function () {
    console.log('   Examples:')
    console.log('')
    console.log('       # init mix\'s webapp ')
    console.log('       $ mix init')
    console.log('')
});

//解析commandline arguments
program.parse(argv);
//console.log(program.name);

