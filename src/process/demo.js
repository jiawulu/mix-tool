#!/usr/bin/env node

exports.process = function(args){

    var exec = require('child_process').exec;

    require('colours');

    var cmds = [];

    cmds.push("git clone https://github.com/mixteam/mixsln.git");

    console.log("git clone https://github.com/mixteam/mixsln.git ing")

    exec(cmds.join("&&"), function (err, stdout, stderr) {

        console.log(err);
        console.log(stdout);
        console.log(stderr);

        console.log("git clone https://github.com/mixteam/mixsln.git done");

        console.log("have a look at mixsln/demo/webapp".green);

    })

}
