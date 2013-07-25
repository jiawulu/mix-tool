#!/usr/bin/env node

exports.process = function(args){

    require('../lib/server').startServer(args.port);

}
