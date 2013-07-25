#!/usr/bin/env node

var program = require('commander'),
    argv = process.argv;

require('colours');

//定义参数,以及参数内容的描述
program.version('0.0.1')
    .usage('init|createpage|httpserver|demo [options] [value ...]')
    .option('-n, --name <string>', 'plugin\'s name')
    .option('-t, --title <string>', 'plugin\'s title at the top navi bar')
    .option('-r, --route <string>', 'plugin\'s route, can be a regex')
    .option('-p, --port <n>', 'http server port,default is 80', parseInt);

//添加额外的文档描述
program.on('*', function () {

    var processName = program.args[0],
        processPlugin;

    try {
        processPlugin = require('./process/' + processName);
    } catch (e) {
    }

    if (processPlugin) {
        processPlugin.process(program);
    } else {
        console.error("pluginName not exist  " + processName.red);
        console.log('   Examples:')
        console.log('')
        console.log('$ init|createpage|httpserver|demo [options] [value ...]')
        console.log('')
    }
});

//解析commandline arguments
program.parse(argv);
//console.log(program.name);

