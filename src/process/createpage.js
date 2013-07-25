#!/usr/bin/env node

exports.process = function (args) {

    var path = require('path'),
        fs = require('fs'),
        readline = require('readline'),
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        }),
        arr = ['name', 'title', 'route'];

    require('colours');

    // create a plugin
    var from = path.join(path.dirname(fs.realpathSync(__filename)), '../demo/plugin.mus');

    function template() {
        var name = args.name;
        require("../lib/template").execute(
            {
                from: from,
                dest: name + '.js',
                data: {
                    name: name,
                    title: args.title || name,
                    route: args.route || name
                }

            }
        );
    }

    function appendScript() {
        // add plugin to index
        if (!fs.existsSync("index.html")) {
            require('./init').process(args);
        }

        var html = fs.readFileSync("index.html", "utf-8");

        var REPLACE_TAG = '<!-- add:plugins -->',
            toReplace = REPLACE_TAG + '<script src="./' + args.name + '.js"></script>' ,
            result = html.replace(REPLACE_TAG, toReplace);

        fs.writeFileSync("index.html", result);
    }

    function checkArg(key, callback) {
        if (args[key]) {
            callback && callback();
        } else {
            rl.question("please input the plugin\'s " + key.red + "?", function (answer) {
                args[key] = answer;
                callback && callback();
//                rl.close();
            });
        }
    }

    checkArg(arr.shift(), function () {
        if (arr.length) {
            checkArg(arr.shift(), arguments.callee);
        } else {
            rl.close();
            template();
            appendScript();
            console.log(("visit the page at index.htm#" + (args.route || args.name)).green)
        }
    });

    // start-server


    // give the user url

}
