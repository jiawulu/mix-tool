#!/usr/bin/env node

exports.process = function(args){

    var path = require('path'),
        fs   = require('fs');

    var from = path.join(path.dirname(fs.realpathSync(__filename)), '../demo/index.html');
    console.log(from);

     require("../lib/template").execute(
         {
             from : from,
             dest : 'index.html'
         }
     )

}
